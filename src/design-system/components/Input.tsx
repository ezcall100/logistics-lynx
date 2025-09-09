/**
 * MCP Agents - Clean Input Component
 * Modern, accessible input with comprehensive features
 */

import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Eye, EyeOff, Search, X } from 'lucide-react';

// ===== INPUT VARIANTS =====
const inputVariants = cva(
  [
    'flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
    'placeholder:text-gray-400',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-colors duration-200',
  ],
  {
    variants: {
      variant: {
        default: 'border-gray-300',
        error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
        success: 'border-emerald-500 focus:ring-emerald-500 focus:border-emerald-500',
        warning: 'border-amber-500 focus:ring-amber-500 focus:border-amber-500',
      },
      inputSize: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
        xl: 'h-14 px-5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

// ===== INPUT PROPS =====
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  warningText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

// ===== INPUT COMPONENT =====
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      label,
      helperText,
      errorText,
      successText,
      warningText,
      leftIcon,
      rightIcon,
      clearable,
      onClear,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');

    const isPassword = props.type === 'password';
    const hasError = !!errorText;
    const hasSuccess = !!successText;
    const hasWarning = !!warningText;

    const inputVariant = hasError
      ? 'error'
      : hasSuccess
        ? 'success'
        : hasWarning
          ? 'warning'
          : variant;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(e);
    };

    const handleClear = () => {
      setInternalValue('');
      onClear?.();
    };

    const getStatusIcon = () => {
      if (hasError) return <X className="w-4 h-4 text-red-500" />;
      if (hasSuccess) return <div className="w-4 h-4 text-emerald-500">✓</div>;
      if (hasWarning) return <div className="w-4 h-4 text-amber-500">⚠</div>;
      return null;
    };

    const getStatusText = () => {
      return errorText || successText || warningText || helperText;
    };

    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              inputVariants({ variant: inputVariant, inputSize }),
              {
                'pl-10': leftIcon,
                'pr-10': rightIcon || clearable || isPassword,
              },
              className
            )}
            value={internalValue}
            onChange={handleChange}
            type={isPassword && showPassword ? 'text' : props.type}
            {...props}
          />

          {/* Right Icons Container */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {/* Status Icon */}
            {getStatusIcon()}

            {/* Clear Button */}
            {clearable && internalValue && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Password Toggle */}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}

            {/* Right Icon */}
            {rightIcon && !isPassword && !clearable && (
              <div className="text-gray-400">{rightIcon}</div>
            )}
          </div>
        </div>

        {/* Helper/Status Text */}
        {getStatusText() && (
          <p
            className={cn(
              'mt-1 text-xs',
              hasError
                ? 'text-red-600'
                : hasSuccess
                  ? 'text-emerald-600'
                  : hasWarning
                    ? 'text-amber-600'
                    : 'text-gray-500'
            )}
          >
            {getStatusText()}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ===== SEARCH INPUT =====
const SearchInput: React.FC<Omit<InputProps, 'leftIcon'>> = props => {
  return (
    <Input
      {...props}
      leftIcon={<Search className="w-4 h-4" />}
      placeholder={props.placeholder || 'Search...'}
    />
  );
};

// ===== PASSWORD INPUT =====
const PasswordInput: React.FC<Omit<InputProps, 'type'>> = props => {
  return <Input {...props} type="password" />;
};

// ===== TEXTAREA =====
const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    variant?: 'default' | 'error' | 'success' | 'warning';
    label?: string;
    helperText?: string;
    errorText?: string;
    successText?: string;
    warningText?: string;
    rows?: number;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  }
>(
  (
    {
      className,
      variant,
      label,
      helperText,
      errorText,
      successText,
      warningText,
      rows = 3,
      resize = 'vertical',
      ...props
    },
    ref
  ) => {
    const hasError = !!errorText;
    const hasSuccess = !!successText;
    const hasWarning = !!warningText;

    const inputVariant = hasError
      ? 'error'
      : hasSuccess
        ? 'success'
        : hasWarning
          ? 'warning'
          : variant;

    const getStatusText = () => {
      return errorText || successText || warningText || helperText;
    };

    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

        <textarea
          ref={ref}
          className={cn(
            inputVariants({ variant: inputVariant, inputSize: 'md' }),
            'min-h-[80px] resize-' + resize,
            className
          )}
          rows={rows}
          {...props}
        />

        {/* Helper/Status Text */}
        {getStatusText() && (
          <p
            className={cn(
              'mt-1 text-xs',
              hasError
                ? 'text-red-600'
                : hasSuccess
                  ? 'text-emerald-600'
                  : hasWarning
                    ? 'text-amber-600'
                    : 'text-gray-500'
            )}
          >
            {getStatusText()}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, SearchInput, PasswordInput, Textarea };
export default Input;
