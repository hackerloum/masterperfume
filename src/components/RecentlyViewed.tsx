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
    <section className="py-4 sm:py-6">
      <div className="section-head">
        <h2 className="section-title">{title}</h2>
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
