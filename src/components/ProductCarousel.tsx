"use client";

import { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { IconChevronLeft, IconChevronRight } from "./icons";
import type { Product } from "@/types";

export default function ProductCarousel({
  products,
  auto = false,
}: {
  products: Product[];
  auto?: boolean;
}) {
  const scroller = useRef<HTMLDivElement>(null);

  function scrollByCards(dir: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("div");
    const w = card ? card.clientWidth + 8 : 180;
    el.scrollBy({ left: dir * w * 2, behavior: "smooth" });
  }

  useEffect(() => {
    if (!auto || products.length < 4) return;
    const el = scroller.current;
    if (!el) return;
    const t = setInterval(() => {
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + 176, behavior: "smooth" });
    }, 3500);
    return () => clearInterval(t);
  }, [auto, products.length]);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Previous"
        onClick={() => scrollByCards(-1)}
        className="absolute -left-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-white shadow-card hover:bg-accent sm:flex"
      >
        <IconChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => scrollByCards(1)}
        className="absolute -right-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-white shadow-card hover:bg-accent sm:flex"
      >
        <IconChevronRight className="h-4 w-4" />
      </button>
      <div
        ref={scroller}
        className="flex snap-x gap-2 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[42%] shrink-0 snap-start sm:w-44 lg:w-48">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
