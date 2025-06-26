import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'rounded';
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text', 
    variant = 'default', 
    label,
    error,
    helperText,
    id,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    ...props 
  }, ref) => {
    const baseClasses = "flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    
    const variantClasses = {
      default: "rounded-md",
      rounded: "rounded-full bg-gray-100 border-0"
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${error ? 'border-red-500' : ''} ${className || ''}`.trim();

    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const describedBy = [
      ariaDescribedby,
      error && `${inputId}-error`,
      helperText && `${inputId}-helper`
    ].filter(Boolean).join(' ');

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={combinedClasses}
          ref={ref}
          id={inputId}
          aria-label={ariaLabel || label}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />
        {error && (
          <p 
            id={`${inputId}-error`} 
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p 
            id={`${inputId}-helper`} 
            className="mt-1 text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };