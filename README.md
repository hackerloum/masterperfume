# Master Perfume

A simple, professional, mobile-first online perfume store for **Master Perfume**.

> _Feel Unique, Leave a Masterpiece_

Customers can browse perfumes and place orders **without creating an account**.
Orders are saved to Firebase Firestore and the customer is redirected to
WhatsApp to confirm.

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — bright & minimal, white with a single sage-green accent
  (change the `accent` color in `tailwind.config.ts` to re-theme the whole site)
- **Firebase Firestore** (products & orders) + **Firebase Storage** (images)
- Deployable on **Vercel**

## Features

- **Home** — hero, slogan, CTA, featured perfumes, benefits, Instagram handle
- **Products** — responsive grid with category filter (Men / Women / Unisex)
- **Product detail** — bottle photo preview with switchable backdrops, size +
  bottle selection, and a no-login order form. Built for "perfume za kupima":
  the oil is mixed and poured fresh into the selected bottle.
- **Checkout** — saves to Firestore, shows a success message, and offers a
  WhatsApp confirmation button with a pre-filled message
- **Admin** (`/admin`) — password-gated dashboard to:
  - add / edit / delete products and upload images
  - manage sizes & prices, set the perfume oil colour, toggle "featured"
  - **manage bottles**: each bottle has its own photo and its own sizes (ml)
  - view orders, change status (pending / contacted / completed)
  - see total orders and estimated sales
- Mobile-first design, sticky bottom CTA, loading / empty / error states

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your Firebase web config, WhatsApp number, Instagram handle, and an
   `ADMIN_PASSWORD`. See `.env.local.example` for all variables.

   > The site runs without Firebase configured — it falls back to bundled
   > **sample perfumes** so you can preview the UI immediately.

3. **Run locally**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## Firebase Setup

1. Create a Firebase project and a **Web app**; copy the config into
   `.env.local` (`NEXT_PUBLIC_FIREBASE_*`).
2. Enable **Cloud Firestore** and **Storage**.
3. Deploy the included rules (`firestore.rules`, `storage.rules`) — and tighten
   them before production (they are permissive for quick setup).
4. Open `/admin`, log in, and click **Seed samples** to populate example
   products, or **Add product** to create your own.

### Data model

**`products`**: `name`, `category`, `description`, `imageUrl`, `oilColor`
(hex — tints the bottle preview), `sizes: [{ sizeMl, price }]`, `isFeatured`,
`createdAt`

**`orders`**: `productId`, `productName`, `selectedSize`, `bottleStyle`,
`price`, `quantity`, `customerName`, `phone`, `location`, `note`, `status`,
`createdAt`

### Bottles

Bottles are managed in the **admin "Bottles" tab** (Firestore `bottles`
collection). Each bottle is **independent**: its own photo and its own sizes.
If a size uses a different physical bottle, add it as a separate bottle. On the
product page the customer picks a bottle, and the size options shown are the
perfume's priced sizes limited to that bottle's sizes.

- **`bottles`**: `name`, `hint`, `imageUrl` (photo), `sizesMl[]`, `isActive`,
  `createdAt`.
- Upload a **transparent PNG** (background removed); the site presents it on
  switchable **backdrop scenes** (`src/components/bottle/bottleBackdrops.ts`).
- Defaults live in `DEFAULT_BOTTLES` (`src/types/index.ts`) and seed via the
  admin "Seed defaults" button.

## Deploy to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. Add the same environment variables from `.env.local` in
   **Project Settings → Environment Variables**.
3. Deploy. Vercel auto-detects Next.js — no extra config needed.

## Project Structure

```
src/
  app/
    layout.tsx            # root layout (fonts, navbar, footer)
    page.tsx              # home page
    products/page.tsx     # product listing
    products/[id]/page.tsx# product detail
    admin/page.tsx        # admin dashboard
    api/admin/login/      # password-check API route
  components/
    Navbar, Footer, Hero, Benefits, FeaturedProducts, StickyCTA
    ProductCard, ProductsClient, ProductDetail, OrderForm, Spinner
    admin/ AdminDashboard, AdminGate, OrderManager, ProductManager, ProductForm
  lib/
    firebase.ts           # Firebase init
    products.ts, orders.ts# Firestore CRUD
    data.ts               # resilient fetchers w/ sample fallback
    config.ts             # site config, price & WhatsApp helpers
    sampleProducts.ts     # example perfumes / seed data
  types/index.ts          # shared types
```

## Configuration notes

- **WhatsApp number** and **Instagram handle** are set via env vars and read in
  `src/lib/config.ts` — easy to change without touching components.
- **Admin password** is checked server-side (`/api/admin/login`) so it is never
  shipped to the browser.
