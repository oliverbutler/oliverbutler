module.exports = {
  content: {
    files: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
  },
  darkMode: "class",
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
