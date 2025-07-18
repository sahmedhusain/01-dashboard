// ============================================================================
// DATA PROCESSING UTILITIES - SIMPLIFIED
// Following reference patterns for data transformation and formatting
// ============================================================================

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
// AUDIT DATA PROCESSING
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

// Process audit status data
export const processAuditStatus = (auditStatusData) => {
  if (!auditStatusData) return { validAudits: [], failedAudits: [] };

  return {
    validAudits: auditStatusData.validAudits?.nodes || [],
    failedAudits: auditStatusData.failedAudits?.nodes || [],
  };
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
// GROUP DATA PROCESSING
// ============================================================================

// Process group data
export const processGroupData = (groupData) => {
  if (!Array.isArray(groupData)) return [];

  return groupData.map(group => ({
    id: group.id,
    path: group.path,
    status: group.status,
    projectName: group.object?.name || group.path.split('/').pop(),
    projectType: group.object?.type || 'project',
    members: group.members?.map(member => ({
      login: member.userLogin,
      firstName: member.user?.firstName || '',
      lastName: member.user?.lastName || '',
      fullName: `${member.user?.firstName || ''} ${member.user?.lastName || ''}`.trim() || member.userLogin,
    })) || [],
    createdAt: group.createdAt,
  }));
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
