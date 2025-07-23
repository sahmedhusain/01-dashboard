import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Award, Target } from 'lucide-react'
import { useQuery, gql } from '@apollo/client'
import { User } from '../../types'
import PiscineSection from './PiscineSection'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import {
  formatModuleXP,
  separateModuleData,
  calculateModuleXPTotals
} from '../../utils/dataFormatting'

interface PiscinesDashboardProps {
  user: User
  piscineTypes: string[]
}

const PiscinesDashboard: React.FC<PiscinesDashboardProps> = ({ user, piscineTypes }) => {
  const [activePiscineTab, setActivePiscineTab] = useState<string>('')

  // Query all piscine XP data with proper path patterns
  const { data: piscineXPData, loading } = useQuery(gql`
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

  if (loading) return <LoadingSpinner />

  // Process piscine data and detect dynamic piscine types
  const transactions = piscineXPData?.transaction || []
  const moduleData = separateModuleData(transactions)
  const xpTotals = calculateModuleXPTotals(transactions)

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
      {/* Header */}
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

      {/* Piscine Sub-tabs */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <nav className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {actualPiscineTypes.map((piscineType) => (
              <motion.button
                key={piscineType}
                onClick={() => setActivePiscineTab(piscineType)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  activePiscineTab === piscineType
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <BookOpen className="w-4 h-4 mr-2" />
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
          /* Piscine Overview */
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Piscines Overview</h2>

            {/* Piscine XP Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {actualPiscineTypes.map((piscineType) => {
                const piscineXP = xpTotals.piscines[piscineType] || 0
                return (
                  <Card key={piscineType} className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
                        onClick={() => setActivePiscineTab(piscineType)}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60 text-sm font-medium">Piscine {piscineType.toUpperCase()}</p>
                        <p className="text-3xl font-bold text-primary-400">{formatModuleXP(piscineXP)}</p>
                        <p className="text-white/50 text-xs mt-1">Click to view details</p>
                      </div>
                      <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary-400" />
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Total Piscine Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Total Piscine Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {formatModuleXP(xpTotals.allPiscines)}
                  </div>
                  <div className="text-white/60 text-sm">Total Piscine XP</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {piscineTypes.length}
                  </div>
                  <div className="text-white/60 text-sm">Piscines Started</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {transactions.length}
                  </div>
                  <div className="text-white/60 text-sm">Total Achievements</div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default PiscinesDashboard
