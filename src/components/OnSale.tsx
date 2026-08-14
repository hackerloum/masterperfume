"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import Countdown from "./Countdown";
import type { Product } from "@/types";

function saleEndsAt(): number {
  const configured = process.env.NEXT_PUBLIC_SALE_ENDS;
  if (configured) {
    const t = Date.parse(configured);
    if (!Number.isNaN(t)) return t;
  }
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

export default function OnSale({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="container-px py-4 sm:py-6">
      <div className="rounded-md border border-accent/40 bg-accent-light/50 p-3 sm:p-4">
        <div className="section-head border-ink/10">
          <div>
            <h2 className="section-title">Today&apos;s deals</h2>
            <div className="mt-1 flex items-center gap-2 text-xs text-ink/60">
              <span>Ends in</span>
              <Countdown target={saleEndsAt()} />
            </div>
          </div>
          <Link href="/products?sort=discount" className="section-link">
            See all
          </Link>
        </div>

        <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.slice(0, 12).map((p) => (
            <div key={p.id} className="w-40 shrink-0 snap-start sm:w-48">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
