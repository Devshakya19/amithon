# HOI Dashboard — Complete UI/UX Design

---

## 1. Overview Philosophy

HOI (Head of Institution) dashboard ek **"Central Command & Analytics Center"** hai. Yeh top-level admin ke liye hai jo poore system ka overview chahte hain — events across all departments, user management, approvals, aur analytics. Design ko **executive-level** rakhna hai — data-rich, insightful, aur action-oriented.

**Design Keywords:** Executive, Data-rich, Authoritative, Insightful, Comprehensive

---

## 2. Layout Structure

```
+------------------------------------------------------------------+
|  SIDEBAR (w-64)  |         MAIN CONTENT AREA                     |
|  ┌──────────────┐ |                                                |
|  │  User Avatar  │ |  +------------------------------------------+ |
|  │  HOI          │ |  |  HEADER                                   | |
|  │  Dr. Director │ |  |  "Institution Dashboard"                 | |
|  │               │ |  |  🏛️ Amity University, Gwalior           | |
|  │  NAV LINKS:   │ |  |  [📆 Today: May 18, 2026]               | |
|  │  ► Dashboard  │ |  +------------------------------------------+ |
|  │  Approvals    │ |                                                |
|  │  Events       │ |  +------------------------------------------+ |
|  │  Users        │ |  |  INSTITUTION METRICS (4 Stats Cards)      | |
|  │  Analytics    │ |  |  [Pending] [Total E] [Total R] [Users]   | |
|  │  Departments  │ |  +------------------------------------------+ |
|  │  Notifications│ |                                                |
|  │  Profile      │ |  +------------------------------------------+ |
|  │               │ |  |  SYSTEM OVERVIEW CHARTS                  | |
|  │  [Sign Out]   │ |  |  ┌───────┐  ┌───────┐                   | |
|  +──────────────+ |  |  │Events │  │Dept   │                   | |
|                    |  |  │by Dept│  │Wise   │                   | |
|                    |  |  │[chart]│  │Regs   │                   | |
|                    |  |  │       │  │[chart]│                   | |
|                    |  |  └───────┘  └───────┘                   | |
|                    |  +------------------------------------------+ |
|                    |                                                |
|                    |  +------------------------------------------+ |
|                    |  |  PENDING APPROVALS                       | |
|                    |  |  [3 events awaiting your approval]       | |
|                    |  |  [Card 1] [Card 2] [Card 3] [View All →]| |
|                    |  +------------------------------------------+ |
|                    |                                                |
|                    |  +------------------------------------------+ |
|                    |  |  RECENT ACTIVITY                         | |
|                    |  |  ● Event created: "Hackathon" by Priya  | |
|                    |  |  ● User joined: Aarav Kumar (student)   | |
|                    |  |  ● Certificate batch uploaded: Robotics  | |
|                    |  +------------------------------------------+ |
+------------------------------------------------------------------+
```

---

## 3. Sections in Detail

### 3.1 Header Section

```
┌──────────────────────────────────────────────────────────────────┐
│  🏛️ Institution Dashboard        [📆 Today: May 18, 2026]        │
│                                                                   │
│  Amity University, Gwalior — ASET Department                     │
│                                                                   │
│  [📋 Approvals]  [📊 Analytics]  [👥 Users]  [📅 All Events]   │
└──────────────────────────────────────────────────────────────────┘
```

**Design Details:**
- Large institution name with building icon
- Date on right
- Subtitle with department info
- Quick-nav buttons for main management sections

