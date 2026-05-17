"use client";

import { createJwt } from "@/lib/appwrite/jwt";

async function apiFetch<T>(input: RequestInfo | URL, init: RequestInit = {}) {
  const jwt = await createJwt();
  const headers = new Headers(init.headers);

  headers.set("Authorization", `Bearer ${jwt}`);
  headers.set("Content-Type", "application/json");

  const response = await fetch(input, { ...init, headers });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return (await response.json()) as T;
}

export async function apiGet<T>(url: string) {
  return apiFetch<T>(url, { method: "GET" });
}

export async function apiPost<T>(url: string, body: unknown) {
  return apiFetch<T>(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function apiPatch<T>(url: string, body: unknown) {
  return apiFetch<T>(url, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}
