import { NextResponse } from "next/server";
import { Query, type Models } from "appwrite";
import { adminDatabases } from "@/lib/appwrite/server";
import {
  getDatabaseId,
  getEventsCollectionId,
  getRegistrationsCollectionId,
} from "@/lib/appwrite/constants";
import { requireProfileFromRequest } from "@/lib/auth/server";
import type { EventRecord, RegistrationRecord } from "@/lib/types";
import { normalizeEventDocument, normalizeRegistrationDocument } from "@/lib/appwrite/serializers";

function getErrorStatus(message: string) {
  if (message === "Unauthorized") return 401;
  if (message === "Forbidden") return 403;
  return 500;
}

function csvEscape(value: string) {
  if (value.includes("\"")) {
    value = value.replace(/\"/g, '""');
  }

  if (/[",\n]/.test(value)) {
    return `"${value}"`;
  }

  return value;
}

export async function GET(req: Request) {
  try {
    const profile = await requireProfileFromRequest(req);
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId") ?? "";

    if (!eventId) {
      return NextResponse.json({ error: "Event is required" }, { status: 400 });
    }

    const databaseId = getDatabaseId();
    const eventsCollectionId = getEventsCollectionId();
    const registrationsCollectionId = getRegistrationsCollectionId();

    const event = normalizeEventDocument(
      await adminDatabases.getDocument<EventRecord & Models.Document>(
        databaseId,
        eventsCollectionId,
        eventId
      )
    );

    const canView =
      profile.role === "hoi" ||
      event.coordinatorId === profile.userId ||
      (profile.role === "faculty" && event.facultyIds?.includes(profile.userId));

    if (!canView) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const registrations = await adminDatabases.listDocuments<RegistrationRecord & Models.Document>(
      databaseId,
      registrationsCollectionId,
      [Query.equal("eventId", eventId), Query.limit(500)]
    );

    const headers = [
      "Registration ID",
      "Student ID",
      "Name",
      "Email",
      "Department",
      "Year",
      "Semester",
      "Status",
      "Registered At",
      "Custom Data",
    ];

    const rows = registrations.documents.map((doc: RegistrationRecord) => {
      const normalized = normalizeRegistrationDocument(doc);

      return [
      doc.$id,
      doc.studentId ?? "",
      doc.fullName ?? "",
      doc.email ?? "",
      doc.department ?? "",
      doc.year ?? "",
      doc.semester ?? "",
      doc.status ?? "",
      doc.createdAt ?? "",
      normalized.customData ? JSON.stringify(normalized.customData) : "",
    ];
    });

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => csvEscape(String(value))).join(","))
      .join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=registrations-${eventId}.csv`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Export failed";
    return NextResponse.json({ error: message }, { status: getErrorStatus(message) });
  }
}
