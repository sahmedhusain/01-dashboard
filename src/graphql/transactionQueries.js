import { gql } from '@apollo/client';
import {
  USER_FRAGMENT,
  USER_BASIC_FRAGMENT,
  TRANSACTION_FRAGMENT,
  OBJECT_FRAGMENT,
  EVENT_FRAGMENT,
} from './fragments.js';

import {
  TRANSACTION_AGGREGATE_FRAGMENT,
} from './aggregateFragments.js';

// ============================================================================
// TRANSACTION QUERIES
// ============================================================================

// Optimized user transactions query following official database structure
export const GET_USER_TRANSACTIONS = gql`
  query GetUserTransactions(
    $userId: Int!
    $limit: Int = 100
    $offset: Int = 0
    $transactionTypes: [String!] = ["xp", "up", "down"]
    $campus: String = null
  ) {
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
      ...TransactionInfo
      # Related object information following official structure
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
        # Reference relationships
        reference {
          id
          name
          type
          attrs
        }
      }
      # Related event information following official structure
      event {
        id
        path
        campus
        createdAt
        endAt
        # Parent event relationship
        parent {
          id
          path
          campus
        }
        # Registration information
        registration {
          id
          startAt
          endAt
          eventStartAt
        }
        # Related object
        object {
          id
          name
          type
          attrs
        }
      }
    }

    # Transaction aggregates for statistics
    transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _in: $transactionTypes }
        campus: { _eq: $campus }
      }
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
  }
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${USER_FRAGMENT}
`;

// Query for top transaction (highest XP gain)
export const GET_TOP_TRANSACTION = gql`
  query GetTopTransaction($campus: String = null, $pathPattern: String = "%") {
    transaction(
      order_by: { amount: desc }
      limit: 1
      where: {
        type: { _eq: "xp" }
        path: { _like: $pathPattern }
        campus: { _eq: $campus }
      }
    ) {
      amount
      type
      createdAt
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
        campus
      }
    }
  }
`;

// Query for total XP across all users
export const GET_TOTAL_XP = gql`
  query GetTotalXP($eventPath: String = null, $campus: String = null) {
    transaction_aggregate(
      where: {
        type: { _eq: "xp" }
        event: { path: { _eq: $eventPath } }
        campus: { _eq: $campus }
      }
    ) {
      aggregate {
        sum {
          # XP amount in bytes, converted to KB using factor of 1000
          amount
        }
        count
      }
    }
  }
`;

// Query for user technologies (skill transactions)
export const GET_USER_TECHNOLOGIES = gql`
  query GetUserTechnologies {
    transaction(
      where: {
        _and: [
          { type: { _iregex: "(^|[^[:alnum:]_])[[:alnum:]_]*skill_[[:alnum:]_]*($|[^[:alnum:]_])" } }
          { type: { _like: "%skill%" } }
          { object: { type: { _eq: "project" } } }
          { type: { _in: [
            "skill_git", "skill_go", "skill_js",
            "skill_html", "skill_css", "skill_unix", "skill_docker",
            "skill_sql"
          ] } }
        ]
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

// Query for user technical skills
export const GET_USER_TECHNICAL_SKILLS = gql`
  query GetUserTechnicalSkills {
    transaction(
      where: {
        _and: [
          { type: { _iregex: "(^|[^[:alnum:]_])[[:alnum:]_]*skill_[[:alnum:]_]*($|[^[:alnum:]_])" } }
          { type: { _like: "%skill%" } }
          { object: { type: { _eq: "project" } } }
          { type: { _in: [
            "skill_prog", "skill_algo", "skill_sys-admin", "skill_front-end",
            "skill_back-end", "skill_stats", "skill_ai", "skill_game",
            "skill_tcp"
          ] } }
        ]
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
// XP-SPECIFIC QUERIES
// ============================================================================

// Query for XP transactions by time period
export const GET_XP_BY_TIME_PERIOD = gql`
  query GetXPByTimePeriod(
    $userId: Int!
    $startDate: timestamptz!
    $endDate: timestamptz!
    $campus: String = null
  ) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        createdAt: { _gte: $startDate, _lte: $endDate }
        campus: { _eq: $campus }
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

    # Aggregate for the time period
    xpAggregate: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        createdAt: { _gte: $startDate, _lte: $endDate }
        campus: { _eq: $campus }
      }
    ) {
      ...TransactionAggregateInfo
    }
  }
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${TRANSACTION_AGGREGATE_FRAGMENT}
`;

// Query for XP transactions by project type
export const GET_XP_BY_PROJECT_TYPE = gql`
  query GetXPByProjectType(
    $userId: Int!
    $objectType: String = "project"
    $campus: String = null
  ) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        object: { type: { _eq: $objectType } }
        campus: { _eq: $campus }
      }
      order_by: { amount: desc }
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
      }
    }

    # Aggregate by project type
    xpByTypeAggregate: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        object: { type: { _eq: $objectType } }
        campus: { _eq: $campus }
      }
    ) {
      ...TransactionAggregateInfo
    }
  }
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${TRANSACTION_AGGREGATE_FRAGMENT}
`;

// ============================================================================
// SKILL PROGRESSION QUERIES
// ============================================================================

// Query for skill progression over time
export const GET_SKILL_PROGRESSION = gql`
  query GetSkillProgression($userId: Int!, $skillType: String = "%skill%") {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _like: $skillType }
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
      event {
        ...EventInfo
      }
    }

    # Skill progression aggregate
    skillAggregate: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _like: $skillType }
      }
    ) {
      ...TransactionAggregateInfo
    }
  }
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${TRANSACTION_AGGREGATE_FRAGMENT}
`;

// ============================================================================
// CAMPUS COMPARISON QUERIES
// ============================================================================

// Query for campus-wide transaction statistics
export const GET_CAMPUS_TRANSACTION_STATS = gql`
  query GetCampusTransactionStats($campus: String!, $transactionType: String = "xp") {
    # Campus aggregate statistics
    campusStats: transaction_aggregate(
      where: {
        campus: { _eq: $campus }
        type: { _eq: $transactionType }
      }
    ) {
      ...TransactionAggregateInfo
    }

    # Top performers in campus
    topPerformers: transaction(
      where: {
        campus: { _eq: $campus }
        type: { _eq: $transactionType }
      }
      order_by: { amount: desc }
      limit: 10
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
  ${TRANSACTION_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${OBJECT_FRAGMENT}
`;
