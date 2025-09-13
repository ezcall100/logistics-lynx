// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          900: "#1e3a8a"
        },
        secondary: {
          50: "#fdf4ff",
          100: "#fae8ff",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c3aed",
          900: "#581c87"
        },
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        info: "#06b6d4",
        neutral: "#6b7280"
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(2,6,23,0.2)"
      },
      borderRadius: {
        "2xl": "1rem"
      }
    }
  },
  plugins: []
};
