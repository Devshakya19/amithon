import type { EventCustomField, EventRecord, NotificationRecord, RegistrationRecord } from "@/lib/types";

function parseJson<T>(value: unknown, fallback: T): T {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return fallback;

    try {
      return JSON.parse(trimmed) as T;
    } catch {
      return fallback;
    }
  }

  if (value && typeof value === "object") {
    return value as T;
  }

  return fallback;
}

export function parseEventCustomFields(value: unknown): EventCustomField[] {
  const parsed = parseJson<unknown>(value, []);

  if (!Array.isArray(parsed)) {
    return [];
  }

  const fields: EventCustomField[] = [];

  for (const item of parsed) {
    if (!item || typeof item !== "object") {
      continue;
    }

    const label = typeof (item as { label?: unknown }).label === "string"
      ? (item as { label: string }).label.trim()
      : "";
    const required = Boolean((item as { required?: unknown }).required);

    if (label) {
      fields.push({ label, required });
    }
  }

  return fields;
}

export function parseCustomData(value: unknown): Record<string, string> {
  const parsed = parseJson<Record<string, unknown>>(value, {});

  if (!parsed || typeof parsed !== "object") {
    return {};
  }

  return Object.entries(parsed).reduce<Record<string, string>>((acc, [key, item]) => {
    if (typeof item === "string") {
      acc[key] = item;
    } else if (item != null) {
      acc[key] = String(item);
    }

    return acc;
  }, {});
}

export function parseMeta(value: unknown): Record<string, unknown> | undefined {
  const parsed = parseJson<Record<string, unknown>>(value, {});
  return Object.keys(parsed).length > 0 ? parsed : undefined;
}

export function normalizeEventDocument(document: any): EventRecord {
  return {
    ...document,
    facultyIds: Array.isArray(document.facultyIds) ? document.facultyIds : [],
    customFields: parseEventCustomFields(document.customFields),
  } as EventRecord;
}

export function normalizeRegistrationDocument(document: any): RegistrationRecord {
  return {
    ...document,
    customData: parseCustomData(document.customData),
  } as RegistrationRecord;
}

export function normalizeNotificationDocument(document: any): NotificationRecord {
  return {
    ...document,
    meta: parseMeta(document.meta),
  } as NotificationRecord;
}

export function serializeEventCustomFields(value: EventCustomField[] | undefined) {
  return value && value.length > 0 ? JSON.stringify(value) : undefined;
}

export function serializeCustomData(value: Record<string, string> | undefined) {
  return value && Object.keys(value).length > 0 ? JSON.stringify(value) : undefined;
}

export function serializeMeta(value: Record<string, unknown> | undefined) {
  return value && Object.keys(value).length > 0 ? JSON.stringify(value) : undefined;
}