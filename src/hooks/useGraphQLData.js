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
// SPECIFIC DATA HOOKS
// ============================================================================

// Hook for user basic information
export const useUserInfo = () => {
  return useGraphQLData(() => graphqlService.getUserInfo());
};

// Hook for user profile data
export const useUserProfile = () => {
  return useGraphQLData(() => graphqlService.getUserProfile());
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

// Hook for audit status
export const useAuditStatus = () => {
  return useGraphQLData(() => graphqlService.getAuditStatus());
};

// Hook for audit ratio
export const useAuditRatio = () => {
  return useGraphQLData(() => graphqlService.getAuditRatio());
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
export const useDashboardData = (userLogin) => {
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
    if (!userLogin) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch all dashboard data in parallel
      const [
        [userInfo, userError],
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
        graphqlService.getUserInfo(),
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
        userError, levelError, xpError, skillsError, auditError,
        xpProjectsError, groupsError, xpTimelineError, auditTimelineError, projectResultsError
      ].filter(Boolean);
      if (errors.length > 0) {
        setError(errors[0]); // Show first error
        return;
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
  }, [userLogin]);

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
