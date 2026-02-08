# Doko Prototype

## What
Interactive PWA prototype of a Social Coordination Platform. Next.js 16 App Router, Tailwind CSS v4, Zustand. All data is mocked/seeded — no real backend.

## Why
Product vision alignment tool. Must feel like a real shipped iOS app. Used for internal alignment, investor demos, and dev team briefing.

## Stack
- Next.js 16.1.6 (App Router, TypeScript strict mode)
- React 19.2.3
- Tailwind CSS v4 (uses `@import "tailwindcss"` + `@theme inline` block)
- Zustand v5 for state management
- Framer Motion v12 for animations
- Lucide React for icons
- Plus Jakarta Sans font (via `next/font/google` loader)
- All data seeded in /data/*.ts files

## Commands
- `npm run dev` — Start dev server (port 3000)
- `npm run build` — Static export build (outputs to `/out`)
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript strict check

## Deployment
- **Live URL**: https://arash-lari.github.io/doko-prototype/
- **GitHub repo**: https://github.com/Arash-Lari/doko-prototype
- **To redeploy after changes**:
  ```bash
  npm run build && npx gh-pages -d out --dotfiles
  ```
- Static export is configured via `output: "export"` in next.config.ts
- `basePath: "/doko-prototype"` is set for GitHub Pages subpath hosting
- `.nojekyll` file in `/out` is required (GitHub Pages ignores `_next/` without it)
- The `--dotfiles` flag on `gh-pages` ensures `.nojekyll` is deployed

## Local Development
- For local dev, the basePath means pages are at `localhost:3000/doko-prototype/`
- Or temporarily remove `basePath` from next.config.ts for cleaner local URLs
- To share locally via tunnel: `cloudflared tunnel --url http://localhost:3000`

## Architecture
```
/app                    — Next.js App Router pages and layouts
  /onboarding           — Splash → Sign-in → Carousel → Daily
  /daily                — Mixed feed (updates, moments, overlaps, nudges, events)
  /contacts             — Search + grouped by circle
  /contacts/[id]        — Contact Card (hero, timeline, actions)
  /plans                — My plans + friends' plans with overlaps
  /plans/new            — 5-step create plan form
  /places               — Event browse cards
  /places/new           — Host event creation form
  /messages             — Conversation list
  /messages/[id]        — Chat thread with bubbles
  /circles              — Circle list + visibility matrix
  /circles/[id]         — Circle detail with members
  /vault                — PIN entry → note list → editor
  /expenses             — Trip expenses + pie chart + splits
  /guides               — Guide list
  /guides/[id]          — Guide detail with star ratings
  /profile              — Settings hub with dark mode toggle
/components
  /ui                   — Avatar, Badge, Button, Modal, SearchBar, Toggle, CirclePicker, DatePicker
  /layout               — AppShell, PhoneFrame, BottomNav, TopBar, FAB
/data                   — 9 seeded data files (user, contacts, conversations, plans, moments, circles, places, guides, expenses, vault)
/store                  — Zustand store (useStore.ts)
/lib                    — types.ts, utils.ts
```

## Dynamic Routes (Static Export)
Dynamic route pages are split into server wrapper + client component:
- `page.tsx` — Server component that exports `generateStaticParams()` + renders client
- `client.tsx` — "use client" component with all the interactive logic

This split is required because Next.js 16 (Turbopack) does not allow `generateStaticParams` in "use client" files.

Affected routes: `/contacts/[id]`, `/messages/[id]`, `/circles/[id]`, `/guides/[id]`

## Theming
- CSS custom properties defined in `globals.css` (`:root` for light, `[data-theme="dark"]` for dark)
- `@theme inline` block maps CSS variables to Tailwind utility classes
- Dark mode toggled via `data-theme` attribute on `<html>`, persisted in localStorage
- Brand color: `#FF6B4A`

## Key Patterns
- **PhoneFrame**: Wraps app in 390x844 device chrome on desktop (>768px), passthrough on mobile
- **AppShell**: Hydrates theme + onboarded state from localStorage, loads seeded contacts/conversations
- **AppShell conditional padding**: `pb-[80px]` applied only on non-onboarding pages (BottomNav is hidden during onboarding)
- **Onboarding height**: Uses `h-full` (not `min-h-screen`) to fit inside PhoneFrame container
- **PhoneFrame mobile**: Uses `h-[100dvh] overflow-y-auto` to establish explicit height chain
- **Next.js 15+ params**: Dynamic route params are `Promise<{id: string}>`, unwrapped with `use(params)`
- **Zustand v5**: Uses `create<StoreState>()` syntax
- **DiceBear avatars**: `https://api.dicebear.com/7.x/avatars/svg?seed=FIRSTNAME`

## Seeded Data Overview
- **14 contacts** across 5 circles (family, close_friends, work_friends, new_contacts, acquaintances)
- **8 conversations** (5 DMs + 3 group chats)
- **7 plans** with pre-computed overlaps (Nadia↔User in Lisbon, Priya↔User in Tokyo)
- **4 active moments** with varied expiry times
- **7 events** (5 platform + 2 contact-hosted)
- **2 guides** (London Coffee Spots, Best Ramen in Tokyo)
- **1 trip expense** (Lisbon) with 6 expenses
- **5 vault notes** across categories

## Critical Rules
- NEVER use real APIs or external services — all data is local/seeded
- NEVER use Inter, Roboto, or Arial fonts — use Plus Jakarta Sans
- ALL pages must be mobile-first (390px primary viewport)
- ALL navigation must use smooth transitions (Framer Motion)
- Run `npm run typecheck` after completing any feature
- Wrap app in PhoneFrame component when viewport > 768px
- Google Fonts CSS `@import url()` CANNOT come after `@import "tailwindcss"` in Tailwind v4 — use Next.js font loader instead

## What's Complete (Phases 1-4)
- All foundation (scaffolding, theme, types, data, store, UI components, layout)
- All 18 pages built and working
- Onboarding flow (splash → sign-in → carousel → daily)
- Static export + GitHub Pages deployment
- Dark mode toggle
- TypeScript typecheck passes clean
- Production build succeeds

## What's Remaining (Phase 5: Polish)
- Page transitions (AnimatePresence for tab switches, slide animations)
- Empty states for list views
- Nudge card variants (reconnection, proximity, availability, welcome, milestone)
- Discreet broadcast feature (simulated)
- Calendar view integration
- PWA service worker for offline shell
- Birthday cards in daily feed
- End-to-end navigation audit

## Verification
After each feature, verify:
1. `npm run typecheck` passes
2. `npm run build` succeeds (static export)
3. Page renders correctly at 390px width
4. Navigation to/from the page works smoothly
5. Seeded data displays correctly
6. Redeploy: `npm run build && npx gh-pages -d out --dotfiles`
