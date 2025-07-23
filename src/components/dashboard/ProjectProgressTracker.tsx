import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery, gql } from '@apollo/client'
import {
  CheckCircle,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  BarChart3,
  Filter,
  Search,
  Calendar,
  Star,
  Activity,
  GitBranch,
  Trophy
} from 'lucide-react'
import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import {
  calculateProjectStats,
  formatModuleXP,
  getRelativeTime,
  formatDate
} from '../../utils/dataFormatting'

interface ProjectProgressTrackerProps {
  user: User
}

// Comprehensive progress queries using our tested queries
const GET_ALL_USER_PROGRESS = gql`
  query GetAllUserProgress($userId: Int!) {
    progress(
      where: { userId: { _eq: $userId } }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      isDone
      path
      version
      createdAt
      updatedAt
      groupId
      eventId
      objectId
      campus
    }

    progress_aggregate(where: { userId: { _eq: $userId } }) {
      aggregate {
        count
        avg {
          grade
        }
        max {
          grade
        }
        min {
          grade
        }
      }
    }
  }
`;

const GET_PROGRESS_BY_PATH_VIEW = gql`
  query GetProgressByPathView($userId: Int!) {
    progress_by_path_view(where: { userId: { _eq: $userId } }) {
      path
      userId
      createdAt
    }
  }
`;

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
      groupId
      eventId
      objectId
      campus
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
      limit: 10
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
  const [selectedView, setSelectedView] = useState<'projects' | 'all-progress' | 'completed'>('projects');

  // Query project progress (existing)
  const { data, loading, error } = useQuery(GET_PROJECT_PROGRESS, {
    variables: { userId: user.id },
    errorPolicy: 'all'
  });

  // Query all user progress for comprehensive view
  const { data: allProgressData, loading: allProgressLoading } = useQuery(GET_ALL_USER_PROGRESS, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query progress by path view
  const { data: pathViewData } = useQuery(GET_PROGRESS_BY_PATH_VIEW, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  if (loading && !data) return <LoadingSpinner />
  if (error) return <div className="text-red-400">Error loading project progress</div>

  const progresses = data?.progress || [];
  const recentCompletions = data?.recent_completions || [];
  const projectStats = calculateProjectStats(progresses);

  // Comprehensive progress data
  const allProgress = allProgressData?.progress || [];
  const progressStats = allProgressData?.progress_aggregate?.aggregate;
  const pathViewProgress = pathViewData?.progress_by_path_view || [];

  // Enhanced statistics
  const comprehensiveStats = {
    totalProgress: progressStats?.count || 0,
    averageGrade: progressStats?.avg?.grade || 0,
    maxGrade: progressStats?.max?.grade || 0,
    minGrade: progressStats?.min?.grade || 0,
    completedCount: allProgress.filter((p: any) => p.isDone).length,
    inProgressCount: allProgress.filter((p: any) => !p.isDone).length,
    pathCount: pathViewProgress.length
  };

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-2">Comprehensive Progress Tracker</h3>
        <p className="text-white/60">Your complete learning progress analytics with {comprehensiveStats.totalProgress} total records</p>
      </motion.div>

      {/* View Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-center"
      >
        <div className="bg-white/10 rounded-lg p-1">
          <button
            onClick={() => setSelectedView('projects')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'projects'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Projects ({projectStats.total})
          </button>
          <button
            onClick={() => setSelectedView('all-progress')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'all-progress'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            All Progress ({comprehensiveStats.totalProgress})
          </button>
          <button
            onClick={() => setSelectedView('completed')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'completed'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Completed ({comprehensiveStats.completedCount})
          </button>
        </div>
      </motion.div>

      {/* Comprehensive Statistics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">Total Progress</p>
              <p className="text-2xl font-bold text-blue-400">{comprehensiveStats.totalProgress}</p>
              <p className="text-white/50 text-xs mt-1">All learning records</p>
            </div>
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">Average Grade</p>
              <p className="text-2xl font-bold text-green-400">{comprehensiveStats.averageGrade.toFixed(1)}%</p>
              <p className="text-white/50 text-xs mt-1">Overall performance</p>
            </div>
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-purple-400">{comprehensiveStats.completedCount}</p>
              <p className="text-white/50 text-xs mt-1">Finished tasks</p>
            </div>
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">In Progress</p>
              <p className="text-2xl font-bold text-orange-400">{comprehensiveStats.inProgressCount}</p>
              <p className="text-white/50 text-xs mt-1">Active learning</p>
            </div>
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-orange-400" />
            </div>
          </div>
        </Card>
      </motion.div>

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

      {/* Comprehensive Progress View */}
      {selectedView === 'all-progress' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <GitBranch className="w-5 h-5 mr-2 text-primary-400" />
              All Progress Records ({allProgress.length})
            </h4>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {allProgress.slice(0, 20).map((progress: any, index: number) => (
                <motion.div
                  key={progress.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      progress.isDone
                        ? 'bg-gradient-to-r from-green-400 to-green-500'
                        : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm truncate">{progress.path}</p>
                      <div className="flex items-center space-x-4 text-xs text-white/60">
                        <span>Grade: {progress.grade}%</span>
                        <span>Version: {progress.version}</span>
                        <span>{formatDate(progress.createdAt)}</span>
                        {progress.campus && <span>Campus: {progress.campus}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {progress.groupId && (
                      <div className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                        Group
                      </div>
                    )}
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      progress.isDone
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {progress.isDone ? 'Complete' : 'In Progress'}
                    </div>
                  </div>
                </motion.div>
              ))}
              {allProgress.length > 20 && (
                <div className="text-center py-4">
                  <p className="text-white/60 text-sm">
                    Showing 20 of {allProgress.length} progress records
                  </p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Completed Progress View */}
      {selectedView === 'completed' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-primary-400" />
              Completed Progress ({comprehensiveStats.completedCount})
            </h4>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {allProgress.filter((p: any) => p.isDone).slice(0, 15).map((progress: any, index: number) => (
                <motion.div
                  key={progress.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm truncate">{progress.path}</p>
                      <div className="flex items-center space-x-4 text-xs text-white/60">
                        <span>Grade: {progress.grade}%</span>
                        <span>Completed: {formatDate(progress.updatedAt || progress.createdAt)}</span>
                        {progress.campus && <span>Campus: {progress.campus}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                      {progress.grade}%
                    </div>
                  </div>
                </motion.div>
              ))}
              {comprehensiveStats.completedCount === 0 && (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 text-white/30 mx-auto mb-3" />
                  <p className="text-white/60">No completed progress yet</p>
                  <p className="text-white/40 text-sm">Keep learning to see your achievements here!</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Loading States */}
      {(allProgressLoading) && (
        <Card className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-3 text-white/70">Loading comprehensive progress data...</span>
          </div>
        </Card>
      )}
    </div>
  )
}

export default ProjectProgressTracker
