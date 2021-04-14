const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'royal-blue': {
          100: '#F0F1FC',
          200: '#D9DCF9',
          300: '#C2C7F5',
          400: '#959CED',
          500: '#6772E5',
          600: '#5D67CE',
          700: '#3E4489',
          800: '#2E3367',
          900: '#1F2245',
        },
        'calendar-blue': {
          100: '#1087FF',
          200: '#006EDC'
        },
        'calendar-yellow': {
          100: '#FFFFA9',
          200: '#FFFF76',
        }
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': '90rem',
      },
      fontSize: {
        '2.5xl': '1.6775rem',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
