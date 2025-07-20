// ============================================================================
// DATA PROCESSING UTILITIES - SIMPLIFIED
// Following reference patterns for data transformation and formatting
// ============================================================================

import { getXPProgress } from './dataFormatting.js';

// ============================================================================
// USER DATA PROCESSING
// ============================================================================

// Process user profile data
export const processUserProfile = (userData) => {
  if (!userData) return null;

  return {
    id: userData.id,
    login: userData.login,
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    fullName: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || userData.login,
    email: userData.email || '',
    campus: userData.campus || '',
    auditRatio: userData.auditRatio || 0,
    totalUp: userData.totalUp || 0,
    totalDown: userData.totalDown || 0,
    attrs: userData.attrs || {},
    profile: userData.profile || {},
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt,
  };
};

// ============================================================================
// XP AND LEVEL PROCESSING
// ============================================================================

// Process XP data for display
export const processXPData = (xpData) => {
  if (!xpData?.aggregate?.sum?.amount) return 0;
  return xpData.aggregate.sum.amount;
};

// Process level data
export const processLevelData = (levelData) => {
  if (!levelData) return { level: 0, eventId: null, campus: '' };
  
  return {
    level: levelData.level || 0,
    eventId: levelData.event?.id || null,
    campus: levelData.event?.campus || '',
  };
};

// Get rank title based on level (following reference pattern)
export const getRankTitle = (level) => {
  if (level < 10) return "Aspiring developer";
  if (level < 20) return "Beginner developer";
  if (level < 30) return "Apprentice developer";
  if (level < 40) return "Assistant developer";
  if (level < 50) return "Basic developer";
  if (level < 55) return "Junior developer";
  if (level < 60) return "Confirmed developer";
  return "Full-Stack developer";
};

// Get cohort number from event ID (following reference pattern)
export const getCohortNumber = (eventId) => {
  switch (eventId) {
    case 72:
      return 2;
    case 20:
      return 1;
    default:
      return 3;
  }
};

// ============================================================================
// SKILLS DATA PROCESSING
// ============================================================================

// Process skills data for charts (following reference pattern)
export const processSkillsData = (skillsData) => {
  if (!Array.isArray(skillsData)) return [];

  // Create skills map with highest amount for each skill
  const skillsMap = skillsData.reduce((acc, item) => {
    const skillName = item.type?.replace(/^skill_/, '') || item.name || 'Unknown';
    const amount = item.amount || item.totalXP || 0;
    // Use Math.max to keep the highest amount for each skill
    acc[skillName] = Math.max(acc[skillName] || 0, amount);
    return acc;
  }, {});

  // Convert to array and sort by amount (consistent with component processors)
  return Object.entries(skillsMap)
    .map(([name, totalXP]) => ({
      name,           // Primary property name for consistency
      totalXP,        // Use totalXP for consistency with schema adapters
      amount: totalXP // Keep amount for backward compatibility
    }))
    .sort((a, b) => b.totalXP - a.totalXP);
};

// ============================================================================
// AUDIT DATA PROCESSING - UPDATED FOR CORRECTED SCHEMA
// ============================================================================

// Process audit ratio data
export const processAuditRatio = (auditData) => {
  if (!auditData) return { ratio: 0, totalUp: 0, totalDown: 0 };

  return {
    ratio: auditData.auditRatio || 0,
    totalUp: auditData.totalUp || 0,
    totalDown: auditData.totalDown || 0,
  };
};

// Format audit ratio for display
export const formatAuditRatio = (ratio) => {
  return typeof ratio === 'number' ? ratio.toFixed(2) : "0.00";
};

// Process audit statistics for display (moved from JSX)
export const processAuditStatistics = (auditRatio, totalUp, totalDown) => {
  return {
    auditsGiven: Math.round((totalUp || 0) / 1000000) || 0, // Convert from micro-units to MB
    auditsReceived: Math.round((totalDown || 0) / 1000000) || 0, // Convert to MB
    auditRatioValue: auditRatio?.auditRatio || auditRatio || 0,
    auditRatioFormatted: `${(auditRatio?.auditRatio || auditRatio || 0).toFixed(1)} MB`
  };
};

