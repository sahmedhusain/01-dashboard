import { gql } from '@apollo/client'

// Fragment for audit data
export const AUDIT_FRAGMENT = gql`
  fragment AuditData on audit {
    id
    grade
    createdAt
    updatedAt
  }
`

// Get audits given by user
export const GET_AUDITS_GIVEN = gql`
  ${AUDIT_FRAGMENT}
  
  query GetAuditsGiven(
    $userId: Int!
    $limit: Int = 50
    $offset: Int = 0
  ) {
    audit(
      where: { auditorId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...AuditData
      group {
        id
        path
        object {
          id
          name
          type
        }
      }
    }
    
    audit_aggregate(
      where: { auditorId: { _eq: $userId } }
    ) {
      aggregate {
        count
        sum {
          grade
        }
        avg {
          grade
        }
      }
    }
  }
`

// Get audits received by user
export const GET_AUDITS_RECEIVED = gql`
  ${AUDIT_FRAGMENT}
  
  query GetAuditsReceived(
    $userId: Int!
    $limit: Int = 50
    $offset: Int = 0
  ) {
    audit(
      where: {
        group: {
          group_users: {
            userId: { _eq: $userId }
          }
        }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...AuditData
      auditor {
        id
        login
        firstName
        lastName
      }
      group {
        id
        path
        object {
          id
          name
          type
        }
      }
    }
    
    audit_aggregate(
      where: {
        group: {
          group_users: {
            userId: { _eq: $userId }
          }
        }
      }
    ) {
      aggregate {
        count
        sum {
          grade
        }
        avg {
          grade
        }
      }
    }
  }
`

// Get user's audit statistics
export const GET_USER_AUDIT_STATS = gql`
  query GetUserAuditStats($userId: Int!) {
    # Audits given stats
    auditsGiven: audit_aggregate(
      where: { auditorId: { _eq: $userId } }
    ) {
      aggregate {
        count
        sum {
          grade
        }
        avg {
          grade
        }
      }
    }
    
    # Audits received stats
    auditsReceived: audit_aggregate(
      where: {
        group: {
          group_users: {
            userId: { _eq: $userId }
          }
        }
      }
    ) {
      aggregate {
        count
        sum {
          grade
        }
        avg {
          grade
        }
      }
    }
    
    # Recent audits given
    recentAuditsGiven: audit(
      where: { auditorId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: 10
    ) {
      ...AuditData
      group {
        id
        path
        object {
          name
          type
        }
        group_users {
          user {
            id
            login
            firstName
            lastName
          }
        }
      }
    }
    
    # Recent audits received
    recentAuditsReceived: audit(
      where: {
        group: {
          group_users: {
            userId: { _eq: $userId }
          }
        }
      }
      order_by: { createdAt: desc }
      limit: 10
    ) {
      ...AuditData
      auditor {
        id
        login
        firstName
        lastName
      }
      group {
        id
        path
        object {
          name
          type
        }
      }
    }
  }
`

// Get audit performance over time
export const GET_AUDIT_PERFORMANCE = gql`
  query GetAuditPerformance($userId: Int!, $fromDate: timestamptz!) {
    # Monthly audit activity
    auditsGivenByMonth: audit(
      where: {
        auditorId: { _eq: $userId }
        createdAt: { _gte: $fromDate }
      }
      order_by: { createdAt: asc }
    ) {
      grade
      createdAt
    }
    
    auditsReceivedByMonth: audit(
      where: {
        group: {
          group_users: {
            userId: { _eq: $userId }
          }
        }
        createdAt: { _gte: $fromDate }
      }
      order_by: { createdAt: asc }
    ) {
      grade
      createdAt
    }
  }
`

// Get audit leaderboard (by audit ratio)
export const GET_AUDIT_LEADERBOARD = gql`
  query GetAuditLeaderboard($limit: Int = 50) {
    user(
      where: {
        auditRatio: { _is_null: false }
      }
      order_by: { auditRatio: desc }
      limit: $limit
    ) {
      id
      login
      firstName
      lastName
      auditRatio
      totalUp
      totalDown
    }
  }
`
