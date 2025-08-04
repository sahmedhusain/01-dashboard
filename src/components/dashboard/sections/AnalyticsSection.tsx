import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, PieChart, Activity, Calendar, Target } from 'lucide-react'
import { formatXPValue } from '../../../utils/dataFormatting'

interface AnalyticsSectionProps {
  analytics: any
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ analytics }) => {
  
  
  const XPProgressionChart = ({ data }: { data: any[] }) => {
    const maxXP = Math.max(...data.map(d => d.xp), 1000)
    const width = 800
    const height = 400
    const padding = 60

    const points = data.map((item, index) => {
      const x = padding + (index / (data.length - 1)) * (width - 2 * padding)
      const y = height - padding - (item.xp / maxXP) * (height - 2 * padding)
      return { x, y, ...item }
    })

    return (
      <div className="w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-80">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1={padding}
              y1={padding + i * ((height - 2 * padding) / 4)}
              x2={width - padding}
              y2={padding + i * ((height - 2 * padding) / 4)}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}
          
          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map(i => (
            <text
              key={i}
              x={padding - 10}
              y={height - padding - i * ((height - 2 * padding) / 4) + 5}
              textAnchor="end"
              className="fill-white/60 text-xs"
            >
              {formatXPValue((maxXP / 4) * i)}
            </text>
          ))}

          {/* Area under the curve */}
          <path
            d={`M ${padding} ${height - padding} ${points.map(p => `L ${p.x} ${p.y}`).join(' ')} L ${points[points.length - 1]?.x || padding} ${height - padding} Z`}
            fill="url(#xpGradient)"
            opacity="0.3"
          />

          {/* Main line */}
          <path
            d={`M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#3B82F6"
                stroke="white"
                strokeWidth="2"
              />
              {/* Enhanced tooltip on hover */}
              <circle
                cx={point.x}
                cy={point.y}
                r="12"
                fill="transparent"
                className="hover:fill-emerald-500/20 cursor-pointer transition-all duration-200"
              >
                <title>{`${point.month}: ${formatXPValue(point.xp)} XP`}</title>
              </circle>
              {/* Glow effect on hover */}
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill="#3B82F6"
                className="opacity-0 hover:opacity-100 transition-opacity duration-200"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))'
                }}
              />
            </g>
          ))}

          {/* X-axis labels */}
          {points.map((point, index) => (
            <text
              key={index}
              x={point.x}
              y={height - padding + 20}
              textAnchor="middle"
              className="fill-white/60 text-xs"
            >
              {point.month}
            </text>
          ))}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="xpGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }

  
  const SkillsRadarChart = ({ skills }: { skills: Array<{ name: string, points: number }> }) => {
    const size = 300
    const center = size / 2
    const radius = 100
    const maxPoints = Math.max(...skills.map(s => s.points), 100)

    const getPointOnCircle = (angle: number, distance: number) => {
      const x = center + Math.cos(angle - Math.PI / 2) * distance
      const y = center + Math.sin(angle - Math.PI / 2) * distance
      return { x, y }
    }

    const skillsToShow = skills.slice(0, 8) 

    return (
      <div className="flex justify-center">
        <svg width={size} height={size} className="drop-shadow-lg">
          {/* Background concentric circles */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((ratio, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius * ratio}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}
          
          {/* Radar lines */}
          {skillsToShow.map((_, i) => {
            const angle = (2 * Math.PI * i) / skillsToShow.length
            const point = getPointOnCircle(angle, radius)
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={point.x}
                y2={point.y}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
            )
          })}
          
          {/* Data polygon */}
          <path
            d={skillsToShow.map((skill, i) => {
              const angle = (2 * Math.PI * i) / skillsToShow.length
              const distance = (skill.points / maxPoints) * radius
              const point = getPointOnCircle(angle, distance)
              return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
            }).join(' ') + ' Z'}
            fill="rgba(59, 130, 246, 0.2)"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          
          {/* Data points */}
          {skillsToShow.map((skill, i) => {
            const angle = (2 * Math.PI * i) / skillsToShow.length
            const distance = (skill.points / maxPoints) * radius
            const point = getPointOnCircle(angle, distance)
            return (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#3B82F6"
                stroke="white"
                strokeWidth="2"
              >
                <title>{`${skill.name}: ${skill.points} points`}</title>
              </circle>
            )
          })}
          
          {/* Labels */}
          {skillsToShow.map((skill, i) => {
            const angle = (2 * Math.PI * i) / skillsToShow.length
            const labelDistance = radius + 30
            const point = getPointOnCircle(angle, labelDistance)
            return (
              <text
                key={i}
                x={point.x}
                y={point.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white/80 text-xs font-medium"
              >
                {skill.name.length > 8 ? skill.name.substring(0, 8) + '...' : skill.name}
              </text>
            )
          })}
        </svg>
      </div>
    )
  }

  
  const ProjectSuccessPieChart = () => {
    const total = analytics.projects.bhModule.total || 1
    const passed = analytics.projects.bhModule.passed
    const failed = analytics.projects.bhModule.failed
    const inProgress = analytics.projects.bhModule.inProgress
    
    const data = [
      { label: 'Passed', value: passed, color: '#10B981', percentage: (passed / total) * 100 },
      { label: 'Failed', value: failed, color: '#EF4444', percentage: (failed / total) * 100 },
      { label: 'In Progress', value: inProgress, color: '#F59E0B', percentage: (inProgress / total) * 100 }
    ]

    let cumulativePercentage = 0
    const radius = 80
    const center = 100

    return (
      <div className="flex justify-center">
        <svg width={200} height={200}>
          {data.map((segment, index) => {
            const startAngle = (cumulativePercentage / 100) * 2 * Math.PI
            const endAngle = ((cumulativePercentage + segment.percentage) / 100) * 2 * Math.PI
            
            const x1 = center + radius * Math.cos(startAngle)
            const y1 = center + radius * Math.sin(startAngle)
            const x2 = center + radius * Math.cos(endAngle)
            const y2 = center + radius * Math.sin(endAngle)
            
            const largeArc = segment.percentage > 50 ? 1 : 0
            
            const pathData = [
              `M ${center} ${center}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ')
            
            cumulativePercentage += segment.percentage
            
            return (
              <path
                key={index}
                d={pathData}
                fill={segment.color}
                stroke="white"
                strokeWidth="2"
                className="hover:opacity-80 cursor-pointer"
              >
                <title>{`${segment.label}: ${segment.value} (${segment.percentage.toFixed(1)}%)`}</title>
              </path>
            )
          })}
          
          {/* Center circle for donut effect */}
          <circle
            cx={center}
            cy={center}
            r={40}
            fill="rgba(0,0,0,0.8)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          
          <text
            x={center}
            y={center - 5}
            textAnchor="middle"
            className="fill-white text-lg font-bold"
          >
            {total}
          </text>
          <text
            x={center}
            y={center + 15}
            textAnchor="middle"
            className="fill-white/60 text-xs"
          >
            Projects
          </text>
        </svg>
      </div>
    )
  }

  
  const AuditTimelineChart = ({ data }: { data: any[] }) => {
    const maxAudits = Math.max(...data.map(d => d.audits), 5)
    const width = 600
    const height = 200
    const padding = 40

    return (
      <div className="w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1={padding}
              y1={padding + i * ((height - 2 * padding) / 4)}
              x2={width - padding}
              y2={padding + i * ((height - 2 * padding) / 4)}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Bars */}
          {data.map((item, index) => {
            const barWidth = (width - 2 * padding) / data.length * 0.8
            const x = padding + (index + 0.1) * ((width - 2 * padding) / data.length)
            const barHeight = (item.audits / maxAudits) * (height - 2 * padding)
            const y = height - padding - barHeight

            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="url(#auditGradient)"
                  rx="3"
                  className="hover:opacity-80 cursor-pointer"
                >
                  <title>{`${item.month}: ${item.audits} audits`}</title>
                </rect>
                <text
                  x={x + barWidth / 2}
                  y={height - padding + 15}
                  textAnchor="middle"
                  className="fill-white/60 text-xs"
                >
                  {item.month}
                </text>
              </g>
            )
          })}

          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map(i => (
            <text
              key={i}
              x={padding - 10}
              y={height - padding - i * ((height - 2 * padding) / 4) + 3}
              textAnchor="end"
              className="fill-white/60 text-xs"
            >
              {Math.round((maxAudits / 4) * i)}
            </text>
          ))}

          <defs>
            <linearGradient id="auditGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Visual Data Analytics</h2>
        <p className="text-white/70">Interactive charts and graphs showing your learning progression</p>
      </motion.div>

      {/* XP Progression Over Time - SVG Graph 1 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/10 dark:bg-white/10 light:bg-slate-800/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 dark:border-white/20 light:border-slate-800/20 hover:shadow-lg transition-all duration-300"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
          XP Progression Over Time
        </h3>
        <p className="text-white/60 text-sm mb-6">Track your experience points growth over the last 12 months</p>
        <XPProgressionChart data={analytics.xp.monthlyData} />
      </motion.div>

      {/* Skills Radar Chart - SVG Graph 2 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-orange-400" />
          Skills Proficiency Radar
        </h3>
        <p className="text-white/60 text-sm mb-6">Visual representation of your top skills and competencies</p>
        <SkillsRadarChart skills={analytics.skills.top.map((s: any) => ({ name: s.name, points: s.currentAmount }))} />
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Success Rate Pie Chart - SVG Graph 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-green-400" />
            Project Success Rate
          </h3>
          <p className="text-white/60 text-sm mb-6">Distribution of Project outcomes</p>
          <ProjectSuccessPieChart />
          
          {/* Legend */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-white/80 text-sm">Passed: {analytics.projects.bhModule.passed}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-white/80 text-sm">Failed: {analytics.projects.bhModule.failed}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-white/80 text-sm">In Progress: {analytics.projects.bhModule.inProgress}</span>
            </div>
          </div>
        </motion.div>

        {/* Audit Activity Timeline - SVG Graph 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-400" />
            Audit Activity Timeline
          </h3>
          <p className="text-white/60 text-sm mb-6">Monthly audit activity over time</p>
          <AuditTimelineChart data={analytics.audits.monthlyData} />
          
          <div className="mt-4 text-center">
            <div className="text-2xl font-bold text-green-400">{analytics.audits.given}</div>
            <div className="text-white/60 text-sm">Completed Audits Given</div>
          </div>
        </motion.div>
      </div>

      {/* Analytics Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
          Key Performance Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{formatXPValue(analytics.xp.total)}</div>
            <div className="text-white/70 text-sm">Total XP Earned</div>
            <div className="text-white/50 text-xs mt-1">
              {analytics.xp.bhModule > analytics.xp.piscines ? 'Module-focused' : 'Piscine-heavy'} learning path
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{analytics.projects.bhModule.passRate.toFixed(1)}%</div>
            <div className="text-white/70 text-sm">BH-Module Success Rate</div>
            <div className="text-white/50 text-xs mt-1">
              {analytics.projects.bhModule.passRate > 80 ? 'Excellent' : analytics.projects.bhModule.passRate > 60 ? 'Good' : 'Needs improvement'} performance
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">{analytics.audits.ratio.toFixed(2)}</div>
            <div className="text-white/70 text-sm">Audit Ratio</div>
            <div className="text-white/50 text-xs mt-1">
              {analytics.audits.ratio > 1 ? 'Positive' : analytics.audits.ratio > 0.8 ? 'Balanced' : 'Focus needed'} contribution
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{formatXPValue(analytics.audits.totalUp)}</div>
            <div className="text-white/70 text-sm">Total Up Points</div>
            <div className="text-white/50 text-xs mt-1">
              From peer reviews
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AnalyticsSection