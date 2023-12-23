/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sidebar-bg': '#2D2D2D',
        'gray-9': '#262626',
        'gray-8': '#595959',
        'button-bg': '#0044C1',
        'select-red': '#D95409',
        border: 'rgba(0, 0, 0, 0.07)',
      },
    },
  },
  plugins: [],
};
