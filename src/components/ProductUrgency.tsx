import { soldFor } from "@/lib/social";
import { IconTruck } from "./icons";
import type { Product } from "@/types";

/**
 * Social-proof + delivery reassurance under the price.
 * NOTE: the "sold" figure is simulated (stable per product) — swap for real
 * order counts when available.
 */
export default function ProductUrgency({ product }: { product: Product }) {
  const sold = soldFor(product.id);
  const hot = product.isFeatured || product.discountPercent > 0;

  return (
    <div className="mt-3 space-y-2 text-sm">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {hot && (
          <span className="inline-flex items-center gap-1 font-medium text-red-600">
            🔥 Selling fast
          </span>
        )}
        <span className="text-ink/50">{sold}+ sold</span>
      </div>
      <p className="inline-flex items-center gap-2 rounded-lg bg-accent/5 px-3 py-2 text-ink/70">
        <IconTruck className="h-4 w-4 text-accent" />
        Get it in <span className="font-medium text-ink">1–2 days</span> in town ·
        pay on delivery
      </p>
    </div>
  );
}