### 3.2 Institution Metrics (4 Stats Cards)

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  ⏳             │  │  📊             │  │  👥             │  │  🧑‍🎓             │
│  Pending        │  │  Total Events   │  │  Total          │  │  Active Users    │
│  Approvals      │  │                 │  │  Registrations  │  │                  │
│                 │  │                 │  │                 │  │                  │
│        3        │  │       48        │  │     1,247       │  │      856         │
│  Needs review   │  │  12 this month  │  │  ↑ 23% vs last  │  │  512 students    │
│                 │  │                 │  │                 │  │  32 coordinators │
│                 │  │                 │  │                 │  │  12 faculty      │
└─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Design Details:**
- 4 stat cards in a row
- Card 1 (Pending): amber/warning color — needs attention
- Card 2 (Events): blue
- Card 3 (Registrations): green with growth indicator
- Card 4 (Users): purple with role breakdown
- Each card hover shows more detail in tooltip

### 3.3 Analytics Charts (Two-Column)

```
┌─────────────────────────────────┬─────────────────────────────────┐
│  Events by Department           │  Registration Trends            │
│  ┌─────────────────────────────┐│  ┌─────────────────────────────┐│
│  │                             ││  │                             ││
│  │  ASET    ████████████ 18   ││  │  📈 Line Chart              ││
│  │  ASET LS ████████ 12      ││  │  Registrations over time    ││
│  │  ASECS   ██████ 9         ││  │                             ││
│  │  ASMS    ████ 6           ││  │  150 ┤        ╱╲            ││
│  │  ASOL    ██ 3             ││  │  100 ┤   ╱╲ ╱  ╲╲          ││
│  │                             ││  │   50 ┤ ╱    ╲    ╲╲        ││
│  │  (Horizontal bar chart)    ││  │    0 ┼──────────────────    ││
│  │                             ││  │     Jan  Feb  Mar  Apr May ││
│  └─────────────────────────────┘│  └─────────────────────────────┘│
│                                  │                                  │
│  [View Full Analytics →]        │  [Export Report ↓]              │
└─────────────────────────────────┴─────────────────────────────────┘
```

**Left Chart — Events by Department:**
- Horizontal bar chart
- Each bar = department, length = event count
- Color-coded by department
- Click bar → filter events list below by dept

**Right Chart — Registration Trends:**
- Line/area chart showing registrations over last 6 months
- Green upward trend line with area fill gradient
- Hover tooltip shows exact count per month

### 3.4 Pending Approvals Section

```
┌──────────────────────────────────────────────────────────────────┐
│  ⏳ Pending Approvals — 3 events awaiting your review           │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  ┌──────────────────────┐  ┌───────────┐                   │  │
│  │  │ [Image Placeholder]  │  │ Robotics  │  [✅ Approve]     │  │
│  │  │                      │  │ Workshop  │  [❌ Reject]      │  │
│  │  │                      │  │           │                   │  │
│  │  │                      │  │ 👤 Priya  │  [View Details]   │  │
│  │  │                      │  │   Sharma  │                   │  │
│  │  │                      │  │ 📅 May 30 │                   │  │
│  │  │                      │  │ 📂 ASET   │                   │  │
│  │  └──────────────────────┘  └───────────┘                   │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │  ┌─────────────────────────────┐  ┌───────────┐            │  │
│  │  │ AI Summit by Dr. Mehta      │  │ [✅] [❌] │            │  │
│  │  │ June 5-6 · ASET · Faculty   │  │           │            │  │
│  │  └─────────────────────────────┘  └───────────┘            │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │  ┌─────────────────────────────┐  ┌───────────┐            │  │
│  │  │ Hackathon by Rohit Verma    │  │ [✅] [❌] │            │  │
│  │  │ June 20 · ASET(L) · Student │  │           │            │  │
│  │  └─────────────────────────────┘  └───────────┘            │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  [View All Approvals →]  (/dashboard/approvals)                   │
└──────────────────────────────────────────────────────────────────┘
```

**Design Details:**
- Top pending count with attention-grabbing amber badge
- Each pending event shown as compact card:
  - Left: small poster thumbnail (optional)
  - Right: event name, creator, date, department
  - Actions: ✅ Approve (green), ❌ Reject (red), View Details (link)
