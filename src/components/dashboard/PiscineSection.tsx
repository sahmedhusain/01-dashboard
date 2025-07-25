import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Award, Target } from 'lucide-react'
import { useQuery, gql } from '@apollo/client'
import { GET_ALL_TRANSACTIONS, GET_ALL_PROGRESS } from '../../graphql/allQueries'
import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import {
  formatModuleXP,
  calculateProjectStats,
  getRelativeTime
} from '../../utils/dataFormatting'
import PiscineStats from './PiscineStats'

interface PiscineSectionProps {
  user: User
  piscineType: string // js, go, rust, flutter, etc.
}

const PiscineSection: React.FC<PiscineSectionProps> = ({ user, piscineType }) => {
  // Query piscine-specific XP transactions
  const { data: xpData, loading: xpLoading } = useQuery(gql`
    query GetPiscineXPTransactions($userId: Int!, $piscinePattern: String!) {
      transaction(
        where: {
          userId: { _eq: $userId }
          type: { _eq: "xp" }
          path: { _regex: $piscinePattern }
        }
        order_by: { createdAt: desc }
      ) {
        id
        amount
        path
        createdAt
        object {
          name
          type
        }
      }
    }
  `, {
    variables: { 
      userId: user.id,
      piscinePattern: `piscine-${piscineType}`
    },
    errorPolicy: 'all'
  })

  // Query piscine-specific progress
  const { data: progressData, loading: progressLoading } = useQuery(gql`
    query GetPiscineProgress($userId: Int!, $piscinePattern: String!) {
      progress(
        where: {
          userId: { _eq: $userId }
          path: { _regex: $piscinePattern }
        }
        order_by: { createdAt: desc }
      ) {
        id
        grade
        isDone
        path
        version
        createdAt
        updatedAt
        object {
          name
          type
        }
      }
    }
  `, {
    variables: { 
      userId: user.id,
      piscinePattern: `piscine-${piscineType}`
    },
    errorPolicy: 'all'
  })

  if (xpLoading || progressLoading) return <LoadingSpinner />

  const transactions = xpData?.transaction || []
  const progresses = progressData?.progress || []

  // Calculate piscine statistics
  const totalXP = transactions.reduce((sum, t) => sum + (t.amount || 0), 0)
  const projectStats = calculateProjectStats(progresses)
  const recentTransactions = transactions.slice(0, 10)

  return (
    <div className="space-y-6">
      {/* Piscine Overview Cards */}
      <PiscineStats
        piscineType={piscineType}
        totalXP={totalXP}
        projectStats={projectStats}
      />

      {/* Recent Piscine XP Gains */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary-400" />
          Recent Piscine {piscineType.toUpperCase()} XP Gains
        </h3>
        <div className="space-y-3">
          {recentTransactions.map((transaction: any, index: number) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <div>
                  <p className="text-white font-medium">{transaction.object?.name || 'Unknown Project'}</p>
                  <p className="text-white/60 text-sm">
                    Piscine {piscineType.toUpperCase()} • {getRelativeTime(transaction.createdAt)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-primary-400 font-bold">+{formatModuleXP(transaction.amount)}</p>
                <p className="text-white/50 text-xs">{transaction.object?.type || 'project'}</p>
              </div>
            </motion.div>
          ))}
          {recentTransactions.length === 0 && (
            <div className="text-center text-white/60 py-4">
              <p>No recent Piscine {piscineType.toUpperCase()} XP gains</p>
            </div>
          )}
        </div>
      </Card>

      {/* Project Progress */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-primary-400" />
          Piscine {piscineType.toUpperCase()} Project Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-white">{projectStats.total}</p>
            <p className="text-white/60 text-sm">Total Projects</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{projectStats.passed}</p>
            <p className="text-white/60 text-sm">Passed</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{projectStats.failed}</p>
            <p className="text-white/60 text-sm">Failed</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${projectStats.passRate}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="text-center text-white/60 text-sm mt-2">
          {projectStats.passRate}% Success Rate
        </div>
      </Card>
    </div>
  )
}

export default PiscineSection
