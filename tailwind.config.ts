import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#08090B",
          900: "#0D0F13",
          850: "#11141A",
          800: "#171A22",
        },
        warm: "#F4F1E8",
        violet: {
          300: "#C6B7FF",
          400: "#A78BFA",
          500: "#815BFF",
          600: "#6940F2",
        },
        acid: "#B7FF3C",
        ember: "#FF5A36",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(129,91,255,.28), 0 24px 90px rgba(51,31,116,.28)",
        acid: "0 0 24px rgba(183,255,60,.18)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at 72% 38%, rgba(129,91,255,.18), transparent 38%), radial-gradient(circle at 10% 70%, rgba(183,255,60,.06), transparent 30%)",
      },
      animation: {
        "grid-drift": "grid-drift 18s linear infinite",
        "scan-line": "scan-line 2.4s ease-in-out infinite",
        pulseSoft: "pulse-soft 2.8s ease-in-out infinite",
      },
      keyframes: {
        "grid-drift": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "64px 64px" },
        },
        "scan-line": {
          "0%, 100%": { transform: "translateY(-12px)", opacity: "0" },
          "12%, 88%": { opacity: "1" },
          "50%": { transform: "translateY(220px)", opacity: ".7" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: ".45", transform: "scale(.94)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
