import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeDebugger: React.FC = () => {
  const { darkMode, toggleDarkMode, theme } = useTheme();

  return (
    <div className="fixed bottom-4 left-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-3 shadow-lg z-50">
      <div className="text-xs space-y-1">
        <div className="font-semibold text-gray-900 dark:text-slate-100">Theme Debug</div>
        <div className="text-gray-600 dark:text-slate-400">
          Mode: <span className="font-mono">{theme}</span>
        </div>
        <div className="text-gray-600 dark:text-slate-400">
          Dark: <span className="font-mono">{darkMode ? 'true' : 'false'}</span>
        </div>
        <div className="text-gray-600 dark:text-slate-400">
          Class: <span className="font-mono">{document.documentElement.classList.contains('dark') ? 'dark' : 'light'}</span>
        </div>
        <button
          onClick={toggleDarkMode}
          className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default ThemeDebugger;
