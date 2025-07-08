import { gql } from '@apollo/client';

// Enhanced User Query with comprehensive data
export const GET_ENHANCED_USER_PROFILE = gql`
  query GetEnhancedUserProfile {
    user {
      id
      login
      githubLogin
      profile
      attrs
      createdAt
      updatedAt
      campus
      
      # Transaction data for XP and audit ratios
      transactions(order_by: { createdAt: desc }) {
        id
        type
        amount
        objectId
        createdAt
        path
        object {
          name
          type
          attrs
        }
      }
      
      # Results for project completion tracking
      results(order_by: { createdAt: desc }) {
        id
        grade
        type
        createdAt
        updatedAt
        path
        object {
          name
          type
          attrs
        }
        progresses {
          id
          grade
          isDone
          createdAt
          updatedAt
        }
      }
      
      # Progress tracking
      progresses(order_by: { createdAt: desc }) {
        id
        grade
        isDone
        createdAt
        updatedAt
        path
        campus
        object {
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
      }
      
      # Audit information (as auditor)
      audits(order_by: { createdAt: desc }) {
        id
        grade
        createdAt
        updatedAt
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
      
      # Group memberships
      groupUsers {
        id
        confirmed
        createdAt
        group {
          id
          status
          path
          createdAt
          object {
            name
            type
            attrs
          }
          captain {
            login
          }
        }
      }
      
      # Event registrations
      eventUsers {
        id
        createdAt
        event {
          id
          path
          createdAt
          endAt
          status
          object {
            name
            type
          }
        }
      }
    }
  }
`;

// XP Statistics Query
export const GET_XP_STATISTICS = gql`
  query GetXPStatistics($userId: Int!) {
    transactions(
      where: { 
        userId: { _eq: $userId }, 
        type: { _eq: "xp" } 
      }
      order_by: { createdAt: asc }
    ) {
      id
      amount
      createdAt
      path
      object {
        name
        type
        attrs
      }
    }
    
    # Total XP
    transactions_aggregate(
      where: { 
        userId: { _eq: $userId }, 
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

// Audit Ratio Query
export const GET_AUDIT_STATISTICS = gql`
  query GetAuditStatistics($userId: Int!) {
    # Audits done by user
    audits(
      where: { auditorId: { _eq: $userId } }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      createdAt
      group {
        id
        object {
          name
          type
        }
      }
    }
    
    # Audits received by user (through results)
    results(
      where: { userId: { _eq: $userId } }
    ) {
      id
      grade
      type
      createdAt
      audits {
        id
        grade
        auditor {
          login
        }
      }
    }
    
    # Up/Down transactions (audit ratios)
    transactions(
      where: { 
        userId: { _eq: $userId },
        type: { _in: ["up", "down"] }
      }
      order_by: { createdAt: desc }
    ) {
      id
      type
      amount
      createdAt
      path
    }
  }
