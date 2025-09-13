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
        },
        
        // Super Admin Dashboard Color System
        'super-admin': {
          // Primary Colors - Deep Blue for trust and authority
          'primary': {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
            950: '#082f49',
          },
          
          // Secondary Colors - Purple for premium features
          'secondary': {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7c3aed',
            800: '#6b21a8',
            900: '#581c87',
            950: '#3b0764',
          },
          
          // Accent Colors - Teal for highlights and success
          'accent': {
            50: '#f0fdfa',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
            950: '#042f2e',
          },
          
          // Data Visualization Colors
          'chart': {
            1: {
              50: '#f0f9ff',
              100: '#e0f2fe',
              200: '#bae6fd',
              300: '#7dd3fc',
              400: '#38bdf8',
              500: '#0ea5e9',
              600: '#0284c7',
              700: '#0369a1',
              800: '#075985',
              900: '#0c4a6e',
              950: '#082f49',
            },
            2: {
              50: '#f0fdf4',
              100: '#dcfce7',
              200: '#bbf7d0',
              300: '#86efac',
              400: '#4ade80',
              500: '#22c55e',
              600: '#16a34a',
              700: '#15803d',
              800: '#166534',
              900: '#14532d',
              950: '#052e16',
            },
            3: {
              50: '#fef2f2',
              100: '#fee2e2',
              200: '#fecaca',
              300: '#fca5a5',
              400: '#f87171',
              500: '#ef4444',
              600: '#dc2626',
              700: '#b91c1c',
              800: '#991b1b',
              900: '#7f1d1d',
              950: '#450a0a',
            },
            4: {
              50: '#fffbeb',
              100: '#fef3c7',
              200: '#fde68a',
              300: '#fcd34d',
              400: '#fbbf24',
              500: '#f59e0b',
              600: '#d97706',
              700: '#b45309',
              800: '#92400e',
              900: '#78350f',
              950: '#451a03',
            },
            5: {
              50: '#faf5ff',
              100: '#f3e8ff',
              200: '#e9d5ff',
              300: '#d8b4fe',
              400: '#c084fc',
              500: '#a855f7',
              600: '#9333ea',
              700: '#7c3aed',
              800: '#6b21a8',
              900: '#581c87',
              950: '#3b0764',
            },
          },
          
          // Glassmorphism Colors
          'glass': {
            light: 'rgba(255, 255, 255, 0.1)',
            medium: 'rgba(255, 255, 255, 0.2)',
            dark: 'rgba(0, 0, 0, 0.1)',
            border: 'rgba(255, 255, 255, 0.2)',
          },
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0EA5E9 0%, #1E40AF 100%)',
        'gradient-accent': 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0C4A6E 0%, #0284C7 50%, #14B8A6 100%)',
        
        // Super Admin Dashboard Gradients
        'super-admin-primary': 'linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%)',
        'super-admin-secondary': 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
        'super-admin-accent': 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
        'super-admin-hero': 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 50%, #14b8a6 100%)',
        'super-admin-data-1': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        'super-admin-data-2': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        'super-admin-data-3': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        'super-admin-data-4': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'super-admin-data-5': 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
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