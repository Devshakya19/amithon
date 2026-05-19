# Student Dashboard — Complete UI/UX Design

---

## 1. Overview Philosophy

Student dashboard ek **"Learning Hub"** ki tarah design karna hai — welcoming, energetic, aur discovery-focused. Yeh portal ka sabse important panel hai kyunki maximum users students hi honge. Design ko **gamified** feel dena hai taake students ko events explore karne aur register karne mein maza aaye.

**Design Keywords:** Modern, Clean, Gamified, Energetic, Welcoming

---

## 2. Layout Structure — 3-Tier Grid

```
+------------------------------------------------------------------+
|  SIDEBAR (w-64)  |         MAIN CONTENT AREA                     |
|  ┌──────────────┐ |                                                |
|  │  User Avatar  │ |  +------------------------------------------+ |
|  │  User Name    │ |  |  WELCOME HEADER SECTION                  | |
|  │  Role Badge   │ |  |  "Hello, Aarav 👋"                      | |
|  │               │ |  |  "Welcome to your learning hub"          | |
|  │  NAV LINKS:   │ |  |  [Stats: Events | Certs | Rank]         | |
|  │  ► Dashboard  │ |  +------------------------------------------+ |
|  │  My Events    │ |                                                |
|  │  Certificates │ |  +--------------------+  +-------------------+ |
|  │  Notifications│ |  | SPOTLIGHT EVENT    |  | QUICK ACTIONS     | |
|  │  Profile      │ |  | Featured/          |  | Browse Catalog    | |
|  │               │ |  | Promoted Event     |  | My Registrations  | |
|  │  [Create]     │ |  | with countdown     |  | Achievements      | |
|  │  [Sign Out]   │ |  +--------------------+  +-------------------+ |
|  +──────────────+ |                                                |
|                    |  +------------------------------------------+ |
|                    |  | YOUR AGENDA — UPCOMING EVENTS            | |
|                    |  | [Timeline/List View Toggle]              | |
|                    |  | [Event 1] — [Date] — [Status Badge]     | |
|                    |  | [Event 2] — [Date] — [Status Badge]     | |
|                    |  +------------------------------------------+ |
|                    |                                                |
|                    |  +------------------------------------------+ |
|                    |  | DISCOVER EVENTS                          | |
|                    |  | [Search...]  [Department ▼] [Sort ▼]    | |
|                    |  | [Card Grid: 3 cols desktop, 2 tab, 1 mob]| |
|                    |  | [Pagination: < 1 2 3 ... >]              | |
|                    |  +------------------------------------------+ |
+------------------------------------------------------------------+
```

---

## 3. Sections in Detail

### 3.1 Welcome Header Section

**Layout:** Full-width hero section with gradient background

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌──────┐   ┌────────────────────────────────────────────────┐  │
│  │      │   │  Hello, Aarav 👋                               │  │
│  │ Av-  │   │  Welcome to your learning hub                  │  │
│  │ atar │   │                                                │  │
│  │ 100px│   │  ┌──────────┐  ┌──────────┐  ┌──────────────┐ │  │
│  │      │   │  │ Events   │  │ Upcoming │  │ Certificates │ │  │
│  │      │   │  │   12     │  │    3     │  │     2        │ │  │
│  └──────┘   │  └──────────┘  └──────────┘  └──────────────┘ │  │
│             └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

**Design Details:**
- Left side: large circular avatar (profile pic ya initials), 100x100px, border-2 primary
- Right: greeting text, 2xl font bold, gradient text from primary to secondary
- Subtitle: subtle gray, "Track your progress, discover new technical events"
- **3 Stat Cards** in a row:
  1. **Total Registrations** — with upward trend arrow + percentage
  2. **Upcoming Events** — with calendar icon, shows count of future registered events
  3. **Certificates Earned** — with award icon, count
- Stat cards should have: icon, big number, small label, subtle background color
- Hover effect: slight scale up + shadow

### 3.2 Spotlight Event Section

**Layout:** Two-column split — left gets the featured event card, right gets quick actions

