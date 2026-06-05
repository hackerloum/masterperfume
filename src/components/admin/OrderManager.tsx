"use client";

import { useEffect, useMemo, useState } from "react";
import Spinner from "../Spinner";
import { getOrders, updateOrderStatus } from "@/lib/orders";
import { isFirebaseConfigured } from "@/lib/firebase";
import { formatPrice } from "@/lib/config";
import { ORDER_STATUSES, type Order, type OrderStatus } from "@/types";

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  contacted: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

export default function OrderManager() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  async function load() {
    if (!isFirebaseConfigured) {
      setOrders([]);
      return;
    }
    try {
      setOrders(await getOrders());
    } catch (err) {
      console.error(err);
      setError("Could not load orders.");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleStatusChange(order: Order, status: OrderStatus) {
    setUpdating(order.id);
    try {
      await updateOrderStatus(order.id, status);
      setOrders((prev) =>
        prev
          ? prev.map((o) => (o.id === order.id ? { ...o, status } : o))
          : prev
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    } finally {
      setUpdating(null);
    }
  }

  // Totals: count and estimated sales (price * quantity across orders).
  const stats = useMemo(() => {
    const list = orders ?? [];
    const totalOrders = list.length;
    const totalSales = list.reduce((sum, o) => sum + o.price * o.quantity, 0);
    const completed = list.filter((o) => o.status === "completed").length;
    return { totalOrders, totalSales, completed };
  }, [orders]);

  if (orders === null && !error) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Total Orders" value={String(stats.totalOrders)} />
        <StatCard
          label="Est. Sales"
          value={formatPrice(stats.totalSales)}
        />
        <StatCard label="Completed" value={String(stats.completed)} />
      </div>

      {/* Empty */}
      {orders && orders.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-ink/20 bg-white p-12 text-center">
          <p className="text-4xl">📭</p>
          <h3 className="mt-3 font-serif text-xl text-ink">No orders yet</h3>
          <p className="mt-1 text-ink/60">
            Orders placed by customers will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {orders!.map((o) => (
            <div
              key={o.id}
              className="rounded-2xl border border-ink/10 bg-white p-4 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-lg font-600 text-ink">
                    {o.productName}
                  </p>
                  <p className="text-sm text-ink/60">
                    {o.selectedSize}ml × {o.quantity} ·{" "}
                    {formatPrice(o.price * o.quantity)}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[o.status]}`}
                >
                  {o.status}
                </span>
              </div>

              <div className="mt-3 grid gap-1 text-sm text-ink/70 sm:grid-cols-2">
                <p>
                  <span className="text-ink/40">Customer:</span>{" "}
                  {o.customerName}
                </p>
                <p>
                  <span className="text-ink/40">Phone:</span>{" "}
                  <a href={`tel:${o.phone}`} className="text-gold-dark">
                    {o.phone}
                  </a>
                </p>
                <p>
                  <span className="text-ink/40">Location:</span> {o.location}
                </p>
                <p>
                  <span className="text-ink/40">Date:</span>{" "}
                  {new Date(o.createdAt).toLocaleString()}
                </p>
                {o.note && (
                  <p className="sm:col-span-2">
                    <span className="text-ink/40">Note:</span> {o.note}
                  </p>
                )}
              </div>

              <div className="mt-3 flex items-center gap-2">
                <label className="text-xs text-ink/50">Update status:</label>
                <select
                  value={o.status}
                  disabled={updating === o.id}
                  onChange={(e) =>
                    handleStatusChange(o, e.target.value as OrderStatus)
                  }
                  className="rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-sm capitalize focus:border-gold focus:outline-none"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s} className="capitalize">
                      {s}
                    </option>
                  ))}
                </select>
                {updating === o.id && <Spinner className="h-4 w-4" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-card">
      <p className="text-xs uppercase tracking-wide text-ink/40">{label}</p>
      <p className="mt-1 font-serif text-xl font-700 text-ink">{value}</p>
    </div>
  );
}
