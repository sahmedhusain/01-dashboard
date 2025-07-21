// ============================================================================
// SIMPLIFIED GRAPHQL EXPORTS - FOLLOWING REFERENCE PATTERNS
// ============================================================================

// Export core queries (simplified and optimized)
export * from './coreQueries';

// Export data service
export { GraphQLService, graphqlService } from './dataService';

// Re-export client for convenience
export { default as client } from './client';

// ============================================================================
// QUERY CATEGORIES FOR EASY REFERENCE - UPDATED
// ============================================================================

// User-related queries (updated to use new names)
export const USER_QUERIES = [
  'GET_USER_STATS',
  'GET_AUDIT_RATIO_LEADERBOARD',
  'GET_USERS_LIST',
  'GET_USER_BASIC_INFO',
  'GET_USER_COMPLETE',
  'GET_USERS_LIST',
  'GET_USER_STATS',
  'GET_USER_PROGRESS',
  'GET_USER_RESULTS',
  'GET_USER_GROUPS',
];

// Analytics queries (updated to use new names)
export const ANALYTICS_QUERIES = [
  'GET_USER_COMPLETE',
  'GET_USER_STATS',
  'GET_LEADERBOARD',
  'GET_USER_XP_TRANSACTIONS',
  'GET_USER_AUDIT_TRANSACTIONS',
  'GET_PROGRESS_STATS',
];

// Transaction queries (updated to use new names)
export const TRANSACTION_QUERIES = [
  'GET_USER_TRANSACTIONS',
  'GET_LEADERBOARD',
  'GET_TRANSACTION_AGGREGATES',
  'GET_USER_XP_TRANSACTIONS',
  'GET_USER_XP_TRANSACTIONS',
];

// Audit queries (corrected)
export const AUDIT_QUERIES = [
  'GET_PENDING_AUDITS',
  'GET_COMPLETED_AUDITS',
  'GET_AUDIT_RATIO',
  'GET_AUDIT_TIMELINE',
];

// Group queries (new)
export const GROUP_QUERIES = [
  'GET_ACTIVE_GROUPS',
  'GET_USER_GROUPS',
];

// Role queries (new)
export const ROLE_QUERIES = [
  'GET_ALL_ROLES',
  'GET_ROLE_STATISTICS',
];

// Object queries (new)
export const OBJECT_QUERIES = [
  'GET_ROOT_OBJECTS',
  'GET_LEAF_OBJECTS',
];

// Enhanced progress queries (new)
export const ENHANCED_PROGRESS_QUERIES = [
  'GET_COMPLETED_PROGRESS',
  'GET_IN_PROGRESS',
  'GET_USER_PROGRESS',
  'GET_USER_RESULTS',
];

// Enhanced result queries (new)
export const ENHANCED_RESULT_QUERIES = [
  'GET_LATEST_RESULTS',
  'GET_PROJECT_RESULTS',
];

// Progress and result queries
export const PROGRESS_QUERIES = [
  'GET_USER_PROGRESS',
  'GET_PROGRESS_BY_PATH',
  'GET_COMPLETED_PROGRESS',
  'GET_USER_RESULTS',
  'GET_PROJECT_RESULTS',
  'GET_PROGRESS_TIMELINE',
  'GET_LEARNING_PATH_PROGRESS',
];

// Core entity queries
export const CORE_ENTITY_QUERIES = [
  'GET_PATH_INFO',
  'GET_PATH_ARCHIVE',
  'GET_ACTIVE_PATHS_BY_CAMPUS',
  'GET_TIMING_INFO',
  'GET_TIMING_BY_STATUS',
  'GET_MARKDOWN_CONTENT',
  'GET_MARKDOWN_BY_NAME',
  'GET_MARKDOWN_BY_PATH',
  'GET_OBJECT_TYPES',
  'GET_OBJECTS_BY_TYPE',
  'GET_RECORD_TYPES',
  'GET_RECORDS_BY_TYPE',
  'GET_TRANSACTION_TYPES',
  'GET_TRANSACTION_STATS_BY_TYPE',
  'GET_SYSTEM_OVERVIEW',
  'GET_ENTITY_HEALTH_CHECK',
];

