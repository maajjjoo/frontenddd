/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0f0f13',
          800: '#16161d',
          700: '#1e1e28',
          600: '#262633',
          500: '#32323f',
        },
      },
    },
  },
  plugins: [],
};
