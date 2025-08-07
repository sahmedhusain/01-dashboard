import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useQuery, gql } from '@apollo/client'
import { User as UserType } from '../../types'
import LoadingSpinner from '../ui/LoadingSpinner'
import SectionHeader from '../ui/SectionHeader'
import { 
  separateModuleData,
  calculateProjectStats,
  analyzeLevelProgression,
  getRankFromLevel,
  calculateSkillData
} from '../../utils/dataFormatting'

import ProfileSection from './sections/ProfileSection'
import AnalyticsSection from './sections/AnalyticsSection'
import StatisticsSection from './sections/StatisticsSection'
import TransactionsSection from './sections/TransactionsSection'

import { User, BarChart3, TrendingUp, Activity, LayoutDashboard } from 'lucide-react'

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
    
    # Total XP aggregates by module
    bhModuleXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    
    totalXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    
    piscineXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        event: { path: { _like: "%piscine%" } }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
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
      object {
        id
        name
        type
      }
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
    
    # All audits (we'll filter for received audits in JavaScript)
    allAudits: audit(order_by: { createdAt: desc }) {
      id
      groupId
      auditorId
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

    # User roles
    userRoles: user_role(where: { userId: { _eq: $userId } }) {
      id
      roleId
      role {
        id
        slug
        name
        description
      }
    }

    # User labels
    userLabels: label_user(where: { userId: { _eq: $userId } }) {
      id
      labelId
      createdAt
      label {
        id
        name
        description
      }
    }
  }
