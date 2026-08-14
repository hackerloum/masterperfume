import Link from "next/link";
import ProductCarousel from "./ProductCarousel";
import { soldFor } from "@/lib/social";
import type { Product } from "@/types";

function Row({
  title,
  href,
  products,
  auto,
}: {
  title: string;
  href: string;
  products: Product[];
  auto?: boolean;
}) {
  if (products.length === 0) return null;
  return (
    <div className="mb-6 rounded-lg border border-ink/10 bg-white p-3 last:mb-0 sm:p-4">
      <div className="section-head">
        <h2 className="section-title">{title}</h2>
        <Link href={href} className="section-link">
          See all
        </Link>
      </div>
      <ProductCarousel products={products} auto={auto} />
    </div>
  );
}

export default function HomeRows({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  const newArrivals = [...products]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 12);
  const bestSellers = [...products]
    .sort((a, b) => soldFor(b.id) - soldFor(a.id))
    .slice(0, 12);
  const trending = [...products]
    .filter((p) => p.isFeatured || p.discountPercent > 0)
    .slice(0, 12);

  return (
    <section className="container-px py-2 sm:py-4">
      <Row title="New arrivals" href="/products" products={newArrivals} />
      <Row title="Best sellers" href="/products" products={bestSellers} auto />
      <Row title="Trending now" href="/products?sort=discount" products={trending} auto />
    </section>
  );
}
