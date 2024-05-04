import nightWind from 'nightwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        grow: 'grow 1s ease-in',
        flash: 'flash 2s calc(0.05s * var(--i)) infinite',
      },
    },
    keyframes: {
      grow: {
        '0%': { transform: 'scale(0)' },
        '80%': { transform: 'scale(1.2)' },
        '100%': { transform: 'scale(1.1)' },
      },
      flash: {
        '0%,95%': { opacity: 0.7, color: 'inherit' },
      },
    },
  },
  darkMode: 'class',
  plugins: [nightWind],
};
