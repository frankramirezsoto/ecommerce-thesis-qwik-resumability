const { join } = require('path');

module.exports = {
  darkMode: ['class'],
  content: [
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, 'src/routes/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, 'src/components/**/*.{js,ts,jsx,tsx,mdx}')
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(210, 40%, 98%)',
        foreground: 'hsl(222, 47%, 11%)',
        primary: {
          DEFAULT: '#1d4ed8',
          foreground: '#f8fafc'
        },
        secondary: {
          DEFAULT: '#e2e8f0',
          foreground: '#0f172a'
        },
        accent: {
          DEFAULT: '#f97316',
          foreground: '#0f172a'
        },
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b'
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#0f172a'
        },
        border: '#e2e8f0',
        input: '#e2e8f0'
      },
      boxShadow: {
        hover: '0 25px 50px -12px rgba(30, 64, 175, 0.25)'
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease forwards',
        'scale-in': 'scale-in 0.4s ease forwards'
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        'scale-in': {
          from: { opacity: 0, transform: 'scale(0.95)' },
          to: { opacity: 1, transform: 'scale(1)' }
        }
      },
      backgroundImage: {
        'gradient-hero':
          'linear-gradient(135deg, rgba(30,64,175,1) 0%, rgba(79,70,229,1) 50%, rgba(129,140,248,1) 100%)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