- One-click approve/reject — no page reload needed (AJAX)
- After approve: card animates out smoothly
- "View All" link for full approval page

### 3.5 Recent Activity Feed

```
┌──────────────────────────────────────────────────────────────────┐
│  🔄 Recent Activity                                               │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  📅 Event created: "Hackathon 2026" by Priya Sharma  (Coord) 5m ago│
│  ├─────────────────────────────────────────────────────────────┤ │
│  │  🧑‍🎓 New user: Aarav Kumar joined as Student         20m ago│ │
│  ├─────────────────────────────────────────────────────────────┤ │
│  │  📄 Certificate batch uploaded: Robotics Workshop   1h ago   │ │
│  ├─────────────────────────────────────────────────────────────┤ │
│  │  ✅ Approved: "Web Dev Bootcamp" by Dr. Mehta        2h ago  │ │
│  ├─────────────────────────────────────────────────────────────┤ │
│  │  📈 Milestone: "AI Summit" reached 100 registrations! 3h ago │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  [View All Activity →]                                           │
└──────────────────────────────────────────────────────────────────┘
```

**Design Details:**
- Unified activity feed from across the system
- Each entry: icon + description + role tag + time
- Role tag: (Coord) / (Faculty) / (Student) — small colored badge
- Infinite scroll or "Load More" button

---

## 4. Approvals Page Detail

```
┌──────────────────────────────────────────────────────────────────┐
│  ⏳ Event Approvals                    [🔍 Search events...]     │
│                                                                   │
│  ┌── Tabs ──────────────────────────────────────────────────────┐ │
│  │  [⏳ Pending (3)]  [✅ Approved Today (2)]  [❌ Rejected (1)] │ │
│  ├───────────────────────────────────────────────────────────────┤ │
│  │                                                                │
│  │  ┌── Pending List ──────────────────────────────────────────┐ │
│  │  │                                                           │ │
│  │  │  ┌──────────────────────────────────────────────────────┐│ │
│  │  │  │  □  Robotics Workshop                                ││ │
│  │  │  │     Priya Sharma · ASET · May 30, 2026 · ₹500 fee   ││ │
│  │  │  │     [View Full Details ▼]                            ││ │
│  │  │  │     [✅ Approve]  [❌ Reject]  [✏️ Request Changes]  ││ │
│  │  │  └──────────────────────────────────────────────────────┘│ │
│  │  │                                                           │ │
│  │  │  ┌──────────────────────────────────────────────────────┐│ │
│  │  │  │  □  AI Summit                                        ││ │
│  │  │  │     Dr. Mehta · ASET · June 5, 2026                  ││ │
│  │  │  │     [View Full Details ▼]                            ││ │
│  │  │  │     [✅ Approve]  [❌ Reject]                        ││ │
│  │  │  └──────────────────────────────────────────────────────┘│ │
│  │  │                                                           │ │
│  │  │  [Select All]  [Bulk Approve]  [Bulk Reject]             │ │
│  │  └───────────────────────────────────────────────────────────┘ │
│  └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

**Approval Modal (when clicking "View Full Details"):**
```
┌──────────────────────────────────────────────────────────────────┐
│  Event Details — Robotics Workshop                               │
│                                                                   │
│  ┌─── Two Column Layout ─────────────────────────────────────────│
│  │  Title:     Robotics Workshop                                │ │
│  │  Creator:   Priya Sharma (Coordinator)                       │ │
│  │  Dept:      ASET                                              │ │
│  │  Dates:     May 30 - June 1, 2026                            │ │
│  │  Venue:     Lab 201, Block A                                 │ │
│  │  Limit:     50                                                │ │
│  │  Poster:    [preview]                                        │ │
│  │  Custom Fields: Team Name (Required), Project Link           │ │
│  │                                                               │ │
│  │  Approval Notes:                                             │ │
│  │  [______________________________]                            │ │
│  │                                                               │ │
│  │  [✅ Approve]  [❌ Reject with Note]  [✏️ Request Changes]    │ │
│  └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. User Management Page Redesign