// Process profile display data (moved from JSX)
export const processProfileDisplayData = (user, totalXP, level, passRate) => {
  const campus = user?.campus || 'Unknown Campus';
  const formattedCampus = campus.charAt(0).toUpperCase() + campus.slice(1).toLowerCase();

  return {
    userLevel: level || 0,
    projectPassRate: passRate || 0,
    levelProgress: getXPProgress(totalXP, level || 0),
    campus: formattedCampus,
    registrationDate: user?.createdAt,
  };
};

// Process audit list with statistics (moved from JSX)
export const processAuditListWithStats = (pendingAudits, completedAudits, auditRatio, totalUp, totalDown) => {
  const processedPending = processAuditList(pendingAudits || []);
  const processedCompleted = processAuditList(completedAudits || []);

  // Combine all audits for filtering and searching
  const allAudits = [
    ...processedPending.map(audit => ({ ...audit, status: 'pending' })),
    ...processedCompleted.map(audit => ({ ...audit, status: 'completed' }))
  ];

  // Calculate statistics
  const totalAudits = allAudits.length;
  const pendingCount = processedPending.length;
  const completedCount = processedCompleted.length;
  const passedCount = processedCompleted.filter(audit => (audit.grade || 0) >= 1).length;
  const failedCount = completedCount - passedCount;

  return {
    allAudits,
    processedPending,
    processedCompleted,
    stats: {
      total: totalAudits,
      pending: pendingCount,
      completed: completedCount,
      passed: passedCount,
      failed: failedCount,
      passRate: completedCount > 0 ? (passedCount / completedCount) * 100 : 0,
      auditRatio: auditRatio || 0,
      auditsGiven: Math.round((totalUp || 0) / 1000) || 0,
      auditsReceived: totalDown || 0
    }
  };
};

// Process audit list data (pending/completed)
export const processAuditList = (auditListData) => {
  if (!Array.isArray(auditListData)) return [];

  return auditListData.map(audit => ({
    id: audit.id,
    grade: audit.grade,
    createdAt: audit.createdAt,
    updatedAt: audit.updatedAt,
    endAt: audit.endAt,
    version: audit.version,
    auditor: {
      id: audit.auditor?.id,
      login: audit.auditor?.login,
      firstName: audit.auditor?.firstName,
      lastName: audit.auditor?.lastName,
      fullName: `${audit.auditor?.firstName || ''} ${audit.auditor?.lastName || ''}`.trim() || audit.auditor?.login,
      campus: audit.auditor?.campus,
    },
    group: {
      id: audit.group?.id,
      status: audit.group?.status,
      path: audit.group?.path,
      campus: audit.group?.campus,
      projectName: audit.group?.object?.name || audit.group?.path?.split('/').pop(),
      projectType: audit.group?.object?.type,
    },
    attrs: audit.attrs || {},
  }));
};

// ============================================================================
// PROJECT AND XP PROCESSING
// ============================================================================

// Process XP by project data for charts
export const processXPByProject = (xpProjectsData) => {
  if (!Array.isArray(xpProjectsData)) return [];

  return xpProjectsData.map(project => ({
    name: project.path.split('/').pop() || 'Unknown Project',
    path: project.path,
    totalXP: project.amount || 0, // Chart expects totalXP property
    amount: project.amount,
    createdAt: project.createdAt,
    objectName: project.object?.name || 'Unknown',
    objectType: project.object?.type || 'project',
  }));
};

// ============================================================================
// PROGRESS DATA PROCESSING
// ============================================================================

// Note: processProgressData functionality merged into processProgressWithUsers

// Calculate completion rate from progress data
export const calculateCompletionRate = (progressData) => {
  if (!Array.isArray(progressData) || progressData.length === 0) return 0;

  const completedCount = progressData.filter(p => p.isDone).length;
  return (completedCount / progressData.length) * 100;
};

// ============================================================================
// GROUP DATA PROCESSING - UPDATED FOR CORRECTED SCHEMA
// ============================================================================

