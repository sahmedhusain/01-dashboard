import React from 'react'
import { motion } from 'framer-motion'
import { User } from '../../types'
import ProfileSection from './ProfileSection'
import XPSection from './XPSection'
import AuditSection from './AuditSection'
import StatsSection from './StatsSection'
import ProjectProgressTracker from './ProjectProgressTracker'

interface MainDashboardProps {
  user: User
}

const MainDashboard: React.FC<MainDashboardProps> = ({ user }) => {
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
          #{user.id}
        </h1>
        <p className="text-white/70 text-lg">
          Your comprehensive Reboot01 dashboard
        </p>
      </motion.div>

      {/* Responsive Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Profile Section - Full width on mobile, half on tablet, third on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1 xl:col-span-1 space-y-6"
        >
          <ProfileSection user={user} />
        </motion.div>

        {/* XP Section - Full width on mobile, half on tablet, third on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1 xl:col-span-1 space-y-6"
        >
          <XPSection user={user} />
        </motion.div>

        {/* Audit Section - Full width on mobile and tablet, third on desktop */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2 xl:col-span-1 space-y-6"
        >
          <AuditSection user={user} />
        </motion.div>
      </div>

      {/* Project Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <ProjectProgressTracker user={user} />
      </motion.div>

      {/* Bottom Section - Comprehensive Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8"
      >
        <StatsSection user={user} />
      </motion.div>
    </div>
  )
}

export default MainDashboard
