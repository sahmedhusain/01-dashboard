import { gql } from '@apollo/client';
import {
  USER_FRAGMENT,
  USER_BASIC_FRAGMENT,
  TRANSACTION_FRAGMENT,
  RESULT_FRAGMENT,
  AUDIT_FRAGMENT,
  PROGRESS_FRAGMENT,
  OBJECT_FRAGMENT,
  EVENT_FRAGMENT,
  GROUP_FRAGMENT,
} from './fragments.js';

import {
  TRANSACTION_AGGREGATE_FRAGMENT,
  RESULT_AGGREGATE_FRAGMENT,
  AUDIT_AGGREGATE_FRAGMENT,
} from './aggregateFragments.js';

// ============================================================================
// OPTIMIZED DASHBOARD QUERIES
// ============================================================================

// Ultra-lightweight dashboard query for instant loading
export const GET_MINIMAL_USER_DASHBOARD = gql`
  query GetMinimalUserDashboard($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
      
      # Only essential aggregates
      xpTotal: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          sum { amount }
        }
      }
      
      projectCount: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          isLast: { _eq: true }
        }
      ) {
        aggregate {
          count
        }
      }
    }
  }
`;

// Optimized user profile with selective loading
export const GET_OPTIMIZED_USER_PROFILE = gql`
  query GetOptimizedUserProfile($userId: Int!, $includeTransactions: Boolean = false, $includeAudits: Boolean = false) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo
      
      # Essential relationships only
      user_roles(limit: 5) {
        id
        role {
          id
          name
          slug
        }
      }
      
      # Recent records only (not all history)
      records(
        order_by: { createdAt: desc }
        limit: 3
      ) {
        id
        message
        createdAt
        author {
          ...UserBasicInfo
        }
      }
      
      # Conditional expensive queries
      recentTransactions: transactions(
        order_by: { createdAt: desc }
        limit: 10
      ) @include(if: $includeTransactions) {
        ...TransactionInfo
        object {
          id
          name
          type
        }
      }
      
      recentAudits: audits(
        order_by: { createdAt: desc }
        limit: 5
      ) @include(if: $includeAudits) {
        ...AuditInfo
        group {
          id
          path
          object {
            id
            name
          }
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${TRANSACTION_FRAGMENT}
  ${AUDIT_FRAGMENT}
`;

// ============================================================================
// OPTIMIZED ANALYTICS QUERIES
// ============================================================================

// Streamlined analytics with reduced data fetching
export const GET_STREAMLINED_ANALYTICS = gql`
  query GetStreamlinedAnalytics($userId: Int!, $timeRange: timestamptz = "now() - interval '30 days'") {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      auditRatio
      totalUp
      totalDown
      
      # Time-filtered aggregates only (no individual records)
      recentXP: transactions_aggregate(
        where: {
          type: { _eq: "xp" }
          createdAt: { _gte: $timeRange }
        }
      ) {
        aggregate {
          sum { amount }
          count
        }
      }
      
      recentProjects: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          isLast: { _eq: true }
          createdAt: { _gte: $timeRange }
        }
      ) {
        aggregate {
          count
          avg { grade }
        }
      }
      
      recentAudits: audits_aggregate(
        where: {
          createdAt: { _gte: $timeRange }
        }
      ) {
        aggregate {
          count
          avg { grade }
        }
      }
      
      # Activity by type (aggregates only)
      projectActivity: transactions_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          createdAt: { _gte: $timeRange }
        }
      ) {
        aggregate {
          count
          sum { amount }
        }
      }
      
      exerciseActivity: transactions_aggregate(
        where: {
          object: { type: { _eq: "exercise" } }
          createdAt: { _gte: $timeRange }
        }
      ) {
        aggregate {
          count
          sum { amount }
        }
      }
    }
  }
`;

// ============================================================================
// OPTIMIZED TRANSACTION QUERIES
// ============================================================================

// Paginated transactions with minimal object data
export const GET_PAGINATED_TRANSACTIONS_OPTIMIZED = gql`
  query GetPaginatedTransactionsOptimized(
    $userId: Int!
    $limit: Int = 20
    $offset: Int = 0
    $transactionTypes: [String!] = ["xp", "up", "down"]
    $campus: String = null
  ) {
    # Main transaction data with minimal joins
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _in: $transactionTypes }
        campus: { _eq: $campus }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      type
      amount
      createdAt
      path
      campus
      # Minimal object data only
      object {
        id
        name
        type
      }
      # Minimal event data only
      event {
        id
        path
      }
    }
    
    # Separate aggregate query for totals
    transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _in: $transactionTypes }
        campus: { _eq: $campus }
      }
    ) {
      aggregate {
        count
        sum { amount }
      }
    }
  }
`;

// Optimized XP timeline with reduced data
export const GET_OPTIMIZED_XP_TIMELINE = gql`
  query GetOptimizedXPTimeline($userId: Int!, $limit: Int = 100, $campus: String = null) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        campus: { _eq: $campus }
      }
      order_by: { createdAt: asc }
      limit: $limit
    ) {
      id
      amount
      createdAt
      path
      # Essential object info only
      object {
        id
        name
        type
      }
    }
    
    # XP summary
    xpSummary: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        campus: { _eq: $campus }
      }
    ) {
      aggregate {
        sum { amount }
        count
        max { amount }
        min { amount }
      }
    }
  }
`;

