import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/config";

/** Returns the lowest price across a product's sizes ("starting price"). */
function startingPrice(product: Product): number | null {
  if (!product.sizes.length) return null;
  return Math.min(...product.sizes.map((s) => s.price));
}

export default function ProductCard({ product }: { product: Product }) {
  const from = startingPrice(product);
  const sizeLabel = product.sizes.map((s) => `${s.sizeMl}ml`).join(" · ");

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition
        hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-square overflow-hidden bg-sand">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink/30">
            No image
          </div>
        )}
        <span className="absolute left-3 top-3 badge bg-white/90">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-lg font-600 leading-tight text-ink">
          {product.name}
        </h3>
        {sizeLabel && (
          <p className="mt-1 text-xs text-ink/50">{sizeLabel}</p>
        )}

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-wide text-ink/40">
              From
            </p>
            <p className="font-medium text-ink">
              {from !== null ? formatPrice(from) : "—"}
            </p>
          </div>
          <span className="btn-gold px-4 py-2 text-sm">Order Now</span>
        </div>
      </div>
    </Link>
  );
}
