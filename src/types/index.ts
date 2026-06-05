/**
 * Shared domain types for Master Perfume.
 */

export type Category = "Men" | "Women" | "Unisex";

export const CATEGORIES: Category[] = ["Men", "Women", "Unisex"];

/**
 * Built-in 3D bottle shapes. Each admin-managed bottle maps to one of these for
 * its procedural preview, until a custom GLB model (e.g. exported from Meshy)
 * is uploaded.
 */
export type BottleStyleId = "rollon" | "spray" | "flask" | "decant";

export interface BottleBaseShape {
  id: BottleStyleId;
  name: string;
  hint: string;
}

export const BOTTLE_BASE_SHAPES: BottleBaseShape[] = [
  { id: "rollon", name: "Roll-on", hint: "Slim roller bottle" },
  { id: "spray", name: "Spray Atomizer", hint: "Pump spray bottle" },
  { id: "flask", name: "Classic Flask", hint: "Faceted glass flask" },
  { id: "decant", name: "Simple Decant", hint: "Plain screw-cap vial" },
];

/**
 * A bottle the customer can choose ("perfume za kupima" — the oil is mixed and
 * poured into the chosen bottle/size at order time). Managed in the admin
 * dashboard (`bottles` collection).
 */
export interface Bottle {
  id: string;
  name: string;
  /** Short hint shown under the bottle name. */
  hint: string;
  /** Built-in 3D shape used when no custom model is uploaded. */
  baseStyle: BottleStyleId;
  /** Optional uploaded GLB model URL (Firebase Storage). */
  modelUrl: string;
  /** Volumes (ml) this bottle is offered in. */
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
    baseStyle: "rollon",
    modelUrl: "",
    sizesMl: [3, 6, 12, 30],
    isActive: true,
    createdAt: 1,
  },
  {
    id: "default-spray",
    name: "Spray Atomizer",
    hint: "Pump spray bottle",
    baseStyle: "spray",
    modelUrl: "",
    sizesMl: [30, 50, 100],
    isActive: true,
    createdAt: 2,
  },
  {
    id: "default-flask",
    name: "Classic Flask",
    hint: "Faceted glass flask",
    baseStyle: "flask",
    modelUrl: "",
    sizesMl: [30, 50, 100],
    isActive: true,
    createdAt: 3,
  },
  {
    id: "default-decant",
    name: "Simple Decant",
    hint: "Plain screw-cap vial",
    baseStyle: "decant",
    modelUrl: "",
    sizesMl: [6, 12, 30, 50, 100],
    isActive: true,
    createdAt: 4,
  },
];

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
