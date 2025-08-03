import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface XPTimelineData {
  date: string
  xp: number
  cumulative: number
  project?: string
  path?: string
}

interface XPTimelineChartProps {
  data: XPTimelineData[]
  width?: number
  height?: number
}

const XPTimelineChart: React.FC<XPTimelineChartProps> = ({ 
  data, 
  width = 800, 
  height = 300 
}) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null

    const margin = { top: 20, right: 30, bottom: 40, left: 60 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    
    const maxXP = Math.max(...data.map(d => d.cumulative))
    const minDate = new Date(Math.min(...data.map(d => new Date(d.date).getTime())))
    const maxDate = new Date(Math.max(...data.map(d => new Date(d.date).getTime())))
    const dateRange = maxDate.getTime() - minDate.getTime()

    
    const points = data.map((d, i) => {
      const x = ((new Date(d.date).getTime() - minDate.getTime()) / dateRange) * chartWidth
      const y = chartHeight - (d.cumulative / maxXP) * chartHeight
      return { x: x + margin.left, y: y + margin.top, data: d, index: i }
    })

    
    const pathData = points.reduce((path, point, i) => {
      const command = i === 0 ? 'M' : 'L'
      return `${path} ${command} ${point.x} ${point.y}`
    }, '')

    
    const areaPath = `${pathData} L ${points[points.length - 1].x} ${chartHeight + margin.top} L ${margin.left} ${chartHeight + margin.top} Z`

    
    const yAxisLabels = []
    const steps = 5
    for (let i = 0; i <= steps; i++) {
      const value = (maxXP / steps) * i
      const y = chartHeight + margin.top - (i / steps) * chartHeight
      yAxisLabels.push({
        value: Math.round(value / 1000) + 'kB',
        y,
        rawValue: value
      })
    }

    
    const xAxisLabels = []
    const timeSteps = Math.min(5, points.length)
    for (let i = 0; i < timeSteps; i++) {
      const pointIndex = Math.floor((points.length - 1) * (i / (timeSteps - 1)))
      const point = points[pointIndex]
      if (point) {
        xAxisLabels.push({
          label: new Date(point.data.date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          }),
          x: point.x
        })
      }
    }

    return {
      points,
      pathData,
      areaPath,
      yAxisLabels,
      xAxisLabels,
      maxXP,
      chartWidth,
      chartHeight,
      margin
    }
  }, [data, width, height])

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-64 text-white/60">
        <p>No data to display</p>
      </div>
    )
  }

  const { points, pathData, areaPath, yAxisLabels, xAxisLabels, margin, chartWidth, chartHeight } = chartData

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height} className="text-white">
        {/* Grid lines */}
        <defs>
          <linearGradient id="xpGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {yAxisLabels.map((label, i) => (
          <line
            key={i}
            x1={margin.left}
            y1={label.y}
            x2={margin.left + chartWidth}
            y2={label.y}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Vertical grid lines */}
        {xAxisLabels.map((label, i) => (
          <line
            key={i}
            x1={label.x}
            y1={margin.top}
            x2={label.x}
            y2={margin.top + chartHeight}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Area under the curve */}
        <motion.path
          d={areaPath}
          fill="url(#xpGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Main line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="#14b8a6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Data points */}
        {points.map((point, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#14b8a6"
              stroke="#ffffff"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
              className="hover:r-6 transition-all cursor-pointer"
            />
            
            {/* Tooltip on hover */}
            <motion.g
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="pointer-events-none"
            >
              <rect
                x={point.x - 60}
                y={point.y - 50}
                width="120"
                height="40"
                fill="rgba(0,0,0,0.8)"
                rx="4"
              />
              <text
                x={point.x}
                y={point.y - 35}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {Math.round(point.data.cumulative / 1000)}kB XP
              </text>
              <text
                x={point.x}
                y={point.y - 20}
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="10"
              >
                {point.data.project}
              </text>
            </motion.g>
          </motion.g>
        ))}

        {/* Y-axis labels */}
        {yAxisLabels.map((label, i) => (
          <text
            key={i}
            x={margin.left - 10}
            y={label.y + 4}
            textAnchor="end"
            fill="rgba(255,255,255,0.7)"
            fontSize="12"
          >
            {label.value}
          </text>
        ))}

        {/* X-axis labels */}
        {xAxisLabels.map((label, i) => (
          <text
            key={i}
            x={label.x}
            y={margin.top + chartHeight + 20}
            textAnchor="middle"
            fill="rgba(255,255,255,0.7)"
            fontSize="12"
          >
            {label.label}
          </text>
        ))}

        {/* Axis lines */}
        <line
          x1={margin.left}
          y1={margin.top + chartHeight}
          x2={margin.left + chartWidth}
          y2={margin.top + chartHeight}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
        />
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={margin.top + chartHeight}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

export default XPTimelineChart
