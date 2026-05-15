# Amithon - Stitch AI Design Prompt

## PROJECT CONTEXT

Design a complete UI for **Amithon**, a technical events portal for Amity University Gwalior. This platform allows students to discover/register for events, coordinators to create/manage events, faculty to oversee events, and HOI to have full administration access.



## ANIMATION & 3D REQUIREMENTS (CRITICAL)

This is a MANDATORY section. Every page MUST include the following animation treatments using Three.js / React Three Fiber / Framer Motion / CSS Animations.

### 3D Animations (Three.js / React Three Fiber)
- **Hero 3D Orb**: A floating, rotating 3D geometric shape (icosahedron/torus knot) in the hero background with slow rotation, emissive glow, and color shift between orange and blue. Use MeshPhysicalMaterial with roughness 0.2, metalness 0.8.
- **3D Particle Field**: Floating 3D particles (spheres/cubes) in hero and stats sections, slowly moving upward, with size variation and opacity fade. Particles should be color-matched to brand (orange, blue, gold, white).
- **Department 3D Icons**: Each department card features a subtle low-poly 3D icon (e.g., gear for ASET, DNA helix for ASET-LS) that rotates 360 degrees on hover.
- **Event Card 3D Tilt**: Event cards have a subtle 3D perspective tilt on mouse move (parallax effect). Max tilt 5 degrees, smooth lerp transition.
- **3D Stat Counter**: Stats numbers count up with a 3D flipping animation (like a retro flip clock) when they enter viewport.
- **3D Background Shape**: Animated 3D wave/ripple plane in the CTA section background using vertex shaders, reacting to mouse position.

### Scroll Animations (Framer Motion / GSAP)
- **Scroll-Triggered Reveal**: All sections fade in + slide up as user scrolls (y: 40px to 0, opacity: 0 to 1, duration: 0.8s, stagger: 0.15s).
- **Parallax Scrolling**: Hero background and 3D elements move at different speeds (parallax factor: 0.3-0.5x) relative to scroll position.
- **Progress Bar**: Reading progress indicator at top of scrollable pages (thin orange bar that fills as user scrolls).

### Hover Animations
- **Card Hover**: Scale 1.02, shadow elevation increase (box-shadow: 0 20px 40px rgba(0,0,0,0.1)), border color transition to primary orange.
- **Button Hover**: Scale 1.05, background gradient shift, subtle glow effect (box-shadow: 0 0 20px rgba(255,111,0,0.3)).
- **Link Hover**: Underline slide-in animation from left, color transition to primary.
- **Nav Item Hover**: Background pill expands with smooth width transition, icon bounce effect.

### Micro-Interactions
- **Page Transition**: Smooth page transitions using Framer Motion AnimatePresence (fade + scale: 0.98 to 1, duration: 0.3s).
- **Loading Skeleton**: Pulsing shimmer effect on skeleton loaders (gradient animation moving left to right).
- **Success Animation**: Confetti burst on registration success using canvas-confetti library.
- **Notification Toast**: Slide-in from right with bounce effect, auto-dismiss with fade out after 5s.
- **Click Ripple**: Ripple effect on button clicks (expanding circle from click point).
- **Form Focus**: Input fields have animated label float effect, border glow transition on focus.

### Performance Notes
- All 3D elements should use `@react-three/drei` Suspense with loading fallback
- Implement `useInView` from framer-motion for intersection-based triggers
- Use `will-change: transform` for GPU-accelerated animations
- Lazy load Three.js components using Next.js dynamic import with ssr: false
- Reduce particle count on mobile (<50 particles, disable 3D)
- Use `prefers-reduced-motion` media query to respect user preferences

---

## DESIGN SYSTEM

### Components Layout
- **Navbar**: Fixed top, blurred background, logo + nav links + auth buttons
- **Sidebar**: Left sidebar for dashboards, collapsible on mobile
- **Footer**: Dark background, 4-column layout, social links
- **Cards**: White bg, border, rounded-2xl, hover elevation
- **Buttons**: Orange primary, navy secondary, outline variants
- **Forms**: Clean inputs with orange focus ring
- **Badges**: Rounded-full, color variants per status
- **Tables**: Bordered, striped rows for data display
- **Modals**: Centered overlay for confirmations

---

## ALL PAGES TO GENERATE

---

### SECTION 1: MARKETING PAGES (Public)

