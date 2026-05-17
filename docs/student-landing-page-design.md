# Student Landing Page Design - `/events`

## Overview
The student landing page (served at `/events`) is the primary destination for students after login. It serves as a centralized hub for discovering, browsing, and registering for technical events across Amity University.

---

## Page Architecture

### 1. Hero Section
**Purpose**: Welcome users and establish the value proposition

**Layout**: Full-width gradient background with animated orbs
- **Height**: 280px on desktop, 320px on mobile
- **Background**: Gradient from primary-container to tertiary-container with dot grid pattern
- **Animations**: 
  - Floating background orbs (20s continuous animation)
  - Fade-in heading and subheading
  - Staggered stat pill animations

**Content Structure**:
```
┌─────────────────────────────────────────────────────┐
│  [BADGE] Welcome to Amithon                          │
│                                                      │
│  Discover Elite Technical Events                     │
│  [gradient text effect]                              │
│                                                      │
│  Explore a world of opportunities with events        │
│  from across Amity University. Register, participate,│
│  and elevate your technical skills.                  │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │📅 Events │  │👥 10K+ │  │🏆 50+   │          │
│  │ Available│  │Community│  │ Opportunities
│  └──────────┘  └──────────┘  └──────────┘          │
└─────────────────────────────────────────────────────┘
```

**Components**:

1. **Badge**: 
   - Icon: `<Sparkles />`
   - Text: "Welcome to Amithon"
   - Background: `primary-container/20` with border
   - Size: 12px font

2. **Main Heading**:
   - Text: "Discover Elite **Technical Events**"
   - Size: `text-5xl md:text-6xl` (responsive)
   - Weight: `font-black` (900)
   - Line Height: `leading-[1.1]`
   - Gradient: Primary → Tertiary → Secondary
   - Max Width: 2xl

3. **Subheading**:
   - Text: Engaging copy about opportunities
   - Size: `text-lg md:text-xl`
   - Color: `text-on-surface-variant`
   - Max Width: 2xl

4. **Stats Grid** (3 columns on desktop, 1 on mobile):
   - **Events Available**
     - Icon: `<Calendar />` (primary color)
     - Label: "Events Available"
     - Value: Dynamic from API (total count)
   - **Community**
     - Icon: `<Users />` (tertiary color)
     - Label: "Community"
     - Value: "10K+"
   - **Opportunities**
     - Icon: `<Trophy />` (secondary color)
     - Label: "Opportunities"
     - Value: "50+"

   Each stat card:
   - Background: `glass-panel` style
   - Padding: `p-6`
   - Border Radius: `rounded-2xl`
   - Hover Effect: Shadow increase + icon background darkens
   - Transitions: Smooth 300ms

---

### 2. Search & Filter Section
**Purpose**: Help users find relevant events efficiently

**Layout**: Full-width with top border separator

**Content Structure**:
```
┌─────────────────────────────────────────────────────┐
│ 🔍 Find Events                                      │
│                                                      │
│ ┌──────────────────────────────────────────────┐   │
│ │ 🔍 Search by event title or keyword...      │   │
│ └──────────────────────────────────────────────┘   │
│ ┌────────────────────────┐                         │
│ │ All departments ▼      │                         │
│ └────────────────────────┘                         │
└─────────────────────────────────────────────────────┘
```

**Components**:

1. **Section Header**:
   - Icon: `<Search />`
   - Text: "Find Events"
   - Font Size: `text-lg`
   - Font Weight: `font-semibold`
   - Color: `text-on-surface`

2. **Search Input**:
   - Width: Full on mobile, flex-1 on desktop
   - Height: `h-12` (48px)
   - Padding: `px-4`
   - Border Radius: `rounded-xl`
   - Class: `input-recessed`
   - Placeholder: "Search by event title or keyword..."
   - Focus State: Outline removed with smooth transition