// Process group data
export const processGroupData = (groupData) => {
  if (!Array.isArray(groupData)) return [];

  return groupData.map(group => ({
    id: group.id,
    path: group.path,
    status: group.status,
    campus: group.campus,
    projectName: group.object?.name || group.path?.split('/').pop(),
    projectType: group.object?.type || 'project',
    captain: {
      id: group.captain?.id,
      login: group.captain?.login,
      firstName: group.captain?.firstName,
      lastName: group.captain?.lastName,
      fullName: `${group.captain?.firstName || ''} ${group.captain?.lastName || ''}`.trim() || group.captain?.login,
    },
    event: {
      id: group.event?.id,
      path: group.event?.path,
      campus: group.event?.campus,
    },
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
    attrs: group.object?.attrs || {},
  }));
};

// ============================================================================
// USER STATISTICS PROCESSING
// ============================================================================

// Process user statistics aggregate data
export const processUserStatistics = (userStatsData) => {
  if (!userStatsData?.aggregate) return {
    totalUsers: 0,
    averageAuditRatio: 0,
    averageTotalUp: 0,
    averageTotalDown: 0,
    maxAuditRatio: 0,
    minAuditRatio: 0,
  };

  const { aggregate } = userStatsData;

  return {
    totalUsers: aggregate.count || 0,
    averageAuditRatio: aggregate.avg?.auditRatio || 0,
    averageTotalUp: aggregate.avg?.totalUp || 0,
    averageTotalDown: aggregate.avg?.totalDown || 0,
    maxAuditRatio: aggregate.max?.auditRatio || 0,
    minAuditRatio: aggregate.min?.auditRatio || 0,
    stddevAuditRatio: aggregate.stddev?.auditRatio || 0,
    maxCreatedAt: aggregate.max?.createdAt,
    minCreatedAt: aggregate.min?.createdAt,
  };
};

// ============================================================================
// TRANSACTION AGGREGATES PROCESSING
// ============================================================================

// Process top XP earners data
export const processTopXPEarners = (topXPData) => {
  if (!topXPData) return { users: [], aggregates: null };

  return {
    users: Array.isArray(topXPData.transaction) ? topXPData.transaction.map(tx => ({
      id: tx.id,
      type: tx.type,
      amount: tx.amount,
      createdAt: tx.createdAt,
      user: {
        id: tx.user?.id,
        login: tx.user?.login,
        firstName: tx.user?.firstName,
        lastName: tx.user?.lastName,
        fullName: `${tx.user?.firstName || ''} ${tx.user?.lastName || ''}`.trim() || tx.user?.login,
        campus: tx.user?.campus,
      },
      object: {
        id: tx.object?.id,
        name: tx.object?.name,
        type: tx.object?.type,
        attrs: tx.object?.attrs || {},
      },
    })) : [],
    aggregates: topXPData.transaction_aggregate?.aggregate || null,
  };
};

// ============================================================================
// RANKING DATA PROCESSING
// ============================================================================

// Process ranking data
export const processRankingData = (rankingData) => {
  if (!Array.isArray(rankingData)) return [];

  return rankingData
    .sort((a, b) => b.level - a.level)
    .map((user, index, array) => {
      let rank;
      if (index === 0) {
        rank = 1;
      } else {
        rank = user.level === array[index - 1].level ? 
          array[index - 1].rank : 
          index + 1;
      }
      
      return {
        ...user,
        rank,
        cohort: getCohortNumber(user.event.id),
      };
    });
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Safe JSON parsing
export const safeJsonParse = (jsonString, defaultValue = {}) => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return defaultValue;
  }
};

// Note: formatDate and formatDateTime moved to dataFormatting.js to avoid duplication

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Note: formatNumber moved to dataFormatting.js to avoid duplication

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// ============================================================================
// SEARCH AND FILTER PROCESSING (moved from JSX)
// ============================================================================

// Process search data for SearchSection
export const processSearchData = (activeGroups, pendingAudits, completedAudits, usersData) => {
  const projectResults = activeGroups || [];
  const auditResults = [...(pendingAudits || []), ...(completedAudits || [])];
  const userResults = usersData?.user || [];

  // Calculate status counts
  const projectStatusCounts = projectResults.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

  const auditStatusCounts = auditResults.reduce((acc, audit) => {
    const status = audit.resultId ? 'completed' : 'pending';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const userStatusCounts = { active: userResults.length };

  // Extract unique campuses
  const campuses = [...new Set([
    ...projectResults.map(p => p.campus).filter(Boolean),
    ...userResults.map(u => u.campus).filter(Boolean)
  ])];

  return {
    projectResults,
    auditResults,
    userResults,
    projectStatusCounts,
    auditStatusCounts,
    userStatusCounts,
    campuses
  };
};

// ============================================================================
// ENHANCED SEARCH FUNCTIONS (extracted from JSX components)
// ============================================================================

/**
 * Enhanced project search with multiple criteria
 * @param {Array} projects - Array of project objects
 * @param {string} searchTerm - Search term
 * @param {Array} statusFilter - Array of status filters
 * @param {string} campusFilter - Campus filter
 * @returns {Array} Filtered projects
 */
export const searchProjects = (projects, searchTerm = '', statusFilter = [], campusFilter = '') => {
  if (!Array.isArray(projects)) return [];

  let filtered = projects;

  // Apply search term filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(project =>
      project.path?.toLowerCase().includes(term) ||
      project.object?.name?.toLowerCase().includes(term) ||
      project.captain?.login?.toLowerCase().includes(term) ||
      project.description?.toLowerCase().includes(term)
    );
  }

  // Apply status filter
  if (statusFilter.length > 0) {
    filtered = filtered.filter(project =>
      statusFilter.includes(project.status)
    );
  }

  // Apply campus filter
  if (campusFilter && campusFilter !== 'all') {
    filtered = filtered.filter(project =>
      project.campus?.toLowerCase() === campusFilter.toLowerCase()
    );
  }

  return filtered;
};

/**
 * Enhanced audit search with multiple criteria
 * @param {Array} audits - Array of audit objects
 * @param {string} searchTerm - Search term
 * @param {Array} statusFilter - Array of status filters
 * @param {string} gradeFilter - Grade filter (pass/fail/all)
 * @returns {Array} Filtered audits
 */
export const searchAudits = (audits, searchTerm = '', statusFilter = [], gradeFilter = 'all') => {
  if (!Array.isArray(audits)) return [];

  let filtered = audits;

  // Apply search term filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(audit =>
      audit.group?.path?.toLowerCase().includes(term) ||
      audit.auditor?.login?.toLowerCase().includes(term) ||
      audit.auditee?.login?.toLowerCase().includes(term) ||
      audit.group?.object?.name?.toLowerCase().includes(term)
    );
  }

  // Apply status filter
  if (statusFilter.length > 0) {
    filtered = filtered.filter(audit =>
      statusFilter.includes(audit.status || (audit.grade !== null ? 'completed' : 'pending'))
    );
  }

  // Apply grade filter
  if (gradeFilter !== 'all') {
    filtered = filtered.filter(audit => {
      const grade = audit.grade || 0;
      if (gradeFilter === 'pass') return grade >= 1;
      if (gradeFilter === 'fail') return grade < 1;
      return true;
    });
  }

  return filtered;
};

/**
 * Enhanced user search with multiple criteria
 * @param {Array} users - Array of user objects
 * @param {string} searchTerm - Search term
 * @param {string} campusFilter - Campus filter
 * @param {string} levelFilter - Level filter
 * @returns {Array} Filtered users
 */
export const searchUsers = (users, searchTerm = '', campusFilter = '', levelFilter = '') => {
  if (!Array.isArray(users)) return [];

  let filtered = users;

  // Apply search term filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(user =>
      user.login?.toLowerCase().includes(term) ||
      user.firstName?.toLowerCase().includes(term) ||
      user.lastName?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term)
    );
  }

  // Apply campus filter
  if (campusFilter && campusFilter !== 'all') {
    filtered = filtered.filter(user =>
      user.campus?.toLowerCase() === campusFilter.toLowerCase()
    );
  }

  // Apply level filter
  if (levelFilter && levelFilter !== 'all') {
    const minLevel = parseInt(levelFilter);
    if (!isNaN(minLevel)) {
      filtered = filtered.filter(user => (user.level || 0) >= minLevel);
    }
  }

  return filtered;
};

