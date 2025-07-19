/**
 * Audit Schema Adapter
 * Normalizes audit data from GraphQL to consistent internal format
 * Handles different audit data structures and provides fallbacks
 */

/**
 * Normalize single audit data from GraphQL response
 * @param {Object} rawAudit - Raw audit data from GraphQL
 * @returns {Object} Normalized audit data
 */
export const normalizeAuditData = (rawAudit) => {
  if (!rawAudit) {
    return {
      id: null,
      grade: 0,
      status: 'unknown',
      createdAt: null,
      updatedAt: null,
      auditor: null,
      auditee: null,
      group: null,
      object: null,
      isPassed: false,
      isFailed: false
    };
  }

  const grade = parseFloat(rawAudit.grade) || 0;
  
  return {
    id: rawAudit.id || null,
    grade: grade,
    status: determineAuditStatus(grade),
    createdAt: rawAudit.createdAt || null,
    updatedAt: rawAudit.updatedAt || null,
    auditor: rawAudit.auditor || null,
    auditee: rawAudit.auditee || null,
    group: rawAudit.group || null,
    object: rawAudit.object || null,
    isPassed: grade >= 1,
    isFailed: grade < 1
  };
};

/**
 * Determine audit status based on grade
 * @param {number} grade - Audit grade
 * @returns {string} Status string
 */
export const determineAuditStatus = (grade) => {
  if (grade >= 1) return 'passed';
  if (grade > 0) return 'partial';
  return 'failed';
};

/**
 * Normalize audit ratio data
 * @param {Object|number} rawAuditRatio - Raw audit ratio data
 * @returns {Object} Normalized audit ratio data
 */
export const normalizeAuditRatio = (rawAuditRatio) => {
  if (typeof rawAuditRatio === 'number') {
    return {
      ratio: rawAuditRatio,
      formatted: rawAuditRatio.toFixed(2)
    };
  }

  if (rawAuditRatio && typeof rawAuditRatio === 'object') {
    const ratio = rawAuditRatio.auditRatio || rawAuditRatio.ratio || 0;
    return {
      ratio: ratio,
      formatted: ratio.toFixed(2)
    };
  }

  return {
    ratio: 0,
    formatted: '0.00'
  };
};

/**
 * Normalize multiple audits data
 * @param {Array} rawAudits - Array of raw audit data from GraphQL
 * @returns {Array} Array of normalized audit data
 */
export const normalizeAuditsData = (rawAudits) => {
  if (!Array.isArray(rawAudits)) return [];
  return rawAudits.map(normalizeAuditData);
};

/**
 * Extract audit statistics from audit data
 * @param {Array} audits - Array of normalized audit data
 * @returns {Object} Audit statistics
 */
export const extractAuditStatistics = (audits) => {
  if (!Array.isArray(audits) || audits.length === 0) {
    return {
      total: 0,
      passed: 0,
      failed: 0,
      partial: 0,
      passRate: 0,
      failRate: 0,
      averageGrade: 0
    };
  }

  const total = audits.length;
  const passed = audits.filter(audit => audit.isPassed).length;
  const failed = audits.filter(audit => audit.isFailed).length;
  const partial = audits.filter(audit => audit.status === 'partial').length;
  
  const totalGrade = audits.reduce((sum, audit) => sum + audit.grade, 0);
  const averageGrade = totalGrade / total;

  return {
    total,
    passed,
    failed,
    partial,
    passRate: (passed / total) * 100,
    failRate: (failed / total) * 100,
    averageGrade: averageGrade
  };
};

/**
 * Group audits by status
 * @param {Array} audits - Array of normalized audit data
 * @returns {Object} Audits grouped by status
 */
export const groupAuditsByStatus = (audits) => {
  if (!Array.isArray(audits)) return { passed: [], failed: [], partial: [] };

  return audits.reduce((groups, audit) => {
    groups[audit.status].push(audit);
    return groups;
  }, { passed: [], failed: [], partial: [] });
};

/**
 * Group audits by date (day, week, month)
 * @param {Array} audits - Array of normalized audit data
 * @param {string} period - Grouping period ('day', 'week', 'month')
 * @returns {Object} Audits grouped by date
 */
