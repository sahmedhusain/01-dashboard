import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'
import { formatGradeDetailed } from '../../utils/dataFormatting'

interface ProgressItem {
  id: string
  name: string
  progress: number 
  status: 'completed' | 'in-progress' | 'failed' | 'pending'
  xp?: number
  grade?: number
  dueDate?: string
}

interface ProgressVisualizationProps {
  title: string
  items: ProgressItem[]
  className?: string
  showDetails?: boolean
  maxItems?: number
}

const ProgressVisualization: React.FC<ProgressVisualizationProps> = ({
  title,
  items,
  className = '',
  showDetails = true,
  maxItems = 10
}) => {
  const getStatusIcon = (status: ProgressItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-400" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
    }
  }

  const getStatusColor = (status: ProgressItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-blue-500'
      case 'failed':
        return 'bg-red-500'
      case 'pending':
        return 'bg-yellow-500'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-blue-500'
    if (progress >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const displayItems = items.slice(0, maxItems)

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="text-white/60 text-sm">
          {items.length} total items
        </div>
      </div>

      <div className="space-y-4">
        {displayItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="bg-white/5 rounded-lg p-4 border border-white/10"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(item.status)}
                <div>
                  <h4 className="text-white font-medium">{item.name}</h4>
                  {showDetails && item.dueDate && (
                    <p className="text-white/50 text-xs">
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              
              {showDetails && (
                <div className="text-right">
                  {item.xp && (
                    <p className="text-primary-400 font-medium text-sm">
                      {item.xp} XP
                    </p>
                  )}
                  {item.grade !== undefined && (
                    <p className="text-white/70 text-xs">
                      Grade: {formatGradeDetailed(item.grade)}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="w-full bg-white/10 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${getProgressColor(item.progress)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-white/50 text-xs">Progress</span>
                <span className="text-white/70 text-xs font-medium">
                  {item.progress.toFixed(0)}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {items.length > maxItems && (
        <div className="mt-4 text-center">
          <p className="text-white/60 text-sm">
            Showing {maxItems} of {items.length} items
          </p>
        </div>
      )}
    </div>
  )
}

export default ProgressVisualization
