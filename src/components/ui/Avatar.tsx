import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'

interface AvatarProps {
  user: any
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  showBorder?: boolean
  animate?: boolean
  onClick?: () => void
}

const Avatar: React.FC<AvatarProps> = ({ 
  user, 
  size = 'md', 
  className = '', 
  showBorder = false,
  animate = true,
  onClick,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false)
  
  // Size configurations
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
  }
  
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
    '2xl': 'w-16 h-16',
  }

  // Enhanced avatar URL generation with better fallback logic
  const getAvatarUrl = (user: any) => {
    if (!user) return null

    // Try different avatar sources in order of preference
    const attrs = user.attrs || {}

    // 1. Check for direct avatar URLs in attrs
    if (attrs.avatar) {
      // Handle base64 encoded images
      if (typeof attrs.avatar === 'string') {
        if (attrs.avatar.startsWith('data:image/')) {
          return attrs.avatar
        }
        // Handle URL strings
        if (attrs.avatar.startsWith('http')) {
          return attrs.avatar
        }
        // Handle base64 without data prefix
        if (attrs.avatar.length > 100 && !attrs.avatar.includes(' ')) {
          return `data:image/jpeg;base64,${attrs.avatar}`
        }
      }
    }

    // 2. Check for other avatar fields
    if (attrs.avatarUrl && typeof attrs.avatarUrl === 'string') {
      return attrs.avatarUrl.startsWith('http') ? attrs.avatarUrl : null
    }
    if (attrs.picture && typeof attrs.picture === 'string') {
      return attrs.picture.startsWith('http') ? attrs.picture : null
    }
    if (attrs.image && typeof attrs.image === 'string') {
      return attrs.image.startsWith('http') ? attrs.image : null
    }

    // 3. Check user profile field
    if (user.profile && typeof user.profile === 'string') {
      if (user.profile.startsWith('data:image/') || user.profile.startsWith('http')) {
        return user.profile
      }
    }

    // 4. Generate GitHub avatar if available (fallback)
    if (user.login && typeof user.login === 'string') {
      return `https://github.com/${user.login}.png`
    }

    return null
  }

  // Enhanced display name generation with attrs support
  const getDisplayName = (user: any) => {
    if (!user) return 'U'

    const attrs = user.attrs || {}

    // Try to get name from user object first
    const firstName = user.firstName || attrs.firstName || attrs.first_name
    const lastName = user.lastName || attrs.lastName || attrs.last_name

    if (firstName && lastName) {
      return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
    }

    if (firstName) return firstName[0].toUpperCase()
    if (lastName) return lastName[0].toUpperCase()

    // Try display name or full name from attrs
    if (attrs.displayName) return attrs.displayName[0].toUpperCase()
    if (attrs.fullName) return attrs.fullName[0].toUpperCase()
    if (attrs.name) return attrs.name[0].toUpperCase()

    // Fallback to login
    if (user.login) return user.login[0].toUpperCase()

    return 'U'
  }

  const avatarUrl = getAvatarUrl(user)
  const displayName = getDisplayName(user)
  const shouldShowImage = avatarUrl && !imageError

  // Generate gradient colors based on user login
  const getGradientColors = (login: string = 'default') => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-pink-500 to-rose-600',
      'from-yellow-500 to-orange-600',
      'from-indigo-500 to-blue-600',
      'from-purple-500 to-pink-600',
      'from-teal-500 to-green-600',
      'from-orange-500 to-red-600',
    ]
    
    const hash = login.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    
    return colors[Math.abs(hash) % colors.length]
  }

  const gradientClass = getGradientColors(user?.login)

  const baseClasses = `
    ${sizeClasses[size]}
    rounded-full
    flex items-center justify-center
    overflow-hidden
    ${showBorder ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-transparent' : ''}
    ${onClick ? 'cursor-pointer hover:ring-2 hover:ring-primary-400 transition-all' : ''}
    ${className}
  `

  const AvatarComponent = (
    <div className={baseClasses} onClick={onClick} {...props}>
      {shouldShowImage ? (
        <img
          src={avatarUrl}
          alt={`${user?.login || 'User'} avatar`}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
          {displayName.length > 1 ? (
            <span className={`font-semibold text-white ${
              size === 'xs' ? 'text-xs' :
              size === 'sm' ? 'text-sm' :
              size === 'md' ? 'text-base' :
              size === 'lg' ? 'text-lg' :
              size === 'xl' ? 'text-2xl' :
              'text-3xl'
            }`}>
              {displayName}
            </span>
          ) : (
            <User className={`${iconSizes[size]} text-white`} />
          )}
        </div>
      )}
    </div>
  )

  if (animate) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {AvatarComponent}
      </motion.div>
    )
  }

  return AvatarComponent
}

export default Avatar
