import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, PieChart, TrendingUp, Target } from 'lucide-react'
import { useQuery, gql } from '@apollo/client'
import { GET_ALL_PROGRESS, GET_ALL_RESULTS } from '../../graphql/allQueries'
import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import ProjectSuccessChart from '../charts/ProjectSuccessChart'
import SkillsRadarChart from '../charts/SkillsRadarChart'

interface StatsSectionProps {
  user: User
}

const StatsSection: React.FC<StatsSectionProps> = ({ user }) => {
  const { data: progressData, loading: progressLoading } = useQuery(gql`
    query GetUserProgress($userId: Int!) {
      progress(
        where: { userId: { _eq: $userId } }
        order_by: { createdAt: desc }
      ) {
        id
        grade
        isDone
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

  const { data: statsData, loading: statsLoading } = useQuery(gql`
    query GetProgressStats($userId: Int!) {
      total_progress: progress_aggregate(
        where: { userId: { _eq: $userId } }
      ) {
        aggregate {
          count
        }
      }
      completed_progress: progress_aggregate(
        where: {
          userId: { _eq: $userId }
          isDone: { _eq: true }
        }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }
      project_progress: progress_aggregate(
        where: {
          userId: { _eq: $userId }
          object: { type: { _eq: "project" } }
        }
      ) {
        aggregate {
          count
        }
      }
    }
  `, {
    variables: { userId: user.id },
    errorPolicy: 'all'
  })

  const loading = progressLoading || statsLoading

  if (loading) return <LoadingSpinner />

  const progress = progressData?.progress || []
  const totalProgress = statsData?.total_progress?.aggregate?.count || 0
  const completedProgress = statsData?.completed_progress?.aggregate?.count || 0
  const projectProgress = statsData?.project_progress?.aggregate?.count || 0
  const avgGrade = statsData?.completed_progress?.aggregate?.avg?.grade || 0

  // Calculate project success rate
  const passedProjects = progress.filter((p: any) => p.isDone && p.grade >= 1).length
  const failedProjects = progress.filter((p: any) => p.isDone && p.grade < 1).length
  const inProgressProjects = progress.filter((p: any) => !p.isDone).length

  const successRate = passedProjects + failedProjects > 0 
    ? (passedProjects / (passedProjects + failedProjects)) * 100 
    : 0

  // Process skills data from progress
  const skillsMap = new Map()
  progress.forEach((p: any) => {
    if (p.object?.type === 'project' && p.isDone) {
      const projectName = p.object.name || 'Unknown'
      // Extract technology from project name or path
      const tech = extractTechnology(projectName, p.path)
      if (tech) {
        const current = skillsMap.get(tech) || { count: 0, totalGrade: 0 }
        skillsMap.set(tech, {
          count: current.count + 1,
          totalGrade: current.totalGrade + (p.grade || 0)
        })
      }
    }
  })

  const skillsData = Array.from(skillsMap.entries()).map(([skill, data]) => ({
    skill,
    level: data.totalGrade / data.count,
    maxLevel: 2, // Assuming max grade is 2
    category: getCategoryForSkill(skill),
    projects: data.count
  }))

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Projects Passed</p>
              <p className="text-3xl font-bold text-green-400">{passedProjects}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Success Rate</p>
              <p className="text-3xl font-bold text-blue-400">{successRate.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Avg Grade</p>
              <p className="text-3xl font-bold text-purple-400">{avgGrade.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">In Progress</p>
              <p className="text-3xl font-bold text-yellow-400">{inProgressProjects}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <PieChart className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Success Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-primary-400" />
            Project Success Rate
          </h3>
          <ProjectSuccessChart 
            data={{
              passed: passedProjects,
              failed: failedProjects,
              inProgress: inProgressProjects,
              total: passedProjects + failedProjects + inProgressProjects
            }}
          />
        </Card>

        {/* Skills Radar Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary-400" />
            Technology Skills
          </h3>
          {skillsData.length > 0 ? (
            <SkillsRadarChart data={skillsData} />
          ) : (
            <div className="text-center text-white/60 py-8">
              <p>No skills data available</p>
            </div>
          )}
        </Card>
      </div>

      {/* Progress Timeline */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Progress</h3>
        <div className="space-y-3">
          {progress.slice(0, 10).map((item: any, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <div className="flex-1">
                <p className="text-white font-medium">
                  {item.object?.name || 'Unknown Project'}
                </p>
                <p className="text-white/60 text-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <p className="text-white/50 text-xs">
                  Type: {item.object?.type || 'Unknown'}
                </p>
              </div>
              <div className="text-right">
                <div className={`px-2 py-1 rounded text-sm font-medium ${
                  item.isDone
                    ? item.grade >= 1 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {item.isDone 
                    ? (item.grade >= 1 ? 'PASSED' : 'FAILED')
                    : 'IN PROGRESS'
                  }
                </div>
                {item.isDone && (
                  <p className="text-white/60 text-xs mt-1">
                    Grade: {item.grade?.toFixed(2) || 'N/A'}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// Helper functions
const extractTechnology = (projectName: string, path: string): string | null => {
  const name = projectName.toLowerCase()
  const pathStr = path?.toLowerCase() || ''
  
  // Common technologies
  if (name.includes('go') || pathStr.includes('go')) return 'Go'
  if (name.includes('js') || name.includes('javascript') || pathStr.includes('js')) return 'JavaScript'
  if (name.includes('python') || pathStr.includes('python')) return 'Python'
  if (name.includes('rust') || pathStr.includes('rust')) return 'Rust'
  if (name.includes('c++') || pathStr.includes('cpp')) return 'C++'
  if (name.includes('java') || pathStr.includes('java')) return 'Java'
  if (name.includes('docker') || pathStr.includes('docker')) return 'Docker'
  if (name.includes('sql') || pathStr.includes('sql')) return 'SQL'
  if (name.includes('html') || pathStr.includes('html')) return 'HTML/CSS'
  if (name.includes('react') || pathStr.includes('react')) return 'React'
  
  return null
}

const getCategoryForSkill = (skill: string): string => {
  const categories: { [key: string]: string } = {
    'Go': 'Backend',
    'JavaScript': 'Frontend',
    'Python': 'Backend',
    'Rust': 'Systems',
    'C++': 'Systems',
    'Java': 'Backend',
    'Docker': 'DevOps',
    'SQL': 'Database',
    'HTML/CSS': 'Frontend',
    'React': 'Frontend'
  }
  
  return categories[skill] || 'General'
}

export default StatsSection
