// ============================================================================
// DATA FORMATTING UTILITIES
// Functions for formatting and displaying data in components
// ============================================================================

// ============================================================================
// XP FORMATTING
// ============================================================================

/**
 * Format XP values for display
 * @param xp - XP value to format
 * @returns Formatted XP string
 */
export const formatXP = (xp: number | null | undefined): string => {
  if (!xp || isNaN(xp)) return '0 XP';

  // XP values are already in bytes, format appropriately
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M XP`;
  } else if (xp >= 1000) {
    return `${Math.round(xp / 1000)}k XP`;
  } else {
    return `${Math.round(xp)} XP`;
  }
};

/**
 * Format XP values for quick stats (KB format, no decimals, no "XP" word)
 * @param xp - XP value to format
 * @returns Formatted XP string for quick stats
 */
export const formatXPForQuickStats = (xp: number | null | undefined): string => {
  if (!xp || isNaN(xp)) return '0';

  // XP values are already in bytes, format as KB (rounded integer)
  if (xp >= 1000000) {
    return `${Math.round(xp / 1000000)}M`;
  } else if (xp >= 1000) {
    return `${Math.round(xp / 1000)}K`;
  } else {
    return `${Math.round(xp)}`;
  }
};

/**
 * Get XP progress percentage for level progression
 * @param currentXP - Current XP amount
 * @param level - Current level
 * @returns Progress percentage (0-100)
 */
export const getXPProgress = (currentXP: number | null | undefined, level: number | null | undefined): number => {
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

interface User {
  firstName?: string;
  lastName?: string;
  login?: string;
}

/**
 * Get user display name from user data
 * @param user - User object
 * @returns Formatted display name
 */
export const getUserDisplayName = (user: User | null | undefined): string => {
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

interface UserWithEmail extends User {
  attrs?: {
    email?: string;
  };
  email?: string;
}

/**
 * Get user email from user data
 * @param user - User object
 * @returns User email or fallback
 */
export const getUserEmail = (user: UserWithEmail | null | undefined): string => {
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
 * @param campus - Campus name to format
 * @returns Formatted campus name
 */
export const formatCampusName = (campus: string | null | undefined): string => {
  if (!campus) return 'Unknown Campus';
  return campus.charAt(0).toUpperCase() + campus.slice(1).toLowerCase();
};

interface UserWithAvatar extends User {
  profile?: {
    avatar?: string;
    avatarUrl?: string;
    picture?: string;
    image?: string;
    photo?: string;
  };
  avatar?: string;
  avatarUrl?: string;
  picture?: string;
  image?: string;
  photo?: string;
}

/**
 * Get avatar URL for user from GraphQL endpoint
 * @param user - User object from GraphQL query
 * @returns Avatar URL or fallback
 */
export const getAvatarUrl = (user: UserWithAvatar | null | undefined): string | null => {
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
 * @param dateInput - Date to format
 * @returns Formatted date string
 */
export const formatDate = (dateInput: string | Date | null | undefined): string => {
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
 * @param dateInput - Date to format
 * @returns Formatted date and time string
 */
export const formatDateTime = (dateInput: string | Date | null | undefined): string => {
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
 * @param value - Value to format as percentage
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number | null | undefined, decimals = 1): string => {
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
 * @param ratio - Audit ratio value
 * @returns Formatted audit ratio
 */
export const formatAuditRatio = (ratio: number | null | undefined): string => {
  if (ratio == null || isNaN(ratio)) return '0.0';
  return ratio.toFixed(1);
};

/**
 * Format audit amounts (received/done) for display
 * @param {number} amount - Audit amount value
 * @returns {string} Formatted audit amount
 */
export const formatAuditAmount = (amount) => {
  if (amount == null || isNaN(amount)) return '0';
  // Audit amounts are already in correct units, no need to divide
  return Math.round(amount).toString();
};

/**
 * Format skill XP as percentage for display
 * @param skillXP - Skill XP value
 * @param totalXP - Total XP for percentage calculation
 * @returns Formatted skill percentage
 */
export const formatSkillPercentage = (skillXP: number | null | undefined, totalXP: number | null | undefined): string => {
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
    const diffMs = now.getTime() - date.getTime();
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

interface Thresholds {
  high?: number;
  medium?: number;
}

/**
 * Get badge variant based on numeric value and thresholds
 * @param value - Numeric value to evaluate
 * @param thresholds - Threshold configuration
 * @returns Badge variant
 */
export const getBadgeVariant = (value: number, thresholds: Thresholds = {}): string => {
  const { high = 70, medium = 40 } = thresholds;

  if (value >= high) return 'success';
  if (value >= medium) return 'primary';
  return 'warning';
};
