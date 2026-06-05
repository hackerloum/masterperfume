/**
 * Shared domain types for Master Perfume.
 */

export type Category = "Men" | "Women" | "Unisex";

export const CATEGORIES: Category[] = ["Men", "Women", "Unisex"];

/**
 * Bottle styles the customer can choose from ("perfume za kupima" — the oil is
 * mixed and poured into the chosen bottle/size at order time).
 */
export type BottleStyleId = "rollon" | "spray" | "flask" | "decant";

export interface BottleStyle {
  id: BottleStyleId;
  name: string;
  /** Short hint shown to the customer. */
  hint: string;
}

export const BOTTLE_STYLES: BottleStyle[] = [
  { id: "rollon", name: "Roll-on", hint: "Slim roller bottle" },
  { id: "spray", name: "Spray Atomizer", hint: "Pump spray bottle" },
  { id: "flask", name: "Classic Flask", hint: "Faceted glass flask" },
  { id: "decant", name: "Simple Decant", hint: "Plain screw-cap vial" },
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
