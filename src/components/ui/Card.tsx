import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  animate?: boolean
  onClick?: () => void
  gradient?: boolean
  glowing?: boolean
  size?: 'sm' | 'md' | 'lg'
  responsive?: boolean
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  animate = true,
  onClick,
  gradient = false,
  glowing = false,
  size = 'md',
  responsive = true
}) => {
  const sizeClasses = {
    sm: responsive ? 'p-3 sm:p-4' : 'p-3',
    md: responsive ? 'p-4 sm:p-6' : 'p-6',
    lg: responsive ? 'p-6 sm:p-8' : 'p-8'
  }

  const baseClasses = `
    ${gradient 
      ? 'bg-gradient-to-br from-white/10 via-emerald-500/5 to-white/5' 
      : 'bg-gradient-to-br from-white/8 to-white/4'
    }
    backdrop-blur-xl 
    ${responsive ? 'rounded-xl sm:rounded-2xl' : 'rounded-2xl'}
    border 
    ${glowing 
      ? 'border-emerald-400/50 shadow-lg shadow-emerald-500/25' 
      : 'border-white/20'
    }
    ${hover ? 'hover:bg-gradient-to-br hover:from-white/15 hover:via-emerald-500/10 hover:to-white/10 hover:border-emerald-400/30 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    relative overflow-hidden group
    ${sizeClasses[size]}
    ${className}
  `

  const CardComponent = (
    <div className={baseClasses} onClick={onClick}>
      {/* Subtle shimmer effect on hover */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
        whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
        whileTap={onClick ? { scale: 0.98 } : undefined}
      >
        {CardComponent}
      </motion.div>
    )
  }

  return CardComponent
}

export default Card
