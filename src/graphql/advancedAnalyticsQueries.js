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
  MATCH_FRAGMENT,
} from './fragments.js';

import {
  TRANSACTION_AGGREGATE_FRAGMENT,
  RESULT_AGGREGATE_FRAGMENT,
  AUDIT_AGGREGATE_FRAGMENT,
  PROGRESS_AGGREGATE_FRAGMENT,
} from './aggregateFragments.js';

// ============================================================================
// SKILL PROGRESSION TRACKING
// ============================================================================

// Advanced collaboration and skill analytics
export const GET_COLLABORATION_ANALYTICS = gql`
  query GetCollaborationAnalytics($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # Group collaboration metrics
      groups {
        id
        userId
        confirmed
        createdAt
        updatedAt
        group {
          id
          path
          campus
          status
          createdAt
          updatedAt
          # Group performance metrics
          groupUsers {
            id
            confirmed
            createdAt
            updatedAt
            user {
              ...UserBasicInfo
              # Collaborator XP for team analysis
              collaboratorXP: transactions_aggregate(
                where: { type: { _eq: "xp" } }
              ) {
                aggregate {
                  sum { amount }
                }
              }
            }
          }
          # Group results
          results: results_aggregate {
            ...ResultAggregateInfo
          }
          # Group audits
          audits: audits_aggregate {
            ...AuditAggregateInfo
          }
        }
      }

      # Groups as captain with team performance
      groupsByCaptainid {
        id
        path
        campus
        status
        createdAt
        updatedAt
        groupUsers {
          id
          confirmed
          createdAt
          updatedAt
          user {
            ...UserBasicInfo
            # Team member performance
            memberXP: transactions_aggregate(
              where: { type: { _eq: "xp" } }
            ) {
              aggregate {
                sum { amount }
                count
              }
            }
            memberProjects: results_aggregate(
              where: {
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
        }
        # Team results
        teamResults: results_aggregate {
          ...ResultAggregateInfo
        }
      }

      # Audit relationships for network analysis
      audits {
        ...AuditInfo
        group {
          id
          path
          status
          captainId
          createdAt
          updatedAt
          campus
          groupUsers {
            id
            confirmed
            createdAt
            updatedAt
            user {
              ...UserBasicInfo
            }
          }
        }
      }

      # Skill progression through transactions
      skillTransactions: transactions(
        where: {
          type: { _like: "%skill%" }
        }
        order_by: { createdAt: asc }
      ) {
        ...TransactionInfo
        object {
          ...ObjectInfo
          # Skill hierarchy
          children: objectChildrenByParentId {
            id
            key
            index
            child {
              ...ObjectInfo
            }
          }
        }
      }

      # Match/betting relationships for competitive analysis
      matches {
        ...MatchInfo
        matchedUser: userByMatchId {
          ...UserBasicInfo
          # Opponent performance for comparison
          opponentXP: transactions_aggregate(
            where: { type: { _eq: "xp" } }
          ) {
            aggregate {
              sum { amount }
            }
          }
        }
        object {
          ...ObjectInfo
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${RESULT_AGGREGATE_FRAGMENT}
  ${AUDIT_AGGREGATE_FRAGMENT}
  ${AUDIT_FRAGMENT}
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${MATCH_FRAGMENT}
`;

// Comprehensive skill progression analysis
export const GET_SKILL_PROGRESSION_ANALYSIS = gql`
  query GetSkillProgressionAnalysis($userId: Int!, $skillCategory: String = "%skill%") {
    # Skill transactions over time
    skillProgression: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _like: $skillCategory }
      }
      order_by: { createdAt: asc }
    ) {
      ...TransactionInfo
      object {
        ...ObjectInfo
        # Object hierarchy for skill trees
        children: objectChildrenByParentId {
          id
          key
          index
          child {
            ...ObjectInfo
          }
        }
        # Parent skills
        parents: objectChildrenByChildId {
          id
          key
          index
          parent {
            ...ObjectInfo
          }
        }
      }
      event {
        ...EventInfo
        object {
          ...ObjectInfo
        }
      }
    }

    # Skill mastery levels
    skillMastery: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _like: $skillCategory }
      }
    ) {
      ...TransactionAggregateInfo
    }

    # Recent skill developments
    recentSkills: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _like: $skillCategory }
        createdAt: { _gte: "now() - interval '30 days'" }
      }
      order_by: { createdAt: desc }
    ) {
      ...TransactionInfo
      object {
        ...ObjectInfo
      }
    }
  }
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${TRANSACTION_AGGREGATE_FRAGMENT}
`;

