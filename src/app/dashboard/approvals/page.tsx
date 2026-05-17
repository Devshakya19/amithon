"use client";

import { useState } from "react";
import { RoleGate } from "@/components/auth/AuthGate";
import EventList from "@/components/events/EventList";
import { apiPost } from "@/lib/api";
import type { EventRecord } from "@/lib/types";

export default function ApprovalsPage() {
  const [selected, setSelected] = useState<EventRecord | null>(null);
  const [message, setMessage] = useState("");

  const approveEvent = async (eventId: string) => {
    setMessage("");

    try {
      await apiPost(`/api/events/${eventId}/publish`, {});
      setMessage("Event approved.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Approval failed.");
    }
  };

  return (
    <RoleGate allowed={["hoi"]} fallback={<div className="p-6">Access denied.</div>}>
      <div className="min-h-screen bg-background text-on-surface px-6 py-24">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">Event approvals</h1>
            <p className="text-on-surface-variant">Review and publish pending events.</p>
          </div>

          {message ? <div className="text-sm text-emerald-400">{message}</div> : null}

          <EventList scope="all" status="pending" />

          <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-lg font-semibold">Quick approve</h2>
            <p className="text-sm text-on-surface-variant">Paste an event ID to approve.</p>
            <div className="flex flex-col md:flex-row gap-3 mt-4">
              <input
                className="input-recessed flex-1 h-12 px-4 rounded-xl text-on-surface"
                placeholder="Event ID"
                value={selected?.$id ?? ""}
                onChange={(event) =>
                  setSelected((prev) => ({
                    ...((prev ?? { $id: "" }) as EventRecord),
                    $id: event.target.value,
                  }))
                }
              />
              <button
                className="h-12 px-6 rounded-xl bg-primary text-on-primary font-semibold"
                onClick={() => selected?.$id && approveEvent(selected.$id)}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </RoleGate>
  );
}
