import React from 'react'
import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '',
  text = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 sm:w-8 sm:h-8',
    md: 'w-8 h-8 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-16 sm:h-16'
  }

  const textSizes = {
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg lg:text-xl'
  }

  const innerSizes = {
    sm: 'w-2 h-2 sm:w-3 sm:h-3',
    md: 'w-3 h-3 sm:w-4 sm:h-4',
    lg: 'w-5 h-5 sm:w-6 sm:h-6'
  }

  return (
    <div className={`flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 ${className}`}>
      <div className="relative">
        <motion.div
          className={`${sizeClasses[size]} border-2 sm:border-4 border-primary-500/30 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} border-2 sm:border-4 border-transparent border-t-primary-500 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute ${size === 'lg' ? 'inset-3 sm:inset-4' : size === 'md' ? 'inset-2 sm:inset-3' : 'inset-1 sm:inset-2'} ${innerSizes[size]} bg-primary-500/50 rounded-full`}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mt-4 sm:mt-6 text-white/70 font-medium ${textSizes[size]} text-center px-4`}
        >
          {text}
        </motion.p>
      )}
      <motion.div
        className="mt-2 flex space-x-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default LoadingSpinner
