module.exports = {
  purge: {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
      safelist: [],
    },
  },
  darkMode: "class",
  theme: {},
  variants: {
    extend: {},
  },
};
