import React from 'react'
import { motion } from 'framer-motion'

interface DataPoint {
  label: string
  value: number
  color?: string
  percentage?: number
}

interface DataDistributionChartProps {
  title: string
  data: DataPoint[]
  type?: 'bar' | 'donut' | 'horizontal-bar'
  className?: string
  showPercentages?: boolean
  showValues?: boolean
  maxItems?: number
}

const DataDistributionChart: React.FC<DataDistributionChartProps> = ({
  title,
  data,
  type = 'bar',
  className = '',
  showPercentages = true,
  showValues = true,
  maxItems = 10
}) => {
  const colors = [
    '#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA',
    '#FB7185', '#38BDF8', '#4ADE80', '#FACC15', '#F472B6'
  ]

  
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const processedData = data
    .map((item, index) => ({
      ...item,
      percentage: total > 0 ? (item.value / total) * 100 : 0,
      color: item.color || colors[index % colors.length]
    }))
    .slice(0, maxItems)
    .sort((a, b) => b.value - a.value)

  const maxValue = Math.max(...processedData.map(item => item.value))

  const renderBarChart = () => (
    <div className="space-y-3">
      {processedData.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="w-24 text-white/70 text-sm font-medium truncate">
            {item.label}
          </div>
          
          <div className="flex-1 relative">
            <div className="w-full bg-white/10 rounded-full h-6">
              <motion.div
                className="h-6 rounded-full flex items-center justify-end pr-2"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
              >
                {showValues && (
                  <span className="text-white text-xs font-medium">
                    {item.value.toLocaleString()}
                  </span>
                )}
              </motion.div>
            </div>
          </div>
          
          {showPercentages && (
            <div className="w-12 text-white/60 text-sm text-right">
              {item.percentage.toFixed(1)}%
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )

  const renderHorizontalBarChart = () => (
    <div className="grid grid-cols-1 gap-4">
      {processedData.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="bg-white/5 rounded-lg p-4 border border-white/10"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white font-medium">{item.label}</h4>
            <div className="flex items-center gap-2">
              {showValues && (
                <span className="text-white/70 text-sm">
                  {item.value.toLocaleString()}
                </span>
              )}
              {showPercentages && (
                <span className="text-white/50 text-sm">
                  ({item.percentage.toFixed(1)}%)
                </span>
              )}
            </div>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-3">
            <motion.div
              className="h-3 rounded-full"
              style={{ backgroundColor: item.color }}
              initial={{ width: 0 }}
              animate={{ width: `${item.percentage}%` }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderDonutChart = () => {
    const radius = 80
    const strokeWidth = 20
    const normalizedRadius = radius - strokeWidth * 2
    const circumference = normalizedRadius * 2 * Math.PI
    
    let cumulativePercentage = 0

    return (
      <div className="flex items-center gap-8">
        <div className="relative">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90"
          >
            {processedData.map((item, index) => {
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`
              const strokeDashoffset = -cumulativePercentage * circumference / 100
              cumulativePercentage += item.percentage
              
              return (
                <motion.circle
                  key={item.label}
                  stroke={item.color}
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray }}
                  transition={{ delay: index * 0.2, duration: 1, ease: "easeOut" }}
                />
              )
            })}
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{total.toLocaleString()}</p>
              <p className="text-white/60 text-sm">Total</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          {processedData.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <p className="text-white text-sm font-medium">{item.label}</p>
                <p className="text-white/60 text-xs">
                  {item.value.toLocaleString()} ({item.percentage.toFixed(1)}%)
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="text-white/60 text-sm">
          {data.length} categories
        </div>
      </div>

      {type === 'bar' && renderBarChart()}
      {type === 'horizontal-bar' && renderHorizontalBarChart()}
      {type === 'donut' && renderDonutChart()}
    </div>
  )
}

export default DataDistributionChart
