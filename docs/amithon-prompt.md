# Amithon - Building Prompt

**Role:** Elite-level Startup CTO, Principal Software Architect, Senior Product Strategist, Systems Designer

**Project:** Amithon - Technical Events Portal for Amity University

---

## MANDATORY APPROACH

**FIRST:** Understand deeply before generating solutions.
**SECOND:** Ask intelligent follow-up questions if unclear.
**THIRD:** Think about scalability, security, edge cases.
**FOURTH:** Generate complete architecture documentation.

---

## PROJECT CONTEXT

### What is Amithon?
Amithon is a unified digital portal for managing technical events across Amity University departments (initially ASET, then all 7 departments).

### Problem Being Solved
Replace scattered WhatsApp/notice board communication with a centralized platform for event discovery, registration, and management.

### Target Users
- **HOI:** Head of Institution - Full admin, approves events
- **Faculty:** Faculty coordinators - Manage coordinators & events
- **Coordinator:** Student coordinators - Create & manage events
- **Students:** Event participants - Browse, register, download certificates

---

## CORE REQUIREMENTS

### 1. Authentication
- Email/Password signup and login
- Google OAuth (Amity email only - @amity.edu.in)
- Role-based access: Student, Coordinator, Faculty, HOI

### 2. Profile Management
- Students create profile with: Name, Enrollment No, Email, Phone, Branch, Year, Semester, Department, Profile Pic
- Auto-fill registration forms from profile data

### 3. Event Management
- Coordinators create events with: Title, Description, Date, Time, Venue, Poster
- Add/remove custom info fields
- Set registration limit (optional)
- Live registration count with "Full" status
- Edit/delete events

### 4. Registration System
- Students register for events
- Form auto-fills from profile
- Cancel registration (removes from Excel)
- View registered events in dashboard

### 5. Certificates
- Coordinator uploads PDF certificates
- Students download from event page

### 6. Excel Export
- Coordinators export registrations
- Customize columns before export

### 7. Notifications
- In-app notifications (Appwrite only, no external service)

### 8. Data Isolation
- Coordinator sees only own events
- Faculty sees events they're added to (with student details)
- Other faculty see event + count only (no student details)
- HOI sees all

---

## TECHNICAL ARCHITECTURE

### Stack
- **Frontend:** Next.js 14, React 19, TypeScript, Tailwind CSS
- **Backend:** Node.js via Next.js API Routes
- **Database:** Appwrite Database
- **Auth:** Appwrite Auth (Email + Google OAuth)
- **Storage:** Appwrite Storage (posters, certificates)
- **Real-time:** Appwrite Realtime

### Key Collections Required
```
1. users - User profiles with role
2. departments - Department list
3. events - Event details
4. registrations - Event registrations
5. notifications - In-app notifications
```


## DEVELOPMENT PHASES

### Phase 1: Marketing Pages (Current Priority)
- Landing page with featured events
- About page
- Contact page
- Events listing page (public view)
- Sign up / Login pages
- Purpose: Show project to others and gather feedback

### Phase 2: Core Features
- User authentication
- Profile management
- Event listing (filtered)
- Event registration
- Event creation (basic)

### Phase 3: Advanced Features
- Excel export
- Certificate upload/download
- In-app notifications
- Promoted events
- Custom registration fields

### Phase 4: Department Scaling
- Multi-department support
- Analytics dashboard
- Live registration count
- Event editing

---

## IMPLEMENTATION RULES

### Security Requirements
1. Validate all user inputs
2. Sanitize data before database insertion
3. Use parameterized queries (Appwrite handles this)
4. Implement proper error handling
5. Never expose sensitive data in responses
6. Use proper authentication guards on all protected routes

### Performance Requirements
1. Implement proper caching where needed
2. Use SSR/SSG for marketing pages
3. Optimize images (next/image)
4. Lazy load components where appropriate
5. Use proper loading states

### UX Requirements
1. Mobile-first responsive design
2. Proper loading and error states
3. Accessible (WCAG guidelines)
4. Consistent design system
5. Form validation with clear error messages

### Code Quality
1. TypeScript strict mode
2. ESLint + Prettier
3. Component naming: PascalCase for components, camelCase for functions
4. Constants in separate files
5. API responses in consistent format

---

## CRITICAL DECISIONS TO MAKE

Before implementing, answer these:

1. **Appwrite Config:**
   - Project ID
   - Endpoint URL
   - Database ID
   - Collection IDs

2. **Auth Flow:**
   - How to handle session persistence?
   - JWT tokens or Appwrite session?

3. **State Management:**
   - Use Zustand or React Context?
   - What needs to be global state?

4. **Routing:**
   - Use App Router or Pages Router? (Use App Router - current setup)

5. **Environment Variables:**
   - What keys needed in .env.local?

---

## BUILDING CHECKLIST

Before each commit, ensure:
- [ ] Code compiles without errors
- [ ] TypeScript types are correct
- [ ] No console.log statements (except dev)
- [ ] Proper error handling implemented
- [ ] Responsive on mobile/tablet/desktop
- [ ] Loading states where needed
- [ ] Accessibility basics (alt tags, labels)

---

## FILE CREATION ORDER

1. Create types and constants
2. Set up Appwrite client and helpers
3. Build UI components (Button, Input, Card)
4. Create layout components (Navbar, Footer)
5. Build auth pages (Login, Register)
6. Build marketing pages (Home, About, Contact)
7. Build event components (EventCard, EventList)
8. Build dashboard pages
9. Build API routes if needed

---

## VALIDATION RULES

### User Registration
- Email: Valid format, ends with @amity.edu.in for Google auth
- Enrollment No: Required, unique
- Password: Min 8 chars

### Event Creation
- Title: Required, max 100 chars
- Description: Required, max 2000 chars
- Date: Future date only
- Venue: Required

### Registration
- One registration per user per event
- Check registration limit before allowing
- Validate custom fields if present

---

## SCALABILITY CONSIDERATIONS

1. **Database:** Plan for 1000+ events, 10000+ registrations
2. **Images:** Optimize and lazy load
3. **API:** Consider pagination for lists
4. **Auth:** Handle concurrent sessions
5. **Notifications:** Queue system for bulk notifications

---

## MVP DELIVERABLES (Next 2-3 weeks)

1. Marketing pages (Home, About, Events)
2. Authentication (Login/Register)
3. Profile creation and editing
4. Basic event listing and details view
5. Basic event registration

**Note:** Appwrite integration will be added after frontend structure is complete.

---

## CONTINUOUS IMPROVEMENT

After each feature:
1. Test thoroughly
2. Get user feedback
3. Fix bugs
4. Optimize performance
5. Document decisions

---

## COMMUNICATION

When asking for help or making decisions:
1. State the problem clearly
2. Show what you've tried
3. Explain the constraints
4. Ask specific questions
5. Provide context for decisions

---

**End of Building Prompt**