export const groupAuditsByDate = (audits, period = 'day') => {
  if (!Array.isArray(audits)) return {};

  return audits.reduce((groups, audit) => {
    if (!audit.createdAt) return groups;

    const date = new Date(audit.createdAt);
    let key;

    switch (period) {
      case 'day':
        key = date.toDateString();
        break;
      case 'week': {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toDateString();
        break;
      }
      case 'month':
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        break;
      default:
        key = date.toDateString();
    }

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(audit);
    return groups;
  }, {});
};

/**
 * Filter audits by date range
 * @param {Array} audits - Array of normalized audit data
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Array} Filtered audits
 */
export const filterAuditsByDateRange = (audits, startDate, endDate) => {
  if (!Array.isArray(audits)) return [];
  if (!startDate && !endDate) return audits;

  return audits.filter(audit => {
    if (!audit.createdAt) return false;
    
    const auditDate = new Date(audit.createdAt);
    
    if (startDate && auditDate < startDate) return false;
    if (endDate && auditDate > endDate) return false;
    
    return true;
  });
};

/**
 * Filter audits by grade range
 * @param {Array} audits - Array of normalized audit data
 * @param {number} minGrade - Minimum grade
 * @param {number} maxGrade - Maximum grade
 * @returns {Array} Filtered audits
 */
export const filterAuditsByGrade = (audits, minGrade = 0, maxGrade = Infinity) => {
  if (!Array.isArray(audits)) return [];

  return audits.filter(audit => {
    return audit.grade >= minGrade && audit.grade <= maxGrade;
  });
};

/**
 * Sort audits by various criteria
 * @param {Array} audits - Array of normalized audit data
 * @param {string} sortBy - Sort criteria ('date', 'grade', 'status')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted audits array
 */
export const sortAudits = (audits, sortBy = 'date', order = 'desc') => {
  if (!Array.isArray(audits)) return [];

  const sortedAudits = [...audits].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'date':
        aValue = new Date(a.createdAt || 0);
        bValue = new Date(b.createdAt || 0);
        break;
      case 'grade':
        aValue = a.grade || 0;
        bValue = b.grade || 0;
        break;
      case 'status':
        aValue = a.status || '';
        bValue = b.status || '';
        break;
      default:
        aValue = new Date(a.createdAt || 0);
        bValue = new Date(b.createdAt || 0);
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sortedAudits;
};

/**
 * Get recent audits
 * @param {Array} audits - Array of normalized audit data
 * @param {number} limit - Number of recent audits to return
 * @returns {Array} Recent audits
 */
export const getRecentAudits = (audits, limit = 10) => {
  if (!Array.isArray(audits)) return [];
  
  return sortAudits(audits, 'date', 'desc').slice(0, limit);
};

/**
 * Calculate audit trends over time
 * @param {Array} audits - Array of normalized audit data
 * @param {string} period - Period for trend calculation ('day', 'week', 'month')
 * @returns {Array} Trend data
 */
export const calculateAuditTrends = (audits, period = 'week') => {
  const groupedAudits = groupAuditsByDate(audits, period);
  
  return Object.entries(groupedAudits)
    .map(([date, auditsInPeriod]) => ({
      date,
      count: auditsInPeriod.length,
      passRate: (auditsInPeriod.filter(a => a.isPassed).length / auditsInPeriod.length) * 100,
      averageGrade: auditsInPeriod.reduce((sum, a) => sum + a.grade, 0) / auditsInPeriod.length
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * Extract audit object information
 * @param {Object} audit - Normalized audit data
 * @returns {Object} Object information
 */
export const extractAuditObjectInfo = (audit) => {
  if (!audit || !audit.object) {
    return {
      name: 'Unknown',
      type: 'unknown',
      id: null
    };
  }

  return {
    name: audit.object.name || 'Unknown',
    type: audit.object.type || 'unknown',
    id: audit.object.id || null
  };
};

/**
 * Check if audit is recent (within specified days)
 * @param {Object} audit - Normalized audit data
 * @param {number} days - Number of days to consider as recent
 * @returns {boolean} True if audit is recent
 */
export const isRecentAudit = (audit, days = 7) => {
  if (!audit || !audit.createdAt) return false;
  
  const auditDate = new Date(audit.createdAt);
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return auditDate >= cutoffDate;
};
