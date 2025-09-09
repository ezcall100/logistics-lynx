/**
 * MCP Agents - Clean Form Component
 * Modern, accessible form with comprehensive features
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// ===== FORM VARIANTS =====
const formVariants = cva(['space-y-4', 'relative'], {
  variants: {
    variant: {
      default: '',
      card: 'p-6 bg-white rounded-lg border border-gray-200 shadow-sm',
      minimal: '',
    },
    size: {
      sm: 'space-y-3',
      md: 'space-y-4',
      lg: 'space-y-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// ===== FORM PROPS =====
export interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>,
    VariantProps<typeof formVariants> {
  loading?: boolean;
  onSubmit?: (data: FormData) => void;
}

// ===== FORM COMPONENT =====
const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, variant, size, loading, onSubmit, children, ...props }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (loading) return;

      const formData = new FormData(e.currentTarget);
      onSubmit?.(formData);
    };

    return (
      <form
        ref={ref}
        className={cn(formVariants({ variant, size }), className)}
        onSubmit={handleSubmit}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
            <div className="animate-spin">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-primary-500 rounded-full" />
            </div>
          </div>
        )}
        {children}
      </form>
    );
  }
);

Form.displayName = 'Form';

// ===== FORM FIELD =====
const FormField: React.FC<{
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ label, error, required, children, className }) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

// ===== FORM GROUP =====
const FormGroup: React.FC<{
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ children, columns = 1, gap = 'md', className }) => {
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

// ===== FORM ACTIONS =====
const FormActions: React.FC<{
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right' | 'between';
  className?: string;
}> = ({ children, align = 'right', className }) => {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div className={cn('flex items-center gap-3 pt-4', alignClasses[align], className)}>
      {children}
    </div>
  );
};

// ===== FORM SECTION =====
const FormSection: React.FC<{
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, description, children, className }) => {
  return (
    <div className={cn('space-y-4', className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

// ===== DATE PICKER =====
const DatePicker: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}> = ({ value, onChange, label, error, required, className }) => {
  return (
    <FormField label={label} error={error} required={required}>
      <input
        type="date"
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className={cn(
          'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      />
    </FormField>
  );
};

// ===== TIME PICKER =====
const TimePicker: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}> = ({ value, onChange, label, error, required, className }) => {
  return (
    <FormField label={label} error={error} required={required}>
      <input
        type="time"
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className={cn(
          'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      />
    </FormField>
  );
};

export { Form, FormField, FormGroup, FormActions, FormSection, DatePicker, TimePicker };
export default Form;
