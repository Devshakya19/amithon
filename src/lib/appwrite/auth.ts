"use client";

import { ID, OAuthProvider } from "appwrite";
import { account } from "@/lib/appwrite/client";
import { createOrUpdateUserProfile } from "@/lib/appwrite/users";

function getOAuthUrls() {
  if (typeof window === "undefined") {
    return { successUrl: "", failureUrl: "" };
  }

  const origin = window.location.origin;
  const successUrl =
    process.env.NEXT_PUBLIC_APPWRITE_OAUTH_SUCCESS_URL ?? `${origin}/`;
  const failureUrl =
    process.env.NEXT_PUBLIC_APPWRITE_OAUTH_FAILURE_URL ?? `${origin}/login?error=oauth`;

  return { successUrl, failureUrl };
}

export async function loginWithEmail(email: string, password: string) {
  const maxRetries = 3;
  let attempt = 0;
  let lastError: any = null;

  while (attempt < maxRetries) {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (err) {
      lastError = err;
      const msg = (err && (err as any).message) || '';

      // Handle active-session case by deleting current session and retrying immediately
      if (msg.includes('Creation of a session is prohibited') || msg.includes('session is active')) {
        try {
          await account.deleteSession('current');
          // retry once immediately
          return await account.createEmailPasswordSession(email, password);
        } catch (retryErr) {
          throw retryErr;
        }
      }

      // Handle rate limit: exponential backoff
      if (msg.toLowerCase().includes('rate limit')) {
        attempt++;
        const delay = Math.min(5000, 500 * Math.pow(2, attempt));
        await new Promise((res) => setTimeout(res, delay));
        continue; // retry
      }

      throw err;
    }
  }

  throw lastError;
}

export async function registerWithEmail(params: {
  email: string;
  password: string;
  name: string;
  studentId: string;
  department?: string;
  year?: string;
  semester?: string;
}) {
  const { email, password, name, studentId, department, year, semester } = params;

  // Create account
  await account.create(ID.unique(), email, password, name);

  // Create session
  // Create session with retry/backoff on rate limit
  const maxRetries = 3;
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      await account.createEmailPasswordSession(email, password);
      break;
    } catch (err) {
      const msg = (err && (err as any).message) || '';
      if (msg.includes('Creation of a session is prohibited') || msg.includes('session is active')) {
        try {
          await account.deleteSession('current');
          await account.createEmailPasswordSession(email, password);
          break;
        } catch (retryErr) {
          throw retryErr;
        }
      }

      if (msg.toLowerCase().includes('rate limit')) {
        attempt++;
        const delay = Math.min(5000, 500 * Math.pow(2, attempt));
        await new Promise((res) => setTimeout(res, delay));
        continue;
      }

      throw err;
    }
  }

  const user = await account.get();

  await createOrUpdateUserProfile({
    userId: user.$id,
    email,
    fullName: name,
    studentId,
    department: department ?? "",
    year: year ?? "",
    semester: semester ?? "",
    role: "student",
  });
}

export function loginWithGoogle() {
  const { successUrl, failureUrl } = getOAuthUrls();
  return account.createOAuth2Session(OAuthProvider.Google, successUrl, failureUrl);
}
