import Link from "next/link";
import { siteConfig, instagramUrl } from "@/lib/config";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      {/* Soft gold glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-px relative flex flex-col items-center py-20 text-center sm:py-28">
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold-light animate-fade-up">
          Premium Fragrances
        </p>
        <h1 className="font-serif text-4xl font-700 leading-tight text-white sm:text-6xl animate-fade-up">
          {siteConfig.name}
        </h1>
        <p className="mt-4 max-w-md text-lg text-cream/80 animate-fade-up">
          {siteConfig.slogan}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row animate-fade-up">
          <Link href="/products" className="btn-gold">
            Shop Perfumes
          </Link>
          <a
            href={instagramUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-cream/70 transition hover:text-gold-light"
          >
            Follow @{siteConfig.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
