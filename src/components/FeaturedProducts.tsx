"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";
import { fetchFeaturedProducts } from "@/lib/data";
import type { Product } from "@/types";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchFeaturedProducts()
      .then(setProducts)
      .catch(() => setError(true));
  }, []);

  return (
    <section className="container-px py-12 sm:py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-dark">
            Hand-picked
          </p>
          <h2 className="font-serif text-3xl font-700 text-ink">
            Featured Perfumes
          </h2>
        </div>
        <Link
          href="/products"
          className="hidden text-sm font-medium text-gold-dark hover:underline sm:block"
        >
          View all →
        </Link>
      </div>

      {/* Loading */}
      {products === null && !error && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="py-12 text-center text-ink/60">
          Couldn’t load featured perfumes. Please try again later.
        </p>
      )}

      {/* Empty */}
      {products && products.length === 0 && (
        <p className="py-12 text-center text-ink/60">
          No featured perfumes yet. Check back soon.
        </p>
      )}

      {/* Grid */}
      {products && products.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <div className="mt-8 text-center sm:hidden">
        <Link href="/products" className="btn-outline">
          View all perfumes
        </Link>
      </div>
    </section>
  );
}
