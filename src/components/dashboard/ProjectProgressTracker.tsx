import React from 'react'
import { motion } from 'framer-motion'
import { useQuery, gql } from '@apollo/client'
import { CheckCircle, XCircle, Clock, Target, TrendingUp, Award } from 'lucide-react'
import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import { 
  calculateProjectStats,
  formatModuleXP,
  getRelativeTime 
} from '../../utils/dataFormatting'

interface ProjectProgressTrackerProps {
  user: User
}

const GET_PROJECT_PROGRESS = gql`
  query GetProjectProgress($userId: Int!) {
    # BH Module progress only (no piscines)
    progress(
      where: { 
        userId: { _eq: $userId }
        path: { _nregex: "piscine" }
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
    
    # Recent project completions
    recent_completions: progress(
      where: { 
        userId: { _eq: $userId }
        path: { _nregex: "piscine" }
        isDone: { _eq: true }
        grade: { _gte: 1 }
      }
      order_by: { updatedAt: desc }
      limit: 5
    ) {
      id
      grade
      path
      updatedAt
      object {
        name
        type
      }
    }
  }
`

const ProjectProgressTracker: React.FC<ProjectProgressTrackerProps> = ({ user }) => {
  const { data, loading, error } = useQuery(GET_PROJECT_PROGRESS, {
    variables: { userId: user.id },
    errorPolicy: 'all'
  })

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-400">Error loading project progress</div>

  const progresses = data?.progress || []
  const recentCompletions = data?.recent_completions || []
  const projectStats = calculateProjectStats(progresses)

  // Calculate success rate trend (last 10 vs previous 10)
  const recentProjects = progresses.slice(0, 10)
  const previousProjects = progresses.slice(10, 20)
  const recentSuccessRate = recentProjects.length > 0 
    ? (recentProjects.filter(p => p.isDone && p.grade >= 1).length / recentProjects.length) * 100 
    : 0
  const previousSuccessRate = previousProjects.length > 0 
    ? (previousProjects.filter(p => p.isDone && p.grade >= 1).length / previousProjects.length) * 100 
    : 0
  const trend = recentSuccessRate - previousSuccessRate

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Project Progress Tracker</h3>
        <p className="text-white/60">Your BH Module project completion analytics</p>
      </div>

      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">Projects Passed</p>
              <p className="text-3xl font-bold text-green-400">{projectStats.passed}</p>
              <p className="text-white/50 text-xs mt-1">Successfully completed</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">Projects Failed</p>
              <p className="text-3xl font-bold text-red-400">{projectStats.failed}</p>
              <p className="text-white/50 text-xs mt-1">Need retry or improvement</p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">Success Rate</p>
              <p className="text-3xl font-bold text-blue-400">{projectStats.passRate}%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className={`w-3 h-3 mr-1 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`} />
                <p className={`text-xs ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {trend >= 0 ? '+' : ''}{trend.toFixed(1)}% trend
                </p>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">Total Projects</p>
              <p className="text-3xl font-bold text-purple-400">{projectStats.total}</p>
              <p className="text-white/50 text-xs mt-1">Attempted so far</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Visualization */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-primary-400" />
          Success Rate Visualization
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Failed ({projectStats.failed})</span>
            <span className="text-white/70">Passed ({projectStats.passed})</span>
          </div>
          <div className="relative">
            <div className="w-full bg-red-500/20 rounded-full h-6">
              <motion.div
                className="bg-gradient-to-r from-green-500 to-green-600 h-6 rounded-full flex items-center justify-center"
                initial={{ width: 0 }}
                animate={{ width: `${projectStats.passRate}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <span className="text-xs font-bold text-white">
                  {projectStats.passRate}%
                </span>
              </motion.div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-white/60 text-sm">
              {projectStats.passed} out of {projectStats.total} projects completed successfully
            </p>
          </div>
        </div>
      </Card>

      {/* Recent Completions */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-primary-400" />
          Recent Project Completions
        </h4>
        <div className="space-y-3">
          {recentCompletions.map((completion: any, index: number) => (
            <motion.div
              key={completion.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-lg" />
                <div>
                  <p className="text-white font-medium">{completion.object?.name || 'Unknown Project'}</p>
                  <p className="text-white/60 text-sm">
                    🎯 Grade: {completion.grade} • {getRelativeTime(completion.updatedAt)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                  Completed
                </div>
              </div>
            </motion.div>
          ))}
          {recentCompletions.length === 0 && (
            <div className="text-center text-white/60 py-8">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-white/40" />
              </div>
              <p>No recent project completions</p>
              <p className="text-sm text-white/40 mt-1">Complete projects to see your achievements here</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default ProjectProgressTracker
