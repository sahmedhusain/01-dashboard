import React from 'react'

const COLORS = {
  primary: '#3B82F6',
}

const SkillsRadarChart = ({ skills }: { skills: Array<{ name: string, points: number }> }) => {
  const size = 200
  const center = size / 2
  const radius = 70
  const maxPoints = Math.max(...skills.map(s => s.points), 100)

  const getPointOnCircle = (angle: number, distance: number) => {
    const x = center + Math.cos(angle - Math.PI / 2) * distance
    const y = center + Math.sin(angle - Math.PI / 2) * distance
    return { x, y }
  }

  return (
    <svg width={size} height={size} className="mx-auto">
      {/* Background grid */}
      {[0.2, 0.4, 0.6, 0.8, 1].map((ratio, i) => (
        <circle
          key={i}
          cx={center}
          cy={center}
          r={radius * ratio}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
      ))}
      
      {/* Radar lines */}
      {skills.map((_, i) => {
        const angle = (2 * Math.PI * i) / skills.length
        const point = getPointOnCircle(angle, radius)
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={point.x}
            y2={point.y}
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        )
      })}
      
      {/* Data polygon */}
      <path
        d={skills.map((skill, i) => {
          const angle = (2 * Math.PI * i) / skills.length
          const distance = (skill.points / maxPoints) * radius
          const point = getPointOnCircle(angle, distance)
          return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
        }).join(' ') + ' Z'}
        fill={`${COLORS.primary}40`}
        stroke={COLORS.primary}
        strokeWidth="2"
      />
      
      {/* Data points */}
      {skills.map((skill, i) => {
        const angle = (2 * Math.PI * i) / skills.length
        const distance = (skill.points / maxPoints) * radius
        const point = getPointOnCircle(angle, distance)
        return (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={COLORS.primary}
          />
        )
      })}
      
      {/* Labels */}
      {skills.map((skill, i) => {
        const angle = (2 * Math.PI * i) / skills.length
        const labelDistance = radius + 20
        const point = getPointOnCircle(angle, labelDistance)
        return (
          <text
            key={i}
            x={point.x}
            y={point.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-medium fill-gray-600"
          >
            {skill.name}
          </text>
        )
      })}
    </svg>
  )
}

export default SkillsRadarChart