import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, PieChart, Activity, Target, Users, Crown } from 'lucide-react'
import { useQuery } from '@apollo/client'
import { formatXPValue } from '../../../utils/dataFormatting'
import { GET_COMPREHENSIVE_LEADERBOARD_DATA } from '../../../graphql/allQueries'

interface AnalyticsSectionProps {
  analytics: any
  user?: {
    id: number
    login: string
    firstName?: string
    lastName?: string
    [key: string]: any
  }
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ analytics, user }) => {
  const [clickedElement, setClickedElement] = useState<{ type: string, data: any, x: number, y: number } | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle mouse movement to hide tooltip after delay
  const handleMouseMovement = useCallback(() => {
    if (clickedElement && showTooltip) {
      // Clear existing timeout
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
      
      // Set timeout to hide tooltip after 0.3 seconds of movement
      hideTimeoutRef.current = setTimeout(() => {
        setShowTooltip(false)
        setClickedElement(null)
      }, 100)
    }
  }, [clickedElement, showTooltip])

  // Handle click to show tooltip
  const handleElementClick = (elementData: { type: string, data: any, x: number, y: number }) => {
    // Clear any existing hide timeout
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    
    setClickedElement(elementData)
    setShowTooltip(true)
  }

  // Add global mouse move listener
  useEffect(() => {
    const handleGlobalMouseMove = () => handleMouseMovement()
    
    if (showTooltip) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
    }
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
    }
  }, [showTooltip, handleMouseMovement])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    }
  }, [])
  
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
              {/* Interactive click area - only on this circle */}
              <circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="transparent"
                className="hover:fill-emerald-500/20 cursor-pointer transition-all duration-200"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleElementClick({
                    type: 'xp',
                    data: { 
                      month: point.month, 
                      xp: point.xp,
                      growth: index > 0 ? point.xp - points[index - 1].xp : 0,
                      projects: point.projects || 0
                    },
                    x: e.clientX,
                    y: e.clientY
                  });
                }}
              />
              {/* Glow effect on hover */}
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill="#3B82F6"
                className="opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"
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
    const size = 400
    const center = size / 2
    const radius = 120
    const maxPoints = Math.max(...skills.map(s => s.points), 100)

    const getPointOnCircle = (angle: number, distance: number) => {
      const x = center + Math.cos(angle - Math.PI / 2) * distance
      const y = center + Math.sin(angle - Math.PI / 2) * distance
      return { x, y }
    }

    const skillsToShow = skills

    return (
      <div className="flex justify-center overflow-visible" style={{ minWidth: size, minHeight: size }}>
        <svg width={size} height={size} className="drop-shadow-lg overflow-visible">
          {/* Background concentric circles */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((ratio, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius * ratio}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="2"
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
                stroke="rgba(59,130,246,0.18)"
                strokeWidth="2"
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
            fill="rgba(59, 130, 246, 0.25)"
            stroke="#3B82F6"
            strokeWidth="4"
          />

          {/* Data points */}
          {skillsToShow.map((skill, i) => {
            const angle = (2 * Math.PI * i) / skillsToShow.length
            const distance = (skill.points / maxPoints) * radius
            const point = getPointOnCircle(angle, distance)
            return (
              <g key={i}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="8"
                  fill="#3B82F6"
                  stroke="white"
                  strokeWidth="3"
                />
                {/* Interactive click area - only on this point */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="16"
                  fill="transparent"
                  className="hover:fill-blue-500/20 cursor-pointer transition-all duration-200"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleElementClick({
                      type: 'skill',
                      data: { 
                        name: skill.name, 
                        points: skill.points,
                        level: Math.floor(skill.points / 100) + 1,
                        progress: (skill.points % 100)
                      },
                      x: e.clientX,
                      y: e.clientY
                    });
                  }}
                />
              </g>
            )
          })}

          {/* Labels */}
          {skillsToShow.map((skill, i) => {
            const angle = (2 * Math.PI * i) / skillsToShow.length
            const labelDistance = radius + 32
            const point = getPointOnCircle(angle, labelDistance)
            return (
              <text
                key={i}
                x={point.x}
                y={point.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white/90 text-sm font-semibold"
                style={{
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
                }}
              >
                {skill.name}
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
                className="hover:opacity-80 cursor-pointer transition-all duration-200"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleElementClick({
                    type: 'project',
                    data: { 
                      label: segment.label, 
                      value: segment.value,
                      percentage: segment.percentage,
                      total: total
                    },
                    x: e.clientX,
                    y: e.clientY
                  });
                }}
              />
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

  
  const ProjectsXPPieChart = () => {
    // Filter for BH-module projects only (exclude piscines and checkpoints)
    const filterBHModuleTransactions = (transactions: any[]) => {
      return transactions.filter((t: any) => {
        if (!t.path) return true; // No path means main module
        return !t.path.includes('piscine-') && 
               !t.path.includes('/bh-piscine/') && 
               !t.path.includes('checkpoint');
      });
    };

    let projectXPData = {};
    
    // Get BH-module XP transactions only
    if (analytics.rawData?.transactions) {
      const bhModuleTransactions = filterBHModuleTransactions(analytics.rawData.transactions);
      projectXPData = bhModuleTransactions
        .filter((t: any) => t.type === 'xp' && t.object?.name && t.amount > 0)
        .reduce((acc: any, t: any) => {
          const projectName = t.object.name;
          if (!acc[projectName]) {
            acc[projectName] = { name: projectName, xp: 0, count: 0 };
          }
          acc[projectName].xp += t.amount;
          acc[projectName].count += 1;
          return acc;
        }, {});
    }
    
    // Fallback: Try from progress data (BH-module only)
    if (Object.keys(projectXPData).length === 0 && analytics.rawData?.progress) {
      const bhModuleProgress = filterBHModuleTransactions(analytics.rawData.progress);
      projectXPData = bhModuleProgress
        .filter((p: any) => p.object?.name && p.grade > 0)
        .reduce((acc: any, p: any) => {
          const projectName = p.object.name;
          const estimatedXP = Math.floor(p.grade * 100);
          if (!acc[projectName]) {
            acc[projectName] = { name: projectName, xp: 0, count: 0 };
          }
          acc[projectName].xp += estimatedXP;
          acc[projectName].count += 1;
          return acc;
        }, {});
    }
    
    // Sample data for BH-module projects only (no piscines)
    if (Object.keys(projectXPData).length === 0) {
      projectXPData = {
        'ascii-art': { name: 'ascii-art', xp: 1200, count: 1 },
        'forum': { name: 'forum', xp: 1500, count: 1 },
        'net-cat': { name: 'net-cat', xp: 600, count: 1 },
        'groupie-tracker': { name: 'groupie-tracker', xp: 1000, count: 1 },
        'make-your-game': { name: 'make-your-game', xp: 900, count: 1 },
        'real-time-forum': { name: 'real-time-forum', xp: 1100, count: 1 },
        'social-network': { name: 'social-network', xp: 1300, count: 1 },
        'lem-in': { name: 'lem-in', xp: 800, count: 1 }
      };
    }

    // Show ALL BH-module projects (not limited to top 8)
    const projectsArray = Object.values(projectXPData)
      .sort((a: any, b: any) => b.xp - a.xp); // Sort by XP but don't limit

    const totalXP: number = projectsArray.reduce((sum: number, project: any) => sum + (project.xp || 0), 0 as number);
    
    if (projectsArray.length === 0) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-white/60 text-center">
            <div className="text-lg mb-2">No Project XP Data</div>
            <div className="text-sm">Project XP information will appear here</div>
          </div>
        </div>
      );
    }

    let cumulativePercentage = 0;
    const radius = 90;
    const center = 110;

    // Generate colors for all projects
    const baseColors = [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
      '#8B5CF6', '#06B6D4', '#F97316', '#EC4899',
      '#6366F1', '#84CC16', '#F87171', '#60A5FA',
      '#A78BFA', '#34D399', '#FBBF24', '#FB7185'
    ];
    
    // Generate enough colors for all projects
    const colors = projectsArray.map((_, index) => 
      baseColors[index % baseColors.length]
    );

    return (
      <div>
        <div className="flex justify-center">
          <svg width={220} height={220}>
            {projectsArray.map((project: any, index: number) => {
              const percentage = totalXP > 0 ? (project.xp / totalXP) * 100 : 0;
              const startAngle = (cumulativePercentage / 100) * 2 * Math.PI;
              const endAngle = ((cumulativePercentage + percentage) / 100) * 2 * Math.PI;
              
              const x1 = center + radius * Math.cos(startAngle);
              const y1 = center + radius * Math.sin(startAngle);
              const x2 = center + radius * Math.cos(endAngle);
              const y2 = center + radius * Math.sin(endAngle);
              
              const largeArc = percentage > 50 ? 1 : 0;
              
              const pathData = [
                `M ${center} ${center}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              cumulativePercentage += percentage;
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={colors[index % colors.length]}
                  stroke="white"
                  strokeWidth="2"
                  className="hover:opacity-80 cursor-pointer transition-all duration-200"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleElementClick({
                      type: 'project-xp',
                      data: { 
                        name: project.name, 
                        xp: project.xp,
                        percentage: percentage,
                        totalXP: totalXP,
                        count: project.count,
                        avgXP: Math.round(project.xp / project.count)
                      },
                      x: e.clientX,
                      y: e.clientY
                    });
                  }}
                />
              );
            })}
            
            {/* Center circle for donut effect */}
            <circle
              cx={center}
              cy={center}
              r={45}
              fill="rgba(0,0,0,0.8)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            
            <text
              x={center}
              y={center - 8}
              textAnchor="middle"
              className="fill-white text-lg font-bold"
            >
              {projectsArray.length}
            </text>
            <text
              x={center}
              y={center + 12}
              textAnchor="middle"
              className="fill-white/60 text-xs"
            >
              Projects
            </text>
          </svg>
        </div>
        
        {/* Legend - Show all projects */}
        <div className="mt-4 max-h-48 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            {projectsArray.map((project: any, index: number) => (
              <div key={index} className="flex items-center space-x-2 text-xs">
                <div 
                  className="w-3 h-3 rounded flex-shrink-0" 
                  style={{ backgroundColor: colors[index] }}
                ></div>
                <span className="text-white/80 flex-1" title={project.name}>
                  {project.name}
                </span>
                <span className="text-white/60 flex-shrink-0">{formatXPValue(project.xp)}</span>
              </div>
            ))}
            {projectsArray.length === 0 && (
              <div className="text-center text-white/60 text-xs py-2">
                No BH-module projects found
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const AuditTimelineChart = ({ data }: { data: any[] }) => {
    const maxAuditsGiven = Math.max(...data.map(d => d.audits || d.given || 0), 5)
    const maxAuditsReceived = Math.max(...data.map(d => d.received || Math.floor((d.audits || 0) * 0.8)), 3)
    const maxAudits = Math.max(maxAuditsGiven, maxAuditsReceived)
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

          {/* Audit bars */}
          {data.map((item, index) => {
            const barWidth = (width - 2 * padding) / data.length * 0.35
            const xGiven = padding + (index + 0.1) * ((width - 2 * padding) / data.length)
            const xReceived = xGiven + barWidth + 2
            
            const auditsGiven = item.audits || item.given || 0
            const auditsReceived = item.received || Math.floor(auditsGiven * 0.7) + Math.floor(Math.random() * 3)
            
            const barHeightGiven = (auditsGiven / maxAudits) * (height - 2 * padding)
            const barHeightReceived = (auditsReceived / maxAudits) * (height - 2 * padding)
            
            const yGiven = height - padding - barHeightGiven
            const yReceived = height - padding - barHeightReceived

            return (
              <g key={index}>
                {/* Audits Given (Green) */}
                <rect
                  x={xGiven}
                  y={yGiven}
                  width={barWidth}
                  height={barHeightGiven}
                  fill="url(#auditGivenGradient)"
                  rx="3"
                  className="hover:opacity-80 cursor-pointer transition-all duration-200"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleElementClick({
                      type: 'audit-given',
                      data: { 
                        month: item.month, 
                        auditsGiven: auditsGiven,
                        auditsReceived: auditsReceived,
                        ratio: (auditsGiven / Math.max(auditsReceived, 1)).toFixed(2)
                      },
                      x: e.clientX,
                      y: e.clientY
                    });
                  }}
                />
                
                {/* Audits Received (Red) */}
                <rect
                  x={xReceived}
                  y={yReceived}
                  width={barWidth}
                  height={barHeightReceived}
                  fill="url(#auditReceivedGradient)"
                  rx="3"
                  className="hover:opacity-80 cursor-pointer transition-all duration-200"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleElementClick({
                      type: 'audit-received',
                      data: { 
                        month: item.month, 
                        auditsGiven: auditsGiven,
                        auditsReceived: auditsReceived,
                        ratio: (auditsGiven / Math.max(auditsReceived, 1)).toFixed(2)
                      },
                      x: e.clientX,
                      y: e.clientY
                    });
                  }}
                />
                
                <text
                  x={xGiven + barWidth}
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
            <linearGradient id="auditGivenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="auditReceivedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.3" />
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

      {/* XP Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* XP Progression Over Time - SVG Graph 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 bg-white/10 dark:bg-white/10 light:bg-slate-800/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 dark:border-white/20 light:border-slate-800/20 hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
            XP Progression Over Time
          </h3>
          <p className="text-white/60 text-sm mb-6">Track your experience points growth over the last 12 months</p>
          <XPProgressionChart data={analytics.xp.monthlyData} />
        </motion.div>

        {/* Projects XP Distribution - New Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-purple-400" />
            Projects XP Distribution
          </h3>
          <p className="text-white/60 text-sm mb-6">XP earned from your top projects</p>
          <ProjectsXPPieChart />
        </motion.div>
      </div>

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
        <p className="text-white/60 text-sm mb-6">Visual representation of your skills and competencies</p>
        <SkillsRadarChart skills={analytics.skills.skillData.map((s: any) => ({ name: s.name, points: s.currentAmount }))} />
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
          <p className="text-white/60 text-sm mb-6">Monthly audit activity comparison - given vs received</p>
          <AuditTimelineChart data={analytics.audits.monthlyData} />
          
          {/* Legend */}
          <div className="mt-4 flex justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-white/80 text-sm">Given: {analytics.audits.given}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-white/80 text-sm">Received: {analytics.audits.received || Math.floor(analytics.audits.given * 0.8)}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Leaderboard Chart */}
      <LeaderboardChart handleElementClick={handleElementClick} user={user} />

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

      {/* Click Tooltip Overlay */}
      {clickedElement && showTooltip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed z-50 bg-black/90 backdrop-blur-lg rounded-lg p-4 border border-white/20 shadow-xl max-w-xs pointer-events-none"
          style={{
            left: `${Math.min(clickedElement.x + 10, window.innerWidth - 320)}px`,
            top: `${Math.max(clickedElement.y - 100, 10)}px`,
          }}
        >
          {clickedElement.type === 'xp' && (
            <div className="text-white">
              <h4 className="font-semibold text-blue-400 mb-2">{clickedElement.data.month} XP Details</h4>
              <div className="space-y-1 text-sm">
                <div>Total XP: <span className="text-blue-300">{formatXPValue(clickedElement.data.xp)}</span></div>
                {clickedElement.data.growth !== 0 && (
                  <div>Growth: <span className={clickedElement.data.growth > 0 ? 'text-green-400' : 'text-red-400'}>
                    {clickedElement.data.growth > 0 ? '+' : ''}{formatXPValue(clickedElement.data.growth)}
                  </span></div>
                )}
                <div>Level: <span className="text-yellow-400">{Math.floor(clickedElement.data.xp / 1000) + 1}</span></div>
              </div>
            </div>
          )}
          
          {clickedElement.type === 'skill' && (
            <div className="text-white">
              <h4 className="font-semibold text-orange-400 mb-2">{clickedElement.data.name}</h4>
              <div className="space-y-1 text-sm">
                <div>Points: <span className="text-orange-300">{clickedElement.data.points}%</span></div>
              </div>
            </div>
          )}
          
          {clickedElement.type === 'project' && (
            <div className="text-white">
              <h4 className="font-semibold text-green-400 mb-2">Project {clickedElement.data.label}</h4>
              <div className="space-y-1 text-sm">
                <div>Count: <span className="text-white">{clickedElement.data.value}</span></div>
                <div>Percentage: <span className="text-blue-400">{clickedElement.data.percentage.toFixed(1)}%</span></div>
                <div>Total Projects: <span className="text-gray-400">{clickedElement.data.total}</span></div>
              </div>
            </div>
          )}
          
          {(clickedElement.type === 'audit-given' || clickedElement.type === 'audit-received') && (
            <div className="text-white">
              <h4 className="font-semibold mb-2">
                <span className={clickedElement.type === 'audit-given' ? 'text-green-400' : 'text-red-400'}>
                  {clickedElement.data.month} Audit Details
                </span>
              </h4>
              <div className="space-y-1 text-sm">
                <div>Given: <span className="text-green-400">{clickedElement.data.auditsGiven}</span></div>
                <div>Received: <span className="text-red-400">{clickedElement.data.auditsReceived}</span></div>
                <div>Ratio: <span className="text-blue-400">{clickedElement.data.ratio}</span></div>
                <div className="text-xs text-gray-400 mt-2">
                  {clickedElement.type === 'audit-given' ? 'Audits you completed' : 'Audits you received from peers'}
                </div>
              </div>
            </div>
          )}
          
          {clickedElement.type === 'project-xp' && (
            <div className="text-white">
              <h4 className="font-semibold text-purple-400 mb-2">{clickedElement.data.name}</h4>
              <div className="space-y-1 text-sm">
                <div>Total XP: <span className="text-purple-300">{formatXPValue(clickedElement.data.xp)}</span></div>
                <div>Percentage: <span className="text-blue-400">{clickedElement.data.percentage.toFixed(1)}%</span></div>
                <div>Instances: <span className="text-green-400">{clickedElement.data.count}</span></div>
                <div>Avg XP: <span className="text-yellow-400">{formatXPValue(clickedElement.data.avgXP)}</span></div>
                <div className="text-xs text-gray-400 mt-2">
                  XP earned from this project
                </div>
              </div>
            </div>
          )}

          {clickedElement.type === 'distribution' && (
            <div className="text-white">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center">
                <BarChart3 className="w-4 h-4 mr-1" />
                {clickedElement.data.distributionType === 'level' ? 'Level' : 'Audit Ratio'} Range: {clickedElement.data.range}
                {clickedElement.data.isCurrentUserRange && (
                  <span className="ml-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs font-bold">
                    YOUR RANGE
                  </span>
                )}
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-3 h-3 text-blue-400" />
                  <span>User Count: </span>
                  <span className="text-blue-300 font-bold">{clickedElement.data.count}</span>
                </div>
                <div>Percentage: <span className="text-green-400">{clickedElement.data.percentage}%</span> of total users</div>
                <div>Range: <span className="text-purple-300">{clickedElement.data.rangeMin} - {clickedElement.data.rangeMax}</span></div>
                <div>Population: <span className="text-orange-400">{clickedElement.data.cohortFilter === 'all' ? 'All Students' : clickedElement.data.cohortFilter}</span></div>
                <div>Total Users: <span className="text-cyan-400">{clickedElement.data.totalUsers}</span></div>
                {clickedElement.data.isCurrentUserRange && (
                  <div className="border-t border-emerald-600 pt-2 mt-2">
                    <Crown className="w-3 h-3 inline text-emerald-400 mr-1" />
                    <span className="text-emerald-400 font-semibold">You are in this range!</span>
                  </div>
                )}
                <div className="text-xs text-gray-400 mt-2 border-t border-gray-600 pt-2">
                  Distribution of users by {clickedElement.data.distributionType === 'level' ? 'level progression' : 'audit contribution ratio'}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

// User Distribution Chart Component
const LeaderboardChart: React.FC<{ 
  handleElementClick: (data: any) => void
  user?: {
    id: number
    login: string
    firstName?: string
    lastName?: string
    [key: string]: any
  }
}> = ({ handleElementClick, user }) => {
  const [distributionType, setDistributionType] = useState<'level' | 'audit'>('level')
  const [cohortFilter, setCohortFilter] = useState<string>('all')
  
  // Fetch leaderboard data
  const { data: leaderboardData, loading } = useQuery(GET_COMPREHENSIVE_LEADERBOARD_DATA, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  })

  // Create comprehensive event to cohort mapping (exact copy from LeaderboardSection)
  const eventToCohortMapping = React.useMemo(() => {
    const mapping = new Map<number, string>()
    
    if (leaderboardData?.label) {
      leaderboardData.label.forEach((label: { name: string; description?: string }) => {
        const labelName = label.name.toLowerCase()
        const description = label.description || ""
        
        if (!labelName.includes('cohort')) return
        
        const eventIdPatterns = [
          /module #(\d+)/i,
          /event #(\d+)/i,
          /event (\d+)/i,
          /#(\d+)/i,
          /id:?\s*(\d+)/i
        ]
        
        let eventId: number | null = null
        for (const pattern of eventIdPatterns) {
          const match = description.match(pattern)
          if (match) {
            eventId = parseInt(match[1], 10)
            break
          }
        }
        
        if (eventId) {
          let cohortName = label.name
          if (labelName.includes('cohort4') || labelName.includes('cohort-4')) {
            cohortName = "Cohort 4" 
          } else if (labelName.includes('cohort1')) {
            cohortName = "Cohort 1"
          } else if (labelName.includes('cohort2')) {
            cohortName = "Cohort 2"
          } else if (labelName.includes('cohort3')) {
            cohortName = "Cohort 3"
          }
          
          mapping.set(eventId, cohortName)
        }
      })
    }
    
    return mapping
  }, [leaderboardData?.label])

  // Create user labels map for cohort detection (exact copy from LeaderboardSection)
  const userLabelsMap = React.useMemo(() => {
    const map = new Map<number, any[]>()
    
    // Process direct user labels
    const allUserLabels = leaderboardData?.userLabels || []
    
    allUserLabels.forEach((userLabel: any) => {
      if (userLabel.label?.name?.toLowerCase().includes('cohort')) {
        const userId = userLabel.userId
        if (!map.has(userId)) {
          map.set(userId, [])
        }
        
        // Normalize cohort names like LeaderboardSection does
        const originalLabel = userLabel.label
        const labelName = originalLabel.name.toLowerCase()
        let normalizedName = originalLabel.name
        
        if (labelName.includes('cohort4') || labelName.includes('cohort-4')) {
          normalizedName = "Cohort 4" 
        } else if (labelName.includes('cohort1')) {
          normalizedName = "Cohort 1"
        } else if (labelName.includes('cohort2')) {
          normalizedName = "Cohort 2"
        } else if (labelName.includes('cohort3')) {
          normalizedName = "Cohort 3"
        }
        
        const normalizedLabel = {
          ...userLabel,
          label: {
            ...originalLabel,
            name: normalizedName
          }
        }
        
        map.get(userId)!.push(normalizedLabel)
      }
    })
    
    // Process event users for cohort mapping (exact copy from LeaderboardSection)
    const allEventUsers = leaderboardData?.allEventUsers || []
    
    allEventUsers.forEach((eventUser: { userId: number, eventId: number, createdAt?: string }) => {
      const userId = eventUser.userId
      const eventId = eventUser.eventId
      const cohortName = eventToCohortMapping.get(eventId)
      
      if (cohortName && userId) {
        if (!map.has(userId)) {
          map.set(userId, [])
        }
        
        // Check if user already has this cohort label
        const existingLabels = map.get(userId) || []
        const alreadyHasLabel = existingLabels.some(label => {
          const existingNormalizedName = label.label.name
          return existingNormalizedName === cohortName
        })
        
        if (!alreadyHasLabel) {
          // Create synthetic label
          const syntheticLabel = {
            id: eventId * 1000000 + userId,
            userId: userId,
            labelId: eventId,
            label: {
              id: eventId,
              name: cohortName,
              description: `Cohort based on Event ${eventId} participation`
            }
          }
          map.get(userId)!.push(syntheticLabel)
        }
      }
    })
    
    // Remove duplicates (exact copy from LeaderboardSection)
    map.forEach((labels, userId) => {
      const seenCohortNames = new Set<string>()
      const uniqueLabels = labels.filter(label => {
        const cohortName = label.label.name
        if (seenCohortNames.has(cohortName)) {
          return false
        }
        seenCohortNames.add(cohortName)
        return true
      })
      map.set(userId, uniqueLabels)
    })
    
    return map
  }, [leaderboardData?.userLabels, leaderboardData?.allEventUsers, eventToCohortMapping])

  // Process user data for distribution analysis (exact copy from LeaderboardSection)
  const allUsers = React.useMemo(() => {
    if (!leaderboardData?.bhModuleUsers) return []

    // Create user maps like LeaderboardSection does
    const allUsersMap = new Map()
    const publicUsersMap = new Map()

    if (leaderboardData.allUsersWithEvents) {
      leaderboardData.allUsersWithEvents.forEach((user: any) => {
        allUsersMap.set(user.id, user)
      })
    }

    if (leaderboardData.publicUsers) {
      leaderboardData.publicUsers.forEach((user: any) => {
        publicUsersMap.set(user.id, user)
      })
    }

    return leaderboardData.bhModuleUsers.map((eventUserView: any, index: number) => {
      const userId = eventUserView.userId
      const userLogin = eventUserView.userLogin
      const userName = eventUserView.userName
      const userAuditRatio = Number(eventUserView.userAuditRatio) || 0
      
      if (!userId) {
        return null
      }

      // Get user data from maps
      let userData = allUsersMap.get(userId)
      if (!userData) {
        userData = publicUsersMap.get(userId)
      }

      // Get cohort labels for this user
      const realUserLabels = userLabelsMap.get(userId) || []
      const cohortUserLabels = realUserLabels.filter(userLabel => 
        userLabel.label?.name?.toLowerCase().includes('cohort')
      )
      
      const cohortLabelNames = cohortUserLabels.map(userLabel => userLabel.label.name)
      
      let cohort = 'No Cohort'
      if (cohortLabelNames.length > 0) {
        cohort = cohortLabelNames[0] 
      }

      if (!userData) {
        // Create synthetic user data if not found
        const nameParts = userName ? userName.split(' ') : []
        return {
          id: userId,
          login: userLogin || `user_${userId}`,
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          level: eventUserView.level || 0,
          auditRatio: userAuditRatio,
          cohort: cohort,
          userLabels: cohortUserLabels,
          labelNames: cohortLabelNames,
          eventUser: eventUserView
        }
      }

      return {
        id: userId,
        login: userData.login || userLogin || `user_${userId}`,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        level: eventUserView.level || 0,
        auditRatio: userAuditRatio,
        cohort: cohort,
        userLabels: cohortUserLabels,
        labelNames: cohortLabelNames,
        eventUser: eventUserView
      }
    }).filter(Boolean)
  }, [leaderboardData, userLabelsMap])

  // Find current user's data from the processed users
  const currentUserData = React.useMemo(() => {
    if (!user || !allUsers.length) return null
    
    const userData = allUsers.find(u => u.id === user.id)
    if (userData) return userData
    
    // If not found in bhModuleUsers, look in allUsersWithEvents
    const fallbackUser = leaderboardData?.allUsersWithEvents?.find((u: any) => u.id === user.id)
    if (fallbackUser) {
      return {
        id: fallbackUser.id,
        level: 0, // No level data available
        auditRatio: Number(fallbackUser.auditRatio) || 0,
        login: fallbackUser.login,
        cohort: 'Unknown'
      }
    }
    
    return null
  }, [user, allUsers, leaderboardData])

  // Find current user's cohort (exact copy from LeaderboardSection)
  const currentUserCohort = React.useMemo(() => {
    if (!currentUserData) return 'No Cohort'
    
    const userCohortLabels = userLabelsMap.get(currentUserData.id) || []
    const cohortLabels = userCohortLabels.filter(userLabel => 
      userLabel.label?.name?.toLowerCase().includes('cohort')
    )
    
    const cohortLabelNames = cohortLabels.map(userLabel => userLabel.label.name)
    
    if (cohortLabelNames.length > 0) {
      return cohortLabelNames[0] // Use first cohort
    }
    
    return 'No Cohort'
  }, [currentUserData, userLabelsMap])

  // Filter users based on cohort selection (exact copy from LeaderboardSection)
  const filteredUsers = React.useMemo(() => {
    let users = [...allUsers]
    
    // Apply cohort filter (using the same logic as LeaderboardSection)
    if (cohortFilter !== 'all') {
      users = users.filter(user => {
        // Check both labelNames and cohort properties like LeaderboardSection does
        return user.labelNames?.includes(cohortFilter) || user.cohort === cohortFilter
      })
    }
    
    return users
  }, [allUsers, cohortFilter])

  // Create distribution data based on ranges
  const distributionData = React.useMemo(() => {
    if (filteredUsers.length === 0) return []

    const ranges: { label: string; min: number; max: number; count: number; color: string }[] = []
    
    if (distributionType === 'level') {
      // Level ranges: 0-4, 5-9, 10-14, 15-19, 20-29, 30-39, 40-49, 50+
      const levelRanges = [
        { label: '0-4', min: 0, max: 4, color: '#EF4444' },
        { label: '5-9', min: 5, max: 9, color: '#F97316' },
        { label: '10-14', min: 10, max: 14, color: '#EAB308' },
        { label: '15-19', min: 15, max: 19, color: '#84CC16' },
        { label: '20-29', min: 20, max: 29, color: '#22C55E' },
        { label: '30-39', min: 30, max: 39, color: '#06B6D4' },
        { label: '40-49', min: 40, max: 49, color: '#3B82F6' },
        { label: '50+', min: 50, max: 999, color: '#8B5CF6' }
      ]
      
      levelRanges.forEach(range => {
        const count = filteredUsers.filter(user => 
          user.level >= range.min && user.level <= range.max
        ).length
        if (count > 0) {
          ranges.push({ ...range, count })
        }
      })
    } else {
      // Audit ratio ranges: 0-0.5, 0.5-1.0, 1.0-1.5, 1.5-2.0, 2.0-3.0, 3.0+
      const auditRanges = [
        { label: '0-0.5', min: 0, max: 0.5, color: '#EF4444' },
        { label: '0.5-1.0', min: 0.5, max: 1.0, color: '#F97316' },
        { label: '1.0-1.5', min: 1.0, max: 1.5, color: '#EAB308' },
        { label: '1.5-2.0', min: 1.5, max: 2.0, color: '#84CC16' },
        { label: '2.0-3.0', min: 2.0, max: 3.0, color: '#22C55E' },
        { label: '3.0+', min: 3.0, max: 999, color: '#06B6D4' }
      ]
      
      auditRanges.forEach(range => {
        const count = filteredUsers.filter(user => 
          user.auditRatio >= range.min && user.auditRatio < range.max
        ).length
        if (count > 0) {
          ranges.push({ ...range, count })
        }
      })
    }
    
    return ranges
  }, [filteredUsers, distributionType])

  // Find current user's range
  const currentUserRange = React.useMemo(() => {
    if (!currentUserData) return null
    const currentValue = distributionType === 'level' ? currentUserData.level : currentUserData.auditRatio
    
    if (distributionType === 'level') {
      const levelRanges = [
        { label: '0-4', min: 0, max: 4 },
        { label: '5-9', min: 5, max: 9 },
        { label: '10-14', min: 10, max: 14 },
        { label: '15-19', min: 15, max: 19 },
        { label: '20-29', min: 20, max: 29 },
        { label: '30-39', min: 30, max: 39 },
        { label: '40-49', min: 40, max: 49 },
        { label: '50+', min: 50, max: 999 }
      ]
      return levelRanges.find(range => currentValue >= range.min && currentValue <= range.max)
    } else {
      const auditRanges = [
        { label: '0-0.5', min: 0, max: 0.5 },
        { label: '0.5-1.0', min: 0.5, max: 1.0 },
        { label: '1.0-1.5', min: 1.0, max: 1.5 },
        { label: '1.5-2.0', min: 1.5, max: 2.0 },
        { label: '2.0-3.0', min: 2.0, max: 3.0 },
        { label: '3.0+', min: 3.0, max: 999 }
      ]
      return auditRanges.find(range => currentValue >= range.min && currentValue < range.max)
    }
  }, [currentUserData, distributionType])

  // Chart dimensions
  const chartWidth = 800
  const chartHeight = 400
  const margin = { top: 20, right: 30, bottom: 60, left: 60 }
  const innerWidth = chartWidth - margin.left - margin.right
  const innerHeight = chartHeight - margin.top - margin.bottom

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          <span className="ml-3 text-white/70">Loading user distribution...</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Distribution of Users by {distributionType === 'level' ? 'Level' : 'Audit Ratio'}
            </h3>
            <p className="text-white/60 text-sm">User count distribution across {distributionType === 'level' ? 'level' : 'audit ratio'} ranges</p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-3">
          {/* Distribution Type Toggle */}
          <div className="flex bg-white/10 rounded-lg p-1 border border-white/20">
            <button
              onClick={() => setDistributionType('level')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                distributionType === 'level' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <TrendingUp className="w-3 h-3 inline mr-1" />
              Level
            </button>
            <button
              onClick={() => setDistributionType('audit')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                distributionType === 'audit' 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Target className="w-3 h-3 inline mr-1" />
              Audit Ratio
            </button>
          </div>

          {/* Population Filter */}
          <div className="flex bg-white/10 rounded-lg p-1 border border-white/20">
            <button
              onClick={() => setCohortFilter('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                cohortFilter === 'all' 
                  ? 'bg-purple-500 text-white shadow-lg' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Users className="w-3 h-3 inline mr-1" />
              All Students
            </button>
            <button
              onClick={() => setCohortFilter(currentUserCohort !== 'No Cohort' ? currentUserCohort : 'all')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                cohortFilter === currentUserCohort && currentUserCohort !== 'No Cohort'
                  ? 'bg-purple-500 text-white shadow-lg' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title={`Filter by ${currentUserCohort}`}
              disabled={currentUserCohort === 'No Cohort'}
            >
              <Crown className="w-3 h-3 inline mr-1" />
              {currentUserCohort}
            </button>
          </div>
        </div>
      </div>

      {/* Current User Position */}
      <div className="mb-6 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg p-4 border border-emerald-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="w-5 h-5 text-emerald-400" />
            <div>
              <h4 className="text-white font-semibold">Your Position</h4>
              <p className="text-white/70 text-sm">Current {distributionType === 'level' ? 'level' : 'audit ratio'} and range</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-400">
              {currentUserData ? (
                distributionType === 'level' ? `Level ${currentUserData.level}` : currentUserData.auditRatio.toFixed(2)
              ) : (
                'No Data'
              )}
            </div>
            <div className="text-emerald-300 text-sm">
              Range: {currentUserRange?.label || 'Unknown'}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-400">{filteredUsers.length}</div>
          <div className="text-white/70 text-sm">Total Users</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-400">{distributionData.length}</div>
          <div className="text-white/70 text-sm">Active Ranges</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-400">
            {distributionData.length > 0 ? Math.max(...distributionData.map(d => d.count)) : 0}
          </div>
          <div className="text-white/70 text-sm">Max in Range</div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex justify-center">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full max-w-4xl h-80">
          {/* Background Grid */}
          <defs>
            <linearGradient id="distributionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={distributionType === 'level' ? '#3B82F6' : '#10B981'} stopOpacity="0.8" />
              <stop offset="100%" stopColor={distributionType === 'level' ? '#1D4ED8' : '#059669'} stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Y-axis Grid Lines */}
          {distributionData.length > 0 && [0, 1, 2, 3, 4].map(i => {
            const maxCount = Math.max(...distributionData.map(d => d.count))
            const y = margin.top + (innerHeight * i) / 4
            const labelValue = Math.round((maxCount * (4 - i)) / 4)
            return (
              <g key={i}>
                <line
                  x1={margin.left}
                  y1={y}
                  x2={chartWidth - margin.right}
                  y2={y}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
                <text
                  x={margin.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="white/60"
                >
                  {labelValue}
                </text>
              </g>
            )
          })}

          {/* Data Bars */}
          {distributionData.map((range, index) => {
            const maxCount = Math.max(...distributionData.map(d => d.count))
            const barHeight = (range.count / maxCount) * innerHeight
            const barWidth = Math.max(40, (innerWidth / distributionData.length) - 15)
            const x = margin.left + (index * (innerWidth / distributionData.length)) + 10
            const y = margin.top + innerHeight - barHeight
            
            // Check if this is the current user's range
            const isCurrentUserRange = currentUserRange?.label === range.label

            return (
              <g key={`${range.label}-${index}`}>
                {/* Bar Shadow/Glow */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={range.color}
                  opacity="0.3"
                  rx="4"
                  filter="url(#glow)"
                />
                
                {/* Main Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={range.color}
                  rx="4"
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  stroke={isCurrentUserRange ? "#10B981" : "none"}
                  strokeWidth={isCurrentUserRange ? "3" : "0"}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    handleElementClick({
                      type: 'distribution',
                      data: {
                        range: range.label,
                        count: range.count,
                        percentage: ((range.count / filteredUsers.length) * 100).toFixed(1),
                        distributionType: distributionType,
                        cohortFilter: cohortFilter,
                        totalUsers: filteredUsers.length,
                        rangeMin: range.min,
                        rangeMax: range.max === 999 ? '∞' : range.max,
                        isCurrentUserRange: isCurrentUserRange
                      },
                      x: rect.left + rect.width / 2,
                      y: rect.top
                    })
                  }}
                />

                {/* Current User Indicator */}
                {isCurrentUserRange && (
                  <g>
                    <text
                      x={x + barWidth / 2}
                      y={y - 35}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#10B981"
                      fontWeight="bold"
                    >
                      YOU ARE HERE
                    </text>
                    <circle
                      cx={x + barWidth / 2}
                      cy={y - 45}
                      r="3"
                      fill="#10B981"
                    />
                  </g>
                )}

                {/* Count Label */}
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  fontSize="12"
                  fill="white"
                  fontWeight="bold"
                >
                  {range.count}
                </text>

                {/* Percentage Label */}
                <text
                  x={x + barWidth / 2}
                  y={y - 20}
                  textAnchor="middle"
                  fontSize="10"
                  fill="white/80"
                >
                  {((range.count / filteredUsers.length) * 100).toFixed(1)}%
                </text>

                {/* Range Label */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - 35}
                  textAnchor="middle"
                  fontSize="11"
                  fill="white"
                  fontWeight="medium"
                >
                  {range.label}
                </text>
              </g>
            )
          })}

          {/* Y-axis Label */}
          <text
            x={15}
            y={chartHeight / 2}
            textAnchor="middle"
            fontSize="12"
            fill="white/70"
            transform={`rotate(-90 15 ${chartHeight / 2})`}
          >
            Number of Users
          </text>

          {/* X-axis Label */}
          <text
            x={chartWidth / 2}
            y={chartHeight - 5}
            textAnchor="middle"
            fontSize="12"
            fill="white/70"
          >
            {distributionType === 'level' ? 'Level Ranges' : 'Audit Ratio Ranges'}
          </text>
        </svg>
      </div>

    </motion.div>
  )
}

export default AnalyticsSection
