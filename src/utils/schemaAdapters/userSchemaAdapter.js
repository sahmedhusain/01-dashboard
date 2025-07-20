/**
 * User Schema Adapter
 * Normalizes user data from GraphQL to consistent internal format
 * Handles different user data structures and provides fallbacks
 * Aligned with reference example patterns for robust data handling
 */

import { validateDataWithErrors } from '../dataProcessing.js';

/**
 * Normalize user data from GraphQL response
 * @param {Object} rawUser - Raw user data from GraphQL
 * @returns {Object} Normalized user data
 */
export const normalizeUserData = (rawUser) => {
  if (!rawUser) {
    return {
      id: null,
      login: null,
      firstName: null,
      lastName: null,
      email: null,
      campus: null,
      auditRatio: 0,
      totalUp: 0,
      totalDown: 0,
      createdAt: null,
      profile: null,
      avatar: null
    };
  }

  return {
    id: rawUser.id || null,
    login: rawUser.login || null,
    firstName: rawUser.firstName || rawUser.profile?.firstName || null,
    lastName: rawUser.lastName || rawUser.profile?.lastName || null,
    email: rawUser.email || rawUser.profile?.email || null,
    campus: rawUser.campus || rawUser.profile?.campus || null,
    auditRatio: rawUser.auditRatio || 0,
    totalUp: rawUser.totalUp || 0,
    totalDown: rawUser.totalDown || 0,
    createdAt: rawUser.createdAt || null,
    profile: rawUser.profile || null,
    avatar: extractAvatarUrl(rawUser)
  };
};

/**
 * Extract avatar URL from various possible locations in user data
 * @param {Object} user - User data object
 * @returns {string|null} Avatar URL or null
 */
export const extractAvatarUrl = (user) => {
  if (!user) return null;

  // Check profile object first
  if (user.profile && typeof user.profile === 'object') {
    if (user.profile.avatar) return user.profile.avatar;
    if (user.profile.avatarUrl) return user.profile.avatarUrl;
    if (user.profile.picture) return user.profile.picture;
    if (user.profile.image) return user.profile.image;
    if (user.profile.photo) return user.profile.photo;
  }

  // Check direct properties
  if (user.avatar) return user.avatar;
  if (user.avatarUrl) return user.avatarUrl;
  if (user.picture) return user.picture;
  if (user.image) return user.image;

  return null;
};

/**
 * Get user display name with fallbacks
 * @param {Object} user - Normalized user data
 * @returns {string} Display name
 */
export const getUserDisplayName = (user) => {
  if (!user) return 'Unknown User';

  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }

  if (user.firstName) return user.firstName;
  if (user.lastName) return user.lastName;
  if (user.login) return user.login;

  return 'Unknown User';
};

/**
 * Get user email with fallbacks
 * @param {Object} user - Normalized user data
 * @returns {string} Email address
 */
export const getUserEmail = (user) => {
  if (!user) return null;
  return user.email || null;
};

/**
 * Generate user initials for avatar fallback
 * @param {Object} user - Normalized user data
 * @returns {string} User initials (max 2 characters)
 */
