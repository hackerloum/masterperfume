/**
 * Shared domain types for Master Perfume.
 */

export type Category = "Men" | "Women" | "Unisex";

export const CATEGORIES: Category[] = ["Men", "Women", "Unisex"];

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
