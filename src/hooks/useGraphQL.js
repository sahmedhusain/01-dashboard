import React from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useAuth } from '../contexts/authUtils.jsx';
import {
  GET_USER_PROFILE,
  GET_USER_TRANSACTIONS,
  GET_USER_PROGRESS,
  GET_USER_RESULTS,
  GET_USER_AUDITS,
  GET_XP_STATISTICS,
  GET_PROJECT_STATISTICS,
  GET_AUDIT_RATIO,
  GET_USER_SKILLS,
  GET_USER_EVENTS,
  GET_USER_GROUPS,
  GET_USER_MATCHES,
  GET_OBJECT_DETAILS,
  GET_USER_ANALYTICS,
  GET_LEADERBOARD,
  COMPARE_USERS,
  ADVANCED_SEARCH,
  SEARCH_USERS,
  GET_XP_BY_PROJECT,
  GET_XP_TIMELINE,
  GET_PISCINE_STATS,
  GET_ENHANCED_PROFILE,
  GET_PROJECT_TIMELINE,
  GET_DETAILED_AUDIT_STATS,
  // Enhanced queries from introspection
  GET_ENHANCED_USER_PROFILE,
  GET_COMPREHENSIVE_USER_ANALYTICS,
  GET_PERFORMANCE_ANALYTICS,
  GET_COLLABORATION_ANALYTICS,
  GET_CAMPUS_COMPARISON_ANALYTICS,
  GET_USER_EVENTS_DETAILED,
  GET_USER_LABELS,
  GET_USER_MATCHES_DETAILED,
  GET_USER_OBJECT_AVAILABILITIES,
  GET_USER_PROGRESS_BY_PATH,
  GET_USER_SESSIONS,
  GET_USER_XPS,
  GET_USER_CREATED_OBJECTS,
  // Enhanced search queries
  SEARCH_PROJECTS_BY_STATUS,
  SEARCH_AUDITS_BY_STATUS,
  SEARCH_USERS_WITH_STATUS,
} from '../graphql/queries';

// Enhanced hook for user profile data with comprehensive information
export const useUserProfile = () => {
  const { user, isAuthenticated } = useAuth();

  const { data, loading, error, refetch } = useQuery(GET_USER_PROFILE, {
    variables: { userId: user?.id },
    skip: !isAuthenticated || !user?.id,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only', // Avoid cache conflicts
  });

  const profile = data?.user?.[0] || null;

  // Extract enhanced profile data
  const enhancedProfile = profile ? {
    ...profile,
    // Add computed fields
    registrationDate: profile.events?.[0]?.createdAt,
    startCampus: profile.events?.[0]?.campus,
    totalXP: profile.totalXP?.aggregate?.sum?.amount || 0,
    totalProjects: profile.projectResults?.aggregate?.count || 0,
    passedProjects: profile.passedProjects?.aggregate?.count || 0,
    passRate: profile.projectResults?.aggregate?.count > 0
      ? (profile.passedProjects?.aggregate?.count / profile.projectResults?.aggregate?.count) * 100
      : 0,
  } : null;

  return {
    profile: enhancedProfile,
    userRoles: [], // userRoles field not available in GraphQL schema
    records: profile?.records || [],
    loading,
    error,
    refetch,
  };
};

// Enhanced hook for user transactions with filtering and pagination
export const useUserTransactions = (options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const {
    limit = 100,
    offset = 0,
    type = null,
    skip: skipOption = false
  } = options;

  const { data, loading, error, refetch, fetchMore } = useQuery(GET_USER_TRANSACTIONS, {
    variables: {
      userId: user?.id,
      limit,
      offset,
      type
    },
    skip: !isAuthenticated || !user?.id || skipOption,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const transactions = data?.transaction || [];
  const aggregateData = data?.transaction_aggregate?.aggregate || {};

  return {
    transactions,
    totalCount: aggregateData.count || 0,
    totalAmount: aggregateData.sum?.amount || 0,
    averageAmount: aggregateData.avg?.amount || 0,
    maxAmount: aggregateData.max?.amount || 0,
    minAmount: aggregateData.min?.amount || 0,
    loading,
    error,
    refetch,
    fetchMore,
    hasMore: transactions.length >= limit,
  };
};

// Enhanced hook for comprehensive XP statistics and analysis
export const useXPStatistics = (options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const {
    skip: skipOption = false
  } = options;

  const { data, loading, error, refetch } = useQuery(GET_XP_STATISTICS, {
    variables: {
      userId: user?.id
    },
    skip: !isAuthenticated || !user?.id || skipOption,
    errorPolicy: 'all',
    fetchPolicy: 'network-only',
  });

  // Extract data with error handling
  const xpTotal = data?.xp_total?.aggregate || {};
  const xpTransactions = data?.xp_transactions || [];
  const xpByType = data?.xp_by_type?.nodes || [];
  const auditRewards = data?.audit_rewards || [];
  const auditRewardsStats = data?.audit_rewards_stats?.aggregate || {};

  const totalXP = error ? 0 : (xpTotal.sum?.amount || 0);
  const transactionCount = xpTotal.count || 0;
  const averageXP = xpTotal.avg?.amount || 0;
  const maxXP = xpTotal.max?.amount || 0;
  const minXP = xpTotal.min?.amount || 0;

  // Calculate XP progression over time
  const xpProgression = error ? [] : xpTransactions.reduce((acc, transaction) => {
    const date = new Date(transaction.createdAt).toISOString().split('T')[0];
    const existing = acc.find(item => item.date === date);

    if (existing) {
      existing.amount += transaction.amount;
      existing.transactions.push(transaction);
    } else {
      acc.push({
        date,
        amount: transaction.amount,
        cumulative: 0,
        transactions: [transaction],
      });
    }

    return acc;
  }, []);

  // Calculate cumulative XP
  let cumulative = 0;
  xpProgression.sort((a, b) => new Date(a.date) - new Date(b.date));
  xpProgression.forEach(item => {
    cumulative += item.amount;
    item.cumulative = cumulative;
  });

  // XP breakdown by object type
  const xpByObjectType = xpByType.reduce((acc, item) => {
    const type = item.object?.type || 'unknown';
    if (!acc[type]) {
      acc[type] = { type, totalXP: 0, count: 0 };
    }
    acc[type].totalXP += item.amount;
    acc[type].count += 1;
    return acc;
  }, {});

  // XP breakdown by project/path
  const xpByProject = xpTransactions.reduce((acc, transaction) => {
    const projectName = transaction.object?.name || transaction.path.split('/').pop() || 'unknown';
    if (!acc[projectName]) {
      acc[projectName] = {
        name: projectName,
        path: transaction.path,
        totalXP: 0,
        type: transaction.object?.type || 'unknown',
        transactions: [],
      };
    }
    acc[projectName].totalXP += transaction.amount;
    acc[projectName].transactions.push(transaction);
    return acc;
  }, {});

  // Audit rewards analysis
  const auditRewardsAnalysis = {
    totalRewards: auditRewardsStats.sum?.amount || 0,
    rewardCount: auditRewardsStats.count || 0,
    upRewards: auditRewards.filter(r => r.type === 'up'),
    downRewards: auditRewards.filter(r => r.type === 'down'),
  };

  // Performance metrics
  const performanceMetrics = {
    xpPerDay: xpProgression.length > 0 ? totalXP / xpProgression.length : 0,
    mostProductiveDay: xpProgression.reduce((max, day) =>
      day.amount > (max?.amount || 0) ? day : max, null),
    consistencyScore: calculateConsistencyScore(xpProgression),
    growthRate: calculateGrowthRate(xpProgression),
  };

  return {
    totalXP,
    transactionCount,
    averageXP,
    maxXP,
    minXP,
    xpProgression,
    xpTransactions,
    xpByObjectType: Object.values(xpByObjectType).sort((a, b) => b.totalXP - a.totalXP),
    xpByProject: Object.values(xpByProject).sort((a, b) => b.totalXP - a.totalXP),
    auditRewards,
    auditRewardsAnalysis,
    performanceMetrics,
    loading,
    error,
    refetch,
  };
};

// Helper function to calculate consistency score (0-100)
const calculateConsistencyScore = (progression) => {
  if (progression.length < 2) return 0;

  const amounts = progression.map(p => p.amount);
  const mean = amounts.reduce((sum, val) => sum + val, 0) / amounts.length;
  const variance = amounts.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / amounts.length;
  const standardDeviation = Math.sqrt(variance);

  // Lower standard deviation relative to mean indicates higher consistency
  const coefficientOfVariation = mean > 0 ? standardDeviation / mean : 1;
  return Math.max(0, Math.min(100, (1 - coefficientOfVariation) * 100));
};

// Helper function to calculate growth rate
const calculateGrowthRate = (progression) => {
  if (progression.length < 2) return 0;

  const firstWeek = progression.slice(0, 7);
  const lastWeek = progression.slice(-7);

  const firstWeekAvg = firstWeek.reduce((sum, p) => sum + p.amount, 0) / firstWeek.length;
  const lastWeekAvg = lastWeek.reduce((sum, p) => sum + p.amount, 0) / lastWeek.length;

  return firstWeekAvg > 0 ? ((lastWeekAvg - firstWeekAvg) / firstWeekAvg) * 100 : 0;
};

// Specialized hook for transaction type analysis
export const useTransactionAnalysis = (options = {}) => {
  const {
    fromDate = null,
    toDate = null,
    skip: skipOption = false
  } = options;

  // Get all transaction types
  const xpHook = useUserTransactions({ type: 'xp', limit: 1000, skip: skipOption });
  const upHook = useUserTransactions({ type: 'up', limit: 1000, skip: skipOption });
  const downHook = useUserTransactions({ type: 'down', limit: 1000, skip: skipOption });

  const loading = xpHook.loading || upHook.loading || downHook.loading;
  const error = xpHook.error || upHook.error || downHook.error;

  // Filter by date range if provided
  const filterByDate = (transactions) => {
    if (!fromDate && !toDate) return transactions;
    return transactions.filter(t => {
      const date = new Date(t.createdAt);
      const afterFrom = !fromDate || date >= new Date(fromDate);
      const beforeTo = !toDate || date <= new Date(toDate);
      return afterFrom && beforeTo;
    });
  };

  const xpTransactions = filterByDate(xpHook.transactions);
  const upTransactions = filterByDate(upHook.transactions);
  const downTransactions = filterByDate(downHook.transactions);

  // Transaction summary
  const transactionSummary = {
    xp: {
      count: xpTransactions.length,
      total: xpTransactions.reduce((sum, t) => sum + t.amount, 0),
      average: xpTransactions.length > 0 ?
        xpTransactions.reduce((sum, t) => sum + t.amount, 0) / xpTransactions.length : 0,
    },
    up: {
      count: upTransactions.length,
      total: upTransactions.reduce((sum, t) => sum + t.amount, 0),
      average: upTransactions.length > 0 ?
        upTransactions.reduce((sum, t) => sum + t.amount, 0) / upTransactions.length : 0,
    },
    down: {
      count: downTransactions.length,
      total: downTransactions.reduce((sum, t) => sum + t.amount, 0),
      average: downTransactions.length > 0 ?
        downTransactions.reduce((sum, t) => sum + t.amount, 0) / downTransactions.length : 0,
    },
  };

  // Audit ratio calculation
  const auditRatio = upTransactions.length > 0 && downTransactions.length > 0 ?
    upTransactions.length / downTransactions.length : 0;

  // Net audit impact
  const netAuditImpact = transactionSummary.up.total + transactionSummary.down.total;

  // Transaction timeline (all types combined)
  const allTransactions = [
    ...xpTransactions.map(t => ({ ...t, category: 'xp' })),
    ...upTransactions.map(t => ({ ...t, category: 'up' })),
    ...downTransactions.map(t => ({ ...t, category: 'down' })),
  ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // Daily transaction breakdown
  const dailyBreakdown = allTransactions.reduce((acc, transaction) => {
    const date = new Date(transaction.createdAt).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = { date, xp: 0, up: 0, down: 0, total: 0 };
    }
    acc[date][transaction.category] += transaction.amount;
    acc[date].total += transaction.amount;
    return acc;
  }, {});

  return {
    transactionSummary,
    auditRatio,
    netAuditImpact,
    allTransactions,
    dailyBreakdown: Object.values(dailyBreakdown).sort((a, b) => new Date(a.date) - new Date(b.date)),
    xpTransactions,
    upTransactions,
    downTransactions,
    loading,
    error,
    refetch: () => {
      xpHook.refetch();
      upHook.refetch();
      downHook.refetch();
    },
  };
};

// Hook for XP leaderboard and comparison
export const useXPLeaderboard = (options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const {
    limit = 50,
    campus = null,
    skip: skipOption = false
  } = options;

  const { data, loading, error, refetch } = useQuery(GET_LEADERBOARD, {
    variables: {
      limit,
      campus
    },
    skip: !isAuthenticated || skipOption,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const xpLeaderboard = data?.xp_leaderboard || [];
  const projectLeaderboard = data?.project_leaderboard || [];
  const auditLeaderboard = data?.audit_leaderboard || [];

  // Find current user's position
  const userXPRank = xpLeaderboard.findIndex(u => u.id === user?.id) + 1;
  const userProjectRank = projectLeaderboard.findIndex(u => u.id === user?.id) + 1;
  const userAuditRank = auditLeaderboard.findIndex(u => u.id === user?.id) + 1;

  // User's stats from leaderboard
  const userXPStats = xpLeaderboard.find(u => u.id === user?.id);
  const userProjectStats = projectLeaderboard.find(u => u.id === user?.id);
  const userAuditStats = auditLeaderboard.find(u => u.id === user?.id);

  // Calculate percentiles
  const calculatePercentile = (rank, total) => {
    if (rank === 0 || total === 0) return 0;
    return ((total - rank + 1) / total) * 100;
  };

  const userPercentiles = {
    xp: calculatePercentile(userXPRank, xpLeaderboard.length),
    projects: calculatePercentile(userProjectRank, projectLeaderboard.length),
    audits: calculatePercentile(userAuditRank, auditLeaderboard.length),
  };

  return {
    xpLeaderboard,
    projectLeaderboard,
    auditLeaderboard,
    userRanks: {
      xp: userXPRank,
      projects: userProjectRank,
      audits: userAuditRank,
    },
    userStats: {
      xp: userXPStats,
      projects: userProjectStats,
      audits: userAuditStats,
    },
    userPercentiles,
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

// Enhanced hook for comprehensive audit analysis
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

// Comprehensive hook for audit system analysis
export const useAuditAnalysis = (options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const {
    limit = 50,
    offset = 0,
    skip: skipOption = false
  } = options;

  const { data, loading, error, refetch, fetchMore } = useQuery(GET_USER_AUDITS, {
    variables: {
      userId: user?.id,
      limit,
      offset
    },
    skip: !isAuthenticated || !user?.id || skipOption,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const auditsGiven = data?.audits_given || [];
  const auditsReceived = data?.audits_received || [];
  const auditStatsGiven = data?.audit_stats_given?.aggregate || {};
  const auditStatsReceived = data?.audit_stats_received?.aggregate || {};

  // Audit performance analysis
  const givenAuditAnalysis = {
    total: auditStatsGiven.count || 0,
    averageGrade: auditStatsGiven.avg?.grade || 0,
    passedAudits: auditsGiven.filter(a => a.grade >= 1).length,
    failedAudits: auditsGiven.filter(a => a.grade < 1).length,
    pendingAudits: auditsGiven.filter(a => !a.result).length,
    completedAudits: auditsGiven.filter(a => a.result).length,
  };

  const receivedAuditAnalysis = {
    total: auditStatsReceived.count || 0,
    averageGrade: auditStatsReceived.avg?.grade || 0,
    passedAudits: auditsReceived.filter(a => a.grade >= 1).length,
    failedAudits: auditsReceived.filter(a => a.grade < 1).length,
    pendingAudits: auditsReceived.filter(a => !a.result).length,
    completedAudits: auditsReceived.filter(a => a.result).length,
  };

  // Audit ratio calculation
  const auditRatio = receivedAuditAnalysis.total > 0 ?
    givenAuditAnalysis.total / receivedAuditAnalysis.total : 0;

  // Audit timing analysis
  const auditTimingAnalysis = {
    given: calculateAuditTiming(auditsGiven),
    received: calculateAuditTiming(auditsReceived),
  };

  // Audit success rates
  const auditSuccessRates = {
    asAuditor: givenAuditAnalysis.total > 0 ?
      (givenAuditAnalysis.passedAudits / givenAuditAnalysis.total) * 100 : 0,
    asAuditee: receivedAuditAnalysis.total > 0 ?
      (receivedAuditAnalysis.passedAudits / receivedAuditAnalysis.total) * 100 : 0,
  };

  // Audit relationship mapping
  const auditRelationships = {
    auditorsWorkedWith: [...new Set(auditsReceived.map(a => a.auditor?.id))].length,
    auditeesWorkedWith: [...new Set(auditsGiven.map(a =>
      a.group?.members?.map(m => m.user?.id)).flat())].length,
    frequentAuditors: getFrequentAuditors(auditsReceived),
    frequentAuditees: getFrequentAuditees(auditsGiven),
  };

  // Recent audit activity
  const recentActivity = [
    ...auditsGiven.map(a => ({ ...a, type: 'given' })),
    ...auditsReceived.map(a => ({ ...a, type: 'received' })),
  ]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  return {
    auditsGiven,
    auditsReceived,
    givenAuditAnalysis,
    receivedAuditAnalysis,
    auditRatio,
    auditTimingAnalysis,
    auditSuccessRates,
    auditRelationships,
    recentActivity,
    loading,
    error,
    refetch,
    fetchMore,
    hasMore: auditsGiven.length >= limit || auditsReceived.length >= limit,
  };
};

// Helper function to calculate audit timing patterns
const calculateAuditTiming = (audits) => {
  if (audits.length === 0) return { averageTime: 0, quickestAudit: 0, slowestAudit: 0 };

  const timings = audits
    .filter(audit => audit.createdAt && audit.updatedAt)
    .map(audit => {
      const created = new Date(audit.createdAt);
      const updated = new Date(audit.updatedAt);
      return updated - created; // Time in milliseconds
    });

  if (timings.length === 0) return { averageTime: 0, quickestAudit: 0, slowestAudit: 0 };

  const averageTime = timings.reduce((sum, time) => sum + time, 0) / timings.length;
  const quickestAudit = Math.min(...timings);
  const slowestAudit = Math.max(...timings);

  return {
    averageTime: averageTime / (1000 * 60 * 60), // Convert to hours
    quickestAudit: quickestAudit / (1000 * 60 * 60), // Convert to hours
    slowestAudit: slowestAudit / (1000 * 60 * 60), // Convert to hours
  };
};

// Helper function to get frequent auditors
const getFrequentAuditors = (auditsReceived) => {
  const auditorCounts = auditsReceived.reduce((acc, audit) => {
    const auditorId = audit.auditor?.id;
    if (auditorId) {
      if (!acc[auditorId]) {
        acc[auditorId] = {
          auditor: audit.auditor,
          count: 0,
          averageGrade: 0,
          grades: [],
        };
      }
      acc[auditorId].count++;
      acc[auditorId].grades.push(audit.grade);
    }
    return acc;
  }, {});

  // Calculate average grades
  Object.values(auditorCounts).forEach(auditorData => {
    auditorData.averageGrade = auditorData.grades.reduce((sum, grade) => sum + grade, 0) / auditorData.grades.length;
  });

  return Object.values(auditorCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

// Helper function to get frequent auditees
const getFrequentAuditees = (auditsGiven) => {
  const auditeeCounts = auditsGiven.reduce((acc, audit) => {
    const members = audit.group?.members || [];
    members.forEach(member => {
      const userId = member.user?.id;
      if (userId) {
        if (!acc[userId]) {
          acc[userId] = {
            user: member.user,
            count: 0,
            averageGrade: 0,
            grades: [],
          };
        }
        acc[userId].count++;
        acc[userId].grades.push(audit.grade);
      }
    });
    return acc;
  }, {});

  // Calculate average grades
  Object.values(auditeeCounts).forEach(auditeeData => {
    auditeeData.averageGrade = auditeeData.grades.reduce((sum, grade) => sum + grade, 0) / auditeeData.grades.length;
  });

  return Object.values(auditeeCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

// Hook for detailed audit feedback analysis
export const useAuditFeedback = (options = {}) => {
  const auditAnalysis = useAuditAnalysis(options);

  if (auditAnalysis.loading || auditAnalysis.error) {
    return {
      ...auditAnalysis,
      feedbackAnalysis: null,
      improvementSuggestions: [],
    };
  }

  const { auditsGiven, auditsReceived } = auditAnalysis;

  // Analyze feedback patterns in audit attributes
  const feedbackAnalysis = {
    givenFeedback: analyzeFeedbackPatterns(auditsGiven),
    receivedFeedback: analyzeFeedbackPatterns(auditsReceived),
  };

  // Generate improvement suggestions based on audit performance
  const improvementSuggestions = generateImprovementSuggestions(auditAnalysis);

  // Audit quality metrics
  const auditQualityMetrics = {
    consistencyScore: calculateAuditConsistency(auditsGiven),
    thoroughnessScore: calculateAuditThoroughness(auditsGiven),
    helpfulnessScore: calculateAuditHelpfulness(auditsReceived),
  };

  return {
    ...auditAnalysis,
    feedbackAnalysis,
    improvementSuggestions,
    auditQualityMetrics,
  };
};

// Helper function to analyze feedback patterns
const analyzeFeedbackPatterns = (audits) => {
  const feedbackData = audits
    .filter(audit => audit.attrs)
    .map(audit => {
      try {
        const attrs = typeof audit.attrs === 'string' ? JSON.parse(audit.attrs) : audit.attrs;
        return { ...audit, parsedAttrs: attrs };
      } catch {
        return { ...audit, parsedAttrs: {} };
      }
    });

  const commonFeedbackTopics = {};
  const feedbackLength = [];
  const positiveKeywords = ['good', 'excellent', 'well', 'great', 'perfect', 'nice'];
  const negativeKeywords = ['bad', 'poor', 'wrong', 'error', 'mistake', 'issue'];

  feedbackData.forEach(audit => {
    const attrs = audit.parsedAttrs;
    Object.values(attrs).forEach(value => {
      if (typeof value === 'string') {
        feedbackLength.push(value.length);

        // Count positive/negative sentiment
        const lowerValue = value.toLowerCase();
        positiveKeywords.forEach(keyword => {
          if (lowerValue.includes(keyword)) {
            commonFeedbackTopics[keyword] = (commonFeedbackTopics[keyword] || 0) + 1;
          }
        });
        negativeKeywords.forEach(keyword => {
          if (lowerValue.includes(keyword)) {
            commonFeedbackTopics[keyword] = (commonFeedbackTopics[keyword] || 0) + 1;
          }
        });
      }
    });
  });

  return {
    averageFeedbackLength: feedbackLength.length > 0 ?
      feedbackLength.reduce((sum, len) => sum + len, 0) / feedbackLength.length : 0,
    commonTopics: Object.entries(commonFeedbackTopics)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10),
    totalFeedbackEntries: feedbackLength.length,
  };
};

// Helper function to generate improvement suggestions
const generateImprovementSuggestions = (analysis) => {
  const suggestions = [];
  const { auditRatio, auditSuccessRates, givenAuditAnalysis } = analysis;

  // Audit ratio suggestions
  if (auditRatio < 0.8) {
    suggestions.push({
      type: 'audit_ratio',
      priority: 'high',
      message: 'Your audit ratio is below the recommended 0.8. Consider doing more audits to help your peers.',
      action: 'Participate in more audit sessions',
    });
  }

  // Success rate suggestions
  if (auditSuccessRates.asAuditor < 70) {
    suggestions.push({
      type: 'auditor_performance',
      priority: 'medium',
      message: 'Your audit pass rate as an auditor is below 70%. Focus on being more thorough in your evaluations.',
      action: 'Review audit criteria more carefully',
    });
  }

  if (auditSuccessRates.asAuditee < 60) {
    suggestions.push({
      type: 'auditee_performance',
      priority: 'high',
      message: 'Your success rate in audits is below 60%. Consider improving code quality before submissions.',
      action: 'Review failed audits and improve based on feedback',
    });
  }

  // Activity suggestions
  if (givenAuditAnalysis.total < 5) {
    suggestions.push({
      type: 'activity',
      priority: 'low',
      message: 'You have limited audit experience. Participating in more audits will improve your skills.',
      action: 'Volunteer for more audit opportunities',
    });
  }

  return suggestions;
};

// Helper function to calculate audit consistency
const calculateAuditConsistency = (auditsGiven) => {
  if (auditsGiven.length < 3) return 0;

  const grades = auditsGiven.map(audit => audit.grade);
  const mean = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
  const variance = grades.reduce((sum, grade) => sum + Math.pow(grade - mean, 2), 0) / grades.length;
  const standardDeviation = Math.sqrt(variance);

  // Lower standard deviation indicates higher consistency
  const consistencyScore = Math.max(0, 100 - (standardDeviation * 50));
  return Math.min(100, consistencyScore);
};

// Helper function to calculate audit thoroughness
const calculateAuditThoroughness = (auditsGiven) => {
  if (auditsGiven.length === 0) return 0;

  const thoroughnessScores = auditsGiven.map(audit => {
    let score = 0;

    // Check if feedback was provided
    if (audit.attrs) {
      try {
        const attrs = typeof audit.attrs === 'string' ? JSON.parse(audit.attrs) : audit.attrs;
        const feedbackEntries = Object.values(attrs).filter(value =>
          typeof value === 'string' && value.length > 10
        );
        score += Math.min(50, feedbackEntries.length * 10);
      } catch {
        // Invalid attrs format
      }
    }

    // Check if audit was completed (has result)
    if (audit.result) {
      score += 25;
    }

    // Check timing (not too quick, not too slow)
    if (audit.createdAt && audit.updatedAt) {
      const timeTaken = new Date(audit.updatedAt) - new Date(audit.createdAt);
      const hours = timeTaken / (1000 * 60 * 60);
      if (hours >= 0.5 && hours <= 24) { // Between 30 minutes and 24 hours
        score += 25;
      }
    }

    return Math.min(100, score);
  });

  return thoroughnessScores.reduce((sum, score) => sum + score, 0) / thoroughnessScores.length;
};

// Helper function to calculate audit helpfulness (from received audits)
const calculateAuditHelpfulness = (auditsReceived) => {
  if (auditsReceived.length === 0) return 0;

  // This is a simplified metric - in a real system, you might have user ratings
  const helpfulnessScores = auditsReceived.map(audit => {
    let score = 50; // Base score

    // Detailed feedback increases helpfulness
    if (audit.attrs) {
      try {
        const attrs = typeof audit.attrs === 'string' ? JSON.parse(audit.attrs) : audit.attrs;
        const detailedFeedback = Object.values(attrs).filter(value =>
          typeof value === 'string' && value.length > 20
        );
        score += Math.min(30, detailedFeedback.length * 10);
      } catch {
        // Invalid attrs format
      }
    }

    // Fair grading (not too harsh, not too lenient)
    if (audit.grade >= 0.3 && audit.grade <= 1.2) {
      score += 20;
    }

    return Math.min(100, score);
  });

  return helpfulnessScores.reduce((sum, score) => sum + score, 0) / helpfulnessScores.length;
};

// ============================================================================
// USER STATISTICS AND RATIO CALCULATIONS
// ============================================================================

// Comprehensive hook for user statistics and performance metrics
export const useUserStatistics = (options = {}) => {
  const { user } = useAuth();
  const {
    fromDate = null,
    toDate = null,
    skip: skipOption = false
  } = options;

  // Use existing hooks to gather data
  const profileHook = useUserProfile();
  const xpHook = useXPStatistics({ fromDate, toDate, skip: skipOption });
  const projectHook = useProjectStatistics({ skip: skipOption });
  const auditHook = useAuditAnalysis({ skip: skipOption });
  const progressHook = useUserProgress({ skip: skipOption });
  const resultsHook = useUserResults({ skip: skipOption });

  const loading = profileHook.loading || xpHook.loading || projectHook.loading ||
                  auditHook.loading || progressHook.loading || resultsHook.loading;

  const error = profileHook.error || xpHook.error || projectHook.error ||
                auditHook.error || progressHook.error || resultsHook.error;

  if (loading || error || skipOption) {
    return { loading, error, statistics: null };
  }

  // Calculate comprehensive statistics
  const statistics = {
    // Basic profile stats
    profile: {
      userId: user?.id,
      login: profileHook.profile?.login,
      campus: profileHook.profile?.campus,
      joinDate: profileHook.profile?.createdAt,
      daysSinceJoining: profileHook.profile?.createdAt ?
        Math.floor((new Date() - new Date(profileHook.profile.createdAt)) / (1000 * 60 * 60 * 24)) : 0,
    },

    // XP and learning metrics
    learning: {
      totalXP: xpHook.totalXP,
      averageXPPerDay: xpHook.performanceMetrics?.xpPerDay || 0,
      xpGrowthRate: xpHook.performanceMetrics?.growthRate || 0,
      consistencyScore: xpHook.performanceMetrics?.consistencyScore || 0,
      mostProductiveDay: xpHook.performanceMetrics?.mostProductiveDay,
      xpByType: xpHook.xpByObjectType,
      learningStreak: calculateLearningStreak(xpHook.xpProgression),
    },

    // Project performance metrics
    projects: {
      totalProjects: projectHook.totalProjects,
      passedProjects: projectHook.passedProjects,
      failedProjects: projectHook.failedProjects,
      passRate: projectHook.passRate,
      averageGrade: projectHook.averageGrade,
      projectEfficiency: calculateProjectEfficiency(projectHook),
      difficultyProgression: analyzeDifficultyProgression(projectHook.project_results),
    },

    // Progress and completion metrics
    progress: {
      totalProgress: progressHook.totalCount,
      completedItems: progressHook.completedProgress.length,
      inProgressItems: progressHook.inProgressItems.length,
      completionRate: progressHook.completionRate,
      averageGrade: progressHook.averageGrade,
      progressVelocity: calculateProgressVelocity(progressHook.completionTimeline),
    },

    // Audit and collaboration metrics
    collaboration: {
      auditRatio: auditHook.auditRatio,
      auditsGiven: auditHook.givenAuditAnalysis.total,
      auditsReceived: auditHook.receivedAuditAnalysis.total,
      auditSuccessRateAsAuditor: auditHook.auditSuccessRates.asAuditor,
      auditSuccessRateAsAuditee: auditHook.auditSuccessRates.asAuditee,
      auditorsWorkedWith: auditHook.auditRelationships.auditorsWorkedWith,
      auditeesWorkedWith: auditHook.auditRelationships.auditeesWorkedWith,
      collaborationScore: calculateCollaborationScore(auditHook),
    },

    // Overall performance score
    overall: {
      performanceScore: 0, // Will be calculated below
      rank: null, // Would need leaderboard data
      percentile: null, // Would need leaderboard data
      strengths: [],
      improvementAreas: [],
    },
  };

  // Calculate overall performance score (0-100)
  statistics.overall.performanceScore = calculateOverallPerformanceScore(statistics);

  // Identify strengths and improvement areas
  const analysis = analyzeUserPerformance(statistics);
  statistics.overall.strengths = analysis.strengths;
  statistics.overall.improvementAreas = analysis.improvementAreas;

  return {
    statistics,
    loading,
    error,
    refetch: () => {
      profileHook.refetch();
      xpHook.refetch();
      projectHook.refetch();
      auditHook.refetch();
      progressHook.refetch();
      resultsHook.refetch();
    },
  };
};

// Hook for skill proficiency metrics
export const useSkillProficiency = (options = {}) => {
  const { skip: skipOption = false } = options;

  const skillsHook = useUserSkills();
  const xpHook = useXPStatistics({ skip: skipOption });
  const progressHook = useUserProgress({ skip: skipOption });

  const loading = skillsHook.loading || xpHook.loading || progressHook.loading;
  const error = skillsHook.error || xpHook.error || progressHook.error;

  if (loading || error || skipOption) {
    return { loading, error, skillProficiency: null };
  }

  // Analyze skill proficiency
  const skillProficiency = skillsHook.skills.map(skill => {
    // Find related progress and XP data
    const relatedXP = xpHook.xpByProject.filter(project =>
      project.path.toLowerCase().includes(skill.name.toLowerCase())
    );

    const relatedProgress = progressHook.progress.filter(progress =>
      progress.path.toLowerCase().includes(skill.name.toLowerCase()) ||
      progress.object?.name?.toLowerCase().includes(skill.name.toLowerCase())
    );

    const totalXPInSkill = relatedXP.reduce((sum, project) => sum + project.totalXP, 0);
    const completedInSkill = relatedProgress.filter(p => p.isDone).length;
    const averageGradeInSkill = relatedProgress.length > 0 ?
      relatedProgress.reduce((sum, p) => sum + p.grade, 0) / relatedProgress.length : 0;

    // Calculate proficiency level (Beginner, Intermediate, Advanced, Expert)
    const proficiencyLevel = calculateProficiencyLevel(totalXPInSkill, completedInSkill, averageGradeInSkill);

    // Calculate skill growth trend
    const growthTrend = calculateSkillGrowthTrend(relatedProgress);

    return {
      ...skill,
      totalXP: totalXPInSkill,
      completedProjects: completedInSkill,
      averageGrade: averageGradeInSkill,
      proficiencyLevel,
      proficiencyScore: calculateProficiencyScore(totalXPInSkill, completedInSkill, averageGradeInSkill),
      growthTrend,
      lastActivity: getLastActivity(relatedProgress),
    };
  });

  // Sort by proficiency score
  skillProficiency.sort((a, b) => b.proficiencyScore - a.proficiencyScore);

  // Identify top skills and skills needing improvement
  const topSkills = skillProficiency.slice(0, 5);
  const improvingSkills = skillProficiency.filter(skill => skill.growthTrend > 0).slice(0, 3);
  const skillsNeedingAttention = skillProficiency.filter(skill =>
    skill.proficiencyScore < 30 && skill.lastActivity &&
    new Date() - new Date(skill.lastActivity) > 30 * 24 * 60 * 60 * 1000 // 30 days
  );

  return {
    skillProficiency,
    topSkills,
    improvingSkills,
    skillsNeedingAttention,
    skillDistribution: {
      beginner: skillProficiency.filter(s => s.proficiencyLevel === 'Beginner').length,
      intermediate: skillProficiency.filter(s => s.proficiencyLevel === 'Intermediate').length,
      advanced: skillProficiency.filter(s => s.proficiencyLevel === 'Advanced').length,
      expert: skillProficiency.filter(s => s.proficiencyLevel === 'Expert').length,
    },
    loading,
    error,
    refetch: () => {
      skillsHook.refetch();
      xpHook.refetch();
      progressHook.refetch();
    },
  };
};

// ============================================================================
// HELPER FUNCTIONS FOR STATISTICS CALCULATIONS
// ============================================================================

// Calculate learning streak (consecutive days with XP gain)
const calculateLearningStreak = (xpProgression) => {
  if (xpProgression.length === 0) return 0;

  let currentStreak = 0;
  let maxStreak = 0;
  let lastDate = null;

  xpProgression
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach(day => {
      const currentDate = new Date(day.date);

      if (lastDate) {
        const dayDiff = (currentDate - lastDate) / (1000 * 60 * 60 * 24);
        if (dayDiff === 1) {
          currentStreak++;
        } else {
          maxStreak = Math.max(maxStreak, currentStreak);
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }

      lastDate = currentDate;
    });

  return Math.max(maxStreak, currentStreak);
};

// Calculate project efficiency (projects completed vs attempted)
const calculateProjectEfficiency = (projectHook) => {
  const { totalProjects, passedProjects, project_attempts } = projectHook;
  const totalAttempts = project_attempts?.aggregate?.count || totalProjects;

  return totalAttempts > 0 ? (passedProjects / totalAttempts) * 100 : 0;
};

// Analyze difficulty progression in projects
const analyzeDifficultyProgression = (projectResults) => {
  if (!projectResults || projectResults.length === 0) return { trend: 'stable', score: 0 };

  // Sort by creation date
  const sortedResults = projectResults
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // Calculate moving average of grades
  const windowSize = 5;
  const movingAverages = [];

  for (let i = windowSize - 1; i < sortedResults.length; i++) {
    const window = sortedResults.slice(i - windowSize + 1, i + 1);
    const average = window.reduce((sum, result) => sum + result.grade, 0) / window.length;
    movingAverages.push(average);
  }

  if (movingAverages.length < 2) return { trend: 'stable', score: 0 };

  // Calculate trend
  const firstHalf = movingAverages.slice(0, Math.floor(movingAverages.length / 2));
  const secondHalf = movingAverages.slice(Math.floor(movingAverages.length / 2));

  const firstHalfAvg = firstHalf.reduce((sum, avg) => sum + avg, 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, avg) => sum + avg, 0) / secondHalf.length;

  const improvement = secondHalfAvg - firstHalfAvg;

  let trend = 'stable';
  if (improvement > 0.1) trend = 'improving';
  else if (improvement < -0.1) trend = 'declining';

  return { trend, score: improvement * 100 };
};

// Calculate progress velocity (items completed per time period)
const calculateProgressVelocity = (completionTimeline) => {
  if (completionTimeline.length < 2) return 0;

  const sortedTimeline = completionTimeline
    .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

  const firstCompletion = new Date(sortedTimeline[0].updatedAt);
  const lastCompletion = new Date(sortedTimeline[sortedTimeline.length - 1].updatedAt);

  const daysDiff = (lastCompletion - firstCompletion) / (1000 * 60 * 60 * 24);

  return daysDiff > 0 ? completionTimeline.length / daysDiff : 0;
};

// Calculate collaboration score based on audit metrics
const calculateCollaborationScore = (auditHook) => {
  const { auditRatio, auditSuccessRates, auditRelationships } = auditHook;

  let score = 0;

  // Audit ratio contribution (0-30 points)
  score += Math.min(30, auditRatio * 30);

  // Success rates contribution (0-40 points)
  score += (auditSuccessRates.asAuditor * 0.2) + (auditSuccessRates.asAuditee * 0.2);

  // Network diversity contribution (0-30 points)
  const networkSize = auditRelationships.auditorsWorkedWith + auditRelationships.auditeesWorkedWith;
  score += Math.min(30, networkSize * 2);

  return Math.min(100, score);
};

// Calculate overall performance score
const calculateOverallPerformanceScore = (statistics) => {
  let score = 0;

  // Learning metrics (25 points)
  score += Math.min(25, (statistics.learning.totalXP / 10000) * 25);

  // Project performance (25 points)
  score += (statistics.projects.passRate / 100) * 25;

  // Progress completion (25 points)
  score += (statistics.progress.completionRate / 100) * 25;

  // Collaboration (25 points)
  score += (statistics.collaboration.collaborationScore / 100) * 25;

  return Math.min(100, score);
};

// Analyze user performance to identify strengths and improvement areas
const analyzeUserPerformance = (statistics) => {
  const strengths = [];
  const improvementAreas = [];

  // Analyze learning performance
  if (statistics.learning.consistencyScore > 70) {
    strengths.push('Consistent learning pattern');
  } else if (statistics.learning.consistencyScore < 40) {
    improvementAreas.push('Improve learning consistency');
  }

  if (statistics.learning.xpGrowthRate > 10) {
    strengths.push('Strong learning growth');
  } else if (statistics.learning.xpGrowthRate < -10) {
    improvementAreas.push('Focus on maintaining learning momentum');
  }

  // Analyze project performance
  if (statistics.projects.passRate > 80) {
    strengths.push('High project success rate');
  } else if (statistics.projects.passRate < 60) {
    improvementAreas.push('Improve project completion quality');
  }

  // Analyze collaboration
  if (statistics.collaboration.auditRatio > 1.0) {
    strengths.push('Active in peer reviews');
  } else if (statistics.collaboration.auditRatio < 0.5) {
    improvementAreas.push('Participate more in peer audits');
  }

  if (statistics.collaboration.auditSuccessRateAsAuditor > 75) {
    strengths.push('Effective auditor');
  }

  if (statistics.collaboration.auditSuccessRateAsAuditee < 65) {
    improvementAreas.push('Focus on audit preparation');
  }

  // Analyze progress
  if (statistics.progress.completionRate > 85) {
    strengths.push('High completion rate');
  } else if (statistics.progress.completionRate < 50) {
    improvementAreas.push('Improve task completion');
  }

  return { strengths, improvementAreas };
};

// Calculate proficiency level based on XP, completed projects, and average grade
const calculateProficiencyLevel = (totalXP, completedProjects, averageGrade) => {
  const xpScore = Math.min(40, totalXP / 100); // Max 40 points for XP
  const projectScore = Math.min(30, completedProjects * 5); // Max 30 points for projects
  const gradeScore = averageGrade * 30; // Max 30 points for grade

  const totalScore = xpScore + projectScore + gradeScore;

  if (totalScore >= 80) return 'Expert';
  if (totalScore >= 60) return 'Advanced';
  if (totalScore >= 30) return 'Intermediate';
  return 'Beginner';
};

// Calculate numerical proficiency score
const calculateProficiencyScore = (totalXP, completedProjects, averageGrade) => {
  const xpScore = Math.min(40, totalXP / 100);
  const projectScore = Math.min(30, completedProjects * 5);
  const gradeScore = averageGrade * 30;

  return xpScore + projectScore + gradeScore;
};

// Calculate skill growth trend
const calculateSkillGrowthTrend = (relatedProgress) => {
  if (relatedProgress.length < 2) return 0;

  const sortedProgress = relatedProgress
    .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

  const recentProgress = sortedProgress.slice(-5); // Last 5 items
  const olderProgress = sortedProgress.slice(0, -5);

  if (olderProgress.length === 0) return 0;

  const recentAvg = recentProgress.reduce((sum, p) => sum + p.grade, 0) / recentProgress.length;
  const olderAvg = olderProgress.reduce((sum, p) => sum + p.grade, 0) / olderProgress.length;

  return recentAvg - olderAvg;
};

// Get last activity date for a skill
const getLastActivity = (relatedProgress) => {
  if (relatedProgress.length === 0) return null;

  const sortedProgress = relatedProgress
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return sortedProgress[0].updatedAt;
};

// ============================================================================
// PROJECT AND OBJECT MANAGEMENT QUERIES
// ============================================================================

// Hook for detailed object information and relationships
export const useObjectDetails = (objectId, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const { skip: skipOption = false } = options;

  const { data, loading, error, refetch } = useQuery(GET_OBJECT_DETAILS, {
    variables: {
      objectId,
      userId: user?.id
    },
    skip: !isAuthenticated || !objectId || skipOption,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const objectDetails = data?.object?.[0] || null;

  if (!objectDetails) {
    return { objectDetails: null, loading, error, refetch };
  }

  // Process object hierarchy
  const children = objectDetails.children?.map(child => ({
    ...child.child,
    key: child.key,
    index: child.index,
    attrs: child.attrs,
  })) || [];

  const parents = objectDetails.parent?.map(parent => ({
    ...parent.parent,
    key: parent.key,
    index: parent.index,
    attrs: parent.attrs,
  })) || [];

  // Process user-specific data
  const userProgress = objectDetails.userProgress?.[0] || null;
  const userResults = objectDetails.userResults || [];
  const userTransactions = objectDetails.userTransactions || [];

  // Calculate object difficulty based on user data and XP rewards
  const difficulty = calculateObjectDifficulty(objectDetails, userTransactions);

  // Analyze object completion patterns
  const completionAnalysis = analyzeObjectCompletion(objectDetails, userResults);

  return {
    objectDetails: {
      ...objectDetails,
      children,
      parents,
      difficulty,
      completionAnalysis,
      userProgress,
      userResults,
      userTransactions,
    },
    loading,
    error,
    refetch,
  };
};

// Hook for project submission analysis
export const useProjectSubmissions = (options = {}) => {
  const {
    objectType = 'project',
    limit = 100,
    skip: skipOption = false
  } = options;

  const resultsHook = useUserResults({ type: null, limit, skip: skipOption });
  const progressHook = useUserProgress({ limit, skip: skipOption });

  const loading = resultsHook.loading || progressHook.loading;
  const error = resultsHook.error || progressHook.error;

  if (loading || error || skipOption) {
    return { loading, error, submissions: [] };
  }

  // Filter for project submissions
  const projectSubmissions = resultsHook.results.filter(result =>
    result.object?.type === objectType
  );

  // Analyze submission patterns
  const submissionAnalysis = {
    totalSubmissions: projectSubmissions.length,
    successfulSubmissions: projectSubmissions.filter(s => s.grade >= 1).length,
    failedSubmissions: projectSubmissions.filter(s => s.grade < 1).length,
    averageGrade: projectSubmissions.length > 0 ?
      projectSubmissions.reduce((sum, s) => sum + s.grade, 0) / projectSubmissions.length : 0,
    submissionFrequency: calculateSubmissionFrequency(projectSubmissions),
    retryPatterns: analyzeRetryPatterns(projectSubmissions),
    timeToCompletion: calculateTimeToCompletion(projectSubmissions, progressHook.progress),
  };

  // Group submissions by project
  const submissionsByProject = projectSubmissions.reduce((acc, submission) => {
    const projectName = submission.object?.name || 'Unknown';
    if (!acc[projectName]) {
      acc[projectName] = {
        projectName,
        submissions: [],
        bestGrade: 0,
        attempts: 0,
        completed: false,
      };
    }

    acc[projectName].submissions.push(submission);
    acc[projectName].attempts++;
    acc[projectName].bestGrade = Math.max(acc[projectName].bestGrade, submission.grade);
    acc[projectName].completed = acc[projectName].bestGrade >= 1;

    return acc;
  }, {});

  return {
    submissions: projectSubmissions,
    submissionAnalysis,
    submissionsByProject: Object.values(submissionsByProject),
    loading,
    error,
    refetch: () => {
      resultsHook.refetch();
      progressHook.refetch();
    },
  };
};

// Hook for project difficulty analysis
export const useProjectDifficulty = (options = {}) => {
  const { skip: skipOption = false } = options;

  const projectHook = useProjectStatistics({ skip: skipOption });
  const xpHook = useXPStatistics({ skip: skipOption });

  const loading = projectHook.loading || xpHook.loading;
  const error = projectHook.error || xpHook.error;

  if (loading || error || skipOption) {
    return { loading, error, difficultyAnalysis: null };
  }

  // Analyze project difficulty based on XP rewards and completion rates
  const projectDifficulties = projectHook.project_results.map(result => {
    const relatedXP = xpHook.xpByProject.find(xp =>
      xp.path === result.path || xp.name === result.object?.name
    );

    const xpReward = relatedXP?.totalXP || 0;
    const attempts = projectHook.project_attempts?.aggregate?.count || 1;
    const successRate = result.grade >= 1 ? 100 : 0;

    // Calculate difficulty score (higher XP and lower success rate = higher difficulty)
    const difficultyScore = calculateDifficultyScore(xpReward, successRate, attempts);

    return {
      ...result,
      xpReward,
      attempts,
      successRate,
      difficultyScore,
      difficultyLevel: getDifficultyLevel(difficultyScore),
    };
  });

  // Sort by difficulty
  projectDifficulties.sort((a, b) => b.difficultyScore - a.difficultyScore);

  // Categorize projects by difficulty
  const difficultyDistribution = {
    easy: projectDifficulties.filter(p => p.difficultyLevel === 'Easy').length,
    medium: projectDifficulties.filter(p => p.difficultyLevel === 'Medium').length,
    hard: projectDifficulties.filter(p => p.difficultyLevel === 'Hard').length,
    expert: projectDifficulties.filter(p => p.difficultyLevel === 'Expert').length,
  };

  // Analyze user's difficulty progression
  const difficultyProgression = analyzeDifficultyProgression(projectDifficulties);

  return {
    projectDifficulties,
    difficultyDistribution,
    difficultyProgression,
    averageDifficulty: projectDifficulties.length > 0 ?
      projectDifficulties.reduce((sum, p) => sum + p.difficultyScore, 0) / projectDifficulties.length : 0,
    loading,
    error,
    refetch: () => {
      projectHook.refetch();
      xpHook.refetch();
    },
  };
};

// Hook for project completion patterns analysis
export const useProjectPatterns = (options = {}) => {
  const { skip: skipOption = false } = options;

  const projectHook = useProjectStatistics({ skip: skipOption });
  const progressHook = useUserProgress({ skip: skipOption });
  const resultsHook = useUserResults({ skip: skipOption });

  const loading = projectHook.loading || progressHook.loading || resultsHook.loading;
  const error = projectHook.error || progressHook.error || resultsHook.error;

  if (loading || error || skipOption) {
    return { loading, error, patterns: null };
  }

  // Analyze completion patterns
  const patterns = {
    // Time-based patterns
    timePatterns: analyzeTimePatterns(resultsHook.results),

    // Difficulty progression patterns
    difficultyPatterns: analyzeDifficultyPatterns(projectHook.project_results),

    // Success/failure patterns
    successPatterns: analyzeSuccessPatterns(resultsHook.results),

    // Retry patterns
    retryPatterns: analyzeRetryPatterns(resultsHook.results),

    // Learning curve analysis
    learningCurve: analyzeLearningCurve(resultsHook.results),

    // Project type preferences
    typePreferences: analyzeTypePreferences(resultsHook.results),
  };

  return {
    patterns,
    loading,
    error,
    refetch: () => {
      projectHook.refetch();
      progressHook.refetch();
      resultsHook.refetch();
    },
  };
};

// ============================================================================
// HELPER FUNCTIONS FOR PROJECT AND OBJECT ANALYSIS
// ============================================================================

// Calculate object difficulty based on XP rewards and completion data
const calculateObjectDifficulty = (objectDetails, userTransactions) => {
  const xpReward = userTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const objectType = objectDetails.type;

  // Base difficulty scoring
  let difficultyScore = 0;

  // XP-based difficulty (higher XP = higher difficulty)
  if (xpReward > 0) {
    difficultyScore += Math.min(50, xpReward / 100);
  }

  // Object type-based difficulty
  const typeDifficulty = {
    'exercise': 10,
    'quest': 20,
    'project': 30,
    'exam': 40,
    'raid': 50,
  };
  difficultyScore += typeDifficulty[objectType] || 15;

  // Normalize to 0-100 scale
  return Math.min(100, difficultyScore);
};

// Analyze object completion patterns
const analyzeObjectCompletion = (_, userResults) => {
  if (!userResults || userResults.length === 0) {
    return {
      attempts: 0,
      completed: false,
      averageGrade: 0,
      bestGrade: 0,
      timeToComplete: null,
    };
  }

  const attempts = userResults.length;
  const grades = userResults.map(r => r.grade);
  const bestGrade = Math.max(...grades);
  const averageGrade = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
  const completed = bestGrade >= 1;

  // Calculate time to complete (from first attempt to successful completion)
  let timeToComplete = null;
  if (completed) {
    const sortedResults = userResults.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const firstAttempt = sortedResults[0];
    const successfulResult = sortedResults.find(r => r.grade >= 1);

    if (firstAttempt && successfulResult) {
      timeToComplete = new Date(successfulResult.createdAt) - new Date(firstAttempt.createdAt);
      timeToComplete = timeToComplete / (1000 * 60 * 60 * 24); // Convert to days
    }
  }

  return {
    attempts,
    completed,
    averageGrade,
    bestGrade,
    timeToComplete,
  };
};

// Calculate submission frequency
const calculateSubmissionFrequency = (submissions) => {
  if (submissions.length < 2) return 0;

  const sortedSubmissions = submissions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const firstSubmission = new Date(sortedSubmissions[0].createdAt);
  const lastSubmission = new Date(sortedSubmissions[sortedSubmissions.length - 1].createdAt);

  const daysDiff = (lastSubmission - firstSubmission) / (1000 * 60 * 60 * 24);
  return daysDiff > 0 ? submissions.length / daysDiff : 0;
};

// Analyze retry patterns
const analyzeRetryPatterns = (submissions) => {
  // Group submissions by project/object
  const submissionsByProject = submissions.reduce((acc, submission) => {
    const key = submission.object?.id || submission.path;
    if (!acc[key]) acc[key] = [];
    acc[key].push(submission);
    return acc;
  }, {});

  const retryData = Object.values(submissionsByProject).map(projectSubmissions => {
    const sorted = projectSubmissions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const attempts = sorted.length;
    const successful = sorted.some(s => s.grade >= 1);
    const improvementRate = attempts > 1 ?
      (sorted[sorted.length - 1].grade - sorted[0].grade) / (attempts - 1) : 0;

    return {
      projectId: sorted[0].object?.id,
      projectName: sorted[0].object?.name,
      attempts,
      successful,
      improvementRate,
      finalGrade: sorted[sorted.length - 1].grade,
    };
  });

  return {
    projectsWithRetries: retryData.filter(p => p.attempts > 1).length,
    averageAttempts: retryData.reduce((sum, p) => sum + p.attempts, 0) / retryData.length,
    successAfterRetry: retryData.filter(p => p.attempts > 1 && p.successful).length,
    averageImprovementRate: retryData.reduce((sum, p) => sum + p.improvementRate, 0) / retryData.length,
  };
};

// Calculate time to completion
const calculateTimeToCompletion = (submissions) => {
  const completionTimes = [];

  // Group by project and calculate time from start to completion
  const submissionsByProject = submissions.reduce((acc, submission) => {
    const key = submission.object?.id || submission.path;
    if (!acc[key]) acc[key] = [];
    acc[key].push(submission);
    return acc;
  }, {});

  Object.values(submissionsByProject).forEach(projectSubmissions => {
    const sorted = projectSubmissions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const successful = sorted.find(s => s.grade >= 1);

    if (successful && sorted.length > 0) {
      const startTime = new Date(sorted[0].createdAt);
      const endTime = new Date(successful.createdAt);
      const completionTime = (endTime - startTime) / (1000 * 60 * 60 * 24); // Days
      completionTimes.push(completionTime);
    }
  });

  return {
    averageTime: completionTimes.length > 0 ?
      completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length : 0,
    fastestCompletion: completionTimes.length > 0 ? Math.min(...completionTimes) : 0,
    slowestCompletion: completionTimes.length > 0 ? Math.max(...completionTimes) : 0,
    completionTimes,
  };
};

// Calculate difficulty score for projects
const calculateDifficultyScore = (xpReward, successRate, attempts) => {
  let score = 0;

  // XP reward component (0-40 points)
  score += Math.min(40, xpReward / 250);

  // Success rate component (0-40 points, inverted)
  score += (100 - successRate) * 0.4;

  // Attempts component (0-20 points)
  score += Math.min(20, attempts * 5);

  return Math.min(100, score);
};

// Get difficulty level from score
const getDifficultyLevel = (score) => {
  if (score >= 75) return 'Expert';
  if (score >= 50) return 'Hard';
  if (score >= 25) return 'Medium';
  return 'Easy';
};

// Analyze time-based patterns
const analyzeTimePatterns = (results) => {
  const hourlyActivity = results.reduce((acc, result) => {
    const hour = new Date(result.createdAt).getHours();
    if (!acc[hour]) acc[hour] = { hour, count: 0, successCount: 0 };
    acc[hour].count++;
    if (result.grade >= 1) acc[hour].successCount++;
    return acc;
  }, {});

  const dailyActivity = results.reduce((acc, result) => {
    const day = new Date(result.createdAt).getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[day];
    if (!acc[dayName]) acc[dayName] = { day: dayName, count: 0, successCount: 0 };
    acc[dayName].count++;
    if (result.grade >= 1) acc[dayName].successCount++;
    return acc;
  }, {});

  return {
    hourlyActivity: Object.values(hourlyActivity),
    dailyActivity: Object.values(dailyActivity),
    mostProductiveHour: Object.values(hourlyActivity).reduce((max, hour) =>
      hour.count > (max?.count || 0) ? hour : max, null),
    mostProductiveDay: Object.values(dailyActivity).reduce((max, day) =>
      day.count > (max?.count || 0) ? day : max, null),
  };
};

// Analyze difficulty progression patterns
const analyzeDifficultyPatterns = (results) => {
  const sortedResults = results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // Calculate moving average of grades to see improvement over time
  const windowSize = 5;
  const movingAverages = [];

  for (let i = windowSize - 1; i < sortedResults.length; i++) {
    const window = sortedResults.slice(i - windowSize + 1, i + 1);
    const average = window.reduce((sum, result) => sum + result.grade, 0) / window.length;
    movingAverages.push({
      index: i,
      average,
      date: sortedResults[i].createdAt,
    });
  }

  return {
    movingAverages,
    overallTrend: movingAverages.length > 1 ?
      movingAverages[movingAverages.length - 1].average - movingAverages[0].average : 0,
    isImproving: movingAverages.length > 1 &&
      movingAverages[movingAverages.length - 1].average > movingAverages[0].average,
  };
};

// Analyze success/failure patterns
const analyzeSuccessPatterns = (results) => {
  const successfulResults = results.filter(r => r.grade >= 1);
  const failedResults = results.filter(r => r.grade < 1);

  return {
    totalResults: results.length,
    successfulResults: successfulResults.length,
    failedResults: failedResults.length,
    successRate: results.length > 0 ? (successfulResults.length / results.length) * 100 : 0,
    averageSuccessGrade: successfulResults.length > 0 ?
      successfulResults.reduce((sum, r) => sum + r.grade, 0) / successfulResults.length : 0,
    averageFailureGrade: failedResults.length > 0 ?
      failedResults.reduce((sum, r) => sum + r.grade, 0) / failedResults.length : 0,
  };
};

// Analyze learning curve
const analyzeLearningCurve = (results) => {
  const sortedResults = results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  if (sortedResults.length < 3) {
    return { curve: 'insufficient_data', improvement: 0 };
  }

  // Divide results into thirds to analyze progression
  const third = Math.floor(sortedResults.length / 3);
  const firstThird = sortedResults.slice(0, third);
  const middleThird = sortedResults.slice(third, third * 2);
  const lastThird = sortedResults.slice(third * 2);

  const firstAvg = firstThird.reduce((sum, r) => sum + r.grade, 0) / firstThird.length;
  const middleAvg = middleThird.reduce((sum, r) => sum + r.grade, 0) / middleThird.length;
  const lastAvg = lastThird.reduce((sum, r) => sum + r.grade, 0) / lastThird.length;

  const improvement = lastAvg - firstAvg;

  let curve = 'stable';
  if (improvement > 0.2) curve = 'improving';
  else if (improvement < -0.2) curve = 'declining';

  return {
    curve,
    improvement,
    firstThirdAverage: firstAvg,
    middleThirdAverage: middleAvg,
    lastThirdAverage: lastAvg,
  };
};

// Analyze project type preferences
const analyzeTypePreferences = (results) => {
  const typeStats = results.reduce((acc, result) => {
    const type = result.object?.type || 'unknown';
    if (!acc[type]) {
      acc[type] = { type, count: 0, successCount: 0, totalGrade: 0 };
    }
    acc[type].count++;
    acc[type].totalGrade += result.grade;
    if (result.grade >= 1) acc[type].successCount++;
    return acc;
  }, {});

  // Calculate averages and success rates
  Object.values(typeStats).forEach(stat => {
    stat.averageGrade = stat.totalGrade / stat.count;
    stat.successRate = (stat.successCount / stat.count) * 100;
  });

  // Sort by preference (combination of count and success rate)
  const preferences = Object.values(typeStats)
    .map(stat => ({
      ...stat,
      preferenceScore: (stat.count * 0.6) + (stat.successRate * 0.4),
    }))
    .sort((a, b) => b.preferenceScore - a.preferenceScore);

  return {
    typeStats: Object.values(typeStats),
    preferences,
    mostPreferred: preferences[0] || null,
    leastPreferred: preferences[preferences.length - 1] || null,
  };
};

// ============================================================================
// EVENT AND GROUP MANAGEMENT QUERIES
// ============================================================================

// Enhanced hook for event participation tracking
export const useEventParticipation = (options = {}) => {
  const {
    limit = 50,
    offset = 0,
    status = null,
    skip: skipOption = false
  } = options;

  const eventsHook = useUserEvents({ limit, offset, status, skip: skipOption });

  if (eventsHook.loading || eventsHook.error || skipOption) {
    return { ...eventsHook, participationAnalysis: null };
  }

  const { userEvents, userRegistrations } = eventsHook;

  // Analyze event participation patterns
  const participationAnalysis = {
    // Event type participation
    eventTypeParticipation: analyzeEventTypeParticipation(userEvents),

    // Event completion rates
    completionRates: analyzeEventCompletionRates(userEvents),

    // Registration vs participation
    registrationEfficiency: analyzeRegistrationEfficiency(userRegistrations, userEvents),

    // Event performance metrics
    performanceMetrics: analyzeEventPerformance(userEvents),

    // Time-based participation patterns
    participationPatterns: analyzeParticipationPatterns(userEvents),

    // Event duration analysis
    durationAnalysis: analyzeEventDurations(userEvents),
  };

  return {
    ...eventsHook,
    participationAnalysis,
  };
};

// Hook for team collaboration metrics
export const useTeamCollaboration = (options = {}) => {
  const {
    limit = 50,
    offset = 0,
    skip: skipOption = false
  } = options;

  const groupsHook = useUserGroups({ limit, offset, skip: skipOption });
  const auditHook = useAuditAnalysis({ skip: skipOption });

  const loading = groupsHook.loading || auditHook.loading;
  const error = groupsHook.error || auditHook.error;

  if (loading || error || skipOption) {
    return { loading, error, collaborationMetrics: null };
  }

  const { userGroups, captainGroups, teamPerformance } = groupsHook;
  const { auditRelationships } = auditHook;

  // Calculate comprehensive collaboration metrics
  const collaborationMetrics = {
    // Team leadership metrics
    leadership: {
      groupsLed: captainGroups.length,
      groupsParticipated: userGroups.length,
      leadershipRatio: userGroups.length > 0 ? (captainGroups.length / userGroups.length) * 100 : 0,
      averageTeamSize: calculateAverageTeamSize(userGroups),
      leadershipEffectiveness: calculateLeadershipEffectiveness(captainGroups),
    },

    // Team performance metrics
    teamwork: {
      averageTeamGrade: calculateAverageTeamGrade(teamPerformance),
      teamSuccessRate: calculateTeamSuccessRate(teamPerformance),
      collaborationScore: calculateCollaborationScore(auditHook),
      teamDiversity: analyzeTeamDiversity(userGroups),
      conflictResolution: analyzeConflictResolution(userGroups),
    },

    // Network analysis
    network: {
      uniqueCollaborators: calculateUniqueCollaborators(userGroups),
      networkDensity: calculateNetworkDensity(userGroups, auditRelationships),
      influenceScore: calculateInfluenceScore(userGroups, auditRelationships),
      collaborationFrequency: analyzeCollaborationFrequency(userGroups),
    },

    // Communication and feedback
    communication: {
      feedbackGiven: auditHook.givenAuditAnalysis.total,
      feedbackReceived: auditHook.receivedAuditAnalysis.total,
      feedbackQuality: calculateFeedbackQuality(auditHook),
      responsiveness: calculateResponsiveness(userGroups),
    },
  };

  return {
    userGroups,
    captainGroups,
    teamPerformance,
    collaborationMetrics,
    loading,
    error,
    refetch: () => {
      groupsHook.refetch();
      auditHook.refetch();
    },
  };
};

// Hook for event performance tracking
export const useEventPerformance = (eventId, options = {}) => {
  const { skip: skipOption = false } = options;

  const objectHook = useObjectDetails(eventId, { skip: skipOption });
  const progressHook = useUserProgress({ skip: skipOption });
  const resultsHook = useUserResults({ skip: skipOption });

  const loading = objectHook.loading || progressHook.loading || resultsHook.loading;
  const error = objectHook.error || progressHook.error || resultsHook.error;

  if (loading || error || skipOption || !eventId) {
    return { loading, error, eventPerformance: null };
  }

  // Filter data for this specific event
  const eventProgress = progressHook.progress.filter(p =>
    p.event?.id === eventId || p.path?.includes(objectHook.objectDetails?.path)
  );

  const eventResults = resultsHook.results.filter(r =>
    r.event?.id === eventId || r.path?.includes(objectHook.objectDetails?.path)
  );

  // Calculate event-specific performance metrics
  const eventPerformance = {
    // Basic metrics
    totalTasks: eventProgress.length,
    completedTasks: eventProgress.filter(p => p.isDone).length,
    averageGrade: eventResults.length > 0 ?
      eventResults.reduce((sum, r) => sum + r.grade, 0) / eventResults.length : 0,

    // Progress tracking
    progressTimeline: analyzeProgressTimeline(eventProgress),
    completionRate: eventProgress.length > 0 ?
      (eventProgress.filter(p => p.isDone).length / eventProgress.length) * 100 : 0,

    // Performance trends
    performanceTrend: analyzePerformanceTrend(eventResults),

    // Time management
    timeManagement: analyzeTimeManagement(eventProgress, eventResults),

    // Difficulty adaptation
    difficultyAdaptation: analyzeDifficultyAdaptation(eventResults),
  };

  return {
    eventPerformance,
    eventProgress,
    eventResults,
    eventDetails: objectHook.objectDetails,
    loading,
    error,
    refetch: () => {
      objectHook.refetch();
      progressHook.refetch();
      resultsHook.refetch();
    },
  };
};

// Hook for registration management and analysis
export const useRegistrationManagement = (options = {}) => {
  const { skip: skipOption = false } = options;

  const eventsHook = useUserEvents({ skip: skipOption });

  if (eventsHook.loading || eventsHook.error || skipOption) {
    return { ...eventsHook, registrationAnalysis: null };
  }

  const { userRegistrations, userEvents } = eventsHook;

  // Analyze registration patterns and efficiency
  const registrationAnalysis = {
    // Registration timing
    registrationTiming: analyzeRegistrationTiming(userRegistrations),

    // Registration success rate
    registrationSuccess: analyzeRegistrationSuccess(userRegistrations, userEvents),

    // Event preferences
    eventPreferences: analyzeEventPreferences(userRegistrations),

    // Registration patterns
    registrationPatterns: analyzeRegistrationPatterns(userRegistrations),

    // Waitlist and capacity analysis
    capacityAnalysis: analyzeCapacityUtilization(userRegistrations),
  };

  return {
    ...eventsHook,
    registrationAnalysis,
  };
};

// ============================================================================
// HELPER FUNCTIONS FOR EVENT AND GROUP ANALYSIS
// ============================================================================

// Analyze event type participation
const analyzeEventTypeParticipation = (userEvents) => {
  const typeStats = userEvents.reduce((acc, userEvent) => {
    const type = userEvent.event?.object?.type || 'unknown';
    if (!acc[type]) {
      acc[type] = { type, count: 0, completed: 0, active: 0 };
    }
    acc[type].count++;
    if (userEvent.event?.status === 'done') acc[type].completed++;
    else acc[type].active++;
    return acc;
  }, {});

  return Object.values(typeStats).map(stat => ({
    ...stat,
    completionRate: stat.count > 0 ? (stat.completed / stat.count) * 100 : 0,
  }));
};

// Analyze event completion rates
const analyzeEventCompletionRates = (userEvents) => {
  const totalEvents = userEvents.length;
  const completedEvents = userEvents.filter(ue => ue.event?.status === 'done').length;
  const activeEvents = userEvents.filter(ue => ue.event?.status !== 'done').length;

  return {
    totalEvents,
    completedEvents,
    activeEvents,
    completionRate: totalEvents > 0 ? (completedEvents / totalEvents) * 100 : 0,
  };
};

// Analyze registration efficiency
const analyzeRegistrationEfficiency = (registrations, events) => {
  const registeredEventIds = new Set(registrations.map(r => r.registration?.object?.id));
  const participatedEventIds = new Set(events.map(e => e.event?.object?.id));

  const registeredButNotParticipated = [...registeredEventIds].filter(id => !participatedEventIds.has(id));
  const participatedWithoutRegistration = [...participatedEventIds].filter(id => !registeredEventIds.has(id));

  return {
    totalRegistrations: registrations.length,
    totalParticipations: events.length,
    registrationToParticipationRate: registrations.length > 0 ?
      (events.length / registrations.length) * 100 : 0,
    registeredButNotParticipated: registeredButNotParticipated.length,
    participatedWithoutRegistration: participatedWithoutRegistration.length,
  };
};

// Analyze event performance
const analyzeEventPerformance = (userEvents) => {
  const performanceData = userEvents.map(userEvent => {
    const event = userEvent.event;
    const duration = event?.endAt ?
      new Date(event.endAt) - new Date(event.createdAt) : null;

    return {
      eventId: event?.id,
      eventType: event?.object?.type,
      duration: duration ? duration / (1000 * 60 * 60 * 24) : null, // Days
      status: event?.status,
      campus: event?.campus,
    };
  });

  const averageDuration = performanceData
    .filter(p => p.duration !== null)
    .reduce((sum, p) => sum + p.duration, 0) /
    performanceData.filter(p => p.duration !== null).length || 0;

  return {
    averageDuration,
    eventsByStatus: performanceData.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {}),
    eventsByCampus: performanceData.reduce((acc, p) => {
      acc[p.campus] = (acc[p.campus] || 0) + 1;
      return acc;
    }, {}),
  };
};

// Analyze participation patterns
const analyzeParticipationPatterns = (userEvents) => {
  const monthlyParticipation = userEvents.reduce((acc, userEvent) => {
    const month = new Date(userEvent.createdAt).toISOString().slice(0, 7); // YYYY-MM
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const yearlyParticipation = userEvents.reduce((acc, userEvent) => {
    const year = new Date(userEvent.createdAt).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  return {
    monthlyParticipation,
    yearlyParticipation,
    participationTrend: calculateParticipationTrend(monthlyParticipation),
  };
};

// Calculate participation trend
const calculateParticipationTrend = (monthlyData) => {
  const months = Object.keys(monthlyData).sort();
  if (months.length < 2) return 'stable';

  const firstHalf = months.slice(0, Math.floor(months.length / 2));
  const secondHalf = months.slice(Math.floor(months.length / 2));

  const firstHalfAvg = firstHalf.reduce((sum, month) => sum + monthlyData[month], 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, month) => sum + monthlyData[month], 0) / secondHalf.length;

  const change = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;

  if (change > 20) return 'increasing';
  if (change < -20) return 'decreasing';
  return 'stable';
};

// Analyze event durations
const analyzeEventDurations = (userEvents) => {
  const durations = userEvents
    .filter(ue => ue.event?.endAt)
    .map(ue => {
      const start = new Date(ue.event.createdAt);
      const end = new Date(ue.event.endAt);
      return (end - start) / (1000 * 60 * 60 * 24); // Days
    });

  if (durations.length === 0) {
    return { averageDuration: 0, shortestEvent: 0, longestEvent: 0 };
  }

  return {
    averageDuration: durations.reduce((sum, d) => sum + d, 0) / durations.length,
    shortestEvent: Math.min(...durations),
    longestEvent: Math.max(...durations),
    durationDistribution: {
      short: durations.filter(d => d <= 7).length, // 1 week or less
      medium: durations.filter(d => d > 7 && d <= 30).length, // 1 week to 1 month
      long: durations.filter(d => d > 30).length, // More than 1 month
    },
  };
};

// Calculate average team size
const calculateAverageTeamSize = (userGroups) => {
  if (userGroups.length === 0) return 0;

  const teamSizes = userGroups.map(ug => ug.group?.members?.length || 0);
  return teamSizes.reduce((sum, size) => sum + size, 0) / teamSizes.length;
};

// Calculate leadership effectiveness
const calculateLeadershipEffectiveness = (captainGroups) => {
  if (captainGroups.length === 0) return 0;

  const effectivenessScores = captainGroups.map(group => {
    let score = 0;

    // Group completion
    if (group.status === 'finished') score += 40;
    else if (group.status === 'working') score += 20;

    // Team size (optimal team size is 3-5 members)
    const teamSize = group.members?.length || 0;
    if (teamSize >= 3 && teamSize <= 5) score += 30;
    else if (teamSize >= 2 && teamSize <= 6) score += 20;
    else score += 10;

    // Member confirmation rate
    const confirmedMembers = group.members?.filter(m => m.confirmed).length || 0;
    const confirmationRate = teamSize > 0 ? (confirmedMembers / teamSize) * 30 : 0;
    score += confirmationRate;

    return Math.min(100, score);
  });

  return effectivenessScores.reduce((sum, score) => sum + score, 0) / effectivenessScores.length;
};

// Calculate average team grade
const calculateAverageTeamGrade = (teamPerformance) => {
  if (teamPerformance.length === 0) return 0;

  const grades = teamPerformance.map(tp => tp.averageGrade).filter(grade => !isNaN(grade));
  return grades.length > 0 ? grades.reduce((sum, grade) => sum + grade, 0) / grades.length : 0;
};

// Calculate team success rate
const calculateTeamSuccessRate = (teamPerformance) => {
  if (teamPerformance.length === 0) return 0;

  const successfulTeams = teamPerformance.filter(tp => tp.isCompleted).length;
  return (successfulTeams / teamPerformance.length) * 100;
};

// Analyze team diversity
const analyzeTeamDiversity = (userGroups) => {
  const diversityMetrics = userGroups.map(ug => {
    const members = ug.group?.members || [];
    const uniqueMembers = new Set(members.map(m => m.user?.id)).size;

    return {
      groupId: ug.group?.id,
      totalMembers: members.length,
      uniqueMembers,
      diversity: members.length > 0 ? (uniqueMembers / members.length) * 100 : 0,
    };
  });

  const averageDiversity = diversityMetrics.length > 0 ?
    diversityMetrics.reduce((sum, dm) => sum + dm.diversity, 0) / diversityMetrics.length : 0;

  return {
    averageDiversity,
    diversityMetrics,
    highDiversityGroups: diversityMetrics.filter(dm => dm.diversity > 80).length,
  };
};

// Analyze conflict resolution (simplified metric)
const analyzeConflictResolution = (userGroups) => {
  // This is a simplified analysis - in a real system you might have more data
  const groupsWithIssues = userGroups.filter(ug => {
    const members = ug.group?.members || [];
    const unconfirmedMembers = members.filter(m => !m.confirmed).length;
    return unconfirmedMembers > 0;
  });

  return {
    totalGroups: userGroups.length,
    groupsWithIssues: groupsWithIssues.length,
    conflictResolutionRate: userGroups.length > 0 ?
      ((userGroups.length - groupsWithIssues.length) / userGroups.length) * 100 : 100,
  };
};

// Calculate unique collaborators
const calculateUniqueCollaborators = (userGroups) => {
  const collaborators = new Set();

  userGroups.forEach(ug => {
    const members = ug.group?.members || [];
    members.forEach(member => {
      if (member.user?.id) {
        collaborators.add(member.user.id);
      }
    });
  });

  return collaborators.size;
};

// Calculate network density
const calculateNetworkDensity = (userGroups, auditRelationships) => {
  const totalCollaborators = calculateUniqueCollaborators(userGroups);
  const auditConnections = auditRelationships.auditorsWorkedWith + auditRelationships.auditeesWorkedWith;

  // Network density is the ratio of actual connections to possible connections
  const possibleConnections = totalCollaborators * (totalCollaborators - 1) / 2;
  const actualConnections = userGroups.length + auditConnections;

  return possibleConnections > 0 ? (actualConnections / possibleConnections) * 100 : 0;
};

// Calculate influence score
const calculateInfluenceScore = (userGroups, auditRelationships) => {
  let score = 0;

  // Leadership influence
  const captainRoles = userGroups.filter(ug => ug.group?.captainId).length;
  score += captainRoles * 10;

  // Audit influence
  score += auditRelationships.auditorsWorkedWith * 2;
  score += auditRelationships.auditeesWorkedWith * 1;

  // Group participation influence
  score += userGroups.length * 3;

  return Math.min(100, score);
};

// Analyze collaboration frequency
const analyzeCollaborationFrequency = (userGroups) => {
  if (userGroups.length === 0) return { frequency: 0, pattern: 'none' };

  const sortedGroups = userGroups.sort((a, b) =>
    new Date(a.createdAt) - new Date(b.createdAt)
  );

  if (sortedGroups.length < 2) return { frequency: 0, pattern: 'single' };

  // Calculate time between collaborations
  const intervals = [];
  for (let i = 1; i < sortedGroups.length; i++) {
    const prev = new Date(sortedGroups[i - 1].createdAt);
    const curr = new Date(sortedGroups[i].createdAt);
    intervals.push((curr - prev) / (1000 * 60 * 60 * 24)); // Days
  }

  const averageInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;

  let pattern = 'irregular';
  if (averageInterval <= 7) pattern = 'frequent';
  else if (averageInterval <= 30) pattern = 'regular';
  else if (averageInterval <= 90) pattern = 'occasional';

  return {
    frequency: 365 / averageInterval, // Collaborations per year
    pattern,
    averageInterval,
  };
};

// Calculate feedback quality
const calculateFeedbackQuality = (auditHook) => {
  const { auditsGiven } = auditHook;

  // Quality based on thoroughness and helpfulness
  let qualityScore = 0;

  // Given feedback quality
  const givenFeedbackScore = auditsGiven.reduce((sum, audit) => {
    let score = 50; // Base score

    // Check if detailed feedback was provided
    if (audit.attrs) {
      try {
        const attrs = typeof audit.attrs === 'string' ? JSON.parse(audit.attrs) : audit.attrs;
        const feedbackEntries = Object.values(attrs).filter(value =>
          typeof value === 'string' && value.length > 20
        );
        score += Math.min(30, feedbackEntries.length * 10);
      } catch {
        // Invalid attrs format
      }
    }

    // Timely completion
    if (audit.createdAt && audit.updatedAt) {
      const timeTaken = new Date(audit.updatedAt) - new Date(audit.createdAt);
      const hours = timeTaken / (1000 * 60 * 60);
      if (hours >= 1 && hours <= 48) score += 20; // Reasonable time frame
    }

    return sum + Math.min(100, score);
  }, 0);

  qualityScore = auditsGiven.length > 0 ? givenFeedbackScore / auditsGiven.length : 0;

  return Math.min(100, qualityScore);
};

// Calculate responsiveness
const calculateResponsiveness = (userGroups) => {
  if (userGroups.length === 0) return 0;

  const responsivenessScores = userGroups.map(ug => {
    const createdAt = new Date(ug.createdAt);
    const confirmedAt = new Date(ug.updatedAt);

    // Time to confirm participation
    const responseTime = (confirmedAt - createdAt) / (1000 * 60 * 60); // Hours

    let score = 100;
    if (responseTime > 24) score -= 20; // Penalty for slow response
    if (responseTime > 72) score -= 30; // Additional penalty

    // Bonus for quick confirmation
    if (responseTime <= 1) score += 10;

    return Math.max(0, Math.min(100, score));
  });

  return responsivenessScores.reduce((sum, score) => sum + score, 0) / responsivenessScores.length;
};

// Analyze progress timeline
const analyzeProgressTimeline = (eventProgress) => {
  const timeline = eventProgress
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((progress, index) => ({
      ...progress,
      sequence: index + 1,
      cumulativeCompletion: eventProgress.slice(0, index + 1).filter(p => p.isDone).length,
    }));

  return timeline;
};

// Analyze performance trend for events
const analyzePerformanceTrend = (eventResults) => {
  if (eventResults.length < 3) return { trend: 'insufficient_data', slope: 0 };

  const sortedResults = eventResults.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // Calculate moving average
  const windowSize = Math.min(3, sortedResults.length);
  const movingAverages = [];

  for (let i = windowSize - 1; i < sortedResults.length; i++) {
    const window = sortedResults.slice(i - windowSize + 1, i + 1);
    const average = window.reduce((sum, result) => sum + result.grade, 0) / window.length;
    movingAverages.push(average);
  }

  if (movingAverages.length < 2) return { trend: 'stable', slope: 0 };

  // Calculate trend slope
  const firstAvg = movingAverages[0];
  const lastAvg = movingAverages[movingAverages.length - 1];
  const slope = lastAvg - firstAvg;

  let trend = 'stable';
  if (slope > 0.1) trend = 'improving';
  else if (slope < -0.1) trend = 'declining';

  return { trend, slope, movingAverages };
};

// Analyze time management
const analyzeTimeManagement = (eventProgress, eventResults) => {
  const timeData = eventProgress.map(progress => {
    const relatedResults = eventResults.filter(result =>
      result.object?.id === progress.object?.id
    );

    const startTime = new Date(progress.createdAt);
    const endTime = progress.isDone ? new Date(progress.updatedAt) : new Date();
    const timeSpent = (endTime - startTime) / (1000 * 60 * 60 * 24); // Days

    return {
      taskId: progress.id,
      timeSpent,
      completed: progress.isDone,
      grade: progress.grade,
      attempts: relatedResults.length,
    };
  });

  const completedTasks = timeData.filter(t => t.completed);
  const averageTimeToComplete = completedTasks.length > 0 ?
    completedTasks.reduce((sum, t) => sum + t.timeSpent, 0) / completedTasks.length : 0;

  return {
    averageTimeToComplete,
    fastestCompletion: completedTasks.length > 0 ?
      Math.min(...completedTasks.map(t => t.timeSpent)) : 0,
    slowestCompletion: completedTasks.length > 0 ?
      Math.max(...completedTasks.map(t => t.timeSpent)) : 0,
    timeEfficiency: calculateTimeEfficiency(timeData),
  };
};

// Calculate time efficiency
const calculateTimeEfficiency = (timeData) => {
  if (timeData.length === 0) return 0;

  const efficiencyScores = timeData.map(task => {
    if (!task.completed) return 0;

    // Efficiency based on grade achieved vs time spent
    const gradeEfficiency = task.grade * 50; // Max 50 points for grade
    const timeEfficiency = Math.max(0, 50 - (task.timeSpent * 2)); // Penalty for long time

    return Math.min(100, gradeEfficiency + timeEfficiency);
  });

  return efficiencyScores.reduce((sum, score) => sum + score, 0) / efficiencyScores.length;
};

// Analyze difficulty adaptation
const analyzeDifficultyAdaptation = (eventResults) => {
  if (eventResults.length < 3) return { adaptation: 'insufficient_data', score: 0 };

  const sortedResults = eventResults.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // Analyze how performance changes with increasing difficulty
  const adaptationScore = sortedResults.reduce((score, result, index) => {
    if (index === 0) return score;

    const prevResult = sortedResults[index - 1];
    const improvement = result.grade - prevResult.grade;

    // Reward maintaining or improving performance
    if (improvement >= 0) score += 10;
    else score -= 5;

    return score;
  }, 50); // Start with base score

  let adaptation = 'stable';
  if (adaptationScore > 70) adaptation = 'excellent';
  else if (adaptationScore > 50) adaptation = 'good';
  else if (adaptationScore < 30) adaptation = 'struggling';

  return { adaptation, score: Math.max(0, Math.min(100, adaptationScore)) };
};

// Additional helper functions for registration analysis
const analyzeRegistrationTiming = (registrations) => {
  const timingData = registrations.map(reg => {
    const regStart = new Date(reg.registration?.startAt);
    const regEnd = new Date(reg.registration?.endAt);
    const userReg = new Date(reg.createdAt);

    const totalWindow = regEnd - regStart;
    const userTiming = userReg - regStart;
    const timingPercentage = totalWindow > 0 ? (userTiming / totalWindow) * 100 : 0;

    return {
      registrationId: reg.id,
      timingPercentage,
      category: timingPercentage < 25 ? 'early' :
                timingPercentage < 75 ? 'middle' : 'late',
    };
  });

  return {
    earlyRegistrations: timingData.filter(t => t.category === 'early').length,
    middleRegistrations: timingData.filter(t => t.category === 'middle').length,
    lateRegistrations: timingData.filter(t => t.category === 'late').length,
    averageTimingPercentage: timingData.length > 0 ?
      timingData.reduce((sum, t) => sum + t.timingPercentage, 0) / timingData.length : 0,
  };
};

const analyzeRegistrationSuccess = (registrations, events) => {
  const registeredEventIds = registrations.map(r => r.registration?.object?.id);
  const participatedEventIds = events.map(e => e.event?.object?.id);

  const successfulRegistrations = registeredEventIds.filter(id =>
    participatedEventIds.includes(id)
  ).length;

  return {
    totalRegistrations: registrations.length,
    successfulRegistrations,
    successRate: registrations.length > 0 ?
      (successfulRegistrations / registrations.length) * 100 : 0,
  };
};

const analyzeEventPreferences = (registrations) => {
  const preferences = registrations.reduce((acc, reg) => {
    const eventType = reg.registration?.object?.type || 'unknown';
    const campus = reg.registration?.campus || 'unknown';

    if (!acc.byType[eventType]) acc.byType[eventType] = 0;
    if (!acc.byCampus[campus]) acc.byCampus[campus] = 0;

    acc.byType[eventType]++;
    acc.byCampus[campus]++;

    return acc;
  }, { byType: {}, byCampus: {} });

  return preferences;
};

const analyzeRegistrationPatterns = (registrations) => {
  const monthlyRegistrations = registrations.reduce((acc, reg) => {
    const month = new Date(reg.createdAt).toISOString().slice(0, 7);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  return {
    monthlyRegistrations,
    peakMonth: Object.entries(monthlyRegistrations).reduce((max, [month, count]) =>
      count > (max[1] || 0) ? [month, count] : max, ['', 0]
    )[0],
  };
};

const analyzeCapacityUtilization = (registrations) => {
  // This is a simplified analysis - real implementation would need capacity data
  return {
    totalRegistrations: registrations.length,
    estimatedCapacityUtilization: Math.min(100, (registrations.length / 50) * 100), // Assuming 50 as average capacity
  };
};

// ============================================================================
// ADVANCED SEARCH AND FILTERING CAPABILITIES
// ============================================================================

// Enhanced hook for advanced search with filtering and pagination
export const useAdvancedSearch = (options = {}) => {
  const { user } = useAuth();
  const {
    searchTerm = '',
    searchType = 'all',
    limit = 20,
    offset = 0,
    filters = {},
    sortBy = 'relevance',
    sortOrder = 'desc'
  } = options;

  const [searchAdvanced, { data, loading, error, fetchMore }] = useLazyQuery(ADVANCED_SEARCH, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const search = (newSearchTerm, newOptions = {}) => {
    const searchOptions = {
      searchTerm: newSearchTerm || searchTerm,
      searchType: newOptions.searchType || searchType,
      limit: newOptions.limit || limit,
      offset: newOptions.offset || offset,
      userId: user?.id,
      ...newOptions,
    };

    if (searchOptions.searchTerm.trim()) {
      searchAdvanced({
        variables: searchOptions,
      });
    }
  };

  // Process and filter results
  const processedResults = data ? processSearchResults(data, filters, sortBy, sortOrder) : {
    users: [],
    objects: [],
    events: [],
    totalResults: 0,
  };

  return {
    search,
    results: processedResults,
    loading,
    error,
    fetchMore,
    hasMore: processedResults.totalResults >= limit,
  };
};

// Hook for filtered user search with advanced criteria
export const useFilteredUserSearch = (options = {}) => {
  const {
    filters = {},
    limit = 50,
    offset = 0
  } = options;

  const [searchUsers, { data, loading, error, fetchMore }] = useLazyQuery(SEARCH_USERS, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const searchWithFilters = (searchTerm) => {
    const searchPattern = `%${searchTerm}%`;

    searchUsers({
      variables: {
        searchTerm: searchPattern,
        limit,
        offset,
      },
    });
  };

  // Apply client-side filtering for complex criteria
  const filteredUsers = data?.user ? applyUserFilters(data.user, filters) : [];

  return {
    searchUsers: searchWithFilters,
    users: filteredUsers,
    loading,
    error,
    fetchMore,
    hasMore: filteredUsers.length >= limit,
  };
};

// Hook for paginated data with sorting and filtering
export const usePaginatedData = (query, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const {
    variables = {},
    limit = 50,
    offset = 0,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    filters = {},
    skip: skipOption = false
  } = options;

  const { data, loading, error, fetchMore, refetch } = useQuery(query, {
    variables: {
      userId: user?.id,
      limit,
      offset,
      ...variables,
    },
    skip: !isAuthenticated || !user?.id || skipOption,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  // Apply sorting and filtering
  const processedData = data ? applySortingAndFiltering(data, sortBy, sortOrder, filters) : null;

  const loadMore = () => {
    if (fetchMore && processedData) {
      fetchMore({
        variables: {
          offset: offset + limit,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return mergeQueryResults(prev, fetchMoreResult);
        },
      });
    }
  };

  return {
    data: processedData,
    loading,
    error,
    loadMore,
    refetch,
    hasMore: processedData ? Object.values(processedData).some(arr =>
      Array.isArray(arr) && arr.length >= limit
    ) : false,
  };
};

// Hook for complex query combinations - DISABLED due to React Hooks violations
export const useComplexQuery = () => {
  // Note: This implementation violates React Hooks rules
  // TODO: Refactor to use individual hooks or a different approach
  const queryResults = [];

  const loading = queryResults.some(result => result.loading);
  const error = queryResults.find(result => result.error)?.error;

  // Combine results based on strategy
  const combinedData = null;

  return {
    data: combinedData,
    loading,
    error,
    refetch: () => queryResults.forEach(result => result.refetch()),
    individualResults: queryResults,
  };
};

// Hook for real-time search with debouncing
export const useRealtimeSearch = (options = {}) => {
  const {
    debounceMs = 300,
    minSearchLength = 2,
    searchType = 'all',
    limit = 10
  } = options;

  const [searchTerm, setSearchTerm] = React.useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState('');
  const searchHook = useAdvancedSearch({
    searchTerm: debouncedSearchTerm,
    searchType,
    limit,
    skip: debouncedSearchTerm.length < minSearchLength
  });

  // Debounce search term
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  // Trigger search when debounced term changes
  React.useEffect(() => {
    if (debouncedSearchTerm.length >= minSearchLength) {
      searchHook.search(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, minSearchLength, searchHook]);

  return {
    searchTerm,
    setSearchTerm,
    results: searchHook.results,
    loading: searchHook.loading,
    error: searchHook.error,
    isSearching: searchTerm !== debouncedSearchTerm,
  };
};

// ============================================================================
// HELPER FUNCTIONS FOR SEARCH AND FILTERING
// ============================================================================

// Process search results with filtering and sorting
const processSearchResults = (data, filters, sortBy, sortOrder) => {
  const results = {
    users: data.users || [],
    objects: data.objects || [],
    events: data.events || [],
    totalResults: 0,
  };

  // Apply filters
  if (filters.campus) {
    results.users = results.users.filter(user => user.campus === filters.campus);
    results.objects = results.objects.filter(obj => obj.campus === filters.campus);
    results.events = results.events.filter(event => event.campus === filters.campus);
  }

  if (filters.type) {
    results.objects = results.objects.filter(obj => obj.type === filters.type);
  }

  if (filters.minXP) {
    results.users = results.users.filter(user =>
      user.totalXP?.aggregate?.sum?.amount >= filters.minXP
    );
  }

  // Apply sorting
  const sortFunction = getSortFunction(sortBy, sortOrder);
  results.users.sort(sortFunction);
  results.objects.sort(sortFunction);
  results.events.sort(sortFunction);

  results.totalResults = results.users.length + results.objects.length + results.events.length;

  return results;
};

// Apply user-specific filters
const applyUserFilters = (users, filters) => {
  let filteredUsers = [...users];

  if (filters.campus) {
    filteredUsers = filteredUsers.filter(user => user.campus === filters.campus);
  }

  if (filters.minXP) {
    filteredUsers = filteredUsers.filter(user =>
      user.totalXP?.aggregate?.sum?.amount >= filters.minXP
    );
  }

  if (filters.hasProjects) {
    filteredUsers = filteredUsers.filter(user =>
      user.projectsCompleted?.aggregate?.count > 0
    );
  }

  if (filters.activeAuditor) {
    filteredUsers = filteredUsers.filter(user =>
      user.auditsGiven?.aggregate?.count > 0
    );
  }

  return filteredUsers;
};

// Apply sorting and filtering to query data
const applySortingAndFiltering = (data, sortBy, sortOrder, filters) => {
  const processedData = {};

  Object.keys(data).forEach(key => {
    if (Array.isArray(data[key])) {
      let items = [...data[key]];

      // Apply filters
      items = applyGenericFilters(items, filters);

      // Apply sorting
      const sortFunction = getSortFunction(sortBy, sortOrder);
      items.sort(sortFunction);

      processedData[key] = items;
    } else {
      processedData[key] = data[key];
    }
  });

  return processedData;
};

// Apply generic filters to any array of items
const applyGenericFilters = (items, filters) => {
  let filteredItems = [...items];

  if (filters.dateFrom) {
    filteredItems = filteredItems.filter(item =>
      new Date(item.createdAt || item.updatedAt) >= new Date(filters.dateFrom)
    );
  }

  if (filters.dateTo) {
    filteredItems = filteredItems.filter(item =>
      new Date(item.createdAt || item.updatedAt) <= new Date(filters.dateTo)
    );
  }

  if (filters.minGrade !== undefined) {
    filteredItems = filteredItems.filter(item =>
      (item.grade || 0) >= filters.minGrade
    );
  }

  if (filters.maxGrade !== undefined) {
    filteredItems = filteredItems.filter(item =>
      (item.grade || 0) <= filters.maxGrade
    );
  }

  if (filters.status) {
    filteredItems = filteredItems.filter(item =>
      item.status === filters.status
    );
  }

  if (filters.type) {
    filteredItems = filteredItems.filter(item =>
      item.type === filters.type || item.object?.type === filters.type
    );
  }

  return filteredItems;
};

// Get sort function based on criteria
const getSortFunction = (sortBy, sortOrder) => {
  const direction = sortOrder === 'asc' ? 1 : -1;

  return (a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'name':
        aValue = a.name || a.login || '';
        bValue = b.name || b.login || '';
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt || 0);
        bValue = new Date(b.createdAt || 0);
        break;
      case 'updatedAt':
        aValue = new Date(a.updatedAt || 0);
        bValue = new Date(b.updatedAt || 0);
        break;
      case 'grade':
        aValue = a.grade || 0;
        bValue = b.grade || 0;
        break;
      case 'xp':
        aValue = a.totalXP?.aggregate?.sum?.amount || 0;
        bValue = b.totalXP?.aggregate?.sum?.amount || 0;
        break;
      case 'relevance':
      default:
        // For relevance, we could implement a scoring system
        aValue = calculateRelevanceScore(a);
        bValue = calculateRelevanceScore(b);
        break;
    }

    if (aValue < bValue) return -1 * direction;
    if (aValue > bValue) return 1 * direction;
    return 0;
  };
};

// Calculate relevance score for search results
const calculateRelevanceScore = (item) => {
  let score = 0;

  // Boost score based on item type
  if (item.login) score += 10; // User
  if (item.type === 'project') score += 8;
  if (item.type === 'exercise') score += 6;
  if (item.path) score += 5; // Event

  // Boost based on activity
  if (item.totalXP?.aggregate?.sum?.amount) {
    score += Math.min(20, item.totalXP.aggregate.sum.amount / 1000);
  }

  if (item.updatedAt) {
    const daysSinceUpdate = (new Date() - new Date(item.updatedAt)) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 10 - daysSinceUpdate / 30); // Recent activity boost
  }

  return score;
};

// Merge query results for pagination
const mergeQueryResults = (prev, fetchMoreResult) => {
  const merged = { ...prev };

  Object.keys(fetchMoreResult).forEach(key => {
    if (Array.isArray(fetchMoreResult[key]) && Array.isArray(prev[key])) {
      merged[key] = [...prev[key], ...fetchMoreResult[key]];
    } else {
      merged[key] = fetchMoreResult[key];
    }
  });

  return merged;
};

// Combine multiple query results
const _combineQueryResults = (results, strategy) => {
  if (strategy === 'merge') {
    return results.reduce((combined, result) => {
      if (!result) return combined;

      Object.keys(result).forEach(key => {
        if (Array.isArray(result[key])) {
          if (!combined[key]) combined[key] = [];
          combined[key] = [...combined[key], ...result[key]];
        } else if (typeof result[key] === 'object' && result[key] !== null) {
          if (!combined[key]) combined[key] = {};
          combined[key] = { ...combined[key], ...result[key] };
        } else {
          combined[key] = result[key];
        }
      });

      return combined;
    }, {});
  }

  // Other strategies can be implemented here
  return results;
};

// ============================================================================
// PERFORMANCE OPTIMIZATION AND CACHING
// ============================================================================

// Hook for performance monitoring and optimization
export const useQueryPerformance = () => {
  const [performanceData, setPerformanceData] = React.useState({
    queryCount: 0,
    averageTime: 0,
    slowQueries: 0,
    cacheHitRate: 0,
  });

  const [queryTimes, setQueryTimes] = React.useState([]);

  // Track query performance
  const trackQuery = React.useCallback((queryName, startTime, endTime, fromCache = false) => {
    const duration = endTime - startTime;

    setQueryTimes(prev => {
      const newTimes = [...prev, { queryName, duration, fromCache, timestamp: Date.now() }];
      // Keep only last 50 queries
      return newTimes.slice(-50);
    });

    setPerformanceData(prev => {
      const totalQueries = prev.queryCount + 1;
      const newAverageTime = ((prev.averageTime * prev.queryCount) + duration) / totalQueries;
      const slowQueries = duration > 1000 ? prev.slowQueries + 1 : prev.slowQueries;
      const cacheHits = fromCache ? (prev.cacheHitRate * prev.queryCount + 1) : (prev.cacheHitRate * prev.queryCount);

      return {
        queryCount: totalQueries,
        averageTime: newAverageTime,
        slowQueries,
        cacheHitRate: (cacheHits / totalQueries) * 100,
      };
    });
  }, []);

  // Get performance insights
  const getPerformanceInsights = React.useCallback(() => {
    const recentQueries = queryTimes.slice(-20);
    const slowQueryThreshold = 1000; // 1 second

    const insights = {
      recentAverageTime: recentQueries.length > 0 ?
        recentQueries.reduce((sum, q) => sum + q.duration, 0) / recentQueries.length : 0,
      slowQueriesRecent: recentQueries.filter(q => q.duration > slowQueryThreshold).length,
      mostCommonSlowQuery: getMostCommonSlowQuery(recentQueries, slowQueryThreshold),
      cacheEfficiency: recentQueries.length > 0 ?
        (recentQueries.filter(q => q.fromCache).length / recentQueries.length) * 100 : 0,
    };

    return insights;
  }, [queryTimes]);

  return {
    performanceData,
    queryTimes,
    trackQuery,
    getPerformanceInsights,
  };
};

// Hook for optimized data fetching with caching strategies
export const useOptimizedQuery = (query, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const { trackQuery } = useQueryPerformance();

  const {
    variables = {},
    fetchPolicy = 'cache-first',
    errorPolicy = 'all',
    notifyOnNetworkStatusChange = true,
    skip: skipOption = false,
    cacheTimeout = 5 * 60 * 1000, // 5 minutes
  } = options;

  const [lastFetch, setLastFetch] = React.useState(null);
  const [isStale, setIsStale] = React.useState(false);

  // Enhanced query with performance tracking
  const queryResult = useQuery(query, {
    variables: {
      userId: user?.id,
      ...variables,
    },
    skip: !isAuthenticated || !user?.id || skipOption,
    fetchPolicy,
    errorPolicy,
    notifyOnNetworkStatusChange,
    onCompleted: () => {
      const endTime = performance.now();
      if (queryResult.networkStatus) {
        trackQuery(
          query.definitions[0]?.name?.value || 'unknown',
          queryResult.networkStatus === 1 ? endTime - 100 : endTime - 50, // Rough estimate
          endTime,
          queryResult.networkStatus === 7 // From cache
        );
      }
      setLastFetch(Date.now());
      setIsStale(false);
    },
    onError: (error) => {
      console.error('GraphQL Query Error:', error);
    },
  });

  // Check if data is stale
  React.useEffect(() => {
    if (lastFetch && cacheTimeout > 0) {
      const timer = setTimeout(() => {
        setIsStale(true);
      }, cacheTimeout);

      return () => clearTimeout(timer);
    }
  }, [lastFetch, cacheTimeout]);

  // Optimized refetch with debouncing
  const optimizedRefetch = React.useCallback((newVariables) => {
    const debouncedRefetch = debounce((vars) => {
      queryResult.refetch(vars);
    }, 300);
    debouncedRefetch(newVariables);
  }, [queryResult]);

  return {
    ...queryResult,
    isStale,
    lastFetch,
    optimizedRefetch,
  };
};

// Hook for batch loading multiple queries
export const useBatchQueries = (queries, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const { skip: skipOption = false } = options;

  const [batchedResults, setBatchedResults] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const executeBatch = React.useCallback(async () => {
    if (!isAuthenticated || !user?.id || skipOption) return;

      setLoading(true);
      const results = {};
      const batchErrors = {};

      // Execute queries in parallel
      const promises = queries.map(async ({ key, query, variables = {} }) => {
        try {
          const result = await query({
            variables: {
              userId: user.id,
              ...variables,
            },
          });
          results[key] = result;
        } catch (error) {
          batchErrors[key] = error;
        }
      });

      await Promise.all(promises);

      setBatchedResults(results);
      setErrors(batchErrors);
      setLoading(false);
  }, [queries, user?.id, isAuthenticated, skipOption]);

  React.useEffect(() => {
    executeBatch();
  }, [executeBatch]);

  return {
    results: batchedResults,
    loading,
    errors,
    refetch: executeBatch,
  };
};

// Helper function to get most common slow query
const getMostCommonSlowQuery = (queries, threshold) => {
  const slowQueries = queries.filter(q => q.duration > threshold);
  if (slowQueries.length === 0) return null;

  const queryCount = slowQueries.reduce((acc, query) => {
    acc[query.queryName] = (acc[query.queryName] || 0) + 1;
    return acc;
  }, {});

  const mostCommon = Object.entries(queryCount).reduce((max, [name, count]) =>
    count > max.count ? { name, count } : max, { name: null, count: 0 });

  return mostCommon.name;
};

// Debounce utility function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// ============================================================================
// ADDITIONAL USEFUL FEATURES
// ============================================================================

// Hook for user comparison tools
export const useUserComparison = (userIds = [], options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const {
    skip: skipOption = false
  } = options;

  const { data, loading, error, refetch } = useQuery(COMPARE_USERS, {
    variables: {
      userIds: userIds.length > 0 ? userIds : [user?.id],
    },
    skip: !isAuthenticated || !user?.id || skipOption || userIds.length === 0,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const users = data?.users || [];

  // Generate comparison metrics
  const comparisonMetrics = users.length > 1 ? generateComparisonMetrics(users) : null;

  // Generate insights and recommendations
  const insights = users.length > 1 ? generateComparisonInsights(users, user?.id) : [];

  return {
    users,
    comparisonMetrics,
    insights,
    loading,
    error,
    refetch,
  };
};

// Hook for comprehensive leaderboards
export const useLeaderboards = (options = {}) => {
  const {
    campus = null,
    _objectType = null,
    limit = 50,
    skip: skipOption = false
  } = options;

  const leaderboardHook = useXPLeaderboard({ limit, campus, skip: skipOption });

  if (leaderboardHook.loading || leaderboardHook.error || skipOption) {
    return { ...leaderboardHook, enhancedLeaderboards: null };
  }

  // Create enhanced leaderboards with additional metrics
  const enhancedLeaderboards = {
    xp: enhanceLeaderboard(leaderboardHook.xpLeaderboard, 'xp'),
    projects: enhanceLeaderboard(leaderboardHook.projectLeaderboard, 'projects'),
    audits: enhanceLeaderboard(leaderboardHook.auditLeaderboard, 'audits'),

    // Combined leaderboard
    combined: createCombinedLeaderboard([
      leaderboardHook.xpLeaderboard,
      leaderboardHook.projectLeaderboard,
      leaderboardHook.auditLeaderboard,
    ]),
  };

  return {
    ...leaderboardHook,
    enhancedLeaderboards,
  };
};

// Hook for achievement tracking
export const useAchievements = (options = {}) => {
  const { user } = useAuth();
  const { skip: skipOption = false } = options;

  // Use existing hooks to gather achievement data
  const xpHook = useXPStatistics({ skip: skipOption });
  const projectHook = useProjectStatistics({ skip: skipOption });
  const auditHook = useAuditAnalysis({ skip: skipOption });
  const progressHook = useUserProgress({ skip: skipOption });
  const groupsHook = useUserGroups({ skip: skipOption });

  const loading = xpHook.loading || projectHook.loading || auditHook.loading ||
                  progressHook.loading || groupsHook.loading;

  const error = xpHook.error || projectHook.error || auditHook.error ||
                progressHook.error || groupsHook.error;

  if (loading || error || skipOption) {
    return { loading, error, achievements: [] };
  }

  // Calculate achievements
  const achievements = calculateAchievements({
    xp: xpHook,
    projects: projectHook,
    audits: auditHook,
    progress: progressHook,
    groups: groupsHook,
    user,
  });

  // Sort achievements by rarity and completion
  const sortedAchievements = achievements.sort((a, b) => {
    if (a.completed !== b.completed) return b.completed - a.completed;
    return a.rarity - b.rarity;
  });

  // Calculate achievement statistics
  const achievementStats = {
    total: achievements.length,
    completed: achievements.filter(a => a.completed).length,
    inProgress: achievements.filter(a => a.progress > 0 && !a.completed).length,
    completionRate: achievements.length > 0 ?
      (achievements.filter(a => a.completed).length / achievements.length) * 100 : 0,
  };

  return {
    achievements: sortedAchievements,
    achievementStats,
    loading,
    error,
    refetch: () => {
      xpHook.refetch();
      projectHook.refetch();
      auditHook.refetch();
      progressHook.refetch();
      groupsHook.refetch();
    },
  };
};

// Hook for skill recommendations
export const useSkillRecommendations = (options = {}) => {
  const { user } = useAuth();
  const { skip: skipOption = false } = options;

  const skillsHook = useSkillProficiency({ skip: skipOption });
  const progressHook = useUserProgress({ skip: skipOption });
  const xpHook = useXPStatistics({ skip: skipOption });

  const loading = skillsHook.loading || progressHook.loading || xpHook.loading;
  const error = skillsHook.error || progressHook.error || xpHook.error;

  if (loading || error || skipOption) {
    return { loading, error, recommendations: [] };
  }

  // Generate skill recommendations
  const recommendations = generateSkillRecommendations({
    skills: skillsHook.skillProficiency,
    progress: progressHook.progress,
    xp: xpHook.xpByProject,
    user,
  });

  // Categorize recommendations
  const categorizedRecommendations = {
    immediate: recommendations.filter(r => r.priority === 'high'),
    shortTerm: recommendations.filter(r => r.priority === 'medium'),
    longTerm: recommendations.filter(r => r.priority === 'low'),
    all: recommendations,
  };

  return {
    recommendations: categorizedRecommendations,
    loading,
    error,
    refetch: () => {
      skillsHook.refetch();
      progressHook.refetch();
      xpHook.refetch();
    },
  };
};

// Hook for data export capabilities
export const useDataExport = () => {
  const { user, isAuthenticated } = useAuth();

  const exportUserData = React.useCallback(async (format = 'json', options = {}) => {
    if (!isAuthenticated || !user?.id) {
      throw new Error('User not authenticated');
    }

    const {
      includeTransactions = true,
      includeProgress = true,
      includeResults = true,
      includeAudits = true,
      includeGroups = true,
      dateRange = null,
    } = options;

    // Gather all user data
    const exportData = {
      user: {
        id: user.id,
        login: user.login,
        exportDate: new Date().toISOString(),
        dateRange,
      },
      data: {},
    };

    // Add data based on options
    if (includeTransactions) {
      // This would need to be implemented with actual data fetching
      exportData.data.transactions = [];
    }

    if (includeProgress) {
      exportData.data.progress = [];
    }

    if (includeResults) {
      exportData.data.results = [];
    }

    if (includeAudits) {
      exportData.data.audits = [];
    }

    if (includeGroups) {
      exportData.data.groups = [];
    }

    // Format data based on requested format
    return formatExportData(exportData, format);
  }, [user, isAuthenticated]);

  const exportToFile = React.useCallback((data, filename, format = 'json') => {
    const blob = new Blob([data], {
      type: format === 'json' ? 'application/json' : 'text/csv'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return {
    exportUserData,
    exportToFile,
  };
};

// ============================================================================
// HELPER FUNCTIONS FOR ADDITIONAL FEATURES
// ============================================================================

// Generate comparison metrics between users
const generateComparisonMetrics = (users) => {
  const metrics = {
    xp: {
      values: users.map(u => u.totalXP?.aggregate?.sum?.amount || 0),
      leader: null,
      average: 0,
      spread: 0,
    },
    projects: {
      values: users.map(u => u.projectStats?.aggregate?.count || 0),
      leader: null,
      average: 0,
      spread: 0,
    },
    audits: {
      values: users.map(u => u.auditsGiven?.aggregate?.count || 0),
      leader: null,
      average: 0,
      spread: 0,
    },
  };

  // Calculate statistics for each metric
  Object.keys(metrics).forEach(key => {
    const values = metrics[key].values;
    const maxValue = Math.max(...values);
    const maxIndex = values.indexOf(maxValue);

    metrics[key].leader = users[maxIndex];
    metrics[key].average = values.reduce((sum, val) => sum + val, 0) / values.length;
    metrics[key].spread = maxValue - Math.min(...values);
  });

  return metrics;
};

// Generate comparison insights
const generateComparisonInsights = (users, currentUserId) => {
  const insights = [];
  const currentUser = users.find(u => u.id === currentUserId);

  if (!currentUser) return insights;

  const otherUsers = users.filter(u => u.id !== currentUserId);

  // XP comparison insights
  const currentXP = currentUser.totalXP?.aggregate?.sum?.amount || 0;
  const avgOtherXP = otherUsers.reduce((sum, u) => sum + (u.totalXP?.aggregate?.sum?.amount || 0), 0) / otherUsers.length;

  if (currentXP > avgOtherXP * 1.2) {
    insights.push({
      type: 'strength',
      category: 'xp',
      message: 'You have significantly more XP than your peers',
      impact: 'high',
    });
  } else if (currentXP < avgOtherXP * 0.8) {
    insights.push({
      type: 'improvement',
      category: 'xp',
      message: 'Focus on gaining more XP to catch up with your peers',
      impact: 'high',
    });
  }

  // Project completion insights
  const currentProjects = currentUser.projectStats?.aggregate?.count || 0;
  const avgOtherProjects = otherUsers.reduce((sum, u) => sum + (u.projectStats?.aggregate?.count || 0), 0) / otherUsers.length;

  if (currentProjects > avgOtherProjects * 1.15) {
    insights.push({
      type: 'strength',
      category: 'projects',
      message: 'You have completed more projects than most of your peers',
      impact: 'medium',
    });
  }

  // Audit participation insights
  const currentAudits = currentUser.auditsGiven?.aggregate?.count || 0;
  const avgOtherAudits = otherUsers.reduce((sum, u) => sum + (u.auditsGiven?.aggregate?.count || 0), 0) / otherUsers.length;

  if (currentAudits < avgOtherAudits * 0.7) {
    insights.push({
      type: 'improvement',
      category: 'audits',
      message: 'Consider participating more in peer audits',
      impact: 'medium',
    });
  }

  return insights;
};

// Enhance leaderboard with additional metrics
const enhanceLeaderboard = (leaderboard, type) => {
  return leaderboard.map((user, index) => ({
    ...user,
    rank: index + 1,
    percentile: ((leaderboard.length - index) / leaderboard.length) * 100,
    badge: getBadgeForRank(index + 1, leaderboard.length),
    trend: calculateUserTrend(user, type),
  }));
};

// Create combined leaderboard
const createCombinedLeaderboard = (leaderboards) => {
  const userScores = new Map();

  // Calculate combined scores
  leaderboards.forEach((leaderboard, _boardIndex) => {
    leaderboard.forEach((user, userIndex) => {
      const score = Math.max(0, 100 - userIndex); // Higher rank = higher score
      const currentScore = userScores.get(user.id) || { user, totalScore: 0, boards: 0 };

      currentScore.totalScore += score;
      currentScore.boards += 1;
      userScores.set(user.id, currentScore);
    });
  });

  // Convert to array and sort by average score
  const combinedLeaderboard = Array.from(userScores.values())
    .map(entry => ({
      ...entry.user,
      combinedScore: entry.totalScore / entry.boards,
      boardsParticipated: entry.boards,
    }))
    .sort((a, b) => b.combinedScore - a.combinedScore);

  return enhanceLeaderboard(combinedLeaderboard, 'combined');
};

// Get badge for rank
const getBadgeForRank = (rank, total) => {
  const percentile = (rank / total) * 100;

  if (percentile <= 1) return { name: 'Champion', color: 'gold', icon: '👑' };
  if (percentile <= 5) return { name: 'Elite', color: 'silver', icon: '🏆' };
  if (percentile <= 10) return { name: 'Expert', color: 'bronze', icon: '🥉' };
  if (percentile <= 25) return { name: 'Advanced', color: 'blue', icon: '⭐' };
  if (percentile <= 50) return { name: 'Intermediate', color: 'green', icon: '📈' };
  return { name: 'Beginner', color: 'gray', icon: '🌱' };
};

// Calculate user trend (simplified)
const calculateUserTrend = (_user, _type) => {
  // This would need historical data to calculate properly
  // For now, return a placeholder
  return Math.random() > 0.5 ? 'up' : 'down';
};

// Calculate achievements based on user data
const calculateAchievements = ({ xp, projects, audits, _progress, groups, _user }) => {
  const achievements = [];

  // XP-based achievements
  const totalXP = xp.totalXP || 0;
  achievements.push({
    id: 'xp_1000',
    name: 'First Steps',
    description: 'Earn your first 1,000 XP',
    category: 'xp',
    threshold: 1000,
    current: totalXP,
    completed: totalXP >= 1000,
    progress: Math.min(100, (totalXP / 1000) * 100),
    rarity: 90, // 90% of users have this
    icon: '🌟',
  });

  achievements.push({
    id: 'xp_10000',
    name: 'Rising Star',
    description: 'Earn 10,000 XP',
    category: 'xp',
    threshold: 10000,
    current: totalXP,
    completed: totalXP >= 10000,
    progress: Math.min(100, (totalXP / 10000) * 100),
    rarity: 60,
    icon: '⭐',
  });

  achievements.push({
    id: 'xp_50000',
    name: 'XP Master',
    description: 'Earn 50,000 XP',
    category: 'xp',
    threshold: 50000,
    current: totalXP,
    completed: totalXP >= 50000,
    progress: Math.min(100, (totalXP / 50000) * 100),
    rarity: 20,
    icon: '🏆',
  });

  // Project-based achievements
  const completedProjects = projects.passedProjects || 0;
  achievements.push({
    id: 'projects_5',
    name: 'Project Starter',
    description: 'Complete 5 projects',
    category: 'projects',
    threshold: 5,
    current: completedProjects,
    completed: completedProjects >= 5,
    progress: Math.min(100, (completedProjects / 5) * 100),
    rarity: 80,
    icon: '📁',
  });

  achievements.push({
    id: 'projects_25',
    name: 'Project Veteran',
    description: 'Complete 25 projects',
    category: 'projects',
    threshold: 25,
    current: completedProjects,
    completed: completedProjects >= 25,
    progress: Math.min(100, (completedProjects / 25) * 100),
    rarity: 30,
    icon: '🎯',
  });

  // Audit-based achievements
  const auditsGiven = audits.givenAuditAnalysis?.total || 0;
  achievements.push({
    id: 'audits_10',
    name: 'Helpful Peer',
    description: 'Complete 10 audits',
    category: 'audits',
    threshold: 10,
    current: auditsGiven,
    completed: auditsGiven >= 10,
    progress: Math.min(100, (auditsGiven / 10) * 100),
    rarity: 70,
    icon: '🤝',
  });

  // Streak-based achievements
  const learningStreak = xp.performanceMetrics?.learningStreak || 0;
  achievements.push({
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    category: 'consistency',
    threshold: 7,
    current: learningStreak,
    completed: learningStreak >= 7,
    progress: Math.min(100, (learningStreak / 7) * 100),
    rarity: 50,
    icon: '🔥',
  });

  // Leadership achievements
  const groupsLed = groups.captainGroups?.length || 0;
  achievements.push({
    id: 'leadership_3',
    name: 'Team Leader',
    description: 'Lead 3 project groups',
    category: 'leadership',
    threshold: 3,
    current: groupsLed,
    completed: groupsLed >= 3,
    progress: Math.min(100, (groupsLed / 3) * 100),
    rarity: 25,
    icon: '👨‍💼',
  });

  return achievements;
};

// Generate skill recommendations
const generateSkillRecommendations = ({ skills, progress, _xp }) => {
  const recommendations = [];

  // Analyze skill gaps
  const skillGaps = skills.filter(skill => skill.proficiencyScore < 50);

  skillGaps.forEach(skill => {
    recommendations.push({
      id: `improve_${skill.name}`,
      type: 'skill_improvement',
      skill: skill.name,
      priority: skill.proficiencyScore < 30 ? 'high' : 'medium',
      title: `Improve ${skill.name} Skills`,
      description: `Your ${skill.name} proficiency is below average. Consider focusing on related projects.`,
      suggestedActions: [
        `Complete more ${skill.name} exercises`,
        `Review ${skill.name} documentation`,
        `Practice ${skill.name} concepts`,
      ],
      estimatedTime: '2-4 weeks',
      difficulty: 'medium',
    });
  });

  // Recommend advanced skills for proficient areas
  const strongSkills = skills.filter(skill => skill.proficiencyScore > 70);

  strongSkills.forEach(skill => {
    recommendations.push({
      id: `advance_${skill.name}`,
      type: 'skill_advancement',
      skill: skill.name,
      priority: 'low',
      title: `Advanced ${skill.name} Challenges`,
      description: `You're proficient in ${skill.name}. Consider taking on advanced challenges.`,
      suggestedActions: [
        `Attempt advanced ${skill.name} projects`,
        `Mentor others in ${skill.name}`,
        `Explore ${skill.name} best practices`,
      ],
      estimatedTime: '1-2 weeks',
      difficulty: 'hard',
    });
  });

  // Recommend new skills based on progress patterns
  const recentProgress = progress
    .filter(p => p.isDone)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 10);

  const recentSkillTypes = [...new Set(recentProgress.map(p => p.object?.type))];

  if (recentSkillTypes.length > 0) {
    recommendations.push({
      id: 'explore_new_skills',
      type: 'skill_exploration',
      skill: 'general',
      priority: 'medium',
      title: 'Explore New Technologies',
      description: 'Based on your recent activity, you might enjoy exploring related technologies.',
      suggestedActions: [
        'Try projects in complementary technologies',
        'Explore advanced concepts in your current focus areas',
        'Consider cross-disciplinary projects',
      ],
      estimatedTime: '3-6 weeks',
      difficulty: 'medium',
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

// Format export data
const formatExportData = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.stringify(data, null, 2);

    case 'csv':
      return convertToCSV(data);

    case 'xml':
      return convertToXML(data);

    default:
      return JSON.stringify(data, null, 2);
  }
};

// Convert data to CSV format
const convertToCSV = (data) => {
  const csvRows = [];

  // Add header
  csvRows.push('Type,Date,Value,Description');

  // Add data rows (simplified example)
  Object.entries(data.data).forEach(([type, items]) => {
    if (Array.isArray(items)) {
      items.forEach(item => {
        csvRows.push([
          type,
          item.createdAt || item.updatedAt || '',
          item.amount || item.grade || '',
          item.path || item.name || ''
        ].join(','));
      });
    }
  });

  return csvRows.join('\n');
};

// Convert data to XML format
const convertToXML = (data) => {
  const xmlParts = ['<?xml version="1.0" encoding="UTF-8"?>'];
  xmlParts.push('<export>');

  // Add user info
  xmlParts.push(`<user id="${data.user.id}" login="${data.user.login}">`);
  xmlParts.push(`<exportDate>${data.user.exportDate}</exportDate>`);
  xmlParts.push('</user>');

  // Add data sections
  xmlParts.push('<data>');
  Object.entries(data.data).forEach(([type, items]) => {
    xmlParts.push(`<${type}>`);
    if (Array.isArray(items)) {
      items.forEach((item, index) => {
        xmlParts.push(`<item id="${index}">`);
        Object.entries(item).forEach(([key, value]) => {
          xmlParts.push(`<${key}>${value}</${key}>`);
        });
        xmlParts.push('</item>');
      });
    }
    xmlParts.push(`</${type}>`);
  });
  xmlParts.push('</data>');

  xmlParts.push('</export>');
  return xmlParts.join('\n');
};

// ============================================================================
// COMPREHENSIVE ERROR HANDLING AND VALIDATION
// ============================================================================

// Hook for comprehensive error handling
export const useErrorHandler = () => {
  const [errorHistory, setErrorHistory] = React.useState([]);
  const [globalError, setGlobalError] = React.useState(null);

  // Process and handle errors
  const handleError = React.useCallback((error, context = {}) => {
    const processedError = processGraphQLError(error);

    // Add to error history
    setErrorHistory(prev => {
      const newHistory = [
        {
          ...processedError,
          context,
          id: Date.now() + Math.random(),
        },
        ...prev.slice(0, 49) // Keep last 50 errors
      ];
      return newHistory;
    });

    // Set global error for critical issues
    if (processedError.severity === 'critical' || processedError.severity === 'high') {
      setGlobalError(processedError);
    }

    // Log error
    logError(error, context);

    return processedError;
  }, []);

  // Clear global error
  const clearGlobalError = React.useCallback(() => {
    setGlobalError(null);
  }, []);

  // Get error statistics
  const getErrorStats = React.useCallback(() => {
    const stats = {
      total: errorHistory.length,
      byType: {},
      bySeverity: {},
      recent: errorHistory.slice(0, 10),
    };

    errorHistory.forEach(error => {
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;
    });

    return stats;
  }, [errorHistory]);

  return {
    handleError,
    clearGlobalError,
    getErrorStats,
    errorHistory,
    globalError,
  };
};

// Enhanced hook with error handling and validation
export const useValidatedQuery = (query, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const { handleError } = useErrorHandler();

  const {
    variables = {},
    validationSchema = null,
    fallbackData = null,
    retryConfig = null,
    skip: skipOption = false,
    ...queryOptions
  } = options;

  // Validate variables before query
  const validationErrors = validationSchema ?
    validateQueryVariables(variables, validationSchema) : [];

  const shouldSkip = !isAuthenticated || !user?.id || skipOption || validationErrors.length > 0;

  // Enhanced query with error handling
  const queryResult = useQuery(query, {
    variables: {
      userId: user?.id,
      ...variables,
    },
    skip: shouldSkip,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      const processedError = handleError(error, {
        query: query.definitions[0]?.name?.value,
        variables,
        userId: user?.id,
      });

      // Handle specific error types
      if (processedError.fallbackAction === 'redirect_to_login') {
        // Handle authentication redirect
        window.location.href = '/login';
      }
    },
    ...queryOptions,
  });

  // Provide fallback data on error
  const enhancedData = queryResult.error && fallbackData ?
    fallbackData : queryResult.data;

  // Enhanced refetch with retry logic
  const enhancedRefetch = React.useCallback(async (newVariables) => {
    if (retryConfig) {
      return retryWithBackoff(() => queryResult.refetch(newVariables), retryConfig);
    }
    return queryResult.refetch(newVariables);
  }, [queryResult, retryConfig]);

  return {
    ...queryResult,
    data: enhancedData,
    refetch: enhancedRefetch,
    validationErrors,
    processedError: queryResult.error ? handleError(queryResult.error) : null,
  };
};

// Hook for form validation in GraphQL mutations
export const useFormValidation = (schema) => {
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(true);

  const validate = React.useCallback((values) => {
    const validationErrors = validateQueryVariables(values, schema);

    const errorMap = validationErrors.reduce((acc, error) => {
      acc[error.field] = error.message;
      return acc;
    }, {});

    setErrors(errorMap);
    setIsValid(validationErrors.length === 0);

    return validationErrors.length === 0;
  }, [schema]);

  const clearErrors = React.useCallback(() => {
    setErrors({});
    setIsValid(true);
  }, []);

  const setFieldError = React.useCallback((field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }));
    setIsValid(false);
  }, []);

  return {
    errors,
    isValid,
    validate,
    clearErrors,
    setFieldError,
  };
};

// Hook for handling loading states with timeout
export const useLoadingTimeout = (loading, timeoutMs = 30000) => {
  const [isTimeout, setIsTimeout] = React.useState(false);

  React.useEffect(() => {
    if (!loading) {
      setIsTimeout(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsTimeout(true);
    }, timeoutMs);

    return () => clearTimeout(timer);
  }, [loading, timeoutMs]);

  return {
    isTimeout,
    isLoading: loading && !isTimeout,
  };
};

// Import error handling utilities
import {
  processGraphQLError,
  validateQueryVariables,
  retryWithBackoff,
  logError
} from '../utils/errorHandling';

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

  // Calculate loading state first
  const loading = profileLoading || xpLoading || projectsLoading || auditLoading;

  // Debug logging in development
  if (typeof window !== 'undefined' && window.location?.hostname === 'localhost') {
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

// ============================================================================
// NEW HOOKS FOR ENHANCED PROGRESSION TRACKING
// ============================================================================

// Hook for comprehensive user progress tracking
export const useUserProgress = (options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const {
    limit = 50,
    offset = 0,
    isDone = null,
    skip: skipOption = false
  } = options;

  const { data, loading, error, refetch, fetchMore } = useQuery(GET_USER_PROGRESS, {
    variables: {
      userId: user?.id,
      limit,
      offset,
      isDone
    },
    skip: !isAuthenticated || !user?.id || skipOption,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const progress = data?.progress || [];
  const aggregateData = data?.progress_aggregate?.aggregate || {};

  // Process progress data for analytics
  const completedProgress = progress.filter(p => p.isDone);
  const inProgressItems = progress.filter(p => !p.isDone);
  const averageGrade = aggregateData.avg?.grade || 0;

  // Group by object type
  const progressByType = progress.reduce((acc, item) => {
    const type = item.object?.type || 'unknown';
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});

  // Calculate completion rate over time
  const completionTimeline = completedProgress
    .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
    .map((item, index) => ({
      ...item,
      cumulativeCount: index + 1,
      completionRate: ((index + 1) / progress.length) * 100
    }));

  return {
    progress,
    completedProgress,
    inProgressItems,
    progressByType,
    completionTimeline,
    totalCount: aggregateData.count || 0,
    averageGrade,
    completionRate: progress.length > 0 ? (completedProgress.length / progress.length) * 100 : 0,
    loading,
    error,
    refetch,
    fetchMore,
    hasMore: progress.length >= limit,
  };
};

// Hook for comprehensive user results with analytics
export const useUserResults = (options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const {
    limit = 50,
    offset = 0,
    type = null,
    minGrade = null,
    skip: skipOption = false
  } = options;

  const { data, loading, error, refetch, fetchMore } = useQuery(GET_USER_RESULTS, {
    variables: {
      userId: user?.id,
      limit,
      offset,
      type,
      minGrade
    },
    skip: !isAuthenticated || !user?.id || skipOption,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const results = data?.result || [];
  const aggregateData = data?.result_aggregate?.aggregate || {};

  // Analyze results
  const passedResults = results.filter(r => r.grade >= 1);
  const failedResults = results.filter(r => r.grade < 1);

  // Group by result type
  const resultsByType = results.reduce((acc, result) => {
    const resultType = result.type || 'unknown';
    if (!acc[resultType]) acc[resultType] = [];
    acc[resultType].push(result);
    return acc;
  }, {});

  // Performance trends
  const performanceTrend = results
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((result, index) => ({
      ...result,
      index,
      runningAverage: results
        .slice(0, index + 1)
        .reduce((sum, r) => sum + r.grade, 0) / (index + 1)
    }));

  return {
    results,
    passedResults,
    failedResults,
    resultsByType,
    performanceTrend,
    totalCount: aggregateData.count || 0,
    averageGrade: aggregateData.avg?.grade || 0,
    maxGrade: aggregateData.max?.grade || 0,
    minGrade: aggregateData.min?.grade || 0,
    passRate: results.length > 0 ? (passedResults.length / results.length) * 100 : 0,
    loading,
    error,
    refetch,
    fetchMore,
    hasMore: results.length >= limit,
  };
};

// Hook for user events and participation tracking
export const useUserEvents = (options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const {
    limit = 50,
    offset = 0,
    status = null,
    skip: skipOption = false
  } = options;

  const { data, loading, error, refetch, fetchMore } = useQuery(GET_USER_EVENTS, {
    variables: {
      userId: user?.id,
      limit,
      offset,
      status
    },
    skip: !isAuthenticated || !user?.id || skipOption,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const userEvents = data?.user_events || [];
  const userRegistrations = data?.user_registrations || [];
  const eventStats = data?.event_stats?.aggregate || {};

  // Process event data
  const activeEvents = userEvents.filter(ue => ue.event?.status !== 'done');
  const completedEvents = userEvents.filter(ue => ue.event?.status === 'done');

  // Group events by type
  const eventsByType = userEvents.reduce((acc, userEvent) => {
    const type = userEvent.event?.object?.type || 'unknown';
    if (!acc[type]) acc[type] = [];
    acc[type].push(userEvent);
    return acc;
  }, {});

  // Event timeline
  const eventTimeline = userEvents
    .sort((a, b) => new Date(a.event?.createdAt) - new Date(b.event?.createdAt))
    .map(userEvent => ({
      ...userEvent,
      duration: userEvent.event?.endAt ?
        new Date(userEvent.event.endAt) - new Date(userEvent.event.createdAt) : null
    }));

  return {
    userEvents,
    userRegistrations,
    activeEvents,
    completedEvents,
    eventsByType,
    eventTimeline,
    totalEvents: eventStats.count || 0,
    loading,
    error,
    refetch,
    fetchMore,
    hasMore: userEvents.length >= limit,
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

// Hook for user groups and team collaboration
export const useUserGroups = (options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const {
    limit = 50,
    offset = 0,
    status = null,
    skip: skipOption = false
  } = options;

  const { data, loading, error, refetch, fetchMore } = useQuery(GET_USER_GROUPS, {
    variables: {
      userId: user?.id,
      limit,
      offset,
      status
    },
    skip: !isAuthenticated || !user?.id || skipOption,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const userGroups = data?.user_groups || [];
  const captainGroups = data?.captain_groups || [];
  const groupStats = data?.group_stats?.aggregate || {};
  const captainStats = data?.captain_stats?.aggregate || {};

  // Process group data
  const activeGroups = userGroups.filter(ug => ug.group?.status === 'working');
  const completedGroups = userGroups.filter(ug => ug.group?.status === 'finished');

  // Leadership analysis
  const leadershipScore = captainGroups.length + (userGroups.length * 0.5);

  // Collaboration metrics
  const collaborationMetrics = {
    totalGroups: groupStats.count || 0,
    groupsAsCaptain: captainStats.count || 0,
    groupsAsMember: (groupStats.count || 0) - (captainStats.count || 0),
    leadershipRatio: groupStats.count > 0 ? (captainStats.count / groupStats.count) * 100 : 0,
  };

  // Team performance analysis
  const teamPerformance = userGroups.map(ug => {
    const group = ug.group;
    const avgGrade = group.results?.reduce((sum, r) => sum + r.grade, 0) / (group.results?.length || 1);
    return {
      ...ug,
      averageGrade: avgGrade,
      memberCount: group.members?.length || 0,
      isCompleted: group.status === 'finished',
    };
  });

  return {
    userGroups,
    captainGroups,
    activeGroups,
    completedGroups,
    teamPerformance,
    collaborationMetrics,
    leadershipScore,
    loading,
    error,
    refetch,
    fetchMore,
    hasMore: userGroups.length >= limit,
  };
};

// Hook for user matches and betting system
export const useUserMatches = (options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const {
    limit = 50,
    offset = 0,
    skip: skipOption = false
  } = options;

  const { data, loading, error, refetch, fetchMore } = useQuery(GET_USER_MATCHES, {
    variables: {
      userId: user?.id,
      limit,
      offset
    },
    skip: !isAuthenticated || !user?.id || skipOption,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const matches = data?.user_matches || [];
  const matchStats = data?.match_stats?.aggregate || {};
  const successfulBets = data?.successful_bets?.aggregate || {};
  const failedBets = data?.failed_bets?.aggregate || {};

  // Betting performance analysis
  const totalBets = (successfulBets.count || 0) + (failedBets.count || 0);
  const bettingAccuracy = totalBets > 0 ? (successfulBets.count / totalBets) * 100 : 0;

  // Match analysis
  const confirmedMatches = matches.filter(m => m.confirmed);
  const pendingMatches = matches.filter(m => !m.confirmed);

  const bettingMetrics = {
    totalMatches: matchStats.count || 0,
    totalBets,
    successfulBets: successfulBets.count || 0,
    failedBets: failedBets.count || 0,
    bettingAccuracy,
    confirmedMatches: confirmedMatches.length,
    pendingMatches: pendingMatches.length,
  };

  return {
    matches,
    confirmedMatches,
    pendingMatches,
    bettingMetrics,
    loading,
    error,
    refetch,
    fetchMore,
    hasMore: matches.length >= limit,
  };
};

// Hook for user analytics and performance insights
export const useUserAnalytics = (options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const {
    skip: skipOption = false
  } = options;

  const { data, loading, error, refetch } = useQuery(GET_USER_ANALYTICS, {
    variables: {
      userId: user?.id
    },
    skip: !isAuthenticated || !user?.id || skipOption,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const dailyXP = data?.daily_xp || [];
  const skillProgression = data?.skill_progression || [];
  const projectTimeline = data?.project_timeline || [];
  const auditTimeline = data?.audit_timeline || [];
  const activityByHour = data?.activity_by_hour || [];
  const userRanking = data?.user_ranking || [];

  // Process analytics data
  const xpProgression = dailyXP.reduce((acc, transaction) => {
    const date = new Date(transaction.createdAt).toISOString().split('T')[0];
    const existing = acc.find(item => item.date === date);

    if (existing) {
      existing.amount += transaction.amount;
    } else {
      acc.push({
        date,
        amount: transaction.amount,
        cumulative: 0,
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

  // Activity patterns
  const hourlyActivity = activityByHour.reduce((acc, activity) => {
    const hour = new Date(activity.createdAt).getHours();
    if (!acc[hour]) acc[hour] = { hour, count: 0, totalXP: 0 };
    acc[hour].count++;
    if (activity.type === 'xp') acc[hour].totalXP += activity.amount;
    return acc;
  }, {});

  // Performance ranking
  const userRank = userRanking.findIndex(u => u.id === user?.id) + 1;
  const userXPInRanking = userRanking.find(u => u.id === user?.id)?.totalXP?.aggregate?.sum?.amount || 0;

  return {
    xpProgression,
    skillProgression,
    projectTimeline,
    auditTimeline,
    hourlyActivity: Object.values(hourlyActivity),
    userRank,
    userXPInRanking,
    totalUsers: userRanking.length,
    loading,
    error,
    refetch,
  };
};

// ===== NEW ENHANCED HOOKS FOR DASHBOARD FEATURES =====

// Hook to get XP earned by project for bar chart
export const useXPByProject = () => {
  const { user, isAuthenticated } = useAuth();

  const { data, loading, error, refetch } = useQuery(GET_XP_BY_PROJECT, {
    variables: { userId: user?.id },
    skip: !isAuthenticated || !user?.id,
    errorPolicy: 'all',
  });

  // Process data to group XP by project
  const processXPByProject = (transactions) => {
    if (!transactions) return [];

    const projectXP = {};

    transactions.forEach(transaction => {
      const projectName = transaction.object?.name || transaction.path?.split('/').pop() || 'Unknown';
      const projectPath = transaction.path;

      if (!projectXP[projectPath]) {
        projectXP[projectPath] = {
          name: projectName,
          path: projectPath,
          totalXP: 0,
          type: transaction.object?.type || 'unknown',
          transactions: []
        };
      }

      projectXP[projectPath].totalXP += transaction.amount;
      projectXP[projectPath].transactions.push(transaction);
    });

    return Object.values(projectXP)
      .sort((a, b) => b.totalXP - a.totalXP)
      .slice(0, 20); // Top 20 projects
  };

  const xpByProject = processXPByProject(data?.transaction);

  return {
    xpByProject,
    loading,
    error,
    refetch,
  };
};

// Hook to get XP progression over time for line chart
export const useXPTimeline = () => {
  const { user, isAuthenticated } = useAuth();

  const { data, loading, error, refetch } = useQuery(GET_XP_TIMELINE, {
    variables: { userId: user?.id },
    skip: !isAuthenticated || !user?.id,
    errorPolicy: 'all',
  });

  // Process data to create cumulative XP timeline
  const processXPTimeline = (transactions) => {
    if (!transactions) return [];

    let cumulativeXP = 0;
    return transactions.map(transaction => {
      cumulativeXP += transaction.amount;
      return {
        date: new Date(transaction.createdAt),
        xp: transaction.amount,
        cumulativeXP,
        project: transaction.object?.name || transaction.path?.split('/').pop(),
        path: transaction.path,
      };
    });
  };

  const xpTimeline = processXPTimeline(data?.transaction);

  return {
    xpTimeline,
    loading,
    error,
    refetch,
  };
};

// Hook to get piscine statistics for pie chart
export const usePiscineStats = () => {
  const { user, isAuthenticated } = useAuth();

  const { data, loading, error, refetch } = useQuery(GET_PISCINE_STATS, {
    variables: { userId: user?.id },
    skip: !isAuthenticated || !user?.id,
    errorPolicy: 'all',
  });

  // Process piscine data
  const processPiscineStats = (results, progress) => {
    if (!results && !progress) return { jsStats: {}, goStats: {}, overall: {} };

    const allEntries = [...(results || []), ...(progress || [])];

    const jsEntries = allEntries.filter(entry =>
      entry.path?.includes('piscine-js') || entry.path?.includes('javascript')
    );

    const goEntries = allEntries.filter(entry =>
      entry.path?.includes('piscine-go') || entry.path?.includes('golang')
    );

    const calculateStats = (entries) => {
      const passed = entries.filter(entry => entry.grade >= 1).length;
      const failed = entries.filter(entry => entry.grade < 1).length;
      const total = entries.length;

      return {
        passed,
        failed,
        total,
        passRate: total > 0 ? (passed / total) * 100 : 0,
      };
    };

    return {
      jsStats: calculateStats(jsEntries),
      goStats: calculateStats(goEntries),
      overall: calculateStats(allEntries),
    };
  };

  const piscineStats = processPiscineStats(data?.result, data?.progress);

  return {
    piscineStats,
    loading,
    error,
    refetch,
  };
};

// Hook to get enhanced profile data with campus and registration info
export const useEnhancedProfile = () => {
  const { user, isAuthenticated } = useAuth();

  const { data, loading, error, refetch } = useQuery(GET_ENHANCED_PROFILE, {
    variables: { userId: user?.id },
    skip: !isAuthenticated || !user?.id,
    errorPolicy: 'all',
  });

  const profile = data?.user?.[0];
  const firstEvent = profile?.events?.[0];
  const totalProjects = profile?.results_aggregate?.aggregate?.count || 0;
  const passedProjects = profile?.passed_projects?.aggregate?.count || 0;

  return {
    profile: profile ? {
      ...profile,
      registrationDate: firstEvent?.createdAt,
      startCampus: firstEvent?.campus,
      totalProjects,
      passedProjects,
      passRate: totalProjects > 0 ? (passedProjects / totalProjects) * 100 : 0,
    } : null,
    loading,
    error,
    refetch,
  };
};

// Hook to get project timeline data
export const useProjectTimeline = () => {
  const { user, isAuthenticated } = useAuth();

  const { data, loading, error, refetch } = useQuery(GET_PROJECT_TIMELINE, {
    variables: { userId: user?.id },
    skip: !isAuthenticated || !user?.id,
    errorPolicy: 'all',
  });

  // Process timeline data
  const processProjectTimeline = (results, transactions) => {
    if (!results) return [];

    const projectMap = {};

    // Map results by project
    results.forEach(result => {
      const projectId = result.object?.id;
      if (projectId) {
        projectMap[projectId] = {
          ...result,
          xpEarned: 0,
        };
      }
    });

    // Add XP data to projects
    if (transactions) {
      transactions.forEach(transaction => {
        const projectId = transaction.object?.id;
        if (projectId && projectMap[projectId]) {
          projectMap[projectId].xpEarned += transaction.amount;
        }
      });
    }

    return Object.values(projectMap)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  };

  const projectTimeline = processProjectTimeline(data?.result, data?.transaction);

  return {
    projectTimeline,
    loading,
    error,
    refetch,
  };
};

// Hook to get detailed audit statistics
export const useDetailedAuditStats = () => {
  const { user, isAuthenticated } = useAuth();

  const { data, loading, error, refetch } = useQuery(GET_DETAILED_AUDIT_STATS, {
    variables: { userId: user?.id },
    skip: !isAuthenticated || !user?.id,
    errorPolicy: 'all',
  });

  // Process audit statistics
  const processAuditStats = (auditsGiven, auditsReceived) => {
    const givenStats = {
      total: auditsGiven?.length || 0,
      passed: auditsGiven?.filter(audit => audit.grade >= 1).length || 0,
      failed: auditsGiven?.filter(audit => audit.grade < 1).length || 0,
    };

    const receivedStats = {
      total: auditsReceived?.length || 0,
      passed: auditsReceived?.filter(audit => audit.grade >= 1).length || 0,
      failed: auditsReceived?.filter(audit => audit.grade < 1).length || 0,
    };

    return {
      given: {
        ...givenStats,
        passRate: givenStats.total > 0 ? (givenStats.passed / givenStats.total) * 100 : 0,
      },
      received: {
        ...receivedStats,
        passRate: receivedStats.total > 0 ? (receivedStats.passed / receivedStats.total) * 100 : 0,
      },
      ratio: receivedStats.total > 0 ? givenStats.total / receivedStats.total : 0,
    };
  };

  const auditStats = processAuditStats(data?.audits_given, data?.audits_received);

  return {
    auditStats,
    auditsGiven: data?.audits_given || [],
    auditsReceived: data?.audits_received || [],
    loading,
    error,
    refetch,
  };
};

// ===== ENHANCED SEARCH HOOKS WITH STATUS FILTERING =====

// Hook to search projects by status (working, audit, setup, finished)
export const useProjectSearch = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [searchProjectsByStatus] = useLazyQuery(SEARCH_PROJECTS_BY_STATUS, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      const processedResults = processProjectSearchResults(data);
      setSearchResults(processedResults);
      setLoading(false);
    },
    onError: (err) => {
      setError(err);
      setLoading(false);
    },
  });

  const processProjectSearchResults = (data) => {
    if (!data) return [];

    const results = data.results || [];
    const progress = data.progress || [];

    // Combine and categorize results by status
    const allItems = [...results, ...progress].map(item => {
      const status = determineProjectStatus(item);
      return {
        ...item,
        status,
        type: item.isDone !== undefined ? 'progress' : 'result',
      };
    });

    // Sort by most recent activity
    return allItems.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  };

  const determineProjectStatus = (item) => {
    const now = new Date();
    const updatedAt = new Date(item.updatedAt);
    const createdAt = new Date(item.createdAt);
    const daysSinceUpdate = (now - updatedAt) / (1000 * 60 * 60 * 24);
    const daysSinceCreation = (now - createdAt) / (1000 * 60 * 60 * 24);

    // Finished: has passing grade
    if (item.grade >= 1) return 'finished';

    // Setup: very recently created, no significant progress
    if (daysSinceCreation <= 7 && item.grade === 0) return 'setup';

    // Audit: project submitted for review (grade 0 but recent activity)
    if (item.grade === 0 && daysSinceUpdate <= 3) return 'audit';

    // Working: active development
    if (item.grade === 0 && daysSinceUpdate <= 30) return 'working';

    // Default to working for active items
    return 'working';
  };

  const searchProjects = (searchTerm = '', status = 'all', options = {}) => {
    if (!isAuthenticated || !user?.id) return;

    setLoading(true);
    setError(null);

    const { limit = 20, offset = 0 } = options;

    searchProjectsByStatus({
      variables: {
        userId: user.id,
        status,
        searchTerm: `%${searchTerm}%`,
        limit,
        offset,
      },
    });
  };

  const filterByStatus = (status) => {
    if (status === 'all') return searchResults;
    return searchResults.filter(item => item.status === status);
  };

  return {
    searchResults,
    searchProjects,
    filterByStatus,
    loading,
    error,
    // Status counts for UI
    statusCounts: {
      all: searchResults.length,
      working: searchResults.filter(r => r.status === 'working').length,
      audit: searchResults.filter(r => r.status === 'audit').length,
      setup: searchResults.filter(r => r.status === 'setup').length,
      finished: searchResults.filter(r => r.status === 'finished').length,
    },
  };
};

// Hook to search audits by status
export const useAuditSearch = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [searchAuditsByStatus] = useLazyQuery(SEARCH_AUDITS_BY_STATUS, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      const processedResults = processAuditSearchResults(data);
      setSearchResults(processedResults);
      setLoading(false);
    },
    onError: (err) => {
      setError(err);
      setLoading(false);
    },
  });

  const processAuditSearchResults = (data) => {
    if (!data) return [];

    const auditsGiven = (data.audits_given || []).map(audit => ({
      ...audit,
      type: 'given',
      status: determineAuditStatus(audit),
    }));

    const auditsReceived = (data.audits_received || []).map(audit => ({
      ...audit,
      type: 'received',
      status: determineAuditStatus(audit),
    }));

    return [...auditsGiven, ...auditsReceived]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const determineAuditStatus = (audit) => {
    const now = new Date();
    const createdAt = new Date(audit.createdAt);
    const endAt = audit.endAt ? new Date(audit.endAt) : null;
    const daysSinceCreation = (now - createdAt) / (1000 * 60 * 60 * 24);

    // Finished: audit has end date
    if (endAt) return 'finished';

    // Setup: very recently created
    if (daysSinceCreation <= 1) return 'setup';

    // Working: audit in progress
    if (!endAt && daysSinceCreation <= 7) return 'working';

    // Audit: waiting for completion
    return 'audit';
  };

  const searchAudits = (searchTerm = '', status = 'all', options = {}) => {
    if (!isAuthenticated || !user?.id) return;

    setLoading(true);
    setError(null);

    const { limit = 20, offset = 0 } = options;

    searchAuditsByStatus({
      variables: {
        userId: user.id,
        status,
        searchTerm: `%${searchTerm}%`,
        limit,
        offset,
      },
    });
  };

  const filterByStatus = (status) => {
    if (status === 'all') return searchResults;
    return searchResults.filter(item => item.status === status);
  };

  const filterByType = (type) => {
    if (type === 'all') return searchResults;
    return searchResults.filter(item => item.type === type);
  };

  return {
    searchResults,
    searchAudits,
    filterByStatus,
    filterByType,
    loading,
    error,
    // Status counts for UI
    statusCounts: {
      all: searchResults.length,
      working: searchResults.filter(r => r.status === 'working').length,
      audit: searchResults.filter(r => r.status === 'audit').length,
      setup: searchResults.filter(r => r.status === 'setup').length,
      finished: searchResults.filter(r => r.status === 'finished').length,
    },
    // Type counts for UI
    typeCounts: {
      all: searchResults.length,
      given: searchResults.filter(r => r.type === 'given').length,
      received: searchResults.filter(r => r.type === 'received').length,
    },
  };
};

// Hook for enhanced user search with status filtering
export const useEnhancedUserSearch = () => {
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [searchUsersWithStatus] = useLazyQuery(SEARCH_USERS_WITH_STATUS, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      const processedResults = processUserSearchResults(data);
      setSearchResults(processedResults);
      setLoading(false);
    },
    onError: (err) => {
      setError(err);
      setLoading(false);
    },
  });

  const processUserSearchResults = (data) => {
    if (!data?.users) return [];

    return data.users.map(user => {
      const status = determineUserStatus(user);
      const totalXP = user.recent_transactions?.reduce((sum, tx) => sum + tx.amount, 0) || 0;
      const recentActivity = user.recent_results?.length > 0;

      return {
        ...user,
        status,
        totalXP,
        recentActivity,
        lastActive: user.recent_results?.[0]?.updatedAt || user.updatedAt,
      };
    });
  };

  const determineUserStatus = (user) => {
    const now = new Date();
    const lastUpdate = new Date(user.updatedAt);
    const daysSinceUpdate = (now - lastUpdate) / (1000 * 60 * 60 * 24);

    // Check recent results for activity patterns
    const recentResults = user.recent_results || [];
    const hasRecentActivity = recentResults.some(result => {
      const resultDate = new Date(result.updatedAt);
      const daysSinceResult = (now - resultDate) / (1000 * 60 * 60 * 24);
      return daysSinceResult <= 7;
    });

    // Working: recent activity within a week
    if (hasRecentActivity) return 'working';

    // Setup: new user (created recently, minimal activity)
    const createdAt = new Date(user.createdAt);
    const daysSinceCreation = (now - createdAt) / (1000 * 60 * 60 * 24);
    if (daysSinceCreation <= 30 && recentResults.length <= 2) return 'setup';

    // Audit: has completed work but not recent activity
    if (recentResults.length > 0 && daysSinceUpdate <= 30) return 'audit';

    // Finished: has significant completed work
    const completedWork = recentResults.filter(r => r.grade >= 1).length;
    if (completedWork >= 3) return 'finished';

    // Default to working
    return 'working';
  };

  const searchUsers = (searchTerm = '', status = 'all', campus = '', options = {}) => {
    setLoading(true);
    setError(null);

    const { limit = 20, offset = 0 } = options;

    searchUsersWithStatus({
      variables: {
        searchTerm: `%${searchTerm}%`,
        status,
        campus: campus ? `%${campus}%` : '%',
        limit,
        offset,
      },
    });
  };

  const filterByStatus = (status) => {
    if (status === 'all') return searchResults;
    return searchResults.filter(user => user.status === status);
  };

  const filterByCampus = (campus) => {
    if (!campus || campus === 'all') return searchResults;
    return searchResults.filter(user =>
      user.campus && user.campus.toLowerCase().includes(campus.toLowerCase())
    );
  };

  return {
    searchResults,
    searchUsers,
    filterByStatus,
    filterByCampus,
    loading,
    error,
    // Status counts for UI
    statusCounts: {
      all: searchResults.length,
      working: searchResults.filter(u => u.status === 'working').length,
      audit: searchResults.filter(u => u.status === 'audit').length,
      setup: searchResults.filter(u => u.status === 'setup').length,
      finished: searchResults.filter(u => u.status === 'finished').length,
    },
    // Campus distribution
    campuses: [...new Set(searchResults.map(u => u.campus).filter(Boolean))],
  };
};

// ============================================================================
// ENHANCED HOOKS BASED ON INTROSPECTION DATA
// ============================================================================

// Hook for enhanced user profile with all relationships
export const useEnhancedUserProfile = (userId, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const targetUserId = userId || user?.id;

  const { data, loading, error, refetch } = useQuery(GET_ENHANCED_USER_PROFILE, {
    variables: { userId: targetUserId },
    skip: !isAuthenticated || !targetUserId,
    errorPolicy: 'all',
    fetchPolicy: options.fetchPolicy || 'cache-first',
    ...options,
  });

  const enhancedProfile = data?.user?.[0] || null;

  return {
    enhancedProfile,
    loading,
    error,
    refetch,
  };
};

// Hook for comprehensive user analytics
export const useComprehensiveUserAnalytics = (userId, campus = null, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const targetUserId = userId || user?.id;

  const { data, loading, error, refetch } = useQuery(GET_COMPREHENSIVE_USER_ANALYTICS, {
    variables: { userId: targetUserId, campus },
    skip: !isAuthenticated || !targetUserId,
    errorPolicy: 'all',
    fetchPolicy: options.fetchPolicy || 'cache-first',
    ...options,
  });

  const analytics = data?.user?.[0] || null;

  // Process analytics data
  const processedAnalytics = analytics ? {
    userInfo: {
      id: analytics.id,
      login: analytics.login,
      firstName: analytics.firstName,
      lastName: analytics.lastName,
      campus: analytics.campus,
      auditRatio: analytics.auditRatio,
      totalUp: analytics.totalUp,
      totalDown: analytics.totalDown,
      totalUpBonus: analytics.totalUpBonus,
      auditsAssigned: analytics.auditsAssigned,
    },
    aggregates: {
      transactions: analytics.transactions_aggregate?.aggregate || {},
      xpTransactions: analytics.xpTransactions?.aggregate || {},
      upTransactions: analytics.upTransactions?.aggregate || {},
      downTransactions: analytics.downTransactions?.aggregate || {},
      progresses: analytics.progresses_aggregate?.aggregate || {},
      completedProgress: analytics.completedProgress?.aggregate || {},
      results: analytics.results_aggregate?.aggregate || {},
      passedResults: analytics.passedResults?.aggregate || {},
      projectResults: analytics.projectResults?.aggregate || {},
      audits: analytics.audits_aggregate?.aggregate || {},
      events: analytics.events_aggregate?.aggregate || {},
      groups: analytics.groups_aggregate?.aggregate || {},
      groupsAsCaptain: analytics.groupsByCaptainid_aggregate?.aggregate || {},
      labels: analytics.labels_aggregate?.aggregate || {},
      matches: analytics.matches_aggregate?.aggregate || {},
      objectAvailabilities: analytics.objectAvailabilities_aggregate?.aggregate || {},
      objects: analytics.objects_aggregate?.aggregate || {},
      progressesByPath: analytics.progressesByPath_aggregate?.aggregate || {},
      registrations: analytics.registrations_aggregate?.aggregate || {},
      userRoles: analytics.user_roles_aggregate?.aggregate || {},
      roles: analytics.roles_aggregate?.aggregate || {},
      sessions: analytics.sessions_aggregate?.aggregate || {},
    },
  } : null;

  return {
    analytics: processedAnalytics,
    rawAnalytics: analytics,
    loading,
    error,
    refetch,
  };
};

// Hook for performance analytics with time filtering
export const usePerformanceAnalytics = (userId, startDate, endDate, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const targetUserId = userId || user?.id;

  const { data, loading, error, refetch } = useQuery(GET_PERFORMANCE_ANALYTICS, {
    variables: {
      userId: targetUserId,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    },
    skip: !isAuthenticated || !targetUserId,
    errorPolicy: 'all',
    fetchPolicy: options.fetchPolicy || 'cache-first',
    ...options,
  });

  const performanceData = data?.user?.[0] || null;

  return {
    performanceData,
    loading,
    error,
    refetch,
  };
};

// Hook for collaboration analytics
export const useCollaborationAnalytics = (userId, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const targetUserId = userId || user?.id;

  const { data, loading, error, refetch } = useQuery(GET_COLLABORATION_ANALYTICS, {
    variables: { userId: targetUserId },
    skip: !isAuthenticated || !targetUserId,
    errorPolicy: 'all',
    fetchPolicy: options.fetchPolicy || 'cache-first',
    ...options,
  });

  const collaborationData = data?.user?.[0] || null;

  // Process collaboration metrics
  const processedData = collaborationData ? {
    userInfo: {
      id: collaborationData.id,
      login: collaborationData.login,
      firstName: collaborationData.firstName,
      lastName: collaborationData.lastName,
    },
    groupParticipation: collaborationData.groups || [],
    leadershipRoles: collaborationData.groupsByCaptainid || [],
    auditRelationships: collaborationData.audits || [],
    skillProgression: collaborationData.skillTransactions || [],
    competitiveMatches: collaborationData.matches || [],
  } : null;

  return {
    collaborationData: processedData,
    rawData: collaborationData,
    loading,
    error,
    refetch,
  };
};

// Hook for detailed user events and registrations
export const useUserEventsDetailed = (userId, limit = 50, offset = 0, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const targetUserId = userId || user?.id;

  const { data, loading, error, refetch } = useQuery(GET_USER_EVENTS_DETAILED, {
    variables: { userId: targetUserId, limit, offset },
    skip: !isAuthenticated || !targetUserId,
    errorPolicy: 'all',
    fetchPolicy: options.fetchPolicy || 'cache-first',
    ...options,
  });

  const userData = data?.user?.[0] || null;

  return {
    events: userData?.events || [],
    eventsAggregate: userData?.events_aggregate?.aggregate || {},
    registrations: userData?.registrations || [],
    registrationsAggregate: userData?.registrations_aggregate?.aggregate || {},
    loading,
    error,
    refetch,
  };
};

// Hook for user labels
export const useUserLabels = (userId, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const targetUserId = userId || user?.id;

  const { data, loading, error, refetch } = useQuery(GET_USER_LABELS, {
    variables: { userId: targetUserId },
    skip: !isAuthenticated || !targetUserId,
    errorPolicy: 'all',
    fetchPolicy: options.fetchPolicy || 'cache-first',
    ...options,
  });

  const userData = data?.user?.[0] || null;

  return {
    labels: userData?.labels || [],
    labelsAggregate: userData?.labels_aggregate?.aggregate || {},
    loading,
    error,
    refetch,
  };
};

// Hook for user matches (betting/competition system)
export const useUserMatchesDetailed = (userId, limit = 50, offset = 0, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const targetUserId = userId || user?.id;

  const { data, loading, error, refetch } = useQuery(GET_USER_MATCHES_DETAILED, {
    variables: { userId: targetUserId, limit, offset },
    skip: !isAuthenticated || !targetUserId,
    errorPolicy: 'all',
    fetchPolicy: options.fetchPolicy || 'cache-first',
    ...options,
  });

  const userData = data?.user?.[0] || null;

  return {
    matches: userData?.matches || [],
    matchesAggregate: userData?.matches_aggregate?.aggregate || {},
    loading,
    error,
    refetch,
  };
};

// Hook for user object availabilities
export const useUserObjectAvailabilities = (userId, limit = 50, offset = 0, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const targetUserId = userId || user?.id;

  const { data, loading, error, refetch } = useQuery(GET_USER_OBJECT_AVAILABILITIES, {
    variables: { userId: targetUserId, limit, offset },
    skip: !isAuthenticated || !targetUserId,
    errorPolicy: 'all',
    fetchPolicy: options.fetchPolicy || 'cache-first',
    ...options,
  });

  const userData = data?.user?.[0] || null;

  return {
    objectAvailabilities: userData?.objectAvailabilities || [],
    objectAvailabilitiesAggregate: userData?.objectAvailabilities_aggregate?.aggregate || {},
    loading,
    error,
    refetch,
  };
};

// Hook for user progress by path
export const useUserProgressByPath = (userId, pathPattern = '%', limit = 50, offset = 0, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const targetUserId = userId || user?.id;

  const { data, loading, error, refetch } = useQuery(GET_USER_PROGRESS_BY_PATH, {
    variables: { userId: targetUserId, pathPattern, limit, offset },
    skip: !isAuthenticated || !targetUserId,
    errorPolicy: 'all',
    fetchPolicy: options.fetchPolicy || 'cache-first',
    ...options,
  });

  const userData = data?.user?.[0] || null;

  return {
    progressesByPath: userData?.progressesByPath || [],
    progressesByPathAggregate: userData?.progressesByPath_aggregate?.aggregate || {},
    loading,
    error,
    refetch,
  };
};

// Hook for user sessions
export const useUserSessions = (userId, limit = 10, offset = 0, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const targetUserId = userId || user?.id;

  const { data, loading, error, refetch } = useQuery(GET_USER_SESSIONS, {
    variables: { userId: targetUserId, limit, offset },
    skip: !isAuthenticated || !targetUserId,
    errorPolicy: 'all',
    fetchPolicy: options.fetchPolicy || 'cache-first',
    ...options,
  });

  const userData = data?.user?.[0] || null;

  return {
    sessions: userData?.sessions || [],
    sessionsAggregate: userData?.sessions_aggregate?.aggregate || {},
    loading,
    error,
    refetch,
  };
};

// Hook for user XPs (separate from transactions)
export const useUserXPs = (userId, limit = 100, offset = 0, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const targetUserId = userId || user?.id;

  const { data, loading, error, refetch } = useQuery(GET_USER_XPS, {
    variables: { userId: targetUserId, limit, offset },
    skip: !isAuthenticated || !targetUserId,
    errorPolicy: 'all',
    fetchPolicy: options.fetchPolicy || 'cache-first',
    ...options,
  });

  const userData = data?.user?.[0] || null;

  return {
    xps: userData?.xps || [],
    loading,
    error,
    refetch,
  };
};

// Hook for user created objects
export const useUserCreatedObjects = (userId, limit = 50, offset = 0, objectType = null, options = {}) => {
  const { user, isAuthenticated } = useAuth();
  const targetUserId = userId || user?.id;

  const { data, loading, error, refetch } = useQuery(GET_USER_CREATED_OBJECTS, {
    variables: { userId: targetUserId, limit, offset, objectType },
    skip: !isAuthenticated || !targetUserId,
    errorPolicy: 'all',
    fetchPolicy: options.fetchPolicy || 'cache-first',
    ...options,
  });

  const userData = data?.user?.[0] || null;

  return {
    objects: userData?.objects || [],
    objectsAggregate: userData?.objects_aggregate?.aggregate || {},
    loading,
    error,
    refetch,
  };
};
