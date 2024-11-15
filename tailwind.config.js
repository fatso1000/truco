/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: true,
  daisyui: {
    themes: ["retro"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
