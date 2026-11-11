/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './*.js'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#004E57',
          primary: '#088395',
          medium: '#0A9396',
          light: '#40E0D0',
          pale: '#E0F7FA',
          surface: '#F0FDFA',
          accent: '#F59E0B',
          accentHover: '#D97706',
          gold: '#FBBF24'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        arabic: ['Amiri', 'serif']
      },
      boxShadow: {
        'glow-green': '0 10px 30px -10px rgba(8, 131, 149, 0.4)',
        'glow-gold': '0 10px 25px -5px rgba(245, 158, 11, 0.4)'
      }
    }
  },
  plugins: []
};
