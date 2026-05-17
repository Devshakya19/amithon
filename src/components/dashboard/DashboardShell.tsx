"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserProvider";
import type { UserRole } from "@/lib/appwrite/users";

const navItems = [
  { label: "Overview", href: "/dashboard", roles: ["student", "coordinator", "faculty", "hoi"] },
  { label: "My Events", href: "/dashboard/my-events", roles: ["student"] },
  { label: "Events", href: "/dashboard/events", roles: ["coordinator", "faculty", "hoi"] },
  { label: "Approvals", href: "/dashboard/approvals", roles: ["hoi"] },
  { label: "Notifications", href: "/dashboard/notifications", roles: ["student", "coordinator", "faculty", "hoi"] },
  { label: "Certificates", href: "/dashboard/certificates", roles: ["student"] },
  { label: "Users", href: "/dashboard/users", roles: ["hoi"] },
  { label: "Analytics", href: "/dashboard/analytics", roles: ["hoi"] },
  { label: "Profile", href: "/profile", roles: ["student", "coordinator", "faculty", "hoi"] },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, signOut } = useUser();

  const allowedItems = useMemo(() => {
    const role = profile?.role as UserRole | undefined;
    return navItems.filter((item) => (role ? item.roles.includes(role) : false));
  }, [profile?.role]);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64">
            <div className="glass-panel rounded-2xl p-5 flex flex-col gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-on-surface-variant">Dashboard</div>
                <div className="text-lg font-semibold mt-2">
                  {profile?.fullName ?? "Welcome"}
                </div>
                <div className="text-xs text-on-surface-variant mt-1">
                  {profile?.role?.toUpperCase() ?? ""}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {allowedItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-xl text-sm font-semibold transition",
                      pathname === item.href
                        ? "bg-primary text-on-primary"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              {(profile?.role === "coordinator" || profile?.role === "faculty" || profile?.role === "hoi") && (
                <Link
                  href="/dashboard/events/new"
                  className="h-10 rounded-xl bg-primary text-on-primary text-sm font-semibold flex items-center justify-center"
                >
                  Create event
                </Link>
              )}
              <button
                className="h-10 rounded-xl border border-white/10 text-sm text-on-surface-variant hover:text-on-surface"
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
              >
                Sign out
              </button>
            </div>
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
