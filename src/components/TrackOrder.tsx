"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Spinner from "./Spinner";
import { getOrdersByCode } from "@/lib/orders";
import { getSavedOrders, type SavedOrder } from "@/lib/myOrders";
import { isFirebaseConfigured } from "@/lib/firebase";
import { formatPrice } from "@/lib/config";
import { IconCheck } from "./icons";
import { ORDER_STATUSES, type Order, type OrderStatus } from "@/types";

const STEPS: { id: OrderStatus; label: string; desc: string }[] = [
  { id: "pending", label: "Received", desc: "We've received your order." },
  { id: "contacted", label: "Contacted", desc: "We've reached out on WhatsApp." },
  { id: "completed", label: "Completed", desc: "Your order is complete." },
];

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  contacted: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

export default function TrackOrder() {
  const params = useSearchParams();
  const [code, setCode] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "notfound" | "found">(
    "idle"
  );
  const [error, setError] = useState("");
  const [recent, setRecent] = useState<SavedOrder[]>([]);
  const [trackedCode, setTrackedCode] = useState("");

  // Load saved orders + prefill / auto-track from the ?code= query param.
  useEffect(() => {
    setRecent(getSavedOrders());
    const initial = params.get("code");
    if (initial) {
      setCode(initial);
      lookup(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function lookup(raw: string, silent = false) {
    const value = raw.trim();
    if (!value) return;
    if (!isFirebaseConfigured) {
      if (!silent) setError("Order tracking isn't available in this preview.");
      return;
    }
    if (!silent) {
      setStatus("loading");
      setError("");
      setOrders([]);
    }
    try {
      const found = await getOrdersByCode(value);
      if (found.length) {
        setOrders(found);
        setStatus("found");
        setTrackedCode(value);
      } else if (!silent) {
        setStatus("notfound");
      }
    } catch (err) {
      console.error(err);
      if (!silent) {
        setError("Something went wrong. Please try again.");
        setStatus("idle");
      }
    }
  }

  // Auto-refresh the status every 4s once an order is being tracked.
  useEffect(() => {
    if (status !== "found" || !trackedCode) return;
    const t = setInterval(() => lookup(trackedCode, true), 4000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, trackedCode]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    lookup(code);
  }

  const head = orders[0] ?? null;
  const currentStep = head ? ORDER_STATUSES.indexOf(head.status) : -1;
  const grandTotal = orders.reduce((n, o) => n + o.price * o.quantity, 0);

  return (
    <section className="container-px max-w-2xl py-12 pb-24">
      <div className="text-center">
        <p className="eyebrow">Order status</p>
        <h1 className="mt-3 font-serif text-3xl font-800 text-ink sm:text-4xl">
          Track your order
        </h1>
        <p className="mx-auto mt-2 max-w-md text-ink/55">
          Enter the order code you received when you placed your order — no
          account needed.
        </p>
      </div>

      {/* Lookup form */}
      <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
        <input
          className="input-field uppercase tracking-wider"
          placeholder="e.g. MP-7F3K9"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-accent shrink-0"
        >
          {status === "loading" ? <Spinner className="h-4 w-4" /> : "Track"}
        </button>
      </form>

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {status === "notfound" && (
        <p className="mt-4 rounded-xl border border-ink/10 bg-cream px-4 py-3 text-sm text-ink/70">
          No order found with that code. Double-check it and try again.
        </p>
      )}

      {/* Result */}
      {status === "found" && head && (
        <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-ink/40">
                Order {head.code}
              </p>
              <h2 className="font-serif text-xl font-700 text-ink">
                {orders.length} item{orders.length === 1 ? "" : "s"}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[0.7rem] text-ink/40">
                <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-green-500" />
                Live
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[head.status]}`}
              >
                {head.status}
              </span>
            </div>
          </div>

          {/* Progress steps */}
          <ol className="mt-6 space-y-4">
            {STEPS.map((step, i) => {
              const done = i <= currentStep;
              return (
                <li key={step.id} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      done
                        ? "bg-accent text-white"
                        : "border border-ink/20 text-ink/30"
                    }`}
                  >
                    {done ? <IconCheck className="h-4 w-4" /> : i + 1}
                  </span>
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        done ? "text-ink" : "text-ink/40"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-ink/50">{step.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Items */}
          <div className="mt-6 space-y-2 border-t border-ink/10 pt-4 text-sm text-ink/70">
            {orders.map((o) => (
              <div key={o.id} className="flex items-center justify-between gap-3">
                <span className="min-w-0 truncate">
                  {o.productName}{" "}
                  <span className="text-ink/40">
                    ({o.bottleStyle || "bottle"} · {o.selectedSize}ml × {o.quantity})
                  </span>
                </span>
                <span className="shrink-0 font-medium text-ink">
                  {formatPrice(o.price * o.quantity)}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-ink/10 pt-2 font-medium text-ink">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
            <p className="pt-1 text-xs text-ink/40">
              Placed {new Date(head.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* Recent orders on this device */}
      {recent.length > 0 && (
        <div className="mt-10">
          <h3 className="text-sm font-medium text-ink/60">
            Your recent orders on this device
          </h3>
          <div className="mt-3 space-y-2">
            {recent.map((o) => (
              <button
                key={o.code}
                onClick={() => {
                  setCode(o.code);
                  lookup(o.code);
                }}
                className="flex w-full items-center justify-between rounded-xl border border-ink/10 bg-white px-4 py-3 text-left transition hover:border-accent"
              >
                <span className="text-sm text-ink">{o.productName}</span>
                <span className="font-medium text-accent-dark">{o.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
