import Link from "next/link";
import { siteConfig, instagramUrl, buildWhatsAppLink } from "@/lib/config";
import { IconInstagram, IconWhatsApp } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-ink/[0.06] bg-white">
      <div className="container-px grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <Link href="/" className="flex items-baseline gap-1.5">
            <span className="font-serif text-xl font-800 tracking-tight text-ink">
              Master
            </span>
            <span className="text-sm font-medium text-accent">perfume</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/50">
            {siteConfig.slogan}. Premium fragrances, mixed to order and delivered
            to your door.
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-ink/40">
            Explore
          </p>
          <ul className="space-y-3 text-ink/60">
            <li>
              <Link href="/" className="transition hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="transition hover:text-accent">
                All perfumes
              </Link>
            </li>
            <li>
              <Link href="/track" className="transition hover:text-accent">
                Track order
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-ink/40">
            Connect
          </p>
          <ul className="space-y-3 text-ink/60">
            <li>
              <a
                href={instagramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-accent"
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
                className="inline-flex items-center gap-2 transition hover:text-accent"
              >
                <IconWhatsApp className="h-4 w-4" />
                Order on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/[0.06] py-5 text-center text-xs text-ink/40">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
