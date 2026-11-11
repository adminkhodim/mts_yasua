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
          dark: '#043B3E',
          primary: '#085458',
          medium: '#0D9488',
          light: '#40E0D0',
          pale: '#CCFBF1',
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
        'glow-green': '0 10px 30px -10px rgba(8, 84, 88, 0.35)',
        'glow-gold': '0 10px 25px -5px rgba(245, 158, 11, 0.4)'
      }
    }
  },
  plugins: []
};
