import React from 'react';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
  return (
    <input
      className={`flex h-10 sm:h-12 w-full rounded-lg sm:rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:border-primary-400 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 touch-target ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';
