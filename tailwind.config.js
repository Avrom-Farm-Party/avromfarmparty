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
        'maggie-offwhite': '#f4f8d8',
        'maggie-pink': '#f4c3bf',
        'maggie-orange-hi': '#f7d678',
        'maggie-orange-med': '#f9b910',
        'maggie-orange-lo': '#ff9800',
        'maggie-red': '#e45a17',
        'maggie-green': '#65672a',
        'maggie-yellow': '#ffbf00',
        'maggie-blue': '#2e8ccc',
        'hannah-red': '#d86100',
        'hannah-green': '#479c60',
        'hannah-blue': '#5f98d0',
        'hannah-pink': '#e6a8a9',
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

