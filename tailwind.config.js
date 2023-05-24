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
        'cursive': ['"Brush Script MT"', 'cursive']
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

