/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dce8ff",
          200: "#b8d0ff",
          300: "#8fb3ff",
          400: "#5f8eff",
          500: "#3366ff",
          600: "#234ed1",
          700: "#1a3aa3",
          800: "#162c79",
          900: "#0f1d52",
        },
        income: "#16a34a",
        expense: "#e11d48",
        cashback: "#16a34a",
        surface: "#ffffff",
        canvas: "#f6f8fc",
        ink: {
          900: "#0f172a",
          700: "#334155",
          500: "#64748b",
          300: "#cbd5e1",
        },
      },
      fontFamily: {
        display: ["'Sora'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -8px rgba(15, 23, 42, 0.08)",
        cardHover: "0 4px 12px rgba(15, 23, 42, 0.06), 0 16px 32px -12px rgba(15, 23, 42, 0.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
