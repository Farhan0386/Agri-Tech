/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          emerald: {
            50: '#ecfdf3',
            100: '#d1fae1',
            300: '#6ee7b7',
            700: '#047857',
            900: '#064e3b',
          },
          amber: {
            50: '#fffbeb',
            100: '#fef3c7',
            500: '#f59e0b',
            700: '#b45309',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}