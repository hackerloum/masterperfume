"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildWhatsAppLink } from "@/lib/config";
import { IconWhatsApp } from "./icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Perfumes" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/80 backdrop-blur-md">
      <nav className="container-px flex h-16 items-center justify-between sm:h-20">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold bg-ink font-serif text-base font-700 text-gold-light">
            M
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-700 tracking-wide text-ink">
              MASTER
            </span>
            <span className="-mt-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.4em] text-gold-dark">
              Perfume
            </span>
          </span>
        </Link>

        {/* Center links (desktop) */}
        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium uppercase tracking-wider transition-colors ${
                    active ? "text-ink" : "text-ink/55 hover:text-ink"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-gold" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppLink("Hello Master Perfume! I'd like to order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink/80 transition hover:border-gold hover:text-gold-dark sm:inline-flex"
          >
            <IconWhatsApp className="h-4 w-4" />
            Order
          </a>
          <Link href="/products" className="btn-gold px-5 py-2.5 text-xs">
            Shop Now
          </Link>
        </div>
      </nav>
    </header>
  );
}
