import React from 'react';
import { motion } from 'framer-motion';

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(({ className, children, ...props }, ref) => {
  return (
    <motion.select
      whileFocus={{ scale: 1.02, y: -2 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex h-10 sm:h-12 w-full items-center justify-between rounded-lg sm:rounded-xl border border-white/20 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 hover:border-emerald-400/30 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl focus:shadow-emerald-500/10 [&>option]:bg-slate-800 [&>option]:text-white ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </motion.select>
  );
});

Select.displayName = 'Select';
