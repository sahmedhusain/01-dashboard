import React, { ReactNode } from 'react';
import {
  Box,
  Paper,
  Card,
  Button,
  Chip,
  Avatar,
  Typography,
  useTheme,
  alpha,
  ButtonProps,
  ChipProps,
  AvatarProps,
  TypographyProps,
  BoxProps,
} from '@mui/material';
import { motion } from 'framer-motion';
import { springs } from '../motion/MotionSystem';

// Motion variants for MD3 components
export const md3Variants = {
  // Surface elevation animations
  surfaceElevated: {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    },
    hover: {
      scale: 1.02,
      y: -4,
      boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
      transition: springs.quick,
    },
    tap: {
      scale: 0.98,
      y: 0,
      transition: springs.quick,
    },
  },

  // Button state animations
  buttonMotion: {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05, 
      transition: springs.bouncy 
    },
    tap: { 
      scale: 0.95, 
      transition: springs.quick 
    },
  },

  // Chip animations
  chipMotion: {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 2,
      transition: springs.bouncy 
    },
    tap: { 
      scale: 0.9, 
      rotate: -1,
      transition: springs.quick 
    },
  },

  // Fade and slide animations
  fadeInUp: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: springs.gentle 
    },
  },

  // Stagger container
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
} as const;

// Enhanced MD3 Surface Component
interface MD3SurfaceProps {
  children: ReactNode;
  variant?: 'elevated' | 'filled' | 'outlined';
  level?: 1 | 2 | 3 | 4 | 5;
  interactive?: boolean;
  animate?: boolean;
  sx?: any;
  onClick?: () => void;
}

export const MD3Surface: React.FC<MD3SurfaceProps> = ({
  children,
  variant = 'elevated',
  level = 1,
  interactive = false,
  animate = true,
  sx,
  onClick,
  ...props
}) => {
  const theme = useTheme();
  
  const getSurfaceStyles = () => {
    const baseStyles = {
      borderRadius: 3,
      overflow: 'hidden',
      cursor: interactive ? 'pointer' : 'default',
    };

    switch (variant) {
      case 'filled':
        return {
          ...baseStyles,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          border: 'none',
        };
      case 'outlined':
        return {
          ...baseStyles,
          background: 'transparent',
          border: `1px solid ${alpha(theme.palette.grey[400], 0.5)}`,
        };
      default: // elevated
        return {
          ...baseStyles,
          background: theme.palette.background.paper,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        };
    }
  };

  return (
    <motion.div
      variants={interactive && animate ? md3Variants.surfaceElevated : undefined}
      initial={animate ? "rest" : undefined}
      whileHover={interactive && animate ? "hover" : undefined}
      whileTap={interactive && animate ? "tap" : undefined}
      onClick={onClick}
      style={{ display: 'inline-block', width: '100%' }}
    >
      <Paper
        elevation={variant === 'elevated' ? level : 0}
        sx={{
          ...getSurfaceStyles(),
          ...sx,
        }}
        {...props}
      >
        {children}
      </Paper>
    </motion.div>
  );
};

// Enhanced MD3 Card Component
interface MD3CardProps {
  children: ReactNode;
  variant?: 'elevated' | 'filled' | 'outlined';
  interactive?: boolean;
  animate?: boolean;
  loading?: boolean;
  sx?: any;
  onClick?: () => void;
}

export const MD3Card: React.FC<MD3CardProps> = ({
  children,
  variant = 'elevated',
  interactive = true,
  animate = true,
  loading = false,
  sx,
  onClick,
  ...props
}) => {
  const theme = useTheme();

  return (
    <motion.div
      variants={interactive && animate ? md3Variants.surfaceElevated : undefined}
      initial={animate ? "rest" : undefined}
      whileHover={interactive && animate ? "hover" : undefined}
      whileTap={interactive && animate ? "tap" : undefined}
      onClick={onClick}
      style={{ display: 'inline-block', width: '100%' }}
    >
      <Card
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          cursor: interactive ? 'pointer' : 'default',
          background: variant === 'filled' 
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`
            : theme.palette.background.paper,
          border: variant === 'outlined' 
            ? `1px solid ${alpha(theme.palette.grey[400], 0.5)}`
            : `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          position: 'relative',
          '&::before': loading ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
            animation: 'shimmer 1.5s infinite',
          } : {},
          '@keyframes shimmer': {
            '0%': { left: '-100%' },
            '100%': { left: '100%' },
          },
          ...sx,
        }}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  );
};

// Enhanced MD3 Button Component
interface MD3ButtonProps extends Omit<ButtonProps, 'ref'> {
  children: ReactNode;
  motionVariant?: 'standard' | 'bouncy' | 'gentle';
  glowEffect?: boolean;
}

