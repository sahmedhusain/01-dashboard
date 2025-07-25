import React from 'react'
import { motion } from 'framer-motion'
import { User as UserType } from '../../../types'
import { User, Calendar, MapPin, Mail, Award, Star, Trophy, Code, Users, Target } from 'lucide-react'
import Avatar from '../../ui/Avatar'
import { formatTotalXP, formatDate } from '../../../utils/dataFormatting'

interface ProfileSectionProps {
  user: UserType
  analytics: any
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user, analytics }) => {
  const userData = analytics.user

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left Side - Avatar and Basic Info */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar
                user={{
                  ...userData,
                  avatarUrl: userData?.attrs?.['pro-picUploadId']
                    ? `https://zone01.s3.us-east-1.amazonaws.com/avatar/${userData.attrs['pro-picUploadId']}`
                    : null
                }}
                size="2xl"
                className="ring-4 ring-white/20 shadow-2xl"
              />
              {analytics.performance && (
                <div className="absolute -bottom-2 -right-2 bg-primary-500 rounded-full p-2 border-2 border-white/20">
                  <span className="text-lg">{analytics.performance.badge}</span>
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {userData.attrs?.displayName || userData.attrs?.firstName || user.login}
              </h2>
              <p className="text-white/70 text-lg mb-3">@{user.login}</p>
              
              {analytics.performance && (
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-primary-500/20 px-3 py-1 rounded-lg border border-primary-500/30">
                    <span className="text-primary-400 font-semibold text-sm">
                      {analytics.performance.notation}
                    </span>
                  </div>
                  <div className="bg-white/10 px-3 py-1 rounded-lg">
                    <span className="text-white/80 text-sm">
                      Campus: {userData.campus || 'Bahrain'}
                    </span>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="space-y-2">
                {userData.attrs?.email && (
                  <div className="flex items-center space-x-2 text-white/70">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{userData.attrs.email}</span>
                  </div>
                )}
                {userData.attrs?.addressCity && (
                  <div className="flex items-center space-x-2 text-white/70">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{userData.attrs.addressCity}, {userData.attrs?.addressCountry || 'Bahrain'}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-white/70">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Joined {formatDate(userData.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Level and Progress */}
          <div className="text-center lg:text-right">
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="text-5xl font-bold text-white mb-2">
                {analytics.level.current}
              </div>
              <div className="text-white/70 text-sm mb-4">Current Level</div>
              
              <div className="w-32 h-32 mx-auto lg:mx-0 relative">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - analytics.level.progress / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <text
                    x="60"
                    y="65"
                    textAnchor="middle"
                    className="fill-white text-sm font-bold transform rotate-90"
                    style={{ transformOrigin: '60px 60px' }}
                  >
                    {analytics.level.progress.toFixed(1)}%
                  </text>
                </svg>
              </div>
              
              <div className="text-white/60 text-xs mt-2">
                Progress to Level {analytics.level.current + 1}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Achievements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Academic Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
            Academic Achievements
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-blue-400" />
                <span className="text-white text-sm">Total XP Earned</span>
              </div>
              <span className="text-blue-400 font-bold">{formatTotalXP(analytics.xp.total)}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm">Audit Ratio</span>
              </div>
              <span className="text-green-400 font-bold">{analytics.audits.ratio.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-purple-400" />
                <span className="text-white text-sm">Projects Completed</span>
              </div>
              <span className="text-purple-400 font-bold">{analytics.projects.completed}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Code className="w-5 h-5 text-orange-400" />
                <span className="text-white text-sm">Skills Mastered</span>
              </div>
              <span className="text-orange-400 font-bold">{analytics.skills.total}</span>
            </div>
          </div>
        </motion.div>

        {/* Community Involvement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-green-400" />
            Community Involvement
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-blue-400" />
                <span className="text-white text-sm">Audits Given</span>
              </div>
              <span className="text-blue-400 font-bold">{analytics.audits.given}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-white text-sm">Groups Led</span>
              </div>
              <span className="text-yellow-400 font-bold">{analytics.groups.captained}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm">Group Participations</span>
              </div>
              <span className="text-green-400 font-bold">{analytics.groups.total}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-purple-400" />
                <span className="text-white text-sm">Success Rate</span>
              </div>
              <span className="text-purple-400 font-bold">{analytics.projects.passRate.toFixed(1)}%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Skills Display */}
      {analytics.skills.top.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Code className="w-5 h-5 mr-2 text-orange-400" />
            Top Skills
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics.skills.top.slice(0, 6).map((skill: any, index: number) => (
              <div key={skill.name} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm font-medium capitalize">
                    {skill.name.replace(/-/g, ' ')}
                  </span>
                  <span className="text-orange-400 font-bold text-sm">
                    {skill.points}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-orange-400 h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${Math.min(100, (skill.points / Math.max(...analytics.skills.top.map((s: any) => s.points))) * 100)}%` 
                    }}
                  />
                </div>
                <div className="text-white/60 text-xs mt-1">
                  Rank #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Module Progress Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-blue-400" />
          Learning Journey Overview
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* BH Module Progress */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">BH Module (Main Curriculum)</h4>
              <span className="text-blue-400 font-bold">{formatTotalXP(analytics.xp.bhModule)}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/70">
                <span>Projects:</span>
                <span>{analytics.projects.bhModule}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Current Level:</span>
                <span>{analytics.level.current}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                <div 
                  className="bg-blue-400 h-2 rounded-full"
                  style={{ width: `${(analytics.xp.bhModule / analytics.xp.total) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Piscines Progress */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">Piscines (Intensive Training)</h4>
              <span className="text-green-400 font-bold">{formatTotalXP(analytics.xp.piscines)}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/70">
                <span>Projects:</span>
                <span>{analytics.projects.piscines}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Modules:</span>
                <span>{analytics.moduleData.piscines}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                <div 
                  className="bg-green-400 h-2 rounded-full"
                  style={{ width: `${(analytics.xp.piscines / analytics.xp.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProfileSection