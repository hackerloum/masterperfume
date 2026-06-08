"use client";

import { useState } from "react";
import Spinner from "../Spinner";
import BottlePreview from "../bottle/BottlePreview";
import { uploadBottleImage, uploadBottleModel } from "@/lib/bottles";
import {
  BOTTLE_BASE_SHAPES,
  type Bottle,
  type BottleInput,
  type BottleSize,
  type BottleStyleId,
} from "@/types";

interface Props {
  initial?: Bottle;
  onSave: (input: BottleInput) => Promise<void>;
  onCancel: () => void;
}

/** Add / edit a bottle: name, base shape, available mills, and optional GLB. */
export default function BottleForm({ initial, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [hint, setHint] = useState(initial?.hint ?? "");
  const [baseStyle, setBaseStyle] = useState<BottleStyleId>(
    initial?.baseStyle ?? "decant"
  );
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [modelUrl, setModelUrl] = useState(initial?.modelUrl ?? "");
  const [sizes, setSizes] = useState<BottleSize[]>(initial?.sizes ?? []);
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);
  const [newSize, setNewSize] = useState("");

  const [uploadingImg, setUploadingImg] = useState(false);
  const [uploadingSize, setUploadingSize] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function addSize() {
    const ml = Number(newSize);
    if (ml > 0 && !sizes.some((s) => s.ml === ml)) {
      setSizes((prev) =>
        [...prev, { ml, imageUrl: "" }].sort((a, b) => a.ml - b.ml)
      );
    }
    setNewSize("");
  }

  function removeSize(ml: number) {
    setSizes((prev) => prev.filter((s) => s.ml !== ml));
  }

  /** Upload a photo for a specific size (ml). */
  async function handleSizeImage(
    ml: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingSize(ml);
    setError("");
    try {
      const url = await uploadBottleImage(file);
      setSizes((prev) =>
        prev.map((s) => (s.ml === ml ? { ...s, imageUrl: url } : s))
      );
    } catch (err) {
      console.error(err);
      setError("Photo upload failed. Check Firebase Storage configuration.");
    } finally {
      setUploadingSize(null);
    }
  }

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    setError("");
    try {
      const url = await uploadBottleImage(file);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
      setError("Photo upload failed. Check Firebase Storage configuration.");
    } finally {
      setUploadingImg(false);
    }
  }

  async function handleModel(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadBottleModel(file);
      setModelUrl(url);
    } catch (err) {
      console.error(err);
      setError("Model upload failed. Check Firebase Storage configuration.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Bottle name is required.");
    if (sizes.length === 0)
      return setError("Add at least one size (ml) for this bottle.");

    setSaving(true);
    try {
      await onSave({
        name: name.trim(),
        hint: hint.trim(),
        baseStyle,
        imageUrl: imageUrl.trim(),
        modelUrl: modelUrl.trim(),
        sizes,
        isActive,
      });
    } catch (err) {
      console.error(err);
      setError("Could not save bottle. Please try again.");
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card"
    >
      <h3 className="font-serif text-xl font-600 text-ink">
        {initial ? "Edit bottle" : "Add bottle"}
      </h3>

      <div className="mt-4 grid gap-5 lg:grid-cols-2">
        {/* Left: fields */}
        <div className="space-y-4">
          <div>
            <label className="label">Bottle name</label>
            <input
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Roll-on"
              required
            />
          </div>

          <div>
            <label className="label">Short hint (optional)</label>
            <input
              className="input-field"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="e.g. Slim roller bottle"
            />
          </div>

          {/* Default bottle photo (recommended) */}
          <div>
            <label className="label">Default bottle photo (recommended)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="block w-full text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-accent-dark"
            />
            {uploadingImg && (
              <p className="mt-2 flex items-center gap-2 text-xs text-ink/50">
                <Spinner className="h-4 w-4" /> Uploading photo…
              </p>
            )}
            {imageUrl && (
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="rounded bg-green-50 px-2 py-1 text-green-700">
                  Photo attached
                </span>
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="text-ink/50 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            )}
            <p className="mt-1 text-xs text-ink/50">
              Upload a <strong>transparent PNG</strong> (background removed) of
              the real bottle. The site presents it on different backdrops so
              customers see exactly what they get.
            </p>
          </div>

          <div className="border-t border-ink/10 pt-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink/40">
              Or use a 3D bottle (when no photo)
            </p>
            <label className="label">Base 3D shape</label>
            <select
              className="input-field"
              value={baseStyle}
              onChange={(e) => setBaseStyle(e.target.value as BottleStyleId)}
            >
              {BOTTLE_BASE_SHAPES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-ink/50">
              Used only when no photo (and no custom model) is set.
            </p>
          </div>

          {/* Sizes (mills) — each can carry its own photo */}
          <div>
            <label className="label">Available sizes (ml) &amp; per-size photo</label>
            <div className="space-y-2">
              {sizes.map((s) => (
                <div
                  key={s.ml}
                  className="flex items-center gap-3 rounded-lg border border-ink/10 bg-cream/50 p-2"
                >
                  {/* Thumbnail */}
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white">
                    {s.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={s.imageUrl}
                        alt={`${s.ml}ml`}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[0.6rem] text-ink/40">
                        no photo
                      </div>
                    )}
                  </div>

                  <span className="w-14 shrink-0 text-sm font-medium text-ink">
                    {s.ml}ml
                  </span>

                  <label className="flex-1 cursor-pointer text-xs text-accent-dark hover:underline">
                    {uploadingSize === s.ml ? (
                      <span className="flex items-center gap-2 text-ink/50">
                        <Spinner className="h-4 w-4" /> Uploading…
                      </span>
                    ) : s.imageUrl ? (
                      "Replace photo"
                    ) : (
                      "Upload photo for this size"
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleSizeImage(s.ml, e)}
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => removeSize(s.ml)}
                    className="shrink-0 px-2 text-ink/40 hover:text-red-600"
                    aria-label={`Remove ${s.ml}ml`}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {sizes.length === 0 && (
                <span className="text-sm text-ink/40">No sizes added yet.</span>
              )}
            </div>
            <div className="mt-2 flex gap-2">
              <input
                type="number"
                min={1}
                className="input-field max-w-[8rem]"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSize();
                  }
                }}
                placeholder="e.g. 50"
              />
              <button
                type="button"
                onClick={addSize}
                className="btn-outline px-4 py-2 text-sm"
              >
                Add ml
              </button>
            </div>
            <p className="mt-1 text-xs text-ink/50">
              Add a photo per size if that mill uses a different bottle. Sizes
              without their own photo fall back to the default photo above.
              Customers only see a size if the perfume is also priced for it.
            </p>
          </div>

          {/* GLB model */}
          <div>
            <label className="label">Custom 3D model (.glb)</label>
            <input
              type="file"
              accept=".glb,.gltf,model/gltf-binary"
              onChange={handleModel}
              className="block w-full text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-charcoal"
            />
            {uploading && (
              <p className="mt-2 flex items-center gap-2 text-xs text-ink/50">
                <Spinner className="h-4 w-4" /> Uploading model…
              </p>
            )}
            {modelUrl && (
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="rounded bg-green-50 px-2 py-1 text-green-700">
                  Model attached
                </span>
                <button
                  type="button"
                  onClick={() => setModelUrl("")}
                  className="text-ink/50 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            )}
            <p className="mt-1 text-xs text-ink/50">
              Export as GLB from Meshy, then upload here. Leave empty to use the
              built-in shape.
            </p>
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink/80">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            Active (shown to customers)
          </label>
        </div>

        {/* Right: live preview */}
        <div>
          <label className="label">Preview</label>
          <BottlePreview
            imageUrl={sizes[0]?.imageUrl || imageUrl || undefined}
            baseStyle={baseStyle}
            modelUrl={modelUrl || undefined}
            oilColor="#c9a24b"
            sizeMl={sizes[0]?.ml ?? 50}
            name={name}
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-5 flex gap-3">
        <button type="submit" disabled={saving} className="btn-accent">
          {saving ? <Spinner className="h-4 w-4" /> : "Save bottle"}
        </button>
        <button type="button" onClick={onCancel} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
