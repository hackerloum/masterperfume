/**
 * Firestore CRUD helpers for the `banners` collection, plus image upload to
 * Firebase Storage. Banners power the homepage hero carousel and are managed in
 * the admin dashboard.
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
import type { Banner, BannerInput } from "@/types";

const COLLECTION = "banners";

function toBanner(snap: QueryDocumentSnapshot<DocumentData>): Banner {
  const data = snap.data();
  return {
    id: snap.id,
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    imageUrl: data.imageUrl ?? "",
    link: data.link ?? "/products",
    ctaLabel: data.ctaLabel ?? "Shop now",
    isActive: data.isActive !== false,
    createdAt:
      typeof data.createdAt === "number" ? data.createdAt : Date.now(),
  };
}

/** Fetch all banners, oldest first (stable carousel order). */
export async function getBanners(): Promise<Banner[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map(toBanner);
}

export async function createBanner(input: BannerInput): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...input,
    createdAt: Date.now(),
  });
  return docRef.id;
}

export async function updateBanner(
  id: string,
  input: Partial<BannerInput>
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { ...input });
}

export async function deleteBanner(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

/** Upload a banner image to Storage under `banners/<timestamp>-<filename>`. */
export async function uploadBannerImage(file: File): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `banners/${Date.now()}-${safeName}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