// ============================================================================
// SORTING AND FILTERING UTILITIES (extracted from components)
// ============================================================================

/**
 * Sort data by multiple criteria
 * @param {Array} data - Array to sort
 * @param {string} sortBy - Sort field
 * @param {string} sortOrder - Sort order (asc/desc)
 * @returns {Array} Sorted array
 */
export const sortData = (data, sortBy, sortOrder = 'desc') => {
  if (!Array.isArray(data) || !sortBy) return data;

  return [...data].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    // Handle nested properties (e.g., 'user.name')
    if (sortBy.includes('.')) {
      const keys = sortBy.split('.');
      aVal = keys.reduce((obj, key) => obj?.[key], a);
      bVal = keys.reduce((obj, key) => obj?.[key], b);
    }

    // Handle null/undefined values
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return sortOrder === 'asc' ? -1 : 1;
    if (bVal == null) return sortOrder === 'asc' ? 1 : -1;

    // Handle different data types
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const comparison = aVal.toLowerCase().localeCompare(bVal.toLowerCase());
      return sortOrder === 'asc' ? comparison : -comparison;
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // Handle dates
    if (aVal instanceof Date && bVal instanceof Date) {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // Default string comparison
    const comparison = String(aVal).localeCompare(String(bVal));
    return sortOrder === 'asc' ? comparison : -comparison;
  });
};

/**
 * Filter data by multiple criteria
 * @param {Array} data - Array to filter
 * @param {Object} filters - Filter criteria object
 * @returns {Array} Filtered array
 */
export const filterData = (data, filters = {}) => {
  if (!Array.isArray(data) || !filters || Object.keys(filters).length === 0) {
    return data;
  }

  return data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === null || value === undefined || value === '' || value === 'all') {
        return true;
      }

      let itemValue = item[key];

      // Handle nested properties
      if (key.includes('.')) {
        const keys = key.split('.');
        itemValue = keys.reduce((obj, k) => obj?.[k], item);
      }

      // Handle array filters
      if (Array.isArray(value)) {
        return value.includes(itemValue);
      }

      // Handle string filters (case-insensitive)
      if (typeof value === 'string' && typeof itemValue === 'string') {
        return itemValue.toLowerCase().includes(value.toLowerCase());
      }

      // Handle exact matches
      return itemValue === value;
    });
  });
};

/**
 * Paginate data array
 * @param {Array} data - Array to paginate
 * @param {number} page - Current page (1-based)
 * @param {number} pageSize - Items per page
 * @returns {Object} Pagination result
 */
export const paginateData = (data, page = 1, pageSize = 10) => {
  if (!Array.isArray(data)) {
    return {
      items: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      hasNextPage: false,
      hasPrevPage: false
    };
  }

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    items: data.slice(startIndex, endIndex),
    totalItems,
    totalPages,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    startIndex: startIndex + 1,
    endIndex: Math.min(endIndex, totalItems)
  };
};

// Filter functions (moved from JSX)
export const filterProjectsByStatus = (projects, selectedStatus) => {
  if (selectedStatus === 'all') return projects;
  return projects.filter(project => project.status === selectedStatus);
};

export const filterAuditsByStatus = (audits, selectedStatus) => {
  if (selectedStatus === 'all') return audits;
  const status = selectedStatus === 'completed' ? 'completed' : 'pending';
  return audits.filter(audit =>
    status === 'completed' ? audit.resultId : !audit.resultId
  );
};

export const filterUsersByCampus = (users, selectedCampus) => {
  if (selectedCampus === '') return users;
  return users.filter(user => user.campus === selectedCampus);
};

// ============================================================================
// TIMELINE DATA PROCESSING
// ============================================================================

// Process XP timeline data for charts
export const processXPTimeline = (timelineData) => {
  if (!Array.isArray(timelineData)) return [];

  let cumulativeXP = 0;
  return timelineData.map(transaction => {
    cumulativeXP += transaction.amount || 0;
    return {
      date: transaction.createdAt,
      amount: transaction.amount || 0,
      cumulativeXP,
      project: transaction.object?.name || transaction.path?.split('/').pop() || 'Unknown',
      path: transaction.path,
    };
  });
};

