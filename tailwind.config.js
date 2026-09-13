/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#040806',
          elevated: '#08120b',
          card: '#0c1710',
          glass: 'rgba(10, 20, 12, 0.65)',
        },
        text: {
          primary: '#f0ede6',
          muted: 'rgba(240, 237, 230, 0.55)',
          dim: 'rgba(240, 237, 230, 0.35)',
        },
        tactical: {
          green: '#10b981',
          mint: '#34d399',
          gold: '#d4af37',
          amber: '#f59e0b',
          red: '#c44536',
          cyan: '#06b6d4',
          border: 'rgba(16, 185, 129, 0.18)',
          borderHover: 'rgba(16, 185, 129, 0.45)',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Tenor Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'radar-sweep': 'radarSweep 4s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
