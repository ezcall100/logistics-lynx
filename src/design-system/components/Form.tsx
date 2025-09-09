/**
 * MCP Agents - Redesigned Form Components
 * Modern, accessible forms with validation and comprehensive field types
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Calendar, Clock } from 'lucide-react';

// ===== FORM VARIANTS =====
const formVariants = cva(['space-y-6', 'transition-all duration-200'], {
  variants: {
    variant: {
      default: '',
      card: 'bg-white p-6 rounded-lg border border-gray-200 shadow-sm',
      glass: 'bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20',
    },
    size: {
      sm: 'space-y-4',
      md: 'space-y-6',
      lg: 'space-y-8',
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

    // Separate motion props from HTML form props to avoid conflicts
    const { onAnimationStart, onAnimationComplete, ...htmlProps } = props as FormProps & {
      onAnimationStart?: (definition: unknown) => void;
      onAnimationComplete?: (definition: unknown) => void;
    };

    return (
      <motion.form
        ref={ref}
        className={cn(formVariants({ variant, size }), className)}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...htmlProps}
      >
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
            <motion.div
              className="animate-spin"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-8 h-8 border-4 border-gray-300 border-t-primary-500 rounded-full" />
            </motion.div>
          </div>
        )}
        {children}
      </motion.form>
    );
  }
);

Form.displayName = 'Form';

// ===== FORM FIELD PROPS =====
export interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

// ===== FORM FIELD COMPONENT =====
export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  required,
  className,
  children,
}) => {
  return (
    <motion.div
      className={cn('space-y-2', className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      <AnimatePresence>
        {(error || helperText) && (
          <motion.div
            className="flex items-center gap-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {error ? (
              <>
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600">{error}</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">{helperText}</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ===== FORM GROUP COMPONENT =====
export const FormGroup: React.FC<{
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ children, columns = 1, gap = 'md', className }) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
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

// ===== SELECT COMPONENT =====
export const Select: React.FC<{
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled,
  error,
  className,
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange?.(e.target.value)}
        disabled={disabled}
        className={cn(
          'w-full h-10 px-3 py-2 border rounded-lg',
          'bg-white text-gray-900',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
          {
            'border-gray-300': !error,
            'border-red-500 focus:border-red-500 focus:ring-red-500': error,
          },
          className
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// ===== CHECKBOX COMPONENT =====
export const Checkbox: React.FC<{
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}> = ({ checked = false, onChange, label, disabled, error, className }) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange?.(e.target.checked)}
          disabled={disabled}
          className={cn(
            'w-4 h-4 rounded border-2',
            'focus:outline-none focus:ring-2 focus:ring-primary-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            {
              'border-gray-300 bg-white': !checked && !error,
              'border-primary-500 bg-primary-500': checked && !error,
              'border-red-500': error,
            }
          )}
        />
        {checked && <Check className="absolute inset-0 w-4 h-4 text-white pointer-events-none" />}
      </div>
      {label && <label className="text-sm text-gray-700 dark:text-gray-300">{label}</label>}
    </div>
  );
};

// ===== RADIO GROUP COMPONENT =====
export const RadioGroup: React.FC<{
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}> = ({ options, value, onChange, disabled, error, className }) => {
  return (
    <div className={cn('space-y-3', className)}>
      {options.map(option => (
        <div key={option.value} className="flex items-center gap-3">
          <input
            type="radio"
            id={option.value}
            name="radio-group"
            value={option.value}
            checked={value === option.value}
            onChange={e => onChange?.(e.target.value)}
            disabled={disabled || option.disabled}
            className={cn(
              'w-4 h-4 border-2',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
              'disabled:cursor-not-allowed disabled:opacity-50',
              {
                'border-gray-300': !error,
                'border-red-500': error,
              }
            )}
          />
          <label htmlFor={option.value} className="text-sm text-gray-700 dark:text-gray-300">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

// ===== SWITCH COMPONENT =====
export const Switch: React.FC<{
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}> = ({ checked = false, onChange, label, disabled, error, className }) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <button
        type="button"
        onClick={() => !disabled && onChange?.(!checked)}
        disabled={disabled}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          {
            'bg-primary-600': checked && !error,
            'bg-gray-200': !checked && !error,
            'bg-red-500': error,
          }
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            {
              'translate-x-6': checked,
              'translate-x-1': !checked,
            }
          )}
        />
      </button>
      {label && <label className="text-sm text-gray-700 dark:text-gray-300">{label}</label>}
    </div>
  );
};

// ===== DATE PICKER COMPONENT =====
export const DatePicker: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}> = ({ value, onChange, disabled, error, className }) => {
  return (
    <div className="relative">
      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="date"
        value={value}
        onChange={e => onChange?.(e.target.value)}
        disabled={disabled}
        className={cn(
          'w-full h-10 pl-10 pr-3 py-2 border rounded-lg',
          'bg-white text-gray-900',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
          {
            'border-gray-300': !error,
            'border-red-500 focus:border-red-500 focus:ring-red-500': error,
          },
          className
        )}
      />
    </div>
  );
};

// ===== TIME PICKER COMPONENT =====
export const TimePicker: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}> = ({ value, onChange, disabled, error, className }) => {
  return (
    <div className="relative">
      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="time"
        value={value}
        onChange={e => onChange?.(e.target.value)}
        disabled={disabled}
        className={cn(
          'w-full h-10 pl-10 pr-3 py-2 border rounded-lg',
          'bg-white text-gray-900',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
          {
            'border-gray-300': !error,
            'border-red-500 focus:border-red-500 focus:ring-red-500': error,
          },
          className
        )}
      />
    </div>
  );
};

// ===== FILE UPLOAD COMPONENT =====
export const FileUpload: React.FC<{
  accept?: string;
  multiple?: boolean;
  onChange?: (files: FileList | null) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  children?: React.ReactNode;
}> = ({ accept, multiple, onChange, disabled, error, className, children }) => {
  return (
    <div className={cn('relative', className)}>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={e => onChange?.(e.target.files)}
        disabled={disabled}
        className={cn(
          'absolute inset-0 w-full h-full opacity-0 cursor-pointer',
          'disabled:cursor-not-allowed',
          className
        )}
      />
      <div
        className={cn(
          'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg',
          'transition-colors duration-200',
          {
            'border-gray-300 hover:border-gray-400': !error && !disabled,
            'border-red-500': error,
            'border-gray-200 bg-gray-50': disabled,
          }
        )}
      >
        {children || (
          <>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
            </div>
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
          </>
        )}
      </div>
    </div>
  );
};

// ===== FORM ACTIONS COMPONENT =====
export const FormActions: React.FC<{
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}> = ({ children, align = 'right', className }) => {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <motion.div
      className={cn(
        'flex items-center gap-3 pt-6 border-t border-gray-200',
        alignClasses[align],
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Form;
