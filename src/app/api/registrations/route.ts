import { ID, Query } from "appwrite";
import { NextResponse } from "next/server";
import { adminDatabases } from "@/lib/appwrite/server";
import {
  getDatabaseId,
  getEventsCollectionId,
  getRegistrationsCollectionId,
} from "@/lib/appwrite/constants";
import { requireProfileFromRequest } from "@/lib/auth/server";
import type { EventRecord, RegistrationRecord } from "@/lib/types";
import { createNotification } from "@/lib/notifications";
import {
  normalizeEventDocument,
  normalizeRegistrationDocument,
  serializeCustomData,
} from "@/lib/appwrite/serializers";

function parseNumber(value: string | null, fallback: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

async function ensureEventAccess(profile: any, eventId: string) {
  const databaseId = getDatabaseId();
  const eventsCollectionId = getEventsCollectionId();
  const event = normalizeEventDocument(await adminDatabases.getDocument<any>(
    databaseId,
    eventsCollectionId,
    eventId
  ));

  const canView =
    profile.role === "hoi" ||
    event.coordinatorId === profile.userId ||
    (profile.role === "faculty" && event.facultyIds?.includes(profile.userId));

  if (!canView) {
    throw new Error("Forbidden");
  }

  return event as EventRecord;
}

export async function GET(req: Request) {
  try {
    const profile = await requireProfileFromRequest(req);
    const { searchParams } = new URL(req.url);
    const scope = searchParams.get("scope") ?? "mine";
    const eventId = searchParams.get("eventId") ?? "";
    const status = searchParams.get("status");
    const includeEvent = searchParams.get("includeEvent") === "true";
    const limit = parseNumber(searchParams.get("limit"), 50);
    const offset = parseNumber(searchParams.get("offset"), 0);

    const databaseId = getDatabaseId();
    const registrationsCollectionId = getRegistrationsCollectionId();
    const queries: string[] = [Query.limit(limit), Query.offset(offset)];

    if (status) {
      queries.push(Query.equal("status", status));
    }

    if (eventId) {
      await ensureEventAccess(profile, eventId);
      queries.push(Query.equal("eventId", eventId));
    } else if (profile.role === "student" || scope === "mine") {
      queries.push(Query.equal("userId", profile.userId));
    } else if (scope === "all" && profile.role !== "hoi") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const registrations = await adminDatabases.listDocuments<any>(
      databaseId,
      registrationsCollectionId,
      queries
    );

    let events: Record<string, EventRecord> = {};

    if (includeEvent) {
      const uniqueIds = Array.from(
        new Set(registrations.documents.map((doc: RegistrationRecord) => doc.eventId))
      );

      const eventDocs = await Promise.all(
        uniqueIds.map((id) =>
          adminDatabases.getDocument<any>(databaseId, getEventsCollectionId(), id)
        )
      );

      events = eventDocs.reduce<Record<string, EventRecord>>((acc, doc) => {
        const normalized = normalizeEventDocument(doc);
        acc[normalized.$id] = normalized;
        return acc;
      }, {});
    }

    return NextResponse.json({
      data: registrations.documents.map((document: RegistrationRecord) =>
        normalizeRegistrationDocument(document)
      ),
      total: registrations.total,
      events,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load registrations";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const profile = await requireProfileFromRequest(req);

    if (profile.role !== "student") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = (await req.json()) as {
      eventId?: string;
      customData?: Record<string, string>;
    };

    const eventId = body.eventId?.trim();

    if (!eventId) {
      return NextResponse.json({ error: "Event is required" }, { status: 400 });
    }

    const databaseId = getDatabaseId();
    const eventsCollectionId = getEventsCollectionId();
    const registrationsCollectionId = getRegistrationsCollectionId();

    const event = normalizeEventDocument(await adminDatabases.getDocument<any>(
      databaseId,
      eventsCollectionId,
      eventId
    ));

    if (event.status !== "published") {
      return NextResponse.json({ error: "Event is not open" }, { status: 400 });
    }

    const limit = event.registrationLimit ?? 0;
    const count = event.registrationCount ?? 0;

    if (limit > 0 && count >= limit) {
      return NextResponse.json({ error: "Event is full" }, { status: 400 });
    }

    const existing = await adminDatabases.listDocuments<any>(
      databaseId,
      registrationsCollectionId,
      [
        Query.equal("eventId", eventId),
        Query.equal("userId", profile.userId),
        Query.equal("status", "registered"),
        Query.limit(1),
      ]
    );

    if (existing.total > 0) {
      return NextResponse.json({ error: "Already registered" }, { status: 409 });
    }

    const registration = await adminDatabases.createDocument<any>(
      databaseId,
      registrationsCollectionId,
      ID.unique(),
      {
        eventId,
        userId: profile.userId,
        fullName: profile.fullName,
        email: profile.email,
        studentId: profile.studentId,
        department: profile.department,
        year: profile.year,
        semester: profile.semester,
        status: "registered",
        customData: serializeCustomData(body.customData),
        createdAt: new Date().toISOString(),
      }
    );

    await adminDatabases.updateDocument<any>(
      databaseId,
      eventsCollectionId,
      eventId,
      {
        registrationCount: count + 1,
        updatedAt: new Date().toISOString(),
      }
    );

    await createNotification({
      userId: profile.userId,
      title: "Registration confirmed",
      body: `You are registered for ${event.title}.`,
      type: "registration",
      meta: { eventId },
    });

    if (event.coordinatorId && event.coordinatorId !== profile.userId) {
      await createNotification({
        userId: event.coordinatorId,
        title: "New registration",
        body: `${profile.fullName} registered for ${event.title}.`,
        type: "registration",
        meta: { eventId, userId: profile.userId },
      });
    }

    return NextResponse.json({ data: normalizeRegistrationDocument(registration) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
