"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/events/EventCard";
import type { EventRecord } from "@/lib/types";
import { apiGet } from "@/lib/api";

type EventListProps = {
  scope?: "public" | "mine" | "all";
  status?: string;
  query?: string;
  deptId?: string;
  promoted?: boolean;
  page?: number;
  limit?: number;
  onTotal?: (total: number) => void;
};

export default function EventList({
  scope = "public",
  status,
  query,
  deptId,
  promoted,
  page = 1,
  limit = 9,
  onTotal,
}: EventListProps) {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadEvents() {
      try {
        setIsLoading(true);
        setError("");

        const params = new URLSearchParams();
        params.set("scope", scope);
        if (status) {
          params.set("status", status);
        }

        if (query) {
          params.set("query", query);
        }

        if (deptId) {
          params.set("deptId", deptId);
        }

        if (promoted) {
          params.set("promoted", "true");
        }

        params.set("limit", String(limit));
        params.set("offset", String(Math.max(0, page - 1) * limit));

        const url = `/api/events?${params.toString()}`;
        const response = scope === "public"
          ? await fetch(url).then((res) => res.json())
          : await apiGet<{ data: EventRecord[]; total?: number }>(url);

        const list = "data" in response ? response.data : response;
        if ("total" in response && onTotal) {
          onTotal(response.total ?? list.length);
        }

        if (active) {
          setEvents(list as EventRecord[]);
        }
      } catch (err) {
        if (active) {
          setError("Unable to load events.");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      active = false;
    };
  }, [scope, status, query, deptId, promoted, page, limit, onTotal]);

  if (isLoading) {
    return <div className="text-on-surface-variant">Loading events...</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  if (events.length === 0) {
    return <div className="text-on-surface-variant">No events found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.$id} event={event} />
      ))}
    </div>
  );
}
