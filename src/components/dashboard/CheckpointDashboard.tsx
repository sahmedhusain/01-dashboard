import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Target, TrendingUp, Award } from 'lucide-react'
import { useQuery, gql } from '@apollo/client'
import { GET_ALL_USERS } from '../../graphql/allQueries'
import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import SectionHeader from '../ui/SectionHeader'
import {
  formatXPValue,
  separateModuleData,
  calculateModuleXPTotals,
  getRelativeTime,
  formatGradeDetailed
} from '../../utils/dataFormatting'

interface CheckpointDashboardProps {
  user: User
}

const CheckpointDashboard: React.FC<CheckpointDashboardProps> = ({ user }) => {
  const [activeCheckpointTab, setActiveCheckpointTab] = useState<string>('main')

  // Query enhanced checkpoint data including transactions, progress, and results
  const { data: checkpointXPData, loading: xpLoading, error: xpError } = useQuery(gql`
    query GetCheckpointXP($userId: Int!) {
      transaction(
        where: {
          userId: { _eq: $userId }
          type: { _eq: "xp" }
          path: { _like: "%checkpoint%" }
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
    variables: { userId: user.id },
    errorPolicy: 'all'
  })

  // Query checkpoint progress data
  const { data: checkpointProgressData, loading: progressLoading } = useQuery(gql`
    query GetCheckpointProgress($userId: Int!) {
      progress(
        where: {
          userId: { _eq: $userId }
          path: { _like: "%checkpoint%" }
        }
        order_by: { updatedAt: desc }
      ) {
        id
        grade
        isDone
        path
        createdAt
        updatedAt
        version
      }
    }
  `, {
    variables: { userId: user.id },
    errorPolicy: 'all'
  })

  // Query checkpoint results data
  const { data: checkpointResultsData, loading: resultsLoading } = useQuery(gql`
    query GetCheckpointResults($userId: Int!) {
      result(
        where: {
          userId: { _eq: $userId }
          path: { _like: "%checkpoint%" }
        }
        order_by: { updatedAt: desc }
      ) {
        id
        grade
        path
        createdAt
        updatedAt
        type
        object {
          name
          type
        }
      }
    }
  `, {
    variables: { userId: user.id },
    errorPolicy: 'all'
  })

  if (xpLoading || progressLoading || resultsLoading) return <LoadingSpinner />

  if (xpError) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-400">
          <p>Error loading checkpoint data</p>
          <p className="text-sm text-white/60 mt-2">{xpError.message}</p>
        </div>
      </Card>
    )
  }

  // Process complete checkpoint data
  const checkpointTransactions = checkpointXPData?.transaction || []
  const checkpointProgress = checkpointProgressData?.progress || []
  const checkpointResults = checkpointResultsData?.result || []
  
  // Categorize checkpoints by type based on path analysis
  const categorizeCheckpoints = (data: any[]) => {
    const categories = {
      main: data.filter(item => 
        item.path.includes('/bahrain/bh-module/') && 
        item.path.includes('/checkpoint/') &&
        !item.path.includes('/piscine-')
      ),
      goPiscine: data.filter(item => 
        item.path.includes('/bahrain/bh-piscine/checkpoint-')
      ),
      otherPiscines: data.filter(item => 
        item.path.includes('/bahrain/bh-module/piscine-') && 
        item.path.includes('/checkpoint/')
      )
    }
    return categories
  }
  
  const xpCategories = categorizeCheckpoints(checkpointTransactions)
  const progressCategories = categorizeCheckpoints(checkpointProgress)
  const resultCategories = categorizeCheckpoints(checkpointResults)
  
  // Calculate aggregates for each category
  const calculateAggregates = (transactions: any[]) => {
    const count = transactions.length
    const totalXP = transactions.reduce((sum, t) => sum + (t.amount || 0), 0)
    const avgXP = count > 0 ? totalXP / count : 0
    return { count, sum: { amount: totalXP }, avg: { amount: avgXP } }
  }
  
  const mainCheckpointAggregate = calculateAggregates(xpCategories.main)
  const goPiscineCheckpointAggregate = calculateAggregates(xpCategories.goPiscine)
  const otherPiscineCheckpointAggregate = calculateAggregates(xpCategories.otherPiscines)
  
  // Analyze progress statistics
  const analyzeProgress = (progress: any[]) => {
    const completed = progress.filter(p => p.isDone).length
    const total = progress.length
    const averageGrade = progress
      .filter(p => p.grade !== null)
      .reduce((sum, p) => sum + p.grade, 0) / progress.filter(p => p.grade !== null).length || 0
    
    return {
      completed,
      total,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      averageGrade: isNaN(averageGrade) ? 0 : averageGrade
    }
  }
  
  const mainProgressStats = analyzeProgress(progressCategories.main)
  const goPiscineProgressStats = analyzeProgress(progressCategories.goPiscine)
  const otherPiscineProgressStats = analyzeProgress(progressCategories.otherPiscines)

  // Detect available checkpoint types
  const availableCheckpointTypes = []
  if (xpCategories.main.length > 0 || progressCategories.main.length > 0) availableCheckpointTypes.push('main')
  if (xpCategories.goPiscine.length > 0 || progressCategories.goPiscine.length > 0) availableCheckpointTypes.push('go')
  if (xpCategories.otherPiscines.length > 0 || progressCategories.otherPiscines.length > 0) availableCheckpointTypes.push('piscines')

  // Detect specific piscine checkpoint types
  const detectPiscineCheckpointTypes = (checkpoints: any[]) => {
    const piscineSet = new Set<string>()
    
    checkpoints.forEach(checkpoint => {
      const path = checkpoint.path
      const piscineMatch = path.match(/\/bahrain\/bh-module\/piscine-([^\/]+)\/checkpoint\//)
      if (piscineMatch) {
        piscineSet.add(piscineMatch[1])
      }
    })
    
    return Array.from(piscineSet)
  }

  const piscineCheckpointTypes = detectPiscineCheckpointTypes(xpCategories.otherPiscines)

  if (availableCheckpointTypes.length === 0) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Checkpoints Dashboard
          </h1>
          <p className="text-white/70 text-lg">
            Your checkpoint progress and achievements
          </p>
        </motion.div>

        <Card className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="w-16 h-16 text-white/30" />
            <h3 className="text-xl font-semibold text-white">No Checkpoints Found</h3>
            <p className="text-white/60">
              You haven't completed any checkpoints yet. Checkpoints will appear here once you start completing them.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <SectionHeader
        title="Checkpoints Dashboard"
        subtitle="Your checkpoint progress and achievements"
        icon={Target}
      />

      {/* Checkpoint Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Module Checkpoints */}
        {(xpCategories.main.length > 0 || progressCategories.main.length > 0) && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Target className="w-6 h-6 text-primary-400 mr-3" />
                <h3 className="text-lg font-semibold text-white">Main Module</h3>
              </div>
              <span className="text-2xl font-bold text-primary-400">
                {mainCheckpointAggregate?.count || 0}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-white/60 text-sm">Total XP</div>
                <div className="text-xl font-bold text-white">
                  {formatXPValue(mainCheckpointAggregate?.sum?.amount || 0)}
                </div>
              </div>
              <div>
                <div className="text-white/60 text-sm">Progress</div>
                <div className="text-xl font-bold text-green-400">
                  {mainProgressStats.completed}/{mainProgressStats.total}
                </div>
                <div className="text-xs text-white/60">
                  {mainProgressStats.completionRate.toFixed(1)}% complete
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Go Piscine Checkpoints */}
        {(xpCategories.goPiscine.length > 0 || progressCategories.goPiscine.length > 0) && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                <h3 className="text-lg font-semibold text-white">Go Piscine</h3>
              </div>
              <span className="text-2xl font-bold text-green-400">
                {goPiscineCheckpointAggregate?.count || 0}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-white/60 text-sm">Total XP</div>
                <div className="text-xl font-bold text-white">
                  {formatXPValue(goPiscineCheckpointAggregate?.sum?.amount || 0)}
                </div>
              </div>
              <div>
                <div className="text-white/60 text-sm">Progress</div>
                <div className="text-xl font-bold text-green-400">
                  {goPiscineProgressStats.completed}/{goPiscineProgressStats.total}
                </div>
                <div className="text-xs text-white/60">
                  {goPiscineProgressStats.completionRate.toFixed(1)}% complete
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Other Piscine Checkpoints */}
        {(xpCategories.otherPiscines.length > 0 || progressCategories.otherPiscines.length > 0) && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Award className="w-6 h-6 text-yellow-400 mr-3" />
                <h3 className="text-lg font-semibold text-white">Other Piscines</h3>
              </div>
              <span className="text-2xl font-bold text-yellow-400">
                {otherPiscineCheckpointAggregate?.count || 0}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-white/60 text-sm">Total XP</div>
                <div className="text-xl font-bold text-white">
                  {formatXPValue(otherPiscineCheckpointAggregate?.sum?.amount || 0)}
                </div>
                {piscineCheckpointTypes.length > 0 && (
                  <div className="text-white/60 text-sm mt-1">
                    Types: {piscineCheckpointTypes.join(', ')}
                  </div>
                )}
              </div>
              <div>
                <div className="text-white/60 text-sm">Progress</div>
                <div className="text-xl font-bold text-yellow-400">
                  {otherPiscineProgressStats.completed}/{otherPiscineProgressStats.total}
                </div>
                <div className="text-xs text-white/60">
                  {otherPiscineProgressStats.completionRate.toFixed(1)}% complete
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Checkpoint Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <nav className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {availableCheckpointTypes.map((type) => (
              <motion.button
                key={type}
                onClick={() => setActiveCheckpointTab(type)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeCheckpointTab === type
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {type === 'main' ? 'Main Module' : 
                 type === 'go' ? 'Go Piscine' : 
                 'Other Piscines'}
              </motion.button>
            ))}
          </div>
        </nav>
      </motion.div>

      {/* Active Checkpoint Content */}
      <motion.div
        key={activeCheckpointTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6">
            {activeCheckpointTab === 'main' ? 'Main Module Checkpoints' :
             activeCheckpointTab === 'go' ? 'Go Piscine Checkpoints' :
             'Other Piscine Checkpoints'}
          </h3>
          
          {/* Checkpoint List with Progress and XP Data */}
          <div className="space-y-4">
            {(() => {
              const currentXPData = activeCheckpointTab === 'main' ? xpCategories.main :
                                   activeCheckpointTab === 'go' ? xpCategories.goPiscine :
                                   xpCategories.otherPiscines
              
              const currentProgressData = activeCheckpointTab === 'main' ? progressCategories.main :
                                         activeCheckpointTab === 'go' ? progressCategories.goPiscine :
                                         progressCategories.otherPiscines
              
              // Merge XP and progress data by path
              const mergedData = currentXPData.map(xp => {
                const progress = currentProgressData.find(p => p.path === xp.path)
                return { ...xp, progress }
              })
              
              // Add progress items that don't have XP transactions
              currentProgressData.forEach(progress => {
                if (!mergedData.find(item => item.path === progress.path)) {
                  mergedData.push({ progress, path: progress.path, amount: 0 })
                }
              })
              
              return mergedData.map((item: any) => (
                <div key={item.id || item.progress?.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-white">
                          {item.object?.name || item.progress?.path?.split('/').pop() || 'Checkpoint'}
                        </h4>
                        {item.progress && (
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.progress.isDone ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {item.progress.isDone ? 'Completed' : 'In Progress'}
                          </span>
                        )}
                      </div>
                      <p className="text-white/60 text-sm mt-1">{item.path}</p>
                      {item.progress && item.progress.grade && (
                        <p className="text-white/60 text-sm">
                          Grade: <span className="text-white font-medium">{formatGradeDetailed(item.progress.grade)}</span>
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary-400">
                        {formatXPValue(item.amount || 0)}
                      </div>
                      <div className="text-white/60 text-sm">
                        {getRelativeTime(item.createdAt || item.progress?.updatedAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            })()}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default CheckpointDashboard
