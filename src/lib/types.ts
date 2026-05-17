export type EventStatus = "draft" | "pending" | "published" | "completed" | "cancelled";

export type EventCustomField = {
  label: string;
  required?: boolean;
};

export type EventRecord = {
  $id: string;
  title: string;
  description: string;
  deptId: string;
  coordinatorId: string;
  facultyIds?: string[];
  dateStart: string;
  dateEnd: string;
  venue: string;
  posterFileId?: string;
  registrationLimit?: number;
  registrationCount?: number;
  customFields?: EventCustomField[];
  status: EventStatus;
  promoted?: boolean;
  createdAt: string;
  updatedAt?: string;
};

export type RegistrationRecord = {
  $id: string;
  eventId: string;
  userId: string;
  fullName?: string;
  email?: string;
  studentId?: string;
  department?: string;
  year?: string;
  semester?: string;
  customData?: Record<string, string>;
  status: "registered" | "cancelled";
  createdAt: string;
};

export type NotificationRecord = {
  $id: string;
  userId: string;
  title: string;
  body: string;
  type: string;
  isRead: boolean;
  meta?: Record<string, unknown>;
  createdAt: string;
};

export type CertificateRecord = {
  $id: string;
  eventId: string;
  userId: string;
  fileId: string;
  issuedAt: string;
};
