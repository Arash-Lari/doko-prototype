# Doko Prototype — Master Build Plan

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   Next.js App Router                 │
│  ┌───────────────────────────────────────────────┐  │
│  │              Root Layout (app/layout.tsx)       │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │  PhoneFrame (desktop only, >768px)       │  │  │
│  │  │  ┌───────────────────────────────────┐  │  │  │
│  │  │  │         TopBar (56px)              │  │  │  │
│  │  │  ├───────────────────────────────────┤  │  │  │
│  │  │  │                                   │  │  │  │
│  │  │  │     Page Content (scrollable)     │  │  │  │
│  │  │  │     ├── /daily (home feed)        │  │  │  │
│  │  │  │     ├── /contacts (list + detail) │  │  │  │
│  │  │  │     ├── /plans (list + create)    │  │  │  │
│  │  │  │     ├── /places (browse + create) │  │  │  │
│  │  │  │     └── /profile (settings hub)   │  │  │  │
│  │  │  │                                   │  │  │  │
│  │  │  ├───────────────────────────────────┤  │  │  │
│  │  │  │  FAB (floating, context-aware)    │  │  │  │
│  │  │  ├───────────────────────────────────┤  │  │  │
│  │  │  │     BottomNav (80px, 5 tabs)      │  │  │  │
│  │  │  └───────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘

State: Zustand (useStore.ts)
├── activeTab (navigation state)
├── user (current user data)
├── contacts[] (all seeded contacts)
├── conversations[] (message threads)
├── plans[] (user + contact plans)
├── places[] (events/venues)
├── moments[] (ephemeral broadcasts)
├── circles[] (privacy groups)
├── guides[] (personal place guides)
├── expenses[] (trip expense data)
├── theme ("light" | "dark")
├── isOnboarded (boolean)
└── actions: setTheme, addMoment, addPlan, addExpense, etc.
```

---

## Complete Component Tree

### `/components/layout/`
| Component | Purpose | Props |
|-----------|---------|-------|
| PhoneFrame | Desktop wrapper (390x844, rounded corners, notch) | children |
| BottomNav | 5-tab navigation (Daily, Contacts, Plans, Places, Profile) | activeTab |
| TopBar | Page title, back button, action buttons | title, showBack, actions |
| FAB | Floating action button with expandable menu | variant (daily/plans/places) |

### `/components/ui/`
| Component | Purpose | Props |
|-----------|---------|-------|
| Avatar | User/contact photo with size variants | src, name, size (sm/md/lg/xl) |
| Badge | Status/label indicator | text, variant (default/brand/success/warning) |
| Button | Standard button with variants | children, variant, size, onClick |
| Modal | Bottom sheet modal with slide-up animation | isOpen, onClose, title, children |
| SearchBar | Search input with filter icon | value, onChange, placeholder |
| CirclePicker | Multi-select circles for visibility | selected, onChange |
| DatePicker | Date range picker for plans | startDate, endDate, onChange |
| Toggle | On/off switch | checked, onChange, label |

### `/components/cards/`
| Component | Purpose | Used In |
|-----------|---------|---------|
| UpdateCard | Life update from a contact | Daily feed, Contact Card |
| MomentCard | Ephemeral broadcast with countdown | Daily feed, Contact Card |
| PlanCard | Plan summary with destination/dates | Plans list, Contact Card |
| OverlapCard | Highlighted overlap discovery | Daily feed, Plan detail |
| NudgeCard | Passive reconnection suggestion | Daily feed |
| EventCard | Place/event listing | Daily feed, Places page |
| ContactRow | Contact list row with latest update | Contacts page |
| PlaceCard | Venue/event browse card | Places page |

### `/components/features/`
| Component | Purpose | Used In |
|-----------|---------|---------|
| OnboardingCarousel | 3-screen swipeable intro | Onboarding page |
| AvailabilityGrid | Interactive date grid for group plans | Plan detail |
| ExpenseTracker | Trip expense list + add form | Expenses page |
| CalendarView | Monthly calendar with plans/events/birthdays | Profile sub-page |
| GuideMap | Static map with guide pins | Guide detail |
| VisibilityMatrix | Circle × Feature toggle grid | Privacy Circles page |

---

## Data Model

### User
```
User {
  id: string
  name: string
  avatar: string
  location: string
  bio: string
  email: string
  phone: string
  birthday: string (ISO date)
  updates: Update[]
  plans: Plan[]
  circles: string[] (circle IDs)
}
```

### Contact (extends User-like)
```
Contact {
  id: string
  name: string
  avatar: string
  location: string
  bio: string
  phone: string
  email: string
  birthday: string
  circle: string (privacy circle ID)
  updates: Update[]
  plans: Plan[]
  moments: Moment[]
  lastInteraction: string (ISO date)
  mutualFriends: string[] (contact IDs)
}
```

### Update
```
Update {
  id: string
  type: "location" | "job" | "relationship" | "education" | "hobby" | "milestone" | "general"
  text: string
  date: string (ISO date)
  icon: string (Lucide icon name)
}
```

### Plan
```
Plan {
  id: string
  userId: string
  destination: string
  dates: { start: string, end: string }
  type: "short_trip" | "long_trip" | "event" | "work_travel"
  visibility: string (circle ID or "all_contacts")
  notes: string
  overlaps?: Overlap[]
}
```

### Overlap
```
Overlap {
  contactId: string
  contactName: string
  destination: string
  overlapDates: { start: string, end: string }
  overlapDays: number
}
```

### Moment
```
Moment {
  id: string
  authorId: string
  text: string
  image?: string
  audience: string[] (circle IDs)
  createdAt: string (ISO datetime)
  expiresAt: string (ISO datetime)
}
```

### Conversation
```
Conversation {
  id: string
  type: "direct" | "group"
  name?: string (for groups)
  participants: string[] (user/contact IDs)
  messages: Message[]
  lastMessageAt: string
  unreadCount: number
}

Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  read: boolean
}
```

### Circle
```
Circle {
  id: string
  name: string
  emoji: string
  members: string[] (contact IDs)
  color: string
  visibility: {
    updates: boolean
    planDetails: boolean
    moments: boolean
    location: boolean
    contactInfo: boolean
  }
}
```

### Place / Event
```
Place {
  id: string
  name: string
  description: string
  coverImage: string
  date: string
  time: string
  location: string
  hostId: string
  hostName: string
  category: "art" | "food" | "sports" | "tech" | "social" | "market"
  rsvpCount: number
  maxCapacity?: number
  guests: { contactId: string, status: "going" | "maybe" | "invited" }[]
}
```

### Guide
```
Guide {
  id: string
  title: string
  coverImage: string
  location: string
  entries: GuideEntry[]
  createdBy: string
}

