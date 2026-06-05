"use client";

import { useState } from "react";
import Link from "next/link";
import Spinner from "./Spinner";
import { createOrder } from "@/lib/orders";
import { isFirebaseConfigured } from "@/lib/firebase";
import { buildWhatsAppLink, formatPrice, siteConfig } from "@/lib/config";
import { IconCheck, IconWhatsApp } from "./icons";
import type { Product, ProductSize } from "@/types";

type Status = "idle" | "submitting" | "success" | "error";

export default function OrderForm({ product }: { product: Product }) {
  const [size, setSize] = useState<ProductSize | null>(
    product.sizes[0] ?? null
  );
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [whatsAppLink, setWhatsAppLink] = useState("");

  const total = size ? size.price * quantity : 0;

  /** Compose the WhatsApp message for an order. */
  function composeMessage(): string {
    return (
      `Hello ${siteConfig.name}! I'd like to place an order:\n\n` +
      `*Perfume:* ${product.name}\n` +
      `*Size:* ${size?.sizeMl}ml\n` +
      `*Quantity:* ${quantity}\n` +
      `*Total:* ${formatPrice(total)}\n\n` +
      `*Name:* ${customerName}\n` +
      `*Location:* ${location}\n` +
      (note ? `*Note:* ${note}\n` : "")
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!size) {
      setErrorMsg("Please select a size.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    const order = {
      productId: product.id,
      productName: product.name,
      selectedSize: size.sizeMl,
      price: size.price,
      quantity,
      customerName: customerName.trim(),
      phone: phone.trim(),
      location: location.trim(),
      note: note.trim(),
    };

    try {
      // Save to Firestore when configured; otherwise continue to WhatsApp
      // so the customer can still order (demo / first-run friendliness).
      if (isFirebaseConfigured) {
        await createOrder(order);
      }
      setWhatsAppLink(buildWhatsAppLink(composeMessage()));
      setStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMsg(
        "We couldn't save your order. Please try again or contact us on WhatsApp."
      );
      setStatus("error");
    }
  }

  // ---- Success state ----
  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold/40 bg-white p-6 text-center shadow-card">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <IconCheck className="h-7 w-7" />
        </div>
        <h2 className="mt-4 font-serif text-2xl text-ink">Thank you!</h2>
        <p className="mt-2 text-ink/70">
          Thank you for your order. We will contact you shortly on WhatsApp.
        </p>

        <a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold mt-6 w-full"
        >
          <IconWhatsApp className="h-5 w-5" />
          Confirm on WhatsApp
        </a>
        <Link href="/products" className="btn-outline mt-3 w-full">
          Continue shopping
        </Link>
      </div>
    );
  }

  // ---- Form ----
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card sm:p-6"
    >
      <h2 className="font-serif text-xl font-600 text-ink">Place your order</h2>
      <p className="mt-1 text-sm text-ink/50">
        No account needed — just fill in your details.
      </p>

      {/* Size selector */}
      <div className="mt-5">
        <span className="label">Select size</span>
        {product.sizes.length === 0 ? (
          <p className="text-sm text-ink/50">No sizes available.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => {
              const active = size?.sizeMl === s.sizeMl;
              return (
                <button
                  type="button"
                  key={s.sizeMl}
                  onClick={() => setSize(s)}
                  className={`rounded-xl border px-4 py-2 text-sm transition ${
                    active
                      ? "border-gold bg-gold/10 text-ink"
                      : "border-ink/15 bg-white text-ink/70 hover:border-gold/60"
                  }`}
                >
                  <span className="font-medium">{s.sizeMl}ml</span>
                  <span className="ml-2 text-ink/50">
                    {formatPrice(s.price)}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Quantity */}
      <div className="mt-5">
        <span className="label">Quantity</span>
        <div className="inline-flex items-center rounded-xl border border-ink/15">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-2 text-lg text-ink/70 hover:text-ink"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-10 text-center font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            className="px-4 py-2 text-lg text-ink/70 hover:text-ink"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Customer details */}
      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="name" className="label">
            Your name
          </label>
          <input
            id="name"
            className="input-field"
            placeholder="e.g. Asha John"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="label">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            className="input-field"
            placeholder="e.g. 0712 345 678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="label">
            Delivery location
          </label>
          <input
            id="location"
            className="input-field"
            placeholder="e.g. Mwenge, Dar es Salaam"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="note" className="label">
            Note <span className="text-ink/40">(optional)</span>
          </label>
          <textarea
            id="note"
            rows={2}
            className="input-field resize-none"
            placeholder="Anything we should know?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>

      {/* Total */}
      <div className="mt-5 flex items-center justify-between rounded-xl bg-cream px-4 py-3">
        <span className="text-sm text-ink/60">Total</span>
        <span className="font-serif text-xl font-700 text-ink">
          {formatPrice(total)}
        </span>
      </div>

      {status === "error" && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || product.sizes.length === 0}
        className="btn-gold mt-5 w-full"
      >
        {status === "submitting" ? (
          <>
            <Spinner className="h-4 w-4 border-ink/30 border-t-ink" />
            Placing order…
          </>
        ) : (
          "Place Order"
        )}
      </button>
    </form>
  );
}
