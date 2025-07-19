import { useState, useEffect, useCallback } from 'react';
import { graphqlService } from '../graphql/dataService.js';

// ============================================================================
// SIMPLIFIED GRAPHQL HOOKS - FOLLOWING REFERENCE PATTERNS
// Based on graphqlexample1 and graphqlexample2 patterns
// ============================================================================

// Generic hook for GraphQL data fetching with error handling
export const useGraphQLData = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [result, err] = await fetchFunction();
      if (err) {
        setError(err);
        setData(null);
      } else {
        setData(result);
        setError(null);
      }
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

// ============================================================================
// SPECIFIC DATA HOOKS - UPDATED FOR CORRECTED SCHEMA
// ============================================================================

// Hook for user basic information (requires userLogin parameter)
export const useUserInfo = (userLogin) => {
  return useGraphQLData(
    () => graphqlService.getUserInfo(userLogin),
    [userLogin]
  );
};

// Hook for user by ID
export const useUserById = (userId) => {
  return useGraphQLData(
    () => graphqlService.getUserById(userId),
    [userId]
  );
};

// Hook for user statistics (parameter-free)
export const useUserStatistics = () => {
  return useGraphQLData(() => graphqlService.getUserStatistics());
};

// Hook for users with pagination (parameter-free)
export const useUsersWithPagination = () => {
  return useGraphQLData(() => graphqlService.getUsersWithPagination());
};

// Hook for users by campus
export const useUsersByCampus = (campus) => {
  return useGraphQLData(
    () => graphqlService.getUsersByCampus(campus),
    [campus]
  );
};

// Hook for total XP
export const useTotalXP = () => {
  return useGraphQLData(() => graphqlService.getTotalXP());
};

// Hook for user level with login parameter
export const useUserLevel = (userLogin) => {
  return useGraphQLData(
    () => graphqlService.getUserLevel(userLogin),
    [userLogin]
  );
};

// Hook for XP by project with login parameter
export const useXPByProject = (userLogin) => {
  return useGraphQLData(
    () => graphqlService.getXPByProject(userLogin),
    [userLogin]
  );
};

// Hook for user skills
export const useUserSkills = () => {
  return useGraphQLData(() => graphqlService.getUserSkills());
};

// Hook for pending audits (parameter-free)
export const usePendingAudits = () => {
  return useGraphQLData(() => graphqlService.getPendingAudits());
};

// Hook for completed audits (parameter-free)
export const useCompletedAudits = () => {
  return useGraphQLData(() => graphqlService.getCompletedAudits());
};

// Hook for audit ratio
export const useAuditRatio = () => {
  return useGraphQLData(() => graphqlService.getAuditRatio());
};

// Hook for active groups (parameter-free)
export const useActiveGroups = () => {
  return useGraphQLData(() => graphqlService.getActiveGroups());
};

// Hook for top XP earners (parameter-free)
export const useTopXPEarners = () => {
  return useGraphQLData(() => graphqlService.getTopXPEarners());
};

// Hook for transactions by type
export const useTransactionsByType = (type) => {
  return useGraphQLData(
    () => graphqlService.getTransactionsByType(type),
    [type]
  );
};

// ============================================================================
// ROLE HOOKS
// ============================================================================

// Hook for all roles (parameter-free)
export const useAllRoles = () => {
  return useGraphQLData(() => graphqlService.getAllRoles());
};

// Hook for role statistics (parameter-free)
export const useRoleStatistics = () => {
  return useGraphQLData(() => graphqlService.getRoleStatistics());
};

// ============================================================================
// OBJECT HOOKS
// ============================================================================

// Hook for root objects (parameter-free)
export const useRootObjects = () => {
  return useGraphQLData(() => graphqlService.getRootObjects());
};

// Hook for leaf objects (parameter-free)
export const useLeafObjects = () => {
  return useGraphQLData(() => graphqlService.getLeafObjects());
};

// ============================================================================
// ENHANCED PROGRESS HOOKS
// ============================================================================

// Hook for completed progress (parameter-free)
export const useCompletedProgress = () => {
  return useGraphQLData(() => graphqlService.getCompletedProgress());
};

// Hook for in progress records (parameter-free)
export const useInProgress = () => {
  return useGraphQLData(() => graphqlService.getInProgress());
};

// ============================================================================
// ENHANCED RESULT HOOKS
// ============================================================================

// Hook for latest results (parameter-free)
export const useLatestResults = () => {
  return useGraphQLData(() => graphqlService.getLatestResults());
};

// Hook for user progress with userId parameter
export const useUserProgress = (userId) => {
  return useGraphQLData(
    () => graphqlService.getUserProgress(userId),
    [userId]
  );
};

// Hook for user results with userId parameter
export const useUserResults = (userId) => {
  return useGraphQLData(
    () => graphqlService.getUserResults(userId),
    [userId]
  );
};