export const MD3Button: React.FC<MD3ButtonProps> = ({
  children,
  motionVariant = 'standard',
  glowEffect = false,
  variant = 'contained',
  sx,
  ...props
}) => {
  const theme = useTheme();
  
  const getMotionConfig = () => {
    switch (motionVariant) {
      case 'bouncy':
        return {
          whileHover: { scale: 1.08, transition: springs.bouncy },
          whileTap: { scale: 0.92, transition: springs.quick },
        };
      case 'gentle':
        return {
          whileHover: { scale: 1.02, transition: springs.gentle },
          whileTap: { scale: 0.98, transition: springs.quick },
        };
      default:
        return {
          whileHover: { scale: 1.05, transition: springs.quick },
          whileTap: { scale: 0.95, transition: springs.quick },
        };
    }
  };

  return (
    <motion.div style={{ display: 'inline-block' }} {...getMotionConfig()}>
      <Button
        variant={variant}
        sx={{
          borderRadius: 5,
          textTransform: 'none',
          fontWeight: 500,
          position: 'relative',
          overflow: 'hidden',
          ...(glowEffect && {
            '&:hover': {
              boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.5)}`,
            },
          }),
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, transparent, ${alpha('#ffffff', 0.2)}, transparent)`,
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
          ...sx,
        }}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

// Enhanced MD3 Chip Component
interface MD3ChipProps extends Omit<ChipProps, 'ref'> {
  motionVariant?: 'standard' | 'bouncy' | 'gentle';
  glowEffect?: boolean;
}

export const MD3Chip: React.FC<MD3ChipProps> = ({
  motionVariant = 'standard',
  glowEffect = false,
  variant = 'filled',
  sx,
  ...props
}) => {
  const theme = useTheme();

  return (
    <motion.div
      style={{ display: 'inline-block' }}
      variants={md3Variants.chipMotion}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      <Chip
        variant={variant}
        sx={{
          borderRadius: 2,
          '& .MuiChip-label': {
            fontWeight: 500,
          },
          ...(glowEffect && {
            '&:hover': {
              boxShadow: `0 0 12px ${alpha(theme.palette.primary.main, 0.4)}`,
            },
          }),
          ...sx,
        }}
        {...props}
      />
    </motion.div>
  );
};

// Enhanced MD3 Avatar Component
interface MD3AvatarProps extends Omit<AvatarProps, 'ref'> {
  interactive?: boolean;
  glowEffect?: boolean;
  level?: number;
  rank?: number;
}

export const MD3Avatar: React.FC<MD3AvatarProps> = ({
  interactive = false,
  glowEffect = false,
  level,
  rank,
  sx,
  children,
  ...props
}) => {
  const theme = useTheme();

  const getBorderColor = () => {
    if (rank !== undefined) {
      if (rank <= 3) return theme.palette.warning.main; // Gold for top 3
      if (rank <= 10) return theme.palette.info.main; // Blue for top 10
      return theme.palette.success.main; // Green for others
    }
    return theme.palette.primary.main;
  };

  return (
    <Box position="relative" display="inline-block">
      <motion.div
        style={{ display: 'inline-block' }}
        whileHover={interactive ? { scale: 1.1, transition: springs.bouncy } : undefined}
        whileTap={interactive ? { scale: 0.9, transition: springs.quick } : undefined}
      >
        <Avatar
          sx={{
            cursor: interactive ? 'pointer' : 'default',
            border: `3px solid ${getBorderColor()}`,
            ...(glowEffect && {
              boxShadow: `0 0 16px ${alpha(getBorderColor(), 0.5)}`,
            }),
            ...sx,
          }}
          {...props}
        >
          {children}
        </Avatar>
      </motion.div>
      
      {level && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={springs.bouncy}
          style={{
            position: 'absolute',
            bottom: -4,
            right: -4,
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: '50%',
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            border: `2px solid ${theme.palette.background.paper}`,
          }}
        >
          {level}
        </motion.div>
      )}
      
      {rank && rank <= 3 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={springs.bouncy}
          style={{
            position: 'absolute',
            top: -8,
            left: -8,
            fontSize: '1.5rem',
          }}
        >
          {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
        </motion.div>
      )}
    </Box>
  );
};

// Enhanced Typography with animation support
interface MD3TypographyProps extends Omit<TypographyProps, 'ref'> {
  animate?: boolean;
  gradient?: boolean;
  delay?: number;
}

export const MD3Typography: React.FC<MD3TypographyProps> = ({
  animate = false,
  gradient = false,
  delay = 0,
  sx,
  children,
  ...props
}) => {
  const theme = useTheme();

  return (
    <motion.div
      style={{ display: 'inline-block' }}
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={animate ? { ...springs.gentle, delay } : undefined}
    >
      <Typography
        sx={{
          ...(gradient && {
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }),
          ...sx,
        }}
        {...props}
      >
        {children}
      </Typography>
    </motion.div>
  );
};

// Container with stagger animation
interface MD3ContainerProps extends Omit<BoxProps, 'ref'> {
  children: ReactNode;
  stagger?: boolean;
  delay?: number;
}

export const MD3Container: React.FC<MD3ContainerProps> = ({
  children,
  stagger = false,
  delay = 0,
  ...props
}) => {
  return (
    <motion.div
      style={{ width: '100%' }}
      variants={stagger ? md3Variants.staggerContainer : undefined}
      initial={stagger ? "hidden" : undefined}
      animate={stagger ? "visible" : undefined}
      transition={stagger ? { delay } : undefined}
    >
      <Box {...props}>
        {children}
      </Box>
    </motion.div>
  );
};

// Progress indicator with animation
interface MD3ProgressProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  animate?: boolean;
}

export const MD3Progress: React.FC<MD3ProgressProps> = ({
  value,
  max = 100,
  label,
  color = 'primary',
  animate = true,
}) => {
  const theme = useTheme();
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <Box>
      {label && (
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {value}/{max}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          width: '100%',
          height: 8,
          borderRadius: 4,
          backgroundColor: alpha(theme.palette[color].main, 0.2),
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={animate ? { width: 0 } : undefined}
          animate={animate ? { width: `${percentage}%` } : undefined}
          transition={animate ? { ...springs.gentle, delay: 0.5 } : undefined}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${theme.palette[color].main}, ${theme.palette[color].light})`,
            borderRadius: 4,
            width: animate ? undefined : `${percentage}%`,
          }}
        />
      </Box>
    </Box>
  );
};

export default {
  MD3Surface,
  MD3Card,
  MD3Button,
  MD3Chip,
  MD3Avatar,
  MD3Typography,
  MD3Container,
  MD3Progress,
  md3Variants,
};
