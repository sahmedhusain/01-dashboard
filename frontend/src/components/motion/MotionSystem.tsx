import { motion, Variants, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

// Physics-based spring configurations for Material Design 3
export const springs = {
  // Quick interactions (buttons, toggles)
  quick: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  },
  // Gentle animations (cards, dialogs)
  gentle: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
    mass: 1,
  },
  // Bouncy interactions (FABs, important actions)
  bouncy: {
    type: 'spring' as const,
    stiffness: 250,
    damping: 20,
    mass: 0.7,
  },
  // Smooth page transitions
  smooth: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 20,
    mass: 1.2,
  },
} as const;

// Animation variants for common patterns
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.gentle,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: springs.quick,
  },
};

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: springs.gentle,
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: springs.quick,
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springs.bouncy,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: springs.quick,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.gentle,
  },
};

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: springs.smooth,
  },
  out: {
    opacity: 0,
    x: -100,
    scale: 1.02,
    transition: springs.quick,
  },
};

// Hover and tap animations
export const buttonHover = {
  scale: 1.02,
  transition: springs.quick,
};

export const buttonTap = {
  scale: 0.98,
  transition: springs.quick,
};

export const cardHover = {
  y: -8,
  scale: 1.02,
  transition: springs.gentle,
};

// Animated components
interface AnimatedContainerProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

export function AnimatedContainer({ 
  children, 
  variants = fadeInUp, 
  className,
  delay = 0 
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  whileHover?: boolean;
}

export function AnimatedCard({ children, className, whileHover = true }: AnimatedCardProps) {
  const shouldReduceMotion = useReducedMotion();
  
  const hoverProps = whileHover && !shouldReduceMotion ? {
    whileHover: cardHover,
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverProps}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function AnimatedButton({ children, className, onClick, disabled }: AnimatedButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  
  const animationProps = !shouldReduceMotion ? {
    whileHover: disabled ? {} : buttonHover,
    whileTap: disabled ? {} : buttonTap,
  } : {};

  return (
    <motion.button
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...animationProps}
    >
      {children}
    </motion.button>
  );
}

// Page transition wrapper
interface PageTransitionProps {
  children: ReactNode;
  key?: string;
}

export function PageTransition({ children, key }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
