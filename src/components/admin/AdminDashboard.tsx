"use client";

import { useState } from "react";
import Link from "next/link";
import AdminGate from "./AdminGate";
import ProductManager from "./ProductManager";
import OrderManager from "./OrderManager";
import { isFirebaseConfigured } from "@/lib/firebase";

type Tab = "products" | "orders";

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("orders");

  return (
    <AdminGate>
      <div className="container-px py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-serif text-3xl font-700 text-ink">
              Admin Dashboard
            </h1>
            <p className="text-sm text-ink/60">
              Manage products and orders for Master Perfume.
            </p>
          </div>
          <Link href="/" className="btn-outline px-4 py-2 text-sm">
            View site
          </Link>
        </div>

        {!isFirebaseConfigured && (
          <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Firebase is not configured. Set the{" "}
            <code>NEXT_PUBLIC_FIREBASE_*</code> environment variables to enable
            saving products and orders.
          </div>
        )}

        {/* Tabs */}
        <div className="mt-6 flex gap-2 border-b border-ink/10">
          {(["orders", "products"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium capitalize transition ${
                tab === t
                  ? "border-gold text-ink"
                  : "border-transparent text-ink/50 hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "orders" ? <OrderManager /> : <ProductManager />}
        </div>
      </div>
    </AdminGate>
  );
}
