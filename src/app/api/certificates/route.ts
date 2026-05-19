import { NextResponse } from "next/server";
import { ID, Query, type Models } from "appwrite";
import { adminDatabases, adminStorage } from "@/lib/appwrite/server";
import {
  getCertificatesCollectionId,
  getDatabaseId,
  getEventsCollectionId,
  getRegistrationsCollectionId,
  getCertificatesBucketId,
} from "@/lib/appwrite/constants";
import { requireProfileFromRequest } from "@/lib/auth/server";
import type { CertificateRecord, EventRecord } from "@/lib/types";

function getErrorStatus(message: string) {
  if (message === "Unauthorized") return 401;
  if (message === "Forbidden") return 403;
  return 500;
}

export async function GET(req: Request) {
  try {
    const profile = await requireProfileFromRequest(req);
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    const databaseId = getDatabaseId();
    const certificatesCollectionId = getCertificatesCollectionId();

    const queries: string[] = [Query.limit(100)];

    if (eventId) {
      const event = await adminDatabases.getDocument<EventRecord & Models.Document>(
        databaseId,
        getEventsCollectionId(),
        eventId
      );

      const canView =
        profile.role === "hoi" ||
        event.coordinatorId === profile.userId ||
        (profile.role === "faculty" && event.facultyIds?.includes(profile.userId));

      if (!canView) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      queries.push(Query.equal("eventId", eventId));
    } else {
      queries.push(Query.equal("userId", profile.userId));
    }

    const certificates = await adminDatabases.listDocuments<CertificateRecord & Models.Document>(
      databaseId,
      certificatesCollectionId,
      queries
    );

    return NextResponse.json({ data: certificates.documents, total: certificates.total });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load certificates";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const profile = await requireProfileFromRequest(req);

    if (!["coordinator", "faculty", "hoi"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Expect multipart/form-data with a file, eventId and userId
    const formData = await req.formData();
    const file = formData.get("file");
    const eventId = String(formData.get("eventId") ?? "").trim();
    const userId = String(formData.get("userId") ?? "").trim();

    if (!eventId || !userId || !file) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Validate file shape and type (PDF) and size (<= 10MB)
    if (typeof (file as any)?.arrayBuffer !== "function") {
      return NextResponse.json({ error: "Invalid file upload" }, { status: 400 });
    }

    const fileObj = file as File;
    if (fileObj.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files allowed" }, { status: 400 });
    }

    const MAX_BYTES = 10 * 1024 * 1024;
    if (fileObj.size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
    }

    const databaseId = getDatabaseId();
    const eventsCollectionId = getEventsCollectionId();
    const certificatesCollectionId = getCertificatesCollectionId();
    const registrationsCollectionId = getRegistrationsCollectionId();

    const event = await adminDatabases.getDocument<EventRecord & Models.Document>(
      databaseId,
      eventsCollectionId,
      eventId
    );

    const canManage =
      profile.role === "hoi" ||
      event.coordinatorId === profile.userId ||
      (profile.role === "faculty" && event.facultyIds?.includes(profile.userId));

    if (!canManage) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Verify student was registered for the event
    const existingReg = await adminDatabases.listDocuments(
      databaseId,
      registrationsCollectionId,
      [
        Query.equal("eventId", eventId),
        Query.equal("userId", userId),
        Query.equal("status", "registered"),
        Query.limit(1),
      ]
    );

    if (existingReg.total === 0) {
      return NextResponse.json({ error: "Student not registered for this event" }, { status: 400 });
    }

    // Upload file server-side into certificates bucket
    const buffer = await fileObj.arrayBuffer();
    const blob = new File([buffer], fileObj.name, { type: fileObj.type });

    const upload = await adminStorage.createFile(
      getCertificatesBucketId(),
      ID.unique(),
      blob
    );

    const certificate = await adminDatabases.createDocument<CertificateRecord & Models.Document>(
      databaseId,
      certificatesCollectionId,
      ID.unique(),
      {
        eventId,
        userId,
        fileId: upload.$id,
        issuedAt: new Date().toISOString(),
      }
    );

    return NextResponse.json({ data: certificate });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create certificate";
    return NextResponse.json({ error: message }, { status: getErrorStatus(message) });
  }
}
