/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Core brand palette (unchanged)
        oxblood: {
          DEFAULT: "#9E2B2A",
          deep: "#7C1F1E",
          light: "#B03A3A",
        },
        cream: {
          DEFAULT: "#FAF5F1",
          deep: "#F1E6DD",
        },
        rose: "#E8DAD2",
        clay: "#CFB0A6",
        sand: "#D9BFB0",
        stone: "#DAD1C9",
        ink: {
          DEFAULT: "#241A18",
          soft: "#5C4B45",
        },
        charcoal: "#121212",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: [
          "clamp(2.75rem, 1.6rem + 5.2vw, 5.75rem)",
          { lineHeight: "0.98", letterSpacing: "-0.03em" },
        ],
        headline: [
          "clamp(2rem, 1.2rem + 3.4vw, 3.75rem)",
          { lineHeight: "1.03", letterSpacing: "-0.025em" },
        ],
        title: [
          "clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem)",
          { lineHeight: "1.12", letterSpacing: "-0.02em" },
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      maxWidth: {
        container: "82rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(36,26,24,0.04), 0 12px 32px -12px rgba(36,26,24,0.14)",
        lift: "0 2px 4px rgba(36,26,24,0.05), 0 28px 60px -24px rgba(124,31,30,0.32)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
