import type { Config } from 'tailwindcss'

export default <Config>{
  darkMode: ['class'],
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', lg: '2rem' } },
    extend: {
      colors: {
        // Trans Bot AI Brand Colors
        'transbot': {
          'cyan': '#00ffff',
          'blue': '#0080ff',
          'purple': '#8b5cf6',
          'pink': '#ec4899',
        },
        'dark': {
          'bg': '#0a0a0f',
          'darker': '#050508',
        },
        'glass': {
          'cyan': 'rgba(0, 255, 255, 0.1)',
          'blue': 'rgba(0, 128, 255, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Plus Jakarta Sans','Inter','ui-sans-serif'],
      },
      boxShadow: {
        'transbot-glow': '0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 128, 255, 0.2)',
        'transbot-glass': '0 8px 32px rgba(0, 255, 255, 0.1), 0 0 0 1px rgba(0, 255, 255, 0.1) inset',
      },
      borderRadius: { xl: '1rem', '2xl': '1.25rem' },
      backgroundImage: {
        'transbot-neural':
          'radial-gradient(60% 60% at 20% 20%, rgba(0,255,255,.22), transparent 60%), radial-gradient(60% 60% at 80% 30%, rgba(0,128,255,.18), transparent 60%)',
        'transbot-grid':
          'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
      },
      backgroundSize: { grid: '24px 24px' },
      transitionTimingFunction: { 'soft': 'cubic-bezier(.2,.8,.2,1)' },
      keyframes: {
        'float': { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-6px)' } },
      },
      animation: { float: 'float 6s ease-in-out infinite' },
    },
  },
  plugins: [],
  safelist: [
    'bg-transbot-cyan','bg-transbot-blue','text-transbot-cyan','text-transbot-blue',
    'border-transbot-cyan','border-transbot-blue','shadow-transbot-glow','shadow-transbot-glass',
    'bg-transbot-neural','bg-transbot-grid','holographic-glass','gradient-text','gradient-text-cyan','gradient-text-blue'
  ],
}
