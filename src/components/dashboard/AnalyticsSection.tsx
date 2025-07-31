import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity,
  Users,
  Calendar,
  Target,
  Zap,
  Award,
  Database,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Clock,
  Star
} from 'lucide-react'
import { User } from '../../types'
import LoadingSpinner from '../ui/LoadingSpinner'
import QueryWrapper from '../ui/QueryWrapper'
import StatisticsChart from '../charts/StatisticsChart'
import DataDistributionChart from '../charts/DataDistributionChart'
import ProgressVisualization from '../charts/ProgressVisualization'
import TimelineVisualization from '../charts/TimelineVisualization'
import { formatDate, formatXPValue, formatGradeDetailed } from '../../utils/dataFormatting'

interface AnalyticsSectionProps {
  user: User
}

// Complete analytics queries
const GET_PLATFORM_ANALYTICS = gql`
  query GetPlatformAnalytics {
    user_aggregate {
      aggregate {
        count
        avg {
          auditRatio
          totalUp
          totalDown
        }
        max {
          auditRatio
          totalUp
        }
        min {
          auditRatio
          totalUp
        }
      }
    }
    
    transaction_aggregate {
      aggregate {
        count
        sum {
          amount
        }
        avg {
          amount
        }
      }
    }
    
    progress_aggregate {
      aggregate {
        count
        avg {
          grade
        }
        max {
          grade
        }
        min {
          grade
        }
      }
    }
    
    audit_aggregate {
      aggregate {
        count
        avg {
          grade
        }
      }
    }
    
    event_aggregate {
      aggregate {
        count
      }
    }
    
    group_aggregate {
      aggregate {
        count
      }
    }
    
    object_aggregate {
      aggregate {
        count
      }
    }
    
    registration_aggregate {
      aggregate {
        count
      }
    }
    
    result_aggregate {
      aggregate {
        count
        avg {
          grade
        }
      }
    }
  }
`;

const GET_TRANSACTION_ANALYTICS = gql`
  query GetTransactionAnalytics {
    transaction_aggregate(group_by: [type]) {
      aggregate {
        count
        sum {
          amount
        }
        avg {
          amount
        }
      }
      nodes {
        type
      }
    }
  }
`;

const GET_CAMPUS_ANALYTICS = gql`
  query GetCampusAnalytics {
    user_aggregate(group_by: [campus]) {
      aggregate {
        count
        avg {
          auditRatio
          totalUp
        }
      }
      nodes {
        campus
      }
    }
  }
`;