```
┌─────────────────────────────────┬─────────────────────────────────┐
│  SPOTLIGHT EVENT                │  QUICK ACTIONS                  │
│  ┌─────────────────────────────┐│  ┌─────────────────────────────┐│
│  │  🔥 Featured Event          ││  │  📚 Browse All Events       ││
│  │                             ││  │  → Discover technical       ││
│  │  [POSTER IMAGE]             ││  │    events across depts      ││
│  │  400x200px rounded-xl       ││  └─────────────────────────────┘│
│  │                             ││  ┌─────────────────────────────┐│
│  │  Advanced AI & ML Summit    ││  │  📋 My Registrations        ││
│  │  🗓️ May 25, 2026           ││  │  → View & manage your       ││
│  │  📍 Auditorium              ││  │    registered events        ││
│  │                             ││  └─────────────────────────────┘│
│  │  Registrations: 45/100      ││  ┌─────────────────────────────┐│
│  │  [████████████░░░░░░] 45%  ││  │  🏆 Achievements            ││
│  │                             ││  │  → Your badges & certs      ││
│  │  [Register Now →]          ││  └─────────────────────────────┘│
│  └─────────────────────────────┘│                                 │
└─────────────────────────────────┴─────────────────────────────────┘
```

**Spotlight Event Card Design:**
- Top-left: "🔥 Featured" pill badge with gradient
- Poster image occupies ~60% of card height
- Title: bold, large text
- Date + Venue: with icons, subtle gray
- Progress bar showing registration fill percentage
  - Green if <80%, Orange if 80-95%, Red if 95%+
  - Text: "45 of 100 registered"
- "Register Now →" button — full-width, primary color
- If already registered: Show "✅ Registered" badge instead of button

**Quick Action Cards Design:**
- 3 vertical cards
- Each has: left icon (colored) + title + brief description + arrow
- Hover: background color changes to subtle primary, icon scales up
- Clean borders, rounded-2xl

### 3.3 Your Agenda — Upcoming Events Timeline

```
┌──────────────────────────────────────────────────────────────────┐
│  📋 Your Agenda                    [Timeline] [List] [Calendar]  │
│                                                                   │
│  ┌────── May 2026 ──────────────────────────────────────────────┐│
│  │                                                               ││
│  │  ┌─●─┐  ┌────────────────────────────────────────────────┐   ││
│  │  │ 25│  │  Advanced AI & ML Summit                       │   ││
│  │  │Mon│  │  📍 Auditorium  ⏰ 10:00 AM  🎫 Registered    │   ││
│  │  └───┘  │  [View Details →]  [Cancel Registration]      │   ││
│  │         └────────────────────────────────────────────────┘   ││
│  │                                                               ││
│  │  ┌─●─┐  ┌────────────────────────────────────────────────┐   ││
│  │  │ 28│  │  Web Development Workshop                      │   ││
│  │  │Thu│  │  📍 Lab 201  ⏰ 2:00 PM  🎫 Confirmed         │   ││
│  │  └───┘  │  [View Details →]                              │   ││
│  │         └────────────────────────────────────────────────┘   ││
│  │                                                               ││
│  └────── ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘  │
│                                                                   │
│  ┌────── June 2026 ─────────────────────────────────────────────┐│
│  │  ┌─●─┐  ┌────────────────────────────────────────────────┐   ││
│  │  │ 01│  │  Hackathon 2026                                │   ││
│  │  │Sat│  │  📍 Innovation Hub  🎫 Pending Confirmation   │   ││
│  │  └───┘  └────────────────────────────────────────────────┘   ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                   │
│  [+ View All Registrations →]                                    │
└──────────────────────────────────────────────────────────────────┘
```

**Design Details:**
- Three view modes: Timeline, List, Calendar (toggle buttons top-right)
- **Timeline View:** Left side = date circles (like calendar dots), right = event cards
  - Past events: grayed out slightly
  - Today's events: highlighted with primary color dot
  - Date circle: day number on top, short day name below
- **List View:** Simple rows with event name, date, venue, status, actions
- **Calendar View:** Mini month calendar grid with dots on days that have events
- Each event card shows:
  - Title (bold)
  - Location pin icon + venue
  - Clock icon + time
  - Status badge: 🟢 Registered / 🟡 Pending / 🔴 Cancelled
  - Action buttons: "View Details" link, "Cancel" (only if cancellation allowed)
- If no upcoming events: Empty state with illustration "🎯 No events yet! Start exploring →" and a "Browse Events" button

### 3.4 Discover Events Section

