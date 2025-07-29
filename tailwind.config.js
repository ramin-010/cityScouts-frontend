/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chillax : ['Chillax', 'sans-serif'],
        excon : ['Excon' , 'sans-serif'],
        khand : ['Khand', 'sans-serif']
        
      },
      colors : {
       primary : 'var(--primary)',
        mygray : 'var(--gray)',
        myteal: {
          50: '#e6fcf5',
          100: '#c3fae8',
          200: '#96f2d7',
          300: '#63e6be',
          400: '#38d9a9',
          500: '#20c997',
          600: '#12b886',
          700: '#0ca678',
          800: '#099268',
          900: '#087f5b',
        },
      },
      animation: {
        fadeInSlow: 'fadeInSlow 0.4s ease-out',
      },
      keyframes: {
        fadeInSlow: {
          '0%': { opacity: 0, transform: 'translateY(-4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
