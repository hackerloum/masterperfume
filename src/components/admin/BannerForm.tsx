"use client";

import { useState } from "react";
import Image from "next/image";
import Spinner from "../Spinner";
import { uploadBannerImage } from "@/lib/banners";
import type { Banner, BannerInput } from "@/types";

interface Props {
  initial?: Banner;
  onSave: (input: BannerInput) => Promise<void>;
  onCancel: () => void;
}

/** Add / edit a promotional banner shown in the homepage hero carousel. */
export default function BannerForm({ initial, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [subtitle, setSubtitle] = useState(initial?.subtitle ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [link, setLink] = useState(initial?.link ?? "/products");
  const [ctaLabel, setCtaLabel] = useState(initial?.ctaLabel ?? "Shop now");
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      setImageUrl(await uploadBannerImage(file));
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
    if (!imageUrl) return setError("Please upload a banner image.");

    setSaving(true);
    try {
      await onSave({
        title: title.trim(),
        subtitle: subtitle.trim(),
        imageUrl: imageUrl.trim(),
        link: link.trim() || "/products",
        ctaLabel: ctaLabel.trim() || "Shop now",
        isActive,
      });
    } catch (err) {
      console.error(err);
      setError("Could not save banner. Please try again.");
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card"
    >
      <h3 className="font-serif text-xl font-600 text-ink">
        {initial ? "Edit banner" : "Add banner"}
      </h3>
      <p className="mt-1 text-sm text-ink/50">
        Shown in the rotating banner at the top of the homepage. Wide landscape
        images work best (e.g. 1600×700).
      </p>

      <div className="mt-4 grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          {/* Image */}
          <div>
            <label className="label">Banner image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="block w-full text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-accent-dark"
            />
            {uploading && (
              <p className="mt-2 flex items-center gap-2 text-xs text-ink/50">
                <Spinner className="h-4 w-4" /> Uploading…
              </p>
            )}
          </div>

          <div>
            <label className="label">Title</label>
            <input
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. New Season Scents"
            />
          </div>

          <div>
            <label className="label">Subtitle</label>
            <input
              className="input-field"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Up to 20% off bundles this week"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Button link</label>
              <input
                className="input-field"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="/products"
              />
            </div>
            <div>
              <label className="label">Button text</label>
              <input
                className="input-field"
                value={ctaLabel}
                onChange={(e) => setCtaLabel(e.target.value)}
                placeholder="Shop now"
              />
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink/80">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            Active (shown on the homepage)
          </label>
        </div>

        {/* Preview */}
        <div>
          <label className="label">Preview</label>
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-ink">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Banner preview"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-white/40">
                No image yet
              </div>
            )}
            {imageUrl && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center p-5">
                  {title && (
                    <p className="font-serif text-lg font-700 text-white">
                      {title}
                    </p>
                  )}
                  {subtitle && (
                    <p className="mt-1 text-xs text-white/80">{subtitle}</p>
                  )}
                  <span className="mt-3 w-fit rounded-full bg-accent px-3 py-1 text-xs text-white">
                    {ctaLabel || "Shop now"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-5 flex gap-3">
        <button type="submit" disabled={saving} className="btn-accent">
          {saving ? <Spinner className="h-4 w-4" /> : "Save banner"}
        </button>
        <button type="button" onClick={onCancel} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
