import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17201a",
        paper: "#f7fbff",
        mist: "#eef7ff",
        line: "#d8e6f8",
        moss: "#16a085",
        river: "#0b5cff",
        cyan: "#11b5c8",
        amber: "#f59e0b",
        clay: "#e05a47",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(21, 50, 92, 0.09)",
        lift: "0 24px 60px rgba(21, 50, 92, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
