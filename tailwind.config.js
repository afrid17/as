/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '300px',
      'md': '765px',
      'lg': '1023px',
      'xl':'1300px'
    },
    extend: {},
  },
  plugins: [],
}