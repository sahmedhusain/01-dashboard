import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
  Search
} from 'lucide-react'
import { useQuery, gql } from '@apollo/client'

import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import Avatar from '../ui/Avatar'
import Pagination from '../ui/Pagination'
import { usePagination } from '../../hooks/usePagination'
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor'
import { formatTotalXP, formatDate } from '../../utils/dataFormatting'

interface LeaderboardSectionProps {
  user: User
}

type LeaderboardType = 'xp' | 'audit' | 'progress' | 'overall'

// Enhanced leaderboard queries using our comprehensive data - NO LIMITS
const GET_XP_LEADERBOARD = gql`
  query GetXPLeaderboard {
    user(
      order_by: { totalUp: desc }
      where: { totalUp: { _gt: 0 } }
    ) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
      createdAt
      updatedAt
    }
  }
`;

const GET_AUDIT_LEADERBOARD = gql`
  query GetAuditLeaderboard {
    user(
      order_by: { auditRatio: desc }
      where: { auditRatio: { _gt: 0 } }
    ) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
      createdAt
    }
  }
`;

const GET_PROGRESS_LEADERBOARD = gql`
  query GetProgressLeaderboard {
    progress_aggregate(
      group_by: [userId]
      order_by: { count: desc }
    ) {
      aggregate {
        count
        avg {
          grade
        }
        max {
          grade
        }
      }
      nodes {
        userId
        user {
          login
          firstName
          lastName
          campus
          auditRatio
          totalUp
        }
      }
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
  const [campusFilter, setCampusFilter] = useState<string>('all')

  // Query XP leaderboard
  const { data: xpLeaderboardData, loading: xpLoading, error: xpError } = useQuery(GET_XP_LEADERBOARD, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  })

  // Query audit leaderboard
  const { data: auditLeaderboardData, loading: auditLoading } = useQuery(GET_AUDIT_LEADERBOARD, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  })

  // Query progress leaderboard
  const { data: progressLeaderboardData, loading: progressLoading } = useQuery(GET_PROGRESS_LEADERBOARD, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  })

  // Query leaderboard statistics
  const { data: statsData, loading: statsLoading } = useQuery(GET_LEADERBOARD_STATS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  })

  if (xpLoading && !xpLeaderboardData) return <LoadingSpinner />

  if (xpError) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-400">
          <p>Error loading leaderboard data</p>
          <p className="text-sm text-white/60 mt-2">{xpError.message}</p>
        </div>
      </Card>
    )
  }

  // Process leaderboard data
  const xpLeaderboard = xpLeaderboardData?.user || []
  const auditLeaderboard = auditLeaderboardData?.user || []
  const progressLeaderboard = progressLeaderboardData?.progress_aggregate || []
  const stats = statsData || {}

  // Calculate comprehensive statistics
  const totalUsers = stats.user_aggregate?.aggregate?.count || 0
  const avgAuditRatio = stats.user_aggregate?.aggregate?.avg?.auditRatio || 0
  const avgXP = stats.user_aggregate?.aggregate?.avg?.totalUp || 0
  const maxXP = stats.user_aggregate?.aggregate?.max?.totalUp || 0
  const totalProgress = stats.progress_aggregate?.aggregate?.count || 0
  const avgGrade = stats.progress_aggregate?.aggregate?.avg?.grade || 0
  const totalXPTransactions = stats.transaction_aggregate?.aggregate?.count || 0
  const totalXPAmount = stats.transaction_aggregate?.aggregate?.sum?.amount || 0

  // Get current leaderboard data based on active tab
  const getCurrentLeaderboardData = () => {
    switch (activeLeaderboard) {
      case 'xp':
        return xpLeaderboard
      case 'audit':
        return auditLeaderboard
      case 'progress':
        return progressLeaderboard.map((item: any) => ({
          ...item.nodes[0]?.user,
          progressCount: item.aggregate.count,
          avgGrade: item.aggregate.avg?.grade || 0,
          maxGrade: item.aggregate.max?.grade || 0
        }))
      case 'overall':
        return xpLeaderboard.slice(0, 20) // Top 20 overall performers
      default:
        return xpLeaderboard
    }
  }

  // Filter leaderboard data
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

    // Apply campus filter
    if (campusFilter !== 'all') {
      data = data.filter((item: any) => item.campus === campusFilter)
    }

    return data
  }

  // Get unique campuses for filter
  const uniqueCampuses = [...new Set(xpLeaderboard.map((user: any) => user.campus).filter(Boolean))]

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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Comprehensive Leaderboard
        </h1>
        <p className="text-white/70 text-lg">
          Rankings across {totalUsers} users with {totalXPTransactions} XP transactions
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
              <p className="text-2xl font-bold text-white">{formatTotalXP(totalXPAmount)}</p>
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

      {/* Leaderboard Type Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="bg-white/10 rounded-lg p-1">
          <button
            onClick={() => setActiveLeaderboard('xp')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeLeaderboard === 'xp'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            XP Leaders ({xpLeaderboard.length})
          </button>
          <button
            onClick={() => setActiveLeaderboard('audit')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeLeaderboard === 'audit'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Audit Leaders ({auditLeaderboard.length})
          </button>
          <button
            onClick={() => setActiveLeaderboard('progress')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeLeaderboard === 'progress'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Progress Leaders ({progressLeaderboard.length})
          </button>
          <button
            onClick={() => setActiveLeaderboard('overall')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeLeaderboard === 'overall'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Overall Top 20
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Search users by login or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Campus Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-white/70" />
          <select
            value={campusFilter}
            onChange={(e) => setCampusFilter(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Campuses</option>
            {uniqueCampuses.map((campus: string) => (
              <option key={campus} value={campus}>
                {campus}
              </option>
            ))}
          </select>
        </div>
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
                    {activeLeaderboard === 'xp' && `${formatTotalXP(user.totalUp || 0)} XP`}
                    {activeLeaderboard === 'audit' && `${(user.auditRatio || 0).toFixed(2)} audit ratio`}
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
          {activeLeaderboard === 'xp' && 'XP Leaderboard'}
          {activeLeaderboard === 'audit' && 'Audit Ratio Leaderboard'}
          {activeLeaderboard === 'progress' && 'Progress Leaderboard'}
          {activeLeaderboard === 'overall' && 'Overall Top Performers'}
          ({getFilteredData().length})
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
                      {userData.campus && <span>Campus: {userData.campus}</span>}
                      {activeLeaderboard === 'progress' && userData.progressCount && (
                        <span>Progress: {userData.progressCount}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {activeLeaderboard === 'xp' && (
                    <div>
                      <div className="text-lg font-bold text-white">
                        {formatTotalXP(userData.totalUp || 0)}
                      </div>
                      <div className="text-xs text-white/60">XP</div>
                    </div>
                  )}
                  {activeLeaderboard === 'audit' && (
                    <div>
                      <div className="text-lg font-bold text-white">
                        {(userData.auditRatio || 0).toFixed(2)}
                      </div>
                      <div className="text-xs text-white/60">Audit Ratio</div>
                    </div>
                  )}
                  {activeLeaderboard === 'progress' && (
                    <div>
                      <div className="text-lg font-bold text-white">
                        {userData.avgGrade?.toFixed(1) || '0.0'}%
                      </div>
                      <div className="text-xs text-white/60">Avg Grade</div>
                    </div>
                  )}
                  {activeLeaderboard === 'overall' && (
                    <div>
                      <div className="text-lg font-bold text-white">
                        {formatTotalXP(userData.totalUp || 0)}
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
      {(xpLoading || auditLoading || progressLoading || statsLoading) && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-3 text-white/70">Loading leaderboard data...</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {getFilteredData().length === 0 && !xpLoading && (
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
