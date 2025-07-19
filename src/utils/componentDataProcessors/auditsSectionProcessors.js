/**
 * Audits Section Data Processors
 * Handles all data processing logic for the AuditsSection component
 * Separates audit calculations from JSX presentation logic
 */

import { extractAuditStatistics } from '../schemaAdapters/auditSchemaAdapter.js';
import { normalizeUserData } from '../schemaAdapters/userSchemaAdapter.js';

/**
 * Process all data for the AuditsSection component
 * @param {Object} rawData - Raw data from GraphQL queries
 * @returns {Object} Processed data ready for JSX consumption
 */
export const processAuditsSectionData = (rawData) => {
  const {
    user,
    audits = [],
    auditRatio,
    totalUp,
    totalDown,
    loading = false,
    error = null
  } = rawData;

  if (loading) {
    return {
      isLoading: true,
      error: null,
      auditStats: null,
      auditHistory: [],
      auditTypes: [],
      recentAudits: [],
      auditTrends: null
    };
  }

  if (error) {
    return {
      isLoading: false,
      error: error.message || 'Failed to load audit data',
      auditStats: null,
      auditHistory: [],
      auditTypes: [],
      recentAudits: [],
      auditTrends: null
    };
  }

  // Process user profile
  const userProfile = normalizeUserData(user);

  // Process audit statistics
  const auditStats = extractAuditStatistics({
    audits,
    auditRatio,
    totalUp,
    totalDown
  });

  // Process audit history with timeline
  const auditHistory = processAuditHistory(audits);

  // Process audit types breakdown
  const auditTypes = processAuditTypes(audits);

  // Get recent audits
  const recentAudits = processRecentAudits(audits, 10);

  // Calculate audit trends
  const auditTrends = calculateAuditTrends(audits);

  return {
    isLoading: false,
    error: null,
    user: userProfile,
    auditStats,
    auditHistory,
    auditTypes,
    recentAudits,
    auditTrends
  };
};

/**
 * Process audit history for timeline display
 * @param {Array} audits - Raw audit data
 * @returns {Array} Processed audit history
 */
const processAuditHistory = (audits) => {
  if (!Array.isArray(audits) || audits.length === 0) {
    return [];
  }

  return audits
    .map(audit => ({
      id: audit.id,
      type: audit.type || 'unknown',
      grade: audit.grade || 0,
      isPass: (audit.grade || 0) >= 1,
      date: audit.createdAt,
      formattedDate: new Date(audit.createdAt).toLocaleDateString(),
      project: audit.project?.name || 'Unknown Project',
      auditor: audit.auditor?.login || 'Unknown',
      auditee: audit.auditee?.login || 'Unknown'
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Process audit types for breakdown display
 * @param {Array} audits - Raw audit data
 * @returns {Array} Processed audit types
 */
const processAuditTypes = (audits) => {
  if (!Array.isArray(audits) || audits.length === 0) {
    return [];
  }

  const typeGroups = audits.reduce((groups, audit) => {
    const type = audit.type || 'unknown';
    if (!groups[type]) {
      groups[type] = {
        type,
        count: 0,
        totalGrade: 0,
        passCount: 0,
        failCount: 0
      };
    }
    
    groups[type].count++;
    groups[type].totalGrade += audit.grade || 0;
    
    if ((audit.grade || 0) >= 1) {
      groups[type].passCount++;
    } else {
      groups[type].failCount++;
    }
    
    return groups;
  }, {});

  return Object.values(typeGroups)
    .map(group => ({
      ...group,
      averageGrade: group.count > 0 ? group.totalGrade / group.count : 0,
      passRate: group.count > 0 ? (group.passCount / group.count) * 100 : 0,
      formattedPassRate: group.count > 0 ? `${((group.passCount / group.count) * 100).toFixed(1)}%` : '0%'
    }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Process recent audits for display
 * @param {Array} audits - Raw audit data
 * @param {number} limit - Number of recent audits to return
 * @returns {Array} Processed recent audits
 */
const processRecentAudits = (audits, limit = 10) => {
  if (!Array.isArray(audits) || audits.length === 0) {
    return [];
  }

  return audits
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit)
    .map(audit => ({
      id: audit.id,
      type: audit.type || 'unknown',
      grade: audit.grade || 0,
      isPass: (audit.grade || 0) >= 1,
      date: audit.createdAt,
      formattedDate: new Date(audit.createdAt).toLocaleDateString(),
      relativeTime: getRelativeTime(audit.createdAt),
      project: audit.project?.name || 'Unknown Project',
      auditor: audit.auditor?.login || 'Unknown',
      auditee: audit.auditee?.login || 'Unknown',
      statusBadge: {
        variant: (audit.grade || 0) >= 1 ? 'success' : 'danger',
        text: (audit.grade || 0) >= 1 ? 'Pass' : 'Fail'
      }
    }));
};

/**
 * Calculate audit trends over time
 * @param {Array} audits - Raw audit data
 * @returns {Object} Audit trends data
 */
const calculateAuditTrends = (audits) => {
  if (!Array.isArray(audits) || audits.length === 0) {
    return {
      totalAudits: 0,
      passRate: 0,
      averageGrade: 0,
      monthlyTrend: [],
      improvement: 0
    };
  }

  const totalAudits = audits.length;
  const passCount = audits.filter(audit => (audit.grade || 0) >= 1).length;
  const passRate = totalAudits > 0 ? (passCount / totalAudits) * 100 : 0;
  const averageGrade = audits.reduce((sum, audit) => sum + (audit.grade || 0), 0) / totalAudits;

  // Calculate monthly trends
  const monthlyData = audits.reduce((months, audit) => {
    const date = new Date(audit.createdAt);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!months[monthKey]) {
      months[monthKey] = {
        month: monthKey,
        count: 0,
        passCount: 0,
        totalGrade: 0
      };
    }
    
    months[monthKey].count++;
    months[monthKey].totalGrade += audit.grade || 0;
    if ((audit.grade || 0) >= 1) {
      months[monthKey].passCount++;
    }
    
    return months;
  }, {});

  const monthlyTrend = Object.values(monthlyData)
    .map(month => ({
      ...month,
      passRate: month.count > 0 ? (month.passCount / month.count) * 100 : 0,
      averageGrade: month.count > 0 ? month.totalGrade / month.count : 0,
      formattedMonth: new Date(month.month + '-01').toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      })
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // Calculate improvement (comparing last 2 months)
  let improvement = 0;
  if (monthlyTrend.length >= 2) {
    const lastMonth = monthlyTrend[monthlyTrend.length - 1];
    const previousMonth = monthlyTrend[monthlyTrend.length - 2];
    improvement = lastMonth.passRate - previousMonth.passRate;
  }

  return {
    totalAudits,
    passRate,
    averageGrade,
    monthlyTrend,
    improvement,
    formattedPassRate: `${passRate.toFixed(1)}%`,
    formattedAverageGrade: averageGrade.toFixed(2)
  };
};

/**
 * Get relative time string for display
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time string
 */
const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
};