export const getUserInitials = (user) => {
  const displayName = getUserDisplayName(user);
  
  return displayName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Check if user has complete profile information
 * @param {Object} user - Normalized user data
 * @returns {boolean} True if profile is complete
 */
export const isProfileComplete = (user) => {
  if (!user) return false;
  
  return !!(
    user.login &&
    user.firstName &&
    user.lastName &&
    user.email &&
    user.campus
  );
};

/**
 * Get user registration date formatted
 * @param {Object} user - Normalized user data
 * @returns {Date|null} Registration date
 */
export const getUserRegistrationDate = (user) => {
  if (!user || !user.createdAt) return null;
  return new Date(user.createdAt);
};

/**
 * Normalize multiple users data
 * @param {Array} rawUsers - Array of raw user data from GraphQL
 * @returns {Array} Array of normalized user data
 */
export const normalizeUsersData = (rawUsers) => {
  if (!Array.isArray(rawUsers)) return [];
  return rawUsers.map(normalizeUserData);
};

/**
 * Extract user campus information with fallbacks
 * @param {Object} user - Normalized user data
 * @returns {string} Campus name or default
 */
export const getUserCampus = (user) => {
  if (!user) return 'Unknown Campus';
  return user.campus || 'Unknown Campus';
};

/**
 * Check if user is from specific campus
 * @param {Object} user - Normalized user data
 * @param {string} campusName - Campus name to check
 * @returns {boolean} True if user is from specified campus
 */
export const isUserFromCampus = (user, campusName) => {
  if (!user || !campusName) return false;
  return user.campus?.toLowerCase() === campusName.toLowerCase();
};

/**
 * Get user audit statistics in normalized format
 * @param {Object} user - Normalized user data
 * @returns {Object} Audit statistics
 */
export const getUserAuditStats = (user) => {
  if (!user) {
    return {
      ratio: 0,
      given: 0,
      received: 0
    };
  }

  return {
    ratio: user.auditRatio || 0,
    given: Math.round((user.totalUp || 0) / 1000), // Convert from micro-units
    received: user.totalDown || 0
  };
};

/**
 * Sort users by various criteria
 * @param {Array} users - Array of normalized user data
 * @param {string} sortBy - Sort criteria ('name', 'login', 'campus', 'auditRatio')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted users array
 */
export const sortUsers = (users, sortBy = 'name', order = 'asc') => {
  if (!Array.isArray(users)) return [];

  const sortedUsers = [...users].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'name':
        aValue = getUserDisplayName(a).toLowerCase();
        bValue = getUserDisplayName(b).toLowerCase();
        break;
      case 'login':
        aValue = (a.login || '').toLowerCase();
        bValue = (b.login || '').toLowerCase();
        break;
      case 'campus':
        aValue = (a.campus || '').toLowerCase();
        bValue = (b.campus || '').toLowerCase();
        break;
      case 'auditRatio':
        aValue = a.auditRatio || 0;
        bValue = b.auditRatio || 0;
        break;
      default:
        aValue = getUserDisplayName(a).toLowerCase();
        bValue = getUserDisplayName(b).toLowerCase();
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sortedUsers;
};

/**
 * Filter users by search term
 * @param {Array} users - Array of normalized user data
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered users array
 */
export const filterUsersBySearch = (users, searchTerm) => {
  if (!Array.isArray(users) || !searchTerm) return users;

  const term = searchTerm.toLowerCase();
  
  return users.filter(user => {
    const displayName = getUserDisplayName(user).toLowerCase();
    const login = (user.login || '').toLowerCase();
    const campus = (user.campus || '').toLowerCase();
    const email = (user.email || '').toLowerCase();

    return (
      displayName.includes(term) ||
      login.includes(term) ||
      campus.includes(term) ||
      email.includes(term)
    );
  });
};

/**
 * Validate user data structure according to GraphQL schema
 * @param {Object} userData - User data to validate
 * @returns {Object} Validation result with errors and warnings
 */
export const validateUserData = (userData) => {
  const schema = {
    type: 'object',
    required: ['id', 'login'],
    optional: ['firstName', 'lastName', 'email', 'campus', 'createdAt']
  };

  const validation = validateDataWithErrors(userData, schema);

  // Additional user-specific validations
  if (userData) {
    if (userData.email && !isValidEmail(userData.email)) {
      validation.warnings.push('Invalid email format');
    }

    if (userData.auditRatio && (userData.auditRatio < 0 || userData.auditRatio > 10)) {
      validation.warnings.push('Audit ratio seems out of normal range');
    }

    if (userData.createdAt && new Date(userData.createdAt) > new Date()) {
      validation.warnings.push('Creation date is in the future');
    }
  }

  return validation;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitize user data for safe display
 * @param {Object} userData - User data to sanitize
 * @returns {Object} Sanitized user data
 */
export const sanitizeUserData = (userData) => {
  if (!userData) return null;

  const sanitized = { ...userData };

  // Remove potentially sensitive fields
  delete sanitized.password;
  delete sanitized.token;
  delete sanitized.privateKey;

  // Sanitize strings
  if (sanitized.firstName) {
    sanitized.firstName = sanitized.firstName.trim().slice(0, 50);
  }
  if (sanitized.lastName) {
    sanitized.lastName = sanitized.lastName.trim().slice(0, 50);
  }
  if (sanitized.email) {
    sanitized.email = sanitized.email.trim().toLowerCase();
  }

  return sanitized;
};

/**
 * Transform user data for GraphQL mutations
 * @param {Object} userData - User data to transform
 * @returns {Object} GraphQL-ready user data
 */
export const transformUserForGraphQL = (userData) => {
  if (!userData) return null;

  const validation = validateUserData(userData);
  if (!validation.isValid) {
    throw new Error(`Invalid user data: ${validation.errors.join(', ')}`);
  }

  return {
    id: userData.id,
    login: userData.login,
    firstName: userData.firstName || null,
    lastName: userData.lastName || null,
    email: userData.email || null,
    campus: userData.campus || null,
    profile: userData.profile ? {
      ...userData.profile,
      updatedAt: new Date().toISOString()
    } : null
  };
};

/**
 * Calculate user activity score based on various metrics
 * @param {Object} userData - User data with activity metrics
 * @returns {Object} Activity score and breakdown
 */
export const calculateUserActivityScore = (userData) => {
  if (!userData) {
    return {
      score: 0,
      breakdown: { projects: 0, audits: 0, collaboration: 0 },
      grade: 'F'
    };
  }

  const projectScore = Math.min(100, (userData.totalProjects || 0) * 5);
  const auditScore = Math.min(100, ((userData.totalUp || 0) + (userData.totalDown || 0)) * 2);
  const collaborationScore = Math.min(100, (userData.auditRatio || 0) * 20);

  const overallScore = Math.round((projectScore + auditScore + collaborationScore) / 3);

  let grade = 'F';
  if (overallScore >= 90) grade = 'A';
  else if (overallScore >= 80) grade = 'B';
  else if (overallScore >= 70) grade = 'C';
  else if (overallScore >= 60) grade = 'D';

  return {
    score: overallScore,
    breakdown: {
      projects: Math.round(projectScore),
      audits: Math.round(auditScore),
      collaboration: Math.round(collaborationScore)
    },
    grade
  };
};
