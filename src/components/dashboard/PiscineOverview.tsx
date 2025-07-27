import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import Card from '../ui/Card'
import { formatXPValue, formatGradeDetailed } from '../../utils/dataFormatting'

interface PiscineOverviewProps {
  piscineTypes: string[]
  xpTotals: {
    piscines: { [key: string]: number }
    allPiscines: number
  }
  transactions: any[]
  progressData: any[]
  resultsData: any[]
  analyzeProgressByPiscine: (progressData: any[], piscineType: string) => any
  analyzeResultsByPiscine: (resultsData: any[], piscineType: string) => any
  onSelectPiscine: (piscineType: string) => void
}

const PiscineOverview: React.FC<PiscineOverviewProps> = ({
  piscineTypes,
  xpTotals,
  transactions,
  progressData,
  resultsData,
  analyzeProgressByPiscine,
  analyzeResultsByPiscine,
  onSelectPiscine,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Piscines Overview</h2>

      {/* Enhanced Piscine Cards with Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {piscineTypes.map((piscineType) => {
          const piscineXP = xpTotals.piscines[piscineType] || 0
          const progressStats = analyzeProgressByPiscine(progressData, piscineType)
          const resultStats = analyzeResultsByPiscine(resultsData, piscineType)
          
          return (
            <motion.div
              key={piscineType}
              whileHover={{ y: -5 }}
              className="cursor-pointer"
              onClick={() => onSelectPiscine(piscineType)}
            >
              <Card className="p-6 h-full bg-white/5 hover:bg-white/10 transition-colors">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm font-medium">Piscine {piscineType.toUpperCase()}</p>
                      <p className="text-3xl font-bold text-primary-400">{formatXPValue(piscineXP)}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary-400" />
                    </div>
                  </div>
                  
                  {/* Progress Stats */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-white/60">Progress</div>
                      <div className="text-white font-bold">
                        {progressStats.completed}/{progressStats.total}
                      </div>
                      <div className="text-xs text-green-400">
                        {progressStats.completionRate.toFixed(1)}%
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-white/60">Pass Rate</div>
                      <div className="text-white font-bold">
                        {resultStats.passed}/{resultStats.total}
                      </div>
                      <div className="text-xs text-blue-400">
                        {resultStats.passRate.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white/50 text-xs">Click to view details</p>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Enhanced Total Piscine Stats */}
      <Card className="p-6 bg-white/5">
        <h3 className="text-lg font-semibold text-white mb-4">Total Piscine Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {formatXPValue(xpTotals.allPiscines)}
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
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {progressData.filter(p => p.isDone).length}
            </div>
            <div className="text-white/60 text-sm">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {transactions.length}
            </div>
            <div className="text-white/60 text-sm">XP Transactions</div>
          </div>
        </div>
        
        {/* Overall Progress Summary */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-white/60 text-sm mb-1">Overall Completion</div>
              <div className="text-2xl font-bold text-green-400">
                {progressData.length > 0 ? ((progressData.filter(p => p.isDone).length / progressData.length) * 100).toFixed(1) : 0}%
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-white/60 text-sm mb-1">Average Grade</div>
              <div className="text-2xl font-bold text-blue-400">
                {progressData.filter(p => p.grade).length > 0 ? 
                  formatGradeDetailed(progressData.filter(p => p.grade).reduce((sum, p) => sum + p.grade, 0) / progressData.filter(p => p.grade).length) : 
                  '0%'
                }
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-white/60 text-sm mb-1">Active Projects</div>
              <div className="text-2xl font-bold text-yellow-400">
                {progressData.filter(p => !p.isDone).length}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PiscineOverview
