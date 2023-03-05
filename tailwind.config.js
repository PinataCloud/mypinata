/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      height: {
        '75': '75vh',
      }
    },
  },
  plugins: [
    require('tailwindcss-font-inter')
  ],
}
