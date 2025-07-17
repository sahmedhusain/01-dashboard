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
  EVENT_USER_FRAGMENT,
  GROUP_FRAGMENT,
  REGISTRATION_FRAGMENT,
} from './fragments.js';

import {
  TRANSACTION_AGGREGATE_FRAGMENT,
  RESULT_AGGREGATE_FRAGMENT,
  AUDIT_AGGREGATE_FRAGMENT,
  PROGRESS_AGGREGATE_FRAGMENT,
} from './aggregateFragments.js';

// ============================================================================
// COMPREHENSIVE ANALYTICS QUERIES
// ============================================================================

// Optimized comprehensive user analytics query with fragments and reduced over-fetching
export const GET_COMPREHENSIVE_USER_ANALYTICS = gql`
  query GetComprehensiveUserAnalytics($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      # Use fragment for consistent user data
      ...UserInfo

      # XP transactions - optimized with fragment and reduced limit
      transactions(
        where: { type: { _eq: "xp" } }
        order_by: { createdAt: desc }
        limit: 50
      ) {
        ...TransactionInfo
        object {
          ...ObjectInfo
        }
      }

      # Optimized transaction aggregates using fragments
      xpTransactions: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        ...TransactionAggregateInfo
      }

      upTransactions: transactions_aggregate(
        where: { type: { _eq: "up" } }
      ) {
        ...TransactionAggregateInfo
      }

      downTransactions: transactions_aggregate(
        where: { type: { _eq: "down" } }
      ) {
        ...TransactionAggregateInfo
      }

      # Optimized results with fragments and reduced limit
      results(
        where: { isLast: { _eq: true } }
        order_by: { createdAt: desc }
        limit: 30
      ) {
        ...ResultInfo
        object {
          ...ObjectInfo
        }
      }

      # Optimized results aggregates using fragments
      results_aggregate(where: { isLast: { _eq: true } }) {
        ...ResultAggregateInfo
      }

      passedResults: results_aggregate(
        where: {
          isLast: { _eq: true }
          grade: { _gte: 1 }
        }
      ) {
        ...ResultAggregateInfo
      }

      # Optimized audits with fragments and reduced limit
      audits(limit: 30, order_by: { createdAt: desc }) {
        ...AuditInfo
        group {
          ...GroupInfo
          object {
            ...ObjectInfo
          }
        }
      }

      # Optimized audits aggregate using fragments
      audits_aggregate {
        ...AuditAggregateInfo
      }

      # Optimized progress data with fragments and reduced limit
      progresses(
        where: { isDone: { _eq: true } }
        order_by: { createdAt: desc }
        limit: 30
      ) {
        ...ProgressInfo
        object {
          ...ObjectInfo
        }
      }

      # Optimized events with fragments and reduced limit
      events(limit: 5, order_by: { createdAt: asc }) {
        ...EventUserInfo
        event {
          ...EventInfo
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${RESULT_FRAGMENT}
  ${AUDIT_FRAGMENT}
  ${GROUP_FRAGMENT}
  ${PROGRESS_FRAGMENT}
  ${EVENT_USER_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${TRANSACTION_AGGREGATE_FRAGMENT}
  ${RESULT_AGGREGATE_FRAGMENT}
  ${AUDIT_AGGREGATE_FRAGMENT}
`;

// Optimized basic dashboard query for faster initial load
export const GET_BASIC_USER_DASHBOARD = gql`
  query GetBasicUserDashboard($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      ...UserBasicInfo

      # Essential XP data only
      xpTransactions: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }

      # Essential project stats only
      results_aggregate(where: { isLast: { _eq: true } }) {
        aggregate {
          count
        }
      }

      passedResults: results_aggregate(
        where: {
          isLast: { _eq: true }
          grade: { _gte: 1 }
        }
      ) {
        aggregate {
          count
        }
      }

      # Essential audit data only
      upTransactions: transactions_aggregate(
        where: { type: { _eq: "up" } }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }

      downTransactions: transactions_aggregate(
        where: { type: { _eq: "down" } }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  }
  ${USER_BASIC_FRAGMENT}
`;

