import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  size = 'md',
  showLabel = false,
}) => {
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor size={iconSizes[size]} />;
    }
    return resolvedTheme === 'light' ? (
      <Sun size={iconSizes[size]} />
    ) : (
      <Moon size={iconSizes[size]} />
    );
  };

  const getLabel = () => {
    if (theme === 'system') return 'System';
    return resolvedTheme === 'light' ? 'Light' : 'Dark';
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        relative overflow-hidden
        bg-white/10 dark:bg-gray-800/20
        backdrop-blur-sm
        border border-white/20 dark:border-gray-700/30
        rounded-xl
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        hover:bg-white/20 dark:hover:bg-gray-700/30
        hover:scale-105
        active:scale-95
        group
        ${className}
      `}
      aria-label={`Switch to ${getLabel().toLowerCase()} mode`}
      title={`Current: ${getLabel()} mode`}
    >
      <div className="relative w-full h-full flex items-center justify-center">{getIcon()}</div>

      {showLabel && (
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {getLabel()}
        </span>
      )}

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};
