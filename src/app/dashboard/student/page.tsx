"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Medal,
  TrendingUp,
  Bell,
  X,
  Filter,
  SlidersHorizontal,
} from "lucide-react";

// ─── Types ───
type EventStatus = "registered" | "pending" | "cancelled";
type EventCard = {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  department: string;
  posterUrl?: string;
  registeredCount: number;
  registrationLimit: number;
  status: EventStatus;
  promoted: boolean;
};

// ─── Mock Data ───
const MOCK_SPOTLIGHT: EventCard = {
  id: "1",
  title: "Advanced AI & ML Summit",
  description: "Explore cutting-edge AI technologies with industry experts.",
  date: "May 25, 2026",
  venue: "Auditorium, Block A",
  department: "ASET",
  registeredCount: 45,
  registrationLimit: 100,
  status: "registered",
  promoted: true,
};

const MOCK_AGENDA: EventCard[] = [
  { id: "2", title: "Advanced AI & ML Summit", date: "May 25, 2026", venue: "Auditorium", department: "ASET", registeredCount: 45, registrationLimit: 100, status: "registered", promoted: true, description: "" },
  { id: "3", title: "Web Development Workshop", date: "May 28, 2026", venue: "Lab 201", department: "ASET", registeredCount: 30, registrationLimit: 50, status: "registered", promoted: false, description: "" },
  { id: "4", title: "Hackathon 2026", date: "June 1, 2026", venue: "Innovation Hub", department: "ASET", registeredCount: 67, registrationLimit: 100, status: "pending", promoted: true, description: "" },
];

const MOCK_DISCOVER: EventCard[] = [
  { id: "5", title: "Robotics Workshop", date: "May 30, 2026", venue: "Lab 301", department: "ASET", registeredCount: 20, registrationLimit: 50, status: "registered", promoted: false, description: "" },
  { id: "6", title: "Cloud Computing Bootcamp", date: "June 5, 2026", venue: "Online", department: "ASET", registeredCount: 45, registrationLimit: 45, status: "pending", promoted: false, description: "" },
  { id: "7", title: "Blockchain Seminar", date: "June 10, 2026", venue: "Auditorium", department: "ASET (LS)", registeredCount: 10, registrationLimit: 100, status: "cancelled", promoted: false, description: "" },
  { id: "8", title: "UI/UX Design Hackathon", date: "June 15, 2026", venue: "Design Lab", department: "ASET", registeredCount: 5, registrationLimit: 30, status: "registered", promoted: false, description: "" },
  { id: "9", title: "Competitive Programming", date: "June 20, 2026", venue: "Room 105", department: "ASECS", registeredCount: 15, registrationLimit: 100, status: "registered", promoted: false, description: "" },
  { id: "10", title: "Python Fundamentals", date: "June 25, 2026", venue: "Lab 401", department: "ASMS", registeredCount: 0, registrationLimit: 50, status: "registered", promoted: false, description: "" },
];

const DEPARTMENTS = ["All Departments", "ASET", "ASET (Life Sciences)", "ASECS", "ASMS", "ASOL", "AIB", "AJKM"];

const STATS = {
  totalEvents: 12,
  upcoming: 3,
  certificates: 2,
};

// ─── Helpers ───
function getFillPercent(current: number, limit: number) {
  if (limit <= 0) return 0;
  return Math.min(100, Math.round((current / limit) * 100));
}

function getFillColor(pct: number) {
  if (pct >= 95) return "bg-red-500";
  if (pct >= 80) return "bg-orange-500";
  return "bg-green-500";
}

