import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Award, Target } from 'lucide-react'
import { useQuery, gql } from '@apollo/client'
import { User } from '../../types'
import PiscineSection from './PiscineSection'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import PiscineOverview from './PiscineOverview'
import SectionHeader from '../ui/SectionHeader'
import {
  formatXPValue,
  separateModuleData,
  calculateModuleXPTotals
} from '../../utils/dataFormatting'

interface PiscinesDashboardProps {
  user: User
  piscineTypes: string[]
}

const PiscinesDashboard: React.FC<PiscinesDashboardProps> = ({ user, piscineTypes }) => {
  const [activePiscineTab, setActivePiscineTab] = useState<string>('')

  // Query enhanced piscine data including XP transactions, progress, and results
  // IMPORTANT: Exclude checkpoint paths - those belong in CheckpointDashboard
  const { data: piscineXPData, loading: xpLoading } = useQuery(gql`
    query GetAllPiscineXP($userId: Int!) {
      transaction(
        where: {
          userId: { _eq: $userId }
          type: { _eq: "xp" }
          _or: [
            { path: { _like: "/bahrain/bh-piscine/%" } }
            { path: { _like: "/bahrain/bh-module/piscine-%" } }
          ]
          _not: { 
            _or: [
              { path: { _like: "%checkpoint%" } }
              { type: { _eq: "exam" } }
            ]
          }
        }
        order_by: { createdAt: desc }
      ) {
        id
        amount
        path
        createdAt
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

  // Query piscine progress data (excluding checkpoints)
  const { data: piscineProgressData, loading: progressLoading } = useQuery(gql`
    query GetPiscineProgress($userId: Int!) {
      progress(
        where: {
          userId: { _eq: $userId }
          _or: [
            { path: { _like: "/bahrain/bh-piscine/%" } }
            { path: { _like: "/bahrain/bh-module/piscine-%" } }
          ]
          _not: { path: { _like: "%checkpoint%" } }
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

  // Query piscine results data (excluding checkpoints)
  const { data: piscineResultsData, loading: resultsLoading } = useQuery(gql`
    query GetPiscineResults($userId: Int!) {
      result(
        where: {
          userId: { _eq: $userId }
          _or: [
            { path: { _like: "/bahrain/bh-piscine/%" } }
            { path: { _like: "/bahrain/bh-module/piscine-%" } }
          ]
          _not: { path: { _like: "%checkpoint%" } }
        }
        order_by: { updatedAt: desc }
      ) {
        id
        grade
        path
        createdAt
        updatedAt
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

  if (xpLoading || progressLoading || resultsLoading) return <LoadingSpinner />

  // Process complete piscine data
  const transactions = piscineXPData?.transaction || []
  const progressData = piscineProgressData?.progress || []
  const resultsData = piscineResultsData?.result || []
  
  const moduleData = separateModuleData(transactions)
  const xpTotals = calculateModuleXPTotals(transactions)
  
  // Enhanced progress analysis by piscine type with detailed metrics
  const analyzeProgressByPiscine = (progressData: any[], piscineType: string) => {
    const relevantProgress = progressData.filter(p => {
      if (piscineType === 'go') {
        return p.path.includes('/bahrain/bh-piscine/') && !p.path.includes('checkpoint')
      } else {
        return p.path.includes(`/bahrain/bh-module/piscine-${piscineType}/`) && !p.path.includes('checkpoint')
      }
    })
    
    const completed = relevantProgress.filter(p => p.isDone).length
    const passed = relevantProgress.filter(p => p.isDone && p.grade >= 1).length
    const failed = relevantProgress.filter(p => p.isDone && p.grade < 1).length
    const inProgress = relevantProgress.filter(p => !p.isDone).length
    const total = relevantProgress.length
    
    const gradesWithValues = relevantProgress.filter(p => p.grade !== null && p.grade !== undefined)
    const averageGrade = gradesWithValues.length > 0 ? 
      gradesWithValues.reduce((sum, p) => sum + p.grade, 0) / gradesWithValues.length : 0
    
    // Group by project/quest for better analytics
    const projectGroups = relevantProgress.reduce((groups: any, progress: any) => {
      const projectName = progress.path.split('/').pop() || 'unknown'
      if (!groups[projectName]) groups[projectName] = []
      groups[projectName].push(progress)
      return groups
    }, {})
    
    const uniqueProjects = Object.keys(projectGroups).sort()
    
    return {
      completed,
      passed,
      failed,
      inProgress,
      total,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      passRate: completed > 0 ? (passed / completed) * 100 : 0,
      averageGrade: isNaN(averageGrade) ? 0 : averageGrade,
      recentActivity: relevantProgress
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 8),
      projectGroups,
      uniqueProjects,
      projectsCount: uniqueProjects.length,
      bestGrade: gradesWithValues.length > 0 ? Math.max(...gradesWithValues.map(p => p.grade)) : 0,
      worstGrade: gradesWithValues.length > 0 ? Math.min(...gradesWithValues.map(p => p.grade)) : 0
    }
  }
  
  // Enhanced results analysis by piscine type
  const analyzeResultsByPiscine = (resultsData: any[], piscineType: string) => {
    const relevantResults = resultsData.filter(r => {
      if (piscineType === 'go') {
        return r.path.includes('/bahrain/bh-piscine/') && !r.path.includes('checkpoint')
      } else {
        return r.path.includes(`/bahrain/bh-module/piscine-${piscineType}/`) && !r.path.includes('checkpoint')
      }
    })
    
    const passedResults = relevantResults.filter(r => r.grade >= 1).length
    const failedResults = relevantResults.filter(r => r.grade < 1).length
    const totalResults = relevantResults.length
    const averageGrade = totalResults > 0 ? 
      relevantResults.reduce((sum, r) => sum + r.grade, 0) / totalResults : 0
    
    // Get performance breakdown by grade ranges
    const excellent = relevantResults.filter(r => r.grade >= 1.2).length  // 120%+
    const good = relevantResults.filter(r => r.grade >= 1.0 && r.grade < 1.2).length  // 100-119%
    const acceptable = relevantResults.filter(r => r.grade >= 0.8 && r.grade < 1.0).length  // 80-99%
    const poor = relevantResults.filter(r => r.grade < 0.8).length  // <80%
    
    return {
      passed: passedResults,
      failed: failedResults,
      total: totalResults,
      passRate: totalResults > 0 ? (passedResults / totalResults) * 100 : 0,
      averageGrade: isNaN(averageGrade) ? 0 : averageGrade,
      recentResults: relevantResults
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 6),
      gradeDistribution: {
        excellent,
        good,
        acceptable,
        poor
      },
      bestGrade: totalResults > 0 ? Math.max(...relevantResults.map(r => r.grade)) : 0,
      worstGrade: totalResults > 0 ? Math.min(...relevantResults.map(r => r.grade)) : 0
    }
  }

  // Dynamically detect piscine types from transaction paths (excluding checkpoints)
  const detectPiscineTypes = (transactions: any[]) => {
    const piscineSet = new Set<string>()

    transactions.forEach(transaction => {
      const path = transaction.path
      
      // Skip checkpoint paths - they belong in CheckpointDashboard
      if (path.includes('checkpoint')) return

      // Go piscine: /bahrain/bh-piscine/ (excluding checkpoints)
      if (path.includes('/bahrain/bh-piscine/')) {
        piscineSet.add('go')
      }

      // Other piscines: /bahrain/bh-module/piscine-{name}/ (excluding checkpoints)
      const piscineMatch = path.match(/\/bahrain\/bh-module\/piscine-([^\/]+)\//)
      if (piscineMatch) {
        piscineSet.add(piscineMatch[1])
      }
    })

    return Array.from(piscineSet).sort()
  }

  const detectedPiscineTypes = detectPiscineTypes(transactions)
  const actualPiscineTypes = detectedPiscineTypes.length > 0 ? detectedPiscineTypes : piscineTypes

  if (actualPiscineTypes.length === 0) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Piscines Dashboard
          </h1>
          <p className="text-white/70 text-lg">
            Your piscine learning journey and achievements
          </p>
        </motion.div>

        <Card className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <BookOpen className="w-16 h-16 text-white/30" />
            <h3 className="text-xl font-semibold text-white">No Piscines Found</h3>
            <p className="text-white/60">
              You haven't started any piscines yet. Piscines will appear here once you begin your learning journey.
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
        title="Piscines Dashboard"
        subtitle="Your piscine learning journey and achievements"
        icon={BookOpen}
      />

      {/* Enhanced Piscine Sub-tabs */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <nav className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-2">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {actualPiscineTypes.map((piscineType, index) => (
              <motion.button
                key={piscineType}
                onClick={() => setActivePiscineTab(piscineType)}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={`flex items-center px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${
                  activePiscineTab === piscineType
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                    : 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-md'
                }`}
              >
                <BookOpen className="w-5 h-5 mr-3" />
                Piscine {piscineType.toUpperCase()}
              </motion.button>
            ))}
          </div>
        </nav>
      </motion.div>

      {/* Active Piscine Content */}
      <motion.div
        key={activePiscineTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activePiscineTab ? (
          <PiscineSection user={user} piscineType={activePiscineTab} />
        ) : (
          <PiscineOverview
            piscineTypes={actualPiscineTypes}
            xpTotals={xpTotals}
            transactions={transactions}
            progressData={progressData}
            resultsData={resultsData}
            analyzeProgressByPiscine={analyzeProgressByPiscine}
            analyzeResultsByPiscine={analyzeResultsByPiscine}
            onSelectPiscine={setActivePiscineTab}
          />
        )}
      </motion.div>
    </div>
  )
}

export default PiscinesDashboard
