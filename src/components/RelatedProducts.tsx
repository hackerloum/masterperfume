"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/lib/data";
import type { Category, Product } from "@/types";

/**
 * "You may also like" cross-sell row (Amazon/Alibaba-style). Prefers products
 * in the same category, then fills with others. Horizontally scrollable.
 */
export default function RelatedProducts({
  currentId,
  category,
}: {
  currentId: string;
  category: Category;
}) {
  const [items, setItems] = useState<Product[] | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((all) => {
        const others = all.filter((p) => p.id !== currentId);
        const sameCat = others.filter((p) => p.category === category);
        const rest = others.filter((p) => p.category !== category);
        setItems([...sameCat, ...rest].slice(0, 12));
      })
      .catch(() => setItems([]));
  }, [currentId, category]);

  if (!items || items.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="eyebrow">More to love</p>
          <h2 className="mt-1 font-serif text-2xl font-800 text-ink sm:text-3xl">
            You may also like
          </h2>
        </div>
      </div>

      {/* Horizontal scroller */}
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((p) => (
          <div key={p.id} className="w-40 shrink-0 snap-start sm:w-52">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
