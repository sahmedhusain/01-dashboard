import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Award, TrendingUp, Users, Crown } from 'lucide-react'
import { useQuery, gql } from '@apollo/client'

import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import Avatar from '../ui/Avatar'
import { formatTotalXP } from '../../utils/dataFormatting'

interface LeaderboardSectionProps {
  user: User
}

type LeaderboardType = 'xp' | 'audit'

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ user }) => {
  const [activeLeaderboard, setActiveLeaderboard] = useState<LeaderboardType>('xp')

  const { data: xpLeaderboard, loading: xpLoading } = useQuery(gql`
    query GetLeaderboard($campus: String!, $limit: Int!) {
      user(
        where: { campus: { _eq: $campus } }
        order_by: { totalUp: desc }
        limit: $limit
      ) {
        id
        login
        firstName
        lastName
        campus
        auditRatio
        totalUp
        totalDown
        xp_total: transactions_aggregate(
          where: { type: { _eq: "xp" } }
        ) {
          aggregate {
            sum {
              amount
            }
          }
        }
      }
    }
  `, {
    variables: { campus: user.campus || 'london', limit: 50 },
    errorPolicy: 'all'
  })

  const { data: auditLeaderboard, loading: auditLoading } = useQuery(gql`
    query GetAuditRatioLeaderboard($campus: String!, $limit: Int!) {
      user(
        where: {
          campus: { _eq: $campus }
          auditRatio: { _is_null: false }
        }
        order_by: { auditRatio: desc }
        limit: $limit
      ) {
        id
        login
        firstName
        lastName
        campus
        auditRatio
        totalUp
        totalDown
      }
    }
  `, {
    variables: { campus: user.campus || 'london', limit: 50 },
    errorPolicy: 'all'
  })

  const loading = activeLeaderboard === 'xp' ? xpLoading : auditLoading
  const currentData = activeLeaderboard === 'xp' ? xpLeaderboard?.user : auditLeaderboard?.user

  // Find current user's position
  const userPosition = currentData?.findIndex((u: any) => u.login === user.login) + 1 || 0

  // Use proper XP formatting function

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

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      {/* Header with Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-primary-400" />
          Campus Leaderboard
        </h2>
        
        <div className="flex bg-white/10 rounded-lg p-1">
          <button
            onClick={() => setActiveLeaderboard('xp')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeLeaderboard === 'xp'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4 mr-1 inline" />
            XP Rankings
          </button>
          <button
            onClick={() => setActiveLeaderboard('audit')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeLeaderboard === 'audit'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 mr-1 inline" />
            Audit Ratio
          </button>
        </div>
      </div>

      {/* User's Position Card */}
      {userPosition > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3">
                {getRankIcon(userPosition)}
              </div>
              <div>
                <p className="text-white font-medium">Your Position</p>
                <p className="text-white/60 text-sm">
                  {userPosition === 1 ? '🎉 You\'re #1!' : `Rank #${userPosition} out of ${currentData?.length || 0}`}
                </p>
              </div>
            </div>
            <div className="text-right">
              {activeLeaderboard === 'xp' ? (
                <div>
                  <p className="text-primary-400 font-bold">
                    {formatTotalXP(currentData?.[userPosition - 1]?.xp_total?.aggregate?.sum?.amount || 0)}
                  </p>
                  <p className="text-white/60 text-sm">Total XP</p>
                </div>
              ) : (
                <div>
                  <p className="text-primary-400 font-bold">
                    {currentData?.[userPosition - 1]?.auditRatio?.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-white/60 text-sm">Audit Ratio</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Leaderboard */}
      <Card className="p-6">
        <div className="space-y-3">
          {currentData?.slice(0, 20).map((userData: any, index: number) => {
            const position = index + 1
            const isCurrentUser = userData.login === user.login
            
            return (
              <motion.div
                key={userData.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                  isCurrentUser 
                    ? 'bg-primary-500/20 border-primary-500/30 ring-1 ring-primary-500/50' 
                    : getRankColors(position)
                } ${isCurrentUser ? 'scale-105' : 'hover:scale-102'}`}
              >
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="w-8 flex justify-center">
                    {getRankIcon(position)}
                  </div>
                  
                  {/* Avatar */}
                  <Avatar user={userData} size="sm" />
                  
                  {/* User Info */}
                  <div>
                    <p className={`font-medium ${isCurrentUser ? 'text-primary-200' : 'text-white'}`}>
                      {userData.firstName && userData.lastName 
                        ? `${userData.firstName} ${userData.lastName}`
                        : userData.login
                      }
                      {isCurrentUser && <span className="ml-2 text-primary-300">(You)</span>}
                    </p>
                    <p className="text-white/60 text-sm">@{userData.login}</p>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="text-right">
                  {activeLeaderboard === 'xp' ? (
                    <div>
                      <p className={`font-bold ${isCurrentUser ? 'text-primary-200' : 'text-primary-400'}`}>
                        {formatTotalXP(userData.xp_total?.aggregate?.sum?.amount || 0)}
                      </p>
                      <p className="text-white/60 text-sm">XP</p>
                    </div>
                  ) : (
                    <div>
                      <p className={`font-bold ${isCurrentUser ? 'text-primary-200' : 'text-primary-400'}`}>
                        {userData.auditRatio?.toFixed(2) || '0.00'}
                      </p>
                      <p className="text-white/60 text-sm">Ratio</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {(!currentData || currentData.length === 0) && (
          <div className="text-center text-white/60 py-8">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-white/30" />
            <p>No leaderboard data available</p>
          </div>
        )}
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary-400">
            {currentData?.length || 0}
          </div>
          <div className="text-white/60 text-sm">Total Students</div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {userPosition || 'N/A'}
          </div>
          <div className="text-white/60 text-sm">Your Rank</div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">
            {userPosition > 0 ? Math.round(((currentData?.length - userPosition + 1) / currentData?.length) * 100) : 0}%
          </div>
          <div className="text-white/60 text-sm">Percentile</div>
        </Card>
      </div>
    </div>
  )
}

export default LeaderboardSection
