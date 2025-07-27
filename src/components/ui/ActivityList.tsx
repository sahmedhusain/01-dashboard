import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { getRelativeTime } from '../../utils/dataFormatting'
import Card from './Card'

interface ActivityItem {
  id: string | number
  title: string
  subtitle?: string
  timestamp: string
  icon: LucideIcon
  iconColor: string
  badge?: {
    text: string
    color: string
  }
  value?: string
  status?: 'success' | 'warning' | 'error' | 'info'
}

interface ActivityListProps {
  items: ActivityItem[]
  title?: string
  maxItems?: number
  className?: string
  showTimestamp?: boolean
}

const ActivityList: React.FC<ActivityListProps> = ({
  items,
  title,
  maxItems = 10,
  className = '',
  showTimestamp = true
}) => {
  const displayItems = items.slice(0, maxItems)

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success': return 'bg-green-500/20 text-green-400'
      case 'warning': return 'bg-yellow-500/20 text-yellow-400'
      case 'error': return 'bg-red-500/20 text-red-400'
      case 'info': return 'bg-blue-500/20 text-blue-400'
      default: return 'bg-white/10 text-white/60'
    }
  }

  return (
    <Card className={`p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-white mb-6">
          {title}
        </h3>
      )}
      
      <div className="space-y-3">
        {displayItems.map((item, index) => {
          const Icon = item.icon
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.iconColor}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-white font-medium truncate">
                    {item.title}
                  </p>
                  {item.badge && (
                    <span className={`px-2 py-1 text-xs rounded-full ${item.badge.color}`}>
                      {item.badge.text}
                    </span>
                  )}
                </div>
                
                {item.subtitle && (
                  <p className="text-white/60 text-sm truncate">
                    {item.subtitle}
                  </p>
                )}
                
                {showTimestamp && (
                  <p className="text-white/40 text-xs mt-1">
                    {getRelativeTime(item.timestamp)}
                  </p>
                )}
              </div>
              
              {/* Value */}
              {item.value && (
                <div className={`text-sm font-bold px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
                  {item.value}
                </div>
              )}
            </motion.div>
          )
        })}
        
        {displayItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-white/60">No recent activity</p>
          </div>
        )}
      </div>
    </Card>
  )
}

export default ActivityList