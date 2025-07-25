import React from 'react'
import { motion } from 'framer-motion'
import { User as UserType } from '../../../types'
import Avatar from '../../ui/Avatar'

interface UserProfileCardProps {
  user: UserType
  userData: any
  analytics: any
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, userData, analytics }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar
            user={{
              ...userData,
              avatarUrl: userData?.attrs?.['pro-picUploadId']
                ? `https://zone01.s3.us-east-1.amazonaws.com/avatar/${userData.attrs['pro-picUploadId']}`
                : null
            }}
            size="lg"
            className="ring-2 ring-white/20"
          />
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {userData.attrs?.displayName || userData.attrs?.firstName || user.login}
            </h2>
            <p className="text-white/70 mb-2">@{user.login}</p>
            {analytics?.performance && (
              <div className="flex items-center space-x-2">
                <span className="text-lg">{analytics.performance.badge}</span>
                <span className="text-white/80 text-sm font-medium">
                  {analytics.performance.notation}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {analytics && (
          <div className="text-right">
            <div className="text-3xl font-bold text-white mb-1">
              {analytics.level.current}
            </div>
            <div className="text-white/70 text-sm">
              Level • {analytics.level.progress.toFixed(1)}% to next
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default UserProfileCard
