"use client";

import dynamic from "next/dynamic";
import Spinner from "../Spinner";
import type { BottleStyleId } from "@/types";

/**
 * Lazy-loaded WebGL bottle preview. The three.js scene is only fetched on the
 * client (ssr: false) and code-split out of the main bundle, so the rest of the
 * site stays fast. Renders an uploaded GLB model when available, otherwise a
 * built-in procedural bottle.
 */
const Bottle3DScene = dynamic(() => import("./Bottle3DScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  ),
});

export default function Bottle3D({
  baseStyle,
  modelUrl,
  oilColor,
  sizeMl,
  className = "",
}: {
  baseStyle: BottleStyleId;
  modelUrl?: string;
  oilColor: string;
  sizeMl: number;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-3xl bg-gradient-to-br from-sand via-cream to-white shadow-card ${className}`}
    >
      <Bottle3DScene
        baseStyle={baseStyle}
        modelUrl={modelUrl}
        oilColor={oilColor}
        sizeMl={sizeMl}
      />

      {/* Size badge */}
      <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold text-white">
        {sizeMl}ml
      </span>

      {/* Rotate hint */}
      <span className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[0.7rem] font-medium uppercase tracking-wider text-ink/40">
        Drag to rotate · what you’ll receive
      </span>
    </div>
  );
}
