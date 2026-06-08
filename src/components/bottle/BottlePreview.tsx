"use client";

import Image from "next/image";
import Bottle3D from "./Bottle3D";
import { getBackdrop } from "./bottleBackdrops";
import type { BottleStyleId } from "@/types";

/**
 * Renders a bottle preview, preferring an uploaded (ideally background-removed)
 * photo presented on a styled backdrop scene. Falls back to the interactive 3D
 * bottle (custom GLB or built-in shape) when no photo is set.
 */
export default function BottlePreview({
  imageUrl,
  baseStyle,
  modelUrl,
  oilColor,
  sizeMl,
  name,
  backdrop: backdropId,
}: {
  imageUrl?: string;
  baseStyle: BottleStyleId;
  modelUrl?: string;
  oilColor: string;
  sizeMl: number;
  name?: string;
  backdrop?: string;
}) {
  if (imageUrl) {
    const backdrop = getBackdrop(backdropId);
    return (
      <div
        className={`relative aspect-square w-full overflow-hidden rounded-3xl shadow-card ${backdrop.className}`}
      >
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
      </div>
    );
  }

  return (
    <Bottle3D
      baseStyle={baseStyle}
      modelUrl={modelUrl}
      oilColor={oilColor}
      sizeMl={sizeMl}
    />
  );
}
