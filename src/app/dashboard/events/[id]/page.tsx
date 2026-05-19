"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ID } from "appwrite";
import { RoleGate } from "@/components/auth/AuthGate";
import RegistrationList from "@/components/registrations/RegistrationList";
import { apiGet, apiPost } from "@/lib/api";
import { storage } from "@/lib/appwrite/client";
import { getCertificatesBucketId } from "@/lib/appwrite/constants";
import type { EventRecord } from "@/lib/types";

export default function EventManagePage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.id as string;
  const [event, setEvent] = useState<EventRecord | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [certificateUserId, setCertificateUserId] = useState("");
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [certificateMessage, setCertificateMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadEvent() {
      try {
        setIsLoading(true);
        const response = await apiGet<{ data: EventRecord }>(`/api/events/${eventId}`);
        if (active) {
          setEvent(response.data);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load event");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    if (eventId) {
      loadEvent();
    }

    return () => {
      active = false;
    };
  }, [eventId]);

  const deleteEvent = async () => {
    if (!eventId) return;
    await apiPost(`/api/events/${eventId}`, { _method: "DELETE" });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      router.push("/dashboard/events");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event");
    }
  };

  const issueCertificate = async () => {
    setCertificateMessage("");

    if (!certificateUserId || !certificateFile) {
      setCertificateMessage("Provide a student user ID and file.");
      return;
    }

    try {
      const form = new FormData();
      form.append("file", certificateFile);
      form.append("eventId", eventId);
      form.append("userId", certificateUserId);

      const resp = await fetch("/api/certificates", { method: "POST", body: form });
      if (!resp.ok) {
        throw new Error(await resp.text());
      }

      setCertificateMessage("Certificate issued.");
      setCertificateFile(null);
      setCertificateUserId("");
    } catch (err) {
      setCertificateMessage(err instanceof Error ? err.message : "Failed to issue certificate");
    }
  };

  if (isLoading) {
    return <div className="text-on-surface-variant">Loading event...</div>;
  }

  if (error || !event) {
    return <div className="text-red-400">{error || "Event not found"}</div>;
  }

  return (
    <RoleGate allowed={["coordinator", "faculty", "hoi"]} fallback={<div>Access denied.</div>}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-on-surface-variant">Manage event</div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <p className="text-on-surface-variant">{event.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/dashboard/events/${event.$id}/edit`}
              className="h-10 px-4 rounded-xl bg-primary text-on-primary text-sm font-semibold inline-flex items-center justify-center"
            >
              Edit event
            </Link>
            <a
              href={`/api/registrations/export?eventId=${event.$id}`}
              className="h-10 px-4 rounded-xl border border-white/10 text-sm text-on-surface-variant inline-flex items-center justify-center"
            >
              Export CSV
            </a>
            <button
              className="h-10 px-4 rounded-xl border border-red-500/40 text-sm text-red-300"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Registrations</h2>
          <RegistrationList scope="event" eventId={event.$id} />
        </section>

        <section className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold">Issue certificate</h2>
            <p className="text-on-surface-variant text-sm">Upload a certificate for a student.</p>
          </div>
          {certificateMessage ? (
            <div className="text-sm text-on-surface-variant">{certificateMessage}</div>
          ) : null}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={certificateUserId}
              onChange={(eventInput) => setCertificateUserId(eventInput.target.value)}
              className="input-recessed flex-1 h-12 px-4 rounded-xl text-on-surface"
              placeholder="Student user ID"
            />
            <input
              type="file"
              accept="application/pdf"
              onChange={(eventInput) => setCertificateFile(eventInput.target.files?.[0] ?? null)}
              className="input-recessed flex-1 h-12 px-4 rounded-xl text-on-surface"
            />
            <button
              className="h-12 px-6 rounded-xl bg-primary text-on-primary font-semibold"
              onClick={issueCertificate}
            >
              Upload
            </button>
          </div>
        </section>
      </div>
    </RoleGate>
  );
}
