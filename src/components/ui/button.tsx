import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-[#B22222] text-white hover:bg-[#8B0000] focus-visible:ring-[#B22222]': variant === 'primary', 
            'bg-white text-[#B22222] border border-[#B22222] hover:bg-[#FDE8E8] focus-visible:ring-[#B22222]': variant === 'secondary', 
            'bg-transparent text-[#B22222] hover:bg-[#FDE8E8] focus-visible:ring-[#B22222]': variant === 'ghost', 

            'h-8 px-3 text-sm': size === 'sm', 
            'h-10 px-4': size === 'md', 
            'h-12 px-6 text-lg': size === 'lg', 
          },
          className
        )}
        {...props}
      />
    );
  }
);
