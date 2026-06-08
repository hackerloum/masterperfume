"use client";

import { useState } from "react";
import Spinner from "../Spinner";
import Bottle3D from "../bottle/Bottle3D";
import { uploadBottleModel } from "@/lib/bottles";
import {
  BOTTLE_BASE_SHAPES,
  type Bottle,
  type BottleInput,
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
  const [modelUrl, setModelUrl] = useState(initial?.modelUrl ?? "");
  const [sizesMl, setSizesMl] = useState<number[]>(initial?.sizesMl ?? []);
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);
  const [newSize, setNewSize] = useState("");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function addSize() {
    const ml = Number(newSize);
    if (ml > 0 && !sizesMl.includes(ml)) {
      setSizesMl((prev) => [...prev, ml].sort((a, b) => a - b));
    }
    setNewSize("");
  }

  function removeSize(ml: number) {
    setSizesMl((prev) => prev.filter((s) => s !== ml));
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
    if (sizesMl.length === 0)
      return setError("Add at least one size (ml) for this bottle.");

    setSaving(true);
    try {
      await onSave({
        name: name.trim(),
        hint: hint.trim(),
        baseStyle,
        modelUrl: modelUrl.trim(),
        sizesMl,
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

          <div>
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
              Used for the preview until a custom 3D model is uploaded.
            </p>
          </div>

          {/* Mills */}
          <div>
            <label className="label">Available sizes (ml)</label>
            <div className="flex flex-wrap gap-2">
              {sizesMl.map((ml) => (
                <span
                  key={ml}
                  className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-sm text-ink"
                >
                  {ml}ml
                  <button
                    type="button"
                    onClick={() => removeSize(ml)}
                    className="text-ink/40 hover:text-red-600"
                    aria-label={`Remove ${ml}ml`}
                  >
                    ✕
                  </button>
                </span>
              ))}
              {sizesMl.length === 0 && (
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
          <Bottle3D
            baseStyle={baseStyle}
            modelUrl={modelUrl || undefined}
            oilColor="#c9a24b"
            sizeMl={sizesMl[0] ?? 50}
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
