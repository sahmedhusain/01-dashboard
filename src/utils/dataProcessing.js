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
    const skill = item.type.replace(/^skill_/, '');
    // Use Math.max to keep the highest amount for each skill
    acc[skill] = Math.max(acc[skill] || 0, item.amount);
    return acc;
  }, {});

  // Convert to array and sort by amount
  return Object.entries(skillsMap)
    .map(([skill, amount]) => ({
      name: skill,  // Use 'name' property for consistency with components
      skill,        // Keep 'skill' for backward compatibility
      amount
    }))
    .sort((a, b) => b.amount - a.amount);
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
    auditsGiven: Math.round((totalUp || 0) / 1000) || 0, // Convert from micro-units
    auditsReceived: totalDown || 0,
    auditRatioValue: auditRatio?.auditRatio || auditRatio || 0,
    auditRatioFormatted: formatAuditRatio(auditRatio?.auditRatio || auditRatio || 0)
  };
};

// Process profile display data (moved from JSX)
export const processProfileDisplayData = (user, totalXP, level, passRate) => {
  return {
    userLevel: level || 0,
    projectPassRate: passRate || 0,
    levelProgress: getXPProgress(totalXP, level || 0),
    campus: user?.campus || 'Unknown Campus',
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

// Process progress data
export const processProgressData = (progressData) => {
  if (!Array.isArray(progressData)) return [];

  return progressData.map(progress => ({
    id: progress.id,
    grade: progress.grade,
    isDone: progress.isDone,
    path: progress.path,
    projectName: progress.object?.name || progress.path.split('/').pop(),
    projectType: progress.object?.type || 'unknown',
    createdAt: progress.createdAt,
    updatedAt: progress.updatedAt,
  }));
};

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

// Format date for display
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return dateString;
  }
};

// Format date and time for display
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  
  try {
    return new Date(dateString).toLocaleString();
  } catch {
    return dateString;
  }
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Format large numbers
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

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

// Search functions (moved from JSX)
export const searchProjects = (projects, searchTerm) => {
  if (!searchTerm) return projects;
  return projects.filter(project =>
    project.path?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.object?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.captain?.login?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const searchAudits = (audits, searchTerm) => {
  if (!searchTerm) return audits;
  return audits.filter(audit =>
    audit.group?.path?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audit.auditor?.login?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audit.group?.object?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const searchUsers = (users, searchTerm) => {
  if (!searchTerm) return users;
  return users.filter(user =>
    user.login?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
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

// Process progress data with user information
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
