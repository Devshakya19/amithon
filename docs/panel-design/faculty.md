# Faculty Dashboard — Complete UI/UX Design

---

## 1. Overview Philosophy

Faculty dashboard **"Faculty Portal"** hai — jahan faculty members un events ko dekh sakte hain jinme unhe coordinator/mentor add kiya gaya hai. Yeh dashboard **read-heavy** hai (mostly data viewing) with limited write actions (view registrations, upload certificates). Design ko **professional aur minimalist** rakhna hai — faculty ko extra clutter nahi chahiye.

**Design Keywords:** Professional, Minimal, Read-optimized, Clean, Authoritative

---

## 2. Layout Structure

```
+------------------------------------------------------------------+
|  SIDEBAR (w-64)  |         MAIN CONTENT AREA                     |
|  ┌──────────────┐ |                                                |
|  │  User Avatar  │ |  +------------------------------------------+ |
|  │  Faculty      │ |  |  HEADER                                   | |
|  │  Dr. Name     │ |  |  "Faculty Portal"                        | |
|  │  Role Badge   │ |  |  "You are coordinating 4 events"         | |
|  │               │ |  |  [📅 My Events]  [📄 Certs]              | |
|  │  NAV LINKS:   │ |  +------------------------------------------+ |
|  │  ► Dashboard  │ |                                                |
|  │  My Events    │ |  +------------------------------------------+ |
|  │  Certificates │ |  |  KEY METRICS (3 Stats Cards)              | |
|  │  Notifications│ |  |  [Assigned] [Registrations] [Certificates]| |
|  │  Profile      │ |  +------------------------------------------+ |
|  │               │ |                                                |
|  │  [Sign Out]   │ |  +------------------------------------------+ |
|  +──────────────+ |  |  MY ASSIGNED EVENTS                       | |
|                    |  |  [Search]  [Status Filter ▼]             | |
|                    |  |                                           | |
|                    |  |  ┌─────────────────┐  ┌─────────────────┐ | |
|                    |  |  │ [POSTER]        │  │ [POSTER]        │ | |
|                    |  |  │ Robotics        │  │ AI Summit       │ | |
|                    |  |  │ Workshop        │  │                 │ | |
|                    |  |  │ 📅 May 30       │  │ 📅 June 5       │ | |
|                    |  |  │ 👥 45 reg       │  │ 👥 23 reg       │ | |
|                    |  |  │                 │  │                 │ | |
|                    |  |  │ 🟢 LIVE         │  │ 🟡 PENDING      │ | |
|                    |  |  │                 │  │                 │ | |
|                    |  |  │ [View Details]  │  │ [View Details]  │ | |
|                    |  └─────────────────┘  └─────────────────┘  | |
|                    |  ┌─────────────────┐  ┌─────────────────┐ | |
|                    |  │ [POSTER]        │  │ [POSTER]        │ | |
|                    |  │ Web Dev         │  │ Hackathon       │ | |
|                    |  │ Bootcamp        │  │                 │ | |
|                    |  │ 📅 June 15      │  │ 📅 June 20      │ | |
|                    |  │ 👥 12 reg       │  │ 👥 67 reg       │ | |
|                    |  │                 │  │                 │ | |
|                    |  │ 🔵 COMPLETED    │  │ 🟢 LIVE         │ | |
|                    |  │                 │  │                 │ | |
|                    |  │ [View Details]  │  │ [View Details]  │ | |
|                    |  └─────────────────┘  └─────────────────┘  | |
|                    |                                           | |
|                    |  [< Prev]  Page 1 of 2  [Next >]          | |
|                    +------------------------------------------+ |
|                    |                                                |
|                    |  +------------------------------------------+ |
|                    |  |  QUICK OVERVIEW                          | |
|                    |  |  ┌──────────┐ ┌──────────┐ ┌──────────┐ | |
|                    |  |  │ Upcoming │ │ Ongoing  │ │ Completed│ | |
|                    |  |  │ Events   │ │ Events   │ │ Events   │ | |
|                    |  |  │    2     │ │    1     │ │    1     │ | |
|                    |  └──────────┘ └──────────┘ └──────────┘  | |
|                    +------------------------------------------+ |
+------------------------------------------------------------------+
```

---

## 3. Sections in Detail

