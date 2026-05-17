"use client";

import { ID, Permission, Role } from "appwrite";
import { account, databases } from "@/lib/appwrite/client";
import { getDatabaseId, getUsersCollectionId } from "@/lib/appwrite/constants";

export type UserRole = "student" | "coordinator" | "faculty" | "hoi";

export type UserProfile = {
  userId: string;
  email: string;
  fullName: string;
  studentId: string;
  department: string;
  year: string;
  semester: string;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
};

export async function getCurrentUserProfile() {
  const user = await account.get();
  const databaseId = getDatabaseId();
  const usersCollectionId = getUsersCollectionId();

  return databases.getDocument<any>(databaseId, usersCollectionId, user.$id);
}

export async function ensureCurrentUserProfile() {
  try {
    return await getCurrentUserProfile();
  } catch {
    const user = await account.get();

    return createOrUpdateUserProfile({
      userId: user.$id,
      email: user.email,
      fullName: user.name || user.email.split("@")[0] || "",
      studentId: "",
      department: "",
      year: "",
      semester: "",
      role: "student",
    });
  }
}

export function isProfileComplete(profile: Pick<UserProfile, "fullName" | "studentId" | "department" | "year" | "semester">) {
  return Boolean(profile.fullName && profile.studentId && profile.department && profile.year && profile.semester);
}

export async function createOrUpdateUserProfile(profile: Omit<UserProfile, "createdAt" | "updatedAt">) {
  const databaseId = getDatabaseId();
  const usersCollectionId = getUsersCollectionId();

  try {
    const existing = await databases.getDocument<any>(
      databaseId,
      usersCollectionId,
      profile.userId
    );

    return databases.updateDocument<any>(
      databaseId,
      usersCollectionId,
      profile.userId,
      {
        ...profile,
        createdAt: existing.createdAt,
        updatedAt: new Date().toISOString(),
      }
    );
  } catch {
    return databases.createDocument<any>(
      databaseId,
      usersCollectionId,
      ID.custom(profile.userId),
      {
        ...profile,
        createdAt: new Date().toISOString(),
      },
      [
        Permission.read(Role.user(profile.userId)),
        Permission.update(Role.user(profile.userId)),
        Permission.delete(Role.user(profile.userId)),
      ]
    );
  }
}

export async function updateUserProfile(patch: Partial<UserProfile>) {
  const user = await account.get();
  const databaseId = getDatabaseId();
  const usersCollectionId = getUsersCollectionId();

  return databases.updateDocument<any>(
    databaseId,
    usersCollectionId,
    user.$id,
    {
      ...patch,
      updatedAt: new Date().toISOString(),
    }
  );
}
