"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPatch } from "@/lib/api";
import { RoleGate } from "@/components/auth/AuthGate";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const resp = await apiGet<{ data: any[] }>(`/api/notifications?limit=50`);
        if (active) setNotifications(resp.data);
      } catch (err) {
        // ignore
      } finally {
        if (active) setIsLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  const markRead = async (id: string) => {
    try {
      await apiPatch(`/api/notifications/${id}`, {});
      setNotifications((prev) => prev.map((n) => (n.$id === id ? { ...n, isRead: true } : n)));
    } catch (err) {
      // ignore
    }
  };

  return (
    <RoleGate allowed={["student", "coordinator", "faculty", "hoi"]}>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {isLoading ? (
          <div className="text-on-surface-variant">Loading...</div>
        ) : (
          <div className="flex flex-col gap-3">
            {notifications.map((n) => (
              <div key={n.$id} className={`glass-panel p-4 rounded-2xl flex items-center justify-between ${n.isRead ? "opacity-60" : ""}`}>
                <div>
                  <div className="font-semibold">{n.title}</div>
                  <div className="text-xs text-on-surface-variant">{n.body}</div>
                </div>
                {!n.isRead ? (
                  <button className="h-9 px-4 rounded-xl bg-primary text-on-primary" onClick={() => markRead(n.$id)}>Mark read</button>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </RoleGate>
  );
}
