/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["pages/**/*.html", "_layouts/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        'cursive': ['"Brush Script MT"', 'cursive'],
        'sans': ['"Libre Franklin"', 'sans-serif'],
      },
      colors: {
        'afp-red': '#F25730',
        'afp-blue': '#2A6ED4',
        'afp-green': '#47B576',
        'afp-black': '#0F0A0A',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        'scroll': 'scroll 10s linear infinite',
      }
    },
  },
  plugins: [],
}

