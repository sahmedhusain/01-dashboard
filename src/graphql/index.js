// ============================================================================
// GRAPHQL QUERIES AND FRAGMENTS - ORGANIZED EXPORTS
// ============================================================================

// Export all fragments
export * from './fragments.js';
export * from './aggregateFragments.js';

// Export domain-specific queries
export * from './userQueries.js';
export * from './analyticsQueries.js';
export * from './transactionQueries.js';
export * from './auditQueries.js';
export * from './progressQueries.js';
export * from './coreEntityQueries.js';
export * from './advancedAnalyticsQueries.js';

// Export mutations and subscriptions
export * from './mutations.js';
export * from './subscriptions.js';

// Export optimized queries
export * from './optimizedQueries.js';

// Re-export client for convenience
export { default as client } from './client.js';
export { performanceMonitor } from './client.js';

// ============================================================================
// QUERY CATEGORIES FOR EASY REFERENCE
// ============================================================================

// User-related queries
export const USER_QUERIES = [
  'GET_USER_INFO',
  'GET_USER_PROFILE',
  'GET_USER_EVENTS_DETAILED',
  'GET_USER_LABELS',
  'GET_USER_MATCHES_DETAILED',
  'GET_USER_OBJECT_AVAILABILITIES',
  'GET_USER_PROGRESS_BY_PATH',
  'GET_USER_SESSIONS',
  'GET_USER_XPS',
  'GET_USER_CREATED_OBJECTS',
];

// Analytics queries
export const ANALYTICS_QUERIES = [
  'GET_COMPREHENSIVE_USER_ANALYTICS',
  'GET_BASIC_USER_DASHBOARD',
  'GET_PERFORMANCE_ANALYTICS',
  'GET_XP_STATISTICS',
  'GET_PROJECT_STATISTICS',
];

// Transaction queries
export const TRANSACTION_QUERIES = [
  'GET_USER_TRANSACTIONS',
  'GET_TOP_TRANSACTION',
  'GET_TOTAL_XP',
  'GET_USER_TECHNOLOGIES',
  'GET_USER_TECHNICAL_SKILLS',
  'GET_XP_BY_TIME_PERIOD',
  'GET_XP_BY_PROJECT_TYPE',
  'GET_SKILL_PROGRESSION',
  'GET_CAMPUS_TRANSACTION_STATS',
];

