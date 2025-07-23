import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import {
  Users,
  Calendar,
  BookOpen,
  Award,
  TrendingUp,
  Database,
  Activity,
  Target,
  GitBranch,
  FileText,
  UserCheck,
  Zap,
  BarChart3,
  PieChart,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Clock,
  Star
} from 'lucide-react'
import { User } from '../../types'
import XPSection from './XPSection'
import AuditSection from './AuditSection'
import StatsSection from './StatsSection'
import ProjectProgressTracker from './ProjectProgressTracker'
import LoadingSpinner from '../ui/LoadingSpinner'
import QueryWrapper from '../ui/QueryWrapper'
import StatisticsChart from '../charts/StatisticsChart'
import DataDistributionChart from '../charts/DataDistributionChart'
import ProgressVisualization from '../charts/ProgressVisualization'
import TimelineVisualization from '../charts/TimelineVisualization'
import { formatDate, formatTotalXP } from '../../utils/dataFormatting'

interface StatisticsSectionProps {
  user: User
}

type StatisticsTab = 'overview' | 'analytics' | 'trends'

// Comprehensive statistics query using our tested queries
const COMPREHENSIVE_STATS_QUERY = gql`
  query GetComprehensiveStatistics {
    # User statistics
    user_aggregate {
      aggregate {
        count
      }
    }

    # Event statistics
    event_user_view_aggregate {
      aggregate {
        count
      }
    }

    # Group statistics
    group_aggregate {
      aggregate {
        count
      }
    }

    group_user_aggregate {
      aggregate {
        count
      }
    }

    # Object and learning material statistics
    object_aggregate {
      aggregate {
        count
      }
    }

    object_availability_aggregate {
      aggregate {
        count
      }
    }

    object_child_aggregate {
      aggregate {
        count
      }
    }

    # Progress and results statistics
    progress_aggregate {
      aggregate {
        count
      }
    }

    result_aggregate {
      aggregate {
        count
      }
    }

    # Transaction and XP statistics
    transaction_aggregate {
      aggregate {
        count
        sum {
          amount
        }
      }
    }

    xp_transactions: transaction_aggregate(where: {type: {_eq: "xp"}}) {
      aggregate {
        count
        sum {
          amount
        }
      }
    }

    # Audit statistics
    audit_aggregate {
      aggregate {
        count
      }
    }

    # Registration statistics
    registration_aggregate {
      aggregate {
        count
      }
    }

    registration_user_view_aggregate {
      aggregate {
        count
      }
    }

    # Path and curriculum statistics
    path_aggregate {
      aggregate {
        count
      }
    }

    path_archive_aggregate {
      aggregate {
        count
      }
    }

    # Additional system statistics
    role_aggregate {
      aggregate {
        count
      }
    }

    object_type_aggregate {
      aggregate {
        count
      }
    }

    transaction_type_aggregate {
      aggregate {
        count
      }
    }

    record_type_aggregate {
      aggregate {
        count
      }
    }

    label_aggregate {
      aggregate {
        count
      }
    }

    markdown_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<StatisticsTab>('overview')

  const { data: statsData, loading: statsLoading, error: statsError } = useQuery(COMPREHENSIVE_STATS_QUERY, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Create statistics cards data
  const getStatsCards = () => {
    if (!statsData) return [];

    return [
      {
        title: 'Total Users',
        value: statsData.user_aggregate?.aggregate?.count || 0,
        icon: Users,
        color: 'from-blue-500 to-blue-600',
        description: 'Active platform users'
      },
      {
        title: 'Event Participations',
        value: statsData.event_user_view_aggregate?.aggregate?.count || 0,
        icon: Calendar,
        color: 'from-green-500 to-green-600',
        description: 'Event user records'
      },
      {
        title: 'Active Groups',
        value: statsData.group_aggregate?.aggregate?.count || 0,
        icon: Users,
        color: 'from-purple-500 to-purple-600',
        description: 'Collaboration teams'
      },
      {
        title: 'Group Members',
        value: statsData.group_user_aggregate?.aggregate?.count || 0,
        icon: UserCheck,
        color: 'from-indigo-500 to-indigo-600',
        description: 'Total group memberships'
      },
      {
        title: 'Learning Objects',
        value: statsData.object_aggregate?.aggregate?.count || 0,
        icon: BookOpen,
        color: 'from-orange-500 to-orange-600',
        description: 'Curriculum materials'
      },
      {
        title: 'Object Availability',
        value: statsData.object_availability_aggregate?.aggregate?.count || 0,
        icon: Target,
        color: 'from-teal-500 to-teal-600',
        description: 'Resource availability records'
      },
      {
        title: 'Progress Records',
        value: statsData.progress_aggregate?.aggregate?.count || 0,
        icon: TrendingUp,
        color: 'from-emerald-500 to-emerald-600',
        description: 'Learning progress entries'
      },
      {
        title: 'Results',
        value: statsData.result_aggregate?.aggregate?.count || 0,
        icon: Award,
        color: 'from-yellow-500 to-yellow-600',
        description: 'Assessment results'
      },
      {
        title: 'Transactions',
        value: statsData.transaction_aggregate?.aggregate?.count || 0,
        icon: Zap,
        color: 'from-red-500 to-red-600',
        description: 'XP and skill transactions'
      },
      {
        title: 'Total XP',
        value: statsData.transaction_aggregate?.aggregate?.sum?.amount || 0,
        icon: Activity,
        color: 'from-pink-500 to-pink-600',
        description: 'Experience points earned',
        format: 'number'
      },
      {
        title: 'Audits',
        value: statsData.audit_aggregate?.aggregate?.count || 0,
        icon: FileText,
        color: 'from-cyan-500 to-cyan-600',
        description: 'Peer review records'
      },
      {
        title: 'Learning Paths',
        value: statsData.path_aggregate?.aggregate?.count || 0,
        icon: GitBranch,
        color: 'from-violet-500 to-violet-600',
        description: 'Available learning paths'
      }
    ];
  };

  const formatNumber = (num: number, format?: string) => {
    if (format === 'number' && num > 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num > 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

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
          Statistics & Analytics Dashboard
        </h1>
        <p className="text-white/70 text-lg">
          Comprehensive data insights and analytics from real-time GraphQL queries
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center mt-6">
          <div className="bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-primary-500 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Statistics Overview
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                activeTab === 'analytics'
                  ? 'bg-primary-500 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <PieChart className="w-4 h-4" />
              Advanced Analytics
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                activeTab === 'trends'
                  ? 'bg-primary-500 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Trends & Insights
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Platform Statistics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {getStatsCards().map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {statsLoading && (
                      <div className="animate-pulse w-8 h-8 bg-white/20 rounded"></div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white/90 font-medium text-sm">{stat.title}</h3>
                    <p className="text-2xl font-bold text-white">
                      {statsLoading ? '...' : formatNumber(stat.value, stat.format)}
                    </p>
                    <p className="text-white/60 text-xs">{stat.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Error Display */}
          {statsError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/20 border border-red-500/30 rounded-lg p-4"
            >
              <p className="text-red-200 text-sm">
                Some statistics may be unavailable. Using cached data where possible.
              </p>
            </motion.div>
          )}
        </>
      )}

      {activeTab === 'analytics' && (
        <>
          {/* Advanced Analytics - Data Visualizations */}
          <div className="space-y-6">
            {/* Personal Analytics - XP and Audit Statistics Grid */}
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

            {/* Additional Analytics Components */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <StatsSection user={user} />
              </motion.div>

              {/* Project Progress Tracker */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <ProjectProgressTracker user={user} />
              </motion.div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'trends' && (
        <>
          {/* Trends & Insights */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-primary-400" />
                <h2 className="text-xl font-semibold text-white">Performance Trends</h2>
              </div>
              <p className="text-white/70 mb-4">
                Analyze your learning progress and performance trends over time.
              </p>

              {/* Placeholder for trend visualizations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="text-white font-medium mb-2">XP Growth Trend</h3>
                  <p className="text-white/60 text-sm">Track your XP accumulation over time</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="text-white font-medium mb-2">Audit Performance</h3>
                  <p className="text-white/60 text-sm">Monitor your audit success rate</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="text-white font-medium mb-2">Project Completion</h3>
                  <p className="text-white/60 text-sm">View project completion patterns</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="text-white font-medium mb-2">Learning Velocity</h3>
                  <p className="text-white/60 text-sm">Measure your learning speed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}

      {/* Data Source Information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Database className="w-5 h-5 text-primary-400" />
            <div>
              <p className="text-white font-medium text-sm">Data Source</p>
              <p className="text-white/60 text-xs">
                Real-time data from 113 comprehensive GraphQL queries
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/90 text-sm font-medium">
              {statsLoading ? 'Loading...' : 'Live Data'}
            </p>
            <p className="text-white/60 text-xs">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default StatisticsSection
