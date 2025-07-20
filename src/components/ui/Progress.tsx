
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Progress = ({ 
  value = 0, 
  max = 100, 
  className = '',
  showValue = true,
  size = 'md',
  color = 'primary',
  animated = true,
  label = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6',
  };

  const colors = {
    primary: 'bg-primary-500',
    secondary: 'bg-surface-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    accent: 'bg-accent-500',
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-surface-200">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-sm text-surface-300">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div className={cn(
        'w-full bg-surface-700/50 rounded-full overflow-hidden',
        sizes[size]
      )}>
        <motion.div
          className={cn('h-full rounded-full', colors[color])}
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 1 : 0, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

// Circular progress component
export const CircularProgress = ({ 
  value = 0, 
  max = 100, 
  size = 120,
  strokeWidth = 8,
  className = '',
  color = 'primary',
  showValue = true,
  label = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colors = {
    primary: '#14b8a6',
    secondary: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    accent: '#d946ef',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(100, 116, 139, 0.2)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors[color]}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <span className="text-2xl font-bold text-white">
            {Math.round(percentage)}
          </span>
        )}
        {label && (
          <span className="text-xs text-surface-300 mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default Progress;
