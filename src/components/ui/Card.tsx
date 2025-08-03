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
      ? 'bg-gradient-to-br from-white/10 to-white/5' 
      : 'bg-white/10'
    }
    backdrop-blur-lg 
    ${responsive ? 'rounded-xl sm:rounded-2xl' : 'rounded-2xl'}
    border 
    ${glowing 
      ? 'border-primary-500/50 shadow-lg shadow-primary-500/25' 
      : 'border-white/20'
    }
    ${hover ? 'hover:bg-white/15 hover:border-white/30 hover:shadow-xl transition-all duration-300' : ''}
    ${onClick ? 'cursor-pointer touch-target' : ''}
    ${sizeClasses[size]}
    ${className}
  `

  const CardComponent = (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={hover ? { y: -2 } : undefined}
      >
        {CardComponent}
      </motion.div>
    )
  }

  return CardComponent
}

export default Card