#### 1.1 Landing Page (Home) `/`
**Sections:**
- **Hero**: Full-width gradient background, **3D rotating icosahedron/torus knot** floating center-right with emissive glow, **3D particle field** in background slowly drifting upward, large heading with **text reveal animation** (staggered chars), subtitle, two CTA buttons with **pulse glow animation**, stats row with **3D flip-counter animation** on appear
- **Features Grid**: 6 feature cards in 3-column grid, **staggered scroll-reveal** (left-right alternate), **3D tilt on hover**, icon with **float animation**
- **Upcoming Events**: Section title "Upcoming Events" with **underline expand animation** on scroll, promoted event card with **gradient border animation** (rotating gradient), 3 event cards with **3D perspective tilt** on mouse move
- **Stats Bar**: Full-width gradient section, **3D animated icons** floating, **number count-up** with 3D flip effect
- **Testimonials**: 3 testimonial cards, **fade-in stagger**, **auto-playing carousel** on mobile with smooth transitions, **star float animation**
- **CTA Section**: Gradient bordered card with **pulsing border glow**, **3D wave background**, buttons with **magnetic hover effect** (follows cursor slightly)
- **Footer**: Dark bg, 4 columns - Brand info with social icons, Quick Links, Contact info, Copyright

#### 1.2 Events Page `/events`
- **Header**: Title with **staggered text reveal**, subtitle fade-in
- **Search Bar**: Animated expand on focus, **border glow transition**, smooth icon morph
- **Category Tabs**: **Scroll animation** - active tab has **bouncing indicator**, hover tabs have **underline slide**
- **Event Grid**: **Staggered card reveal** on scroll (each card fades up with delay), **3D tilt** on hover per card
- **Event Card**: **Hover scale 1.03** with shadow lift, **gradient border animate** on promoted cards, registration count has **animated progress bar fill**
- **Empty State**: **Bouncing search icon** animation, fade-in text

#### 1.3 Event Details Page `/events/[id]`
- **Promoted Banner** (if applicable): **Animated gradient sweep** across banner
- **Event Header**: Poster image with **zooming reveal** on load, title **typewriter effect**, badges with **pop-in animation**
- **Info Row**: Icons with **bounce-in stagger**, progress bar with **animated fill** from 0 to current value
- **Description**: **Fade-in** on scroll with smooth height expand
- **Custom Info Fields**: **Staggered reveal**, each field slides in from right
- **Registration Section**: 
  - If not registered: Form fields **animate in** sequentially, auto-fill fields **highlight with green flash**, button has **pulse attract animation** (subtle scale pulse)
  - If registered: **Celebration confetti** burst, "Already Registered" with **checkmark circle fill animation**
  - If limit reached: "Registration Full" with **animated X icon** and **progress bar at 100% red pulse**
- **Certificates Section**: Certificate icon with **floating download animation**, button **glow pulse** to attract attention
- **Coordinator Info**: Avatar **scale-in** with contact info **slide-up**

#### 1.4 About Page `/about`
- **Hero**: "About Amithon" badge, heading, description
- **Mission Section**: Left text with bullet points, right card with stats
- **Stats Bar**: Same as home (4 stats)
- **Departments Grid**: 7 department cards with icons, names, descriptions, event counts
- **Team Section**: 4 team member cards with avatar circles, name, role, department

#### 1.5 Departments Page `/departments`
- **Header**: Title "Schools of Amity University Gwalior", subtitle
- **Department Grid**: 3-column grid of detailed department cards
- **Department Card**: Color bar on top, icon, name, full description, event count, "View Events" button

#### 1.6 Gallery Page `/gallery`
- **Header**: Title with **sparkle/star particle animation**, subtitle fade-in
- **Category Tabs**: **Morphing tab indicator** (shape shifts smoothly between tabs), hover **glow effect**
- **Photo Grid**: **Masonry layout with staggered reveal**, photos **zoom-in on appear** (scale 0.8 to 1)
- **Photo Card**: **3D perspective lift** on hover, **image zoom** (scale 1.1) with smooth transition, overlay **slide-up with blur**, "View Photos" button **rotate-in on hover**. **Lightbox modal** with **swipe gesture support** and **animated image transitions**