`;

// Project Statistics Query
export const GET_PROJECT_STATISTICS = gql`
  query GetProjectStatistics($userId: Int!) {
    results(
      where: { 
        userId: { _eq: $userId },
        object: { type: { _in: ["project", "exercise"] } }
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
        name
        type
        attrs
      }
      progresses {
        grade
        isDone
      }
    }
    
    # Project completion aggregate
    results_aggregate(
      where: { 
        userId: { _eq: $userId },
        object: { type: { _eq: "project" } },
        grade: { _gte: 1 }
      }
    ) {
      aggregate {
        count
      }
    }
    
    # Failed projects
    results_aggregate(
      where: { 
        userId: { _eq: $userId },
        object: { type: { _eq: "project" } },
        grade: { _lt: 1 }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

// Skills and Progress Query
export const GET_SKILLS_PROGRESS = gql`
  query GetSkillsProgress($userId: Int!) {
    progresses(
      where: { 
        userId: { _eq: $userId },
        isDone: { _eq: true }
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
        attrs
      }
      event {
        path
        object {
          name
          type
        }
      }
    }
    
    # Group projects and collaborations
    groupUsers(
      where: { 
        userId: { _eq: $userId },
        confirmed: { _eq: true }
      }
    ) {
      id
      createdAt
      group {
        id
        status
        path
        object {
          name
          type
          attrs
        }
        results {
          grade
          createdAt
        }
      }
    }
  }
`;

// Time-based Activity Query
export const GET_ACTIVITY_TIMELINE = gql`
  query GetActivityTimeline($userId: Int!, $startDate: timestamptz!, $endDate: timestamptz!) {
    # XP transactions over time
    transactions(
      where: { 
        userId: { _eq: $userId },
        createdAt: { _gte: $startDate, _lte: $endDate }
      }
      order_by: { createdAt: asc }
    ) {
      id
      type
      amount
      createdAt
      path
      object {
        name
        type
      }
    }
    
    # Results over time
    results(
      where: { 
        userId: { _eq: $userId },
        createdAt: { _gte: $startDate, _lte: $endDate }
      }
      order_by: { createdAt: asc }
    ) {
      id
      grade
      type
      createdAt
      path
      object {
        name
        type
      }
    }
    
    # Progress milestones
    progresses(
      where: { 
        userId: { _eq: $userId },
        createdAt: { _gte: $startDate, _lte: $endDate },
        isDone: { _eq: true }
      }
      order_by: { createdAt: asc }
    ) {
      id
      grade
      createdAt
      path
      object {
        name
        type
      }
    }
  }
`;

// Piscine Statistics (Go/JS)
export const GET_PISCINE_STATISTICS = gql`
  query GetPiscineStatistics($userId: Int!) {
    # Piscine results
    results(
      where: { 
        userId: { _eq: $userId },
        path: { _like: "%piscine%" }
      }
      order_by: { createdAt: asc }
    ) {
      id
      grade
      type
      createdAt
      path
      object {
        name
        type
        attrs
      }
    }
    
    # Piscine progress
    progresses(
      where: { 
        userId: { _eq: $userId },
        path: { _like: "%piscine%" }
      }
      order_by: { createdAt: asc }
    ) {
      id
      grade
      isDone
      createdAt
      path
      object {
        name
        type
        attrs
      }
    }
    
    # Piscine XP
    transactions(
      where: { 
        userId: { _eq: $userId },
        type: { _eq: "xp" },
        path: { _like: "%piscine%" }
      }
      order_by: { createdAt: asc }
    ) {
      id
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

// Dashboard Summary Query
export const GET_DASHBOARD_SUMMARY = gql`
  query GetDashboardSummary($userId: Int!) {
    # User basic info
    user_by_pk(id: $userId) {
      id
      login
      githubLogin
      createdAt
      campus
      profile
      attrs
    }
    
    # Total XP
    transactions_aggregate(
      where: { 
        userId: { _eq: $userId }, 
        type: { _eq: "xp" } 
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    
    # Level calculation (approximate)
    level: transactions_aggregate(
      where: { 
        userId: { _eq: $userId }, 
        type: { _eq: "xp" } 
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    
    # Projects passed
    projectsPassed: results_aggregate(
      where: { 
        userId: { _eq: $userId },
        object: { type: { _eq: "project" } },
        grade: { _gte: 1 }
      }
    ) {
      aggregate {
        count
      }
    }
    
    # Projects failed
    projectsFailed: results_aggregate(
      where: { 
        userId: { _eq: $userId },
        object: { type: { _eq: "project" } },
        grade: { _lt: 1 }
      }
    ) {
      aggregate {
        count
      }
    }
    
    # Audits done
    auditsDone: audits_aggregate(
      where: { auditorId: { _eq: $userId } }
    ) {
      aggregate {
        count
      }
    }
    
    # Audit ratio (up/down)
    auditRatioUp: transactions_aggregate(
      where: { 
        userId: { _eq: $userId },
        type: { _eq: "up" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    
    auditRatioDown: transactions_aggregate(
      where: { 
        userId: { _eq: $userId },
        type: { _eq: "down" }
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
