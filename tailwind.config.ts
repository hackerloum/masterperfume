import type { Config } from "tailwindcss";

/**
 * Master Perfume — gold & black brand.
 * Marketplace layout (Amazon / Alibaba / eBay): black chrome, gold CTAs,
 * white content. Gold is the logo metal, not a luxury wash.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        charcoal: "#3d3d3d",
        accent: {
          DEFAULT: "#C9A227",
          light: "#F4E9C4",
          dark: "#9A7A12",
        },
        cream: "#f4f4f4",
        sand: "#ececec",
      },
      fontFamily: {
        serif: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.08)",
        "card-hover": "0 2px 8px rgba(0,0,0,0.14)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-soft": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        marquee: "marquee 22s linear infinite",
        float: "float 4s ease-in-out infinite",
        "pulse-soft": "pulse-soft 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
