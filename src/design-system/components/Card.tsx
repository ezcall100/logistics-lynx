/**
 * MCP Agents - Redesigned Card Component
 * Modern cards with glassmorphism, animations, and comprehensive variants
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

// ===== CARD VARIANTS =====
const cardVariants = cva(
  ['rounded-xl border', 'transition-all duration-300 ease-in-out', 'relative overflow-hidden'],
  {
    variants: {
      variant: {
        default: ['bg-white border-gray-200', 'shadow-sm hover:shadow-md', 'hover:border-gray-300'],
        elevated: [
          'bg-white border-gray-200',
          'shadow-md hover:shadow-lg',
          'hover:border-gray-300',
          'hover:-translate-y-1',
        ],
        outlined: ['bg-transparent border-gray-300', 'hover:bg-gray-50', 'hover:border-gray-400'],
        filled: ['bg-gray-50 border-gray-200', 'hover:bg-gray-100', 'hover:border-gray-300'],
        glass: [
          'bg-white/10 backdrop-blur-md',
          'border-white/20',
          'shadow-lg hover:shadow-xl',
          'hover:bg-white/20',
        ],
        gradient: [
          'bg-gradient-to-br from-white to-gray-50',
          'border-gray-200',
          'shadow-md hover:shadow-lg',
          'hover:from-gray-50 hover:to-gray-100',
        ],
        neon: [
          'bg-transparent border-primary-400',
          'shadow-[0_0_20px_rgba(14,165,233,0.3)]',
          'hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]',
          'hover:bg-primary-400/10',
        ],
        success: [
          'bg-gradient-to-br from-emerald-50 to-emerald-100',
          'border-emerald-200',
          'shadow-md hover:shadow-lg',
          'hover:from-emerald-100 hover:to-emerald-200',
        ],
        warning: [
          'bg-gradient-to-br from-amber-50 to-amber-100',
          'border-amber-200',
          'shadow-md hover:shadow-lg',
          'hover:from-amber-100 hover:to-amber-200',
        ],
        error: [
          'bg-gradient-to-br from-rose-50 to-rose-100',
          'border-rose-200',
          'shadow-md hover:shadow-lg',
          'hover:from-rose-100 hover:to-rose-200',
        ],
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      interactive: {
        true: 'cursor-pointer',
        false: '',
      },
      animated: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
      animated: true,
    },
  }
);

// ===== CARD PROPS =====
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  loading?: boolean;
  disabled?: boolean;
}

// ===== CARD COMPONENT =====
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      size,
      interactive,
      animated = true,
      loading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Separate motion props from HTML div props to avoid conflicts
    const { onAnimationStart, onAnimationComplete, ...htmlProps } = props as CardProps & {
      onAnimationStart?: (definition: unknown) => void;
      onAnimationComplete?: (definition: unknown) => void;
    };

    const cardContent = (
      <motion.div
        ref={ref}
        className={cn(
          cardVariants({ variant, size, interactive, animated }),
          {
            'opacity-50 cursor-not-allowed': isDisabled,
            'pointer-events-none': loading,
          },
          className
        )}
        whileHover={
          animated && !isDisabled && interactive
            ? { scale: 1.02, y: -2 }
            : animated && !isDisabled
              ? { y: -1 }
              : undefined
        }
        whileTap={animated && !isDisabled && interactive ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.2 }}
        {...htmlProps}
      >
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
            <motion.div
              className="animate-spin"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-8 h-8 border-4 border-gray-300 border-t-primary-500 rounded-full" />
            </motion.div>
          </div>
        )}

        {/* Gradient Overlay for Interactive Cards */}
        {animated && interactive && !isDisabled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Content */}
        <div className="relative z-0">{children}</div>
      </motion.div>
    );

    return cardContent;
  }
);

Card.displayName = 'Card';

// ===== CARD HEADER =====
const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
  }
>(({ className, title, subtitle, action, children, ...props }, ref) => {
  // Separate motion props from HTML div props to avoid conflicts
  const { onAnimationStart, onAnimationComplete, ...htmlProps } =
    props as React.HTMLAttributes<HTMLDivElement> & {
      onAnimationStart?: (definition: unknown) => void;
      onAnimationComplete?: (definition: unknown) => void;
    };

  return (
    <motion.div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      {...htmlProps}
    >
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {title && (
              <h3 className="text-lg font-semibold leading-none tracking-tight text-gray-900">
                {title}
              </h3>
            )}
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </motion.div>
  );
});