// ============================================================================
// CAMPUS COMPARISON ANALYTICS
// ============================================================================

// Campus-wide performance comparison
export const GET_CAMPUS_COMPARISON_ANALYTICS = gql`
  query GetCampusComparisonAnalytics($campus: String!, $compareCampus: String = null) {
    # Primary campus statistics
    primaryCampusStats: user_aggregate(
      where: { campus: { _eq: $campus } }
    ) {
      aggregate {
        count
      }
    }

    # Primary campus XP statistics
    primaryCampusXP: transaction_aggregate(
      where: {
        campus: { _eq: $campus }
        type: { _eq: "xp" }
      }
    ) {
      ...TransactionAggregateInfo
    }

    # Primary campus project completion
    primaryCampusProjects: result_aggregate(
      where: {
        campus: { _eq: $campus }
        object: { type: { _eq: "project" } }
        grade: { _gte: 1 }
        isLast: { _eq: true }
      }
    ) {
      ...ResultAggregateInfo
    }

    # Primary campus audit quality
    primaryCampusAudits: audit_aggregate(
      where: {
        auditor: { campus: { _eq: $campus } }
      }
    ) {
      ...AuditAggregateInfo
    }

    # Comparison campus statistics (if provided)
    compareCampusStats: user_aggregate(
      where: { campus: { _eq: $compareCampus } }
    ) {
      aggregate {
        count
      }
    }

    # Comparison campus XP statistics
    compareCampusXP: transaction_aggregate(
      where: {
        campus: { _eq: $compareCampus }
        type: { _eq: "xp" }
      }
    ) {
      ...TransactionAggregateInfo
    }

    # Top performers by campus
    topPerformers: user(
      where: { campus: { _eq: $campus } }
      order_by: { totalUp: desc }
      limit: 10
    ) {
      ...UserBasicInfo
      totalUp
      totalDown
      auditRatio
      # User XP total
      userXP: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          sum { amount }
        }
      }
    }

    # Campus activity timeline
    campusActivity: transaction(
      where: {
        campus: { _eq: $campus }
        createdAt: { _gte: "now() - interval '7 days'" }
      }
      order_by: { createdAt: desc }
      limit: 100
    ) {
      ...TransactionInfo
      user {
        ...UserBasicInfo
      }
      object {
        ...ObjectInfo
      }
    }
  }
  ${TRANSACTION_AGGREGATE_FRAGMENT}
  ${RESULT_AGGREGATE_FRAGMENT}
  ${AUDIT_AGGREGATE_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
`;

// ============================================================================
// TIME-BASED ANALYTICS
// ============================================================================

// Comprehensive time-based performance analysis
export const GET_TIME_BASED_ANALYTICS = gql`
  query GetTimeBasedAnalytics(
    $userId: Int!
    $startDate: timestamptz!
    $endDate: timestamptz!
    $granularity: String = "day"
  ) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # Time-filtered transaction analytics
      timeTransactions: transactions(
        where: {
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
        order_by: { createdAt: asc }
      ) {
        ...TransactionInfo
        object {
          ...ObjectInfo
        }
        event {
          ...EventInfo
        }
      }

      # XP progression over time
      xpProgression: transactions(
        where: {
          type: { _eq: "xp" }
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
        order_by: { createdAt: asc }
      ) {
        ...TransactionInfo
        object {
          ...ObjectInfo
        }
      }

      # Project completions over time
      projectCompletions: results(
        where: {
          object: { type: { _eq: "project" } }
          isLast: { _eq: true }
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
        order_by: { createdAt: asc }
      ) {
        ...ResultInfo
        object {
          ...ObjectInfo
        }
      }

      # Audit activity over time
      auditActivity: audits(
        where: {
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
        order_by: { createdAt: asc }
      ) {
        ...AuditInfo
        group {
          ...GroupInfo
          object {
            ...ObjectInfo
          }
        }
      }

      # Progress updates over time
      progressUpdates: progresses(
        where: {
          updatedAt: { _gte: $startDate, _lte: $endDate }
        }
        order_by: { updatedAt: asc }
      ) {
        ...ProgressInfo
        object {
          ...ObjectInfo
        }
      }
    }

    # Activity patterns by hour
    activityByHour: transaction(
      where: {
        userId: { _eq: $userId }
        createdAt: { _gte: $startDate, _lte: $endDate }
      }
    ) {
      createdAt
      type
      amount
    }
  }
  ${USER_FRAGMENT}
  ${TRANSACTION_FRAGMENT}
  ${RESULT_FRAGMENT}
  ${AUDIT_FRAGMENT}
  ${PROGRESS_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${GROUP_FRAGMENT}
`;