```
┌──────────────────────────────────────────────────────────────────┐
│  👥 User Management                                               │
│                                                                   │
│  [🔍 Search by name/email/ID...]  [Role: All ▼]  [Dept: All ▼]  │
│                                                                   │
│  Total: 856 users  |  Students: 512  |  Coord: 32  |  Fac: 12  │
│                                                                   │
│  ┌── Tabs ──────────────────────────────────────────────────────┐ │
│  │  [All]  [Students]  [Coordinators]  [Faculty]  [Pending Verif]│ │
│  ├───────────────────────────────────────────────────────────────┤ │
│  │                                                                │
│  │  ┌── User Table ─────────────────────────────────────────────┐│ │
│  │  │  ┌───┬────────────┬──────────┬──────────┬────────┬──────┐ ││ │
│  │  │  │ # │ Name       │ Email    │ Role     │ Dept   │ Stat │ ││ │
│  │  │  ├───┼────────────┼──────────┼──────────┼────────┼──────┤ ││ │
│  │  │  │ 1 │ Aarav K.  │ a@amy.in │ Student  │ ASET   │ ✅   │ ││ │
│  │  │  │ 2 │ Priya S.  │ p@amy.in │ Coord    │ ASET   │ ✅   │ ││ │
│  │  │  │ 3 │ Dr. Mehta │ m@amy.in │ Faculty  │ ASET   │ ✅   │ ││ │
│  │  │  └───┴────────────┴──────────┴──────────┴────────┴──────┘ ││ │
│  │  │                                                           ││ │
│  │  │  Page 1 of 30  [< Prev] [1] [2] [3] ... [30] [Next >]   ││ │
│  │  └───────────────────────────────────────────────────────────┘│ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Click a user row → expands or opens side panel:                  │
│  ┌─── Side Panel ───────────────────────────────────────────────┐│
│  │  User: Aarav Kumar                                           ││
│  │  Avatar                                                       ││
│  │  Email: aarav@amity.edu.in                                   ││
│  │  Student ID: A2304221000                                     ││
│  │  Department: ASET                                            ││
│  │  Role: Student  [Change Role ▼]                              ││
│  │  Status: ✅ Active                                            ││
│  │  Joined: Jan 15, 2026                                        ││
│  │  Events Registered: 5                                        ││
│  │                                                               ││
│  │  [✏️ Edit User]  [⚠️ Suspend User]  [🗑️ Delete User]       ││
│  └───────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
```

**Design Details:**
- Table view (HOI needs data density)
- Click row to expand side panel with full user details
- Role change dropdown (for promoting/demoting users)
- User status: Active / Suspended / Pending Verification
- Bulk actions: select multiple users → [Change Role] [Verify] [Suspend]

---

## 6. Full Analytics Page

