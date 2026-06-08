"use client";

import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import BottleForm from "./BottleForm";
import {
  createBottle,
  deleteBottle,
  getBottles,
  updateBottle,
} from "@/lib/bottles";
import { isFirebaseConfigured } from "@/lib/firebase";
import { DEFAULT_BOTTLES, type Bottle, type BottleInput } from "@/types";

type Mode = { type: "list" } | { type: "new" } | { type: "edit"; bottle: Bottle };

export default function BottleManager() {
  const [bottles, setBottles] = useState<Bottle[] | null>(null);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<Mode>({ type: "list" });
  const [busy, setBusy] = useState(false);

  async function load() {
    if (!isFirebaseConfigured) {
      setBottles([]);
      return;
    }
    try {
      setBottles(await getBottles());
    } catch (err) {
      console.error(err);
      setError("Could not load bottles.");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCreate(input: BottleInput) {
    await createBottle(input);
    setMode({ type: "list" });
    await load();
  }

  async function handleUpdate(id: string, input: BottleInput) {
    await updateBottle(id, input);
    setMode({ type: "list" });
    await load();
  }

  async function handleDelete(b: Bottle) {
    if (!confirm(`Delete bottle "${b.name}"?`)) return;
    try {
      await deleteBottle(b.id);
      await load();
    } catch (err) {
      console.error(err);
      alert("Failed to delete bottle.");
    }
  }

  /** Seed the four built-in bottles into Firestore. */
  async function handleSeed() {
    if (!confirm("Add the 4 default bottles to your store?")) return;
    setBusy(true);
    try {
      for (const b of DEFAULT_BOTTLES) {
        const { id, createdAt, ...rest } = b;
        await createBottle(rest);
      }
      await load();
    } catch (err) {
      console.error(err);
      alert("Failed to seed bottles.");
    } finally {
      setBusy(false);
    }
  }

  if (mode.type === "new") {
    return (
      <BottleForm
        onSave={handleCreate}
        onCancel={() => setMode({ type: "list" })}
      />
    );
  }

  if (mode.type === "edit") {
    return (
      <BottleForm
        initial={mode.bottle}
        onSave={(input) => handleUpdate(mode.bottle.id, input)}
        onCancel={() => setMode({ type: "list" })}
      />
    );
  }

  // ---- List view ----
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/60">
          {bottles ? `${bottles.length} bottle(s)` : "Loading…"}
        </p>
        <div className="flex gap-2">
          {bottles && bottles.length === 0 && isFirebaseConfigured && (
            <button
              onClick={handleSeed}
              disabled={busy}
              className="btn-outline px-4 py-2 text-sm"
            >
              {busy ? <Spinner className="h-4 w-4" /> : "Seed defaults"}
            </button>
          )}
          <button
            onClick={() => setMode({ type: "new" })}
            disabled={!isFirebaseConfigured}
            className="btn-accent px-4 py-2 text-sm"
          >
            + Add bottle
          </button>
        </div>
      </div>

      {!isFirebaseConfigured && (
        <p className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Configure Firebase to manage bottles. The storefront currently shows
          the 4 built-in default bottles.
        </p>
      )}

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {bottles === null && !error && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}

      {bottles && bottles.length === 0 && isFirebaseConfigured && (
        <div className="mt-6 rounded-2xl border border-dashed border-ink/20 bg-white p-12 text-center">
          <p className="text-4xl">🫙</p>
          <h3 className="mt-3 font-serif text-xl text-ink">No bottles yet</h3>
          <p className="mt-1 text-ink/60">
            Add a bottle or seed the 4 defaults to get started.
          </p>
        </div>
      )}

      {bottles && bottles.length > 0 && (
        <div className="mt-4 space-y-3">
          {bottles.map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-4 shadow-card"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-ink">{b.name}</p>
                  {b.imageUrl ? (
                    <span className="badge bg-green-50 text-green-700">
                      Photo
                    </span>
                  ) : (
                    <span className="badge bg-amber-50 text-amber-700">
                      No photo
                    </span>
                  )}
                  {!b.isActive && (
                    <span className="badge bg-ink/10 text-ink/60">Hidden</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-ink/50">
                  {b.sizesMl.length
                    ? b.sizesMl.map((s) => `${s}ml`).join(" · ")
                    : "No sizes"}
                </p>
              </div>

              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => setMode({ type: "edit", bottle: b })}
                  className="rounded-lg px-3 py-1.5 text-sm text-ink/70 hover:text-accent-dark"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b)}
                  className="rounded-lg px-3 py-1.5 text-sm text-ink/70 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
