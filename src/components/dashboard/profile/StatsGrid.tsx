import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Target, BookOpen, TrendingUp } from 'lucide-react'
import { formatXPValue } from '../../../utils/dataFormatting'

interface StatsGridProps {
  analytics: any
  userData: any
}

const StatsGrid: React.FC<StatsGridProps> = ({ analytics, userData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
        <div className="flex items-center space-x-3">
          <Zap className="w-8 h-8 text-blue-400" />
          <div>
            <p className="text-white font-medium">Total XP</p>
            <p className="text-2xl font-bold text-white">{analytics ? formatXPValue(analytics.xp.total) : '0'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
        <div className="flex items-center space-x-3">
          <Target className="w-8 h-8 text-green-400" />
          <div>
            <p className="text-white font-medium">Audit Ratio</p>
            <p className="text-2xl font-bold text-white">{userData?.auditRatio !== undefined ? userData.auditRatio.toFixed(1) : '0.0'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-8 h-8 text-purple-400" />
          <div>
            <p className="text-white font-medium">Projects</p>
            <p className="text-2xl font-bold text-white">{analytics ? analytics.projects.completed : '0'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-8 h-8 text-orange-400" />
          <div>
            <p className="text-white font-medium">Level</p>
            <p className="text-2xl font-bold text-white">{analytics ? analytics.level.current : userData?.level || 0}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default StatsGrid
