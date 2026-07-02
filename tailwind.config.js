/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        paper: {
          50: "#fdfcf9",
          100: "#fafaf7",
          200: "#f3efe6",
          300: "#e8e3d6",
          400: "#cfc8b8",
          500: "#a8a192",
        },
        ink: {
          50: "#7a7368",
          100: "#5a5448",
          200: "#3a3530",
          300: "#2a2620",
          400: "#1a1a1a",
        },
        sakura: {
          200: "#f4d4d8",
          400: "#e8b4b8",
          600: "#c98a90",
        },
        mist: {
          200: "#d4dde6",
          400: "#b8c9d8",
          600: "#8aa0b4",
        },
        matcha: {
          200: "#d4dcc8",
          400: "#b8c4a0",
          600: "#8a9870",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        serif: ['"Noto Serif SC"', "Georgia", "serif"],
        sans: ['"Noto Sans SC"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "Menlo", "monospace"],
      },
      boxShadow: {
        paper: "0 4px 16px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)",
        "paper-lg": "0 12px 36px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)",
        "paper-hover": "0 16px 48px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