#### 1.7 FAQ Page `/faq`
- **Header**: Title "Frequently Asked Questions", subtitle
- **Category Tabs**: All, General, Events, Registration, Certificates
- **Accordion List**: Expandable question-answer items with chevron icon rotation

#### 1.8 Contact Page `/contact`
- **Header**: "Get in Touch" badge, title, subtitle
- **Two-Column Layout**:
  - Left: Contact form (name, email, subject, message fields, submit button)
  - Right: Info cards stack (Address with map pin, Email with mail icon, Phone, Follow Us social links)

#### 1.9 Login Page `/login`
- **Two-Column Layout**:
  - Left: Form with email input, password input, forgot password link, submit button, divider "or continue with", Google OAuth button, sign up link
  - Right: Gradient background with motivational content, emoji icons, "Your Gateway to Technical Events" text

#### 1.10 Register Page `/register`
- **Two-Column Layout**:
  - Left: Registration form with First Name, Last Name, Amity Enrollment No, Amity Email, Branch (dropdown), Year (dropdown), Password, Create Account button, Google OAuth, sign in link, terms & privacy notice
  - Right: Gradient background with benefits list, "Join the Amithon Community" text, checkmark benefits

#### 1.11 404 Not Found Page
- Centered layout with large "404" text, message, "Go Home" button

---

### SECTION 2: STUDENT DASHBOARD PAGES

#### 2.1 Student Dashboard Home `/dashboard`
- **Layout**: Left sidebar + main content area
- **Sidebar**: Logo, nav items (Dashboard, My Events, Profile, Certificates, Notifications), user avatar + name at bottom
- **Welcome Section**: "Welcome back, [Name]!" greeting with current date
- **Stats Cards Row**: 4 small cards in row - Registered Events, Upcoming Events, Certificates Earned, Notifications
- **Upcoming Events**: List of next 3 upcoming registered events with date, time, status badge
- **Recent Activity**: Timeline of recent activity (registration, certificate, etc.)
- **Quick Actions**: "Browse Events", "My Profile", "My Certificates" buttons

#### 2.2 My Events (Student) `/dashboard/events`
- **Tabs**: Upcoming, Past, Cancelled
- **Event List**: Table or card list of registered events
- **Event Row**: Event name, date, status badge (Upcoming/Completed/Cancelled), registration ID, "View Details" action button, "Cancel Registration" (if upcoming)
- **Empty State**: "No events registered yet. Browse events to register."

#### 2.3 Event Registration Page (Student View) `/dashboard/events/[id]`
- **Event Header**: Title, department, date/time/venue
- **Registration Form**: Pre-filled fields from profile (Name, Enrollment No, Email, Phone, Branch, Year, Semester), any custom fields added by coordinator
- **Terms Checkbox**: "I confirm my participation"
- **Submit Button**: "Register Now" (orange)
- **Already Registered Message**: If already registered, show confirmation with registration details

#### 2.4 Student Profile `/dashboard/profile`
- **Avatar Section**: Profile picture with upload button
- **Form Fields**: First Name, Last Name, Email (read-only), Enrollment No (read-only), Phone, Branch (dropdown), Year (dropdown), Semester (dropdown), Department (dropdown)
- **Save Button**: "Save Changes"
- **Password Change Section**: Current Password, New Password, Confirm New Password, "Update Password" button

#### 2.5 Student Certificates `/dashboard/certificates`
- **Certificate List**: Grid or list of earned certificates
- **Certificate Card**: Event name, date, certificate preview placeholder, "Download PDF" button
- **Empty State**: "No certificates yet. Participate in events to earn certificates."

#### 2.6 Notifications `/dashboard/notifications`
- **Notification List**: Chronological list with icons per type (event_update, registration, certificate, reminder)
- **Notification Item**: Icon, title, message, timestamp, read/unread indicator
- **Mark as Read**: Click to mark individual or "Mark All as Read" button
- **Empty State**: "No notifications"

---

### SECTION 3: COORDINATOR DASHBOARD PAGES

#### 3.1 Coordinator Dashboard Home `/dashboard`
- **Layout**: Left sidebar + main content
- **Sidebar**: Logo, nav items (Dashboard, My Events, Create Event, Profile, Notifications)
- **Stats Cards**: Total Events Created, Active Events, Total Registrations, Certificates Uploaded
- **Quick Actions**: "Create New Event" (prominent button), "View Registrations", "Export Data"
- **Recent Events**: Table of recent events with title, date, registration count, status
- **Registration Activity**: Chart or bar showing registration trends

