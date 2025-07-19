/**
 * Dashboard Data Processors
 * Handles all data processing logic for dashboard components
 * Separates data processing from JSX presentation logic
 */

import { normalizeUserData, getUserDisplayName, getUserAuditStats } from '../schemaAdapters/userSchemaAdapter.js';
import { normalizeTransactionsData, calculateTotalXP, calculateXPTimeline } from '../schemaAdapters/transactionSchemaAdapter.js';
import { normalizeSkillsData, getTopSkills, calculateSkillStatistics } from '../schemaAdapters/skillsSchemaAdapter.js';
import { normalizeAuditsData, extractAuditStatistics } from '../schemaAdapters/auditSchemaAdapter.js';
import { calculateLevel, getLevelInfo, calculateXPMilestones } from '../calculations/xpCalculations.js';
import { processAuditsSectionData } from './auditsSectionProcessors.js';
import { processTechnologiesSectionData } from './technologiesSectionProcessors.js';
import { processSearchSectionData } from './searchSectionProcessors.js';

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
      isLoading: true,
      error: null
    };
  }

  const normalizedSkills = normalizeSkillsData(rawData.skills || []);
  const normalizedAudits = normalizeAuditsData(rawData.audits || []);
  const normalizedTransactions = normalizeTransactionsData(rawData.transactions || []);
  
  const topSkills = getTopSkills(normalizedSkills, 10);
  const skillStats = calculateSkillStatistics(normalizedSkills);
  const auditStats = extractAuditStatistics(normalizedAudits);
  const timelineData = calculateXPTimeline(normalizedTransactions);

  // Process project statistics
  const projectResults = rawData.results || [];
  const projectStats = {
    total: projectResults.length,
    passed: projectResults.filter(r => r.grade >= 1).length,
    failed: projectResults.filter(r => r.grade < 1).length,
    passRate: projectResults.length > 0 
      ? (projectResults.filter(r => r.grade >= 1).length / projectResults.length) * 100 
      : 0
  };

  return {
    skills: normalizedSkills,
    topSkills,
    skillStats,
    auditStats,
    projectStats,
    timelineData,
    isLoading: false,
    error: null
  };
};







/**
 * Calculate audit trends data (helper function)
 * @param {Array} audits - Normalized audit data
 * @returns {Array} Trend data
 */
const _calculateAuditTrendsData = (audits) => {
  if (!Array.isArray(audits) || audits.length === 0) return [];

  // Group audits by week
  const auditsByWeek = audits.reduce((groups, audit) => {
    if (!audit.createdAt) return groups;
    
    const date = new Date(audit.createdAt);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toDateString();
    
    groups[weekKey] = groups[weekKey] || [];
    groups[weekKey].push(audit);
    return groups;
  }, {});

  // Calculate trends
  return Object.entries(auditsByWeek)
    .map(([week, weekAudits]) => ({
      week,
      count: weekAudits.length,
      passRate: (weekAudits.filter(a => a.isPassed).length / weekAudits.length) * 100,
      averageGrade: weekAudits.reduce((sum, a) => sum + a.grade, 0) / weekAudits.length
    }))
    .sort((a, b) => new Date(a.week) - new Date(b.week));
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

/**
 * Format percentage for display
 * @param {number} value - Percentage value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  if (typeof value !== 'number' || isNaN(value)) return '0%';
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format XP amount for display
 * @param {number} amount - XP amount
 * @returns {string} Formatted XP
 */
export const formatXP = (amount) => {
  if (!amount || amount === 0) return '0 XP';
  
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M XP`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}k XP`;
  }
  return `${amount} XP`;
};

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return 'Invalid Date';
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
