/**
 * Resilient data-access wrappers for client UI.
 *
 * These wrap the raw Firestore helpers so the storefront never shows a broken
 * page when Firebase is not yet configured (or temporarily unreachable):
 * in those cases we fall back to the bundled sample products. The admin
 * dashboard uses the raw helpers directly so it surfaces real errors.
 */
import { isFirebaseConfigured } from "./firebase";
import {
  getFeaturedProducts,
  getProduct,
  getProducts,
} from "./products";
import { getBottles } from "./bottles";
import { getBanners } from "./banners";
import { sampleProducts } from "./sampleProducts";
import {
  DEFAULT_BOTTLES,
  type Banner,
  type Bottle,
  type Product,
} from "@/types";

export async function fetchProducts(): Promise<Product[]> {
  if (!isFirebaseConfigured) return sampleProducts;
  try {
    const products = await getProducts();
    return products.length ? products : sampleProducts;
  } catch (err) {
    console.error("Falling back to sample products:", err);
    return sampleProducts;
  }
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  if (!isFirebaseConfigured) {
    return sampleProducts.filter((p) => p.isFeatured);
  }
  try {
    const featured = await getFeaturedProducts();
    return featured.length
      ? featured
      : sampleProducts.filter((p) => p.isFeatured);
  } catch (err) {
    console.error("Falling back to sample featured products:", err);
    return sampleProducts.filter((p) => p.isFeatured);
  }
}

/** Active banners for the homepage hero. Empty array means "use the default hero". */
export async function fetchActiveBanners(): Promise<Banner[]> {
  if (!isFirebaseConfigured) return [];
  try {
    return (await getBanners()).filter((b) => b.isActive && b.imageUrl);
  } catch (err) {
    console.error("Could not load banners:", err);
    return [];
  }
}

/** Active bottles for the storefront, falling back to the built-in defaults. */
export async function fetchActiveBottles(): Promise<Bottle[]> {
  if (!isFirebaseConfigured) return DEFAULT_BOTTLES;
  try {
    const bottles = (await getBottles()).filter((b) => b.isActive);
    return bottles.length ? bottles : DEFAULT_BOTTLES;
  } catch (err) {
    console.error("Falling back to default bottles:", err);
    return DEFAULT_BOTTLES;
  }
}

export async function fetchProduct(id: string): Promise<Product | null> {
  if (!isFirebaseConfigured) {
    return sampleProducts.find((p) => p.id === id) ?? null;
  }
  try {
    const product = await getProduct(id);
    if (product) return product;
    // Allow viewing sample products by id even with Firebase on (demo links).
    return sampleProducts.find((p) => p.id === id) ?? null;
  } catch (err) {
    console.error("Falling back to sample product:", err);
    return sampleProducts.find((p) => p.id === id) ?? null;
  }
}
