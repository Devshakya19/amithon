"use client";

import { account } from "@/lib/appwrite/client";

export async function createJwt() {
  const { jwt } = await account.createJWT();
  return jwt;
}
