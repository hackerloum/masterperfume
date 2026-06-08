"use client";

import Image from "next/image";
import { getBackdrop } from "./bottleBackdrops";

/**
 * Presents a bottle photo (ideally a background-removed PNG) on a styled
 * backdrop scene. Shows a clean placeholder when no photo is set.
 */
export default function BottlePreview({
  imageUrl,
  sizeMl,
  name,
  backdrop: backdropId,
}: {
  imageUrl?: string;
  sizeMl: number;
  name?: string;
  backdrop?: string;
}) {
  const backdrop = getBackdrop(backdropId);

  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-3xl shadow-card ${backdrop.className}`}
    >
      {imageUrl ? (
        <>
          {/* Soft grounding shadow under the bottle */}
          <div
            className={`absolute bottom-[12%] left-1/2 h-6 w-2/5 -translate-x-1/2 rounded-[50%] blur-md ${
              backdrop.dark ? "bg-black/40" : "bg-black/15"
            }`}
          />
          <Image
            src={imageUrl}
            alt={name ?? "Bottle"}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-8"
          />
          <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold text-white">
            {sizeMl}ml
          </span>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <span className="font-serif text-lg text-ink/40">
            {name ?? "Bottle"}
          </span>
          <span className="mt-1 text-xs text-ink/30">No photo yet</span>
        </div>
      )}
    </div>
  );
}
