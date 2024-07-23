/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { min: "275px", max: "480px" },
        custom: { min: "481px", max: "1010px" },
      },
    },
  },
  plugins: [],
};
