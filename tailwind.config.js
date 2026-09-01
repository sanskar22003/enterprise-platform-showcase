/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse-slow': 'spin-reverse 30s linear infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'drift': 'drift 8s ease-in-out infinite',
        'dash': 'dash 3s linear infinite',
        'dash-reverse': 'dashReverse 4s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'orbit': 'orbit 15s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'scan': 'scan 4s ease-in-out infinite',
        'wave': 'wave 5s ease-in-out infinite',
        'blink': 'blink 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(8px, -6px)' },
          '50%': { transform: 'translate(-4px, -10px)' },
          '75%': { transform: 'translate(-8px, 4px)' },
        },
        dash: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        dashReverse: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '1000' },
        },
        glowPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 4px currentColor)' },
          '50%': { filter: 'drop-shadow(0 0 16px currentColor)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(40px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(40px) rotate(-360deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { transform: 'translateY(100%)', opacity: '1' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)' },
          '50%': { transform: 'translateY(-8px) scaleY(1.1)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
};
