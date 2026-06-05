/**
 * Procedural bottle profiles for the 3D preview.
 *
 * Each bottle is a glass silhouette revolved around the Y axis (THREE.LatheGeometry).
 * We only describe the right-half outline as [radius, height] control points,
 * plus the liquid fill height and a cap description. No external 3D model files
 * are needed, so the bottles stay tiny and fully data-driven.
 */
import type { BottleStyleId } from "@/types";

/** [radius, y] control point, bottom (y=0) to top. */
export type ProfilePoint = [number, number];

export type CapSpec =
  | { type: "screw"; r: number; h: number; color: string }
  | {
      type: "roller";
      collarR: number;
      collarH: number;
      capR: number;
      capH: number;
      color: string;
    }
  | {
      type: "spray";
      collarR: number;
      collarH: number;
      stemR: number;
      stemH: number;
      color: string;
    }
  | { type: "flask"; r: number; h: number; knobR: number; color: string };

export interface BottleProfile {
  /** Glass outer wall outline, bottom to top. */
  wall: ProfilePoint[];
  /** Liquid surface height (oil fills from y=0 up to this). */
  fillTopY: number;
  /** Top of the glass neck where the cap sits. */
  neckTopY: number;
  cap: CapSpec;
  /** Total unscaled height incl. cap — used to vertically centre the model. */
  totalHeight: number;
}

const DARK_CAP = "#23211d"; // matte charcoal
const GOLD_CAP = "#c9a24b"; // gold accent

const profiles: Record<BottleStyleId, BottleProfile> = {
  // Slim, tall roller bottle.
  rollon: {
    wall: [
      [0.001, 0],
      [0.26, 0],
      [0.28, 0.08],
      [0.28, 1.55],
      [0.26, 1.66],
      [0.12, 1.78],
      [0.12, 1.98],
    ],
    fillTopY: 1.5,
    neckTopY: 1.98,
    cap: {
      type: "roller",
      collarR: 0.14,
      collarH: 0.1,
      capR: 0.16,
      capH: 0.36,
      color: DARK_CAP,
    },
    totalHeight: 2.44,
  },

  // Cylindrical body with a pump-spray actuator.
  spray: {
    wall: [
      [0.001, 0],
      [0.38, 0],
      [0.4, 0.1],
      [0.4, 1.35],
      [0.36, 1.5],
      [0.16, 1.66],
      [0.16, 1.82],
    ],
    fillTopY: 1.3,
    neckTopY: 1.82,
    cap: {
      type: "spray",
      collarR: 0.2,
      collarH: 0.12,
      stemR: 0.12,
      stemH: 0.34,
      color: DARK_CAP,
    },
    totalHeight: 2.4,
  },

  // Wide, rounded decorative flask.
  flask: {
    wall: [
      [0.001, 0],
      [0.46, 0.04],
      [0.54, 0.45],
      [0.54, 1.05],
      [0.46, 1.35],
      [0.2, 1.55],
      [0.2, 1.72],
    ],
    fillTopY: 1.25,
    neckTopY: 1.72,
    cap: {
      type: "flask",
      r: 0.24,
      h: 0.34,
      knobR: 0.12,
      color: GOLD_CAP,
    },
    totalHeight: 2.18,
  },

  // Plain screw-cap decant vial.
  decant: {
    wall: [
      [0.001, 0],
      [0.3, 0],
      [0.31, 0.08],
      [0.31, 1.45],
      [0.29, 1.55],
      [0.17, 1.66],
      [0.17, 1.86],
    ],
    fillTopY: 1.42,
    neckTopY: 1.86,
    cap: { type: "screw", r: 0.19, h: 0.3, color: DARK_CAP },
    totalHeight: 2.16,
  },
};

export function getBottleProfile(style: BottleStyleId): BottleProfile {
  return profiles[style] ?? profiles.decant;
}

/**
 * Liquid outline: follow the glass wall (slightly inset) from the base up to the
 * fill height, then close across to the axis to form the liquid surface.
 */
export function buildLiquidPoints(
  profile: BottleProfile,
  inset = 0.03
): ProfilePoint[] {
  const pts: ProfilePoint[] = [];
  for (const [r, y] of profile.wall) {
    if (y <= profile.fillTopY) {
      pts.push([Math.max(0.001, r - inset), y]);
    }
  }
  // Interpolate the wall radius at the fill height for a clean surface edge.
  const radiusAtFill = radiusAt(profile.wall, profile.fillTopY) - inset;
  pts.push([Math.max(0.001, radiusAtFill), profile.fillTopY]);
  pts.push([0.001, profile.fillTopY]); // close to the central axis
  return pts;
}

/** Linear-interpolate the wall radius at an arbitrary height y. */
function radiusAt(wall: ProfilePoint[], y: number): number {
  for (let i = 0; i < wall.length - 1; i++) {
    const [r1, y1] = wall[i];
    const [r2, y2] = wall[i + 1];
    if (y >= y1 && y <= y2 && y2 !== y1) {
      const t = (y - y1) / (y2 - y1);
      return r1 + (r2 - r1) * t;
    }
  }
  return wall[wall.length - 1][0];
}

/**
 * Visual scale from volume. Uses the cube root of the ml ratio so a 6ml bottle
 * looks meaningfully smaller than a 50ml without extreme differences.
 */
export function sizeScale(sizeMl: number): number {
  const s = Math.cbrt(sizeMl / 50);
  return Math.min(1.35, Math.max(0.5, s));
}
