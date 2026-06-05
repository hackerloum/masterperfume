import Image from "next/image";
import Link from "next/link";
import { siteConfig, instagramUrl } from "@/lib/config";
import { IconArrowRight, IconInstagram, IconCheck } from "./icons";

const highlights = ["Long-lasting", "Authentic", "Delivery available"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1600&q=80"
          alt="Luxury perfume bottle"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </div>

      {/* Soft gold glow */}
      <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />

      <div className="container-px relative">
        <div className="flex min-h-[78vh] max-w-2xl flex-col justify-center py-20">
          <p className="eyebrow text-gold-light animate-fade-up">
            Premium Fragrance House
          </p>

          <h1 className="mt-5 font-serif text-5xl font-700 leading-[1.05] text-white animate-fade-up sm:text-7xl">
            Master <span className="text-gold-light">Perfume</span>
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/80 animate-fade-up">
            {siteConfig.slogan}. Discover signature scents crafted to last —
            ordered in seconds, no account needed.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up">
            <Link href="/products" className="btn-gold">
              Shop Perfumes
              <IconArrowRight />
            </Link>
            <a
              href={instagramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-light"
            >
              <IconInstagram />
              @{siteConfig.instagramHandle}
            </a>
          </div>

          {/* Trust highlights */}
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 animate-fade-up">
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-2 text-sm font-medium text-cream/90"
              >
                <IconCheck className="h-4 w-4 text-gold-light" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
