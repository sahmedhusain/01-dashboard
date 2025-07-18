// ============================================================================
// CORE GRAPHQL QUERIES - SIMPLIFIED AND OPTIMIZED
// Following reference implementation patterns from graphqlexample1 & graphqlexample2
// Aligned with reboot01 database schema and project objectives
// Using plain string queries for direct fetch requests
// ============================================================================

// ============================================================================
// BASIC USER INFORMATION QUERIES
// ============================================================================

// Get basic user information - matches reference pattern
export const GET_USER_INFO = `
  query GetUserInfo {
    user {
      id
      login
      attrs
      campus
      firstName
      lastName
      email
      auditRatio
      totalUp
      totalDown
      createdAt
      updatedAt
    }
  }
`;

// Get user profile with essential data for dashboard
export const GET_USER_PROFILE = `
  query GetUserProfile {
    user {
      id
      login
      firstName
      lastName
      email
      campus
      auditRatio
      totalUp
      totalDown
      attrs
      profile
      createdAt
      updatedAt
    }
  }
`;

// ============================================================================
// TRANSACTION AND XP QUERIES
// ============================================================================

// Get total XP for user - following reference pattern
export const GET_TOTAL_XP = `
  query GetTotalXP {
    transaction_aggregate(
      where: {
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

// Get user skills - following reference pattern
export const GET_USER_SKILLS = `
  query GetUserSkills {
    transaction(
      where: {
        type: { _like: "%skill%" }
        object: { type: { _eq: "project" } }
      }
      order_by: [{ type: asc }, { createdAt: desc }]
      distinct_on: type
    ) {
      amount
      type
      createdAt
    }
  }
`;

// ============================================================================
// AUDIT QUERIES
// ============================================================================

// Get audit status - following reference pattern
export const GET_AUDIT_STATUS = `
  query GetAuditStatus {
    user {
      validAudits: audits_aggregate(where: { grade: { _gte: 1 } }) {
        nodes {
          group {
            captainLogin
            path
          }
        }
      }
      failedAudits: audits_aggregate(where: { grade: { _lt: 1 } }) {
        nodes {
          group {
            captainLogin
            path
          }
        }
      }
    }
  }
`;

// Get audit ratio information
export const GET_AUDIT_RATIO = `
  query GetAuditRatio {
    user {
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
// GROUP AND COLLABORATION QUERIES
// ============================================================================

// Get user groups and leadership information
export const GET_USER_GROUPS = `
  query GetUserGroups($userLogin: String!) {
    group(
      where: { 
        captainLogin: { _eq: $userLogin }
        object: { type: { _eq: "project" } }
        status: { _eq: finished }
      }
    ) {
      id
      path
      status
      createdAt
      object {
        name
        type
      }
      members {
        userLogin
        user {
          firstName
          lastName
        }
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
// COMPREHENSIVE DASHBOARD QUERY
// ============================================================================

// Main dashboard query combining essential data
export const GET_DASHBOARD_DATA = `
  query GetDashboardData($userLogin: String!) {
    # User basic information
    user {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
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
    
    # Total XP
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
