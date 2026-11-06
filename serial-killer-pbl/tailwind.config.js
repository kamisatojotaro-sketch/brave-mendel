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
        display: ['"Antonio"', '"Impact"', 'sans-serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
        hand: ['"Instrument Serif"', 'Georgia', 'serif'],
        geometric: ['"Josefin Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
