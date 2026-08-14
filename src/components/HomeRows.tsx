import Link from "next/link";
import ProductCard from "./ProductCard";
import { soldFor } from "@/lib/social";
import type { Product } from "@/types";

function Row({
  title,
  href,
  products,
}: {
  title: string;
  href: string;
  products: Product[];
}) {
  if (products.length === 0) return null;
  return (
    <div className="mb-6 last:mb-0">
      <div className="section-head">
        <h2 className="section-title">{title}</h2>
        <Link href={href} className="section-link">
          See all
        </Link>
      </div>
      <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {products.map((p) => (
          <div key={p.id} className="w-40 shrink-0 snap-start sm:w-48">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
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
      <Row title="Best sellers" href="/products" products={bestSellers} />
      <Row title="Trending" href="/products?sort=discount" products={trending} />
    </section>
  );
}
