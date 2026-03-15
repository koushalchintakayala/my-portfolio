# replit.md

## Overview

This is a personal portfolio website for Koushal Chintakayala. It's built as a single-page application (SPA) using React with TypeScript on the frontend and Express on the backend. The portfolio showcases sections for Home, About, Skills, Projects, and Contact with features like a typing animation effect, dark/light theme toggle, mobile-responsive navigation, and glassmorphism-styled UI elements. The accent color is `#ff3a61` (a vibrant pinkish-red).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, rendered client-side (no SSR)
- **Build Tool**: Vite with HMR in development
- **Styling**: Custom CSS with CSS variables for theming (dark/light mode), using the Poppins font from Google Fonts and Font Awesome icons. There are also Tailwind CSS and shadcn/ui components configured (new-york style) but the main portfolio page primarily uses custom CSS
- **Entry Point**: `client/src/main.tsx` renders `App.tsx` into `#root`
- **App Structure**: Single-file `App.tsx` component containing the entire portfolio with sections (Home, About, Skills, Projects, Contact), a typing effect hook, and navigation
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend
- **Framework**: Express 5 running on Node.js with TypeScript (via tsx)
- **Server Entry**: `server/index.ts` creates an HTTP server, registers routes, and serves static files
- **Routes**: `server/routes.ts` — currently has no API routes; the server exists primarily to serve the frontend
- **Static Serving**: In production, serves built files from `dist/public`. In development, Vite dev server middleware handles HMR and file serving
- **Development vs Production**: 
  - Dev: `tsx server/index.ts` with Vite middleware (`server/vite.ts`)
  - Build: `tsx script/build.ts` runs Vite build for client + esbuild for server → outputs to `dist/`
  - Production: `node dist/index.cjs`

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: `shared/schema.ts` defines a `users` table with `id`, `username`, `password` fields — this is scaffolding/boilerplate and not actively used by the portfolio
- **In-Memory Storage**: `server/storage.ts` provides a `MemStorage` class implementing basic user CRUD — again, scaffolding not currently in use
- **Database Config**: `drizzle.config.ts` expects `DATABASE_URL` environment variable for PostgreSQL. Push schema with `npm run db:push`

### Key Design Decisions
- **Monorepo Structure**: Client, server, and shared code live in one repository with clear separation (`client/`, `server/`, `shared/`)
- **Shared Schema**: Database types and Zod validation schemas are defined in `shared/schema.ts` so both frontend and backend can use the same types
- **Custom CSS over Tailwind**: Despite having Tailwind and shadcn/ui configured, the portfolio uses custom CSS with CSS variables for full control over the glassmorphism aesthetic and theme toggling
- **Static-first approach**: The Express server has no API routes — it's purely serving the React SPA. This makes deployment simple while leaving room to add API endpoints later

### Legacy Files
- `client/script.js`, `client/style.css`, `client/public/script.js`, `client/public/style.css` appear to be from an earlier vanilla HTML/CSS/JS version of the portfolio. The active application uses the React version in `client/src/`

## External Dependencies

### Core Technologies
- **React 18** with ReactDOM for UI rendering
- **Express 5** for HTTP server
- **Vite** for frontend bundling and dev server
- **TypeScript** across the entire stack
- **esbuild** for server-side production bundling

### Database & ORM
- **PostgreSQL** — requires `DATABASE_URL` environment variable
- **Drizzle ORM** (`drizzle-orm`) — SQL query builder and ORM
- **Drizzle Kit** (`drizzle-kit`) — migration and schema push tooling
- **Drizzle Zod** (`drizzle-zod`) — generates Zod schemas from Drizzle tables

### UI Libraries
- **shadcn/ui** components (new-york style) with extensive Radix UI primitives
- **Tailwind CSS** with custom theme configuration
- **class-variance-authority** and **clsx** for conditional class handling
- **@tanstack/react-query** for data fetching (available but not actively used)
- **react-hook-form** with `@hookform/resolvers` for form handling

### External CDN Resources
- **Font Awesome 6.4.0** — loaded via CDN for icons
- **Google Fonts (Poppins)** — loaded via CDN for typography

### Replit-specific
- `@replit/vite-plugin-runtime-error-modal` — error overlay in development
- `@replit/vite-plugin-cartographer` — development tooling (dev only)
- `@replit/vite-plugin-dev-banner` — dev banner (dev only)

### Session & Auth (scaffolded, not active)
- **connect-pg-simple** — PostgreSQL session store for Express sessions
- **passport** / **passport-local** — authentication framework
- **express-session** — session middleware