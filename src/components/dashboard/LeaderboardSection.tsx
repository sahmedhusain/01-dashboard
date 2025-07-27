import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Users,
  Crown,
  Star,
  Target,
  Activity,
  BarChart3,
  Zap,
  Filter,
  Search,
  ChevronDown,
  UserSearch,
  Hash,
  Layers
} from 'lucide-react'
import { useQuery, gql } from '@apollo/client'

import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import Avatar from '../ui/Avatar'
import SectionHeader from '../ui/SectionHeader'
import { formatXPValue, formatDate, extractPersonalInfo, getCohortDisplayName } from '../../utils/dataFormatting'

interface LeaderboardSectionProps {
  user: User
}

type LeaderboardType = 'xp' | 'audit' | 'progress' | 'overall' | 'cohort-xp' | 'cohort-audit'
type CohortType = 'all' | 'cohort1' | 'cohort2' | 'cohort3'
type RankingMode = 'global' | 'cohort'

interface CohortData {
  cohort: string
  memberCount: number
  avgXP: number
  avgAuditRatio: number
}

// Enhanced leaderboard queries with ALL USERS and cohort data
const GET_ALL_USERS_LEADERBOARD = gql`
  query GetAllUsersLeaderboard {
    user_public_view {
      id
      login
      firstName
      lastName
      profile
    }
  }
`;

const GET_USER_STATISTICS = gql`
  query GetUserStatistics {
    user {
      id
      login
      firstName
      lastName
      auditRatio
      totalUp
      totalDown
      createdAt
      updatedAt
      attrs
      profile
    }
  }
`;

const GET_PROGRESS_LEADERBOARD = gql`
  query GetProgressLeaderboard {
    progress(order_by: { grade: desc }) {
      id
      userId
      grade
      isDone
      path
      createdAt
      updatedAt
    }
    
    progress_aggregate {
      aggregate {
        count
        avg {
          grade
        }
        max {
          grade
        }
        min {
          grade
        }
      }
    }
  }
`;

// Enhanced cohort and user data queries
const GET_COHORT_DATA = gql`
  query GetCohortData {
    event {
      id
      path
      createdAt
      objectId
    }
    event_user {
      eventId
      userId
      level
      createdAt
    }
  }
`;

const GET_GROUP_SEARCH_DATA = gql`
  query GetGroupSearchData {
    group {
      id
      objectId
      eventId
      captainId
      status
      path
      createdAt
    }
    group_user {
      groupId
      userId
      createdAt
    }
    object {
      id
      name
      type
    }
  }
`;