// Process audit timeline data
export const processAuditTimeline = (timelineData) => {
  if (!Array.isArray(timelineData)) return [];

  return timelineData.map(transaction => ({
    date: transaction.createdAt,
    type: transaction.type, // 'up' or 'down'
    amount: transaction.amount || 0,
    path: transaction.path,
  }));
};

// Process project results for success/failure analysis
export const processProjectResults = (resultsData) => {
  if (!Array.isArray(resultsData)) return {
    totalProjects: 0,
    passedProjects: 0,
    failedProjects: 0,
    passRate: 0,
    results: []
  };

  const results = resultsData.map(result => ({
    id: result.id,
    name: result.object?.name || 'Unknown Project',
    type: result.object?.type || result.type,
    grade: result.grade || 0,
    passed: (result.grade || 0) >= 1,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  }));

  const passedProjects = results.filter(r => r.passed).length;
  const totalProjects = results.length;
  const failedProjects = totalProjects - passedProjects;
  const passRate = totalProjects > 0 ? (passedProjects / totalProjects) * 100 : 0;

  return {
    totalProjects,
    passedProjects,
    failedProjects,
    passRate,
    results,
  };
};

// ============================================================================
// ROLE DATA PROCESSING
// ============================================================================

// Process roles data
export const processRolesData = (rolesData) => {
  if (!Array.isArray(rolesData)) return [];

  return rolesData.map(role => ({
    type: role.type,
    name: role.type.replace(/^role_/, '').replace(/_/g, ' '),
    amount: role.amount || 0,
    createdAt: role.createdAt,
    object: {
      name: role.object?.name,
      type: role.object?.type,
    },
  }));
};

// Process role statistics
export const processRoleStatistics = (roleStatsData) => {
  if (!roleStatsData) return { aggregates: null, roles: [] };

  return {
    aggregates: roleStatsData.transaction_aggregate?.aggregate || null,
    roles: Array.isArray(roleStatsData.transaction) ? roleStatsData.transaction.map(role => ({
      type: role.type,
      name: role.type.replace(/^role_/, '').replace(/_/g, ' '),
      amount: role.amount || 0,
    })) : [],
  };
};

// ============================================================================
// OBJECT DATA PROCESSING
// ============================================================================

// Process objects data
export const processObjectsData = (objectsData) => {
  if (!Array.isArray(objectsData)) return [];

  return objectsData.map(obj => ({
    id: obj.id,
    name: obj.name,
    type: obj.type,
    attrs: obj.attrs || {},
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  }));
};

// ============================================================================
// ENHANCED PROGRESS DATA PROCESSING
// ============================================================================

// Process progress data with user information (enhanced version)
export const processProgressWithUsers = (progressData) => {
  if (!Array.isArray(progressData)) return [];

  return progressData.map(progress => ({
    id: progress.id,
    grade: progress.grade,
    isDone: progress.isDone,
    path: progress.path,
    projectName: progress.object?.name || progress.path?.split('/').pop(),
    projectType: progress.object?.type || 'unknown',
    user: {
      id: progress.user?.id,
      login: progress.user?.login,
      firstName: progress.user?.firstName,
      lastName: progress.user?.lastName,
      fullName: `${progress.user?.firstName || ''} ${progress.user?.lastName || ''}`.trim() || progress.user?.login,
    },
    createdAt: progress.createdAt,
    updatedAt: progress.updatedAt,
  }));
};

// ============================================================================
// ENHANCED RESULT DATA PROCESSING
// ============================================================================

// Process results data with user information
export const processResultsWithUsers = (resultsData) => {
  if (!Array.isArray(resultsData)) return [];

  return resultsData.map(result => ({
    id: result.id,
    grade: result.grade || 0,
    type: result.type,
    path: result.path,
    passed: (result.grade || 0) >= 1,
    projectName: result.object?.name || result.path?.split('/').pop() || 'Unknown',
    projectType: result.object?.type || result.type,
    user: {
      id: result.user?.id,
      login: result.user?.login,
      firstName: result.user?.firstName,
      lastName: result.user?.lastName,
      fullName: `${result.user?.firstName || ''} ${result.user?.lastName || ''}`.trim() || result.user?.login,
    },
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  }));
};

