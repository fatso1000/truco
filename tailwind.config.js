/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: true,
  themes: ["dark", "light", "cupcake"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
