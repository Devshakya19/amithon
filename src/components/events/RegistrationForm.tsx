"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserProvider";
import { apiPost } from "@/lib/api";
import type { EventRecord } from "@/lib/types";

export default function RegistrationForm({ event }: { event: EventRecord }) {
  const { account, profile, isLoading } = useUser();
  const [customData, setCustomData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fields = useMemo(() => event.customFields ?? [], [event.customFields]);

  if (isLoading) {
    return <div className="text-on-surface-variant">Loading session...</div>;
  }

  if (!account) {
    return (
      <Link
        href="/login"
        className="h-12 rounded-xl bg-primary text-on-primary font-semibold flex items-center justify-center"
      >
        Sign in to register
      </Link>
    );
  }

  if (profile && profile.role !== "student") {
    return <div className="text-on-surface-variant">Only students can register.</div>;
  }

  if (!profile) {
    return (
      <div className="glass-panel p-6 rounded-2xl">
        <p className="text-sm text-on-surface-variant">
          Complete your profile before registering.
        </p>
        <Link
          href="/profile"
          className="mt-4 h-11 rounded-xl bg-primary text-on-primary font-semibold flex items-center justify-center"
        >
          Go to profile
        </Link>
      </div>
    );
  }

  return (
    <form
      className="glass-panel p-6 rounded-2xl flex flex-col gap-4"
      onSubmit={async (eventSubmit) => {
        eventSubmit.preventDefault();
        setError("");
        setSuccess("");

        try {
          setIsSubmitting(true);
          await apiPost("/api/registrations", {
            eventId: event.$id,
            customData,
          });
          setSuccess("Registration successful.");
        } catch (err) {
          setError(err instanceof Error ? err.message : "Registration failed.");
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <div>
        <h2 className="text-lg font-semibold">Register now</h2>
        <p className="text-sm text-on-surface-variant">
          {profile ? `Registering as ${profile.fullName}` : "Complete your profile to register."}
        </p>
      </div>

      {error ? <div className="text-red-400 text-sm">{error}</div> : null}
      {success ? <div className="text-emerald-400 text-sm">{success}</div> : null}

      {fields.map((field) => (
        <div key={field.label} className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-on-surface-variant">
            {field.label}
          </label>
          <input
            value={customData[field.label] ?? ""}
            onChange={(eventInput) =>
              setCustomData((prev) => ({
                ...prev,
                [field.label]: eventInput.target.value,
              }))
            }
            className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface"
            placeholder={field.label}
            required={Boolean(field.required)}
          />
        </div>
      ))}

      <button
        className="h-12 rounded-xl bg-primary text-on-primary font-semibold"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Confirm registration"}
      </button>
    </form>
  );
}
