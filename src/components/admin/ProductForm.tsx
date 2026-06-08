"use client";

import { useState } from "react";
import Image from "next/image";
import Spinner from "../Spinner";
import { uploadProductImage } from "@/lib/products";
import BottleSilhouette from "../bottle/BottleSilhouette";
import {
  CATEGORIES,
  DEFAULT_OIL_COLOR,
  type Category,
  type Product,
  type ProductInput,
  type ProductSize,
} from "@/types";

interface Props {
  /** When provided, the form edits this product; otherwise it creates a new one. */
  initial?: Product;
  onSave: (input: ProductInput) => Promise<void>;
  onCancel: () => void;
}

/** Add / edit product form with size rows and image upload. */
export default function ProductForm({ initial, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState<Category>(
    initial?.category ?? "Unisex"
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [oilColor, setOilColor] = useState(
    initial?.oilColor ?? DEFAULT_OIL_COLOR
  );
  const [isFeatured, setIsFeatured] = useState(initial?.isFeatured ?? false);
  const [sizes, setSizes] = useState<ProductSize[]>(
    initial?.sizes?.length ? initial.sizes : [{ sizeMl: 50, price: 0 }]
  );

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateSize(index: number, field: keyof ProductSize, value: number) {
    setSizes((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  }

  function addSize() {
    setSizes((prev) => [...prev, { sizeMl: 0, price: 0 }]);
  }

  function removeSize(index: number) {
    setSizes((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadProductImage(file);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
      setError("Image upload failed. Check Firebase Storage configuration.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const cleanedSizes = sizes
      .map((s) => ({ sizeMl: Number(s.sizeMl), price: Number(s.price) }))
      .filter((s) => s.sizeMl > 0 && s.price >= 0);

    if (!name.trim()) return setError("Product name is required.");
    if (cleanedSizes.length === 0)
      return setError("Add at least one valid size with a price.");

    setSaving(true);
    try {
      await onSave({
        name: name.trim(),
        category,
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        oilColor,
        sizes: cleanedSizes,
        isFeatured,
      });
    } catch (err) {
      console.error(err);
      setError("Could not save product. Please try again.");
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card"
    >
      <h3 className="font-serif text-xl font-600 text-ink">
        {initial ? "Edit product" : "Add product"}
      </h3>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label">Name</label>
          <input
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Oud Royal"
            required
          />
        </div>

        <div>
          <label className="label">Category</label>
          <select
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink/80">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            Show on home page (featured)
          </label>
        </div>

        {/* Oil colour — tints the 3D / 2D bottle preview */}
        <div className="sm:col-span-2">
          <label className="label">Perfume oil colour</label>
          <div className="flex items-center gap-4">
            <div className="h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-sand to-cream">
              <BottleSilhouette oilColor={oilColor} className="h-full w-full" />
            </div>
            <input
              type="color"
              value={oilColor}
              onChange={(e) => setOilColor(e.target.value)}
              className="h-10 w-16 cursor-pointer rounded border border-ink/15 bg-white"
              aria-label="Oil colour"
            />
            <input
              className="input-field max-w-[10rem]"
              value={oilColor}
              onChange={(e) => setOilColor(e.target.value)}
              placeholder="#c9a24b"
            />
            <span className="text-xs text-ink/50">
              Sets the liquid colour customers see in the bottle.
            </span>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="label">Description</label>
          <textarea
            className="input-field resize-none"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the scent, notes, and feel…"
          />
        </div>

        {/* Image */}
        <div className="sm:col-span-2">
          <label className="label">Product image</label>
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-sand">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-ink/40">
                  None
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="block w-full text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-charcoal"
              />
              {uploading && (
                <p className="mt-2 flex items-center gap-2 text-xs text-ink/50">
                  <Spinner className="h-4 w-4" /> Uploading…
                </p>
              )}
              <input
                className="input-field mt-2 text-xs"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="…or paste an image URL"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="mt-5">
        <label className="label">Sizes &amp; prices</label>
        <div className="space-y-2">
          {sizes.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  min={0}
                  className="input-field pr-10"
                  value={s.sizeMl || ""}
                  onChange={(e) =>
                    updateSize(i, "sizeMl", Number(e.target.value))
                  }
                  placeholder="Size"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink/40">
                  ml
                </span>
              </div>
              <input
                type="number"
                min={0}
                className="input-field flex-1"
                value={s.price || ""}
                onChange={(e) => updateSize(i, "price", Number(e.target.value))}
                placeholder="Price"
              />
              <button
                type="button"
                onClick={() => removeSize(i)}
                className="rounded-lg px-3 py-2 text-ink/40 hover:text-red-600"
                aria-label="Remove size"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addSize}
          className="mt-2 text-sm font-medium text-accent-dark hover:underline"
        >
          + Add size
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-5 flex gap-3">
        <button type="submit" disabled={saving} className="btn-accent">
          {saving ? <Spinner className="h-4 w-4" /> : "Save product"}
        </button>
        <button type="button" onClick={onCancel} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
