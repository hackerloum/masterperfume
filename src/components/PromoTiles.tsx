import Link from "next/link";
import { IconArrowRight } from "./icons";

const tiles = [
  {
    eyebrow: "Just in",
    title: "New arrivals",
    text: "Latest scents in stock.",
    href: "/products",
    className: "bg-ink text-white",
    accent: "text-accent",
  },
  {
    eyebrow: "Save",
    title: "Today's deals",
    text: "Discounted sizes and bottles.",
    href: "/products?sort=discount",
    className: "bg-accent text-ink",
    accent: "text-ink/70",
  },
  {
    eyebrow: "Popular",
    title: "Best sellers",
    text: "Most ordered this week.",
    href: "/products",
    className: "bg-white text-ink border border-ink/10",
    accent: "text-accent-dark",
  },
];

export default function PromoTiles() {
  return (
    <section className="container-px py-3 sm:py-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {tiles.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className={`group flex flex-col justify-between rounded-md p-4 shadow-card transition hover:shadow-card-hover ${t.className}`}
          >
            <div>
              <p className={`text-[0.7rem] font-bold uppercase tracking-wide ${t.accent}`}>
                {t.eyebrow}
              </p>
              <h3 className="mt-1 text-lg font-bold">{t.title}</h3>
              <p className="mt-0.5 text-sm opacity-80">{t.text}</p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
              Shop
              <IconArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