```
┌──────────────────────────────────────────────────────────────────┐
│  📊 Analytics & Reports                                           │
│                                                                   │
│  Date Range: [Last 30 Days ▼]  [Apply]  [📥 Export Report]      │
│                                                                   │
│  ┌─── 4 Metric Cards ────────────────────────────────────────────┐│
│  │  Total Events: 48  |  Growth: +12%  |  This Month: 12  | ...││
│  └───────────────────────────────────────────────────────────────┘│
│                                                                   │
│  ┌─── Charts Grid (2x2) ─────────────────────────────────────────││
│  │                                                               ││
│  │  [📊 Events by Department]     [📈 Registrations Trend]      ││
│  │  [Bar chart]                   [Line chart]                  ││
│  │                                                               ││
│  │  [📊 Events by Status]        [👥 Users by Role]            ││
│  │  [Pie chart]                   [Doughnut chart]              ││
│  │                                                               ││
│  └───────────────────────────────────────────────────────────────┘│
│                                                                   │
│  ┌─── Top Performing Events ─────────────────────────────────────┐│
│  │  Rank │ Event             │ Registrations │ Dept    │ Trend   ││
│  │  1    │ AI Summit         │ 100           │ ASET    │ 📈🔥   ││
│  │  2    │ Hackathon 2026    │ 87            │ ASET    │ 📈     ││
│  │  3    │ Robotics Workshop │ 45            │ ASET    │ 📈     ││
│  └───────────────────────────────────────────────────────────────┘│
│                                                                   │
│  ┌─── Department Comparison ─────────────────────────────────────┐│
│  │  Dept       │ Events │ Regs   │ Avg/Event │ Top Event        ││
│  │  ASET       │ 18     │ 540    │ 30        │ AI Summit        ││
│  │  ASET (LS)  │ 12     │ 312    │ 26        │ Bio Workshop     ││
│  │  ASECS      │ 9      │ 225    │ 25        │ Coding Contest   ││
│  │  ASMS       │ 6      │ 120    │ 20        │ Math Olympiad    ││
│  │  ASOL       │ 3      │ 50     │ 16        │ Legal Awareness  ││
│  └───────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
```

---

## 7. Dashboard Sidebar (HOI-specific)

```
┌──────────────────────┐
│  👤 Dr. Director     │
│  🏛️ Head of Inst.  │
├──────────────────────┤
│  📊 Dashboard        │  ← active
│  ⏳ Approvals (3)    │  ← badge count
│  📅 All Events       │
│  👥 User Management  │
│  📈 Analytics        │
│  🏢 Departments      │
│  🔔 Notifications    │
│  ⚙️ System Settings  │
│  📝 Profile          │
├──────────────────────┤
│  📋 Quick Actions:   │
│  [Review Approvals]  │
│  [View All Events]   │
│  [Generate Report]   │
├──────────────────────┤
│  🚪 Sign Out         │
└──────────────────────┘
```

**Extra nav items only for HOI:**
- Approvals (with pending count badge)
- Analytics (full reporting)
- Departments (manage departments)
- System Settings (config)

---

## 8. Color Scheme

| Element | Color |
|---------|-------|
| Primary | Deep Blue (#1e3a5f) |
| Pending/Approvals | Amber (#f59e0b) |
| Approved | Green (#22c55e) |
| Rejected | Red (#ef4444) |
| Students | Blue (#3b82f6) |
| Coordinators | Purple (#8b5cf6) |
| Faculty | Teal (#14b8a6) |
| HOI | Gold (#f59e0b) |

---

## 9. Empty States

1. **No pending approvals:** "✅ All caught up! No events pending approval." with confetti animation
2. **No users (unlikely):** illustration + "Invite users to get started"
3. **No events in dept:** "📭 This department hasn't created any events yet"

---

## 10. Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| ≥1280px | Full sidebar, 4-col stat cards, 2-col charts |
| ≥1024px | 4-col stat cards, 2-col charts |
| ≥768px | Hamburger sidebar, 2x2 stat cards, charts stack vertically |
| ≥640px | 1-col stat cards, tables become card list |
| <640px | 1-col everything, simplified charts |

---

## 11. HOI-Specific Considerations

| Feature | Available |
|---------|-----------|
| Approve/Reject events | ✅ One-click approve, reject with note |
| Bulk approve | ✅ Select multiple → bulk action |
| Change event status | ✅ Force publish/complete/cancel any event |
| View ALL registrations | ✅ Any event, any department |
| Manage users | ✅ View, search, change role, suspend |
| Change user roles | ✅ Student ↔ Coordinator ↔ Faculty ↔ HOI |
| View analytics | ✅ Department-wise, trend charts, top events |
| Generate reports | ✅ Export PDF/CSV reports |
| Department management | ✅ Add/edit departments |
| System-wide notifications | ✅ Send notification to all users |
| Delete any event | ✅ With confirmation |
| Promote/demote events | ✅ Mark any event as promoted |
