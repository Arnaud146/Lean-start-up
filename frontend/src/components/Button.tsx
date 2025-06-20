import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`bg-primary text-white font-semibold rounded-2xl px-6 py-3 shadow-md hover:opacity-90 focus:outline-none ${className}`}
    {...props}
  >
    {children}
  </button>
);