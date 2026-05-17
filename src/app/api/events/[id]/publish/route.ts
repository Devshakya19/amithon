import { NextResponse } from "next/server";
import { adminDatabases } from "@/lib/appwrite/server";
import {
  getDatabaseId,
  getEventsCollectionId,
} from "@/lib/appwrite/constants";
import { requireProfileFromRequest } from "@/lib/auth/server";
import type { EventRecord } from "@/lib/types";
import { createNotification } from "@/lib/notifications";
import { normalizeEventDocument } from "@/lib/appwrite/serializers";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const profile = await requireProfileFromRequest(req);

    if (profile.role !== "hoi") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const databaseId = getDatabaseId();
    const eventsCollectionId = getEventsCollectionId();

    const updated = normalizeEventDocument(await adminDatabases.updateDocument<any>(
      databaseId,
      eventsCollectionId,
      id,
      {
        status: "published",
        updatedAt: new Date().toISOString(),
      }
    ));

    if (updated.coordinatorId) {
      await createNotification({
        userId: updated.coordinatorId,
        title: "Event published",
        body: `${updated.title} is now live for registrations.`,
        type: "event",
        meta: { eventId: updated.$id },
      });
    }

    return NextResponse.json({ data: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to publish event";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
