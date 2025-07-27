import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useQuery, gql } from '@apollo/client'
import { User as UserType } from '../../types'
import LoadingSpinner from '../ui/LoadingSpinner'
import SectionHeader from '../ui/SectionHeader'
import { 
  separateModuleData,
  calculateModuleXPTotals,
  calculateLevel,
  calculateLevelProgress,
  getRankFromLevel,
  formatSkillName
} from '../../utils/dataFormatting'

// Dashboard Section Components
import ProfileSection from './sections/ProfileSection'
import AnalyticsSection from './sections/AnalyticsSection'
import StatisticsSection from './sections/StatisticsSection'
import TransactionsSection from './sections/TransactionsSection'

// Navigation icons
import { User, BarChart3, TrendingUp, Activity, LayoutDashboard } from 'lucide-react'

// Enhanced GraphQL query with proper BH Module data separation
const ENHANCED_DASHBOARD_QUERY = gql`
  query GetEnhancedDashboard($userId: Int!, $login: String!) {
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
      campus
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
      campus
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
      campus
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
      group {
        id
        path
        campus
        objectId
      }
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
        createdAt
        updatedAt
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

    # Objects for project/exercise details
    objects: object(where: { id: { _in: [] } }) {
      id
      name
      type
      attrs
      createdAt
      updatedAt
    }
  }
`

interface DashboardSectionProps {
  user: UserType
}

type DashboardTab = 'profile' | 'analytics' | 'statistics' | 'transactions'

