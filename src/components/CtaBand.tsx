import Link from "next/link";
import { buildWhatsAppLink, siteConfig } from "@/lib/config";
import { IconWhatsApp } from "./icons";

export default function CtaBand() {
  return (
    <section className="container-px py-6 sm:py-8">
      <div className="flex flex-col items-start justify-between gap-4 rounded-md bg-ink px-5 py-6 text-white sm:flex-row sm:items-center sm:px-8">
        <div>
          <h2 className="text-lg font-bold sm:text-xl">Need help ordering?</h2>
          <p className="mt-1 text-sm text-white/70">
            Chat on WhatsApp — we confirm size, bottle and delivery. No account
            required.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/products" className="btn-accent">
            Continue shopping
          </Link>
          <a
            href={buildWhatsAppLink("Hello Master Perfume! I'd like to order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            <IconWhatsApp className="h-4 w-4" />
            {siteConfig.name} WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
