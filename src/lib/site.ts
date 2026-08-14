/** Canonical site URL for SEO (sitemap, robots, canonical links). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.masterperfume.co.tz"
).replace(/\/$/, "");
