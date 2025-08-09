import React from 'react'
import { motion } from 'framer-motion'

interface ResponsiveTouchTargetProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  onHover?: () => void
  disabled?: boolean
  variant?: 'button' | 'card' | 'link' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  hapticFeedback?: boolean
  accessibilityLabel?: string
  accessibilityRole?: string
  testId?: string
}

const ResponsiveTouchTarget: React.FC<ResponsiveTouchTargetProps> = ({
  children,
  className = '',
  onClick,
  onHover,
  disabled = false,
  variant = 'button',
  size = 'md',
  hapticFeedback = true,
  accessibilityLabel,
  accessibilityRole = 'button',
  testId
}) => {
  const sizeClasses = {
    sm: 'min-h-[40px] min-w-[40px] p-2',
    md: 'min-h-[44px] min-w-[44px] p-3',
    lg: 'min-h-[48px] min-w-[48px] p-4'
  }

  const variantClasses = {
    button: 'rounded-lg transition-all duration-200 active:scale-95',
    card: 'rounded-xl transition-all duration-300 active:scale-98',
    link: 'rounded-md transition-all duration-150 active:scale-98',
    icon: 'rounded-full transition-all duration-200 active:scale-90'
  }

  const handleInteraction = () => {
    if (disabled) return
    
    // Haptic feedback for mobile devices
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(1) // Very short vibration
    }
    
    onClick?.()
  }

  const handleMouseEnter = () => {
    if (disabled) return
    onHover?.()
  }

  const baseClasses = `
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}
    select-none
    touch-target
    flex items-center justify-center
    ${className}
  `

  const motionProps = {
    whileTap: disabled ? {} : { 
      scale: variant === 'icon' ? 0.9 : variant === 'card' ? 0.98 : 0.95,
      transition: { duration: 0.1 }
    },
    whileHover: disabled ? {} : { 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    onClick: handleInteraction,
    onMouseEnter: handleMouseEnter,
    className: baseClasses,
    'aria-label': accessibilityLabel,
    'aria-disabled': disabled,
    role: accessibilityRole,
    tabIndex: disabled ? -1 : 0,
    'data-testid': testId
  }

  return (
    <motion.div {...motionProps}>
      {children}
    </motion.div>
  )
}

export default ResponsiveTouchTarget