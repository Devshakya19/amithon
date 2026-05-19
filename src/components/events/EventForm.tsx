"use client";

import { useEffect, useMemo, useState } from "react";
import { parseEventCustomFields } from "@/lib/appwrite/serializers";
import { useRouter } from "next/navigation";
import { ID } from "appwrite";
import { departments } from "@/lib/departments";
import { apiPatch, apiPost } from "@/lib/api";
import { storage } from "@/lib/appwrite/client";
import { getPostersBucketId } from "@/lib/appwrite/constants";
import { getPosterPreviewUrl } from "@/lib/appwrite/storage";
import type { EventCustomField, EventRecord } from "@/lib/types";

type EventFormProps = {
  initial?: Partial<EventRecord> | null;
  eventId?: string;
};

export default function EventForm({ initial = null, eventId }: EventFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [deptId, setDeptId] = useState(initial?.deptId ?? "");
  const [venue, setVenue] = useState(initial?.venue ?? "");
  const [dateStart, setDateStart] = useState(initial?.dateStart ?? "");
  const [dateEnd, setDateEnd] = useState(initial?.dateEnd ?? "");
  const [registrationLimit, setRegistrationLimit] = useState(initial?.registrationLimit ?? 0);
  const [customFields, setCustomFields] = useState<EventCustomField[]>(() =>
    parseEventCustomFields(initial?.customFields)
  );
  const [posterFileId, setPosterFileId] = useState(initial?.posterFileId ?? "");
  const [posterFile, setPosterFile] = useState<File | null>(null);

  const toLocalInputValue = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60 * 1000);
    return local.toISOString().slice(0, 16);
  };

  const fieldLabels = useMemo(
    () => customFields.map((field) => field.label.toLowerCase()),
    [customFields]
  );

  const addField = () => {
    setCustomFields((prev) => [...prev, { label: "", required: false }]);
  };

  const updateField = (index: number, field: EventCustomField) => {
    setCustomFields((prev) => prev.map((item, idx) => (idx === index ? field : item)));
  };

  const removeField = (index: number) => {
    setCustomFields((prev) => prev.filter((_, idx) => idx !== index));
  };

  useEffect(() => {
    if (!initial) return;

    setTitle(initial.title ?? "");
    setDescription(initial.description ?? "");
    setDeptId(initial.deptId ?? "");
    setVenue(initial.venue ?? "");
    setDateStart(toLocalInputValue(initial.dateStart));
    setDateEnd(toLocalInputValue(initial.dateEnd));
    setRegistrationLimit(initial.registrationLimit ?? 0);
    setCustomFields(parseEventCustomFields(initial.customFields));
    setPosterFileId(initial.posterFileId ?? "");
  }, [initial]);

  return (
    <form
      className="glass-panel w-full max-w-3xl p-6 md:p-8 rounded-2xl flex flex-col gap-6"
      onSubmit={async (event) => {
        event.preventDefault();
        setError("");

        if (!title || !description || !deptId || !venue || !dateStart || !dateEnd) {
          setError("Please fill all required fields.");
          return;
        }

        if (fieldLabels.some((label) => label && fieldLabels.filter((item) => item === label).length > 1)) {
          setError("Custom field labels must be unique.");
          return;
        }

        try {
          setIsSubmitting(true);
          const startIso = new Date(dateStart).toISOString();
          const endIso = new Date(dateEnd).toISOString();
          let nextPosterId = posterFileId;

          if (posterFile) {
            // Upload poster to server-side endpoint which validates and stores securely
            const form = new FormData();
            form.append("file", posterFile);

            const resp = await fetch("/api/uploads/poster", {
              method: "POST",
              body: form,
            });

            if (!resp.ok) {
              throw new Error(await resp.text());
            }

            const json = await resp.json();
            nextPosterId = json.fileId;
          }

          const payload = {
            title,
            description,
            deptId,
            venue,
            dateStart: startIso,
            dateEnd: endIso,
            registrationLimit,
            posterFileId: nextPosterId || undefined,
            customFields: customFields.filter((field) => field.label.trim()),
          };

          if (eventId) {
            await apiPatch<{ data: EventRecord }>(`/api/events/${eventId}`, payload);
          } else {
            await apiPost<{ data: EventRecord }>("/api/events", payload);
          }

          router.push("/dashboard/events");
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to save event.");
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <div>
        <h1 className="text-2xl font-bold">{eventId ? "Edit event" : "Create event"}</h1>
        <p className="text-on-surface-variant text-sm">
          {eventId ? "Update event details." : "Draft the event details for approval."}
        </p>
      </div>

      {error ? <div className="text-red-400 text-sm">{error}</div> : null}

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-on-surface-variant">Title</label>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface"
          placeholder="HackAmity 2026"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-on-surface-variant">Description</label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="input-recessed w-full min-h-[140px] px-4 py-3 rounded-xl text-on-surface"
          placeholder="Describe the event..."
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-on-surface-variant">Poster image</label>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setPosterFile(event.target.files?.[0] ?? null)}
            className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface"
          />
          {posterFileId ? (
            <img
              src={getPosterPreviewUrl(posterFileId)}
              alt="Poster preview"
              className="h-16 w-24 rounded-xl object-cover border border-white/10"
            />
          ) : null}
        </div>
        <p className="text-xs text-on-surface-variant">PNG or JPG, up to 5MB.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-on-surface-variant">Department</label>
          <select
            value={deptId}
            onChange={(event) => setDeptId(event.target.value)}
            className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface"
          >
            <option value="">Select department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-on-surface-variant">Venue</label>
          <input
            value={venue}
            onChange={(event) => setVenue(event.target.value)}
            className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface"
            placeholder="Auditorium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-on-surface-variant">Start date</label>
          <input
            value={dateStart}
            onChange={(event) => setDateStart(event.target.value)}
            className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface"
            type="datetime-local"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-on-surface-variant">End date</label>
          <input
            value={dateEnd}
            onChange={(event) => setDateEnd(event.target.value)}
            className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface"
            type="datetime-local"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-on-surface-variant">Registration limit</label>
        <input
          value={registrationLimit}
          onChange={(event) => setRegistrationLimit(Number(event.target.value))}
          className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface"
          type="number"
          min={0}
        />
        <p className="text-xs text-on-surface-variant">Set 0 for unlimited seats.</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-on-surface-variant">Custom fields</h2>
          <button
            type="button"
            className="text-xs font-semibold text-primary"
            onClick={addField}
          >
            + Add field
          </button>
        </div>
        {customFields.length === 0 ? (
          <p className="text-xs text-on-surface-variant">No custom fields added.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {customFields.map((field, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-3">
                <input
                  value={field.label}
                  onChange={(event) =>
                    updateField(index, { ...field, label: event.target.value })
                  }
                  className="input-recessed flex-1 h-12 px-4 rounded-xl text-on-surface"
                  placeholder="Field label"
                />
                <label className="flex items-center gap-2 text-xs text-on-surface-variant">
                  <input
                    type="checkbox"
                    checked={field.required ?? false}
                    onChange={(event) =>
                      updateField(index, { ...field, required: event.target.checked })
                    }
                  />
                  Required
                </label>
                <button
                  type="button"
                  className="text-xs text-red-400"
                  onClick={() => removeField(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        className="h-12 rounded-xl bg-primary text-on-primary font-semibold"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : eventId ? "Save changes" : "Submit for approval"}
      </button>
    </form>
  );
}
