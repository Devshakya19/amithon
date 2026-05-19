# Coordinator Dashboard — Complete UI/UX Design

---

## 1. Overview Philosophy

Coordinator dashboard ek **"Event Command Center"** hai. Yeh student coordinators ke liye hai jo events create karte hain, registrations track karte hain, aur certificates issue karte hain. Design ko **productivity-focused** rakhna hai — clear data, quick actions, aur straightforward navigation.

**Design Keywords:** Professional, Data-driven, Action-oriented, Efficient, Clean

---

## 2. Layout Structure

```
+------------------------------------------------------------------+
|  SIDEBAR (w-64)  |         MAIN CONTENT AREA                     |
|  ┌──────────────┐ |                                                |
|  │  User Avatar  │ |  +------------------------------------------+ |
|  │  Coordinator  │ |  |  HEADER                                   | |
|  │  Name         │ |  |  "Event Command Center"                   | |
|  │               │ |  |  [Create Event +]                        | |
|  │  NAV LINKS:   │ |  +------------------------------------------+ |
|  │  ► Dashboard  │ |                                                |
|  │  My Events    │ |  +------------------------------------------+ |
|  │  Notifications│ |  |  KEY METRICS (4 Stats Cards)              | |
|  │  Profile      │ |  |  [Total] [Active] [Registrations] [Today]| |
|  │               │ |  +------------------------------------------+ |
|  │  [+ Create]   │ |                                                |
|  │  [Sign Out]   │ |  +------------------------------------------+ |
|  +──────────────+ |  |  EVENT STATUS OVERVIEW                    | |
|                    |  |  [Draft: 2] [Pending: 1] [Live: 5] [Completed: 3] [CXL: 1] | |
|                    |  |  [Horizontal bar/visual chart]            | |
|                    |  +------------------------------------------+ |
|                    |                                                |
|                    |  +------------------------------------------+ |
|                    |  |  MY EVENTS                              | |
|                    |  |  [Search]  [Status Filter ▼]  [Sort ▼]  | |
|                    |  |  [View: Grid ▼]                         | |
|                    |  |                                           | |
|                    |  |  ┌──────┐ ┌──────┐ ┌──────┐              | |
|                    |  |  │Card 1│ │Card 2│ │Card 3│              | |
|                    |  |  └──────┘ └──────┘ └──────┘              | |
|                    |  |                                           | |
|                    |  +------------------------------------------+ |
|                    |                                                |
|                    |  +------------------------------------------+ |
|                    |  |  RECENT ACTIVITY FEED                    | |
|                    |  |  ● Aarav registered for Hackathon       | |
|                    |  |  ● Webinar reached 50 registrations     | |
|                    |  |  ● Certificate uploaded for Workshop    | |
|                    |  +------------------------------------------+ |
+------------------------------------------------------------------+
```

---

## 3. Sections in Detail

### 3.1 Header Section

```
┌──────────────────────────────────────────────────────────────────┐
│  Event Command Center                        [🔔 3]  [👤 Profile]│
│  Welcome back, Priya! Here's your events overview.              │
│                                                                   │
│  [📅 My Events]  [👥 Registrations]  [🏆 Certificates]          │
│                                                                   │
│  [✨ Create New Event +]                                         │
└──────────────────────────────────────────────────────────────────┘
```

**Design Details:**
- Left: dashboard title + contextual subtitle
- Right: notification bell with unread count badge, profile avatar (clickable → dropdown with Profile, Settings, Sign Out)
- **Quick tab navigation:** 3 context tabs — "My Events", "Registrations", "Certificates"
- **Primary CTA:** "✨ Create New Event +" button — prominent, large, with plus icon
  - Fixed position: sticky at top so always accessible
  - Gradient background, rounded-xl, shadow

