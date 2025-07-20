
import React, { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Loader2, BarChart3, User, Trophy, TrendingUp, Award, Users } from 'lucide-react';

type LoadingSize = 'sm' | 'md' | 'lg' | 'xl';
type LoadingVariant = 'spinner' | 'dots' | 'progress';

interface LoadingError {
  userMessage?: string;
}

interface LoadingProps {
  size?: LoadingSize;
  text?: string;
  className?: string;
  fullScreen?: boolean;
  variant?: LoadingVariant;
  progress?: number | null;
  error?: LoadingError | null;
  retry?: (() => void) | null;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text = '',
  className = '',
  fullScreen = false,
  variant = 'spinner',
  progress = null,
  error = null,
  retry = null
}) => {
  const sizes: Record<LoadingSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const textSizes: Record<LoadingSize, string> = {
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
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', ...props }) => (
  <div
    className={cn(
      'animate-pulse rounded-md bg-surface-700/50',
      className
    )}
    {...props}
  />
);

// Card skeleton
export const CardSkeleton: React.FC = () => (
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
interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, cols = 4 }) => (
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

// ============================================================================
// ENHANCED LOADING STATES FOR PROFESSIONAL DASHBOARD
// ============================================================================

/**
 * Context-aware loading component for different dashboard sections
 */
type DashboardSection = 'profile' | 'stats' | 'progress' | 'analytics' | 'achievements' | 'audits' | 'general';

interface DashboardLoadingProps {
  section?: DashboardSection;
  message?: string;
}

export const DashboardLoading: React.FC<DashboardLoadingProps> = ({ section = 'general', message = '' }) => {
  const sectionConfig = {
    profile: {
      icon: User,
      title: 'Loading Profile',
      description: 'Fetching user information and statistics...',
      color: 'text-blue-400'
    },
    stats: {
      icon: BarChart3,
      title: 'Loading Statistics',
      description: 'Analyzing your performance data...',
      color: 'text-green-400'
    },
    progress: {
      icon: TrendingUp,
      title: 'Loading Progress',
      description: 'Calculating your learning progress...',
      color: 'text-purple-400'
    },
    analytics: {
      icon: Users,
      title: 'Loading Analytics',
      description: 'Comparing with peer performance...',
      color: 'text-orange-400'
    },
    achievements: {
      icon: Award,
      title: 'Loading Achievements',
      description: 'Checking your milestones and badges...',
      color: 'text-yellow-400'
    },
    audits: {
      icon: Trophy,
      title: 'Loading Audits',
      description: 'Fetching audit history and ratings...',
      color: 'text-red-400'
    },
    general: {
      icon: Loader2,
      title: 'Loading',
      description: message || 'Please wait while we load your data...',
      color: 'text-primary-400'
    }
  };

  const config = sectionConfig[section] || sectionConfig.general;
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={`mb-4 ${config.color}`}
      >
        <Icon className="w-12 h-12" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold text-white mb-2"
      >
        {config.title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-surface-400 text-center max-w-md"
      >
        {config.description}
      </motion.p>

      {/* Animated dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex space-x-1 mt-4"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className={`w-2 h-2 rounded-full ${config.color.replace('text-', 'bg-')}`}
          />
        ))}
      </motion.div>
    </div>
  );
};

/**
 * Progressive loading component with stages
 */
interface ProgressiveLoadingProps {
  stages?: string[];
  currentStage?: number;
}

export const ProgressiveLoading: React.FC<ProgressiveLoadingProps> = ({ stages = [], currentStage = 0 }) => {
  const defaultStages = [
    'Connecting to server...',
    'Authenticating user...',
    'Loading user data...',
    'Processing analytics...',
    'Finalizing dashboard...'
  ];

  const loadingStages = stages.length > 0 ? stages : defaultStages;
  const progress = ((currentStage + 1) / loadingStages.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 max-w-md mx-auto">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-6 text-primary-400"
      >
        <Loader2 className="w-12 h-12" />
      </motion.div>

      <div className="w-full mb-6">
        <div className="flex justify-between text-sm text-surface-400 mb-2">
          <span>Loading...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-surface-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="space-y-2 w-full">
        {loadingStages.map((stage, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: index <= currentStage ? 1 : 0.3,
              x: 0
            }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center space-x-3 text-sm ${
              index <= currentStage ? 'text-white' : 'text-surface-500'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              index < currentStage ? 'bg-green-400' :
              index === currentStage ? 'bg-primary-400' :
              'bg-surface-600'
            }`} />
            <span>{stage}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/**
 * Chart loading placeholder
 */
type ChartType = 'line' | 'pie' | 'bar' | 'radar';

interface ChartLoadingSkeletonProps {
  type?: ChartType;
}

export const ChartLoadingSkeleton: React.FC<ChartLoadingSkeletonProps> = ({ type = 'line' }) => {
  const renderChartSkeleton = () => {
    switch (type) {
      case 'pie':
        return (
          <div className="flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-surface-700 border-t-primary-400 animate-spin" />
          </div>
        );
      case 'bar':
        return (
          <div className="flex items-end justify-between h-32 space-x-2">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-surface-700 rounded-t"
                style={{ width: '12px' }}
                animate={{ height: [20, Math.random() * 80 + 20, 20] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        );
      case 'radar':
        return (
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border border-surface-700 rounded-full"
                  style={{
                    transform: `scale(${(i + 1) * 0.15})`,
                    opacity: 0.3 + (i * 0.1)
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10 + i, repeat: Infinity, ease: "linear" }}
                />
              ))}
            </div>
          </div>
        );
      default: // line
        return (
          <div className="h-32 flex items-end">
            <svg className="w-full h-full">
              <motion.path
                d="M 0 100 Q 50 50 100 80 T 200 60 T 300 90"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-surface-700"
                pathLength="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="p-6 bg-surface-800/50 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      {renderChartSkeleton()}
    </div>
  );
};

export default Loading;
