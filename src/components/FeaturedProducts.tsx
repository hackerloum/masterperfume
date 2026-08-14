import Link from "next/link";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="container-px py-4 sm:py-6">
      <div className="section-head">
        <h2 className="section-title">Featured perfumes</h2>
        <Link href="/products" className="section-link">
          See all
        </Link>
      </div>

      {products.length === 0 && (
        <p className="py-8 text-center text-ink/60">
          No featured perfumes yet. Check back soon.
        </p>
      )}

      {products.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
