"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  Calendar,
  ChevronRight,
  Filter,
  Medal,
  MapPin,
  Search,
  SlidersHorizontal,
  TrendingUp,
  X,
} from "lucide-react";
import { useUser } from "@/context/UserProvider";
import { apiGet } from "@/lib/api";
import type { CertificateRecord, EventRecord, NotificationRecord, RegistrationRecord } from "@/lib/types";
import { departments } from "@/lib/departments";
import { getPosterPreviewUrl } from "@/lib/appwrite/storage";
import { formatShortDate, getDepartmentName, getEventStatusMeta } from "@/lib/dashboard";

type LiveRegistrationsResponse = {
  data: RegistrationRecord[];
  total: number;
  events: Record<string, EventRecord>;
};

export default function StudentDashboardPage() {
  const { profile } = useUser();
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [registrationEvents, setRegistrationEvents] = useState<Record<string, EventRecord>>({});
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("grid");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setIsLoading(true);

        const [eventsResp, registrationsResp, certificatesResp, notificationsResp] = await Promise.all([
          apiGet<{ data: EventRecord[]; total: number }>("/api/events?scope=public&limit=100"),
          apiGet<LiveRegistrationsResponse>("/api/registrations?scope=mine&includeEvent=true&limit=100"),
          apiGet<{ data: CertificateRecord[]; total: number }>("/api/certificates"),
          apiGet<{ data: NotificationRecord[]; total: number }>("/api/notifications?limit=10"),
        ]);

        if (!active) return;

        setEvents(eventsResp.data ?? []);
        setRegistrations(registrationsResp.data ?? []);
        setRegistrationEvents(registrationsResp.events ?? {});
        setCertificates(certificatesResp.data ?? []);
        setNotifications(notificationsResp.data ?? []);
      } catch {
        if (active) {
          setEvents([]);
          setRegistrations([]);
          setRegistrationEvents({});
          setCertificates([]);
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

  const featuredEvent = useMemo(
    () => events.find((event) => event.promoted && event.status === "published") ?? events[0] ?? null,
    [events]
  );

  const upcomingEvents = useMemo(
    () =>
      events.filter((event) => {
        const eventDate = new Date(event.dateStart);
        return event.status === "published" && !Number.isNaN(eventDate.getTime()) && eventDate >= new Date();
      }),
    [events]
  );

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesDept = deptFilter === "all" || event.deptId === deptFilter;
      const matchesQuery =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        getDepartmentName(event.deptId).toLowerCase().includes(query);

      return matchesDept && matchesQuery;
    });
  }, [deptFilter, events, search]);

  const agendaItems = useMemo(
    () =>
      registrations
        .map((registration) => ({
          registration,
          event: registrationEvents[registration.eventId],
        }))
        .filter((item) => item.event),
    [registrationEvents, registrations]
  );

  const totalEvents = events.length;
  const totalRegistrations = registrations.length;
  const totalCertificates = certificates.length;
  const unreadNotifications = notifications.filter((notification) => !notification.isRead).length;

  return (
    <div className="min-h-screen bg-background text-on-surface px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] glass-panel p-6 md:p-8 border border-white/10"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
                Student dashboard
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight">
                  Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{profile?.fullName ?? "Student"}</span>
                </h1>
                <p className="max-w-2xl text-sm md:text-base text-on-surface-variant">
                  Browse live events, track your registrations, and keep certificates in one place.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard/my-events" className="h-11 px-5 rounded-xl bg-primary text-on-primary font-semibold inline-flex items-center justify-center gap-2">
                  My events <ChevronRight className="h-4 w-4" />
                </Link>
                <Link href="/dashboard/certificates" className="h-11 px-5 rounded-xl border border-white/10 bg-white/5 font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                  Certificates <Medal className="h-4 w-4" />
                </Link>
                <Link href="/dashboard/notifications" className="h-11 px-5 rounded-xl border border-white/10 bg-white/5 font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                  Notifications {unreadNotifications > 0 ? `(${unreadNotifications})` : ""} <Bell className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:min-w-[420px]">
              <StatPill label="Live events" value={totalEvents} icon={<BookOpen className="h-4 w-4" />} />
              <StatPill label="Registrations" value={totalRegistrations} icon={<Calendar className="h-4 w-4" />} />
              <StatPill label="Certificates" value={totalCertificates} icon={<Medal className="h-4 w-4" />} />
            </div>
          </div>
        </motion.section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-[2rem] p-6 md:p-8"
          >
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-2xl font-bold">Featured event</h2>
                <p className="text-sm text-on-surface-variant">One highlighted live event from Appwrite.</p>
              </div>
              {featuredEvent ? (
                <span className={`text-xs font-semibold uppercase tracking-[0.25em] border rounded-full px-3 py-1 ${getEventStatusMeta(featuredEvent.status).className}`}>
                  {getEventStatusMeta(featuredEvent.status).label}
                </span>
              ) : null}
            </div>

            {featuredEvent ? (
              <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  {featuredEvent.posterFileId ? (
                    <img
                      src={getPosterPreviewUrl(featuredEvent.posterFileId)}
                      alt={featuredEvent.title}
                      className="h-full w-full object-cover min-h-[240px]"
                    />
                  ) : (
                    <div className="min-h-[240px] flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent text-on-surface-variant">
                      Event poster preview
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-2xl font-bold">{featuredEvent.title}</h3>
                    <p className="mt-2 text-sm text-on-surface-variant line-clamp-4">{featuredEvent.description}</p>
                  </div>
                  <div className="grid gap-3 text-sm text-on-surface-variant">
                    <MetaRow icon={<Calendar className="h-4 w-4 text-primary" />} label={formatShortDate(featuredEvent.dateStart)} />
                    <MetaRow icon={<MapPin className="h-4 w-4 text-primary" />} label={featuredEvent.venue} />
                    <MetaRow icon={<TrendingUp className="h-4 w-4 text-primary" />} label={`${featuredEvent.registrationCount ?? 0}/${featuredEvent.registrationLimit ?? "∞"} registrations`} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-on-surface-variant">
                      <span>Registration progress</span>
                      <span>{featuredEvent.registrationCount ?? 0}/{featuredEvent.registrationLimit > 0 ? featuredEvent.registrationLimit : "∞"}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        style={{
                          width:
                            featuredEvent.registrationLimit && featuredEvent.registrationLimit > 0
                              ? `${Math.min(100, Math.round(((featuredEvent.registrationCount ?? 0) / featuredEvent.registrationLimit) * 100))}%`
                              : "14%",
                        }}
                      />
                    </div>
                  </div>

                  <Link href={`/events/${featuredEvent.$id}`} className="h-11 rounded-xl bg-primary text-on-primary font-semibold inline-flex items-center justify-center gap-2">
                    View details <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-on-surface-variant">
                No public events are available yet.
              </div>
            )}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-[2rem] p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Quick actions</h2>
            <div className="space-y-3">
              {[
                { label: "Browse events", desc: "Discover live opportunities", href: "#discover" },
                { label: "My registrations", desc: "Track your registrations", href: "/dashboard/my-events" },
                { label: "Certificates", desc: "Download issued certificates", href: "/dashboard/certificates" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-xs text-on-surface-variant">{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Notifications</h3>
                <span className="text-xs text-on-surface-variant">{unreadNotifications} unread</span>
              </div>
              <div className="space-y-2">
                {notifications.slice(0, 3).map((notification) => (
                  <div key={notification.$id} className={`rounded-xl px-3 py-2 text-sm ${notification.isRead ? "bg-white/5 text-on-surface-variant" : "bg-primary/10 text-on-surface"}`}>
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-xs opacity-80">{notification.body}</div>
                  </div>
                ))}
                {notifications.length === 0 ? <div className="text-sm text-on-surface-variant">No notifications yet.</div> : null}
              </div>
            </div>
          </motion.aside>
        </section>

        <section className="glass-panel rounded-[2rem] p-6 md:p-8" id="agenda">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold">Your agenda</h2>
              <p className="text-sm text-on-surface-variant">Live registrations loaded from Appwrite.</p>
            </div>
            <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
              {(["grid", "timeline"] as const).map((mode) => (
                <button key={mode} onClick={() => setViewMode(mode)} className={`rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${viewMode === mode ? "bg-primary text-on-primary" : "text-on-surface-variant"}`}>
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="text-on-surface-variant">Loading dashboard data...</div>
          ) : agendaItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-on-surface-variant">
              You haven’t registered for any events yet.
            </div>
          ) : viewMode === "timeline" ? (
            <div className="space-y-3">
              {agendaItems.map(({ registration, event }) => (
                <div key={registration.$id} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex flex-col items-center justify-center">
                    <span className="text-sm font-bold">{new Date(registration.createdAt).getDate()}</span>
                    <span className="text-[10px] uppercase">{new Date(registration.createdAt).toLocaleString("en-IN", { month: "short" })}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-semibold truncate">{event.title}</h3>
                        <p className="text-xs text-on-surface-variant">{getDepartmentName(event.deptId)} · {event.venue}</p>
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${getEventStatusMeta(event.status).className}`}>{getEventStatusMeta(event.status).label}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-on-surface-variant">
                      <span>Registered: {formatShortDate(registration.createdAt)}</span>
                      <span>Status: {registration.status}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <Link href={`/events/${event.$id}`} className="text-sm font-semibold text-primary hover:underline">View details</Link>
                      {registration.status === "registered" ? <span className="text-sm text-green-400">Active registration</span> : <span className="text-sm text-red-400">Cancelled</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {agendaItems.map(({ registration, event }) => (
                <div key={registration.$id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-xs text-on-surface-variant mt-1">{getDepartmentName(event.deptId)}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${getEventStatusMeta(event.status).className}`}>{getEventStatusMeta(event.status).label}</span>
                  </div>
                  <div className="mt-4 space-y-1 text-xs text-on-surface-variant">
                    <div>{formatShortDate(event.dateStart)} · {event.venue}</div>
                    <div>Registered on {formatShortDate(registration.createdAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="discover" className="glass-panel rounded-[2rem] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Discover events</h2>
              <p className="text-sm text-on-surface-variant">Search live events across departments.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search events..."
                  className="input-recessed h-11 w-full rounded-xl pl-10 pr-10 text-on-surface"
                />
                {search ? (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    <X className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
              <div className="relative">
                <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
                <select value={deptFilter} onChange={(event) => setDeptFilter(event.target.value)} className="input-recessed h-11 rounded-xl pl-10 pr-10 text-on-surface">
                  <option value="all">All departments</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
                <SlidersHorizontal className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              </div>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-on-surface-variant">
              No events match your filters.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event) => (
                <article key={event.$id} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-primary/30">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent">
                    {event.posterFileId ? (
                      <img src={getPosterPreviewUrl(event.posterFileId)} alt={event.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-on-surface-variant">Poster preview</div>
                    )}
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{event.description}</p>
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${getEventStatusMeta(event.status).className}`}>{getEventStatusMeta(event.status).label}</span>
                    </div>
                    <div className="space-y-1 text-xs text-on-surface-variant">
                      <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> {formatShortDate(event.dateStart)}</div>
                      <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {event.venue}</div>
                      <div>{getDepartmentName(event.deptId)}</div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-on-surface-variant">
                      <span>{event.registrationCount ?? 0}/{event.registrationLimit && event.registrationLimit > 0 ? event.registrationLimit : "∞"} registered</span>
                      {event.promoted ? <span className="text-orange-400 font-semibold uppercase tracking-[0.2em]">Promoted</span> : null}
                    </div>
                    <Link href={`/events/${event.$id}`} className="h-10 rounded-xl bg-primary text-on-primary font-semibold inline-flex items-center justify-center w-full">
                      View details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatPill({ label, value, icon }: { label: string; value: number | string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">{icon}</div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-on-surface-variant">{label}</div>
      </div>
    </div>
  );
}

function MetaRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{label}</span>
    </div>
  );
}