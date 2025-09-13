/**
 * Super Admin Dashboard Color Palette
 * Comprehensive color system for consistent, accessible, and visually appealing design
 *
 * This palette is designed to:
 * - Guide user attention effectively
 * - Convey data insights clearly
 * - Ensure accessibility for all users
 * - Maintain visual hierarchy
 * - Support both light and dark themes
 */

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface SuperAdminColorPalette {
  // Primary Colors - Main brand and navigation
  primary: ColorScale;

  // Secondary Colors - Supporting elements
  secondary: ColorScale;

  // Accent Colors - Highlights and CTAs
  accent: ColorScale;

  // Semantic Colors - Status and feedback
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;

  // Neutral Colors - Text, backgrounds, borders
  neutral: ColorScale;

  // Specialized Colors - Data visualization
  data: {
    chart1: ColorScale;
    chart2: ColorScale;
    chart3: ColorScale;
    chart4: ColorScale;
    chart5: ColorScale;
  };

  // Glassmorphism Colors - Modern UI effects
  glass: {
    light: string;
    medium: string;
    dark: string;
    border: string;
  };

  // Gradient Definitions
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    hero: string;
    data: string[];
  };
}

export const superAdminColorPalette: SuperAdminColorPalette = {
  // Primary Colors - Deep Blue for trust and authority
  primary: {
    50: '#f0f9ff', // Lightest blue - backgrounds
    100: '#e0f2fe', // Very light blue - hover states
    200: '#bae6fd', // Light blue - borders
    300: '#7dd3fc', // Medium light blue - icons
    400: '#38bdf8', // Medium blue - secondary text
    500: '#0ea5e9', // Base blue - primary actions
    600: '#0284c7', // Dark blue - active states
    700: '#0369a1', // Darker blue - pressed states
    800: '#075985', // Very dark blue - headers
    900: '#0c4a6e', // Darkest blue - text
    950: '#082f49', // Ultra dark blue - deep shadows
  },

  // Secondary Colors - Purple for premium features
  secondary: {
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
  accent: {
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

  // Success Colors - Green for positive actions
  success: {
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

  // Warning Colors - Amber for caution
  warning: {
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

  // Error Colors - Red for errors and critical actions
  error: {
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

  // Info Colors - Blue for information
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  // Neutral Colors - Grays for text and backgrounds
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // Data Visualization Colors - Distinct colors for charts
  data: {
    chart1: {
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
    chart2: {
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
    chart3: {
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
    chart4: {
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
    chart5: {
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

  // Glassmorphism Colors - Modern UI effects
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.2)',
    dark: 'rgba(0, 0, 0, 0.1)',
    border: 'rgba(255, 255, 255, 0.2)',
  },

  // Gradient Definitions
  gradients: {
    primary: 'linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%)',
    secondary: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
    accent: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
    hero: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 50%, #14b8a6 100%)',
    data: [
      'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
    ],
  },
};

// Color utility functions
export const getColorValue = (color: string, shade: keyof ColorScale = 500): string => {
  const colorPath = color.split('.');
  let current: Record<string, unknown> = superAdminColorPalette;

  for (const path of colorPath) {
    current = current[path];
    if (!current) return '#000000';
  }

  return current[shade] || '#000000';
};

export const getGradientValue = (gradient: keyof SuperAdminColorPalette['gradients']): string => {
  return superAdminColorPalette.gradients[gradient] || superAdminColorPalette.gradients.primary;
};

// Accessibility helpers
export const getContrastColor = (backgroundColor: string): string => {
  // Simple contrast calculation - in production, use a proper color contrast library
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128
    ? superAdminColorPalette.neutral[900]
    : superAdminColorPalette.neutral[50];
};

// Status color mapping
export const getStatusColor = (
  status: 'active' | 'inactive' | 'warning' | 'error' | 'success' | 'info'
) => {
  const statusColors = {
    active: superAdminColorPalette.success[500],
    inactive: superAdminColorPalette.neutral[400],
    warning: superAdminColorPalette.warning[500],
    error: superAdminColorPalette.error[500],
    success: superAdminColorPalette.success[500],
    info: superAdminColorPalette.info[500],
  };

  return statusColors[status] || superAdminColorPalette.neutral[500];
};

// Priority color mapping
export const getPriorityColor = (priority: 'critical' | 'high' | 'medium' | 'low') => {
  const priorityColors = {
    critical: superAdminColorPalette.error[500],
    high: superAdminColorPalette.warning[500],
    medium: superAdminColorPalette.info[500],
    low: superAdminColorPalette.success[500],
  };

  return priorityColors[priority] || superAdminColorPalette.neutral[500];
};

// Theme-aware color getter
export const getThemeColor = (color: string, isDark: boolean = false): string => {
  if (isDark) {
    // For dark theme, use lighter shades for better contrast
    const darkMappings: Record<string, keyof ColorScale> = {
      'primary.500': 'primary.400',
      'secondary.500': 'secondary.400',
      'accent.500': 'accent.400',
      'neutral.900': 'neutral.100',
      'neutral.800': 'neutral.200',
    };

    const mapping = darkMappings[color];
    if (mapping) {
      return getColorValue(color.replace('.500', ''), mapping.split('.')[1] as keyof ColorScale);
    }
  }

  return getColorValue(color);
};

export default superAdminColorPalette;
