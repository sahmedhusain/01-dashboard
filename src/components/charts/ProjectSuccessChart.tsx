import React from 'react'
import { motion } from 'framer-motion'

interface ProjectSuccessData {
  passed: number
  failed: number
  inProgress: number
  total: number
}

interface ProjectSuccessChartProps {
  data: ProjectSuccessData
  size?: number
}

const ProjectSuccessChart: React.FC<ProjectSuccessChartProps> = ({ 
  data, 
  size = 200 
}) => {
  const { passed, failed, inProgress, total } = data
  
  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-white/60">
        <p>No project data available</p>
      </div>
    )
  }

  const center = size / 2
  const radius = size / 2 - 20
  const strokeWidth = 20

  // Calculate percentages
  const passedPercent = (passed / total) * 100
  const failedPercent = (failed / total) * 100
  const inProgressPercent = (inProgress / total) * 100

  // Calculate angles (in degrees)
  const passedAngle = (passed / total) * 360
  const failedAngle = (failed / total) * 360
  const inProgressAngle = (inProgress / total) * 360

  // Calculate arc paths
  const createArcPath = (startAngle: number, endAngle: number, radius: number) => {
    const start = polarToCartesian(center, center, radius, endAngle)
    const end = polarToCartesian(center, center, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
    
    return [
      "M", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ")
  }

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    }
  }

  // Create segments
  let currentAngle = 0
  const segments = []

  if (passed > 0) {
    segments.push({
      path: createArcPath(currentAngle, currentAngle + passedAngle, radius),
      color: '#10b981', // green-500
      label: 'Passed',
      value: passed,
      percent: passedPercent
    })
    currentAngle += passedAngle
  }

  if (failed > 0) {
    segments.push({
      path: createArcPath(currentAngle, currentAngle + failedAngle, radius),
      color: '#ef4444', // red-500
      label: 'Failed',
      value: failed,
      percent: failedPercent
    })
    currentAngle += failedAngle
  }

  if (inProgress > 0) {
    segments.push({
      path: createArcPath(currentAngle, currentAngle + inProgressAngle, radius),
      color: '#f59e0b', // yellow-500
      label: 'In Progress',
      value: inProgress,
      percent: inProgressPercent
    })
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Chart */}
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
          />
          
          {/* Segments */}
          {segments.map((segment, index) => (
            <motion.path
              key={index}
              d={segment.path}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 1.5, 
                delay: index * 0.3,
                ease: "easeInOut" 
              }}
            />
          ))}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-white">{total}</div>
          <div className="text-sm text-white/60">Projects</div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 gap-2 w-full">
        {segments.map((segment, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
          >
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-white/80 text-sm">{segment.label}</span>
            </div>
            <div className="text-right">
              <div className="text-white font-medium">{segment.value}</div>
              <div className="text-white/60 text-xs">{segment.percent.toFixed(1)}%</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Success Rate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center p-3 bg-white/10 rounded-lg w-full"
      >
        <div className="text-lg font-bold text-primary-400">
          {passed + failed > 0 ? ((passed / (passed + failed)) * 100).toFixed(1) : 0}%
        </div>
        <div className="text-sm text-white/60">Success Rate</div>
      </motion.div>
    </div>
  )
}

export default ProjectSuccessChart
