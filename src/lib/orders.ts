/**
 * Firestore CRUD helpers for the `orders` collection.
 */
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
  doc,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Order, OrderInput, OrderStatus } from "@/types";

const COLLECTION = "orders";

/** Generate a short, human-friendly tracking code (no ambiguous characters). */
export function generateOrderCode(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return `MP-${s}`;
}

function toOrder(snap: QueryDocumentSnapshot<DocumentData>): Order {
  const data = snap.data();
  return {
    id: snap.id,
    code: data.code ?? "",
    productId: data.productId ?? "",
    productName: data.productName ?? "",
    selectedSize: Number(data.selectedSize ?? 0),
    bottleStyle: data.bottleStyle ?? "",
    price: Number(data.price ?? 0),
    quantity: Number(data.quantity ?? 1),
    customerName: data.customerName ?? "",
    phone: data.phone ?? "",
    location: data.location ?? "",
    note: data.note ?? "",
    status: (data.status as OrderStatus) ?? "pending",
    createdAt:
      typeof data.createdAt === "number" ? data.createdAt : Date.now(),
  };
}

/**
 * Create a new order. New orders always start with status "pending".
 * Returns the created order's id.
 */
export async function createOrder(input: OrderInput): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...input,
    status: "pending" as OrderStatus,
    createdAt: Date.now(),
  });
  return docRef.id;
}

/** Fetch all orders, newest first. */
export async function getOrders(): Promise<Order[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(toOrder);
}

/** Update an order's status. */
export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { status });
}

/**
 * Look up an order by its tracking code (used by the customer-facing "Track
 * order" page — no account needed). Returns null if not found.
 */
export async function getOrderByCode(code: string): Promise<Order | null> {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return null;
  const q = query(
    collection(db, COLLECTION),
    where("code", "==", normalized),
    limit(1)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return toOrder(snap.docs[0]);
}

/** All order line-items sharing a tracking code (a cart checkout creates many). */
export async function getOrdersByCode(code: string): Promise<Order[]> {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return [];
  const q = query(collection(db, COLLECTION), where("code", "==", normalized));
  const snap = await getDocs(q);
  return snap.docs.map(toOrder);
}
