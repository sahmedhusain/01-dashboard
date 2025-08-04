import React from 'react';
import { motion } from 'framer-motion';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
  return (
    <motion.input
      whileFocus={{ scale: 1.02, y: -2 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex h-10 sm:h-12 w-full rounded-lg sm:rounded-xl border border-white/20 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:border-emerald-400/50 hover:border-emerald-400/30 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl focus:shadow-emerald-500/10 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';
