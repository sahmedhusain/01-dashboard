import { gql } from '@apollo/client';
import {
  USER_FRAGMENT,
  USER_BASIC_FRAGMENT,
  AUDIT_FRAGMENT,
  RESULT_FRAGMENT,
  GROUP_FRAGMENT,
  OBJECT_FRAGMENT,
  EVENT_FRAGMENT,
  TRANSACTION_FRAGMENT,
} from './fragments.js';

import {
  AUDIT_AGGREGATE_FRAGMENT,
  TRANSACTION_AGGREGATE_FRAGMENT,
} from './aggregateFragments.js';

// ============================================================================
// AUDIT STATUS AND RATIO QUERIES
// ============================================================================

// Query for audit status and statistics
export const GET_AUDIT_STATUS = gql`
  query GetAuditStatus($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # Audits given by user (as auditor)
      validAuditsGiven: audit_aggregate(
        where: {
          auditorId: { _eq: $userId }
          grade: { _gte: 1 }
        }
      ) {
        aggregate {
          count
        }
        nodes {
          id
          grade
          group {
            id
            path
            captainId
            status
          }
        }
      }

      failedAuditsGiven: audit_aggregate(
        where: {
          auditorId: { _eq: $userId }
          grade: { _lt: 1 }
        }
      ) {
        aggregate {
          count
        }
        nodes {
          id
          grade
          group {
            id
            path
            captainId
            status
          }
        }
      }
    }
  }
`;

// Enhanced Audit Ratio Query with comprehensive audit data
export const GET_AUDIT_RATIO = gql`
  query GetAuditRatio($userId: Int!, $campus: String = null) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo
      # Direct audit metrics from user table
      auditRatio
      totalUp
      totalDown
      totalUpBonus
      auditsAssigned

      # Up transactions aggregate
      upTransactions: transactions_aggregate(
        where: {
          type: { _eq: "up" }
          campus: { _eq: $campus }
        }
      ) {
        ...TransactionAggregateInfo
      }

      # Down transactions aggregate
      downTransactions: transactions_aggregate(
        where: {
          type: { _eq: "down" }
          campus: { _eq: $campus }
        }
      ) {
        ...TransactionAggregateInfo
      }

      # Audits given by user (as auditor)
      auditsGiven: audits_aggregate {
        ...AuditAggregateInfo
      }

      # Audits received through group membership
      auditsReceived: audits_aggregate(
        where: {
          group: {
            groupUsers: {
              userId: { _eq: $userId }
            }
          }
        }
      ) {
        ...AuditAggregateInfo
      }

      # User roles with enhanced data
      user_roles {
        id
        userId
        roleId
        createdAt
        updatedAt
        role {
          id
          slug
          name
          description
          createdAt
          updatedAt
        }
      }

      # User records with enhanced author data
      records {
        id
        userId
        authorId
        message
        banEndAt
        createdAt
        updatedAt
        author {
          ...UserBasicInfo
        }
      }

      # Records authored by this user
      recordsByAuthorid {
        id
        userId
        authorId
        message
        banEndAt
        createdAt
        updatedAt
        user {
          ...UserBasicInfo
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${TRANSACTION_AGGREGATE_FRAGMENT}
  ${AUDIT_AGGREGATE_FRAGMENT}
`;

// ============================================================================
// DETAILED AUDIT QUERIES
// ============================================================================

// Enhanced user audits query following official database structure
export const GET_USER_AUDITS = gql`
  query GetUserAudits($userId: Int!, $limit: Int = 50, $offset: Int = 0, $asAuditor: Boolean = null) {
    # Audits where user is the auditor following official audit table structure
    audits_given: audit(
      where: {
        auditorId: { _eq: $userId }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...AuditInfo
      # Related group information following official structure
      group {
        id
        path
        status
        captainId
        createdAt
        updatedAt
        campus
        # Group users following official group_user table structure
        groupUsers {
          id
          confirmed
          createdAt
          updatedAt
          user {
            ...UserInfo
          }
        }
        # Captain information
        captain {
          ...UserInfo
        }
        # Related object
        object {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
        # Related event
        event {
          id
          path
          campus
          createdAt
          endAt
        }
      }
      # Related result following official result table structure
      result {
        ...ResultInfo
        # Related object
        object {
          id
          name
          type
          attrs
        }
        # Related event
        event {
          id
          path
          campus
        }
        # Related group
        group {
          id
          status
          captainId
          path
        }
      }
      # Auditor information
      auditor {
        ...UserInfo
      }
    }

    # Audits received by user (through group membership) following official structure
    audits_received: audit(
      where: {
        group: {
          groupUsers: {
            userId: { _eq: $userId }
          }
        }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...AuditInfo
      # Auditor information
      auditor {
        ...UserInfo
      }
      # Related group
      group {
        id
        path
        status
        captainId
        campus
        # Group users
        groupUsers {
          id
          confirmed
          user {
            ...UserInfo
          }
        }
      }
      # Related result
      result {
        ...ResultInfo
      }
    }

    # Audit statistics for audits given
    audit_stats_given: audit_aggregate(
      where: { auditorId: { _eq: $userId } }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }

    # Audit statistics for audits received
    audit_stats_received: audit_aggregate(
      where: {
        group: {
          groupUsers: {
            userId: { _eq: $userId }
          }
        }
      }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }
  }
  ${AUDIT_FRAGMENT}
  ${USER_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${RESULT_FRAGMENT}
`;

