import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Loading = ({ 
  size = 'md', 
  text = '', 
  className = '',
  fullScreen = false 
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const spinner = (
    <div className={cn('animate-spin rounded-full border-b-2 border-primary-400', sizes[size])} />
  );

  const content = (
    <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
      {spinner}
      {text && (
        <p className={cn('text-surface-300', textSizes[size])}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-surface-900/50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

// Skeleton loading component
export const Skeleton = ({ className = '', ...props }) => (
  <div
    className={cn(
      'animate-pulse rounded-md bg-surface-700/50',
      className
    )}
    {...props}
  />
);

// Card skeleton
export const CardSkeleton = () => (
  <div className="glass-card p-6 space-y-4">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <div className="space-y-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-4/6" />
    </div>
  </div>
);

// Table skeleton
export const TableSkeleton = ({ rows = 5, cols = 4 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex space-x-4">
        {Array.from({ length: cols }).map((_, j) => (
          <Skeleton key={j} className="h-4 flex-1" />
        ))}
      </div>
    ))}
  </div>
);

export default Loading;
