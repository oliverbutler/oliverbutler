const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: colors.slate,
        primary: colors.pink,
      },
      accentColor: colors.pink,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
