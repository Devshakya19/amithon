# Security Improvements for AMITHON

> **Language:** हिंदी + English  
> **Last Updated:** 2026-05-18

---

## Table of Contents

1. [Current Security Issues](#1-current-security-issues)
2. [P0 — Critical (Immediate Action Required)](#2-p0--critical-immediate-action-required)
3. [P1 — High Priority](#3-p1--high-priority)
4. [P2 — Medium Priority](#4-p2--medium-priority)
5. [P3 — Low Priority](#5-p3--low-priority)
6. [What is Already Secure](#6-what-is-already-secure)
7. [Deployment Security Checklist](#7-deployment-security-checklist)

---

## Recent changes (2026-05-18)

- Removed hardcoded `APPWRITE_API_KEY` from repository `.env.local` and replaced with an empty placeholder; rotate and set the new key in your deployment env vars immediately.
- Hardened `scripts/setup-appwrite.mjs` to create storage buckets with `fileSecurity`, `encryption`, and `antivirus` enabled and no public `read("any")` permission.
- Moved certificate and poster uploads server-side with validation (`/api/certificates`, `/api/uploads/poster`).
- Added a simple in-memory rate limiter and applied it to the registrations endpoint (`/api/registrations` POST).
- Enforced password strength checks during registration.


## 1. Current Security Issues

| # | Issue | Severity | Location |
|---|-------|----------|----------|
| 1 | Live Appwrite API key hardcoded in `.env.local` | 🔴 CRITICAL | `.env.local:8` |
| 2 | Appwrite storage buckets: no file security, no encryption, no antivirus | 🔴 CRITICAL | `scripts/setup-appwrite.mjs:242-272` |
| 3 | Certificate upload from client-side without server validation | 🔴 CRITICAL | `src/app/dashboard/events/[id]/page.tsx:72-99` |
| 4 | No rate limiting on registrations | 🟡 HIGH | `src/app/api/registrations/route.ts:123` |
| 5 | No server-side file type/size validation | 🟡 HIGH | All file uploads |
| 6 | No password strength requirements | 🟡 MEDIUM | `src/lib/appwrite/auth.ts:97` |
| 7 | Contact form silently drops data | 🟢 LOW | `Contact.tsx` (e.preventDefault) |
| 8 | Duplicate env variables, same bucket for posters & certificates | 🟢 LOW | `.env.local` |

---

## 2. P0 — Critical (Immediate Action Required)

### 2.1 Rotate Exposed Appwrite API Key

**Ya🔥 Current API key `standard_21c9e...` is live in `.env.local`.** Isse koi bhi jiske paas filesystem access hai, uske paas aapke poori database ka full admin access hai — read, write, delete kuch bhi kar sakta hai.

**Steps:**
1. Appwrite Console → **API Keys** → Search current key → **Revoke**
2. **Generate new API key** with minimum required permissions:
   - `databases.read`, `databases.write`
   - `collections.read`, `collections.write`
   - `documents.read`, `documents.write`
   - `buckets.read`, `buckets.write`
   - `files.read`, `files.write`
3. Update `.env.local`:
   ```
   APPWRITE_API_KEY=standard_new_key_here
   ```
4. Production deployment par **kabhi bhi `.env.local` file copy na karein**. Sirf server environment variables (Vercel/Railway/etc. ke env settings) mein daalein.

### 2.2 Storage Bucket Security Enable Karein

**Problem:** `setup-appwrite.mjs` lines 242-272 mein buckets is tarah bana rahe hain:
- `permissions: ["read(\"any\")"]` → **public read access** — koi bhi bina login ke files dekh/read kar sakta hai
- `fileSecurity: false` → **no per-file access control**
- `encryption: false` → **data unencrypted**
- `antivirus: false` → **no malware scan**

**Fix `scripts/setup-appwrite.mjs`:**

```js
function ensureBucketOptions(bucketId, name, maxSize, extensions) {
  // Pehle bucket create/update karein with secure defaults
  const payload = {
    name,
    permissions: [], // REMOVE read("any") — admin-only access
    fileSecurity: true,  // Per-file permissions enable
    enabled: true,
    maximumFileSize: maxSize,
    allowedFileExtensions: extensions,
    compression: "none",
    encryption: true,    // Data at rest encrypt karein
    antivirus: true,     // Malware scan enable
  };

  // PUT ya POST accordingly...
}
```

**Appwrite Console se bhi manual fix kar sakte hain:**
1. Appwrite Console → Storage → **Posters** bucket
2. Settings → **Encryption: ON**, **Antivirus: ON**, **File Security: ON**
3. Permissions se `read("any")` remove karein
4. Certificates bucket ke liye bhi same karein

---

## 3. P1 — High Priority

### 3.1 Certificate Upload Ko Server-Side Banayein

**Current problem:** File client-side Appwrite SDK se direct upload hota hai (`storage.createFile()`). Server ko sirf `fileId` aur ek arbitrary `userId` bheja jaata hai. Server check nahi karta:
- Ki file valid PDF hai ya nahi
- Ki user actually registered tha event mein
- Ki upload karne wale ko permission hai

**Solution — Two files change karni hain:**

#### File 1: `src/app/dashboard/events/[id]/page.tsx`

**Before (lines 72-99):**
```tsx
const issueCertificate = async () => {
  const upload = await storage.createFile(
    getCertificatesBucketId(), ID.unique(), certificateFile
  );
  await apiPost("/api/certificates", {
    eventId,
    userId: certificateUserId,
    fileId: upload.$id,
  });
};
```

**After:**
```tsx
const issueCertificate = async () => {
  const formData = new FormData();
  formData.append("file", certificateFile);
  formData.append("eventId", eventId);
  formData.append("userId", certificateUserId);

  const response = await fetch("/api/certificates", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
};
```

#### File 2: `src/app/api/certificates/route.ts` — POST handler

```typescript
// 1. Add imports
import { adminStorage } from "@/lib/appwrite/server";
import { Query } from "appwrite";
import { getRegistrationsCollectionId } from "@/lib/appwrite/constants";

// 2. POST handler mein file validation + server-side upload karein
export async function POST(req: Request) {
  try {
    const profile = await requireProfileFromRequest(req);
    if (!["coordinator", "faculty", "hoi"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const eventId = (formData.get("eventId") as string)?.trim();
    const userId = (formData.get("userId") as string)?.trim();

    if (!file || !eventId || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Validate file type
    if (!(file instanceof File) || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files allowed" }, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
    }

    // Verify event ownership
    const databaseId = getDatabaseId();
    const event = await adminDatabases.getDocument<EventRecord>(
      databaseId, getEventsCollectionId(), eventId
    );

    const canManage = profile.role === "hoi"
      || event.coordinatorId === profile.userId
      || (profile.role === "faculty" && event.facultyIds?.includes(profile.userId));

    if (!canManage) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Verify user was registered
    const existingReg = await adminDatabases.listDocuments(
      databaseId, getRegistrationsCollectionId(),
      [
        Query.equal("eventId", eventId),
        Query.equal("userId", userId),
        Query.equal("status", "registered"),
        Query.limit(1),
      ]
    );

    if (existingReg.total === 0) {
      return NextResponse.json(
        { error: "Student not registered for this event" },
        { status: 400 }
      );
    }

    // Server-side file upload
    const upload = await adminStorage.createFile(
      getCertificatesBucketId(),
      ID.unique(),
      new File([await file.arrayBuffer()], file.name, { type: file.type })
    );

    // Save certificate record
    const certificate = await adminDatabases.createDocument<CertificateRecord>(
      databaseId, getCertificatesCollectionId(), ID.unique(),
      {
        eventId,
        userId,
        fileId: upload.$id,
        issuedAt: new Date().toISOString(),
      }
    );

    return NextResponse.json({ data: certificate });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create certificate";
    return NextResponse.json({ error: message }, { status: getErrorStatus(message) });
  }
}
```

#### File 3: `src/lib/appwrite/server.ts` — Add admin storage client

```typescript
import { Storage } from "appwrite";

// Add after adminDatabases:
export const adminStorage = new Storage(client);
```

---

## 4. P2 — Medium Priority

### 4.1 Rate Limiting on Registration

**Problem:** `POST /api/registrations` par koi rate limit nahi hai. Ek student 1 minute mein 1000+ registrations kar sakta hai.

**Solution — Rate limiter utility banayein:**

**New file: `src/lib/rate-limit.ts`**
```typescript
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count++;
  return { allowed: true };
}
```

**`src/app/api/registrations/route.ts` — POST handler mein use karein:**
```typescript
import { checkRateLimit } from "@/lib/rate-limit";

// POST handler ke start mein:
const rateCheck = checkRateLimit(`reg:${profile.userId}`, 5, 60000); // 5 per minute
if (!rateCheck.allowed) {
  return NextResponse.json(
    { error: `Too many requests. Try again in ${rateCheck.retryAfter}s` },
    { status: 429, headers: { "Retry-After": String(rateCheck.retryAfter) } }
  );
}
```

**Note:** Production ke liye Redis-based rate limiter better hoga (Map server restart par reset ho jaata hai).

### 4.2 Password Strength Requirements

**File: `src/lib/appwrite/auth.ts` — `registerWithEmail` function**

```typescript
export async function registerWithEmail(params: {
  email: string;
  password: string;
  name: string;
  studentId: string;
  department?: string;
  year?: string;
  semester?: string;
}) {
  const { email, password, name, studentId, department, year, semester } = params;

  // Password validation
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    throw new Error("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    throw new Error("Password must contain at least one number");
  }
  // Optional: special character check
  // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
  //   throw new Error("Password must contain at least one special character");
  // }

  await account.create(ID.unique(), email, password, name);
  // ... rest remains same
}
```

**Appwrite Console bhi set karein:**
Auth → Settings → Password Policy:
- Minimum length: 8
- Require uppercase: ON
- Require lowercase: ON
- Require numbers: ON

### 4.3 Server-Side Poster Upload Validation

**Problem:** Poster upload bhi client-side Appwrite SDK se hota hai (event form mein), server ko sirf `posterFileId` string milti hai.

**Solution:** Certificate upload jaisa hi pattern — server-side upload karein.

**`src/components/events/EventForm.tsx`** mein `fetch` ko POST `/api/events` mein file bhejne ke liye change karein.

**`src/app/api/events/route.ts`** — POST handler mein file validation add karein:
```typescript
// Image validation
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

if (posterFile) {
  if (!ALLOWED_IMAGE_TYPES.includes(posterFile.type)) {
    return NextResponse.json({ error: "Invalid image type. Use JPEG, PNG, or WebP" }, { status: 400 });
  }
  if (posterFile.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ error: "Image too large (max 5MB)" }, { status: 400 });
  }
  // Upload server-side with adminStorage
}
```

---

## 5. P3 — Low Priority

### 5.1 Contact Form Fix

**File:** `src/components/marketing/Contact.tsx`

Current code:
```tsx
<form onSubmit={(e) => e.preventDefault()}>
```

**Solution 1 — Remove:** Agar contact form zaroori nahi hai to section hata dein.

**Solution 2 — Wire to API:** Appwrite collection mein data save karein:

```tsx
const [formData, setFormData] = useState({ name: "", email: "", message: "" });
const [submitting, setSubmitting] = useState(false);
const [submitted, setSubmitted] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitting(true);
  try {
    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    setSubmitted(true);
  } catch {
    // handle error
  } finally {
    setSubmitting(false);
  }
};
```

**Solution 3 — Email Service:** Resend, SendGrid ya nodemailer use karein.

### 5.2 Clean Up Environment Variables

**`.env.local`** mein duplicate variables hain:

| Duplicate Group | Keep This | Remove These |
|----------------|-----------|--------------|
| `APPWRITE_ENDPOINT` / `NEXT_PUBLIC_APPWRITE_ENDPOINT` | `NEXT_PUBLIC_APPWRITE_ENDPOINT` | `APPWRITE_ENDPOINT` |
| `APPWRITE_PROJECT_ID` / `NEXT_PUBLIC_APPWRITE_PROJECT_ID` / `NEXT_PUBLIC_APPWRITE_PROJECT` | `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | `APPWRITE_PROJECT_ID`, `NEXT_PUBLIC_APPWRITE_PROJECT` |
| Posters और Certificates same bucket `6a082c39002bc724af2c` use kar rahe hain | **Alag-alag bucket IDs** | |

**Fix:** Appwrite Console mein do alag buckets banayein:
1. `amithon-posters` — image types ke liye
2. `amithon-certificates` — PDF ke liye

Phir `.env.local` mein alag IDs set karein:
```
NEXT_PUBLIC_APPWRITE_POSTERS_BUCKET_ID=abc123...
NEXT_PUBLIC_APPWRITE_CERTIFICATES_BUCKET_ID=xyz789...
```

Update `scripts/setup-appwrite.mjs` accordingly.

### 5.3 Poster Upload in EventForm — Server-side

**File: `src/components/events/EventForm.tsx`**

Current code poster ko client-side Appwrite SDK se upload karta hai (`storage.createFile`). Isse faila bhi server par validate nahi hota.

**Fix:** Poster upload bhi API ke through server-side karein, jaisa certificate upload ke liye kiya.

---

## 6. What is Already Secure ✅

AMITHON already has good security practices in place. These should be maintained:

| Security Feature | Location | Description |
|-----------------|----------|-------------|
| ✅ JWT Auth on every API route | `src/lib/auth/server.ts` — `requireProfileFromRequest()` | Har API call par JWT token verify hota hai |
| ✅ Server-enforced RBAC | All API routes | Backend independently checks roles (frontend RoleGate is extra layer) |
| ✅ Resource ownership checks | Events, registrations, notifications APIs | User apne hi resources ko modify kar sakta hai |
| ✅ Registration deduplication | `registrations/route.ts:161-174` | Unique index + query check prevents double registration |
| ✅ Event capacity enforcement | `registrations/route.ts:154-159` | Server validates registration limit + atomic counter |
| ✅ No raw queries (no injection) | Uses Appwrite `Query` builder everywhere | No SQL injection risk |
| ✅ CSV injection prevention | `export/route.ts:19-29` | Proper escaping of CSV fields |
| ✅ Safe OAuth redirect URLs | `auth.ts:7-22` | Redirect validated against `window.location.origin` |
| ✅ Rate-limit handling on login | `auth.ts:62-95` | Exponential backoff + session conflict recovery |
| ✅ Document-level permissions | `users.ts:86-88` | User profile documents scoped to individual user |
| ✅ TypeScript strict mode | `tsconfig.json` | `strict: true` prevents many type-related bugs |
| ✅ Secrets in env vars | No hardcoded secrets in source code | API key is in `.env.local` (problematic but not in git) |
| ✅ `.env*` in `.gitignore` | `.gitignore` | Prevents accidental commit of secrets |

---

## 7. Deployment Security Checklist

Production deploy karne se pehle ye sab check karein:

- [ ] **API key rotated** — old key revoked, new key only in production env vars
- [ ] **Storage encryption ON** — both buckets have `encryption: true`
- [ ] **Storage antivirus ON** — both buckets have `antivirus: true`
- [ ] **Storage file security ON** — both buckets have `fileSecurity: true`
- [ ] **`read("any")` removed** — buckets are NOT publicly readable
- [ ] **Certificate upload is server-side** — file goes through API, not direct to Appwrite
- [ ] **Rate limiting implemented** — on registration and other POST endpoints
- [ ] **Password policy set** — both client-side and Appwrite Console
- [ ] **Contact form fixed or removed**
- [ ] **Poster upload is server-side** — file validated on server
- [ ] **No duplicate env vars** — clean `.env.local`
- [ ] **Separate buckets** for posters and certificates
- [ ] **`.env.local` NOT deployed** — production uses server env vars only
- [ ] **HTTPS enabled** (auto with Vercel, Railway, etc.)
- [ ] **Security headers set** — `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, etc.
- [ ] **Dependencies updated** — `npm audit fix` run karein
- [ ] **Appwrite project** — Review API key permissions, set minimum required scopes

---

## Quick Commands Reference

```bash
# Check for known vulnerabilities in dependencies
npm audit

# Auto-fix vulnerabilities
npm audit fix

# TypeScript type checking
npx tsc --noEmit

# Lint
npm run lint
```

---

*Security is a process, not a product. Regularly review these settings and keep dependencies updated.*
