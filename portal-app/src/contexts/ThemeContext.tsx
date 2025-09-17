import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  theme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('portal-theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      console.log('🎨 Theme toggle:', prev, '->', newMode);
      localStorage.setItem('portal-theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  useEffect(() => {
    // Apply theme to document
    console.log('🎨 Applying theme to document:', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    console.log('🎨 Document classes:', document.documentElement.classList.toString());
  }, [darkMode]);

  const value = {
    darkMode,
    toggleDarkMode,
    theme: darkMode ? 'dark' : 'light'
  };

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
