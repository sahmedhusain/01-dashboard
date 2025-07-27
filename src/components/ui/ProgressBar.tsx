import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  color?: string
  height?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = true,
  color = 'from-primary-500 to-primary-600',
  height = 'md',
  className = '',
  animated = true
}) => {
  const percentage = Math.min((value / max) * 100, 100)
  
  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-white/80">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-sm font-bold text-white">
              {typeof value === 'number' ? value.toLocaleString() : value}
              {max !== 100 && `/${max.toLocaleString()}`}
            </span>
          )}
        </div>
      )}
      
      <div className={`w-full bg-white/10 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <motion.div
          className={`${heightClasses[height]} bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: animated ? 0 : `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: animated ? 1 : 0, 
            ease: "easeOut",
            delay: animated ? 0.2 : 0
          }}
        />
      </div>
      
      {showValue && max === 100 && (
        <div className="text-center mt-1">
          <span className="text-xs text-white/60">
            {percentage.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  )
}

export default ProgressBar