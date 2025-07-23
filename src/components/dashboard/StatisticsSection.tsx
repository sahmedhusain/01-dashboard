import React from 'react'
import { motion } from 'framer-motion'
import { User } from '../../types'
import XPSection from './XPSection'
import AuditSection from './AuditSection'
import StatsSection from './StatsSection'
import ProjectProgressTracker from './ProjectProgressTracker'

interface StatisticsSectionProps {
  user: User
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ user }) => {
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
          Statistics Dashboard
        </h1>
        <p className="text-white/70 text-lg">
          Your comprehensive learning analytics and progress
        </p>
      </motion.div>

      {/* XP and Audit Statistics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* XP Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <XPSection user={user} />
        </motion.div>

        {/* Audit Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AuditSection user={user} />
        </motion.div>
      </div>

      {/* Project Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ProjectProgressTracker user={user} />
      </motion.div>

      {/* Comprehensive Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <StatsSection user={user} />
      </motion.div>
    </div>
  )
}

export default StatisticsSection