const DashboardSection: React.FC<DashboardSectionProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('profile')

  const { data, loading, error } = useQuery(ENHANCED_DASHBOARD_QUERY, {
    variables: { 
      login: user.login,
      userId: user.id
    },
    fetchPolicy: 'cache-and-network'
  })

  // Extract complete data from the new query structure
  const userData = data?.user?.[0]
  
  const allTransactions = useMemo(() => data?.userTransactions || [], [data])
  const allProgress = useMemo(() => data?.userProgress || [], [data])
  const allResults = useMemo(() => data?.userResults || [], [data])
  const allAudits = useMemo(() => data?.auditsGiven || [], [data])
  const allGroups = useMemo(() => data?.userGroups || [], [data])
  const allEvents = useMemo(() => data?.userEvents || [], [data])
  
  // Enhanced data processing with proper BH Module separation
  const analytics = useMemo(() => {
    if (!userData) return null
    
    // Separate BH Module data from piscines using proper path analysis
    const separatedTransactions = separateModuleData(allTransactions)
    const separatedProgress = separateModuleData(allProgress)
    const separatedResults = separateModuleData(allResults)
    const separatedAudits = separateModuleData(allAudits)
    const separatedGroups = separateModuleData(allGroups.map(ug => ({ ...ug.group, userId: ug.userId })))
    
    // Focus on BH Module data only (excluding piscines)
    const transactions = separatedTransactions.mainModule
    const progress = separatedProgress.mainModule
    const results = separatedResults.mainModule
    const auditsGiven = separatedAudits.mainModule
    const groups = separatedGroups.mainModule

    // Complete Analytics using all available data
    
    // XP Analytics from transactions
    const xpTransactions = allTransactions.filter((t: any) => t.type === 'xp')
    const totalXP = xpTransactions.reduce((sum: number, t: any) => sum + (t.amount || 0), 0)
    const avgXPPerProject = xpTransactions.length > 0 ? Math.round(totalXP / xpTransactions.length) : 0

    // Separate BH Module data from piscines
    const xpTotals = calculateModuleXPTotals(allTransactions)
    const bhModuleXP = xpTotals.bhModule

    // Level Analytics - use square root calculation with BH Module XP only
    const levelInfo = calculateLevelProgress(bhModuleXP)
    const currentLevel = levelInfo.currentLevel
    const progressToNextLevel = levelInfo.progress

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
      .slice(0, 10)
      
    // Audit Analytics - complete view
    const totalAuditsGiven = allAudits.length
    const completedAudits = allAudits.filter((a: any) => a.grade !== null).length
    const pendingAudits = totalAuditsGiven - completedAudits
    const avgAuditGrade = completedAudits > 0 ? 
      allAudits.filter((a: any) => a.grade !== null)
               .reduce((sum: number, a: any) => sum + (a.grade || 0), 0) / completedAudits : 0
    
    // Complete Project Analytics
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
    const level = calculateLevel(totalXP)
    const performanceData = getRankFromLevel(level)

    // Activity Analytics (Last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const recentActivity = transactions.filter(t => 
      new Date(t.createdAt) > thirtyDaysAgo
    ).length

    // Performance trends (last 12 months)
    const monthlyData = []
    
    for (let i = 11; i >= 0; i--) {
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

      const monthAudits = auditsGiven
        .filter(a => {
          const date = new Date(a.createdAt)
          return date >= monthStart && date < monthEnd
        }).length

      monthlyData.push({
        month: monthStart.toLocaleDateString('en', { month: 'short', year: '2-digit' }),
        xp: monthXP,
        projects: monthProjects,
        audits: monthAudits
      })
    }

    return {
      user: userData,
      xp: {
        total: totalXP,
        bhModule: bhModuleXP,
        piscines: xpTotals.allPiscines,
        average: avgXPPerProject,
        recent: recentActivity,
        upTotal: totalUp,
        downTotal: totalDown,
        monthlyData
      },
      level: {
        current: currentLevel,
        progress: progressToNextLevel,
        nextLevelXP: levelInfo.nextLevelXP,
        remainingXP: levelInfo.remainingXP,
        progressInKB: levelInfo.progressInKB,
        remainingInKB: levelInfo.remainingInKB
      },
      skills: {
        top: topSkills,
        total: skillsMap.size,
        transactions: skillTransactions
      },
      projects: {
        completed: completedProjects,
        total: totalProjects,
        passed: passedProjects,
        failed: failedProjects,
        inProgress: inProgressProjects,
        avgGrade: avgProjectGrade,
        completionRate: totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0,
        passRate: completedProjects > 0 ? (passedProjects / completedProjects) * 100 : 0,
        bhModule: separatedProgress.mainModule.length,
        piscines: separatedProgress.allPiscines.length
      },
      audits: {
        given: totalAuditsGiven,
        completed: completedAudits,
        pending: pendingAudits,
        avgGrade: avgAuditGrade,
        ratio: userData?.auditRatio || 0,
        monthlyData: monthlyData.map(m => ({ month: m.month, audits: m.audits }))
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
      },
      // Raw data for detailed sections
      rawData: {
        transactions: allTransactions,
        progress: allProgress,
        results: allResults,
        audits: allAudits,
        groups: allGroups,
        events: allEvents
      }
    }
  }, [userData, allTransactions, allProgress, allResults, allAudits, allGroups, allEvents, user.id, loading])

  if (loading) return <LoadingSpinner />
  if (error || !userData) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center">
        <p className="text-white/70">Unable to load dashboard data</p>
        {error && <p className="text-red-400 text-sm mt-2">{error.message}</p>}
      </div>
    )
  }

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: User, description: 'Personal information and achievements' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Visual data analysis and trends' },
    { id: 'statistics', label: 'Statistics', icon: TrendingUp, description: 'Key metrics and performance indicators' },
    { id: 'transactions', label: 'Transactions', icon: Activity, description: 'Detailed activity history and records' }
  ]

  const renderTabContent = () => {
    if (!analytics) return null

    switch (activeTab) {
      case 'profile':
        return <ProfileSection user={user} analytics={analytics} />
      case 'analytics':
        return <AnalyticsSection analytics={analytics} />
      case 'statistics':
        return <StatisticsSection analytics={analytics} />
      case 'transactions':
        return <TransactionsSection analytics={analytics} />
      default:
        return <ProfileSection user={user} analytics={analytics} />
    }
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <SectionHeader
        title="Dashboard Overview"
        subtitle="Your complete student progress and analytics"
        icon={LayoutDashboard}
      />

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-1 border border-white/20"
      >
        <nav className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {tabs.map((tab, index) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as DashboardTab)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={`
                  flex flex-col items-center space-y-3 px-6 py-4 rounded-xl font-medium text-sm transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                    : 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-md'
                  }
                `}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white/70'}`} />
                <div className="text-center">
                  <div className="font-semibold">{tab.label}</div>
                  <div className="text-xs opacity-80 hidden lg:block">{tab.description}</div>
                </div>
              </motion.button>
            )
          })}
        </nav>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-[600px]"
      >
        {renderTabContent()}
      </motion.div>
    </div>
  )
}

export default DashboardSection