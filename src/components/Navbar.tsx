"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildWhatsAppLink } from "@/lib/config";
import { IconWhatsApp } from "./icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/[0.06] bg-white/80 backdrop-blur-md">
      <nav className="container-px flex h-16 items-center justify-between sm:h-18">
        {/* Brand */}
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="font-serif text-xl font-800 tracking-tight text-ink">
            Master
          </span>
          <span className="text-sm font-medium lowercase tracking-wide text-accent">
            perfume
          </span>
        </Link>

        {/* Center links (desktop) */}
        <ul className="hidden items-center gap-10 sm:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm transition-colors ${
                    active
                      ? "font-medium text-ink"
                      : "text-ink/50 hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href={buildWhatsAppLink("Hello Master Perfume! I'd like to order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 text-sm text-ink/60 transition hover:text-accent sm:inline-flex"
          >
            <IconWhatsApp className="h-4 w-4" />
            Order
          </a>
          <Link href="/products" className="btn-accent px-5 py-2.5 text-sm">
            Shop now
          </Link>
        </div>
      </nav>
    </header>
  );
}
