"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  Sparkles,
  Calendar,
  Users,
  Cpu,
  Trophy,
  Radar,
  Ticket,
  Zap,
} from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 aurora-streaks" />
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute inset-0 noise-layer" />
      <div className="absolute inset-0 grid-scanlines opacity-30" />

      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute w-[620px] h-[620px] rounded-full bg-primary-container/15 blur-[140px] -top-[20%] -left-[10%]"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[520px] h-[520px] rounded-full bg-tertiary-container/15 blur-[120px] -bottom-[10%] -right-[5%]"
      />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-pill inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-on-surface-variant">
                Amity University Tech Nexus
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="display-font text-5xl sm:text-6xl md:text-7xl lg:text-[78px] font-semibold tracking-tight leading-[1.02]"
            >
              Orchestrate the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
                entire event orbit
              </span>
              of Amity innovation
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed mt-6"
            >
              A singular, intelligent portal that turns scattered announcements into a living timeline of hackathons, workshops, and flagship competitions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Link
                href="/register"
                className="h-14 px-8 rounded-xl bg-primary-container text-white font-semibold flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(37,99,235,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Join the portal
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#events"
                className="h-14 px-8 rounded-xl glass-panel font-semibold flex items-center justify-center gap-2 hover:bg-white/5 transition-all duration-300"
              >
                Browse the schedule
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12"
            >
              <StatPill icon={<Calendar className="w-5 h-5 text-primary" />} value="50+" label="Events" />
              <StatPill icon={<Users className="w-5 h-5 text-secondary" />} value="5K+" label="Students" />
              <StatPill icon={<Cpu className="w-5 h-5 text-tertiary" />} value="7" label="Departments" />
              <StatPill icon={<Trophy className="w-5 h-5 text-primary" />} value="100+" label="Winners" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative"
          >
            <div className="absolute -top-8 -left-8 w-24 h-24 rounded-2xl bg-primary-container/30 blur-2xl" />
            <div className="glass-card section-frame rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center">
                    <Radar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-on-surface-variant">Live pulse</div>
                    <div className="text-lg font-semibold text-on-surface">Campus radar</div>
                  </div>
                </div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-secondary">Realtime</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <InsightRow
                  title="Registration velocity"
                  value="2.4k"
                  meta="students in last 30 days"
                  icon={<Ticket className="w-4 h-4" />}
                />
                <InsightRow
                  title="Upcoming highlights"
                  value="12"
                  meta="events this month"
                  icon={<Zap className="w-4 h-4" />}
                />
              </div>

              <div className="rounded-2xl bg-surface-container-lowest/80 p-5 border border-white/5">
                <div className="text-xs uppercase tracking-[0.3em] text-on-surface-variant">Next up</div>
                <div className="display-font text-2xl text-on-surface mt-2">HackAmity 2024</div>
                <div className="flex items-center gap-3 text-sm text-on-surface-variant mt-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  Dec 15, 2024
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Registration open
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </section>
  );
}

function StatPill({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-1 hover:border-primary-container/30 transition-all group cursor-default">
      <div className="mb-1 group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">{value}</span>
      <span className="text-[11px] font-semibold text-on-surface-variant tracking-wide uppercase">{label}</span>
    </div>
  );
}

function InsightRow({
  title,
  value,
  meta,
  icon,
}: {
  title: string;
  value: string;
  meta: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-surface-container/80 p-4 border border-white/5">
      <div>
        <div className="text-xs uppercase tracking-[0.3em] text-on-surface-variant">{title}</div>
        <div className="text-2xl font-semibold text-on-surface mt-2">{value}</div>
        <div className="text-xs text-on-surface-variant mt-1">{meta}</div>
      </div>
      <div className="w-10 h-10 rounded-xl bg-primary-container/15 text-primary flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}
