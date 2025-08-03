import React from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent touch-target'
  
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20 focus:ring-white/50 backdrop-blur-sm',
    outline: 'border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white focus:ring-primary-500',
    ghost: 'text-white hover:bg-white/10 focus:ring-white/50'
  }
  
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm',
    md: 'px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base',
    lg: 'px-4 py-2.5 sm:px-6 sm:py-3 text-base sm:text-lg'
  }
  
  const isDisabled = disabled || isLoading
  
  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          <span className="text-xs sm:text-sm">Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  )
}

export default Button
