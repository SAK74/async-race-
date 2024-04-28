/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        grow: 'grow 1s ease-in',
      },
    },
    keyframes: {
      grow: {
        '0%': { transform: 'scale(0)' },
        '80%': { transform: 'scale(1.2)' },
        '100%': { transform: 'scale(1.1)' },
      },
    },
  },
  plugins: [],
};
