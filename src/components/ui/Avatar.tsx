import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User as UserIcon } from 'lucide-react'
import { User } from '../../types'

interface AvatarProps {
  user: User
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

  
  const getAvatarUrl = (user: User) => {
    if (!user) return null

    
    const attrs = user.attrs || {}

    
    if (attrs.avatar) {
      
      if (typeof attrs.avatar === 'string') {
        if (attrs.avatar.startsWith('data:image/')) {
          return attrs.avatar
        }
        
        if (attrs.avatar.startsWith('http')) {
          return attrs.avatar
        }
        
        if (attrs.avatar.length > 100 && !attrs.avatar.includes(' ')) {
          return `data:image/jpeg;base64,${attrs.avatar}`
        }
      }
    }

    
    if (attrs.avatarUrl && typeof attrs.avatarUrl === 'string') {
      return attrs.avatarUrl.startsWith('http') ? attrs.avatarUrl : null
    }
    if (attrs.picture && typeof attrs.picture === 'string') {
      return attrs.picture.startsWith('http') ? attrs.picture : null
    }
    if (attrs.image && typeof attrs.image === 'string') {
      return attrs.image.startsWith('http') ? attrs.image : null
    }

    
    if (user.profile && typeof user.profile === 'string') {
      if (user.profile.startsWith('data:image/') || user.profile.startsWith('http')) {
        return user.profile
      }
    }

    
    if (user.login && typeof user.login === 'string') {
      return `https://github.com/${user.login}.png`
    }

    return null
  }

  
  const getDisplayName = (user: User) => {
    if (!user) return 'U'

    const attrs = user.attrs || {}

    
    const firstName = user.firstName || attrs.firstName || attrs.first_name
    const lastName = user.lastName || attrs.lastName || attrs.last_name

    if (firstName && lastName) {
      return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
    }

    if (firstName) return firstName[0].toUpperCase()
    if (lastName) return lastName[0].toUpperCase()

    
    if (attrs.displayName) return attrs.displayName[0].toUpperCase()
    if (attrs.fullName) return attrs.fullName[0].toUpperCase()
    if (attrs.name) return attrs.name[0].toUpperCase()

    
    if (user.login) return user.login[0].toUpperCase()

    return 'U'
  }

  const avatarUrl = getAvatarUrl(user)
  const displayName = getDisplayName(user)
  const shouldShowImage = avatarUrl && !imageError

  
  const getGradientColors = (login: string = 'default') => {
    const colors = [
      'from-emerald-500 to-teal-600',
      'from-teal-500 to-cyan-600',
      'from-green-500 to-emerald-600',
      'from-cyan-500 to-blue-600',
      'from-blue-500 to-indigo-600',
      'from-indigo-500 to-purple-600',
      'from-emerald-400 to-teal-500',
      'from-teal-400 to-cyan-500',
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
    relative
    ${showBorder ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-900 shadow-lg shadow-emerald-500/25' : ''}
    ${onClick ? 'cursor-pointer hover:ring-2 hover:ring-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300' : ''}
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
            <UserIcon className={`${iconSizes[size]} text-white`} />
          )}
        </div>
      )}
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -2 }}
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
