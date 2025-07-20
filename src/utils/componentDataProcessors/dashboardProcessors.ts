/**
 * Dashboard Data Processors
 * Handles all data processing logic for dashboard components
 * Separates data processing from JSX presentation logic
 */

import { normalizeUserData, getUserDisplayName, getUserAuditStats } from '../schemaAdapters/userSchemaAdapter';
import { normalizeTransactionsData, calculateTotalXP } from '../schemaAdapters/transactionSchemaAdapter';
import { calculateSkillStatistics } from '../schemaAdapters/skillsSchemaAdapter';
import { calculateLevel, getLevelInfo, calculateXPMilestones } from '../calculations/xpCalculations';
import { processAuditsSectionData } from './auditsProcessors';
import { processTechnologiesSectionData } from './technologiesSectionProcessors';
import { formatXP } from '../dataFormatting';
import { processSearchSectionData } from './searchSectionProcessors';
import { TAB_CONFIG } from '../routing';

/**
 * Process dashboard data for ProfileSection component
 * @param {Object} rawData - Raw data from GraphQL
 * @returns {Object} Processed data ready for JSX consumption
 */
export const processProfileSectionData = (rawData) => {
  if (!rawData) {
    return {
      user: null,
      totalXP: 0,
      level: 0,
      levelInfo: null,
      auditStats: null,
      milestones: [],
      displayName: 'Unknown User',
      isLoading: true,
      error: null
    };
  }

  const normalizedUser = normalizeUserData(rawData.user);
  const normalizedTransactions = normalizeTransactionsData(rawData.transactions || []);
  const totalXP = calculateTotalXP(normalizedTransactions);
  const level = calculateLevel(totalXP);
  const levelInfo = getLevelInfo(totalXP);
  const auditStats = getUserAuditStats(normalizedUser);
  const milestones = calculateXPMilestones(totalXP);
  const displayName = getUserDisplayName(normalizedUser);

  return {
    user: normalizedUser,
    totalXP,
    level,
    levelInfo,
    auditStats: {
      ...auditStats,
      auditRatioFormatted: auditStats.ratio.toFixed(2)
    },
    milestones,
    displayName,
    isLoading: false,
    error: null
  };
};

/**
 * Process dashboard data for StatsSection component
 * @param {Object} rawData - Raw data from GraphQL
 * @returns {Object} Processed data ready for JSX consumption
 */
export const processStatsSectionData = (rawData) => {
  if (!rawData) {
    return {
      skills: [],
      topSkills: [],
      skillStats: null,
      auditStats: null,
      projectStats: null,
      timelineData: [],
      xpByProject: [],
      performanceMetrics: null,
      isLoading: true,
      error: null
    };
  }

  const {
    totalXP = 0,
    level = 0,
    xpTimeline = [],
    xpProjects = [],
    totalProjects = 0,
    passedProjects = 0,
    failedProjects = 0,
    passRate = 0,
    auditRatio = 0,
    totalUp = 0,
    totalDown = 0,
    skills = [],
    loading = false,
    error = null
  } = rawData;

  if (loading) {
    return {
      skills: [],
      topSkills: [],
      skillStats: null,
      auditStats: null,
      projectStats: null,
      timelineData: [],
      xpByProject: [],
      performanceMetrics: null,
      isLoading: true,
      error: null
    };
  }

  if (error) {
    return {
      skills: [],
      topSkills: [],
      skillStats: null,
      auditStats: null,
      projectStats: null,
      timelineData: [],
      xpByProject: [],
      performanceMetrics: null,
      isLoading: false,
      error: error.message || 'Failed to load statistics data'
    };
  }

  // Process performance metrics
  const performanceMetrics = {
    totalXP,
    level,
    totalProjects,
    passedProjects,
    failedProjects,
    passRate,
    auditRatio,
    auditsGiven: totalUp,
    auditsReceived: totalDown,
    successRate: passRate,
    formattedTotalXP: formatXP(totalXP),
    formattedPassRate: `${passRate.toFixed(1)}%`,
    formattedAuditRatio: auditRatio.toFixed(2)
  };

  return {
    skills,
    topSkills: skills.slice(0, 10),
    skillStats: calculateSkillStatistics(skills),
    auditStats: {
      auditsGiven: totalUp,
      auditsReceived: totalDown,
      auditRatio,
      formattedRatio: auditRatio.toFixed(2)
    },
    projectStats: {
      total: totalProjects,
      passed: passedProjects,
      failed: failedProjects,
      passRate,
      formattedPassRate: `${passRate.toFixed(1)}%`
    },
    timelineData: xpTimeline,
    xpByProject: xpProjects,
    performanceMetrics,
    isLoading: false,
    error: null
  };
};











/**
 * Process dashboard tab configuration with icons
 * @returns {Array} Enhanced tab configuration
 */
export const processDashboardTabs = () => {
  // Import icons dynamically to avoid circular dependencies
  const iconMap = {
    'User': 'User',
    'Search': 'Search',
    'BarChart3': 'BarChart3',
    'TrendingUp': 'TrendingUp',
    'Award': 'Award',
    'Trophy': 'Trophy',
    'Users': 'Users'
  };

  return TAB_CONFIG.map(tab => ({
    ...tab,
    iconName: iconMap[tab.icon] || 'User'
  }));
};

/**
 * Process dashboard header data
 * @param {Object} userStatistics - User statistics data
 * @param {Object} user - Auth user data
 * @param {number} totalXP - Total XP amount
 * @returns {Object} Processed dashboard header data
 */
export const processDashboardHeader = (userStatistics, user, totalXP) => {
  const displayName = getUserDisplayName(userStatistics) || user?.username || 'Unknown User';
  const formattedXP = formatXP(totalXP || 0);

  return {
    displayName,
    formattedXP,
    level: Math.floor((totalXP || 0) / 1000),
    progress: ((totalXP || 0) % 1000) / 1000 * 100,
    hasData: Boolean(userStatistics)
  };
};

/**
 * Process dashboard state for error handling
 * @param {boolean} loading - Loading state
 * @param {Error} error - Error object
 * @param {Object} userStatistics - User statistics data
 * @returns {Object} Dashboard state information
 */
export const processDashboardState = (loading, error, userStatistics) => {
  return {
    isLoading: loading,
    hasError: Boolean(error),
    hasData: Boolean(userStatistics),
    shouldShowError: Boolean(error && !userStatistics),
    shouldShowLoading: loading,
    errorMessage: error?.message || 'Failed to load dashboard data'
  };
};

/**
 * Process combined dashboard data for main Dashboard component
 * @param {Object} rawData - Raw data from GraphQL
 * @returns {Object} Processed data ready for JSX consumption
 */
export const processDashboardData = (rawData) => {
  if (!rawData) {
    return {
      profileData: processProfileSectionData(null),
      statsData: processStatsSectionData(null),
      auditsData: processAuditsSectionData(null),
      technologiesData: processTechnologiesSectionData(null),
      searchData: processSearchSectionData(null),
      isLoading: true,
      error: null
    };
  }

  return {
    profileData: processProfileSectionData(rawData),
    statsData: processStatsSectionData(rawData),
    auditsData: processAuditsSectionData(rawData),
    technologiesData: processTechnologiesSectionData(rawData),
    searchData: processSearchSectionData(rawData),
    isLoading: false,
    error: null
  };
};


