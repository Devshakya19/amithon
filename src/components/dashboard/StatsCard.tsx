"use client";

import React from "react";

type StatsCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description?: string;
};

export default function StatsCard({ icon, label, value, description }: StatsCardProps) {
  return (
    <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 hover:shadow-lg transition-all">
      <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm text-on-surface-variant font-medium">{label}</div>
        <div className="text-2xl font-bold text-on-surface">{value}</div>
        {description ? <div className="text-xs text-on-surface-variant mt-1">{description}</div> : null}
      </div>
    </div>
  );
}
