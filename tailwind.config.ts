import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: "#0B0E1A",
          DEFAULT: "#111827",
          light: "#1E2640",
          card: "#161D30",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8C87A",
          dim: "#8B6F2E",
        },
        mystic: {
          white: "#F5F0E8",
          dim: "#9B9587",
          star: "#7B9FD4",
          purple: "#9B7FD4",
        },
      },
      fontFamily: {
        serif: ['"Noto Serif JP"', "serif"],
        sans: ['"Noto Sans JP"', "sans-serif"],
      },
      backgroundImage: {
        "mystic-gradient":
          "radial-gradient(ellipse at top, #1E2640 0%, #0B0E1A 60%)",
        "gold-shimmer":
          "linear-gradient(135deg, #C9A84C, #E8C87A, #C9A84C)",
        "card-gradient": "linear-gradient(145deg, #161D30, #111827)",
      },
      boxShadow: {
        gold: "0 0 20px rgba(201,168,76,0.3), 0 4px 20px rgba(0,0,0,0.5)",
        "gold-lg":
          "0 0 40px rgba(201,168,76,0.4), 0 8px 32px rgba(0,0,0,0.6)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "star-fall": "starFall 4s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        reveal: "reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201,168,76,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(201,168,76,0.5)" },
        },
        starFall: {
          from: { transform: "translateY(-20px)", opacity: "0" },
          "10%": { opacity: "1" },
          to: { transform: "translateY(110vh)", opacity: "0" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
        reveal: {
          from: { opacity: "0", transform: "translateY(40px) scale(0.96)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