function StatusBadge({ status }: { status: EventStatus }) {
  const map: Record<EventStatus, { label: string; className: string }> = {
    registered: { label: "Registered", className: "bg-green-500/15 text-green-400 border-green-500/30" },
    pending: { label: "Pending", className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
    cancelled: { label: "Cancelled", className: "bg-red-500/15 text-red-400 border-red-500/30" },
  };
  const s = map[status];
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${s.className}`}>
      {s.label}
    </span>
  );
}

// ─── Main Component ───
export default function StudentDashboardPage() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [agendaView, setAgendaView] = useState<"timeline" | "list">("timeline");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredDiscover = MOCK_DISCOVER.filter(
    (e) =>
      (deptFilter === "All Departments" || e.department === deptFilter) &&
      e.title.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredDiscover.length / itemsPerPage);
  const paginatedDiscover = filteredDiscover.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* ─── Welcome Header ─── */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/5 to-secondary/10 border border-white/10 p-6 md:p-8">
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-primary/30">
              AK
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-4xl font-black tracking-tight">
                Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Aarav</span>
                <span className="inline-block ml-1">👋</span>
              </h1>
              <p className="text-on-surface-variant mt-1">Welcome to your learning hub</p>
            </div>
            <div className="flex gap-3">
              <button className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white">3</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            {[
              { icon: BookOpen, label: "Events", value: String(STATS.totalEvents), color: "from-blue-500 to-blue-600" },
              { icon: Calendar, label: "Upcoming", value: String(STATS.upcoming), color: "from-green-500 to-emerald-600" },
              { icon: Medal, label: "Certificates", value: String(STATS.certificates), color: "from-purple-500 to-pink-600" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group cursor-default"
              >
                <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-on-surface-variant">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Spotlight + Quick Actions ─── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/5 border border-white/10 p-6 group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/30 transition-colors" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 text-xs font-semibold border border-orange-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                Featured Event
              </span>
              <div className="mt-4 flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 aspect-video rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-on-surface-variant text-sm border border-white/5">
                  Poster Preview
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-bold">{MOCK_SPOTLIGHT.title}</h3>
                  <div className="space-y-1.5 text-sm text-on-surface-variant">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      {MOCK_SPOTLIGHT.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {MOCK_SPOTLIGHT.venue}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-on-surface-variant">Registrations</span>
                      <span className="font-medium">{MOCK_SPOTLIGHT.registeredCount}/{MOCK_SPOTLIGHT.registrationLimit}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${getFillColor(getFillPercent(MOCK_SPOTLIGHT.registeredCount, MOCK_SPOTLIGHT.registrationLimit))}`}
                        style={{ width: `${getFillPercent(MOCK_SPOTLIGHT.registeredCount, MOCK_SPOTLIGHT.registrationLimit)}%` }}
                      />
                    </div>
                  </div>
                  <button className="w-full h-11 rounded-xl bg-primary text-on-primary font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2">
                    View Details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { icon: BookOpen, label: "Browse All Events", desc: "Discover technical events across departments", href: "#" },
              { icon: Calendar, label: "My Registrations", desc: "View & manage your registered events", href: "#" },
              { icon: Medal, label: "Achievements", desc: "Your badges & certificates", href: "#" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{action.label}</div>
                  <div className="text-xs text-on-surface-variant truncate">{action.desc}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* ─── Your Agenda ─── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Your Agenda</h2>
            <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
              {(["timeline", "list"] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setAgendaView(view)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                    agendaView === view ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>
          {MOCK_AGENDA.length === 0 ? (
            <div className="text-center py-12 rounded-2xl border border-dashed border-white/10">
              <div className="text-4xl mb-3">🎯</div>
              <p className="text-on-surface-variant">No upcoming events yet!</p>
              <button className="mt-3 px-5 py-2 rounded-xl bg-primary text-on-primary text-sm font-semibold">
                Browse Events
              </button>
            </div>
          ) : agendaView === "timeline" ? (
            <div className="space-y-4">
              {["May 2026", "June 2026"].map((month) => {
                const monthEvents = MOCK_AGENDA.filter((e) => e.date.includes(month.split(" ")[0]));
                if (monthEvents.length === 0) return null;
                return (
                  <div key={month}>
                    <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">{month}</div>
                    <div className="space-y-3">
                      {monthEvents.map((event) => (
                        <div key={event.id} className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all">
                          <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                            <span className="text-lg font-bold text-primary">{event.date.split(" ")[1]}</span>
                            <span className="text-[10px] text-on-surface-variant">{event.date.split(" ")[0].slice(0, 3)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-semibold">{event.title}</h4>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-on-surface-variant mt-1">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {event.venue}
                                  </span>
                                </div>
                              </div>
                              <StatusBadge status={event.status} />
                            </div>
                            <div className="flex gap-2 mt-2">
                              <button className="text-xs text-primary font-medium hover:underline">View Details</button>
                              {event.status === "registered" && (
                                <button className="text-xs text-red-400 font-medium hover:underline">Cancel</button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {MOCK_AGENDA.map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-on-surface-variant mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.venue}
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={event.status} />
                  <ChevronRight className="w-4 h-4 text-on-surface-variant shrink-0" />
                </div>
              ))}
            </div>
          )}
          {MOCK_AGENDA.length > 0 && (
            <Link href="#" className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-3 hover:underline">
              View All Registrations <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </section>

        {/* ─── Discover Events ─── */}
        <section>
          <h2 className="text-xl font-bold mb-4">Discover Events</h2>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search events..."
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-on-surface-variant hover:text-on-surface" />
                </button>
              )}
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="h-11 pl-10 pr-8 rounded-xl bg-white/5 border border-white/10 text-sm text-on-surface appearance-none cursor-pointer focus:outline-none focus:border-primary/50"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d} className="bg-background">{d}</option>
                ))}
              </select>
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-on-surface-variant pointer-events-none" />
            </div>
            {(search || deptFilter !== "All Departments") && (
              <button
                onClick={() => { setSearch(""); setDeptFilter("All Departments"); }}
                className="h-11 px-4 rounded-xl border border-white/10 text-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {paginatedDiscover.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-dashed border-white/10">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-on-surface-variant">No events match your search</p>
              <button
                onClick={() => { setSearch(""); setDeptFilter("All Departments"); }}
                className="mt-3 px-5 py-2 rounded-xl bg-primary text-on-primary text-sm font-semibold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedDiscover.map((event) => {
                  const pct = getFillPercent(event.registeredCount, event.registrationLimit);
                  const isFull = event.registrationLimit > 0 && event.registeredCount >= event.registrationLimit;
                  return (
                    <div
                      key={event.id}
                      className="group rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                    >
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center text-on-surface-variant text-xs border-b border-white/5">
                        Poster
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold group-hover:text-primary transition-colors">{event.title}</h3>
                          <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">{event.description || "No description"}</p>
                        </div>
                        <div className="space-y-1 text-xs text-on-surface-variant">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {event.venue}
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-on-surface-variant">{event.registeredCount}/{event.registrationLimit > 0 ? event.registrationLimit : "∞"} registered</span>
                            {isFull && <span className="text-red-400 font-semibold">FULL</span>}
                          </div>
                          {event.registrationLimit > 0 && (
                            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${getFillColor(pct)}`}
                                style={{ width: `${Math.min(100, pct)}%` }}
                              />
                            </div>
                          )}
                        </div>
                        <button
                          disabled={isFull}
                          className={`w-full h-10 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                            isFull
                              ? "bg-white/5 text-on-surface-variant/50 cursor-not-allowed"
                              : "bg-primary text-on-primary hover:brightness-110"
                          }`}
                        >
                          {isFull ? "FULL" : event.registeredCount > 0 ? "Register" : "Register"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="h-9 px-3 rounded-xl border border-white/10 text-sm disabled:opacity-30 hover:border-white/30 transition-all"
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 w-9 rounded-xl text-sm font-medium transition-all ${
                        currentPage === page ? "bg-primary text-on-primary" : "border border-white/10 hover:border-white/30"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="h-9 px-3 rounded-xl border border-white/10 text-sm disabled:opacity-30 hover:border-white/30 transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
