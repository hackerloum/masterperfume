"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buildWhatsAppLink } from "@/lib/config";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import {
  IconCart,
  IconClose,
  IconHeart,
  IconMenu,
  IconSearch,
  IconWhatsApp,
} from "./icons";

const cats = [
  { href: "/products", label: "All perfumes" },
  { href: "/products?category=Men", label: "Men" },
  { href: "/products?category=Women", label: "Women" },
  { href: "/products?category=Unisex", label: "Unisex" },
  { href: "/products?sort=discount", label: "Deals", deal: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [open, setOpen] = useState(false);
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    router.push(
      search.trim()
        ? `/products?q=${encodeURIComponent(search.trim())}`
        : "/products"
    );
  }

  function isCatActive(href: string) {
    if (href === "/products") {
      return pathname.startsWith("/products") && !searchParams.get("category") && !searchParams.get("sort");
    }
    if (href.includes("category=")) {
      return searchParams.get("category") === href.split("category=")[1];
    }
    if (href.includes("sort=discount")) {
      return searchParams.get("sort") === "discount";
    }
    return false;
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]">
      <div className="hidden border-b border-ink/10 bg-[#fafafa] text-[0.72rem] text-ink/60 sm:block">
        <div className="container-px flex h-8 items-center justify-between">
          <div className="flex gap-4">
            <Link href="/track" className="hover:text-ink">
              Track order
            </Link>
            <Link href="/faq" className="hover:text-ink">
              Help &amp; delivery
            </Link>
          </div>
          <a
            href={buildWhatsAppLink("Hello Master Perfume! I have a question.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-ink hover:text-accent-dark"
          >
            <IconWhatsApp className="h-3.5 w-3.5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="container-px flex items-center gap-3 py-2.5 sm:gap-5 sm:py-3">
        <button
          type="button"
          className="rounded-md p-1.5 text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>

        <Link href="/" className="shrink-0 leading-none" onClick={() => setOpen(false)}>
          <span className="block text-[1.15rem] font-black tracking-tight text-ink sm:text-2xl">
            MASTER
          </span>
          <span className="-mt-0.5 block text-[0.65rem] font-bold uppercase tracking-[0.28em] text-accent-dark">
            perfume
          </span>
        </Link>

        <form onSubmit={submitSearch} className="hidden min-w-0 flex-1 sm:flex">
          <div className="flex w-full overflow-hidden rounded-lg border-2 border-accent focus-within:ring-2 focus-within:ring-accent/40">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for perfume, oud, size…"
              className="min-w-0 flex-1 border-0 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-accent px-5 text-sm font-bold text-ink hover:bg-accent-dark hover:text-white"
            >
              <IconSearch className="h-4 w-4" />
              Search
            </button>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            href="/wishlist"
            className="relative flex flex-col items-center rounded-md px-2 py-1 text-ink hover:bg-cream"
          >
            <span className="relative">
              <IconHeart className="h-5 w-5" />
              {wishCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent text-[0.6rem] font-bold text-ink">
                  {wishCount}
                </span>
              )}
            </span>
            <span className="hidden text-[0.65rem] font-semibold sm:block">Saved</span>
          </Link>
          <Link
            href="/cart"
            className="relative flex flex-col items-center rounded-md px-2 py-1 text-ink hover:bg-cream"
          >
            <span className="relative">
              <IconCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink text-[0.6rem] font-bold text-accent">
                  {cartCount}
                </span>
              )}
            </span>
            <span className="hidden text-[0.65rem] font-semibold sm:block">Cart</span>
          </Link>
        </div>
      </div>

      <form onSubmit={submitSearch} className="container-px pb-2.5 sm:hidden">
        <div className="flex overflow-hidden rounded-lg border-2 border-accent">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search perfumes…"
            className="min-w-0 flex-1 px-3 py-2 text-sm focus:outline-none"
          />
          <button type="submit" className="bg-accent px-3 text-ink" aria-label="Search">
            <IconSearch />
          </button>
        </div>
      </form>

      <nav className="border-t border-ink/10">
        <ul className="container-px flex gap-1 overflow-x-auto py-0 text-sm font-semibold [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {cats.map((c) => {
            const active = isCatActive(c.href);
            return (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className={`relative block whitespace-nowrap px-3 py-2.5 ${
                    c.deal ? "text-red-600" : active ? "text-ink" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {c.label}
                  <span
                    className={`absolute inset-x-2 bottom-0 h-0.5 rounded-full ${
                      active ? "bg-accent" : "bg-transparent"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-white lg:hidden">
          <div className="container-px flex flex-col py-2 text-sm font-medium">
            {cats.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/5 py-3"
              >
                {c.label}
              </Link>
            ))}
            <Link href="/track" onClick={() => setOpen(false)} className="py-3">
              Track order
            </Link>
            <Link href="/faq" onClick={() => setOpen(false)} className="py-3">
              Help &amp; delivery
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
