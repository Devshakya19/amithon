"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { getCertificateDownloadUrl } from "@/lib/appwrite/storage";
import { RoleGate } from "@/components/auth/AuthGate";

export default function CertificatesPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const resp = await apiGet<{ data: any[] }>(`/api/certificates`);
        if (active) setCerts(resp.data);
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
    <RoleGate allowed={["student", "coordinator", "faculty", "hoi"]}>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Certificates</h1>
        {isLoading ? (
          <div className="text-on-surface-variant">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certs.map((c) => (
              <div key={c.$id} className="glass-panel p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="font-semibold">{c.eventId}</div>
                  <div className="text-xs text-on-surface-variant">Issued: {new Date(c.issuedAt).toLocaleDateString()}</div>
                </div>
                <a href={getCertificateDownloadUrl(c.fileId)} className="h-9 px-4 rounded-xl bg-primary text-on-primary">Download</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </RoleGate>
  );
}
