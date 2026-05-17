import { ID, Query } from "appwrite";
import { NextResponse } from "next/server";
import { adminDatabases } from "@/lib/appwrite/server";
import {
  getDatabaseId,
  getEventsCollectionId,
} from "@/lib/appwrite/constants";
import {
  normalizeEventDocument,
  serializeEventCustomFields,
} from "@/lib/appwrite/serializers";
import {
  getOptionalProfileFromRequest,
  requireProfileFromRequest,
} from "@/lib/auth/server";
import type { EventCustomField, EventRecord, EventStatus } from "@/lib/types";

function toString(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function parseCustomFields(value: unknown): EventCustomField[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const out: EventCustomField[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") continue;

    const label = toString((item as any).label);
    const required = Boolean((item as any).required);

    if (!label) continue;

    out.push({ label, required });
  }

  return out;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const scope = searchParams.get("scope") ?? "public";
  const status = searchParams.get("status") as EventStatus | null;
  const deptId = searchParams.get("deptId");
  const query = searchParams.get("query");
  const promoted = searchParams.get("promoted");
  const limit = Number(searchParams.get("limit") ?? 50);
  const offset = Number(searchParams.get("offset") ?? 0);

  const databaseId = getDatabaseId();
  const eventsCollectionId = getEventsCollectionId();
  const profile = await getOptionalProfileFromRequest(req);
  const queries = [] as string[];

  if (!profile || scope === "public") {
    queries.push(Query.equal("status", "published"));
  } else if (scope === "mine") {
    if (profile.role === "coordinator") {
      queries.push(Query.equal("coordinatorId", profile.userId));
    } else if (profile.role === "faculty") {
      queries.push(Query.contains("facultyIds", profile.userId));
    }
  }

  if (status) {
    queries.push(Query.equal("status", status));
  }

  if (deptId) {
    queries.push(Query.equal("deptId", deptId));
  }

  if (query) {
    queries.push(Query.search("title", query));
  }

  if (promoted === "true") {
    queries.push(Query.equal("promoted", true));
  }

  if (Number.isFinite(limit)) {
    queries.push(Query.limit(limit));
  }

  if (Number.isFinite(offset)) {
    queries.push(Query.offset(offset));
  }

    const events = await adminDatabases.listDocuments<any>(
    databaseId,
    eventsCollectionId,
    queries
  );

  return NextResponse.json({
    data: events.documents.map((document) => normalizeEventDocument(document)),
    total: events.total,
  });
}

export async function POST(req: Request) {
  try {
    const profile = await requireProfileFromRequest(req);

    if (!["coordinator", "faculty", "hoi"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = (await req.json()) as Partial<EventRecord>;
    const title = toString(body.title);
    const description = toString(body.description);
    const deptId = toString(body.deptId);
    const venue = toString(body.venue);
    const dateStart = toString(body.dateStart);
    const dateEnd = toString(body.dateEnd);
    const registrationLimit = Number(body.registrationLimit ?? 0);

    if (!title || title.length > 100) {
      return NextResponse.json({ error: "Invalid title" }, { status: 400 });
    }

    if (!description || description.length > 2000) {
      return NextResponse.json({ error: "Invalid description" }, { status: 400 });
    }

    if (!deptId) {
      return NextResponse.json({ error: "Department is required" }, { status: 400 });
    }

    if (!venue) {
      return NextResponse.json({ error: "Venue is required" }, { status: 400 });
    }

    if (!dateStart || Number.isNaN(Date.parse(dateStart))) {
      return NextResponse.json({ error: "Invalid start date" }, { status: 400 });
    }

    if (!dateEnd || Number.isNaN(Date.parse(dateEnd))) {
      return NextResponse.json({ error: "Invalid end date" }, { status: 400 });
    }

    if (registrationLimit < 0) {
      return NextResponse.json({ error: "Invalid registration limit" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const status: EventStatus = profile.role === "hoi" ? "published" : "pending";

    const databaseId = getDatabaseId();
    const eventsCollectionId = getEventsCollectionId();

    const event = await adminDatabases.createDocument<any>(
      databaseId,
      eventsCollectionId,
      ID.unique(),
      {
        title,
        description,
        deptId,
        venue,
        dateStart,
        dateEnd,
        registrationLimit,
        registrationCount: 0,
        customFields: serializeEventCustomFields(parseCustomFields(body.customFields)),
        promoted: Boolean(body.promoted),
        status,
        coordinatorId: profile.userId,
        facultyIds: Array.isArray(body.facultyIds) ? body.facultyIds : [],
        createdAt: now,
      }
    );

    return NextResponse.json({ data: normalizeEventDocument(event) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create event";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
