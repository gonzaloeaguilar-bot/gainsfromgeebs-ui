# Gains From Geebs — Client UI Repository

This repository controls the frontend UI/UX of `gainsfromgeebs.com`. It is designed for safe UI/UX edits (including edits made with Claude) while keeping all backend services, lead attribution, analytics, and automation hosted privately.

## What you CAN edit
- Page copy, headlines, layouts, sections, and visual styling (`app/`, `components/`, `content/`, `public/`)
- Images, typography, spacing, and responsive mobile/desktop UI improvements

## What is LOCKED (do not modify or delete)
- `vercel.json` (routes `/api/*` to the hosted platform backend)
- `next.config.*`
- `.github/*` and `scripts/verify-ui-integrity.mjs`
- Analytics, attribution, and lead-capture hooks (`app/layout.tsx`, `components/GoogleAnalytics.tsx`, `/apply` booking flow, `app/robots.ts`, `app/sitemap.ts`)

## How to contribute changes
1. Create a new branch from `main` (direct pushes to `main` are blocked).
2. Make your UI/UX edits and run locally:
   ```bash
   npm run verify:ui-integrity
   npm run build
   ```
3. Open a Pull Request into `main`.
4. Review the automatic **Vercel Preview URL** attached to the PR and wait for the `platform-integrity-gate` check to pass.
5. Do not add `.env` files, API routes (`app/api/`), or secrets to this repository — all `/api/*` requests proxy automatically to the hosted backend.
