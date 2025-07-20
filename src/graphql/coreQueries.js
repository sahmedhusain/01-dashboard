// ============================================================================
// CORE GRAPHQL QUERIES - ALIGNED WITH VALIDATED SCHEMA
// Based on our 134 validated queries (25 parameter-free + 109 parameterized)
// All queries tested and confirmed working with actual GraphQL schema
// ============================================================================

// ============================================================================
// PARAMETER-FREE QUERIES (Working without variables)
// ============================================================================

// Get user statistics - from validated user/aggregates.graphql
export const GET_USER_STATISTICS = `
  query GetUserStatistics {
    user_aggregate {
      aggregate {
        count
        avg {
          auditRatio
          totalUp
          totalDown
        }
        max {
          auditRatio
          totalUp
          totalDown
          createdAt
        }
        min {
          auditRatio
          totalUp
          totalDown
          createdAt
        }
        stddev {
          auditRatio
          totalUp
          totalDown
        }
      }
    }
  }
`;

// Get users with high audit ratio - from validated user/aggregates.graphql
export const GET_USERS_WITH_HIGH_AUDIT_RATIO = `
  query GetUsersWithHighAuditRatio {
    user(
      where: { auditRatio: { _gte: 1.5 } }
      order_by: { auditRatio: desc }
      limit: 10
    ) {
      id
      login
      firstName
      lastName
      auditRatio
      totalUp
      totalDown
      campus
    }
  }
`;

// Get users with pagination - from validated user/basic.graphql
export const GET_USERS_WITH_PAGINATION = `
  query GetUsersWithPagination {
    user(
      order_by: { createdAt: desc }
      limit: 50
    ) {
      id
      login
      firstName
      lastName
      auditRatio
      totalUp
      totalDown
      campus
      profile
      createdAt
      updatedAt
    }
    user_aggregate {
      aggregate {
        count
      }
    }
  }
`;

// Get active groups - from validated group/basic.graphql
export const GET_ACTIVE_GROUPS = `
  query GetActiveGroups {
    group(
      where: { status: { _eq: working } }
      order_by: { createdAt: desc }
      limit: 20
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
        campus
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
        campus
      }
    }
  }
`;

