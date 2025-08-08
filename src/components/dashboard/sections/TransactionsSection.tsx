import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { defaultTransition, createAdaptiveTransition } from '../../../config/motion'
import { 
  Activity, Zap, Trophy, Code,
  Clock, CheckCircle, AlertTriangle, Search,
  ArrowUp, ArrowDown, TrendingUp, Star
} from 'lucide-react'

const calculateAverageGrade = (progressData: any[]) => {
  const completedProjects = progressData.filter((p: any) => p.isDone && p.grade !== undefined && p.grade !== null);
  if (completedProjects.length === 0) {
    return null;
  }
  const totalGrade = completedProjects.reduce((sum: number, p: any) => sum + p.grade, 0);
  return totalGrade / completedProjects.length;
};

import { formatXPValue, formatDate } from '../../../utils/dataFormatting'

interface TransactionsSectionProps {
  analytics: any
}

type TransactionFilter = 'all' | 'xp' | 'level' | 'skill' | 'up' | 'down'
type TimeFilter = 'all' | 'week' | 'month' | 'quarter' | 'year'

const TransactionsSection: React.FC<TransactionsSectionProps> = ({ analytics }) => {
  const [transactionFilter, setTransactionFilter] = useState<TransactionFilter>('all')
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showOnlyBHModule, setShowOnlyBHModule] = useState(false)

  
  const getSkillProgress = (currentTransaction: any, allTransactions: any[]) => {
    const skillType = currentTransaction.type
    const currentDate = new Date(currentTransaction.createdAt)
    
    
    const previousTransaction = allTransactions
      .filter(t => t.type === skillType && new Date(t.createdAt) < currentDate)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    
    if (previousTransaction) {
      return currentTransaction.amount - previousTransaction.amount
    }
    
    
    return currentTransaction.amount
  }

  
  const filteredTransactions = useMemo(() => {
    let transactions = analytics.rawData.transactions

    
    if (showOnlyBHModule) {
      transactions = transactions.filter((t: any) => 
        t.path && t.path.includes('/bahrain/bh-module')
      )
    }

    
    if (transactionFilter !== 'all') {
      if (transactionFilter === 'skill') {
        transactions = transactions.filter((t: any) => t.type?.startsWith('skill_'))
      } else {
        transactions = transactions.filter((t: any) => t.type === transactionFilter)
      }
    }

    
    if (timeFilter !== 'all') {
      const now = new Date()
      let filterDate = new Date()
      
      switch (timeFilter) {
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setMonth(now.getMonth() - 1)
          break
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3)
          break
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1)
          break
      }
      
      transactions = transactions.filter((t: any) => new Date(t.createdAt) >= filterDate)
    }

    
    if (searchTerm) {
      transactions = transactions.filter((t: any) => 
        t.path?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.type?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    
    const transactionsWithProgress = transactions.map((transaction: any) => {
      if (transaction.type?.startsWith('skill_')) {
        const skillProgress = getSkillProgress(transaction, analytics.rawData.transactions)
        return {
          ...transaction,
          skillProgress
        }
      }
      return transaction
    })

    return transactionsWithProgress 
  }, [analytics.rawData.transactions, transactionFilter, timeFilter, searchTerm, showOnlyBHModule])

  
  const averageGrade = useMemo(() => {
    return calculateAverageGrade(analytics.rawData.progress);
  }, [analytics.rawData.progress]);

  const filteredProgress = useMemo(() => {
    let progress = analytics.rawData.progress

    if (showOnlyBHModule) {
      progress = progress.filter((p: any) => 
        p.path && p.path.includes('/bahrain/bh-module')
      )
    }

    if (timeFilter !== 'all') {
      const now = new Date()
      let filterDate = new Date()
      
      switch (timeFilter) {
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setMonth(now.getMonth() - 1)
          break
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3)
          break
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1)
          break
      }
      
      progress = progress.filter((p: any) => new Date(p.updatedAt) >= filterDate)
    }

    if (searchTerm) {
      progress = progress.filter((p: any) => 
        p.path?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Group by path and show only the best attempt for each project
    const projectGroups: { [path: string]: any[] } = {};
    
    progress.forEach((p: any) => {
      if (!projectGroups[p.path]) {
        projectGroups[p.path] = [];
      }
      projectGroups[p.path].push(p);
    });

    // For each project, if there's a passed attempt (grade >= 1), show only that
    // Otherwise show the latest attempt
    const consolidatedProgress = Object.keys(projectGroups).map(path => {
      const attempts = projectGroups[path];
      
      // Find passed attempts (grade >= 1 and isDone)
      const passedAttempts = attempts.filter((p: any) => p.isDone && p.grade >= 1);
      
      if (passedAttempts.length > 0) {
        // Show the latest passed attempt
        return passedAttempts.sort((a: any, b: any) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )[0];
      } else {
        // Show the latest attempt (failed or in progress)
        return attempts.sort((a: any, b: any) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )[0];
      }
    });

    return consolidatedProgress
  }, [analytics.rawData.progress, timeFilter, searchTerm, showOnlyBHModule])

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'xp':
        return <Zap className="h-4 w-4 text-blue-400" />
      case 'level':
        return <Trophy className="h-4 w-4 text-yellow-400" />
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-400" />
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-400" />
      default:
        if (type?.startsWith('skill_')) {
          return <Code className="h-4 w-4 text-purple-400" />
        }
        return <Activity className="h-4 w-4 text-white/60" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'xp':
        return 'text-blue-400'
      case 'level':
        return 'text-yellow-400'
      case 'up':
        return 'text-green-400'
      case 'down':
        return 'text-red-400'
      default:
        if (type?.startsWith('skill_')) {
          return 'text-purple-400'
        }
        return 'text-white/60'
    }
  }

  const formatTransactionAmount = (type: string, amount: number, transaction?: any) => {
    switch (type) {
      case 'xp':
      case 'up':
        return `+${formatXPValue(amount)}`
      case 'down':
        return `-${formatXPValue(amount)}`
      case 'level':
        return `Level ${amount}`
      default:
        if (type?.startsWith('skill_')) {
          
          if (transaction && transaction.skillProgress !== undefined) {
            return transaction.skillProgress > 0 ? 
              `+${transaction.skillProgress}%` : 
              `${transaction.skillProgress}%`
          }
          return `${amount}%`
        }
        return `${amount}`
    }
  }

  return (
    <div className="space-y-6">
      {/* Transactions Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Transaction History</h2>
        <p className="text-white/70">Detailed activity log and progress records</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
          {/* Search */}
          <div>
            <label className="text-white/70 text-sm mb-2 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Transaction Type Filter */}
          <div>
            <label className="text-white/70 text-sm mb-2 block">Type</label>
            <select
              value={transactionFilter}
              onChange={(e) => setTransactionFilter(e.target.value as TransactionFilter)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              <option value="xp">XP Transactions</option>
              <option value="level">Level Ups</option>
              <option value="skill">Skills</option>
              <option value="up">Audit Given</option>
              <option value="down">Audit Received</option>
            </select>
          </div>

          {/* Time Filter */}
          <div>
            <label className="text-white/70 text-sm mb-2 block">Time Period</label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>

          {/* Module Filter Toggle */}
          <div>
            <label className="text-white/70 text-sm mb-2 block">Module</label>
            <button
              onClick={() => setShowOnlyBHModule(!showOnlyBHModule)}
              className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                showOnlyBHModule
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
{showOnlyBHModule ? 'Main Module' : 'All Modules'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Transaction Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {/* Total Transactions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/30 to-cyan-500/30 backdrop-blur-sm">
              <Activity className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{filteredTransactions.length.toLocaleString()}</div>
          <div className="text-white/70 text-sm">Total Transactions</div>
          <div className="text-blue-300/60 text-xs mt-1">All activity records</div>
        </motion.div>

        {/* Tasks Completed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-emerald-900/20 to-green-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/30 to-green-500/30 backdrop-blur-sm">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{filteredProgress.filter((p: any) => p.isDone && p.grade >= 1).length}</div>
          <div className="text-white/70 text-sm">Tasks Completed</div>
          <div className="text-emerald-300/60 text-xs mt-1">Successfully finished</div>
        </motion.div>

        {/* Tasks Failed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-br from-red-900/20 to-rose-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-red-500/30 to-rose-500/30 backdrop-blur-sm">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{filteredProgress.filter((p: any) => p.isDone && p.grade < 1).length}</div>
          <div className="text-white/70 text-sm">Tasks Failed</div>
          <div className="text-red-300/60 text-xs mt-1">Need retry or review</div>
        </motion.div>

        {/* Tasks In Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-br from-yellow-900/20 to-amber-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500/30 to-amber-500/30 backdrop-blur-sm">
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{filteredProgress.filter((p: any) => !p.isDone).length}</div>
          <div className="text-white/70 text-sm">Tasks In Progress</div>
          <div className="text-yellow-300/60 text-xs mt-1">Currently working on</div>
        </motion.div>

        {/* Average Grade */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-gradient-to-br from-purple-900/20 to-violet-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/30 to-violet-500/30 backdrop-blur-sm">
              <Star className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{averageGrade !== null ? `${(averageGrade*100).toFixed(1)}%` : 'N/A'}</div>
          <div className="text-white/70 text-sm">Average Grade</div>
          <div className="text-purple-300/60 text-xs mt-1">
            {averageGrade !== null ? 
              (averageGrade >= 0.8 ? 'Excellent performance' : 
               averageGrade >= 0.6 ? 'Good performance' : 
               'Room for improvement') : 
              'No completed tasks'}
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-400" />
            Transactions ({filteredTransactions.length})
          </h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredTransactions.map((transaction: any) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-white/10">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm capitalize">
                      {transaction.type?.startsWith('skill_') ? 
                        `Skill: ${transaction.type.replace('skill_', '').replace(/-/g, ' ')}` : 
                        transaction.type === 'up' ? 'Audit Given' :
                        transaction.type === 'down' ? 'Audit Received' :
                        transaction.type?.replace('_', ' ') || 'Unknown'
                      }
                    </div>
                    <div className="text-white/60 text-xs">
                      {transaction.path?.split('/').pop() || 'System'}
                    </div>
                    <div className="text-white/40 text-xs">
                      {formatDate(transaction.createdAt)}
                    </div>
                  </div>
                </div>
                <div className={`text-right font-bold ${getTransactionColor(transaction.type)}`}>
                  {formatTransactionAmount(transaction.type, transaction.amount, transaction)}
                </div>
              </motion.div>
            ))}
            
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-white/30 mx-auto mb-3" />
                <p className="text-white/60 text-sm">No transactions found matching filters</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Progress History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
            Task Progress ({filteredProgress.length})
          </h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredProgress.map((progress: any) => (
              <motion.div
                key={progress.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-white/10">
                    {progress.isDone ? 
                      (progress.grade === 0 ? 
                        <AlertTriangle className="h-4 w-4 text-red-400" /> : 
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : 
                      <Clock className="h-4 w-4 text-yellow-400" />
                    }
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">
                      {progress.path?.split('/').pop() || 'Project'}
                    </div>
                    <div className="text-white/60 text-xs">
                      {progress.isDone ? (progress.grade === 0 ? 'Failed' : 'Completed') : 'In Progress'}
                    </div>
                    <div className="text-white/40 text-xs">
                      {formatDate(progress.updatedAt)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${
                    progress.isDone ? 
                      (progress.grade >= 1 ? 'text-green-400' : 'text-red-400') : 
                      'text-yellow-400'
                  }`}>
                    {progress.isDone ? `${(progress.grade*100).toFixed(1)}%` : 'Pending'}
                  </div>
                  <div className="text-white/60 text-xs">Grade</div>
                </div>
              </motion.div>
            ))}
            
            {filteredProgress.length === 0 && (
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-white/30 mx-auto mb-3" />
                <p className="text-white/60 text-sm">No progress records found</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TransactionsSection