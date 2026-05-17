"use client";

import { RoleGate } from "@/components/auth/AuthGate";
import EventForm from "@/components/events/EventForm";

export default function EventCreatePage() {
  return (
    <RoleGate
      allowed={["coordinator", "faculty", "hoi"]}
      fallback={<div className="p-6">Access denied.</div>}
    >
      <div className="min-h-screen bg-background text-on-surface flex items-center justify-center px-6 py-24">
        <EventForm />
      </div>
    </RoleGate>
  );
}
