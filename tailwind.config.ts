import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0b0f',
        surface: '#12141c',
        surface2: '#1a1d2e',
        border: '#252840',
        accent: {
          DEFAULT: '#7c6fff',
          light: '#a099ff',
          dark: '#5a50e0',
        },
        pass: '#22c55e',
        warn: '#f59e0b',
        fail: '#ef4444',
        info: '#60a5fa',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'score-ring': 'scoreRing 1.2s ease forwards',
        'bar-fill': 'barFill 0.8s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
