"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, BarChart3, Settings, Users } from "lucide-react";
import EventList from "@/components/events/EventList";
import StatsCard from "@/components/dashboard/StatsCard";
import { useUser } from "@/context/UserProvider";
import { RoleGate } from "@/components/auth/AuthGate";

export default function CoordinatorDashboard() {
  const { profile } = useUser();

  const stats = [
    { icon: <BarChart3 className="w-6 h-6 text-primary" />, label: "Events Created", value: "-" },
    { icon: <Plus className="w-6 h-6 text-secondary" />, label: "Upcoming", value: "-" },
    { icon: <Users className="w-6 h-6 text-tertiary" />, label: "Registrations", value: "-" },
  ];

  return (
    <RoleGate allowed={["coordinator"]}>
      <div className="min-h-screen bg-background text-on-surface px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl p-8 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-primary" />
              <div>
                <h1 className="text-4xl font-bold">Coordinator Dashboard</h1>
                <p className="text-on-surface-variant">
                  Welcome, {profile?.fullName}. Manage your events and registrations.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <StatsCard key={i} icon={s.icon} label={s.label} value={s.value} />
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/dashboard/events/new"
              className="flex items-center gap-2 px-6 py-3 bg-primary-container text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Create Event
            </Link>
            <Link
              href="/dashboard/events"
              className="flex items-center gap-2 px-6 py-3 bg-surface-container border border-outline-variant rounded-xl hover:bg-surface-container-high transition-all"
            >
              <BarChart3 className="w-5 h-5" />
              Manage Events
            </Link>
          </motion.div>

          {/* My Events Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Events</h2>
              <Link href="/dashboard/events" className="text-sm text-primary font-semibold">
                View all →
              </Link>
            </div>
            <EventList scope="mine" limit={5} />
          </motion.div>

          {/* Recent Registrations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold">Recent Registrations</h2>
            <p className="text-on-surface-variant text-sm">View registrations for your events in the Manage Events section.</p>
          </motion.div>
        </div>
      </div>
    </RoleGate>
  );
}
