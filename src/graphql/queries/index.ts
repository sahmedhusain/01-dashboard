// Export all GraphQL queries and fragments
export * from './userQueries'
export * from './xpQueries'
export * from './progressQueries'
export * from './auditQueries'
export * from './checkpointQueries'

// Re-export commonly used queries for convenience
export {
  GET_USER_PROFILE,
  GET_USER_BY_ID,
  GET_USER_LEVEL,
  GET_USER_TOTAL_XP,
  SEARCH_USERS,
  GET_USER_BY_LOGIN,
  GET_USER_BY_EMAIL
} from './userQueries'

export {
  GET_USER_XP_TRANSACTIONS,
  GET_USER_PISCINE_XP,
  GET_ALL_USER_XP,
  GET_XP_LEADERBOARD
} from './xpQueries'

export {
  GET_USER_PROGRESS,
  GET_USER_PISCINE_PROGRESS,
  GET_USER_PROJECT_STATS,
  GET_ALL_USER_PROGRESS
} from './progressQueries'

export {
  GET_AUDITS_GIVEN,
  GET_AUDITS_RECEIVED,
  GET_USER_AUDIT_STATS,
  GET_AUDIT_LEADERBOARD
} from './auditQueries'
