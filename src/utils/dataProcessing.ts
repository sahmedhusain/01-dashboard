// ============================================================================
// DATA PROCESSING UTILITIES - PROFESSIONAL DASHBOARD
// Comprehensive data transformation and analytics processing
// Following GraphQL objectives and reference patterns
// ============================================================================

import { getXPProgress } from './dataFormatting';

// ============================================================================
// USER DATA PROCESSING
// ============================================================================

// Process user profile data
export const processUserProfile = (userData: any) => {
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
export const processXPData = (xpData: any) => {
  if (!xpData?.aggregate?.sum?.amount) return 0;
  return xpData.aggregate.sum.amount;
};

// Process level data
export const processLevelData = (levelData: any) => {
  if (!levelData) return { level: 0, eventId: null, campus: '' };
  
  return {
    level: levelData.level || 0,
    eventId: levelData.event?.id || null,
    campus: levelData.event?.campus || '',
  };
};

// Get rank title based on level (following reference pattern)
export const getRankTitle = (level: any) => {
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
export const getCohortNumber = (eventId: any) => {
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
export const processSkillsData = (skillsData: any): Array<{id: string, name: string, type: string, amount: number}> => {
  if (!Array.isArray(skillsData)) return [];

  // Create skills map with highest amount for each skill
  const skillsMap = skillsData.reduce((acc, item) => {
    const skillName = item.type?.replace(/^skill_/, '') || item.name || 'Unknown';
    const skillType = item.type || 'skill_unknown';
    const amount = item.amount || item.totalXP || 0;
    const skillId = item.id || `skill_${skillName.toLowerCase().replace(/\s+/g, '_')}`;

    // Use Math.max to keep the highest amount for each skill
    if (!acc[skillName] || acc[skillName].amount < amount) {
      acc[skillName] = {
        id: skillId,
        name: skillName,
        type: skillType,
        amount: amount
      };
    }
    return acc;
  }, {});

  // Convert to array and sort by amount (consistent with component processors)
  return Object.values(skillsMap)
    .sort((a: any, b: any) => b.amount - a.amount);
};

// ============================================================================
// AUDIT DATA PROCESSING - UPDATED FOR CORRECTED SCHEMA
// ============================================================================

// Process audit ratio data
export const processAuditRatio = (auditData: any) => {
  if (!auditData) return { ratio: 0, totalUp: 0, totalDown: 0 };

  return {
    ratio: auditData.auditRatio || 0,
    totalUp: auditData.totalUp || 0,
    totalDown: auditData.totalDown || 0,
  };
};

// Note: formatAuditRatio moved to dataFormatting.ts for consistency

// Process audit statistics for display (moved from JSX)
export const processAuditStatistics = (auditRatio: any, totalUp: any, totalDown: any) => {
  return {
    auditsGiven: Math.round(totalUp || 0), // Keep original values
    auditsReceived: Math.round(totalDown || 0), // Keep original values
    auditRatioValue: auditRatio?.auditRatio || auditRatio || 0,
    auditRatioFormatted: (auditRatio?.auditRatio || auditRatio || 0).toFixed(1)
  };
};

// Process profile display data (moved from JSX)
export const processProfileDisplayData = (user: any, totalXP: any, level: any, passRate: any) => {
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
export const processAuditListWithStats = (pendingAudits: any, completedAudits: any, auditRatio: any, totalUp: any, totalDown: any) => {
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
export const processAuditList = (auditListData: any) => {
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
export const processXPByProject = (xpProjectsData: any) => {
  if (!Array.isArray(xpProjectsData)) return [];

  return xpProjectsData.map(project => ({
    id: project.id || `project_${project.path?.replace(/[^a-zA-Z0-9]/g, '_')}` || `project_${Date.now()}`,
    name: project.path?.split('/').pop() || project.object?.name || 'Unknown Project',
    amount: project.amount || 0,
    createdAt: project.createdAt || new Date().toISOString(),
    // Additional properties for compatibility
    path: project.path,
    totalXP: project.amount || 0, // Chart expects totalXP property
    objectName: project.object?.name || 'Unknown',
    objectType: project.object?.type || 'project',
  }));
};

// ============================================================================
// PROGRESS DATA PROCESSING
// ============================================================================

// Note: processProgressData functionality merged into processProgressWithUsers

// Calculate completion rate from progress data
export const calculateCompletionRate = (progressData: any) => {
  if (!Array.isArray(progressData) || progressData.length === 0) return 0;

  const completedCount = progressData.filter(p => p.isDone).length;
  return (completedCount / progressData.length) * 100;
};

// ============================================================================
// GROUP DATA PROCESSING - UPDATED FOR CORRECTED SCHEMA
// ============================================================================

// Process group data
export const processGroupData = (groupData: any) => {
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
export const processUserStatistics = (userStatsData: any) => {
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

// ============================================================================
// ADVANCED ANALYTICS AND STATISTICS PROCESSING
// ============================================================================

/**
 * Calculate comprehensive user statistics for professional dashboard
 * @param {Object} userData - Complete user data from GraphQL
 * @returns {Object} Processed analytics data
 */
export const processUserAnalytics = (userData) => {
  if (!userData) return null;

  const {
    user,
    totalXP = 0,
    level = 0,
    skills = [],
    projectResults = [],
    auditData = {},
    xpTimeline = [],
    progressData = []
  } = userData;

  // Calculate project success metrics
  const projectStats = calculateProjectStatistics(projectResults);

  // Calculate skill proficiency metrics
  const skillMetrics = calculateSkillMetrics(skills, totalXP);

  // Calculate learning velocity and progress trends
  const progressMetrics = calculateProgressMetrics(xpTimeline, progressData);

  // Calculate peer comparison metrics
  const comparisonMetrics = calculateComparisonMetrics(level, totalXP, auditData);

  return {
    overview: {
      totalXP,
      level,
      rank: getRankTitle(level),
      cohort: getCohortNumber(userData.eventId),
      campus: user?.campus || 'Unknown'
    },
    projectStats,
    skillMetrics,
    progressMetrics,
    comparisonMetrics,
    auditPerformance: processAuditPerformance(auditData),
    learningPath: calculateLearningPath(skills, projectResults)
  };
};

/**
 * Calculate detailed project statistics
 * @param {Array} projectResults - Array of project results
 * @returns {Object} Project statistics
 */
export const calculateProjectStatistics = (projectResults = []) => {
  const passed = projectResults.filter(p => p.grade >= 1).length;
  const failed = projectResults.filter(p => p.grade < 1).length;
  const total = projectResults.length;
  const successRate = total > 0 ? (passed / total) * 100 : 0;

  // Calculate difficulty distribution
  const difficultyStats = projectResults.reduce((acc, project) => {
    const difficulty = project.object?.attrs?.difficulty || 'unknown';
    acc[difficulty] = (acc[difficulty] || 0) + 1;
    return acc;
  }, {});

  // Calculate recent performance (last 10 projects)
  const recentProjects = projectResults.slice(-10);
  const recentSuccessRate = recentProjects.length > 0
    ? (recentProjects.filter(p => p.grade >= 1).length / recentProjects.length) * 100
    : 0;

  return {
    total,
    passed,
    failed,
    successRate: Math.round(successRate),
    recentSuccessRate: Math.round(recentSuccessRate),
    difficultyStats,
    averageGrade: total > 0 ? projectResults.reduce((sum, p) => sum + p.grade, 0) / total : 0,
    streak: calculateProjectStreak(projectResults)
  };
};

/**
 * Calculate skill proficiency metrics
 * @param {Array} skills - Array of skill data
 * @param {number} totalXP - Total XP for percentage calculations
 * @returns {Object} Skill metrics
 */
export const calculateSkillMetrics = (skills = [], totalXP = 0) => {
  if (skills.length === 0) return { topSkills: [], distribution: {}, proficiencyLevel: 'Beginner' };

  // Sort skills by amount and get top skills
  const sortedSkills = skills
    .map(skill => ({
      ...skill,
      percentage: totalXP > 0 ? Math.round((skill.amount / totalXP) * 100) : 0,
      proficiency: calculateProficiencyLevel(skill.amount)
    }))
    .sort((a, b) => b.amount - a.amount);

  const topSkills = sortedSkills.slice(0, 10);

  // Calculate skill distribution by category
  const distribution = categorizeSkills(skills);

  // Calculate overall proficiency level
  const averageSkillLevel = skills.reduce((sum, skill) => sum + skill.amount, 0) / skills.length;
  const overallProficiency = calculateProficiencyLevel(averageSkillLevel);

  return {
    topSkills,
    distribution,
    proficiencyLevel: overallProficiency,
    totalSkills: skills.length,
    averageSkillLevel: Math.round(averageSkillLevel),
    skillGrowth: calculateSkillGrowth(skills)
  };
};

/**
 * Calculate learning progress and velocity metrics
 * @param {Array} xpTimeline - XP timeline data
 * @param {Array} progressData - Progress tracking data
 * @returns {Object} Progress metrics
 */
export const calculateProgressMetrics = (xpTimeline = [], progressData = []) => {
  if (xpTimeline.length === 0) return { velocity: 0, trend: 'stable', milestones: [] };

  // Calculate learning velocity (XP per week)
  const velocity = calculateLearningVelocity(xpTimeline);

  // Calculate progress trend
  const trend = calculateProgressTrend(xpTimeline);

  // Identify learning milestones
  const milestones = identifyMilestones(xpTimeline, progressData);

  // Calculate consistency score
  const consistency = calculateConsistencyScore(xpTimeline);

  return {
    velocity,
    trend,
    milestones,
    consistency,
    totalDays: calculateActiveDays(xpTimeline),
    averageDaily: velocity / 7,
    peakPerformance: findPeakPerformancePeriod(xpTimeline)
  };
};

/**
 * Calculate comparison metrics with peers
 * @param {number} level - User level
 * @param {number} totalXP - User total XP
 * @param {Object} auditData - Audit performance data
 * @returns {Object} Comparison metrics
 */
export const calculateComparisonMetrics = (level = 0, totalXP = 0, auditData = {}) => {
  // These would typically come from additional GraphQL queries
  // For now, we'll calculate relative performance indicators

  const levelPercentile = calculateLevelPercentile(level);
  const xpPercentile = calculateXPPercentile(totalXP);
  const auditPercentile = calculateAuditPercentile(auditData.auditRatio || 0);

  return {
    levelRank: levelPercentile,
    xpRank: xpPercentile,
    auditRank: auditPercentile,
    overallRank: Math.round((levelPercentile + xpPercentile + auditPercentile) / 3),
    strengths: identifyStrengths(level, totalXP, auditData),
    improvementAreas: identifyImprovementAreas(level, totalXP, auditData)
  };
};

/**
 * Process audit performance data
 * @param {Object} auditData - Raw audit data
 * @returns {Object} Processed audit performance
 */
export const processAuditPerformance = (auditData = {}) => {
  const { auditRatio = 0, totalUp = 0, totalDown = 0 } = auditData;

  const auditBalance = totalUp - totalDown;
  const auditActivity = totalUp + totalDown;
  const auditEfficiency = auditActivity > 0 ? (totalUp / auditActivity) * 100 : 0;

  return {
    ratio: auditRatio,
    balance: auditBalance,
    activity: auditActivity,
    efficiency: Math.round(auditEfficiency),
    given: totalUp,
    received: totalDown,
    status: getAuditStatus(auditRatio),
    recommendation: getAuditRecommendation(auditRatio, auditBalance)
  };
};

/**
 * Calculate learning path and recommendations
 * @param {Array} skills - User skills
 * @param {Array} projectResults - Project results
 * @returns {Object} Learning path data
 */
export const calculateLearningPath = (skills = [], projectResults = []) => {
  const skillGaps = identifySkillGaps(skills);
  const nextProjects = recommendNextProjects(skills, projectResults);
  const learningGoals = generateLearningGoals(skills, projectResults);

  return {
    skillGaps,
    nextProjects,
    learningGoals,
    focusAreas: identifyFocusAreas(skills, projectResults),
    estimatedCompletion: estimateCompletionTime(skills, projectResults)
  };
};

// ============================================================================
// HELPER FUNCTIONS FOR ANALYTICS
// ============================================================================

/**
 * Calculate project success streak
 * @param {Array} projectResults - Project results
 * @returns {number} Current success streak
 */
export const calculateProjectStreak = (projectResults = []) => {
  let streak = 0;
  for (let i = projectResults.length - 1; i >= 0; i--) {
    if (projectResults[i].grade >= 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};

/**
 * Categorize skills by type
 * @param {Array} skills - Skills array
 * @returns {Object} Categorized skills
 */
export const categorizeSkills = (skills = []) => {
  const categories = {
    programming: [],
    frontend: [],
    backend: [],
    tools: [],
    other: []
  };

  skills.forEach(skill => {
    const skillType = skill.type.toLowerCase();
    if (skillType.includes('prog') || skillType.includes('algo')) {
      categories.programming.push(skill);
    } else if (skillType.includes('front') || skillType.includes('html') || skillType.includes('css') || skillType.includes('js')) {
      categories.frontend.push(skill);
    } else if (skillType.includes('back') || skillType.includes('sql') || skillType.includes('tcp')) {
      categories.backend.push(skill);
    } else if (skillType.includes('git') || skillType.includes('unix') || skillType.includes('docker')) {
      categories.tools.push(skill);
    } else {
      categories.other.push(skill);
    }
  });

  return categories;
};

/**
 * Calculate skill growth rate
 * @param {Array} skills - Skills array
 * @returns {number} Growth rate percentage
 */
export const calculateSkillGrowth = (skills = []) => {
  if (skills.length === 0) return 0;

  // This would ideally compare with historical data
  // For now, we'll calculate based on skill diversity and levels
  const averageSkillLevel = skills.reduce((sum, skill) => sum + skill.amount, 0) / skills.length;
  const skillDiversity = skills.length;

  // Simple growth calculation based on diversity and average level
  return Math.min(100, Math.round((skillDiversity * 2) + (averageSkillLevel / 100)));
};

/**
 * Calculate learning velocity (XP per week)
 * @param {Array} xpTimeline - XP timeline data
 * @returns {number} XP per week
 */
export const calculateLearningVelocity = (xpTimeline = []) => {
  if (xpTimeline.length < 2) return 0;

  const firstEntry = new Date(xpTimeline[0].createdAt);
  const lastEntry = new Date(xpTimeline[xpTimeline.length - 1].createdAt);
  const totalDays = (lastEntry - firstEntry) / (1000 * 60 * 60 * 24);
  const totalXP = xpTimeline.reduce((sum, entry) => sum + entry.amount, 0);

  if (totalDays === 0) return 0;
  return Math.round((totalXP / totalDays) * 7); // XP per week
};

/**
 * Calculate progress trend
 * @param {Array} xpTimeline - XP timeline data
 * @returns {string} Trend direction
 */
export const calculateProgressTrend = (xpTimeline = []) => {
  if (xpTimeline.length < 3) return 'stable';

  const recent = xpTimeline.slice(-7); // Last 7 entries
  const earlier = xpTimeline.slice(-14, -7); // Previous 7 entries

  if (recent.length === 0 || earlier.length === 0) return 'stable';

  const recentAvg = recent.reduce((sum, entry) => sum + entry.amount, 0) / recent.length;
  const earlierAvg = earlier.reduce((sum, entry) => sum + entry.amount, 0) / earlier.length;

  const change = ((recentAvg - earlierAvg) / earlierAvg) * 100;

  if (change > 10) return 'improving';
  if (change < -10) return 'declining';
  return 'stable';
};

/**
 * Identify learning milestones
 * @param {Array} xpTimeline - XP timeline data
 * @param {Array} progressData - Progress data
 * @returns {Array} Milestone events
 */
export const identifyMilestones = (xpTimeline = [], _progressData = []) => {
  const milestones = [];

  // XP milestones (every 10,000 XP)
  let cumulativeXP = 0;
  let lastMilestone = 0;

  xpTimeline.forEach(entry => {
    cumulativeXP += entry.amount;
    const currentMilestone = Math.floor(cumulativeXP / 10000) * 10000;

    if (currentMilestone > lastMilestone) {
      milestones.push({
        type: 'xp',
        value: currentMilestone,
        date: entry.createdAt,
        description: `Reached ${currentMilestone / 1000}K XP`
      });
      lastMilestone = currentMilestone;
    }
  });

  return milestones.slice(-5); // Return last 5 milestones
};

/**
 * Calculate consistency score
 * @param {Array} xpTimeline - XP timeline data
 * @returns {number} Consistency score (0-100)
 */
export const calculateConsistencyScore = (xpTimeline = []) => {
  if (xpTimeline.length < 7) return 0;

  // Group by day and calculate daily XP
  const dailyXP = {};
  xpTimeline.forEach(entry => {
    const date = new Date(entry.createdAt).toDateString();
    dailyXP[date] = (dailyXP[date] || 0) + entry.amount;
  });

  const dailyValues = Object.values(dailyXP);
  const average = dailyValues.reduce((sum, val) => sum + val, 0) / dailyValues.length;

  // Calculate standard deviation
  const variance = dailyValues.reduce((sum, val) => sum + Math.pow(val - average, 2), 0) / dailyValues.length;
  const stdDev = Math.sqrt(variance);

  // Convert to consistency score (lower deviation = higher consistency)
  const consistencyScore = Math.max(0, 100 - (stdDev / average) * 100);
  return Math.round(consistencyScore);
};

/**
 * Calculate active learning days
 * @param {Array} xpTimeline - XP timeline data
 * @returns {number} Number of active days
 */
export const calculateActiveDays = (xpTimeline = []) => {
  const uniqueDays = new Set();
  xpTimeline.forEach(entry => {
    uniqueDays.add(new Date(entry.createdAt).toDateString());
  });
  return uniqueDays.size;
};

/**
 * Find peak performance period
 * @param {Array} xpTimeline - XP timeline data
 * @returns {Object} Peak performance data
 */
export const findPeakPerformancePeriod = (xpTimeline = []) => {
  if (xpTimeline.length < 7) return null;

  let maxXP = 0;
  let peakPeriod = null;

  // Check 7-day windows
  for (let i = 0; i <= xpTimeline.length - 7; i++) {
    const window = xpTimeline.slice(i, i + 7);
    const windowXP = window.reduce((sum, entry) => sum + entry.amount, 0);

    if (windowXP > maxXP) {
      maxXP = windowXP;
      peakPeriod = {
        startDate: window[0].createdAt,
        endDate: window[6].createdAt,
        totalXP: windowXP,
        averageDaily: Math.round(windowXP / 7)
      };
    }
  }

  return peakPeriod;
};

// Percentile calculation helpers
export const calculateLevelPercentile = (level) => {
  // Rough percentile based on typical level distribution
  if (level >= 20) return 95;
  if (level >= 15) return 85;
  if (level >= 10) return 70;
  if (level >= 5) return 50;
  if (level >= 2) return 30;
  return 15;
};

export const calculateXPPercentile = (totalXP) => {
  // Rough percentile based on typical XP distribution
  if (totalXP >= 500000) return 95;
  if (totalXP >= 300000) return 85;
  if (totalXP >= 150000) return 70;
  if (totalXP >= 75000) return 50;
  if (totalXP >= 25000) return 30;
  return 15;
};

export const calculateAuditPercentile = (auditRatio) => {
  // Percentile based on audit ratio
  if (auditRatio >= 2.0) return 95;
  if (auditRatio >= 1.5) return 80;
  if (auditRatio >= 1.2) return 65;
  if (auditRatio >= 1.0) return 50;
  if (auditRatio >= 0.8) return 35;
  return 20;
};

// Additional helper functions for comprehensive analytics
export const calculateProficiencyLevel = (amount) => {
  if (amount >= 80) return 'Expert';
  if (amount >= 60) return 'Advanced';
  if (amount >= 40) return 'Intermediate';
  if (amount >= 20) return 'Beginner';
  return 'Novice';
};

// getRankTitle and getCohortNumber already defined above - removed duplicates

export const getAuditStatus = (auditRatio) => {
  if (auditRatio >= 1.5) return 'Excellent';
  if (auditRatio >= 1.2) return 'Good';
  if (auditRatio >= 1.0) return 'Balanced';
  if (auditRatio >= 0.8) return 'Needs Improvement';
  return 'Critical';
};

export const getAuditRecommendation = (auditRatio, auditBalance) => {
  if (auditRatio < 1.0) {
    return 'Focus on giving more audits to improve your ratio';
  }
  if (auditBalance < 0) {
    return 'You need more audit points - participate in more peer reviews';
  }
  return 'Great audit performance! Keep up the good work';
};

export const identifyStrengths = (level, totalXP, auditData) => {
  const strengths = [];
  if (level >= 10) strengths.push('High Level Achievement');
  if (totalXP >= 100000) strengths.push('Strong XP Accumulation');
  if (auditData.auditRatio >= 1.2) strengths.push('Excellent Peer Review Skills');
  return strengths.length > 0 ? strengths : ['Consistent Learning Progress'];
};

export const identifyImprovementAreas = (level, totalXP, auditData) => {
  const areas = [];
  if (level < 5) areas.push('Level Progression');
  if (totalXP < 50000) areas.push('XP Accumulation');
  if (auditData.auditRatio < 1.0) areas.push('Audit Participation');
  return areas.length > 0 ? areas : ['Continue Current Progress'];
};

export const identifySkillGaps = (skills) => {
  const requiredSkills = ['skill_js', 'skill_go', 'skill_git', 'skill_unix', 'skill_sql'];
  const userSkills = skills.map(s => s.type);
  return requiredSkills.filter(skill => !userSkills.includes(skill));
};

export const recommendNextProjects = (skills, projectResults) => {
  // This would typically be based on curriculum data
  // For now, return generic recommendations
  const completedProjects = projectResults.filter(p => p.grade >= 1).length;

  if (completedProjects < 5) {
    return ['Focus on foundational projects', 'Complete basic algorithms', 'Practice Git workflows'];
  }
  if (completedProjects < 10) {
    return ['Advanced programming concepts', 'Database projects', 'Web development'];
  }
  return ['Specialized projects', 'System administration', 'Advanced algorithms'];
};

export const generateLearningGoals = (skills, projectResults) => {
  const goals = [];
  const skillCount = skills.length;
  const projectCount = projectResults.filter(p => p.grade >= 1).length;

  if (skillCount < 10) goals.push(`Develop ${10 - skillCount} more skills`);
  if (projectCount < 20) goals.push(`Complete ${20 - projectCount} more projects`);

  goals.push('Maintain consistent learning pace');
  goals.push('Improve peer review participation');

  return goals;
};

export const identifyFocusAreas = (skills, _projectResults) => {
  const categories = categorizeSkills(skills);
  const focusAreas = [];

  if (categories.programming.length < 3) focusAreas.push('Programming Fundamentals');
  if (categories.frontend.length < 2) focusAreas.push('Frontend Development');
  if (categories.backend.length < 2) focusAreas.push('Backend Development');
  if (categories.tools.length < 3) focusAreas.push('Development Tools');

  return focusAreas.length > 0 ? focusAreas : ['Advanced Specialization'];
};

export const estimateCompletionTime = (skills, projectResults) => {
  const currentProgress = projectResults.filter(p => p.grade >= 1).length;
  const totalRequired = 42; // Typical curriculum requirement
  const remaining = Math.max(0, totalRequired - currentProgress);

  if (remaining === 0) return 'Curriculum Complete!';

  // Estimate based on current pace (rough calculation)
  const weeksRemaining = Math.ceil(remaining * 2); // Assume 2 weeks per project
  return `Estimated ${weeksRemaining} weeks remaining`;
};
