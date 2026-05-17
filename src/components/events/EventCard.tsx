import Link from "next/link";
import type { EventRecord } from "@/lib/types";
import { getPosterPreviewUrl } from "@/lib/appwrite/storage";

export default function EventCard({ event }: { event: EventRecord }) {
  return (
    <div className="glass-card rounded-3xl p-6 flex flex-col gap-4">
      {event.posterFileId ? (
        <div className="h-44 rounded-2xl overflow-hidden border border-white/10">
          <img
            src={getPosterPreviewUrl(event.posterFileId)}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-container">
          {event.status}
        </span>
        <span className="text-xs text-on-surface-variant">
          {new Date(event.dateStart).toLocaleDateString()}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold text-on-surface">{event.title}</h3>
        <p className="text-sm text-on-surface-variant line-clamp-3">
          {event.description}
        </p>
      </div>
      <div className="flex items-center justify-between text-xs text-on-surface-variant">
        <span>{event.venue}</span>
        <span>
          {event.registrationCount ?? 0}/
          {event.registrationLimit && event.registrationLimit > 0
            ? event.registrationLimit
            : "∞"}
        </span>
      </div>
      <Link
        href={`/events/${event.$id}`}
        className="h-10 rounded-xl bg-primary text-on-primary text-sm font-semibold flex items-center justify-center"
      >
        View details
      </Link>
    </div>
  );
}
