import React from "react";
import { apiGet } from "../../../lib/api";
import StatsCard from "../../../components/dashboard/StatsCard";
import EventCard from "../../../components/events/EventCard";

const getData = async () => {
  const [eventsRes, usersRes, registrationsRes, pendingRes] = await Promise.all([
    apiGet("/api/events?scope=all&limit=6"),
    apiGet("/api/admin/users?limit=6"),
    apiGet("/api/registrations?scope=all&limit=6"),
    apiGet("/api/events?status=pending&limit=6"),
  ]);

  return {
    events: eventsRes?.documents ?? [],
    users: usersRes?.users ?? [],
    registrations: registrationsRes?.documents ?? [],
    pending: pendingRes?.documents ?? [],
  };
};

export default async function HOIDashboardPage() {
  const { events, users, registrations, pending } = await getData();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">HOI Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Total Events" value={String(events.length)} />
        <StatsCard title="Total Users" value={String(users.length)} />
        <StatsCard title="Registrations" value={String(registrations.length)} />
      </div>

      <section>
        <h2 className="text-lg font-medium">Pending Approvals</h2>
        <div className="mt-3 grid gap-4">
          {pending.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pending events.</p>
          ) : (
            pending.map((evt: any) => (
              <EventCard key={evt.$id} event={evt} showManage />
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium">Recent Users</h2>
        <div className="mt-3 grid gap-2">
          {users.map((u: any) => (
            <div key={u.$id} className="p-2 border rounded">
              <div className="font-medium">{u.name ?? u.email}</div>
              <div className="text-sm text-muted-foreground">{u.role ?? "student"}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
