import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeDebugger: React.FC = () => {
  const { darkMode, toggleDarkMode, theme } = useTheme();

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="fixed bottom-4 left-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-3 shadow-lg z-50 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="text-xs space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="font-semibold text-gray-900 dark:text-slate-100 responsive-container sm:flex-col md:flex-row lg:grid">Theme Debug</div>
        <div className="text-gray-600 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
          Mode: <span className="font-mono responsive-container sm:flex-col md:flex-row lg:grid">{theme}</span>
        </div>
        <div className="text-gray-600 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
          Dark: <span className="font-mono responsive-container sm:flex-col md:flex-row lg:grid">{darkMode ? 'true' : 'false'}</span>
        </div>
        <div className="text-gray-600 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
          Class: <span className="font-mono responsive-container sm:flex-col md:flex-row lg:grid">{document.documentElement.classList.contains('dark') ? 'dark' : 'light'}</span>
        </div>
        <button
          onClick={toggleDarkMode}
          className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
         aria-label="Button">
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default ThemeDebugger;
