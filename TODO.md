# Doko Prototype — Task List

## Phase 1: Foundation (Solo)

### 1.1 Project Scaffolding
- [ ] Scaffold Next.js 14+ with TypeScript, Tailwind, App Router
- [ ] Install dependencies: framer-motion, zustand, lucide-react
- [ ] Configure `tsconfig.json` strict mode
- [ ] Add `typecheck` script to package.json: `"typecheck": "tsc --noEmit"`
- **Done when**: `npm run dev` starts without errors

### 1.2 Tailwind & Theme Configuration
- [ ] Configure Tailwind with custom colors matching design spec
- [ ] Set up Plus Jakarta Sans from Google Fonts
- [ ] Create `globals.css` with CSS custom properties (light + dark mode)
- [ ] Add border-radius, shadow, and spacing tokens
- **Done when**: Font renders correctly, CSS variables are accessible

### 1.3 TypeScript Interfaces
- [ ] Create `/lib/types.ts` with ALL interfaces: User, Contact, Update, Plan, Overlap, Moment, Conversation, Message, Circle, Place, Guide, GuideEntry, TripExpense, Expense, VaultNote
- **Done when**: `npm run typecheck` passes

### 1.4 Seeded Data Files
- [ ] `/data/user.ts` — Current user (Alex Morgan) with updates and plans
- [ ] `/data/contacts.ts` — All 14 contacts with full data
- [ ] `/data/conversations.ts` — 5 DMs + 3 group chats with messages
- [ ] `/data/plans.ts` — All plans + pre-computed overlaps
- [ ] `/data/moments.ts` — 4 active moments with varied expiry
- [ ] `/data/circles.ts` — 5 circles with visibility settings
- [ ] `/data/places.ts` — 7 events (5 public + 2 contact-hosted)
- [ ] `/data/guides.ts` — 2 guides with entries
- [ ] `/data/expenses.ts` — 1 trip with 6 expenses
- **Done when**: All data files import without TypeScript errors

### 1.5 Zustand Store
- [ ] Create `/store/useStore.ts` with all state slices
- [ ] Initialize store from seeded data files
- [ ] Implement all actions (setTheme, addMoment, addPlan, etc.)
- [ ] Add localStorage persistence for theme and onboarded state
- **Done when**: Store can be imported and used in a test component

### 1.6 Atomic UI Components
- [ ] `Avatar` — Image with fallback, size variants (sm/md/lg/xl)
- [ ] `Badge` — Colored label with variants
- [ ] `Button` — Primary, secondary, ghost variants with sizes
- [ ] `Modal` — Bottom sheet with slide-up animation, backdrop
- [ ] `SearchBar` — Input with search icon, clear button
- [ ] `Toggle` — Switch component with label
- **Done when**: Each component renders correctly in isolation

### 1.7 Layout Shell
- [ ] `PhoneFrame` — Desktop wrapper with device chrome (notch, home indicator)
- [ ] `BottomNav` — 5 tabs with icons, labels, active state indicator
- [ ] `TopBar` — Title, optional back button, optional action buttons
- [ ] `FAB` — Floating action button with expandable menu
- [ ] Wire up `app/layout.tsx` with PhoneFrame (conditional) + BottomNav
- [ ] Create basic page stubs for all 5 tab routes
- **Done when**: App shell renders with working tab navigation, phone frame on desktop

---

## Phase 2: Core Screens (3 Agents — Parallel)

### 2A: Daily Feed (Agent: Daily)
- [ ] `UpdateCard` — Avatar, name, update text, type icon, timestamp
- [ ] `MomentCard` — Text, optional image, expiry countdown, author
- [ ] `OverlapCard` — Highlighted card with overlap info, CTAs
- [ ] `NudgeCard` — Subtle reconnection/proximity suggestion
- [ ] `EventCard` — Event name, date, location, RSVP count
- [ ] Assemble `/daily` page with mixed feed from seeded data
- [ ] Add feed terminus "You're all caught up"
- [ ] Add card stagger animations on mount
- **Done when**: Daily feed shows all card types with correct data, scroll works, terminus visible

### 2B: Contacts (Agent: Contacts)
- [ ] `ContactRow` — Avatar (48px), name, location, latest update snippet
- [ ] `/contacts` page — Search bar, grouped by circle (collapsible)
- [ ] Search filtering (instant, by name/location)
- [ ] `/contacts/[id]` Contact Card — Hero, updates timeline, quick actions, plans, moments, info
- [ ] Add Contact modal (simulated: phone import, QR, manual)
- **Done when**: Can browse contacts by circle, search, tap into full Contact Card with timeline

### 2C: Auth & Profile (Agent: Auth)
- [ ] Splash screen — Logo + tagline, 2s auto-advance
- [ ] Sign-in page — Google/Apple/Microsoft/Email buttons (all bypass)
- [ ] `OnboardingCarousel` — 3 swipeable screens with skip
- [ ] `/profile` page — User info, settings sections, dark mode toggle
- [ ] Dark mode toggle (functional, persisted)
- [ ] Wire onboarding → daily flow with `isOnboarded` state
- **Done when**: Can complete onboarding flow, reach daily feed, toggle dark mode from profile

