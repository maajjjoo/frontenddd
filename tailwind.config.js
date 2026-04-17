/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink:    '#ffd6e7',
          rose:    '#ffb3c6',
          lavender:'#e8d5f5',
          purple:  '#d4b8f0',
          mint:    '#c8f0e0',
          peach:   '#ffd8c0',
          sky:     '#c8e8ff',
          yellow:  '#fff0c0',
        },
        soft: {
          bg:     '#fdf6f9',
          card:   '#ffffff',
          border: '#f5d0e0',
          text:   '#6b4c5e',
          muted:  '#b89aaa',
        },
      },
    },
  },
  plugins: [],
};
