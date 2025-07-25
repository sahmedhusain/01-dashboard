import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import Card from '../ui/Card'
import { formatModuleXP } from '../../utils/dataFormatting'

interface PiscineOverviewProps {
  piscineTypes: string[]
  xpTotals: {
    piscines: { [key: string]: number }
    allPiscines: number
  }
  transactions: any[]
  onSelectPiscine: (piscineType: string) => void
}

const PiscineOverview: React.FC<PiscineOverviewProps> = ({
  piscineTypes,
  xpTotals,
  transactions,
  onSelectPiscine,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Piscines Overview</h2>

      {/* Piscine XP Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {piscineTypes.map((piscineType) => {
          const piscineXP = xpTotals.piscines[piscineType] || 0
          return (
            <motion.div
              key={piscineType}
              whileHover={{ y: -5 }}
              className="cursor-pointer"
              onClick={() => onSelectPiscine(piscineType)}
            >
              <Card className="p-6 h-full bg-white/5 hover:bg-white/10 transition-colors">
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
            </motion.div>
          )
        })}
      </div>

      {/* Total Piscine Stats */}
      <Card className="p-6 bg-white/5">
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
  )
}

export default PiscineOverview
