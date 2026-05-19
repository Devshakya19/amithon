import { NextResponse } from "next/server";
import { type Models } from "appwrite";
import { adminDatabases } from "@/lib/appwrite/server";
import {
  getDatabaseId,
  getEventsCollectionId,
  getRegistrationsCollectionId,
} from "@/lib/appwrite/constants";
import { requireProfileFromRequest } from "@/lib/auth/server";
import type { EventRecord, RegistrationRecord } from "@/lib/types";

function getErrorStatus(message: string) {
  if (message === "Unauthorized") return 401;
  if (message === "Forbidden") return 403;
  if (message === "Not found") return 404;
  return 500;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const profile = await requireProfileFromRequest(req);

    const databaseId = getDatabaseId();
    const registrationsCollectionId = getRegistrationsCollectionId();
    const eventsCollectionId = getEventsCollectionId();

    const registration = await adminDatabases.getDocument<any>(
      databaseId,
      registrationsCollectionId,
      id
    );

    if (profile.role === "student" && registration.userId !== profile.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (registration.status === "cancelled") {
      return NextResponse.json({ data: registration });
    }

    const event = await adminDatabases.getDocument<any>(
      databaseId,
      eventsCollectionId,
      registration.eventId
    );

    const updated = await adminDatabases.updateDocument<any>(
      databaseId,
      registrationsCollectionId,
      id,
      {
        status: "cancelled",
      }
    );

    const count = Math.max(0, (event.registrationCount ?? 0) - 1);

    await adminDatabases.updateDocument<any>(
      databaseId,
      eventsCollectionId,
      registration.eventId,
      {
        registrationCount: count,
        updatedAt: new Date().toISOString(),
      }
    );

    return NextResponse.json({ data: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to cancel registration";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
