import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Forest Greens inspired by Malbon Golf
        forest: {
          900: '#1B4332', // Primary forest green
          700: '#4A7C59', // Lighter forest green
          600: '#5D8B6C',
          400: '#7BA283',
          200: '#A8C4A2',
        },
        // Memorial Gold
        gold: {
          500: '#D4A574',
          400: '#E0B889',
          300: '#ECCC9E',
          200: '#F1D5AD',
          100: '#F6E0C1',
        },
        // Cream backgrounds
        cream: {
          50: '#F7F3E9',
          100: '#F5F0E3',
          200: '#F1EBDB',
        },
        // Golf-themed colors
        fairway: '#2D5A27',
        tee: '#8B4513',
        flag: '#DC143C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'golf-gradient': 'linear-gradient(135deg, #1B4332 0%, #4A7C59 50%, #D4A574 100%)',
        'memorial-gradient': 'linear-gradient(45deg, #D4A574 0%, #F7F3E9 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config