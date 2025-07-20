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
  if (!xp || isNaN(xp)) return '0 KB XP';

  // XP is already in the correct unit, just divide by 1000 to get KB
  const kbValue = Math.round(xp / 1000);
  return `${kbValue} KB XP`;
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

  // Check attrs.email first (primary source from GraphQL)
  if (user.attrs && user.attrs.email) {
    return user.attrs.email;
  }

  // Fallback to direct email field or login
  return user.email || user.login || '';
};

/**
 * Format campus name with proper capitalization
 * @param {string} campus - Campus name to format
 * @returns {string} Formatted campus name
 */
export const formatCampusName = (campus) => {
  if (!campus) return 'Unknown Campus';
  return campus.charAt(0).toUpperCase() + campus.slice(1).toLowerCase();
};

/**
 * Get avatar URL for user from GraphQL endpoint
 * @param {Object} user - User object from GraphQL query
 * @returns {string} Avatar URL or fallback
 */
export const getAvatarUrl = (user) => {
  if (!user) return null;

  // Check for avatar in user.profile object (primary source from GraphQL)
  if (user.profile && typeof user.profile === 'object') {
    // Common avatar field names in profile
    if (user.profile.avatar) return user.profile.avatar;
    if (user.profile.avatarUrl) return user.profile.avatarUrl;
    if (user.profile.picture) return user.profile.picture;
    if (user.profile.image) return user.profile.image;
    if (user.profile.photo) return user.profile.photo;
  }

  // Check for direct avatar field on user object
  if (user.avatar) return user.avatar;
  if (user.avatarUrl) return user.avatarUrl;
  if (user.picture) return user.picture;
  if (user.image) return user.image;

  // Try platform-specific avatar endpoints
  if (user.login) {
    // Try GitHub avatar pattern (common fallback for reboot01 users)
    // The Avatar component will handle 404s gracefully and fall back to initials
    return `https://github.com/${user.login}.png?size=128`;
  }

  // No avatar found - return null to trigger fallback in Avatar component
  return null;
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
  if (ratio == null || isNaN(ratio)) return '0.0 MB';
  return `${ratio.toFixed(1)} MB`;
};

/**
 * Format audit amounts (received/done) for display
 * @param {number} amount - Audit amount value
 * @returns {string} Formatted audit amount
 */
export const formatAuditAmount = (amount) => {
  if (amount == null || isNaN(amount)) return '0.00 MB';
  return `${(amount / 1000000).toFixed(2)} MB`;
};

/**
 * Format skill XP as percentage for display
 * @param {number} skillXP - Skill XP value
 * @param {number} totalXP - Total XP for percentage calculation
 * @returns {string} Formatted skill percentage
 */
export const formatSkillPercentage = (skillXP, totalXP) => {
  if (!skillXP || !totalXP || totalXP === 0) return '0%';
  const percentage = (skillXP / totalXP) * 100;
  return `${Math.round(percentage)}%`;
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

// ============================================================================
// ENHANCED UTILITY FUNCTIONS FOR COMPONENT PROCESSORS
// ============================================================================

/**
 * Enhanced XP progress calculation with detailed information
 * @param {number} currentXP - Current XP amount
 * @param {number} level - Current level
 * @returns {Object} Detailed progress information
 */
export const getXPProgressDetailed = (currentXP, level) => {
  if (!currentXP || !level) {
    return {
      percentage: 0,
      current: 0,
      required: 1000,
      remaining: 1000
    };
  }

  const currentLevelXP = level * 1000;
  const nextLevelXP = (level + 1) * 1000;
  const progressXP = currentXP - currentLevelXP;
  const requiredXP = nextLevelXP - currentLevelXP;
  const remainingXP = requiredXP - progressXP;

  return {
    percentage: Math.min(100, Math.max(0, (progressXP / requiredXP) * 100)),
    current: Math.max(0, progressXP),
    required: requiredXP,
    remaining: Math.max(0, remainingXP)
  };
};



/**
 * Format skill name for display (replace underscores with spaces)
 * @param {string} skillName - Raw skill name
 * @returns {string} Formatted skill name
 */
export const formatSkillName = (skillName) => {
  if (!skillName) return 'Unknown Skill';
  return skillName.replace(/_/g, ' ');
};

/**
 * Get badge variant based on numeric value and thresholds
 * @param {number} value - Numeric value to evaluate
 * @param {Object} thresholds - Threshold configuration
 * @returns {string} Badge variant
 */
export const getBadgeVariant = (value, thresholds = {}) => {
  const { high = 70, medium = 40 } = thresholds;

  if (value >= high) return 'success';
  if (value >= medium) return 'primary';
  return 'warning';
};
