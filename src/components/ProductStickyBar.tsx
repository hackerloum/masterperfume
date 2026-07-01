"use client";

import { formatPrice } from "@/lib/config";

/**
 * Sticky bottom buy-bar for mobile — follows the customer as they scroll the
 * product page. Tapping "Order Now" jumps to the order form.
 */
export default function ProductStickyBar({
  name,
  price,
}: {
  name: string;
  price: number | null;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 p-3 backdrop-blur sm:hidden">
      <div className="container-px flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-ink/50">{name}</p>
          <p className="font-serif text-lg font-800 text-ink">
            {price !== null ? formatPrice(price) : "—"}
          </p>
        </div>
        <a href="#order-form" className="btn-accent shrink-0 px-6">
          Order Now
        </a>
      </div>
    </div>
  );
}
