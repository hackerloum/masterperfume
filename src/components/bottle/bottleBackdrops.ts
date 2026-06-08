/**
 * Backdrop "scenes" used to present a cut-out (transparent) bottle photo in
 * different looks. Pure CSS — no images — so they're instant and consistent.
 */
export interface Backdrop {
  id: string;
  name: string;
  /** Tailwind classes for the scene background. */
  className: string;
  /** True for dark scenes (affects the grounding shadow). */
  dark?: boolean;
}

export const BACKDROPS: Backdrop[] = [
  {
    id: "studio",
    name: "Studio",
    className: "bg-gradient-to-b from-white to-cream",
  },
  {
    id: "soft",
    name: "Soft",
    className: "bg-gradient-to-br from-accent-light via-cream to-white",
  },
  {
    id: "spotlight",
    name: "Spotlight",
    className:
      "bg-[radial-gradient(circle_at_50%_32%,#3d3d3d_0%,#141414_70%)]",
    dark: true,
  },
  {
    id: "warm",
    name: "Warm",
    className: "bg-gradient-to-br from-[#f7efe4] via-[#f1e6d6] to-[#e9dcc7]",
  },
];

export const DEFAULT_BACKDROP = BACKDROPS[0];

export function getBackdrop(id: string | undefined): Backdrop {
  return BACKDROPS.find((b) => b.id === id) ?? DEFAULT_BACKDROP;
}
