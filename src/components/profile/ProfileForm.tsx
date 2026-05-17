"use client";

import { useEffect, useMemo, useState } from "react";
import { departments, years } from "@/lib/departments";
import { ensureCurrentUserProfile, updateUserProfile, type UserProfile } from "@/lib/appwrite/users";

const emptyProfile: UserProfile = {
  userId: "",
  email: "",
  fullName: "",
  studentId: "",
  department: "",
  year: "",
  semester: "",
  role: "student",
  createdAt: "",
};

export default function ProfileForm() {
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const availableSemesters = useMemo(() => {
    const selected = years.find((item) => item.value === profile.year);
    return selected?.semesters ?? [];
  }, [profile.year]);

  useEffect(() => {
    let isActive = true;

    async function loadProfile() {
      try {
        const data = await ensureCurrentUserProfile();
        if (isActive) {
          setProfile(data);
        }
      } catch (err) {
        if (isActive) {
          setError("Unable to load your profile. Please try again.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isActive = false;
    };
  }, []);

  if (isLoading) {
    return <div className="glass-panel p-6 rounded-2xl">Loading profile...</div>;
  }

  return (
    <form
      className="glass-panel w-full max-w-2xl p-6 md:p-8 rounded-2xl flex flex-col gap-6"
      onSubmit={async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!profile.fullName || !profile.studentId || !profile.department || !profile.year || !profile.semester) {
          setError("Please fill all required fields.");
          return;
        }

        try {
          setIsSubmitting(true);
          await updateUserProfile({
            fullName: profile.fullName,
            studentId: profile.studentId,
            department: profile.department,
            year: profile.year,
            semester: profile.semester,
          });
          setSuccess("Profile updated successfully.");
        } catch (err) {
          setError("Profile update failed. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <p className="text-on-surface-variant text-sm">Keep your details up to date for faster registrations.</p>
      </div>

      {error ? <div className="text-red-400 text-sm">{error}</div> : null}
      {success ? <div className="text-emerald-400 text-sm">{success}</div> : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-on-surface-variant">Full Name</label>
          <input
            value={profile.fullName}
            onChange={(event) => setProfile({ ...profile, fullName: event.target.value })}
            className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300"
            placeholder="Full name"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-on-surface-variant">Student ID</label>
          <input
            value={profile.studentId}
            onChange={(event) => setProfile({ ...profile, studentId: event.target.value })}
            className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300"
            placeholder="A2304221000"
            type="text"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-on-surface-variant">Email</label>
          <input
            value={profile.email}
            className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300 opacity-70"
            type="email"
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-on-surface-variant">Role</label>
          <input
            value={profile.role}
            className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300 uppercase tracking-wide opacity-70"
            type="text"
            disabled
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-on-surface-variant">Department</label>
          <select
            value={profile.department}
            onChange={(event) =>
              setProfile({
                ...profile,
                department: event.target.value,
              })
            }
            className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300"
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
          <label className="text-sm font-semibold text-on-surface-variant">Year</label>
          <select
            value={profile.year}
            onChange={(event) =>
              setProfile({
                ...profile,
                year: event.target.value,
                semester: "",
              })
            }
            className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300"
          >
            <option value="">Select year</option>
            {years.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-on-surface-variant">Semester</label>
        <select
          value={profile.semester}
          onChange={(event) => setProfile({ ...profile, semester: event.target.value })}
          className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300"
          disabled={!profile.year}
        >
          <option value="">Select semester</option>
          {availableSemesters.map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>
      </div>

      <button
        className="h-12 rounded-xl bg-primary text-on-primary font-semibold transition-all duration-300 hover:shadow-[0_12px_30px_rgba(37,99,235,0.35)] disabled:opacity-60 disabled:hover:shadow-none"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
