"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/lib/data";
import { getRecentlyViewed } from "@/lib/recentlyViewed";
import type { Product } from "@/types";

/** Horizontal row of products the customer recently viewed (this device). */
export default function RecentlyViewed({
  excludeId,
  title = "Recently viewed",
}: {
  excludeId?: string;
  title?: string;
}) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const ids = getRecentlyViewed().filter((id) => id !== excludeId);
    if (ids.length === 0) return;
    fetchProducts()
      .then((all) => {
        const byId = new Map(all.map((p) => [p.id, p]));
        setItems(ids.map((id) => byId.get(id)).filter(Boolean) as Product[]);
      })
      .catch(() => setItems([]));
  }, [excludeId]);

  if (items.length === 0) return null;

  return (
    <section className="mt-14">
      <div className="mb-6">
        <p className="eyebrow">Keep browsing</p>
        <h2 className="mt-1 font-serif text-2xl font-800 text-ink sm:text-3xl">
          {title}
        </h2>
      </div>
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
