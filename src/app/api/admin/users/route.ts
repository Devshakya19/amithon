import { NextResponse } from "next/server";
import { type Models } from "appwrite";
import { adminDatabases } from "@/lib/appwrite/server";
import { getDatabaseId, getUsersCollectionId } from "@/lib/appwrite/constants";
import { requireProfileFromRequest } from "@/lib/auth/server";

function getErrorStatus(message: string) {
  if (message === "Unauthorized") return 401;
  if (message === "Forbidden") return 403;
  return 500;
}

export async function GET(req: Request) {
  try {
    const profile = await requireProfileFromRequest(req);

    if (profile.role !== "hoi") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const databaseId = getDatabaseId();
    const usersCollectionId = getUsersCollectionId();

    const users = await adminDatabases.listDocuments<Models.Document>(databaseId, usersCollectionId, []);

    return NextResponse.json({ data: users.documents });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load users";
    return NextResponse.json({ error: message }, { status: getErrorStatus(message) });
  }
}
