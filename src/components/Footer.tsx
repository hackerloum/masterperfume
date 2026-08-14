import Link from "next/link";
import { siteConfig, instagramUrl, buildWhatsAppLink } from "@/lib/config";
import { IconInstagram, IconWhatsApp } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-px grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <Link href="/" className="flex items-baseline gap-1.5">
            <span className="text-xl font-800 tracking-tight">Master</span>
            <span className="text-sm font-semibold text-accent">perfume</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
            Buy perfume in Tanzania — mixed to order (perfume za kupima) and
            delivered to your door.
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-accent">
            Shop
          </p>
          <ul className="space-y-2 text-white/70">
            <li>
              <Link href="/products" className="hover:text-accent">
                All perfumes
              </Link>
            </li>
            <li>
              <Link href="/products?category=Men" className="hover:text-accent">
                Men
              </Link>
            </li>
            <li>
              <Link href="/products?category=Women" className="hover:text-accent">
                Women
              </Link>
            </li>
            <li>
              <Link href="/products?category=Unisex" className="hover:text-accent">
                Unisex
              </Link>
            </li>
            <li>
              <Link href="/products?sort=discount" className="hover:text-accent">
                Deals
              </Link>
            </li>
            <li>
              <Link href="/track" className="hover:text-accent">
                Track order
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-accent">
                FAQ &amp; delivery
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-accent">
            Help
          </p>
          <ul className="space-y-2 text-white/70">
            <li>
              <a
                href={instagramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-accent"
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
                className="inline-flex items-center gap-2 hover:text-accent"
              >
                <IconWhatsApp className="h-4 w-4" />
                Order on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