### 3.1 Header Section

```
┌──────────────────────────────────────────────────────────────────┐
│  Faculty Portal                            [🔔 5]  [👤 Dr. Mehta]│
│                                                                   │
│  You are coordinating 4 events across ASET department.           │
│                                                                   │
│  [📋 My Events]  [📄 Certificates]  [📊 Analytics]              │
└──────────────────────────────────────────────────────────────────┘
```

**Design Details:**
- Left: "Faculty Portal" title with degree icon, subtitle with context
- Right: notification bell + profile dropdown
- Tab navigation: My Events (default), Certificates, Analytics
- Clean, professional look — no flashy gradients

### 3.2 Key Metrics (3 Stats Cards)

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  📋              │  │  👥              │  │  📄              │
│  Assigned Events  │  │  Total           │  │  Certificates    │
│                   │  │  Registrations   │  │  Issued          │
│                   │  │                  │  │                  │
│        4          │  │       147        │  │        23        │
│  2 ongoing        │  │  ↑ 8% from last  │  │  5 pending       │
│  2 upcoming       │  │  month           │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

**Design Details:**
- 3 cards in a row (responsive: stack on mobile)
- Minimal design — icon, count, label, sub-metric
- Card 1 (Assigned): blue — shows breakdown
- Card 2 (Registrations): green — trend percentage
- Card 3 (Certificates): purple — pending count

### 3.3 My Assigned Events

```
┌──────────────────────────────────────────────────────────────────┐
│  My Assigned Events              [🔍 Search...]  [Status: All ▼] │
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐│
│  │                  │  │                  │  │                  ││
│  │ [POSTER]        │  │ [POSTER]        │  │ [POSTER]        ││
│  │  16:9 ratio     │  │                  │  │                  ││
│  │                  │  │                  │  │                  ││
│  │ Robotics         │  │ AI Summit       │  │ Web Dev          ││
│  │ Workshop         │  │                 │  │ Bootcamp         ││
│  │                  │  │                 │  │                  ││
│  │ 📅 May 30, 2026  │  │ 📅 June 5, 2026 │  │ 📅 June 15, 2026 ││
│  │ ⏰ 10:00 AM      │  │ ⏰ 2:00 PM      │  │ ⏰ 9:00 AM       ││
│  │ 📍 Lab 201       │  │ 📍 Auditorium   │  │ 📍 Online        ││
│  │                  │  │                 │  │                  ││
│  │ 👥 45 registered │  │ 👥 23 registered│  │ 👥 12 registered ││
│  │                  │  │                 │  │                  ││
│  │ 🔴 Registrations │  │ 🟢 LIVE         │  │ 🔵 COMPLETED    ││
│  │   CLOSED         │  │                 │  │                  ││
│  │                  │  │                 │  │                  ││
│  │ [📋 View Regs]  │  │ [📋 View Regs]  │  │ [📋 View Regs]  ││
│  │ [📄 Upload Cert]│  │ [📄 Upload Cert]│  │ [📥 Download CSV]││
│  └──────────────────┘  └──────────────────┘  └──────────────────┘│
│                                                                   │
│  [< Prev]  Page 1 of 2  [Next >]                                │
└──────────────────────────────────────────────────────────────────┘
```

**Design Details:**
- Cards similar to coordinator but with **different actions**:
  - "View Registrations" (primary action) — see list of registered students
  - "Upload Certificates" (secondary) — issue certificates
  - "Download CSV" (if completed) — export data
- Status badge per card:
  - 🟢 LIVE — event active
  - 🔴 Registrations Closed — limit reached or date passed
  - 🔵 COMPLETED — event done
