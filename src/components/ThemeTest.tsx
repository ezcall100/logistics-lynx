import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeTest: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg">
      <div className="text-sm">
        <p className="text-gray-900 dark:text-gray-100">
          Current Theme: <strong>{theme}</strong>
        </p>
        <button
          onClick={toggleTheme}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};
