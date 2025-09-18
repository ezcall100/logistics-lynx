/**
 * MCP Agents - Advanced Theme System
 * Complete dark/light theme management with CSS variables and context
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { colors, themeConfig } from './tokens';

// ===== THEME TYPES =====
export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorScheme = 'light' | 'dark';

export interface ThemeContextType {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
}

// ===== THEME CONTEXT =====
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ===== THEME PROVIDER =====
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = () => {
      if (mode === 'system') {
        setColorScheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    updateSystemTheme();
    mediaQuery.addEventListener('change', updateSystemTheme);
    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, [mode]);

  // Update color scheme when mode changes
  useEffect(() => {
    if (mode === 'light') {
      setColorScheme('light');
    } else if (mode === 'dark') {
      setColorScheme('dark');
    } else {
      // system mode - handled by the effect above
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setColorScheme(mediaQuery.matches ? 'dark' : 'light');
    }
  }, [mode]);

  // Apply CSS variables to document
  useEffect(() => {
    const root = document.documentElement;
    const theme = colorScheme === 'dark' ? themeConfig.dark : themeConfig.light;

    // Apply color variables
    root.style.setProperty('--color-background', theme.background);
    root.style.setProperty('--color-surface', theme.surface);
    root.style.setProperty('--color-surface-elevated', theme.surfaceElevated);
    root.style.setProperty('--color-border', theme.border);
    root.style.setProperty('--color-text-primary', theme.text.primary);
    root.style.setProperty('--color-text-secondary', theme.text.secondary);
    root.style.setProperty('--color-text-tertiary', theme.text.tertiary);

    // Apply primary colors
    Object.entries(colors.primary).forEach(([key, value]) => {
      root.style.setProperty(`--color-primary-${key}`, value);
    });

    // Apply semantic colors
    Object.entries(colors.semantic).forEach(([semanticName, semanticColors]) => {
      Object.entries(semanticColors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${semanticName}-${key}`, value);
      });
    });

    // Apply neutral colors
    Object.entries(colors.neutral).forEach(([key, value]) => {
      root.style.setProperty(`--color-neutral-${key}`, value);
    });

    // Apply accent colors
    Object.entries(colors.accent).forEach(([accentName, accentColors]) => {
      Object.entries(accentColors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${accentName}-${key}`, value);
      });
    });

    // Set theme class on document
    root.classList.remove('light', 'dark');
    root.classList.add(colorScheme);

    // Store theme preference
    localStorage.setItem('theme-mode', mode);
  }, [colorScheme, mode]);

  // Load saved theme preference
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
      setModeState(savedMode);
    }
  }, []);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const toggleTheme = () => {
    setModeState(current => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'system';
      return 'light';
    });
  };

  const value: ThemeContextType = {
    mode,
    colorScheme,
    setMode,
    toggleTheme,
    isDark: colorScheme === 'dark',
    isLight: colorScheme === 'light',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// ===== THEME HOOK =====
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ===== THEME UTILITIES =====
export const getThemeColor = (colorPath: string, fallback?: string): string => {
  const root = document.documentElement;
  const value = root.style.getPropertyValue(colorPath);
  return value || fallback || '#000000';
};

export const applyThemeTransition = (element: HTMLElement, duration = 300) => {
  element.style.transition = `background-color ${duration}ms ease, color ${duration}ms ease, border-color ${duration}ms ease`;
};

// ===== THEME CSS VARIABLES =====
export const themeCSSVariables = `
  :root {
    /* Theme Colors */
    --color-background: ${themeConfig.light.background};
    --color-surface: ${themeConfig.light.surface};
    --color-surface-elevated: ${themeConfig.light.surfaceElevated};
    --color-border: ${themeConfig.light.border};
    --color-text-primary: ${themeConfig.light.text.primary};
    --color-text-secondary: ${themeConfig.light.text.secondary};
    --color-text-tertiary: ${themeConfig.light.text.tertiary};
    
    /* Primary Colors */
    ${Object.entries(colors.primary)
      .map(([key, value]) => `--color-primary-${key}: ${value};`)
      .join('\n    ')}
    
    /* Semantic Colors */
    ${Object.entries(colors.semantic)
      .map(([semanticName, semanticColors]) =>
        Object.entries(semanticColors)
          .map(([key, value]) => `--color-${semanticName}-${key}: ${value};`)
          .join('\n    ')
      )
      .join('\n    ')}
    
    /* Neutral Colors */
    ${Object.entries(colors.neutral)
      .map(([key, value]) => `--color-neutral-${key}: ${value};`)
      .join('\n    ')}
    
    /* Accent Colors */
    ${Object.entries(colors.accent)
      .map(([accentName, accentColors]) =>
        Object.entries(accentColors)
          .map(([key, value]) => `--color-${accentName}-${key}: ${value};`)
          .join('\n    ')
      )
      .join('\n    ')}
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    
    /* Border Radius */
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-full: 9999px;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    
    /* Glassmorphism */
    --glass-bg: rgba(255, 255, 255, 0.1);
    --glass-border: rgba(255, 255, 255, 0.2);
    --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    
    /* Transitions */
    --transition-fast: 150ms ease;
    --transition-normal: 300ms ease;
    --transition-slow: 500ms ease;
    
    /* Z-Index */
    --z-dropdown: 1000;
    --z-sticky: 1100;
    --z-overlay: 1300;
    --z-modal: 1400;
    --z-popover: 1500;
    --z-toast: 1700;
    --z-tooltip: 1800;
  }
  
  .dark {
    --color-background: ${themeConfig.dark.background};
    --color-surface: ${themeConfig.dark.surface};
    --color-surface-elevated: ${themeConfig.dark.surfaceElevated};
    --color-border: ${themeConfig.dark.border};
    --color-text-primary: ${themeConfig.dark.text.primary};
    --color-text-secondary: ${themeConfig.dark.text.secondary};
    --color-text-tertiary: ${themeConfig.dark.text.tertiary};
    
    --glass-bg: rgba(0, 0, 0, 0.1);
    --glass-border: rgba(255, 255, 255, 0.1);
  }
  
  * {
    transition: background-color var(--transition-normal), 
                color var(--transition-normal), 
                border-color var(--transition-normal);
  }
`;

export default ThemeProvider;
}