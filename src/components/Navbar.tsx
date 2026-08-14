"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { buildWhatsAppLink } from "@/lib/config";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { IconWhatsApp, IconCart, IconHeart } from "./icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/faq", label: "FAQ" },
  { href: "/track", label: "Track Order" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(
      search.trim() ? `/products?q=${encodeURIComponent(search.trim())}` : "/products"
    );
  }

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
          <form
            onSubmit={submitSearch}
            className="relative hidden md:block"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search perfumes…"
              className="w-44 rounded-full border border-ink/15 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-ink/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 lg:w-56"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-accent"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4-4" strokeLinecap="round" />
              </svg>
            </button>
          </form>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative p-1.5 text-ink/70 transition hover:text-accent"
          >
            <IconHeart className="h-5 w-5" />
            {wishCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[0.6rem] font-bold text-white">
                {wishCount}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative p-1.5 text-ink/70 transition hover:text-accent"
          >
            <IconCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[0.6rem] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/products" className="btn-accent hidden px-5 py-2.5 text-sm sm:inline-flex">
            Shop now
          </Link>
        </div>
      </nav>
    </header>
  );
}
