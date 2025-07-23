import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User as UserIcon,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Award,
  Star,
  Trophy,
  Activity,
  TrendingUp,
  Users,
  BookOpen,
  Target,
  Zap,
  Clock,
  GitBranch,
  BarChart3
} from 'lucide-react'
import { useQuery, gql } from '@apollo/client'
import { User } from '../../types'
import Avatar from '../ui/Avatar'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import {
  formatAuditRatio,
  formatAuditMB,
  extractContactInfo,
  getPerformanceNotation,
  formatDate
} from '../../utils/dataFormatting'

interface ProfileSectionProps {
  user: User
}

// Comprehensive user profile queries using our tested queries
const USER_PROFILE_QUERY = gql`
  query GetUserProfile($userId: Int!) {
    user_by_pk(id: $userId) {
      id
      login
      firstName
      lastName
      profile
      attrs
      createdAt
      updatedAt
      campus
      auditRatio
      totalUp
      totalDown
    }
  }
`;

const USER_TRANSACTIONS_QUERY = gql`
  query GetUserTransactions($userId: Int!) {
    transaction(where: {userId: {_eq: $userId}}, order_by: {createdAt: desc}, limit: 10) {
      id
      type
      amount
      createdAt
      path
      attrs
    }

    transaction_aggregate(where: {userId: {_eq: $userId}}) {
      aggregate {
        count
        sum {
          amount
        }
      }
    }
  }
`;

const USER_PROGRESS_QUERY = gql`
  query GetUserProgress($userId: Int!) {
    progress(where: {userId: {_eq: $userId}}, order_by: {createdAt: desc}, limit: 10) {
      id
      grade
      isDone
      path
      createdAt
      updatedAt
      version
    }

    progress_aggregate(where: {userId: {_eq: $userId}}) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }
  }
`;

const USER_RESULTS_QUERY = gql`
  query GetUserResults($userId: Int!) {
    result(where: {userId: {_eq: $userId}}, order_by: {createdAt: desc}, limit: 10) {
      id
      grade
      type
      path
      createdAt
      isLast
    }

    result_aggregate(where: {userId: {_eq: $userId}}) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }
  }
`;

const USER_AUDITS_QUERY = gql`
  query GetUserAudits($userId: Int!) {
    audit(where: {auditorId: {_eq: $userId}}, order_by: {createdAt: desc}, limit: 5) {
      id
      grade
      createdAt
      attrs
    }

    audit_aggregate(where: {auditorId: {_eq: $userId}}) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }
  }
`;

const USER_GROUPS_QUERY = gql`
  query GetUserGroups($userId: Int!) {
    group_user(where: {userId: {_eq: $userId}}) {
      id
      groupId
      createdAt
    }
  }
`;

const USER_EVENTS_QUERY = gql`
  query GetUserEvents($userId: Int!) {
    event_user(where: {userId: {_eq: $userId}}) {
      id
      eventId
      level
      createdAt
    }
  }
`;

