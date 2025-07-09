import { useQuery, useLazyQuery } from '@apollo/client';
import { useAuth } from '../contexts/AuthContext';
import {
  GET_USER_PROFILE,
  GET_USER_TRANSACTIONS,
  GET_XP_STATISTICS,
  GET_PROJECT_STATISTICS,
  GET_AUDIT_RATIO,
  GET_USER_SKILLS,
  SEARCH_USERS,
} from '../graphql/queries';

// Hook for user profile data
export const useUserProfile = () => {
  const { user, isAuthenticated } = useAuth();

  const { data, loading, error, refetch } = useQuery(GET_USER_PROFILE, {
    variables: { userId: user?.id },
    skip: !isAuthenticated || !user?.id,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only', // Avoid cache conflicts
  });

  return {
    profile: data?.user?.[0] || null,
    loading,
    error,
    refetch,
  };
};

// Hook for user transactions (XP data)
export const useUserTransactions = () => {
  const { user, isAuthenticated } = useAuth();
  
  const { data, loading, error, refetch } = useQuery(GET_USER_TRANSACTIONS, {
    variables: { userId: user?.id },
    skip: !isAuthenticated || !user?.id,
    errorPolicy: 'all',
  });

  return {
    transactions: data?.transaction || [],
    loading,
    error,
    refetch,
  };
};

// Hook for XP statistics
export const useXPStatistics = () => {
  const { user, isAuthenticated } = useAuth();
  
  const { data, loading, error, refetch } = useQuery(GET_XP_STATISTICS, {
    variables: { userId: user?.id },
    skip: !isAuthenticated || !user?.id,
    errorPolicy: 'all',
    fetchPolicy: 'network-only',
  });

  const totalXP = error ? 0 : (data?.transaction_aggregate?.aggregate?.sum?.amount || 0);
  const xpTransactions = error ? [] : (data?.transaction || []);

  // Calculate XP progression over time (only if no error)
  const xpProgression = error ? [] : xpTransactions.reduce((acc, transaction) => {
    const date = new Date(transaction.createdAt).toISOString().split('T')[0];
    const existing = acc.find(item => item.date === date);
    
    if (existing) {
      existing.amount += transaction.amount;
    } else {
      acc.push({
        date,
        amount: transaction.amount,
        cumulative: 0, // Will be calculated below
      });
    }
    
    return acc;
  }, []);

  // Calculate cumulative XP
  let cumulative = 0;
  xpProgression.forEach(item => {
    cumulative += item.amount;
    item.cumulative = cumulative;
  });

  return {
    totalXP,
    xpProgression: xpProgression.sort((a, b) => new Date(a.date) - new Date(b.date)),
    xpTransactions,
    loading,
    error,
    refetch,
  };
};

// Hook for project statistics
export const useProjectStatistics = () => {
  const { user, isAuthenticated } = useAuth();
  
  const { data, loading, error, refetch } = useQuery(GET_PROJECT_STATISTICS, {
    variables: { userId: user?.id },
    skip: !isAuthenticated || !user?.id,
    errorPolicy: 'all',
    fetchPolicy: 'network-only',
  });

  const totalProjects = error ? 0 : (data?.total_projects?.aggregate?.count || 0);
  const passedProjects = error ? 0 : (data?.passed_projects?.aggregate?.count || 0);
  const projects = error ? [] : (data?.result || []);

  const passRate = totalProjects > 0 ? (passedProjects / totalProjects) * 100 : 0;

  return {
    totalProjects,
    passedProjects,
    failedProjects: totalProjects - passedProjects,
    passRate,
    projects,
    loading,
    error,
    refetch,
  };
};

// Hook for audit ratio
export const useAuditRatio = () => {
  const { user, isAuthenticated } = useAuth();
  
  const { data, loading, error, refetch } = useQuery(GET_AUDIT_RATIO, {
    variables: { userId: user?.id },
    skip: !isAuthenticated || !user?.id,
    errorPolicy: 'all',
    fetchPolicy: 'network-only',
  });

  const auditsGiven = error ? 0 : (data?.audits_given?.aggregate?.count || 0);
  const auditsReceived = error ? 0 : (data?.audits_received?.aggregate?.count || 0);

  const auditRatio = auditsReceived > 0 ? auditsGiven / auditsReceived : 0;

  return {
    auditsGiven,
    auditsReceived,
    auditRatio,
    loading,
    error,
    refetch,
  };
};

