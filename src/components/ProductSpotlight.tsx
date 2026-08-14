import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/config";
import { IconArrowRight } from "./icons";
import BottleSilhouette from "./bottle/BottleSilhouette";
import type { Product } from "@/types";

/** Large promotional banner spotlighting one featured product (an "ad"). */
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
    <section className="container-px py-10 sm:py-14">
      <div className="grid overflow-hidden rounded-3xl bg-ink text-white sm:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light">
            Featured this week
          </p>
          <h2 className="mt-3 font-serif text-3xl font-800 leading-tight sm:text-4xl">
            {product.name}
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70 line-clamp-3">
            {product.description}
          </p>
          {from !== null && (
            <p className="mt-4 text-lg">
              <span className="text-white/60">From </span>
              <span className="font-semibold text-accent-light">
                {formatPrice(from)}
              </span>
            </p>
          )}
          <div className="mt-6">
            <Link
              href={`/products/${product.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-dark"
            >
              Shop this scent
              <IconArrowRight />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[260px] bg-gradient-to-br from-white/10 to-transparent">
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
