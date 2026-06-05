import Link from "next/link";
import { siteConfig, instagramUrl, buildWhatsAppLink } from "@/lib/config";
import { IconInstagram, IconWhatsApp } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-cream">
      <div className="container-px grid gap-10 py-16 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold bg-ink/40 font-serif text-base font-700 text-gold-light">
              M
            </span>
            <p className="font-serif text-2xl font-700 text-white">
              {siteConfig.name}
            </p>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            {siteConfig.slogan}. Premium long-lasting fragrances, delivered to
            your door.
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">
            Explore
          </p>
          <ul className="space-y-3 text-cream/70">
            <li>
              <Link href="/" className="transition hover:text-gold-light">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="transition hover:text-gold-light"
              >
                All Perfumes
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">
            Connect
          </p>
          <ul className="space-y-3 text-cream/70">
            <li>
              <a
                href={instagramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-gold-light"
              >
                <IconInstagram className="h-4 w-4" />@{siteConfig.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppLink(
                  "Hello Master Perfume! I have a question."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-gold-light"
              >
                <IconWhatsApp className="h-4 w-4" />
                Order on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
