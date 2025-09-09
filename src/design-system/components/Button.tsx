/**
 * MCP Agents - Redesigned Button Component
 * Modern, accessible button with comprehensive variants and states
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

// ===== BUTTON VARIANTS =====
const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium text-sm leading-none',
    'border border-transparent',
    'rounded-lg',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'relative overflow-hidden',
    'select-none',
  ],
  {
    variants: {
      variant: {
        // Primary variants
        primary: [
          'bg-gradient-to-r from-primary-500 to-primary-600',
          'text-white',
          'shadow-md hover:shadow-lg',
          'hover:from-primary-600 hover:to-primary-700',
          'active:scale-[0.98]',
          'focus:ring-primary-500',
        ],
        secondary: [
          'bg-gradient-to-r from-secondary-100 to-secondary-200',
          'text-secondary-900',
          'border-secondary-300',
          'hover:from-secondary-200 hover:to-secondary-300',
          'active:scale-[0.98]',
          'focus:ring-secondary-500',
        ],
        outline: [
          'bg-transparent',
          'text-primary-600',
          'border-primary-300',
          'hover:bg-primary-50',
          'hover:border-primary-400',
          'active:scale-[0.98]',
          'focus:ring-primary-500',
        ],
        ghost: [
          'bg-transparent',
          'text-secondary-700',
          'hover:bg-secondary-100',
          'hover:text-secondary-900',
          'active:scale-[0.98]',
          'focus:ring-secondary-500',
        ],

        // Semantic variants
        success: [
          'bg-gradient-to-r from-emerald-500 to-emerald-600',
          'text-white',
          'shadow-md hover:shadow-lg',
          'hover:from-emerald-600 hover:to-emerald-700',
          'active:scale-[0.98]',
          'focus:ring-emerald-500',
        ],
        warning: [
          'bg-gradient-to-r from-amber-500 to-amber-600',
          'text-white',
          'shadow-md hover:shadow-lg',
          'hover:from-amber-600 hover:to-amber-700',
          'active:scale-[0.98]',
          'focus:ring-amber-500',
        ],
        error: [
          'bg-gradient-to-r from-rose-500 to-rose-600',
          'text-white',
          'shadow-md hover:shadow-lg',
          'hover:from-rose-600 hover:to-rose-700',
          'active:scale-[0.98]',
          'focus:ring-rose-500',
        ],
        info: [
          'bg-gradient-to-r from-blue-500 to-blue-600',
          'text-white',
          'shadow-md hover:shadow-lg',
          'hover:from-blue-600 hover:to-blue-700',
          'active:scale-[0.98]',
          'focus:ring-blue-500',
        ],

        // Special variants
        gradient: [
          'bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500',
          'text-white',
          'shadow-lg hover:shadow-xl',
          'hover:from-violet-600 hover:via-purple-600 hover:to-pink-600',
          'active:scale-[0.98]',
          'focus:ring-violet-500',
        ],
        glass: [
          'bg-white/10 backdrop-blur-md',
          'text-white',
          'border-white/20',
          'shadow-lg hover:shadow-xl',
          'hover:bg-white/20',
          'active:scale-[0.98]',
          'focus:ring-white/50',
        ],
        neon: [
          'bg-transparent',
          'text-primary-400',
          'border-primary-400',
          'shadow-[0_0_20px_rgba(14,165,233,0.3)]',
          'hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]',
          'hover:bg-primary-400/10',
          'active:scale-[0.98]',
          'focus:ring-primary-400',
        ],
        destructive: [
          'bg-gradient-to-r from-red-500 to-red-600',
          'text-white',
          'shadow-md hover:shadow-lg',
          'hover:from-red-600 hover:to-red-700',
          'active:scale-[0.98]',
          'focus:ring-red-500',
        ],
        default: [
          'bg-gradient-to-r from-gray-100 to-gray-200',
          'text-gray-900',
          'border-gray-300',
          'hover:from-gray-200 hover:to-gray-300',
          'active:scale-[0.98]',
          'focus:ring-gray-500',
        ],
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10 p-0',
        'icon-sm': 'h-8 w-8 p-0',
        'icon-lg': 'h-12 w-12 p-0',
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
      variant: 'primary',
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
const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <motion.div
      className={cn('animate-spin', sizeClasses[size])}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <svg
        className="w-full h-full"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </motion.div>
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
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Separate motion props from HTML button props to avoid conflicts
    const { onAnimationStart, onAnimationComplete, ...htmlProps } = props as ButtonProps & {
      onAnimationStart?: (definition: unknown) => void;
      onAnimationComplete?: (definition: unknown) => void;
    };

    const buttonContent = (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, loading }), className)}
        disabled={isDisabled}
        whileHover={animated && !isDisabled ? { scale: 1.02 } : undefined}
        whileTap={animated && !isDisabled ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.1 }}
        {...htmlProps}
      >
        {/* Ripple effect background */}
        {animated && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-lg"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Content */}
        <div className="relative flex items-center gap-2">
          {/* Left Icon or Loading Spinner */}
          {loading ? (
            <LoadingSpinner size={size === 'xs' || size === 'sm' ? 'sm' : 'md'} />
          ) : (
            leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
          )}

          {/* Text Content */}
          <span className="flex-shrink-0">{loading && loadingText ? loadingText : children}</span>

          {/* Right Icon */}
          {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </div>
      </motion.button>
    );

    // Wrap with tooltip if provided
    if (tooltip) {
      return (
        <div className="relative group">
          {buttonContent}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {tooltip}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      );
    }

    return buttonContent;
  }
);

Button.displayName = 'Button';

// ===== BUTTON GROUP COMPONENT =====
const ButtonGroup: React.FC<{
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ children, orientation = 'horizontal', spacing = 'md', className }) => {
  const spacingClasses = {
    sm: orientation === 'horizontal' ? 'space-x-1' : 'space-y-1',
    md: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
    lg: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4',
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
  onClick: () => void;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}> = ({
  onClick,
  icon,
  variant = 'primary',
  size = 'md',
  position = 'bottom-right',
  className,
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-14 w-14',
    lg: 'h-16 w-16',
  };

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'fixed z-50 rounded-full shadow-lg hover:shadow-xl',
        'flex items-center justify-center',
        'transition-all duration-200',
        positionClasses[position],
        sizeClasses[size],
        {
          'bg-gradient-to-r from-primary-500 to-primary-600 text-white': variant === 'primary',
          'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white':
            variant === 'secondary',
          'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white': variant === 'success',
          'bg-gradient-to-r from-amber-500 to-amber-600 text-white': variant === 'warning',
          'bg-gradient-to-r from-rose-500 to-rose-600 text-white': variant === 'error',
        },
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.1 }}
    >
      {icon}
    </motion.button>
  );
};

export { Button, ButtonGroup, FloatingActionButton };
export default Button;
