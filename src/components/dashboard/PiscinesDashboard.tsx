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

  // Query piscine progress data
  const { data: piscineProgressData, loading: progressLoading } = useQuery(gql`
    query GetPiscineProgress($userId: Int!) {
      progress(
        where: {
          userId: { _eq: $userId }
          _or: [
            { path: { _like: "/bahrain/bh-piscine/%" } }
            { path: { _like: "/bahrain/bh-module/piscine-%" } }
          ]
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

  // Query piscine results data
  const { data: piscineResultsData, loading: resultsLoading } = useQuery(gql`
    query GetPiscineResults($userId: Int!) {
      result(
        where: {
          userId: { _eq: $userId }
          _or: [
            { path: { _like: "/bahrain/bh-piscine/%" } }
            { path: { _like: "/bahrain/bh-module/piscine-%" } }
          ]
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

  // Process complete piscine data
  const transactions = piscineXPData?.transaction || []
  const progressData = piscineProgressData?.progress || []
  const resultsData = piscineResultsData?.result || []
  
  const moduleData = separateModuleData(transactions)
  const xpTotals = calculateModuleXPTotals(transactions)
  
  // Analyze progress statistics by piscine type
  const analyzeProgressByPiscine = (progressData: any[], piscineType: string) => {
    const relevantProgress = progressData.filter(p => {
      if (piscineType === 'go') {
        return p.path.includes('/bahrain/bh-piscine/')
      } else {
        return p.path.includes(`/bahrain/bh-module/piscine-${piscineType}/`)
      }
    })
    
    const completed = relevantProgress.filter(p => p.isDone).length
    const total = relevantProgress.length
    const averageGrade = relevantProgress
      .filter(p => p.grade !== null)
      .reduce((sum, p) => sum + p.grade, 0) / relevantProgress.filter(p => p.grade !== null).length || 0
    
    return {
      completed,
      total,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      averageGrade: isNaN(averageGrade) ? 0 : averageGrade,
      recentActivity: relevantProgress.slice(0, 5)
    }
  }
  
  // Analyze results by piscine type
  const analyzeResultsByPiscine = (resultsData: any[], piscineType: string) => {
    const relevantResults = resultsData.filter(r => {
      if (piscineType === 'go') {
        return r.path.includes('/bahrain/bh-piscine/')
      } else {
        return r.path.includes(`/bahrain/bh-module/piscine-${piscineType}/`)
      }
    })
    
    const passedResults = relevantResults.filter(r => r.grade >= 1).length
    const totalResults = relevantResults.length
    const averageGrade = relevantResults
      .reduce((sum, r) => sum + r.grade, 0) / relevantResults.length || 0
    
    return {
      passed: passedResults,
      total: totalResults,
      passRate: totalResults > 0 ? (passedResults / totalResults) * 100 : 0,
      averageGrade: isNaN(averageGrade) ? 0 : averageGrade,
      recentResults: relevantResults.slice(0, 5)
    }
  }

  // Dynamically detect piscine types from transaction paths
  const detectPiscineTypes = (transactions: any[]) => {
    const piscineSet = new Set<string>()

    transactions.forEach(transaction => {
      const path = transaction.path

      // Go piscine: /bahrain/bh-piscine/
      if (path.includes('/bahrain/bh-piscine/')) {
        piscineSet.add('go')
      }

      // Other piscines: /bahrain/bh-module/piscine-{name}/
      const piscineMatch = path.match(/\/bahrain\/bh-module\/piscine-([^\/]+)\//)
      if (piscineMatch) {
        piscineSet.add(piscineMatch[1])
      }
    })

    return Array.from(piscineSet)
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
