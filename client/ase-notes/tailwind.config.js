/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'wide': '1950px',
        'desktop': {'max': '1440px',},
        'laptop': {'max': '1200px',},
        'm-tablet': {'max': '990px',},
        'tablet': {'max': '640px',},
        'mobile': {'max': '380px',},
      },
      colors: {
        'main-pink': '#F875AA',
        'baby-pink': '#FFDFDF',
        'baby-blue': '#AEDEFC',
        'baby-purple': '#D8B4F8',
        'background': '#FFF6F6',
        'dark-purple': '#49108B',
        'main-text':'#000000',

      },
      boxShadow: {
        'nav': '-2px -20px 9px 16px #49108B',
        'footer': '2px 20px 9px 16px #49108B'
      }
    },
  },
  plugins: [],
}

