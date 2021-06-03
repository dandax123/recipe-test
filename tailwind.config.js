// tailwind.config.js
const colors = require("tailwindcss/colors")
module.exports = {
  mode: "jit",
  purge: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#f96332",
      secondary: {
        100: "#E2E2D5",
        200: "#888883",
      },
      danger: "#e3342f",
    }),
    extend: {
      colors: {
        primary: "#f96332",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
