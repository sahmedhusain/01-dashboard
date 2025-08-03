import React from 'react'
import { motion } from 'framer-motion'

interface ResponsiveGridProps {
  children: React.ReactNode
  columns?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animate?: boolean
  stagger?: boolean
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = { xs: 1, sm: 2, lg: 3, xl: 4 },
  gap = 'md',
  className = '',
  animate = true,
  stagger = true
}) => {
  const getGridClasses = () => {
    const colClasses = []
    
    if (columns.xs) colClasses.push(`grid-cols-${columns.xs}`)
    if (columns.sm) colClasses.push(`sm:grid-cols-${columns.sm}`)
    if (columns.md) colClasses.push(`md:grid-cols-${columns.md}`)
    if (columns.lg) colClasses.push(`lg:grid-cols-${columns.lg}`)
    if (columns.xl) colClasses.push(`xl:grid-cols-${columns.xl}`)
    if (columns['2xl']) colClasses.push(`2xl:grid-cols-${columns['2xl']}`)
    
    return colClasses.join(' ')
  }

  const gapClasses = {
    sm: 'gap-3 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-10'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger ? 0.1 : 0,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  }

  if (animate) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid ${getGridClasses()} ${gapClasses[gap]} ${className}`}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <div className={`grid ${getGridClasses()} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  )
}

export default ResponsiveGrid
