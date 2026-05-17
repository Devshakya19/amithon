import { Client, Databases, Storage } from "appwrite";
import { getServerConfig } from "@/lib/appwrite/serverConfig";

const { endpoint, projectId, apiKey } = getServerConfig();

const adminClient = new Client().setEndpoint(endpoint).setProject(projectId);

// Some Appwrite SDK versions may not expose setKey; guard the call.
if (apiKey && typeof (adminClient as any).setKey === "function") {
  (adminClient as any).setKey(apiKey);
}

const adminDatabases = new Databases(adminClient);
const adminStorage = new Storage(adminClient);

export { adminClient, adminDatabases, adminStorage };
