import { Account, Client, type Models } from "appwrite";
import { adminDatabases } from "@/lib/appwrite/server";
import { getPublicConfig } from "@/lib/appwrite/serverConfig";
import { getDatabaseId, getUsersCollectionId } from "@/lib/appwrite/constants";
import type { UserProfile } from "@/lib/appwrite/users";

const { endpoint, projectId } = getPublicConfig();

function getJwtFromRequest(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match?.[1] ?? "";
}

async function getUserFromJwt(jwt: string) {
  if (!jwt) {
    return null;
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId).setJWT(jwt);
  const account = new Account(client);

  try {
    return await account.get();
  } catch {
    return null;
  }
}

export async function getOptionalProfileFromRequest(
  req: Request
): Promise<UserProfile | null> {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  if (!user) {
    return null;
  }

  const databaseId = getDatabaseId();
  const usersCollectionId = getUsersCollectionId();

  return adminDatabases.getDocument<UserProfile & Models.Document>(databaseId, usersCollectionId, user.$id);
}

export async function requireProfileFromRequest(req: Request): Promise<UserProfile> {
  const profile = await getOptionalProfileFromRequest(req);

  if (!profile) {
    throw new Error("Unauthorized");
  }

  return profile;
}
