import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, Zap, Trophy, Code, Target, Users, Calendar, 
  Clock, CheckCircle, AlertTriangle, Search, Filter, 
  ArrowUp, ArrowDown, TrendingUp, Star
} from 'lucide-react'
import { formatXPValue, formatDate, separateModuleData } from '../../../utils/dataFormatting'

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

  // Helper function to calculate skill progress for a transaction
  const getSkillProgress = (currentTransaction: any, allTransactions: any[]) => {
    const skillType = currentTransaction.type
    const currentDate = new Date(currentTransaction.createdAt)
    
    // Find the previous transaction of the same skill type
    const previousTransaction = allTransactions
      .filter(t => t.type === skillType && new Date(t.createdAt) < currentDate)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    
    if (previousTransaction) {
      return currentTransaction.amount - previousTransaction.amount
    }
    
    // If no previous transaction, this is the first one, so show full amount as progress
    return currentTransaction.amount
  }

  // Process raw transaction data with skill progress calculation
  const filteredTransactions = useMemo(() => {
    let transactions = analytics.rawData.transactions

    // Filter by BH Module if selected
    if (showOnlyBHModule) {
      const separated = separateModuleData(transactions)
      transactions = separated.mainModule
    }

    // Filter by transaction type
    if (transactionFilter !== 'all') {
      if (transactionFilter === 'skill') {
        transactions = transactions.filter((t: any) => t.type?.startsWith('skill_'))
      } else {
        transactions = transactions.filter((t: any) => t.type === transactionFilter)
      }
    }

    // Filter by time period
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

    // Filter by search term
    if (searchTerm) {
      transactions = transactions.filter((t: any) => 
        t.path?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.type?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Calculate skill progress for each transaction
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

    return transactionsWithProgress.slice(0, 100) // Limit to 100 for performance
  }, [analytics.rawData.transactions, transactionFilter, timeFilter, searchTerm, showOnlyBHModule])

  // Process progress data
  const filteredProgress = useMemo(() => {
    let progress = analytics.rawData.progress

    if (showOnlyBHModule) {
      const separated = separateModuleData(progress)
      progress = separated.mainModule
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

    return progress.slice(0, 50)
  }, [analytics.rawData.progress, timeFilter, searchTerm, showOnlyBHModule])

  // Process audit data
  const filteredAudits = useMemo(() => {
    let audits = analytics.rawData.audits

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
      
      audits = audits.filter((a: any) => new Date(a.createdAt) >= filterDate)
    }

    return audits.slice(0, 50)
  }, [analytics.rawData.audits, timeFilter])

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
          // For skills, show the progress difference
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
              {showOnlyBHModule ? 'BH Module Only' : 'All Modules'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Transaction Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
          <Activity className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{filteredTransactions.length}</div>
          <div className="text-white/70 text-sm">Transactions</div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
          <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{filteredProgress.filter((p: any) => p.isDone).length}</div>
          <div className="text-white/70 text-sm">Completed</div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
          <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{filteredProgress.filter((p: any) => !p.isDone).length}</div>
          <div className="text-white/70 text-sm">In Progress</div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
          <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{filteredAudits.length}</div>
          <div className="text-white/70 text-sm">Audits</div>
        </div>
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
            Recent Transactions ({filteredTransactions.length})
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
            Project Progress ({filteredProgress.length})
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
                      <CheckCircle className="h-4 w-4 text-green-400" /> : 
                      <Clock className="h-4 w-4 text-yellow-400" />
                    }
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">
                      {progress.path?.split('/').pop() || 'Project'}
                    </div>
                    <div className="text-white/60 text-xs">
                      {progress.isDone ? 'Completed' : 'In Progress'}
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
                    {progress.isDone ? `${progress.grade}%` : '...'}
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

      {/* Audit History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-purple-400" />
          Audit History ({filteredAudits.length})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAudits.map((audit: any) => (
            <motion.div
              key={audit.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span className={`text-sm font-bold ${
                  audit.grade !== null ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {audit.grade !== null ? `${audit.grade.toFixed(2)}` : 'Pending'}
                </span>
              </div>
              
              <div className="text-white font-medium text-sm mb-1">
                Audit #{audit.id}
              </div>
              <div className="text-white/60 text-xs mb-2">
                Group: {audit.groupId}
              </div>
              <div className="text-white/40 text-xs">
                {formatDate(audit.createdAt)}
              </div>
              
              {audit.endAt && (
                <div className="text-white/40 text-xs mt-1">
                  Completed: {formatDate(audit.endAt)}
                </div>
              )}
            </motion.div>
          ))}
          
          {filteredAudits.length === 0 && (
            <div className="col-span-full text-center py-8">
              <Target className="w-12 h-12 text-white/30 mx-auto mb-3" />
              <p className="text-white/60 text-sm">No audit records found</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default TransactionsSection