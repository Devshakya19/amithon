import type { EventStatus } from "@/lib/types";
import { departments } from "@/lib/departments";

const shortDateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function getDepartmentName(deptId: string) {
  return departments.find((dept) => dept.id === deptId)?.name ?? deptId;
}

export function formatShortDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : shortDateFormatter.format(date);
}

export function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateTimeFormatter.format(date);
}

export function formatRelativeTime(value: string) {
  const date = new Date(value);
  const diff = Date.now() - date.getTime();

  if (Number.isNaN(date.getTime()) || diff < 0) {
    return "just now";
  }

  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function getEventStatusMeta(status: EventStatus) {
  switch (status) {
    case "draft":
      return { label: "Draft", className: "bg-slate-500/15 text-slate-300 border-slate-500/30" };
    case "pending":
      return { label: "Pending", className: "bg-amber-500/15 text-amber-300 border-amber-500/30" };
    case "published":
      return { label: "Live", className: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" };
    case "completed":
      return { label: "Completed", className: "bg-blue-500/15 text-blue-300 border-blue-500/30" };
    case "cancelled":
    default:
      return { label: "Cancelled", className: "bg-red-500/15 text-red-300 border-red-500/30" };
  }
}
