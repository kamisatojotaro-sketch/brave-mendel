/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: '#040705',
        lagoon: '#0d5c2e',
        forest: '#063318',
        vein: '#258e47',
        neon: '#00ff33',
        magenta: '#ff007f',
        crimson: '#d90429',
        blood: '#3a0b14',
        paper: '#f3efe4',
      },
      fontFamily: {
        display: ['"Londrina Solid"', '"Bangers"', 'sans-serif'],
        arcade: ['"Bangers"', '"Londrina Solid"', 'cursive'],
        marker: ['"Permanent Marker"', 'cursive'],
        editorial: ['"Fraunces"', 'Georgia', 'serif'],
        hand: ['"Fraunces"', 'Georgia', 'serif'],
        geometric: ['"Bricolage Grotesque"', 'sans-serif'],
        mono: ['"Bricolage Grotesque"', 'sans-serif'],
        sans: ['"Bricolage Grotesque"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
