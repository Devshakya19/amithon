const endpoint =
  process.env.APPWRITE_ENDPOINT ?? process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "";
const projectId =
  process.env.APPWRITE_PROJECT_ID ??
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ??
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT ??
  "";
const apiKey = process.env.APPWRITE_API_KEY ?? "";

export function getServerConfig() {
  return {
    endpoint,
    projectId,
    apiKey,
  };
}

export function getPublicConfig() {
  return {
    endpoint,
    projectId,
  };
}
