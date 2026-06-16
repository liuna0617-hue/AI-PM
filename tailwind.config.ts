import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17201a",
        paper: "#f7f5ef",
        moss: "#3f6f5a",
        river: "#2f6f8f",
        clay: "#b66b4a",
      },
      boxShadow: {
        soft: "0 16px 40px rgba(23, 32, 26, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