// Advanced analytics queries
export const ADVANCED_ANALYTICS_QUERIES = [
  'GET_COLLABORATION_ANALYTICS',
  'GET_SKILL_PROGRESSION_ANALYSIS',
  'GET_CAMPUS_COMPARISON_ANALYTICS',
  'GET_TIME_BASED_ANALYTICS',
  'GET_PERFORMANCE_BENCHMARKING',
  'GET_LEARNING_VELOCITY_ANALYTICS',
];

// NOTE: Mutation queries removed - not needed for current read-only objectives
// If mutations are needed in the future, they can be recreated in a new mutations.js file

// NOTE: Subscription queries removed - not needed for current objectives
// Real-time features can be added later if needed

// Optimized queries
export const OPTIMIZED_QUERIES = [
  'GET_MINIMAL_USER_DASHBOARD',
  'GET_OPTIMIZED_USER_PROFILE',
  'GET_STREAMLINED_ANALYTICS',
  'GET_PAGINATED_TRANSACTIONS_OPTIMIZED',
  'GET_OPTIMIZED_XP_TIMELINE',
  'GET_STREAMLINED_AUDIT_HISTORY',
  'GET_LIGHTWEIGHT_PROGRESS',
  'SEARCH_USERS_OPTIMIZED',
  'GET_EFFICIENT_LEADERBOARD',
  'GET_BATCH_USER_DATA',
  'PERFORMANCE_TEST_QUERY',
];

// ============================================================================
// QUERY METADATA FOR OPTIMIZATION - UPDATED
// ============================================================================

export const QUERY_METADATA = {
  // High-priority queries for dashboard
  DASHBOARD_QUERIES: [
    'GET_USER_COMPLETE',
    'GET_USER_BASIC_INFO',
    'GET_USER_STATS',
    'GET_TRANSACTION_AGGREGATES',
  ],

  // Heavy queries that should be cached aggressively
  HEAVY_QUERIES: [
    'GET_USER_COMPLETE',
    'GET_LEADERBOARD',
    'GET_USER_XP_TRANSACTIONS',
    'GET_USER_AUDIT_TRANSACTIONS',
    'GET_PROGRESS_STATS',
  ],

  // Real-time queries that need fresh data
  REALTIME_QUERIES: [
    'GET_USER_AUDITS',
    'GET_USER_GROUPS',
    'GET_USER_PROGRESS',
  ],

  // Queries suitable for background loading
  BACKGROUND_QUERIES: [
    'GET_COMPLETED_AUDITS',
    'GET_USERS_WITH_HIGH_AUDIT_RATIO',
    'GET_USERS_WITH_PAGINATION',
    'GET_USER_RESULTS',
  ],
};

// ============================================================================
// QUERY COMPLEXITY RATINGS - UPDATED
// ============================================================================

export const QUERY_COMPLEXITY = {
  LOW: [
    'GET_USER_INFO',
    'GET_USER_BY_ID',
    'GET_TOTAL_XP',
    'GET_AUDIT_RATIO',
    'GET_USER_LEVEL',
    'GET_USERS_BY_CAMPUS',
  ],

  MEDIUM: [
    'GET_USER_STATISTICS',
    'GET_USERS_WITH_PAGINATION',
    'GET_ACTIVE_GROUPS',
    'GET_PENDING_AUDITS',
    'GET_COMPLETED_AUDITS',
    'GET_USER_SKILLS',
    'GET_TRANSACTIONS_BY_TYPE',
  ],

  HIGH: [
    'GET_DASHBOARD_DATA',
    'GET_TOP_XP_EARNERS',
    'GET_XP_BY_PROJECT',
    'GET_USER_PROGRESS',
    'GET_USER_RESULTS',
    'GET_USER_GROUPS',
    'GET_USERS_WITH_HIGH_AUDIT_RATIO',
  ],

  VERY_HIGH: [
    'GET_XP_TIMELINE',
    'GET_AUDIT_TIMELINE',
    'GET_PROJECT_RESULTS',
    'GET_USERS_ABOVE_LEVEL',
    'GET_USERS_ABOVE_LEVEL_IN_COHORT',
  ],
};

