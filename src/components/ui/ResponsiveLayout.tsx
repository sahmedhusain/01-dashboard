import React from 'react'
import { motion } from 'framer-motion'

interface ResponsiveLayoutProps {
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  padding?: boolean
  className?: string
  animate?: boolean
  safeArea?: boolean
  background?: 'transparent' | 'glass' | 'solid'
  centerContent?: boolean
  minHeight?: boolean
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  maxWidth = 'xl',
  padding = true,
  className = '',
  animate = true,
  safeArea = true,
  background = 'transparent',
  centerContent = false,
  minHeight = false
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

  const backgroundClasses = {
    transparent: '',
    glass: 'bg-white/10 dark:bg-white/10 light:bg-slate-800/10 backdrop-blur-lg border border-white/20 dark:border-white/20 light:border-slate-300/30 rounded-2xl shadow-lg',
    solid: 'bg-slate-800 dark:bg-slate-800 light:bg-white rounded-2xl shadow-xl border border-white/10 dark:border-white/10 light:border-slate-200'
  }

  const baseClasses = `
    ${maxWidthClasses[maxWidth]}
    mx-auto
    w-full
    ${padding ? 'px-4 sm:px-6 lg:px-8' : ''}
    ${safeArea ? 'safe-top safe-bottom' : ''}
    ${centerContent ? 'flex flex-col items-center justify-center' : ''}
    ${minHeight ? 'min-h-screen' : ''}
    ${backgroundClasses[background]}
    transition-all duration-300
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
