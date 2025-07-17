import { gql } from '@apollo/client';
import {
  USER_FRAGMENT,
  USER_BASIC_FRAGMENT,
  PROGRESS_FRAGMENT,
  RESULT_FRAGMENT,
  OBJECT_FRAGMENT,
  EVENT_FRAGMENT,
  GROUP_FRAGMENT,
  AUDIT_FRAGMENT,
} from './fragments.js';

import {
  PROGRESS_AGGREGATE_FRAGMENT,
  RESULT_AGGREGATE_FRAGMENT,
} from './aggregateFragments.js';

// ============================================================================
// PROGRESS TRACKING QUERIES
// ============================================================================

// Enhanced user progress query following official database structure
export const GET_USER_PROGRESS = gql`
  query GetUserProgress($userId: Int!, $limit: Int = 50, $offset: Int = 0, $isDone: Boolean = null) {
    progress(
      where: {
        userId: { _eq: $userId }
        isDone: { _eq: $isDone }
      }
      order_by: { updatedAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...ProgressInfo
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
        # Object children relationships
        children: objectChildrenByParentId {
          id
          key
          index
          attrs
          child {
            id
            name
            type
            attrs
          }
        }
      }
      # Related event information following official structure
      event {
        id
        path
        createdAt
        endAt
        campus
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
      # Related group information following official structure
      group {
        id
        status
        captainId
        createdAt
        updatedAt
        path
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
      }
    }

    # Progress statistics
    progress_aggregate(
      where: { userId: { _eq: $userId } }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }
  }
  ${PROGRESS_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${USER_FRAGMENT}
`;

// Query for progress by path pattern
export const GET_PROGRESS_BY_PATH = gql`
  query GetProgressByPath(
    $userId: Int!
    $pathPattern: String = "%"
    $limit: Int = 50
    $offset: Int = 0
  ) {
    progress(
      where: {
        userId: { _eq: $userId }
        path: { _like: $pathPattern }
      }
      order_by: { updatedAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...ProgressInfo
      object {
        ...ObjectInfo
      }
      event {
        ...EventInfo
      }
      group {
        ...GroupInfo
      }
    }

    # Progress aggregate for path pattern
    progress_aggregate(
      where: {
        userId: { _eq: $userId }
        path: { _like: $pathPattern }
      }
    ) {
      ...ProgressAggregateInfo
    }
  }
  ${PROGRESS_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${GROUP_FRAGMENT}
  ${PROGRESS_AGGREGATE_FRAGMENT}
`;

// Query for completed progress items
export const GET_COMPLETED_PROGRESS = gql`
  query GetCompletedProgress($userId: Int!, $limit: Int = 100) {
    progress(
      where: {
        userId: { _eq: $userId }
        isDone: { _eq: true }
        grade: { _gte: 1 }
      }
      order_by: { updatedAt: desc }
      limit: $limit
    ) {
      ...ProgressInfo
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

    # Completed progress statistics
    completed_progress_stats: progress_aggregate(
      where: {
        userId: { _eq: $userId }
        isDone: { _eq: true }
        grade: { _gte: 1 }
      }
    ) {
      ...ProgressAggregateInfo
    }
  }
  ${PROGRESS_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${PROGRESS_AGGREGATE_FRAGMENT}
`;

// ============================================================================
// RESULT QUERIES
// ============================================================================

// Enhanced user results query following official database structure
export const GET_USER_RESULTS = gql`
  query GetUserResults($userId: Int!, $limit: Int = 50, $offset: Int = 0, $type: String = null, $minGrade: Float = null) {
    result(
      where: {
        userId: { _eq: $userId }
        type: { _eq: $type }
        grade: { _gte: $minGrade }
      }
      order_by: { updatedAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...ResultInfo
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
      # Related group information following official structure
      group {
        id
        status
        captainId
        createdAt
        updatedAt
        path
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
      }
      # Related audits for this result following official audit table structure
      audits {
        ...AuditInfo
        # Auditor information
        auditor {
          ...UserInfo
        }
        # Related group
        group {
          id
          status
          captainId
          path
          campus
        }
      }
    }

    # Result statistics
    result_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: $type }
      }
    ) {
      aggregate {
        count
        avg {
          grade
        }
        max {
          grade
        }
        min {
          grade
        }
      }
    }
  }
  ${RESULT_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${USER_FRAGMENT}
  ${AUDIT_FRAGMENT}
`;

// Query for project results specifically
export const GET_PROJECT_RESULTS = gql`
  query GetProjectResults($userId: Int!, $limit: Int = 50) {
    result(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: "project" } }
        isLast: { _eq: true }
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      ...ResultInfo
      object {
        ...ObjectInfo
        author {
          ...UserBasicInfo
        }
      }
      event {
        ...EventInfo
      }
      group {
        ...GroupInfo
        captain {
          ...UserBasicInfo
        }
        groupUsers {
          id
          confirmed
          user {
            ...UserBasicInfo
          }
        }
      }
      # Related audits
      audits {
        ...AuditInfo
        auditor {
          ...UserBasicInfo
        }
      }
    }

    # Project results statistics
    project_results_stats: result_aggregate(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: "project" } }
        isLast: { _eq: true }
      }
    ) {
      ...ResultAggregateInfo
    }

    # Passed projects
    passed_projects: result_aggregate(
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
  ${RESULT_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${GROUP_FRAGMENT}
  ${AUDIT_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${RESULT_AGGREGATE_FRAGMENT}
`;

// ============================================================================
// PROGRESS ANALYTICS QUERIES
// ============================================================================

// Query for progress timeline and trends
export const GET_PROGRESS_TIMELINE = gql`
  query GetProgressTimeline($userId: Int!, $startDate: timestamptz, $endDate: timestamptz) {
    progress(
      where: {
        userId: { _eq: $userId }
        updatedAt: { _gte: $startDate, _lte: $endDate }
      }
      order_by: { updatedAt: asc }
    ) {
      ...ProgressInfo
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

    # Progress statistics for time period
    progress_period_stats: progress_aggregate(
      where: {
        userId: { _eq: $userId }
        updatedAt: { _gte: $startDate, _lte: $endDate }
      }
    ) {
      ...ProgressAggregateInfo
    }

    # Completed items in period
    completed_in_period: progress_aggregate(
      where: {
        userId: { _eq: $userId }
        isDone: { _eq: true }
        updatedAt: { _gte: $startDate, _lte: $endDate }
      }
    ) {
      aggregate {
        count
      }
    }
  }
  ${PROGRESS_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${PROGRESS_AGGREGATE_FRAGMENT}
`;

// Query for learning path progress
export const GET_LEARNING_PATH_PROGRESS = gql`
  query GetLearningPathProgress($userId: Int!, $pathPrefix: String = "/") {
    # Progress grouped by path hierarchy
    progress(
      where: {
        userId: { _eq: $userId }
        path: { _like: $pathPrefix }
      }
      order_by: { path: asc, updatedAt: desc }
    ) {
      ...ProgressInfo
      object {
        ...ObjectInfo
        # Object hierarchy
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
        parent {
          ...EventInfo
        }
      }
    }

    # Path completion statistics
    path_completion_stats: progress_aggregate(
      where: {
        userId: { _eq: $userId }
        path: { _like: $pathPrefix }
        isDone: { _eq: true }
      }
    ) {
      ...ProgressAggregateInfo
    }
  }
  ${PROGRESS_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${PROGRESS_AGGREGATE_FRAGMENT}
`;
