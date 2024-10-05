/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#13191c",
        blue1: "#72d5d9",
        blue2: "#56a3a6",
        blue3: "#4f6d7a",
      },
    },
  },
  plugins: [],
};
