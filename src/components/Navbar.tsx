"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { IconCart, IconHeart } from "./icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "All" },
  { href: "/products?category=Men", label: "Men" },
  { href: "/products?category=Women", label: "Women" },
  { href: "/products?category=Unisex", label: "Unisex" },
  { href: "/products?sort=discount", label: "Deals" },
  { href: "/faq", label: "FAQ" },
  { href: "/track", label: "Track order" },
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
      search.trim()
        ? `/products?q=${encodeURIComponent(search.trim())}`
        : "/products"
    );
  }

  return (
    <header className="sticky top-0 z-40 bg-ink text-white shadow-sm">
      <nav className="container-px flex flex-wrap items-center gap-2 py-2 sm:gap-3 sm:py-2.5">
        <Link href="/" className="flex shrink-0 items-baseline gap-1 pr-1">
          <span className="text-lg font-800 tracking-tight sm:text-xl">Master</span>
          <span className="text-sm font-semibold lowercase tracking-wide text-accent">
            perfume
          </span>
        </Link>

        <form onSubmit={submitSearch} className="order-3 flex min-w-0 flex-1 basis-full sm:order-none sm:basis-0">
          <div className="flex w-full overflow-hidden rounded-md">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search perfumes, brands, sizes…"
              className="min-w-0 flex-1 border-0 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              aria-label="Search"
              className="bg-accent px-3 text-ink hover:bg-accent-dark hover:text-white sm:px-4"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4-4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative rounded-md p-2 text-white/90 hover:bg-white/10"
          >
            <IconHeart className="h-5 w-5" />
            {wishCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[0.6rem] font-bold text-ink">
                {wishCount}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative rounded-md p-2 text-white/90 hover:bg-white/10"
          >
            <IconCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[0.6rem] font-bold text-ink">
                {cartCount}
              </span>
            )}
            <span className="ml-1 hidden text-xs font-semibold sm:inline">Cart</span>
          </Link>
        </div>
      </nav>

      <div className="border-t border-white/10 bg-[#1a1a1a]">
        <ul className="container-px flex gap-1 overflow-x-auto py-1.5 text-[0.8rem] font-medium [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => {
            const pathOnly = link.href.split("?")[0];
            const active =
              pathOnly === "/"
                ? pathname === "/"
                : pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
            return (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className={`whitespace-nowrap rounded-md px-2.5 py-1.5 ${
                    active
                      ? "bg-white/15 text-accent"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