CardHeader.displayName = 'CardHeader';

// ===== CARD TITLE =====
const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => {
    // Separate motion props from HTML div props to avoid conflicts
    const { onAnimationStart, onAnimationComplete, ...htmlProps } =
      props as React.HTMLAttributes<HTMLDivElement> & {
        onAnimationStart?: (definition: unknown) => void;
        onAnimationComplete?: (definition: unknown) => void;
      };

    return (
      <motion.h3
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight text-gray-900', className)}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        {...htmlProps}
      >
        {children}
      </motion.h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

// ===== CARD DESCRIPTION =====
const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  // Separate motion props from HTML div props to avoid conflicts
  const { onAnimationStart, onAnimationComplete, ...htmlProps } =
    props as React.HTMLAttributes<HTMLDivElement> & {
      onAnimationStart?: (definition: unknown) => void;
      onAnimationComplete?: (definition: unknown) => void;
    };

  return (
    <motion.p
      ref={ref}
      className={cn('text-sm text-gray-600', className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      {...htmlProps}
    >
      {children}
    </motion.p>
  );
});

CardDescription.displayName = 'CardDescription';

// ===== CARD CONTENT =====
const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    // Separate motion props from HTML div props to avoid conflicts
    const { onAnimationStart, onAnimationComplete, ...htmlProps } =
      props as React.HTMLAttributes<HTMLDivElement> & {
        onAnimationStart?: (definition: unknown) => void;
        onAnimationComplete?: (definition: unknown) => void;
      };

    return (
      <motion.div
        ref={ref}
        className={cn('pt-0', className)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        {...htmlProps}
      >
        {children}
      </motion.div>
    );
  }
);

CardContent.displayName = 'CardContent';

// ===== CARD FOOTER =====
const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    // Separate motion props from HTML div props to avoid conflicts
    const { onAnimationStart, onAnimationComplete, ...htmlProps } =
      props as React.HTMLAttributes<HTMLDivElement> & {
        onAnimationStart?: (definition: unknown) => void;
        onAnimationComplete?: (definition: unknown) => void;
      };

    return (
      <motion.div
        ref={ref}
        className={cn('flex items-center pt-4', className)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        {...htmlProps}
      >
        {children}
      </motion.div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// ===== STAT CARD =====
const StatCard: React.FC<{
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  className?: string;
}> = ({ title, value, change, changeType = 'neutral', icon, trend, className }) => {
  const changeColors = {
    positive: 'text-emerald-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600',
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    stable: '→',
  };

  return (
    <Card variant="elevated" className={cn('hover:shadow-lg', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {change && (
                <span className={cn('text-sm font-medium', changeColors[changeType])}>
                  {change}
                </span>
              )}
            </div>
          </div>
          {icon && (
            <div className="p-3 bg-primary-100 rounded-lg">
              <div className="text-primary-600">{icon}</div>
            </div>
          )}
        </div>
        {trend && (
          <div className="mt-4 flex items-center gap-1 text-sm text-gray-500">
            <span>{trendIcons[trend]}</span>
            <span className="capitalize">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ===== FEATURE CARD =====
const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}> = ({ title, description, icon, action, variant = 'default', className }) => {
  const variantStyles = {
    default: 'border-primary-200 bg-primary-50',
    success: 'border-emerald-200 bg-emerald-50',
    warning: 'border-amber-200 bg-amber-50',
    error: 'border-rose-200 bg-rose-50',
  };

  return (
    <Card
      variant="outlined"
      className={cn(
        'hover:shadow-md transition-all duration-200',
        variantStyles[variant],
        className
      )}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          {icon && (
            <div className="p-3 bg-white rounded-lg w-fit">
              <div className="text-gray-700">{icon}</div>
            </div>
          )}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
          {action && <div className="pt-2">{action}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

// ===== CARD GRID =====
const CardGrid: React.FC<{
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ children, columns = 3, gap = 'md', className }) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div className={cn('grid', columnClasses[columns], gapClasses[gap], className)}>{children}</div>
  );
};

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatCard,
  FeatureCard,
  CardGrid,
};
export default Card;
