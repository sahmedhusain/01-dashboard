import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Award, Target } from 'lucide-react'
import { useQuery, gql } from '@apollo/client'
import { GET_ALL_TRANSACTIONS, GET_ALL_PROGRESS } from '../../graphql/allQueries'
import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import {
  formatXPValue,
  calculateProjectStats,
  getRelativeTime,
  formatGrade,
  formatGradeDetailed
} from '../../utils/dataFormatting'
import PiscineStats from './PiscineStats'

interface PiscineSectionProps {
  user: User
  piscineType: string 
}

const PiscineSection: React.FC<PiscineSectionProps> = ({ user, piscineType }) => {
  
  const piscinePathPattern = piscineType === 'go' 
    ? '/bahrain/bh-piscine/%' 
    : `/bahrain/bh-module/piscine-${piscineType}/%`

  
  const { data: xpData, loading: xpLoading } = useQuery(gql`
    query GetPiscineXPTransactions($userId: Int!, $pathPattern: String!) {
      transaction(
        where: {
          userId: { _eq: $userId }
          type: { _eq: "xp" }
          path: { _like: $pathPattern }
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
      pathPattern: piscinePathPattern
    },
    errorPolicy: 'all'
  })

  
  const { data: progressData, loading: progressLoading } = useQuery(gql`
    query GetPiscineProgress($userId: Int!, $pathPattern: String!) {
      progress(
        where: {
          userId: { _eq: $userId }
          path: { _like: $pathPattern }
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
      }
    }
  `, {
    variables: { 
      userId: user.id,
      pathPattern: piscinePathPattern
    },
    errorPolicy: 'all'
  })

  if (xpLoading || progressLoading) return <LoadingSpinner />

  const transactions = xpData?.transaction || []
  const progresses = progressData?.progress || []

  
  const totalXP = transactions.reduce((sum, t) => sum + (t.amount || 0), 0)
  const projectStats = calculateProjectStats(progresses)
  const recentTransactions = transactions.slice(0, 10)
  
  
  const completedProjects = progresses.filter(p => p.isDone).length
  const totalProjects = progresses.length
  const averageGrade = progresses.filter(p => p.grade)
    .reduce((sum, p) => sum + p.grade, 0) / progresses.filter(p => p.grade).length || 0
  const recentProgress = progresses.slice(0, 5)
  
  
  const filteredTransactions = transactions.filter(t => {
    if (piscineType === 'go') {
      return t.path.includes('/bahrain/bh-piscine/')
    } else {
      return t.path.includes(`/bahrain/bh-module/piscine-${piscineType}/`)
    }
  })
  
  const filteredProgresses = progresses.filter(p => {
    if (piscineType === 'go') {
      return p.path.includes('/bahrain/bh-piscine/')
    } else {
      return p.path.includes(`/bahrain/bh-module/piscine-${piscineType}/`)
    }
  })

  return (
    <div className="h-full w-full p-6 space-y-6 overflow-y-auto">
      {/* Piscine Overview Cards */}
      <PiscineStats
        piscineType={piscineType}
        totalXP={totalXP}
        projectStats={projectStats}
      />

      {/* Enhanced Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Piscine XP Gains */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary-400" />
            Recent XP Gains
          </h3>
          <div className="space-y-3">
            {filteredTransactions.slice(0, 5).map((transaction: any, index: number) => (
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
                    <p className="text-white font-medium text-sm">
                      {transaction.object?.name || transaction.path.split('/').pop() || 'Project'}
                    </p>
                    <p className="text-white/60 text-xs">
                      {getRelativeTime(transaction.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-primary-400 font-bold text-sm">+{formatXPValue(transaction.amount)}</p>
                </div>
              </motion.div>
            ))}
            {filteredTransactions.length === 0 && (
              <div className="text-center text-white/60 py-4">
                <p className="text-sm">No XP gains found for this piscine</p>
              </div>
            )}
          </div>
        </Card>

        {/* Recent Progress Updates */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-400" />
            Recent Progress
          </h3>
          <div className="space-y-3">
            {filteredProgresses.slice(0, 5).map((progress: any, index: number) => (
              <motion.div
                key={progress.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${progress.isDone ? 'bg-green-400' : 'bg-yellow-400'}`} />
                  <div>
                    <p className="text-white font-medium text-sm">
                      {progress.path.split('/').pop() || 'Project'}
                    </p>
                    <p className="text-white/60 text-xs">
                      {getRelativeTime(progress.updatedAt)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    progress.isDone ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {progress.isDone ? 'Completed' : 'In Progress'}
                  </span>
                  {progress.grade && (
                    <p className="text-white/60 text-xs mt-1">Grade: {formatGradeDetailed(progress.grade)}</p>
                  )}
                </div>
              </motion.div>
            ))}
            {filteredProgresses.length === 0 && (
              <div className="text-center text-white/60 py-4">
                <p className="text-sm">No progress found for this piscine</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Enhanced Project Progress Overview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-primary-400" />
          Piscine {piscineType.toUpperCase()} Progress Overview
        </h3>
        
        {/* Enhanced Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-white">{filteredProgresses.length}</p>
            <p className="text-white/60 text-sm">Total Projects</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{filteredProgresses.filter(p => p.isDone).length}</p>
            <p className="text-white/60 text-sm">Completed</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">{formatXPValue(filteredTransactions.reduce((sum, t) => sum + t.amount, 0))}</p>
            <p className="text-white/60 text-sm">Total XP</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">
              {filteredProgresses.filter(p => p.grade).length > 0 ? 
                formatGradeDetailed(filteredProgresses.filter(p => p.grade).reduce((sum, p) => sum + p.grade, 0) / filteredProgresses.filter(p => p.grade).length) : 
                '0%'
              }
            </p>
            <p className="text-white/60 text-sm">Avg Grade</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-white/60 mb-2">
            <span>Completion Progress</span>
            <span>
              {filteredProgresses.length > 0 ? 
                ((filteredProgresses.filter(p => p.isDone).length / filteredProgresses.length) * 100).toFixed(1) : 0
              }%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${filteredProgresses.length > 0 ? 
                  (filteredProgresses.filter(p => p.isDone).length / filteredProgresses.length) * 100 : 0
                }%` 
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Activity Summary */}
        <div className="text-center text-white/60 text-sm">
          {filteredTransactions.length} XP transactions • {filteredProgresses.length} projects tracked
        </div>
      </Card>
    </div>
  )
}

export default PiscineSection
