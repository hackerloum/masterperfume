import Link from "next/link";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";
import { IconArrowRight } from "./icons";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="container-px py-16 sm:py-24">
      <div className="mb-12 text-center">
        <p className="eyebrow">Hand-picked for you</p>
        <h2 className="mt-3 font-serif text-4xl font-700 text-ink sm:text-5xl">
          Featured Perfumes
        </h2>
        <div className="accent-rule mt-5" />
      </div>

      {products.length === 0 && (
        <p className="py-12 text-center text-ink/60">
          No featured perfumes yet. Check back soon.
        </p>
      )}

      {products.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Link href="/products" className="btn-outline">
          View all perfumes
          <IconArrowRight />
        </Link>
      </div>
    </section>
  );
}