// Hook for user groups with login parameter
export const useUserGroups = (userLogin) => {
  return useGraphQLData(
    () => graphqlService.getUserGroups(userLogin),
    [userLogin]
  );
};

// Hook for users above level
export const useUsersAboveLevel = (level) => {
  return useGraphQLData(
    () => graphqlService.getUsersAboveLevel(level),
    [level]
  );
};

// Hook for users above level in cohort
export const useUsersAboveLevelInCohort = (level, eventId) => {
  return useGraphQLData(
    () => graphqlService.getUsersAboveLevelInCohort(level, eventId),
    [level, eventId]
  );
};

// ============================================================================
// TIMELINE AND PROGRESSION HOOKS
// ============================================================================

// Hook for XP timeline data
export const useXPTimeline = (userLogin) => {
  return useGraphQLData(
    () => graphqlService.getXPTimeline(userLogin),
    [userLogin]
  );
};

// Hook for audit timeline data
export const useAuditTimeline = (userLogin) => {
  return useGraphQLData(
    () => graphqlService.getAuditTimeline(userLogin),
    [userLogin]
  );
};

// Hook for project results data
export const useProjectResults = (userLogin) => {
  return useGraphQLData(
    () => graphqlService.getProjectResults(userLogin),
    [userLogin]
  );
};

// ============================================================================
// COMBINED DASHBOARD HOOK
// ============================================================================

// Hook for dashboard data - combines multiple queries like reference examples
export const useDashboardData = (userId) => {
  const [dashboardData, setDashboardData] = useState({
    user: null,
    level: null,
    totalXP: null,
    skills: null,
    auditRatio: null,
    xpProjects: null,
    groups: null,
    xpTimeline: null,
    auditTimeline: null,
    projectResults: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    if (import.meta.env.DEV) {
      console.log('fetchDashboardData called with userId:', userId);
    }
    if (!userId) {
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // First get user info by ID to get the login
      const [userInfo, userError] = await graphqlService.getUserById(userId);
      if (userError) {
        setError(userError);
        return;
      }

      if (!userInfo || !userInfo.login) {
        setError(new Error('User not found or missing login'));
        return;
      }

      const userLogin = userInfo.login;

      // Now fetch all other dashboard data using the userLogin
      const [
        [levelInfo, levelError],
        [xpInfo, xpError],
        [skillsInfo, skillsError],
        [auditInfo, auditError],
        [xpProjectsInfo, xpProjectsError],
        [groupsInfo, groupsError],
        [xpTimelineInfo, xpTimelineError],
        [auditTimelineInfo, auditTimelineError],
        [projectResultsInfo, projectResultsError],
      ] = await Promise.all([
        graphqlService.getUserLevel(userLogin),
        graphqlService.getTotalXP(),
        graphqlService.getUserSkills(),
        graphqlService.getAuditRatio(),
        graphqlService.getXPByProject(userLogin),
        graphqlService.getUserGroups(userLogin),
        graphqlService.getXPTimeline(userLogin),
        graphqlService.getAuditTimeline(userLogin),
        graphqlService.getProjectResults(userLogin),
      ]);

      // Check for any errors
      const errors = [
        levelError, xpError, skillsError, auditError,
        xpProjectsError, groupsError, xpTimelineError, auditTimelineError, projectResultsError
      ].filter(Boolean);
      if (errors.length > 0) {
        console.warn('Some dashboard queries failed:', errors);
        // Don't fail completely, just log warnings
      }

      // Set combined data
      setDashboardData({
        user: userInfo,
        level: levelInfo?.level || 0,
        eventId: levelInfo?.event?.id,
        totalXP: xpInfo?.aggregate?.sum?.amount || 0,
        skills: skillsInfo || [],
        auditRatio: auditInfo,
        xpProjects: xpProjectsInfo || [],
        groups: groupsInfo || [],
        xpTimeline: xpTimelineInfo || [],
        auditTimeline: auditTimelineInfo || [],
        projectResults: projectResultsInfo || [],
      });

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    data: dashboardData,
    loading,
    error,
    refetch: fetchDashboardData,
  };
};

// ============================================================================
// UTILITY HOOKS
// ============================================================================

// Hook for conditional data fetching
export const useConditionalGraphQLData = (fetchFunction, condition, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!condition) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const [result, err] = await fetchFunction();
      if (err) {
        setError(err);
        setData(null);
      } else {
        setData(result);
        setError(null);
      }
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, condition, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

// Hook for manual data fetching (triggered by user action)
export const useManualGraphQLData = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const [result, err] = await fetchFunction(...args);
      if (err) {
        setError(err);
        setData(null);
      } else {
        setData(result);
        setError(null);
      }
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  return {
    data,
    loading,
    error,
    execute: fetchData,
  };
};