`

interface DashboardSectionProps {
  user: UserType
}

type DashboardTab = 'profile' | 'analytics' | 'statistics' | 'transactions';

const DashboardSection: React.FC<DashboardSectionProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('profile');

  const { data, loading, error } = useQuery(ENHANCED_DASHBOARD_QUERY, {
    variables: { 
      login: user.login,
      userId: user.id
    },
    fetchPolicy: 'cache-and-network'
  });

  
  const userData = data?.user?.[0]
  
  const allTransactions = useMemo(() => data?.userTransactions || [], [data])
  const allProgress = useMemo(() => data?.userProgress || [], [data])
  const allResults = useMemo(() => data?.userResults || [], [data])
  const allAuditsGiven = useMemo(() => data?.auditsGiven || [], [data])
  const allAudits = useMemo(() => data?.allAudits || [], [data])
  const allAuditsReceived = useMemo(() => {
    if (!data?.allAudits || !data?.userGroups) return []
    
    
    const userGroupIds = data.userGroups.map((ug: any) => ug.groupId)
    
    
    return data.allAudits.filter((audit: any) => 
      userGroupIds.includes(audit.groupId) && audit.auditorId !== user.id
    )
  }, [data, user.id])
  const allGroups = useMemo(() => data?.userGroups || [], [data])
  const allEvents = useMemo(() => data?.userEvents || [], [data])
  
  
  const analytics = useMemo(() => {
    if (!userData) return null
    
    
    const separatedTransactions = separateModuleData(allTransactions)
    const separatedProgress = separateModuleData(allProgress)
    const separatedResults = separateModuleData(allResults)
    const separatedAuditsGiven = separateModuleData(allAuditsGiven)
    const separatedAuditsReceived = separateModuleData(allAuditsReceived)
    const separatedGroups = separateModuleData(allGroups.map(ug => ({ ...ug.group, userId: ug.userId })))
    
    
    const transactions = separatedTransactions.mainModule
    const progress = separatedProgress.mainModule

    
    
    
    const totalXP = data?.totalXP?.aggregate?.sum?.amount || 0
    const bhModuleXP = data?.bhModuleXP?.aggregate?.sum?.amount || 0
    const piscineXP = data?.piscineXP?.aggregate?.sum?.amount || 0
    
    
    const otherXP = totalXP - bhModuleXP - piscineXP
    
    
    const xpTransactions = allTransactions.filter((t: any) => t.type === 'xp')
    const avgXPPerProject = xpTransactions.length > 0 ? Math.round(totalXP / xpTransactions.length) : 0
    
    
    
    const levelTransactions = allTransactions.filter((t: any) => t.type === 'level')
    const lastLevelTransaction = levelTransactions.length > 0 ? 
      levelTransactions.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] : null
    
    const currentLevel = lastLevelTransaction ? lastLevelTransaction.amount : 1
    const lastLevelDate = lastLevelTransaction ? lastLevelTransaction.createdAt : null
    
    
    const xpAfterLevel = allTransactions.filter((t: any) => 
      t.type === 'xp' && 
      lastLevelDate && 
      new Date(t.createdAt) > new Date(lastLevelDate) &&
      t.path && 
      t.path.includes('bh-module') && 
      !t.path.includes('piscine') && 
      !t.path.includes('checkpoint') && 
      
      !(t.attrs && (
        JSON.stringify(t.attrs).toLowerCase().includes('audit') ||
        JSON.stringify(t.attrs).toLowerCase().includes('review') ||
        JSON.stringify(t.attrs).toLowerCase().includes('corrector')
      )) &&
      !(t.path && (t.path.includes('audit') || t.path.includes('review')))
    )
    
    const xpEarnedAfterLevel = xpAfterLevel.reduce((sum: number, t: any) => sum + (t.amount || 0), 0)
    const remainingToNextLevel = 100000 - xpEarnedAfterLevel 
    const progressPercentage = (xpEarnedAfterLevel / 100000) * 100
    
    
    
    
    
    const correctedLevelInfo = {
      currentLevel: currentLevel,
      progress: Math.max(0, Math.min(100, progressPercentage)),
      remainingXP: remainingToNextLevel,
      nextLevelXP: 100000, 
      currentLevelStartXP: 0, 
      progressInKB: xpEarnedAfterLevel / 1000,
      remainingInKB: remainingToNextLevel / 1000,
      includesUpDown: false 
    }
    
    const progressToNextLevel = correctedLevelInfo.progress
    
    
    const levelProgression = analyzeLevelProgression(allTransactions, currentLevel)

    
    const skillTransactions = allTransactions.filter((t: any) => t.type?.startsWith('skill_'))
    const skillData = calculateSkillData(skillTransactions)
    
    
    const topSkills = skillData.skills.slice(0, 10).map(skill => ({
      name: skill.name,
      currentAmount: skill.currentAmount, 
      percentage: skill.percentage, 
      progress: skill.progress, 
      latestDate: skill.latestDate
    }))
      
    
    const totalAuditsGiven = allAuditsGiven.length
    const totalAuditsReceived = allAuditsReceived.length
    const completedAuditsGiven = allAuditsGiven.filter((a: any) => a.grade !== null).length
    const completedAuditsReceived = allAuditsReceived.filter((a: any) => a.grade !== null).length
    const pendingAuditsGiven = totalAuditsGiven - completedAuditsGiven
    const pendingAuditsReceived = totalAuditsReceived - completedAuditsReceived
    
    const avgAuditGradeGiven = completedAuditsGiven > 0 ? 
      allAuditsGiven.filter((a: any) => a.grade !== null)
               .reduce((sum: number, a: any) => sum + (a.grade || 0), 0) / completedAuditsGiven : 0
               
    const avgAuditGradeReceived = completedAuditsReceived > 0 ? 
      allAuditsReceived.filter((a: any) => a.grade !== null)
               .reduce((sum: number, a: any) => sum + (a.grade || 0), 0) / completedAuditsReceived : 0
    
    
    const projectStats = calculateProjectStats(allProgress)
    const bhModuleProjectStats = projectStats.bhModule

    const lastFinishedProject = allProgress
      .filter((p: any) => p.isDone && p.object?.type === 'project')
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    
    
    const totalProjects = projectStats.total
    const completedProjects = projectStats.passed + projectStats.failed
    const passedProjects = projectStats.passed
    const failedProjects = projectStats.failed
    const inProgressProjects = totalProjects - completedProjects
    
    
    const totalResults = allResults.length
    const avgProjectGrade = totalResults > 0 ? 
      allResults.reduce((sum: number, r: any) => sum + (r.grade || 0), 0) / totalResults : 0
    
    
    const totalGroups = allGroups.length
    const captainedGroups = allGroups.filter((ug: any) => ug.group?.captainId === user.id).length
    const memberGroups = totalGroups - captainedGroups
    
    
    const totalUp = userData?.totalUp || 0
    const totalDown = userData?.totalDown || 0
    const auditRatio = userData?.auditRatio || 0

    
    const performanceData = getRankFromLevel(currentLevel)

    
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const recentActivity = transactions.filter(t => 
      new Date(t.createdAt) > thirtyDaysAgo
    ).length

    
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

      const monthAuditsGiven = allAuditsGiven
        .filter(a => {
          const date = new Date(a.createdAt)
          return date >= monthStart && date < monthEnd && a.grade !== null
        }).length
        
      const monthAuditsReceived = allAuditsReceived
        .filter(a => {
          const date = new Date(a.createdAt)
          return date >= monthStart && date < monthEnd && a.grade !== null
        }).length

      monthlyData.push({
        month: monthStart.toLocaleDateString('en', { month: 'short', year: '2-digit' }),
        xp: monthXP,
        projects: monthProjects,
        auditsGiven: monthAuditsGiven,
        auditsReceived: monthAuditsReceived,
        audits: monthAuditsGiven + monthAuditsReceived 
      })
    }

    return {
      user: userData,
      xp: {
        total: totalXP, 
        bhModule: bhModuleXP, 
        piscines: piscineXP, 
        other: otherXP, 
        earnedAfterLevel: xpEarnedAfterLevel, 
        allTime: totalXP, 
        average: avgXPPerProject,
        recent: recentActivity,
        upTotal: totalUp,
        downTotal: totalDown,
        monthlyData
      },
      level: {
        current: currentLevel, 
        progress: progressToNextLevel, 
        nextLevelXP: correctedLevelInfo.nextLevelXP, 
        remainingXP: correctedLevelInfo.remainingXP, 
        progressInKB: correctedLevelInfo.progressInKB, 
        remainingInKB: correctedLevelInfo.remainingInKB, 
        
        levelTransaction: lastLevelTransaction,
        xpAfterLevelCount: xpAfterLevel.length,
        progression: levelProgression
      },
      skills: {
        top: topSkills, 
        total: skillData.totalSkills, 
        transactions: skillTransactions, 
        skillData: skillData.skills 
      },
      projects: {
        lastFinished: lastFinishedProject ? {
          name: lastFinishedProject.object?.name,
          completedAt: lastFinishedProject.createdAt,
          grade: lastFinishedProject.grade
        } : null,
        completed: completedProjects,
        total: totalProjects,
        passed: passedProjects,
        failed: failedProjects,
        inProgress: inProgressProjects,
        avgGrade: avgProjectGrade,
        completionRate: totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0,
        passRate: completedProjects > 0 ? (passedProjects / completedProjects) * 100 : 0,
        
        
        bhModule: {
          total: bhModuleProjectStats.total,
          passed: bhModuleProjectStats.passed,
          failed: bhModuleProjectStats.failed,
          passRate: bhModuleProjectStats.passRate,
          completed: bhModuleProjectStats.passed + bhModuleProjectStats.failed,
          inProgress: bhModuleProjectStats.total - (bhModuleProjectStats.passed + bhModuleProjectStats.failed)
        },
        
        
        piscines: {
          total: projectStats.piscines.total,
          passed: projectStats.piscines.passed,
          failed: projectStats.piscines.failed,
          passRate: projectStats.piscines.passRate
        },
        checkpoints: {
          total: projectStats.checkpoints.total,
          passed: projectStats.checkpoints.passed,
          failed: projectStats.checkpoints.failed,
          passRate: projectStats.checkpoints.passRate
        }
      },
      audits: {
        given: completedAuditsGiven,
        received: completedAuditsReceived,
        totalGiven: totalAuditsGiven,
        totalReceived: totalAuditsReceived,
        completedGiven: completedAuditsGiven,
        completedReceived: completedAuditsReceived,
        pendingGiven: pendingAuditsGiven,
        pendingReceived: pendingAuditsReceived,
        avgGradeGiven: avgAuditGradeGiven,
        avgGradeReceived: avgAuditGradeReceived,
        
        completed: completedAuditsGiven,
        pending: pendingAuditsGiven,
        avgGrade: avgAuditGradeGiven,
        ratio: auditRatio,
        totalUp: totalUp,
        totalDown: totalDown,
        monthlyData: monthlyData.map(m => ({ 
          month: m.month, 
          audits: m.audits,
          given: m.auditsGiven,
          received: m.auditsReceived
        }))
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
      
      rawData: {
        transactions: allTransactions,
        progress: allProgress,
        results: allResults,
        auditsGiven: allAuditsGiven,
        auditsReceived: allAuditsReceived,
        allAudits: allAudits,
        groups: allGroups,
        events: allEvents,
        userEvents: allEvents, 
        userRoles: data?.userRoles || [],
        userLabels: data?.userLabels || []
      }
    }
  }, [userData, allTransactions, allProgress, allResults, allAuditsGiven, allAuditsReceived, allAudits, allGroups, allEvents, user.id, data?.userRoles, data?.userLabels, data?.totalXP?.aggregate?.sum?.amount, data?.bhModuleXP?.aggregate?.sum?.amount, data?.piscineXP?.aggregate?.sum?.amount])

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
        return <AnalyticsSection analytics={analytics} user={user} />
      case 'statistics':
        return <StatisticsSection analytics={analytics} />
      case 'transactions':
        return <TransactionsSection analytics={analytics} />
      default:
        return <ProfileSection user={user} analytics={analytics} />
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 h-full w-full relative">
      <div className="relative z-10 h-full w-full overflow-y-auto custom-scrollbar">
        <div className="relative space-y-8 p-6">
          {/* Enhanced Header with Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full backdrop-blur-xl border border-emerald-400/30 mb-6 shadow-2xl shadow-emerald-500/20 relative overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 animate-pulse"></div>
              <LayoutDashboard className="w-12 h-12 text-emerald-400 drop-shadow-lg relative z-10" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent mb-4">
                Dashboard Overview
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Your complete <span className="text-emerald-400 font-semibold">learning journey</span> and analytics hub
              </p>
            </motion.div>
          </motion.div>

          {/* Enhanced Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-3 shadow-2xl">
              <nav className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as DashboardTab)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className={`relative overflow-hidden flex flex-col items-center space-y-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 border border-white/20'
                          : 'text-white/70 hover:text-white hover:bg-white/10 hover:border-emerald-400/30 border border-transparent'
                      }`}
                    >
                      {/* Active tab glow effect */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-2xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      
                      <Icon className={`w-6 h-6 relative z-10 ${isActive ? 'text-white drop-shadow-lg' : 'text-white/70'}`} />
                      <div className="text-center relative z-10">
                        <div className="font-semibold">{tab.label}</div>
                        <div className="text-xs opacity-80 hidden lg:block mt-1">{tab.description}</div>
                      </div>
                      
                      {/* Hover effect for inactive tabs */}
                      {!isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                        />
                      )}
                    </motion.button>
                  )
                })}
              </nav>
            </div>
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
      </div>
    </div>
  )
}

export default DashboardSection
