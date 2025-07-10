
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  animate = true,
  onClick,
  ...props 
}) => {
  const baseClasses = 'glass-card p-6';
  const hoverClasses = hover ? 'card-hover cursor-pointer' : '';
  
  const Component = animate ? motion.div : 'div';
  
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  } : {};

  return (
    <Component
      className={cn(baseClasses, hoverClasses, className)}
      onClick={onClick}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={cn('mb-4', className)}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={cn('text-xl font-semibold text-white mb-2', className)}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={cn('text-surface-300 text-sm', className)}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={cn('', className)}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={cn('mt-4 pt-4 border-t border-white/10', className)}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
