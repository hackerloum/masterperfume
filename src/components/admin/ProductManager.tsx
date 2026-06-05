"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "../Spinner";
import ProductForm from "./ProductForm";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/lib/products";
import { isFirebaseConfigured } from "@/lib/firebase";
import { formatPrice } from "@/lib/config";
import { sampleProducts } from "@/lib/sampleProducts";
import type { Product, ProductInput } from "@/types";

type Mode = { type: "list" } | { type: "new" } | { type: "edit"; product: Product };

export default function ProductManager() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<Mode>({ type: "list" });
  const [busy, setBusy] = useState(false);

  async function load() {
    if (!isFirebaseConfigured) {
      setProducts([]);
      return;
    }
    try {
      setProducts(await getProducts());
    } catch (err) {
      console.error(err);
      setError("Could not load products.");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCreate(input: ProductInput) {
    await createProduct(input);
    setMode({ type: "list" });
    await load();
  }

  async function handleUpdate(id: string, input: ProductInput) {
    await updateProduct(id, input);
    setMode({ type: "list" });
    await load();
  }

  async function handleDelete(product: Product) {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      await deleteProduct(product.id);
      await load();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  }

  /** One-click seed of the bundled sample perfumes into Firestore. */
  async function handleSeed() {
    if (!confirm("Add the 6 sample perfumes to your store?")) return;
    setBusy(true);
    try {
      for (const p of sampleProducts) {
        const { id, createdAt, ...rest } = p;
        await createProduct(rest);
      }
      await load();
    } catch (err) {
      console.error(err);
      alert("Failed to seed sample products.");
    } finally {
      setBusy(false);
    }
  }

  if (mode.type === "new") {
    return (
      <ProductForm
        onSave={handleCreate}
        onCancel={() => setMode({ type: "list" })}
      />
    );
  }

  if (mode.type === "edit") {
    return (
      <ProductForm
        initial={mode.product}
        onSave={(input) => handleUpdate(mode.product.id, input)}
        onCancel={() => setMode({ type: "list" })}
      />
    );
  }

  // ---- List view ----
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/60">
          {products ? `${products.length} product(s)` : "Loading…"}
        </p>
        <div className="flex gap-2">
          {products && products.length === 0 && isFirebaseConfigured && (
            <button
              onClick={handleSeed}
              disabled={busy}
              className="btn-outline px-4 py-2 text-sm"
            >
              {busy ? <Spinner className="h-4 w-4" /> : "Seed samples"}
            </button>
          )}
          <button
            onClick={() => setMode({ type: "new" })}
            disabled={!isFirebaseConfigured}
            className="btn-gold px-4 py-2 text-sm"
          >
            + Add product
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {products === null && !error && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}

      {products && products.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-ink/20 bg-white p-12 text-center">
          <p className="text-4xl">🧴</p>
          <h3 className="mt-3 font-serif text-xl text-ink">No products yet</h3>
          <p className="mt-1 text-ink/60">
            Add your first perfume{isFirebaseConfigured ? " or seed samples" : ""}{" "}
            to get started.
          </p>
        </div>
      )}

      {products && products.length > 0 && (
        <div className="mt-4 space-y-3">
          {products.map((p) => {
            const from = p.sizes.length
              ? Math.min(...p.sizes.map((s) => s.price))
              : null;
            return (
              <div
                key={p.id}
                className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-3 shadow-card"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-sand">
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-ink/40">
                      —
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium text-ink">{p.name}</p>
                    {p.isFeatured && (
                      <span className="badge bg-gold/15 text-gold-dark">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink/50">
                    {p.category}
                    {from !== null && ` · from ${formatPrice(from)}`}
                    {` · ${p.sizes.length} size(s)`}
                  </p>
                </div>

                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => setMode({ type: "edit", product: p })}
                    className="rounded-lg px-3 py-1.5 text-sm text-ink/70 hover:text-gold-dark"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    className="rounded-lg px-3 py-1.5 text-sm text-ink/70 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
