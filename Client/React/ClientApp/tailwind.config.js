const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const { createPortal } = require('react-dom')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        orange: colors.orange,
        yellow: colors.yellow,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
