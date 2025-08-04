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
        {/* Outer glowing ring */}
        <motion.div
          className={`${sizeClasses[size]} border-2 sm:border-4 border-emerald-500/20 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm`}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Main spinning ring */}
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} border-2 sm:border-4 border-transparent border-t-emerald-400 border-r-teal-400 rounded-full shadow-lg shadow-emerald-500/25`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner pulsing core */}
        <motion.div
          className={`absolute ${size === 'lg' ? 'inset-3 sm:inset-4' : size === 'md' ? 'inset-2 sm:inset-3' : 'inset-1 sm:inset-2'} ${innerSizes[size]} bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-lg`}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
            boxShadow: [
              '0 0 10px rgba(52, 211, 153, 0.3)',
              '0 0 20px rgba(52, 211, 153, 0.6)',
              '0 0 10px rgba(52, 211, 153, 0.3)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Orbiting particles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-300 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: size === 'lg' ? '0 -28px' : size === 'md' ? '0 -20px' : '0 -14px'
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3
            }}
          />
        ))}
      </div>
      
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mt-4 sm:mt-6 text-white/80 font-semibold ${textSizes[size]} text-center px-4 bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent`}
        >
          {text}
        </motion.p>
      )}
      
      {/* Enhanced loading dots */}
      <motion.div
        className="mt-3 flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-lg"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 1, 0.4],
              boxShadow: [
                '0 0 5px rgba(52, 211, 153, 0.3)',
                '0 0 15px rgba(52, 211, 153, 0.8)',
                '0 0 5px rgba(52, 211, 153, 0.3)'
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default LoadingSpinner
