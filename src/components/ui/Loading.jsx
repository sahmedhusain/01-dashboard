
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Loading = ({
  size = 'md',
  text = '',
  className = '',
  fullScreen = false,
  variant = 'spinner',
  progress = null,
  error = null,
  retry = null
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

  // Error state
  if (error) {
    return (
      <div className={cn('flex flex-col items-center justify-center space-y-4 p-6', className)}>
        <div className="text-red-400 text-center">
          <div className="text-2xl mb-2">⚠️</div>
          <p className={cn('text-red-300', textSizes[size])}>
            {error.userMessage || 'Something went wrong'}
          </p>
          {retry && (
            <button
              onClick={retry}
              className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  // Progress bar variant
  if (variant === 'progress' && progress !== null) {
    return (
      <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-sm text-surface-300 mb-2">
            <span>{text || 'Loading...'}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-surface-700 rounded-full h-2">
            <motion.div
              className="bg-primary-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Dots variant
  if (variant === 'dots') {
    return (
      <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={cn('rounded-full bg-primary-400', sizes[size])}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        {text && (
          <p className={cn('text-surface-300', textSizes[size])}>
            {text}
          </p>
        )}
      </div>
    );
  }

  // Default spinner variant
  const spinner = (
    <motion.div
      className={cn('animate-spin rounded-full border-b-2 border-primary-400', sizes[size])}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );

  const content = (
    <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
      {spinner}
      {text && (
        <motion.p
          className={cn('text-surface-300', textSizes[size])}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
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