### 3.2 Key Metrics (4 Stats Cards)

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  📊          │  │  🟢          │  │  👥          │  │  📅          │
│  Total       │  │  Active      │  │  Total       │  │  Today's     │
│  Events      │  │  Events      │  │  Registrations│  │  Events      │
│              │  │              │  │              │  │              │
│     12       │  │      5       │  │     345      │  │      1       │
│  ↑ 2 this mo │  │  3 ongoing   │  │  ↑ 12%       │  │  Webinar at  │
│              │  │  2 upcoming  │  │              │  │  3 PM        │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

**Design Details:**
- 4 cards in a row (responsive: 2x2 on tablet, stack on mobile)
- Each card has:
  - Icon at top-left with colored background circle
  - Large number (count) — font-bold, 2xl
  - Label below number
  - Trend indicator (↑ green / ↓ red) with percentage
- Card 1 (Total Events): blue icon bg
- Card 2 (Active Events): green icon bg — subtext "X ongoing, Y upcoming"
- Card 3 (Total Registrations): purple icon bg — trend percentage
- Card 4 (Today's Events): orange icon bg — shows next event name + time
- Cards have glass-morphism effect, slight border

### 3.3 Event Status Overview

```
┌──────────────────────────────────────────────────────────────────┐
│  Status Overview                                                 │
│                                                                   │
│  Draft      [██████░░░░░░░░░░░░░░░░░░░░░░░░]  2  ■ #6b7280      │
│  Pending    [████████░░░░░░░░░░░░░░░░░░░░░░]  1  ■ #f59e0b      │
│  Live       [████████████████████░░░░░░░░░░]  5  ■ #22c55e      │
│  Completed  [████████████░░░░░░░░░░░░░░░░░░]  3  ■ #3b82f6      │
│  Cancelled  [████░░░░░░░░░░░░░░░░░░░░░░░░░░]  1  ■ #ef4444      │
│                                                                   │
│  ● Draft: Needs more work                                       │
│  ● Pending: Awaiting HOI approval                                │
│  ● Live: Published & accepting registrations                     │
│  ● Completed: Event is over                                      │
│  ● Cancelled: Event was cancelled                                │
└──────────────────────────────────────────────────────────────────┘
```

**Design Details:**
- Horizontal stacked bar showing proportion of each status
- Below: individual rows with colored bars, status name, count, color indicator
- Each row is clickable → filters "My Events" list below by that status
- On hover: tooltip with explanation of what each status means

### 3.4 My Events Section (Main Content)

```
┌──────────────────────────────────────────────────────────────────┐
│  My Events                                    [View: Grid ▼]     │
│                                                                   │
│  [🔍 Search events...]  [Status: All ▼]  [Dept: All ▼]  [Sort ▼] │
│                                                                   │
│  Active Filters:  [Live ×]  [ASET ×]  [Clear All]               │
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ 🔥 PROMOTED    │  │                 │  │                 │  │
│  │ [POSTER]       │  │ [POSTER]        │  │ [POSTER]        │  │
│  │                 │  │                 │  │                 │  │
│  │ AI Summit       │  │ Robotics        │  │ Hackathon       │  │
│  │ 📅 May 25       │  │ 📅 June 5       │  │ 📅 June 15      │  │
│  │ 👥 45/100 reg   │  │ 👥 23/50 reg    │  │ 👥 12/∞ reg     │  │
│  │                 │  │                 │  │                 │  │
│  │ 🟢 LIVE         │  │ 🟡 PENDING      │  │ 🔴 CANCELLED   │  │
│  │                 │  │                 │  │                 │  │
│  │ [Manage] [Export]│  │ [Edit] [View]  │  │ [Delete]       │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                   │
│  [< Prev]  Page 1 of 4  [Next >]   Showing 9 of 35 events       │
└──────────────────────────────────────────────────────────────────┘
```

**Event Card (Management View) — Different from student's card:**
- **Promoted badge:** Small "🔥 PROMOTED" tag top-left (only if promoted)
- Poster image (shorter than student version)
- Status badge (right side or bottom):
  - 🟢 LIVE — green
  - 🟡 PENDING — yellow  
  - ⚪ DRAFT — gray
  - 🔵 COMPLETED — blue
  - 🔴 CANCELLED — red
- Registration progress: bar + "X/Y registered" text
- **Action buttons** (bottom of card):
  - "Manage" — go to event detail page (registrations, certificates, etc.)
  - "Edit" — go to edit form
  - "Export CSV" — download registrations
  - "Delete" — with confirmation dialog
- Quick status change: small dropdown on status badge to quickly change (e.g., Draft → Submit for Approval)

**View Toggle:**
- Grid view (default): 3-column cards
- List view: table rows with columns — Title, Dept, Date, Status, Registrations, Actions

### 3.5 Recent Activity Feed

```
┌──────────────────────────────────────────────────────────────────┐
│  Recent Activity                                                  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  🎓  Aarav Kumar registered for "AI Summit"         2 min ago│ │
│  ├─────────────────────────────────────────────────────────────┤ │
│  │  📈  "Web Development" reached 50 registrations!    15 min ago│ │
│  ├─────────────────────────────────────────────────────────────┤ │
│  │  📄  Certificate uploaded for "Robotics Workshop"   1 hour ago│ │
│  ├─────────────────────────────────────────────────────────────┤ │
│  │  🔄  "Hackathon" status changed from Draft to Pending  2h ago│ │
│  ├─────────────────────────────────────────────────────────────┤ │
│  │  🗑️  Registration cancelled by Simran for "AI Summit" 3h ago│ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  [View All Activity →]                                            │
└──────────────────────────────────────────────────────────────────┘
```

**Design Details:**
- Vertical timeline-style list
- Each row: icon + description + relative time
- Color-coded by type:
  - 🎓 Registration: blue
  - 📈 Milestone: green
  - 📄 Certificate: purple
  - 🔄 Status change: orange
  - 🗑️ Cancellation: red
- Max 5 items shown, "View All" link at bottom
- Auto-refresh: every 30 seconds (polling) for new activity

---

## 4. Event Detail/Manage Page

```
┌──────────────────────────────────────────────────────────────────┐
│  [← Back to My Events]                              [Edit] [Delete]│
│                                                                   │
│  ┌─────── POSTER ───────┐                                        │
│  │                       │   # Advanced AI & ML Summit           │
│  │   [IMAGE]            │   📅 May 25-26, 2026                  │
│  │   400x250            │   📍 Auditorium, Block A              │
│  │                       │   📂 ASET Department                  │
│  └───────────────────────┘                                       │
│                           │   🟢 LIVE · Created: May 1, 2026     │
│                           │   Promoted: Yes                      │
│                           └──────────────────────────────────────│
│                                                                   │
│  ┌─────────── QUICK STATS ────────────────────────────────────┐  │
│  │  👥 45/100 Registered    │  📋 15 Attended    │  📄 10 Certs│  │
│  └──────────────────────────┴────────────────────┴─────────────┘  │
│                                                                   │
│  ┌─ TABS ─────────────────────────────────────────────────────────│
│  │  [📋 Registrations]  [📄 Certificates]  [⚙️ Settings]        │
│  ├────────────────────────────────────────────────────────────────│
│  │                                                                 │
│  │  REGISTRATIONS TAB:                                             │
│  │  [🔍 Search student...]  [Status: All ▼]  [📥 Export CSV]     │
│  │                                                                 │
│  │  ┌───┬────────────┬──────────┬──────────┬──────────┬────────┐ │
│  │  │ # │ Name       │ Student  │ Dept     │ Status   │ Date   │ │
│  │  ├───┼────────────┼──────────┼──────────┼──────────┼────────┤ │
│  │  │ 1 │ Aarav K.  │ A23042.. │ ASET     │ 🟢 Reg   │ 01-May │ │
│  │  │ 2 │ Priya S.  │ A23043.. │ ASET     │ 🟢 Reg   │ 01-May │ │
│  │  │ 3 │ Simran J. │ A23044.. │ ASET(L)  │ 🔴 Canc  │ 30-Apr │ │
│  │  └───┴────────────┴──────────┴──────────┴──────────┴────────┘ │
│  │                                                                 │
│  │  Total: 45 registrations  |  Page 1 of 5                      │
│  │                                                                 │
│  ├────────────────────────────────────────────────────────────────┤
│  │  CERTIFICATES TAB:                                             │
│  │  [Upload Certificate +]  Filter: [All ▼]                      │
│  │                                                                 │
│  │  ┌───┬────────────┬──────────┬──────────┬──────────────────┐  │
│  │  │ # │ Student    │ Event    │ Issued   │ Action           │  │
│  │  ├───┼────────────┼──────────┼──────────┼──────────────────┤  │
│  │  │ 1 │ Aarav K.  │ AI Summit│ 15-May   │ [📥 Download]   │  │
│  │  │ 2 │ Priya S.  │ AI Summit│ 15-May   │ [📥 Download]   │  │
│  │  └───┴────────────┴──────────┴──────────┴──────────────────┘  │
│  │                                                                 │
│  ├────────────────────────────────────────────────────────────────┤
│  │  SETTINGS TAB:                                                 │
│  │  • Change event status: [Publish] [Complete] [Cancel]         │
│  │  • Toggle promoted: [Yes / No]                                │
│  │  • Edit registration limit                                     │
│  │  • Add/remove faculty coordinators                             │
│  │  • Delete event (danger zone, requires confirmation)           │
│  └────────────────────────────────────────────────────────────────┘
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. Create/Edit Event Form Redesign

```
┌──────────────────────────────────────────────────────────────────┐
│  [← Back]  Create New Event                                      │
│                                                                   │
│  ┌── Layout: Two Column ─────────────────────────────────────────│
│  │  ┌─── Left Column (60%) ───────────────┐  ┌─── Right Column ┐│
│  │  │                                      │  │  (40%)           ││
│  │  │  Event Title *                       │  │                  ││
│  │  │  [________________________]          │  │  Poster Upload   ││
│  │  │                                      │  │  ┌────────────┐  ││
│  │  │  Description *                       │  │  │  Drag &    │  ││
│  │  │  [____________________________]      │  │  │  Drop or   │  ││
│  │  │  [____________________________]      │  │  │  Click to  │  ││
│  │  │                                      │  │  │  Upload    │  ││
│  │  │  Department *                        │  │  │  (JPEG/PNG │  ││
│  │  │  [ASET                          ▼]  │  │  │  ≤5MB)     │  ││
│  │  │                                      │  │  └────────────┘  ││
│  │  │  Venue *                             │  │                  ││
│  │  │  [________________________]          │  │  Preview         ││
│  │  │                                      │  │  [thumbnail]     ││
│  │  │  Start Date & Time *                 │  │                  ││
│  │  │  [📅 ____] [⏰ ____]                │  │  Settings        ││
│  │  │                                      │  │  ───────────────││
│  │  │  End Date & Time *                   │  │  Registration    ││
│  │  │  [📅 ____] [⏰ ____]                │  │  Limit: [___]    ││
│  │  │                                      │  │  (0 = unlimited) ││
│  │  │  ─── Custom Fields ───              │  │                  ││
│  │  │  [+ Add Field]                       │  │  🎯 Promoted    ││
│  │  │  [Field Label] [☑ Required] [🗑️]   │  │  [Yes / No]      ││
│  │  │  [Field Label] [☐ Required] [🗑️]   │  │                  ││
│  │  │                                      │  │  Add Faculty     ││
│  │  │  ─── Faculty Coordinators ───       │  │  [Search faculty]││
│  │  │  [+ Add Faculty]                     │  │  [faculty 1 ×]  ││
│  │  │                                      │  │  [faculty 2 ×]  ││
│  │  └──────────────────────────────────────┘  └──────────────────┘│
│                                                                   │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  [🗑️ Delete Draft]                    [💾 Save Draft] [📨 Submit for Approval] │
│  └──────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

---

## 6. Quick Stats Summary (Sidebar Bottom)

Dashboard sidebar ke bottom mein:
```
┌──────────────────────┐
│  Today's Summary      │
│                       │
│   📅  1 event today  │
│   👥  12 new regs    │
│   📄  5 certs issued │
│   🔔  3 unread notifs│
└──────────────────────┘
```

---

## 7. Additional Sections

### 7.1 Certificate Upload Flow (in Event Detail)

```
┌──────────────────────────────────────────────────────────────────┐
│  Issue Certificate                                                │
│                                                                   │
│  Step 1: Select Student           Step 2: Upload PDF             │
│  ┌──────────────────────────────┐ ┌────────────────────────────┐ │
│  │ 🔍 Search student by name/ID │ │ ┌────────────────────────┐ │ │
│  │                              │ │ │ 📄 Drag & drop PDF    │ │ │
│  │ Results:                     │ │ │ or click to upload    │ │ │
│  │ ☐ Aarav Kumar - A2304221000 │ │ │                        │ │ │
│  │ ☐ Priya Singh - A2304221001 │ │ │ Max: 10MB, PDF only   │ │ │
│  │ ☐ Simran Joshi - A2304221002│ │ └────────────────────────┘ │ │
│  │                              │ │                            │ │
│  │ Select all  ✓               │ │ [Upload & Issue]          │ │
│  └──────────────────────────────┘ └────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

**Improvement over current:** Batch upload — coordinator can select multiple students and upload one PDF (or batch PDFs) instead of one-by-one.

### 7.2 Export Modal

```
┌──────────────────────────────────────────────────────────────────┐
│  📥 Export Registrations                                         │
│                                                                   │
│  Format:  ○ CSV  ● Excel  ○ PDF                                  │
│                                                                   │
│  Select Columns:                                                  │
│  ☑ Name      ☑ Student ID  ☑ Email  ☑ Department               │
│  ☑ Year      ☑ Semester    ☐ Phone  ☑ Registered At            │
│  ☑ Status    ☐ Custom Fields                                    │
│                                                                   │
│  [Select All]  [Clear All]                                        │
│                                                                   │
│  Date Range: [May 1, 2026] to [May 31, 2026]                     │
│                                                                   │
│  [📥 Export]  [Cancel]                                            │
└──────────────────────────────────────────────────────────────────┘
```

---

## 8. Color Scheme

| Element | Color |
|---------|-------|
| Primary | Blue (#2563eb) |
| Draft | Gray (#6b7280) |
| Pending | Amber (#f59e0b) |
| Live/Pub | Green (#22c55e) |
| Completed | Blue (#3b82f6) |
| Cancelled | Red (#ef4444) |
| Registered | Green (#22c55e) |

---

## 9. Empty States

1. **No events yet:** "🚀 Ready to create your first event?" with large "Create Event" CTA + illustration
2. **No registrations:** "📭 No registrations yet. Share your event!" with copy-link button
3. **No certificates issued:** "📄 No certificates uploaded yet" with "Upload Now" CTA
4. **No search results:** "🔍 No events match your search"

---

## 10. Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + N` | Create new event |
| `Ctrl/Cmd + F` | Search/filter events |
| `E` | Edit selected event |
| `Delete` | Delete selected event (with confirmation) |

---

## 11. Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| ≥1280px | Full sidebar, 3-col event grid, 4 stat cards row |
| ≥1024px | 3-col event grid, 4 stat cards row |
| ≥768px | Hamburger sidebar, 2-col event grid, 2x2 stat cards |
| ≥640px | 1-col event grid |
| <640px | 1-col event grid, stat cards stacked, create event becomes floating FAB button |
