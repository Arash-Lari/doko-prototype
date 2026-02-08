# Doko Prototype — Task List

## Completed

### Phase 1: Foundation
- [x] Scaffold Next.js 16 with TypeScript, Tailwind v4, App Router
- [x] Install dependencies: framer-motion, zustand, lucide-react
- [x] Configure TypeScript strict mode + `typecheck` script
- [x] Tailwind theme with CSS custom properties (light + dark mode)
- [x] Plus Jakarta Sans font via next/font/google
- [x] All TypeScript interfaces in `/lib/types.ts`
- [x] All 9 seeded data files in `/data/`
- [x] Zustand store with all state slices
- [x] 8 atomic UI components (Avatar, Badge, Button, Modal, SearchBar, Toggle, CirclePicker, DatePicker)
- [x] Layout shell (PhoneFrame, BottomNav, TopBar, FAB, AppShell)

### Phase 2: Core Screens
- [x] Daily feed with mixed card types (updates, moments, overlaps, nudges, events)
- [x] Contacts list (search + grouped by circle)
- [x] Contact detail cards with hero, timeline, quick actions
- [x] Onboarding flow (splash → sign-in → carousel → daily)
- [x] Profile page with settings + dark mode toggle

### Phase 3: Key Features
- [x] Plans list with overlap indicators
- [x] Create new plan (5-step form)
- [x] Places browse + create event
- [x] Messages list + chat threads
- [x] Circles management + visibility
- [x] Moment display in daily feed

### Phase 4: Single-Player Features
- [x] Vault (PIN entry → note list → editor)
- [x] Expenses (trip detail, pie chart, splits)
- [x] Guides (list + detail with star ratings)

### Deployment
- [x] Static export configuration (next.config.ts)
- [x] Dynamic route split (server wrapper + client component)
- [x] GitHub Pages deployment with .nojekyll fix
- [x] Cloudflare tunnel for temporary sharing

---

## Remaining — Phase 5: Polish & Extras

### 5.1 Page Transitions
- [ ] AnimatePresence for tab switches (crossfade)
- [ ] Forward navigation slide-left
- [ ] Back navigation slide-right
- [ ] Modal slide-up/down
- [ ] Shared layout animations for avatar/card transitions

### 5.2 Empty States
- [ ] Empty state for every list view (contacts, plans, places, messages, guides, expenses, vault)
- [ ] Friendly illustration or icon + helpful text + CTA

### 5.3 Nudge Card Variants
- [ ] Reconnection nudge ("Haven't connected in X months")
- [ ] Proximity nudge ("[Contact] is in your city this week")
- [ ] Availability nudge ("3 friends are free Saturday")
- [ ] Welcome nudge ("[Contact] just moved to your city")
- [ ] Milestone nudge ("Met with 5 contacts this month")

### 5.4 Additional Features
- [ ] Discreet broadcast (location sharing toggle, safety check-in — simulated)
- [ ] Calendar view (monthly view with plans, events, birthdays)
- [ ] Birthday cards in Daily feed
- [ ] Integration prompt cards (Notion, Todoist — non-functional)

### 5.5 Final Polish
- [ ] PWA service worker for offline shell
- [ ] End-to-end navigation walkthrough (every path works)
- [ ] Full `npm run typecheck` pass — zero errors
- [ ] Full `npm run lint` pass — zero warnings
- [ ] Final redeploy to GitHub Pages
