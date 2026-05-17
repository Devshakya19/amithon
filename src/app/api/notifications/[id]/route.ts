import { NextResponse } from "next/server";
import { adminDatabases } from "@/lib/appwrite/server";
import { getDatabaseId, getNotificationsCollectionId } from "@/lib/appwrite/constants";
import { requireProfileFromRequest } from "@/lib/auth/server";
import { normalizeNotificationDocument } from "@/lib/appwrite/serializers";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const profile = await requireProfileFromRequest(req);
    const databaseId = getDatabaseId();
    const notificationsCollectionId = getNotificationsCollectionId();

    const notification = normalizeNotificationDocument(await adminDatabases.getDocument<any>(
      databaseId,
      notificationsCollectionId,
      id
    ));

    if (notification.userId !== profile.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await adminDatabases.updateDocument<any>(
      databaseId,
      notificationsCollectionId,
      id,
      {
        isRead: true,
      }
    );

    return NextResponse.json({ data: normalizeNotificationDocument(updated) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update notification";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
