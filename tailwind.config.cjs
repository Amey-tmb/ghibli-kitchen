/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cream: "#fdf5e6",
        sage: "#c9d8c5",
        cocoa: "#b08968",
        "cocoa-dark": "#5e4632",
        // Dark mode colors
        "dark-cream": "#1a1a1a",
        "dark-sage": "#4a5d4a",
        "dark-cocoa": "#d4a574",
        "dark-cocoa-dark": "#f5e6d3",
      },
      fontFamily: {
        display: ['var(--font-display, "DM Serif Display")', "serif"],
        handwritten: ['var(--font-handwritten, "Courgette")', "cursive"],
        sans: ['"Inter"', "sans-serif"],
        serif: ['"Playfair Display"', "serif"],
      },
      boxShadow: {
        soft: "0 18px 35px rgba(0, 0, 0, 0.08)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(12px) scale(0.98)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        "soft-pop": {
          "0%": { opacity: 0, transform: "scale(0.9) translateY(10px)" },
          "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 rgba(255, 255, 255, 0)" },
          "50%": { boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 600ms ease-out",
        "fade-in-up-delayed": "fade-in-up 800ms ease-out 80ms both",
        "soft-pop": "soft-pop 260ms ease-out",
        "glow-pulse": "glow-pulse 2000ms ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

