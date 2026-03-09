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
        midnight: {
          950: '#0A0E17',
          900: '#111827',
          800: '#1E293B',
          700: '#334155',
        },
        amber: {
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
        },
        ivory: {
          50: '#FEFDFB',
          100: '#FAF9F6',
          200: '#F0EDE6',
        },
        rose: {
          500: '#F43F5E',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0A0E17 0%, #1E293B 50%, #0A0E17 100%)',
        'amber-glow': 'radial-gradient(ellipse at center, rgba(245,158,11,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
} satisfies Config
