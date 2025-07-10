import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './authUtils';
import { useQuery } from '@apollo/client';
import {
  GET_COMPREHENSIVE_USER_ANALYTICS,
} from '../graphql/queries';
import {
  calculateUserStatistics,
  processTransactionData,
  calculateLevel,
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

    case DATA_ACTIONS.SET_USER_DATA:
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
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
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
      const rawUserData = analyticsData.user[0];

      // Parse JSON fields from database schema
      let parsedProfile = {};
      let parsedAttrs = {};

      try {
        parsedProfile = typeof rawUserData.profile === 'string'
          ? JSON.parse(rawUserData.profile)
          : (rawUserData.profile || {});
      } catch (e) {
        console.warn('Error parsing user profile JSON:', e);
      }

      try {
        parsedAttrs = typeof rawUserData.attrs === 'string'
          ? JSON.parse(rawUserData.attrs)
          : (rawUserData.attrs || {});
      } catch (e) {
        console.warn('Error parsing user attrs JSON:', e);
      }

      // Calculate total XP from transactions (amount is in bytes, convert to KB using /1000)
      const totalXPBytes = rawUserData.xpTransactions?.aggregate?.sum?.amount || 0;
      const totalXP = Math.round(totalXPBytes / 1000); // Convert bytes to KB

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

      dispatch({
        type: DATA_ACTIONS.SET_AUDIT_DATA,
        payload: {
          auditRatio: Math.round(auditRatio * 100) / 100, // Round to 2 decimal places
          given: {
            count: rawUserData.audits_aggregate?.aggregate?.count || 0,
            avgGrade: rawUserData.audits_aggregate?.aggregate?.avg?.grade || 0,
          },
          received: { count: downCount },
          audits: rawUserData.audits || [],
        }
      });
    }
  }, [isAuthenticated, authUser?.id, analyticsData, loading, error]);

  // Refetch all data
  const refetchAll = async () => {
    dispatch({ type: DATA_ACTIONS.SET_LOADING, payload: true });

    try {
      await refetchAnalytics();
    } catch (err) {
      dispatch({ type: DATA_ACTIONS.SET_ERROR, payload: err });
    }
  };

  // Context value
  const value = {
    // State
    ...state,
    loading,
    error,
    
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

// Hook to use data context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;