#### 3.2 My Events (Coordinator) `/dashboard/events`
- **Tabs**: All, Upcoming, Ongoing, Completed, Draft, Cancelled
- **Event Table**: Title, date, venue, registration count (with progress bar if limit set), status badge, actions (Edit, View, Delete, Upload Certs)
- **Bulk Actions**: "Export All as Excel" button
- **Empty State**: "No events created yet. Create your first event."

#### 3.3 Create Event `/dashboard/events/create`
- **Form Sections**:
  - **Basic Info**: Event Title, Description (textarea), Category (dropdown: Hackathon, Workshop, Seminar, Competition, Tech Talk)
  - **Schedule**: Date (date picker), Time (time picker), Venue (text input)
  - **Media**: Poster Image upload (drag & drop)
  - **Registration Settings**: Registration Limit (optional number), Registration Deadline (date picker)
  - **Promotion**: Toggle "Promote this event" (featured at top)
  - **Custom Fields Builder**: Dynamic form where coordinator can add custom fields with title + content, ability to add/remove fields
  - **Faculty Assignment**: Search and add faculty members to the event (by name/email)
  - **Submit Button**: "Create Event" (orange)

#### 3.4 Edit Event `/dashboard/events/[id]/edit`
- Same form as Create Event but pre-filled with existing data
- "Save Changes" and "Cancel" buttons
- "Delete Event" danger button at bottom with confirmation modal

#### 3.5 Event Details (Coordinator View) `/dashboard/events/[id]`
- **Event Header**: Title, status badge, edit button, delete button
- **Event Info**: Full event details displayed
- **Registration Tab**: Table of registered students with columns: S.No, Name, Enrollment No, Email, Phone, Branch, Year, Custom fields (dynamic), Registered At. Search bar for filtering.
- **Export Button**: "Export to Excel" with column selector modal
- **Certificate Upload Tab**: Upload PDF certificates section with drag & drop, list of uploaded certificates with download links
- **Faculty Section**: List of faculty added to this event

#### 3.6 Export Excel Modal
- **Modal Overlay**: "Export Registrations" title
- **Column Selector**: Checkbox list of all columns (Name, Enrollment No, Email, Phone, Branch, Year, Semester, Custom fields, Registered At)
- **Format Options**: .xlsx or .csv
- **Export Button**: "Download Excel"

#### 3.7 Upload Certificates Page `/dashboard/events/[id]/certificates`
- **Upload Section**: Drag & drop zone for PDF files, "Upload" button
- **Uploaded List**: Table of uploaded certificates with filename, upload date, download link, delete button
- **Batch Upload**: Option to upload multiple PDFs at once
- **Instructions**: "Upload certificates as PDF. Students can download from their dashboard."

#### 3.8 Coordinator Profile `/dashboard/profile`
- Same as student profile but with additional fields: Coordinator ID, Department (assigned), Events Created count

#### 3.9 Coordinator Notifications `/dashboard/notifications`
- Same as student notifications

---

### SECTION 4: FACULTY DASHBOARD PAGES

#### 4.1 Faculty Dashboard Home `/dashboard`
- **Layout**: Left sidebar + main content
- **Sidebar**: Logo, nav items (Dashboard, My Events, Profile)
- **Stats Cards**: Events Added To Me, Upcoming Events, Total Registrations, Pending Actions
- **My Events List**: Events where faculty has been added by coordinator
- **Quick Actions**: "View Added Events", "Browse All Events"

#### 4.2 My Events (Faculty View) `/dashboard/events`
- **Tabs**: All, Upcoming, Completed
- **Event Table**: Event title, coordinator name, date, department, registration count, status, "View Details" action
- **Access Level Indicator**: Shows "Full Access" badge for events they're added to

#### 4.3 Event Details (Faculty View) `/dashboard/events/[id]`
- **If Added to Event**:
  - Full event details
  - Full student registration table (same as coordinator view)
  - Export Excel button
  - Certificate download access
- **If NOT Added to Event**:
  - Event details only (title, description, date, time, venue)
  - Registration count only (no student details)
  - "Request Access" button (or message)

#### 4.4 Faculty Profile `/dashboard/profile`
- Same as profile pages

---