```
┌──────────────────────────────────────────────────────────────────┐
│  🔍 Discover Events                                             │
│                                                                   │
│  ┌──────────────────────────┐  ┌──────────────┐  ┌──────────────┐│
│  │ 🔎 Search events...      │  │ All Depts  ▼│  │ Sort: New ▼ ││
│  └──────────────────────────┘  └──────────────┘  └──────────────┘│
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ [POSTER]        │  │ [POSTER]        │  │ [POSTER]        │  │
│  │                 │  │                 │  │                 │  │
│  │ Robotics        │  │ Cloud Computing │  │ Blockchain      │  │
│  │ Workshop        │  │ Bootcamp        │  │ Seminar         │  │
│  │ 📅 May 30       │  │ 📅 June 5       │  │ 📅 June 10      │  │
│  │ 📍 Lab 301      │  │ 📍 Online       │  │ 📍 Auditorium   │  │
│  │                 │  │                 │  │                 │  │
│  │ [📝 Register]  │  │ [📝 Register]  │  │ [📝 Register]  │  │
│  │ 20/50 registered│  │ 45/45 FULL      │  │ 10/100 reg      │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ [POSTER]        │  │ [POSTER]        │  │ [POSTER]        │  │
│  │                 │  │                 │  │                 │  │
│  │ UI/UX Design    │  │ Competitive     │  │ Python          │  │
│  │ Hackathon       │  │ Programming     │  │ Fundamentals    │  │
│  │ 📅 June 15      │  │ 📅 June 20      │  │ 📅 June 25      │  │
│  │ 📍 Design Lab   │  │ 📍 Room 105     │  │ 📍 Lab 401      │  │
│  │                 │  │                 │  │                 │  │
│  │ [📝 Register]  │  │ [📝 Register]  │  │ [📝 Register]  │  │
│  │ 5/30 reg       │  │ 15/100 reg      │  │ 0/50 reg        │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                   │
│  [< Prev]   Page 1 of 5   [Next >]                              │
│                                                                   │
│  [← Back to Top]                                                 │
└──────────────────────────────────────────────────────────────────┘
```

**Event Card Design (Compact):**
- Poster image on top (16:9 ratio) with rounded top corners
- Hover: poster slight zoom + shadow increase
- Title: semibold, 1.1rem
- Date + Venue: with small icons, subtle gray text
- Registration count: small text at bottom
  - If NOT full: green text "X/Y registered"
  - If FULL: red pill badge "FULL" + disabled button
- "Register" button: full-width, primary
  - If already registered: show "✅ Registered" (disabled, green)
  - If full: show "FULL" (disabled, gray)

**Filters Bar:**
- Search input with magnifying glass icon — debounced search (300ms)
- Department dropdown: "All Depts", "ASET", "ASET (Life Sciences)", etc.
- Sort dropdown: "Newest First", "Registration Closing Soon", "Most Popular"
- Active filters shown as removable chips below search bar
- "Clear All" link when filters active

---

## 4. Color Scheme

| Element | Color | Usage |
|---------|-------|-------|
| Background | Very dark (#0a0a0f) | Page background |
| Surface | Semi-transparent white | Cards, panels |
| Primary | Vibrant blue (#3b82f6) | Buttons, links, active states |
| Secondary | Purple (#8b5cf6) | Accents, gradients |
| Success | Green (#22c55e) | Registered badges, full indicators |
| Warning | Orange (#f59e0b) | Almost full, pending items |
| Error | Red (#ef4444) | Cancelled, errors |
| Text Primary | White (#ffffff) | Headings, main text |
| Text Secondary | Gray (#9ca3af) | Subtitle, descriptions |

---

## 5. Empty States

1. **No upcoming events:** Illustration of calendar with "🎯 No registrations yet" + "Browse Events" CTA button
2. **No discover results:** "🔍 No events match your search" with search term displayed + "Clear filters" button
3. **No certificates:** "🏆 Start participating to earn certificates" + link to browse events
4. **No notifications:** "🔔 All caught up!" with bell illustration

---

## 6. Loading States

- **Skeleton loader** for all card grids (pulsing gray rectangles matching card dimensions)
- **Skeleton timeline** for agenda section (3 rows of date + card skeleton)
- **Spinner** inside buttons during async operations (register, cancel)

---

## 7. Responsive Behavior

| Breakpoint | Layout Changes |
|------------|---------------|
| ≥1280px | 3-column event grid, sidebar visible, full layout |
| ≥1024px | 3-column event grid, sidebar visible |
| ≥768px | 2-column event grid, sidebar collapses to hamburger |
| ≥640px | 2-column event grid |
| <640px | 1-column event grid, stats stack vertically, spotlight goes full-width |

---

## 8. Micro-interactions & Animations

- Cards: fade-in on scroll (staggered, 100ms delay between each)
- Button hover: slight scale (1.02) + brightness increase
- Register click: button shows spinner, changes to "✅ Registered" with bounce animation
- Cancel: confirmation dialog "Are you sure?" with slide-in modal
- Stat counter: animate number from 0 to final value on page load
- Sidebar active link: left border indicator (3px primary) + background tint
- Filter apply: cards fade out/in smoothly
