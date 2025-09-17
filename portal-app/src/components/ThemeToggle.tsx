import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleDarkMode}
      className={`relative p-3 rounded-xl transition-all duration-300 ${
        darkMode 
          ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? <Sun className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Moon className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />}
      </motion.div>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 responsive-container sm:flex-col md:flex-row lg:grid"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: darkMode ? 1 : 0, opacity: darkMode ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
