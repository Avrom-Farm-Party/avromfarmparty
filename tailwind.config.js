/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html"],
  theme: {
    letterSpacing: {
      'supertight': '-0.07em'
    },
    extend: {
      fontFamily: {
        'headline': ['"Trebuchet MS"', 'sans-serif'],
        'cursive': ['"Brush Script MT"', 'cursive'],
        'serif': ['"Averia Serif Libre"', 'serif'],
        'yarndings': ['"Yarndings 20"'],
      },
      colors: {
        'afp-red': '#F24307',
        'afp-blue': '#0069C6',
        'afp-green': '#01AD70',
        'afp-black': '#0F0A0A',
        'hannah-red': '#df6139',
        'hannah-blue': '#5f98d0',
        'hannah-pink': '#bf7fb1',
        'hannah-green': '#479c60',
        'hannah-offwhite': '#e5e0d8',
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

