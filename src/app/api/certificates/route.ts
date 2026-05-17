import { NextResponse } from "next/server";
import { ID, Query } from "appwrite";
import { adminDatabases } from "@/lib/appwrite/server";
import {
  getCertificatesCollectionId,
  getDatabaseId,
  getEventsCollectionId,
} from "@/lib/appwrite/constants";
import { requireProfileFromRequest } from "@/lib/auth/server";

export async function GET(req: Request) {
  try {
    const profile = await requireProfileFromRequest(req);
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    const databaseId = getDatabaseId();
    const certificatesCollectionId = getCertificatesCollectionId();

    const queries: string[] = [Query.limit(100)];

    if (eventId) {
      const event = await adminDatabases.getDocument<any>(
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

    const certificates = await adminDatabases.listDocuments<any>(
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

    const body = (await req.json()) as {
      eventId?: string;
      userId?: string;
      fileId?: string;
    };

    const eventId = body.eventId?.trim();
    const userId = body.userId?.trim();
    const fileId = body.fileId?.trim();

    if (!eventId || !userId || !fileId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const databaseId = getDatabaseId();
    const eventsCollectionId = getEventsCollectionId();
    const certificatesCollectionId = getCertificatesCollectionId();

    const event = await adminDatabases.getDocument<any>(
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

    const certificate = await adminDatabases.createDocument<any>(
      databaseId,
      certificatesCollectionId,
      ID.unique(),
      {
        eventId,
        userId,
        fileId,
        issuedAt: new Date().toISOString(),
      }
    );

    return NextResponse.json({ data: certificate });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create certificate";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
