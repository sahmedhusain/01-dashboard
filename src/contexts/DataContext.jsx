import { createContext, useReducer, useEffect } from 'react';
import { useAuth } from './authUtils';
import { useQuery } from '@apollo/client';
import {
  GET_COMPREHENSIVE_USER_ANALYTICS,
} from '../graphql/queries';
import { processGraphQLError, ERROR_TYPES, ERROR_SEVERITY } from '../utils/errorHandling';
import { getCacheConfig } from '../utils/queryOptimization';
import {
  calculateUserStatistics,
  processTransactionData,
  calculateLevel,
  processSkillData,
  processProgressData,
  processAuditData,
  bytesToKB,
  safeJsonParse,
  calculateCollaborationScore,
  analyzePerformanceTrend,
  analyzeDifficultyProgression,
  calculateProgressVelocity,
  analyzeTimeManagement,
  generateLearningPathRecommendations,
  analyzeCollaborationFrequency,
  calculateNetworkMetrics,
  analyzeTeamPerformance,
} from '../utils/dataFormatting';

// Data action types
const DATA_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_USER_DATA: 'SET_USER_DATA',
  SET_XP_DATA: 'SET_XP_DATA',
  SET_PROJECT_DATA: 'SET_PROJECT_DATA',
  SET_AUDIT_DATA: 'SET_AUDIT_DATA',
  SET_PROGRESS_DATA: 'SET_PROGRESS_DATA',
  SET_SKILL_DATA: 'SET_SKILL_DATA',
  SET_PISCINE_DATA: 'SET_PISCINE_DATA',
  CLEAR_DATA: 'CLEAR_DATA',
  REFRESH_DATA: 'REFRESH_DATA',
};

// Initial data state
const initialState = {
  // Loading states
  loading: false,
  error: null,
  
  // User data
  user: null,
  userStatistics: null,
  
  // XP data
  totalXP: 0,
  xpByProject: [],
  xpTimeline: [],
  xpStatistics: null,
  
  // Project data
  totalProjects: 0,
  passedProjects: 0,
  failedProjects: 0,
  passRate: 0,
  projectResults: [],
  
  // Audit data
  auditRatio: 0,
  auditsGiven: 0,
  auditsReceived: 0,
  auditStatistics: null,
  
  // Progress data
  totalProgress: 0,
  completedProgress: 0,
  inProgressItems: 0,
  completionRate: 0,
  progressData: [],
  
  // Skill data
  skills: [],
  skillStatistics: null,

  // Piscine data
  piscineStats: null,

  // Advanced analytics
  performanceTrend: null,
  difficultyProgression: null,
  progressVelocity: null,
  timeManagement: null,
  learningPathRecommendations: null,
  collaborationFrequency: null,
  networkMetrics: null,
  teamPerformance: null,

  // Computed values
  userLevel: 1,
  levelProgress: { currentLevel: 1, progressPercentage: 0, xpNeeded: 1000 },
  
  // Data freshness
  lastUpdated: null,
  isStale: false,
};

