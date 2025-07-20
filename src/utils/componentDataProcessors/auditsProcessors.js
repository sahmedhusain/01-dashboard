/**
 * Audits Section Data Processors
 * Handles all data processing logic for AuditsSection component
 * Separates data processing from JSX presentation logic
 */

import { formatPercentage } from '../dataFormatting.js';

/**
 * Transform raw audit data to display format
 * @param {Array} rawAudits - Raw audit data from API
 * @returns {Array} Transformed audit data
 */
export const transformAuditData = (rawAudits) => {
  if (!Array.isArray(rawAudits)) return [];

  return rawAudits.map(audit => ({
    id: audit.id,
    user: audit.group?.object?.name || 'Unknown Project',
    project: audit.group?.path?.split('/').pop() || 'Unknown',
    result: audit.grade >= 1 ? 'Pass' : 'Fail',
    status: audit.grade >= 1 ? 'pass' : 'fail',
    date: audit.createdAt,
    grade: audit.grade || 0,
    attrs: audit.attrs || {}
  }));
};

/**
 * Filter and sort audits based on criteria
 * @param {Array} audits - Transformed audit data
 * @param {string} searchTerm - Search term for filtering
 * @param {string} filterStatus - Status filter ('all', 'pass', 'fail')
 * @param {string} sortBy - Sort criteria ('date', 'user', 'project')
 * @returns {Array} Filtered and sorted audits
 */
export const filterAndSortAudits = (audits, searchTerm, filterStatus, sortBy) => {
  return audits
    .filter(audit => {
      const matchesSearch =
        audit.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        audit.project.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === 'all' || audit.status === filterStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'user':
          return a.user.localeCompare(b.user);
        case 'project':
          return a.project.localeCompare(b.project);
        default:
          return 0;
      }
    });
};

/**
 * Calculate audit statistics
 * @param {Array} audits - Audit data
 * @returns {Object} Audit statistics
 */
export const calculateAuditStatistics = (audits) => {
  const totalAudits = audits.length;
  const passedAudits = audits.filter(a => a.status === 'pass').length;
  const failedAudits = audits.filter(a => a.status === 'fail').length;
  
  const averageGrade = totalAudits > 0
    ? audits.reduce((sum, a) => sum + a.grade, 0) / totalAudits
    : 0;
    
  const successRate = totalAudits > 0 ? (passedAudits / totalAudits) * 100 : 0;

  return {
    totalAudits,
    passedAudits,
    failedAudits,
    averageGrade,
    successRate,
    formattedSuccessRate: formatPercentage(successRate),
    formattedFailureRate: formatPercentage(100 - successRate)
  };
};

/**
 * Process audit summary cards data
 * @param {Object} auditStats - Audit statistics
 * @param {number} auditRatio - Audit ratio
 * @returns {Array} Summary card configurations
 */
export const processAuditSummaryCards = (auditStats, auditRatio) => {
  return [
    {
      type: 'passed',
      icon: 'CheckCircle',
      iconColor: 'text-green-400',
      bgColor: 'bg-green-500/20',
      value: auditStats.passedAudits,
      label: 'Passed Audits',
      badge: {
        variant: 'success',
        value: auditStats.formattedSuccessRate
      }
    },
    {
      type: 'failed',
      icon: 'XCircle',
      iconColor: 'text-red-400',
      bgColor: 'bg-red-500/20',
      value: auditStats.failedAudits,
      label: 'Failed Audits',
      badge: {
        variant: 'error',
        value: auditStats.formattedFailureRate
      }
    },
    {
      type: 'average',
      icon: 'Trophy',
      iconColor: 'text-primary-400',
      bgColor: 'bg-primary-500/20',
      value: auditStats.averageGrade.toFixed(1),
      label: 'Average Grade',
      badge: {
        variant: 'primary',
        value: auditStats.averageGrade >= 1 ? 'Excellent' : 'Needs Work'
      }
    },
    {
      type: 'ratio',
      icon: 'Users',
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      value: auditRatio.toFixed(1),
      label: 'Audit Ratio',
      badge: {
        variant: auditRatio >= 1 ? 'success' : 'warning',
        value: auditRatio >= 1 ? 'Good' : 'Low'
      }
    }
  ];
};

/**
 * Process collaboration metrics
 * @param {Object} auditData - Audit data object
 * @param {Object} collaborationFrequency - Collaboration frequency data
 * @returns {Object} Processed collaboration metrics
 */
export const processCollaborationMetrics = (auditData, collaborationFrequency) => {
  const auditsGiven = auditData?.given?.total || 0;
  const auditsReceived = auditData?.received?.total || 0;
  const pattern = collaborationFrequency?.pattern || 'Unknown';
  const frequency = collaborationFrequency?.frequency || 0;

  return {
    auditsGiven,
    auditsReceived,
    pattern,
    frequency: frequency.toFixed(1),
    patternBadge: {
      variant: pattern === 'frequent' ? 'success' :
               pattern === 'regular' ? 'primary' : 'warning',
      value: `${frequency.toFixed(1)}/year`
    }
  };
};

/**
 * Process network influence metrics
 * @param {Object} networkMetrics - Network metrics data
 * @returns {Object} Processed network influence metrics
 */
export const processNetworkInfluenceMetrics = (networkMetrics) => {
  const collaborationScore = networkMetrics?.influenceScore || 0;
  const uniqueCollaborators = networkMetrics?.uniqueCollaborators || 0;
  const networkSize = networkMetrics?.networkSize || 'Small';

  return {
    collaborationScore,
    uniqueCollaborators,
    networkSize: networkSize.charAt(0).toUpperCase() + networkSize.slice(1),
    collaborationScoreBadge: {
      variant: collaborationScore >= 70 ? 'success' : 
               collaborationScore >= 40 ? 'primary' : 'warning',
      value: collaborationScore >= 70 ? 'High' : 
             collaborationScore >= 40 ? 'Medium' : 'Low'
    },
    networkSizeBadge: {
      variant: networkSize === 'large' ? 'success' :
               networkSize === 'medium' ? 'primary' : 'warning'
    }
  };
};

/**
 * Process complete audits section data
 * @param {Object} data - Raw data from useData hook
 * @param {Object} filters - Current filter state
 * @returns {Object} Processed audits section data
 */
export const processAuditsSectionData = (data, filters = {}) => {
  const {
    searchTerm = '',
    filterStatus = 'all',
    sortBy = 'date'
  } = filters;

  if (!data) {
    return {
      audits: [],
      filteredAudits: [],
      auditStats: calculateAuditStatistics([]),
      summaryCards: processAuditSummaryCards(calculateAuditStatistics([]), 0),
      collaborationMetrics: processCollaborationMetrics(null, null),
      networkInfluenceMetrics: processNetworkInfluenceMetrics(null),
      loading: true,
      hasData: false
    };
  }

  const {
    auditData,
    collaborationFrequency,
    networkMetrics,
    loading
  } = data;

  // Transform raw audit data
  const rawAudits = auditData?.audits || [];
  const audits = transformAuditData(rawAudits);

  // Filter and sort audits
  const filteredAudits = filterAndSortAudits(audits, searchTerm, filterStatus, sortBy);

  // Calculate statistics
  const auditStats = calculateAuditStatistics(audits);
  const auditRatio = auditData?.auditRatio || 0;

  // Process summary cards
  const summaryCards = processAuditSummaryCards(auditStats, auditRatio);

  // Process collaboration and network metrics
  const collaborationMetrics = processCollaborationMetrics(auditData, collaborationFrequency);
  const networkInfluenceMetrics = processNetworkInfluenceMetrics(networkMetrics);

  return {
    audits,
    filteredAudits,
    auditStats,
    summaryCards,
    collaborationMetrics,
    networkInfluenceMetrics,
    loading: loading || false,
    hasData: Boolean(audits.length > 0)
  };
};

/**
 * Get filter options for audit filtering
 * @returns {Object} Filter options
 */
export const getAuditFilterOptions = () => {
  return {
    statusOptions: [
      { value: 'all', label: 'All Audits' },
      { value: 'pass', label: 'Passed Only' },
      { value: 'fail', label: 'Failed Only' }
    ],
    sortOptions: [
      { value: 'date', label: 'Sort by Date' },
      { value: 'user', label: 'Sort by User' },
      { value: 'project', label: 'Sort by Project' }
    ]
  };
};
