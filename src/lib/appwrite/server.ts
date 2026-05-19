import { Client, Databases, Storage } from "appwrite";
import { getServerConfig } from "@/lib/appwrite/serverConfig";

const { endpoint, projectId, apiKey } = getServerConfig();

const adminClient = new Client().setEndpoint(endpoint).setProject(projectId);

function hasSetKey(client: Client): client is Client & { setKey: (key: string) => Client } {
  return typeof (client as Client & { setKey?: unknown }).setKey === "function";
}

if (apiKey && hasSetKey(adminClient)) {
  adminClient.setKey(apiKey);
}

const adminDatabases = new Databases(adminClient);
const adminStorage = new Storage(adminClient);

export { adminClient, adminDatabases, adminStorage };
