import { ID } from "appwrite";
import { adminDatabases } from "@/lib/appwrite/server";
import { getDatabaseId, getNotificationsCollectionId } from "@/lib/appwrite/constants";
import { serializeMeta } from "@/lib/appwrite/serializers";

export type NotificationPayload = {
  userId: string;
  title: string;
  body: string;
  type: string;
  meta?: Record<string, unknown>;
};

export async function createNotification(payload: NotificationPayload) {
  const databaseId = getDatabaseId();
  const notificationsCollectionId = getNotificationsCollectionId();

  return adminDatabases.createDocument<any>(
    databaseId,
    notificationsCollectionId,
    ID.unique(),
    {
      ...payload,
      meta: serializeMeta(payload.meta),
      isRead: false,
      createdAt: new Date().toISOString(),
    }
  );
}
