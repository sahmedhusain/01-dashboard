import React from 'react'
import { motion } from 'framer-motion'

interface SkillRadarData {
  skill: string
  level: number
  maxLevel: number
  category: string
  projects?: number
}

interface SkillsRadarChartProps {
  data: SkillRadarData[]
  size?: number
}

const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({ 
  data, 
  size = 300 
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-white/60">
        <p>No skills data available</p>
      </div>
    )
  }

  const center = size / 2
  const maxRadius = size / 2 - 40
  const levels = 5 // Number of concentric circles

  // Calculate points for each skill
  const skillPoints = data.map((skill, index) => {
    const angle = (index / data.length) * 2 * Math.PI - Math.PI / 2 // Start from top
    const normalizedLevel = skill.level / skill.maxLevel
    const radius = normalizedLevel * maxRadius
    
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
      labelX: center + (maxRadius + 20) * Math.cos(angle),
      labelY: center + (maxRadius + 20) * Math.sin(angle),
      skill: skill.skill,
      level: skill.level,
      maxLevel: skill.maxLevel,
      category: skill.category,
      projects: skill.projects || 0,
      angle,
      normalizedLevel
    }
  })

  // Create path for the skill polygon
  const skillPath = skillPoints.reduce((path, point, index) => {
    const command = index === 0 ? 'M' : 'L'
    return `${path} ${command} ${point.x} ${point.y}`
  }, '') + ' Z'

  // Category colors
  const categoryColors: { [key: string]: string } = {
    'Frontend': '#3b82f6', // blue
    'Backend': '#10b981',  // green
    'Systems': '#f59e0b',  // yellow
    'DevOps': '#8b5cf6',   // purple
    'Database': '#ef4444', // red
    'General': '#6b7280'   // gray
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Chart */}
      <div className="relative">
        <svg width={size} height={size}>
          {/* Background grid circles */}
          {Array.from({ length: levels }, (_, i) => {
            const radius = ((i + 1) / levels) * maxRadius
            return (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            )
          })}

          {/* Grid lines from center to each skill */}
          {skillPoints.map((point, index) => (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={center + maxRadius * Math.cos(point.angle)}
              y2={center + maxRadius * Math.sin(point.angle)}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Skill polygon */}
          <motion.path
            d={skillPath}
            fill="rgba(20, 184, 166, 0.2)"
            stroke="#14b8a6"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Skill points */}
          {skillPoints.map((point, index) => (
            <motion.g key={index}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill={categoryColors[point.category] || '#6b7280'}
                stroke="#ffffff"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                className="hover:r-6 transition-all cursor-pointer"
              />
              
              {/* Tooltip on hover */}
              <motion.g
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="pointer-events-none"
              >
                <rect
                  x={point.x - 40}
                  y={point.y - 35}
                  width="80"
                  height="25"
                  fill="rgba(0,0,0,0.8)"
                  rx="4"
                />
                <text
                  x={point.x}
                  y={point.y - 20}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {point.level.toFixed(1)}/{point.maxLevel}
                </text>
              </motion.g>
            </motion.g>
          ))}

          {/* Skill labels */}
          {skillPoints.map((point, index) => (
            <motion.text
              key={index}
              x={point.labelX}
              y={point.labelY}
              textAnchor={point.labelX > center ? 'start' : 'end'}
              dominantBaseline="middle"
              fill="white"
              fontSize="12"
              fontWeight="500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {point.skill}
            </motion.text>
          ))}
        </svg>
      </div>

      {/* Skills List */}
      <div className="w-full space-y-2">
        {data.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
          >
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: categoryColors[skill.category] || '#6b7280' }}
              />
              <div>
                <span className="text-white/80 text-sm font-medium">{skill.skill}</span>
                <div className="text-white/50 text-xs">{skill.category}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-medium">
                {skill.level.toFixed(1)}/{skill.maxLevel}
              </div>
              {skill.projects && (
                <div className="text-white/60 text-xs">
                  {skill.projects} project{skill.projects !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 w-full text-xs">
        {Object.entries(categoryColors).map(([category, color]) => {
          const hasSkills = data.some(skill => skill.category === category)
          if (!hasSkills) return null
          
          return (
            <div key={category} className="flex items-center">
              <div 
                className="w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: color }}
              />
              <span className="text-white/60">{category}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SkillsRadarChart