// Data reducer
const dataReducer = (state, action) => {
  switch (action.type) {
    case DATA_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: action.payload ? null : state.error,
      };

    case DATA_ACTIONS.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DATA_ACTIONS.SET_USER_DATA: {
      const userStats = calculateUserStatistics(action.payload);
      return {
        ...state,
        user: action.payload,
        userStatistics: userStats,
        totalXP: userStats?.totalXP || 0,
        userLevel: userStats?.userLevel || 1,
        levelProgress: userStats?.levelProgress || state.levelProgress,
        lastUpdated: new Date().toISOString(),
        isStale: false,
      };
    }

    case DATA_ACTIONS.SET_XP_DATA:
      return {
        ...state,
        xpStatistics: action.payload,
        totalXP: action.payload.totalXP || state.totalXP,
        xpByProject: action.payload.xpByProject || [],
        xpTimeline: action.payload.timeline || [],
      };

    case DATA_ACTIONS.SET_PROJECT_DATA:
      return {
        ...state,
        totalProjects: action.payload.totalProjects || 0,
        passedProjects: action.payload.passedProjects || 0,
        failedProjects: action.payload.failedProjects || 0,
        passRate: action.payload.passRate || 0,
        projectResults: action.payload.results || [],
      };

    case DATA_ACTIONS.SET_AUDIT_DATA:
      return {
        ...state,
        auditRatio: action.payload.auditRatio || 0,
        auditsGiven: action.payload.given?.count || 0,
        auditsReceived: action.payload.received?.count || 0,
        auditStatistics: action.payload,
      };

    case DATA_ACTIONS.SET_PROGRESS_DATA:
      return {
        ...state,
        totalProgress: action.payload.total || 0,
        completedProgress: action.payload.completed || 0,
        inProgressItems: action.payload.inProgress || 0,
        completionRate: action.payload.completionRate || 0,
        progressData: action.payload.data || [],
      };

    case DATA_ACTIONS.SET_SKILL_DATA:
      return {
        ...state,
        skills: action.payload.skills || [],
        skillStatistics: action.payload,
      };

    case DATA_ACTIONS.SET_PISCINE_DATA:
      return {
        ...state,
        piscineStats: action.payload,
      };

    case 'SET_ADVANCED_ANALYTICS':
      return {
        ...state,
        performanceTrend: action.payload.performanceTrend,
        difficultyProgression: action.payload.difficultyProgression,
        progressVelocity: action.payload.progressVelocity,
        timeManagement: action.payload.timeManagement,
      };

    case 'SET_COLLABORATION_ANALYTICS':
      return {
        ...state,
        collaborationFrequency: action.payload.collaborationFrequency,
        networkMetrics: action.payload.networkMetrics,
        teamPerformance: action.payload.teamPerformance,
      };

    case 'SET_LEARNING_RECOMMENDATIONS':
      return {
        ...state,
        learningPathRecommendations: action.payload,
      };

    case DATA_ACTIONS.CLEAR_DATA:
      return {
        ...initialState,
      };

    case DATA_ACTIONS.REFRESH_DATA:
      return {
        ...state,
        isStale: true,
      };

    default:
      return state;
  }
};

// Create data context
const DataContext = createContext(null);

