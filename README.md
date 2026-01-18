# Lost Fuzz Website

Personal portfolio and hub for musician **Lost Fuzz** and his studio.

A retro-inspired web experience where each page pays homage to a classic computing environment.

## 🖥 Themes

The website features custom-designed themes for different sections, recreating the look and feel of vintage operating systems:

- **Homepage:** [Commodore 64 (C64)](https://en.wikipedia.org/wiki/Commodore_64) terminal.
- **Portfolio:** [Apple II](https://en.wikipedia.org/wiki/Apple_II) interface.
- **Studios:** [System 1.0 (Classic Mac)](https://en.wikipedia.org/wiki/System_1) desktop.
- **About:** [MS-DOS](https://en.wikipedia.org/wiki/MS-DOS) command line.
- **Contact:** [Amiga Workbench](https://en.wikipedia.org/wiki/Workbench_(AmigaOS)) environment.

## 🛠 Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Programming Language:** [TypeScript](https://www.typescriptlang.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Email:** [Resend SDK](https://resend.com/) (for the contact form)
- **Scraping:** [Cheerio](https://cheerio.js.org/) (for Bandcamp synchronization)

## ✨ Key Features

- **Automated Bandcamp Sync:** A custom script (`scripts/sync-bandcamp.mjs`) scrapes Bandcamp for new releases and updates the portfolio data automatically via GitHub Actions.
- **Responsive Retro UI:** Each classic OS interface is fully responsive and optimized for modern devices while maintaining its vintage charm.
- **Integrated Contact Form:** A clean, functional contact form built with Resend for direct messaging.
- **High Performance:** Leveraging Next.js 15 features for fast loading and optimal SEO.

## 🕹 Pseudo-Emulator & Easter Eggs

Beyond visual aesthetics, each page functions as a "pseudo-emulator" with interactive logic and hidden secrets:

- **C64 (Home):** A functional BASIC-style terminal. Try commands like `COLOR BORDER RED`, `MUSIC` (plays a chiptune SID), `DANCE` (ASCII party), or even `POKE 53280, 2`.
- **Apple II (Portfolio):** A classic green-screen environment. Use `CATALOG` to see releases, `RUN [N]` to open them, or discover the `APPLE` and `MATRIX` easter eggs.
- **Classic Mac (Studios):** A draggable terminal window within the System 1.0 desktop. Check the top menu for system actions and quirky alerts (e.g., "Time travel not implemented").
- **MS-DOS (About):** A command-line interface with standard DOS commands like `DIR`, `TYPE README.TXT`, and `VER`. Try running `WIN` or `FORMAT C:` for system-specific responses.
- **Amiga (Contact):** A Workbench-inspired contact interface with tailored aesthetics and interactions.

## 🚀 Getting Started

This project uses **pnpm** as the package manager.

### 1. Installation

```bash
pnpm install
```

### 2. Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Sync Bandcamp Releases

To manually trigger the Bandcamp synchronization:

```bash
pnpm sync-bandcamp
```

### 4. Environment Variables

Create a `.env.local` file in the root directory for contact form functionality:

```env
RESEND_API_KEY=your_key_here
CONTACT_FORM_SENDER_EMAIL=sender@example.com
CONTACT_FORM_RECIPIENT_EMAIL=recipient@example.com
```

## 📦 Deployment

The project is designed to be deployed on [Vercel](https://vercel.com). Ensure the environment variables are set in your Vercel project settings.
