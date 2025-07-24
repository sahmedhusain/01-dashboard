import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Award, TrendingUp, Target, Activity, BarChart3, PieChart, Clock, 
  Zap, Code, Trophy, BookOpen, Users, GitBranch, Star, Flame,
  ChevronUp, ChevronDown, Calendar, MapPin, Mail
} from 'lucide-react'
import { useQuery, gql } from '@apollo/client'
import { User as UserType } from '../../types'
import Card from '../ui/Card'
import Avatar from '../ui/Avatar'
import LoadingSpinner from '../ui/LoadingSpinner'
import { 
  formatTotalXP, 
  formatModuleXP, 
  formatDate, 
  formatPercentage, 
  formatAuditRatio,
  separateModuleData,
  calculateModuleXPTotals,
  calculateLevel,
  getPerformanceNotation,
  formatSkillName
} from '../../utils/dataFormatting'

// Enhanced GraphQL query with proper BH Module data separation
const COMPREHENSIVE_DASHBOARD_QUERY = gql`
  query GetComprehensiveDashboard($userId: Int!, $login: String!) {
    # User information with all attributes including avatar
    user(where: { login: { _eq: $login } }) {
      id
      login
      firstName
      lastName
      profile
      attrs
      createdAt
      updatedAt
      campus
      auditRatio
      totalUp
      totalDown
    }
    
    # User transactions with full details
    userTransactions: transaction(where: { userId: { _eq: $userId } }, order_by: { createdAt: desc }) {
      id
      type
      amount
      path
      createdAt
      attrs
      objectId
      eventId
    }
    
    # User progress with full details
    userProgress: progress(where: { userId: { _eq: $userId } }, order_by: { createdAt: desc }) {
      id
      grade
      isDone
      path
      createdAt
      updatedAt
      version
      objectId
      groupId
      eventId
    }
    
    # User results with full details
    userResults: result(where: { userId: { _eq: $userId } }, order_by: { createdAt: desc }) {
      id
      grade
      type
      path
      createdAt
      isLast
      version
      objectId
      groupId
      eventId
      attrs
    }
    
    # Audits given by user
    auditsGiven: audit(where: { auditorId: { _eq: $userId } }, order_by: { createdAt: desc }) {
      id
      groupId
      grade
      createdAt
      updatedAt
      version
      endAt
      attrs
      resultId
    }
    
    # Groups where user is member or captain
    userGroups: group_user(where: { userId: { _eq: $userId } }) {
      id
      groupId
      createdAt
      updatedAt
      group {
        id
        captainId
        status
        path
        campus
        objectId
        eventId
      }
    }
    
    # User event participation
    userEvents: event_user(where: { userId: { _eq: $userId } }) {
      id
      eventId
      level
      createdAt
      event {
        id
        path
        campus
        createdAt
        endAt
        objectId
      }
    }
  }
`

interface DashboardSectionProps {
  user: UserType
}

