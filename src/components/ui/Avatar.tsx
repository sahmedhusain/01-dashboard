import { useState } from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { getAvatarUrl, getUserDisplayName } from '../../utils/dataFormatting';

interface AvatarProps {
  user: any;
  size?: string;
  className?: string;
  showBorder?: boolean;
  animate?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

/**
 * Avatar component with fallback support
 * Displays user avatar image with fallback to gradient background and user icon
 */
const Avatar = ({
  user,
  size = 'md',
  className = '',
  showBorder = false,
  animate = true,
  onClick = () => {},
  ...props
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  
  const avatarUrl = getAvatarUrl(user);
  const displayName = getUserDisplayName(user);
  
  // Size configurations
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
  };
  
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
    '2xl': 'w-16 h-16',
  };
  
  const baseClasses = cn(
    'rounded-full flex items-center justify-center overflow-hidden',
    sizeClasses[size],
    showBorder && 'border-2 border-primary-400',
    onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
    className
  );
  
  const Component = animate ? motion.div : 'div';
  
  const animationProps = animate ? {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.2 },
    whileHover: onClick ? { scale: 1.05 } : undefined,
    whileTap: onClick ? { scale: 0.95 } : undefined,
  } : {};
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <Component
      className={baseClasses}
      onClick={onClick}
      title={displayName}
      {...animationProps}
      {...props}
    >
      {avatarUrl && !imageError ? (
        <img
          src={avatarUrl}
          alt={`${displayName}'s avatar`}
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-primary-400 to-accent-400 flex items-center justify-center">
          <User className={cn('text-white', iconSizes[size])} />
        </div>
      )}
    </Component>
  );
};

/**
 * Avatar group component for displaying multiple avatars
 */
export const AvatarGroup = ({ 
  users = [], 
  max = 3, 
  size = 'md', 
  className = '',
  showMore = true,
  onMoreClick,
  ...props 
}) => {
  const displayUsers = users.slice(0, max);
  const remainingCount = users.length - max;
  
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-lg',
    '2xl': 'w-32 h-32 text-xl',
  };
  
  return (
    <div className={cn('flex -space-x-2', className)} {...props}>
      {displayUsers.map((user, index) => (
        <Avatar
          key={user?.id || index}
          user={user}
          size={size}
          showBorder
          className="relative z-10"
          style={{ zIndex: displayUsers.length - index }}
        />
      ))}
      
      {showMore && remainingCount > 0 && (
        <motion.div
          className={cn(
            'rounded-full bg-surface-600 border-2 border-primary-400 flex items-center justify-center text-white font-medium cursor-pointer hover:bg-surface-500 transition-colors',
            sizeClasses[size]
          )}
          onClick={onMoreClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={`${remainingCount} more users`}
        >
          +{remainingCount}
        </motion.div>
      )}
    </div>
  );
};

/**
 * Avatar with status indicator
 */
export const AvatarWithStatus = ({ 
  user, 
  status = 'offline', 
  size = 'md', 
  className = '',
  ...props 
}) => {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-surface-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };
  
  const statusSizes = {
    xs: 'w-2 h-2',
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
    '2xl': 'w-6 h-6',
  };
  
  return (
    <div className={cn('relative inline-block', className)}>
      <Avatar user={user} size={size} {...props} />
      <div
        className={cn(
          'absolute bottom-0 right-0 rounded-full border-2 border-surface-800',
          statusColors[status],
          statusSizes[size]
        )}
        title={`Status: ${status}`}
      />
    </div>
  );
};

/**
 * Clickable avatar with hover effects
 */
export const ClickableAvatar = ({
  user,
  onClick,
  size = 'md',
  className = '',
  showTooltip: _showTooltip = true,
  ...props
}) => {
  return (
    <Avatar
      user={user}
      size={size}
      onClick={onClick}
      className={cn(
        'transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/20',
        className
      )}
      animate
      {...props}
    />
  );
};

export default Avatar;
