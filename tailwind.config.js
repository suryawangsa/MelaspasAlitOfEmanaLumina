/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FBF6EC',
        gold: {
          DEFAULT: '#B8934A',
          light: '#D4B778',
          dark: '#8A6A2F',
        },
        maroon: '#5A2A1F',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        body: ['"Jost"', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4B778 0%, #B8934A 50%, #8A6A2F 100%)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        spin_slow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 1s ease-out forwards',
        spin_slow: 'spin_slow 8s linear infinite',
      },
    },
  },
  plugins: [],
}
