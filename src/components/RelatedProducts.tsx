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
    <section className="mt-8">
      <div className="section-head">
        <h2 className="section-title">You may also like</h2>
      </div>
      <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((p) => (
          <div key={p.id} className="w-40 shrink-0 snap-start sm:w-48">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
