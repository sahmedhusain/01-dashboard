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
    try {
      const profile = typeof user.profile === 'string' ? JSON.parse(user.profile) : user.profile;
      if (profile.avatar) return profile.avatar;
      if (profile.avatarUrl) return profile.avatarUrl;
      if (profile.picture) return profile.picture;
    } catch (e) {
      console.warn('Error parsing user profile for avatar:', e);
    }
  }
  
  // Check attrs field for avatar data
  if (user.attrs) {
    try {
      const attrs = typeof user.attrs === 'string' ? JSON.parse(user.attrs) : user.attrs;
      if (attrs.avatar) return attrs.avatar;
      if (attrs.avatarUrl) return attrs.avatarUrl;
      if (attrs.picture) return attrs.picture;
      if (attrs.image) return attrs.image;
    } catch (e) {
      console.warn('Error parsing user attrs for avatar:', e);
    }
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
    try {
      const profile = typeof user.profile === 'string' ? JSON.parse(user.profile) : user.profile;
      if (profile.firstName && profile.lastName) {
        return `${profile.firstName} ${profile.lastName}`;
      }
      if (profile.name) return profile.name;
      if (profile.displayName) return profile.displayName;
    } catch (e) {
      console.warn('Error parsing user profile for display name:', e);
    }
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
    try {
      const profile = typeof user.profile === 'string' ? JSON.parse(user.profile) : user.profile;
      if (profile.email) return profile.email;
    } catch (e) {
      console.warn('Error parsing user profile for email:', e);
    }
  }

  // Check attrs field
  if (user.attrs) {
    try {
      const attrs = typeof user.attrs === 'string' ? JSON.parse(user.attrs) : user.attrs;
      if (attrs.email) return attrs.email;
    } catch (e) {
      console.warn('Error parsing user attrs for email:', e);
    }
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
 * Safe JSON parse with fallback
 * @param {string} jsonString - JSON string to parse
 * @param {*} fallback - Fallback value if parsing fails
 * @returns {*} Parsed object or fallback
 */
export const safeJsonParse = (jsonString, fallback = {}) => {
  if (!jsonString) return fallback;
  
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.warn('Error parsing JSON:', e);
    return fallback;
  }
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

    // Raw data for advanced processing
    rawData: user,
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
