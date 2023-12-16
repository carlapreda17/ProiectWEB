/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-pink': '#F875AA',
        'baby-pink': '#FFDFDF',
        'baby-blue': '#AEDEFC',
        'background': '#FFF6F6',
        'dark-purple': '#49108B',
        'main-text':'#00000'

      }
    },
  },
  plugins: [],
}

