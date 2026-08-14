"use client";

import Link from "next/link";
import ProductCarousel from "./ProductCarousel";
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
    <section className="container-px py-3 sm:py-4">
      <div className="rounded-lg border-2 border-accent bg-white p-3 sm:p-4">
        <div className="section-head border-ink/10">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="section-title">
              <span className="mr-2 inline-block animate-pulse-soft rounded-sm bg-red-600 px-1.5 py-0.5 text-xs font-bold uppercase text-white">
                Live
              </span>
              Today&apos;s deals
            </h2>
            <Countdown target={saleEndsAt()} />
          </div>
          <Link href="/products?sort=discount" className="section-link">
            See all
          </Link>
        </div>
        <ProductCarousel products={products.slice(0, 12)} auto />
      </div>
    </section>
  );
}
