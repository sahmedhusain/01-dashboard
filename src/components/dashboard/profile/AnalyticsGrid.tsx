import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, BookOpen, Target } from 'lucide-react'
import { formatXPValue } from '../../../utils/dataFormatting'

interface AnalyticsGridProps {
  analytics: any
}

const AnalyticsGrid: React.FC<AnalyticsGridProps> = ({ analytics }) => {
  if (!analytics) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* XP Breakdown Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
          XP Breakdown Analysis
        </h3>
        <div className="space-y-3">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Module XP</span>
              <span className="text-blue-400 font-bold">{formatXPValue(analytics.xp.bhModule)}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{width: `${(analytics.xp.bhModule / analytics.xp.total) * 100}%`}}></div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Piscines XP</span>
              <span className="text-green-400 font-bold">{formatXPValue(analytics.xp.piscines)}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{width: `${(analytics.xp.piscines / analytics.xp.total) * 100}%`}}></div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Average per Project</span>
              <span className="text-purple-400 font-bold">{formatXPValue(analytics.xp.average)}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Projects Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
          Projects & Progress Analysis
        </h3>
        <div className="space-y-3">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Completed</span>
              <span className="text-green-400 font-bold">{analytics.projects.bhModule.completed}</span>
            </div>
            <div className="text-white/60 text-xs">Pass rate: {analytics.projects.bhModule.passRate.toFixed(1)}%</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">In Progress</span>
              <span className="text-yellow-400 font-bold">{analytics.projects.bhModule.inProgress}</span>
            </div>
            <div className="text-white/60 text-xs">Currently working</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Failed</span>
              <span className="text-red-400 font-bold">{analytics.projects.bhModule.failed}</span>
            </div>
            <div className="text-white/60 text-xs">Projects</div>
          </div>
        </div>
      </motion.div>

      {/* Audits Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-green-400" />
          Audit Analytics
        </h3>
        <div className="space-y-3">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Given</span>
              <span className="text-blue-400 font-bold">{analytics.audits.given}</span>
            </div>
            <div className="text-white/60 text-xs">Completed audits given</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Completed</span>
              <span className="text-green-400 font-bold">{analytics.audits.completed}</span>
            </div>
            <div className="text-white/60 text-xs">Reviews completed</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Ratio</span>
              <span className="text-purple-400 font-bold">{analytics.audits.ratio.toFixed(1)}</span>
            </div>
            <div className="text-white/60 text-xs">Overall audit performance</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AnalyticsGrid
