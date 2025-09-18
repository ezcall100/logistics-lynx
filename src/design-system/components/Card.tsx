/**
 * MCP Agents - Clean Card Component
 * Modern, accessible card with comprehensive features
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// ===== CARD VARIANTS =====
const cardVariants = cva(['rounded-lg border bg-white shadow-sm', 'transition-all duration-200'], {
  variants: {
    variant: {
      default: 'border-gray-200',
      elevated: 'border-gray-200 shadow-md',
      outlined: 'border-gray-300 shadow-none',
      glass: 'bg-white/10 backdrop-blur-md border-white/20',
      minimal: 'border-0 shadow-none bg-transparent',
      gradient: 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white border-0',
    },
    size: {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
    interactive: {
      true: 'cursor-pointer hover:shadow-md hover:border-gray-300',
      false: '',
    },
    animated: {
      true: 'hover:scale-[1.02] hover:-translate-y-1',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    interactive: false,
    animated: false,
  },
});

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
    { className, variant, size, interactive, animated, loading, disabled, children, ...props },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, size, interactive, animated }),
          {
            'opacity-50 cursor-not-allowed': isDisabled,
            'pointer-events-none': loading,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
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
  return (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props}>
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {title && (
              <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>
            )}
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
          {action && <div className="flex items-center">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

// ===== CARD TITLE =====
const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

// ===== CARD DESCRIPTION =====
const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p ref={ref} className={cn('text-sm text-gray-600', className)} {...props}>
      {children}
    </p>
  );
});

CardDescription.displayName = 'CardDescription';

// ===== CARD CONTENT =====
const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('pt-0', className)} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

// ===== CARD FOOTER =====
const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center pt-4', className)} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// ===== STAT CARD =====
const StatCard: React.FC<{
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: React.ReactNode;
  className?: string;
}> = ({ title, value, change, icon, className }) => {
  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p
              className={cn(
                'text-sm',
                change.type === 'increase' ? 'text-emerald-600' : 'text-red-600'
              )}
            >
              {change.type === 'increase' ? '+' : '-'}
              {Math.abs(change.value)}%
            </p>
          )}
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
    </Card>
  );
};

// ===== FEATURE CARD =====
const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}> = ({ title, description, icon, className }) => {
  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start space-x-4">
        {icon && <div className="text-primary-600">{icon}</div>}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </Card>
  );
};

// ===== CARD GRID =====
const CardGrid: React.FC<{
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ children, columns = 3, gap = 'md', className }) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div className={cn('grid', gridClasses[columns], gapClasses[gap], className)}>{children}</div>
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
}