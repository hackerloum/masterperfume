import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import JsonLd from "@/components/JsonLd";
import { fetchActiveBottles, fetchProduct, fetchProducts } from "@/lib/data";
import {
  breadcrumbJsonLd,
  productJsonLd,
  productMetadata,
} from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const products = await fetchProducts();
    return products.map((p) => ({ id: p.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await fetchProduct(params.id);
  if (!product) return { title: "Perfume not found", robots: { index: false } };
  return productMetadata(product);
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, bottles] = await Promise.all([
    fetchProduct(params.id),
    fetchActiveBottles(),
  ]);
  if (!product) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Perfumes", path: "/products" },
          { name: product.name, path: `/products/${product.id}` },
        ])}
      />
      <JsonLd data={productJsonLd(product)} />
      <ProductDetail
        id={params.id}
        initialProduct={product}
        initialBottles={bottles}
      />
    </>
  );
}
