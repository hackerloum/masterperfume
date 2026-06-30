/**
 * Shared domain types for Master Perfume.
 */

export type Category = "Men" | "Women" | "Unisex";

export const CATEGORIES: Category[] = ["Men", "Women", "Unisex"];

/**
 * A bottle the customer can choose ("perfume za kupima" — the oil is mixed and
 * poured into the chosen bottle/size at order time). Each bottle is fully
 * independent: its own photo and its own sizes. Managed in the admin dashboard
 * (`bottles` collection).
 */
export interface Bottle {
  id: string;
  name: string;
  /** Short hint shown under the bottle name. */
  hint: string;
  /** Photo of the real bottle (shown for every size of this bottle). */
  imageUrl: string;
  /** Sizes (ml) this bottle is offered in. */
  sizesMl: number[];
  isActive: boolean;
  createdAt: number;
}

export type BottleInput = Omit<Bottle, "id" | "createdAt">;

/**
 * Default bottles used as a fallback when Firebase isn't configured or the
 * `bottles` collection is empty, and as seed data for the admin.
 */
export const DEFAULT_BOTTLES: Bottle[] = [
  {
    id: "default-rollon",
    name: "Roll-on",
    hint: "Slim roller bottle",
    imageUrl: "",
    sizesMl: [3, 6, 12],
    isActive: true,
    createdAt: 1,
  },
  {
    id: "default-spray",
    name: "Spray Atomizer",
    hint: "Pump spray bottle",
    imageUrl: "",
    sizesMl: [30, 50, 100],
    isActive: true,
    createdAt: 2,
  },
  {
    id: "default-decant",
    name: "Simple Decant",
    hint: "Plain screw-cap vial",
    imageUrl: "",
    sizesMl: [6, 12, 30, 50, 100],
    isActive: true,
    createdAt: 3,
  },
];

/**
 * Promotional banner shown in the homepage hero carousel. Managed in the admin
 * dashboard (`banners` collection).
 */
export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  /** Where the CTA links to, e.g. "/products" or "/products/<id>". */
  link: string;
  ctaLabel: string;
  isActive: boolean;
  createdAt: number;
}

export type BannerInput = Omit<Banner, "id" | "createdAt">;

export const DEFAULT_OIL_COLOR = "#c9a24b"; // warm amber

/** A single size option for a perfume, e.g. 50ml @ 25,000 TZS. */
export interface ProductSize {
  sizeMl: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  imageUrl: string;
  /** Hex color of the mixed perfume oil — used to tint the 3D/2D bottle. */
  oilColor: string;
  sizes: ProductSize[];
  isFeatured: boolean;
  /** Stored as epoch milliseconds for easy serialization. */
  createdAt: number;
}

/** Payload used when creating/updating a product (no id, server sets createdAt). */
export type ProductInput = Omit<Product, "id" | "createdAt">;

export type OrderStatus = "pending" | "contacted" | "completed";

export const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "contacted",
  "completed",
];

export interface Order {
  id: string;
  productId: string;
  productName: string;
  selectedSize: number; // sizeMl
  /** Chosen bottle style name, e.g. "Roll-on". */
  bottleStyle: string;
  price: number; // unit price for the selected size
  quantity: number;
  customerName: string;
  phone: string;
  location: string;
  note: string;
  status: OrderStatus;
  createdAt: number;
}

/** Payload submitted from the order form. */
export type OrderInput = Omit<Order, "id" | "status" | "createdAt">;