// ============================================================================
// ENHANCED UTILITY FUNCTIONS FOR COMPONENT PROCESSORS
// ============================================================================

/**
 * Enhanced data validation with detailed error reporting
 * @param {any} data - Data to validate
 * @param {Object} schema - Validation schema
 * @returns {Object} Validation result with errors
 */
export const validateDataWithErrors = (data, schema) => {
  const errors = [];
  const warnings = [];

  if (!data) {
    errors.push('Data is null or undefined');
    return { isValid: false, errors, warnings, data: null };
  }

  // Type validation
  if (schema.type && typeof data !== schema.type) {
    errors.push(`Expected type ${schema.type}, got ${typeof data}`);
  }

  // Required fields validation
  if (schema.required && Array.isArray(schema.required)) {
    schema.required.forEach(field => {
      if (!(field in data) || data[field] == null) {
        errors.push(`Required field '${field}' is missing`);
      }
    });
  }

  // Array validation
  if (schema.type === 'array' && Array.isArray(data)) {
    if (schema.minLength && data.length < schema.minLength) {
      warnings.push(`Array length ${data.length} is below minimum ${schema.minLength}`);
    }
    if (schema.maxLength && data.length > schema.maxLength) {
      warnings.push(`Array length ${data.length} exceeds maximum ${schema.maxLength}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    data: errors.length === 0 ? data : null
  };
};

/**
 * Deep merge objects with array handling
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} Merged object
 */
export const deepMerge = (target, source) => {
  if (!target || !source) return target || source || {};

  const result = { ...target };

  Object.keys(source).forEach(key => {
    if (Array.isArray(source[key])) {
      result[key] = [...(source[key] || [])];
    } else if (source[key] && typeof source[key] === 'object') {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  });

  return result;
};

/**
 * Batch process data with progress tracking
 * @param {Array} data - Data array to process
 * @param {Function} processor - Processing function
 * @param {Object} options - Processing options
 * @returns {Promise<Object>} Processing result with progress
 */
export const batchProcess = async (data, processor, options = {}) => {
  const { batchSize = 100, onProgress } = options;

  if (!Array.isArray(data)) {
    throw new Error('Data must be an array');
  }

  const results = [];
  const errors = [];
  const total = data.length;

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);

    try {
      const batchResults = await Promise.all(
        batch.map(async (item, index) => {
          try {
            return await processor(item, i + index);
          } catch (error) {
            errors.push({ index: i + index, error: error.message });
            return null;
          }
        })
      );

      results.push(...batchResults.filter(result => result !== null));

      if (onProgress) {
        onProgress({
          processed: Math.min(i + batchSize, total),
          total,
          percentage: Math.round((Math.min(i + batchSize, total) / total) * 100)
        });
      }
    } catch (error) {
      errors.push({ batch: i / batchSize, error: error.message });
    }
  }

  return {
    results,
    errors,
    total,
    processed: results.length,
    success: errors.length === 0
  };
};

/**
 * Create data transformation pipeline
 * @param {Array} transformers - Array of transformation functions
 * @returns {Function} Pipeline function
 */
export const createPipeline = (transformers) => {
  return (data) => {
    return transformers.reduce((result, transformer) => {
      try {
        return transformer(result);
      } catch (error) {
        console.error('Pipeline transformation error:', error);
        return result;
      }
    }, data);
  };
};

/**
 * Memoize function results with TTL support
 * @param {Function} fn - Function to memoize
 * @param {number} ttl - Time to live in milliseconds
 * @returns {Function} Memoized function
 */
export const memoizeWithTTL = (fn, ttl = 60000) => {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }

    const result = fn(...args);
    cache.set(key, { value: result, timestamp: Date.now() });

    // Clean up expired entries
    if (cache.size > 100) {
      const now = Date.now();
      for (const [k, v] of cache.entries()) {
        if (now - v.timestamp >= ttl) {
          cache.delete(k);
        }
      }
    }

    return result;
  };
};
