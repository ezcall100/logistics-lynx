import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === 'dark';
  const toggleDarkMode = toggleTheme;

  const handleToggle = () => {
    toggleDarkMode();
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
        ${className}
      `}
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
     aria-label="Button">
      <div className="relative w-full h-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Sun Icon */}
        <Sun
          size={20}
          className={`
            absolute transition-all duration-500 ease-in-out
            ${!darkMode ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}
          `}
        />

        {/* Moon Icon */}
        <Moon
          size={20}
          className={`
            absolute transition-all duration-500 ease-in-out
            ${darkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}
          `}
        />
      </div>

      {showLabel && (
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
          {darkMode ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};