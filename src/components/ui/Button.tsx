import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            {
              'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600': variant === 'primary',
              'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500': variant === 'secondary',
              'border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500': variant === 'outline',
              'hover:bg-gray-100 hover:text-gray-900': variant === 'ghost',
              'h-9 px-3 text-sm': size === 'sm',
              'h-10 px-4 py-2': size === 'md',
              'h-11 px-8': size === 'lg',
            },
            className
          )
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
