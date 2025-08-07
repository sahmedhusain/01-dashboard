import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, PieChart, Activity, Target, Users, Crown } from 'lucide-react'
import { useQuery } from '@apollo/client'
import { formatXPValue } from '../../../utils/dataFormatting'
import { GET_COMPREHENSIVE_LEADERBOARD_DATA, GET_ALL_LABEL_USERS, GET_ALL_LABELS } from '../../../graphql/allQueries'

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
  const [xpRange, setXpRange] = useState("all")
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
  
  // Generate full XP progression data from all transactions
  const getFullXPProgression = () => {
    if (!analytics.rawData?.transactions) return []
    // Filter for XP transactions and sort by date
    const xpTx = analytics.rawData.transactions
      .filter((t: any) => t.type === "xp")
      .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    let cumulativeXP = 0
    return xpTx.map((t: any) => {
      cumulativeXP += t.amount
      return {
        month: t.createdAt.slice(0, 7),
        xp: t.amount,
        cumulativeXP,
      }
    })
  }
  const fullXPProgression = getFullXPProgression()

  // Central handleElementClick for all charts
  const handleElementClick = (elementData: { type: string, data: any, x: number, y: number }) => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    setClickedElement(elementData)
    setShowTooltip(true)
  }

  // Filter XP data based on selected range
  // Fill missing periods for continuous line
  const fillXPRange = (data: any[], range: string) => {
    if (!Array.isArray(data) || data.length === 0) return []
    let filled = [...data]
    if (range === "week" || range === "month") {
      // Always show at least two points: start and end
      if (filled.length === 1) {
        // If the only point is nonzero, show from zero to value
        filled = [
          { ...filled[0], xp: 0, cumulativeXP: 0, month: "start" },
          { ...filled[0] }
        ]
      }
      if (filled.length === 0) {
        // No data at all, create two zero points
        filled = [
          { month: "start", xp: 0, cumulativeXP: 0 },
          { month: "end", xp: 0, cumulativeXP: 0 }
        ]
      }
    }
    return filled
  }

  const filterXPData = (data: any[]) => {
    if (!Array.isArray(data) || data.length === 0) return []
    switch (xpRange) {
      case "week":
        return fillXPRange(data.slice(-1), "week")
      case "month":
        return fillXPRange(data.slice(-1), "month")
      case "3months":
        return data.slice(-3)
      case "6months":
        return data.slice(-6)
      case "12months":
        return data.slice(-12)
      case "all":
      default:
        return data
    }
  }
  const filteredXPData = filterXPData(xpRange === "all" ? fullXPProgression : analytics.xp.monthlyData)

  const [showPoints, setShowPoints] = useState(false);
  const [showAverage, setShowAverage] = useState(false);
  const [showRadarPoints, setShowRadarPoints] = useState(true);

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

    // Calculate average XP for the filtered data
    const avgXP = data.length > 0 ? data.reduce((sum, d) => sum + d.xp, 0) / data.length : 0
    const avgPoints = data.map((_, idx) => {
      const x = padding + (idx / (data.length - 1)) * (width - 2 * padding)
      const y = height - padding - (avgXP / maxXP) * (height - 2 * padding)
      return { x, y }
    })

    return (
      <div className="w-full">
        <div className="flex justify-end mb-2 space-x-2">
          <button
            className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm border transition-all ${
              showPoints ? "bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 text-white border-blue-400 scale-105"
                : "bg-white/10 text-white/70 border-white/10 hover:bg-blue-500/20"
            }`}
            style={{ minWidth: 80 }}
            onClick={() => setShowPoints(v => !v)}
          >
            {showPoints ? "Hide Points" : "Show Points"}
          </button>
          <button
            className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm border transition-all ${
              showAverage ? "bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 text-white border-green-400 scale-105"
                : "bg-white/10 text-white/70 border-white/10 hover:bg-green-500/20"
            }`}
            style={{ minWidth: 80 }}
            onClick={() => setShowAverage(v => !v)}
          >
            {showAverage ? "Hide Average" : "Show Average"}
          </button>
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[220px] md:h-[320px] lg:h-80">
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

          {/* Main line (no area fill, smooth) */}
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points.map(p => `${p.x},${p.y}`).join(' ')}
          />

          {/* Data points: round, blue, white border */}
          {showPoints &&
            points.map((point, index) => (
              <g key={index}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill="#3B82F6"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* Interactive click area */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="10"
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
              </g>
            ))
          }

          {/* Average line */}
          {showAverage && avgPoints.length > 1 && (
            <>
              <polyline
                fill="none"
                stroke="#22C55E"
                strokeWidth="2"
                strokeDasharray="8 4"
                points={avgPoints.map(p => `${p.x},${p.y}`).join(' ')}
              />
              {/* Average label */}
              <text
                x={avgPoints[Math.floor(avgPoints.length / 2)]?.x || 0}
                y={avgPoints[Math.floor(avgPoints.length / 2)]?.y - 12 || 0}
                textAnchor="middle"
                className="fill-green-400 text-xs font-semibold"
                style={{ pointerEvents: "none" }}
              >
                Avg: {formatXPValue(avgXP)}
              </text>
            </>
          )}

          {/* X-axis labels only if not "Since Start" */}
          {xpRange !== "all" &&
            points.map((point, index) => (
              <text
                key={index}
                x={point.x}
                y={height - padding + 20}
                textAnchor="middle"
                className="fill-white/60 text-xs"
              >
                {point.month}
              </text>
            ))
          }
        </svg>
      </div>
    )
  }

  
  const SkillsRadarChart = ({
    skills,
    showRadarPoints,
    onTogglePoints,
    size = 400,
    radius = 120,
    handleElementClick,
  }: {
    skills: Array<{ name: string; points: number }>
    showRadarPoints: boolean
    onTogglePoints: () => void
    size?: number
    radius?: number
    handleElementClick?: (elementData: { type: string, data: any, x: number, y: number }) => void
  }) => {
    const center = size / 2
    const maxPoints = Math.max(...skills.map(s => s.points), 100)

    const getPointOnCircle = (angle: number, distance: number) => {
      const x = center + Math.cos(angle - Math.PI / 2) * distance
      const y = center + Math.sin(angle - Math.PI / 2) * distance
      return { x, y }
    }

    const skillsToShow = skills

    return (
      <div>
{/* Show Points button moved to description row */}
        <div className="w-full h-full min-h-[220px] md:min-h-[320px] lg:min-h-[400px] flex justify-center items-center overflow-visible">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-[220px] md:h-[320px] lg:h-[400px] drop-shadow-lg overflow-visible">
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
                  stroke="rgba(251,191,36,0.18)"
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
              fill="rgba(251,191,36,0.18)"
              stroke="#f59e42"
              strokeWidth="4"
            />

            {/* Data points */}
            {showRadarPoints &&
              skillsToShow.map((skill, i) => {
                const angle = (2 * Math.PI * i) / skillsToShow.length
                const distance = (skill.points / maxPoints) * radius
                const point = getPointOnCircle(angle, distance)
                return (
                  <g key={i}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="8"
                      fill="#fbbf24"
                      stroke="#f59e42"
                      strokeWidth="3"
                    />
                    {/* Interactive click area - only on this point */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="16"
                      fill="transparent"
                      className="hover:fill-yellow-500/20 cursor-pointer transition-all duration-200"
                      onClick={handleElementClick ? (e: React.MouseEvent) => {
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
                      } : undefined}
                    />
                  </g>
                )
              })}

            {/* Labels */}
            {skillsToShow.map((skill, i) => {
              const angle = (2 * Math.PI * i) / skillsToShow.length
              const labelDistance = radius + 36
              const point = getPointOnCircle(angle, labelDistance)
              return (
                <text
                  key={i}
                  x={point.x}
                  y={point.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white/90 font-bold"
                  fontSize={Math.max(18, Math.round(size / 32))}
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

    // Pie chart gradients
    const gradients = [
      { id: "pie-green", from: "#10B981", to: "#34D399" },
      { id: "pie-red", from: "#EF4444", to: "#F87171" },
      { id: "pie-yellow", from: "#F59E0B", to: "#FBBF24" }
    ]

    return (
      <div className="flex justify-center">
        <div className="relative">
            <svg viewBox="0 0 200 200" className="w-full h-[180px] md:h-[200px]">
            <defs>
              <radialGradient id="pie-bg-glow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              {gradients.map(g => (
                <linearGradient key={g.id} id={g.id} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={g.from} />
                  <stop offset="100%" stopColor={g.to} />
                </linearGradient>
              ))}
            </defs>
            {/* Soft background glow */}
            <circle cx={center} cy={center} r={90} fill="url(#pie-bg-glow)" />
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

              // Pick gradient for each segment
              let fillId = gradients[index % gradients.length].id
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={`url(#${fillId})`}
                  stroke="#fff"
                  strokeWidth="3"
                  filter="drop-shadow(0 2px 8px rgba(0,0,0,0.18))"
                  className="hover:opacity-90 cursor-pointer transition-all duration-200"
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
              r={54}
              fill="rgba(0,0,0,0.82)"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="2"
              filter="drop-shadow(0 2px 8px rgba(0,0,0,0.18))"
            />
            
            <text
              x={center}
              y={center - 4}
              textAnchor="middle"
              className="fill-white text-2xl font-extrabold drop-shadow"
            >
              {total}
            </text>
            <text
              x={center}
              y={center + 22}
              textAnchor="middle"
              className="fill-white/70 text-base font-semibold"
            >
              Projects
            </text>
          </svg>
        </div>
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
    
    // Get main module XP transactions only (exclude piscines and checkpoints)
    if (analytics.rawData?.transactions && analytics.rawData?.progress) {
      // Include both bh-module and piscine projects that are completed (isDone && grade >= 1)
      const completedProgress = analytics.rawData.progress.filter((p: any) => {
        if (!p.path) return false;
        if (p.path.includes('checkpoint')) return false;
        return p.isDone && p.grade >= 1 && p.object?.name;
      });

      // Map: path -> projectName for completed projects
      const completedPaths: Record<string, string> = {};
      completedProgress.forEach((p: any) => {
        completedPaths[p.path] = p.object.name;
      });

      // For each completed path, find the latest XP transaction for that path
      const xpTransactions = analytics.rawData.transactions.filter((t: any) => t.type === 'xp' && t.path && completedPaths[t.path]);
      const latestXPByPath: Record<string, any> = {};
      xpTransactions.forEach((t: any) => {
        if (!latestXPByPath[t.path] || new Date(t.createdAt) > new Date(latestXPByPath[t.path].createdAt)) {
          latestXPByPath[t.path] = t;
        }
      });

      // Aggregate XP per project name or piscine root, but for each piscine root only count the highest XP per user
      projectXPData = {};
      const piscineUserMaxXP: Record<string, Record<string, number>> = {};
      Object.entries(latestXPByPath).forEach(([path, t]: [string, any]) => {
        let key: string;
        let displayName: string;
        if (path.includes('piscine-') || path.includes('/bh-piscine/')) {
          // Piscine root: extract "piscine-xxx" or "bh-piscine"
          const match = path.match(/(piscine-\w+|bh-piscine)/);
          key = match ? match[1] : 'Piscine';
          if (key === 'bh-piscine') return; // Exclude bh-piscine
          displayName = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          // Only count the highest XP per user for each piscine root
          const userId = t.userId || t.user_id || t.user || '';
          if (!piscineUserMaxXP[key]) piscineUserMaxXP[key] = {};
          piscineUserMaxXP[key][userId] = Math.max(piscineUserMaxXP[key][userId] || 0, t.amount);
        } else {
          key = completedPaths[path];
          displayName = key;
          if (!projectXPData[key]) projectXPData[key] = { name: displayName, xp: 0, count: 0 };
          projectXPData[key].xp += t.amount;
          projectXPData[key].count += 1;
        }
      });
      // Sum piscine XP per root
      Object.entries(piscineUserMaxXP).forEach(([key, userMap]) => {
        const displayName = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        projectXPData[key] = {
          name: displayName,
          xp: Object.values(userMap).reduce((sum, xp) => sum + xp, 0),
          count: Object.keys(userMap).length
        };
      });
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
    // Attach description from progress data if available
    let projectDescriptions: Record<string, string> = {};
    if (analytics.rawData?.progress) {
      analytics.rawData.progress.forEach((p: any) => {
        if (p.object?.name && p.object?.description) {
          projectDescriptions[p.object.name] = p.object.description;
        }
      });
    }
    // Attach latest completion date for each project
    let projectDates: Record<string, string> = {};
    if (analytics.rawData?.progress) {
      analytics.rawData.progress.forEach((p: any) => {
        if (p.object?.name && p.isDone && p.grade >= 1 && p.createdAt) {
          if (!projectDates[p.object.name] || new Date(p.createdAt) > new Date(projectDates[p.object.name])) {
            projectDates[p.object.name] = p.createdAt;
          }
        }
      });
    }
    const projectsArray = Object.values(projectXPData)
      .map((proj: any) => ({
        ...proj,
        description: projectDescriptions[proj.name] || '',
        date: projectDates[proj.name] || ''
      }))
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Sum raw XP values, then format the total only after summing
    const totalXP: number = projectsArray.reduce((sum: number, project: any) => sum + (Number(project.xp) || 0), 0 as number);

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

    // Pie chart gradients for projects
    const gradients = [
      { id: "pie-blue", from: "#3B82F6", to: "#60A5FA" },
      { id: "pie-green", from: "#10B981", to: "#34D399" },
      { id: "pie-yellow", from: "#F59E0B", to: "#FBBF24" },
      { id: "pie-red", from: "#EF4444", to: "#F87171" },
      { id: "pie-purple", from: "#8B5CF6", to: "#A78BFA" },
      { id: "pie-teal", from: "#06B6D4", to: "#5eead4" },
      { id: "pie-orange", from: "#F97316", to: "#FDBA74" },
      { id: "pie-pink", from: "#EC4899", to: "#F472B6" }
    ];
    const colors = projectsArray.map((_, index) => gradients[index % gradients.length].id);

    return (
      <div>
        <div className="flex justify-center">
          <div className="relative">
            <svg viewBox="0 0 220 220" className="w-full h-[180px] md:h-[220px]">
              <defs>
                <radialGradient id="pie-bg-glow-projects" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
                {gradients.map(g => (
                  <linearGradient key={g.id} id={g.id} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={g.from} />
                    <stop offset="100%" stopColor={g.to} />
                  </linearGradient>
                ))}
              </defs>
              {/* Soft background glow */}
              <circle cx={center} cy={center} r={100} fill="url(#pie-bg-glow-projects)" />
              {projectsArray.map((project: any, index: number) => {
                const percentage = totalXP > 0 ? (project.xp / totalXP) * 100 : 0;
                const startAngle = cumulativePercentage / 100 * 2 * Math.PI;
                const endAngle = (cumulativePercentage + percentage) / 100 * 2 * Math.PI;
                
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
                    fill={`url(#${colors[index]})`}
                    stroke="#fff"
                    strokeWidth="3"
                    filter="drop-shadow(0 2px 8px rgba(0,0,0,0.18))"
                    className="hover:opacity-90 cursor-pointer transition-all duration-200"
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
                r={60}
                fill="rgba(0,0,0,0.82)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="2"
                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.18))"
              />
              
              <text
                x={center}
                y={center - 6}
                textAnchor="middle"
                className="fill-white text-2xl font-extrabold drop-shadow"
              >
                {formatXPValue(parseInt(String(totalXP), 10))}
              </text>
              <text
                x={center}
                y={center + 22}
                textAnchor="middle"
                className="fill-white/70 text-base font-semibold"
              >
                Total XP
              </text>
            </svg>
          </div>
        </div>
        
        {/* Legend - Show all projects */}
        <div className="mt-4 max-h-48 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            {projectsArray.map((project: any, index: number) => (
              <div key={index} className="flex items-start space-x-2 text-xs mb-1">
                <div 
                  className="w-3 h-3 rounded flex-shrink-0 border border-white mt-1" 
                  style={{ background: `linear-gradient(90deg, ${gradients[index % gradients.length].from}, ${gradients[index % gradients.length].to})` }}
                ></div>
                <div className="flex-1">
                  <span className="text-white/80 font-semibold" title={project.name}>
                    {project.name}
                  </span>
                  {project.description && (
                    <div className="text-white/50 text-[11px] leading-tight mt-0.5">{project.description}</div>
                  )}
                </div>
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

  const AuditTimelineChart = ({
    data,
    handleElementClick
  }: {
    data: any[]
    handleElementClick: (elementData: { type: string, data: any, x: number, y: number }) => void
  }) => {
    const [showGiven, setShowGiven] = useState(true);
    const [showReceived, setShowReceived] = useState(true);
    const [showAverage, setShowAverage] = useState(false);

    // Only call handleElementClick if the bar type is visible
    const safeHandleElementClick = (elementData: { type: string, data: any, x: number, y: number }) => {
      if (
        (elementData.type === 'audit-given' && !showGiven) ||
        (elementData.type === 'audit-received' && !showReceived)
      ) {
        return;
      }
      handleElementClick(elementData)
    }

    const maxAuditsGiven = Math.max(...data.map(d => d.audits || d.given || 0), 5)
    const maxAuditsReceived = Math.max(...data.map(d => d.received || Math.floor((d.audits || 0) * 0.8)), 3)
    const maxAudits = Math.max(maxAuditsGiven, maxAuditsReceived)
    const width = 600
    const height = 200
    const padding = 40

    // Calculate average for visible bars
    const visibleGiven = showGiven ? data.map(d => d.audits || d.given || 0) : [];
    const visibleReceived = showReceived ? data.map(d => d.received || Math.floor((d.audits || 0) * 0.8)) : [];
    const avgGiven = visibleGiven.length > 0 ? visibleGiven.reduce((a, b) => a + b, 0) / visibleGiven.length : 0;
    const avgReceived = visibleReceived.length > 0 ? visibleReceived.reduce((a, b) => a + b, 0) / visibleReceived.length : 0;

    return (
      <div className="w-full">
        <div className="flex gap-2 mb-2">
          <button
            className={`px-2 py-1 rounded-full text-xs font-semibold border transition-all ${
              showGiven ? "bg-green-500 text-white border-green-400 scale-105" : "bg-white/10 text-white/70 border-white/10 hover:bg-green-500/20"
            }`}
            onClick={() => setShowGiven(v => !v)}
          >
            {showGiven ? "Hide Given" : "Show Given"}
          </button>
          <button
            className={`px-2 py-1 rounded-full text-xs font-semibold border transition-all ${
              showReceived ? "bg-red-500 text-white border-red-400 scale-105" : "bg-white/10 text-white/70 border-white/10 hover:bg-red-500/20"
            }`}
            onClick={() => setShowReceived(v => !v)}
          >
            {showReceived ? "Hide Received" : "Show Received"}
          </button>
          <button
            className={`px-2 py-1 rounded-full text-xs font-semibold border transition-all ${
              showAverage ? "bg-blue-500 text-white border-blue-400 scale-105" : "bg-white/10 text-white/70 border-white/10 hover:bg-blue-500/20"
            }`}
            onClick={() => setShowAverage(v => !v)}
          >
            {showAverage ? "Hide Average" : "Show Average"}
          </button>
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[180px] md:h-48">
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
            const auditsReceived = item.received || Math.floor(auditsGiven * 0.7)
            
            const barHeightGiven = (auditsGiven / maxAudits) * (height - 2 * padding)
            const barHeightReceived = (auditsReceived / maxAudits) * (height - 2 * padding)
            
            const yGiven = height - padding - barHeightGiven
            const yReceived = height - padding - barHeightReceived

            return (
              <g key={index}>
                {/* Audits Given (Green) */}
                {showGiven && (
                  <rect
                    x={xGiven}
                    y={yGiven}
                    width={barWidth}
                    height={barHeightGiven}
                    fill="url(#auditGivenGradient)"
                    rx="3"
                    className="hover:opacity-80 cursor-pointer transition-all duration-200"
                    onClick={showGiven ? (e: React.MouseEvent) => {
                      e.stopPropagation();
                      safeHandleElementClick({
                        type: 'audit-given',
                        data: { 
                          month: item.month, 
                          auditsGiven: auditsGiven
                        },
                        x: e.clientX,
                        y: e.clientY
                      });
                    } : undefined}
                  />
                )}
                {/* Audits Received (Red) */}
                {showReceived && (
                  <rect
                    x={xReceived}
                    y={yReceived}
                    width={barWidth}
                    height={barHeightReceived}
                    fill="url(#auditReceivedGradient)"
                    rx="3"
                    className="hover:opacity-80 cursor-pointer transition-all duration-200"
                    onClick={showReceived ? (e: React.MouseEvent) => {
                      e.stopPropagation();
                      safeHandleElementClick({
                        type: 'audit-received',
                        data: { 
                          month: item.month, 
                          auditsReceived: auditsReceived
                        },
                        x: e.clientX,
                        y: e.clientY
                      });
                    } : undefined}
                  />
                )}
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
          {/* Average lines */}
          {showAverage && showGiven && (
            <>
              <polyline
                fill="none"
                stroke="#22C55E"
                strokeWidth="2"
                strokeDasharray="8 4"
                points={
                  data.map((item, index) => {
                    const x = padding + (index + 0.1) * ((width - 2 * padding) / data.length) + ((width - 2 * padding) / data.length) * 0.175;
                    const y = height - padding - (avgGiven / maxAudits) * (height - 2 * padding);
                    return `${x},${y}`;
                  }).join(' ')
                }
              />
              <text
                x={width - padding - 10}
                y={height - padding - (avgGiven / maxAudits) * (height - 2 * padding) - 8}
                textAnchor="end"
                className="fill-green-400 text-xs font-semibold"
                style={{ pointerEvents: "none" }}
              >
                Avg: {avgGiven.toFixed(2)}
              </text>
            </>
          )}
          {showAverage && showReceived && (
            <>
              <polyline
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="8 4"
                points={
                  data.map((item, index) => {
                    const x = padding + (index + 0.1) * ((width - 2 * padding) / data.length) + ((width - 2 * padding) / data.length) * 0.525;
                    const y = height - padding - (avgReceived / maxAudits) * (height - 2 * padding);
                    return `${x},${y}`;
                  }).join(' ')
                }
              />
              <text
                x={width - padding - 10}
                y={height - padding - (avgReceived / maxAudits) * (height - 2 * padding) - 8}
                textAnchor="end"
                className="fill-red-400 text-xs font-semibold"
                style={{ pointerEvents: "none" }}
              >
                Avg: {avgReceived.toFixed(2)}
              </text>
            </>
          )}

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
    <div className="space-y-6 px-2 md:px-8 xl:px-24">
      {/* Analytics Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative text-center py-10 mb-8"
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 blur-2xl animate-pulse opacity-80"></div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Visual Data Analytics
        </h2>
        <p className="text-white/70">
          Interactive charts and graphs showing your learning progression
        </p>
      </motion.div>

      {/* XP Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* XP Progression Over Time - SVG Graph 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 relative bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border-2 border-blue-500/30 hover:scale-[1.01] hover:shadow-blue-400/30 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 rounded bg-blue-400 shadow-lg"></div>
            <h3 className="text-2xl font-extrabold text-blue-300 tracking-tight flex items-center gap-2">
              <TrendingUp className="w-7 h-7 text-blue-400" />
              XP Progression Over Time
            </h3>
          </div>
          <div className="flex items-center mb-2">
            <div className="flex space-x-2">
              {[
                { label: "Since Start", value: "all" },
                { label: "Last Week", value: "week" },
                { label: "Last Month", value: "month" },
                { label: "Last 3 Months", value: "3months" },
                { label: "Last 6 Months", value: "6months" },
                { label: "Last 12 Months", value: "12months" }
              ].map(opt => (
                <button
                  key={opt.value}
                  className={`px-2 py-1 rounded-full text-xs font-semibold transition-all shadow-sm border ${
                    xpRange === opt.value
                      ? "bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 text-white border-blue-400 scale-105"
                      : "bg-white/10 text-white/70 border-white/10 hover:bg-blue-500/20"
                  }`}
                  style={{ minWidth: 80 }}
                  onClick={() => setXpRange(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-white/60 text-sm mb-6">
            Track your experience points growth {xpRange === "all" ? "since the start" : "over the selected period"}
          </p>
          <XPProgressionChart data={filteredXPData} />
        </motion.div>

        {/* Projects XP Distribution - New Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border-2 border-purple-500/30 hover:scale-[1.01] hover:shadow-purple-400/30 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 rounded bg-purple-400 shadow-lg"></div>
            <h3 className="text-2xl font-extrabold text-purple-300 tracking-tight flex items-center gap-2">
              <PieChart className="w-7 h-7 text-purple-400" />
              Projects XP
            </h3>
          </div>
          <p className="text-white/60 text-sm mb-6">XP earned from your projects</p>
          <ProjectsXPPieChart />
        </motion.div>
      </div>

      {/* Skills Radar Chart and User Distribution Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills Radar Chart */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="relative bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border-2 border-orange-500/30 hover:scale-[1.01] hover:shadow-orange-400/30 transition-all duration-300 flex flex-col min-h-[520px]"
>
  <div className="flex items-center gap-3 mb-2">
    <div className="w-2 h-8 rounded bg-orange-400 shadow-lg"></div>
    <h3 className="text-2xl font-extrabold text-orange-300 tracking-tight flex items-center gap-2">
      <Activity className="w-7 h-7 text-orange-400" />
      Skills Proficiency Radar
    </h3>
  </div>
  <div className="flex items-center justify-between mb-2">
    <p className="text-white/60 text-sm mt-0 mb-0">Visual representation of your skills and competencies</p>
    <button
      className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm border transition-all ${
        showRadarPoints ? "bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500 text-white border-orange-400 scale-105"
          : "bg-white/10 text-white/70 border-white/10 hover:bg-orange-500/20"
      }`}
      style={{ minWidth: 80 }}
      onClick={() => setShowRadarPoints(v => !v)}
    >
      {showRadarPoints ? "Hide Points" : "Show Points"}
    </button>
  </div>
  <div className="flex-1 flex items-center justify-center">
    <div className="w-full flex justify-center items-center">
<SkillsRadarChart
  skills={analytics.skills.skillData.map((s: any) => ({ name: s.name, points: s.currentAmount }))}
  showRadarPoints={showRadarPoints}
  onTogglePoints={() => setShowRadarPoints(v => !v)}
  size={Math.min((window.innerWidth - 64) * 1.15, 1800)}
  radius={Math.min(((window.innerWidth - 64) / 2 - 40) * 1.15, 900)}
  handleElementClick={handleElementClick}
/>
    </div>
  </div>
</motion.div>
        {/* User Distribution Chart */}
        <LeaderboardChart handleElementClick={handleElementClick} user={user} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Success Rate Pie Chart - SVG Graph 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border-2 border-purple-500/30 hover:scale-[1.01] hover:shadow-purple-400/30 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 rounded bg-purple-400 shadow-lg"></div>
            <h3 className="text-2xl font-extrabold text-purple-300 tracking-tight flex items-center gap-2">
              <PieChart className="w-7 h-7 text-purple-400" />
              Project Success Rate
            </h3>
          </div>
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
          className="relative bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border-2 border-teal-500/30 hover:scale-[1.01] hover:shadow-teal-400/30 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 rounded bg-teal-400 shadow-lg"></div>
            <h3 className="text-2xl font-extrabold text-teal-300 tracking-tight flex items-center gap-2">
              <Target className="w-7 h-7 text-teal-400" />
              Audit Activity Timeline
            </h3>
          </div>
          <p className="text-white/60 text-sm mb-6">Monthly audit activity comparison - given vs received</p>
          <AuditTimelineChart data={analytics.audits.monthlyData} handleElementClick={handleElementClick} />
          
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

      {/* Analytics Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-br from-purple-900/40 via-purple-700/30 to-indigo-900/40 shadow-xl rounded-2xl p-5 border border-purple-500/20 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
          Key Performance Insights (KPI)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{formatXPValue(analytics.xp.total, 2)}</div>
            <div className="text-white/70 text-sm">Total XP Earned</div>
            <div className="text-white/50 text-xs mt-1">
              {analytics.xp.bhModule > analytics.xp.piscines ? 'Module-focused' : 'Piscine-heavy'} learning path
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{analytics.projects.bhModule.passRate.toFixed(0)}%</div>
            <div className="text-white/70 text-sm">Success Rate</div>
            <div className="text-white/50 text-xs mt-1">
              {analytics.projects.bhModule.passRate > 80 ? 'Excellent' : analytics.projects.bhModule.passRate > 60 ? 'Good' : 'Needs improvement'} performance
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">{analytics.audits.ratio.toFixed(1)}</div>
            <div className="text-white/70 text-sm">Audit Ratio</div>
            <div className="text-white/50 text-xs mt-1">
              {analytics.audits.ratio > 1 ? 'Positive' : analytics.audits.ratio > 0.8 ? 'Balanced' : 'Focus needed'} contribution
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
  <span className="text-green-400">↑ {formatXPValue(analytics.audits.totalUp, 2)}</span>
  {" - "}
  <span className="text-red-400">↓ {formatXPValue(analytics.audits.totalDown, 2)}</span>
</div>
            <div className="text-white/70 text-sm">Up - Down Points</div>
            <div className="text-white/50 text-xs mt-1">
              From peer reviews
            </div>
          </div>
        </div>
      </motion.div>

      {/* Click Tooltip Overlay */}
      {clickedElement && showTooltip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          className={`fixed z-50 max-w-xs pointer-events-none shadow-2xl rounded-2xl border-2 p-5
            ${clickedElement.type === 'xp' ? 'border-blue-400 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-indigo-900/90' : ''}
            ${clickedElement.type === 'skill' ? 'border-orange-400 bg-gradient-to-br from-orange-900/90 via-yellow-800/80 to-yellow-900/90' : ''}
            ${clickedElement.type === 'project' ? 'border-green-400 bg-gradient-to-br from-green-900/90 via-green-800/80 to-emerald-900/90' : ''}
            ${clickedElement.type === 'project-xp' ? 'border-purple-400 bg-gradient-to-br from-purple-900/90 via-purple-800/80 to-indigo-900/90' : ''}
            ${(clickedElement.type === 'audit-given' || clickedElement.type === 'audit-received') ? 'border-emerald-400 bg-gradient-to-br from-emerald-900/90 via-emerald-800/80 to-teal-900/90' : ''}
            ${clickedElement.type === 'distribution' ? 'border-cyan-400 bg-gradient-to-br from-cyan-900/90 via-blue-800/80 to-indigo-900/90' : ''}
          `}
          style={{
            left: `${Math.min(clickedElement.x + 10, window.innerWidth - 340)}px`,
            top: `${Math.max(clickedElement.y - 120, 10)}px`,
          }}
        >
          {clickedElement.type === 'xp' && (
            <div className="text-white space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-6 h-6 text-blue-300" />
                <span className="text-xl font-bold text-blue-200">{clickedElement.data.month} XP</span>
              </div>
              <div className="space-y-1 text-base">
                <div>Total XP: <span className="text-blue-300 font-bold">{formatXPValue(clickedElement.data.xp)}</span></div>
                {clickedElement.data.growth !== 0 && (
                  <div>Growth: <span className={clickedElement.data.growth > 0 ? 'text-green-400' : 'text-red-400'}>
                    {clickedElement.data.growth > 0 ? '+' : ''}{formatXPValue(clickedElement.data.growth)}
                  </span></div>
                )}
                <div>Level: <span className="text-yellow-400 font-bold">{Math.floor(clickedElement.data.xp / 1000) + 1}</span></div>
              </div>
            </div>
          )}
          
          {clickedElement.type === 'skill' && (
            <div className="text-white space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-6 h-6 text-orange-300" />
                <span className="text-xl font-bold text-orange-200">{clickedElement.data.name}</span>
              </div>
              <div className="space-y-1 text-base">
                <div>Points: <span className="text-orange-300 font-bold">{clickedElement.data.points}%</span></div>
              </div>
            </div>
          )}
          
          {clickedElement.type === 'project' && (
            <div className="text-white space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <PieChart className="w-6 h-6 text-green-300" />
                <span className="text-xl font-bold text-green-200">Project {clickedElement.data.label}</span>
              </div>
              <div className="space-y-1 text-base">
                <div>Count: <span className="text-white font-bold">{clickedElement.data.value}</span></div>
                <div>Percentage: <span className="text-blue-400 font-bold">{clickedElement.data.percentage.toFixed(1)}%</span></div>
                <div>Total Projects: <span className="text-gray-400 font-bold">{clickedElement.data.total}</span></div>
              </div>
            </div>
          )}
          
          {clickedElement.type === 'audit-given' && (
  <div className="text-white space-y-2">
    <div className="flex items-center gap-2 mb-1">
      <Target className="w-6 h-6 text-emerald-300" />
      <span className="text-xl font-bold">
        <span className="text-green-300">
          {clickedElement.data.month} Audit
        </span>
      </span>
    </div>
    <div className="space-y-1 text-base">
      <div>Given: <span className="text-green-400 font-bold">{clickedElement.data.auditsGiven}</span></div>
      <div className="text-xs text-gray-400 mt-2">
        Audits you completed
      </div>
    </div>
  </div>
)}
{clickedElement.type === 'audit-received' && (
  <div className="text-white space-y-2">
    <div className="flex items-center gap-2 mb-1">
      <Target className="w-6 h-6 text-emerald-300" />
      <span className="text-xl font-bold">
        <span className="text-red-300">
          {clickedElement.data.month} Audit
        </span>
      </span>
    </div>
    <div className="space-y-1 text-base">
      <div>Received: <span className="text-red-400 font-bold">{clickedElement.data.auditsReceived}</span></div>
      <div className="text-xs text-gray-400 mt-2">
        Audits you received from peers
      </div>
    </div>
  </div>
)}
          
          {clickedElement.type === 'project-xp' && (
            <div className="text-white space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <PieChart className="w-6 h-6 text-purple-300" />
                <span className="text-xl font-bold text-purple-200">{clickedElement.data.name}</span>
              </div>
              <div className="space-y-1 text-base">
                <div>Total XP: <span className="text-purple-300 font-bold">{formatXPValue(clickedElement.data.xp)}</span></div>
                <div>Percentage: <span className="text-blue-400 font-bold">{clickedElement.data.percentage.toFixed(1)}%</span></div>
                <div>Instances: <span className="text-green-400 font-bold">{clickedElement.data.count}</span></div>
                <div>Avg XP: <span className="text-yellow-400 font-bold">{formatXPValue(clickedElement.data.avgXP)}</span></div>
                <div className="text-xs text-gray-400 mt-2">
                  XP earned from this project
                </div>
              </div>
            </div>
          )}

          {clickedElement.type === 'distribution' && (
            <div className="text-white space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-6 h-6 text-cyan-300" />
                <span className="text-xl font-bold text-cyan-200">
                  {clickedElement.data.distributionType === 'level' ? 'Level' : 'Audit Ratio'} Range: {clickedElement.data.range}
                </span>
                {clickedElement.data.isCurrentUserRange && (
                  <span className="ml-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs font-bold">
                    YOUR RANGE
                  </span>
                )}
              </div>
              <div className="space-y-1 text-base">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>User Count: </span>
                  <span className="text-blue-300 font-bold">{clickedElement.data.count}</span>
                </div>
                <div>Percentage: <span className="text-green-400 font-bold">{clickedElement.data.percentage}%</span> of total users</div>
                <div>Range: <span className="text-purple-300 font-bold">{clickedElement.data.rangeMin} - {clickedElement.data.rangeMax}</span></div>
                <div>Population: <span className="text-orange-400 font-bold">{clickedElement.data.cohortFilter === 'all' ? 'All Students' : clickedElement.data.cohortFilter}</span></div>
                <div>Total Users: <span className="text-cyan-400 font-bold">{clickedElement.data.totalUsers}</span></div>
                {clickedElement.data.isCurrentUserRange && (
                  <div className="border-t border-emerald-600 pt-2 mt-2">
                    <Crown className="w-4 h-4 inline text-emerald-400 mr-1" />
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

// Completely Redesigned User Distribution Chart Component - From Scratch
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
  
  // Fetch leaderboard data and all cohort label users/labels
  const { data: leaderboardData, loading } = useQuery(GET_COMPREHENSIVE_LEADERBOARD_DATA, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  });
  const { data: labelUserData } = useQuery(GET_ALL_LABEL_USERS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  });
  const { data: allLabelsData } = useQuery(GET_ALL_LABELS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  });

  // Create comprehensive event to cohort mapping (copied from LeaderboardSection)
  const eventToCohortMapping = React.useMemo(() => {
    const mapping = new Map<number, string>();
    if (allLabelsData?.label) {
      allLabelsData.label.forEach((label: { name: string; description?: string }) => {
        const labelName = label.name.toLowerCase();
        const description = label.description || "";
        if (!labelName.includes('cohort')) return;
        const eventIdPatterns = [
          /module #(\d+)/i,
          /event #(\d+)/i,
          /event (\d+)/i,
          /#(\d+)/i,
          /id:?\s*(\d+)/i
        ];
        let eventId: number | null = null;
        for (const pattern of eventIdPatterns) {
          const match = description.match(pattern);
          if (match) {
            eventId = parseInt(match[1], 10);
            break;
          }
        }
        if (eventId) {
          let cohortName = label.name;
          if (labelName.includes('cohort4') || labelName.includes('cohort-4')) {
            cohortName = "Cohort 4";
          } else if (labelName.includes('cohort1')) {
            cohortName = "Cohort 1";
          } else if (labelName.includes('cohort2')) {
            cohortName = "Cohort 2";
          } else if (labelName.includes('cohort3')) {
            cohortName = "Cohort 3";
          }
          mapping.set(eventId, cohortName);
        }
      });
    }
    return mapping;
  }, [allLabelsData?.label]);

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

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border-2 border-emerald-500/30 hover:scale-[1.01] hover:shadow-emerald-400/30 transition-all duration-300 flex flex-col justify-between"
      >
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
          <span className="ml-3 text-white/70">Loading user distribution...</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border-2 border-emerald-500/30 hover:scale-[1.01] hover:shadow-emerald-400/30 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-8 rounded bg-emerald-400 shadow-lg"></div>
        <h3 className="text-2xl font-extrabold text-emerald-300 tracking-tight flex items-center gap-2">
          <BarChart3 className="w-7 h-7 text-emerald-400" />
          User Distribution
        </h3>
      </div>
      
      <p className="text-white/60 text-sm mb-6">
        {distributionType === 'level' ? 'Level' : 'Audit ratio'} distribution among {filteredUsers.length} students
      </p>

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setDistributionType('level')}
          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm border transition-all flex items-center gap-1 ${
            distributionType === 'level' 
              ? 'bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 text-white border-blue-400 scale-105' 
              : 'bg-white/10 text-white/70 border-white/10 hover:bg-blue-500/20'
          }`}
          style={{ minWidth: 80 }}
        >
          <TrendingUp className="w-3 h-3" />
          Level
        </button>
        <button
          onClick={() => setDistributionType('audit')}
          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm border transition-all flex items-center gap-1 ${
            distributionType === 'audit' 
              ? 'bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 text-white border-green-400 scale-105' 
              : 'bg-white/10 text-white/70 border-white/10 hover:bg-green-500/20'
          }`}
          style={{ minWidth: 80 }}
        >
          <Target className="w-3 h-3" />
          Audit Ratio
        </button>
        <button
          onClick={() => setCohortFilter('all')}
          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm border transition-all flex items-center gap-1 ${
            cohortFilter === 'all' 
              ? 'bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 text-white border-purple-400 scale-105' 
              : 'bg-white/10 text-white/70 border-white/10 hover:bg-purple-500/20'
          }`}
          style={{ minWidth: 80 }}
        >
          <Users className="w-3 h-3" />
          All Students
        </button>
        {currentUserCohort !== 'No Cohort' && (
          <button
            onClick={() => setCohortFilter(currentUserCohort)}
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm border transition-all flex items-center gap-1 ${
              cohortFilter === currentUserCohort
                ? 'bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 text-white border-cyan-300 scale-105' 
                : 'bg-white/10 text-white/70 border-white/10 hover:bg-cyan-500/20'
            }`}
            style={{ minWidth: 80 }}
          >
            <Crown className="w-3 h-3" />
            {currentUserCohort}
          </button>
        )}
      </div>

      {/* Chart - Force Centered */}
      <div className="w-full h-full min-h-[320px] flex items-center justify-center overflow-visible relative">
        <div className="w-full max-w-full flex justify-center items-center">
          <div className="w-full md:w-[90vw] lg:w-[700px]">
            <svg viewBox="0 0 700 520" className="w-full h-[320px] md:h-[420px] lg:h-[520px] drop-shadow-lg overflow-visible" style={{ display: "block", margin: "0 auto" }}>
          {/* Grid Lines */}
          {distributionData.length > 0 && [0, 1, 2, 3, 4].map(i => {
            const maxCount = Math.max(...distributionData.map(d => d.count), 1)
            const y = 80 + (320 * i) / 4
            const labelValue = Math.round((maxCount * (4 - i)) / 4)
            return (
              <g key={i}>
                <line
                  x1={80}
                  y1={y}
                  x2={620}
                  y2={y}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                />
                <text
                  x={70}
                  y={y + 8}
                  textAnchor="end"
                  fontSize="18"
                  fill="#94a3b8"
                  fontWeight="600"
                >
                  {labelValue}
                </text>
              </g>
            )
          })}

          {/* Bars */}
          {distributionData.map((range, index) => {
            const maxCount = Math.max(...distributionData.map(d => d.count))
            const availableWidth = 540 // 620 - 80 = 540px
            const barWidth = Math.max(40, availableWidth / distributionData.length * 0.7)
            const barHeight = Math.max(20, (range.count / maxCount) * 320)
            const spacing = availableWidth / distributionData.length
            const x = 80 + (index * spacing) + (spacing - barWidth) / 2
            const y = 400 - barHeight
            const isCurrentUserRange = currentUserRange?.label === range.label
            
            return (
              <g key={`bar-${range.label}-${index}`}>
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={isCurrentUserRange ? "#10b981" : "#3b82f6"}
                  rx="6"
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
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
                
                {/* Value Above Bar */}
                <text
                  x={x + barWidth / 2}
                  y={y - 15}
                  textAnchor="middle"
                  fontSize="22"
                  fill={isCurrentUserRange ? "#10b981" : "#3b82f6"}
                  fontWeight="700"
                >
                  {range.count}
                </text>
                
                {/* Range Label Below */}
                <text
                  x={x + barWidth / 2}
                  y={450}
                  textAnchor="middle"
                  fontSize="18"
                  fill={isCurrentUserRange ? "#10b981" : "#94a3b8"}
                  fontWeight="600"
                >
                  {range.label}
                </text>
              </g>
            )
          })}

          {/* Axis Labels */}
          <text
            x={40}
            y={260}
            textAnchor="middle"
            fontSize="18"
            fill="#94a3b8"
            fontWeight="600"
            transform="rotate(-90 40 260)"
          >
            Users
          </text>
          <text
            x={350}
            y={490}
            textAnchor="middle"
            fontSize="18"
            fill="#94a3b8"
            fontWeight="600"
          >
            {distributionType === 'level' ? 'Level' : 'Audit Ratio'}
          </text>
          </svg>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AnalyticsSection
