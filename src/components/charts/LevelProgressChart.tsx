import React from 'react'

const COLORS = {
  primary: '#3B82F6',
}

const LevelProgressChart = ({ level, progress }: { level: number, progress: number }) => (
  <div className="relative w-32 h-32">
    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="8"
      />
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="none"
        stroke={COLORS.primary}
        strokeWidth="8"
        strokeDasharray={`${2 * Math.PI * 50}`}
        strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
        className="transition-all duration-1000 ease-out"
      />
      <text
        x="60"
        y="65"
        textAnchor="middle"
        className="fill-current text-2xl font-bold transform rotate-90"
        style={{ transformOrigin: '60px 60px' }}
      >
        {level}
      </text>
    </svg>
  </div>
)

export default LevelProgressChart