import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface StatItem {
  label: string
  value: number
  previousValue?: number
  format?: 'number' | 'percentage' | 'currency' | 'xp'
  color?: string
}

interface StatisticsChartProps {
  title: string
  stats: StatItem[]
  className?: string
  showTrends?: boolean
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({
  title,
  stats,
  className = '',
  showTrends = true
}) => {
  const formatValue = (value: number, format: StatItem['format'] = 'number') => {
    switch (format) {
      case 'percentage':
        return `${value.toFixed(1)}%`
      case 'currency':
        return `$${value.toLocaleString()}`
      case 'xp':
        return `${value.toLocaleString()} XP`
      default:
        return value.toLocaleString()
    }
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-400" />
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-400" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  const getTrendColor = (current: number, previous: number) => {
    if (current > previous) return 'text-green-400'
    if (current < previous) return 'text-red-400'
    return 'text-gray-400'
  }

  const getTrendPercentage = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white/5 rounded-lg p-4 border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm font-medium">{stat.label}</p>
              {showTrends && stat.previousValue !== undefined && (
                <div className="flex items-center gap-1">
                  {getTrendIcon(stat.value, stat.previousValue)}
                  <span className={`text-xs ${getTrendColor(stat.value, stat.previousValue)}`}>
                    {Math.abs(getTrendPercentage(stat.value, stat.previousValue)).toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-baseline gap-2">
              <p 
                className="text-2xl font-bold"
                style={{ color: stat.color || '#60A5FA' }}
              >
                {formatValue(stat.value, stat.format)}
              </p>
              
              {showTrends && stat.previousValue !== undefined && (
                <p className="text-white/50 text-sm">
                  from {formatValue(stat.previousValue, stat.format)}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default StatisticsChart
