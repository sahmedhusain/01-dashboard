
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  animate = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    default: 'bg-surface-700 text-surface-200',
    primary: 'bg-primary-500/20 text-primary-300 border border-primary-500/30',
    secondary: 'bg-surface-600 text-surface-200',
    success: 'bg-green-500/20 text-green-300 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-300 border border-red-500/30',
    accent: 'bg-accent-500/20 text-accent-300 border border-accent-500/30',
    outline: 'border border-surface-500 text-surface-300',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  const Component = animate ? motion.span : 'span';
  const animationProps = animate ? {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: 'spring', stiffness: 500, damping: 30 },
  } : {};

  return (
    <Component
      className={classes}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
};

// Status badge for pass/fail
export const StatusBadge = ({ status, className = '' }) => {
  const isPass = status === 'pass' || status === 'PASS' || status === true || status >= 1;
  
  return (
    <Badge
      variant={isPass ? 'success' : 'danger'}
      className={className}
      animate
    >
      {isPass ? 'Pass' : 'Fail'}
    </Badge>
  );
};

// Level badge
export const LevelBadge = ({ level, className = '' }) => (
  <Badge
    variant="primary"
    className={className}
    animate
  >
    Level {level}
  </Badge>
);

// XP badge
export const XPBadge = ({ xp, className = '' }) => (
  <Badge
    variant="accent"
    className={className}
    animate
  >
    {xp.toLocaleString()} XP
  </Badge>
);

export default Badge;
