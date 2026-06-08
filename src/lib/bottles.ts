/**
 * Firestore CRUD helpers for the `bottles` collection, plus GLB model upload
 * to Firebase Storage. Bottles are managed in the admin dashboard.
 */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase";
import type { Bottle, BottleInput, BottleSize, BottleStyleId } from "@/types";

const COLLECTION = "bottles";

/** Parse bottle sizes, supporting both the new shape and the legacy sizesMl. */
function parseSizes(data: DocumentData): BottleSize[] {
  if (Array.isArray(data.sizes)) {
    return data.sizes
      .map((s: { ml?: unknown; imageUrl?: unknown }) => ({
        ml: Number(s?.ml),
        imageUrl: typeof s?.imageUrl === "string" ? s.imageUrl : "",
      }))
      .filter((s: BottleSize) => s.ml > 0);
  }
  // Legacy: sizesMl was a number[]
  if (Array.isArray(data.sizesMl)) {
    return data.sizesMl
      .map((n: unknown) => ({ ml: Number(n), imageUrl: "" }))
      .filter((s: BottleSize) => s.ml > 0);
  }
  return [];
}

function toBottle(snap: QueryDocumentSnapshot<DocumentData>): Bottle {
  const data = snap.data();
  return {
    id: snap.id,
    name: data.name ?? "",
    hint: data.hint ?? "",
    baseStyle: (data.baseStyle as BottleStyleId) ?? "decant",
    imageUrl: data.imageUrl ?? "",
    modelUrl: data.modelUrl ?? "",
    sizes: parseSizes(data),
    isActive: data.isActive !== false,
    createdAt:
      typeof data.createdAt === "number" ? data.createdAt : Date.now(),
  };
}

/** Fetch all bottles, oldest first (keeps a stable display order). */
export async function getBottles(): Promise<Bottle[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map(toBottle);
}

export async function createBottle(input: BottleInput): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...input,
    createdAt: Date.now(),
  });
  return docRef.id;
}

export async function updateBottle(
  id: string,
  input: Partial<BottleInput>
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { ...input });
}

export async function deleteBottle(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

/**
 * Upload a GLB bottle model to Firebase Storage and return its download URL.
 * Stored under `bottles/<timestamp>-<filename>`.
 */
export async function uploadBottleModel(file: File): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `bottles/${Date.now()}-${safeName}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

/**
 * Upload a bottle photo to Firebase Storage and return its download URL.
 * Stored under `bottles/images/<timestamp>-<filename>`.
 */
export async function uploadBottleImage(file: File): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `bottles/images/${Date.now()}-${safeName}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
