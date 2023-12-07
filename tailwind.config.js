/** @type {import('tailwindcss').Config} */
// tailwind.config.js
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
        "vtd-primary": "#d1d5db", // Light mode Datepicker color
        "vtd-secondary": "#d1d5db", // Dark mode Datepicker color
        "accent-yellow": "#6F42C1", // Accent color
        "accent-yellow-light": "#7E56C8", // Accent color light
        "bg-fill": "#8965CD", // Background color
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