// Get pending audits - from validated audit/basic.graphql
export const GET_PENDING_AUDITS = `
  query GetPendingAudits {
    audit(
      where: { resultId: { _is_null: true } }
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

// Get top XP earners - from validated transaction/aggregates.graphql
export const GET_TOP_XP_EARNERS = `
  query GetTopXPEarners {
    transaction(
      where: { type: { _eq: "xp" } }
      order_by: { amount: desc }
      limit: 10
    ) {
      id
      type
      amount
      createdAt
      user {
        id
        login
        firstName
        lastName
        campus
      }
      object {
        id
        name
        type
        attrs
      }
    }
    transaction_aggregate(
      where: { type: { _eq: "xp" } }
    ) {
      aggregate {
        sum {
          amount
        }
        count
        avg {
          amount
        }
        max {
          amount
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
        event: { path: { _like: "%/bh-module%" } }
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

// Get user level from event_user table - following reference pattern
export const GET_USER_LEVEL = `
  query GetUserLevel($userLogin: String!) {
    event_user(
      where: { 
        event: { path: { _eq: "/bahrain/bh-module" } }, 
        userLogin: { _eq: $userLogin } 
      }
    ) {
      userLogin
      level
      event {
        id
        campus
      }
    }
  }
`;

// Get XP transactions by project - for charts
export const GET_XP_BY_PROJECT = `
  query GetXPByProject($userLogin: String!) {
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
// PROGRESS AND RESULTS QUERIES
// ============================================================================

// Get user progress data
export const GET_USER_PROGRESS = `
  query GetUserProgress($userId: Int!) {
    progress(
      where: { userId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: 50
    ) {
      id
      grade
      isDone
      path
      createdAt
      updatedAt
      object {
        id
        name
        type
      }
    }
  }
`;

// Get user results data
export const GET_USER_RESULTS = `
  query GetUserResults($userId: Int!) {
    result(
      where: { userId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: 50
    ) {
      id
      grade
      type
      path
      createdAt
      updatedAt
      object {
        id
        name
        type
      }
    }
  }
`;

// ============================================================================
// GROUP AND COLLABORATION QUERIES - CORRECTED SCHEMA
// ============================================================================

// Get user groups - corrected to use actual schema fields
export const GET_USER_GROUPS = `
  query GetUserGroups($userLogin: String!) {
    group(
      where: {
        captainLogin: { _eq: $userLogin }
        status: { _eq: finished }
      }
      order_by: { createdAt: desc }
      limit: 20
    ) {
      id
      path
      status
      createdAt
      campus
      object {
        name
        type
        attrs
      }
      captain {
        id
        login
        firstName
        lastName
      }
      event {
        id
        path
        campus
      }
    }
  }
`;

// ============================================================================
// RANKING AND COMPARISON QUERIES
// ============================================================================

// Get users above current level - following reference pattern
export const GET_USERS_ABOVE_LEVEL = `
  query GetUsersAboveLevel($level: Int!) {
    event_user(
      where: { 
        event: { path: { _eq: "/bahrain/bh-module" } }
        level: { _gte: $level }
      }
      order_by: { level: desc }
    ) {
      userLogin
      level
      event {
        campus
        id
      }
    }
  }
`;

// Get users above level in specific cohort
export const GET_USERS_ABOVE_LEVEL_IN_COHORT = `
  query GetUsersAboveLevelInCohort($level: Int!, $eventId: Int!) {
    event_user(
      where: { 
        event: { 
          path: { _eq: "/bahrain/bh-module" }
          id: { _eq: $eventId }
        }
        level: { _gte: $level }
      }
      order_by: { level: desc }
    ) {
      userLogin
      level
      event {
        campus
        id
      }
    }
  }
`;

// ============================================================================
// PARAMETERIZED QUERIES (Require variables)
// ============================================================================

// Get user info by login - from validated user queries
export const GET_USER_INFO = `
  query GetUserInfo($userLogin: String!) {
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
      createdAt
      updatedAt
    }
  }
`;

// Get user by ID - from validated user queries
export const GET_USER_BY_ID = `
  query GetUserById($userId: Int!) {
    user_by_pk(id: $userId) {
      id
      login
      firstName
      lastName
      auditRatio
      totalUp
      totalDown
      campus
      profile
      createdAt
      updatedAt
    }
  }
`;

// Get users by campus - from validated user queries
export const GET_USERS_BY_CAMPUS = `
  query GetUsersByCampus($campus: String!) {
    user(
      where: { campus: { _eq: $campus } }
      order_by: { auditRatio: desc }
      limit: 20
    ) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
    }
  }
`;

// Get transactions by type - from validated transaction queries
export const GET_TRANSACTIONS_BY_TYPE = `
  query GetTransactionsByType($type: String!) {
    transaction(
      where: { type: { _eq: $type } }
      order_by: { createdAt: desc }
      limit: 20
    ) {
      id
      type
      amount
      createdAt
      user {
        login
        firstName
        lastName
      }
      object {
        name
        type
      }
    }
  }
`;

// ============================================================================
// COMPREHENSIVE DASHBOARD QUERY - CORRECTED
// ============================================================================

// Main dashboard query combining essential data
export const GET_DASHBOARD_DATA = `
  query GetDashboardData($userLogin: String!) {
    # User basic information
    user(where: { login: { _eq: $userLogin } }) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
      profile
      createdAt
      updatedAt
    }

    # User level information
    event_user(
      where: {
        event: { path: { _eq: "/bahrain/bh-module" } }
        userLogin: { _eq: $userLogin }
      }
    ) {
      level
      event {
        id
        campus
      }
    }

    # Total XP for user
    transaction_aggregate(
      where: {
        userLogin: { _eq: $userLogin }
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
  }
`;

// Get all roles - from validated misc/roles.graphql
export const GET_ALL_ROLES = `
  query GetAllRoles {
    transaction(
      distinct_on: type
      where: { type: { _like: "%role%" } }
      order_by: { type: asc }
    ) {
      type
      amount
      createdAt
      object {
        name
        type
      }
    }
  }
`;

// Get role statistics - from validated misc/roles.graphql
export const GET_ROLE_STATISTICS = `
  query GetRoleStatistics {
    transaction_aggregate(
      where: { type: { _like: "%role%" } }
    ) {
      aggregate {
        count
        sum {
          amount
        }
        avg {
          amount
        }
        max {
          amount
        }
        min {
          amount
        }
      }
    }
    transaction(
      where: { type: { _like: "%role%" } }
      distinct_on: type
      order_by: { type: asc }
    ) {
      type
      amount
    }
  }
`;

// Get root objects - from validated object/basic.graphql
export const GET_ROOT_OBJECTS = `
  query GetRootObjects {
    object(
      order_by: { createdAt: desc }
      limit: 50
    ) {
      id
      name
      type
      attrs
      createdAt
      updatedAt
    }
  }
`;

// Get leaf objects - from validated object/basic.graphql
export const GET_LEAF_OBJECTS = `
  query GetLeafObjects {
    object(
      where: { type: { _eq: "exercise" } }
      order_by: { createdAt: desc }
      limit: 50
    ) {
      id
      name
      type
      attrs
      createdAt
      updatedAt
    }
  }
`;

// Get completed progress - from validated progress/basic.graphql
export const GET_COMPLETED_PROGRESS = `
  query GetCompletedProgress {
    progress(
      where: { isDone: { _eq: true } }
      order_by: { updatedAt: desc }
      limit: 50
    ) {
      id
      grade
      isDone
      path
      createdAt
      updatedAt
      user {
        id
        login
        firstName
        lastName
      }
      object {
        id
        name
        type
      }
    }
  }
`;

// Get in progress records - from validated progress/basic.graphql
export const GET_IN_PROGRESS = `
  query GetInProgress {
    progress(
      where: { isDone: { _eq: false } }
      order_by: { createdAt: desc }
      limit: 50
    ) {
      id
      grade
      isDone
      path
      createdAt
      updatedAt
      user {
        id
        login
        firstName
        lastName
      }
      object {
        id
        name
        type
      }
    }
  }
`;

// Get latest results - from validated result/basic.graphql
export const GET_LATEST_RESULTS = `
  query GetLatestResults {
    result(
      order_by: { createdAt: desc }
      limit: 50
    ) {
      id
      grade
      type
      path
      createdAt
      updatedAt
      user {
        id
        login
        firstName
        lastName
      }
      object {
        id
        name
        type
      }
    }
  }
`;

// ============================================================================
// TIMELINE AND PROGRESSION QUERIES
// ============================================================================

// Query for XP timeline data
export const GET_XP_TIMELINE = `
  query GetXPTimeline($userLogin: String!) {
    transaction(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: asc }
    ) {
      amount
      createdAt
      path
      object {
        name
      }
    }
  }
`;

// Query for audit timeline data
export const GET_AUDIT_TIMELINE = `
  query GetAuditTimeline($userLogin: String!) {
    transaction(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _in: ["up", "down"] }
      }
      order_by: { createdAt: asc }
    ) {
      type
      amount
      createdAt
      path
    }
  }
`;

// Query for project results with timeline
export const GET_PROJECT_RESULTS = `
  query GetProjectResults($userLogin: String!) {
    result(
      where: {
        user: { login: { _eq: $userLogin } }
      }
      order_by: { updatedAt: desc }
    ) {
      id
      grade
      type
      createdAt
      updatedAt
      object {
        name
        type
      }
    }
  }
`;

// ============================================================================
// ENHANCED ANALYTICS QUERIES FOR PROFESSIONAL DASHBOARD
// ============================================================================

// Get comprehensive project results with detailed analytics
export const GET_PROJECT_ANALYTICS = `
  query GetProjectAnalytics($userLogin: String!) {
    result(
      where: {
        user: { login: { _eq: $userLogin } }
        object: { type: { _eq: "project" } }
      }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      type
      createdAt
      updatedAt
      path
      object {
        id
        name
        type
        attrs
      }
    }
  }
`;

// Get technology distribution for radar charts
export const GET_TECH_SKILLS = `
  query GetTechSkills($userLogin: String!) {
    transaction(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _in: [
          "skill_git", "skill_go", "skill_js",
          "skill_html", "skill_css", "skill_unix",
          "skill_docker", "skill_sql", "skill_prog",
          "skill_algo", "skill_sys-admin", "skill_front-end",
          "skill_back-end", "skill_stats", "skill_ai",
          "skill_game", "skill_tcp"
        ] }
      }
      order_by: [{ type: asc }, { createdAt: desc }]
      distinct_on: type
    ) {
      type
      amount
      createdAt
      object {
        name
        type
      }
    }
  }
`;

// Get comprehensive audit data for performance analysis
export const GET_AUDIT_PERFORMANCE = `
  query GetAuditPerformance($userLogin: String!) {
    # Up transactions (audit points given)
    up_transactions: transaction_aggregate(
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
        avg {
          amount
        }
      }
    }

    # Down transactions (audit points received)
    down_transactions: transaction_aggregate(
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
        avg {
          amount
        }
      }
    }
  }
`;

// Get XP breakdown by project type for detailed analysis
export const GET_XP_BREAKDOWN = `
  query GetXPBreakdown($userLogin: String!) {
    transaction(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _eq: "xp" }
        object: { type: { _eq: "project" } }
        path: { _regex: "^(?!.*(piscine|checkpoint|check-in|bh-onboarding)).*$" }
      }
      order_by: { amount: desc }
    ) {
      id
      amount
      createdAt
      path
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        campus
      }
    }
  }
`;
