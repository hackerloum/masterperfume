import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/config";
import BottleSilhouette from "./bottle/BottleSilhouette";
import type { Product } from "@/types";

export default function ProductSpotlight({
  product,
}: {
  product: Product | null;
}) {
  if (!product) return null;

  const from = product.sizes.length
    ? Math.min(...product.sizes.map((s) => s.price))
    : null;

  return (
    <section className="container-px py-4 sm:py-6">
      <div className="grid overflow-hidden rounded-md bg-ink text-white sm:grid-cols-2">
        <div className="flex flex-col justify-center p-5 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wide text-accent">
            Featured this week
          </p>
          <h2 className="mt-2 text-2xl font-800 leading-tight sm:text-3xl">
            {product.name}
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70 line-clamp-3">
            {product.description}
          </p>
          {from !== null && (
            <p className="mt-3 text-lg font-bold text-accent">
              From {formatPrice(from)}
            </p>
          )}
          <div className="mt-5">
            <Link href={`/products/${product.id}`} className="btn-accent">
              View product
            </Link>
          </div>
        </div>

        <div className="relative min-h-[220px] bg-charcoal">
          <div className="absolute inset-0 flex items-center justify-center">
            <BottleSilhouette
              oilColor={product.oilColor}
              className="h-3/4 w-auto"
            />
          </div>
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={`${product.name} perfume by Master Perfume`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}
