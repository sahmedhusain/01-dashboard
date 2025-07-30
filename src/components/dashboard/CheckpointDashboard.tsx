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

  // Query enhanced checkpoint data - checkpoints use "exam" type transactions
  const { data: checkpointExamData, loading: examLoading, error: examError } = useQuery(gql`
    query GetCheckpointExams($userId: Int!) {
      transaction(
        where: {
          userId: { _eq: $userId }
          type: { _eq: "exam" }
          path: { _like: "%checkpoint%" }
        }
        order_by: { createdAt: desc }
      ) {
        id
        amount
        path
        createdAt
        type
        attrs
        object {
          name
          type
          attrs
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

  if (examLoading || progressLoading || resultsLoading) return <LoadingSpinner />

  if (examError) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-400">
          <p>Error loading checkpoint data</p>
          <p className="text-sm text-white/60 mt-2">{examError.message}</p>
        </div>
      </Card>
    )
  }

  // Process complete checkpoint data
  const checkpointTransactions = checkpointExamData?.transaction || []
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
  
  const examCategories = categorizeCheckpoints(checkpointTransactions)
  const progressCategories = categorizeCheckpoints(checkpointProgress)
  const resultCategories = categorizeCheckpoints(checkpointResults)
  
  // Calculate aggregates for each category
  const calculateAggregates = (transactions: any[]) => {
    const count = transactions.length
    const totalScore = transactions.reduce((sum, t) => sum + (t.amount || 0), 0)
    const avgScore = count > 0 ? totalScore / count : 0
    return { count, sum: { amount: totalScore }, avg: { amount: avgScore } }
  }
  
  const mainCheckpointAggregate = calculateAggregates(examCategories.main)
  const goPiscineCheckpointAggregate = calculateAggregates(examCategories.goPiscine)
  const otherPiscineCheckpointAggregate = calculateAggregates(examCategories.otherPiscines)
  
  // Analyze progress statistics - grade-based completion logic for checkpoint projects
  const analyzeProgress = (progress: any[]) => {
    // Filter out checkpoint container paths to get only actual projects
    const actualProjects = progress.filter(p => {
      const projectName = p.path?.split('/').pop() || ''
      const isCheckpointContainer = projectName.match(/^checkpoint-\d+$/i) || 
                                  projectName === 'checkpoint' ||
                                  p.path?.match(/\/checkpoint-\d+$/)
      return !isCheckpointContainer
    })
    
    // Get unique projects by path (avoid counting duplicates)
    const uniqueProjects = actualProjects.reduce((acc: any[], current) => {
      const projectPath = current.path
      const existing = acc.find(p => p.path === projectPath)
      if (!existing) {
        acc.push(current)
      } else {
        // Keep the one with latest/best grade if available
        if (current.grade !== null && (existing.grade === null || current.grade >= existing.grade)) {
          const index = acc.indexOf(existing)
          acc[index] = current
        }
      }
      return acc
    }, [])
    
    // Count projects that are completed (100% grade = 1.0)
    const completed = uniqueProjects.filter(p => p.grade !== null && p.grade === 1.0).length
    // Count projects that are uncompleted (0% grade = 0)
    const uncompleted = uniqueProjects.filter(p => p.grade !== null && p.grade === 0).length
    const total = uniqueProjects.length // Total actual projects found
    const averageGrade = uniqueProjects
      .filter(p => p.grade !== null)
      .reduce((sum, p) => sum + p.grade, 0) / uniqueProjects.filter(p => p.grade !== null).length || 0
    
    return {
      completed,
      uncompleted,
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
  if (examCategories.main.length > 0 || progressCategories.main.length > 0) availableCheckpointTypes.push('main')
  if (examCategories.goPiscine.length > 0 || progressCategories.goPiscine.length > 0) availableCheckpointTypes.push('go')
  if (examCategories.otherPiscines.length > 0 || progressCategories.otherPiscines.length > 0) availableCheckpointTypes.push('piscines')

  // Detect specific piscine checkpoint types
  const detectPiscineCheckpointTypes = (checkpoints: any[]) => {
    const piscineSet = new Set<string>()
    
    checkpoints.forEach(checkpoint => {
      const path = checkpoint.path
      const piscineMatch = path.match(/\/bahrain\/bh-module\/piscine-([^\/]+)\/.*checkpoint/)
      if (piscineMatch) {
        piscineSet.add(piscineMatch[1])
      }
    })
    
    return Array.from(piscineSet)
  }

  const piscineCheckpointTypes = detectPiscineCheckpointTypes(examCategories.otherPiscines)

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

      {/* Checkpoint Overview Cards */
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Module Checkpoints */}
        {(examCategories.main.length > 0 || progressCategories.main.length > 0) && (
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 text-primary-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Main Module</h3>
            </div>
            <div className="flex justify-center">
              <div className="text-center">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-white/60 text-sm">Completed</div>
                    <div className="text-xl font-bold text-green-400">
                      {mainProgressStats.completed}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Uncompleted</div>
                    <div className="text-xl font-bold text-red-400">
                      {mainProgressStats.uncompleted}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Go Piscine Checkpoints */}
        {(examCategories.goPiscine.length > 0 || progressCategories.goPiscine.length > 0) && (
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Go Piscine</h3>
            </div>
            <div className="flex justify-center">
              <div className="text-center">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-white/60 text-sm">Completed</div>
                    <div className="text-xl font-bold text-green-400">
                      {goPiscineProgressStats.completed}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Uncompleted</div>
                    <div className="text-xl font-bold text-red-400">
                      {goPiscineProgressStats.uncompleted}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Other Piscine Checkpoints */}
        {(examCategories.otherPiscines.length > 0 || progressCategories.otherPiscines.length > 0) && (
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Award className="w-6 h-6 text-yellow-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Other Piscines</h3>
            </div>
            <div className="flex justify-center">
              <div className="text-center">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-white/60 text-sm">Completed</div>
                    <div className="text-xl font-bold text-green-400">
                      {otherPiscineProgressStats.completed}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Uncompleted</div>
                    <div className="text-xl font-bold text-red-400">
                      {otherPiscineProgressStats.uncompleted}
                    </div>
                  </div>
                </div>
                {piscineCheckpointTypes.length > 0 && (
                  <div className="text-white/60 text-sm mt-2">
                    Types: {piscineCheckpointTypes.join(', ')}
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
      }

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
              const currentExamData = activeCheckpointTab === 'main' ? examCategories.main :
                                     activeCheckpointTab === 'go' ? examCategories.goPiscine :
                                     examCategories.otherPiscines
              
              const currentProgressData = activeCheckpointTab === 'main' ? progressCategories.main :
                                         activeCheckpointTab === 'go' ? progressCategories.goPiscine :
                                         progressCategories.otherPiscines
              
              // Merge exam and progress data by path
              const mergedData = currentExamData.map(exam => {
                const progress = currentProgressData.find(p => p.path === exam.path)
                return { ...exam, progress }
              })
              
              // Add progress items that don't have exam transactions
              currentProgressData.forEach(progress => {
                if (!mergedData.find(item => item.path === progress.path)) {
                  mergedData.push({ progress, path: progress.path, amount: 0 })
                }
              })
              
              // Show actual checkpoint projects, not checkpoint container paths
              const filteredData = mergedData.filter(item => {
                const path = item.path || item.progress?.path || ''
                const projectName = item.object?.name || item.progress?.path?.split('/').pop() || 'Checkpoint'
                
                // Only show items that are actual projects inside checkpoints
                // Exclude: checkpoint-01, checkpoint-02, etc. (container paths)
                // Include: printnbr, atoi, fromto, zipstring, etc. (actual projects)
                const isCheckpointContainer = projectName.match(/^checkpoint-\d+$/i) || 
                                            projectName === 'Checkpoint' ||
                                            path.match(/\/checkpoint-\d+$/)
                
                return !isCheckpointContainer
              })
              
              return filteredData.map((item: any) => (
                <div key={item.id || item.progress?.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-white">
                          {item.object?.name || item.progress?.path?.split('/').pop() || 'Checkpoint'}
                        </h4>
                        {item.progress && (
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.progress.grade !== null && item.progress.grade > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {item.progress.grade !== null && item.progress.grade > 0 ? 'Completed' : 'Uncompleted'}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary-400">
                        {item.progress?.grade !== null ? `${(item.progress.grade * 100).toFixed(0)}%` : 'No Grade'}
                      </div>
                      <div className="text-white/60 text-sm">
                        {new Date(item.createdAt || item.progress?.updatedAt).toLocaleDateString()}
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