3. **Department Filter Dropdown**:
   - Width: Full on mobile, `w-64` on desktop
   - Height: `h-12` (48px)
   - Padding: `px-4`
   - Border Radius: `rounded-xl`
   - Class: `input-recessed`
   - Options: All departments + individual departments from `departments` array
   - Default: "All departments"

**Layout**:
- Container: `glass-panel rounded-2xl p-4 md:p-6`
- Grid: `flex flex-col md:flex-row gap-4 md:items-center`
- Gap: `gap-4` (1rem)

---

### 3. Events Grid Section
**Purpose**: Display searchable, filterable list of events

**Layout**: Full-width with consistent padding

**Content Structure**:
```
┌─────────────────────────────────────────────────────┐
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │          │  │          │  │          │         │
│  │ Event 1  │  │ Event 2  │  │ Event 3  │         │
│  │          │  │          │  │          │         │
│  └──────────┘  └──────────┘  └──────────┘         │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │ Event 4  │  │ Event 5  │  │ Event 6  │         │
│  └──────────┘  └──────────┘  └──────────┘         │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │ Event 7  │  │ Event 8  │  │ Event 9  │         │
│  └──────────┘  └──────────┘  └──────────┘         │
│                                                      │
│         ← Previous | Page 1 of 5 | Next →          │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Event Card** (each card displays):
- Event poster/banner image
- Event title
- Department badge
- Date & time
- Location
- Quick stats (e.g., registered count)
- Call-to-action button (Register/View Details)
- Hover animations and transitions

**Grid Structure**:
- Columns: 3 on desktop, 1 on tablet/mobile
- Gap: `gap-6` (1.5rem between cards)
- Container Padding: `py-16` (4rem vertical), `px-6` (1.5rem horizontal)
- Max Width: `max-w-6xl` centered

**Event Card Component** (`<EventCard />`):
- Background: `glass-panel` or `card-surface` style
- Border Radius: `rounded-2xl`
- Padding: `p-4` or `p-6`
- Transitions: Smooth hover effects (scale, shadow)
- Interactive Elements: Clickable to `/events/[id]`, Register button

---

### 4. Pagination Controls
**Purpose**: Navigate between pages of events

**Layout**: Centered below event grid

**Content Structure**:
```
         ← Previous | Page 1 of 5 | Next →
