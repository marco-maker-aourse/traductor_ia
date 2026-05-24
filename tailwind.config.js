/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        app: '#f4f7fb',
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bdd9ff',
          300: '#90bdff',
          400: '#5c97ff',
          500: '#3c76f3',
          600: '#2f5dd9',
          700: '#274ab0',
          800: '#253f8b',
          900: '#25376d',
        },
      },
      boxShadow: {
        soft: '0 24px 60px rgba(15, 23, 42, 0.10)',
        'inner-soft': 'inset 0 1px 2px rgba(148, 163, 184, 0.20)',
      },
      animation: {
        floatIn: 'floatIn 0.7s ease-out both',
      },
      keyframes: {
        floatIn: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
