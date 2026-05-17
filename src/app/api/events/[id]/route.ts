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
import type { EventRecord, EventStatus } from "@/lib/types";

function toString(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const databaseId = getDatabaseId();
  const eventsCollectionId = getEventsCollectionId();
  const event = normalizeEventDocument(await adminDatabases.getDocument<any>(
    databaseId,
    eventsCollectionId,
    id
  ));

  if (event.status === "published") {
    return NextResponse.json({ data: event });
  }

  const profile = await getOptionalProfileFromRequest(req);

  if (!profile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const canView =
    profile.role === "hoi" ||
    profile.userId === event.coordinatorId ||
    (profile.role === "faculty" && event.facultyIds?.includes(profile.userId));

  if (!canView) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ data: event });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const profile = await requireProfileFromRequest(req);
    const databaseId = getDatabaseId();
    const eventsCollectionId = getEventsCollectionId();
    const event = normalizeEventDocument(await adminDatabases.getDocument<any>(
      databaseId,
      eventsCollectionId,
      id
    ));

    const canEdit =
      profile.role === "hoi" ||
      (profile.role === "coordinator" && event.coordinatorId === profile.userId) ||
      (profile.role === "faculty" && event.facultyIds?.includes(profile.userId));

    if (!canEdit) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = (await req.json()) as Partial<EventRecord>;
    const title = body.title ? toString(body.title) : undefined;
    const description = body.description ? toString(body.description) : undefined;
    const venue = body.venue ? toString(body.venue) : undefined;
    const deptId = body.deptId ? toString(body.deptId) : undefined;
    const dateStart = body.dateStart ? toString(body.dateStart) : undefined;
    const dateEnd = body.dateEnd ? toString(body.dateEnd) : undefined;
    const registrationLimit =
      body.registrationLimit !== undefined
        ? Number(body.registrationLimit)
        : undefined;

    if (title && title.length > 100) {
      return NextResponse.json({ error: "Invalid title" }, { status: 400 });
    }

    if (description && description.length > 2000) {
      return NextResponse.json({ error: "Invalid description" }, { status: 400 });
    }

    if (registrationLimit !== undefined && registrationLimit < 0) {
      return NextResponse.json({ error: "Invalid registration limit" }, { status: 400 });
    }

    const status =
      profile.role === "hoi" && body.status
        ? (body.status as EventStatus)
        : undefined;

    const updated = await adminDatabases.updateDocument<any>(
      databaseId,
      eventsCollectionId,
      id,
      {
        title,
        description,
        deptId,
        venue,
        dateStart,
        dateEnd,
        registrationLimit,
        customFields: Array.isArray(body.customFields)
          ? serializeEventCustomFields(body.customFields)
          : undefined,
        promoted: body.promoted ?? undefined,
        status,
        updatedAt: new Date().toISOString(),
      }
    );

    return NextResponse.json({ data: normalizeEventDocument(updated) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update event";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const profile = await requireProfileFromRequest(req);
    const databaseId = getDatabaseId();
    const eventsCollectionId = getEventsCollectionId();
    const event = normalizeEventDocument(await adminDatabases.getDocument<any>(
      databaseId,
      eventsCollectionId,
      id
    ));

    const canDelete =
      profile.role === "hoi" ||
      (profile.role === "coordinator" && event.coordinatorId === profile.userId);

    if (!canDelete) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await adminDatabases.deleteDocument(databaseId, eventsCollectionId, id);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete event";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
