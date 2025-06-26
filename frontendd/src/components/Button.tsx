import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  ariaLabel?: string;
  description?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'default', 
    asChild = false, 
    ariaLabel,
    description,
    children,
    ...props 
  }, ref) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    };
    
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`.trim();

    const getAccessibleText = () => {
      if (ariaLabel) return ariaLabel;
      if (typeof children === 'string') return children;
      if (description) return description;
      return props.title || 'Bouton';
    };

    const hasOnlyIcon = size === 'icon' || (React.Children.count(children) === 1 && typeof children !== 'string');

    return (
      <button
        className={combinedClasses}
        ref={ref}
        aria-label={hasOnlyIcon ? getAccessibleText() : undefined}
        aria-describedby={description ? `${props.id || 'button'}-description` : undefined}
        {...props}
      >
        {children}
        {description && (
          <span id={`${props.id || 'button'}-description`} className="sr-only">
            {description}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };