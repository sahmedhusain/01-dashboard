// Constants for data conversion
export const BYTES_TO_KB_FACTOR = 1000;
export const BYTES_TO_MB_FACTOR = 1000 * 1000;
export const BYTES_TO_GB_FACTOR = 1000 * 1000 * 1000;

/**
 * Format XP values with appropriate units (K, M, etc.)
 * @param {number} xp - XP value to format
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted XP string
 */
export const formatXP = (xp) => {
  if (!xp || xp === 0) return '0';
  
  const num = Number(xp);
  if (isNaN(num)) return '0';
  
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

/**
 * Format byte values to human-readable format using 1000 as conversion factor
 * @param {number} bytes - Byte value to format
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted byte string
 */
export const formatBytes = (bytes, decimals = 1) => {
  if (!bytes || bytes === 0) return '0 B';
  
  const num = Number(bytes);
  if (isNaN(num)) return '0 B';
  
  if (num >= BYTES_TO_GB_FACTOR) {
    return `${(num / BYTES_TO_GB_FACTOR).toFixed(decimals)} GB`;
  }
  if (num >= BYTES_TO_MB_FACTOR) {
    return `${(num / BYTES_TO_MB_FACTOR).toFixed(decimals)} MB`;
  }
  if (num >= BYTES_TO_KB_FACTOR) {
    return `${(num / BYTES_TO_KB_FACTOR).toFixed(decimals)} KB`;
  }
  return `${num} B`;
};

/**
 * Convert bytes to kilobytes using the correct factor (1000)
 * @param {number} bytes - Byte value to convert
 * @returns {number} Value in kilobytes
 */
export const bytesToKB = (bytes) => {
  if (bytes == null || isNaN(bytes)) return 0;
  return Number(bytes) / BYTES_TO_KB_FACTOR;
};

/**
 * Convert bytes to megabytes using the correct factor (1000)
 * @param {number} bytes - Byte value to convert
 * @returns {number} Value in megabytes
 */
export const bytesToMB = (bytes) => {
  return Number(bytes) / BYTES_TO_MB_FACTOR;
};

/**
 * Extract avatar URL from user profile data
 * @param {Object} user - User object with profile/attrs data
 * @returns {string|null} Avatar URL or null if not found
 */
export const getAvatarUrl = (user) => {
  if (!user) return null;
  
  // Check profile field for avatar data
  if (user.profile) {
    const profile = safeJsonParse(user.profile, {});
    if (profile.avatar) return profile.avatar;
    if (profile.avatarUrl) return profile.avatarUrl;
    if (profile.picture) return profile.picture;
  }

  // Check attrs field for avatar data
  if (user.attrs) {
    const attrs = safeJsonParse(user.attrs, {});
    if (attrs.avatar) return attrs.avatar;
    if (attrs.avatarUrl) return attrs.avatarUrl;
    if (attrs.picture) return attrs.picture;
    if (attrs.image) return attrs.image;
  }
  
  return null;
};

/**
 * Get user display name from profile data
 * @param {Object} user - User object with profile data
 * @returns {string} Display name
 */
export const getUserDisplayName = (user) => {
  if (!user) return 'Unknown User';

  // Check direct firstName/lastName fields first (from GraphQL schema)
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }

  // Check individual fields
  if (user.firstName) return user.firstName;
  if (user.lastName) return user.lastName;

  // Try to get full name from profile JSON field
  if (user.profile) {
    const profile = safeJsonParse(user.profile, {});
    if (profile.firstName && profile.lastName) {
      return `${profile.firstName} ${profile.lastName}`;
    }
    if (profile.name) return profile.name;
    if (profile.displayName) return profile.displayName;
  }

  // Fallback to login or username
  return user.login || user.username || 'Unknown User';
};

/**
 * Get user email from profile data
 * @param {Object} user - User object with profile/attrs data
 * @returns {string|null} Email address or null if not found
 */
export const getUserEmail = (user) => {
  if (!user) return null;

  // Check direct email field first (from GraphQL schema)
  if (user.email) return user.email;

  // Check profile field
  if (user.profile) {
    const profile = safeJsonParse(user.profile, {});
    if (profile.email) return profile.email;
  }

  // Check attrs field
  if (user.attrs) {
    const attrs = safeJsonParse(user.attrs, {});
    if (attrs.email) return attrs.email;
  }

  return null;
};

/**
 * Calculate user level based on XP
 * @param {number} xp - Total XP
 * @returns {number} User level
 */
export const calculateUserLevel = (xp) => {
  if (!xp || xp <= 0) return 1;
  return Math.floor(xp / 1000) + 1;
};

/**
 * Calculate progress to next level
 * @param {number} xp - Total XP
 * @returns {Object} Object with current level, progress percentage, and XP needed
 */
export const calculateLevelProgress = (xp) => {
  const currentLevel = calculateUserLevel(xp);
  const currentLevelXP = (currentLevel - 1) * 1000;
  const nextLevelXP = currentLevel * 1000;
  const progressXP = xp - currentLevelXP;
  const progressPercentage = (progressXP / 1000) * 100;
  const xpNeeded = nextLevelXP - xp;
  
  return {
    currentLevel,
    progressPercentage: Math.max(0, Math.min(100, progressPercentage)),
    xpNeeded: Math.max(0, xpNeeded),
    currentLevelXP,
    nextLevelXP,
  };
};

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return 'Unknown';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  try {
    return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
  } catch (e) {
    console.warn('Error formatting date:', e);
    return 'Invalid Date';
  }
};

/**
 * Format percentage values
 * @param {number} value - Value to format as percentage
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined || isNaN(value)) return '0%';
  return `${Number(value).toFixed(decimals)}%`;
};

/**
 * Format grade values (typically 0-1 scale to percentage)
 * @param {number} grade - Grade value (usually 0-1)
 * @returns {string} Formatted grade as percentage
 */
export const formatGrade = (grade) => {
  if (grade === null || grade === undefined || isNaN(grade)) return '0%';
  const percentage = Number(grade) * 100;
  return `${percentage.toFixed(1)}%`;
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length (default: 50)
 * @param {string} suffix - Suffix to add when truncated (default: '...')
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50, suffix = '...') => {
  if (!text || text.length <= maxLength) return text || '';
  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Safe JSON parse with fallback - handles both strings and objects
 * @param {string|object} data - JSON string to parse or object to return as-is
 * @param {*} fallback - Fallback value if parsing fails
 * @returns {*} Parsed object or fallback
 */
export const safeJsonParse = (data, fallback = {}) => {
  if (!data) return fallback;

  // If it's already an object, return it as-is
  if (typeof data === 'object' && data !== null) {
    return data;
  }

  // If it's a string, try to parse it
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.warn('Error parsing JSON:', e);
      return fallback;
    }
  }

  // For any other type, return fallback
  return fallback;
};

/**
 * Format number with locale-specific formatting
 * @param {number} number - Number to format
 * @param {string} locale - Locale string (default: 'en-US')
 * @returns {string} Formatted number string
 */
export const formatNumber = (number, locale = 'en-US') => {
  if (number === null || number === undefined || isNaN(number)) return '0';
  return Number(number).toLocaleString(locale);
};

// ============================================================================
// GRAPHQL RESPONSE PARSING UTILITIES
// ============================================================================

/**
 * Extract total XP from GraphQL transaction aggregate response
 * @param {Object} transactionAggregate - Transaction aggregate from GraphQL
 * @returns {number} Total XP in KB (converted from bytes using 1000 factor)
 */
export const extractTotalXP = (transactionAggregate) => {
  if (!transactionAggregate?.aggregate?.sum?.amount) return 0;
  // Convert bytes to KB using 1000 factor as per user preference
  return bytesToKB(transactionAggregate.aggregate.sum.amount);
};

/**
 * Extract user audit metrics from GraphQL user response
 * @param {Object} user - User object from GraphQL
 * @returns {Object} Audit metrics with proper conversions
 */
export const extractAuditMetrics = (user) => {
  if (!user) return { auditRatio: 0, totalUp: 0, totalDown: 0, auditsGiven: 0, auditsReceived: 0 };

  // Use direct fields from user table (already calculated by the database)
  const auditRatio = user.auditRatio || 0;

  // Extract from aggregates if available, fallback to direct fields
  const upTransactions = user.upTransactions?.aggregate?.sum?.amount || user.totalUp || 0;
  const downTransactions = user.downTransactions?.aggregate?.sum?.amount || user.totalDown || 0;
  const auditsGiven = user.audits_aggregate?.aggregate?.count || user.auditsAssigned || 0;
  const auditsReceived = user.auditsReceived?.aggregate?.count || 0;

  return {
    auditRatio,
    totalUp: bytesToKB(upTransactions),
    totalDown: bytesToKB(Math.abs(downTransactions)), // Down transactions are negative
    auditsGiven,
    auditsReceived,
  };
};

/**
 * Extract project statistics from GraphQL response
 * @param {Object} data - GraphQL response data
 * @returns {Object} Project statistics
 */
export const extractProjectStats = (data) => {
  const totalProjects = data?.totalProjects?.aggregate?.count || 0;
  const passedProjects = data?.passedProjects?.aggregate?.count || 0;
  const failedProjects = totalProjects - passedProjects;
  const passRate = totalProjects > 0 ? (passedProjects / totalProjects) * 100 : 0;

  return {
    totalProjects,
    passedProjects,
    failedProjects,
    passRate,
  };
};

/**
 * Process transaction data for XP calculations
 * @param {Array} transactions - Array of transaction objects
 * @returns {Object} Processed transaction data
 */
export const processTransactionData = (transactions) => {
  if (!Array.isArray(transactions)) return { totalXP: 0, xpByProject: [], timeline: [] };

  const xpTransactions = transactions.filter(t => t.type === 'xp');
  const totalXP = xpTransactions.reduce((sum, t) => sum + bytesToKB(t.amount), 0);

  // Group by project/object
  const xpByProject = xpTransactions.reduce((acc, transaction) => {
    const projectName = transaction.object?.name || transaction.path?.split('/').pop() || 'Unknown';
    const projectKey = `${projectName}_${transaction.objectId || 'no_id'}`;

    if (!acc[projectKey]) {
      acc[projectKey] = {
        name: projectName,
        path: transaction.path,
        objectId: transaction.objectId,
        totalXP: 0,
        type: transaction.object?.type || 'unknown',
        transactions: [],
      };
    }

    acc[projectKey].totalXP += bytesToKB(transaction.amount);
    acc[projectKey].transactions.push(transaction);

    return acc;
  }, {});

  // Create timeline data with cumulative XP
  const sortedTransactions = xpTransactions
    .filter(t => t.createdAt && t.amount != null) // Filter out invalid transactions
    .map(t => ({
      date: t.createdAt,
      amount: bytesToKB(t.amount) || 0, // Ensure amount is never NaN
      project: t.object?.name || t.path?.split('/').pop() || 'Unknown',
      type: t.object?.type || 'unknown',
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate cumulative XP for timeline chart
  let cumulativeXP = 0;
  const timeline = sortedTransactions.map(transaction => {
    const amount = isNaN(transaction.amount) ? 0 : transaction.amount;
    cumulativeXP += amount;
    return {
      ...transaction,
      amount,
      cumulativeXP,
    };
  });

  return {
    totalXP,
    xpByProject: Object.values(xpByProject).sort((a, b) => b.totalXP - a.totalXP),
    timeline,
  };
};

/**
 * Extract user campus information
 * @param {Object} user - User object from GraphQL
 * @returns {string} Campus name
 */
export const getUserCampus = (user) => {
  if (!user) return 'Unknown Campus';

  // Check direct campus field
  if (user.campus) return user.campus;

  // Check from events (registration campus)
  if (user.events && user.events.length > 0) {
    const firstEvent = user.events[0];
    if (firstEvent.event?.campus) return firstEvent.event.campus;
    if (firstEvent.campus) return firstEvent.campus;
  }

  return 'Unknown Campus';
};

/**
 * Extract user registration date
 * @param {Object} user - User object from GraphQL
 * @returns {string|null} Registration date
 */
export const getUserRegistrationDate = (user) => {
  if (!user) return null;

  // Check user creation date
  if (user.createdAt) return user.createdAt;

  // Check first event date
  if (user.events && user.events.length > 0) {
    const sortedEvents = user.events.sort((a, b) =>
      new Date(a.createdAt || a.event?.createdAt) - new Date(b.createdAt || b.event?.createdAt)
    );
    return sortedEvents[0].createdAt || sortedEvents[0].event?.createdAt;
  }

  return null;
};

/**
 * Process skill transactions to extract skill proficiency data
 * @param {Array} transactions - Array of skill-related transactions
 * @returns {Array} Processed skill data
 */
export const processSkillData = (transactions) => {
  if (!Array.isArray(transactions)) return [];

  const skillTransactions = transactions.filter(t =>
    t.type && t.type.includes('skill')
  );

  // Group by skill type
  const skillGroups = skillTransactions.reduce((acc, transaction) => {
    const skillType = transaction.type;
    if (!acc[skillType]) {
      acc[skillType] = {
        name: skillType.replace('skill_', '').replace(/_/g, ' '),
        type: skillType,
        totalXP: 0,
        transactions: [],
        lastActivity: null,
      };
    }

    acc[skillType].totalXP += bytesToKB(transaction.amount);
    acc[skillType].transactions.push(transaction);

    // Update last activity
    const transactionDate = new Date(transaction.createdAt);
    if (!acc[skillType].lastActivity || transactionDate > new Date(acc[skillType].lastActivity)) {
      acc[skillType].lastActivity = transaction.createdAt;
    }

    return acc;
  }, {});

  return Object.values(skillGroups).sort((a, b) => b.totalXP - a.totalXP);
};

/**
 * Process progress data to extract completion statistics
 * @param {Array} progress - Array of progress objects
 * @returns {Object} Progress statistics
 */
export const processProgressData = (progress) => {
  if (!Array.isArray(progress)) return { total: 0, completed: 0, inProgress: 0, completionRate: 0 };

  const total = progress.length;
  const completed = progress.filter(p => p.isDone).length;
  const inProgress = progress.filter(p => !p.isDone && p.grade > 0).length;
  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  return {
    total,
    completed,
    inProgress,
    completionRate,
    averageGrade: total > 0 ? progress.reduce((sum, p) => sum + (p.grade || 0), 0) / total : 0,
  };
};

/**
 * Process audit data to extract audit statistics
 * @param {Array} auditsGiven - Array of audits given by user
 * @param {Array} auditsReceived - Array of audits received by user
 * @returns {Object} Audit statistics
 */
export const processAuditData = (auditsGiven = [], auditsReceived = []) => {
  const givenCount = auditsGiven.length;
  const receivedCount = auditsReceived.length;
  const auditRatio = receivedCount > 0 ? givenCount / receivedCount : 0;

  // Calculate success rates
  const givenPassed = auditsGiven.filter(a => a.grade >= 1).length;
  const receivedPassed = auditsReceived.filter(a => a.grade >= 1).length;

  const givenSuccessRate = givenCount > 0 ? (givenPassed / givenCount) * 100 : 0;
  const receivedSuccessRate = receivedCount > 0 ? (receivedPassed / receivedCount) * 100 : 0;

  // Calculate average grades
  const givenAverageGrade = givenCount > 0 ?
    auditsGiven.reduce((sum, a) => sum + (a.grade || 0), 0) / givenCount : 0;
  const receivedAverageGrade = receivedCount > 0 ?
    auditsReceived.reduce((sum, a) => sum + (a.grade || 0), 0) / receivedCount : 0;

  return {
    auditRatio,
    given: {
      count: givenCount,
      passed: givenPassed,
      successRate: givenSuccessRate,
      averageGrade: givenAverageGrade,
    },
    received: {
      count: receivedCount,
      passed: receivedPassed,
      successRate: receivedSuccessRate,
      averageGrade: receivedAverageGrade,
    },
  };
};

/**
 * Calculate collaboration score based on audit and group participation metrics
 * @param {Object} auditData - Audit statistics
 * @param {Object} groupData - Group participation data
 * @returns {number} Collaboration score (0-100)
 */
export const calculateCollaborationScore = (auditData = {}, groupData = {}) => {
  let score = 0;

  // Audit ratio contribution (0-30 points)
  const auditRatio = auditData.auditRatio || 0;
  if (auditRatio >= 1.0) {
    score += Math.min(30, auditRatio * 15);
  }

  // Audit success rates (0-25 points)
  const auditSuccessRate = auditData.given?.successRate || 0;
  score += (auditSuccessRate / 100) * 25;

  // Group participation (0-25 points)
  const groupsParticipated = groupData.totalGroups || 0;
  const leadershipRatio = groupData.leadershipRatio || 0;
  score += Math.min(15, groupsParticipated * 2);
  score += Math.min(10, (leadershipRatio / 100) * 10);

  // Network diversity (0-20 points)
  const uniqueCollaborators = auditData.uniqueCollaborators || 0;
  score += Math.min(20, uniqueCollaborators * 2);

  return Math.min(100, score);
};

/**
 * Calculate skill growth trend from historical progress data
 * @param {Array} progressHistory - Array of progress objects sorted by date
 * @returns {number} Growth trend score (-100 to 100)
 */
export const calculateSkillGrowthTrend = (progressHistory) => {
  if (!Array.isArray(progressHistory) || progressHistory.length < 2) return 0;

  const sortedProgress = progressHistory
    .filter(p => p.updatedAt && p.grade != null)
    .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

  if (sortedProgress.length < 2) return 0;

  // Calculate moving average over time
  const windowSize = Math.min(3, sortedProgress.length);
  const movingAverages = [];

  for (let i = windowSize - 1; i < sortedProgress.length; i++) {
    const window = sortedProgress.slice(i - windowSize + 1, i + 1);
    const average = window.reduce((sum, p) => sum + p.grade, 0) / window.length;
    movingAverages.push(average);
  }

  if (movingAverages.length < 2) return 0;

  // Calculate trend slope
  const firstAvg = movingAverages[0];
  const lastAvg = movingAverages[movingAverages.length - 1];
  const trend = ((lastAvg - firstAvg) / firstAvg) * 100;

  return Math.max(-100, Math.min(100, trend));
};

/**
 * Analyze performance trends over time
 * @param {Array} results - Array of result objects with dates and grades
 * @returns {Object} Performance trend analysis
 */
export const analyzePerformanceTrend = (results) => {
  if (!Array.isArray(results) || results.length < 3) {
    return { trend: 'insufficient_data', slope: 0, confidence: 0 };
  }

  const sortedResults = results
    .filter(r => r.createdAt && r.grade != null)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  if (sortedResults.length < 3) {
    return { trend: 'insufficient_data', slope: 0, confidence: 0 };
  }

  // Calculate moving average
  const windowSize = Math.min(3, sortedResults.length);
  const movingAverages = [];

  for (let i = windowSize - 1; i < sortedResults.length; i++) {
    const window = sortedResults.slice(i - windowSize + 1, i + 1);
    const average = window.reduce((sum, result) => sum + result.grade, 0) / window.length;
    movingAverages.push({
      date: sortedResults[i].createdAt,
      average,
      index: i
    });
  }

  if (movingAverages.length < 2) {
    return { trend: 'stable', slope: 0, confidence: 0 };
  }

  // Calculate trend slope using linear regression
  const n = movingAverages.length;
  const sumX = movingAverages.reduce((sum, _, i) => sum + i, 0);
  const sumY = movingAverages.reduce((sum, avg) => sum + avg.average, 0);
  const sumXY = movingAverages.reduce((sum, avg, i) => sum + (i * avg.average), 0);
  const sumXX = movingAverages.reduce((sum, _, i) => sum + (i * i), 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const confidence = Math.min(100, (n / 10) * 100); // Higher confidence with more data points

  let trend = 'stable';
  if (slope > 0.05) trend = 'improving';
  else if (slope < -0.05) trend = 'declining';

  return {
    trend,
    slope: slope * 100, // Convert to percentage
    confidence,
    movingAverages,
    dataPoints: n
  };
};

/**
 * Calculate comprehensive user statistics from GraphQL data
 * @param {Object} userData - Complete user data from GraphQL
 * @returns {Object} Comprehensive user statistics
 */
export const calculateUserStatistics = (userData) => {
  if (!userData) return null;

  const user = Array.isArray(userData) ? userData[0] : userData;
  if (!user) return null;

  // Extract basic info
  const displayName = getUserDisplayName(user);
  const email = getUserEmail(user);
  const campus = getUserCampus(user);
  const registrationDate = getUserRegistrationDate(user);

  // Process XP data
  const xpData = processTransactionData(user.transactions || []);
  const totalXP = xpData.totalXP;

  // Calculate level
  const userLevel = calculateUserLevel(totalXP);
  const levelProgress = calculateLevelProgress(totalXP);

  // Extract audit metrics
  const auditMetrics = extractAuditMetrics(user);

  // Process project data
  const projectStats = extractProjectStats({
    totalProjects: user.results_aggregate,
    passedProjects: user.passedResults,
  });

  // Process progress data
  const progressStats = processProgressData(user.progresses || []);

  // Process skill data
  const skillData = processSkillData(user.transactions || []);

  // Calculate collaboration score
  const collaborationScore = calculateCollaborationScore(auditMetrics, {
    totalGroups: user.groups_aggregate?.aggregate?.count || 0,
    leadershipRatio: 0 // Would need group captain data
  });

  // Analyze performance trends
  const performanceTrend = analyzePerformanceTrend(user.results || []);

  return {
    // Basic info
    id: user.id,
    login: user.login,
    displayName,
    email,
    campus,
    registrationDate,

    // XP and level
    totalXP,
    userLevel,
    levelProgress,
    xpByProject: xpData.xpByProject,
    xpTimeline: xpData.timeline,

    // Projects
    ...projectStats,

    // Progress
    ...progressStats,

    // Audits
    ...auditMetrics,

    // Skills
    skills: skillData,

    // Advanced analytics
    collaborationScore,
    performanceTrend,

    // Raw data for advanced processing
    rawData: user,
  };
};

// ============================================================================
// ADVANCED ANALYTICS PROCESSORS
// ============================================================================

/**
 * Analyze project difficulty progression over time
 * @param {Array} projectResults - Array of project results with grades and dates
 * @returns {Object} Difficulty progression analysis
 */
export const analyzeDifficultyProgression = (projectResults) => {
  if (!Array.isArray(projectResults) || projectResults.length === 0) {
    return { trend: 'stable', score: 0, progression: 'unknown' };
  }

  // Sort by creation date
  const sortedResults = projectResults
    .filter(r => r.createdAt && r.grade != null)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  if (sortedResults.length < 3) {
    return { trend: 'stable', score: 0, progression: 'insufficient_data' };
  }

  // Calculate moving average of grades
  const windowSize = Math.min(3, sortedResults.length);
  const movingAverages = [];

  for (let i = windowSize - 1; i < sortedResults.length; i++) {
    const window = sortedResults.slice(i - windowSize + 1, i + 1);
    const average = window.reduce((sum, result) => sum + result.grade, 0) / window.length;
    movingAverages.push(average);
  }

  if (movingAverages.length < 2) {
    return { trend: 'stable', score: 0, progression: 'stable' };
  }

  // Calculate trend
  const firstHalf = movingAverages.slice(0, Math.floor(movingAverages.length / 2));
  const secondHalf = movingAverages.slice(Math.floor(movingAverages.length / 2));

  const firstHalfAvg = firstHalf.reduce((sum, avg) => sum + avg, 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, avg) => sum + avg, 0) / secondHalf.length;

  const improvement = secondHalfAvg - firstHalfAvg;

  let trend = 'stable';
  let progression = 'maintaining';

  if (improvement > 0.1) {
    trend = 'improving';
    progression = 'advancing';
  } else if (improvement < -0.1) {
    trend = 'declining';
    progression = 'struggling';
  }

  return {
    trend,
    score: improvement * 100,
    progression,
    firstHalfAverage: firstHalfAvg,
    secondHalfAverage: secondHalfAvg,
    totalProjects: sortedResults.length
  };
};

/**
 * Calculate progress velocity (completion rate over time)
 * @param {Array} completionTimeline - Array of completion events with dates
 * @returns {Object} Progress velocity metrics
 */
export const calculateProgressVelocity = (completionTimeline) => {
  if (!Array.isArray(completionTimeline) || completionTimeline.length < 2) {
    return { velocity: 0, trend: 'insufficient_data', projectsPerWeek: 0 };
  }

  const sortedCompletions = completionTimeline
    .filter(c => c.createdAt)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  if (sortedCompletions.length < 2) {
    return { velocity: 0, trend: 'insufficient_data', projectsPerWeek: 0 };
  }

  const firstCompletion = new Date(sortedCompletions[0].createdAt);
  const lastCompletion = new Date(sortedCompletions[sortedCompletions.length - 1].createdAt);
  const daysDiff = (lastCompletion - firstCompletion) / (1000 * 60 * 60 * 24);

  if (daysDiff <= 0) {
    return { velocity: 0, trend: 'single_day', projectsPerWeek: 0 };
  }

  const velocity = sortedCompletions.length / daysDiff; // Projects per day
  const projectsPerWeek = velocity * 7;

  // Calculate trend over recent period
  const recentPeriodDays = Math.min(30, daysDiff / 2);
  const recentDate = new Date(lastCompletion.getTime() - (recentPeriodDays * 24 * 60 * 60 * 1000));
  const recentCompletions = sortedCompletions.filter(c => new Date(c.createdAt) >= recentDate);

  const recentVelocity = recentCompletions.length / recentPeriodDays;
  const overallVelocity = sortedCompletions.length / daysDiff;

  let trend = 'stable';
  if (recentVelocity > overallVelocity * 1.2) trend = 'accelerating';
  else if (recentVelocity < overallVelocity * 0.8) trend = 'decelerating';

  return {
    velocity: velocity,
    projectsPerWeek: Math.round(projectsPerWeek * 10) / 10,
    trend,
    totalDays: Math.round(daysDiff),
    recentVelocity: recentVelocity,
    overallVelocity: overallVelocity
  };
};

/**
 * Analyze time management patterns from project completion data
 * @param {Array} progressData - Array of progress objects with timestamps
 * @param {Array} resultData - Array of result objects with timestamps
 * @returns {Object} Time management analysis
 */
export const analyzeTimeManagement = (progressData = [], resultData = []) => {
  const allEvents = [
    ...progressData.map(p => ({ ...p, type: 'progress', date: p.updatedAt })),
    ...resultData.map(r => ({ ...r, type: 'result', date: r.createdAt }))
  ].filter(e => e.date);

  if (allEvents.length === 0) {
    return {
      pattern: 'no_data',
      peakHours: [],
      consistency: 0,
      workingDays: 0
    };
  }

  // Analyze activity by hour of day
  const hourlyActivity = {};
  const dailyActivity = {};

  allEvents.forEach(event => {
    const date = new Date(event.date);
    const hour = date.getHours();
    const day = date.toISOString().split('T')[0];

    hourlyActivity[hour] = (hourlyActivity[hour] || 0) + 1;
    dailyActivity[day] = (dailyActivity[day] || 0) + 1;
  });

  // Find peak hours
  const peakHours = Object.entries(hourlyActivity)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([hour, count]) => ({ hour: parseInt(hour), count }));

  // Calculate consistency (standard deviation of daily activity)
  const dailyCounts = Object.values(dailyActivity);
  const avgDaily = dailyCounts.reduce((sum, count) => sum + count, 0) / dailyCounts.length;
  const variance = dailyCounts.reduce((sum, count) => sum + Math.pow(count - avgDaily, 2), 0) / dailyCounts.length;
  const consistency = Math.max(0, 100 - Math.sqrt(variance) * 10); // Higher is more consistent

  // Determine pattern
  let pattern = 'irregular';
  if (consistency > 70) pattern = 'consistent';
  else if (consistency > 40) pattern = 'moderate';

  return {
    pattern,
    peakHours,
    consistency: Math.round(consistency),
    workingDays: Object.keys(dailyActivity).length,
    averageActivitiesPerDay: Math.round(avgDaily * 10) / 10,
    totalActivities: allEvents.length
  };
};

/**
 * Calculate proficiency level for a skill based on XP, projects, and grades
 * @param {number} totalXP - Total XP earned in this skill
 * @param {number} completedProjects - Number of completed projects
 * @param {number} averageGrade - Average grade across projects
 * @returns {Object} Proficiency analysis
 */
export const calculateProficiencyLevel = (totalXP, completedProjects, averageGrade) => {
  let level = 'Beginner';
  let score = 0;

  // XP contribution (0-40 points)
  const xpScore = Math.min(40, (totalXP / 10000) * 40); // 10K XP = max XP score

  // Project completion contribution (0-30 points)
  const projectScore = Math.min(30, completedProjects * 3);

  // Grade quality contribution (0-30 points)
  const gradeScore = (averageGrade || 0) * 30;

  score = xpScore + projectScore + gradeScore;

  if (score >= 80) level = 'Expert';
  else if (score >= 60) level = 'Advanced';
  else if (score >= 35) level = 'Intermediate';
  else if (score >= 15) level = 'Beginner';
  else level = 'Novice';

  return {
    level,
    score: Math.round(score),
    breakdown: {
      xpScore: Math.round(xpScore),
      projectScore: Math.round(projectScore),
      gradeScore: Math.round(gradeScore)
    },
    nextLevelThreshold: getNextLevelThreshold(level),
    pointsToNext: Math.max(0, getNextLevelThreshold(level) - score)
  };
};

/**
 * Get threshold score for next proficiency level
 * @param {string} currentLevel - Current proficiency level
 * @returns {number} Score needed for next level
 */
const getNextLevelThreshold = (currentLevel) => {
  const thresholds = {
    'Novice': 15,
    'Beginner': 35,
    'Intermediate': 60,
    'Advanced': 80,
    'Expert': 100
  };

  const levels = Object.keys(thresholds);
  const currentIndex = levels.indexOf(currentLevel);

  if (currentIndex === -1 || currentIndex === levels.length - 1) return 100;

  return thresholds[levels[currentIndex + 1]];
};

/**
 * Generate learning path recommendations based on user data
 * @param {Object} userData - User statistics and progress data
 * @returns {Object} Learning path recommendations
 */
export const generateLearningPathRecommendations = (userData) => {
  if (!userData) return { recommendations: [], focus: 'unknown' };

  const { skills = [], performanceTrend = {}, collaborationScore = 0, totalXP = 0 } = userData;

  const recommendations = [];
  let primaryFocus = 'skill_development';

  // Analyze skill gaps
  const skillLevels = skills.map(skill => ({
    name: skill.name,
    proficiency: calculateProficiencyLevel(skill.totalXP || 0, skill.completedProjects || 0, skill.averageGrade || 0)
  }));

  const beginnerSkills = skillLevels.filter(s => s.proficiency.level === 'Beginner' || s.proficiency.level === 'Novice');
  const advancedSkills = skillLevels.filter(s => s.proficiency.level === 'Advanced' || s.proficiency.level === 'Expert');

  // Skill development recommendations
  if (beginnerSkills.length > 0) {
    recommendations.push({
      type: 'skill_focus',
      priority: 'high',
      title: 'Strengthen Foundation Skills',
      description: `Focus on improving ${beginnerSkills.slice(0, 2).map(s => s.name).join(' and ')} to build a stronger foundation.`,
      skills: beginnerSkills.slice(0, 3).map(s => s.name),
      estimatedTime: '2-4 weeks'
    });
  }

  // Performance trend recommendations
  if (performanceTrend.trend === 'declining') {
    recommendations.push({
      type: 'performance_improvement',
      priority: 'high',
      title: 'Address Performance Decline',
      description: 'Recent performance shows a declining trend. Consider reviewing fundamentals and seeking mentorship.',
      actionItems: ['Review recent failed projects', 'Practice core concepts', 'Seek peer feedback'],
      estimatedTime: '1-2 weeks'
    });
    primaryFocus = 'performance_recovery';
  } else if (performanceTrend.trend === 'improving') {
    recommendations.push({
      type: 'skill_advancement',
      priority: 'medium',
      title: 'Advance to Next Level',
      description: 'Your performance is improving! Consider tackling more challenging projects.',
      actionItems: ['Take on advanced projects', 'Mentor other students', 'Explore new technologies'],
      estimatedTime: '3-6 weeks'
    });
  }

  // Collaboration recommendations
  if (collaborationScore < 30) {
    recommendations.push({
      type: 'collaboration',
      priority: 'medium',
      title: 'Improve Collaboration Skills',
      description: 'Increase participation in peer reviews and group projects to build collaboration skills.',
      actionItems: ['Participate in more audits', 'Join group projects', 'Provide constructive feedback'],
      estimatedTime: 'Ongoing'
    });
  }

  // XP-based recommendations
  if (totalXP < 50000) {
    recommendations.push({
      type: 'xp_building',
      priority: 'medium',
      title: 'Build Experience Points',
      description: 'Focus on completing projects to build your XP and advance your level.',
      actionItems: ['Complete pending projects', 'Retry failed projects', 'Explore bonus challenges'],
      estimatedTime: '4-8 weeks'
    });
  }

  // Advanced skill recommendations
  if (advancedSkills.length >= 2 && totalXP > 100000) {
    recommendations.push({
      type: 'specialization',
      priority: 'low',
      title: 'Consider Specialization',
      description: `You have strong skills in ${advancedSkills.slice(0, 2).map(s => s.name).join(' and ')}. Consider specializing further.`,
      skills: advancedSkills.slice(0, 2).map(s => s.name),
      estimatedTime: '8-12 weeks'
    });
    primaryFocus = 'specialization';
  }

  return {
    recommendations: recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }),
    primaryFocus,
    skillAnalysis: skillLevels,
    overallReadiness: calculateOverallReadiness(userData)
  };
};

/**
 * Calculate overall readiness score for advanced challenges
 * @param {Object} userData - User statistics
 * @returns {Object} Readiness assessment
 */
const calculateOverallReadiness = (userData) => {
  const { totalXP = 0, skills = [], performanceTrend = {}, collaborationScore = 0 } = userData;

  let readinessScore = 0;

  // XP contribution (0-25 points)
  readinessScore += Math.min(25, (totalXP / 200000) * 25);

  // Skills diversity (0-25 points)
  const skillCount = skills.length;
  readinessScore += Math.min(25, skillCount * 3);

  // Performance trend (0-25 points)
  if (performanceTrend.trend === 'improving') readinessScore += 25;
  else if (performanceTrend.trend === 'stable') readinessScore += 15;
  else if (performanceTrend.trend === 'declining') readinessScore += 5;

  // Collaboration (0-25 points)
  readinessScore += Math.min(25, (collaborationScore / 100) * 25);

  let readinessLevel = 'Not Ready';
  if (readinessScore >= 80) readinessLevel = 'Highly Ready';
  else if (readinessScore >= 60) readinessLevel = 'Ready';
  else if (readinessScore >= 40) readinessLevel = 'Partially Ready';

  return {
    score: Math.round(readinessScore),
    level: readinessLevel,
    breakdown: {
      xp: Math.min(25, (totalXP / 200000) * 25),
      skills: Math.min(25, skillCount * 3),
      performance: performanceTrend.trend === 'improving' ? 25 : (performanceTrend.trend === 'stable' ? 15 : 5),
      collaboration: Math.min(25, (collaborationScore / 100) * 25)
    }
  };
};

/**
 * Analyze collaboration frequency patterns
 * @param {Array} groupData - Array of group participation data
 * @returns {Object} Collaboration frequency analysis
 */
export const analyzeCollaborationFrequency = (groupData = []) => {
  if (!Array.isArray(groupData) || groupData.length === 0) {
    return { frequency: 0, pattern: 'none', averageInterval: 0 };
  }

  const sortedGroups = groupData
    .filter(g => g.createdAt)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  if (sortedGroups.length < 2) {
    return { frequency: 0, pattern: 'single', averageInterval: 0 };
  }

  // Calculate time between collaborations
  const intervals = [];
  for (let i = 1; i < sortedGroups.length; i++) {
    const prev = new Date(sortedGroups[i - 1].createdAt);
    const curr = new Date(sortedGroups[i].createdAt);
    intervals.push((curr - prev) / (1000 * 60 * 60 * 24)); // Days
  }

  const averageInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;

  let pattern = 'rare';
  if (averageInterval <= 7) pattern = 'frequent';
  else if (averageInterval <= 30) pattern = 'regular';
  else if (averageInterval <= 90) pattern = 'occasional';

  return {
    frequency: Math.round((365 / averageInterval) * 10) / 10, // Collaborations per year
    pattern,
    averageInterval: Math.round(averageInterval),
    totalCollaborations: sortedGroups.length,
    timeSpan: Math.round((new Date(sortedGroups[sortedGroups.length - 1].createdAt) - new Date(sortedGroups[0].createdAt)) / (1000 * 60 * 60 * 24))
  };
};

/**
 * Calculate network density and influence metrics
 * @param {Array} groupData - Group participation data
 * @param {Array} auditData - Audit relationship data
 * @returns {Object} Network analysis metrics
 */
export const calculateNetworkMetrics = (groupData = [], auditData = []) => {
  const uniqueCollaborators = new Set();
  const connections = new Map();

  // Process group collaborations
  groupData.forEach(group => {
    if (group.members && Array.isArray(group.members)) {
      group.members.forEach(member => {
        if (member.id) {
          uniqueCollaborators.add(member.id);

          // Track connections
          group.members.forEach(otherMember => {
            if (otherMember.id && otherMember.id !== member.id) {
              const key = [member.id, otherMember.id].sort().join('-');
              connections.set(key, (connections.get(key) || 0) + 1);
            }
          });
        }
      });
    }
  });

  // Process audit relationships
  auditData.forEach(audit => {
    if (audit.auditorId && audit.auditeeId) {
      uniqueCollaborators.add(audit.auditorId);
      uniqueCollaborators.add(audit.auditeeId);

      const key = [audit.auditorId, audit.auditeeId].sort().join('-');
      connections.set(key, (connections.get(key) || 0) + 1);
    }
  });

  const totalCollaborators = uniqueCollaborators.size;
  const totalConnections = connections.size;
  const maxPossibleConnections = totalCollaborators > 1 ? (totalCollaborators * (totalCollaborators - 1)) / 2 : 0;

  const networkDensity = maxPossibleConnections > 0 ? (totalConnections / maxPossibleConnections) * 100 : 0;

  // Calculate influence score based on connection strength
  const connectionStrengths = Array.from(connections.values());
  const averageConnectionStrength = connectionStrengths.length > 0 ?
    connectionStrengths.reduce((sum, strength) => sum + strength, 0) / connectionStrengths.length : 0;

  const influenceScore = Math.min(100, (totalCollaborators * 2) + (averageConnectionStrength * 5) + (networkDensity * 0.5));

  return {
    uniqueCollaborators: totalCollaborators,
    totalConnections,
    networkDensity: Math.round(networkDensity * 10) / 10,
    averageConnectionStrength: Math.round(averageConnectionStrength * 10) / 10,
    influenceScore: Math.round(influenceScore),
    networkSize: totalCollaborators > 10 ? 'large' : (totalCollaborators > 5 ? 'medium' : 'small')
  };
};

/**
 * Analyze team performance and leadership effectiveness
 * @param {Array} teamData - Team/group performance data
 * @param {string} userId - Current user ID
 * @returns {Object} Team performance analysis
 */
export const analyzeTeamPerformance = (teamData = [], userId) => {
  if (!Array.isArray(teamData) || teamData.length === 0) {
    return {
      averageTeamGrade: 0,
      teamSuccessRate: 0,
      leadershipEffectiveness: 0,
      teamDiversity: 0
    };
  }

  const teamsAsLeader = teamData.filter(team => team.captainId === userId);
  const teamsAsMember = teamData.filter(team => team.captainId !== userId);

  // Calculate average team grades
  const allGrades = teamData.map(team => team.grade || 0).filter(grade => grade > 0);
  const averageTeamGrade = allGrades.length > 0 ? allGrades.reduce((sum, grade) => sum + grade, 0) / allGrades.length : 0;

  // Calculate success rate
  const successfulTeams = teamData.filter(team => (team.grade || 0) >= 1).length;
  const teamSuccessRate = teamData.length > 0 ? (successfulTeams / teamData.length) * 100 : 0;

  // Calculate leadership effectiveness
  const leaderGrades = teamsAsLeader.map(team => team.grade || 0).filter(grade => grade > 0);
  const memberGrades = teamsAsMember.map(team => team.grade || 0).filter(grade => grade > 0);

  const avgLeaderGrade = leaderGrades.length > 0 ? leaderGrades.reduce((sum, grade) => sum + grade, 0) / leaderGrades.length : 0;
  const avgMemberGrade = memberGrades.length > 0 ? memberGrades.reduce((sum, grade) => sum + grade, 0) / memberGrades.length : 0;

  const leadershipEffectiveness = avgMemberGrade > 0 ? (avgLeaderGrade / avgMemberGrade) * 100 : 100;

  // Calculate team diversity (based on different team members)
  const allTeamMembers = new Set();
  teamData.forEach(team => {
    if (team.members && Array.isArray(team.members)) {
      team.members.forEach(member => {
        if (member.id && member.id !== userId) {
          allTeamMembers.add(member.id);
        }
      });
    }
  });

  const teamDiversity = Math.min(100, allTeamMembers.size * 10); // Max 100 for 10+ unique collaborators

  return {
    averageTeamGrade: Math.round(averageTeamGrade * 100) / 100,
    teamSuccessRate: Math.round(teamSuccessRate * 10) / 10,
    leadershipEffectiveness: Math.round(leadershipEffectiveness),
    teamDiversity: Math.round(teamDiversity),
    teamsLed: teamsAsLeader.length,
    teamsParticipated: teamData.length,
    uniqueCollaborators: allTeamMembers.size
  };
};

// Calculate user level based on XP (standard 01 level calculation)
export const calculateLevel = (xp) => {
  if (xp < 1000) return 0;

  // Standard 01 level calculation: each level requires more XP
  // Level 1: 1000 XP, Level 2: 3000 XP, Level 3: 6000 XP, etc.
  // Formula: level n requires n * (n + 1) * 500 total XP

  let level = 0;
  let requiredXP = 0;

  while (requiredXP <= xp) {
    level++;
    requiredXP = level * (level + 1) * 500;
  }

  return level - 1; // Return the completed level
};

// Get XP required for next level
export const getXPForNextLevel = (currentLevel) => {
  const nextLevel = currentLevel + 1;
  return nextLevel * (nextLevel + 1) * 500;
};

// Get XP progress to next level
export const getXPProgress = (xp, currentLevel) => {
  const currentLevelXP = currentLevel * (currentLevel + 1) * 500;
  const nextLevelXP = getXPForNextLevel(currentLevel);
  const progressXP = xp - currentLevelXP;
  const requiredXP = nextLevelXP - currentLevelXP;

  return {
    current: progressXP,
    required: requiredXP,
    percentage: requiredXP > 0 ? (progressXP / requiredXP) * 100 : 0,
  };
};
