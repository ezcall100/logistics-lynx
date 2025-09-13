/**
 * Super Admin Color Palette Hook
 * Provides easy access to the color palette system with TypeScript support
 */

import { useMemo } from 'react';
import {
  superAdminColorPalette,
  getColorValue,
  getGradientValue,
  getStatusColor,
  getPriorityColor,
  getThemeColor,
  getContrastColor,
  type SuperAdminColorPalette,
} from '../design-system/color-palette';

export interface UseColorPaletteOptions {
  isDarkMode?: boolean;
  theme?: 'light' | 'dark';
}

export interface UseColorPaletteReturn {
  // Color palette access
  colors: SuperAdminColorPalette;

  // Utility functions
  getColor: (color: string, shade?: keyof SuperAdminColorPalette['primary']) => string;
  getGradient: (gradient: keyof SuperAdminColorPalette['gradients']) => string;
  getStatusColor: (
    status: 'active' | 'inactive' | 'warning' | 'error' | 'success' | 'info'
  ) => string;
  getPriorityColor: (priority: 'critical' | 'high' | 'medium' | 'low') => string;
  getContrastColor: (backgroundColor: string) => string;

  // Theme-aware colors
  getThemeColor: (color: string) => string;

  // Predefined color combinations
  combinations: {
    primary: {
      background: string;
      text: string;
      border: string;
      hover: string;
    };
    secondary: {
      background: string;
      text: string;
      border: string;
      hover: string;
    };
    accent: {
      background: string;
      text: string;
      border: string;
      hover: string;
    };
    success: {
      background: string;
      text: string;
      border: string;
      hover: string;
    };
    warning: {
      background: string;
      text: string;
      border: string;
      hover: string;
    };
    error: {
      background: string;
      text: string;
      border: string;
      hover: string;
    };
    info: {
      background: string;
      text: string;
      border: string;
      hover: string;
    };
  };

  // Chart colors
  chartColors: string[];

  // Glassmorphism styles
  glass: {
    light: string;
    medium: string;
    dark: string;
    border: string;
  };
}

export const useColorPalette = (options: UseColorPaletteOptions = {}): UseColorPaletteReturn => {
  const { isDarkMode = false, theme = 'light' } = options;

  const colorPalette = useMemo(() => {
    const isDark = isDarkMode || theme === 'dark';

    return {
      colors: superAdminColorPalette,

      // Utility functions
      getColor: (color: string, shade: keyof SuperAdminColorPalette['primary'] = 500) => {
        return getColorValue(color, shade);
      },

      getGradient: (gradient: keyof SuperAdminColorPalette['gradients']) => {
        return getGradientValue(gradient);
      },

      getStatusColor: (
        status: 'active' | 'inactive' | 'warning' | 'error' | 'success' | 'info'
      ) => {
        return getStatusColor(status);
      },

      getPriorityColor: (priority: 'critical' | 'high' | 'medium' | 'low') => {
        return getPriorityColor(priority);
      },

      getContrastColor: (backgroundColor: string) => {
        return getContrastColor(backgroundColor);
      },

      getThemeColor: (color: string) => {
        return getThemeColor(color, isDark);
      },

      // Predefined color combinations
      combinations: {
        primary: {
          background: isDark
            ? superAdminColorPalette.primary[400]
            : superAdminColorPalette.primary[500],
          text: isDark ? superAdminColorPalette.neutral[900] : superAdminColorPalette.neutral[50],
          border: isDark
            ? superAdminColorPalette.primary[300]
            : superAdminColorPalette.primary[600],
          hover: isDark ? superAdminColorPalette.primary[300] : superAdminColorPalette.primary[600],
        },
        secondary: {
          background: isDark
            ? superAdminColorPalette.secondary[400]
            : superAdminColorPalette.secondary[500],
          text: isDark ? superAdminColorPalette.neutral[900] : superAdminColorPalette.neutral[50],
          border: isDark
            ? superAdminColorPalette.secondary[300]
            : superAdminColorPalette.secondary[600],
          hover: isDark
            ? superAdminColorPalette.secondary[300]
            : superAdminColorPalette.secondary[600],
        },
        accent: {
          background: isDark
            ? superAdminColorPalette.accent[400]
            : superAdminColorPalette.accent[500],
          text: isDark ? superAdminColorPalette.neutral[900] : superAdminColorPalette.neutral[50],
          border: isDark ? superAdminColorPalette.accent[300] : superAdminColorPalette.accent[600],
          hover: isDark ? superAdminColorPalette.accent[300] : superAdminColorPalette.accent[600],
        },
        success: {
          background: isDark
            ? superAdminColorPalette.success[400]
            : superAdminColorPalette.success[500],
          text: isDark ? superAdminColorPalette.neutral[900] : superAdminColorPalette.neutral[50],
          border: isDark
            ? superAdminColorPalette.success[300]
            : superAdminColorPalette.success[600],
          hover: isDark ? superAdminColorPalette.success[300] : superAdminColorPalette.success[600],
        },
        warning: {
          background: isDark
            ? superAdminColorPalette.warning[400]
            : superAdminColorPalette.warning[500],
          text: isDark ? superAdminColorPalette.neutral[900] : superAdminColorPalette.neutral[50],
          border: isDark
            ? superAdminColorPalette.warning[300]
            : superAdminColorPalette.warning[600],
          hover: isDark ? superAdminColorPalette.warning[300] : superAdminColorPalette.warning[600],
        },
        error: {
          background: isDark
            ? superAdminColorPalette.error[400]
            : superAdminColorPalette.error[500],
          text: isDark ? superAdminColorPalette.neutral[900] : superAdminColorPalette.neutral[50],
          border: isDark ? superAdminColorPalette.error[300] : superAdminColorPalette.error[600],
          hover: isDark ? superAdminColorPalette.error[300] : superAdminColorPalette.error[600],
        },
        info: {
          background: isDark ? superAdminColorPalette.info[400] : superAdminColorPalette.info[500],
          text: isDark ? superAdminColorPalette.neutral[900] : superAdminColorPalette.neutral[50],
          border: isDark ? superAdminColorPalette.info[300] : superAdminColorPalette.info[600],
          hover: isDark ? superAdminColorPalette.info[300] : superAdminColorPalette.info[600],
        },
      },

      // Chart colors
      chartColors: [
        superAdminColorPalette.data.chart1[500],
        superAdminColorPalette.data.chart2[500],
        superAdminColorPalette.data.chart3[500],
        superAdminColorPalette.data.chart4[500],
        superAdminColorPalette.data.chart5[500],
      ],

      // Glassmorphism styles
      glass: superAdminColorPalette.glass,
    };
  }, [isDarkMode, theme]);

  return colorPalette;
};

export default useColorPalette;
