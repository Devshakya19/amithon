"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Crown, CheckSquare, Users, TrendingUp } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { useUser } from "@/context/UserProvider";
import { RoleGate } from "@/components/auth/AuthGate";

export default function HOIDashboard() {
  const { profile } = useUser();

  return (
    <RoleGate allowed={["hoi"]}>
      <div className="min-h-screen bg-background text-on-surface px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl p-8 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <Crown className="w-6 h-6 text-tertiary" />
              <div>
                <h1 className="text-4xl font-bold">Head of Institution Dashboard</h1>
                <p className="text-on-surface-variant">
                  Welcome, {profile?.fullName}. Manage and approve university-wide events.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatsCard icon={<CheckSquare className="w-5 h-5 text-primary" />} label="Pending Approvals" value="-" />
            <StatsCard icon={<TrendingUp className="w-5 h-5 text-secondary" />} label="Total Events" value="-" />
            <StatsCard icon={<Users className="w-5 h-5 text-tertiary" />} label="Total Registrations" value="-" />
            <StatsCard icon={<Users className="w-5 h-5 text-primary" />} label="Active Users" value="-" />
          </motion.div>

          {/* Management Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Approvals */}
            <Link
              href="/dashboard/approvals"
              className="glass-panel rounded-2xl p-8 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <CheckSquare className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold">Event Approvals</h3>
                  <p className="text-on-surface-variant text-sm">Review and approve pending events</p>
                </div>
              </div>
            </Link>

            {/* Users */}
            <Link
              href="/dashboard/users"
              className="glass-panel rounded-2xl p-8 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <Users className="w-6 h-6 text-tertiary group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold">User Management</h3>
                  <p className="text-on-surface-variant text-sm">View and manage all users</p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/dashboard/approvals"
                className="px-6 py-3 bg-surface-container border border-outline-variant rounded-xl hover:bg-surface-container-high transition-all text-center font-semibold"
              >
                Review Approvals
              </Link>
              <Link
                href="/dashboard/users"
                className="px-6 py-3 bg-surface-container border border-outline-variant rounded-xl hover:bg-surface-container-high transition-all text-center font-semibold"
              >
                Manage Users
              </Link>
              <Link
                href="/dashboard/events"
                className="px-6 py-3 bg-surface-container border border-outline-variant rounded-xl hover:bg-surface-container-high transition-all text-center font-semibold"
              >
                View All Events
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </RoleGate>
  );
}
