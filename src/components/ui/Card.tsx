
import React, { ReactNode, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  animate?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> & {
  Header: React.FC<CardSubComponentProps>;
  Title: React.FC<CardSubComponentProps>;
  Description: React.FC<CardSubComponentProps>;
  Content: React.FC<CardSubComponentProps>;
  Footer: React.FC<CardSubComponentProps>;
} = ({
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

interface CardSubComponentProps {
  children: ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardSubComponentProps> = ({ children, className = '' }) => (
  <div className={cn('mb-4', className)}>
    {children}
  </div>
);

const CardTitle: React.FC<CardSubComponentProps> = ({ children, className = '' }) => (
  <h3 className={cn('text-xl font-semibold text-white mb-2', className)}>
    {children}
  </h3>
);

const CardDescription: React.FC<CardSubComponentProps> = ({ children, className = '' }) => (
  <p className={cn('text-surface-300 text-sm', className)}>
    {children}
  </p>
);

const CardContent: React.FC<CardSubComponentProps> = ({ children, className = '' }) => (
  <div className={cn('', className)}>
    {children}
  </div>
);

const CardFooter: React.FC<CardSubComponentProps> = ({ children, className = '' }) => (
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
