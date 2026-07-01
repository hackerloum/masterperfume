"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Spinner from "./Spinner";
import BottleSilhouette from "./bottle/BottleSilhouette";
import { useCart } from "@/lib/cart";
import { createOrder, generateOrderCode } from "@/lib/orders";
import { saveOrder } from "@/lib/myOrders";
import { isFirebaseConfigured } from "@/lib/firebase";
import { buildWhatsAppLink, formatPrice, siteConfig } from "@/lib/config";
import { IconCheck, IconWhatsApp } from "./icons";

type Status = "idle" | "submitting" | "success" | "error";

export default function CartClient() {
  const { items, subtotal, setQty, remove, clear } = useCart();
  const [customerName, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [waLink, setWaLink] = useState("");

  async function checkout(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus("submitting");
    setError("");

    const orderCode = generateOrderCode();
    const lines = items
      .map(
        (it, i) =>
          `${i + 1}) ${it.name} — ${it.bottle || "bottle"}, ${it.sizeMl}ml × ${it.qty} — ${formatPrice(it.unitPrice * it.qty)}`
      )
      .join("\n");
    const message =
      `Hello ${siteConfig.name}! I'd like to order:\n\n` +
      `*Order code:* ${orderCode}\n\n` +
      `${lines}\n\n` +
      `*Total:* ${formatPrice(subtotal)}\n\n` +
      `*Name:* ${customerName}\n` +
      `*Location:* ${location}`;

    try {
      if (isFirebaseConfigured) {
        // One order document per line item, all sharing the same code.
        await Promise.all(
          items.map((it) =>
            createOrder({
              code: orderCode,
              productId: it.productId,
              productName: it.name,
              selectedSize: it.sizeMl,
              bottleStyle: it.bottle,
              price: it.unitPrice,
              quantity: it.qty,
              customerName: customerName.trim(),
              phone: phone.trim(),
              location: location.trim(),
              note: note.trim(),
            })
          )
        );
      }
      saveOrder({
        code: orderCode,
        productName: `${items.length} item(s)`,
        createdAt: Date.now(),
      });
      setWaLink(buildWhatsAppLink(message));
      setCode(orderCode);
      setStatus("success");
      clear();
    } catch (err) {
      console.error(err);
      setError("Couldn't place the order. Please try again or use WhatsApp.");
      setStatus("error");
    }
  }

  // ---- Success ----
  if (status === "success") {
    return (
      <div className="container-px max-w-lg py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <IconCheck className="h-7 w-7" />
        </div>
        <h1 className="mt-4 font-serif text-2xl font-800 text-ink">Thank you!</h1>
        <p className="mt-2 text-ink/60">
          We&apos;ll contact you shortly on WhatsApp to confirm your order.
        </p>
        <div className="mt-5 rounded-xl border border-dashed border-accent/40 bg-accent/5 px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-ink/50">Order code</p>
          <p className="font-serif text-2xl font-800 tracking-wider text-accent-dark">
            {code}
          </p>
        </div>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-accent mt-5 w-full">
          <IconWhatsApp className="h-5 w-5" /> Confirm on WhatsApp
        </a>
        <Link href={`/track?code=${code}`} className="btn-outline mt-3 w-full">
          Track my order
        </Link>
        <Link href="/products" className="mt-3 inline-block text-sm text-ink/50 hover:text-accent">
          Continue shopping
        </Link>
      </div>
    );
  }

  // ---- Empty ----
  if (items.length === 0) {
    return (
      <div className="container-px max-w-lg py-20 text-center">
        <p className="text-5xl">🛒</p>
        <h1 className="mt-4 font-serif text-2xl font-800 text-ink">
          Your cart is empty
        </h1>
        <p className="mt-2 text-ink/60">
          Add a few perfumes and they&apos;ll show up here.
        </p>
        <Link href="/products" className="btn-accent mt-6">
          Browse perfumes
        </Link>
      </div>
    );
  }

  // ---- Cart + checkout ----
  return (
    <div className="container-px py-10 pb-28">
      <h1 className="font-serif text-3xl font-800 text-ink">Your cart</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <div className="space-y-3">
          {items.map((it) => (
            <div
              key={it.key}
              className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-3"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BottleSilhouette oilColor={it.oilColor} className="h-[80%] w-auto" />
                </div>
                {it.imageUrl && (
                  <Image src={it.imageUrl} alt={it.name} fill sizes="64px" className="object-cover" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink">{it.name}</p>
                <p className="text-xs text-ink/50">
                  {it.bottle || "Bottle"} · {it.sizeMl}ml · {formatPrice(it.unitPrice)}
                </p>
                <div className="mt-2 inline-flex items-center rounded-lg border border-ink/15">
                  <button
                    onClick={() => setQty(it.key, it.qty - 1)}
                    className="px-3 py-1 text-ink/70 hover:text-ink"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{it.qty}</span>
                  <button
                    onClick={() => setQty(it.key, it.qty + 1)}
                    className="px-3 py-1 text-ink/70 hover:text-ink"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-medium text-ink">
                  {formatPrice(it.unitPrice * it.qty)}
                </p>
                <button
                  onClick={() => remove(it.key)}
                  className="mt-1 text-xs text-ink/40 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout */}
        <form
          onSubmit={checkout}
          className="h-fit rounded-2xl border border-ink/10 bg-white p-5 shadow-card lg:sticky lg:top-24"
        >
          <div className="flex items-center justify-between">
            <span className="text-ink/60">Subtotal</span>
            <span className="font-serif text-2xl font-800 text-ink">
              {formatPrice(subtotal)}
            </span>
          </div>
          <p className="mt-1 text-xs text-ink/40">Delivery arranged on WhatsApp.</p>

          <div className="mt-4 space-y-3">
            <input className="input-field" placeholder="Your name" value={customerName} onChange={(e) => setName(e.target.value)} required />
            <input className="input-field" type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <input className="input-field" placeholder="Delivery location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <textarea className="input-field resize-none" rows={2} placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>

          {status === "error" && (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <button type="submit" disabled={status === "submitting"} className="btn-accent mt-4 w-full">
            {status === "submitting" ? <Spinner className="h-4 w-4 border-ink/30 border-t-ink" /> : "Place order"}
          </button>
        </form>
      </div>
    </div>
  );
}