// Professional color palette
const COLORS = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4',
  dark: '#1F2937',
  light: '#F8FAFC'
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'activity'>('overview')

  const { data, loading, error } = useQuery(COMPREHENSIVE_DASHBOARD_QUERY, {
    variables: { 
      login: user.login,
      userId: user.id
    },
    fetchPolicy: 'cache-and-network'
  })

  // Extract comprehensive data from the new query structure
  const userData = data?.user?.[0]
  
  const allTransactions = useMemo(() => data?.userTransactions || [], [data])
  const allProgress = useMemo(() => data?.userProgress || [], [data])
  const allResults = useMemo(() => data?.userResults || [], [data])
  const allAudits = useMemo(() => data?.auditsGiven || [], [data])
  const allGroups = useMemo(() => data?.userGroups || [], [data])
  const allEvents = useMemo(() => data?.userEvents || [], [data])
  
  // Remove unused variables for cleaner code
  const _unused = { allEvents }

  // Enhanced data processing with proper BH Module separation
  const analytics = useMemo(() => {
    if (!userData) return null
    
    // Separate BH Module data from piscines using proper path analysis
    const separatedTransactions = separateModuleData(allTransactions)
    const separatedProgress = separateModuleData(allProgress)
    const separatedResults = separateModuleData(allResults)
    const separatedAudits = separateModuleData(allAudits)
    const separatedGroups = separateModuleData(allGroups)
    
    // Focus on BH Module data only (excluding piscines)
    const transactions = separatedTransactions.mainModule
    const progress = separatedProgress.mainModule
    const results = separatedResults.mainModule
    const auditsGiven = separatedAudits.mainModule
    const groups = separatedGroups.mainModule

    // Comprehensive Analytics using all available data
    
    // XP Analytics from transactions
    const xpTransactions = allTransactions.filter((t: any) => t.type === 'xp')
    const totalXP = xpTransactions.reduce((sum: number, t: any) => sum + (t.amount || 0), 0)
    const avgXPPerProject = xpTransactions.length > 0 ? Math.round(totalXP / xpTransactions.length) : 0

    // Level Analytics - use backend-provided level data
    const levelTransactions = allTransactions.filter((t: any) => t.type === 'level')
    const currentLevel = levelTransactions.length > 0 ? 
      Math.max(...levelTransactions.map((t: any) => t.amount || 0)) : 1

    // Progress calculation
    const nextLevelXP = Math.pow(currentLevel + 1, 2) * 1000
    const currentLevelXP = Math.pow(currentLevel, 2) * 1000
    const progressToNextLevel = totalXP > currentLevelXP ? 
      Math.min(100, ((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100) : 0
      
    // Separate BH Module data from piscines
    const xpTotals = calculateModuleXPTotals(allTransactions)
    const bhModuleXP = xpTotals.bhModule

    // Enhanced Skills Analytics
    const skillTransactions = allTransactions.filter((t: any) => t.type?.startsWith('skill_'))
    
    const skillsMap = new Map<string, number>()
    
    skillTransactions.forEach((t: any) => {
      const skillName = formatSkillName(t.type?.replace('skill_', '') || '')
      const currentPoints = skillsMap.get(skillName) || 0
      skillsMap.set(skillName, currentPoints + (t.amount || 0))
    })

    const topSkills = Array.from(skillsMap.entries())
      .map(([name, points]) => ({ name, points }))
      .sort((a, b) => b.points - a.points)
      .slice(0, 8)
      
    // Audit Analytics - comprehensive view
    const totalAuditsGiven = allAudits.length
    const completedAudits = allAudits.filter((a: any) => a.grade !== null).length
    const pendingAudits = totalAuditsGiven - completedAudits
    const avgAuditGrade = completedAudits > 0 ? 
      allAudits.filter((a: any) => a.grade !== null)
               .reduce((sum: number, a: any) => sum + (a.grade || 0), 0) / completedAudits : 0
    
    // Comprehensive Project Analytics
    const totalProjects = allProgress.length
    const completedProjects = allProgress.filter((p: any) => p.isDone).length
    const passedProjects = allProgress.filter((p: any) => p.isDone && p.grade >= 1).length
    const failedProjects = completedProjects - passedProjects
    const inProgressProjects = totalProjects - completedProjects
    
    // Results Analytics
    const totalResults = allResults.length
    const avgProjectGrade = totalResults > 0 ? 
      allResults.reduce((sum: number, r: any) => sum + (r.grade || 0), 0) / totalResults : 0
    
    // Group Analytics
    const totalGroups = allGroups.length
    const captainedGroups = allGroups.filter((ug: any) => ug.group?.captainId === user.id).length
    const memberGroups = totalGroups - captainedGroups
    
    // UP/DOWN transaction analytics
    const upTransactions = allTransactions.filter((t: any) => t.type === 'up')
    const downTransactions = allTransactions.filter((t: any) => t.type === 'down')
    const totalUp = upTransactions.reduce((sum: number, t: any) => sum + (t.amount || 0), 0)
    const totalDown = downTransactions.reduce((sum: number, t: any) => sum + (t.amount || 0), 0)

    // Performance and Activity Analytics
    const performanceData = getPerformanceNotation(userData?.auditRatio || 0, totalXP, completedProjects)

    // Activity Analytics (Last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const recentActivity = transactions.filter(t => 
      new Date(t.createdAt) > thirtyDaysAgo
    ).length

    // Performance trends (last 6 months)
    const monthlyData = []
    
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(Date.now() - (i + 1) * 30 * 24 * 60 * 60 * 1000)
      const monthEnd = new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000)
      
      const monthXP = xpTransactions
        .filter(t => {
          const date = new Date(t.createdAt)
          return date >= monthStart && date < monthEnd
        })
        .reduce((sum, t) => sum + (t.amount || 0), 0)
      
      const monthProjects = progress
        .filter(p => {
          const date = new Date(p.createdAt)
          return date >= monthStart && date < monthEnd && p.isDone
        }).length

      monthlyData.push({
        month: monthStart.toLocaleDateString('en', { month: 'short' }),
        xp: monthXP,
        projects: monthProjects
      })
    }

    return {
      xp: {
        total: totalXP,
        bhModule: bhModuleXP,
        piscines: xpTotals.allPiscines,
        average: avgXPPerProject,
        recent: recentActivity,
        upTotal: totalUp,
        downTotal: totalDown
      },
      level: {
        current: currentLevel,
        progress: progressToNextLevel,
        nextLevelXP
      },
      skills: {
        top: topSkills,
        total: skillsMap.size
      },
      projects: {
        completed: completedProjects,
        total: totalProjects,
        passed: passedProjects,
        failed: failedProjects,
        inProgress: inProgressProjects,
        avgGrade: avgProjectGrade,
        completionRate: totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0,
        passRate: completedProjects > 0 ? (passedProjects / completedProjects) * 100 : 0
      },
      audits: {
        given: totalAuditsGiven,
        completed: completedAudits,
        pending: pendingAudits,
        avgGrade: avgAuditGrade,
        ratio: userData?.auditRatio || 0
      },
      groups: {
        total: totalGroups,
        captained: captainedGroups,
        member: memberGroups
      },
      results: {
        total: totalResults,
        avgGrade: avgProjectGrade
      },
      activity: {
        recent: recentActivity,
        monthlyData
      },
      performance: performanceData,
      moduleData: {
        bhModule: separatedTransactions.mainModule.length,
        piscines: Object.keys(separatedTransactions.piscines).length,
        totalPiscineTransactions: separatedTransactions.allPiscines.length
      }
    }
  }, [userData, allTransactions, allProgress, allResults, allAudits, allGroups, user.id])

  if (loading) return <LoadingSpinner />
  if (error || !userData) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500">Unable to load dashboard data</p>
      </Card>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'activity', label: 'Activity', icon: Activity }
  ]

  // Professional SVG Charts Components
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

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Comprehensive Student Dashboard
        </h1>
        <p className="text-white/70 text-lg">
          Your complete learning journey with detailed analytics and progress tracking
        </p>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-white font-medium">Total XP</p>
              <p className="text-2xl font-bold text-white">{analytics ? formatTotalXP(analytics.xp.total) : '0'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-white font-medium">Audit Ratio</p>
              <p className="text-2xl font-bold text-white">{userData?.auditRatio?.toFixed(2) || '0.00'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-white font-medium">Projects</p>
              <p className="text-2xl font-bold text-white">{analytics ? analytics.projects.completed : '0'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-white font-medium">Level</p>
              <p className="text-2xl font-bold text-white">{analytics ? analytics.level.current : userData?.level || 0}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* User Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar
              user={{
                ...userData,
                // Fix avatar URL using proper endpoint from attrs
                avatarUrl: userData?.attrs?.['pro-picUploadId'] ? 
                  `https://zone01.s3.us-east-1.amazonaws.com/avatar/${userData.attrs['pro-picUploadId']}` : 
                  null
              }}
              size="lg"
              className="ring-2 ring-white/20"
            />
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {userData.attrs?.displayName || userData.attrs?.firstName || user.login}
              </h2>
              <p className="text-white/70 mb-2">@{user.login}</p>
              {analytics?.performance && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{analytics.performance.badge}</span>
                  <span className="text-white/80 text-sm font-medium">
                    {analytics.performance.notation}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {analytics && (
            <div className="text-right">
              <div className="text-3xl font-bold text-white mb-1">
                {analytics.level.current}
              </div>
              <div className="text-white/70 text-sm">
                Level • {analytics.level.progress.toFixed(1)}% to next
              </div>
            </div>
          )}
        </div>
      </motion.div>
      {/* Analytics Grid */}
      {analytics && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* XP Breakdown Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
              XP Breakdown Analysis
            </h3>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Module XP</span>
                  <span className="text-blue-400 font-bold">{formatTotalXP(analytics.xp.bhModule)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{width: `${(analytics.xp.bhModule / analytics.xp.total) * 100}%`}}></div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Piscines XP</span>
                  <span className="text-green-400 font-bold">{formatTotalXP(analytics.xp.piscines)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{width: `${(analytics.xp.piscines / analytics.xp.total) * 100}%`}}></div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Average per Project</span>
                  <span className="text-purple-400 font-bold">{formatTotalXP(analytics.xp.average)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Projects Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
              Projects & Progress Analysis
            </h3>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Completed</span>
                  <span className="text-green-400 font-bold">{analytics.projects.completed}</span>
                </div>
                <div className="text-white/60 text-xs">Pass rate: {analytics.projects.passRate.toFixed(1)}%</div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">In Progress</span>
                  <span className="text-yellow-400 font-bold">{analytics.projects.inProgress}</span>
                </div>
                <div className="text-white/60 text-xs">Currently working</div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Failed</span>
                  <span className="text-red-400 font-bold">{analytics.projects.failed}</span>
                </div>
                <div className="text-white/60 text-xs">Avg grade: {analytics.projects.avgGrade.toFixed(2)}</div>
              </div>
            </div>
          </motion.div>

          {/* Audits Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-400" />
              Audit Analytics
            </h3>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Given</span>
                  <span className="text-blue-400 font-bold">{analytics.audits.given}</span>
                </div>
                <div className="text-white/60 text-xs">Total audits given</div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Completed</span>
                  <span className="text-green-400 font-bold">{analytics.audits.completed}</span>
                </div>
                <div className="text-white/60 text-xs">Reviews completed</div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Ratio</span>
                  <span className="text-purple-400 font-bold">{analytics.audits.ratio.toFixed(2)}</span>
                </div>
                <div className="text-white/60 text-xs">Overall audit performance</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* Skills & Groups Analytics */}
      {analytics && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills Analytics */}
          {analytics.skills.top.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-orange-400" />
                Skills & Learning Progress
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {analytics.skills.top.slice(0, 6).map((skill, index) => (
                  <div key={skill.name} className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">{skill.name}</span>
                      <span className="text-blue-400 font-bold">{skill.points.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                      <div 
                        className="bg-orange-400 h-2 rounded-full transition-all duration-1000" 
                        style={{width: `${Math.min(100, (skill.points / Math.max(...analytics.skills.top.map(s => s.points))) * 100)}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Groups Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-400" />
              Groups & Collaboration
            </h3>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Captain of</span>
                  <span className="text-yellow-400 font-bold">{analytics.groups.captained}</span>
                </div>
                <div className="text-white/60 text-xs">Leading groups</div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Member of</span>
                  <span className="text-green-400 font-bold">{analytics.groups.member}</span>
                </div>
                <div className="text-white/60 text-xs">Participating in</div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Total Groups</span>
                  <span className="text-blue-400 font-bold">{analytics.groups.total}</span>
                </div>
                <div className="text-white/60 text-xs">All group activities</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-8">
      {analytics && (
        <>
          {/* Performance Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-3 text-green-600" />
                Performance Trends (6 Months)
              </h3>
              <ActivityChart data={analytics.activity.monthlyData} />
              <div className="mt-4 flex justify-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>XP Earned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-3 border-2 border-green-500 rounded"></div>
                  <span>Projects Completed</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Detailed Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Level Progress Detail */}
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Level Progress
              </h4>
              <div className="text-center mb-6">
                <LevelProgressChart 
                  level={analytics.level.current} 
                  progress={analytics.level.progress} 
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Level</span>
                  <span className="font-bold">{analytics.level.current}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total XP</span>
                  <span className="font-bold">{formatTotalXP(analytics.xp.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Level XP</span>
                  <span className="font-bold">{formatTotalXP(analytics.level.nextLevelXP)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-bold text-blue-600">
                    {analytics.level.progress.toFixed(1)}%
                  </span>
                </div>
              </div>
            </Card>

            {/* Project Analytics */}
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                Project Analytics
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <div className="text-2xl font-bold text-purple-900">
                      {analytics.projects.completed}
                    </div>
                    <div className="text-sm text-purple-600">Completed</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-600">
                      / {analytics.projects.total}
                    </div>
                    <div className="text-sm text-gray-500">Total</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-bold text-purple-600">
                      {analytics.projects.completionRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Grade</span>
                    <span className="font-bold">
                      {formatPercentage(analytics.projects.avgGrade)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">XP per Project</span>
                    <span className="font-bold">
                      {formatModuleXP(analytics.xp.average)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  )

  const renderActivity = () => (
    <div className="space-y-6">
      {/* Recent Transactions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {allTransactions?.filter((t: any) => {
            const moduleData = separateModuleData([t])
            return moduleData.mainModule.length > 0
          }).slice(0, 10).map((transaction: any) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'xp' ? 'bg-blue-100 text-blue-600' :
                  transaction.type === 'level' ? 'bg-purple-100 text-purple-600' :
                  transaction.type?.startsWith('skill_') ? 'bg-green-100 text-green-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {transaction.type === 'xp' ? <Zap className="h-4 w-4" /> :
                   transaction.type === 'level' ? <Trophy className="h-4 w-4" /> :
                   transaction.type?.startsWith('skill_') ? <Code className="h-4 w-4" /> :
                   <Activity className="h-4 w-4" />}
                </div>
                <div>
                  <div className="font-medium capitalize">
                    {transaction.type?.replace('_', ' ')}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.object?.name || 'System Action'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatDate(transaction.createdAt)}
                  </div>
                </div>
              </div>
              <div className={`text-right font-bold ${
                transaction.type === 'xp' ? 'text-blue-600' :
                transaction.type === 'level' ? 'text-purple-600' :
                transaction.type?.startsWith('skill_') ? 'text-green-600' :
                'text-gray-600'
              }`}>
                {transaction.type === 'xp' ? `+${formatModuleXP(transaction.amount)}` :
                 transaction.type === 'level' ? `Level ${transaction.amount}` :
                 `+${transaction.amount}`}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Recent Progress */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Progress</h3>
        <div className="space-y-3">
          {allProgress?.filter((p: any) => {
            const moduleData = separateModuleData([p])
            return moduleData.mainModule.length > 0
          }).slice(0, 8).map((progress: any) => (
            <motion.div
              key={progress.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  progress.isDone ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {progress.isDone ? 
                    <Trophy className="h-4 w-4" /> : 
                    <Clock className="h-4 w-4" />
                  }
                </div>
                <div>
                  <div className="font-medium">
                    {progress.object?.name || 'Project'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {progress.isDone ? 'Completed' : 'In Progress'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatDate(progress.createdAt)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">
                  {formatPercentage(progress.grade)}
                </div>
                <div className="text-xs text-gray-500">
                  Grade
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      {renderOverview()}
    </div>
  )
}

export default DashboardSection