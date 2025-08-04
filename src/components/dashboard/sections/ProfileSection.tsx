import React from 'react'
import { motion } from 'framer-motion'
import { User as UserType } from '../../../types'
import {
  User, Calendar, MapPin, Mail, Award, Star, Trophy, Code, Users, Target, TrendingUp,
  Phone, CreditCard, Heart, Shield, UserCheck,
  Briefcase, UserCog
} from 'lucide-react'
import Avatar from '../../ui/Avatar'
import {
  formatXPValue, formatDate, formatAuditRatio,
  extractPersonalInfo, formatPhoneNumber, getRankFromLevel
} from '../../../utils/dataFormatting'
import { useToken } from '../../../store'

interface AnalyticsData {
  user: UserType;
  performance: {
    notation: string;
    badge?: string;
  };
  level: {
    current: number;
    progress: number;
    progressInKB?: number;
    remainingInKB?: number;
  };
  xp: {
    total: number;
    average: number;
    bhModule?: number;
    piscines?: number;
  };
  audits: {
    totalUp: number;
    totalDown: number;
    ratio: number;
    received: number;
    given: number;
  };
  projects: {
    passed: number;
    failed: number;
    total: number;
    bhModule?: number;
    piscines?: number;
  };
  skills: {
    total: number;
  };
  groups: {
    captain: number;
    member: number;
    captained?: number;
    total?: number;
  };
  moduleData?: any;
  rawData: {
    events: Array<{
      id: number;
      createdAt: string;
      event?: {
        path: string;
      };
    }>;
    userLabels?: Array<{
      id: number;
      label: {
        name: string;
        description: string;
      };
    }>;
    userRoles?: Array<{
      id: number;
      role: {
        name: string;
        description: string;
      };
    }>;
  };
}

