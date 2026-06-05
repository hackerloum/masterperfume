"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Perfumes" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <nav className="container-px flex h-16 items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-xl font-700 tracking-wide text-ink">
            MASTER
          </span>
          <span className="-mt-1 text-[0.6rem] font-medium uppercase tracking-[0.35em] text-gold-dark">
            Perfume
          </span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-ink text-white"
                      : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/products" className="btn-gold ml-1 px-4 py-2 text-sm">
              Shop
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
