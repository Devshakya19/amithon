"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Calendar, Users, Trophy, Search, ChevronRight,
  ArrowRight, Clock, Activity, Zap, Star, CheckCircle,
  Flame, Layout, BookOpen, Medal, Compass
} from "lucide-react";
import { useUser } from "@/context/UserProvider";
import { RoleGate } from "@/components/auth/AuthGate";
import EventList from "@/components/events/EventList";
import RegistrationList from "@/components/registrations/RegistrationList";
import { departments } from "@/lib/departments";

const ITEMS_PER_PAGE = 9;

// ============ Ultra-Modern Stat Card ============
function StatCardModern({
  icon, label, value, trend, delay
}: {
  icon: React.ReactNode; label: string; value: string;
  trend?: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-surface/40 border border-white/5 p-6 backdrop-blur-xl transition-all hover:bg-surface/60 hover:border-white/10"
    >
      <div className="absolute top-0 right-0 p-6 opacity-20 transition-transform group-hover:scale-110 group-hover:opacity-40 text-on-surface">
        {icon}
      </div>
      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        <p className="text-sm font-semibold tracking-wide text-on-surface-variant uppercase">
          {label}
        </p>
        <div className="flex items-end justify-between">
          <h4 className="text-5xl font-black tracking-tighter text-on-surface">
            {value}
          </h4>
          {trend && (
            <span className="text-sm font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-md">
              {trend}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ============ Sleek Action Card ============
function ActionCard({
  title, description, icon, href, delay
}: {
  title: string; description: string; icon: React.ReactNode; href: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      <Link href={href} className="flex items-center gap-5 p-5 rounded-3xl bg-surface/30 border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all group">
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">{title}</h4>
          <p className="text-sm text-on-surface-variant mt-1 line-clamp-1">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </Link>
    </motion.div>
  );
}

// ============ Event Spotlight Card ============
function SpotlightEvent({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 p-8 flex flex-col justify-between h-full group"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 blur-[80px] rounded-full group-hover:bg-primary/40 transition-colors pointer-events-none" />
      
      <div className="relative z-10 flex justify-between items-start mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-bold text-white tracking-wide">Featured Workshop</span>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center backdrop-blur-md transition-colors">
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="relative z-10">
        <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
          Advanced AI & Machine Learning Summit
        </h3>
        <p className="text-white/80 font-medium mb-6 max-w-md">
          Join industry leaders for an intensive 2-day workshop on modern neural networks and practical AI implementation.
        </p>
        <div className="flex gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`w-8 h-8 rounded-full border-2 border-background bg-surface flex items-center justify-center text-xs font-bold z-[${10-i}] text-on-surface`}>
                {i === 4 ? "+42" : "👤"}
              </div>
            ))}
          </div>
          <div className="text-sm text-white/70 flex items-center font-medium">
            Attending this event
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StudentDashboard() {
  const { profile } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalEvents / ITEMS_PER_PAGE)),
    [totalEvents]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDept]);

  const firstName = profile?.fullName?.split(" ")[0] || "Student";

  return (
    <RoleGate allowed={["student"]}>
      <div className="min-h-screen bg-background text-on-surface selection:bg-primary/30 relative overflow-hidden">
        {/* Subtle Grid Background for that technical feel */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]" 
             style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        {/* Dynamic Glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-secondary/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col gap-16">
          
          {/* HEADER SECTION */}
          <header className="flex flex-col lg:flex-row gap-10 items-start justify-between">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 text-sm font-bold text-primary">
                <Sparkles className="w-4 h-4" />
                <span>Welcome to your learning hub</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface mb-6 leading-[1.1]">
                Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{firstName}</span>.
              </h1>
              <p className="text-xl text-on-surface-variant font-medium leading-relaxed max-w-xl">
                Track your progress, discover new technical events, and level up your skills today.
              </p>
            </motion.div>

            {/* Quick Stats Grid */}
            <div className="w-full lg:w-[400px] grid grid-cols-2 gap-4">
              <StatCardModern icon={<BookOpen className="w-8 h-8" />} label="Events" value={String(totalEvents)} trend="+12%" delay={0.2} />
              <StatCardModern icon={<Medal className="w-8 h-8" />} label="Certs" value="2" trend="+1" delay={0.3} />
            </div>
          </header>

          {/* BENTO GRID LAYOUT */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SpotlightEvent delay={0.4} />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest px-2">Quick Actions</h3>
              <ActionCard title="Browse Catalog" description="Find events that match your interests" icon={<Compass />} href="#discover" delay={0.5} />
              <ActionCard title="My Registrations" description="View and manage your upcoming events" icon={<Calendar />} href="/dashboard/my-events" delay={0.6} />
              <ActionCard title="Achievements" description="Check your badges and certificates" icon={<Trophy />} href="/dashboard/certificates" delay={0.7} />
            </div>
          </section>

          {/* MY REGISTRATIONS MINI-VIEW */}
          <section>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-8"
            >
              <h2 className="text-3xl font-bold tracking-tight text-on-surface flex items-center gap-3">
                <Layout className="w-8 h-8 text-primary" />
                Your Agenda
              </h2>
              <Link href="/dashboard/my-events" className="text-sm font-bold text-primary hover:text-primary-container transition-colors flex items-center gap-1">
                View full schedule <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <div className="bg-surface/20 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
              <RegistrationList scope="mine" showCancel />
            </div>
          </section>

          {/* DISCOVER SECTION */}
          <section id="discover" className="pt-10 border-t border-white/10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-4">Discover Events</h2>
              <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">Explore our curated list of technical workshops, seminars, and hackathons.</p>
            </motion.div>

            {/* Filter Bar */}
            <div className="bg-surface/40 border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row gap-4 mb-10 backdrop-blur-md max-w-4xl mx-auto shadow-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events..."
                  className="w-full bg-white/5 border border-white/5 rounded-xl h-12 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-white/5 border border-white/5 rounded-xl h-12 px-4 text-on-surface focus:outline-none focus:border-primary/50 transition-colors appearance-none md:w-64 cursor-pointer"
              >
                <option value="" className="bg-surface text-on-surface">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id} className="bg-surface text-on-surface">
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <EventList
              scope="public"
              query={searchQuery}
              deptId={selectedDept}
              page={currentPage}
              limit={ITEMS_PER_PAGE}
              onTotal={setTotalEvents}
            />

            {/* Minimal Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-6">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full bg-surface border border-white/10 hover:border-primary text-on-surface disabled:opacity-30 disabled:hover:border-white/10 transition-all shadow-md"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <span className="text-sm font-bold text-on-surface-variant tracking-widest uppercase">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-full bg-surface border border-white/10 hover:border-primary text-on-surface disabled:opacity-30 disabled:hover:border-white/10 transition-all shadow-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </section>

        </div>
      </div>
    </RoleGate>
  );
}
