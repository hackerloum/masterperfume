"use client";

import Image from "next/image";
import Bottle3D from "./Bottle3D";
import type { BottleStyleId } from "@/types";

/**
 * Renders a bottle preview, preferring an uploaded photo. Falls back to the
 * interactive 3D bottle (custom GLB or built-in shape) when no photo is set.
 */
export default function BottlePreview({
  imageUrl,
  baseStyle,
  modelUrl,
  oilColor,
  sizeMl,
  name,
}: {
  imageUrl?: string;
  baseStyle: BottleStyleId;
  modelUrl?: string;
  oilColor: string;
  sizeMl: number;
  name?: string;
}) {
  if (imageUrl) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-cream shadow-card">
        <Image
          src={imageUrl}
          alt={name ?? "Bottle"}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-6"
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
