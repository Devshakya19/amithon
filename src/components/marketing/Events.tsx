"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Tag, ArrowRight, Clock, Sparkles } from "lucide-react";

const previewEvents = [
  {
    title: "HackAmity 2024",
    date: "Dec 15, 2024",
    time: "10:00 AM — 10:00 PM",
    location: "Auditorium, Amity Noida",
    category: "Hackathon",
    status: "Registration Open",
    statusColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    gradient: "from-blue-600/80 to-indigo-900/90",
  },
  {
    title: "AI Workshop Series",
    date: "Jan 10, 2025",
    time: "2:00 PM — 5:00 PM",
    location: "Block I-2, Lab 402",
    category: "Workshop",
    status: "Coming Soon",
    statusColor: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    gradient: "from-purple-600/80 to-violet-900/90",
  },
  {
    title: "DesignX UX Meet",
    date: "Feb 05, 2025",
    time: "11:00 AM — 4:00 PM",
    location: "Online — Zoom",
    category: "Design",
    status: "Registration Open",
    statusColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800",
    gradient: "from-rose-600/80 to-pink-900/90",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function EventsPreview() {
  return (
    <section id="events" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 aurora-streaks opacity-60" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 sm:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-primary-container mb-4 glass-pill px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              Upcoming
            </span>
            <h2 className="display-font text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
              The schedule that keeps
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
                ASET in sync
              </span>
            </h2>
            <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed mt-4">
              Preview the highest-impact technical gatherings and secure your spot early.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-container transition-colors whitespace-nowrap"
            >
              View all events
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {previewEvents.map((event, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass-card rounded-3xl overflow-hidden group hover:border-white/20 transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${event.gradient}`} />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide text-white backdrop-blur-md bg-black/30 border border-white/10">
                    <span className={`w-2 h-2 rounded-full ${event.statusColor} animate-pulse`} />
                    {event.status}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-white/80">
                    <Tag className="w-3.5 h-3.5" />
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-5">
                <div>
                  <h3 className="text-2xl font-semibold text-on-surface tracking-tight group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-2">
                    Curated for competitive builders and future-ready creators.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <Calendar className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <Link
                  href="/register"
                  className="w-full h-11 rounded-xl bg-white/5 border border-white/10 text-on-surface text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary-container hover:text-white hover:border-primary-container transition-all duration-300 group/btn"
                >
                  Register now
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
