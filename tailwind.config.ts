import type { Config } from "tailwindcss";

/**
 * Master Perfume brand palette.
 * Luxury but clean: black, gold, cream/light wood, white.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0d0d0d", // near-black for text & dark sections
        charcoal: "#1a1a1a",
        gold: {
          DEFAULT: "#c9a24b", // primary gold accent
          light: "#e2c987",
          dark: "#a9842f",
        },
        cream: "#f7f1e6", // light wood / cream background
        sand: "#efe6d4",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 6px 24px -8px rgba(0,0,0,0.18)",
        "card-hover": "0 14px 40px -10px rgba(0,0,0,0.28)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
