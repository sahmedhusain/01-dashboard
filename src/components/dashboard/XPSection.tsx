import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Award, Target, Zap, Code } from 'lucide-react'
import { useQuery, gql } from '@apollo/client'
import { User } from '../../types'
import Card from '../ui/Card'
import QueryWrapper from '../ui/QueryWrapper'
import XPTimelineChart from '../charts/XPTimelineChart'
import {
  formatTotalXP,
  formatModuleXP,
  separateModuleData,
  calculateModuleXPTotals,
  calculateLevel,
  getRelativeTime
} from '../../utils/dataFormatting'

interface XPSectionProps {
  user: User
}

interface Transaction {
  id: number
  amount: number
  createdAt: string
  path: string
  object?: {
    name: string
  }
}

interface TimelineItem {
  date: string
  xp: number
  project: string
  path: string
}

interface ChartDataItem extends TimelineItem {
  cumulative: number
}

const XPSection: React.FC<XPSectionProps> = ({ user }) => {
  const { data: xpData, loading: xpLoading, error: xpError, refetch: refetchXP } = useQuery(gql`
    query GetUserXPTransactions($userId: Int!) {
      transaction(
        where: {
          userId: { _eq: $userId }
          type: { _eq: "xp" }
        }
        order_by: { createdAt: desc }
      ) {
        id
        amount
        createdAt
        path
        object {
          name
        }
      }
    }
  `, {
    variables: { userId: user.id },
    errorPolicy: 'all'
  })

  const { loading: aggregateLoading, error: aggregateError, refetch: refetchAggregate } = useQuery(gql`
    query GetTransactionAggregates($userId: Int!) {
      xp_total: transaction_aggregate(
        where: {
          userId: { _eq: $userId }
          type: { _eq: "xp" }
          _and: [
            { path: { _like: "/bahrain/bh-module%" } }
            { path: { _nlike: "/bahrain/bh-module/piscine-%" } }
            { path: { _nlike: "/bahrain/bh-piscine/%" } }
          ]
        }
      ) {
        aggregate {
          sum {
            amount
          }
          count
        }
      }
    }
  `, {
    variables: { userId: user.id },
    errorPolicy: 'all'
  })

  const loading = xpLoading || aggregateLoading
  const error = xpError || aggregateError

  const handleRetry = () => {
    refetchXP()
    refetchAggregate()
  }

  // Process XP data
  const transactions = xpData?.transaction || []

  // Separate module data dynamically (ONLY main module, piscines separate)
  const moduleData = separateModuleData(transactions)
  const xpTotals = calculateModuleXPTotals(transactions)

  // Use ONLY main module XP for total (not including piscines)
  const totalXP = xpTotals.total // This is now ONLY main module XP

  // Calculate correct level using proper formula
  const level = calculateLevel(totalXP)

  // Calculate level progress
  const currentLevelXP = totalXP % 1000 // Assuming 1000 XP per level
  const progressToNextLevel = (currentLevelXP / 1000) * 100
  const progressPercentage = Math.min(progressToNextLevel, 100)

  // Get recent transactions for MAIN MODULE ONLY (piscines will have separate tabs)
  const recentMainTransactions = moduleData.mainModule.slice(0, 10)

  // Process timeline data for chart
  const timelineData: TimelineItem[] = transactions
    .map((transaction: Transaction) => ({
      date: transaction.createdAt,
      xp: transaction.amount,
      project: transaction.object?.name || 'Unknown',
      path: transaction.path
    }))
    .sort((a: TimelineItem, b: TimelineItem) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Calculate cumulative XP
  let cumulativeXP = 0
  const chartData: ChartDataItem[] = timelineData.map((item: TimelineItem) => {
    cumulativeXP += item.xp
    return {
      ...item,
      cumulative: cumulativeXP
    }
  })

  return (
    <QueryWrapper
      loading={loading}
      error={error}
      data={transactions}
      onRetry={handleRetry}
      loadingMessage="Loading XP data..."
      emptyMessage="No XP transactions found"
    >
      <div className="space-y-6">
      {/* Comprehensive XP Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-primary-500/10 to-primary-600/10 border border-primary-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">Total XP</p>
              <p className="text-3xl font-bold text-primary-400">{formatTotalXP(totalXP)}</p>
              <p className="text-white/50 text-xs mt-1">Main module only</p>
            </div>
            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">Module XP</p>
              <p className="text-3xl font-bold text-green-400">{formatModuleXP(xpTotals.bhModule)}</p>
              <p className="text-white/50 text-xs mt-1">Main curriculum progress</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">Current Level</p>
              <p className="text-3xl font-bold text-blue-400">{level}</p>
              <p className="text-white/50 text-xs mt-1">Based on total XP</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">Transactions</p>
              <p className="text-3xl font-bold text-purple-400">{transactions.length}</p>
              <p className="text-white/50 text-xs mt-1">XP transactions</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Level Progress Visualization */}
      <Card className="p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-primary-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-primary-400" />
          Level Progress
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Level {level - 1}</span>
            <span className="text-white/70">Level {level + 1}</span>
          </div>
          <div className="relative">
            <div className="w-full bg-white/10 rounded-full h-4">
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full flex items-center justify-end pr-2"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <span className="text-xs font-bold text-white">
                  {Math.round(progressPercentage)}%
                </span>
              </motion.div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-white/60 text-sm">
              {totalXP % 1000} / 1000 XP to next level
            </p>
          </div>
        </div>
      </Card>

      {/* XP Timeline Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary-400" />
          XP Progression Timeline
        </h3>
        {chartData.length > 0 ? (
          <XPTimelineChart data={chartData} />
        ) : (
          <div className="text-center text-white/60 py-8">
            <p>No XP data available</p>
          </div>
        )}
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-primary-400" />
          Recent XP Transactions
        </h3>
        <div className="space-y-3">
          {recentMainTransactions.length > 0 ? (
            recentMainTransactions.map((transaction: Transaction, index: number) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 shadow-lg" />
                  <div>
                    <p className="text-white font-medium">{transaction.object?.name || 'Unknown Project'}</p>
                    <p className="text-white/60 text-sm">
                      🎯 XP: {transaction.amount} • {getRelativeTime(transaction.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-medium">
                    +{transaction.amount} XP
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-white/60 py-8">
              <p>No recent XP transactions</p>
            </div>
          )}
        </div>
      </Card>
      </div>
    </QueryWrapper>
  )
}

export default XPSection