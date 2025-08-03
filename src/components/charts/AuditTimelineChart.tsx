import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface AuditTimelineData {
  date: string
  auditsGiven: number
  auditsReceived: number
  ratio: number
  project?: string
}

interface AuditTimelineChartProps {
  data: AuditTimelineData[]
  width?: number
  height?: number
}

const AuditTimelineChart: React.FC<AuditTimelineChartProps> = ({ 
  data, 
  width = 800, 
  height = 400 
}) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null

    const margin = { top: 20, right: 60, bottom: 40, left: 60 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    
    const maxAudits = Math.max(...data.map(d => Math.max(d.auditsGiven, d.auditsReceived)))
    const maxRatio = Math.max(...data.map(d => d.ratio))
    const minDate = new Date(Math.min(...data.map(d => new Date(d.date).getTime())))
    const maxDate = new Date(Math.max(...data.map(d => new Date(d.date).getTime())))
    const dateRange = maxDate.getTime() - minDate.getTime()

    
    const givenPoints = data.map((d, i) => {
      const x = ((new Date(d.date).getTime() - minDate.getTime()) / dateRange) * chartWidth
      const y = chartHeight - (d.auditsGiven / maxAudits) * (chartHeight * 0.7) 
      return { x: x + margin.left, y: y + margin.top, data: d, index: i }
    })

    const receivedPoints = data.map((d, i) => {
      const x = ((new Date(d.date).getTime() - minDate.getTime()) / dateRange) * chartWidth
      const y = chartHeight - (d.auditsReceived / maxAudits) * (chartHeight * 0.7)
      return { x: x + margin.left, y: y + margin.top, data: d, index: i }
    })

    
    const ratioPoints = data.map((d, i) => {
      const x = ((new Date(d.date).getTime() - minDate.getTime()) / dateRange) * chartWidth
      const y = margin.top + (chartHeight * 0.3) - (d.ratio / maxRatio) * (chartHeight * 0.3)
      return { x: x + margin.left, y, data: d, index: i }
    })

    
    const givenPath = givenPoints.reduce((path, point, i) => {
      const command = i === 0 ? 'M' : 'L'
      return `${path} ${command} ${point.x} ${point.y}`
    }, '')

    const receivedPath = receivedPoints.reduce((path, point, i) => {
      const command = i === 0 ? 'M' : 'L'
      return `${path} ${command} ${point.x} ${point.y}`
    }, '')

    const ratioPath = ratioPoints.reduce((path, point, i) => {
      const command = i === 0 ? 'M' : 'L'
      return `${path} ${command} ${point.x} ${point.y}`
    }, '')

    
    const yAxisLabels = []
    for (let i = 0; i <= 5; i++) {
      const value = (maxAudits / 5) * i
      const y = chartHeight + margin.top - (i / 5) * (chartHeight * 0.7)
      yAxisLabels.push({ value: Math.round(value), y })
    }

    const ratioAxisLabels = []
    for (let i = 0; i <= 3; i++) {
      const value = (maxRatio / 3) * i
      const y = margin.top + (chartHeight * 0.3) - (i / 3) * (chartHeight * 0.3)
      ratioAxisLabels.push({ value: value.toFixed(1), y })
    }

    const xAxisLabels = []
    const timeSteps = Math.min(6, data.length)
    for (let i = 0; i < timeSteps; i++) {
      const pointIndex = Math.floor((data.length - 1) * (i / (timeSteps - 1)))
      const point = givenPoints[pointIndex]
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
      givenPoints,
      receivedPoints,
      ratioPoints,
      givenPath,
      receivedPath,
      ratioPath,
      yAxisLabels,
      ratioAxisLabels,
      xAxisLabels,
      maxAudits,
      maxRatio,
      chartWidth,
      chartHeight,
      margin
    }
  }, [data, width, height])

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-64 text-white/60">
        <p>No audit timeline data available</p>
      </div>
    )
  }

  const { 
    givenPoints, 
    receivedPoints, 
    ratioPoints,
    givenPath, 
    receivedPath, 
    ratioPath,
    yAxisLabels, 
    ratioAxisLabels,
    xAxisLabels, 
    margin, 
    chartWidth, 
    chartHeight 
  } = chartData

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height} className="text-white">
        <defs>
          <linearGradient id="givenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="receivedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
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

        {/* Ratio section separator */}
        <line
          x1={margin.left}
          y1={margin.top + chartHeight * 0.3}
          x2={margin.left + chartWidth}
          y2={margin.top + chartHeight * 0.3}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Audits Given Line */}
        <motion.path
          d={givenPath}
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Audits Received Line */}
        <motion.path
          d={receivedPath}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
        />

        {/* Audit Ratio Line */}
        <motion.path
          d={ratioPath}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
        />

        {/* Data points for Audits Given */}
        {givenPoints.map((point, i) => (
          <motion.circle
            key={`given-${i}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#10b981"
            stroke="#ffffff"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
            className="hover:r-6 transition-all cursor-pointer"
          />
        ))}

        {/* Data points for Audits Received */}
        {receivedPoints.map((point, i) => (
          <motion.circle
            key={`received-${i}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#3b82f6"
            stroke="#ffffff"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 * i + 0.3, duration: 0.3 }}
            className="hover:r-6 transition-all cursor-pointer"
          />
        ))}

        {/* Data points for Ratio */}
        {ratioPoints.map((point, i) => (
          <motion.circle
            key={`ratio-${i}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#f59e0b"
            stroke="#ffffff"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 * i + 0.6, duration: 0.3 }}
            className="hover:r-6 transition-all cursor-pointer"
          />
        ))}

        {/* Y-axis labels (Audits) */}
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

        {/* Ratio axis labels */}
        {ratioAxisLabels.map((label, i) => (
          <text
            key={i}
            x={margin.left + chartWidth + 10}
            y={label.y + 4}
            textAnchor="start"
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

        {/* Labels */}
        <text
          x={margin.left - 40}
          y={margin.top + chartHeight * 0.85}
          textAnchor="middle"
          fill="rgba(255,255,255,0.7)"
          fontSize="12"
          transform={`rotate(-90, ${margin.left - 40}, ${margin.top + chartHeight * 0.85})`}
        >
          Audits Count
        </text>
        
        <text
          x={margin.left + chartWidth + 40}
          y={margin.top + chartHeight * 0.15}
          textAnchor="middle"
          fill="rgba(255,255,255,0.7)"
          fontSize="12"
          transform={`rotate(90, ${margin.left + chartWidth + 40}, ${margin.top + chartHeight * 0.15})`}
        >
          Audit Ratio
        </text>
      </svg>
    </div>
  )
}

export default AuditTimelineChart
