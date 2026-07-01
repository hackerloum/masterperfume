import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getProducts } from "@/lib/products";
import { isFirebaseConfigured } from "@/lib/firebase";

export const revalidate = 3600; // refresh hourly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/products", "/track", "/faq", "/cart", "/wishlist"].map(
    (p) => ({ url: `${SITE_URL}${p}`, lastModified: new Date() })
  );

  if (!isFirebaseConfigured) return routes;

  try {
    const products = await getProducts();
    const productUrls = products.map((p) => ({
      url: `${SITE_URL}/products/${p.id}`,
      lastModified: new Date(p.createdAt),
    }));
    return [...routes, ...productUrls];
  } catch {
    return routes;
  }
}
