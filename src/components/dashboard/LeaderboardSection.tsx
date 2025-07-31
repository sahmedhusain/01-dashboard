import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Users,
  Crown,
  Target,
  BarChart3,
  Zap,
  UserSearch,
  Layers,
  SortAsc,
  SortDesc
} from 'lucide-react'
import { useQuery } from '@apollo/client'

import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import Avatar from '../ui/Avatar'
import { formatXPValue, formatDate } from '../../utils/dataFormatting'
import { 
  GET_ENHANCED_LEADERBOARD_DATA, 
  GET_LEADERBOARD_STATISTICS,
  GET_LEADERBOARD_BY_COHORT,
  GET_LEVEL_LEADERBOARD
} from '../../graphql/allQueries'

interface LeaderboardSectionProps {
  user: User
}

type LeaderboardType = 'level' | 'audit' | 'overall'
type CohortFilter = string
type SortOrder = 'desc' | 'asc'

interface EnhancedUser {
  id: number
  login: string
  firstName?: string
  lastName?: string
  profile?: string
  attrs?: any
  auditRatio: number
  totalUp: number
  totalDown: number
  level?: number
  totalXP?: number
  cohort?: string
  eventPath?: string
  createdAt?: string
  rank?: number
}

interface CohortStats {
  name: string
  userCount: number
  avgLevel: number
  avgXP: number
  avgAuditRatio: number
  maxLevel: number
}

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ user }) => {
  const [activeLeaderboard, setActiveLeaderboard] = useState<LeaderboardType>('level')
  const [cohortFilter, setCohortFilter] = useState<CohortFilter>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [minLevel, setMinLevel] = useState(1)
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [limit, setLimit] = useState(100)

  const { data: enhancedData, loading: enhancedLoading, error: enhancedError } = useQuery(GET_ENHANCED_LEADERBOARD_DATA, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  })

  const processedUsers = useMemo((): EnhancedUser[] => {
    if (!enhancedData?.bhModuleUsers) return []

    console.log('BH Module Users Data:', enhancedData.bhModuleUsers)
    console.log('User Labels Data:', enhancedData.userLabels)

    return enhancedData.bhModuleUsers.map((eventUserView: any, index: number) => {
      console.log(`Event User View ${index}:`, eventUserView)
      const userData = eventUserView.user
      if (!userData) return null

      // Get user's cohort from separate userLabels data
      let cohort = 'unknown'
      if (enhancedData.userLabels) {
        const userLabel = enhancedData.userLabels.find((labelUser: any) => 
          labelUser.userId === userData.id && 
          labelUser.label?.name?.toLowerCase().includes('cohort')
        )
        if (userLabel) {
          cohort = userLabel.label.name
        }
      }

      return {
        id: userData.id,
        login: userData.login || 'Unknown',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        profile: userData.profile || '',
        attrs: userData.attrs || {},
        auditRatio: userData.auditRatio || 0,
        totalUp: userData.totalUp || 0,
        totalDown: userData.totalDown || 0,
        level: eventUserView.level || 0,
        totalXP: userData.totalUp || 0,
        cohort: cohort,
        eventPath: '/bahrain/bh-module',
        createdAt: userData.createdAt || eventUserView.createdAt,
        rank: index + 1
      }
    }).filter(Boolean) as EnhancedUser[]
  }, [enhancedData])

  // Extract available cohorts from labels data
  const availableCohorts = useMemo((): string[] => {
    const cohorts = new Set<string>(['all'])
    
    // Add cohorts from all labels
    if (enhancedData?.allLabels) {
      enhancedData.allLabels.forEach((label: any) => {
        if (label.name?.toLowerCase().includes('cohort')) {
          cohorts.add(label.name)
        }
      })
    }
    
    // Also add cohorts from processed users
    processedUsers.forEach(user => {
      if (user.cohort && user.cohort !== 'unknown') {
        cohorts.add(user.cohort)
      }
    })
    
    return Array.from(cohorts).sort()
  }, [enhancedData, processedUsers])


  // Sort and filter users
  const filteredAndSortedUsers = useMemo(() => {
    let users = [...processedUsers]
    
    // Apply cohort filter
    if (cohortFilter !== 'all') {
      users = users.filter(user => user.cohort === cohortFilter)
    }
    
    // Apply search filter
    if (searchTerm) {
      users = users.filter(user =>
        user.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply level filter
    if (minLevel > 1) {
      users = users.filter(user => (user.level || 0) >= minLevel)
    }

    // Sort based on active leaderboard type
    users.sort((a, b) => {
      let aValue: number, bValue: number
      
      switch (activeLeaderboard) {
        case 'level':
          aValue = a.level || 0
          bValue = b.level || 0
          break
        case 'audit':
          aValue = a.auditRatio || 0
          bValue = b.auditRatio || 0
          break
        case 'overall': {
          // Combined score: level (40%) + audit ratio (40%) + total up (20%)
          const maxLevel = Math.max(...users.map(u => u.level || 0), 1)
          const maxAudit = Math.max(...users.map(u => u.auditRatio || 0), 1)
          const maxUp = Math.max(...users.map(u => u.totalUp || 0), 1)
          
          aValue = ((a.level || 0) / maxLevel) * 40 + 
                   ((a.auditRatio || 0) / maxAudit) * 40 + 
                   ((a.totalUp || 0) / maxUp) * 20
          bValue = ((b.level || 0) / maxLevel) * 40 + 
                   ((b.auditRatio || 0) / maxAudit) * 40 + 
                   ((b.totalUp || 0) / maxUp) * 20
          break
        }
        default:
          aValue = a.level || 0
          bValue = b.level || 0
      }
      
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
    })

    // Update ranks after sorting
    return users.map((user, index) => ({ ...user, rank: index + 1 }))
  }, [processedUsers, cohortFilter, searchTerm, minLevel, activeLeaderboard, sortOrder])

  // Get user's current rank
  const currentUserRank = useMemo(() => {
    const userIndex = filteredAndSortedUsers.findIndex(u => u.id === user.id)
    return userIndex >= 0 ? userIndex + 1 : null
  }, [filteredAndSortedUsers, user.id])

  const totalUsers = enhancedData?.bhModuleStats?.aggregate?.count || processedUsers.length
  const maxLevel = enhancedData?.bhModuleStats?.aggregate?.max?.level || Math.max(...processedUsers.map(u => u.level || 0), 0)
  const avgLevel = enhancedData?.bhModuleStats?.aggregate?.avg?.level || (processedUsers.reduce((sum, u) => sum + (u.level || 0), 0) / Math.max(totalUsers, 1))
  const avgAuditRatio = processedUsers.reduce((sum, u) => sum + (u.auditRatio || 0), 0) / Math.max(totalUsers, 1)

  // Helper functions
  const getCohortDisplayName = (cohort: string) => {
    if (cohort === 'all') return 'All Cohorts'
    return cohort.charAt(0).toUpperCase() + cohort.slice(1)
  }

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />
      case 2: return <Medal className="w-5 h-5 text-gray-300" />
      case 3: return <Award className="w-5 h-5 text-amber-600" />
      default: return <span className="text-white/60 font-bold">#{position}</span>
    }
  }

  const getRankColors = (position: number) => {
    switch (position) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30'
      case 2: return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30'
      case 3: return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30'
      default: return 'bg-white/5 border-white/10'
    }
  }

  const getLeaderboardTitle = () => {
    const cohortSuffix = cohortFilter !== 'all' ? ` - ${getCohortDisplayName(cohortFilter)}` : ''
    switch (activeLeaderboard) {
      case 'level': return `Level Rankings${cohortSuffix}`
      case 'audit': return `Audit Ratio Rankings${cohortSuffix}`
      case 'overall': return `Overall Rankings${cohortSuffix}`
      default: return `Leaderboard${cohortSuffix}`
    }
  }

  const getValueDisplay = (user: EnhancedUser) => {
    switch (activeLeaderboard) {
      case 'level':
        return { value: `Level ${user.level || 0}`, subValue: `${formatXPValue(user.totalUp || 0)} XP` }
      case 'audit':
        return { value: (user.auditRatio || 0).toFixed(2), subValue: `${user.totalUp || 0} ↑ ${user.totalDown || 0} ↓` }
      case 'overall':
        return { value: `L${user.level || 0}`, subValue: `${formatXPValue(user.totalUp || 0)} • ${(user.auditRatio || 0).toFixed(1)}` }
      default:
        return { value: `${user.level || 0}`, subValue: '' }
    }
  }

  // Loading and error states
  if (enhancedLoading && !enhancedData) return <LoadingSpinner />

  if (enhancedError) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-400">
          <p>Error loading leaderboard data</p>
          <p className="text-sm text-white/60 mt-2">{enhancedError?.message}</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 min-h-full relative">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 40px 40px, rgba(59, 130, 246, 0.1) 2px, transparent 0)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="relative z-10 space-y-8 p-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-white/10 mb-4">
            <Trophy className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Leaderboard
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Rankings for <span className="text-blue-400 font-semibold">{totalUsers}</span> Students
          </p>
        </motion.div>

        {/* BH Module Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <StatCard 
            icon={Users} 
            title="Total Students" 
            value={totalUsers.toLocaleString()} 
            color="from-blue-500/30 to-cyan-500/30"
            subValue="Participants"
          />
          <StatCard 
            icon={BarChart3} 
            title="Average Level" 
            value={avgLevel.toFixed(1)} 
            color="from-green-500/30 to-emerald-500/30"
            subValue={`Max: ${maxLevel}`}
          />
          <StatCard 
            icon={Target} 
            title="Avg Audit Ratio" 
            value={avgAuditRatio.toFixed(2)} 
            color="from-orange-500/30 to-red-500/30"
            subValue="Community contribution"
          />
        </motion.div>


        {/* Leaderboard Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {[
            { key: 'level', label: '📊 Level Rankings', icon: TrendingUp },
            { key: 'audit', label: '⚖️ Audit Rankings', icon: Target },
            { key: 'overall', label: '🏆 Overall Rankings', icon: Trophy }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveLeaderboard(key as LeaderboardType)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeLeaderboard === key
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </motion.div>

        {/* Advanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          {/* Main Filter Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <UserSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users by login, name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center space-x-3">
              {/* Cohort Filter */}
              <select
                value={cohortFilter}
                onChange={(e) => setCohortFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {availableCohorts.map(cohort => (
                  <option key={cohort} value={cohort}>
                    {getCohortDisplayName(cohort)}
                  </option>
                ))}
              </select>

              {/* Level Filter */}
              <select
                value={minLevel}
                onChange={(e) => setMinLevel(Number(e.target.value))}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value={1}>All Levels</option>
                <option value={5}>Level 5+</option>
                <option value={10}>Level 10+</option>
                <option value={15}>Level 15+</option>
                <option value={20}>Level 20+</option>
                <option value={25}>Level 25+</option>
              </select>

              {/* Sort Order */}
              <button
                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all"
              >
                {sortOrder === 'desc' ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
                <span className="text-sm">{sortOrder === 'desc' ? 'High to Low' : 'Low to High'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* User's Current Position */}
        {currentUserRank && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-4 bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getRankIcon(currentUserRank)}
                  <div>
                    <p className="text-white font-medium">Your Current Position</p>
                    <p className="text-white/60 text-sm">{getLeaderboardTitle()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-400">#{currentUserRank}</p>
                  <p className="text-white/60 text-sm">of {filteredAndSortedUsers.length}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Leaderboard List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-primary-400" />
              {getLeaderboardTitle()}
              <span className="ml-2 text-primary-400">({filteredAndSortedUsers.length})</span>
            </h3>
            
            <div className="flex items-center space-x-2">
              <span className="text-white/60 text-sm">Show:</span>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
                <option value={500}>500</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredAndSortedUsers.slice(0, limit).map((userData: EnhancedUser, index: number) => {
              const position = userData.rank || (index + 1)
              const isCurrentUser = userData.id === user.id
              const displayData = getValueDisplay(userData)

              return (
                <motion.div
                  key={userData.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                    isCurrentUser
                      ? 'bg-primary-500/20 border-primary-500/30 ring-1 ring-primary-500/20'
                      : getRankColors(position)
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(position)}
                    </div>
                    <Avatar
                      user={userData}
                      size="sm"
                      className="w-8 h-8"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-white font-medium">{userData.login}</h4>
                        {isCurrentUser && (
                          <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs font-medium">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-white/60">
                        <span>{userData.firstName} {userData.lastName}</span>
                        {userData.cohort !== 'unknown' && (
                          <span className="flex items-center">
                            <Layers className="w-3 h-3 mr-1" />
                            {getCohortDisplayName(userData.cohort)}
                          </span>
                        )}
                        <span>Joined {formatDate(userData.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      {displayData.value}
                    </div>
                    <div className="text-xs text-white/60">
                      {displayData.subValue}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {filteredAndSortedUsers.length > limit && (
              <div className="text-center py-4">
                <p className="text-white/60 text-sm">
                  Showing {limit} of {filteredAndSortedUsers.length} users
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {enhancedLoading && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              <span className="ml-3 text-white/70">Loading leaderboard data...</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredAndSortedUsers.length === 0 && !enhancedLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Trophy className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-white/70 text-lg font-medium mb-2">No users found</h3>
            <p className="text-white/50">
              Try adjusting your search criteria or filters.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Enhanced Stat Card Component
const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  color, 
  subValue 
}: { 
  icon: React.ElementType
  title: string
  value: string | number
  color: string
  subValue?: string
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-gradient-to-br ${color} backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm`}>
        <Icon className="w-8 h-8 text-white drop-shadow-lg" />
      </div>
    </div>
    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{value}</h3>
    <p className="text-white/70 text-sm font-medium">{title}</p>
    {subValue && <p className="text-white/50 text-xs mt-2 bg-white/5 rounded-lg px-2 py-1">{subValue}</p>}
  </motion.div>
)

export default LeaderboardSection