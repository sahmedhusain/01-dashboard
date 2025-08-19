import React from 'react'
import { motion } from 'framer-motion'
import { useQuery, gql } from '@apollo/client'
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

// Piscine data query from PiscinesDashboard
const PISCINE_DATA_QUERY = gql`
  query GetUserPiscineData($userId: Int!) {
    piscineTransactions: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        _or: [
          { path: { _like: "/bahrain/bh-piscine/%" } }
          { path: { _like: "/bahrain/bh-module/piscine-%" } }
          { 
            event: { 
              _or: [
                { path: { _like: "/bahrain/bh-piscine/%" } }
                { path: { _like: "/bahrain/bh-module/piscine-%" } }
              ]
            }
          }
        ]
        _not: { 
          _and: [
            { path: { _like: "%checkpoint%" } }
            { event: { path: { _like: "%checkpoint%" } } }
          ]
        }
      }
      order_by: { createdAt: desc }
    ) {
      id
      amount
      path
      createdAt
      type
      event {
        path
      }
    }
    piscineProgress: progress(
      where: {
        userId: { _eq: $userId }
        _or: [
          { path: { _like: "/bahrain/bh-piscine/%" } }  
          { path: { _like: "/bahrain/bh-module/piscine-%" } }
        ]
        _not: { path: { _like: "%checkpoint%" } }
      }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      isDone
      path
      createdAt
    }
    piscineLevels: transaction(
      where: {
        userId: { _eq: $userId },
        type: { _eq: "level" },
        _or: [
          { path: { _like: "/bahrain/bh-piscine/%" } },
          { path: { _like: "/bahrain/bh-module/piscine-%" } }
        ]
      },
      order_by: { createdAt: desc }
    ) {
      id
      amount
      path
      createdAt
    }
    
    # Total Piscine XP using the same method as DashboardSection
    totalPiscineXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        event: { path: { _like: "%piscine%" } }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;

// Piscine configuration from PiscinesDashboard
const PISCINE_CONFIG = {
  'go': { name: 'Go Piscine', path: '/bahrain/bh-piscine/', icon: Code, color: 'from-blue-500 to-cyan-500' },
  'js': { name: 'JavaScript', path: '/bahrain/bh-module/piscine-js/', icon: Zap, color: 'from-yellow-500 to-orange-500' },
  'flutter': { name: 'Flutter', path: '/bahrain/bh-module/piscine-flutter/', icon: Target, color: 'from-blue-400 to-blue-600' },
  'rust': { name: 'Rust', path: '/bahrain/bh-module/piscine-rust/', icon: Target, color: 'from-orange-600 to-red-600' },
  'ai': { name: 'AI/ML', path: '/bahrain/bh-module/piscine-ai/', icon: Zap, color: 'from-purple-500 to-pink-500' },
  'blockchain': { name: 'Blockchain', path: '/bahrain/bh-module/piscine-blockchain/', icon: Trophy, color: 'from-green-500 to-emerald-500' },
  'java': { name: 'Java', path: '/bahrain/bh-module/piscine-java/', icon: Code, color: 'from-red-500 to-red-700' },
  'ux': { name: 'UX Design', path: '/bahrain/bh-module/piscine-ux/', icon: User, color: 'from-pink-500 to-rose-500' },
  'ui': { name: 'UI Design', path: '/bahrain/bh-module/piscine-ui/', icon: User, color: 'from-indigo-500 to-purple-500' }
};

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
    bhModule?: {
      total: number;
      passed: number;
      failed: number;
      passRate: number;
      completed: number;
      inProgress: number;
    };
    piscines?: {
      total: number;
      passed: number;
      failed: number;
      passRate: number;
    };
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

  // Query piscine data
  const { data: piscineData } = useQuery(PISCINE_DATA_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });

  // Process piscine data like PiscinesDashboard does
  const piscineAnalysis = React.useMemo(() => {
    if (!piscineData) return null;

    const transactions = piscineData.piscineTransactions || [];
    const progress = piscineData.piscineProgress || [];
    const levels = piscineData.piscineLevels || [];
    const totalPiscineXP = piscineData.totalPiscineXP?.aggregate?.sum?.amount || 0;
    
    const extractPiscineType = (path: string): string => {
      if (path.includes('/bahrain/bh-piscine/')) return 'go';
      const match = path.match(/\/bahrain\/bh-module\/piscine-([^/]+)\//)
      return match ? match[1] : 'unknown';
    };

    const projectAttempts: Record<string, any> = {};

    // First, process all progress data
    progress.forEach((prog: any) => {
      const projectPath = prog.path;
      if (!projectAttempts[projectPath]) {
        projectAttempts[projectPath] = {
          path: projectPath,
          piscineType: extractPiscineType(projectPath),
          attempts: [],
          totalXP: 0,
          lastDate: prog.createdAt,
        };
      }
      projectAttempts[projectPath].attempts.push(prog);
    });

    // Then, process all transactions (including those without progress entries)
    transactions.forEach((transaction: any) => {
      // Use either transaction.path or transaction.event.path
      const transactionPath = transaction.path || transaction.event?.path;
      if (!transactionPath) return; // Skip if no valid path
      
      // If this path doesn't exist in projectAttempts, create it
      if (!projectAttempts[transactionPath]) {
        projectAttempts[transactionPath] = {
          path: transactionPath,
          piscineType: extractPiscineType(transactionPath),
          attempts: [],
          totalXP: 0,
          lastDate: transaction.createdAt,
        };
      }
      
      // Add XP from transactions
      if (transaction.type === 'xp') {
        projectAttempts[transactionPath].totalXP += transaction.amount || 0;
      }
    });

    // Determine project status
    Object.values(projectAttempts).forEach((project: any) => {
      const passed = project.attempts.some((p: any) => p.isDone && p.grade >= 1);
      project.status = passed ? 'passed' : project.attempts.some((p: any) => p.isDone) ? 'failed' : 'in-progress';
      project.failedAttempts = project.attempts.filter((p: any) => p.isDone && p.grade < 1).length;
    });

    const projectList = Object.values(projectAttempts);

    // Calculate stats per piscine type
    const piscineStats: Record<string, any> = {};
    Object.keys(PISCINE_CONFIG).forEach(type => {
      const typeProjects = projectList.filter((p: any) => p.piscineType === type);
      const passedProjects = typeProjects.filter((p: any) => p.status === 'passed').length;
      const totalXP = typeProjects.reduce((sum: number, p: any) => sum + p.totalXP, 0);
      
      const piscineLevelTransactions = levels.filter((level: any) => extractPiscineType(level.path) === type);
      const latestLevel = piscineLevelTransactions.length > 0 ? piscineLevelTransactions[0].amount : 0;

      if (typeProjects.length > 0) {
        piscineStats[type] = {
          totalXP,
          totalProjects: typeProjects.length,
          passedProjects,
          passRate: typeProjects.length > 0 ? (passedProjects / typeProjects.length) * 100 : 0,
          level: latestLevel,
        };
      }
    });

    // Use direct aggregate total XP instead of calculated sum
    const overallStats = {
      totalXP: totalPiscineXP, // Use direct aggregate from GraphQL
      totalProjects: projectList.length,
      passedProjects: projectList.filter((p: any) => p.status === 'passed').length,
      passRate: projectList.length > 0 ? (projectList.filter((p: any) => p.status === 'passed').length / projectList.length) * 100 : 0,
    };

    return {
      piscineStats,
      availablePiscines: Object.keys(piscineStats).filter(type => piscineStats[type].totalProjects > 0),
      overallStats,
    };
  }, [piscineData]);

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
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
                      <span className="text-xs text-blue-200/80 font-medium">ID Number</span>
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

              {/* Enhanced Professional Information */}
              {(personalInfo.currentEmployer || personalInfo.jobTitle || personalInfo.workExperience || personalInfo.employment) && (
                <div className="space-y-4">
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-xl font-bold text-white mb-4 flex items-center"
                  >
                    <div className="p-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg mr-3">
                      <Briefcase className="w-5 h-5 text-blue-300" />
                    </div>
                    Professional Information
                  </motion.h3>

                  {personalInfo.jobTitle && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
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
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
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
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 }}
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
              )}
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

            {/* Enhanced Emergency Contact - Compact Design */}
            {personalInfo.emergencyContact?.name && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="bg-gradient-to-br from-red-500/15 to-rose-500/15 backdrop-blur-lg rounded-xl p-4 border border-red-500/30 shadow-lg shadow-red-500/10 hover:shadow-red-500/20 hover:border-red-400/40 transition-all duration-300"
              >
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="text-lg font-bold text-white mb-3 flex items-center"
                >
                  <div className="p-1.5 bg-gradient-to-r from-red-500/30 to-rose-500/30 rounded-lg mr-2">
                    <Heart className="w-4 h-4 text-red-300" />
                  </div>
                  Emergency Contact
                </motion.h3>
                <div className="flex items-center gap-4 flex-wrap">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="bg-white/10 rounded-lg px-3 py-2 border border-red-400/20"
                  >
                    <span className="text-xs text-red-200/80 font-medium">Name:</span>
                    <span className="text-sm text-white font-semibold ml-2">{personalInfo.emergencyContact.name}</span>
                  </motion.div>
                  {personalInfo.emergencyContact.phone && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 }}
                      className="bg-white/10 rounded-lg px-3 py-2 border border-red-400/20"
                    >
                      <span className="text-xs text-red-200/80 font-medium">Phone:</span>
                      <span className="text-sm text-white font-mono font-semibold ml-2">{formatPhoneNumber(personalInfo.emergencyContact.phone)}</span>
                    </motion.div>
                  )}
                  {personalInfo.emergencyContact.relationship && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.7 }}
                      className="bg-white/10 rounded-lg px-3 py-2 border border-red-400/20"
                    >
                      <span className="text-xs text-red-200/80 font-medium">Relationship:</span>
                      <span className="text-sm text-white font-semibold ml-2">{personalInfo.emergencyContact.relationship}</span>
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


              {/* Next Level Preview */}
              <div className="mt-6 pt-4 border-white/20">
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

              {/* Academic Achievements within Level Card */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center justify-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                  Academic Achievements
                </h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-blue-400" />
                      <span className="text-white text-sm">Total XP</span>
                    </div>
                    <span className="text-blue-400 font-bold text-base">{formatXPValue(analytics.xp.total)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-blue-400" />
                      <span className="text-white text-sm">Main Module XP</span>
                    </div>
                    <span className="text-blue-400 font-bold text-base">{formatXPValue(analytics.xp.bhModule)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-green-400" />
                      <span className="text-white text-sm">Piscines Completed</span>
                    </div>
                    <span className="text-green-400 font-bold text-base">{analytics.moduleData?.piscines || 0}</span>
                  </div>
                  
                  {(analytics.projects as any)?.lastFinished && (
                    <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Code className="w-4 h-4 text-pink-400" />
                        <span className="text-white text-sm">Recent Completion</span>
                      </div>
                      <div className="text-right">
                        <span className="text-pink-400 font-bold text-base block">{(analytics.projects as any).lastFinished.name}</span>
                        <span className="text-white/70 text-xs">{formatDate((analytics.projects as any).lastFinished.completedAt)}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-green-400" />
                      <span className="text-white text-sm">Audit Ratio</span>
                    </div>
                    <span className="text-green-400 font-bold text-base">{formatAuditRatio(analytics.audits.ratio)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-purple-400" />
                      <span className="text-white text-sm">Projects Completed</span>
                    </div>
                    <span className="text-purple-400 font-bold text-base">{analytics.projects.bhModule?.completed || analytics.projects.passed || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-orange-400" />
                      <span className="text-white text-sm">Skills Mastered</span>
                    </div>
                    <span className="text-orange-400 font-bold text-base">{analytics.skills.total}</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Enhanced Key Achievements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Piscine Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
          </div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-400" />
            Piscine Achievements
          </h3>

          <div className="space-y-4">
            {piscineAnalysis ? (
              <>
                {/* Real Piscine Summary Stats */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-blue-400" />
                    <span className="text-white text-sm">Total Piscine XP</span>
                  </div>
                  <span className="text-blue-400 font-bold">{formatXPValue(piscineAnalysis.overallStats.totalXP)}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Code className="w-5 h-5 text-purple-400" />
                    <span className="text-white text-sm">Total Piscine Projects</span>
                  </div>
                  <span className="text-purple-400 font-bold">{piscineAnalysis.overallStats.totalProjects}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-5 h-5 text-green-400" />
                    <span className="text-white text-sm">Overall Pass Rate</span>
                  </div>
                  <span className="text-green-400 font-bold">{Math.round(piscineAnalysis.overallStats.passRate)}%</span>
                </div>

                {/* Individual Piscines with Level and XP */}
                {piscineAnalysis.availablePiscines.length > 0 && (
                  <div className="space-y-3 mt-6">
                    <h4 className="text-sm font-medium text-white/80 mb-3 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-400" />
                      Piscine Details ({piscineAnalysis.availablePiscines.length} completed)
                    </h4>
                    
                    {piscineAnalysis.availablePiscines.map((piscineType: string, index: number) => {
                      const config = PISCINE_CONFIG[piscineType as keyof typeof PISCINE_CONFIG];
                      const stats = piscineAnalysis.piscineStats[piscineType];
                      if (!config || !stats) return null;
                      
                      const IconComponent = config.icon;
                      
                      return (
                        <div key={piscineType} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <span className="text-white text-sm font-semibold">{config.name}</span>
                              <div className="text-xs text-blue-200/70">{stats.totalProjects} projects • {Math.round(stats.passRate)}% success</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-blue-400 font-bold text-sm">Level {stats.level}</span>
                            <div className="text-xs text-purple-300">{formatXPValue(stats.totalXP)} XP</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Fallback to analytics data while loading */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-blue-400" />
                    <span className="text-white text-sm">Total Piscine XP</span>
                  </div>
                  <span className="text-blue-400 font-bold">{formatXPValue(analytics.xp.piscines || 0)}</span>
                </div>

                <div className="text-center py-4">
                  <div className="text-white/50 text-sm">Loading piscine details...</div>
                </div>
              </>
            )}
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
              <span className="text-purple-400 font-bold">{Math.round(analytics.projects.bhModule?.passRate || 0)}%</span>
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
