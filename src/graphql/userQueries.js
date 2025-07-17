import { gql } from '@apollo/client';
import {
  USER_FRAGMENT,
  USER_BASIC_FRAGMENT,
  USER_PUBLIC_FRAGMENT,
  OBJECT_FRAGMENT,
  TRANSACTION_FRAGMENT,
  RESULT_FRAGMENT,
  AUDIT_FRAGMENT,
  PROGRESS_FRAGMENT,
  EVENT_USER_FRAGMENT,
  EVENT_FRAGMENT,
  GROUP_USER_FRAGMENT,
  GROUP_FRAGMENT,
  LABEL_USER_FRAGMENT,
  LABEL_FRAGMENT,
  MATCH_FRAGMENT,
  OBJECT_AVAILABILITY_FRAGMENT,
  PROGRESS_BY_PATH_VIEW_FRAGMENT,
  RECORD_FRAGMENT,
  REGISTRATION_USER_FRAGMENT,
  REGISTRATION_FRAGMENT,
  USER_ROLE_FRAGMENT,
  ROLE_FRAGMENT,
  USER_ROLES_VIEW_FRAGMENT,
  TOAD_SESSION_FRAGMENT,
  XP_FRAGMENT,
} from './fragments.js';

import {
  TRANSACTION_AGGREGATE_FRAGMENT,
  RESULT_AGGREGATE_FRAGMENT,
  AUDIT_AGGREGATE_FRAGMENT,
  EVENT_USER_AGGREGATE_FRAGMENT,
  LABEL_USER_AGGREGATE_FRAGMENT,
  MATCH_AGGREGATE_FRAGMENT,
  OBJECT_AVAILABILITY_AGGREGATE_FRAGMENT,
  PROGRESS_BY_PATH_VIEW_AGGREGATE_FRAGMENT,
  REGISTRATION_USER_AGGREGATE_FRAGMENT,
  USER_ROLE_AGGREGATE_FRAGMENT,
  USER_ROLES_VIEW_AGGREGATE_FRAGMENT,
  TOAD_SESSIONS_AGGREGATE_FRAGMENT,
} from './aggregateFragments.js';

// ============================================================================
// BASIC USER QUERIES
// ============================================================================

// Basic user info query
export const GET_USER_INFO = gql`
  query GetUserInfo {
    user {
      ...UserInfo
    }
  }
  ${USER_FRAGMENT}
`;

// Basic user profile query
export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # User records (bans, warnings, etc.)
      records {
        ...RecordInfo
        author {
          ...UserBasicInfo
        }
      }

      # User roles
      user_roles {
        ...UserRoleInfo
        role {
          ...RoleInfo
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${RECORD_FRAGMENT}
  ${USER_ROLE_FRAGMENT}
  ${ROLE_FRAGMENT}
`;

// ============================================================================
// USER RELATIONSHIP QUERIES
// ============================================================================

// Query for user events and registrations
export const GET_USER_EVENTS_DETAILED = gql`
  query GetUserEventsDetailed($userId: Int!, $limit: Int = 50, $offset: Int = 0) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # User events
      events(
        limit: $limit
        offset: $offset
        order_by: { event: { createdAt: desc } }
      ) {
        ...EventUserInfo
        event {
          ...EventInfo
          object {
            ...ObjectInfo
            author {
              ...UserBasicInfo
            }
          }
          registration {
            ...RegistrationInfo
            object {
              ...ObjectInfo
            }
          }
          parent {
            ...EventInfo
          }
        }
      }

      # Events aggregate
      events_aggregate {
        ...EventUserAggregateInfo
      }

      # User registrations
      registrations(
        limit: $limit
        offset: $offset
        order_by: { createdAt: desc }
      ) {
        ...RegistrationUserInfo
        registration {
          ...RegistrationInfo
          object {
            ...ObjectInfo
          }
          parent {
            ...RegistrationInfo
          }
        }
      }

      # Registrations aggregate
      registrations_aggregate {
        ...RegistrationUserAggregateInfo
      }
    }
  }
  ${EVENT_USER_FRAGMENT}
  ${EVENT_USER_AGGREGATE_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${REGISTRATION_FRAGMENT}
  ${REGISTRATION_USER_FRAGMENT}
  ${REGISTRATION_USER_AGGREGATE_FRAGMENT}
`;

// Query for user labels and tags
export const GET_USER_LABELS = gql`
  query GetUserLabels($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # User labels
      labels {
        ...LabelUserInfo
        label {
          ...LabelInfo
        }
      }

      # Labels aggregate
      labels_aggregate {
        ...LabelUserAggregateInfo
      }
    }
  }
  ${LABEL_USER_FRAGMENT}
  ${LABEL_USER_AGGREGATE_FRAGMENT}
  ${LABEL_FRAGMENT}
