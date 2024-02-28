/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        popUp:  {
          '0%': {transform: 'scale(0)'},
          '60%': {transform: 'scale(1.2)'},
          '100%': {transform: 'scale(1.0)'}
        }
      },
      animation: {
        popUp: 'popUp 1s ease-in-out'
      }
    },
  },
  plugins: [],
}
