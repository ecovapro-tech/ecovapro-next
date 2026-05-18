import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx,md}",
  ],
  theme: {
    extend: {
      colors: {
        // EcovaPro palette
        green: {
          DEFAULT: "#1F4D3A",
          deep: "#163828",
        },
        mint: {
          DEFAULT: "#B9F2DE",
          bg: "#E8FBF4",
        },
        charcoal: "#111111",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["'Inter'", "'Segoe UI'", "system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        wrap: "1080px",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
