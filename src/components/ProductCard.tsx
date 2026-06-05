import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/config";
import { IconArrowRight, IconDroplet } from "./icons";

/** Returns the lowest price across a product's sizes ("starting price"). */
function startingPrice(product: Product): number | null {
  if (!product.sizes.length) return null;
  return Math.min(...product.sizes.map((s) => s.price));
}

export default function ProductCard({ product }: { product: Product }) {
  const from = startingPrice(product);

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-ink/[0.07] bg-white
        transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Branded placeholder (always rendered behind the image) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-sand to-cream">
          <IconDroplet className="h-10 w-10 text-gold/40" />
          <span className="mt-2 px-4 text-center font-serif text-sm text-ink/30">
            {product.name}
          </span>
        </div>

        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        )}
        <span className="absolute left-3 top-3 badge">{product.category}</span>

        {/* Hover "Order Now" bar */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white backdrop-blur transition-transform duration-300 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-1.5">
            Order Now <IconArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-lg font-600 leading-tight text-ink transition-colors group-hover:text-gold-dark">
          {product.name}
        </h3>
        <p className="mt-0.5 text-xs uppercase tracking-wider text-ink/40">
          {product.sizes.map((s) => `${s.sizeMl}ml`).join(" · ")}
        </p>

        <div className="mt-3 flex items-baseline gap-1.5 pt-1">
          <span className="text-[0.65rem] uppercase tracking-wide text-ink/40">
            From
          </span>
          <span className="font-serif text-lg font-700 text-ink">
            {from !== null ? formatPrice(from) : "—"}
          </span>
        </div>
      </div>
    </Link>
  );
}
