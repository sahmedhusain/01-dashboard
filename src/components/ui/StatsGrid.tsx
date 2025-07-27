import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import Card from './Card'

interface StatItem {
  id: string
  label: string
  value: string | number
  icon: LucideIcon
  color: string
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

interface StatsGridProps {
  stats: StatItem[]
  columns?: 2 | 3 | 4
  className?: string
}

const StatsGrid: React.FC<StatsGridProps> = ({
  stats,
  columns = 4,
  className = ''
}) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {stats.map((stat, index) => {
        const Icon = stat.icon
        
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card hover className="p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {stat.trend && (
                  <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                    stat.trend.isPositive 
                      ? 'text-green-400 bg-green-400/20' 
                      : 'text-red-400 bg-red-400/20'
                  }`}>
                    {stat.trend.isPositive ? '+' : ''}{stat.trend.value}%
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-white/60 text-sm font-medium">
                  {stat.label}
                </p>
                {stat.subtitle && (
                  <p className="text-white/40 text-xs mt-1">
                    {stat.subtitle}
                  </p>
                )}
              </div>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}

export default StatsGrid