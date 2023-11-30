/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
  ],
  theme: {
    fontFamily: {
      sans: ["Maven Pro", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      fontFamily: {
        maven: ['"Maven Pro"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "vtd-primary": colors.sky, // Light mode Datepicker color
        "vtd-secondary": colors.sky, // Dark mode Datepicker color
        "accent-yellow": "#FFC100", // Accent color
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
