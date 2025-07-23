import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  animate?: boolean
  onClick?: () => void
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  animate = true,
  onClick 
}) => {
  const baseClasses = `
    bg-white/10 
    backdrop-blur-lg 
    rounded-2xl 
    border 
    border-white/20 
    ${hover ? 'hover:bg-white/15 hover:border-white/30 transition-all duration-200' : ''}
    ${onClick ? 'cursor-pointer' : ''}
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