const GET_LEADERBOARD_STATS = gql`
  query GetLeaderboardStats {
    user_aggregate {
      aggregate {
        count
        avg {
          auditRatio
          totalUp
        }
        max {
          auditRatio
          totalUp
        }
      }
    }

    progress_aggregate {
      aggregate {
        count
        avg {
          grade
        }
      }
    }

    transaction_aggregate(where: { type: { _eq: "xp" } }) {
      aggregate {
        count
        sum {
          amount
        }
        avg {
          amount
        }
      }
    }
  }
`;

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ user }) => {
  const [activeLeaderboard, setActiveLeaderboard] = useState<LeaderboardType>('xp')
  const [searchTerm, setSearchTerm] = useState('')
  const [cohortFilter, setCohortFilter] = useState<CohortType>('all')
  const [rankingMode, setRankingMode] = useState<RankingMode>('global')
  const [showGroupSearch, setShowGroupSearch] = useState(false)
  const [projectFilter, setProjectFilter] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')

  // Query ALL USERS and complete data
  const { data: allUsersData, loading: allUsersLoading, error: allUsersError } = useQuery(GET_ALL_USERS_LEADERBOARD, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  })

  const { data: userStatsData, loading: userStatsLoading } = useQuery(GET_USER_STATISTICS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  })

  const { data: progressLeaderboardData, loading: progressLoading } = useQuery(GET_PROGRESS_LEADERBOARD, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  })

  const { data: statsData, loading: statsLoading } = useQuery(GET_LEADERBOARD_STATS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  })

  const { data: cohortData, loading: cohortLoading } = useQuery(GET_COHORT_DATA, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  })

  const { data: groupSearchData, loading: groupSearchLoading } = useQuery(GET_GROUP_SEARCH_DATA, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  })

  // Process leaderboard data - must be defined before early returns
  const allUsersPublic = allUsersData?.user_public_view || [] // 8,382 users from public view
  const currentUserStats = userStatsData?.user?.[0] || {} // Current user detailed stats
  const progressData = progressLeaderboardData?.progress || []
  const progressAggregates = progressLeaderboardData?.progress_aggregate || {}
  const stats = statsData || {}
  const events = cohortData?.event || []
  const eventUsers = cohortData?.event_user || []
  const groups = groupSearchData?.group || []
  const groupUsers = groupSearchData?.group_user || []
  const objects = groupSearchData?.object || []

  // Merge public user data with progress and transaction data for complete ranking
  const allUsers = allUsersPublic.map(publicUser => ({
    ...publicUser,
    // Add default values for missing stats (will be calculated from progress/transactions)
    auditRatio: 0,
    totalUp: 0,
    totalDown: 0,
    createdAt: null,
    updatedAt: null,
    attrs: {}
  }) // All users are in Bahrain by default

  // Process cohort information from event participation data - MUST be before early returns
  const cohortInfo = useMemo(() => {
    const cohorts: Record<string, CohortData> = {}
    
    events.forEach(event => {
      const cohortName = event.path?.includes('cohort-1') ? 'cohort1' : 
                        event.path?.includes('cohort-2') ? 'cohort2' : 
                        event.path?.includes('cohort-3') ? 'cohort3' : 'unknown'
      
      if (cohortName !== 'unknown') {
        const participants = eventUsers.filter(eu => eu.eventId === event.id)
        const participantIds = participants.map(p => p.userId)
        const cohortUsers = allUsers.filter(u => participantIds.includes(u.id))
        
        cohorts[cohortName] = {
          cohort: cohortName,
          memberCount: cohortUsers.length,
          avgXP: cohortUsers.reduce((sum, u) => sum + (u.totalUp || 0), 0) / cohortUsers.length || 0,
          avgAuditRatio: cohortUsers.reduce((sum, u) => sum + (u.auditRatio || 0), 0) / cohortUsers.length || 0
        }
      }
    })
    
    return cohorts
  }, [events, eventUsers, allUsers])

  // Get user's cohort information
  const getUserCohort = (userId: number): string => {
    const userEvents = eventUsers.filter(eu => eu.userId === userId)
    for (const userEvent of userEvents) {
      const event = events.find(e => e.id === userEvent.eventId)
      if (event?.path?.includes('cohort-1')) return 'cohort1'
      if (event?.path?.includes('cohort-2')) return 'cohort2'
      if (event?.path?.includes('cohort-3')) return 'cohort3'
    }
    return 'unknown'
  }

  // Early returns AFTER all hooks are declared
  if (allUsersLoading && !allUsersData) return <LoadingSpinner />

  if (allUsersError) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-400">
          <p>Error loading leaderboard data</p>
          <p className="text-sm text-white/60 mt-2">{allUsersError?.message}</p>
        </div>
      </Card>
    )
  }

  // Calculate comprehensive statistics
  const totalUsers = stats.user_aggregate?.aggregate?.count || allUsers.length
  const avgAuditRatio = stats.user_aggregate?.aggregate?.avg?.auditRatio || 0
  const avgXP = stats.user_aggregate?.aggregate?.avg?.totalUp || 0
  const maxXP = stats.user_aggregate?.aggregate?.max?.totalUp || 0
  const totalProgress = stats.progress_aggregate?.aggregate?.count || 0
  const avgGrade = stats.progress_aggregate?.aggregate?.avg?.grade || 0
  const totalXPTransactions = stats.transaction_aggregate?.aggregate?.count || 0
  const totalXPAmount = stats.transaction_aggregate?.aggregate?.sum?.amount || 0

  // Get current leaderboard data based on active tab and cohort filter
  const getCurrentLeaderboardData = () => {
    let baseData = []
    
    switch (activeLeaderboard) {
      case 'xp':
      case 'cohort-xp':
        baseData = allUsers.slice().sort((a, b) => (b.totalUp || 0) - (a.totalUp || 0))
        break
      case 'audit':
      case 'cohort-audit':
        baseData = allUsers.slice().sort((a, b) => (b.auditRatio || 0) - (a.auditRatio || 0))
        break
      case 'progress':
        // Group progress data by user and calculate stats
        const userProgressMap = new Map()
        progressData.forEach((progress: any) => {
          const userId = progress.userId
          if (!userProgressMap.has(userId)) {
            const user = allUsers.find(u => u.id === userId)
            if (user) {
              userProgressMap.set(userId, {
                ...user,
                progressCount: 0,
                totalGrade: 0,
                maxGrade: 0,
                avgGrade: 0
              })
            }
          }
          
          const userProgress = userProgressMap.get(userId)
          if (userProgress) {
            userProgress.progressCount++
            userProgress.totalGrade += (progress.grade || 0)
            userProgress.maxGrade = Math.max(userProgress.maxGrade, progress.grade || 0)
            userProgress.avgGrade = userProgress.totalGrade / userProgress.progressCount
          }
        })
        
        baseData = Array.from(userProgressMap.values()).sort((a, b) => b.avgGrade - a.avgGrade)
        break
      case 'overall':
        baseData = allUsers.slice().sort((a, b) => (b.totalUp || 0) - (a.totalUp || 0)).slice(0, 20)
        break
      default:
        baseData = allUsers.slice().sort((a, b) => (b.totalUp || 0) - (a.totalUp || 0))
    }
    
    // Apply cohort filter
    if (cohortFilter !== 'all') {
      baseData = baseData.filter(userData => getUserCohort(userData.id) === cohortFilter)
    }
    
    return baseData
  }

  // Filter leaderboard data with enhanced filtering
  const getFilteredData = () => {
    let data = getCurrentLeaderboardData()

    // Apply search filter
    if (searchTerm) {
      data = data.filter((item: any) =>
        item.login?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // All users are Bahrain-based by default

    // Apply level filter for progress leaderboard
    if (levelFilter !== 'all' && activeLeaderboard === 'progress') {
      const minLevel = parseInt(levelFilter)
      data = data.filter((item: any) => (item.avgGrade || 0) >= minLevel)
    }

    return data
  }

  // Get available cohorts for filters
  const availableCohorts = Object.keys(cohortInfo).filter(cohort => cohortInfo[cohort].memberCount > 0)
  
  // Filter groups for group search
  const getFilteredGroups = () => {
    let filteredGroups = groups
    
    if (cohortFilter !== 'all') {
      filteredGroups = filteredGroups.filter(group => {
        const event = events.find(e => e.id === group.eventId)
        return event?.path?.includes(cohortFilter.replace('cohort', 'cohort-'))
      })
    }
    
    if (projectFilter) {
      const matchingObjects = objects.filter(obj => 
        obj.name?.toLowerCase().includes(projectFilter.toLowerCase())
      )
      const objectIds = matchingObjects.map(obj => obj.id)
      filteredGroups = filteredGroups.filter(group => objectIds.includes(group.objectId))
    }
    
    return filteredGroups
  }

  // Get user's rank in current leaderboard
  const getUserRank = () => {
    const data = getCurrentLeaderboardData()
    const userIndex = data.findIndex((item: any) => item.id === user.id)
    return userIndex >= 0 ? userIndex + 1 : null
  }

  const userRank = getUserRank()

  // Get rank icon
  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />
      case 2: return <Medal className="w-5 h-5 text-gray-300" />
      case 3: return <Award className="w-5 h-5 text-amber-600" />
      default: return <span className="text-white/60 font-bold">#{position}</span>
    }
  }

  // Get rank colors
  const getRankColors = (position: number) => {
    switch (position) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30'
      case 2: return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30'
      case 3: return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30'
      default: return 'bg-white/5 border-white/10'
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <SectionHeader
        title="Advanced Leaderboard System"
        subtitle={`Complete rankings across ${totalUsers} users • ${availableCohorts.length} active cohorts • ${groups.length} project groups`}
        icon={Trophy}
      />

      {/* Cohort Statistics Cards */}
      {availableCohorts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          {availableCohorts.map(cohort => {
            const cohortData = cohortInfo[cohort]
            return (
              <div key={cohort} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold capitalize">
                    {cohort.replace('cohort', 'Cohort ')}
                  </h3>
                  <Layers className="w-5 h-5 text-blue-400" />
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-white/70">
                    <span>Members:</span>
                    <span className="text-white font-medium">{cohortData.memberCount}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Avg XP:</span>
                    <span className="text-white font-medium">{formatXPValue(cohortData.avgXP)}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Avg Audit:</span>
                    <span className="text-white font-medium">{cohortData.avgAuditRatio.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>
      )}

      {/* Global Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-white font-medium">Total Users</p>
              <p className="text-2xl font-bold text-white">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-white font-medium">Total XP</p>
              <p className="text-2xl font-bold text-white">{formatXPValue(totalXPAmount)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-white font-medium">Avg Audit Ratio</p>
              <p className="text-2xl font-bold text-white">{avgAuditRatio.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Activity className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-white font-medium">Progress Records</p>
              <p className="text-2xl font-bold text-white">{totalProgress}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Leaderboard Type Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        {/* Ranking Mode Toggle */}
        <div className="flex justify-center">
          <div className="bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setRankingMode('global')}
              className={`px-4 py-2 rounded-md transition-all ${
                rankingMode === 'global'
                  ? 'bg-primary-500 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              🌍 Global Rankings
            </button>
            <button
              onClick={() => setRankingMode('cohort')}
              className={`px-4 py-2 rounded-md transition-all ${
                rankingMode === 'cohort'
                  ? 'bg-primary-500 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              👥 Cohort Rankings
            </button>
          </div>
        </div>

        {/* Ranking Type Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="bg-white/10 rounded-lg p-1">
            <h4 className="text-white/60 text-xs font-medium px-2 mb-1">XP RANKINGS</h4>
            <button
              onClick={() => setActiveLeaderboard(rankingMode === 'cohort' ? 'cohort-xp' : 'xp')}
              className={`w-full px-3 py-2 rounded-md transition-all text-sm ${
                (activeLeaderboard === 'xp' || activeLeaderboard === 'cohort-xp')
                  ? 'bg-primary-500 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              🚀 XP Projects ({allUsers.length})
            </button>
          </div>

          <div className="bg-white/10 rounded-lg p-1">
            <h4 className="text-white/60 text-xs font-medium px-2 mb-1">AUDIT RANKINGS</h4>
            <button
              onClick={() => setActiveLeaderboard(rankingMode === 'cohort' ? 'cohort-audit' : 'audit')}
              className={`w-full px-3 py-2 rounded-md transition-all text-sm ${
                (activeLeaderboard === 'audit' || activeLeaderboard === 'cohort-audit')
                  ? 'bg-primary-500 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              ⚖️ Audit Ratio ({allUsers.length})
            </button>
          </div>

          <div className="bg-white/10 rounded-lg p-1">
            <h4 className="text-white/60 text-xs font-medium px-2 mb-1">OTHER RANKINGS</h4>
            <button
              onClick={() => setActiveLeaderboard('progress')}
              className={`w-full px-3 py-2 rounded-md transition-all text-sm ${
                activeLeaderboard === 'progress'
                  ? 'bg-primary-500 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              📈 Progress ({progressData.length})
            </button>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        {/* Main Search and Filter Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Enhanced Search */}
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
            {availableCohorts.length > 0 && (
              <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-white/70" />
                <select
                  value={cohortFilter}
                  onChange={(e) => setCohortFilter(e.target.value as CohortType)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Cohorts</option>
                  {availableCohorts.map(cohort => (
                    <option key={cohort} value={cohort}>
                      {cohort.replace('cohort', 'Cohort ')}
                    </option>
                  ))}
                </select>
              </div>
            )}


            {/* Level Filter for Progress */}
            {activeLeaderboard === 'progress' && (
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-white/70" />
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Levels</option>
                  <option value="50">50%+ Grade</option>
                  <option value="75">75%+ Grade</option>
                  <option value="90">90%+ Grade</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Group Search Toggle */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowGroupSearch(!showGroupSearch)}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all"
          >
            <Filter className="w-4 h-4" />
            <span>Group Search</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showGroupSearch ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Group Search Panel */}
        <AnimatePresence>
          {showGroupSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary-400" />
                Group Search
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Cohort Selection for Groups */}
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Select Cohort</label>
                  <select
                    value={cohortFilter}
                    onChange={(e) => setCohortFilter(e.target.value as CohortType)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Cohorts</option>
                    {availableCohorts.map(cohort => (
                      <option key={cohort} value={cohort}>
                        {cohort.replace('cohort', 'Cohort ')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Filter */}
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Project Name</label>
                  <input
                    type="text"
                    placeholder="Search project paths..."
                    value={projectFilter}
                    onChange={(e) => setProjectFilter(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Group Results */}
              <div className="mt-4">
                <h4 className="text-white/80 font-medium mb-2">
                  Found {getFilteredGroups().length} groups
                </h4>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {getFilteredGroups().slice(0, 10).map(group => {
                    const groupMemberCount = groupUsers.filter(gu => gu.groupId === group.id).length
                    const projectObj = objects.find(obj => obj.id === group.objectId)
                    
                    return (
                      <div key={group.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">{projectObj?.name || `Group ${group.id}`}</p>
                            <p className="text-white/60 text-sm">
                              {groupMemberCount} members • {group.status}
                            </p>
                          </div>
                          <div className="text-white/60 text-sm">
                            {formatDate(group.createdAt)}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* User's Position Card */}
      {userRank && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-4 bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3">
                  {getRankIcon(userRank)}
                </div>
                <div>
                  <p className="text-white font-medium">Your Position</p>
                  <p className="text-white/60 text-sm">
                    {(activeLeaderboard === 'xp' || activeLeaderboard === 'cohort-xp') && `${formatXPValue(user.totalUp || 0)} XP`}
                    {(activeLeaderboard === 'audit' || activeLeaderboard === 'cohort-audit') && `${(user.auditRatio || 0).toFixed(2)} audit ratio`}
                    {activeLeaderboard === 'progress' && 'Progress leader'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary-400">#{userRank}</p>
                <p className="text-white/60 text-sm">of {getCurrentLeaderboardData().length}</p>
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
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-primary-400" />
          {(activeLeaderboard === 'xp' || activeLeaderboard === 'cohort-xp') && 
            `${rankingMode === 'cohort' ? 'Cohort ' : ''}XP Projects Ranking`}
          {(activeLeaderboard === 'audit' || activeLeaderboard === 'cohort-audit') && 
            `${rankingMode === 'cohort' ? 'Cohort ' : ''}Audit Ratio Ranking`}
          {activeLeaderboard === 'progress' && 'Progress Leaders Ranking'}
          {activeLeaderboard === 'overall' && 'Overall Top Performers'}
          {cohortFilter !== 'all' && ` - ${cohortFilter.replace('cohort', 'Cohort ')}`}
          <span className="ml-2 text-primary-400">({getFilteredData().length})</span>
        </h3>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {getFilteredData().slice(0, 50).map((userData: any, index: number) => {
            const position = index + 1;
            const isCurrentUser = userData.id === user.id;

            return (
              <motion.div
                key={userData.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  isCurrentUser
                    ? 'bg-primary-500/20 border-primary-500/30'
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
                        <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-white/60">
                      <span>{userData.firstName} {userData.lastName}</span>
                      <span>{getCohortDisplayName(extractPersonalInfo(userData.attrs || {}).cohort || 'module')}</span>
                      {activeLeaderboard === 'progress' && userData.progressCount && (
                        <span>Progress: {userData.progressCount}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {(activeLeaderboard === 'xp' || activeLeaderboard === 'cohort-xp') && (
                    <div>
                      <div className="text-lg font-bold text-white">
                        {formatXPValue(userData.totalUp || 0)}
                      </div>
                      <div className="text-xs text-white/60">XP</div>
                      {rankingMode === 'cohort' && (
                        <div className="text-xs text-blue-400">
                          {getUserCohort(userData.id).replace('cohort', 'C')}
                        </div>
                      )}
                    </div>
                  )}
                  {(activeLeaderboard === 'audit' || activeLeaderboard === 'cohort-audit') && (
                    <div>
                      <div className="text-lg font-bold text-white">
                        {(userData.auditRatio || 0).toFixed(2)}
                      </div>
                      <div className="text-xs text-white/60">Audit Ratio</div>
                      {rankingMode === 'cohort' && (
                        <div className="text-xs text-blue-400">
                          {getUserCohort(userData.id).replace('cohort', 'C')}
                        </div>
                      )}
                    </div>
                  )}
                  {activeLeaderboard === 'progress' && (
                    <div>
                      <div className="text-lg font-bold text-white">
                        {userData.avgGrade?.toFixed(1) || '0.0'}%
                      </div>
                      <div className="text-xs text-white/60">Avg Grade</div>
                      <div className="text-xs text-green-400">
                        {userData.progressCount || 0} projects
                      </div>
                    </div>
                  )}
                  {activeLeaderboard === 'overall' && (
                    <div>
                      <div className="text-lg font-bold text-white">
                        {formatXPValue(userData.totalUp || 0)}
                      </div>
                      <div className="text-xs text-white/60">
                        {(userData.auditRatio || 0).toFixed(2)} ratio
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {getFilteredData().length > 50 && (
            <div className="text-center py-4">
              <p className="text-white/60 text-sm">
                Showing 50 of {getFilteredData().length} users
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Loading States */}
      {(allUsersLoading || progressLoading || statsLoading || cohortLoading || groupSearchLoading) && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-3 text-white/70">Loading comprehensive leaderboard data...</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {getFilteredData().length === 0 && !allUsersLoading && (
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
  )
}

export default LeaderboardSection