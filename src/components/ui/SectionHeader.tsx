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
      className={`text-center mb-8 ${className}`}
    >
      {/* Icon and Title */}
      <div className="flex items-center justify-center mb-4">
        {Icon && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 ${
              gradient 
                ? 'bg-gradient-to-r from-primary-500 to-primary-600' 
                : 'bg-white/10 backdrop-blur-lg border border-white/20'
            }`}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
        )}
        <div className="text-left">
          <h1 className={`font-bold text-white mb-1 ${
            Icon ? 'text-3xl' : 'text-4xl'
          }`}>
            {title}
          </h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-lg"
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
          className="flex justify-center"
        >
          {actions}
        </motion.div>
      )}
    </motion.div>
  )
}

export default SectionHeader