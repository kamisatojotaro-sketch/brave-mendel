/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: '#050505',
        neon: '#00ff00',
        crimson: '#c0392b',
        blood: '#3a0b10',
        paper: '#f1efe6',
      },
      fontFamily: {
        display: ['"Antonio"', '"Impact"', 'sans-serif'],
        arcade: ['"Antonio"', '"Impact"', 'sans-serif'],
        marker: ['"Antonio"', '"Impact"', 'sans-serif'],
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
