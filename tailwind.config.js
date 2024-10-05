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
        background: "#202020",
        green1: "#212922",
        green2: "#294936",
        green3: "#3E6259",
        green4: "#5B8266",
        green5: "#AEF6C7",
      },
    },
  },
  plugins: [],
};
