"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Spinner from "./Spinner";
import OrderForm from "./OrderForm";
import Bottle3D from "./bottle/Bottle3D";
import { fetchActiveBottles, fetchProduct } from "@/lib/data";
import { formatPrice } from "@/lib/config";
import { type Bottle, type Product, type ProductSize } from "@/types";

export default function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [bottles, setBottles] = useState<Bottle[]>([]);
  const [error, setError] = useState(false);

  // Shared configurator state — drives both the 3D preview and the order form.
  const [bottle, setBottle] = useState<Bottle | null>(null);
  const [size, setSize] = useState<ProductSize | null>(null);

  useEffect(() => {
    Promise.all([fetchProduct(id), fetchActiveBottles()])
      .then(([p, bs]) => {
        setProduct(p);
        setBottles(bs);
        if (bs.length) setBottle(bs[0]);
      })
      .catch(() => setError(true));
  }, [id]);

  /**
   * Sizes orderable for the current bottle: the product's priced sizes limited
   * to the volumes this bottle is offered in. If there's no overlap we show all
   * the product's sizes so ordering is never blocked.
   */
  const availableSizes = useMemo<ProductSize[]>(() => {
    if (!product) return [];
    if (!bottle || !bottle.sizesMl.length) return product.sizes;
    const matched = product.sizes.filter((s) =>
      bottle.sizesMl.includes(s.sizeMl)
    );
    return matched.length ? matched : product.sizes;
  }, [product, bottle]);

  // Keep the selected size valid whenever the bottle (and thus options) changes.
  useEffect(() => {
    if (!availableSizes.length) {
      setSize(null);
      return;
    }
    setSize((current) => {
      const stillValid =
        current && availableSizes.some((s) => s.sizeMl === current.sizeMl);
      return stillValid ? current : availableSizes[0];
    });
  }, [availableSizes]);

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
        <Link href="/products" className="btn-accent mt-6">
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
        <Link href="/products" className="hover:text-accent-dark">
          Perfumes
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink/80">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* 3D bottle preview */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Bottle3D
            baseStyle={bottle?.baseStyle ?? "decant"}
            modelUrl={bottle?.modelUrl || undefined}
            oilColor={product.oilColor}
            sizeMl={size?.sizeMl ?? availableSizes[0]?.sizeMl ?? 50}
          />
          <p className="mt-3 text-center text-sm text-ink/50">
            Previewing{" "}
            <span className="font-medium text-ink/70">
              {bottle?.name ?? "bottle"}
            </span>
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
            <p className="mt-2 text-lg text-accent-dark">
              From {formatPrice(from)}
            </p>
          )}
          <p className="mt-4 whitespace-pre-line leading-relaxed text-ink/70">
            {product.description}
          </p>

          <div className="mt-8">
            <OrderForm
              product={product}
              bottles={bottles}
              bottle={bottle}
              onBottleChange={setBottle}
              availableSizes={availableSizes}
              size={size}
              onSizeChange={setSize}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
