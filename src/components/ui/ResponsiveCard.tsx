import React from 'react'
import { motion } from 'framer-motion'

interface ResponsiveCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'glass' | 'solid' | 'outlined' | 'minimal'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  clickable?: boolean
  onClick?: () => void
  loading?: boolean
  error?: boolean
  gradient?: boolean
  borderColor?: string
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  className = '',
  variant = 'glass',
  padding = 'md',
  hover = true,
  clickable = false,
  onClick,
  loading = false,
  error = false,
  gradient = false,
  borderColor = 'white/20'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-10 lg:p-12'
  }

  const variantClasses = {
    glass: `bg-white/10 backdrop-blur-xl border border-${borderColor} shadow-2xl`,
    solid: 'bg-slate-800 border border-slate-700 shadow-2xl',
    outlined: `border-2 border-${borderColor} bg-transparent`,
    minimal: 'bg-white/5 border border-white/10'
  }

  const baseClasses = `
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    rounded-2xl sm:rounded-3xl
    transition-all duration-300
    relative overflow-hidden
    ${hover && !loading ? 'hover:scale-[1.01] hover:shadow-3xl' : ''}
    ${clickable && !loading ? 'cursor-pointer active:scale-[0.99]' : ''}
    ${error ? 'border-red-500/50 bg-red-500/10' : ''}
    ${className}
  `

  const handleClick = () => {
    if (!loading && !error && clickable && onClick) {
      onClick()
    }
  }

  const cardContent = (
    <>
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5 pointer-events-none" />
      )}
      
      {loading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="w-8 h-8 border-4 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </>
  )

  if (clickable && !loading) {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleClick}
        className={baseClasses}
      >
        {cardContent}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={baseClasses}
    >
      {cardContent}
    </motion.div>
  )
}

export default ResponsiveCard