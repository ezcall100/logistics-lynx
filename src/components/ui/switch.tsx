import React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onCheckedChange?: (checked: boolean) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked);
      onChange?.(e);
    };

    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
      <label className="inline-flex items-center cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid">
        <input
          type="checkbox"
          className="sr-only peer responsive-container sm:flex-col md:flex-row lg:grid"
          ref={ref}
          onChange={handleChange}
          {...props}
        />
        <div
          className={cn(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
            'bg-gray-200 peer-checked:bg-primary',
            'peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
            className
          )}
        >
          <span
            className={cn(
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
              'translate-x-1 peer-checked:translate-x-6'
            )}
          />
        </div>
      </label>
    );
  }
);
Switch.displayName = 'Switch';

export { Switch };
