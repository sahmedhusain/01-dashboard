import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import { 
  Trophy, 
  Award, 
  Target, 
  TrendingUp,
  Search,
  Filter,
  ChevronRight,
  ChevronDown,
  Calendar,
  User,
  Star,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Medal,
  Zap
} from 'lucide-react'
import { User as UserType } from '../../types'
import LoadingSpinner from '../ui/LoadingSpinner'
import { formatDate, formatDateTime } from '../../utils/dataFormatting'

interface ResultSectionProps {
  user: UserType
}

// Comprehensive result queries using our tested queries - NO LIMITS
const GET_ALL_RESULTS = gql`
  query GetAllResults {
    result(order_by: {createdAt: desc}) {
      id
      objectId
      userId
      grade
      progressId
      type
      createdAt
      updatedAt
      attrs
      groupId
      path
    }

    result_aggregate {
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
  }
`;

const GET_USER_RESULTS = gql`
  query GetUserResults($userId: Int!) {
    result(where: {userId: {_eq: $userId}}, order_by: {createdAt: desc}) {
      id
      objectId
      grade
      progressId
      type
      createdAt
      updatedAt
      attrs
      groupId
      path
    }
    
    result_aggregate(where: {userId: {_eq: $userId}}) {
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
  }
`;

const GET_RESULTS_BY_TYPE = gql`
  query GetResultsByType($type: String!) {
    result(where: {type: {_eq: $type}}) {
      id
      objectId
      userId
      grade
      type
      createdAt
      path
    }
  }
`;