// ============================================================================
// PERFORMANCE BENCHMARKING
// ============================================================================

// Comprehensive performance benchmarking against peers
export const GET_PERFORMANCE_BENCHMARKING = gql`
  query GetPerformanceBenchmarking($userId: Int!, $campus: String = null) {
    # User's performance metrics
    userPerformance: user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # User's total XP
      userXP: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        ...TransactionAggregateInfo
      }

      # User's project success rate
      userProjects: results_aggregate(
        where: {
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

    # Campus averages for comparison
    campusAverages: user_aggregate(
      where: { campus: { _eq: $campus } }
    ) {
      aggregate {
        count
        avg {
          auditRatio
          totalUp
          totalDown
        }
      }
    }

    # Campus XP distribution
    campusXPDistribution: transaction_aggregate(
      where: {
        campus: { _eq: $campus }
        type: { _eq: "xp" }
      }
    ) {
      ...TransactionAggregateInfo
    }

    # Peer comparison (users with similar XP range)
    peerComparison: user(
      where: {
        campus: { _eq: $campus }
        id: { _neq: $userId }
      }
      order_by: { totalUp: desc }
      limit: 20
    ) {
      ...UserBasicInfo
      auditRatio
      totalUp
      totalDown
      # Peer XP totals
      peerXP: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          sum { amount }
        }
      }
      # Peer project count
      peerProjects: results_aggregate(
        where: {
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

    # Performance percentiles
    xpPercentiles: transaction_aggregate(
      where: {
        campus: { _eq: $campus }
        type: { _eq: "xp" }
      }
    ) {
      aggregate {
        count
        sum { amount }
        avg { amount }
        max { amount }
        min { amount }
      }
    }

    # Audit performance comparison
    auditComparison: audit_aggregate(
      where: {
        auditor: { campus: { _eq: $campus } }
      }
    ) {
      ...AuditAggregateInfo
    }
  }
  ${USER_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${TRANSACTION_AGGREGATE_FRAGMENT}
  ${AUDIT_AGGREGATE_FRAGMENT}
`;

// ============================================================================
// LEARNING VELOCITY ANALYTICS
// ============================================================================

// Learning velocity and acceleration metrics
export const GET_LEARNING_VELOCITY_ANALYTICS = gql`
  query GetLearningVelocityAnalytics($userId: Int!, $timeWindow: Int = 30) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # Recent learning activity
      recentActivity: transactions(
        where: {
          createdAt: { _gte: "now() - interval '${timeWindow} days'" }
        }
        order_by: { createdAt: asc }
      ) {
        ...TransactionInfo
        object {
          ...ObjectInfo
        }
      }

      # Learning milestones
      learningMilestones: results(
        where: {
          grade: { _gte: 1 }
          isLast: { _eq: true }
        }
        order_by: { createdAt: asc }
      ) {
        ...ResultInfo
        object {
          ...ObjectInfo
        }
        event {
          ...EventInfo
        }
      }

      # Skill acquisition rate
      skillAcquisition: transactions(
        where: {
          type: { _like: "%skill%" }
          createdAt: { _gte: "now() - interval '${timeWindow} days'" }
        }
        order_by: { createdAt: asc }
      ) {
        ...TransactionInfo
        object {
          ...ObjectInfo
        }
      }

      # Progress velocity
      progressVelocity: progresses(
        where: {
          updatedAt: { _gte: "now() - interval '${timeWindow} days'" }
        }
        order_by: { updatedAt: asc }
      ) {
        ...ProgressInfo
        object {
          ...ObjectInfo
        }
      }
    }

    # Velocity benchmarks
    velocityBenchmarks: user_aggregate(
      where: {
        campus: { _eq: (
          SELECT campus FROM user WHERE id = $userId
        ) }
      }
    ) {
      aggregate {
        count
      }
    }
  }
  ${TRANSACTION_FRAGMENT}
  ${RESULT_FRAGMENT}
  ${PROGRESS_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
`;
