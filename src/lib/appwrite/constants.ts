const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "";
const usersCollectionId = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID ?? "";
const eventsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID ?? "";
const registrationsCollectionId =
  process.env.NEXT_PUBLIC_APPWRITE_REGISTRATIONS_COLLECTION_ID ?? "";
const notificationsCollectionId =
  process.env.NEXT_PUBLIC_APPWRITE_NOTIFICATIONS_COLLECTION_ID ?? "";
const certificatesCollectionId =
  process.env.NEXT_PUBLIC_APPWRITE_CERTIFICATES_COLLECTION_ID ?? "";
const postersBucketId =
  process.env.NEXT_PUBLIC_APPWRITE_POSTERS_BUCKET_ID ?? process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET ?? "";
const certificatesBucketId =
  process.env.NEXT_PUBLIC_APPWRITE_CERTIFICATES_BUCKET_ID ??
  process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET ??
  "";

function requireEnv(value: string, name: string) {
  if (!value) {
    throw new Error(`${name} is not set. Add it to your environment variables.`);
  }

  return value;
}

export function getDatabaseId() {
  return requireEnv(databaseId, "NEXT_PUBLIC_APPWRITE_DATABASE_ID");
}

export function getUsersCollectionId() {
  return requireEnv(usersCollectionId, "NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID");
}

export function getEventsCollectionId() {
  return requireEnv(eventsCollectionId, "NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID");
}

export function getRegistrationsCollectionId() {
  return requireEnv(
    registrationsCollectionId,
    "NEXT_PUBLIC_APPWRITE_REGISTRATIONS_COLLECTION_ID"
  );
}

export function getNotificationsCollectionId() {
  return requireEnv(
    notificationsCollectionId,
    "NEXT_PUBLIC_APPWRITE_NOTIFICATIONS_COLLECTION_ID"
  );
}

export function getCertificatesCollectionId() {
  return requireEnv(
    certificatesCollectionId,
    "NEXT_PUBLIC_APPWRITE_CERTIFICATES_COLLECTION_ID"
  );
}

export function getPostersBucketId() {
  return requireEnv(postersBucketId, "NEXT_PUBLIC_APPWRITE_POSTERS_BUCKET_ID");
}

export function getCertificatesBucketId() {
  return requireEnv(
    certificatesBucketId,
    "NEXT_PUBLIC_APPWRITE_CERTIFICATES_BUCKET_ID"
  );
}