const GET_TEMPORAL_ANALYTICS = gql`
  query GetTemporalAnalytics {
    user_aggregate(
      group_by: [createdAt]
      order_by: { nodes_createdAt: asc }
    ) {
      aggregate {
        count
      }
      nodes {
        createdAt
      }
    }
    
    transaction_aggregate(
      group_by: [createdAt]
      order_by: { nodes_createdAt: desc }
      limit: 30
    ) {
      aggregate {
        count
        sum {
          amount
        }
      }
      nodes {
        createdAt
      }
    }
  }
`;

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ user }) => {
  const [selectedView, setSelectedView] = useState<'overview' | 'transactions' | 'campus' | 'temporal'>('overview');
  const [refreshing, setRefreshing] = useState(false);

  // Query platform analytics
  const { data: platformData, loading: platformLoading, error: platformError, refetch: refetchPlatform } = useQuery(GET_PLATFORM_ANALYTICS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query transaction analytics
  const { data: transactionData, loading: transactionLoading, refetch: refetchTransactions } = useQuery(GET_TRANSACTION_ANALYTICS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query campus analytics
  const { data: campusData, loading: campusLoading, refetch: refetchCampus } = useQuery(GET_CAMPUS_ANALYTICS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query temporal analytics
  const { data: temporalData, loading: temporalLoading, refetch: refetchTemporal } = useQuery(GET_TEMPORAL_ANALYTICS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  if (platformLoading && !platformData) {
    return <LoadingSpinner />;
  }

  if (platformError) {
    return (
      <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
        <p className="text-red-200">Error loading analytics data: {platformError.message}</p>
      </div>
    );
  }

  // Process analytics data
  const platform = platformData || {};
  const userStats = platform.user_aggregate?.aggregate;
  const transactionStats = platform.transaction_aggregate?.aggregate;
  const progressStats = platform.progress_aggregate?.aggregate;
  const auditStats = platform.audit_aggregate?.aggregate;
  const eventStats = platform.event_aggregate?.aggregate;
  const groupStats = platform.group_aggregate?.aggregate;
  const objectStats = platform.object_aggregate?.aggregate;
  const registrationStats = platform.registration_aggregate?.aggregate;
  const resultStats = platform.result_aggregate?.aggregate;

  const transactionAnalytics = transactionData?.transaction_aggregate || [];
  const campusAnalytics = campusData?.user_aggregate || [];
  const temporalAnalytics = temporalData || {};

  // Calculate complete metrics
  const totalUsers = userStats?.count || 0;
  const avgAuditRatio = userStats?.avg?.auditRatio || 0;
  const avgXP = userStats?.avg?.totalUp || 0;
  const maxXP = userStats?.max?.totalUp || 0;
  const totalTransactions = transactionStats?.count || 0;
  const totalXPAmount = transactionStats?.sum?.amount || 0;
  const avgTransactionAmount = transactionStats?.avg?.amount || 0;
  const totalProgress = progressStats?.count || 0;
  const avgProgressGrade = progressStats?.avg?.grade || 0;
  const totalAudits = auditStats?.count || 0;
  const avgAuditGrade = auditStats?.avg?.grade || 0;
  const totalEvents = eventStats?.count || 0;
  const totalGroups = groupStats?.count || 0;
  const totalObjects = objectStats?.count || 0;
  const totalRegistrations = registrationStats?.count || 0;
  const totalResults = resultStats?.count || 0;
  const avgResultGrade = resultStats?.avg?.grade || 0;

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetchPlatform(),
        refetchTransactions(),
        refetchCampus(),
        refetchTemporal()
      ]);
    } catch (error) {
      console.error('Error refreshing analytics:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div className="text-center flex-1">
          <h1 className="text-4xl font-bold text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-white/70 text-lg">
            Complete insights across {totalUsers} users and {totalTransactions} transactions
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500/20 text-primary-400 rounded-lg border border-primary-500/30 hover:bg-primary-500/30 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </motion.div>

      {/* Key Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-4 border border-blue-500/20">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-blue-200 font-medium">Total Users</p>
              <p className="text-2xl font-bold text-white">{totalUsers.toLocaleString()}</p>
              <p className="text-blue-300/60 text-xs">Platform members</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-4 border border-green-500/20">
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-green-200 font-medium">Total XP</p>
              <p className="text-2xl font-bold text-white">{formatXPValue(totalXPAmount)}</p>
              <p className="text-green-300/60 text-xs">Experience points</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-4 border border-purple-500/20">
          <div className="flex items-center space-x-3">
            <Activity className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-purple-200 font-medium">Transactions</p>
              <p className="text-2xl font-bold text-white">{totalTransactions.toLocaleString()}</p>
              <p className="text-purple-300/60 text-xs">All transactions</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl p-4 border border-orange-500/20">
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-orange-200 font-medium">Progress Records</p>
              <p className="text-2xl font-bold text-white">{totalProgress.toLocaleString()}</p>
              <p className="text-orange-300/60 text-xs">Learning progress</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* View Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="bg-white/10 rounded-lg p-1">
          <button
            onClick={() => setSelectedView('overview')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'overview'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 mr-2 inline" />
            Overview
          </button>
          <button
            onClick={() => setSelectedView('transactions')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'transactions'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 mr-2 inline" />
            Transactions
          </button>
          <button
            onClick={() => setSelectedView('campus')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'campus'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 mr-2 inline" />
            Campus
          </button>
          <button
            onClick={() => setSelectedView('temporal')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'temporal'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 mr-2 inline" />
            Temporal
          </button>
        </div>
      </motion.div>

      {/* Overview Analytics */}
      {selectedView === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Platform Statistics */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-primary-400" />
              Platform Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Total Users</span>
                </div>
                <span className="text-white font-bold">{totalUsers.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <span className="text-white">Events</span>
                </div>
                <span className="text-white font-bold">{totalEvents.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Groups</span>
                </div>
                <span className="text-white font-bold">{totalGroups.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-orange-400" />
                  <span className="text-white">Learning Objects</span>
                </div>
                <span className="text-white font-bold">{totalObjects.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-red-400" />
                  <span className="text-white">Registrations</span>
                </div>
                <span className="text-white font-bold">{totalRegistrations.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary-400" />
              Performance Metrics
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">Average XP per User</span>
                  <span className="text-white font-bold">{formatXPValue(avgXP)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.min((avgXP / maxXP) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">Average Audit Ratio</span>
                  <span className="text-white font-bold">{avgAuditRatio.toFixed(1)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min(avgAuditRatio * 50, 100)}%` }}
                  />
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">Average Progress Grade</span>
                  <span className="text-white font-bold">{formatGradeDetailed(avgProgressGrade)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full"
                    style={{ width: `${Math.min(avgProgressGrade * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">Average Result Grade</span>
                  <span className="text-white font-bold">{formatGradeDetailed(avgResultGrade)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full"
                    style={{ width: `${Math.min(avgResultGrade * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Transaction Analytics */}
      {selectedView === 'transactions' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-primary-400" />
            Transaction Analytics by Type
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {transactionAnalytics.map((typeData: any, index: number) => {
              const type = typeData.nodes[0]?.type || 'unknown';
              const count = typeData.aggregate.count;
              const total = typeData.aggregate.sum?.amount || 0;
              const average = typeData.aggregate.avg?.amount || 0;

              return (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-primary-500/20 to-primary-600/20">
                      <Activity className="w-4 h-4 text-primary-400" />
                    </div>
                    <h4 className="text-white font-medium capitalize">{type}</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">Count:</span>
                      <span className="text-white font-medium">{count.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">Total:</span>
                      <span className="text-white font-medium">{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">Average:</span>
                      <span className="text-white font-medium">{average.toFixed(1)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Campus Analytics */}
      {selectedView === 'campus' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-primary-400" />
            Campus Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campusAnalytics.map((campusData: any, index: number) => {
              const campus = campusData.nodes[0]?.campus || 'Unknown';
              const userCount = campusData.aggregate.count;
              const avgAuditRatio = campusData.aggregate.avg?.auditRatio || 0;
              const avgXP = campusData.aggregate.avg?.totalUp || 0;

              return (
                <motion.div
                  key={campus}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-blue-600/20">
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <h4 className="text-white font-medium capitalize">{campus}</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">Users:</span>
                      <span className="text-white font-medium">{userCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">Avg XP:</span>
                      <span className="text-white font-medium">{formatXPValue(avgXP)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">Avg Audit:</span>
                      <span className="text-white font-medium">{avgAuditRatio.toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Loading States */}
      {(platformLoading || transactionLoading || campusLoading || temporalLoading) && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-3 text-white/70">Loading analytics data...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnalyticsSection
