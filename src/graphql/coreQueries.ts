// ============================================================================
// CORE GRAPHQL QUERIES - ALIGNED WITH REFERENCE SCHEMA
// Based on reboot01_graphql_queries.graphql reference schema
// All queries updated to match the correct field names and structures
// TypeScript interfaces available in src/types/schema.ts
// ============================================================================

// TypeScript interfaces are available in src/types/schema.ts for type safety

// ============================================================================
// USER QUERIES - MATCHES REFERENCE SCHEMA
// ============================================================================

// Get basic user information - matches GetUserBasicInfo from reference
export const GET_USER_INFO = `
  query GetUserBasicInfo($userLogin: String!) {
    user(where: { login: { _eq: $userLogin } }) {
      id
      login
      firstName
      lastName
      auditRatio
      totalUp
      totalDown
      campus
      profile
      attrs
      createdAt
      updatedAt
    }
  }
`;

// Get user by ID - matches reference pattern
export const GET_USER_BY_ID = `
  query GetUserById($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      firstName
      lastName
      auditRatio
      totalUp
      totalDown
      campus
      profile
      attrs
      createdAt
      updatedAt
    }
  }
`;

// Get complete user profile - matches GetUserComplete from reference
export const GET_USER_COMPLETE = `
  query GetUserComplete($userLogin: String!) {
    user(where: { login: { _eq: $userLogin } }) {
      id
      login
      firstName
      lastName
      auditRatio
      totalUp
      totalDown
      campus
      profile
      attrs
      createdAt
      updatedAt
      transactions(order_by: { createdAt: desc }) {
        id
        type
        amount
        path
        createdAt
        object {
          name
          type
        }
      }
      progresses(order_by: { createdAt: desc }) {
        id
        grade
        isDone
        path
        version
        createdAt
        object {
          name
          type
        }
      }
      results(order_by: { createdAt: desc }) {
        id
        grade
        type
        isLast
        path
        version
        createdAt
        object {
          name
          type
        }
      }
      group_users {
        group {
          id
          status
          path
          captain {
            login
            firstName
            lastName
          }
          object {
            name
            type
          }
          event {
            id
            path
          }
        }
      }
      event_users {
        event {
          id
          path
          createdAt
          endAt
          object {
            name
            type
          }
        }
      }
    }
  }
`;

// Get user statistics with aggregations - matches GetUserStats from reference
export const GET_USER_STATISTICS = `
  query GetUserStats($userLogin: String!) {
    user(where: { login: { _eq: $userLogin } }) {
      id
      login
      auditRatio
      totalUp
      totalDown
      xp_total: transactions_aggregate(where: { type: { _eq: "xp" } }) {
        aggregate {
          sum {
            amount
          }
          count
        }
      }
      completed_projects: progresses_aggregate(
        where: { isDone: { _eq: true }, object: { type: { _eq: "project" } } }
      ) {
        aggregate {
          count
        }
      }
      total_audits: audits_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

// ============================================================================
// TRANSACTION QUERIES - MATCHES REFERENCE SCHEMA
// ============================================================================

// Get user transactions - matches GetUserTransactions from reference
export const GET_USER_TRANSACTIONS = `
  query GetUserTransactions(
    $userLogin: String!
    $limit: Int = 50
    $offset: Int = 0
    $type: String = null
  ) {
    transaction(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _eq: $type }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      type
      amount
      path
      campus
      attrs
      createdAt
      user {
        login
        firstName
        lastName
      }
      object {
        id
        name
        type
      }
      event {
        id
        path
      }
    }
  }
`;

// Get XP transactions only - matches GetUserXPTransactions from reference
export const GET_USER_XP_TRANSACTIONS = `
  query GetUserXPTransactions($userLogin: String!) {
    transaction(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: desc }
    ) {
      id
      amount
      path
      createdAt
      object {
        name
        type
      }
    }
  }
`;

// Get transaction aggregates - matches GetTransactionAggregates from reference
export const GET_TRANSACTION_AGGREGATES = `
  query GetTransactionAggregates($userLogin: String!) {
    xp_total: transaction_aggregate(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _eq: "xp" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
        count
      }
    }
    up_total: transaction_aggregate(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _eq: "up" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
        count
      }
    }
    down_total: transaction_aggregate(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _eq: "down" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
        count
      }
    }
  }
