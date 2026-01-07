# Lost Fuzz Website Context

## Project Overview
A Next.js website with a retro terminal theme.
- **Homepage:** Commodore 64 (C64) style.
- **Portfolio:** Apple II style.
- **Lost Fuzz Studios:** System 1.0 (Classic Mac) style.
- **About Me:** MS-DOS style.
- **Contact Me:** Amiga Workbench style.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Commands
- `npm run dev`: Start development server.
- `npm run build`: Build for production.
- `npm run start`: Start production server.
- `npm run lint`: Run ESLint.
- `npm run sync-bandcamp`: Scrapes Bandcamp for new releases and updates the portfolio.

## Features
- **Portfolio Sync:** Automated Bandcamp release synchronization.
  - Script: `scripts/sync-bandcamp.mjs`
  - Data: `src/data/releases.json`
  - Images: `public/images/`
  - Automation: GitHub Action (`.github/workflows/sync-bandcamp.yml`) runs hourly.
    - **Fix:** Added `rm -rf ~/.npm` purge step to resolve ENOENT errors on LMDB index files after repo rename.
    - **Note:** Workflow updated to use `pnpm` to match project conventions.
- **Contact Form:** Integrated with Resend SDK.
  - API Route: `/api/send`
  - Environment Variables: `RESEND_API_KEY`, `CONTACT_FORM_SENDER_EMAIL`, `CONTACT_FORM_RECIPIENT_EMAIL`.
  - Spam Protection: Honeypot field `website_url`.

## Conventions & Config
- **Package Manager:** pnpm.
  - Config: `pnpm.allowedBuildScripts` includes `sharp` and `unrs-resolver` for Vercel builds.

## Design Inspiration
- `lost-fuzz-site.png`: Screenshot of the desired C64 homepage.
