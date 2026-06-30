"use client";

import { useState } from "react";
import Link from "next/link";
import AdminGate from "./AdminGate";
import ProductManager from "./ProductManager";
import OrderManager from "./OrderManager";
import BottleManager from "./BottleManager";
import BannerManager from "./BannerManager";
import { isFirebaseConfigured } from "@/lib/firebase";
import {
  IconArrowRight,
  IconTag,
  IconTruck,
  IconDroplet,
  IconImage,
} from "../icons";

type Tab = "orders" | "products" | "bottles" | "banners";

const NAV: { id: Tab; label: string; Icon: (p: { className?: string }) => JSX.Element }[] = [
  { id: "orders", label: "Orders", Icon: IconTruck },
  { id: "products", label: "Products", Icon: IconTag },
  { id: "bottles", label: "Bottles", Icon: IconDroplet },
  { id: "banners", label: "Banners", Icon: IconImage },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("orders");
  const active = NAV.find((n) => n.id === tab)!;

  return (
    <AdminGate>
      <div className="min-h-screen bg-cream">
        <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row">
          {/* Sidebar */}
          <aside className="border-b border-ink/[0.06] bg-white lg:min-h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-1.5 px-6 py-5">
              <span className="font-serif text-lg font-800 tracking-tight text-ink">
                Master
              </span>
              <span className="text-sm font-medium text-accent">admin</span>
            </div>

            <nav className="flex gap-1 px-3 pb-3 lg:flex-col lg:px-3 lg:pb-0">
              {NAV.map(({ id, label, Icon }) => {
                const isActive = tab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`flex flex-1 items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition lg:flex-none ${
                      isActive
                        ? "bg-accent/10 text-accent-dark"
                        : "text-ink/55 hover:bg-cream hover:text-ink"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                );
              })}
            </nav>

            <div className="hidden px-3 pt-3 lg:block">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-ink/50 transition hover:text-ink"
              >
                <IconArrowRight className="h-4 w-4" />
                View site
              </Link>
            </div>
          </aside>

          {/* Content */}
          <main className="min-w-0 flex-1 px-5 py-8 sm:px-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="font-serif text-2xl font-800 tracking-tight text-ink">
                  {active.label}
                </h1>
                <p className="text-sm text-ink/50">
                  Manage your {active.label.toLowerCase()} for Master Perfume.
                </p>
              </div>
              <Link href="/" className="btn-outline px-4 py-2 text-sm lg:hidden">
                View site
              </Link>
            </div>

            {!isFirebaseConfigured && (
              <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Firebase is not configured. Set the{" "}
                <code className="rounded bg-amber-100 px-1">
                  NEXT_PUBLIC_FIREBASE_*
                </code>{" "}
                environment variables to enable saving.
              </div>
            )}

            {tab === "orders" && <OrderManager />}
            {tab === "products" && <ProductManager />}
            {tab === "bottles" && <BottleManager />}
            {tab === "banners" && <BannerManager />}
          </main>
        </div>
      </div>
    </AdminGate>
  );
}
