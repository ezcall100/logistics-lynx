/**
 * MCP Agents - Redesigned Input Component
 * Modern, accessible input with comprehensive variants and features
 */

import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Search, X, Check, AlertCircle } from 'lucide-react';

// ===== INPUT VARIANTS =====
const inputVariants = cva(
  [
    'flex w-full rounded-lg border border-gray-300',
    'bg-white text-gray-900',
    'placeholder:text-gray-500',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  ],
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:border-primary-500',
        filled: 'bg-gray-50 border-gray-200 focus:bg-white focus:border-primary-500',
        outline: 'bg-transparent border-gray-300 focus:border-primary-500',
        ghost: 'bg-transparent border-transparent focus:border-primary-500 focus:bg-gray-50',
        glass: 'bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/70',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
        xl: 'h-14 px-5 text-lg',
      },
      state: {
        default: '',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
        warning: 'border-amber-500 focus:border-amber-500 focus:ring-amber-500',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
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
  showPasswordToggle?: boolean;
  animated?: boolean;
  loading?: boolean;
}

// ===== INPUT COMPONENT =====
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      state,
      label,
      helperText,
      errorText,
      successText,
      warningText,
      leftIcon,
      rightIcon,
      clearable,
      showPasswordToggle,
      animated = true,
      loading,
      type = 'text',
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');

    // Determine input type
    const inputType = type === 'password' && showPassword ? 'text' : type;

    // Determine state
    const inputState = errorText
      ? 'error'
      : successText
        ? 'success'
        : warningText
          ? 'warning'
          : state;

    // Handle value changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(e);
    };

    // Handle clear
    const handleClear = () => {
      setInternalValue('');
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    };

    // Handle password toggle
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Get right icon
    const getRightIcon = () => {
      if (loading) {
        return (
          <motion.div
            className="animate-spin"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-500 rounded-full" />
          </motion.div>
        );
      }

      if (type === 'password' && showPasswordToggle) {
        return (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        );
      }

      if (clearable && internalValue && !props.disabled) {
        return (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        );
      }

      return rightIcon;
    };

    // Get status icon
    const getStatusIcon = () => {
      if (errorText) return <AlertCircle className="w-4 h-4 text-red-500" />;
      if (successText) return <Check className="w-4 h-4 text-green-500" />;
      if (warningText) return <AlertCircle className="w-4 h-4 text-amber-500" />;
      return null;
    };

    // Get status text
    const getStatusText = () => {
      return errorText || successText || warningText || helperText;
    };

    const inputElement = (
      <div className="relative">
        {/* Label */}
        {label && (
          <motion.label
            className={cn('block text-sm font-medium mb-2', {
              'text-gray-700': !errorText && !successText && !warningText,
              'text-red-700': errorText,
              'text-green-700': successText,
              'text-amber-700': warningText,
            })}
            initial={animated ? { opacity: 0, y: -10 } : false}
            animate={animated ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <motion.input
            ref={ref}
            type={inputType}
            value={internalValue}
            onChange={handleChange}
            onFocus={e => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={e => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={cn(
              inputVariants({ variant, size, state: inputState }),
              {
                'pl-10': leftIcon,
                'pr-10': getRightIcon() || getStatusIcon(),
                'pr-20':
                  (getRightIcon() && getStatusIcon()) || (getRightIcon() && type === 'password'),
              },
              className
            )}
            whileFocus={animated ? { scale: 1.01 } : undefined}
            transition={{ duration: 0.1 }}
            {...(() => {
              const { onAnimationStart, onAnimationComplete, ...htmlProps } =
                props as InputProps & {
                  onAnimationStart?: (definition: unknown) => void;
                  onAnimationComplete?: (definition: unknown) => void;
                };
              return htmlProps;
            })()}
          />

          {/* Right Icons Container */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {/* Status Icon */}
            {getStatusIcon() && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {getStatusIcon()}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Right Icon */}
            {getRightIcon() && <div className="flex-shrink-0">{getRightIcon()}</div>}
          </div>

          {/* Focus Ring */}
          {animated && isFocused && (
            <motion.div
              className="absolute inset-0 rounded-lg ring-2 ring-primary-500 ring-opacity-50 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>

        {/* Helper/Status Text */}
        <AnimatePresence>
          {getStatusText() && (
            <motion.div
              className={cn('mt-2 text-sm', {
                'text-gray-600': helperText && !errorText && !successText && !warningText,
                'text-red-600': errorText,
                'text-green-600': successText,
                'text-amber-600': warningText,
              })}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {getStatusText()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );

    return inputElement;
  }
);

Input.displayName = 'Input';

// ===== SEARCH INPUT COMPONENT =====
const SearchInput: React.FC<Omit<InputProps, 'leftIcon' | 'type'>> = props => {
  return <Input {...props} type="search" leftIcon={<Search className="w-4 h-4" />} clearable />;
};

// ===== PASSWORD INPUT COMPONENT =====
const PasswordInput: React.FC<Omit<InputProps, 'type' | 'showPasswordToggle'>> = props => {
  return <Input {...props} type="password" showPasswordToggle />;
};

// ===== TEXTAREA COMPONENT =====
const Textarea = forwardRef<HTMLTextAreaElement, Omit<InputProps, 'type' | 'size'>>(
  (
    {
      className,
      variant,
      state,
      label,
      helperText,
      errorText,
      successText,
      warningText,
      animated = true,
      ...props
    },
    ref
  ) => {
    const inputState = errorText
      ? 'error'
      : successText
        ? 'success'
        : warningText
          ? 'warning'
          : state;

    return (
      <div className="relative">
        {/* Label */}
        {label && (
          <motion.label
            className={cn('block text-sm font-medium mb-2', {
              'text-gray-700': !errorText && !successText && !warningText,
              'text-red-700': errorText,
              'text-green-700': successText,
              'text-amber-700': warningText,
            })}
            initial={animated ? { opacity: 0, y: -10 } : false}
            animate={animated ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        )}

        {/* Textarea */}
        <motion.textarea
          ref={ref}
          className={cn(
            'flex w-full rounded-lg border border-gray-300',
            'bg-white text-gray-900',
            'placeholder:text-gray-500',
            'px-3 py-2 text-sm',
            'transition-all duration-200 ease-in-out',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
            'resize-vertical min-h-[80px]',
            {
              'border-gray-300 focus:border-primary-500': variant === 'default' || !variant,
              'bg-gray-50 border-gray-200 focus:bg-white focus:border-primary-500':
                variant === 'filled',
              'bg-transparent border-gray-300 focus:border-primary-500': variant === 'outline',
              'bg-transparent border-transparent focus:border-primary-500 focus:bg-gray-50':
                variant === 'ghost',
              'bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/70':
                variant === 'glass',
              'border-red-500 focus:border-red-500 focus:ring-red-500': inputState === 'error',
              'border-green-500 focus:border-green-500 focus:ring-green-500':
                inputState === 'success',
              'border-amber-500 focus:border-amber-500 focus:ring-amber-500':
                inputState === 'warning',
            },
            className
          )}
          whileFocus={animated ? { scale: 1.01 } : undefined}
          transition={{ duration: 0.1 }}
          {...(() => {
            const { onAnimationStart, onAnimationComplete, ...htmlProps } = props as InputProps & {
              onAnimationStart?: (definition: unknown) => void;
              onAnimationComplete?: (definition: unknown) => void;
            };
            return htmlProps;
          })()}
        />

        {/* Helper/Status Text */}
        <AnimatePresence>
          {(helperText || errorText || successText || warningText) && (
            <motion.div
              className={cn('mt-2 text-sm', {
                'text-gray-600': helperText && !errorText && !successText && !warningText,
                'text-red-600': errorText,
                'text-green-600': successText,
                'text-amber-600': warningText,
              })}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {errorText || successText || warningText || helperText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, SearchInput, PasswordInput, Textarea };
export default Input;
