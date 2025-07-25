import React from 'react'

const COLORS = {
  primary: '#3B82F6',
  success: '#10B981',
}

const ActivityChart = ({ data }: { data: Array<{ month: string, xp: number, projects: number }> }) => {
  const maxXP = Math.max(...data.map(d => d.xp), 1000)
  const maxProjects = Math.max(...data.map(d => d.projects), 5)

  return (
    <div className="w-full h-64">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1="40"
            y1={40 + i * 30}
            x2="360"
            y2={40 + i * 30}
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        ))}
        
        {/* XP Bars */}
        {data.map((item, i) => (
          <rect
            key={`xp-${i}`}
            x={60 + i * 50}
            y={160 - (item.xp / maxXP) * 120}
            width="20"
            height={(item.xp / maxXP) * 120}
            fill={COLORS.primary}
            className="opacity-80"
          />
        ))}
        
        {/* Projects Line */}
        <path
          d={data.map((item, i) => {
            const x = 80 + i * 50
            const y = 160 - (item.projects / maxProjects) * 120
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
          }).join(' ')}
          fill="none"
          stroke={COLORS.success}
          strokeWidth="3"
        />
        
        {/* Month labels */}
        {data.map((item, i) => (
          <text
            key={i}
            x={70 + i * 50}
            y="180"
            textAnchor="middle"
            className="text-xs fill-gray-600"
          >
            {item.month}
          </text>
        ))}
      </svg>
    </div>
  )
}

export default ActivityChart