const GET_RESULT_TYPES = gql`
  query GetResultTypes {
    result_type {
      type
    }
    
    result_type_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const ResultSection: React.FC<ResultSectionProps> = ({ user }) => {
  const [selectedView, setSelectedView] = useState<'all-results' | 'my-results' | 'by-type' | 'achievements'>('all-results');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [selectedResult, setSelectedResult] = useState<number | null>(null);

  // Query all results
  const { data: allResultsData, loading: allResultsLoading, error: allResultsError } = useQuery(GET_ALL_RESULTS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query user's results
  const { data: userResultsData, loading: userResultsLoading } = useQuery(GET_USER_RESULTS, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query result types
  const { data: resultTypesData, loading: resultTypesLoading } = useQuery(GET_RESULT_TYPES, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  if (allResultsLoading && !allResultsData) {
    return <LoadingSpinner />;
  }

  if (allResultsError) {
    return (
      <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
        <p className="text-red-200">Error loading result data: {allResultsError.message}</p>
      </div>
    );
  }

  const allResults = allResultsData?.result || [];
  const allResultsStats = allResultsData?.result_aggregate?.aggregate;
  const userResults = userResultsData?.result || [];
  const userResultsStats = userResultsData?.result_aggregate?.aggregate;
  const resultTypes = resultTypesData?.result_type || [];
  const totalResultTypes = resultTypesData?.result_type_aggregate?.aggregate?.count || 0;

  // Calculate comprehensive statistics
  const totalResults = allResultsStats?.count || 0;
  const averageGrade = allResultsStats?.avg?.grade || 0;
  const maxGrade = allResultsStats?.max?.grade || 0;
  const minGrade = allResultsStats?.min?.grade || 0;

  // User specific statistics
  const userTotalResults = userResultsStats?.count || 0;
  const userAverageGrade = userResultsStats?.avg?.grade || 0;
  const userMaxGrade = userResultsStats?.max?.grade || 0;
  const userMinGrade = userResultsStats?.min?.grade || 0;

  // Calculate achievements
  const achievements = {
    totalCompleted: userResults.filter((r: any) => r.grade >= 1).length,
    perfectScores: userResults.filter((r: any) => r.grade === 100).length,
    highGrades: userResults.filter((r: any) => r.grade >= 80).length,
    recentActivity: userResults.filter((r: any) => {
      const resultDate = new Date(r.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return resultDate >= weekAgo;
    }).length
  };

  // Filter results based on view and filters
  const getFilteredResults = () => {
    let filtered = [];
    
    switch (selectedView) {
      case 'all-results':
        filtered = allResults;
        break;
      case 'my-results':
        filtered = userResults;
        break;
      case 'by-type':
        filtered = allResults;
        break;
      case 'achievements':
        filtered = userResults.filter((r: any) => r.grade >= 80); // High achievers
        break;
      default:
        filtered = allResults;
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((result: any) => 
        result.path?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.id?.toString().includes(searchTerm)
      );
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((result: any) => result.type === typeFilter);
    }

    // Apply grade filter
    if (gradeFilter !== 'all') {
      switch (gradeFilter) {
        case 'perfect':
          filtered = filtered.filter((result: any) => result.grade === 100);
          break;
        case 'high':
          filtered = filtered.filter((result: any) => result.grade >= 80);
          break;
        case 'pass':
          filtered = filtered.filter((result: any) => result.grade >= 1);
          break;
        case 'fail':
          filtered = filtered.filter((result: any) => result.grade < 1);
          break;
      }
    }

    return filtered;
  };

  // Get result status and color
  const getResultStatus = (grade: number) => {
    if (grade === 100) {
      return { status: 'Perfect', color: 'text-yellow-400 bg-yellow-400/20', icon: Medal };
    } else if (grade >= 80) {
      return { status: 'Excellent', color: 'text-green-400 bg-green-400/20', icon: Trophy };
    } else if (grade >= 60) {
      return { status: 'Good', color: 'text-blue-400 bg-blue-400/20', icon: CheckCircle };
    } else if (grade >= 1) {
      return { status: 'Pass', color: 'text-purple-400 bg-purple-400/20', icon: CheckCircle };
    } else {
      return { status: 'Fail', color: 'text-red-400 bg-red-400/20', icon: XCircle };
    }
  };

  // Get unique types for filter
  const uniqueTypes = [...new Set(allResults.map((result: any) => result.type).filter(Boolean))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Results & Achievements
        </h1>
        <p className="text-white/70 text-lg">
          Track {totalResults} results across {totalResultTypes} types with comprehensive achievement system
        </p>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-white font-medium">Total Results</p>
              <p className="text-2xl font-bold text-white">{totalResults}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-white font-medium">My Results</p>
              <p className="text-2xl font-bold text-white">{userTotalResults}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Star className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-white font-medium">My Average</p>
              <p className="text-2xl font-bold text-white">{userAverageGrade.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-white font-medium">Achievements</p>
              <p className="text-2xl font-bold text-white">{achievements.totalCompleted}</p>
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
            onClick={() => setSelectedView('all-results')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'all-results'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            All Results ({totalResults})
          </button>
          <button
            onClick={() => setSelectedView('my-results')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'my-results'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            My Results ({userTotalResults})
          </button>
          <button
            onClick={() => setSelectedView('by-type')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'by-type'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            By Type ({totalResultTypes})
          </button>
          <button
            onClick={() => setSelectedView('achievements')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'achievements'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Achievements ({achievements.totalCompleted})
          </button>
        </div>
      </motion.div>

      {/* Achievements Overview */}
      {selectedView === 'achievements' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-primary-400" />
            Achievement Dashboard
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg p-4 border border-yellow-500/30">
              <div className="flex items-center space-x-3">
                <Medal className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-yellow-200 font-medium">Perfect Scores</p>
                  <p className="text-2xl font-bold text-white">{achievements.perfectScores}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
              <div className="flex items-center space-x-3">
                <Trophy className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-green-200 font-medium">High Grades (80+)</p>
                  <p className="text-2xl font-bold text-white">{achievements.highGrades}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-blue-200 font-medium">Total Completed</p>
                  <p className="text-2xl font-bold text-white">{achievements.totalCompleted}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
              <div className="flex items-center space-x-3">
                <Zap className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-purple-200 font-medium">Recent Activity</p>
                  <p className="text-2xl font-bold text-white">{achievements.recentActivity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Progress */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Achievement Progress</h4>

            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Completion Rate</span>
                  <span className="text-white font-medium">
                    {userTotalResults > 0 ? ((achievements.totalCompleted / userTotalResults) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: userTotalResults > 0 ? `${(achievements.totalCompleted / userTotalResults) * 100}%` : '0%'
                    }}
                  />
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Excellence Rate (80+ grades)</span>
                  <span className="text-white font-medium">
                    {userTotalResults > 0 ? ((achievements.highGrades / userTotalResults) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: userTotalResults > 0 ? `${(achievements.highGrades / userTotalResults) * 100}%` : '0%'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filters */}
      {(selectedView === 'all-results' || selectedView === 'my-results' || selectedView === 'by-type') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-between"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search results by path, type, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-white/70" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Types</option>
                {uniqueTypes.map((type: string) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Grades</option>
              <option value="perfect">Perfect (100)</option>
              <option value="high">High (80+)</option>
              <option value="pass">Pass (1+)</option>
              <option value="fail">Fail (0)</option>
            </select>
          </div>
        </motion.div>
      )}

      {/* Results List */}
      {(selectedView === 'all-results' || selectedView === 'my-results' || selectedView === 'achievements') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary-400" />
            {selectedView === 'achievements' ? 'High Achievement Results' :
             selectedView === 'my-results' ? 'My Results' : 'All Results'} ({getFilteredResults().length})
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {getFilteredResults().slice(0, 50).map((result: any, index: number) => {
              const status = getResultStatus(result.grade);
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => setSelectedResult(selectedResult === result.id ? null : result.id)}
                >
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">Result #{result.id}</h4>
                        <div className="flex items-center space-x-4 text-xs text-white/60">
                          <span>Grade: {result.grade}%</span>
                          {result.type && <span>Type: {result.type}</span>}
                          {result.path && <span>Path: {result.path}</span>}
                          <span>Date: {formatDate(result.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {result.grade}%
                      </div>
                      {selectedResult === result.id ? (
                        <ChevronDown className="w-4 h-4 text-white/60" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-white/60" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {selectedResult === result.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-3 pb-3 border-t border-white/10"
                    >
                      <div className="pt-3 space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            {result.objectId && (
                              <div className="flex items-center space-x-2 text-sm">
                                <Target className="w-4 h-4 text-blue-400" />
                                <span className="text-white/80">Object ID: {result.objectId}</span>
                              </div>
                            )}
                            {result.progressId && (
                              <div className="flex items-center space-x-2 text-sm">
                                <Activity className="w-4 h-4 text-green-400" />
                                <span className="text-white/80">Progress ID: {result.progressId}</span>
                              </div>
                            )}
                            {result.groupId && (
                              <div className="flex items-center space-x-2 text-sm">
                                <User className="w-4 h-4 text-purple-400" />
                                <span className="text-white/80">Group ID: {result.groupId}</span>
                              </div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                              <Calendar className="w-4 h-4 text-orange-400" />
                              <span className="text-white/80">Created: {formatDateTime(result.createdAt)}</span>
                            </div>
                            {result.updatedAt && result.updatedAt !== result.createdAt && (
                              <div className="flex items-center space-x-2 text-sm">
                                <Clock className="w-4 h-4 text-yellow-400" />
                                <span className="text-white/80">Updated: {formatDateTime(result.updatedAt)}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Result Attributes */}
                        {result.attrs && Object.keys(result.attrs).length > 0 && (
                          <div className="mt-3">
                            <h5 className="text-white/90 font-medium text-sm mb-2">Attributes:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {Object.entries(result.attrs).slice(0, 4).map(([key, value]) => (
                                <div key={key} className="bg-white/5 rounded p-2">
                                  <span className="text-white/60 text-xs">{key}:</span>
                                  <span className="text-white text-xs ml-2">
                                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {getFilteredResults().length > 50 && (
              <div className="text-center py-4">
                <p className="text-white/60 text-sm">
                  Showing 50 of {getFilteredResults().length} results
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Loading States */}
      {(allResultsLoading || userResultsLoading || resultTypesLoading) && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-3 text-white/70">Loading result data...</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {getFilteredResults().length === 0 && !allResultsLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Trophy className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-white/70 text-lg font-medium mb-2">No results found</h3>
          <p className="text-white/50">
            Try adjusting your search criteria or filters.
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default ResultSection
