# Master Perfume

A simple, professional, mobile-first online perfume store for **Master Perfume**.

> _Feel Unique, Leave a Masterpiece_

Customers can browse perfumes and place orders **without creating an account**.
Orders are saved to Firebase Firestore and the customer is redirected to
WhatsApp to confirm.

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (luxury black / gold / cream palette)
- **Firebase Firestore** (products & orders) + **Firebase Storage** (images)
- Deployable on **Vercel**

## Features

- **Home** — hero, slogan, CTA, featured perfumes, benefits, Instagram handle
- **Products** — responsive grid with category filter (Men / Women / Unisex)
- **Product detail** — interactive **3D bottle preview** (drag to rotate) that
  reflects the chosen bottle style, size, and the perfume's oil colour, plus a
  no-login order form. Built for "perfume za kupima": the oil is mixed and
  poured fresh into the selected bottle.
- **Checkout** — saves to Firestore, shows a success message, and offers a
  WhatsApp confirmation button with a pre-filled message
- **Admin** (`/admin`) — password-gated dashboard to:
  - add / edit / delete products and upload images
  - manage sizes & prices, toggle "featured"
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

### 3D bottle preview

The bottles are **procedurally generated** with three.js / react-three-fiber
(`src/components/bottle/`) — no model files. Each style (Roll-on, Spray
Atomizer, Classic Flask, Simple Decant) is a revolved glass silhouette in
`bottleProfiles.ts`; the WebGL canvas is lazy-loaded (`ssr: false`) and
code-split so listing pages stay fast (they use a lightweight SVG bottle).
Bottle styles live in `BOTTLE_STYLES` (`src/types/index.ts`) — rename/add there.

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
