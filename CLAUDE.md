# Doko Prototype

## What
Interactive PWA prototype of a Social Coordination Platform. Next.js 14+ App Router, Tailwind CSS, Zustand. All data is mocked/seeded — no real backend.

## Why
Product vision alignment tool. Must feel like a real shipped iOS app. Used for internal alignment, investor demos, and dev team briefing.

## Stack
- Next.js 14+ (App Router, TypeScript strict mode)
- Tailwind CSS (utility classes only, no custom CSS files)
- Zustand for state management
- Framer Motion for animations
- Lucide React for icons
- All data seeded in /data/*.ts files

## Commands
- `npm run dev` — Start dev server (port 3000)
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript strict check

## Code Style
- TypeScript strict mode, no `any` types
- Use named exports, not default exports
- Functional components with hooks only
- Tailwind utility classes only — no CSS modules, no styled-components
- File naming: PascalCase for components, camelCase for utilities
- Always destructure imports

## Architecture
- `/app` — Next.js App Router pages and layouts
- `/components/ui` — Reusable atomic UI components
- `/components/cards` — Feature-specific card components
- `/components/layout` — Navigation, frames, structural layout
- `/components/features` — Complex interactive feature components
- `/data` — All seeded/mock data as TypeScript files
- `/store` — Zustand stores
- `/lib` — Utilities, types, helpers

## Critical Rules
- NEVER use real APIs or external services — all data is local/seeded
- NEVER use Inter, Roboto, or Arial fonts
- ALL pages must be mobile-first (390px primary viewport)
- ALL navigation must use smooth transitions (Framer Motion)
- Run `npm run typecheck` after completing any feature
- Run `npm run lint` before marking any task as done
- Wrap app in PhoneFrame component when viewport > 768px
- Test every page at 390px width before moving on

## Figma Integration
- Figma MCP is connected. When implementing UI components, reference Figma designs if available.
- Use `get_design_context` to pull component specs from Figma before building.
- Design tokens from Figma take precedence over guessed values.

## Verification
After each feature, verify:
1. `npm run typecheck` passes
2. `npm run lint` passes
3. Page renders correctly at 390px width
4. Navigation to/from the page works smoothly
5. Seeded data displays correctly
