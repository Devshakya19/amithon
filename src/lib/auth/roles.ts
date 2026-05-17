import type { UserRole } from "@/lib/appwrite/users";

export function isRoleAllowed(role: UserRole | null | undefined, allowed: UserRole[]) {
  if (!role) {
    return false;
  }

  return allowed.includes(role);
}
