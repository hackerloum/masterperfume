/**
 * Lightweight 2D bottle used on listing cards (no WebGL).
 * The liquid is tinted to the perfume's oil colour so the grid still previews
 * each scent at a glance while staying fast on mobile.
 */
export default function BottleSilhouette({
  oilColor,
  className = "",
}: {
  oilColor: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 140"
      className={className}
      role="img"
      aria-label="Perfume bottle"
    >
      <defs>
        <linearGradient id="glassG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.65" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.08" />
        </linearGradient>
        <clipPath id="bodyClip">
          <path d="M32 52 q-6 4 -6 14 v44 q0 8 8 8 h32 q8 0 8 -8 v-44 q0 -10 -6 -14 z" />
        </clipPath>
      </defs>

      {/* Cap */}
      <rect x="42" y="6" width="16" height="20" rx="2" fill="#23211d" />
      {/* Neck */}
      <rect x="44" y="24" width="12" height="14" fill="#cfcfcf" opacity="0.5" />
      <rect x="40" y="36" width="20" height="8" rx="2" fill="#bdbdbd" opacity="0.5" />

      {/* Liquid fill (tinted) */}
      <g clipPath="url(#bodyClip)">
        <rect x="20" y="78" width="60" height="50" fill={oilColor} />
        <rect x="20" y="78" width="60" height="6" fill={oilColor} opacity="0.6" />
      </g>

      {/* Glass body outline + highlight */}
      <path
        d="M32 52 q-6 4 -6 14 v44 q0 8 8 8 h32 q8 0 8 -8 v-44 q0 -10 -6 -14 z"
        fill="url(#glassG)"
        stroke="#00000022"
        strokeWidth="1"
      />
      {/* Vertical shine */}
      <rect
        x="34"
        y="58"
        width="6"
        height="56"
        rx="3"
        fill="#ffffff"
        opacity="0.45"
      />
    </svg>
  );
}
