/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official Bikinruang Logo Color Palette
        brand: {
          yellow: "#FFC700",       // Primary Atelier Yellow from logo
          "yellow-hover": "#E5B300",
          "yellow-light": "#FFF8DB",
          navy: "#003B6F",         // Primary Workshop Blue/Navy from logo
          "navy-hover": "#002C54",
          "navy-light": "#E8F1F8",
          steel: "#165A96",        // Facet Blue highlight from logo
          dark: "#111111",         // Primary typography black
        },
        // Workshop Base System
        workshop: {
          black: "#111111",
          card: "#181818",
          border: "#282828",
          muted: "#1F1F1F",
          navy: "#003B6F",
        },
        studio: {
          white: "#F8F7F4",
          card: "#FFFFFF",
          border: "#E7E5E0",
          muted: "#EFECE6",
        },
        concrete: {
          DEFAULT: "#8E8E8A",
          light: "#B8B8B4",
          dark: "#5A5A56",
        },
        // Accent Aliases for smooth compatibility
        signal: {
          orange: "#FFC700",       // Replaced with Atelier Yellow
          hover: "#E5B300",
          light: "#FFF8DB",
        },
        electric: {
          blue: "#003B6F",         // Replaced with Atelier Navy
          hover: "#002C54",
          light: "#E8F1F8",
        },
        acid: {
          lime: "#FFC700",         // Accent highlights now Atelier Yellow
          dark: "#E5B300",
        },
      },
      fontFamily: {
        display: ["var(--font-geist-sans)", "sans-serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
