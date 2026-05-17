"use client";

import type { ReactNode } from "react";
import { useUser } from "@/context/UserProvider";
import { isRoleAllowed } from "@/lib/auth/roles";
import type { UserRole } from "@/lib/appwrite/users";

type GateProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type RoleGateProps = GateProps & {
  allowed: UserRole[];
};

export function AuthGate({ children, fallback = null }: GateProps) {
  const { account, isLoading } = useUser();

  if (isLoading) {
    return fallback;
  }

  if (!account) {
    return fallback;
  }

  return <>{children}</>;
}

export function RoleGate({ allowed, children, fallback = null }: RoleGateProps) {
  const { profile, isLoading } = useUser();

  if (isLoading) {
    return fallback;
  }

  if (!profile || !isRoleAllowed(profile.role, allowed)) {
    return fallback;
  }

  return <>{children}</>;
}
