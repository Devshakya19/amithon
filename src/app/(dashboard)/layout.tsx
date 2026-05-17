"use client";

import type { ReactNode } from "react";
import { AuthGate } from "@/components/auth/AuthGate";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGate
      fallback={
        <div className="min-h-screen bg-background text-on-surface flex items-center justify-center p-6">
          <div className="glass-panel p-6 rounded-2xl">Please sign in to access this area.</div>
        </div>
      }
    >
      {children}
    </AuthGate>
  );
}