// Audit queries
export const AUDIT_QUERIES = [
  'GET_AUDIT_STATUS',
  'GET_AUDIT_RATIO',
  'GET_USER_AUDITS',
  'GET_AUDIT_PERFORMANCE_TIMELINE',
  'GET_AUDIT_QUALITY_METRICS',
  'GET_AUDIT_PEER_COMPARISON',
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

// Mutation queries
export const MUTATION_QUERIES = [
  'UPDATE_USER_PROFILE',
  'UPDATE_USER_ATTRS',
  'UPDATE_USER_PROFILE_DATA',
  'CREATE_GROUP',
  'UPDATE_GROUP_STATUS',
  'ADD_USER_TO_GROUP',
  'REMOVE_USER_FROM_GROUP',
  'CONFIRM_GROUP_MEMBERSHIP',
  'CREATE_MATCH',
  'UPDATE_MATCH_RESULT',
  'CONFIRM_MATCH',
  'REGISTER_USER_FOR_EVENT',
  'UNREGISTER_USER_FROM_EVENT',
  'UPDATE_RESULT_GRADE',
  'UPDATE_RESULT_ATTRS',
  'CREATE_TOAD_SESSION',
  'UPDATE_TOAD_SESSION',
  'DELETE_EXPIRED_TOAD_SESSIONS',
  'BATCH_UPDATE_USER_ATTRS',
  'BATCH_ADD_USERS_TO_GROUP',
  'UPSERT_USER_PROFILE',
  'BULK_UPDATE_GROUP_STATUS',
  'CLEANUP_EXPIRED_DATA',
  'TRANSFER_GROUP_CAPTAINCY',
];

// Subscription queries
export const SUBSCRIPTION_QUERIES = [
  'SUBSCRIBE_USER_PROFILE',
  'SUBSCRIBE_USER_TRANSACTIONS',
  'SUBSCRIBE_NEW_XP_TRANSACTIONS',
  'SUBSCRIBE_USER_PROGRESS',
  'SUBSCRIBE_USER_RESULTS',
  'SUBSCRIBE_PROJECT_RESULTS',
  'SUBSCRIBE_AUDITS_GIVEN',
  'SUBSCRIBE_AUDITS_RECEIVED',
  'SUBSCRIBE_GROUP_UPDATES',
  'SUBSCRIBE_USER_GROUPS',
  'SUBSCRIBE_GROUP_FORMATION',
  'SUBSCRIBE_USER_MATCHES',
  'SUBSCRIBE_MATCH_OPPORTUNITIES',
  'SUBSCRIBE_USER_TOAD_SESSIONS',
  'SUBSCRIBE_CAMPUS_ACTIVITY',
  'SUBSCRIBE_XP_LEADERBOARD',
  'SUBSCRIBE_USER_NOTIFICATIONS',
];

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
// QUERY METADATA FOR OPTIMIZATION
// ============================================================================

export const QUERY_METADATA = {
  // High-priority queries for dashboard
  DASHBOARD_QUERIES: [
    'GET_BASIC_USER_DASHBOARD',
    'GET_USER_INFO',
    'GET_USER_PROFILE',
  ],
  
  // Heavy queries that should be cached aggressively
  HEAVY_QUERIES: [
    'GET_COMPREHENSIVE_USER_ANALYTICS',
    'GET_PERFORMANCE_ANALYTICS',
    'GET_USER_TRANSACTIONS',
    'GET_USER_AUDITS',
  ],
  
  // Real-time queries that need fresh data
  REALTIME_QUERIES: [
    'GET_AUDIT_STATUS',
    'GET_USER_SESSIONS',
    'GET_PROGRESS_TIMELINE',
  ],
  
  // Queries suitable for background loading
  BACKGROUND_QUERIES: [
    'GET_USER_MATCHES_DETAILED',
    'GET_USER_OBJECT_AVAILABILITIES',
    'GET_CAMPUS_TRANSACTION_STATS',
    'GET_AUDIT_PEER_COMPARISON',
  ],
};

// ============================================================================
// QUERY COMPLEXITY RATINGS
// ============================================================================

export const QUERY_COMPLEXITY = {
  LOW: [
    'GET_MINIMAL_USER_DASHBOARD',
    'GET_USER_INFO',
    'GET_TOP_TRANSACTION',
    'GET_TOTAL_XP',
    'GET_AUDIT_STATUS',
    'SEARCH_USERS_OPTIMIZED',
    'GET_BATCH_USER_DATA',
    'PERFORMANCE_TEST_QUERY',
  ],

  MEDIUM: [
    'GET_OPTIMIZED_USER_PROFILE',
    'GET_BASIC_USER_DASHBOARD',
    'GET_USER_LABELS',
    'GET_USER_SESSIONS',
    'GET_XP_BY_TIME_PERIOD',
    'GET_PROGRESS_BY_PATH',
    'GET_STREAMLINED_ANALYTICS',
    'GET_LIGHTWEIGHT_PROGRESS',
    'GET_EFFICIENT_LEADERBOARD',
  ],

  HIGH: [
    'GET_COMPREHENSIVE_USER_ANALYTICS',
    'GET_PERFORMANCE_ANALYTICS',
    'GET_USER_EVENTS_DETAILED',
    'GET_PAGINATED_TRANSACTIONS_OPTIMIZED',
    'GET_STREAMLINED_AUDIT_HISTORY',
    'GET_USER_PROGRESS',
    'GET_USER_RESULTS',
    'GET_OPTIMIZED_XP_TIMELINE',
  ],

  VERY_HIGH: [
    'GET_USER_MATCHES_DETAILED',
    'GET_SKILL_PROGRESSION',
    'GET_AUDIT_PERFORMANCE_TIMELINE',
    'GET_LEARNING_PATH_PROGRESS',
    'GET_COLLABORATION_ANALYTICS',
    'GET_TIME_BASED_ANALYTICS',
  ],
};

// ============================================================================
// RECOMMENDED USAGE PATTERNS
// ============================================================================

export const USAGE_PATTERNS = {
  // For initial page load - optimized for speed
  INITIAL_LOAD: [
    'GET_MINIMAL_USER_DASHBOARD',
    'GET_USER_INFO',
  ],

  // For profile page - comprehensive but cached
  PROFILE_PAGE: [
    'GET_OPTIMIZED_USER_PROFILE',
    'GET_STREAMLINED_ANALYTICS',
    'GET_XP_STATISTICS',
  ],

  // For analytics dashboard - performance optimized
  ANALYTICS_DASHBOARD: [
    'GET_STREAMLINED_ANALYTICS',
    'GET_PROJECT_STATISTICS',
    'GET_AUDIT_RATIO',
    'GET_LIGHTWEIGHT_PROGRESS',
  ],

  // For detailed views - paginated and optimized
  DETAILED_VIEWS: [
    'GET_PAGINATED_TRANSACTIONS_OPTIMIZED',
    'GET_STREAMLINED_AUDIT_HISTORY',
    'GET_LIGHTWEIGHT_PROGRESS',
    'GET_USER_RESULTS',
  ],

  // For comparison features
  COMPARISON_FEATURES: [
    'GET_CAMPUS_TRANSACTION_STATS',
    'GET_AUDIT_PEER_COMPARISON',
    'GET_SKILL_PROGRESSION',
  ],

  // For real-time features
  REAL_TIME: [
    'SUBSCRIBE_USER_PROFILE',
    'SUBSCRIBE_NEW_XP_TRANSACTIONS',
    'SUBSCRIBE_USER_NOTIFICATIONS',
    'SUBSCRIBE_CAMPUS_ACTIVITY',
  ],

  // For data modification
  DATA_MODIFICATION: [
    'UPDATE_USER_PROFILE',
    'CREATE_GROUP',
    'ADD_USER_TO_GROUP',
    'UPDATE_RESULT_GRADE',
  ],
};

// ============================================================================
// FRAGMENT COLLECTIONS
// ============================================================================

export const CORE_FRAGMENTS = [
  'USER_FRAGMENT',
  'USER_BASIC_FRAGMENT',
  'TRANSACTION_FRAGMENT',
  'RESULT_FRAGMENT',
  'AUDIT_FRAGMENT',
  'PROGRESS_FRAGMENT',
  'OBJECT_FRAGMENT',
  'EVENT_FRAGMENT',
  'GROUP_FRAGMENT',
];

export const AGGREGATE_FRAGMENTS = [
  'TRANSACTION_AGGREGATE_FRAGMENT',
  'RESULT_AGGREGATE_FRAGMENT',
  'AUDIT_AGGREGATE_FRAGMENT',
  'PROGRESS_AGGREGATE_FRAGMENT',
  'OBJECT_AGGREGATE_FRAGMENT',
];

export const SPECIALIZED_FRAGMENTS = [
  'LABEL_FRAGMENT',
  'MATCH_FRAGMENT',
  'RECORD_FRAGMENT',
  'REGISTRATION_FRAGMENT',
  'ROLE_FRAGMENT',
  'TOAD_SESSION_FRAGMENT',
  'XP_FRAGMENT',
  'MARKDOWN_FRAGMENT',
];

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
    progress: PROGRESS_QUERIES,
    core: CORE_ENTITY_QUERIES,
    advanced: ADVANCED_ANALYTICS_QUERIES,
    mutations: MUTATION_QUERIES,
    subscriptions: SUBSCRIPTION_QUERIES,
    optimized: OPTIMIZED_QUERIES,
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
 * @param {string} type - Fragment type (core, aggregate, specialized)
 * @returns {string[]} Array of fragment names
 */
export function getFragmentsByType(type) {
  const typeMap = {
    core: CORE_FRAGMENTS,
    aggregate: AGGREGATE_FRAGMENTS,
    specialized: SPECIALIZED_FRAGMENTS,
  };
  
  return typeMap[type] || [];
}
