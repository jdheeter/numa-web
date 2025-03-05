// tailwind.config.ts update
import type { Config } from "tailwindcss"

export default <Partial<Config>>{
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: "#6366F1", // Modern Indigo
        secondary: "#A855F7", // Soft Purple
        accent: "#14B8A6", // Teal
        background: "#F8FAFC", // Light Grayish Blue
        darkBackground: "#1e293b", // Dark mode background
        foreground: "#1E293B", // Dark Slate
        muted: "#94A3B8", // Muted Text
        border: "#E2E8F0", // Soft Borders
      },
      fontFamily: {
        sans: ["PolySans Median", "Inter", "sans-serif"],
        slim: ["PolySans Slim", "sans-serif"],
        heading: ["PolySans Median", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 4px 6px rgba(0, 0, 0, 0.05)",
        medium: "0 6px 12px rgba(0, 0, 0, 0.1)",
        strong: "0 8px 16px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"), require("@tailwindcss/aspect-ratio")],
}