// ============================================================================
// RECOMMENDED USAGE PATTERNS
// ============================================================================

export const USAGE_PATTERNS = {
  // For initial page load - optimized for speed
  INITIAL_LOAD: [
    'GET_USER_BASIC_INFO',
    'GET_TRANSACTION_AGGREGATES',
    'GET_USER_STATS',
  ],

  // For profile page - comprehensive but cached
  PROFILE_PAGE: [
    'GET_USER_COMPLETE',
    'GET_USER_TRANSACTIONS',
    'GET_USER_BASIC_INFO',
  ],

  // For analytics dashboard - performance optimized
  ANALYTICS_DASHBOARD: [
    'GET_LEADERBOARD',
    'GET_USER_STATS',
    'GET_USER_BASIC_INFO',
    'GET_USER_GROUPS',
  ],

  // For detailed views - paginated and optimized
  DETAILED_VIEWS: [
    'GET_USER_XP_TRANSACTIONS',
    'GET_USER_AUDIT_TRANSACTIONS',
    'GET_PROGRESS_STATS',
    'GET_USER_RESULTS',
  ],

  // For comparison features
  COMPARISON_FEATURES: [
    'GET_AUDIT_RATIO_LEADERBOARD',
    'GET_USERS_LIST',
    'GET_LEADERBOARD',
  ],

  // For administrative views
  ADMIN_VIEWS: [
    'GET_USERS_WITH_PAGINATION',
    'GET_PENDING_AUDITS',
    'GET_COMPLETED_AUDITS',
    'GET_ACTIVE_GROUPS',
  ],

  // NOTE: Real-time features and data modification removed - read-only implementation
};

// ============================================================================
// NOTE: FRAGMENTS REMOVED
// ============================================================================
// Fragments were removed to simplify the GraphQL implementation.
// The new coreQueries.js uses direct field selection instead of fragments
// for better performance and maintainability.

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get queries by category
 * @param {string} category - Query category
 * @returns {string[]} Array of query names
 */
export function getQueriesByCategory(category) {
  const categoryMap = {
    user: USER_QUERIES,
    analytics: ANALYTICS_QUERIES,
    transaction: TRANSACTION_QUERIES,
    audit: AUDIT_QUERIES,
    group: GROUP_QUERIES,
    role: ROLE_QUERIES,
    object: OBJECT_QUERIES,
    progress: ENHANCED_PROGRESS_QUERIES,
    result: ENHANCED_RESULT_QUERIES,
    // NOTE: mutations and subscriptions removed for current read-only implementation
  };

  return categoryMap[category] || [];
}

/**
 * Get queries by complexity level
 * @param {string} complexity - Complexity level (LOW, MEDIUM, HIGH, VERY_HIGH)
 * @returns {string[]} Array of query names
 */
export function getQueriesByComplexity(complexity) {
  return QUERY_COMPLEXITY[complexity] || [];
}

/**
 * Get recommended queries for a usage pattern
 * @param {string} pattern - Usage pattern
 * @returns {string[]} Array of query names
 */
export function getQueriesForPattern(pattern) {
  return USAGE_PATTERNS[pattern] || [];
}

/**
 * Check if a query is suitable for background loading
 * @param {string} queryName - Name of the query
 * @returns {boolean} True if suitable for background loading
 */
export function isBackgroundQuery(queryName) {
  return QUERY_METADATA.BACKGROUND_QUERIES.includes(queryName);
}

/**
 * Check if a query needs real-time data
 * @param {string} queryName - Name of the query
 * @returns {boolean} True if needs real-time data
 */
export function isRealtimeQuery(queryName) {
  return QUERY_METADATA.REALTIME_QUERIES.includes(queryName);
}

/**
 * Get all fragments of a specific type
 * NOTE: Fragments were removed in the simplified implementation
 * This function is kept for backward compatibility but returns empty arrays
 * @param {string} type - Fragment type (core, aggregate, specialized)
 * @returns {string[]} Array of fragment names (always empty in current implementation)
 */
export function getFragmentsByType(type) {
  // Fragments were removed for simplification - return empty array
  console.warn(`getFragmentsByType('${type}') called but fragments were removed for simplification`);
  return [];
}
