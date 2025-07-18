// ============================================================================
// DATA FORMATTING UTILITIES
// Functions for formatting and displaying data in components
// ============================================================================

// ============================================================================
// XP FORMATTING
// ============================================================================

/**
 * Format XP values for display
 * @param {number} xp - XP value to format
 * @returns {string} Formatted XP string
 */
export const formatXP = (xp) => {
  if (!xp || isNaN(xp)) return '0 XP';
  
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M XP`;
  }
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K XP`;
  }
  return `${xp} XP`;
};

/**
 * Get XP progress percentage for level progression
 * @param {number} currentXP - Current XP amount
 * @param {number} level - Current level
 * @returns {number} Progress percentage (0-100)
 */
export const getXPProgress = (currentXP, level) => {
  if (!currentXP || !level) return 0;
  
  // Simple calculation - each level requires 1000 XP more than the previous
  const currentLevelXP = level * 1000;
  const nextLevelXP = (level + 1) * 1000;
  const progressXP = currentXP - currentLevelXP;
  const requiredXP = nextLevelXP - currentLevelXP;
  
  return Math.min(100, Math.max(0, (progressXP / requiredXP) * 100));
};

// ============================================================================
// USER DATA FORMATTING
// ============================================================================

/**
 * Get user display name from user data
 * @param {Object} user - User object
 * @returns {string} Formatted display name
 */
export const getUserDisplayName = (user) => {
  if (!user) return 'Unknown User';
  
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  if (user.firstName) {
    return user.firstName;
  }
  if (user.lastName) {
    return user.lastName;
  }
  if (user.login) {
    return user.login;
  }
  return 'Unknown User';
};

/**
 * Get user email from user data
 * @param {Object} user - User object
 * @returns {string} User email or fallback
 */
export const getUserEmail = (user) => {
  if (!user) return '';
  return user.email || user.login || '';
};

/**
 * Get avatar URL for user
 * @param {Object} user - User object
 * @returns {string} Avatar URL or default
 */
export const getAvatarUrl = (user) => {
  if (!user) return '/default-avatar.png';
  
  // If user has an avatar URL, use it
  if (user.avatar) return user.avatar;
  
  // Generate a simple avatar based on user initials
  const displayName = getUserDisplayName(user);
  const initials = displayName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  // Return a placeholder URL with initials
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=6366f1&color=fff&size=128`;
};

// ============================================================================
// DATE FORMATTING
// ============================================================================

/**
 * Format date for display
 * @param {string|Date} dateInput - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateInput) => {
  if (!dateInput) return '';
  
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return '';
  }
};

/**
 * Format date and time for display
 * @param {string|Date} dateInput - Date to format
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (dateInput) => {
  if (!dateInput) return '';
  
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '';
  }
};

// ============================================================================
// PERCENTAGE AND NUMERIC FORMATTING
// ============================================================================

/**
 * Format percentage for display
 * @param {number} value - Value to format as percentage
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value == null || isNaN(value)) return '0%';
  return `${value.toFixed(decimals)}%`;
};

/**
 * Calculate percentage from two values
 * @param {number} value - Numerator value
 * @param {number} total - Denominator value
 * @returns {number} Percentage (0-100)
 */
export const calculatePercentage = (value, total) => {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100);
};

// ============================================================================
// SKILL AND PROFICIENCY FORMATTING
// ============================================================================

/**
 * Calculate proficiency level from skill amount
 * @param {number} amount - Skill amount/XP
 * @returns {string} Proficiency level
 */
export const calculateProficiencyLevel = (amount) => {
  if (!amount || amount < 100) return 'Beginner';
  if (amount < 500) return 'Novice';
  if (amount < 1000) return 'Intermediate';
  if (amount < 2000) return 'Advanced';
  if (amount < 5000) return 'Expert';
  return 'Master';
};

/**
 * Get skill color based on proficiency
 * @param {number} amount - Skill amount/XP
 * @returns {string} CSS color class or hex color
 */
export const getSkillColor = (amount) => {
  if (!amount || amount < 100) return '#6b7280'; // Gray
  if (amount < 500) return '#3b82f6'; // Blue
  if (amount < 1000) return '#10b981'; // Green
  if (amount < 2000) return '#f59e0b'; // Yellow
  if (amount < 5000) return '#ef4444'; // Red
  return '#8b5cf6'; // Purple
};

// ============================================================================
// PROJECT AND AUDIT FORMATTING
// ============================================================================

/**
 * Format project name from path
 * @param {string} path - Project path
 * @returns {string} Formatted project name
 */
export const formatProjectName = (path) => {
  if (!path) return 'Unknown Project';
  
  // Extract the last part of the path and format it
  const name = path.split('/').pop() || path;
  
  // Convert kebab-case or snake_case to Title Case
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * Format audit ratio for display
 * @param {number} ratio - Audit ratio value
 * @returns {string} Formatted audit ratio
 */
export const formatAuditRatio = (ratio) => {
  if (ratio == null || isNaN(ratio)) return '0.00';
  return ratio.toFixed(2);
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length (default: 50)
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Format large numbers with K/M suffixes
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Get relative time string (e.g., "2 days ago")
 * @param {string|Date} dateInput - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (dateInput) => {
  if (!dateInput) return '';
  
  try {
    const date = new Date(dateInput);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  } catch {
    return '';
  }
};
