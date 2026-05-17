# Amithon - Technical Events Portal

## Project Overview

**Project Name:** Amithon
**Type:** Web Application (Technical Events Management Portal)
**Institution:** Amity University, Gwalior (ASET Department)

---

## Problem Statement

Currently, technical events in Amity University (ASET) are managed through WhatsApp groups and notice boards. This leads to:
- Scattered information across multiple channels
- No centralized platform for event discovery
- Manual registration tracking via forms/emails
- Difficulty in managing certificates and participant data
- No proper analytics for event participation

Amithon solves this by creating a unified digital portal for all technical events across departments.

---

## Solution

A centralized web platform where:
- Coordinators create and manage technical events
- Students discover and register for events
- HOI approves events before going live
- All data is stored in Appwrite (Database, Auth, Storage)

---

## Target Users

| User Type | Description | Count (Approx) |
|-----------|-------------|----------------|
| HOI | Head of Institution - Full admin access | 2-3 |
| Faculty | Faculty coordinators - Manage events & coordinators | 10-15 |
| Coordinator | Student coordinators - Create events | 15-20 per dept |
| Student | Event participants | 2000+ per department |

**Departments (Future):** ASET, ASET (Life Sciences), ASECS, ASMS, ASOL, AIB, AJKM (7 total)

---

## Core Features

### 1. Authentication System
- **Email/Password** registration and login
- **Google OAuth** (Amity email only - @amity.edu.in)
- Role-based access: Student, Coordinator, Faculty, HOI

### 2. Student Features
- Browse upcoming events (filtered by department + open-for-all)
- Register for events with auto-fill profile data
- View registered events in dashboard
- Cancel registration if needed
- Download certificates from event page
- Create/edit profile with: Name, Enrollment No, Email, Phone, Branch, Year, Semester, Profile Pic
- In-app notifications

### 3. Coordinator Features
- Create events with: Title, Description, Date, Time, Venue/Address, Poster Image
- Add/remove custom info fields in event details
- Set registration limit (optional)
- View live registration count
- View registered students list
- Export registrations to Excel (customizable columns)
- Upload certificates (PDF) for event
- Edit/delete own events

### 4. Faculty Features
- All Coordinator powers
- Add/remove coordinators to events
- View events they're added to (with full student details)
- Cannot view other faculty's event student details

### 5. HOI Features
- Full access to all events and data
- Approve events before publishing (initial approval flow)
- View all analytics and reports
- Manage all users

### 6. Event Features
- Event details: Title, Description, Date, Time, Venue, Poster
- Custom info fields (add/remove)
- Registration limit with "Full" status
- Live registration count
- Certificate download button (after coordinator uploads)
- Promoted/Special events (featured at top)

### 7. Notifications
- In-app notifications for:
  - Event updates
  - Registration confirmation
  - Certificate uploaded
  - Event reminders

---

## User Flows

### Student Registration Flow
1. Student signs up with Amity Enrollment No + Email + Password
2. OR signs in with Google (Amity email)
3. Completes profile (department auto-filters events)
4. Browses events (own department + open-for-all)
5. Clicks "Register" → Form auto-fills from profile
6. Receives confirmation notification
7. Attends event
8. Downloads certificate from event page

### Coordinator Event Creation Flow
1. Coordinator logs in
2. Clicks "Create Event"
3. Fills: Title, Description, Date, Time, Venue, Poster
4. Adds custom info fields (optional)
5. Sets registration limit (optional)
6. Submits → Pending (already approved by HOI conceptually)
7. Event goes live
8. Monitors registrations in dashboard
9. Exports Excel when needed
10. Uploads certificates after event

---

## Technical Architecture

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context / Zustand
- **UI Components:** Custom components with shadcn/ui patterns

### Backend
- **Runtime:** Node.js (Express or custom)
- **API:** RESTful + Server Actions
- **Server:** Next.js API Routes

### Database & Storage (Appwrite)
- **Database:** Appwrite Databases (Collections)
- **Auth:** Appwrite Auth (Email/Password + OAuth)
- **Storage:** Appwrite Storage (Posters, Certificates)
- **Realtime:** Appwrite Realtime (live registration count)

### Key Appwrite Collections
1. `users` - User profiles
2. `departments` - Department list
3. `events` - Event details
4. `registrations` - Event registrations
5. `certificates` - Certificate metadata
6. `notifications` - In-app notifications

---

## Database Schema

### Users Collection
```
- userId: string (Appwrite ID)
- enrollmentNo: string (unique)
- email: string
- name: string
- phone: string
- branch: string
- year: number
- semester: number
- profilePic: string (file ID)
- role: enum (student, coordinator, faculty, hoi)
- departmentId: string
- createdAt: datetime
```