`;

// Query for user matches (betting/competition system)
export const GET_USER_MATCHES_DETAILED = gql`
  query GetUserMatchesDetailed($userId: Int!, $limit: Int = 50, $offset: Int = 0) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # User matches
      matches(
        limit: $limit
        offset: $offset
        order_by: { createdAt: desc }
      ) {
        ...MatchInfo
        # The matched user
        matchedUser: userByMatchId {
          ...UserBasicInfo
        }
        # Related object
        object {
          ...ObjectInfo
          author {
            ...UserBasicInfo
          }
        }
        # Related event
        event {
          ...EventInfo
          object {
            ...ObjectInfo
          }
        }
      }

      # Matches aggregate
      matches_aggregate {
        ...MatchAggregateInfo
      }
    }
  }
  ${MATCH_FRAGMENT}
  ${MATCH_AGGREGATE_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
`;

// Query for user object availabilities
export const GET_USER_OBJECT_AVAILABILITIES = gql`
  query GetUserObjectAvailabilities($userId: Int!, $limit: Int = 50, $offset: Int = 0) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # Object availabilities
      objectAvailabilities(
        limit: $limit
        offset: $offset
        order_by: { createdAt: desc }
      ) {
        ...ObjectAvailabilityInfo
        object {
          ...ObjectInfo
          author {
            ...UserBasicInfo
          }
          reference {
            ...ObjectInfo
          }
        }
      }

      # Object availabilities aggregate
      objectAvailabilities_aggregate {
        ...ObjectAvailabilityAggregateInfo
      }
    }
  }
  ${OBJECT_AVAILABILITY_FRAGMENT}
  ${OBJECT_AVAILABILITY_AGGREGATE_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
`;

// Query for user progress by path
export const GET_USER_PROGRESS_BY_PATH = gql`
  query GetUserProgressByPath($userId: Int!, $pathPattern: String = "%", $limit: Int = 50, $offset: Int = 0) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # Progress by path
      progressesByPath(
        where: { path: { _like: $pathPattern } }
        limit: $limit
        offset: $offset
        order_by: { updatedAt: desc }
      ) {
        ...ProgressByPathViewInfo
      }

      # Progress by path aggregate
      progressesByPath_aggregate(
        where: { path: { _like: $pathPattern } }
      ) {
        ...ProgressByPathViewAggregateInfo
      }
    }
  }
  ${PROGRESS_BY_PATH_VIEW_FRAGMENT}
  ${PROGRESS_BY_PATH_VIEW_AGGREGATE_FRAGMENT}
`;

// Query for user sessions
export const GET_USER_SESSIONS = gql`
  query GetUserSessions($userId: Int!, $limit: Int = 10, $offset: Int = 0) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # User sessions
      sessions(
        limit: $limit
        offset: $offset
        order_by: { createdAt: desc }
      ) {
        ...ToadSessionInfo
      }

      # Sessions aggregate
      sessions_aggregate {
        ...ToadSessionsAggregateInfo
      }
    }
  }
  ${TOAD_SESSION_FRAGMENT}
  ${TOAD_SESSIONS_AGGREGATE_FRAGMENT}
`;

// Query for user XPs (separate from transactions)
export const GET_USER_XPS = gql`
  query GetUserXPs($userId: Int!, $limit: Int = 100, $offset: Int = 0) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # User XPs
      xps(
        limit: $limit
        offset: $offset
        order_by: { createdAt: desc }
      ) {
        ...XPInfo
      }
    }
  }
  ${XP_FRAGMENT}
`;

// Query for user created objects
export const GET_USER_CREATED_OBJECTS = gql`
  query GetUserCreatedObjects($userId: Int!, $limit: Int = 50, $offset: Int = 0, $objectType: String = null) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # Objects created by user
      objects(
        where: { type: { _eq: $objectType } }
        limit: $limit
        offset: $offset
        order_by: { createdAt: desc }
      ) {
        ...ObjectInfo
        reference {
          ...ObjectInfo
          author {
            ...UserBasicInfo
          }
        }
        # Objects that reference this object
        referencedBy: objectsByReferenceId(limit: 5) {
          ...ObjectInfo
        }
        # Object children
        children: objectChildrenByParentId(limit: 10) {
          id
          key
          index
          attrs
          child {
            ...ObjectInfo
          }
        }
      }

      # Objects aggregate
      objects_aggregate(
        where: { type: { _eq: $objectType } }
      ) {
        aggregate {
          count
        }
      }
    }
  }
  ${OBJECT_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
`;
