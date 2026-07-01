"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/lib/data";
import { soldFor } from "@/lib/social";
import type { Product } from "@/types";

function Row({
  eyebrow,
  title,
  products,
}: {
  eyebrow: string;
  title: string;
  products: Product[];
}) {
  if (products.length === 0) return null;
  return (
    <div className="mb-10">
      <div className="mb-5">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-1 font-serif text-2xl font-800 text-ink sm:text-3xl">
          {title}
        </h2>
      </div>
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {products.map((p) => (
          <div key={p.id} className="w-40 shrink-0 snap-start sm:w-52">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** New Arrivals / Best Sellers / Trending rows (dynamic from the catalog). */
export default function HomeRows() {
  const [all, setAll] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then(setAll)
      .catch(() => setAll([]));
  }, []);

  if (all.length === 0) return null;

  const newArrivals = [...all].sort((a, b) => b.createdAt - a.createdAt).slice(0, 12);
  const bestSellers = [...all]
    .sort((a, b) => soldFor(b.id) - soldFor(a.id))
    .slice(0, 12);
  const trending = [...all]
    .filter((p) => p.isFeatured || p.discountPercent > 0)
    .slice(0, 12);

  return (
    <section className="container-px py-8 sm:py-12">
      <Row eyebrow="Just landed" title="New Arrivals" products={newArrivals} />
      <Row eyebrow="Most loved" title="Best Sellers" products={bestSellers} />
      <Row eyebrow="Popular now" title="Trending" products={trending} />
    </section>
  );
}
