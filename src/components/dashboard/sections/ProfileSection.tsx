import React from 'react'
import { motion } from 'framer-motion'
import { User as UserType } from '../../../types'
import {
  User, Calendar, MapPin, Mail, Award, Star, Trophy, Code, Users, Target, TrendingUp,
  Phone, CreditCard, Heart, Shield, UserCheck,
  Briefcase, UserCog, Zap
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
    <div className="space-y-8 relative pt-0">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-teal-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(52, 211, 153, 0.08) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="relative z-10 space-y-8">
      {/* Main Profile Card - Enhanced */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
        className="bg-gradient-to-br from-slate-900/60 via-emerald-900/10 to-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 relative overflow-hidden hover:shadow-3xl hover:shadow-emerald-500/20 transition-all duration-700 hover:border-emerald-400/30 group"
      >
        {/* Enhanced animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-teal-500/20 group-hover:from-emerald-400/30 group-hover:to-teal-400/30 transition-all duration-700"></div>
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: `radial-gradient(circle at 40px 40px, rgba(52, 211, 153, 0.15) 2px, transparent 0)`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-12 right-12 w-1 h-1 bg-cyan-400/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-teal-400/35 rounded-full animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* User Info Container - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced Basic Profile Information */}
            <div className="flex items-center space-x-8 relative z-10">
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
                  {/* Simple animated glow effect */}
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

              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <motion.h2 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                    className="text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent mb-2 drop-shadow-lg"
                  >
                    {userData.attrs?.displayName ||
                      `${userData.firstName || ''} ${userData.lastName || ''}`.trim() ||
                      user.login}
                  </motion.h2>
                  
                  {/* Admin Badge */}
                  {analytics.rawData?.userRoles?.some((role: any) => role.role.name.toLowerCase().includes('admin')) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                      className="bg-gradient-to-r from-red-500/20 to-orange-500/20 px-3 py-1 rounded-lg border border-red-500/30 backdrop-blur-sm shadow-lg shadow-red-500/20"
                    >
                      <div className="flex items-center space-x-1">
                        <span className="text-lg">⚡</span>
                        <span className="text-red-300 text-sm font-medium">Admin</span>
                      </div>
                    </motion.div>
                  )}
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <span className="text-white/90 text-lg font-medium">@{user.login}</span>
                  <div className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 px-3 py-1 rounded-lg border border-purple-500/30 backdrop-blur-sm">
                    <span className="text-purple-300 text-sm font-medium">ID: {userData.id}</span>
                  </div>
                </motion.div>

                {analytics.performance && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
                    className="space-y-3"
                  >
                    {/* Compact notation, XP display and labels - all in one row */}
                    <div className="flex items-center gap-4 flex-wrap">
                      {/* Performance Notation - Small Card */}
                      <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 px-4 py-2 rounded-xl border border-emerald-400/30 backdrop-blur-sm">
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-4 h-4 text-emerald-300" />
                          <span className="text-emerald-200 font-bold text-sm">
                            {analytics.performance.notation}
                          </span>
                        </div>
                      </div>
                      
                      {/* Total XP - Small Card */}
                      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 px-4 py-2 rounded-xl border border-blue-400/30 backdrop-blur-sm">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-blue-300" />
                          <span className="text-blue-200 font-bold text-sm">
                           {formatXPValue(analytics.xp.total)} Total XP
                          </span>
                        </div>
                      </div>

                      {/* Enhanced user labels section - inline */}
                      {analytics.rawData?.userLabels && analytics.rawData.userLabels.length > 0 && (
                        <>
                          {analytics.rawData.userLabels.map((userLabel, index) => (
                            <motion.div
                              key={userLabel.id}
                              initial={{ opacity: 0, scale: 0.8, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 200 }}
                              className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 px-3 py-2 rounded-xl border border-cyan-400/30 backdrop-blur-lg hover:from-cyan-400/30 hover:to-blue-400/30 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 shadow-lg shadow-cyan-500/10 group relative overflow-hidden"
                              title={userLabel.label.description}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <div className="relative z-10 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                                <span className="text-cyan-200 font-semibold text-sm group-hover:text-white transition-colors">
                                  {userLabel.label.name}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Enhanced Contact & Personal Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Enhanced Contact Information */}
              <div className="space-y-4">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-xl font-bold text-white mb-4 flex items-center"
                >
                  <div className="p-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg mr-3">
                    <Phone className="w-5 h-5 text-blue-300" />
                  </div>
                  Contact Information
                </motion.h3>

                {personalInfo.email && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 backdrop-blur-lg hover:from-blue-500/20 hover:to-cyan-500/20 hover:border-blue-400/30 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg group-hover:from-blue-400/40 group-hover:to-cyan-400/40 transition-all duration-300">
                      <Mail className="h-5 w-5 text-blue-300" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-blue-200/80 font-medium">Email Address</span>
                      <div className="text-sm text-white font-semibold">{personalInfo.email}</div>
                    </div>
                  </motion.div>
                )}
                {personalInfo.phone && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 backdrop-blur-lg hover:from-green-500/20 hover:to-emerald-500/20 hover:border-green-400/30 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-lg group-hover:from-green-400/40 group-hover:to-emerald-400/40 transition-all duration-300">
                      <Phone className="h-5 w-5 text-green-300" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-green-200/80 font-medium">Mobile Number</span>
                      <div className="text-sm text-white font-semibold">{formatPhoneNumber(personalInfo.phone)}</div>
                    </div>
                  </motion.div>
                )}
                {(personalInfo.address?.street || personalInfo.address?.city) && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl border border-purple-500/20 backdrop-blur-lg hover:from-purple-500/20 hover:to-violet-500/20 hover:border-purple-400/30 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-gradient-to-r from-purple-500/30 to-violet-500/30 rounded-lg group-hover:from-purple-400/40 group-hover:to-violet-400/40 transition-all duration-300">
                      <MapPin className="h-5 w-5 text-purple-300" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-purple-200/80 font-medium">Home Address</span>
                      <div className="text-sm text-white font-semibold">
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
                  </motion.div>
                )}
                {/* Enhanced Date Information */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20 backdrop-blur-lg hover:from-orange-500/20 hover:to-amber-500/20 hover:border-orange-400/30 transition-all duration-300 group"
                >
                  <div className="p-2 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-lg group-hover:from-orange-400/40 group-hover:to-amber-400/40 transition-all duration-300">
                    <Calendar className="h-5 w-5 text-orange-300" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-orange-200/80 font-medium">Date Registered</span>
                    <div className="text-sm text-white font-semibold">{formatDate(userData.createdAt)}</div>
                    <div className="text-xs text-orange-200/60 mt-1">Account creation date</div>
                  </div>
                </motion.div>
                
                {bhModuleJoinInfo && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-xl border border-teal-500/20 backdrop-blur-lg hover:from-teal-500/20 hover:to-cyan-500/20 hover:border-teal-400/30 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-lg group-hover:from-teal-400/40 group-hover:to-cyan-400/40 transition-all duration-300">
                      <UserCheck className="h-5 w-5 text-teal-300" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-teal-200/80 font-medium">{bhModuleJoinInfo.label}</span>
                      <div className="text-sm text-white font-semibold">{formatDate(bhModuleJoinInfo.date)}</div>
                      <div className="text-xs text-teal-200/60 mt-1">{bhModuleJoinInfo.description}</div>
                      {bhModuleJoinInfo.date === userData.createdAt && (
                        <div className="text-xs text-yellow-400 mt-1 font-medium">Same as registration date</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Enhanced Identity Information */}
              <div className="space-y-4">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-xl font-bold text-white mb-4 flex items-center"
                >
                  <div className="p-2 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-lg mr-3">
                    <CreditCard className="w-5 h-5 text-green-300" />
                  </div>
                  Identity Information
                </motion.h3>

                {personalInfo.cprNumber && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20 backdrop-blur-lg hover:from-blue-500/20 hover:to-indigo-500/20 hover:border-blue-400/30 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-lg group-hover:from-blue-400/40 group-hover:to-indigo-400/40 transition-all duration-300">
                      <CreditCard className="h-5 w-5 text-blue-300" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-blue-200/80 font-medium">CPR Number</span>
                      <div className="text-sm text-white font-mono font-semibold">{personalInfo.cprNumber}</div>
                    </div>
                  </motion.div>
                )}
                {personalInfo.dateOfBirth && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 backdrop-blur-lg hover:from-purple-500/20 hover:to-pink-500/20 hover:border-purple-400/30 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-lg group-hover:from-purple-400/40 group-hover:to-pink-400/40 transition-all duration-300">
                      <Calendar className="h-5 w-5 text-purple-300" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-purple-200/80 font-medium">Date of Birth</span>
                      <div className="text-sm text-white font-semibold">{formatDate(personalInfo.dateOfBirth)}</div>
                    </div>
                  </motion.div>
                )}
                {personalInfo.nationality && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20 backdrop-blur-lg hover:from-orange-500/20 hover:to-red-500/20 hover:border-orange-400/30 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-lg group-hover:from-orange-400/40 group-hover:to-red-400/40 transition-all duration-300">
                      <Shield className="h-5 w-5 text-orange-300" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-orange-200/80 font-medium">Nationality</span>
                      <div className="text-sm text-white font-semibold">{personalInfo.nationality}</div>
                    </div>
                  </motion.div>
                )}
                {personalInfo.placeOfBirth && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl border border-pink-500/20 backdrop-blur-lg hover:from-pink-500/20 hover:to-rose-500/20 hover:border-pink-400/30 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-lg group-hover:from-pink-400/40 group-hover:to-rose-400/40 transition-all duration-300">
                      <MapPin className="h-5 w-5 text-pink-300" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-pink-200/80 font-medium">Place of Birth</span>
                      <div className="text-sm text-white font-semibold">{personalInfo.placeOfBirth}, {personalInfo.countryOfBirth || 'Bahrain'}</div>
                    </div>
                  </motion.div>
                )}
                {personalInfo.gender && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-xl border border-indigo-500/20 backdrop-blur-lg hover:from-indigo-500/20 hover:to-violet-500/20 hover:border-indigo-400/30 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-gradient-to-r from-indigo-500/30 to-violet-500/30 rounded-lg group-hover:from-indigo-400/40 group-hover:to-violet-400/40 transition-all duration-300">
                      <User className="h-5 w-5 text-indigo-300" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-indigo-200/80 font-medium">Gender</span>
                      <div className="text-sm text-white font-semibold">{personalInfo.gender}</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Enhanced User Roles */}
            {analytics.rawData?.userRoles && analytics.rawData.userRoles.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="bg-gradient-to-br from-yellow-500/15 to-amber-500/15 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30 shadow-lg shadow-yellow-500/10"
              >
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.9 }}
                  className="text-xl font-bold text-white mb-4 flex items-center"
                >
                  <div className="p-2 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 rounded-lg mr-3">
                    <UserCog className="w-5 h-5 text-yellow-300" />
                  </div>
                  User Roles
                </motion.h3>

                <div className="flex flex-wrap gap-3">
                  {analytics.rawData.userRoles.map((userRole, index) => (
                    <motion.div
                      key={userRole.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.0 + index * 0.1 }}
                      className="bg-gradient-to-r from-yellow-500/25 to-amber-500/25 px-4 py-2 rounded-xl border border-yellow-400/40 backdrop-blur-sm hover:from-yellow-400/35 hover:to-amber-400/35 hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-500/10"
                      title={userRole.role.description}
                    >
                      <span className="text-yellow-200 font-semibold text-sm">
                        {userRole.role.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Enhanced Emergency Contact */}
            {personalInfo.emergencyContact?.name && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="bg-gradient-to-br from-red-500/15 to-rose-500/15 backdrop-blur-lg rounded-2xl p-6 border border-red-500/30 shadow-lg shadow-red-500/10 hover:shadow-red-500/20 hover:border-red-400/40 transition-all duration-300"
              >
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="text-xl font-bold text-white mb-4 flex items-center"
                >
                  <div className="p-2 bg-gradient-to-r from-red-500/30 to-rose-500/30 rounded-lg mr-3">
                    <Heart className="w-5 h-5 text-red-300" />
                  </div>
                  Emergency Contact
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="bg-white/10 rounded-xl p-4 border border-red-400/20"
                  >
                    <span className="text-xs text-red-200/80 font-medium">Name</span>
                    <div className="text-sm text-white font-semibold mt-1">{personalInfo.emergencyContact.name}</div>
                  </motion.div>
                  {personalInfo.emergencyContact.phone && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 }}
                      className="bg-white/10 rounded-xl p-4 border border-red-400/20"
                    >
                      <span className="text-xs text-red-200/80 font-medium">Phone</span>
                      <div className="text-sm text-white font-mono font-semibold mt-1">{formatPhoneNumber(personalInfo.emergencyContact.phone)}</div>
                    </motion.div>
                  )}
                  {personalInfo.emergencyContact.relationship && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.7 }}
                      className="bg-white/10 rounded-xl p-4 border border-red-400/20 md:col-span-2"
                    >
                      <span className="text-xs text-red-200/80 font-medium">Relationship</span>
                      <div className="text-sm text-white font-semibold mt-1">{personalInfo.emergencyContact.relationship}</div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Enhanced Level Container - Right Side */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gradient-to-br from-emerald-500/20 to-teal-600/30 dark:from-emerald-500/20 dark:to-teal-600/30 light:from-emerald-500/30 light:to-teal-600/40 backdrop-blur-xl rounded-3xl p-6 border border-emerald-500/30 dark:border-emerald-500/30 light:border-emerald-500/50 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden"
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
                    <span className="text-white/80 text-sm">Main Module XP</span>
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

            {/* Enhanced Professional Information - Below Level Container */}
            {(personalInfo.currentEmployer || personalInfo.jobTitle || personalInfo.workExperience || personalInfo.employment) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30 mt-6"
              >
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="text-xl font-bold text-white mb-6 flex items-center"
                >
                  <div className="p-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg mr-3">
                    <Briefcase className="w-5 h-5 text-blue-300" />
                  </div>
                  Professional Information
                </motion.h3>

                <div className="grid grid-cols-1 gap-4">
                  {personalInfo.jobTitle && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 backdrop-blur-lg hover:from-green-500/20 hover:to-emerald-500/20 hover:border-green-400/30 transition-all duration-300 group"
                    >
                      <div className="p-2 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-lg group-hover:from-green-400/40 group-hover:to-emerald-400/40 transition-all duration-300">
                        <UserCheck className="h-5 w-5 text-green-300" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-green-200/80 font-medium">Job Title</span>
                        <div className="text-sm text-white font-semibold">{personalInfo.jobTitle}</div>
                      </div>
                    </motion.div>
                  )}

                  {personalInfo.employment && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 }}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20 backdrop-blur-lg hover:from-orange-500/20 hover:to-amber-500/20 hover:border-orange-400/30 transition-all duration-300 group"
                    >
                      <div className="p-2 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-lg group-hover:from-orange-400/40 group-hover:to-amber-400/40 transition-all duration-300">
                        <Briefcase className="h-5 w-5 text-orange-300" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-orange-200/80 font-medium">Employment Status</span>
                        <div className="text-sm text-white font-semibold">{personalInfo.employment}</div>
                      </div>
                    </motion.div>
                  )}

                  {personalInfo.currentEmployer && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.7 }}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl border border-purple-500/20 backdrop-blur-lg hover:from-purple-500/20 hover:to-violet-500/20 hover:border-purple-400/30 transition-all duration-300 group"
                    >
                      <div className="p-2 bg-gradient-to-r from-purple-500/30 to-violet-500/30 rounded-lg group-hover:from-purple-400/40 group-hover:to-violet-400/40 transition-all duration-300">
                        <UserCog className="h-5 w-5 text-purple-300" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-purple-200/80 font-medium">Current Employer</span>
                        <div className="text-sm text-white font-semibold">{personalInfo.currentEmployer}</div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
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
                <span className="text-white text-sm">Total XP</span>
              </div>
              <span className="text-blue-400 font-bold">{formatXPValue(analytics.xp.total)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Trophy className="w-5 h-5 text-blue-400" />
                <span className="text-white text-sm">Main Module XP</span>
              </div>
              <span className="text-blue-400 font-bold">{formatXPValue(analytics.xp.bhModule)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm">Piscines Completed</span>
              </div>
              <span className="text-green-400 font-bold">{analytics.moduleData?.piscines || 0}</span>
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



      {/* Module Progress Comparison - REMOVED */}
      </div>
    </div>
  )
}

export default ProfileSection
