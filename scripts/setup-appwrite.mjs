import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const envPath = path.join(projectRoot, ".env.local");
const envText = fs.readFileSync(envPath, "utf8");

function parseEnv(text) {
  const env = {};

  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

function upsertEnvLine(text, key, value) {
  const lines = text.split(/\r?\n/);
  const nextLines = [];
  let replaced = false;

  for (const line of lines) {
    if (line.startsWith(`${key}=`)) {
      nextLines.push(`${key}=${value}`);
      replaced = true;
    } else {
      nextLines.push(line);
    }
  }

  if (!replaced) {
    if (nextLines.length && nextLines[nextLines.length - 1].trim() !== "") {
      nextLines.push("");
    }
    nextLines.push(`${key}=${value}`);
  }

  return nextLines.join("\n");
}

function ensureTrailingNewline(text) {
  return text.endsWith("\n") ? text : `${text}\n`;
}

const env = parseEnv(envText);

const endpoint = env.APPWRITE_ENDPOINT || env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId =
  env.APPWRITE_PROJECT_ID || env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || env.NEXT_PUBLIC_APPWRITE_PROJECT;
const apiKey = env.APPWRITE_API_KEY;
const databaseId = env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

const collectionIds = {
  users: env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || "amithon-users",
  events: env.NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID || "amithon-events",
  registrations:
    env.NEXT_PUBLIC_APPWRITE_REGISTRATIONS_COLLECTION_ID || "amithon-registrations",
  notifications:
    env.NEXT_PUBLIC_APPWRITE_NOTIFICATIONS_COLLECTION_ID || "amithon-notifications",
  certificates:
    env.NEXT_PUBLIC_APPWRITE_CERTIFICATES_COLLECTION_ID || "amithon-certificates",
};

const bucketIds = {
  posters:
    env.NEXT_PUBLIC_APPWRITE_POSTERS_BUCKET_ID ||
    env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET ||
    "amithon-posters",
  certificates:
    env.NEXT_PUBLIC_APPWRITE_CERTIFICATES_BUCKET_ID ||
    env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET ||
    "amithon-certificates-bucket",
};

if (!endpoint || !projectId || !apiKey || !databaseId) {
  throw new Error(
    "Missing APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID/NEXT_PUBLIC_APPWRITE_PROJECT, APPWRITE_API_KEY, or NEXT_PUBLIC_APPWRITE_DATABASE_ID in .env.local"
  );
}

const headers = {
  "Content-Type": "application/json",
  "X-Appwrite-Project": projectId,
  "X-Appwrite-Key": apiKey,
  "X-Appwrite-Response-Format": "1.7.0",
};

async function request(method, urlPath, body, expected = [200, 201, 202]) {
  const response = await fetch(`${endpoint}${urlPath}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!expected.includes(response.status)) {
    const text = await response.text();
    const error = new Error(`${method} ${urlPath} -> ${response.status}: ${text}`);
    error.response = response;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function ensureDatabase() {
  try {
    await request("GET", `/databases/${databaseId}`, null, [200]);
    console.log(`Database exists: ${databaseId}`);
  } catch {
    await request("POST", "/databases", {
      databaseId,
      name: "Amithon",
      enabled: true,
    });
    console.log(`Created database: ${databaseId}`);
  }
}

async function ensureCollection(collectionId, name, permissions = []) {
  try {
    await request("GET", `/databases/${databaseId}/collections/${collectionId}`, null, [200]);
    await request("PUT", `/databases/${databaseId}/collections/${collectionId}`, {
      name,
      permissions,
      documentSecurity: true,
      enabled: true,
    });
    console.log(`Collection exists: ${collectionId}`);
  } catch {
    await request("POST", `/databases/${databaseId}/collections`, {
      collectionId,
      name,
      permissions,
      documentSecurity: true,
      enabled: true,
    });
    console.log(`Created collection: ${collectionId}`);
  }
}

async function ensureAttribute(kind, collectionId, key, payload) {
  let attribute = null;

  try {
    attribute = await request(
      "GET",
      `/databases/${databaseId}/collections/${collectionId}/attributes/${key}`,
      null,
      [200]
    );
  } catch {
    attribute = null;
  }

  if (attribute?.status === "available") {
    return;
  }

  if (attribute?.status === "failed") {
    try {
      await request("DELETE", `/databases/${databaseId}/collections/${collectionId}/attributes/${key}`, null, [200, 204]);
    } catch {
      // ignore and recreate below
    }
  }

  if (!attribute || attribute.status === "failed") {
    await request("POST", `/databases/${databaseId}/collections/${collectionId}/attributes/${kind}`, {
      key,
      ...payload,
    });
  }

  await waitForAttribute(collectionId, key);
}

async function ensureIndex(collectionId, key, type, attributes, extra = {}) {
  let index = null;

  try {
    index = await request(
      "GET",
      `/databases/${databaseId}/collections/${collectionId}/indexes/${key}`,
      null,
      [200]
    );
  } catch {
    index = null;
  }

  if (index?.status === "available") {
    return;
  }

  if (index?.status === "failed") {
    try {
      await request("DELETE", `/databases/${databaseId}/collections/${collectionId}/indexes/${key}`, null, [200, 204]);
    } catch {
      // ignore and recreate below
    }
  }

  if (!index || index.status === "failed") {
    await request("POST", `/databases/${databaseId}/collections/${collectionId}/indexes`, {
      key,
      type,
      attributes,
      orders: extra.orders ?? [],
      lengths: extra.lengths ?? [],
    });
  }

  await waitForIndex(collectionId, key);
}

async function ensureBucket(bucketId, name, maximumFileSize, allowedFileExtensions, fileSecurity = false) {
  try {
    await request("GET", `/storage/buckets/${bucketId}`, null, [200]);
    await request("PUT", `/storage/buckets/${bucketId}`, {
      name,
      permissions: ["read(\"any\")"],
      fileSecurity,
      enabled: true,
      maximumFileSize,
      allowedFileExtensions,
      compression: "none",
      encryption: false,
      antivirus: false,
    });
    console.log(`Bucket exists: ${bucketId}`);
  } catch {
    await request("POST", "/storage/buckets", {
      bucketId,
      name,
      permissions: ["read(\"any\")"],
      fileSecurity,
      enabled: true,
      maximumFileSize,
      allowedFileExtensions,
      compression: "none",
      encryption: false,
      antivirus: false,
    });
    console.log(`Created bucket: ${bucketId}`);
  }
}

async function waitForAttribute(collectionId, key, timeoutMs = 120000) {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    try {
      const attr = await request(
        "GET",
        `/databases/${databaseId}/collections/${collectionId}/attributes/${key}`,
        null,
        [200]
      );

      if (!attr || attr.status === "available") {
        return;
      }
    } catch {
      // keep waiting
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  throw new Error(`Timed out waiting for ${collectionId}.${key}`);
}

async function waitForIndex(collectionId, key, timeoutMs = 120000) {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    try {
      const index = await request(
        "GET",
        `/databases/${databaseId}/collections/${collectionId}/indexes/${key}`,
        null,
        [200]
      );

      if (!index || index.status === "available") {
        return;
      }
    } catch {
      // keep waiting
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  throw new Error(`Timed out waiting for index ${collectionId}.${key}`);
}

async function main() {
  console.log("Setting up Appwrite resources...");

  await ensureDatabase();

  await ensureCollection(collectionIds.users, "Users", ["create(\"users\")"]);
  await ensureAttribute("string", collectionIds.users, "userId", { size: 128, required: true, array: false });
  await ensureAttribute("email", collectionIds.users, "email", { required: true, array: false });
  await ensureAttribute("string", collectionIds.users, "fullName", { size: 128, required: true, array: false });
  await ensureAttribute("string", collectionIds.users, "studentId", { size: 64, required: true, array: false });
  await ensureAttribute("string", collectionIds.users, "department", { size: 128, required: true, array: false });
  await ensureAttribute("string", collectionIds.users, "year", { size: 32, required: true, array: false });
  await ensureAttribute("string", collectionIds.users, "semester", { size: 32, required: true, array: false });
  await ensureAttribute("enum", collectionIds.users, "role", {
    elements: ["student", "coordinator", "faculty", "hoi"],
    required: true,
    array: false,
  });
  await ensureAttribute("url", collectionIds.users, "profilePic", { required: false, array: false });
  await ensureAttribute("datetime", collectionIds.users, "createdAt", { required: true, array: false });
  await ensureAttribute("datetime", collectionIds.users, "updatedAt", { required: false, array: false });
  await Promise.all(
    ["userId", "email", "studentId", "role", "createdAt"].map((key) =>
      waitForAttribute(collectionIds.users, key)
    )
  );
  await ensureIndex(collectionIds.users, "users_userId_unique", "unique", ["userId"]);
  await ensureIndex(collectionIds.users, "users_email_unique", "unique", ["email"]);
  await ensureIndex(collectionIds.users, "users_studentId_unique", "unique", ["studentId"]);

  await ensureCollection(collectionIds.events, "Events");
  await ensureAttribute("string", collectionIds.events, "title", { size: 200, required: true, array: false });
  await ensureAttribute("string", collectionIds.events, "description", { size: 5000, required: true, array: false });
  await ensureAttribute("string", collectionIds.events, "deptId", { size: 64, required: true, array: false });
  await ensureAttribute("string", collectionIds.events, "coordinatorId", { size: 128, required: true, array: false });
  await ensureAttribute("string", collectionIds.events, "facultyIds", { size: 128, required: false, array: true });
  await ensureAttribute("datetime", collectionIds.events, "dateStart", { required: true, array: false });
  await ensureAttribute("datetime", collectionIds.events, "dateEnd", { required: true, array: false });
  await ensureAttribute("string", collectionIds.events, "venue", { size: 200, required: true, array: false });
  await ensureAttribute("string", collectionIds.events, "posterFileId", { size: 128, required: false, array: false });
  await ensureAttribute("integer", collectionIds.events, "registrationLimit", { required: false, default: 0, min: 0, max: 100000, array: false });
  await ensureAttribute("integer", collectionIds.events, "registrationCount", { required: false, default: 0, min: 0, max: 100000, array: false });
  await ensureAttribute("string", collectionIds.events, "customFields", { size: 8000, required: false, array: false });
  await ensureAttribute("enum", collectionIds.events, "status", {
    elements: ["draft", "pending", "published", "completed", "cancelled"],
    required: true,
    array: false,
  });
  await ensureAttribute("boolean", collectionIds.events, "promoted", { required: false, default: false, array: false });
  await ensureAttribute("datetime", collectionIds.events, "createdAt", { required: true, array: false });
  await ensureAttribute("datetime", collectionIds.events, "updatedAt", { required: false, array: false });
  await Promise.all(
    [
      "title",
      "deptId",
      "coordinatorId",
      "dateStart",
      "dateEnd",
      "venue",
      "registrationLimit",
      "registrationCount",
      "status",
      "createdAt",
    ].map((key) => waitForAttribute(collectionIds.events, key))
  );
  await ensureIndex(collectionIds.events, "events_status_idx", "key", ["status"]);
  await ensureIndex(collectionIds.events, "events_deptId_idx", "key", ["deptId"]);
  await ensureIndex(collectionIds.events, "events_coordinatorId_idx", "key", ["coordinatorId"]);
  await ensureIndex(collectionIds.events, "events_promoted_idx", "key", ["promoted"]);
  await ensureIndex(collectionIds.events, "events_dateStart_idx", "key", ["dateStart"]);
  await ensureIndex(collectionIds.events, "events_title_search", "fulltext", ["title", "description"]);

  await ensureCollection(collectionIds.registrations, "Registrations");
  await ensureAttribute("string", collectionIds.registrations, "eventId", { size: 128, required: true, array: false });
  await ensureAttribute("string", collectionIds.registrations, "userId", { size: 128, required: true, array: false });
  await ensureAttribute("string", collectionIds.registrations, "fullName", { size: 128, required: true, array: false });
  await ensureAttribute("email", collectionIds.registrations, "email", { required: true, array: false });
  await ensureAttribute("string", collectionIds.registrations, "studentId", { size: 64, required: true, array: false });
  await ensureAttribute("string", collectionIds.registrations, "department", { size: 128, required: true, array: false });
  await ensureAttribute("string", collectionIds.registrations, "year", { size: 32, required: true, array: false });
  await ensureAttribute("string", collectionIds.registrations, "semester", { size: 32, required: true, array: false });
  await ensureAttribute("enum", collectionIds.registrations, "status", {
    elements: ["registered", "cancelled"],
    required: true,
    array: false,
  });
  await ensureAttribute("string", collectionIds.registrations, "customData", { size: 8000, required: false, array: false });
  await ensureAttribute("datetime", collectionIds.registrations, "createdAt", { required: true, array: false });
  await Promise.all(
    ["eventId", "userId", "status", "createdAt"].map((key) =>
      waitForAttribute(collectionIds.registrations, key)
    )
  );
  await ensureIndex(collectionIds.registrations, "reg_evt_user_stat_uq", "unique", ["eventId", "userId", "status"]);
  await ensureIndex(collectionIds.registrations, "registrations_event_idx", "key", ["eventId"]);
  await ensureIndex(collectionIds.registrations, "registrations_user_idx", "key", ["userId"]);
  await ensureIndex(collectionIds.registrations, "registrations_status_idx", "key", ["status"]);

  await ensureCollection(collectionIds.notifications, "Notifications");
  await ensureAttribute("string", collectionIds.notifications, "userId", { size: 128, required: true, array: false });
  await ensureAttribute("string", collectionIds.notifications, "title", { size: 200, required: true, array: false });
  await ensureAttribute("string", collectionIds.notifications, "body", { size: 4000, required: true, array: false });
  await ensureAttribute("string", collectionIds.notifications, "type", { size: 64, required: true, array: false });
  await ensureAttribute("boolean", collectionIds.notifications, "isRead", { required: false, default: false, array: false });
  await ensureAttribute("string", collectionIds.notifications, "meta", { size: 8000, required: false, array: false });
  await ensureAttribute("datetime", collectionIds.notifications, "createdAt", { required: true, array: false });
  await Promise.all(
    ["userId", "isRead", "createdAt"].map((key) =>
      waitForAttribute(collectionIds.notifications, key)
    )
  );
  await ensureIndex(collectionIds.notifications, "notifications_user_idx", "key", ["userId"]);
  await ensureIndex(collectionIds.notifications, "notifs_user_read_idx", "key", ["userId", "isRead"]);
  await ensureIndex(collectionIds.notifications, "notifs_createdAt_idx", "key", ["createdAt"]);

  await ensureCollection(collectionIds.certificates, "Certificates");
  await ensureAttribute("string", collectionIds.certificates, "eventId", { size: 128, required: true, array: false });
  await ensureAttribute("string", collectionIds.certificates, "userId", { size: 128, required: true, array: false });
  await ensureAttribute("string", collectionIds.certificates, "fileId", { size: 128, required: true, array: false });
  await ensureAttribute("datetime", collectionIds.certificates, "issuedAt", { required: true, array: false });
  await Promise.all(
    ["eventId", "userId", "fileId", "issuedAt"].map((key) =>
      waitForAttribute(collectionIds.certificates, key)
    )
  );
  await ensureIndex(collectionIds.certificates, "cert_evt_user_uq", "unique", ["eventId", "userId"]);
  await ensureIndex(collectionIds.certificates, "cert_evt_idx", "key", ["eventId"]);
  await ensureIndex(collectionIds.certificates, "cert_user_idx", "key", ["userId"]);

  await ensureBucket(bucketIds.posters, "Posters", 5 * 1024 * 1024, ["jpg", "jpeg", "png", "webp"], false);
  await ensureBucket(bucketIds.certificates, "Certificates", 10 * 1024 * 1024, ["pdf"], false);

  const nextEnv = [
    ["APPWRITE_ENDPOINT", env.APPWRITE_ENDPOINT || endpoint],
    ["APPWRITE_PROJECT_ID", projectId],
    ["NEXT_PUBLIC_APPWRITE_ENDPOINT", endpoint],
    ["NEXT_PUBLIC_APPWRITE_PROJECT_ID", projectId],
    ["NEXT_PUBLIC_APPWRITE_DATABASE_ID", databaseId],
    ["NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID", collectionIds.users],
    ["NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID", collectionIds.events],
    ["NEXT_PUBLIC_APPWRITE_REGISTRATIONS_COLLECTION_ID", collectionIds.registrations],
    ["NEXT_PUBLIC_APPWRITE_NOTIFICATIONS_COLLECTION_ID", collectionIds.notifications],
    ["NEXT_PUBLIC_APPWRITE_CERTIFICATES_COLLECTION_ID", collectionIds.certificates],
    ["NEXT_PUBLIC_APPWRITE_POSTERS_BUCKET_ID", bucketIds.posters],
    ["NEXT_PUBLIC_APPWRITE_CERTIFICATES_BUCKET_ID", bucketIds.certificates],
    ["NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET", bucketIds.posters],
    ["NEXT_PUBLIC_APPWRITE_PROJECT", projectId],
  ];

  let updatedEnv = envText;
  for (const [key, value] of nextEnv) {
    updatedEnv = upsertEnvLine(updatedEnv, key, value);
  }

  fs.writeFileSync(envPath, ensureTrailingNewline(updatedEnv), "utf8");

  console.log("Appwrite setup complete.");
  console.log(`Database: ${databaseId}`);
  console.log(`Users collection: ${collectionIds.users}`);
  console.log(`Events collection: ${collectionIds.events}`);
  console.log(`Registrations collection: ${collectionIds.registrations}`);
  console.log(`Notifications collection: ${collectionIds.notifications}`);
  console.log(`Certificates collection: ${collectionIds.certificates}`);
  console.log(`Posters bucket: ${bucketIds.posters}`);
  console.log(`Certificates bucket: ${bucketIds.certificates}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});