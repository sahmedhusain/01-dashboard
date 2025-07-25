import React from 'react'
import { motion } from 'framer-motion'
import { User } from '../../types'
import DashboardSection from './DashboardSection'

interface MainDashboardProps {
  user: User
}

const MainDashboard: React.FC<MainDashboardProps> = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <DashboardSection user={user} />
    </motion.div>
  )
}

export default MainDashboard