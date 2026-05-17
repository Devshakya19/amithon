"use client";

import Link from "next/link";
import EventList from "@/components/events/EventList";
import RegistrationList from "@/components/registrations/RegistrationList";
import { useUser } from "@/context/UserProvider";

export default function DashboardPage() {
  const { profile } = useUser();

  if (!profile) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="glass-panel rounded-2xl p-6 flex flex-col gap-2">
        <div className="text-xs uppercase tracking-[0.3em] text-on-surface-variant">Welcome</div>
        <h1 className="text-3xl font-bold">Hi {profile.fullName}</h1>
        <p className="text-on-surface-variant">
          {profile.role === "student"
            ? "Track your registrations and discover new events."
            : "Manage events and stay on top of approvals."}
        </p>
      </section>

      {profile.role === "student" ? (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">My registrations</h2>
            <Link href="/dashboard/my-events" className="text-sm text-primary">
              View all
            </Link>
          </div>
          <RegistrationList scope="mine" showCancel />
        </section>
      ) : (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">My events</h2>
            <Link href="/dashboard/events" className="text-sm text-primary">
              Manage events
            </Link>
          </div>
          <EventList scope="mine" limit={3} />
        </section>
      )}

      {profile.role === "hoi" ? (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Pending approvals</h2>
            <Link href="/dashboard/approvals" className="text-sm text-primary">
              Review approvals
            </Link>
          </div>
          <EventList scope="all" status="pending" limit={3} />
        </section>
      ) : null}
    </div>
  );
}
