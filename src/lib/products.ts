/**
 * Firestore CRUD helpers for the `products` collection,
 * plus image upload to Firebase Storage.
 */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "./firebase";
import type { Product, ProductInput } from "@/types";

const COLLECTION = "products";

/** Map a Firestore document into a typed Product. */
function toProduct(snap: QueryDocumentSnapshot<DocumentData>): Product {
  const data = snap.data();
  return {
    id: snap.id,
    name: data.name ?? "",
    category: data.category ?? "Unisex",
    description: data.description ?? "",
    imageUrl: data.imageUrl ?? "",
    sizes: Array.isArray(data.sizes) ? data.sizes : [],
    isFeatured: Boolean(data.isFeatured),
    createdAt:
      typeof data.createdAt === "number" ? data.createdAt : Date.now(),
  };
}

/** Fetch all products, newest first. */
export async function getProducts(): Promise<Product[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(toProduct);
}

/** Fetch only featured products. */
export async function getFeaturedProducts(): Promise<Product[]> {
  const q = query(
    collection(db, COLLECTION),
    where("isFeatured", "==", true)
  );
  const snap = await getDocs(q);
  // Sort client-side to avoid requiring a composite index.
  return snap.docs.map(toProduct).sort((a, b) => b.createdAt - a.createdAt);
}

/** Fetch a single product by id, or null if it does not exist. */
export async function getProduct(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return toProduct(snap as QueryDocumentSnapshot<DocumentData>);
}

/** Create a new product. Returns the new document id. */
export async function createProduct(input: ProductInput): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...input,
    createdAt: Date.now(),
  });
  return docRef.id;
}

/** Update an existing product. */
export async function updateProduct(
  id: string,
  input: Partial<ProductInput>
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { ...input });
}

/** Delete a product. */
export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

/**
 * Upload a product image to Firebase Storage and return its download URL.
 * Files are stored under `products/<timestamp>-<filename>`.
 */
export async function uploadProductImage(file: File): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `products/${Date.now()}-${safeName}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
