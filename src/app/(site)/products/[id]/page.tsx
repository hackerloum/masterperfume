import type { Metadata } from "next";
import ProductDetail from "@/components/ProductDetail";
import { fetchProduct } from "@/lib/data";

/** Per-product SEO title/description so Google indexes each perfume. */
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const product = await fetchProduct(params.id);
    if (!product) return { title: "Perfume" };
    const desc =
      product.description?.slice(0, 155) ||
      `Order ${product.name} perfume from Master Perfume.`;
    return {
      title: product.name,
      description: desc,
      openGraph: {
        title: product.name,
        description: desc,
        images: product.imageUrl ? [product.imageUrl] : undefined,
      },
    };
  } catch {
    return { title: "Perfume" };
  }
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProductDetail id={params.id} />;
}
