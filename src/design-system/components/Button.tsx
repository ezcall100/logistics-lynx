/**
 * MCP Agents - Clean Button Component
 * Modern, accessible button with comprehensive features
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// ===== BUTTON VARIANTS =====
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'relative overflow-hidden',
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        outline:
          'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
        ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
        glass:
          'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 focus:ring-white/50',
        neon: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 focus:ring-cyan-500',
        gradient:
          'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 focus:ring-primary-500',
        semantic: {
          success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
          warning: 'bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500',
          error: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
          info: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        },
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-6 text-base',
        xl: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10 p-0',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      loading: {
        true: 'cursor-wait',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullWidth: false,
      loading: false,
    },
  }
);

// ===== BUTTON PROPS =====
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loadingText?: string;
  tooltip?: string;
  animated?: boolean;
}

// ===== LOADING SPINNER =====
const LoadingSpinner: React.FC<{ size: 'sm' | 'md' }> = ({ size }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
  };

  return (
    <div className={cn('animate-spin', sizeClasses[size])}>
      <svg className="w-full h-full" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

// ===== BUTTON COMPONENT =====
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
      leftIcon,
      rightIcon,
      loadingText,
      tooltip,
      animated = true,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, loading }), className)}
        disabled={isDisabled}
        {...props}
      >
        {/* Content */}
        <div className="relative flex items-center gap-2">
          {/* Left Icon or Loading Spinner */}
          {loading ? (
            <LoadingSpinner
              size={size === 'xs' || size === 'sm' || size === 'icon' ? 'sm' : 'md'}
            />
          ) : (
            leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
          )}

          {/* Text Content */}
          {size !== 'icon' && (
            <span className="flex-shrink-0">{loading && loadingText ? loadingText : children}</span>
          )}

          {/* Right Icon */}
          {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button';

// ===== BUTTON GROUP =====
const ButtonGroup: React.FC<{
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ children, orientation = 'horizontal', spacing = 'md', className }) => {
  const spacingClasses = {
    sm: orientation === 'horizontal' ? 'gap-1' : 'gap-1',
    md: orientation === 'horizontal' ? 'gap-2' : 'gap-2',
    lg: orientation === 'horizontal' ? 'gap-4' : 'gap-4',
  };

  return (
    <div
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        spacingClasses[spacing],
        className
      )}
    >
      {children}
    </div>
  );
};

// ===== FLOATING ACTION BUTTON =====
const FloatingActionButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ children, onClick, position = 'bottom-right', size = 'md', className }) => {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed z-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-200',
        'bg-primary-600 text-white hover:bg-primary-700',
        'flex items-center justify-center',
        positionClasses[position],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
};

export { Button, ButtonGroup, FloatingActionButton };
export default Button;
}