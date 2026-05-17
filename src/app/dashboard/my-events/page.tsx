"use client";

import Link from "next/link";
import { RoleGate } from "@/components/auth/AuthGate";
import RegistrationList from "@/components/registrations/RegistrationList";

export default function MyEventsPage() {
  return (
    <RoleGate allowed={['student']} fallback={<div className="p-6">Access denied.</div>}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">My events</h1>
            <p className="text-on-surface-variant">Your registrations and participation history.</p>
          </div>
          <Link
            href="/dashboard/certificates"
            className="h-10 px-4 rounded-xl bg-primary text-on-primary text-sm font-semibold inline-flex items-center justify-center"
          >
            View certificates
          </Link>
        </div>
        <RegistrationList scope="mine" showCancel />
      </div>
    </RoleGate>
  );
}
