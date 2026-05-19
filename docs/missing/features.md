# Missing Features & Improvements

> Yahan un sab chizon ki list hai jo website mein either missing hain ya improvment ki zaroorat hai.

---

## 🔴 P0 — Must Have (User Experience Critical)

### 1. Loading States & Skeletons
**Missing in:** Almost all dashboard pages
- Student dashboard, Coordinator dashboard, Faculty dashboard, HOI dashboard sabme proper skeleton loaders nahi hain
- Jab tak data fetch ho, user ko blank ya flickering screen dikhti hai
- **Fix:** Har dashboard/page ke liye skeleton component banayein

### 2. Empty States
**Missing in:** All list pages
- Events list empty: "No events found" — bas text, koi illustration/CVA nahi
- Registrations list empty: koi proper empty state nahi
- Certificates list empty: same
- Notifications empty: same
- **Fix:** Har empty list ke liye illustration + message + CTA button

### 3. Error States & Retry Buttons
**Missing in:** All data-fetching components
- Agar API fail ho jaye toh user ko sirf error text dikhta hai, retry button nahi
- Network disconnect hone par koi offline indicator nahi
- **Fix:** Har component mein error state + "Try Again" button

### 4. Form Validation Feedback
**Missing/Weak in:**
- Event form: field-level error messages nahi hain (ek general error dikhta hai)
- Registration form: same issue
- Profile form: same
- **Fix:** Each field ke neeche inline error message (red text) + field border red

---

## 🟡 P1 — Important (Should Have)

### 5. Success/Toast Notifications
**Missing in:** All actions
- Event create/edit: success message disappears after redirect, user nahi dekh pata
- Registration cancel: koi confirmation toast nahi
- Certificate upload: message brief hai, toast nahi
- **Fix:** Toast notification system (top-right, auto-dismiss in 3s):
  - ✅ Green toast for success
  - ❌ Red toast for error
  - ℹ️ Blue toast for info

### 6. Confirmation Dialogs
**Missing in:**
- Delete event: confirm dialog nahi hai — direct delete ho jata hai
- Cancel registration: confirm dialog nahi — direct cancel
- **Fix:** Modal dialog with "Are you sure?" + description + [Confirm] [Cancel]

### 7. Breadcrumb Navigation
**Missing in:** All pages except basic
- Dashboard → Events → [Event Name] → Edit: koi breadcrumbs nahi
- User ko pata nahi hota ki wo kahan hai aur kaise back jaaye
- **Fix:** Add breadcrumbs at top:
  ```
  Dashboard > My Events > AI Summit > Edit
  ```

### 8. Search & Filter Persistence
**Missing:**
- Events page par search karo, filter lagao, page refresh → sab reset
- Browser back/forward se bhi state restore nahi hota
- **Fix:** URL query params mein filters store karein (`?search=ai&dept=aset&page=2`)

### 9. Pagination Missing from Many Lists
**Missing in:**
- Users list (admin): no pagination — sab ek saath load hota hai
- Notifications list: limit 50 but no load more / pagination
- **Fix:** `usePagination` hook with prev/next + page numbers

### 10. Keyboard Navigation & Shortcuts
**Missing in:** All pages
- Tab order not optimized for forms
- No keyboard shortcuts (like `Ctrl+N` for new event)
- **Fix:** Proper tabIndex, keyboard event listeners for shortcuts

### 11. Responsive Sidebar
**Current:** Sidebar hamesha visible rehta hai
- Mobile par sidebar content zyada jagah le leta hai
- **Fix:** Hamburger menu for mobile, off-canvas sidebar with overlay

### 12. Dark/Light Mode Toggle
**Current:** Theme sirf dark hai, koi toggle nahi
- **Fix:** Theme switcher in sidebar footer — save preference in localStorage

---

## 🟢 P2 — Nice to Have (Quality of Life)

### 13. Event Calendar View
**Missing:**
- Student dashboard: only timeline/list view
- **Fix:** Month calendar overlay showing events on dates (click → event details)

### 14. Bulk Certificate Upload
**Current:** Har student ke liye alag-alag upload karna padta hai
- **Fix:** Select multiple students → upload one PDF (or batch) → assign to selected

### 15. Attendance Marking
**Missing:**
- Faculty/Coordinator: koi attendance tracking nahi hai
- **Fix:** Add "Mark Attendance" section in event manage page — checkboxes for registered students, export attendance report

### 16. Event Reminders
**Missing:**
- Event se 1 din pehle / 1 ghanta pehle koi reminder nahi
- **Fix:** Push notification (or at least in-app) reminders for upcoming events

### 17. Profile Picture Upload
**Missing:**
- User schema me `profilePic` field defined hai par upload UI nahi hai
- **Fix:** Avatar upload with crop + preview in profile form

### 18. Password Change Option
**Missing:**
- Profile page me password change ka option nahi
- **Fix:** "Change Password" section with current + new + confirm

### 19. Email Notifications
**Missing:**
- Only in-app notifications, koi email notification nahi
- **Fix:** Integrate Resend/SendGrid — email on registration confirmation, certificate issued

### 20. Event Sharing
**Missing:**
- Student kisi event ko share nahi kar sakta
- **Fix:** Share button on event card — copy link, WhatsApp share, etc.

### 21. Phone Field in Profile
**Missing:**
- Docs me `phone` field mentioned hai par actual schema/form mein nahi hai
- **Fix:** Add phone field in UserProfile type, ProfileForm, and Appwrite collection

