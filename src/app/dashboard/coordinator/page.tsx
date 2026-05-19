"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Calendar, Clock3, Plus, Settings, Sparkles, TrendingUp } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import StatsCard from "@/components/dashboard/StatsCard";
import { RoleGate } from "@/components/auth/AuthGate";
import { useUser } from "@/context/UserProvider";
import { apiGet } from "@/lib/api";
import type { EventRecord, NotificationRecord, RegistrationRecord } from "@/lib/types";
import { formatDateTime, formatRelativeTime, getEventStatusMeta } from "@/lib/dashboard";

type RegistrationsResponse = {
  data: RegistrationRecord[];
  total: number;
  events: Record<string, EventRecord>;
};

export default function CoordinatorDashboard() {
  const { profile } = useUser();
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setIsLoading(true);

        const [eventsResp, registrationsResp, notificationsResp] = await Promise.all([
          apiGet<{ data: EventRecord[]; total: number }>("/api/events?scope=mine&limit=100"),
          apiGet<RegistrationsResponse>("/api/registrations?scope=mine&includeEvent=true&limit=100"),
          apiGet<{ data: NotificationRecord[]; total: number }>("/api/notifications?limit=10"),
        ]);

        if (!active) return;

        setEvents(eventsResp.data ?? []);
        setRegistrations(registrationsResp.data ?? []);
        setNotifications(notificationsResp.data ?? []);
      } catch {
        if (active) {
          setEvents([]);
          setRegistrations([]);
          setNotifications([]);
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
  }, []);

  const statusCounts = useMemo(
    () => ({
      draft: events.filter((event) => event.status === "draft").length,
      pending: events.filter((event) => event.status === "pending").length,
      published: events.filter((event) => event.status === "published").length,
      completed: events.filter((event) => event.status === "completed").length,
      cancelled: events.filter((event) => event.status === "cancelled").length,
    }),
    [events]
  );

  const upcomingEvents = useMemo(
    () =>
      events.filter((event) => {
        const date = new Date(event.dateStart);
        return event.status === "published" && !Number.isNaN(date.getTime()) && date >= new Date();
      }),
    [events]
  );

  const liveEvents = events.filter((event) => event.status === "published");
  const totalRegistrations = registrations.length;
  const todayEvent = upcomingEvents[0] ?? liveEvents[0] ?? events[0] ?? null;

  return (
    <RoleGate allowed={["coordinator"]}>
      <div className="min-h-screen bg-background text-on-surface px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-[2rem] p-6 md:p-8 border border-white/10 relative overflow-hidden"
          >
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Event command center
                </div>
                <div>
                  <h1 className="text-3xl md:text-5xl font-black tracking-tight">Coordinator dashboard</h1>
                  <p className="mt-2 text-sm md:text-base text-on-surface-variant">
                    Welcome, {profile?.fullName ?? "Coordinator"}. Manage events, registrations, and certificates from live Appwrite data.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/dashboard/events/new" className="h-11 px-5 rounded-xl bg-primary text-on-primary font-semibold inline-flex items-center justify-center gap-2">
                    <Plus className="h-4 w-4" /> Create event
                  </Link>
                  <Link href="/dashboard/events" className="h-11 px-5 rounded-xl border border-white/10 bg-white/5 font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                    <BarChart3 className="h-4 w-4" /> Manage events
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:min-w-[560px]">
                <StatsCard icon={<BarChart3 className="h-5 w-5" />} label="Total events" value={events.length} description="Owned or supported" />
                <StatsCard icon={<TrendingUp className="h-5 w-5" />} label="Live events" value={liveEvents.length} description={`${upcomingEvents.length} upcoming`} />
                <StatsCard icon={<Calendar className="h-5 w-5" />} label="Registrations" value={totalRegistrations} description="Loaded from Appwrite" />
                <StatsCard icon={<Clock3 className="h-5 w-5" />} label="Today" value={todayEvent ? formatDateTime(todayEvent.dateStart) : "-"} description={todayEvent?.title ?? "No event today"} />
              </div>
            </div>
          </motion.section>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[2rem] p-6 md:p-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-bold">Event status overview</h2>
                  <p className="text-sm text-on-surface-variant">Distribution of your live Appwrite events.</p>
                </div>
                <Settings className="h-5 w-5 text-on-surface-variant" />
              </div>

              <div className="space-y-4">
                {(["draft", "pending", "published", "completed", "cancelled"] as const).map((status) => {
                  const meta = getEventStatusMeta(status);
                  const count = statusCounts[status];
                  const width = events.length ? Math.max(8, Math.round((count / events.length) * 100)) : 8;
                  return (
                    <button key={status} className="w-full text-left group">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-semibold">{meta.label}</span>
                        <span className="text-on-surface-variant">{count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className={`h-full rounded-full ${status === "published" ? "bg-emerald-500" : status === "pending" ? "bg-amber-500" : status === "completed" ? "bg-blue-500" : status === "cancelled" ? "bg-red-500" : "bg-slate-500"}`} style={{ width: `${width}%` }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[2rem] p-6 md:p-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-bold">Quick actions</h2>
                  <p className="text-sm text-on-surface-variant">Fast navigation to common coordinator tasks.</p>
                </div>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-3">
                {[
                  { label: "View my events", href: "/dashboard/events" },
                  { label: "Create new event", href: "/dashboard/events/new" },
                  { label: "View registrations", href: "/dashboard/my-events" },
                  { label: "Upload certificates", href: "/dashboard/certificates" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 hover:bg-white/10 transition-colors">
                    <span className="font-semibold">{item.label}</span>
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="font-semibold mb-3">Recent activity</h3>
                <div className="space-y-3">
                  {notifications.slice(0, 4).map((notification) => (
                    <div key={notification.$id} className="rounded-xl bg-white/5 px-3 py-2">
                      <div className="font-medium text-sm">{notification.title}</div>
                      <div className="text-xs text-on-surface-variant">{notification.body}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">{formatRelativeTime(notification.createdAt)}</div>
                    </div>
                  ))}
                  {notifications.length === 0 ? <div className="text-sm text-on-surface-variant">No activity yet.</div> : null}
                </div>
              </div>
            </motion.div>
          </section>

          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[2rem] p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
              <div>
                <h2 className="text-2xl font-bold">My events</h2>
                <p className="text-sm text-on-surface-variant">Loaded directly from the Appwrite events API.</p>
              </div>
              <Link href="/dashboard/events" className="text-sm font-semibold text-primary hover:underline">
                View all events
              </Link>
            </div>

            {isLoading ? (
              <div className="text-on-surface-variant">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-on-surface-variant">
                No events yet. Create your first event to get started.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {events.slice(0, 6).map((event) => (
                  <div key={event.$id} className="rounded-[1.5rem] border border-white/10 bg-white/5 overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                          <h3 className="font-semibold line-clamp-1">{event.title}</h3>
                          <p className="text-xs text-on-surface-variant">{formatDateTime(event.dateStart)}</p>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${getEventStatusMeta(event.status).className}`}>
                          {getEventStatusMeta(event.status).label}
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant line-clamp-3">{event.description}</p>
                    </div>
                    <div className="px-4 pb-4 flex items-center justify-between text-xs text-on-surface-variant">
                      <span>{event.venue}</span>
                      <span>{event.registrationCount ?? 0}/{event.registrationLimit && event.registrationLimit > 0 ? event.registrationLimit : "∞"}</span>
                    </div>
                    <div className="px-4 pb-4 flex gap-2">
                      <Link href={`/dashboard/events/${event.$id}`} className="flex-1 h-10 rounded-xl bg-primary text-on-primary font-semibold inline-flex items-center justify-center">
                        Manage
                      </Link>
                      <Link href={`/dashboard/events/${event.$id}/edit`} className="h-10 px-4 rounded-xl border border-white/10 bg-white/5 font-semibold inline-flex items-center justify-center hover:bg-white/10">
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 0 }} className="hidden" />
        </div>
      </div>
    </RoleGate>
  );
}