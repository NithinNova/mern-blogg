import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this based on where your source files are located
    './public/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};