// ============================================================================
// AUDIT PERFORMANCE AND ANALYTICS
// ============================================================================

// Query for audit performance over time
export const GET_AUDIT_PERFORMANCE_TIMELINE = gql`
  query GetAuditPerformanceTimeline($userId: Int!, $startDate: timestamptz, $endDate: timestamptz) {
    # Audit performance over time following official audit table structure
    audit_timeline: audit(
      where: {
        _or: [
          { auditorId: { _eq: $userId } }
          { group: { groupUsers: { userId: { _eq: $userId } } } }
        ]
        createdAt: { _gte: $startDate, _lte: $endDate }
      }
      order_by: { createdAt: asc }
    ) {
      ...AuditInfo
      # Auditor information
      auditor {
        ...UserInfo
      }
      # Related group following official structure
      group {
        id
        status
        captainId
        path
        campus
        # Related object
        object {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
        # Group users
        groupUsers {
          id
          confirmed
          user {
            ...UserInfo
          }
        }
      }
      # Related result
      result {
        ...ResultInfo
      }
    }

    # Audit statistics for the time period
    audit_period_stats: audit_aggregate(
      where: {
        _or: [
          { auditorId: { _eq: $userId } }
          { group: { groupUsers: { userId: { _eq: $userId } } } }
        ]
        createdAt: { _gte: $startDate, _lte: $endDate }
      }
    ) {
      ...AuditAggregateInfo
    }
  }
  ${AUDIT_FRAGMENT}
  ${USER_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${RESULT_FRAGMENT}
  ${AUDIT_AGGREGATE_FRAGMENT}
`;

// Query for audit quality metrics
export const GET_AUDIT_QUALITY_METRICS = gql`
  query GetAuditQualityMetrics($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      auditRatio
      totalUp
      totalDown

      # High quality audits (grade >= 0.8)
      highQualityAudits: audits_aggregate(
        where: { grade: { _gte: 0.8 } }
      ) {
        aggregate {
          count
          avg { grade }
        }
      }

      # Low quality audits (grade < 0.5)
      lowQualityAudits: audits_aggregate(
        where: { grade: { _lt: 0.5 } }
      ) {
        aggregate {
          count
          avg { grade }
        }
      }

      # Recent audit trend (last 30 days)
      recentAudits: audits(
        where: {
          createdAt: { _gte: "now() - interval '30 days'" }
        }
        order_by: { createdAt: desc }
        limit: 50
      ) {
        ...AuditInfo
        group {
          ...GroupInfo
          object {
            ...ObjectInfo
          }
        }
      }
    }
  }
  ${AUDIT_FRAGMENT}
  ${GROUP_FRAGMENT}
  ${OBJECT_FRAGMENT}
`;

// ============================================================================
// AUDIT COMPARISON QUERIES
// ============================================================================

// Query for comparing audit performance with peers
export const GET_AUDIT_PEER_COMPARISON = gql`
  query GetAuditPeerComparison($userId: Int!, $campus: String = null) {
    # User's audit statistics
    user_audit_stats: user(where: { id: { _eq: $userId } }) {
      id
      login
      campus
      auditRatio
      totalUp
      totalDown
      auditsAssigned

      # User's audit aggregate
      user_audits: audits_aggregate {
        ...AuditAggregateInfo
      }
    }

    # Campus average audit statistics
    campus_audit_average: audit_aggregate(
      where: {
        auditor: { campus: { _eq: $campus } }
      }
    ) {
      ...AuditAggregateInfo
    }

    # Top auditors in campus
    top_auditors: user(
      where: { campus: { _eq: $campus } }
      order_by: { auditRatio: desc }
      limit: 10
    ) {
      ...UserBasicInfo
      auditRatio
      totalUp
      totalDown
      auditsAssigned
    }
  }
  ${AUDIT_AGGREGATE_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
`;
