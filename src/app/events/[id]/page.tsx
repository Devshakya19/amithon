"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RegistrationForm from "@/components/events/RegistrationForm";
import type { EventRecord } from "@/lib/types";

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params?.id as string;
  const [event, setEvent] = useState<EventRecord | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadEvent() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/events/${eventId}`);
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error ?? "Failed to load event");
        }

        if (active) {
          setEvent(payload.data as EventRecord);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unable to load event.");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    if (eventId) {
      loadEvent();
    }

    return () => {
      active = false;
    };
  }, [eventId]);

  if (isLoading) {
    return <div className="min-h-screen bg-background text-on-surface p-6">Loading...</div>;
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-background text-on-surface p-6">
        {error || "Event not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface px-6 py-24">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary-container">{event.status}</div>
            <h1 className="text-4xl font-bold mt-2">{event.title}</h1>
            <p className="text-on-surface-variant mt-4 leading-relaxed">{event.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-on-surface-variant">
            <div className="glass-panel p-4 rounded-xl">
              <div className="text-xs uppercase tracking-widest">Venue</div>
              <div className="mt-2 text-on-surface">{event.venue}</div>
            </div>
            <div className="glass-panel p-4 rounded-xl">
              <div className="text-xs uppercase tracking-widest">Dates</div>
              <div className="mt-2 text-on-surface">
                {new Date(event.dateStart).toLocaleString()} -
                {" "}{new Date(event.dateEnd).toLocaleString()}
              </div>
            </div>
            <div className="glass-panel p-4 rounded-xl">
              <div className="text-xs uppercase tracking-widest">Registrations</div>
              <div className="mt-2 text-on-surface">
                {event.registrationCount ?? 0} / {event.registrationLimit || "∞"}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <RegistrationForm event={event} />
        </div>
      </div>
    </div>
  );
}
