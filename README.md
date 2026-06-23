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
- **Email workflow**: customer confirmation + admin notification via Nodemailer (branded HTML)
- **Secure admin dashboard**: analytics, appointment management (approve / reject / complete /
  reschedule / delete), services CRUD, gallery upload, testimonials & contact messages
- **SEO**: dynamic metadata, Open Graph, Twitter cards, JSON-LD (LocalBusiness / Service / FAQ),
  sitemap & robots
- **Graceful demo mode**: runs fully without MongoDB / SMTP / Cloudinary configured

## 🛠 Tech Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn-style UI (Radix) · Framer Motion ·
React Three Fiber · Zustand · MongoDB + Mongoose · NextAuth · Nodemailer · Cloudinary.

## 🎨 Brand Palette

| Token | Hex | Usage |
|---|---|---|
| Rose Gold | `#B76E79` | Primary |
| Champagne Gold | `#D4AF37` | Secondary |
| Soft Beige | `#F8F3EE` | Accent backgrounds |
| Pure White | `#FFFFFF` | Background |
| Luxury Black | `#111111` | Dark sections |
| Charcoal | `#333333` | Text |

## 🚀 Getting Started

```bash
npm install
cp .env.example .env.local   # fill in your credentials (optional for demo)
npm run dev                  # http://localhost:3000
```

> A `.env.local` with safe demo defaults is included so the app runs immediately. The app
> degrades gracefully: without `MONGODB_URI` it runs in **demo mode**, without SMTP it skips
> emails, without Cloudinary you can still add gallery images by URL.

### Enable full functionality

1. Create a **MongoDB Atlas** cluster → set `MONGODB_URI`.
2. Set `NEXTAUTH_SECRET` (`openssl rand -base64 32`), `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
3. (Optional) Configure SMTP for emails and Cloudinary for uploads.
4. Seed the database + create the admin user:

```bash
npm run seed
```

## 🔐 Admin

Visit **`/admin`** → redirects to **`/admin/login`**.
Demo credentials (from `.env.local`): `admin@royalbeautysalon.pl` / `Royal@2026`.

## 📦 Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run seed` | Seed services/packages/courses/testimonials/gallery + admin user |

## 🗂 Project Structure

```
src/
├── app/                # App Router: pages, API routes, admin (route group)
├── components/
│   ├── ui/             # shadcn-style primitives
│   ├── sections/       # homepage sections
│   ├── booking/        # multi-step booking dialog
│   ├── admin/          # dashboard managers
│   ├── layout/         # navbar, footer, floating actions
│   ├── three/          # R3F particle field
│   └── shared/         # reveal animations, headings
├── data/               # demo content (services, packages, courses, …)
├── lib/                # db, auth, email, cloudinary, seo, utils
├── models/             # Mongoose schemas
├── store/              # Zustand
└── types/              # shared types + JSX augmentation
```

## ☁️ Deploy (Vercel)

Push to GitHub, import into Vercel, add the environment variables from `.env.example`, deploy.
Add the Cloudinary & Unsplash hostnames (already in `next.config.ts`) if you change image sources.

---

© Royal Beauty Salon. All rights reserved.
