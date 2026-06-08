"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";
import { fetchProducts } from "@/lib/data";
import { CATEGORIES, type Category, type Product } from "@/types";

type Filter = "All" | Category;
const FILTERS: Filter[] = ["All", ...CATEGORIES];

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const initialCategory = CATEGORIES.find(
    (c) => c === searchParams.get("category")
  );

  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<Filter>(initialCategory ?? "All");

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError(true));
  }, []);

  const visible = useMemo(() => {
    if (!products) return [];
    if (filter === "All") return products;
    return products.filter((p) => p.category === filter);
  }, [products, filter]);

  return (
    <section className="container-px py-10 pb-28 sm:pb-16">
      {/* Category filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition ${
              filter === f
                ? "bg-ink text-white shadow-sm"
                : "border border-ink/15 bg-white text-ink/60 hover:border-accent hover:text-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Loading */}
      {products === null && !error && (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-ink/10 bg-white p-10 text-center">
          <p className="text-ink/70">
            Something went wrong loading perfumes. Please refresh the page.
          </p>
        </div>
      )}

      {/* Empty (no products at all) */}
      {products && products.length === 0 && (
        <div className="rounded-2xl border border-dashed border-ink/20 bg-white p-12 text-center">
          <p className="text-4xl">🌸</p>
          <h3 className="mt-3 font-serif text-xl text-ink">No perfumes yet</h3>
          <p className="mt-1 text-ink/60">
            Our collection is being prepared. Please check back soon.
          </p>
        </div>
      )}

      {/* Empty for a category filter */}
      {products && products.length > 0 && visible.length === 0 && (
        <div className="rounded-2xl border border-dashed border-ink/20 bg-white p-12 text-center">
          <p className="text-ink/60">
            No {filter} perfumes available right now.
          </p>
        </div>
      )}

      {/* Grid */}
      {visible.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