### Events Collection
```
- eventId: string
- title: string
- description: string
- date: datetime
- time: string
- venue: string
- poster: string (file ID)
- coordinatorId: string
- departmentId: string
- customFields: json (array of {label, value})
- registrationLimit: number (optional)
- isPromoted: boolean
- status: enum (draft, published, completed, cancelled)
- createdAt: datetime
```

### Registrations Collection
```
- registrationId: string
- eventId: string
- userId: string
- customData: json (event-specific fields)
- status: enum (registered, cancelled)
- registeredAt: datetime
```

### Notifications Collection
```
- notificationId: string
- userId: string (recipient)
- title: string
- message: string
- type: enum (event_update, registration, certificate, reminder)
- isRead: boolean
- createdAt: datetime
```

---

## Role-Based Access Matrix

| Feature | Student | Coordinator | Faculty | HOI |
|---------|---------|-------------|---------|-----|
| View Events | ✓ | ✓ | ✓ | ✓ |
| Register for Events | ✓ | ✗ | ✗ | ✗ |
| Create Events | ✗ | ✓ | ✓ | ✓ |
| Edit Own Events | ✗ | ✓ | ✓ | ✓ |
| Delete Own Events | ✗ | ✓ | ✓ | ✓ |
| View Own Registrations | ✗ | ✓ | ✓ | ✓ |
| View Own Event Students | ✗ | ✓ | ✓ | ✓ |
| Export Excel | ✗ | ✓ | ✓ | ✓ |
| Upload Certificates | ✗ | ✓ | ✓ | ✓ |
| Add Faculty to Event | ✗ | ✗ | ✓ | ✓ |
| View Added Events | ✗ | ✗ | ✓ | ✓ |
| View All Events | ✗ | ✗ | ✗ | ✓ |
| View All Registrations | ✗ | ✗ | ✗ | ✓ |
| Manage Users | ✗ | ✗ | ✗ | ✓ |

---

## UI/UX Design Direction

### Visual Style
- Clean, modern, professional
- Amity brand colors (Orange #FF6F00, Blue #1E3A8A) as accents
- White/Light backgrounds with dark text
- Card-based event display

### Animations
- Subtle animations on buttons and cards
- Smooth page transitions
- Use where needed, not everywhere
- Focus on user experience enhancement

### Layout
- **Home:** Featured events (promoted), Upcoming events grid, Filter by department
- **Events Page:** List view with search, filter by date/type/department
- **Dashboard:** User-specific (student: registered events, coordinator: created events)
- **Profile:** Editable form with avatar upload

### Responsive
- Mobile-first design
- Desktop: 3-column grid for events
- Tablet: 2-column
- Mobile: Single column

---

## MVP Scope (4-5 Features for Demo)

1. **User Authentication** - Sign up/Login (Email + Google)
2. **Profile Management** - Create and edit profile with auto-fill
3. **Event Listing** - Browse and view event details
4. **Event Registration** - Register for events with form
5. **Event Creation (Basic)** - Create events with essential fields

### Future Features (Phase 2+)
- Excel export
- Certificate upload/download
- In-app notifications
- Promoted events
- Custom registration fields
- Analytics dashboard
- 7 department support
- Live registration count
- Event editing

---

## Success Metrics

- Number of registered students
- Events created per department
- Registration conversion rate
- Average time to register
- Certificate download rate
- User engagement (profile completion %)

---

## Future Vision

1. **Phase 1:** ASET department launch
2. **Phase 2:** All 7 departments onboarding
3. **Phase 3:** Advanced features (analytics, automated certificates, QR check-in)
4. **Phase 4:** Mobile app (iOS + Android)
5. **Phase 5:** Integration with Amity's existing systems

---

## Timeline

- **MVP:** 2-3 weeks
- **Phase 1 (ASET):** 1 month
- **Phase 2 (All Depts):** 2 months
- **Phase 3 (Advanced):** 3 months

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Low adoption | Medium | Get faculty buy-in, promote in orientation |
| Data migration | High | Plan schema carefully, create import tools |
| Appwrite limits | Low | Use free tier efficiently, plan scaling |
| Feature creep | High | Stick to MVP scope strictly |

---

## Tech Stack Summary

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 14, React 19, TypeScript, Tailwind CSS |
| Backend | Node.js, Next.js API Routes |
| Database | Appwrite Database |
| Auth | Appwrite Auth (Email + Google OAuth) |
| Storage | Appwrite Storage |
| Real-time | Appwrite Realtime |
| Deployment | Vercel (Frontend) + Render/Railway (Backend) |
| Development | Git, VS Code |

---

## Current Project Status

- Basic Next.js setup initialized
- Appwrite integration pending
- First milestone: Marketing pages (Home, About, etc.)