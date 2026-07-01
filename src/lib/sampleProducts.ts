import type { Product } from "@/types";

/**
 * Example sample perfumes.
 *
 * These are used:
 *  - as a graceful fallback when Firebase is not configured (so the UI is never
 *    empty during local development / preview), and
 *  - as seed data for the admin "Seed sample products" action.
 *
 * `oilColor` tints the 3D / 2D bottle preview to match the mixed perfume oil.
 * Images use Unsplash so the demo works out of the box; replace with your own
 * uploads via the admin dashboard in production.
 */
export const sampleProducts: Product[] = [
  {
    id: "sample-oud-royal",
    name: "Oud Royal",
    category: "Unisex",
    description:
      "A deep, smoky oud blended with warm amber and a touch of rose. Long-lasting and unmistakably luxurious — perfect for evenings and special occasions.",
    imageUrl:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    oilColor: "#7a3b1d",
    discountPercent: 20,
    sizes: [
      { sizeMl: 30, price: 25000 },
      { sizeMl: 50, price: 40000 },
      { sizeMl: 100, price: 70000 },
    ],
    isFeatured: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
  },
  {
    id: "sample-velvet-bloom",
    name: "Velvet Bloom",
    category: "Women",
    description:
      "A soft floral bouquet of jasmine and peony resting on creamy vanilla and musk. Elegant, feminine, and gentle on the skin.",
    imageUrl:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    oilColor: "#e6739f",
    discountPercent: 0,
    sizes: [
      { sizeMl: 30, price: 22000 },
      { sizeMl: 50, price: 35000 },
    ],
    isFeatured: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "sample-noir-intense",
    name: "Noir Intense",
    category: "Men",
    description:
      "Bold and confident — spicy black pepper and bergamot over a base of leather and cedar. A signature scent that lasts all day.",
    imageUrl:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    oilColor: "#3a2f2a",
    discountPercent: 0,
    sizes: [
      { sizeMl: 50, price: 38000 },
      { sizeMl: 100, price: 65000 },
    ],
    isFeatured: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: "sample-citrus-breeze",
    name: "Citrus Breeze",
    category: "Unisex",
    description:
      "Fresh and uplifting — zesty lemon, grapefruit and a hint of mint. Light, clean, and perfect for daytime wear.",
    imageUrl:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80",
    oilColor: "#e3c34a",
    discountPercent: 15,
    sizes: [
      { sizeMl: 30, price: 18000 },
      { sizeMl: 50, price: 30000 },
    ],
    isFeatured: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
  },
  {
    id: "sample-amber-musk",
    name: "Amber Musk",
    category: "Women",
    description:
      "Warm amber wrapped in soft white musk and sandalwood. Cozy, sensual, and beautifully long-lasting.",
    imageUrl:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    oilColor: "#c9882b",
    discountPercent: 0,
    sizes: [
      { sizeMl: 50, price: 33000 },
      { sizeMl: 100, price: 58000 },
    ],
    isFeatured: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "sample-blue-wave",
    name: "Blue Wave",
    category: "Men",
    description:
      "Aquatic freshness with marine notes, sage and a woody dry-down. Crisp, modern, and effortlessly cool.",
    imageUrl:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    oilColor: "#3a7bd5",
    discountPercent: 0,
    sizes: [
      { sizeMl: 50, price: 36000 },
      { sizeMl: 100, price: 62000 },
    ],
    isFeatured: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
  },
];
