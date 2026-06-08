/**
 * Firestore CRUD helpers for the `bottles` collection, plus photo upload to
 * Firebase Storage. Bottles are managed in the admin dashboard.
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
import type { Bottle, BottleInput } from "@/types";

const COLLECTION = "bottles";

/** Parse bottle sizes (ml), supporting the legacy per-size object shape. */
function parseSizes(data: DocumentData): number[] {
  if (Array.isArray(data.sizesMl)) {
    return data.sizesMl.map((n: unknown) => Number(n)).filter((n: number) => n > 0);
  }
  // Legacy: sizes was [{ ml, imageUrl }]
  if (Array.isArray(data.sizes)) {
    return data.sizes
      .map((s: { ml?: unknown }) => Number(s?.ml))
      .filter((n: number) => n > 0);
  }
  return [];
}

function toBottle(snap: QueryDocumentSnapshot<DocumentData>): Bottle {
  const data = snap.data();
  return {
    id: snap.id,
    name: data.name ?? "",
    hint: data.hint ?? "",
    imageUrl: data.imageUrl ?? "",
    sizesMl: parseSizes(data),
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