### SECTION 5: HOI DASHBOARD PAGES

#### 5.1 HOI Dashboard Home `/dashboard`
- **Layout**: Left sidebar + main content
- **Sidebar**: Logo, nav items (Dashboard, All Events, Users, Analytics, Profile)
- **Stats Cards**: Total Events, Total Students, Active Coordinators, Total Departments
- **Charts Section**: 
  - Bar chart: Events per department
  - Line chart: Registration trends over time
  - Pie chart: Event categories distribution
- **Recent Activity**: Latest events created, latest registrations, pending approvals
- **Quick Actions**: "View All Events", "Manage Users", "View Analytics"

#### 5.2 All Events (HOI View) `/dashboard/events`
- **Full Access**: See ALL events across all departments
- **Filters**: By department, date range, status, coordinator
- **Event Table**: Title, department, coordinator, date, registration count, status, actions
- **Bulk Actions**: Export all data
- **Search**: Full-text search across all events

#### 5.3 Event Details (HOI View) `/dashboard/events/[id]`
- **Full Access**: Complete event details
- **Full Registration Table**: All student data
- **Coordinator Info**: Coordinator details
- **Faculty List**: All faculty added
- **Export Button**: Export data
- **Actions**: Edit, Delete, Change Status

#### 5.4 Manage Users `/dashboard/users`
- **Tabs**: All Users, Students, Coordinators, Faculty
- **User Table**: Avatar, Name, Email, Enrollment No, Role, Department, Status, Actions
- **Actions per User**: Edit Role, Edit Details, Deactivate, Delete
- **Search**: Search by name, email, enrollment
- **Add User Button**: Modal to add new user manually
- **Invite Button**: Send invitation email to new users

#### 5.5 Add/Edit User Modal
- **Form**: Name, Email, Enrollment No, Role (dropdown), Department (dropdown), Branch, Year
- **Save Button**: "Add User"

#### 5.6 Analytics Dashboard `/dashboard/analytics`
- **Overview Cards**: Total Events (with % change), Total Registrations, Active Users, Departments
- **Charts**:
  - Events per Department (bar chart)
  - Monthly Registrations (line chart)
  - Event Type Distribution (pie chart)
  - Department-wise Registration (horizontal bar chart)
- **Top Events Table**: Events with most registrations (ranked)
- **Export Analytics**: Download analytics as PDF/Excel
- **Date Range Selector**: Filter analytics by date range

#### 5.7 HOI Profile `/dashboard/profile`
- Same as profile pages

---

### SECTION 6: COMMON UI COMPONENTS

#### 6.1 Sidebar Navigation (All Dashboards)
- **Header**: Amithon logo + name (collapsible)
- **Nav Items**: Icons + labels, active state highlight, role-based items
- **User Section**: Avatar, name, role badge, logout button
- **Mobile**: Hamburger toggle, slide-out overlay

#### 6.2 Data Tables
- **Header Row**: Dark background, white text, sortable columns
- **Data Rows**: Alternating white/light gray, hover highlight
- **Pagination**: Page numbers, prev/next, rows per page selector
- **Actions Column**: Icons for edit, view, delete, download
- **Search**: Search bar above table
- **Empty State**: Centered message with icon

#### 6.3 Modals
- **Confirm Modal**: Warning icon, title, message, Cancel/Confirm buttons
- **Form Modal**: Title, form fields, Save/Cancel buttons
- **Full Modal**: Full-screen overlay for complex forms

#### 6.4 Loading States
- **Page Loader**: Centered spinner or skeleton screens
- **Button Loader**: Spinner inside button
- **Table Loader**: Skeleton rows
- **Card Loader**: Pulsing placeholder cards

#### 6.5 Error States
- **Page Error**: "Something went wrong" with retry button
- **Form Error**: Red border on fields, error message below
- **API Error**: Toast notification at top-right
- **Network Offline**: Banner at top

---

## USER FLOWS TO DESIGN

### Flow 1: Student Registration
1. User visits Home Page → Clicks "Get Started" → Register Page
2. Fills registration form → Creates Account → Auto-login
3. Redirect to Student Dashboard → Sees empty state
4. Browses Events → Finds event → Clicks "Register"
5. Registration form auto-fills → Confirms → Success notification
6. Views in "My Events" → Downloads certificate after event

