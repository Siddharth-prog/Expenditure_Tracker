/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ===== Core Backgrounds ===== */
        bg: "#0A0F1F",          // main app background
        surface: "#121A33",     // cards / sections
        surfaceHover: "#18224A",
        border: "#263062",
        bgsection: "#393A3F",

        /* ===== Text Colors ===== */
        textPrimary: "#F8FAFF",   // headings
        textSecondary: "#C7D0FF", // body text
        textMuted: "#8A94C8",     // helper / labels

        /* ===== Accent Colors ===== */
        glow: "#2EE6A6",          // primary accent (teal)
        accent: "#4DA3FF",        // secondary accent (blue)
        danger: "#FF6A6A",
        warning: "#FFC857",
        success: "#2EE6A6",
      },

      /* ===== Shadows (Soft, Premium) ===== */
      boxShadow: {
        glow: "0 0 30px rgba(46, 230, 166, 0.25)",
        soft: "0 10px 30px rgba(0,0,0,0.25)",
      },

      /* ===== Animations ===== */
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
