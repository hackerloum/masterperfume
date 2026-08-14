"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Hero from "./Hero";
import { IconArrowRight } from "./icons";
import type { Banner } from "@/types";

/**
 * Homepage hero. Shows an admin-managed rotating banner carousel when banners
 * exist; otherwise falls back to the default <Hero/>.
 */
export default function HeroBanner({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (banners.length < 2) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % banners.length),
      5000
    );
    return () => clearInterval(t);
  }, [banners.length]);

  if (banners.length === 0) {
    return <Hero />;
  }

  const current = banners[index];

  return (
    <section className="container-px pt-4 sm:pt-6">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-ink sm:aspect-[21/9]">
        {banners.map((b, i) => (
          <div
            key={b.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={b.imageUrl}
              alt={b.title || "Master Perfume promotional banner"}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
          </div>
        ))}

        <div className="relative flex h-full flex-col justify-center p-7 sm:max-w-lg sm:p-12">
          {current.title && (
            <h1 className="font-serif text-3xl font-800 leading-tight text-white sm:text-5xl">
              {current.title}
            </h1>
          )}
          {current.subtitle && (
            <p className="mt-3 max-w-md text-sm text-white/80 sm:text-base">
              {current.subtitle}
            </p>
          )}
          <div className="mt-6">
            <Link
              href={current.link || "/products"}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-dark"
            >
              {current.ctaLabel || "Shop now"}
              <IconArrowRight />
            </Link>
          </div>
        </div>

        {banners.length > 1 && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {banners.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
