import Link from "next/link";
import { IconArrowRight } from "./icons";

const tiles = [
  {
    eyebrow: "Just in",
    title: "New Arrivals",
    text: "Fresh scents added to the collection.",
    href: "/products",
    className: "bg-ink text-white",
    accent: "text-accent-light",
  },
  {
    eyebrow: "Most loved",
    title: "Best Sellers",
    text: "The fragrances everyone keeps re-ordering.",
    href: "/products",
    className: "bg-accent text-white",
    accent: "text-white/80",
  },
  {
    eyebrow: "Save more",
    title: "Bundle Deals",
    text: "Mix sizes and save on bigger orders.",
    href: "/products",
    className: "bg-cream text-ink",
    accent: "text-accent-dark",
  },
];

/** Row of promotional banner tiles — classic store merchandising. */
export default function PromoTiles() {
  return (
    <section className="container-px py-10 sm:py-12">
      <div className="grid gap-4 sm:grid-cols-3">
        {tiles.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-card-hover ${t.className}`}
          >
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest ${t.accent}`}>
                {t.eyebrow}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-700">{t.title}</h3>
              <p className="mt-1 text-sm opacity-80">{t.text}</p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
              Shop now
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
