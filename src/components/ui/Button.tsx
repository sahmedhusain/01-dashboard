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

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent backdrop-blur-sm relative overflow-hidden group'
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white focus:ring-emerald-400/50 shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 border border-emerald-400/30',
    secondary: 'bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-white border border-white/20 hover:border-emerald-400/30 focus:ring-emerald-400/50 shadow-lg hover:shadow-xl',
    outline: 'border border-emerald-500/50 text-emerald-400 hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-teal-500/10 hover:border-emerald-400 focus:ring-emerald-400/50 backdrop-blur-sm',
    ghost: 'text-white hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-teal-500/10 focus:ring-emerald-400/50'
  }
  
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm',
    md: 'px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base',
    lg: 'px-4 py-2.5 sm:px-6 sm:py-3 text-base sm:text-lg'
  }
  
  const isDisabled = disabled || isLoading
  
  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
      whileTap={!isDisabled ? { scale: 0.98, y: 0 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
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
      {/* Shimmer effect for primary buttons */}
      {variant === 'primary' && !isDisabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
      )}
      
      <div className="relative z-10 flex items-center">
        {isLoading ? (
          <>
            <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            <span className="text-xs sm:text-sm">Loading...</span>
          </>
        ) : (
          children
        )}
      </div>
    </motion.button>
  )
}

export default Button
