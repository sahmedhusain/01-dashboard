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
  
  // Try to get full name from profile
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
