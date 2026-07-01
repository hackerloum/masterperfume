"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";
import { fetchProducts } from "@/lib/data";
import { salePrice } from "@/lib/config";
import { CATEGORIES, type Category, type Product } from "@/types";

type Filter = "All" | Category;
const FILTERS: Filter[] = ["All", ...CATEGORIES];

type Sort = "featured" | "price-asc" | "price-desc" | "name" | "discount";
const SORTS: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "discount", label: "Biggest discount" },
  { id: "name", label: "Name A–Z" },
];

function fromPrice(p: Product): number {
  if (!p.sizes.length) return 0;
  return salePrice(Math.min(...p.sizes.map((s) => s.price)), p.discountPercent);
}

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const initialCategory = CATEGORIES.find(
    (c) => c === searchParams.get("category")
  );

  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<Filter>(initialCategory ?? "All");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const initialSort = SORTS.find((s) => s.id === searchParams.get("sort"));
  const [sort, setSort] = useState<Sort>(initialSort?.id ?? "featured");

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError(true));
  }, []);

  const visible = useMemo(() => {
    if (!products) return [];
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesCat = filter === "All" || p.category === filter;
      const matchesQ = !q || p.name.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return fromPrice(a) - fromPrice(b);
        case "price-desc":
          return fromPrice(b) - fromPrice(a);
        case "discount":
          return b.discountPercent - a.discountPercent;
        case "name":
          return a.name.localeCompare(b.name);
        default: // featured
          return (
            Number(b.isFeatured) - Number(a.isFeatured) || b.createdAt - a.createdAt
          );
      }
    });
    return list;
  }, [products, filter, query, sort]);

  return (
    <section className="container-px py-8 pb-28 sm:pb-16">
      {/* Search + sort */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <input
            className="input-field pl-10"
            placeholder="Search perfumes…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4-4" strokeLinecap="round" />
          </svg>
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="input-field sm:max-w-[14rem]"
        >
          {SORTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === f
                ? "bg-ink text-white shadow-sm"
                : "border border-ink/15 bg-white text-ink/60 hover:border-accent hover:text-ink"
            }`}
          >
            {f}
          </button>
        ))}
        {products && (
          <span className="ml-auto self-center text-sm text-ink/40">
            {visible.length} result{visible.length === 1 ? "" : "s"}
          </span>
        )}
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

      {/* No results for search/filter */}
      {products && products.length > 0 && visible.length === 0 && (
        <div className="rounded-2xl border border-dashed border-ink/20 bg-white p-12 text-center">
          <p className="text-ink/60">
            No perfumes match{" "}
            {query ? (
              <>
                “<span className="font-medium text-ink">{query}</span>”
              </>
            ) : (
              "your filters"
            )}
            . Try a different search.
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