GuideEntry {
  id: string
  placeName: string
  notes: string
  rating: number (1-5)
  location: string
  image?: string
}
```

### Expense
```
TripExpense {
  id: string
  tripName: string
  destination: string
  dates: { start: string, end: string }
  participants: string[] (contact IDs)
  expenses: Expense[]
  totalAmount: number
  currency: string
}

Expense {
  id: string
  description: string
  amount: number
  currency: string
  category: "food" | "transport" | "accommodation" | "activities" | "other"
  paidBy: string (user/contact ID)
  splitWith: string[] (user/contact IDs)
  date: string
}
```

### Vault Note
```
VaultNote {
  id: string
  title: string
  body: string
  category: "personal" | "travel" | "documents" | "ideas"
  createdAt: string
  updatedAt: string
}
```

---

## Page-by-Page Breakdown

### 1. Splash / Onboarding (`/onboarding`)
- **Shows**: Splash screen (2s auto-advance), then sign-in buttons, then 3-screen carousel
- **Components**: OnboardingCarousel, Button
- **Data**: None (static content)
- **Interactions**: Tap sign-in → skip to carousel; swipe/tap through carousel; skip → /daily
- **State**: Sets `isOnboarded: true` in Zustand

### 2. Doko Daily (`/daily`)
- **Shows**: Chronological feed of mixed card types
- **Components**: TopBar, UpdateCard, MomentCard, OverlapCard, NudgeCard, EventCard, FAB
- **Data**: contacts (for updates), moments, plans (for overlaps), places (for events)
- **Interactions**: Tap card → navigate to source (contact/plan/event); FAB → compose moment; scroll to feed terminus
- **State**: Reads from store; composing moment writes to store

### 3. Contacts List (`/contacts`)
- **Shows**: Search bar, contacts grouped by privacy circle (collapsible sections)
- **Components**: TopBar, SearchBar, ContactRow (×14), FAB (add contact)
- **Data**: contacts[], circles[]
- **Interactions**: Search filters in real-time; tap contact → /contacts/[id]; tap circle header → collapse/expand; FAB → add contact modal
- **State**: Local search query state; reads contacts from store

### 4. Contact Card (`/contacts/[id]`)
- **Shows**: Hero (avatar, name, location, bio), updates timeline, quick actions, plans, moments, contact info, circle badge
- **Components**: TopBar (with back), Avatar (xl), Badge, UpdateCard, MomentCard, PlanCard, Button
- **Data**: Single contact by ID, their updates, plans, moments
- **Interactions**: Message → /messages/[id]; Call → simulated; back → /contacts
- **State**: Reads single contact from store

### 5. Plans List (`/plans`)
- **Shows**: User's plans with overlap badges, create plan CTA
- **Components**: TopBar, PlanCard, OverlapCard, FAB
- **Data**: user.plans, computed overlaps
- **Interactions**: Tap plan → expand detail with overlaps; FAB → /plans/new
- **State**: Reads plans from store

### 6. Create Plan (`/plans/new`)
- **Shows**: Multi-step form: destination → dates → type → visibility → notes
- **Components**: TopBar (with back/close), Button, DatePicker, CirclePicker
- **Data**: circles (for visibility picker)
- **Interactions**: Step through form; submit → adds plan to store, navigate back
- **State**: Local form state; writes to store on submit

### 7. Places / Events (`/places`)
- **Shows**: Browse cards of events in London, hosted events
- **Components**: TopBar, PlaceCard/EventCard, SearchBar, FAB
- **Data**: places[]
- **Interactions**: Tap event → expand detail; FAB → /places/new (host event)
- **State**: Reads places from store

### 8. Host Event (`/places/new`)
- **Shows**: Event creation form: name, description, date/time, location, guest list, RSVP settings
- **Components**: TopBar, Button, DatePicker, Modal (guest picker)
- **Data**: contacts (for guest list)
- **Interactions**: Fill form; select guests; submit → add to store
- **State**: Local form state; writes to store on submit

### 9. Profile (`/profile`)
- **Shows**: User info, settings sections, links to sub-features (vault, guides, expenses, circles)
- **Components**: TopBar, Avatar, Toggle, Button
- **Data**: currentUser, circles
- **Interactions**: Edit info; toggle dark mode; navigate to sub-features
- **State**: Reads/writes user and theme to store

### 10. Messages List (`/messages`)
- **Shows**: Conversation list with last message preview, unread badges
- **Components**: TopBar, Avatar, Badge
- **Data**: conversations[]
- **Interactions**: Tap conversation → /messages/[id]
- **State**: Reads conversations from store

### 11. Chat Thread (`/messages/[id]`)
- **Shows**: Message bubbles (sent/received), composer, typing indicator
- **Components**: TopBar (with back + contact name), message bubbles, text input
- **Data**: Single conversation messages
- **Interactions**: Scroll through messages; type in composer (non-functional send for prototype)
- **State**: Reads single conversation from store

### 12. Privacy Circles (`/circles`)
- **Shows**: List of circles with member counts, visibility matrix
- **Components**: TopBar, VisibilityMatrix, Toggle, Avatar, Badge
- **Data**: circles[], contacts[]
- **Interactions**: Tap circle → member list; toggle visibility settings; create new circle
- **State**: Reads/writes circles to store

### 13. Circle Detail (`/circles/[id]`)
- **Shows**: Member list, group chat stub, pinned info, shared plans
- **Components**: TopBar, ContactRow, PlanCard
- **Data**: Circle by ID, member contacts, shared plans
- **Interactions**: Tap member → contact card; view shared plans
- **State**: Reads from store

### 14. Private Vault (`/vault`)
- **Shows**: PIN entry, then note list by category, note editor
- **Components**: Button (PIN pad), Modal (editor), Badge (encrypted)
- **Data**: vault notes (seeded)
- **Interactions**: Enter PIN (any 4 digits); tap note → edit; create new note
- **State**: Local PIN state; reads/writes vault notes to store

### 15. Expenses (`/expenses`)
- **Shows**: Trip list, trip detail with expenses, add expense form, summary charts
- **Components**: ExpenseTracker, Modal (add expense), Badge
- **Data**: expenses[]
- **Interactions**: Tap trip → detail; add expense; view summary
- **State**: Reads/writes expenses to store

### 16. Guides (`/guides`, `/guides/[id]`)
- **Shows**: Guide list with covers, guide detail with entries, share flow
- **Components**: TopBar, PlaceCard, GuideMap, Modal (share)
- **Data**: guides[]
- **Interactions**: Tap guide → detail; tap entry → expand; share → select contacts
- **State**: Reads guides from store

---

## State Management Plan

### Zustand Store (`/store/useStore.ts`)
**Global state** (Zustand):
- `theme`: "light" | "dark" — persisted to localStorage
- `isOnboarded`: boolean — persisted to localStorage
- `activeTab`: string — current bottom nav tab
- `currentUser`: User object
- `contacts`: Contact[] — all 14 seeded contacts
- `conversations`: Conversation[] — all message threads
- `plans`: Plan[] — all visible plans (user + contacts)
- `places`: Place[] — all events
- `moments`: Moment[] — all active moments
- `circles`: Circle[] — all privacy circles
- `guides`: Guide[] — all personal guides
- `tripExpenses`: TripExpense[] — all trip expenses
- `vaultNotes`: VaultNote[] — all vault notes
- `vaultUnlocked`: boolean — vault PIN state

**Actions**:
- `setTheme(theme)` — toggle dark/light
- `setOnboarded()` — mark onboarding complete
- `setActiveTab(tab)` — change nav tab
- `addMoment(moment)` — create new moment
- `addPlan(plan)` — create new plan
- `addPlace(place)` — create new event
- `addExpense(tripId, expense)` — add expense to trip
- `addVaultNote(note)` — create vault note
- `updateVaultNote(id, updates)` — edit vault note
- `setVaultUnlocked(unlocked)` — toggle vault lock
- `addGuide(guide)` — create new guide
- `moveContactToCircle(contactId, circleId)` — reassign contact
- `updateCircleVisibility(circleId, feature, value)` — toggle visibility

**Local React state** (not in Zustand):
- Search queries (contacts, places)
- Form inputs (create plan, host event, add expense, compose moment)
- Modal open/close states
- Carousel current index
- PIN entry digits
- Collapsed/expanded sections

---

## Animation / Transition Plan

### Page Transitions (Framer Motion AnimatePresence)
| Transition | Animation | Duration |
|-----------|-----------|----------|
| Tab switch (bottom nav) | Crossfade `opacity: 0→1` | 0.2s |
| Forward navigation (list→detail) | Slide left `x: 100→0` | 0.3s spring |
| Back navigation (detail→list) | Slide right `x: -100→0` | 0.3s spring |
| Modal open | Slide up `y: 100%→0` | 0.25s ease-out |
| Modal close | Slide down `y: 0→100%` | 0.2s ease-in |

### Element Animations
| Element | Animation | Trigger |
|---------|-----------|---------|
| Feed cards | Stagger `opacity: 0, y: 20→0` | On mount, 50ms stagger |
| FAB menu | Scale `0→1` + fade | On FAB tap |
| Search bar | Expand width with spring | On focus |
| Toggle switch | Spring `x: 0→20` | On tap |
| Moment countdown | Pulse animation on <1h | Continuous |
| Overlap card | Subtle glow/pulse on brand color | On mount |
| Avatar | Scale bounce on tap | On tap |

### Shared Layout Animations
- Contact avatar from ContactRow → Contact Card hero (shared layout ID)
- Plan card from list → plan detail (shared layout ID)

---

## Build Dependency Graph

```
Phase 1: Foundation (sequential)
  1.1 Scaffold Next.js project
  1.2 Install dependencies
  1.3 Configure Tailwind theme + fonts
   ↓
  1.4 Create /lib/types.ts (ALL interfaces)
  1.5 Create ALL /data/*.ts files (depends on types)
   ↓
  1.6 Create Zustand store (depends on types + data)
   ↓
  1.7 Build /components/ui/* (Avatar, Badge, Button, Modal, SearchBar, Toggle)
   ↓
  1.8 Build /components/layout/* (PhoneFrame, BottomNav, TopBar, FAB)
   ↓
  1.9 Wire up root layout (app/layout.tsx) with PhoneFrame + BottomNav
  1.10 Create globals.css with CSS variables + dark mode

Phase 2: Core Screens (parallel after Phase 1)
  ┌─────────────────────────────┐
  │ 2A: Daily Feed              │
  │   2A.1 UpdateCard           │
  │   2A.2 MomentCard           │
  │   2A.3 OverlapCard          │
  │   2A.4 NudgeCard            │
  │   2A.5 EventCard (basic)    │
  │   2A.6 Daily page assembly  │
  ├─────────────────────────────┤
  │ 2B: Contacts                │  ← parallel
  │   2B.1 ContactRow           │
  │   2B.2 Contacts list page   │
  │   2B.3 Contact Card page    │
  │   2B.4 Add Contact modal    │
  ├─────────────────────────────┤
  │ 2C: Auth + Profile          │  ← parallel
  │   2C.1 Splash screen        │
  │   2C.2 Sign-in buttons      │
  │   2C.3 OnboardingCarousel   │
  │   2C.4 Profile page         │
  │   2C.5 Dark mode toggle     │
  └─────────────────────────────┘

Phase 3: Key Features (parallel after Phase 2)
  ┌─────────────────────────────┐
  │ 3A: Plans                   │
  │   3A.1 PlanCard             │
  │   3A.2 Plans list page      │
  │   3A.3 Create Plan flow     │
  │   3A.4 Overlap discovery    │
  │   3A.5 AvailabilityGrid     │
  ├─────────────────────────────┤
  │ 3B: Social                  │  ← parallel
  │   3B.1 Moments compose/feed │
  │   3B.2 Circles management   │
  │   3B.3 VisibilityMatrix     │
  │   3B.4 Messages list        │
  │   3B.5 Chat thread UI       │
  │   3B.6 Doko Circles (temp)  │
  ├─────────────────────────────┤
  │ 3C: Places                  │  ← parallel
  │   3C.1 PlaceCard            │
  │   3C.2 Places browse page   │
  │   3C.3 Host Event flow      │
  │   3C.4 Event detail card    │
  └─────────────────────────────┘

Phase 4: Single-Player Features (parallel after Phase 3)
  ┌─────────────────────────────┐
  │ 4A: Vault + Calendar        │
  │   4A.1 PIN entry screen     │
  │   4A.2 Vault note list      │
  │   4A.3 Note editor          │
  │   4A.4 CalendarView         │
  ├─────────────────────────────┤
  │ 4B: Expenses                │  ← parallel
  │   4B.1 Trip list page       │
  │   4B.2 Add expense flow     │
  │   4B.3 Summary pie chart    │
  │   4B.4 Split calculations   │
  ├─────────────────────────────┤
  │ 4C: Guides                  │  ← parallel
  │   4C.1 Guide list page      │
  │   4C.2 Guide detail         │
  │   4C.3 Create/edit guide    │
  │   4C.4 Share guide flow     │
  │   4C.5 GuideMap (static)    │
  └─────────────────────────────┘

Phase 5: Polish (sequential, cross-cutting)
  5.1 Nudge card variants (reconnection, proximity, availability, welcome, milestone)
  5.2 Discreet Broadcast UI
  5.3 Page transitions (AnimatePresence wiring)
  5.4 Empty states for all lists
  5.5 Feed terminus ("You're all caught up")
  5.6 FAB context-aware behavior
  5.7 PWA manifest + service worker
  5.8 Responsive PhoneFrame behavior
  5.9 Full typecheck + lint pass
  5.10 End-to-end navigation walkthrough
```

---

## Key Architectural Decisions

1. **No real routing transitions in App Router** — We'll use Framer Motion's `AnimatePresence` with a layout wrapper, not Next.js built-in transitions. Each page wraps its content in a motion.div.

2. **Seeded data as source of truth** — Store initializes from `/data/*.ts` files. Mutations happen in-memory via Zustand. Data resets on page refresh (acceptable for prototype).

3. **Avatar generation** — Use DiceBear API URLs (`https://api.dicebear.com/7.x/avatars/svg?seed=NAME`) for consistent placeholder avatars. No local image files needed.

4. **Phone Frame conditional rendering** — Use a `useMediaQuery` hook. Above 768px, wrap in PhoneFrame. Below, render full-width.

5. **Dark mode** — Use CSS custom properties with `data-theme` attribute on `<html>`. Zustand persists theme preference to localStorage.

6. **Date handling** — Use native `Date` and `Intl.DateTimeFormat` for formatting. No date library needed for a prototype.

7. **Charts** — Build a simple SVG pie chart component for expenses. No charting library needed.
