"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProducts } from "@/lib/data";
import { buildWhatsAppLink, formatPrice, salePrice, siteConfig } from "@/lib/config";
import { IconWhatsApp } from "./icons";
import BottleSilhouette from "./bottle/BottleSilhouette";
import type { Product } from "@/types";

const BUNDLE_DISCOUNT = 0.1; // 10% off when buying two

function cheapest(p: Product) {
  return p.sizes.length ? p.sizes.reduce((a, b) => (a.price < b.price ? a : b)) : null;
}
function roundTo(n: number, step = 500) {
  return Math.round(n / step) * step;
}

/** "Frequently bought together" — current product + a partner at a bundle price. */
export default function FrequentlyBought({ product }: { product: Product }) {
  const [partner, setPartner] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((all) => {
        const others = all.filter((p) => p.id !== product.id);
        const sameCat = others.filter((p) => p.category === product.category);
        setPartner((sameCat[0] ?? others[0]) ?? null);
      })
      .catch(() => setPartner(null));
  }, [product]);

  const a = cheapest(product);
  const b = partner ? cheapest(partner) : null;
  if (!partner || !a || !b) return null;

  const aPrice = salePrice(a.price, product.discountPercent);
  const bPrice = salePrice(b.price, partner.discountPercent);
  const full = aPrice + bPrice;
  const bundle = roundTo(full * (1 - BUNDLE_DISCOUNT));
  const save = full - bundle;

  const message =
    `Hello ${siteConfig.name}! I'd like this bundle (${Math.round(
      BUNDLE_DISCOUNT * 100
    )}% off):\n\n` +
    `1) ${product.name} — ${a.sizeMl}ml — ${formatPrice(aPrice)}\n` +
    `2) ${partner.name} — ${b.sizeMl}ml — ${formatPrice(bPrice)}\n\n` +
    `*Bundle total:* ${formatPrice(bundle)} (save ${formatPrice(save)})`;

  const Thumb = ({ p }: { p: Product }) => (
    <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-cream">
      <div className="absolute inset-0 flex items-center justify-center">
        <BottleSilhouette oilColor={p.oilColor} className="h-[80%] w-auto" />
      </div>
      {p.imageUrl && (
        <Image src={p.imageUrl} alt={p.name} fill sizes="80px" className="object-cover" />
      )}
    </div>
  );

  return (
    <section className="mt-14 rounded-2xl border border-ink/10 bg-white p-5 shadow-card sm:p-6">
      <h2 className="font-serif text-xl font-700 text-ink">
        Frequently bought together
      </h2>
      <p className="mt-1 text-sm text-ink/50">
        Grab both and save {Math.round(BUNDLE_DISCOUNT * 100)}%.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <div className="flex flex-col items-center text-center">
          <Thumb p={product} />
          <span className="mt-2 max-w-[6rem] truncate text-xs text-ink/70">
            {product.name}
          </span>
        </div>
        <span className="text-2xl font-light text-ink/40">+</span>
        <div className="flex flex-col items-center text-center">
          <Thumb p={partner} />
          <span className="mt-2 max-w-[6rem] truncate text-xs text-ink/70">
            {partner.name}
          </span>
        </div>

        <div className="ml-auto text-right">
          <p className="text-xs text-ink/40 line-through">{formatPrice(full)}</p>
          <p className="font-serif text-2xl font-800 text-accent-dark">
            {formatPrice(bundle)}
          </p>
          <p className="text-xs font-medium text-green-600">
            Save {formatPrice(save)}
          </p>
        </div>
      </div>

      <a
        href={buildWhatsAppLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-accent mt-5 w-full sm:w-auto"
      >
        <IconWhatsApp className="h-5 w-5" />
        Order bundle on WhatsApp
      </a>
    </section>
  );
}