```

**Components**:

1. **Previous Button**:
   - Icon/Text: "← Previous"
   - Height: `h-10` (40px)
   - Padding: `px-6`
   - Border: `border border-primary-container/40`
   - Background: Transparent, hover: `bg-primary-container/10`
   - Text Color: `text-primary`
   - Font: `text-sm font-semibold`
   - Disabled: `opacity-40`, `cursor-not-allowed`
   - Disabled When: `page <= 1`

2. **Page Indicator**:
   - Format: "Page **1** of **5**"
   - Text Color: `text-on-surface-variant`
   - Page Numbers: Bold, `text-on-surface`
   - Font Size: `text-sm`
   - Font Weight: `font-medium`

3. **Next Button**:
   - Icon/Text: "Next →"
   - Same styling as Previous button
   - Disabled When: `page >= totalPages`

**Container**:
- Display: `flex items-center justify-center`
- Gap: `gap-4` (1rem between buttons/text)
- Margin Top: `mt-12` (3rem)
- Animation: Fade-in + slide-up on load

---

## Color & Typography

### Colors Used:
- **Primary Container**: Main accent, buttons, highlights
- **Tertiary**: Secondary accent for variety
- **Secondary**: Tertiary accent for balanced palette
- **Background**: Page background
- **Surface/Surface Container**: Card backgrounds
- **On-Surface**: Main text
- **On-Surface-Variant**: Secondary text, labels
- **Outline/Outline-Variant**: Borders, subtle elements

### Typography:
- **Headings**: Font weight 600-900, tracking tight
- **Body**: Font weight 400-600
- **Labels**: Font weight 500-600, uppercase or capitalized
- **Font Family**: `font-sans`

---

## Responsive Design Breakpoints

### Desktop (1024px+):
- Hero: Full bleed with 280px height
- Stats: 3-column grid
- Search: Flex row with input flex-1 and dropdown w-64
- Event Grid: 3 columns with gap-6
- Pagination: Horizontal center-aligned

### Tablet (768px - 1024px):
- Hero: Full bleed with 280px height
- Stats: 3-column grid (or 2-column if screen < 900px)
- Search: Flex row with input flex-1 and dropdown w-64
- Event Grid: 2 columns with gap-4
- Pagination: Horizontal center-aligned

### Mobile (<768px):
- Hero: Full bleed with 320px height
- Stats: 1-column grid, stacked vertically
- Search: Flex column, full width each
- Event Grid: 1 column
- Pagination: Vertical stack or horizontal with wrapping

---

## Animation & Interaction

### Hero Section Animations:
1. **Floating Orbs**:
   - Right orb: 50px right, -30px up, back (20s cycle)
   - Left orb: -40px left, 40px down, back (15s cycle)
   - Both: Continuous loop with linear easing

2. **Fade-in**:
   - Heading & subheading: Fade in from bottom (20px) over 600ms
   - Stats: Staggered fade-in with 100ms delay between each (0.5s total)

### Event Card Hover:
- Scale: 1.02x
- Shadow: Increase from base to elevated
- Transition: 300ms smooth

### Button Hover:
- Background: Add overlay effect
- Scale: 1.01x on hover, 0.98x on active
- Transition: 300ms smooth

### Input Focus:
- Border/Outline: Smooth transition to focus state
- Background: Subtle highlight
- Transition: 300ms

---

## States & Error Handling

### Loading States:
- Event Grid: Skeleton loaders while fetching
- Pagination: Disabled while loading

### Empty States:
- No Results Found:
  - Message: "No events found matching your search"
  - Suggestion: "Try adjusting your filters or search keywords"
  - Action Button: "Clear Filters" or "Browse All"

### Error States:
- Network Error:
  - Message: "Failed to load events. Please try again."
  - Action Button: "Retry" or "Refresh Page"

---

## Accessibility Considerations

- **Keyboard Navigation**: All buttons and inputs accessible via Tab
- **ARIA Labels**: Inputs and buttons have descriptive labels
- **Color Contrast**: Text meets WCAG AA standards
- **Focus States**: Clear visual indicator for focused elements
- **Screen Reader Support**: Semantic HTML, descriptive alt text for images
- **Motion**: Respects `prefers-reduced-motion` setting (Framer Motion support)

---

## Performance Optimizations

- **Image Optimization**: Event posters use Next.js `<Image />` component
- **Lazy Loading**: Event cards lazy-load as they enter viewport
- **Pagination**: Events paginated (9 per page) to limit initial load
- **Code Splitting**: Page components are code-split for faster initial load
- **CSS-in-JS**: Tailwind CSS for minimal bundle size

---

## Related Files

- **Component**: [`src/app/events/page.tsx`](src/app/events/page.tsx)
- **Event List**: [`src/components/events/EventList.tsx`](src/components/events/EventList.tsx)
- **Event Card**: [`src/components/events/EventCard.tsx`](src/components/events/EventCard.tsx)
- **Utilities**: [`src/lib/departments.ts`](src/lib/departments.ts)
- **Styling**: Global CSS in [`src/app/globals.css`](src/app/globals.css)

---

## User Flow After Login

1. User logs in successfully
2. Profile check: 
   - If incomplete → Redirected to `/profile` to complete setup
   - If complete → Proceeds to next step
3. Student user → Lands on `/events` (this page)
4. User can:
   - Browse events with search and filters
   - Click event card to view details
   - Register for events
   - Pagination to view more events

---

## Future Enhancements

- [ ] Bookmark/favorite events
- [ ] Recommended events based on user profile
- [ ] Event categories/tags
- [ ] Event countdown timers
- [ ] User's registered events section at top
- [ ] Event reminder notifications
- [ ] Share event functionality
- [ ] Student feedback/ratings on past events