// ============================================================================
// OPTIMIZED AUDIT QUERIES
// ============================================================================

// Streamlined audit history
export const GET_STREAMLINED_AUDIT_HISTORY = gql`
  query GetStreamlinedAuditHistory($userId: Int!, $limit: Int = 20) {
    # Audits given (minimal data)
    auditsGiven: audit(
      where: { auditorId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      grade
      createdAt
      # Minimal group info
      group {
        id
        path
        status
        object {
          id
          name
        }
      }
    }
    
    # Audits received (minimal data)
    auditsReceived: audit(
      where: {
        group: {
          groupUsers: { userId: { _eq: $userId } }
        }
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      grade
      createdAt
      # Minimal auditor info
      auditor {
        id
        login
        firstName
        lastName
      }
      # Minimal group info
      group {
        id
        path
        object {
          id
          name
        }
      }
    }
    
    # Audit statistics
    auditStats: audit_aggregate(
      where: { auditorId: { _eq: $userId } }
    ) {
      aggregate {
        count
        avg { grade }
      }
    }
  }
`;

// ============================================================================
// OPTIMIZED PROGRESS QUERIES
// ============================================================================

// Lightweight progress overview
export const GET_LIGHTWEIGHT_PROGRESS = gql`
  query GetLightweightProgress($userId: Int!, $pathPattern: String = "%", $limit: Int = 30) {
    progress(
      where: {
        userId: { _eq: $userId }
        path: { _like: $pathPattern }
      }
      order_by: { updatedAt: desc }
      limit: $limit
    ) {
      id
      grade
      isDone
      updatedAt
      path
      # Minimal object data
      object {
        id
        name
        type
      }
    }
    
    # Progress summary
    progressSummary: progress_aggregate(
      where: {
        userId: { _eq: $userId }
        path: { _like: $pathPattern }
      }
    ) {
      aggregate {
        count
      }
    }
    
    # Completed count
    completedCount: progress_aggregate(
      where: {
        userId: { _eq: $userId }
        path: { _like: $pathPattern }
        isDone: { _eq: true }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

// ============================================================================
// OPTIMIZED SEARCH QUERIES
// ============================================================================

// Fast user search with minimal data
export const SEARCH_USERS_OPTIMIZED = gql`
  query SearchUsersOptimized($searchTerm: String!, $campus: String = null, $limit: Int = 20) {
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
      order_by: [
        { totalUp: desc }
        { login: asc }
      ]
      limit: $limit
    ) {
      id
      login
      firstName
      lastName
      campus
      avatarUrl
      auditRatio
      totalUp
      totalDown
    }
  }
`;

// ============================================================================
// OPTIMIZED LEADERBOARD QUERIES
// ============================================================================

// Efficient leaderboard with minimal joins
export const GET_EFFICIENT_LEADERBOARD = gql`
  query GetEfficientLeaderboard($campus: String!, $limit: Int = 50, $orderBy: String = "totalUp") {
    user(
      where: { campus: { _eq: $campus } }
      order_by: { totalUp: desc }
      limit: $limit
    ) {
      id
      login
      firstName
      lastName
      campus
      avatarUrl
      auditRatio
      totalUp
      totalDown
      
      # Recent activity indicator (last 7 days)
      recentActivity: transactions_aggregate(
        where: {
          createdAt: { _gte: "now() - interval '7 days'" }
        }
      ) {
        aggregate {
          count
        }
      }
    }
  }
`;

// ============================================================================
// BATCH OPTIMIZATION QUERIES
// ============================================================================

// Batch user data for multiple users
export const GET_BATCH_USER_DATA = gql`
  query GetBatchUserData($userIds: [Int!]!) {
    user(where: { id: { _in: $userIds } }) {
      id
      login
      firstName
      lastName
      campus
      avatarUrl
      auditRatio
      totalUp
      totalDown
      
      # Essential aggregates only
      xpTotal: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          sum { amount }
        }
      }
      
      projectCount: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          isLast: { _eq: true }
          grade: { _gte: 1 }
        }
      ) {
        aggregate {
          count
        }
      }
    }
  }
`;

// ============================================================================
// PERFORMANCE MONITORING QUERIES
// ============================================================================

// Query performance test
export const PERFORMANCE_TEST_QUERY = gql`
  query PerformanceTestQuery($userId: Int!) {
    # Test basic user fetch
    user_basic: user(where: { id: { _eq: $userId } }) {
      id
      login
      campus
    }
    
    # Test aggregate performance
    transaction_count: transaction_aggregate(
      where: { userId: { _eq: $userId } }
    ) {
      aggregate {
        count
      }
    }
    
    # Test join performance
    recent_transactions: transaction(
      where: { userId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: 5
    ) {
      id
      type
      amount
      createdAt
    }
  }
`;
