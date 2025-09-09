/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-primary) / 0.1)',
          500: 'rgb(var(--color-primary))',
          600: 'rgb(var(--color-primary-dark))',
        },
        secondary: {
          500: 'rgb(var(--color-secondary))',
          600: 'rgb(var(--color-secondary-dark))',
        },
        accent: {
          700: 'rgb(var(--color-accent))',
        },
        success: {
          500: 'rgb(var(--color-success))',
        },
        warning: {
          500: 'rgb(var(--color-warning))',
        },
        error: {
          500: 'rgb(var(--color-error))',
        },
        background: 'rgb(var(--color-background))',
        surface: 'rgb(var(--color-surface))',
        text: {
          primary: 'rgb(var(--color-text))',
          secondary: 'rgb(var(--color-text-secondary))',
        },
        border: 'rgb(var(--color-border))',
      },
    },
  },
  plugins: [],
}
