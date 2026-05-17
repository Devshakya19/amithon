"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Models } from "appwrite";
import { account } from "@/lib/appwrite/client";
import { ensureCurrentUserProfile, type UserProfile } from "@/lib/appwrite/users";

type UserContextValue = {
  account: Models.User<Models.Preferences> | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [accountUser, setAccountUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUser = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const user = await account.get();
      setAccountUser(user);

      try {
        const profileDoc = await ensureCurrentUserProfile();
        setProfile(profileDoc);
      } catch (err) {
        console.error('Error loading user profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
        setProfile(null);
      }
    } catch {
      setAccountUser(null);
      setProfile(null);
      setError('Not authenticated');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const value = useMemo<UserContextValue>(
    () => ({
      account: accountUser,
      profile,
      isLoading,
      error,
      refresh: loadUser,
      signOut: async () => {
        await account.deleteSession("current");
        setAccountUser(null);
        setProfile(null);
      },
    }),
    [accountUser, profile, isLoading, error]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
