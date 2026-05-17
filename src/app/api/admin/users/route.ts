import { NextResponse } from "next/server";
import { adminDatabases } from "@/lib/appwrite/server";
import { getDatabaseId, getUsersCollectionId } from "@/lib/appwrite/constants";
import { requireProfileFromRequest } from "@/lib/auth/server";

export async function GET(req: Request) {
  try {
    const profile = await requireProfileFromRequest(req);

    if (profile.role !== "hoi") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const databaseId = getDatabaseId();
    const usersCollectionId = getUsersCollectionId();

    const users = await adminDatabases.listDocuments<any>(databaseId, usersCollectionId, []);

    return NextResponse.json({ data: users.documents });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load users";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
