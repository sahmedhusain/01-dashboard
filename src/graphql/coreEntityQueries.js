import { gql } from '@apollo/client';
import {
  USER_BASIC_FRAGMENT,
  OBJECT_FRAGMENT,
  MARKDOWN_FRAGMENT,
} from './fragments.js';

// ============================================================================
// PATH AND PATH ARCHIVE QUERIES
// ============================================================================

// Query for path information
export const GET_PATH_INFO = gql`
  query GetPathInfo($pathPattern: String = "%", $limit: Int = 50) {
    path(
      where: { path: { _like: $pathPattern } }
      order_by: { path: asc }
      limit: $limit
    ) {
      id
      path
      campus
      status
      createdAt
      updatedAt
    }

    # Path aggregate statistics
    path_aggregate(
      where: { path: { _like: $pathPattern } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

// Query for path archive information
export const GET_PATH_ARCHIVE = gql`
  query GetPathArchive($pathPattern: String = "%", $limit: Int = 50) {
    path_archive(
      where: { path: { _like: $pathPattern } }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      path
      campus
      archivedAt
      reason
      createdAt
      updatedAt
    }

    # Path archive aggregate
    path_archive_aggregate(
      where: { path: { _like: $pathPattern } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

// Query for active paths by campus
export const GET_ACTIVE_PATHS_BY_CAMPUS = gql`
  query GetActivePathsByCampus($campus: String!) {
    path(
      where: {
        campus: { _eq: $campus }
        status: { _eq: "active" }
      }
      order_by: { path: asc }
    ) {
      id
      path
      campus
      status
      createdAt
      updatedAt
    }

    # Campus path statistics
    campus_path_stats: path_aggregate(
      where: {
        campus: { _eq: $campus }
        status: { _eq: "active" }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

// ============================================================================
// TIMING QUERIES
// ============================================================================

// Query for timing information
export const GET_TIMING_INFO = gql`
  query GetTimingInfo($limit: Int = 100) {
    timing(
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      name
      duration
      startTime
      endTime
      status
      metadata
      createdAt
      updatedAt
    }
  }
`;

// Query for timing by status
export const GET_TIMING_BY_STATUS = gql`
  query GetTimingByStatus($status: String!, $limit: Int = 50) {
    timing(
      where: { status: { _eq: $status } }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      name
      duration
      startTime
      endTime
      status
      metadata
      createdAt
      updatedAt
    }

    # Timing statistics by status
    timing_stats: timing_aggregate(
      where: { status: { _eq: $status } }
    ) {
      aggregate {
        count
        avg {
          duration
        }
        max {
          duration
        }
        min {
          duration
        }
      }
    }
  }
`;

// ============================================================================
// MARKDOWN CONTENT QUERIES
// ============================================================================

// Query for markdown content
export const GET_MARKDOWN_CONTENT = gql`
  query GetMarkdownContent($pathPattern: String = "%", $limit: Int = 50) {
    markdown(
      where: { path: { _like: $pathPattern } }
      order_by: { updatedAt: desc }
      limit: $limit
    ) {
      ...MarkdownInfo
    }

    # Markdown aggregate
    markdown_aggregate(
      where: { path: { _like: $pathPattern } }
    ) {
      aggregate {
        count
      }
    }
  }
  ${MARKDOWN_FRAGMENT}
`;

// Query for specific markdown by name
export const GET_MARKDOWN_BY_NAME = gql`
  query GetMarkdownByName($name: String!) {
    markdown(
      where: { name: { _eq: $name } }
      limit: 1
    ) {
      ...MarkdownInfo
    }
  }
  ${MARKDOWN_FRAGMENT}
`;

// Query for markdown content by path
export const GET_MARKDOWN_BY_PATH = gql`
  query GetMarkdownByPath($path: String!) {
    markdown(
      where: { path: { _eq: $path } }
      order_by: { updatedAt: desc }
    ) {
      ...MarkdownInfo
    }
  }
  ${MARKDOWN_FRAGMENT}
`;

// ============================================================================
// OBJECT TYPE QUERIES
// ============================================================================

// Query for object types
export const GET_OBJECT_TYPES = gql`
  query GetObjectTypes {
    object_type(
      order_by: { name: asc }
    ) {
      id
      name
      description
      category
      isActive
      createdAt
      updatedAt
    }

    # Object type statistics
    object_type_stats: object_type_aggregate {
      aggregate {
        count
      }
    }
  }
`;

// Query for objects by type
export const GET_OBJECTS_BY_TYPE = gql`
  query GetObjectsByType($objectType: String!, $limit: Int = 100) {
    object(
      where: { type: { _eq: $objectType } }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      ...ObjectInfo
      author {
        ...UserBasicInfo
      }
      reference {
        ...ObjectInfo
      }
    }

    # Objects by type statistics
    objects_by_type_stats: object_aggregate(
      where: { type: { _eq: $objectType } }
    ) {
      aggregate {
        count
      }
    }
  }
  ${OBJECT_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
`;

// ============================================================================
// RECORD TYPE QUERIES
// ============================================================================

// Query for record types
export const GET_RECORD_TYPES = gql`
  query GetRecordTypes {
    record_type(
      order_by: { name: asc }
    ) {
      id
      name
      description
      severity
      isActive
      createdAt
      updatedAt
    }
  }
`;

// Query for records by type
export const GET_RECORDS_BY_TYPE = gql`
  query GetRecordsByType($recordType: String!, $limit: Int = 50) {
    record(
      where: { type: { _eq: $recordType } }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      userId
      authorId
      type
      message
      banEndAt
      createdAt
      updatedAt
      user {
        ...UserBasicInfo
      }
      author {
        ...UserBasicInfo
      }
    }

    # Records by type statistics
    records_by_type_stats: record_aggregate(
      where: { type: { _eq: $recordType } }
    ) {
      aggregate {
        count
      }
    }
  }
  ${USER_BASIC_FRAGMENT}
`;

// ============================================================================
// TRANSACTION TYPE QUERIES
// ============================================================================

// Query for transaction types
export const GET_TRANSACTION_TYPES = gql`
  query GetTransactionTypes {
    transaction_type(
      order_by: { name: asc }
    ) {
      id
      name
      description
      category
      isActive
      createdAt
      updatedAt
    }
  }
`;

// Query for transaction statistics by type
export const GET_TRANSACTION_STATS_BY_TYPE = gql`
  query GetTransactionStatsByType($transactionType: String!, $campus: String = null) {
    # Transaction statistics for specific type
    transaction_type_stats: transaction_aggregate(
      where: {
        type: { _eq: $transactionType }
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

    # Recent transactions of this type
    recent_transactions: transaction(
      where: {
        type: { _eq: $transactionType }
        campus: { _eq: $campus }
      }
      order_by: { createdAt: desc }
      limit: 20
    ) {
      id
      type
      amount
      userId
      createdAt
      path
      campus
      user {
        ...UserBasicInfo
      }
      object {
        ...ObjectInfo
      }
    }
  }
  ${USER_BASIC_FRAGMENT}
  ${OBJECT_FRAGMENT}
`;

// ============================================================================
// COMPREHENSIVE ENTITY OVERVIEW QUERIES
// ============================================================================

// Query for system overview (all entity counts)
export const GET_SYSTEM_OVERVIEW = gql`
  query GetSystemOverview($campus: String = null) {
    # User statistics
    user_stats: user_aggregate(
      where: { campus: { _eq: $campus } }
    ) {
      aggregate {
        count
      }
    }

    # Transaction statistics
    transaction_stats: transaction_aggregate(
      where: { campus: { _eq: $campus } }
    ) {
      aggregate {
        count
        sum {
          amount
        }
      }
    }

    # Object statistics
    object_stats: object_aggregate(
      where: { campus: { _eq: $campus } }
    ) {
      aggregate {
        count
      }
    }

    # Result statistics
    result_stats: result_aggregate(
      where: { campus: { _eq: $campus } }
    ) {
      aggregate {
        count
      }
    }

    # Audit statistics
    audit_stats: audit_aggregate {
      aggregate {
        count
        avg {
          grade
        }
      }
    }

    # Progress statistics
    progress_stats: progress_aggregate(
      where: { campus: { _eq: $campus } }
    ) {
      aggregate {
        count
      }
    }

    # Group statistics
    group_stats: group_aggregate(
      where: { campus: { _eq: $campus } }
    ) {
      aggregate {
        count
      }
    }

    # Event statistics
    event_stats: event_aggregate(
      where: { campus: { _eq: $campus } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

// Query for entity health check
export const GET_ENTITY_HEALTH_CHECK = gql`
  query GetEntityHealthCheck {
    # Check if core entities have data
    user_check: user(limit: 1) {
      id
    }

    transaction_check: transaction(limit: 1) {
      id
    }

    object_check: object(limit: 1) {
      id
    }

    result_check: result(limit: 1) {
      id
    }

    audit_check: audit(limit: 1) {
      id
    }

    progress_check: progress(limit: 1) {
      id
    }

    group_check: group(limit: 1) {
      id
    }

    event_check: event(limit: 1) {
      id
    }
  }
`;
