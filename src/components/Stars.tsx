import { IconStar } from "./icons";
import { ratingFor } from "@/lib/social";

/** Star rating + review count (simulated social proof — see lib/social.ts). */
export default function Stars({
  productId,
  className = "",
}: {
  productId: string;
  className?: string;
}) {
  const { rating, count } = ratingFor(productId);
  const full = Math.round(rating);

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <IconStar
          key={i}
          className={`h-3.5 w-3.5 ${i < full ? "text-amber-500" : "text-ink/15"}`}
        />
      ))}
      <span className="ml-1 text-xs text-ink/50">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}
