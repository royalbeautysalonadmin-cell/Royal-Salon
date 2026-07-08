# Royal Beauty Salon 👑

A premium, production-ready luxury beauty salon platform — _Where Beauty Meets Royalty_.

Built as a high-end digital experience comparable to luxury Warsaw beauty brands: 3D hero,
glassmorphism, scroll animations, a 3-click booking flow, full email workflow, and a secure
admin dashboard.

## ✨ Features

- **Luxury hero** with React Three Fiber 3D floating particles + glass orbs, parallax & glassmorphism
- **Full homepage**: About, Services (filterable), Bridal before/after slider, Packages, Training
  Academy, Why Choose Us, Testimonials carousel, masonry Gallery with lightbox, Contact + map + FAQ
- **3-click booking system**: multi-step flow (Service → Date → Time → Details → Confirm) with an
  animated success screen
- **Email workflow**: customer confirmation + admin notification via Resend (branded HTML)
- **Secure admin dashboard**: analytics, appointment management (approve / reject / complete /
  reschedule / delete), services CRUD, gallery upload, testimonials & contact messages
- **SEO**: dynamic metadata, Open Graph, Twitter cards, JSON-LD (LocalBusiness / Service / FAQ),
  sitemap & robots
- **Graceful demo mode**: runs fully without MongoDB / SMTP / Cloudinary configured

## 🛠 Tech Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn-style UI (Radix) · Framer Motion ·
React Three Fiber · Zustand · MongoDB + Mongoose · NextAuth · Resend · Cloudinary.

## 🎨 Brand Palette

| Token | Hex | Usage |
|---|---|---|
| Rose Gold | `#B76E79` | Primary |
| Champagne Gold | `#D4AF37` | Secondary |
| Soft Beige | `#F8F3EE` | Accent backgrounds |
| Pure White | `#FFFFFF` | Background |
| Luxury Black | `#111111` | Dark sections |
| Charcoal | `#333333` | Text |

## 🗂 Repository Layout

This is a **physical monorepo split** into two independently-deployable Next.js apps — not a
single project with a proxy. They talk to each other over HTTP, not shared imports.

```
/frontend   Public site + admin UI. Deployed to Vercel.
            Fetches its service catalog from the backend API at BUILD time
            (see frontend/src/lib/backend-api.ts) — no service data is
            duplicated locally.
/backend    API route handlers, MongoDB/Mongoose, NextAuth. Deployed to Render.
            Holds the one source of truth for the service catalog.
```

`frontend/next.config.ts` proxies `/api/*` to `BACKEND_URL` at runtime (via `rewrites()`), so the
browser only ever talks to the frontend's own domain — auth cookies, CORS and same-origin fetches
all just work.

## 🚀 Getting Started (local dev)

Run both apps side by side — the frontend needs the backend reachable at build **and** run time.

```bash
# Terminal 1 — backend (http://localhost:4000)
cd backend
npm install
cp .env.example .env.local   # fill in MongoDB URI, NextAuth secret, etc.
PORT=4000 npm run dev
npm run seed                 # first time only: seed services + admin user

# Terminal 2 — frontend (http://localhost:3000)
cd frontend
npm install
cp .env.example .env.local   # set BACKEND_URL=http://localhost:4000
npm run dev
```

`NEXTAUTH_SECRET` must be **identical** in both `.env.local` files — the backend issues the
session JWT, the frontend verifies it.

## 🔐 Admin

Visit **`/admin`** on the frontend → redirects to **`/admin/login`**. Credentials come from the
backend's `ADMIN_EMAIL`/`ADMIN_PASSWORD` (used once by `npm run seed`, in `/backend`).

## 📦 Scripts

Each app has its own `package.json` (`dev`, `build`, `start`, `lint`); `/backend` additionally has
`npm run seed` (services/packages/courses/testimonials/gallery + admin user).

## ☁️ Deploy

- **Backend → Render**: New Web Service, Root Directory `backend`, Build Command
  `npm install && npm run build`, Start Command `npm run start`. Set the env vars from
  `backend/.env.example` (Render injects `PORT` automatically).
- **Frontend → Vercel**: Import the repo, set Root Directory to `frontend`, add the env vars from
  `frontend/.env.example` — critically `BACKEND_URL` pointed at the Render service's public URL.
  The build fails loud if the backend is unreachable or returns a truncated catalog, by design.

---

© Royal Beauty Salon. All rights reserved.
