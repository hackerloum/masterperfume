/**
 * Firestore CRUD helpers for the `orders` collection.
 */
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  doc,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Order, OrderInput, OrderStatus } from "@/types";

const COLLECTION = "orders";

function toOrder(snap: QueryDocumentSnapshot<DocumentData>): Order {
  const data = snap.data();
  return {
    id: snap.id,
    productId: data.productId ?? "",
    productName: data.productName ?? "",
    selectedSize: Number(data.selectedSize ?? 0),
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
