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
    <div className="bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 h-full w-full relative">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 35px 35px, rgba(52, 211, 153, 0.1) 2px, transparent 0)`,
          backgroundSize: '70px 70px'
        }}></div>
      </div>
      <div className="relative z-10 h-full w-full overflow-y-auto custom-scrollbar">
        <div className="relative space-y-8 p-6">
          {/* Enhanced Header */}
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
              <BookOpen className="w-12 h-12 text-emerald-400 drop-shadow-lg relative z-10" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent mb-4">
                Piscine {piscineType.toUpperCase()}
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Your intensive <span className="text-emerald-400 font-semibold">coding bootcamp</span> journey and progress
              </p>
            </motion.div>
          </motion.div>

          {/* Piscine Overview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PiscineStats
              piscineType={piscineType}
              totalXP={totalXP}
              projectStats={projectStats}
            />
          </motion.div>

          {/* Enhanced Statistics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Recent Piscine XP Gains */}
            <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm border border-emerald-400/20">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">Recent XP Gains</span>
              </h3>
              <div className="space-y-3">
                {filteredTransactions.slice(0, 5).map((transaction: any, index: number) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-xl border border-emerald-400/10 hover:border-emerald-400/30 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-lg shadow-emerald-400/30" />
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
                      <p className="text-emerald-400 font-bold text-sm drop-shadow-sm">+{formatXPValue(transaction.amount)}</p>
                    </div>
                  </motion.div>
                ))}
                {filteredTransactions.length === 0 && (
                  <div className="text-center text-white/60 py-4">
                    <p className="text-sm">No XP gains found for this piscine</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Progress Updates */}
            <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-teal-400/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-teal-500/10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm border border-teal-400/20">
                  <Target className="w-4 h-4 text-teal-400" />
                </div>
                <span className="bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">Recent Progress</span>
              </h3>
              <div className="space-y-3">
                {filteredProgresses.slice(0, 5).map((progress: any, index: number) => (
                  <motion.div
                    key={progress.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-teal-500/5 to-cyan-500/5 rounded-xl border border-teal-400/10 hover:border-teal-400/30 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full shadow-lg ${
                        progress.isDone 
                          ? 'bg-gradient-to-r from-emerald-400 to-green-400 shadow-emerald-400/30' 
                          : 'bg-gradient-to-r from-yellow-400 to-orange-400 shadow-yellow-400/30'
                      }`} />
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
                      <span className={`px-3 py-1.5 text-xs rounded-full font-semibold backdrop-blur-sm border ${
                        progress.isDone 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' 
                          : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
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
            </div>
          </motion.div>

          {/* Enhanced Project Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10"
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm border border-emerald-400/20">
                <Award className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                Piscine {piscineType.toUpperCase()} Progress Overview
              </span>
            </h3>
            
            {/* Enhanced Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-4 text-center border border-emerald-400/20 backdrop-blur-sm hover:bg-emerald-500/15 hover:border-emerald-400/40 transition-all duration-300"
              >
                <p className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">{filteredProgresses.length}</p>
                <p className="text-white/70 text-sm font-medium mt-1">Total Projects</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-xl p-4 text-center border border-teal-400/20 backdrop-blur-sm hover:bg-teal-500/15 hover:border-teal-400/40 transition-all duration-300"
              >
                <p className="text-3xl font-bold text-teal-400 drop-shadow-sm">{filteredProgresses.filter(p => p.isDone).length}</p>
                <p className="text-white/70 text-sm font-medium mt-1">Completed</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-4 text-center border border-cyan-400/20 backdrop-blur-sm hover:bg-cyan-500/15 hover:border-cyan-400/40 transition-all duration-300"
              >
                <p className="text-3xl font-bold text-cyan-400 drop-shadow-sm">{formatXPValue(filteredTransactions.reduce((sum, t) => sum + t.amount, 0))}</p>
                <p className="text-white/70 text-sm font-medium mt-1">Total XP</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 text-center border border-green-400/20 backdrop-blur-sm hover:bg-green-500/15 hover:border-green-400/40 transition-all duration-300"
              >
                <p className="text-3xl font-bold text-green-400 drop-shadow-sm">
                  {filteredProgresses.filter(p => p.grade).length > 0 ? 
                    formatGradeDetailed(filteredProgresses.filter(p => p.grade).reduce((sum, p) => sum + p.grade, 0) / filteredProgresses.filter(p => p.grade).length) : 
                    '0%'
                  }
                </p>
                <p className="text-white/70 text-sm font-medium mt-1">Avg Grade</p>
              </motion.div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-white/70 mb-3">
                <span className="font-medium">Completion Progress</span>
                <span className="font-bold text-emerald-400">
                  {filteredProgresses.length > 0 ? 
                    ((filteredProgresses.filter(p => p.isDone).length / filteredProgresses.length) * 100).toFixed(1) : 0
                  }%
                </span>
              </div>
              <div className="w-full bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-full h-4 border border-white/10 shadow-inner">
                <motion.div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-4 rounded-full shadow-lg shadow-emerald-500/30 relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${filteredProgresses.length > 0 ? 
                      (filteredProgresses.filter(p => p.isDone).length / filteredProgresses.length) * 100 : 0
                    }%` 
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                </motion.div>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl px-6 py-3 border border-emerald-400/20 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="text-white/70 text-sm font-medium">{filteredTransactions.length} XP transactions</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                  <span className="text-white/70 text-sm font-medium">{filteredProgresses.length} projects tracked</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PiscineSection