const ProfileSection: React.FC<ProfileSectionProps> = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'progress' | 'transactions' | 'audits'>('overview');

  // Query user profile data
  const { data: profileData, loading: profileLoading, error: profileError } = useQuery(USER_PROFILE_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query user transactions
  const { data: transactionsData, loading: transactionsLoading } = useQuery(USER_TRANSACTIONS_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query user progress
  const { data: progressData, loading: progressLoading } = useQuery(USER_PROGRESS_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query user results
  const { data: resultsData, loading: resultsLoading } = useQuery(USER_RESULTS_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query user audits
  const { data: auditsData, loading: auditsLoading } = useQuery(USER_AUDITS_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query user groups
  const { data: groupsData } = useQuery(USER_GROUPS_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query user events
  const { data: eventsData } = useQuery(USER_EVENTS_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  if (profileLoading) return <LoadingSpinner />

  if (profileError) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-400">
          <p>Error loading profile data</p>
          <p className="text-sm text-white/60 mt-2">{profileError.message}</p>
        </div>
      </Card>
    )
  }

  const userData = profileData?.user_by_pk;
  if (!userData) {
    return (
      <Card className="p-6">
        <div className="text-center text-white/60">
          <p>No profile data available</p>
        </div>
      </Card>
    )
  }

  const profileInfo = userData.profile || {}
  const attrs = userData.attrs || {}
  const contactInfo = extractContactInfo(attrs)
  const performanceNotation = getPerformanceNotation(userData.auditRatio || 0)

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Avatar user={userData} size="2xl" showBorder animate />
          </motion.div>

          {/* User Info */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {userData.firstName && userData.lastName 
                  ? `${userData.firstName} ${userData.lastName}`
                  : userData.login
                }
              </h2>
              <p className="text-primary-400 font-medium mb-1">@{userData.login}</p>

              {/* Performance Notation */}
              <div className={`flex items-center mb-2 ${performanceNotation.color}`}>
                <span className="mr-2">{performanceNotation.badge}</span>
                <span className="font-medium">{performanceNotation.notation}</span>
                <span className="text-white/60 text-sm ml-2">• {performanceNotation.description}</span>
              </div>

              {/* Campus */}
              {userData.campus && (
                <div className="flex items-center text-white/70 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="capitalize">{userData.campus}</span>
                </div>
              )}

              {/* Join Date */}
              <div className="flex items-center text-white/70">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Joined {formatDate(userData.createdAt)}</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-4 text-center"
          >
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-primary-400">
                {formatAuditRatio(userData.auditRatio)}
              </div>
              <div className="text-xs text-white/60">Audit Ratio</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-400">
                {formatAuditMB(userData.totalUp)}
              </div>
              <div className="text-xs text-white/60">Audits Given</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-400">
                {formatAuditMB(userData.totalDown)}
              </div>
              <div className="text-xs text-white/60">Audits Received</div>
            </div>
          </motion.div>
        </div>
      </Card>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2 text-primary-400" />
            Contact Information
          </h3>
          <div className="space-y-3">
            {contactInfo?.personal?.email && (
              <div className="flex items-center text-white/80">
                <Mail className="w-4 h-4 mr-3 text-white/50" />
                <span>{contactInfo.personal.email}</span>
              </div>
            )}
            {contactInfo?.personal?.phone && (
              <div className="flex items-center text-white/80">
                <Phone className="w-4 h-4 mr-3 text-white/50" />
                <span>{contactInfo.personal.phone}</span>
              </div>
            )}
            {contactInfo?.address?.city && contactInfo?.address?.country && (
              <div className="flex items-center text-white/80">
                <MapPin className="w-4 h-4 mr-3 text-white/50" />
                <span>{contactInfo.address.city}, {contactInfo.address.country}</span>
              </div>
            )}
            {!contactInfo?.personal?.email && !contactInfo?.personal?.phone && (
              <p className="text-white/50 text-sm">No contact information available</p>
            )}
          </div>
        </Card>

        {/* Profile Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <UserIcon className="w-5 h-5 mr-2 text-primary-400" />
            Profile Details
          </h3>
          <div className="space-y-3">
            {attrs.country && (
              <div>
                <span className="text-white/60 text-sm">Country:</span>
                <p className="text-white/80">{attrs.country}</p>
              </div>
            )}
            {attrs.degree && (
              <div>
                <span className="text-white/60 text-sm">Education:</span>
                <p className="text-white/80">{attrs.degree}</p>
              </div>
            )}
            {profileInfo.bio && (
              <div>
                <span className="text-white/60 text-sm">Bio:</span>
                <p className="text-white/80">{profileInfo.bio}</p>
              </div>
            )}
            {!attrs.country && !attrs.degree && !profileInfo.bio && (
              <p className="text-white/50 text-sm">No additional details available</p>
            )}
          </div>
        </Card>
      </div>

      {/* Comprehensive Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary-400" />
            Comprehensive Learning Analytics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total XP */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                {transactionsLoading && (
                  <div className="animate-pulse w-6 h-6 bg-white/20 rounded"></div>
                )}
              </div>
              <div className="space-y-1">
                <h4 className="text-white/90 font-medium text-sm">Total XP</h4>
                <p className="text-xl font-bold text-white">
                  {transactionsData?.transaction_aggregate?.aggregate?.sum?.amount?.toLocaleString() || '0'}
                </p>
              </div>
            </motion.div>

            {/* Progress Records */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                {progressLoading && (
                  <div className="animate-pulse w-6 h-6 bg-white/20 rounded"></div>
                )}
              </div>
              <div className="space-y-1">
                <h4 className="text-white/90 font-medium text-sm">Progress Records</h4>
                <p className="text-xl font-bold text-white">
                  {progressData?.progress_aggregate?.aggregate?.count || '0'}
                </p>
              </div>
            </motion.div>

            {/* Average Grade */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500">
                  <Star className="w-4 h-4 text-white" />
                </div>
                {progressLoading && (
                  <div className="animate-pulse w-6 h-6 bg-white/20 rounded"></div>
                )}
              </div>
              <div className="space-y-1">
                <h4 className="text-white/90 font-medium text-sm">Average Grade</h4>
                <p className="text-xl font-bold text-white">
                  {progressData?.progress_aggregate?.aggregate?.avg?.grade?.toFixed(1) || '0'}%
                </p>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                {resultsLoading && (
                  <div className="animate-pulse w-6 h-6 bg-white/20 rounded"></div>
                )}
              </div>
              <div className="space-y-1">
                <h4 className="text-white/90 font-medium text-sm">Results</h4>
                <p className="text-xl font-bold text-white">
                  {resultsData?.result_aggregate?.aggregate?.count || '0'}
                </p>
              </div>
            </motion.div>

            {/* Audits Given */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500">
                  <Award className="w-4 h-4 text-white" />
                </div>
                {auditsLoading && (
                  <div className="animate-pulse w-6 h-6 bg-white/20 rounded"></div>
                )}
              </div>
              <div className="space-y-1">
                <h4 className="text-white/90 font-medium text-sm">Audits Given</h4>
                <p className="text-xl font-bold text-white">
                  {auditsData?.audit_aggregate?.aggregate?.count || '0'}
                </p>
              </div>
            </motion.div>

            {/* Groups */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500">
                  <Users className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-white/90 font-medium text-sm">Groups</h4>
                <p className="text-xl font-bold text-white">
                  {groupsData?.group_user?.length || '0'}
                </p>
              </div>
            </motion.div>

            {/* Events */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-white/90 font-medium text-sm">Events</h4>
                <p className="text-xl font-bold text-white">
                  {eventsData?.event_user?.length || '0'}
                </p>
              </div>
            </motion.div>

            {/* Transactions */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                {transactionsLoading && (
                  <div className="animate-pulse w-6 h-6 bg-white/20 rounded"></div>
                )}
              </div>
              <div className="space-y-1">
                <h4 className="text-white/90 font-medium text-sm">Transactions</h4>
                <p className="text-xl font-bold text-white">
                  {transactionsData?.transaction_aggregate?.aggregate?.count || '0'}
                </p>
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-primary-400" />
            Recent Activity
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Progress */}
            <div>
              <h4 className="text-white font-medium mb-3 flex items-center">
                <GitBranch className="w-4 h-4 mr-2 text-green-400" />
                Recent Progress ({progressData?.progress?.length || 0})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {progressData?.progress?.slice(0, 5).map((progress: any) => (
                  <div key={progress.id} className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/80 text-sm truncate">{progress.path}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        progress.isDone ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {progress.isDone ? 'Complete' : 'In Progress'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-xs">Grade: {progress.grade}%</span>
                      <span className="text-white/60 text-xs">{formatDate(progress.createdAt)}</span>
                    </div>
                  </div>
                ))}
                {(!progressData?.progress || progressData.progress.length === 0) && (
                  <p className="text-white/50 text-sm">No recent progress available</p>
                )}
              </div>
            </div>

            {/* Recent Transactions */}
            <div>
              <h4 className="text-white font-medium mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                Recent Transactions ({transactionsData?.transaction?.length || 0})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {transactionsData?.transaction?.slice(0, 5).map((transaction: any) => (
                  <div key={transaction.id} className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/80 text-sm">{transaction.type}</span>
                      <span className={`text-sm font-medium ${
                        transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-xs truncate">{transaction.path}</span>
                      <span className="text-white/60 text-xs">{formatDate(transaction.createdAt)}</span>
                    </div>
                  </div>
                ))}
                {(!transactionsData?.transaction || transactionsData.transaction.length === 0) && (
                  <p className="text-white/50 text-sm">No recent transactions available</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default ProfileSection
