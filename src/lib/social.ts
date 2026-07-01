/**
 * Deterministic "social proof" numbers derived from a product id.
 *
 * NOTE: these are simulated ratings/review counts for display polish — they are
 * stable per product but NOT real customer reviews. Replace with real review
 * data when you collect it (e.g. a `reviews` collection).
 */
export function ratingFor(id: string): { rating: number; count: number } {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const rating = 4.2 + (h % 8) / 10; // 4.2 – 4.9
  const count = 18 + (h % 382); // 18 – ~399
  return { rating: Math.round(rating * 10) / 10, count };
}

/** Simulated "units sold" (stable per product) for best-seller sorting + urgency. */
export function soldFor(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 131 + id.charCodeAt(i)) >>> 0;
  return 40 + (h % 960); // 40 – ~999
}
