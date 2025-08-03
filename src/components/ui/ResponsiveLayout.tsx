import React from 'react'
import { motion } from 'framer-motion'

interface ResponsiveLayoutProps {
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  padding?: boolean
  className?: string
  animate?: boolean
  safeArea?: boolean
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  maxWidth = 'xl',
  padding = true,
  className = '',
  animate = true,
  safeArea = true
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-7xl',
    '2xl': 'max-w-screen-2xl',
    '3xl': 'max-w-screen-3xl',
    full: 'max-w-full'
  }

  const baseClasses = `
    ${maxWidthClasses[maxWidth]}
    mx-auto
    w-full
    ${padding ? 'px-4 sm:px-6 lg:px-8' : ''}
    ${safeArea ? 'safe-top safe-bottom' : ''}
    ${className}
  `

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  }

  if (animate) {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className={baseClasses}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={baseClasses}>
      {children}
    </div>
  )
}

export default ResponsiveLayout