---

## Phase 3: Key Features (3 Agents — Parallel)

### 3A: Plans (Agent: Plans)
- [ ] `PlanCard` — Destination, dates, type badge, visibility badge, overlap count
- [ ] `/plans` page — List of user plans with overlap indicators
- [ ] `/plans/new` — Multi-step create form (destination, dates, type, visibility, notes)
- [ ] Overlap discovery cards on plan detail
- [ ] `AvailabilityGrid` — Interactive date grid showing group availability
- **Done when**: Can view plans, create new plan, see overlaps with Nadia (Lisbon) and Priya (Tokyo)

### 3B: Social Features (Agent: Social)
- [ ] Moment compose flow — FAB → text input, audience selector, submit
- [ ] Moment display in Daily feed with expiry countdown
- [ ] `/circles` page — Circle list with member counts
- [ ] `/circles/[id]` — Member list, group chat stub, shared plans
- [ ] `VisibilityMatrix` — Circle × Feature toggle grid
- [ ] `/messages` page — Conversation list with previews, unread badges
- [ ] `/messages/[id]` — Chat thread with bubbles, composer (static)
- [ ] Privacy Circles management — move contacts between circles
- **Done when**: Can post moments, manage circles/visibility, browse messages

### 3C: Places (Agent: Places)
- [ ] `PlaceCard` — Cover image, event name, host, date, location, RSVP
- [ ] `/places` page — Browse events with category labels
- [ ] `/places/new` — Host event form (name, description, date, location, guests)
- [ ] Event detail view — Full info, guest list, RSVP status, directions
- **Done when**: Can browse events, view details, create new event

---

## Phase 4: Single-Player Features (3 Agents — Parallel)

### 4A: Vault & Calendar (Agent: Organizer)
- [ ] `/vault` — PIN entry screen (any 4 digits unlock)
- [ ] Vault note list by category (Personal, Travel, Documents, Ideas)
- [ ] Note editor — Title, body, category selector
- [ ] "Encrypted" visual indicators (lock icon, green badge)
- [ ] `CalendarView` — Monthly view with plans, events, birthdays
- [ ] Integration prompt cards (Notion, Todoist — non-functional)
- **Done when**: Can enter PIN, browse/create/edit notes, view calendar

### 4B: Expenses (Agent: Finance)
- [ ] `/expenses` — Trip list page
- [ ] Trip detail with expense list
- [ ] Add expense flow — Description, amount, currency, category, split
- [ ] Summary view — SVG pie chart by category, running total
- [ ] Per-person split calculation display
- **Done when**: Can view trip expenses, add new expense, see summary charts and splits

### 4C: Guides (Agent: Guide)
- [ ] `/guides` — Guide list with cover images
- [ ] `/guides/[id]` — Guide detail with entry cards
- [ ] Guide entry — Place name, notes, star rating, location
- [ ] Create/edit guide flow
- [ ] Share guide — Select contacts modal
- [ ] `GuideMap` — Static map placeholder with pins
- **Done when**: Can browse guides, view entries, create new guide, share with contacts

---

## Phase 5: Polish & Extras (Solo/2 Agents)

### 5.1 Nudge Card Variants
- [ ] Reconnection nudge ("Haven't connected in X months")
- [ ] Proximity nudge ("[Contact] is in your city this week")
- [ ] Availability nudge ("3 friends are free Saturday")
- [ ] Welcome nudge ("[Contact] just moved to your city")
- [ ] Milestone nudge ("Met with 5 contacts this month")

### 5.2 Discreet Broadcast
- [ ] Location sharing toggle (simulated)
- [ ] Safety check-in setup (simulated)
- [ ] Quick-access from profile

### 5.3 Page Transitions
- [ ] Wire AnimatePresence for tab switches (crossfade)
- [ ] Forward navigation slide-left
- [ ] Back navigation slide-right
- [ ] Modal slide-up/down
- [ ] Shared layout animations for avatar/card transitions

### 5.4 Empty States
- [ ] Empty state for every list view (contacts, plans, places, messages, guides, expenses, vault)
- [ ] Friendly illustration or icon + helpful text + CTA

### 5.5 Final Polish
- [ ] FAB context-aware behavior per tab
- [ ] PWA manifest.json with app name, icons, theme color
- [ ] Basic service worker for offline shell
- [ ] Responsive PhoneFrame (conditional on viewport)
- [ ] Birthday cards in Daily feed
- [ ] Full `npm run typecheck` pass — zero errors
- [ ] Full `npm run lint` pass — zero warnings
- [ ] End-to-end navigation walkthrough (every path works)

---

## Definition of Done (Entire Prototype)
- [ ] Onboarding → Daily → all features accessible without dead ends
- [ ] All 14 contacts have rich data visible in Contact Cards
- [ ] Plan overlaps (Nadia-Lisbon, Priya-Tokyo) discoverable
- [ ] Dark mode fully functional
- [ ] `npm run build` succeeds
- [ ] Installable as PWA
- [ ] Feels like a real shipped iOS app
