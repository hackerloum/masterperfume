"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import Countdown from "./Countdown";
import { IconArrowRight } from "./icons";
import type { Product } from "@/types";

/** Sale ends at the end of today (local) unless NEXT_PUBLIC_SALE_ENDS is set. */
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

/** "Hot Deals" — products currently on sale (discountPercent > 0). */
export default function OnSale({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="container-px py-8 sm:py-12">
      <div className="rounded-3xl bg-gradient-to-br from-red-50 to-white p-5 sm:p-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
              🔥 Limited time
            </p>
            <h2 className="mt-1 font-serif text-3xl font-800 text-ink sm:text-4xl">
              Hot Deals
            </h2>
            <div className="mt-2 flex items-center gap-2 text-sm text-ink/60">
              <span>Ends in</span>
              <Countdown target={saleEndsAt()} />
            </div>
          </div>
          <Link
            href="/products?sort=discount"
            className="hidden items-center gap-1 text-sm font-medium text-red-600 hover:underline sm:inline-flex"
          >
            See all <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="-mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.slice(0, 12).map((p) => (
            <div key={p.id} className="w-40 shrink-0 snap-start sm:w-52">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
