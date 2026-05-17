"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Users, Calendar } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import EventList from "@/components/events/EventList";
import { useUser } from "@/context/UserProvider";
import { RoleGate } from "@/components/auth/AuthGate";

export default function FacultyDashboard() {
  const { profile } = useUser();

  return (
    <RoleGate allowed={["faculty"]}>
      <div className="min-h-screen bg-background text-on-surface px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl p-8 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-secondary" />
              <div>
                <h1 className="text-4xl font-bold">Faculty Portal</h1>
                <p className="text-on-surface-variant">
                  Welcome, {profile?.fullName}. Manage events you're assigned to.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard icon={<Calendar className="w-6 h-6 text-primary" />} label="Assigned Events" value="-" />
            <StatsCard icon={<Users className="w-6 h-6 text-tertiary" />} label="Total Registrations" value="-" />
            <StatsCard icon={<BookOpen className="w-6 h-6 text-secondary" />} label="Certificates Issued" value="-" />
          </motion.div>

          {/* Events You're Added To */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Events You're Coordinating</h2>
              <Link href="/dashboard/events" className="text-sm text-primary font-semibold">
                View all →
              </Link>
            </div>
            <EventList scope="mine" limit={5} />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/dashboard/certificates"
                className="px-6 py-3 bg-surface-container border border-outline-variant rounded-xl hover:bg-surface-container-high transition-all"
              >
                Upload Certificates
              </Link>
              <Link
                href="/dashboard/events"
                className="px-6 py-3 bg-surface-container border border-outline-variant rounded-xl hover:bg-surface-container-high transition-all"
              >
                View Registrations
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </RoleGate>
  );
}
