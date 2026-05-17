"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPatch } from "@/lib/api";
import type { EventRecord, RegistrationRecord } from "@/lib/types";

type RegistrationListProps = {
  scope?: "mine" | "event";
  eventId?: string;
  showCancel?: boolean;
  onTotal?: (total: number) => void;
};

export default function RegistrationList({
  scope = "mine",
  eventId,
  showCancel = false,
  onTotal,
}: RegistrationListProps) {
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [events, setEvents] = useState<Record<string, EventRecord>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setIsLoading(true);
        setError("");

        const params = new URLSearchParams();
        params.set("scope", scope);
        params.set("includeEvent", "true");
        if (eventId) {
          params.set("eventId", eventId);
        }

        const response = await apiGet<{
          data: RegistrationRecord[];
          total: number;
          events: Record<string, EventRecord>;
        }>(`/api/registrations?${params.toString()}`);

        if (active) {
          setRegistrations(response.data);
          setEvents(response.events ?? {});
          onTotal?.(response.total ?? response.data.length);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unable to load registrations");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [scope, eventId, onTotal]);

  const cancelRegistration = async (id: string) => {
    await apiPatch(`/api/registrations/${id}`, {});
    setRegistrations((prev) => prev.map((item) => (item.$id === id ? { ...item, status: "cancelled" } : item)));
  };

  if (isLoading) {
    return <div className="text-on-surface-variant">Loading registrations...</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  if (registrations.length === 0) {
    return <div className="text-on-surface-variant">No registrations yet.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {registrations.map((registration) => {
        const event = events[registration.eventId];
        return (
          <div key={registration.$id} className="glass-panel rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-on-surface-variant">Event</div>
                <div className="text-lg font-semibold text-on-surface">
                  {event?.title ?? registration.eventId}
                </div>
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-primary-container">
                {registration.status}
              </span>
            </div>
            <div className="text-xs text-on-surface-variant">
              Registered on {new Date(registration.createdAt).toLocaleString()}
            </div>
            {showCancel && registration.status === "registered" ? (
              <button
                className="h-10 px-4 rounded-xl border border-white/10 text-sm text-on-surface-variant hover:text-on-surface"
                onClick={() => cancelRegistration(registration.$id)}
              >
                Cancel registration
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
