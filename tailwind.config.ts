import type { Config } from "tailwindcss";

/**
 * Master Perfume — bright & minimal theme.
 * White-dominant with a single sage-green accent. To change the accent, edit
 * the `accent` values below (it's the only brand color used across the site).
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f0f0f", // primary text / near-black
        charcoal: "#4b4b4b", // secondary text
        accent: {
          DEFAULT: "#2f7d63", // sage green
          light: "#e7f2ed", // light tint for backgrounds
          dark: "#225f4a", // hover / darker
        },
        cream: "#f6f6f4", // subtle light-gray section background
        sand: "#ececea", // image placeholder background
      },
      fontFamily: {
        // Display headings use Manrope; body uses Inter.
        serif: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -16px rgba(0,0,0,0.12)",
        "card-hover": "0 2px 4px rgba(0,0,0,0.05), 0 18px 40px -20px rgba(0,0,0,0.18)",
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