interface ProfileSectionProps {
  user: UserType
  analytics: AnalyticsData
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user, analytics }) => {
  const userData = analytics.user
  const token = useToken()

  const getAvatarUrl = () => {
    const fileId = userData.attrs?.['pro-picUploadId'];
    if (token && fileId) {
      return `https://learn.reboot01.com/api/storage?token=${token}&fileId=${fileId}`;
    }
    return null;
  };

  const personalInfo = extractPersonalInfo(userData.attrs || {});

    
  const bhModuleJoinInfo = React.useMemo(() => {

    if (!analytics?.rawData?.events) {
      return null
    }
    
    
    
    const bhModuleEvent = analytics.rawData.events.find((eventUser) => 
      eventUser.event?.path === '/bahrain/bh-module' || 
      eventUser.event?.path?.includes('bh-module')
    )
    
    if (bhModuleEvent) {
      return {
        date: bhModuleEvent.createdAt,
        label: 'Date Joined',
        description: 'Started main curriculum'
      }
    }
    
    
    const earliestEvent = analytics.rawData.events
      .filter((eventUser) => eventUser.createdAt)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())[0]
    
    if (earliestEvent) {
      return {
        date: earliestEvent.createdAt,
        label: 'Date Joined Program',
        description: 'Started learning journey'
      }
    }
    
    return null
  }, [analytics])

  const rankBoundary = (Math.floor(analytics.level.current / 10) + 1) * 10;
  const levelsToNextRank = rankBoundary - analytics.level.current;
  
  const nextRankInfo = getRankFromLevel(rankBoundary);

  return (
    <div className="space-y-6 relative">
      <div className="relative z-10 space-y-8">
      {/* Main Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden"
      >
        {/* Enhanced background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30px 30px, rgba(52, 211, 153, 0.1) 2px, transparent 0)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* User Info Container - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced Basic Profile Information */}
            <div className="flex items-center space-x-6 relative z-10">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="relative"
                >
                  <Avatar
                    user={{
                      ...userData,
                      attrs: {
                        ...userData.attrs,
                        avatarUrl: getAvatarUrl()
                      }
                    }}
                    size="2xl"
                    className="ring-4 ring-emerald-500/30 shadow-2xl shadow-emerald-500/20"
                  />
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 ring-4 ring-emerald-400/20 rounded-full animate-pulse"></div>
                </motion.div>
                {analytics.performance && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-2 border-2 border-white/20 shadow-lg"
                  >
                    <span className="text-lg">{analytics.performance.badge}</span>
                  </motion.div>
                )}
              </div>

              <div className="flex-1">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent mb-2"
                >
                  {userData.attrs?.displayName ||
                    `${userData.firstName || ''} ${userData.lastName || ''}`.trim() ||
                    user.login}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-emerald-400 text-lg mb-3 font-medium"
                >
                  @{user.login}
                </motion.p>

                {analytics.performance && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center space-x-3 mb-4"
                  >
                    <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 px-4 py-2 rounded-xl border border-emerald-500/30 backdrop-blur-sm">
                      <span className="text-emerald-400 font-semibold text-sm">
                        {analytics.performance.notation}
                      </span>
                    </div>
                    {analytics.rawData?.userLabels && analytics.rawData.userLabels.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {analytics.rawData.userLabels.map((userLabel, index) => (
                          <motion.div
                            key={userLabel.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="bg-gradient-to-r from-cyan-400/20 to-blue-400/20 px-3 py-1 rounded-xl border border-cyan-400/30 backdrop-blur-sm hover:from-cyan-400/30 hover:to-blue-400/30 transition-all duration-300"
                            title={userLabel.label.description}
                          >
                            <span className="text-cyan-400 font-semibold text-sm">
                              {userLabel.label.name}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Complete Contact & Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-400" />
                  Contact Information
                </h3>

                {personalInfo.email && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <Mail className="h-4 w-4 text-blue-400" />
                                        <div className="flex-1">
                      <span className="text-xs text-white/60">Email Address</span>
                      <div className="text-sm text-white">
                    <span className="text-sm text-white">{personalInfo.email}</span>
                    </div>
                    </div>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <Phone className="h-4 w-4 text-green-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">Mobile Number</span>
                      <div className="text-sm text-white">
                        <span className="text-sm text-white">{formatPhoneNumber(personalInfo.phone)}</span>
                      </div>
                    </div>
                  </div>
                )}
                {(personalInfo.address?.street || personalInfo.address?.city) && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <MapPin className="h-4 w-4 text-purple-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">Home Address</span>
                      <div className="text-sm text-white">
                        {personalInfo.address?.street && personalInfo.address?.complementStreet &&
                          `${personalInfo.address.street}, Building ${personalInfo.address.complementStreet}`}
                        {personalInfo.address?.street && !personalInfo.address?.complementStreet &&
                          personalInfo.address.street}
                        {personalInfo.address?.city &&
                          `, ${personalInfo.address.city}`}
                        {personalInfo.address?.postalCode &&
                          ` ${personalInfo.address.postalCode}`}
                        {`, ${personalInfo.address?.country || 'Bahrain'}`}
                      </div>
                    </div>
                  </div>
                )}
                {/* Date Information */}
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <Calendar className="h-4 w-4 text-orange-400" />
                  <div className="flex-1">
                    <span className="text-xs text-white/60">Date Registered</span>
                    <div className="text-sm text-white">{formatDate(userData.createdAt)}</div>
                    <div className="text-xs text-white/40 mt-1">Account creation date</div>
                  </div>
                </div>
                
                {bhModuleJoinInfo && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <UserCheck className="h-4 w-4 text-green-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">{bhModuleJoinInfo.label}</span>
                      <div className="text-sm text-white">{formatDate(bhModuleJoinInfo.date)}</div>
                      <div className="text-xs text-white/40 mt-1">{bhModuleJoinInfo.description}</div>
                      {bhModuleJoinInfo.date === userData.createdAt && (
                        <div className="text-xs text-yellow-400 mt-1">Same as registration date</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Identity Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-green-400" />
                  Identity Information
                </h3>

                {personalInfo.cprNumber && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <CreditCard className="h-4 w-4 text-blue-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">CPR Number</span>
                      <div className="text-sm text-white font-mono">{personalInfo.cprNumber}</div>
                    </div>
                  </div>
                )}
                {personalInfo.dateOfBirth && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <Calendar className="h-4 w-4 text-purple-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">Date of Birth</span>
                      <div className="text-sm text-white">{formatDate(personalInfo.dateOfBirth)}</div>
                    </div>
                  </div>
                )}
                {personalInfo.nationality && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <Shield className="h-4 w-4 text-orange-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">Nationality</span>
                      <div className="text-sm text-white">{personalInfo.nationality}</div>
                    </div>
                  </div>
                )}
                {personalInfo.placeOfBirth && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <MapPin className="h-4 w-4 text-pink-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">Place of Birth</span>
                      <div className="text-sm text-white">{personalInfo.placeOfBirth}, {personalInfo.countryOfBirth || 'Bahrain'}</div>
                    </div>
                  </div>
                )}
                {personalInfo.gender && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <User className="h-4 w-4 text-indigo-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">Gender</span>
                      <div className="text-sm text-white">{personalInfo.gender}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Professional Information */}
            {(personalInfo.currentEmployer || personalInfo.jobTitle || personalInfo.workExperience || personalInfo.employment) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-blue-400" />
                    Professional Information
                  </h3>

                  {personalInfo.jobTitle && (
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <UserCheck className="h-4 w-4 text-green-400" />
                      <div className="flex-1">
                        <span className="text-xs text-white/60">Job Title</span>
                        <div className="text-sm text-white">{personalInfo.jobTitle}</div>
                      </div>
                    </div>
                  )}

                  {personalInfo.employment && (
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <Briefcase className="h-4 w-4 text-orange-400" />
                      <div className="flex-1">
                        <span className="text-xs text-white/60">Employment Status</span>
                        <div className="text-sm text-white">{personalInfo.employment}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Educational Background */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <UserCheck className="w-5 h-5 mr-2 text-purple-400" />
                    Educational Background
                  </h3>

                  {personalInfo.degree && (
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <Trophy className="h-4 w-4 text-yellow-400" />
                      <div className="flex-1">
                        <span className="text-xs text-white/60">Qualification</span>
                        <div className="text-sm text-white">{personalInfo.degree}</div>
                      </div>
                    </div>
                  )}
                  {personalInfo.graduationDate && (
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <div className="flex-1">
                        <span className="text-xs text-white/60">Graduation Date</span>
                        <div className="text-sm text-white">{personalInfo.graduationDate}</div>
                      </div>
                    </div>
                  )}

                  {personalInfo.qualification && (
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <Award className="h-4 w-4 text-green-400" />
                      <div className="flex-1">
                        <span className="text-xs text-white/60">Qualification Level</span>
                        <div className="text-sm text-white">{personalInfo.qualification}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* User Roles */}
            {analytics.rawData?.userRoles && analytics.rawData.userRoles.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <UserCog className="w-5 h-5 mr-2 text-yellow-400" />
                  User Roles
                </h3>

                <div className="flex flex-wrap gap-2">
                  {analytics.rawData.userRoles.map((userRole) => (
                    <div
                      key={userRole.id}
                      className="bg-yellow-400/20 px-3 py-2 rounded-lg border border-yellow-400/30"
                      title={userRole.role.description}
                    >
                      <span className="text-yellow-400 font-semibold text-sm">
                        {userRole.role.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Emergency Contact */}
            {personalInfo.emergencyContact?.name && (
              <div className="bg-white/5 rounded-lg p-4 border border-red-500/20">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-400" />
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-white/60">Name</span>
                    <div className="text-sm text-white font-medium">{personalInfo.emergencyContact.name}</div>
                  </div>
                  {personalInfo.emergencyContact.phone && (
                    <div>
                      <span className="text-xs text-white/60">Phone</span>
                      <div className="text-sm text-white font-mono">{formatPhoneNumber(personalInfo.emergencyContact.phone)}</div>
                    </div>
                  )}
                  {personalInfo.emergencyContact.relationship && (
                    <div>
                      <span className="text-xs text-white/60">Relationship</span>
                      <div className="text-sm text-white">{personalInfo.emergencyContact.relationship}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Level Container - Right Side */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gradient-to-br from-emerald-500/20 to-teal-600/30 backdrop-blur-xl rounded-3xl p-6 border border-emerald-500/30 shadow-2xl relative overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 animate-pulse"></div>
              </div>
              
              {/* Level Header */}
              <div className="text-center mb-6 relative z-10">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full mb-4 border border-emerald-400/30 shadow-lg"
                >
                  <Trophy className="w-10 h-10 text-emerald-400 drop-shadow-lg" />
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg font-semibold text-white mb-2"
                >
                  Current Level
                </motion.h3>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                  className="text-6xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg"
                >
                  {analytics.level.current}
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-sm text-emerald-200 font-medium"
                >
                  {analytics.performance?.notation || 'Student'}
                </motion.div>
              </div>

              {/* Progress Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    {/* Background circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="12"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - analytics.level.progress / 100)}`}
                      className="transition-all duration-1000 ease-out"
                    />
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#1D4ED8" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      {analytics.level.progress.toFixed(1)}%
                    </div>
                    <div className="text-xs text-white/60 text-center">
                      Progress to<br />Level {analytics.level.current + 1}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Details */}
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm">Current Progress</span>
                    <span className="text-primary-400 font-bold">{analytics.level.progressInKB?.toFixed(1) || '0.0'} kB</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-400 to-primary-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${analytics.level.progress}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Remaining to Next Level</span>
                    <span className="text-orange-400 font-bold">{analytics.level.remainingInKB?.toFixed(1) || '100.0'} kB</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Total XP Earned</span>
                    <span className="text-green-400 font-bold">{formatXPValue(analytics.xp.bhModule)}</span>
                  </div>
                </div>
              </div>

              {/* Next Level Preview */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="text-white/60 text-xs mb-2">
                    You are <span className="font-bold text-white">{levelsToNextRank}</span> level(s) away from the next rank!
                  </div>
                  <div className="text-sm text-white font-medium">
                    {nextRankInfo.notation}
                  </div>
                  <div className="text-2xl mt-2">
                    {nextRankInfo.badge}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Key Achievements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Academic Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10"></div>
          </div>
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
              <span className="text-blue-400 font-bold">{formatXPValue(analytics.xp.bhModule)}</span>
            </div>

            {analytics.projects.lastFinished && (
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-pink-400" />
                  <span className="text-white text-sm">Last Finished Project</span>
                </div>
                <div className="text-right">
                  <span className="text-pink-400 font-bold block">{analytics.projects.lastFinished.name}</span>
                  <span className="text-white/70 text-xs">{formatDate(analytics.projects.lastFinished.completedAt)}</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm">Audit Ratio</span>
              </div>
              <span className="text-green-400 font-bold">{formatAuditRatio(analytics.audits.ratio)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-purple-400" />
                <span className="text-white text-sm">Projects Completed</span>
              </div>
              <span className="text-purple-400 font-bold">{analytics.projects.bhModule.completed}</span>
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
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"></div>
          </div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-green-400" />
            Community Involvement
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-blue-400" />
                <span className="text-white text-sm">Completed Audits Given</span>
              </div>
              <span className="text-blue-400 font-bold">{analytics.audits.given}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-cyan-400" />
                <span className="text-white text-sm">Completed Audits Received</span>
              </div>
              <span className="text-cyan-400 font-bold">{analytics.audits.received}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm">Total Up (Audit Points)</span>
              </div>
              <span className="text-green-400 font-bold">{formatXPValue(analytics.audits.totalUp)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />
                <span className="text-white text-sm">Total Down (Audit Points)</span>
              </div>
              <span className="text-red-400 font-bold">{formatXPValue(analytics.audits.totalDown)}</span>
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
              <span className="text-purple-400 font-bold">{analytics.projects.bhModule.passRate}%</span>
            </div>
          </div>
        </motion.div>
      </div>



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
              <span className="text-blue-400 font-bold">{formatXPValue(analytics.xp.bhModule)}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/70">
                <span>Projects:</span>
                <span>{analytics.projects.bhModule?.total || analytics.projects.bhModule || 0}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Current Level:</span>
                <span>{analytics.level.current}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                <div
                  className="bg-blue-400 h-2 rounded-full"
                  style={{ width: `${(analytics.xp.bhModule / (analytics.xp.bhModule + analytics.xp.piscines)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Piscines Progress */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">Piscines (Intensive Training)</h4>
              <span className="text-green-400 font-bold">{formatXPValue(analytics.xp.piscines)}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/70">
                <span>Projects:</span>
                <span>{analytics.projects.piscines?.total || analytics.projects.piscines || 0}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Modules:</span>
                <span>{analytics.moduleData?.piscines || 0}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                <div
                  className="bg-green-400 h-2 rounded-full"
                  style={{ width: `${(analytics.xp.piscines / (analytics.xp.bhModule + analytics.xp.piscines)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  )
}

export default ProfileSection