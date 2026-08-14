"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Countdown from "./Countdown";
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "./icons";
import { formatPrice, salePrice } from "@/lib/config";
import type { Banner, Product } from "@/types";

function saleEndsAt(): number {
  const configured = process.env.NEXT_PUBLIC_SALE_ENDS;
  if (configured) {
    const t = Date.parse(configured);
    if (!Number.isNaN(t)) return t;
  }
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

interface Slide {
  key: string;
  title: string;
  subtitle: string;
  href: string;
  cta: string;
  image?: string;
}

export default function HomeMosaic({
  banners,
  featured,
  deals,
}: {
  banners: Banner[];
  featured: Product[];
  deals: Product[];
}) {
  const fallback = useMemo<Slide[]>(() => {
    const fromBanners = banners.map((b) => ({
      key: b.id,
      title: b.title || "Shop perfumes",
      subtitle: b.subtitle,
      href: b.link || "/products",
      cta: b.ctaLabel || "Shop now",
      image: b.imageUrl,
    }));
    const fromProducts = featured.slice(0, 6).map((p) => ({
      key: p.id,
      title: p.name,
      subtitle: p.description.slice(0, 90),
      href: `/products/${p.id}`,
      cta: "View deal",
      image: p.imageUrl,
    }));
    const slides = fromBanners.length ? fromBanners : fromProducts;
    return slides.length
      ? slides
      : [
          {
            key: "default",
            title: "Shop perfumes online",
            subtitle:
              "Perfume za kupima — mixed fresh, bottled to order. No account needed.",
            href: "/products",
            cta: "Shop all",
          },
        ];
  }, [banners, featured]);

  const [index, setIndex] = useState(0);
  const current = fallback[index % fallback.length];

  useEffect(() => {
    if (fallback.length < 2) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % fallback.length),
      4500
    );
    return () => clearInterval(t);
  }, [fallback.length]);

  const dealPreview = deals.slice(0, 4);
  const sideProducts = featured.slice(0, 4);

  return (
    <section className="container-px py-3 sm:py-4">
      <div className="grid gap-3 lg:grid-cols-12">
        <div className="relative min-h-[240px] overflow-hidden rounded-lg bg-ink sm:min-h-[320px] lg:col-span-8">
          {fallback.map((s, i) => (
            <div
              key={s.key}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            >
              {s.image ? (
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
            </div>
          ))}
          <div className="relative z-10 flex h-full min-h-[240px] flex-col justify-center p-5 sm:min-h-[320px] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">
              Master Perfume
            </p>
            <h1 className="mt-2 max-w-md text-2xl font-black text-white sm:text-4xl">
              {current.title}
            </h1>
            {current.subtitle && (
              <p className="mt-2 max-w-sm text-sm text-white/75">
                {current.subtitle}
              </p>
            )}
            <Link href={current.href} className="btn-accent mt-5 w-fit">
              {current.cta}
              <IconArrowRight />
            </Link>
          </div>
          {fallback.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() =>
                  setIndex((i) => (i - 1 + fallback.length) % fallback.length)
                }
                className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-accent"
              >
                <IconChevronLeft />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => setIndex((i) => (i + 1) % fallback.length)}
                className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-accent"
              >
                <IconChevronRight />
              </button>
              <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                {fallback.map((s, i) => (
                  <button
                    key={s.key}
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-6 bg-accent" : "w-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          <div className="rounded-lg border border-ink/10 bg-white p-3 shadow-card">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-bold">Flash deals</h2>
              <Countdown target={saleEndsAt()} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(dealPreview.length ? dealPreview : sideProducts).slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group overflow-hidden rounded-md bg-cream"
                >
                  <div className="relative aspect-square">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        sizes="120px"
                        className="object-cover transition duration-500 group-hover:scale-110"
                      />
                    ) : null}
                    {p.discountPercent > 0 && (
                      <span className="absolute left-1 top-1 rounded-sm bg-red-600 px-1 text-[0.6rem] font-bold text-white">
                        -{p.discountPercent}%
                      </span>
                    )}
                  </div>
                  <p className="truncate px-1.5 pt-1 text-[0.7rem] font-medium">
                    {p.name}
                  </p>
                  <p className="px-1.5 pb-1.5 text-xs font-bold text-ink">
                    {p.sizes[0]
                      ? formatPrice(
                          salePrice(p.sizes[0].price, p.discountPercent)
                        )
                      : ""}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-ink/10 bg-white p-3 shadow-card">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-bold">Shop categories</h2>
              <Link href="/products" className="text-xs font-semibold text-accent-dark">
                All
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: "Men", href: "/products?category=Men" },
                { name: "Women", href: "/products?category=Women" },
                { name: "Unisex", href: "/products?category=Unisex" },
              ].map((c) => (
                <Link
                  key={c.name}
                  href={c.href}
                  className="flex aspect-square items-end rounded-md bg-ink p-2 text-xs font-bold text-accent transition hover:bg-charcoal"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
