"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";
import { useWishlist } from "@/lib/wishlist";
import { fetchProducts } from "@/lib/data";
import type { Product } from "@/types";

export default function WishlistClient() {
  const { ids } = useWishlist();
  const [all, setAll] = useState<Product[] | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setAll)
      .catch(() => setAll([]));
  }, []);

  const items = (all ?? []).filter((p) => ids.includes(p.id));

  if (all === null) {
    return (
      <div className="flex justify-center py-32">
        <Spinner />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-px max-w-lg py-20 text-center">
        <p className="text-5xl">❤️</p>
        <h1 className="mt-4 font-serif text-2xl font-800 text-ink">
          Your wishlist is empty
        </h1>
        <p className="mt-2 text-ink/60">
          Tap the heart on any perfume to save it here.
        </p>
        <Link href="/products" className="btn-accent mt-6">
          Browse perfumes
        </Link>
      </div>
    );
  }

  return (
    <div className="container-px py-10 pb-24">
      <h1 className="font-serif text-3xl font-800 text-ink">Your wishlist</h1>
      <p className="mt-1 text-ink/50">{items.length} saved</p>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
