import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/config";
import BottleSilhouette from "./bottle/BottleSilhouette";
import Stars from "./Stars";

/** Returns the lowest price across a product's sizes ("starting price"). */
function startingPrice(product: Product): number | null {
  if (!product.sizes.length) return null;
  return Math.min(...product.sizes.map((s) => s.price));
}

export default function ProductCard({ product }: { product: Product }) {
  const from = startingPrice(product);

  return (
    <Link href={`/products/${product.id}`} className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream">
        {/* Tinted bottle preview (behind any photo) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <BottleSilhouette
            oilColor={product.oilColor}
            className="h-[72%] w-auto transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        <span className="absolute left-3 top-3 badge bg-white/90 backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex items-start justify-between gap-3 pt-3">
        <div className="min-w-0">
          <h3 className="truncate font-serif text-base font-600 text-ink group-hover:text-accent">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs text-ink/40">
            {product.sizes.map((s) => `${s.sizeMl}ml`).join(" · ")}
          </p>
        </div>
        <p className="shrink-0 text-sm font-medium text-ink">
          {from !== null ? formatPrice(from) : "—"}
        </p>
      </div>

      <Stars productId={product.id} className="mt-1.5" />
    </Link>
  );
}
