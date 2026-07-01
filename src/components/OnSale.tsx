"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/lib/data";
import { IconArrowRight } from "./icons";
import type { Product } from "@/types";

/** "Hot Deals" — products currently on sale (discountPercent > 0). */
export default function OnSale() {
  const [items, setItems] = useState<Product[] | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((all) =>
        setItems(
          all
            .filter((p) => p.discountPercent > 0)
            .sort((a, b) => b.discountPercent - a.discountPercent)
        )
      )
      .catch(() => setItems([]));
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <section className="container-px py-8 sm:py-12">
      <div className="rounded-3xl bg-gradient-to-br from-red-50 to-white p-5 sm:p-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
              🔥 Limited time
            </p>
            <h2 className="mt-1 font-serif text-3xl font-800 text-ink sm:text-4xl">
              Hot Deals
            </h2>
          </div>
          <Link
            href="/products?q="
            className="hidden items-center gap-1 text-sm font-medium text-red-600 hover:underline sm:inline-flex"
          >
            See all <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="-mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.slice(0, 12).map((p) => (
            <div key={p.id} className="w-40 shrink-0 snap-start sm:w-52">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
