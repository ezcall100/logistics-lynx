/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Trans Bot AI Official Color Palette
        'transbot': {
          // Primary Corporate Palette (Trust & Stability)
          'navy': '#0C4A6E',        // Primary - headers, main buttons
          'sky': '#0284C7',         // Secondary - highlights, links
          'teal': '#14B8A6',        // Accent - CTAs, success states
          'bg-light': '#F8FAFC',    // Clean background
          'bg-dark': '#1E293B',     // Dark mode/ footer
          'text-dark': '#0F172A',   // Primary text
          'text-light': '#E2E8F0',  // Text in dark mode
          
          // Modern Gradient Palette (Premium & Sleek)
          'gradient-start': '#0EA5E9',  // Sky Blue
          'gradient-end': '#1E40AF',    // Deep Indigo
          'accent-start': '#14B8A6',    // Teal
          'accent-end': '#0F766E',      // Dark Teal
          
          // Minimal White & Gray Palette (Clean & Neutral)
          'action': '#2563EB',          // Key interactive elements
          'neutral-light': '#F8FAFC',   // Default background
          'neutral-dark': '#1E293B',    // Dark sections
          'border': '#CBD5E1',          // Borders & dividers
          'text-primary': '#0F172A',    // Primary text
          'text-secondary': '#334155',  // Secondary text (darker for better contrast)
          'text-muted': '#64748B',      // Muted text for less important content
          'text-light': '#F1F5F9',      // Light text for dark backgrounds
          'highlight': '#0EA5E9',       // Highlight accent
          
          // Status Colors
          'warning': '#F59E0B',         // Alerts and caution
          'error': '#DC2626',           // Error states
          'success': '#16A34A',         // Success states
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0EA5E9 0%, #1E40AF 100%)',
        'gradient-accent': 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0C4A6E 0%, #0284C7 50%, #14B8A6 100%)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'transbot': '0 4px 6px -1px rgba(12, 74, 110, 0.1), 0 2px 4px -1px rgba(12, 74, 110, 0.06)',
        'transbot-lg': '0 10px 15px -3px rgba(12, 74, 110, 0.1), 0 4px 6px -2px rgba(12, 74, 110, 0.05)',
        'transbot-xl': '0 20px 25px -5px rgba(12, 74, 110, 0.1), 0 10px 10px -5px rgba(12, 74, 110, 0.04)',
      },
    },
  },
  plugins: [],
}