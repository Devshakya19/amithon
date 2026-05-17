"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { RoleGate } from "@/components/auth/AuthGate";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const resp = await apiGet<{ data: any[] }>(`/api/admin/users`);
        if (active) setUsers(resp.data);
      } catch (err) {
        // ignore
      } finally {
        if (active) setIsLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  return (
    <RoleGate allowed={["hoi"]}>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Users</h1>
        {isLoading ? (
          <div className="text-on-surface-variant">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {users.map((u) => (
              <div key={u.$id} className="glass-panel p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="font-semibold">{u.fullName}</div>
                  <div className="text-xs text-on-surface-variant">{u.email} — {u.role}</div>
                </div>
                <div className="text-xs text-on-surface-variant">{u.userId}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </RoleGate>
  );
}
