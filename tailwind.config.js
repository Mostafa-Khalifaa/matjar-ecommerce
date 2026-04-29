/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif'],
      },
      colors: {
        prime: {
          50:  '#e6f0fa',
          100: '#BFDBF7', // Light blue
          200: '#99c2f0',
          300: '#e35c67',
          400: '#c52834',
          500: '#A31621', // Dark red
          600: '#8a121c',
          700: '#700f16',
          800: '#570b11',
          900: '#3d080c',
        },
      },
      animation: {
        'fade-in':  'fadeIn 0.35s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'pop':      'pop 0.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%':   { transform: 'scale(0.95)' },
          '60%':  { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