### 22. Excel Export (Not CSV)
**Current:** CSV export hota hai, lekin docs me Excel likha hai
- **Fix:** Use `exceljs` or similar npm package to generate actual `.xlsx` files

### 23. Customizable Export Columns
**Current:** Export always shows all columns
- **Fix:** Export modal with column selector (checkboxes) + date range filter

### 24. Sort Options on Event List
**Current:** No sort — events kisi bhi order me aate hain
- **Fix:** Sort by: Newest, Registration Deadline, Most Popular, Department

### 25. Event Status Change by Coordinator
**Current:** Coordinator event create karta hai, woh directly "pending" ho jata hai
- Coordinator ko event ko "complete" mark karne ka option nahi
- **Fix:** Allow coordinator to change status: Pending→Published (if auto-approved) or Completed/Cancelled

### 26. Promoted Event Management
**Current:** KOI UI nahi hai promoted events manage karne ka
- Event form mein promoted field hai lekin koi dedicated management page nahi
- **Fix:** HOI dashboard mein "Promoted Events" section + toggle button

### 27. Search/Filter on Certificates Page
**Current:** Certificates page just shows a list, no search/filter
- **Fix:** Search by event name, filter by date range

### 28. Notification Badge in Sidebar
**Current:** Notification bell icon to hai but unread count badge nahi
- **Fix:** Fetch unread count on sidebar mount, show red badge with count

### 29. Mark All Notifications Read
**Current:** Har notification ko individually mark karna padta hai
- **Fix:** "Mark all as read" button in notifications page

### 30. "My Events" Filter Options (Student)
**Current:** Student's registered events list — just cancel button
- **Fix:** Filter by status (Upcoming/Past/Cancelled), search

### 31. Event Capacity Display (Registration Bar)
**Current:** Registration count number me dikhta hai, visual bar nahi
- **Fix:** Color-coded progress bar:
  - Green: <60%
  - Orange: 60-90%
  - Red: 90%+
  - Full badge when limit reached

### 32. Delete Account Option
**Missing:** User apna account delete nahi kar sakta
- **Fix:** "Delete Account" in profile page with confirmation + password re-entry

### 33. Session Timeout Handling
**Missing:** Token expire hone par user ko koi indication nahi
- **Fix:** Axios interceptor ya fetch wrapper — 401 response → show toast + redirect to login

### 34. Data Export (Full System Backup)
**HOI Feature:**
- HOI ke liye "Export All Data" button — downloads all events/registrations/users as JSON/CSV

### 35. Search by Event ID
**Missing:**
- Koi search by event ID nahi hai (useful for HOI)
- **Fix:** Add event ID search in Events pages

### 36. Department Management Page
**HOI Feature:**
- HOI ko departments manage karne ka interface chahiye (add/remove/edit)
- **Fix:** Department CRUD page under HOI dashboard

### 37. Activity Logs
**HOI Feature:**
- Koi audit trail nahi hai — kaun kab kya karta hai
- **Fix:** Activity log collection in Appwrite + view page for HOI

### 38. Event Duplication
**Coordinator Feature:**
- Similar event baar baar create karna padta hai
- **Fix:** "Duplicate Event" button in event manage — copies all fields

### 39. Event Tags/Labels
**Feature:**
- Events ko tags assign kar sakte hain (e.g., "Workshop", "Seminar", "Hackathon", "Competition")
- Students tags ke according filter kar sakte hain

### 40. Registration Deadline
**Feature:**
- Events ke liye separate registration deadline (event date se alag)
- **Fix:** Add `registrationDeadline` field in event form + server-side validation

### 41. Waitlist System
**Feature:**
- Event full hone par students waitlist join kar sakte hain
- Agar koi cancel kare toh waitlist se next student auto-register ho

### 42. Feedback System
**Feature:**
- Event khatam hone ke baad students feedback de sakte hain
- Rating (1-5 stars) + text comment
- Coordinator/HOI feedback dekh sakte hain

### 43. Event Poster Preview in Card
**Current:** Event cards mein poster image nahi dikhti (fileId show hota hai)
- **Fix:** EventCard mein actual poster image render karein using `getPosterPreviewUrl()`

### 44. Image Optimization
**Missing:**
- Poster images compressed nahi hain
- **Fix:** Use `next/image` or server-side image compression before upload

### 45. PWA Support
**Missing:**
- Progressive Web App features nahi hain
- **Fix:** Add manifest.json, service worker, offline page

### 46. Meta Tags & SEO
**Weak:**
- Marketing pages mein proper meta tags nahi hain
- **Fix:** Add `generateMetadata()` in all pages with proper title, description, OG image

### 47. Rate Limiting on Login
**Current:** `auth.ts` mein exponential backoff hai but server-side rate limit nahi
- **Fix:** In-memory or Redis rate limiter for login attempts (5 attempts per minute per IP)

### 48. 2FA / MFA
**Future:**
- Appwrite supports 2FA — enable for faculty/HOI accounts

---

## Summary Count

| Priority | Count | Category |
|----------|-------|----------|
| 🔴 P0 | 4 | Critical UX Issues |
| 🟡 P1 | 8 | Important Missing Features |
| 🟢 P2 | 36 | Quality of Life Improvements |
| **Total** | **48** | **Missing/Improvable Items** |