// Hook for user skills/technologies
export const useUserSkills = () => {
  const { user, isAuthenticated } = useAuth();
  
  const { data, loading, error, refetch } = useQuery(GET_USER_SKILLS, {
    variables: { userId: user?.id },
    skip: !isAuthenticated || !user?.id,
    errorPolicy: 'all',
    fetchPolicy: 'network-only',
  });

  // Process skills from transaction paths
  const skills = (data?.transaction || []).map(transaction => {
    const pathParts = transaction.path.split('/');
    const technology = pathParts[pathParts.length - 1] || 'unknown';
    
    return {
      name: technology,
      xp: transaction.amount,
      type: transaction.object?.type || 'unknown',
      path: transaction.path,
    };
  });

  // Group skills by technology
  const groupedSkills = skills.reduce((acc, skill) => {
    const existing = acc.find(item => item.name === skill.name);
    
    if (existing) {
      existing.totalXP += skill.xp;
      existing.projects += 1;
    } else {
      acc.push({
        name: skill.name,
        totalXP: skill.xp,
        projects: 1,
        type: skill.type,
      });
    }
    
    return acc;
  }, []);

  return {
    skills: groupedSkills.sort((a, b) => b.totalXP - a.totalXP),
    loading,
    error,
    refetch,
  };
};

// Hook for dashboard data (simplified to avoid cache conflicts)
export const useDashboardData = () => {

  // Use separate hooks to avoid cache merge conflicts
  const { profile, loading: profileLoading, error: profileError } = useUserProfile();
  const { totalXP, loading: xpLoading, error: xpError } = useXPStatistics();
  const { passedProjects, loading: projectsLoading, error: projectsError } = useProjectStatistics();
  const { auditsGiven, auditsReceived, auditRatio, loading: auditLoading, error: auditError } = useAuditRatio();

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    if (profileError) console.log('Profile error:', profileError.message);
    if (xpError) console.log('XP error:', xpError.message);
    if (projectsError) console.log('Projects error:', projectsError.message);
    if (auditError) console.log('Audit error:', auditError.message);

    if (!loading && !profileError && !xpError && !projectsError && !auditError) {
      console.log('✅ Dashboard data loaded successfully:', {
        profile: !!profile,
        totalXP,
        passedProjects,
        auditsGiven,
        auditsReceived,
        auditRatio
      });
    }
  }

  const loading = profileLoading || xpLoading || projectsLoading || auditLoading;

  // Only report critical errors (like authentication failures)
  // Ignore data-specific errors to allow partial loading
  const criticalError = profileError && (
    profileError.message?.includes('JWT') ||
    profileError.message?.includes('authentication') ||
    profileError.message?.includes('unauthorized')
  );

  const error = criticalError ? profileError : null;

  return {
    profile,
    totalXP,
    passedProjects,
    auditsGiven,
    auditsReceived,
    auditRatio,
    loading,
    error,
    refetch: () => {
      // Refetch all individual queries
      window.location.reload();
    },
  };
};

// Hook for user search
export const useUserSearch = () => {
  const [searchUsers, { data, loading, error }] = useLazyQuery(SEARCH_USERS, {
    errorPolicy: 'all',
  });

  const search = (searchTerm) => {
    if (searchTerm.trim()) {
      searchUsers({
        variables: { searchTerm: `%${searchTerm}%` },
      });
    }
  };

  return {
    searchUsers: search,
    users: data?.user || [],
    loading,
    error,
  };
};

// Generic hook for any GraphQL query with error handling
export const useGraphQLQuery = (query, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  
  const result = useQuery(query, {
    ...options,
    skip: options.skip || !isAuthenticated,
    errorPolicy: 'all',
    variables: {
      userId: user?.id,
      ...options.variables,
    },
  });

  return {
    ...result,
    hasError: !!result.error,
    isEmpty: !result.loading && !result.data,
  };
};
