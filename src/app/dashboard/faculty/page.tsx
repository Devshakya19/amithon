"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, ClipboardList, Search, Sparkles, Users } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { RoleGate } from "@/components/auth/AuthGate";
import { useUser } from "@/context/UserProvider";
import { apiGet } from "@/lib/api";
import type { CertificateRecord, EventRecord, RegistrationRecord } from "@/lib/types";
import { formatShortDate, getDepartmentName, getEventStatusMeta } from "@/lib/dashboard";

type RegistrationsResponse = {
  data: RegistrationRecord[];
  total: number;
  events: Record<string, EventRecord>;
};

export default function FacultyDashboard() {
  const { profile } = useUser();
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setIsLoading(true);
        const [eventsResp, registrationsResp] = await Promise.all([
          apiGet<{ data: EventRecord[]; total: number }>("/api/events?scope=mine&limit=100"),
          apiGet<RegistrationsResponse>("/api/registrations?scope=mine&includeEvent=true&limit=100"),
        ]);

        if (!active) return;

        setEvents(eventsResp.data ?? []);
        setRegistrations(registrationsResp.data ?? []);
        setSelectedEventId(eventsResp.data?.[0]?.$id ?? "");
      } catch {
        if (active) {
          setEvents([]);
          setRegistrations([]);
          setSelectedEventId("");
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

  useEffect(() => {
    let active = true;

    async function loadCertificates() {
      if (!selectedEventId) {
        setCertificates([]);
        return;
      }

      try {
        const resp = await apiGet<{ data: CertificateRecord[]; total: number }>(`/api/certificates?eventId=${selectedEventId}`);
        if (active) {
          setCertificates(resp.data ?? []);
        }
      } catch {
        if (active) {
          setCertificates([]);
        }
      }
    }

    loadCertificates();

    return () => {
      active = false;
    };
  }, [selectedEventId]);

  const assignedEvents = events.length;
  const totalRegistrations = registrations.length;
  const issuedCertificates = certificates.length;
  const ongoingEvents = events.filter((event) => event.status === "published").length;

  const selectedEvent = useMemo(
    () => events.find((event) => event.$id === selectedEventId) ?? events[0] ?? null,
    [events, selectedEventId]
  );

  return (
    <RoleGate allowed={["faculty"]}>
      <div className="min-h-screen bg-background text-on-surface px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-[2rem] p-6 md:p-8 border border-white/10"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">
                  <Sparkles className="h-3.5 w-3.5 text-secondary" />
                  Faculty portal
                </div>
                <div>
                  <h1 className="text-3xl md:text-5xl font-black tracking-tight">Faculty dashboard</h1>
                  <p className="mt-2 text-sm md:text-base text-on-surface-variant">
                    Welcome, {profile?.fullName ?? "Faculty"}. View assigned events, registrations, and certificates from Appwrite.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/dashboard/certificates" className="h-11 px-5 rounded-xl bg-primary text-on-primary font-semibold inline-flex items-center justify-center gap-2">
                    <BookOpen className="h-4 w-4" /> Certificates
                  </Link>
                  <Link href="/dashboard/events" className="h-11 px-5 rounded-xl border border-white/10 bg-white/5 font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                    <ClipboardList className="h-4 w-4" /> My events
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:min-w-[420px]">
                <StatsCard icon={<Calendar className="h-5 w-5" />} label="Assigned events" value={assignedEvents} description="Faculty-linked only" />
                <StatsCard icon={<Users className="h-5 w-5" />} label="Registrations" value={totalRegistrations} description="For assigned events" />
                <StatsCard icon={<BookOpen className="h-5 w-5" />} label="Certificates" value={issuedCertificates} description={`${ongoingEvents} published events`} />
              </div>
            </div>
          </motion.section>

          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[2rem] p-6 md:p-8">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-2xl font-bold">Assigned events</h2>
                  <p className="text-sm text-on-surface-variant">Minimal read-optimized list of your Appwrite events.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-on-surface-variant">{events.length} total</div>
              </div>

              {isLoading ? (
                <div className="text-on-surface-variant">Loading events...</div>
              ) : events.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-on-surface-variant">
                  You haven’t been added to any events yet.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {events.map((event) => (
                    <article key={event.$id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-xs text-on-surface-variant mt-1">{getDepartmentName(event.deptId)}</p>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${getEventStatusMeta(event.status).className}`}>
                          {getEventStatusMeta(event.status).label}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs text-on-surface-variant">
                        <div>{formatShortDate(event.dateStart)} · {event.venue}</div>
                        <div>{event.registrationCount ?? 0}/{event.registrationLimit && event.registrationLimit > 0 ? event.registrationLimit : "∞"} registrations</div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button onClick={() => setSelectedEventId(event.$id)} className="h-9 px-4 rounded-xl bg-primary text-on-primary text-sm font-semibold">
                          View registrations
                        </button>
                        <Link href={`/dashboard/certificates?eventId=${event.$id}`} className="h-9 px-4 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold inline-flex items-center justify-center hover:bg-white/10">
                          Upload certs
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 0 }} className="glass-panel rounded-[2rem] p-6 md:p-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-bold">Event registrations</h2>
                  <p className="text-sm text-on-surface-variant">Selected event registrations fetched from Appwrite.</p>
                </div>
                <Search className="h-5 w-5 text-primary" />
              </div>

              {selectedEvent ? (
                <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="font-semibold">{selectedEvent.title}</div>
                  <div className="text-xs text-on-surface-variant">{selectedEvent.venue} · {formatShortDate(selectedEvent.dateStart)}</div>
                </div>
              ) : null}

              <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-on-surface-variant">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Student ID</th>
                      <th className="px-4 py-3">Dept</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.slice(0, 6).map((registration) => (
                      <tr key={registration.$id} className="border-t border-white/10">
                        <td className="px-4 py-3">{registration.fullName ?? registration.userId}</td>
                        <td className="px-4 py-3">{registration.studentId ?? "-"}</td>
                        <td className="px-4 py-3">{registration.department ?? "-"}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${registration.status === "registered" ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-300" : "border-red-500/30 bg-red-500/15 text-red-300"}`}>
                            {registration.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {registrations.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-on-surface-variant">No registrations yet.</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-on-surface-variant">
                <span>Showing {Math.min(6, registrations.length)} of {registrations.length}</span>
                <Link href="/dashboard/events" className="font-semibold text-primary hover:underline">
                  View all registrations
                </Link>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </RoleGate>
  );
}