import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Extracted from the reference build
        canvas: "#f7f3ec",
        surface: "#f5f1e9",
        rail: "rgba(250,248,243,0.94)",
        panel: "rgba(246,242,234,0.92)",
        card: "#fbfaf6",
        composer: "rgba(255,253,248,0.94)",
        bubble: "#e9e3d9",
        ink: "#25221f",
        "ink-soft": "#514c46",
        "ink-faint": "#8d847a",
        line: "#cec5b9",
        "line-strong": "#c6bbaf",
        "line-input": "#bdb2a6",
        accent: "#f28a55",
        "accent-deep": "#8f3212",
        success: "#185b3a",
      },
      borderRadius: {
        card: "16px",
        composer: "18px",
      },
      boxShadow: {
        rail: "14px 0 34px rgba(69,53,37,0.043)",
        composer: "0 24px 60px rgba(74,53,33,0.16)",
        artifact: "0 24px 65px rgba(75,55,36,0.12)",
        bubble: "0 8px 22px rgba(76,58,40,0.05)",
      },
      letterSpacing: {
        tightest: "-0.06em",
        body: "-0.012em",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
