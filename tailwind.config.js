/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Helvetica Now Display', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        text: ['Helvetica Now Text', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          50: '#F9F9F9',
          100: '#F3F3F3',
          200: '#E8E8E8',
          300: '#D3D3D3',
          400: '#B0B0B0',
          500: '#808080',
          600: '#595959',
          700: '#404040',
          800: '#262626',
          900: '#121212',
        }
      },
      boxShadow: {
        subtle: '0 10px 30px rgba(255,255,255,0.08)'
      },
      animation: {
        'typewriter': 'typewriter 4s steps(32, end) forwards',
        'fade-in': 'fadeIn 0.7s ease-in-out',
        'slide-up': 'slideUp 0.55s ease-out',
      },
      keyframes: {
        typewriter: {
          '0%': { width: '0', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { width: '100%', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-lg': ['56px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-md': ['48px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        h1: ['42px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        h3: ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        body: ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
