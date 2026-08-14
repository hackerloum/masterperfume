"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Hero from "./Hero";
import { IconArrowRight } from "./icons";
import type { Banner } from "@/types";

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
    <section className="bg-white">
      <div className="container-px py-3 sm:py-4">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md bg-ink sm:aspect-[21/8]">
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
              <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-transparent" />
            </div>
          ))}

          <div className="relative flex h-full flex-col justify-center p-5 sm:max-w-lg sm:p-10">
            {current.title && (
              <h1 className="text-2xl font-800 leading-tight text-white sm:text-4xl">
                {current.title}
              </h1>
            )}
            {current.subtitle && (
              <p className="mt-2 max-w-md text-sm text-white/80 sm:text-base">
                {current.subtitle}
              </p>
            )}
            <div className="mt-4">
              <Link
                href={current.link || "/products"}
                className="btn-accent"
              >
                {current.ctaLabel || "Shop now"}
                <IconArrowRight />
              </Link>
            </div>
          </div>

          {banners.length > 1 && (
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {banners.map((b, i) => (
                <button
                  key={b.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-sm transition-all ${
                    i === index ? "w-6 bg-accent" : "w-3 bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
