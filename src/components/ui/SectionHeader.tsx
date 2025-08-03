import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  icon?: LucideIcon
  actions?: React.ReactNode
  className?: string
  gradient?: boolean
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  actions,
  className = '',
  gradient = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`text-center mb-6 sm:mb-8 ${className}`}
    >
      {/* Icon and Title */}
      <div className="flex flex-col sm:flex-row items-center justify-center mb-4 space-y-4 sm:space-y-0">
        {Icon && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center sm:mr-4 ${
              gradient 
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg shadow-primary-500/25' 
                : 'bg-white/10 backdrop-blur-lg border border-white/20'
            }`}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
          </motion.div>
        )}
        <div className="text-center sm:text-left">
          <h1 className={`font-bold text-white mb-1 ${
            Icon 
              ? 'text-xl sm:text-2xl lg:text-3xl' 
              : 'text-2xl sm:text-3xl lg:text-4xl'
          }`}>
            {title}
          </h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-sm sm:text-base lg:text-lg"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* Actions */}
      {actions && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4"
        >
          {actions}
        </motion.div>
      )}
    </motion.div>
  )
}

export default SectionHeader