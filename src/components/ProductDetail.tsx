"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Spinner from "./Spinner";
import OrderForm from "./OrderForm";
import Bottle3D from "./bottle/Bottle3D";
import { fetchProduct } from "@/lib/data";
import { formatPrice } from "@/lib/config";
import {
  BOTTLE_STYLES,
  type BottleStyle,
  type Product,
  type ProductSize,
} from "@/types";

export default function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [error, setError] = useState(false);

  // Shared configurator state — drives both the 3D preview and the order form.
  const [size, setSize] = useState<ProductSize | null>(null);
  const [style, setStyle] = useState<BottleStyle>(BOTTLE_STYLES[0]);

  useEffect(() => {
    fetchProduct(id)
      .then((p) => {
        setProduct(p);
        if (p) setSize(p.sizes[0] ?? null);
      })
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
        {/* 3D bottle preview */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Bottle3D
            style={style.id}
            oilColor={product.oilColor}
            sizeMl={size?.sizeMl ?? product.sizes[0]?.sizeMl ?? 50}
          />
          <p className="mt-3 text-center text-sm text-ink/50">
            Previewing <span className="font-medium text-ink/70">{style.name}</span>
            {size ? ` · ${size.sizeMl}ml` : ""} — your perfume is mixed and poured
            fresh into this bottle.
          </p>
        </div>

        {/* Info + order */}
        <div>
          <span className="badge bg-cream">{product.category}</span>
          <h1 className="mt-3 font-serif text-3xl font-700 text-ink sm:text-4xl">
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
            <OrderForm
              product={product}
              size={size}
              onSizeChange={setSize}
              style={style}
              onStyleChange={setStyle}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
