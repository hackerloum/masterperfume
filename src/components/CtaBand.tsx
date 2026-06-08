import Link from "next/link";
import { buildWhatsAppLink, siteConfig, instagramUrl } from "@/lib/config";
import { IconArrowRight, IconInstagram, IconWhatsApp } from "./icons";

/** Closing call-to-action — a clean accent-tinted band. */
export default function CtaBand() {
  return (
    <section className="container-px py-16 sm:py-20">
      <div className="rounded-[2rem] bg-accent px-6 py-16 text-center text-white sm:px-12">
        <h2 className="mx-auto max-w-2xl font-serif text-3xl font-800 leading-tight tracking-tight sm:text-4xl">
          {siteConfig.slogan}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/80">
          Order your favourite fragrance today — quick, simple, and no account
          required.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-accent-dark transition hover:bg-white/90"
          >
            Browse perfumes
            <IconArrowRight />
          </Link>
          <a
            href={buildWhatsAppLink("Hello Master Perfume! I'd like to order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <IconWhatsApp className="h-4 w-4" />
            Order on WhatsApp
          </a>
        </div>

        <a
          href={instagramUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
        >
          <IconInstagram className="h-4 w-4" />@{siteConfig.instagramHandle}
        </a>
      </div>
    </section>
  );
}
