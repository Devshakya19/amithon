"use client";

import { ID, OAuthProvider } from "appwrite";
import { account } from "@/lib/appwrite/client";
import { createOrUpdateUserProfile } from "@/lib/appwrite/users";

function safeRedirectUrl(value: string | undefined, fallback: string) {
  if (!value) {
    return fallback;
  }

  try {
    const url = new URL(value);
    if (typeof window !== "undefined" && url.origin !== window.location.origin) {
      return fallback;
    }

    return url.toString();
  } catch {
    return fallback;
  }
}

function getOAuthUrls() {
  if (typeof window === "undefined") {
    return { successUrl: "", failureUrl: "" };
  }

  const origin = window.location.origin;
  const successUrl = safeRedirectUrl(
    process.env.NEXT_PUBLIC_APPWRITE_OAUTH_SUCCESS_URL,
    `${origin}/`
  );
  const failureUrl = safeRedirectUrl(
    process.env.NEXT_PUBLIC_APPWRITE_OAUTH_FAILURE_URL,
    `${origin}/login?error=oauth`
  );

  return { successUrl, failureUrl };
}

type AppwriteSessionError = {
  message?: string;
};

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as AppwriteSessionError).message ?? "");
  }

  return "";
}

function isSessionConflict(message: string) {
  return message.includes("Creation of a session is prohibited") || message.includes("session is active");
}

function isRateLimit(message: string) {
  return message.toLowerCase().includes("rate limit");
}

export async function loginWithEmail(email: string, password: string) {
  const maxRetries = 3;
  let attempt = 0;
  let lastError: unknown = null;

  while (attempt < maxRetries) {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      lastError = error;
      const message = getErrorMessage(error);

      if (isSessionConflict(message)) {
        try {
          await account.deleteSession("current");
          return await account.createEmailPasswordSession(email, password);
        } catch (retryError) {
          throw retryError;
        }
      }

      if (isRateLimit(message)) {
        attempt += 1;
        const delay = Math.min(5000, 500 * Math.pow(2, attempt));
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      throw error;
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

  // Basic password strength enforcement
  if (typeof password !== "string" || password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    throw new Error("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    throw new Error("Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    throw new Error("Password must contain at least one number");
  }

  await account.create(ID.unique(), email, password, name);

  const maxRetries = 3;
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      await account.createEmailPasswordSession(email, password);
      break;
    } catch (error) {
      const message = getErrorMessage(error);

      if (isSessionConflict(message)) {
        try {
          await account.deleteSession("current");
          await account.createEmailPasswordSession(email, password);
          break;
        } catch (retryError) {
          throw retryError;
        }
      }

      if (isRateLimit(message)) {
        attempt += 1;
        const delay = Math.min(5000, 500 * Math.pow(2, attempt));
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      throw error;
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