// Data provider component
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const { user: authUser, isAuthenticated } = useAuth();

  // Main user analytics query (simplified and safe)
  const {
    data: analyticsData,
    loading,
    error,
    refetch: refetchAnalytics
  } = useQuery(GET_COMPREHENSIVE_USER_ANALYTICS, {
    variables: { userId: authUser?.id },
    skip: !isAuthenticated || !authUser?.id,
    ...getCacheConfig('GET_COMPREHENSIVE_USER_ANALYTICS'),
    onError: (error) => {
      const processedError = processGraphQLError(error);
      console.error('GraphQL Error in DataContext:', processedError);

      // Dispatch processed error to state
      dispatch({
        type: DATA_ACTIONS.SET_ERROR,
        payload: processedError
      });
    }
  });

  // Process data when query completes
  useEffect(() => {
    if (!isAuthenticated || !authUser?.id) {
      dispatch({ type: DATA_ACTIONS.CLEAR_DATA });
      return;
    }

    dispatch({ type: DATA_ACTIONS.SET_LOADING, payload: loading });

    if (error) {
      dispatch({ type: DATA_ACTIONS.SET_ERROR, payload: error });
      return;
    }

    if (!loading && analyticsData?.user?.[0]) {
      try {
        const rawUserData = analyticsData.user[0];

        // Parse JSON fields from database schema using safe parser
        const parsedProfile = safeJsonParse(rawUserData.profile, {});
        const parsedAttrs = safeJsonParse(rawUserData.attrs, {});

        // Calculate total XP from transactions (amount is in bytes, convert to KB using /1000)
        const totalXPBytes = rawUserData.xpTransactions?.aggregate?.sum?.amount || 0;
        const totalXP = Math.round(bytesToKB(totalXPBytes)); // Convert bytes to KB using utility

        // Calculate level based on XP (standard 01 level calculation)
        const level = calculateLevel(totalXP);

      // Create processed user data structure
      const processedUserData = {
        // Basic fields from database
        id: rawUserData.id,
        login: rawUserData.login, // Using 'login' field as corrected
        campus: rawUserData.campus,
        createdAt: rawUserData.createdAt,
        updatedAt: rawUserData.updatedAt,

        // Parsed JSON fields
        profile: parsedProfile,
        attrs: parsedAttrs,

        // Calculated fields
        totalXP,
        level,

        // Raw data for reference
        rawData: rawUserData,
      };

      dispatch({ type: DATA_ACTIONS.SET_USER_DATA, payload: processedUserData });

      // Process transaction data for XP timeline
      if (rawUserData.transactions) {
        const processedTransactions = processTransactionData(rawUserData.transactions);
        dispatch({
          type: DATA_ACTIONS.SET_XP_DATA,
          payload: {
            ...processedTransactions,
            totalXP,
            level,
            transactions: rawUserData.transactions,
          }
        });
      }

      // Process skill data from transactions
      if (rawUserData.transactions) {
        const skillData = processSkillData(rawUserData.transactions);
        dispatch({
          type: DATA_ACTIONS.SET_SKILL_DATA,
          payload: {
            skills: skillData,
            totalSkills: skillData.length,
            topSkills: skillData.slice(0, 5), // Top 5 skills by XP
          }
        });
      }

      // Process progress data
      if (rawUserData.progresses) {
        const progressStats = processProgressData(rawUserData.progresses);
        dispatch({
          type: DATA_ACTIONS.SET_PROGRESS_DATA,
          payload: {
            ...progressStats,
            data: rawUserData.progresses,
          }
        });
      }

      // Set project data from results (using isLast: true for accurate counts)
      const totalProjects = rawUserData.results_aggregate?.aggregate?.count || 0;
      const passedProjects = rawUserData.passedResults?.aggregate?.count || 0;
      dispatch({
        type: DATA_ACTIONS.SET_PROJECT_DATA,
        payload: {
          totalProjects,
          passedProjects,
          failedProjects: totalProjects - passedProjects,
          passRate: totalProjects > 0 ? (passedProjects / totalProjects) * 100 : 0,
          results: rawUserData.results || [],
        }
      });

      // Calculate audit ratio from up/down transactions (proper 01-edu calculation)
      const upCount = rawUserData.upTransactions?.aggregate?.count || 0;
      const downCount = rawUserData.downTransactions?.aggregate?.count || 0;
      const auditRatio = downCount > 0 ? upCount / downCount : upCount > 0 ? upCount : 0;

      // Process audit data with enhanced statistics
      const auditsGiven = rawUserData.audits || [];
      const auditsReceived = []; // Would need additional query for received audits
      const auditStats = processAuditData(auditsGiven, auditsReceived);

      dispatch({
        type: DATA_ACTIONS.SET_AUDIT_DATA,
        payload: {
          auditRatio: Math.round(auditRatio * 100) / 100, // Round to 2 decimal places
          given: {
            count: rawUserData.audits_aggregate?.aggregate?.count || 0,
            avgGrade: rawUserData.audits_aggregate?.aggregate?.avg?.grade || 0,
            ...auditStats.given,
          },
          received: {
            count: downCount,
            ...auditStats.received,
          },
          audits: rawUserData.audits || [],
          // Enhanced audit statistics
          ...auditStats,
        }
      });

      // Process piscine statistics from results
      const piscineResults = rawUserData.results?.filter(result =>
        result.path && (
          result.path.includes('piscine') ||
          result.path.includes('js') ||
          result.path.includes('go')
        )
      ) || [];

      if (piscineResults.length > 0) {
        const jsResults = piscineResults.filter(r =>
          r.path.includes('js') || r.path.includes('javascript')
        );
        const goResults = piscineResults.filter(r =>
          r.path.includes('go') || r.path.includes('golang')
        );

        const piscineStats = {
          jsStats: {
            total: jsResults.length,
            passed: jsResults.filter(r => r.grade >= 1).length,
            failed: jsResults.filter(r => r.grade < 1).length,
            passRate: jsResults.length > 0 ?
              (jsResults.filter(r => r.grade >= 1).length / jsResults.length) * 100 : 0,
          },
          goStats: {
            total: goResults.length,
            passed: goResults.filter(r => r.grade >= 1).length,
            failed: goResults.filter(r => r.grade < 1).length,
            passRate: goResults.length > 0 ?
              (goResults.filter(r => r.grade >= 1).length / goResults.length) * 100 : 0,
          },
          overall: {
            total: piscineResults.length,
            passed: piscineResults.filter(r => r.grade >= 1).length,
            failed: piscineResults.filter(r => r.grade < 1).length,
            passRate: piscineResults.length > 0 ?
              (piscineResults.filter(r => r.grade >= 1).length / piscineResults.length) * 100 : 0,
          }
        };

        // Store piscine stats in the state
        dispatch({
          type: DATA_ACTIONS.SET_PISCINE_DATA,
          payload: piscineStats
        });
      }

      // Process advanced analytics
      if (rawUserData.results && rawUserData.results.length > 0) {
        // Performance trend analysis
        const performanceTrend = analyzePerformanceTrend(rawUserData.results);

        // Difficulty progression analysis
        const difficultyProgression = analyzeDifficultyProgression(rawUserData.results);

        // Progress velocity calculation
        const progressVelocity = calculateProgressVelocity(rawUserData.results);

        // Time management analysis
        const timeManagement = analyzeTimeManagement(
          rawUserData.progresses || [],
          rawUserData.results || []
        );

        // Store advanced analytics
        dispatch({
          type: 'SET_ADVANCED_ANALYTICS',
          payload: {
            performanceTrend,
            difficultyProgression,
            progressVelocity,
            timeManagement
          }
        });
      }

      // Process collaboration analytics
      if (rawUserData.groups || rawUserData.audits) {
        const collaborationFrequency = analyzeCollaborationFrequency(rawUserData.groups || []);
        const networkMetrics = calculateNetworkMetrics(
          rawUserData.groups || [],
          rawUserData.audits || []
        );
        const teamPerformance = analyzeTeamPerformance(
          rawUserData.groups || [],
          rawUserData.id
        );

        dispatch({
          type: 'SET_COLLABORATION_ANALYTICS',
          payload: {
            collaborationFrequency,
            networkMetrics,
            teamPerformance
          }
        });
      }

      // Generate learning path recommendations
      const skillsForRecommendations = processSkillData(rawUserData.transactions || []);
      const learningPathRecommendations = generateLearningPathRecommendations({
        skills: skillsForRecommendations,
        performanceTrend: analyzePerformanceTrend(rawUserData.results || []),
        collaborationScore: calculateCollaborationScore(auditStats, {
          totalGroups: rawUserData.groups?.length || 0
        }),
        totalXP: totalXP
      });

      dispatch({
        type: 'SET_LEARNING_RECOMMENDATIONS',
        payload: learningPathRecommendations
      });
      } catch (processingError) {
        console.error('Error processing user data:', processingError);

        // Dispatch error to state
        dispatch({
          type: DATA_ACTIONS.SET_ERROR,
          payload: {
            type: ERROR_TYPES.CLIENT,
            severity: ERROR_SEVERITY.MEDIUM,
            message: 'Failed to process user data',
            userMessage: 'There was an issue processing your data. Some features may not work correctly.',
            originalError: processingError,
            timestamp: new Date().toISOString(),
            retryable: true
          }
        });
      }
    }
  }, [isAuthenticated, authUser?.id, analyticsData, loading, error]);

  // Refetch all data with enhanced error handling
  const refetchAll = async () => {
    dispatch({ type: DATA_ACTIONS.SET_LOADING, payload: true });

    try {
      await refetchAnalytics();
    } catch (refetchError) {
      console.error('Error refetching data:', refetchError);

      const processedError = processGraphQLError(refetchError);
      dispatch({
        type: DATA_ACTIONS.SET_ERROR,
        payload: {
          ...processedError,
          userMessage: 'Failed to refresh your data. Please check your connection and try again.',
          retryAction: refetchAll
        }
      });
    }
  };

  // Context value
  const value = {
    // State
    ...state,
    loading,
    error,

    // Legacy aliases for backward compatibility
    userData: state.user,
    xpData: {
      totalXP: state.totalXP,
      xpByProject: state.xpByProject,
      timeline: state.xpTimeline,
      transactions: state.user?.rawData?.transactions || [],
    },
    projectData: {
      totalProjects: state.totalProjects,
      passedProjects: state.passedProjects,
      failedProjects: state.failedProjects,
      passRate: state.passRate,
      results: state.projectResults,
    },
    auditData: {
      auditRatio: state.auditRatio,
      given: { count: state.auditsGiven },
      received: { count: state.auditsReceived },
      audits: state.auditStatistics?.audits || [],
    },

    // Actions
    refetchAll,
    clearData: () => dispatch({ type: DATA_ACTIONS.CLEAR_DATA }),
    refreshData: () => dispatch({ type: DATA_ACTIONS.REFRESH_DATA }),
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Export the context for use in custom hooks
export { DataContext };

export default DataContext;