- Faculty sees **only events they are added to** — no "All Events" access
- No "Edit" or "Delete" buttons (faculty shouldn't modify event details, only manage participants)

### 3.4 Student Registrations View

```
┌──────────────────────────────────────────────────────────────────┐
│  [← Back to Events]                                              │
│  Robotics Workshop — Registrations            [📥 Export CSV]    │
│                                                                   │
│  Total: 45 Registered  |  Attended: 20  |  Pending: 25          │
│                                                                   │
│  [🔍 Search students...]  [Status: All ▼]                        │
│                                                                   │
│  ┌───┬────────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │ # │ Name       │ Student  │ Dept     │ Year     │ Status   │  │
│  ├───┼────────────┼──────────┼──────────┼──────────┼──────────┤  │
│  │ 1 │ Aarav K.  │ A230422.. │ ASET     │ 2nd      │ 🟢 Reg   │  │
│  │ 2 │ Priya S.  │ A230423.. │ ASET     │ 2nd      │ 🟢 Reg   │  │
│  │ 3 │ Simran J. │ A230424.. │ ASET(L)  │ 3rd      │ 🔴 Canc  │  │
│  │ 4 │ Rohit M.  │ A230425.. │ ASECS    │ 1st      │ 🟢 Reg   │  │
│  │ 5 │ Neha G.   │ A230426.. │ ASET     │ 2nd      │ ✅ Att   │  │
│  └───┴────────────┴──────────┴──────────┴──────────┴──────────┘  │
│                                                                   │
│  [< Prev]  Page 1 of 9  [Next >]    Showing 5 of 45              │
└──────────────────────────────────────────────────────────────────┘
```

**Design Details:**
- Table view (not cards) — more data-dense, faculty prefer tables
- Columns: #, Name, Student ID, Department, Year, Status
- Status: 🟢 Registered, 🔴 Cancelled, ✅ Attended (mark manually)
- Search by name/student ID
- Export CSV button (same as coordinator)
- **Attendance marking** — faculty can mark students as "Attended" after event (checkbox)

---

## 4. Certificates Management

```
┌──────────────────────────────────────────────────────────────────┐
│  Certificates Management  [Event: All Events ▼]                  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  Upload New Certificate                                       │ │
│  │  ┌────────────────────┐  ┌────────────────┐  ┌────────────┐  │ │
│  │  │ Event: [Select ▼] │  │ Student:       │  │ 📄 Upload  │  │ │
│  │  └────────────────────┘  │ [Search/Select]│  │   PDF      │  │ │
│  │                          └────────────────┘  └────────────┘  │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Recently Issued:                                                  │
│  ┌───┬────────────┬──────────┬──────────────────┬──────────────┐  │
│  │ # │ Student    │ Event    │ Issued Date      │ Download     │  │
│  ├───┼────────────┼──────────┼──────────────────┼──────────────┤  │
│  │ 1 │ Aarav K.  │ Robotics │ 15-May-2026      │ [📥 PDF]    │  │
│  │ 2 │ Priya S.  │ Robotics │ 15-May-2026      │ [📥 PDF]    │  │
│  │ 3 │ Simran J. │ AI       │ 14-May-2026      │ [📥 PDF]    │  │
│  └───┴────────────┴──────────┴──────────────────┴──────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. Color Scheme

| Element | Color |
|---------|-------|
| Primary | Dark Blue (#1e40af) |
| Assigned Events | Blue (#3b82f6) |
| Registrations | Green (#22c55e) |
| Certificates | Purple (#8b5cf6) |
| Live/Active | Green (#22c55e) |
| Completed | Blue (#3b82f6) |
| Registrations Closed | Orange (#f97316) |

---

## 6. Empty States

1. **No assigned events:** "📋 You haven't been added to any events yet" — informational, no CTA
2. **No registrations:** "📭 No students have registered yet" — when viewing specific event
3. **No certificates issued:** "📄 No certificates uploaded" — when no certs yet

---

## 7. Faculty-Specific Considerations

| Feature | Faculty Can | Faculty Cannot |
|---------|-------------|----------------|
| Events | View assigned events only | View all events |
| Create Events | ✅ Yes (with HOI approval) | — |
| Edit Events | ❌ No | Edit event details |
| Delete Events | ❌ No | Delete events |
| View Registrations | ✅ Yes (for assigned events) | View other faculty's regs |
| Export CSV | ✅ Yes | — |
| Upload Certificates | ✅ Yes | — |
| Mark Attendance | ✅ Yes (should be added) | — |
| Manage Users | ❌ No | — |

---

## 8. Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| ≥1280px | Full layout, 3-col event grid, 3 stat cards row |
| ≥1024px | 3-col event grid |
| ≥768px | 2-col event grid, hamburger sidebar |
| ≥640px | 1-col event grid |
| <640px | 1-col, cards add stacked, table becomes card list |
