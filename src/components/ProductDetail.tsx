"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Spinner from "./Spinner";
import OrderForm from "./OrderForm";
import { fetchProduct } from "@/lib/data";
import { formatPrice } from "@/lib/config";
import { IconDroplet } from "./icons";
import type { Product } from "@/types";

export default function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProduct(id)
      .then(setProduct)
      .catch(() => setError(true));
  }, [id]);

  // Loading
  if (product === undefined && !error) {
    return (
      <div className="flex justify-center py-32">
        <Spinner />
      </div>
    );
  }

  // Error / not found
  if (error || !product) {
    return (
      <div className="container-px py-24 text-center">
        <h1 className="font-serif text-2xl text-ink">Perfume not found</h1>
        <p className="mt-2 text-ink/60">
          This perfume may have been removed or the link is incorrect.
        </p>
        <Link href="/products" className="btn-gold mt-6">
          Back to all perfumes
        </Link>
      </div>
    );
  }

  const from = product.sizes.length
    ? Math.min(...product.sizes.map((s) => s.price))
    : null;

  return (
    <article className="container-px py-8 pb-28 sm:pb-16">
      <nav className="mb-6 text-sm text-ink/50">
        <Link href="/products" className="hover:text-gold-dark">
          Perfumes
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink/80">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-3xl shadow-card">
          {/* Branded placeholder behind the image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-sand to-cream">
            <IconDroplet className="h-16 w-16 text-gold/40" />
            <span className="mt-3 px-6 text-center font-serif text-xl text-ink/30">
              {product.name}
            </span>
          </div>
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          )}
          <span className="absolute left-4 top-4 badge bg-white/90">
            {product.category}
          </span>
        </div>

        {/* Info + order */}
        <div>
          <h1 className="font-serif text-3xl font-700 text-ink sm:text-4xl">
            {product.name}
          </h1>
          {from !== null && (
            <p className="mt-2 text-lg text-gold-dark">
              From {formatPrice(from)}
            </p>
          )}
          <p className="mt-4 whitespace-pre-line leading-relaxed text-ink/70">
            {product.description}
          </p>

          <div className="mt-8">
            <OrderForm product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}
