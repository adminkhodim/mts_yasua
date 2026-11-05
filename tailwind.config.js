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
          dark: '#033324',
          primary: '#065F46',
          medium: '#0D7B58',
          light: '#10B981',
          pale: '#ECFDF5',
          surface: '#F4FBF7',
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
        'glow-green': '0 10px 30px -10px rgba(6, 95, 70, 0.35)',
        'glow-gold': '0 10px 25px -5px rgba(245, 158, 11, 0.4)'
      }
    }
  },
  plugins: []
};
