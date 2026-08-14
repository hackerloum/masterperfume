"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice, salePrice } from "@/lib/config";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import BottleSilhouette from "./bottle/BottleSilhouette";
import Stars from "./Stars";
import { IconHeart } from "./icons";

function startingSize(product: Product) {
  if (!product.sizes.length) return null;
  return [...product.sizes].sort((a, b) => a.price - b.price)[0];
}

export default function ProductCard({ product }: { product: Product }) {
  const size = startingSize(product);
  const from = size?.price ?? null;
  const unit = from != null ? salePrice(from, product.discountPercent) : 0;
  const { has, toggle } = useWishlist();
  const { add } = useCart();
  const wished = has(product.id);
  const [added, setAdded] = useState(false);

  function addToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!size) return;
    add({
      productId: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      oilColor: product.oilColor,
      bottle: "",
      sizeMl: size.sizeMl,
      unitPrice: unit,
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-ink/10 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover">
      <Link href={`/products/${product.id}`} className="relative aspect-square overflow-hidden bg-cream">
        <div className="absolute inset-0 flex items-center justify-center">
          <BottleSilhouette oilColor={product.oilColor} className="h-[72%] w-auto" />
        </div>
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={`${product.name} ${product.category} perfume`}
            fill
            sizes="(max-width: 640px) 50vw, 20vw"
            className="object-cover transition duration-500 group-hover:scale-110"
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
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow ${
            wished ? "text-red-500" : "text-ink/40 hover:text-red-500"
          }`}
        >
          <IconHeart className="h-4 w-4" filled={wished} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col p-2.5">
        <Link href={`/products/${product.id}`}>
          <p className="text-[0.65rem] font-semibold uppercase text-ink/45">
            {product.category}
          </p>
          <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold text-ink group-hover:text-accent-dark">
            {product.name}
          </h3>
        </Link>
        <Stars productId={product.id} className="mt-1" />
        <div className="mt-auto pt-1.5">
          {from !== null ? (
            product.discountPercent > 0 ? (
              <div className="flex flex-wrap items-baseline gap-1.5">
                <p className="text-base font-bold text-ink">{formatPrice(unit)}</p>
                <p className="text-xs text-ink/40 line-through">{formatPrice(from)}</p>
              </div>
            ) : (
              <p className="text-base font-bold text-ink">{formatPrice(unit)}</p>
            )
          ) : (
            <p className="text-sm">—</p>
          )}
          {size && (
            <p className="text-[0.65rem] text-ink/45">from {size.sizeMl}ml</p>
          )}
        </div>
        <button
          type="button"
          onClick={addToCart}
          disabled={!size}
          className="mt-2 w-full rounded-md bg-accent py-1.5 text-xs font-bold text-ink transition hover:bg-accent-dark hover:text-white disabled:opacity-40"
        >
          {added ? "Added to cart" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
