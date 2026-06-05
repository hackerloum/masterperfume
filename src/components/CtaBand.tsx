import Link from "next/link";
import { buildWhatsAppLink, siteConfig, instagramUrl } from "@/lib/config";
import { IconArrowRight, IconInstagram, IconWhatsApp } from "./icons";

/** Closing call-to-action band with brand statement + contact options. */
export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-px relative py-20 text-center">
        <p className="eyebrow text-gold-light">{siteConfig.name}</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl font-700 leading-tight text-white sm:text-5xl">
          {siteConfig.slogan}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-cream/70">
          Order your favourite fragrance today — quick, simple, and no account
          required.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/products" className="btn-gold">
            Browse Perfumes
            <IconArrowRight />
          </Link>
          <a
            href={buildWhatsAppLink("Hello Master Perfume! I'd like to order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-light"
          >
            <IconWhatsApp className="h-4 w-4" />
            Order on WhatsApp
          </a>
        </div>

        <a
          href={instagramUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-sm text-cream/60 transition hover:text-gold-light"
        >
          <IconInstagram className="h-4 w-4" />
          Follow @{siteConfig.instagramHandle}
        </a>
      </div>
    </section>
  );
}