### Flow 2: Coordinator Creating Event
1. Coordinator Logs In → Dashboard
2. Clicks "Create Event" → Fills event form → Adds poster image
3. Sets registration limit → Adds custom fields → Adds faculty
4. Submits → Event goes live → Views in "My Events"
5. Sees registrations coming in → Exports Excel after event
6. Uploads certificates → Students can download

### Flow 3: Faculty Access
1. Faculty Logs In → Dashboard → Sees events they're added to
2. Clicks event → Full student data visible
3. Tries to view another event → Only sees details + count, no student data

### Flow 4: HOI Management
1. HOI Logs In → Dashboard with full analytics
2. Views all events → Filters by department → Exports data
3. Manages Users → Changes roles → Adds new users
4. Views analytics → Sees department-wise breakdown

---

## RESPONSIVE BREAKPOINTS

- **Desktop (1280px+)**: Full layout with sidebar, 3-column grids
- **Tablet (768px-1279px)**: Collapsed sidebar, 2-column grids
- **Mobile (<768px)**: Bottom navigation or hamburger menu, single column

---

## DESIGN REQUIREMENTS

### Marketing Pages
- High visual impact with gradients and animations
- Focus on conversion (sign up, explore events)
- Professional, trustworthy feel

### Dashboard Pages
- Clean, functional, data-dense
- Easy navigation, quick actions
- Clear data hierarchy (stats → tables → details)
- Consistent sidebar and header

### Auth Pages
- Simple, focused, minimal distractions
- Clear call-to-action
- Trust indicators (privacy notice, terms)

---

## OUTPUT FORMAT REQUIREMENTS

Generate ALL screens in Stitch with:
1. A complete DESIGN.md file with full design system
2. All screens properly connected with navigation
3. Interactive prototypes where possible
4. Export ready HTML/CSS or React/Tailwind code
5. Responsive variants for mobile and desktop

---

## PAGE INDEX (Total: ~35+ Pages/Screens)

| # | Page | Route | Role |
|---|------|-------|------|
| 1 | Landing Home | `/` | Public |
| 2 | Events Listing | `/events` | Public |
| 3 | Event Details | `/events/[id]` | Public |
| 4 | About | `/about` | Public |
| 5 | Departments | `/departments` | Public |
| 6 | Gallery | `/gallery` | Public |
| 7 | FAQ | `/faq` | Public |
| 8 | Contact | `/contact` | Public |
| 9 | Login | `/login` | Public |
| 10 | Register | `/register` | Public |
| 11 | 404 Not Found | - | Public |
| 12 | Student Dashboard Home | `/dashboard` | Student |
| 13 | My Events (Student) | `/dashboard/events` | Student |
| 14 | Event Registration | `/dashboard/events/[id]` | Student |
| 15 | Profile | `/dashboard/profile` | Student |
| 16 | Certificates | `/dashboard/certificates` | Student |
| 17 | Notifications | `/dashboard/notifications` | Student |
| 18 | Coordinator Dashboard Home | `/dashboard` | Coordinator |
| 19 | My Events (Coordinator) | `/dashboard/events` | Coordinator |
| 20 | Create Event | `/dashboard/events/create` | Coordinator |
| 21 | Edit Event | `/dashboard/events/[id]/edit` | Coordinator |
| 22 | Event Details (Coordinator) | `/dashboard/events/[id]` | Coordinator |
| 23 | Upload Certificates | `/dashboard/events/[id]/certificates` | Coordinator |
| 24 | Faculty Dashboard Home | `/dashboard` | Faculty |
| 25 | My Events (Faculty) | `/dashboard/events` | Faculty |
| 26 | Event Details (Faculty) | `/dashboard/events/[id]` | Faculty |
| 27 | HOI Dashboard Home | `/dashboard` | HOI |
| 28 | All Events (HOI) | `/dashboard/events` | HOI |
| 29 | Event Details (HOI) | `/dashboard/events/[id]` | HOI |
| 30 | Manage Users | `/dashboard/users` | HOI |
| 31 | Analytics | `/dashboard/analytics` | HOI |
| 32 | Add/Edit User Modal | - | HOI |
| 33 | Export Excel Modal | - | Coordinator |
| 34 | Confirm Delete Modal | - | All |

---

**END OF PROMPT** - Use this prompt in Stitch AI (stitch.withgoogle.com) to generate all UI designs for Amithon.
