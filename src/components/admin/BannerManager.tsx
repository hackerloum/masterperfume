"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "../Spinner";
import BannerForm from "./BannerForm";
import {
  createBanner,
  deleteBanner,
  getBanners,
  updateBanner,
} from "@/lib/banners";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { Banner, BannerInput } from "@/types";

type Mode = { type: "list" } | { type: "new" } | { type: "edit"; banner: Banner };

export default function BannerManager() {
  const [banners, setBanners] = useState<Banner[] | null>(null);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<Mode>({ type: "list" });

  async function load() {
    if (!isFirebaseConfigured) {
      setBanners([]);
      return;
    }
    try {
      setBanners(await getBanners());
    } catch (err) {
      console.error(err);
      setError("Could not load banners.");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCreate(input: BannerInput) {
    await createBanner(input);
    setMode({ type: "list" });
    await load();
  }

  async function handleUpdate(id: string, input: BannerInput) {
    await updateBanner(id, input);
    setMode({ type: "list" });
    await load();
  }

  async function handleToggle(b: Banner) {
    try {
      await updateBanner(b.id, { isActive: !b.isActive });
      await load();
    } catch (err) {
      console.error(err);
      alert("Failed to update banner.");
    }
  }

  async function handleDelete(b: Banner) {
    if (!confirm("Delete this banner?")) return;
    try {
      await deleteBanner(b.id);
      await load();
    } catch (err) {
      console.error(err);
      alert("Failed to delete banner.");
    }
  }

  if (mode.type === "new") {
    return (
      <BannerForm
        onSave={handleCreate}
        onCancel={() => setMode({ type: "list" })}
      />
    );
  }

  if (mode.type === "edit") {
    return (
      <BannerForm
        initial={mode.banner}
        onSave={(input) => handleUpdate(mode.banner.id, input)}
        onCancel={() => setMode({ type: "list" })}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/60">
          {banners ? `${banners.length} banner(s)` : "Loading…"}
        </p>
        <button
          onClick={() => setMode({ type: "new" })}
          disabled={!isFirebaseConfigured}
          className="btn-accent px-4 py-2 text-sm"
        >
          + Add banner
        </button>
      </div>

      {!isFirebaseConfigured && (
        <p className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Configure Firebase to manage banners. With no banners, the homepage
          shows the default hero.
        </p>
      )}

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {banners === null && !error && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}

      {banners && banners.length === 0 && isFirebaseConfigured && (
        <div className="mt-6 rounded-2xl border border-dashed border-ink/20 bg-white p-12 text-center">
          <p className="text-4xl">🖼️</p>
          <h3 className="mt-3 font-serif text-xl text-ink">No banners yet</h3>
          <p className="mt-1 text-ink/60">
            Add a banner to feature offers and products on the homepage.
          </p>
        </div>
      )}

      {banners && banners.length > 0 && (
        <div className="mt-4 space-y-3">
          {banners.map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-3 shadow-card"
            >
              <div className="relative h-14 w-28 shrink-0 overflow-hidden rounded-lg bg-ink">
                {b.imageUrl && (
                  <Image
                    src={b.imageUrl}
                    alt={b.title}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-ink">
                    {b.title || "(no title)"}
                  </p>
                  {!b.isActive && (
                    <span className="badge bg-ink/10 text-ink/60">Hidden</span>
                  )}
                </div>
                <p className="truncate text-sm text-ink/50">
                  {b.subtitle || b.link}
                </p>
              </div>

              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => handleToggle(b)}
                  className="rounded-lg px-3 py-1.5 text-sm text-ink/70 hover:text-accent-dark"
                >
                  {b.isActive ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => setMode({ type: "edit", banner: b })}
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
