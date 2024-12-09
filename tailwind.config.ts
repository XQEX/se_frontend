import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {Config} */
const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#1a1a1a",
        gold: "#FFD700",
        white: "#FFFFFF",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [forms, typography],
};

export default config;
