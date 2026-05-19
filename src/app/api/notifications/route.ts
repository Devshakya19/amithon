import { NextResponse } from "next/server";
import { Query, type Models } from "appwrite";
import { adminDatabases } from "@/lib/appwrite/server";
import { getDatabaseId, getNotificationsCollectionId } from "@/lib/appwrite/constants";
import { requireProfileFromRequest } from "@/lib/auth/server";
import { normalizeNotificationDocument } from "@/lib/appwrite/serializers";
import type { NotificationRecord } from "@/lib/types";

function getErrorStatus(message: string) {
  if (message === "Unauthorized") return 401;
  if (message === "Forbidden") return 403;
  return 500;
}

export async function GET(req: Request) {
  try {
    const profile = await requireProfileFromRequest(req);
    const { searchParams } = new URL(req.url);
    const unreadOnly = searchParams.get("unread") === "true";
    const limit = Number(searchParams.get("limit") ?? 50);

    const databaseId = getDatabaseId();
    const notificationsCollectionId = getNotificationsCollectionId();

    const queries: string[] = [
      Query.equal("userId", profile.userId),
      Query.orderDesc("createdAt"),
      Query.limit(Number.isFinite(limit) ? limit : 50),
    ];

    if (unreadOnly) {
      queries.push(Query.equal("isRead", false));
    }

    const notifications = await adminDatabases.listDocuments<NotificationRecord & Models.Document>(
      databaseId,
      notificationsCollectionId,
      queries
    );

    return NextResponse.json({
      data: notifications.documents.map((document) => normalizeNotificationDocument(document)),
      total: notifications.total,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load notifications";
    return NextResponse.json({ error: message }, { status: getErrorStatus(message) });
  }
}
