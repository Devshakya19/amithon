"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Users, Trophy, ArrowRight, Search } from "lucide-react";
import EventList from "@/components/events/EventList";
import { departments } from "@/lib/departments";

export default function EventsPage() {
  const [query, setQuery] = useState("");
  const [deptId, setDeptId] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 9;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    setPage(1);
  }, [query, deptId]);

  const stats = [
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      label: "Events Available",
      value: total || "0",
    },
    {
      icon: <Users className="w-6 h-6 text-tertiary" />,
      label: "Community",
      value: "10K+",
    },
    {
      icon: <Trophy className="w-6 h-6 text-secondary" />,
      label: "Opportunities",
      value: "50+",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-6 py-20 md:py-28 bg-gradient-to-br from-primary-container/5 via-transparent to-tertiary-container/5 dot-grid">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary-container/10 blur-[100px] pointer-events-none"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-tertiary-container/10 blur-[80px] pointer-events-none"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 mb-12"
          >
            <div className="flex items-center gap-2 w-fit">
              <div className="px-3 py-1 rounded-full bg-primary-container/20 border border-primary-container/40">
                <span className="text-sm font-semibold text-primary flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Welcome to Amithon
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tight mb-4">
                Discover Elite{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-tertiary to-secondary">
                  Technical Events
                </span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl">
                Explore a world of opportunities with events from across Amity University. 
                Register, participate, and elevate your technical skills.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-primary-container/10 group-hover:bg-primary-container/20 transition-colors">
                  {stat.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-on-surface-variant font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-on-surface">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="px-6 py-8 border-b border-outline-variant/20">
        <div className="max-w-6xl mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Find Events</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 md:items-center"
          >
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="input-recessed w-full md:flex-1 h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all"
              placeholder="Search by event title or keyword..."
            />
            <select
              value={deptId}
              onChange={(event) => setDeptId(event.target.value)}
              className="input-recessed w-full md:w-64 h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all"
            >
              <option value="">All departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </motion.div>
        </div>
      </div>

      {/* Events Section */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <EventList
              scope="public"
              query={query}
              deptId={deptId}
              page={page}
              limit={limit}
              onTotal={setTotal}
            />
          </motion.div>

          {/* Pagination */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 mt-12"
          >
            <button
              className="h-10 px-6 rounded-xl border border-primary-container/40 text-sm font-semibold text-primary hover:bg-primary-container/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page <= 1}
            >
              ← Previous
            </button>
            <span className="text-sm font-medium text-on-surface-variant">
              Page <span className="font-bold text-on-surface">{page}</span> of <span className="font-bold text-on-surface">{totalPages}</span>
            </span>
            <button
              className="h-10 px-6 rounded-xl border border-primary-container/40 text-sm font-semibold text-primary hover:bg-primary-container/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page >= totalPages}
            >
              Next →
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
