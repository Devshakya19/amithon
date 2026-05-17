"use client";

import ProfileForm from "@/components/profile/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center px-6 py-12">
      <ProfileForm />
    </div>
  );
}
