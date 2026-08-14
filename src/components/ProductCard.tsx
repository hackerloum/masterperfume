"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice, salePrice } from "@/lib/config";
import { useWishlist } from "@/lib/wishlist";
import BottleSilhouette from "./bottle/BottleSilhouette";
import Stars from "./Stars";
import { IconHeart } from "./icons";

function startingPrice(product: Product): number | null {
  if (!product.sizes.length) return null;
  return Math.min(...product.sizes.map((s) => s.price));
}

export default function ProductCard({ product }: { product: Product }) {
  const from = startingPrice(product);
  const { has, toggle } = useWishlist();
  const wished = has(product.id);

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col rounded-md border border-ink/10 bg-white p-2 shadow-card transition hover:shadow-card-hover"
    >
      <div className="relative aspect-square overflow-hidden rounded-sm bg-cream">
        <div className="absolute inset-0 flex items-center justify-center">
          <BottleSilhouette
            oilColor={product.oilColor}
            className="h-[72%] w-auto"
          />
        </div>

        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={`${product.name} ${product.category} perfume`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
        )}

        {product.discountPercent > 0 && (
          <span className="absolute left-2 top-2 rounded-sm bg-red-600 px-1.5 py-0.5 text-[0.65rem] font-bold text-white">
            -{product.discountPercent}%
          </span>
        )}

        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-sm bg-white/95 shadow ${
            wished ? "text-red-500" : "text-ink/40 hover:text-red-500"
          }`}
        >
          <IconHeart className="h-4 w-4" filled={wished} />
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-2">
        <p className="text-[0.65rem] font-semibold uppercase text-ink/45">
          {product.category}
        </p>
        <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold text-ink group-hover:text-accent-dark">
          {product.name}
        </h3>
        <p className="mt-0.5 text-xs text-ink/45">
          {product.sizes.map((s) => `${s.sizeMl}ml`).join(" · ")}
        </p>
        <Stars productId={product.id} className="mt-1" />
        <div className="mt-auto pt-1.5">
          {from !== null ? (
            product.discountPercent > 0 ? (
              <div className="flex flex-wrap items-baseline gap-1.5">
                <p className="text-base font-bold text-ink">
                  {formatPrice(salePrice(from, product.discountPercent))}
                </p>
                <p className="text-xs text-ink/40 line-through">
                  {formatPrice(from)}
                </p>
              </div>
            ) : (
              <p className="text-base font-bold text-ink">{formatPrice(from)}</p>
            )
          ) : (
            <p className="text-sm font-medium text-ink">—</p>
          )}
        </div>
      </div>
    </Link>
  );
}