`;

// Get users with pagination - matches GetUsersList from reference
export const GET_USERS_WITH_PAGINATION = `
  query GetUsersList($limit: Int = 20, $offset: Int = 0, $campus: String = null) {
    user(
      limit: $limit
      offset: $offset
      where: { campus: { _eq: $campus } }
      order_by: { createdAt: desc }
    ) {
      id
      login
      firstName
      lastName
      auditRatio
      campus
      createdAt
    }
  }
`;

// ============================================================================
// PROGRESS QUERIES - MATCHES REFERENCE SCHEMA
// ============================================================================

// Get user progress - matches GetUserProgress from reference
export const GET_USER_PROGRESS = `
  query GetUserProgress(
    $userLogin: String!
    $limit: Int = 50
    $isDone: Boolean = null
  ) {
    progress(
      where: {
        user: { login: { _eq: $userLogin } }
        isDone: { _eq: $isDone }
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      grade
      isDone
      path
      version
      createdAt
      updatedAt
      user {
        login
        firstName
        lastName
      }
      object {
        id
        name
        type
        attrs
      }
      group {
        id
        status
        captain {
          login
          firstName
          lastName
        }
      }
      event {
        id
        path
      }
    }
  }
`;

// Get progress statistics - matches GetProgressStats from reference
export const GET_PROGRESS_STATS = `
  query GetProgressStats($userLogin: String!) {
    total_progress: progress_aggregate(
      where: { user: { login: { _eq: $userLogin } } }
    ) {
      aggregate {
        count
      }
    }
    completed_progress: progress_aggregate(
      where: {
        user: { login: { _eq: $userLogin } }
        isDone: { _eq: true }
      }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }
    project_progress: progress_aggregate(
      where: {
        user: { login: { _eq: $userLogin } }
        object: { type: { _eq: "project" } }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

// ============================================================================
// AUDIT QUERIES - MATCHES REFERENCE SCHEMA
// ============================================================================

// Get user audits - matches GetUserAudits from reference
export const GET_USER_AUDITS = `
  query GetUserAudits($userLogin: String!, $limit: Int = 50) {
    audit(
      where: { auditor: { login: { _eq: $userLogin } } }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      grade
      version
      attrs
      endAt
      createdAt
      updatedAt
      auditor {
        login
        firstName
        lastName
      }
      group {
        id
        status
        path
        object {
          name
          type
        }
        group_users {
          user {
            login
            firstName
            lastName
          }
        }
      }
      result {
        id
        grade
        type
      }
    }
  }
`;

// Get audit statistics - matches GetAuditStats from reference
export const GET_AUDIT_STATS = `
  query GetAuditStats($userLogin: String!) {
    audits_given: audit_aggregate(
      where: { auditor: { login: { _eq: $userLogin } } }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }
    audits_received: audit_aggregate(
      where: { group: { group_users: { user: { login: { _eq: $userLogin } } } } }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }
  }
`;

// ============================================================================
// GROUP QUERIES - MATCHES REFERENCE SCHEMA
// ============================================================================

// Get user groups - matches GetUserGroups from reference
export const GET_USER_GROUPS = `
  query GetUserGroups($userLogin: String!) {
    group(
      where: { group_users: { user: { login: { _eq: $userLogin } } } }
      order_by: { createdAt: desc }
    ) {
      id
      status
      path
      campus
      createdAt
      updatedAt
      captain {
        id
        login
        firstName
        lastName
      }
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        createdAt
        endAt
      }
      group_users {
        user {
          id
          login
          firstName
          lastName
        }
      }
      progresses {
        id
        grade
        isDone
        version
        user {
          login
        }
      }
      results {
        id
        grade
        type
        isLast
        user {
          login
        }
      }
      audits {
        id
        grade
        auditor {
          login
          firstName
          lastName
        }
      }
    }
  }
`;

// Get group details - matches GetGroupDetails from reference
export const GET_GROUP_DETAILS = `
  query GetGroupDetails($groupId: Int!) {
    group_by_pk(id: $groupId) {
      id
      status
      path
      campus
      createdAt
      updatedAt
      captain {
        id
        login
        firstName
        lastName
        auditRatio
      }
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        createdAt
        endAt
        object {
          name
          type
        }
      }
      group_users {
        user {
          id
          login
          firstName
          lastName
          auditRatio
        }
      }
      progresses {
        id
        grade
        isDone
        version
        createdAt
        user {
          login
          firstName
          lastName
        }
      }
      results {
        id
        grade
        type
        isLast
        version
        createdAt
        user {
          login
        }
      }
      audits {
        id
        grade
        version
        endAt
        createdAt
        auditor {
          login
          firstName
          lastName
        }
      }
    }
  }
`;

// ============================================================================
// LEADERBOARD QUERIES - MATCHES REFERENCE SCHEMA
// ============================================================================

// Get leaderboard - matches GetLeaderboard from reference
export const GET_LEADERBOARD = `
  query GetLeaderboard($campus: String = null, $limit: Int = 100) {
    user(
      where: { campus: { _eq: $campus } }
      order_by: {
        transactions_aggregate: {
          sum: { amount: desc }
        }
      }
      limit: $limit
    ) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
      xp_total: transactions_aggregate(where: { type: { _eq: "xp" } }) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  }
`;

// Get top XP earners - simplified for compatibility
export const GET_TOP_XP_EARNERS = `
  query GetTopXPEarners($limit: Int = 10) {
    user(
      order_by: {
        transactions_aggregate: {
          sum: { amount: desc }
        }
      }
      limit: $limit
    ) {
      id
      login
      firstName
      lastName
      campus
      xp_total: transactions_aggregate(where: { type: { _eq: "xp" } }) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  }
`;

// Legacy compatibility - keeping for existing code
export const GET_PENDING_AUDITS = `
  query GetPendingAudits {
    audit(
      order_by: { createdAt: desc }
      limit: 20
    ) {
      id
      grade
      createdAt
      auditor {
        login
        firstName
        lastName
      }
      group {
        id
        status
        path
        object {
          name
          type
        }
      }
    }
  }
`;

// ============================================================================
// TRANSACTION AND XP QUERIES
// ============================================================================

// Get total XP for user - following reference pattern
export const GET_TOTAL_XP = `
  query GetTotalXP($userLogin: String!) {
    transaction_aggregate(
      where: {
        type: { _eq: "xp" }
        user: { login: { _eq: $userLogin } }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;

// ============================================================================
// ADDITIONAL UTILITY QUERIES
// ============================================================================

// Get user level from transactions - simplified approach
export const GET_USER_LEVEL_SIMPLE = `
  query GetUserLevelSimple($userLogin: String!) {
    user(where: { login: { _eq: $userLogin } }) {
      id
      login
      xp_total: transactions_aggregate(where: { type: { _eq: "xp" } }) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  }
`;

// Get XP transactions by project - for charts
export const GET_XP_BY_PROJECT_SIMPLE = `
  query GetXPByProjectSimple($userLogin: String!) {
    transaction(
      where: {
        userLogin: { _eq: $userLogin }, 
        type: { _eq: "xp" },
        path: { _regex: "^(?!.*(piscine|checkpoint|check-in|bh-onboarding)).*$" }
      }
      order_by: { amount: desc }
      limit: 10
    ) {
      amount
      createdAt
      path
      object {
        name
        type
      }
    }
  }
`;

// ============================================================================
// SKILLS AND TECHNOLOGY QUERIES
// ============================================================================

// Get user skills - corrected to use actual schema fields
export const GET_USER_SKILLS = `
  query GetUserSkills($userLogin: String!) {
    transaction(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _like: "%skill%" }
        object: { type: { _eq: "project" } }
      }
      order_by: [{ type: asc }, { createdAt: desc }]
      distinct_on: type
    ) {
      amount
      type
      createdAt
      object {
        name
        type
      }
    }
  }
`;

// ============================================================================
// AUDIT QUERIES - CORRECTED TO MATCH ACTUAL SCHEMA
// ============================================================================

// Get completed audits - from validated audit/basic.graphql
export const GET_COMPLETED_AUDITS = `
  query GetCompletedAudits {
    audit(
      where: { resultId: { _is_null: false } }
      order_by: { createdAt: desc }
      limit: 20
    ) {
      id
      grade
      createdAt
      updatedAt
      attrs
      version
      endAt
      auditor {
        id
        login
        firstName
        lastName
        campus
      }
      group {
        id
        status
        path
        campus
        object {
          id
          name
          type
          attrs
        }
      }
    }
  }
`;

// Get audit ratio information - simplified to use basic user fields
export const GET_AUDIT_RATIO = `
  query GetAuditRatio($userLogin: String!) {
    user(where: { login: { _eq: $userLogin } }) {
      auditRatio
      totalUp
      totalDown
    }
  }
`;

// ============================================================================
// SEARCH AND CAMPUS QUERIES - MATCHES REFERENCE SCHEMA
// ============================================================================

// Search users - matches SearchUsers from reference
export const SEARCH_USERS = `
  query SearchUsers($searchTerm: String!, $campus: String = null, $limit: Int = 20) {
    user(
      where: {
        _and: [
          {
            _or: [
              { login: { _ilike: $searchTerm } }
              { firstName: { _ilike: $searchTerm } }
              { lastName: { _ilike: $searchTerm } }
            ]
          }
          { campus: { _eq: $campus } }
        ]
      }
      limit: $limit
      order_by: { login: asc }
    ) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      createdAt
    }
  }
`;

// Get campus statistics - matches GetCampusStats from reference
export const GET_CAMPUS_STATS = `
  query GetCampusStats($campus: String!) {
    user_stats: user_aggregate(where: { campus: { _eq: $campus } }) {
      aggregate {
        count
      }
    }
    event_stats: event_aggregate(where: { campus: { _eq: $campus } }) {
      aggregate {
        count
      }
    }
    group_stats: group_aggregate(where: { campus: { _eq: $campus } }) {
      aggregate {
        count
      }
    }
    progress_stats: progress_aggregate(where: { campus: { _eq: $campus } }) {
      aggregate {
        count
      }
    }
    xp_stats: transaction_aggregate(
      where: {
        campus: { _eq: $campus }
        type: { _eq: "xp" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;

// ============================================================================
// LEGACY COMPATIBILITY EXPORTS
// ============================================================================

// Legacy exports for backward compatibility with existing code
// Note: Some exports renamed to avoid conflicts with existing definitions
export const GET_USERS_BY_CAMPUS_LEGACY = GET_USERS_WITH_PAGINATION;
export const GET_USER_LEVEL_LEGACY = GET_USER_STATISTICS;
export const GET_XP_BY_PROJECT_LEGACY = GET_USER_XP_TRANSACTIONS;
export const GET_USER_SKILLS_LEGACY = GET_USER_COMPLETE;
export const GET_USERS_ABOVE_LEVEL = GET_LEADERBOARD;
export const GET_USERS_ABOVE_LEVEL_IN_COHORT = GET_LEADERBOARD;
export const GET_DASHBOARD_DATA = GET_USER_COMPLETE;
export const GET_XP_TIMELINE = GET_USER_XP_TRANSACTIONS;
export const GET_AUDIT_TIMELINE = GET_USER_AUDITS;
export const GET_PROJECT_RESULTS = GET_PROGRESS_STATS;
export const GET_PROJECT_ANALYTICS = GET_PROGRESS_STATS;
export const GET_TECH_SKILLS = GET_USER_COMPLETE;
export const GET_AUDIT_PERFORMANCE = GET_AUDIT_STATS;
export const GET_XP_BREAKDOWN = GET_TRANSACTION_AGGREGATES;
export const GET_TRANSACTIONS_BY_TYPE = GET_USER_TRANSACTIONS;
export const GET_ALL_ROLES = SEARCH_USERS;
export const GET_ROLE_STATISTICS = GET_CAMPUS_STATS;
export const GET_ROOT_OBJECTS = GET_CAMPUS_STATS;
export const GET_LEAF_OBJECTS = GET_CAMPUS_STATS;
export const GET_COMPLETED_PROGRESS = GET_PROGRESS_STATS;
export const GET_IN_PROGRESS = GET_USER_PROGRESS;
export const GET_LATEST_RESULTS = GET_PROGRESS_STATS;