// Advanced performance analytics with time-based insights
export const GET_PERFORMANCE_ANALYTICS = gql`
  query GetPerformanceAnalytics($userId: Int!, $startDate: timestamptz, $endDate: timestamptz) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # Time-filtered transaction analytics
      recentTransactions: transactions_aggregate(
        where: {
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
      ) {
        ...TransactionAggregateInfo
      }

      # Recent XP gains
      recentXP: transactions_aggregate(
        where: {
          type: { _eq: "xp" }
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
      ) {
        ...TransactionAggregateInfo
      }

      # Recent project completions
      recentProjects: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          createdAt: { _gte: $startDate, _lte: $endDate }
          isLast: { _eq: true }
        }
      ) {
        ...ResultAggregateInfo
      }

      # Recent audits given
      recentAuditsGiven: audits_aggregate(
        where: {
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
      ) {
        ...AuditAggregateInfo
      }

      # Recent progress updates
      recentProgress: progresses_aggregate(
        where: {
          updatedAt: { _gte: $startDate, _lte: $endDate }
        }
      ) {
        ...ProgressAggregateInfo
      }

      # Activity by object type
      projectActivity: transactions_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
      ) {
        ...TransactionAggregateInfo
      }

      exerciseActivity: transactions_aggregate(
        where: {
          object: { type: { _eq: "exercise" } }
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
      ) {
        ...TransactionAggregateInfo
      }

      questActivity: transactions_aggregate(
        where: {
          object: { type: { _eq: "quest" } }
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
      ) {
        ...TransactionAggregateInfo
      }
    }
  }
  ${USER_FRAGMENT}
  ${TRANSACTION_AGGREGATE_FRAGMENT}
  ${RESULT_AGGREGATE_FRAGMENT}
  ${AUDIT_AGGREGATE_FRAGMENT}
  ${PROGRESS_AGGREGATE_FRAGMENT}
`;

// Enhanced XP Statistics Query with comprehensive data from introspection
export const GET_XP_STATISTICS = gql`
  query GetXPStatistics($userId: Int!, $campus: String = null) {
    # User basic info with audit metrics
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo
      # Direct XP fields from user table
      totalUp
      totalDown
      totalUpBonus
      auditRatio
      auditsAssigned
    }

    # Total XP from transactions - amount is in bytes, divide by 1000 for KB
    totalXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        campus: { _eq: $campus }
      }
    ) {
      ...TransactionAggregateInfo
    }

    # XP by project with enhanced object and event data
    xpByProject: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        object: { type: { _eq: "project" } }
        campus: { _eq: $campus }
      }
      order_by: { amount: desc }
      limit: 50
    ) {
      ...TransactionInfo
      # Enhanced object information
      object {
        ...ObjectInfo
        author {
          ...UserBasicInfo
        }
        reference {
          ...ObjectInfo
        }
      }
      # Enhanced event information
      event {
        ...EventInfo
        parent {
          ...EventInfo
        }
        object {
          ...ObjectInfo
        }
        registration {
          ...RegistrationInfo
        }
      }
    }

    # XP timeline for progression tracking with enhanced data
    xpTimeline: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        campus: { _eq: $campus }
      }
      order_by: { createdAt: asc }
      limit: 200
    ) {
      ...TransactionInfo
      object {
        ...ObjectInfo
        author {
          ...UserBasicInfo
        }
      }
      event {
        ...EventInfo
        parent {
          ...EventInfo
        }
        object {
          ...ObjectInfo
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${TRANSACTION_FRAGMENT}
  ${TRANSACTION_AGGREGATE_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${REGISTRATION_FRAGMENT}
`;

// Project Statistics Query
export const GET_PROJECT_STATISTICS = gql`
  query GetProjectStatistics($userId: Int!) {
    # All project results
    projectResults: result(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: "project" } }
        isLast: { _eq: true }
      }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      createdAt
      updatedAt
      path
      object {
        name
        type
      }
      event {
        id
        path
        createdAt
        endAt
      }
    }

    # Project statistics aggregates
    totalProjects: result_aggregate(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: "project" } }
        isLast: { _eq: true }
      }
    ) {
      aggregate {
        count
      }
    }

    passedProjects: result_aggregate(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: "project" } }
        grade: { _gte: 1 }
        isLast: { _eq: true }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
