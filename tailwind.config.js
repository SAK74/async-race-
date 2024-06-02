import nightWind from 'nightwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        grow: 'grow 1s ease-in',
        flash: 'flash 2s calc(0.05s * var(--i)) infinite',
        race: 'race 2s linear infinite',
        rolling: 'rolling 2s ease-in-out alternate infinite, spin 4s ease-in-out infinite',
      },
      backgroundImage: {
        car: "url('/car.svg')",
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
      race: {
        to: {
          'background-position': 'right',
        },
      },
      rolling: {
        from: { left: '2rem' },
        to: { left: 'calc(100% - 3rem)' },
      },
      spin: {
        '0%': { transform: 'rotate(0deg)' },
        '50%': { transform: 'rotate(360deg)' },
        '1000%': { transform: 'rotate(0deg)' },
      },
    },
  },
  darkMode: 'class',
  plugins: [nightWind],
};
