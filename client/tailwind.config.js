/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        forest: {
          50: '#f0f7f3',
          100: '#d8ece1',
          200: '#b3d9c5',
          300: '#8cc5a8',
          400: '#5fac86',
          500: '#3d9268',
          600: '#2d6a4f',
          700: '#1b4332',
          800: '#123024',
          900: '#0a1f18',
        },
        sun: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        sky: {
          50: '#f0fbff',
          100: '#cef1fb',
          200: '#9de3f7',
          300: '#63cdef',
          400: '#38b6e0',
          500: '#0096c7',
          600: '#0077a3',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 2px 12px rgba(27, 67, 50, 0.08)',
        card: '0 4px 20px rgba(27, 67, 50, 0.10)',
      },
    },
  },
  plugins: [],
}
