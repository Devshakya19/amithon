"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Target,
  Award,
  Fingerprint,
  Globe,
  Sparkles,
} from "lucide-react";

const features = [
  {
    title: "Unified Event Grid",
    description: "Every department and every technical gathering, orchestrated in one living calendar for the entire university.",
    icon: <Globe className="w-6 h-6" />,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Instant Registration",
    description: "One-tap signups with live seat intelligence and automated waitlists that keep momentum high.",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    title: "Smart Matching",
    description: "Recommendations tuned to skills, department, and past participation so every invite feels curated.",
    icon: <Target className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Digital Credentials",
    description: "Verified certificates and badges issued directly after completion, ready for portfolios.",
    icon: <Award className="w-6 h-6" />,
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    title: "Secure Access",
    description: "Enterprise authentication with Amity SSO keeps personal data protected end to end.",
    icon: <Shield className="w-6 h-6" />,
    gradient: "from-red-400 to-rose-500",
  },
  {
    title: "Verified Identity",
    description: "Student ID verification builds trust and keeps every event community authentic.",
    icon: <Fingerprint className="w-6 h-6" />,
    gradient: "from-indigo-400 to-violet-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-surface-container-lowest" />
      <div className="absolute inset-0 aurora-streaks opacity-70" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-primary-container mb-6 glass-pill px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              Why Amithon
            </span>
            <h2 className="display-font text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              A new operating system for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
                technical culture
              </span>
            </h2>
            <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed mt-6 max-w-xl">
              Built for the scale of Amity University, Amithon turns every event into a consistent, data-rich experience with real-time participation signals.
            </p>

            <div className="mt-10 space-y-4">
              <Principle
                title="Designed for scale"
                description="From ASET to every department, the portal grows without fragmentation."
              />
              <Principle
                title="Data you can trust"
                description="Verified identities, role-based access, and live registration insights."
              />
              <Principle
                title="Purposeful automation"
                description="Reminders, approvals, and certificates that keep teams focused on impact."
              />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="glass-card rounded-2xl p-6 sm:p-7 group hover:border-white/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${feature.gradient} blur-[60px] opacity-25`} />
                </div>

                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center bg-gradient-to-br ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-on-surface mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Principle({ title, description }: { title: string; description: string }) {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/5">
      <div className="text-xs uppercase tracking-[0.3em] text-on-surface-variant">{title}</div>
      <div className="text-sm text-on-surface mt-2 leading-relaxed">{description}</div>
    </div>
  );
}
