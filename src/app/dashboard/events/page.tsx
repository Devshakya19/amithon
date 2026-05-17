"use client";

import Link from "next/link";
import EventList from "@/components/events/EventList";
import { RoleGate } from "@/components/auth/AuthGate";

export default function DashboardEventsPage() {
  return (
    <RoleGate
      allowed={["coordinator", "faculty", "hoi"]}
      fallback={<div className="p-6">Access denied.</div>}
    >
      <div className="min-h-screen bg-background text-on-surface px-6 py-24">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">My events</h1>
              <p className="text-on-surface-variant">Manage events you created or support.</p>
            </div>
            <Link
              href="/dashboard/events/new"
              className="h-12 px-6 rounded-xl bg-primary text-on-primary font-semibold inline-flex items-center justify-center"
            >
              Create event
            </Link>
          </div>
          <EventList scope="mine" />
        </div>
      </div>
    </RoleGate>
  );
}
