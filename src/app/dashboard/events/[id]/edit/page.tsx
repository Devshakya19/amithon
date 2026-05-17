"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiGet } from "@/lib/api";
import EventForm from "@/components/events/EventForm";

export default function EventEditPage() {
  const params = useParams();
  const id = params?.id as string;
  const [initial, setInitial] = useState<any | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const resp = await apiGet<{ data: any }>(`/api/events/${id}`);
        if (active) setInitial(resp.data);
      } catch (err) {
        // ignore
      }
    }
    if (id) load();
    return () => { active = false; };
  }, [id]);

  if (!initial) {
    return <div className="text-on-surface-variant">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center px-6 py-24">
      <EventForm initial={initial} eventId={id} />
    </div>
  );
}
