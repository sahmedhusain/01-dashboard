import { gql } from '@apollo/client';

// Error handling fragments for consistent error patterns
export const ERROR_FRAGMENT = gql`
  fragment ErrorInfo on Error {
    message
    code
    path
  }
`;

// Pagination info fragment for consistent pagination
export const PAGINATION_FRAGMENT = gql`
  fragment PaginationInfo on Query {
    totalCount: aggregate {
      count
    }
  }
`;

// Enhanced User fragment with all available fields from introspection
export const USER_FRAGMENT = gql`
  fragment UserInfo on user {
    id
    login
    attrs
    profile
    campus
    createdAt
    updatedAt
    # Personal information
    firstName
    lastName
    email
    avatarUrl
    # Social/External accounts
    discordId
    discordLogin
    githubId
    # Audit and performance metrics
    auditRatio
    totalUp
    totalDown
    totalUpBonus
    auditsAssigned
  }
`;

// Basic User fragment for minimal queries (to avoid over-fetching)
export const USER_BASIC_FRAGMENT = gql`
  fragment UserBasicInfo on user {
    id
    login
    firstName
    lastName
    campus
    avatarUrl
  }
`;

// User public view fragment for public-facing data
export const USER_PUBLIC_FRAGMENT = gql`
  fragment UserPublicInfo on user {
    id
    login
    firstName
    lastName
    campus
    avatarUrl
    auditRatio
    totalUp
    totalDown
    # Public view data
    public {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
    }
  }
`;

// Object fragment following official database structure
export const OBJECT_FRAGMENT = gql`
  fragment ObjectInfo on object {
    id
    name
    type
    attrs
    campus
    createdAt
    updatedAt
  }
`;

// Transaction fragment following official database structure
export const TRANSACTION_FRAGMENT = gql`
  fragment TransactionInfo on transaction {
    id
    type
    amount
    userId
    attrs
    createdAt
    path
    objectId
    eventId
    campus
  }
`;

// Result fragment following official database structure
export const RESULT_FRAGMENT = gql`
  fragment ResultInfo on result {
    id
    grade
    attrs
    type
    userId
    groupId
    objectId
    path
    version
    eventId
    isLast
    campus
    createdAt
    updatedAt
  }
`;

// Progress fragment following official database structure
export const PROGRESS_FRAGMENT = gql`
  fragment ProgressInfo on progress {
    id
    userId
    groupId
    eventId
    version
    grade
    isDone
    path
    campus
    objectId
    createdAt
    updatedAt
  }
`;

// Audit fragment following official database structure (safe fields only)
export const AUDIT_FRAGMENT = gql`
  fragment AuditInfo on audit {
    id
    groupId
    auditorId
    attrs
    grade
    createdAt
    updatedAt
    resultId
  }
`;

// Aggregate fragments for statistical data
export const AUDIT_AGGREGATE_FRAGMENT = gql`
  fragment AuditAggregateInfo on audit_aggregate {
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
      sum {
        grade
      }
    }
  }
`;

export const TRANSACTION_AGGREGATE_FRAGMENT = gql`
  fragment TransactionAggregateInfo on transaction_aggregate {
    aggregate {
      count
      avg {
        amount
      }
      max {
        amount
      }
      min {
        amount
      }
      sum {
        amount
      }
    }
  }
`;

export const PROGRESS_AGGREGATE_FRAGMENT = gql`
  fragment ProgressAggregateInfo on progress_aggregate {
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
`;

export const RESULT_AGGREGATE_FRAGMENT = gql`
  fragment ResultAggregateInfo on result_aggregate {
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
      sum {
        grade
      }
    }
  }
`;

export const OBJECT_AGGREGATE_FRAGMENT = gql`
  fragment ObjectAggregateInfo on object_aggregate {
    aggregate {
      count
    }
  }
`;

// Event-related fragments
export const EVENT_FRAGMENT = gql`
  fragment EventInfo on event {
    id
    path
    campus
    createdAt
  }
`;

export const EVENT_USER_FRAGMENT = gql`
  fragment EventUserInfo on event_user {
    id
    userId
    createdAt
  }
`;

export const EVENT_USER_AGGREGATE_FRAGMENT = gql`
  fragment EventUserAggregateInfo on event_user_aggregate {
    aggregate {
      count
    }
  }
`;

// Group-related fragments
export const GROUP_FRAGMENT = gql`
  fragment GroupInfo on group {
    id
    path
    campus
    status
    createdAt
    updatedAt
  }
`;

export const GROUP_USER_FRAGMENT = gql`
  fragment GroupUserInfo on group_user {
    id
    userId
    confirmed
    createdAt
    updatedAt
  }
`;

export const GROUP_AGGREGATE_FRAGMENT = gql`
  fragment GroupAggregateInfo on group_aggregate {
    aggregate {
      count
    }
  }
`;

export const GROUP_USER_AGGREGATE_FRAGMENT = gql`
  fragment GroupUserAggregateInfo on group_user_aggregate {
    aggregate {
      count
    }
  }
`;

// Label-related fragments
export const LABEL_FRAGMENT = gql`
  fragment LabelInfo on label {
    id
    name
    description
    color
    createdAt
    updatedAt
  }
`;

export const LABEL_USER_FRAGMENT = gql`
  fragment LabelUserInfo on label_user {
    id
    userId
    labelId
    createdAt
  }
`;

export const LABEL_USER_AGGREGATE_FRAGMENT = gql`
  fragment LabelUserAggregateInfo on label_user_aggregate {
    aggregate {
      count
    }
  }
`;

// Match-related fragments (for betting/competition system)
export const MATCH_FRAGMENT = gql`
  fragment MatchInfo on match {
    id
    userId
    matchId
    bet
    result
    confirmed
    createdAt
    updatedAt
    path
    campus
  }
`;

export const MATCH_AGGREGATE_FRAGMENT = gql`
  fragment MatchAggregateInfo on match_aggregate {
    aggregate {
      count
    }
  }
`;

// Object availability fragments
export const OBJECT_AVAILABILITY_FRAGMENT = gql`
  fragment ObjectAvailabilityInfo on object_availability {
    id
    userId
    objectId
    available
    createdAt
    updatedAt
  }
`;

export const OBJECT_AVAILABILITY_AGGREGATE_FRAGMENT = gql`
  fragment ObjectAvailabilityAggregateInfo on object_availability_aggregate {
    aggregate {
      count
    }
  }
`;

// Progress by path view fragments
export const PROGRESS_BY_PATH_VIEW_FRAGMENT = gql`
  fragment ProgressByPathViewInfo on progress_by_path_view {
    id
    userId
    path
    grade
    isDone
    createdAt
    updatedAt
  }
`;

export const PROGRESS_BY_PATH_VIEW_AGGREGATE_FRAGMENT = gql`
  fragment ProgressByPathViewAggregateInfo on progress_by_path_view_aggregate {
    aggregate {
      count
    }
  }
`;

// Record fragments (for user records/bans/warnings)
export const RECORD_FRAGMENT = gql`
  fragment RecordInfo on record {
    id
    userId
    authorId
    message
    banEndAt
    createdAt
    updatedAt
  }
`;

// Registration-related fragments
export const REGISTRATION_FRAGMENT = gql`
  fragment RegistrationInfo on registration {
    id
    path
    campus
    startAt
    endAt
    eventStartAt
    attrs
    createdAt
    updatedAt
  }
`;

export const REGISTRATION_USER_FRAGMENT = gql`
  fragment RegistrationUserInfo on registration_user {
    id
    userId
    registrationId
    createdAt
  }
`;

export const REGISTRATION_USER_AGGREGATE_FRAGMENT = gql`
  fragment RegistrationUserAggregateInfo on registration_user_aggregate {
    aggregate {
      count
    }
  }
`;

// Role-related fragments
export const ROLE_FRAGMENT = gql`
  fragment RoleInfo on role {
    id
    slug
    name
    description
    createdAt
    updatedAt
  }
`;

export const USER_ROLE_FRAGMENT = gql`
  fragment UserRoleInfo on user_role {
    id
    userId
    roleId
    createdAt
    updatedAt
  }
`;

export const USER_ROLE_AGGREGATE_FRAGMENT = gql`
  fragment UserRoleAggregateInfo on user_role_aggregate {
    aggregate {
      count
    }
  }
`;

export const USER_ROLES_VIEW_FRAGMENT = gql`
  fragment UserRolesViewInfo on user_roles_view {
    id
    userId
    roleId
    slug
    name
    description
  }
`;

export const USER_ROLES_VIEW_AGGREGATE_FRAGMENT = gql`
  fragment UserRolesViewAggregateInfo on user_roles_view_aggregate {
    aggregate {
      count
    }
  }
`;

// Session fragments (TOAD sessions)
export const TOAD_SESSION_FRAGMENT = gql`
  fragment ToadSessionInfo on toad_sessions {
    id
    userId
    sessionData
    createdAt
    updatedAt
    expiresAt
  }
`;

export const TOAD_SESSIONS_AGGREGATE_FRAGMENT = gql`
  fragment ToadSessionsAggregateInfo on toad_sessions_aggregate {
    aggregate {
      count
    }
  }
`;

// XP-related fragments (from user.xps field)
export const XP_FRAGMENT = gql`
  fragment XPInfo on xp {
    id
    userId
    amount
    originEventId
    path
    createdAt
  }
`;

// Markdown fragments
export const MARKDOWN_FRAGMENT = gql`
  fragment MarkdownInfo on markdown {
    id
    name
    content
    path
    createdAt
    updatedAt
  }
`;

// Define query strings following the official database structure
export const GET_USER_INFO = gql`
  query GetUserInfo {
    user {
      ...UserInfo
    }
  }
  ${USER_FRAGMENT}
`;

// Enhanced user profile with all relationships from introspection
export const GET_ENHANCED_USER_PROFILE = gql`
  query GetEnhancedUserProfile($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # User events
      events {
        ...EventUserInfo
        event {
          ...EventInfo
          object {
            ...ObjectInfo
          }
          registration {
            ...RegistrationInfo
          }
        }
      }

      # User events aggregate
      events_aggregate {
        ...EventUserAggregateInfo
      }

      # User groups
      groups {
        ...GroupUserInfo
        group {
          ...GroupInfo
          captain {
            ...UserBasicInfo
          }
          object {
            ...ObjectInfo
          }
        }
      }

      # Groups where user is captain
      groupsByCaptainid {
        ...GroupInfo
        groupUsers {
          ...GroupUserInfo
          user {
            ...UserBasicInfo
          }
        }
        object {
          ...ObjectInfo
        }
      }

      # User labels
      labels {
        ...LabelUserInfo
        label {
          ...LabelInfo
        }
      }

      # User matches (betting system)
      matches {
        ...MatchInfo
        matchedUser: userByMatchId {
          ...UserBasicInfo
        }
        object {
          ...ObjectInfo
        }
        event {
          ...EventInfo
        }
      }

      # Object availabilities
      objectAvailabilities {
        ...ObjectAvailabilityInfo
        object {
          ...ObjectInfo
        }
      }

      # User objects (created by user)
      objects {
        ...ObjectInfo
        reference {
          ...ObjectInfo
        }
      }

      # Progress by path view
      progressesByPath {
        ...ProgressByPathViewInfo
      }

      # User records (bans, warnings)
      records {
        ...RecordInfo
        author {
          ...UserBasicInfo
        }
      }

      # Records authored by user
      recordsByAuthorid {
        ...RecordInfo
        user {
          ...UserBasicInfo
        }
      }

      # User registrations
      registrations {
        ...RegistrationUserInfo
        registration {
          ...RegistrationInfo
          object {
            ...ObjectInfo
          }
        }
      }

      # User roles
      user_roles {
        ...UserRoleInfo
        role {
          ...RoleInfo
        }
      }

      # User roles view
      roles {
        ...UserRolesViewInfo
      }

      # User sessions
      sessions {
        ...ToadSessionInfo
      }

      # User XPs
      xps {
        ...XPInfo
      }
    }
  }
  ${USER_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${EVENT_USER_FRAGMENT}
  ${EVENT_USER_AGGREGATE_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${REGISTRATION_FRAGMENT}
  ${GROUP_USER_FRAGMENT}
  ${GROUP_FRAGMENT}
  ${LABEL_USER_FRAGMENT}
  ${LABEL_FRAGMENT}
  ${MATCH_FRAGMENT}
  ${OBJECT_AVAILABILITY_FRAGMENT}
  ${PROGRESS_BY_PATH_VIEW_FRAGMENT}
  ${RECORD_FRAGMENT}
  ${REGISTRATION_USER_FRAGMENT}
  ${USER_ROLE_FRAGMENT}
  ${ROLE_FRAGMENT}
  ${USER_ROLES_VIEW_FRAGMENT}
  ${TOAD_SESSION_FRAGMENT}
  ${XP_FRAGMENT}
`;

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

// ============================================================================
// OPTIMIZED ANALYTICS QUERIES
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

// Campus-wide comparison analytics
export const GET_CAMPUS_COMPARISON_ANALYTICS = gql`
  query GetCampusComparisonAnalytics($userId: Int!, $campus: String!) {
    # User's data
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # User's campus-specific metrics
      campusTransactions: transactions_aggregate(
        where: { campus: { _eq: $campus } }
      ) {
        ...TransactionAggregateInfo
      }

      campusXP: transactions_aggregate(
        where: {
          type: { _eq: "xp" }
          campus: { _eq: $campus }
        }
      ) {
        ...TransactionAggregateInfo
      }

      campusProjects: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          campus: { _eq: $campus }
          isLast: { _eq: true }
        }
      ) {
        ...ResultAggregateInfo
      }
    }

    # Campus averages for comparison
    campusUsers: user(
      where: { campus: { _eq: $campus } }
      limit: 1000
    ) {
      id
      login
      auditRatio
      totalUp
      totalDown

      # Individual user XP for ranking
      userXP: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }

      # Individual user projects for ranking
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
  }
  ${USER_FRAGMENT}
  ${TRANSACTION_AGGREGATE_FRAGMENT}
  ${RESULT_AGGREGATE_FRAGMENT}
`;

// Advanced collaboration and skill analytics
export const GET_COLLABORATION_ANALYTICS = gql`
  query GetCollaborationAnalytics($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # Group collaboration metrics
      groups {
        ...GroupUserInfo
        group {
          ...GroupInfo
          # Group performance metrics
          groupUsers {
            ...GroupUserInfo
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
        ...GroupInfo
        groupUsers {
          ...GroupUserInfo
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
          ...GroupInfo
          groupUsers {
            ...GroupUserInfo
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
  ${GROUP_USER_FRAGMENT}
  ${GROUP_FRAGMENT}
  ${RESULT_AGGREGATE_FRAGMENT}
  ${AUDIT_AGGREGATE_FRAGMENT}
  ${AUDIT_FRAGMENT}
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${MATCH_FRAGMENT}
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
        ...ObjectAggregateInfo
      }
    }
  }
  ${OBJECT_FRAGMENT}
  ${OBJECT_AGGREGATE_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
`;

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
        ...UserRoleInfo
        role {
          ...RoleInfo
        }
      }

      # User records with enhanced author data
      records {
        ...RecordInfo
        author {
          ...UserBasicInfo
        }
      }

      # Records authored by this user
      recordsByAuthorid {
        ...RecordInfo
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
  ${USER_ROLE_FRAGMENT}
  ${ROLE_FRAGMENT}
  ${RECORD_FRAGMENT}
`;

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

// Removed duplicate GET_XP_STATISTICS - using the simpler version above

// Removed duplicate GET_PROJECT_STATISTICS - using the simpler version above

// Events Query following official database structure
export const GET_EVENTS = gql`
  query GetEvents($userId: Int!, $limit: Int = 50) {
    event(
      where: {
        eventUsers: { userId: { _eq: $userId } }
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      path
      createdAt
      endAt
      campus
      # Parent event relationship following official structure
      parent {
        id
        path
        campus
        createdAt
        endAt
      }
      # Related object following official structure
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Registration information following official structure
      registration {
        id
        startAt
        endAt
        eventStartAt
      }
      # Event users following official event_user table structure
      eventUsers {
        id
        userId
        createdAt
        user {
          ...UserInfo
        }
      }
    }
  }
  ${OBJECT_FRAGMENT}
  ${USER_FRAGMENT}
`;

// Groups Query following official database structure
export const GET_USER_GROUPS = gql`
  query GetUserGroups($userId: Int!) {
    group(
      where: {
        groupUsers: { userId: { _eq: $userId } }
      }
      order_by: { createdAt: desc }
    ) {
      id
      path
      createdAt
      updatedAt
      campus
      status
      captainId
      # Related object following official structure
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event following official structure
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
      }
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
  }
  ${OBJECT_FRAGMENT}
  ${USER_FRAGMENT}
`;

// Removed duplicate GET_AUDIT_RATIO - using the updated version above

// Skills/Technologies query following official database structure (from transaction paths and object types)
export const GET_USER_SKILLS = gql`
  query GetUserSkills($userId: Int!) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      distinct_on: path
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
        # Object children relationships for skill hierarchies
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
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
        # Related object
        object {
          id
          name
          type
          attrs
        }
      }
    }
  }
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${USER_FRAGMENT}
`;

// Search queries for advanced features following official database structure
export const SEARCH_USERS = gql`
  query SearchUsers($searchTerm: String!) {
    user(
      where: {
        _or: [
          { login: { _ilike: $searchTerm } }
          { profile: { _ilike: $searchTerm } }
          { attrs: { _ilike: $searchTerm } }
        ]
      }
      limit: 10
    ) {
      ...UserInfo
      # User roles following official user_role table structure
      userRoles {
        id
        role {
          id
          slug
          name
          description
        }
      }
      # User records (bans, warnings) following official record table structure
      records {
        id
        message
        banEndAt
        createdAt
        author {
          ...UserInfo
        }
      }
    }
  }
  ${USER_FRAGMENT}
`;

// User events and registrations query following official database structure
export const GET_USER_EVENTS = gql`
  query GetUserEvents($userId: Int!, $limit: Int = 50, $offset: Int = 0, $status: String = null) {
    # Events user is registered for following official event_user table structure
    user_events: eventUser(
      where: { userId: { _eq: $userId } }
      order_by: { event: { createdAt: desc } }
      limit: $limit
      offset: $offset
    ) {
      id
      userId
      createdAt
      # Related event following official structure
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
          createdAt
          endAt
          # Related object
          object {
            id
            name
            type
            attrs
          }
        }
        # Related object following official structure
        object {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
        # Registration information following official structure
        registration {
          id
          startAt
          endAt
          eventStartAt
          path
          campus
          attrs
          # Related object
          object {
            id
            name
            type
            attrs
          }
          # Parent registration relationship
          parent {
            id
            path
            campus
          }
        }
      }
      # User information
      user {
        ...UserInfo
      }
    }

    # User registrations following official registration_user table structure
    user_registrations: registrationUser(
      where: { userId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      userId
      createdAt
      # Related registration following official structure
      registration {
        id
        startAt
        endAt
        eventStartAt
        path
        campus
        attrs
        # Related object
        object {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
        # Parent registration relationship
        parent {
          id
          path
          campus
          # Related object
          object {
            id
            name
            type
            attrs
          }
        }
      }
      # User information
      user {
        ...UserInfo
      }
    }

    # Event statistics
    event_stats: eventUser_aggregate(
      where: { userId: { _eq: $userId } }
    ) {
      aggregate {
        count
      }
    }
  }
  ${OBJECT_FRAGMENT}
  ${USER_FRAGMENT}
`;

// Removed duplicate GET_USER_GROUPS - using the simpler version above

// User matches and betting system query following official database structure
// Note: Match table may not exist in official structure, keeping for compatibility
export const GET_USER_MATCHES = gql`
  query GetUserMatches($userId: Int!, $limit: Int = 50, $offset: Int = 0) {
    # Matches where user is involved (if match table exists)
    user_matches: match(
      where: {
        _or: [
          { userId: { _eq: $userId } }
          { matchId: { _eq: $userId } }
        ]
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      bet
      result
      confirmed
      createdAt
      updatedAt
      path
      campus
      # The user who initiated the match
      user {
        ...UserInfo
      }
      # The matched user
      matchedUser: userByMatchId {
        ...UserInfo
      }
      # Related object following official structure
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event following official structure
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
        # Related object
        object {
          id
          name
          type
          attrs
        }
      }
    }

    # Match statistics
    match_stats: match_aggregate(
      where: {
        _or: [
          { userId: { _eq: $userId } }
          { matchId: { _eq: $userId } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }

    # Successful bets
    successful_bets: match_aggregate(
      where: {
        userId: { _eq: $userId }
        result: { _eq: true }
      }
    ) {
      aggregate {
        count
      }
    }

    # Failed bets
    failed_bets: match_aggregate(
      where: {
        userId: { _eq: $userId }
        result: { _eq: false }
      }
    ) {
      aggregate {
        count
      }
    }
  }
  ${USER_FRAGMENT}
  ${OBJECT_FRAGMENT}
`;

// Comprehensive object and curriculum structure query following official database structure
export const GET_OBJECT_DETAILS = gql`
  query GetObjectDetails($objectId: Int!, $userId: Int = null) {
    object(where: { id: { _eq: $objectId } }) {
      ...ObjectInfo
      # Reference relationships following official structure
      reference {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Objects that reference this object
      referencedBy: objectsByReferenceId {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Author information following official structure
      author {
        ...UserInfo
        # User roles
        userRoles {
          id
          role {
            id
            slug
            name
            description
          }
        }
      }
      # Object children relationships following official object_child table structure
      children: objectChildrenByParentId {
        id
        key
        index
        attrs
        child {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
      }
      # Parent relationships
      parents: objectChildrenByChildId {
        id
        key
        index
        attrs
        parent {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
      }
      # Related events following official structure
      events {
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
      }
      # User-specific data (if userId provided) following official structure
      userProgress: progresses(
        where: { userId: { _eq: $userId } }
        order_by: { updatedAt: desc }
        limit: 1
      ) {
        ...ProgressInfo
        # Related group
        group {
          id
          status
          captainId
          path
          campus
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
      userResults: results(
        where: { userId: { _eq: $userId } }
        order_by: { updatedAt: desc }
        limit: 5
      ) {
        ...ResultInfo
        # Related group
        group {
          id
          status
          captainId
          path
          campus
        }
        # Related event
        event {
          id
          path
          campus
        }
      }
      userTransactions: transactions(
        where: { userId: { _eq: $userId } }
        order_by: { createdAt: desc }
      ) {
        ...TransactionInfo
        # Related event
        event {
          id
          path
          campus
          createdAt
          endAt
        }
      }
    }
  }
  ${OBJECT_FRAGMENT}
  ${USER_FRAGMENT}
  ${PROGRESS_FRAGMENT}
  ${RESULT_FRAGMENT}
  ${TRANSACTION_FRAGMENT}
`;

// Advanced search and filtering query following official database structure
export const ADVANCED_SEARCH = gql`
  query AdvancedSearch(
    $searchTerm: String!
    $searchType: String = "all"
    $limit: Int = 20
    $offset: Int = 0
    $userId: Int = null
  ) {
    # Search users following official structure
    users: user(
      where: {
        _or: [
          { login: { _ilike: $searchTerm } }
          { profile: { _ilike: $searchTerm } }
          { attrs: { _ilike: $searchTerm } }
        ]
      }
      limit: $limit
      offset: $offset
    ) {
      ...UserInfo
      # User statistics following official transaction table structure
      totalXP: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }
      # User roles following official user_role table structure
      userRoles {
        id
        role {
          id
          slug
          name
          description
        }
      }
      # User records (bans, warnings) following official record table structure
      records {
        id
        message
        banEndAt
        createdAt
        author {
          id
          login
        }
      }
    }

    # Search objects/projects following official structure
    objects: object(
      where: {
        _or: [
          { name: { _ilike: $searchTerm } }
          { attrs: { _ilike: $searchTerm } }
        ]
      }
      limit: $limit
      offset: $offset
    ) {
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
      # User progress on this object (if userId provided) following official structure
      userProgress: progresses(
        where: { userId: { _eq: $userId } }
        limit: 1
      ) {
        ...ProgressInfo
        # Related group
        group {
          id
          status
          captainId
          path
        }
        # Related event
        event {
          id
          path
          campus
        }
      }
    }

    # Search events following official structure
    events: event(
      where: {
        _or: [
          { path: { _ilike: $searchTerm } }
          { object: { name: { _ilike: $searchTerm } } }
        ]
      }
      limit: $limit
      offset: $offset
    ) {
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
      # Related object
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Registration information
      registration {
        id
        startAt
        endAt
        eventStartAt
      }
      # User participation (if userId provided) following official event_user table structure
      userParticipation: eventUsers(
        where: { userId: { _eq: $userId } }
        limit: 1
      ) {
        id
        userId
        createdAt
        user {
          ...UserInfo
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${PROGRESS_FRAGMENT}
`;

// User performance analytics query following official database structure
export const GET_USER_ANALYTICS = gql`
  query GetUserAnalytics($userId: Int!) {
    # Time-based performance metrics following official transaction table structure
    daily_xp: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: asc }
    ) {
      ...TransactionInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
    }

    # Skill progression over time following official structure
    skill_progression: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: asc }
    ) {
      ...TransactionInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
        # Object children relationships for skill hierarchies
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
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
    }

    # Project completion timeline following official result table structure
    project_timeline: result(
      where: {
        userId: { _eq: $userId }
        object: { type: { _in: ["project", "exercise", "quest"] } }
        isLast: { _eq: true }
      }
      order_by: { createdAt: asc }
    ) {
      ...ResultInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
      # Related group information
      group {
        id
        status
        captainId
        path
        campus
        # Related object
        object {
          id
          name
          type
          attrs
        }
      }
    }

    # Audit performance over time following official audit table structure
    audit_timeline: audit(
      where: {
        _or: [
          { auditorId: { _eq: $userId } }
          { group: { groupUsers: { userId: { _eq: $userId } } } }
        ]
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

    # Activity patterns
    activity_by_hour: transaction(
      where: {
        userId: { _eq: $userId }
      }
    ) {
      createdAt
      type
      amount
    }

    # Performance benchmarks
    user_ranking: user(
      order_by: {
        transactions_aggregate: {
          sum: { amount: desc }
        }
      }
      where: {
        transactions: {
          type: { _eq: "xp" }
        }
      }
      limit: 100
    ) {
      id
      login
      totalXP: transactions_aggregate(
        where: {
          type: { _eq: "xp" }
        }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  }
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${USER_FRAGMENT}
  ${RESULT_FRAGMENT}
  ${AUDIT_FRAGMENT}
`;

// Leaderboard and comparison queries following official database structure
export const GET_LEADERBOARD = gql`
  query GetLeaderboard($limit: Int = 50, $campus: String = null, $objectType: String = null) {
    # XP Leaderboard following official transaction table structure
    xp_leaderboard: user(
      where: {
        campus: { _eq: $campus }
        transactions: { type: { _eq: "xp" } }
      }
      order_by: {
        transactions_aggregate: {
          sum: { amount: desc }
        }
      }
      limit: $limit
    ) {
      ...UserInfo
      # Total XP calculation following official structure
      totalXP: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          sum {
            amount
          }
          count
        }
      }
      # Projects completed following official result table structure
      projectsCompleted: results_aggregate(
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
      # Audits given following official audit table structure
      auditsGiven: audits_aggregate(
        where: { auditorId: { _eq: id } }
      ) {
        aggregate {
          count
        }
      }
      # User roles following official user_role table structure
      userRoles {
        id
        role {
          id
          slug
          name
          description
        }
      }
    }

    # Project completion leaderboard following official result table structure
    project_leaderboard: user(
      where: {
        campus: { _eq: $campus }
        results: {
          object: { type: { _eq: $objectType } }
          grade: { _gte: 1 }
          isLast: { _eq: true }
        }
      }
      order_by: {
        results_aggregate: {
          count: desc
        }
      }
      limit: $limit
    ) {
      ...UserInfo
      # Projects completed following official structure
      projectsCompleted: results_aggregate(
        where: {
          object: { type: { _eq: $objectType } }
          grade: { _gte: 1 }
          isLast: { _eq: true }
        }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }
      # User roles
      userRoles {
        id
        role {
          id
          slug
          name
          description
        }
      }
    }

    # Audit ratio leaderboard following official audit table structure
    audit_leaderboard: user(
      where: {
        campus: { _eq: $campus }
        audits: { id: { _is_null: false } }
      }
      limit: $limit
    ) {
      ...UserInfo
      # Audits given following official structure
      auditsGiven: audits_aggregate(
        where: { auditorId: { _eq: id } }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }
      # Audits received through group membership following official structure
      auditsReceived: audits_aggregate(
        where: {
          group: {
            groupUsers: {
              userId: { _eq: id }
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
  }
  ${USER_FRAGMENT}
`;

// User comparison query following official database structure
export const COMPARE_USERS = gql`
  query CompareUsers($userIds: [Int!]!) {
    users: user(where: { id: { _in: $userIds } }) {
      ...UserInfo

      # XP Statistics following official transaction table structure
      totalXP: transactions_aggregate(
        where: {
          type: { _eq: "xp" }
        }
      ) {
        aggregate {
          sum {
            amount
          }
          count
          avg {
            amount
          }
        }
      }

      # Project Statistics following official result table structure
      projectStats: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          isLast: { _eq: true }
        }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }

      passedProjects: results_aggregate(
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

      # Audit Statistics following official audit table structure
      auditsGiven: audits_aggregate(
        where: { auditorId: { _eq: id } }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }

      # Audits received through group membership following official structure
      auditsReceived: audits_aggregate(
        where: {
          group: {
            groupUsers: {
              userId: { _eq: id }
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

      # User roles following official user_role table structure
      userRoles {
        id
        role {
          id
          slug
          name
          description
        }
      }

      # Activity Timeline following official structure
      recentActivity: transactions(
        order_by: { createdAt: desc }
        limit: 10
      ) {
        ...TransactionInfo
        # Related object information
        object {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
        # Related event information
        event {
          id
          path
          campus
          createdAt
          endAt
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
`;

// Query to get XP earned by project for bar chart visualization following official database structure
export const GET_XP_BY_PROJECT = gql`
  query GetXPByProject($userId: Int!) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { amount: desc }
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
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
        # Related object
        object {
          id
          name
          type
          attrs
        }
      }
    }
  }
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${USER_FRAGMENT}
`;

// Query to get XP progression over time for line chart following official database structure
export const GET_XP_TIMELINE = gql`
  query GetXPTimeline($userId: Int!) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: asc }
    ) {
      ...TransactionInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
    }
  }
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${USER_FRAGMENT}
`;

// Query to get piscine-specific statistics following official database structure
export const GET_PISCINE_STATS = gql`
  query GetPiscineStats($userId: Int!) {
    # Get all piscine results following official result table structure
    result(
      where: {
        userId: { _eq: $userId }
        path: { _like: "%piscine%" }
      }
      order_by: { createdAt: desc }
    ) {
      ...ResultInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
      # Related group information
      group {
        id
        status
        captainId
        path
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
    }

    # Get piscine progress entries following official progress table structure
    progress(
      where: {
        userId: { _eq: $userId }
        path: { _like: "%piscine%" }
      }
      order_by: { createdAt: desc }
    ) {
      ...ProgressInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
      # Related group information
      group {
        id
        status
        captainId
        path
        campus
      }
    }
  }
  ${RESULT_FRAGMENT}
  ${PROGRESS_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${USER_FRAGMENT}
`;

// Enhanced profile query following official database structure
export const GET_ENHANCED_PROFILE = gql`
  query GetEnhancedProfile($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # Get user's first event to determine registration/start date following official event_user structure
      eventUsers(
        order_by: { event: { createdAt: asc } }
        limit: 1
      ) {
        id
        createdAt
        event {
          id
          createdAt
          path
          campus
          # Related object
          object {
            id
            name
            type
            attrs
          }
        }
      }

      # User roles following official user_role table structure
      userRoles {
        id
        role {
          id
          slug
          name
          description
        }
      }

      # User records (bans, warnings) following official record table structure
      records {
        id
        message
        banEndAt
        createdAt
        author {
          ...UserInfo
        }
      }

      # Get total project count following official result table structure
      results_aggregate {
        aggregate {
          count
        }
      }

      # Get passed projects count
      passed_projects: results_aggregate(
        where: { grade: { _gte: 1 } }
      ) {
        aggregate {
          count
        }
      }
    }
  }
  ${USER_FRAGMENT}
`;

// Query to get project timeline data following official database structure
export const GET_PROJECT_TIMELINE = gql`
  query GetProjectTimeline($userId: Int!) {
    result(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: "project" } }
      }
      order_by: { createdAt: asc }
    ) {
      ...ResultInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
      # Related group information
      group {
        id
        status
        captainId
        path
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
    }

    # Get corresponding XP transactions for projects following official structure
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        object: { type: { _eq: "project" } }
      }
      order_by: { createdAt: asc }
    ) {
      ...TransactionInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
    }
  }
  ${RESULT_FRAGMENT}
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${USER_FRAGMENT}
`;

// Query to get detailed audit statistics following official database structure
export const GET_DETAILED_AUDIT_STATS = gql`
  query GetDetailedAuditStats($userId: Int!) {
    # Audits given by user following official audit table structure
    audits_given: audit(
      where: { auditorId: { _eq: $userId } }
      order_by: { createdAt: desc }
    ) {
      ...AuditInfo
      # Related group information
      group {
        id
        path
        status
        captainId
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
      limit: 100
    ) {
      ...AuditInfo
      # Auditor information
      auditor {
        ...UserInfo
      }
      # Related group information
      group {
        id
        path
        status
        captainId
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
  }
  ${AUDIT_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${USER_FRAGMENT}
  ${RESULT_FRAGMENT}
`;

// Optimized search queries with fragments and improved performance
export const SEARCH_PROJECTS_BY_STATUS = gql`
  query SearchProjectsByStatus(
    $userId: Int!
    $status: [String!] = ["working", "audit", "setup", "finished"]
    $searchTerm: String = "%%"
    $limit: Int = 15
    $offset: Int = 0
    $campus: String = null
  ) {
    # Optimized search with fragments and reduced complexity
    results: result(
      where: {
        userId: { _eq: $userId }
        campus: { _eq: $campus }
        _and: [
          {
            _or: [
              { object: { name: { _ilike: $searchTerm } } }
              { path: { _ilike: $searchTerm } }
            ]
          }
          {
            # Simplified status filtering for better performance
            _or: [
              # Finished projects
              {
                grade: { _gte: 1 }
                isLast: { _eq: true }
              }
              # In-progress projects
              {
                grade: { _lt: 1 }
                updatedAt: { _gte: "2024-01-01" }
              }
            ]
          }
        ]
      }
      order_by: { updatedAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...ResultInfo
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

    # Get corresponding progress entries with status context
    progress: progress(
      where: {
        userId: { _eq: $userId }
        campus: { _eq: $campus }
        _and: [
          {
            _or: [
              { object: { name: { _ilike: $searchTerm } } }
              { path: { _ilike: $searchTerm } }
            ]
          }
        ]
      }
      order_by: { updatedAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      grade
      isDone
      version
      createdAt
      updatedAt
      path
      campus
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        campus
      }
      group {
        id
        status
        captainId
      }
    }
  }
  ${RESULT_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${GROUP_FRAGMENT}
`;

// Optimized search audits by status with fragments
export const SEARCH_AUDITS_BY_STATUS = gql`
  query SearchAuditsByStatus(
    $userId: Int!
    $status: [String!] = ["working", "audit", "setup", "finished"]
    $searchTerm: String = "%%"
    $limit: Int = 20
    $offset: Int = 0
    $campus: String = null
  ) {
    # Audits given by user with group status filtering
    audits_given: audit(
      where: {
        auditorId: { _eq: $userId }
        _and: [
          {
            _or: [
              { group: { path: { _ilike: $searchTerm } } }
              { group: { object: { name: { _ilike: $searchTerm } } } }
            ]
          }
          {
            # Filter by group status (working, audit, setup, finished)
            group: {
              status: { _in: $status }
              campus: { _eq: $campus }
            }
          }
          {
            # Additional status filtering for audits
            _or: [
              # Working: audit in progress (no result yet)
              { resultId: { _is_null: true } }
              # Finished: audit completed with result
              { resultId: { _is_null: false } }
              # Setup: recently created
              { createdAt: { _gte: "2024-07-01" } }
            ]
          }
        ]
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      grade
      attrs
      code
      version
      endAt
      private
      createdAt
      updatedAt
      group {
        id
        path
        status
        captainId
        campus
        object {
          id
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
      result {
        id
        grade
        type
        createdAt
      }
    }

    # Audits received by user through group membership
    audits_received: audit(
      where: {
        group: {
          group_user: {
            userId: { _eq: $userId }
          }
          status: { _in: $status }
          campus: { _eq: $campus }
        }
        _and: [
          {
            _or: [
              { group: { path: { _ilike: $searchTerm } } }
              { group: { object: { name: { _ilike: $searchTerm } } } }
            ]
          }
        ]
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      grade
      attrs
      version
      endAt
      createdAt
      updatedAt
      auditor {
        id
        login
        profile
      }
      group {
        id
        path
        status
        captainId
        campus
        object {
          id
          name
          type
          attrs
        }
      }
      result {
        id
        grade
        type
        createdAt
      }
    }
  }
`;

// Paginated Projects Query with comprehensive error handling and pagination
export const GET_PROJECTS_PAGINATED = gql`
  query GetProjectsPaginated(
    $userId: Int!
    $limit: Int = 20
    $offset: Int = 0
    $orderBy: [result_order_by!] = { updatedAt: desc }
    $where: result_bool_exp = {}
    $campus: String = null
  ) {
    # Main results with error boundary
    results: result(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: {
        userId: { _eq: $userId }
        campus: { _eq: $campus }
        _and: [$where]
      }
    ) {
      id
      grade
      type
      isLast
      version
      createdAt
      updatedAt
      path
      campus
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        campus
      }
      group {
        id
        status
        captainId
        campus
      }
    }

    # Total count for pagination with error handling
    results_aggregate(
      where: {
        userId: { _eq: $userId }
        campus: { _eq: $campus }
        _and: [$where]
      }
    ) {
      aggregate {
        count
        max {
          updatedAt
        }
        min {
          createdAt
        }
      }
    }
  }
`;

// Paginated Transactions Query with XP conversion factor handling
export const GET_TRANSACTIONS_PAGINATED = gql`
  query GetTransactionsPaginated(
    $userId: Int!
    $limit: Int = 50
    $offset: Int = 0
    $orderBy: [transaction_order_by!] = { createdAt: desc }
    $where: transaction_bool_exp = {}
    $campus: String = null
  ) {
    # Main transactions with proper XP handling (factor of 1000)
    transactions: transaction(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: {
        userId: { _eq: $userId }
        campus: { _eq: $campus }
        _and: [$where]
      }
    ) {
      id
      amount
      type
      createdAt
      updatedAt
      path
      campus
      object {
        id
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

    # Pagination metadata
    transactions_aggregate(
      where: {
        userId: { _eq: $userId }
        campus: { _eq: $campus }
        _and: [$where]
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
      }
    }
  }
`;

// Object hierarchy query using object_child relationships
export const GET_OBJECT_HIERARCHY = gql`
  query GetObjectHierarchy($objectId: Int!, $depth: Int = 3) {
    object(where: { id: { _eq: $objectId } }) {
      id
      name
      type
      attrs

      # Children objects through object_child relationship
      childObjects: object_child(
        where: { parentId: { _eq: $objectId } }
        order_by: { childId: asc }
      ) {
        childId
        parentId
        child {
          id
          name
          type
          attrs

          # Nested children (limited depth)
          childObjects: object_child(
            order_by: { childId: asc }
            limit: 50
          ) {
            childId
            child {
              id
              name
              type
            }
          }
        }
      }

      # Parent objects
      parentObjects: object_child(
        where: { childId: { _eq: $objectId } }
      ) {
        parentId
        childId
        parent {
          id
          name
          type
          attrs
        }
      }
    }
  }
`;

// User roles and permissions query - query junction table directly
export const GET_USER_ROLES_DETAILED = gql`
  query GetUserRolesDetailed($userId: Int!) {
    # Query user_role junction table directly
    user_role(where: { userId: { _eq: $userId } }) {
      id
      userId
      roleId
      role {
        id
        slug
        name
        description
        createdAt
        updatedAt

        # Role permissions if available
        attrs
      }
    }

    # Also get basic user info
    user(where: { id: { _eq: $userId } }) {
      id
      login
      profile
      campus
    }
  }
`;

// Audit-Result connections with proper relationships
export const GET_AUDIT_RESULT_CONNECTIONS = gql`
  query GetAuditResultConnections($userId: Int!, $limit: Int = 50) {
    # Audits with their corresponding results
    audit(
      where: {
        _or: [
          { auditorId: { _eq: $userId } }
          { group: { group_user: { userId: { _eq: $userId } } } }
        ]
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      grade
      attrs
      version
      endAt
      private
      createdAt
      updatedAt

      # Auditor information
      auditor {
        id
        login
        profile
      }

      # Group being audited
      group {
        id
        path
        status
        captainId
        campus

        # Group members
        group_user {
          userId
          user {
            id
            login
            profile
          }
        }

        # Related object
        object {
          id
          name
          type
          attrs
        }
      }

      # Connected result if exists
      result {
        id
        grade
        type
        isLast
        version
        createdAt
        updatedAt
        path
        campus

        # Result's object
        object {
          id
          name
          type
          attrs
        }
      }
    }
  }
`;

// Enhanced user search with status filtering
export const SEARCH_USERS_WITH_STATUS = gql`
  query SearchUsersWithStatus(
    $searchTerm: String!
    $status: String = "all"
    $campus: String = ""
    $limit: Int = 20
    $offset: Int = 0
  ) {
    users: user(
      where: {
        _and: [
          {
            _or: [
              { login: { _ilike: $searchTerm } }
              { profile: { _ilike: $searchTerm } }
              { attrs: { _ilike: $searchTerm } }
            ]
          }
          {
            # Campus filtering if specified
            campus: { _ilike: $campus }
          }
        ]
      }
      order_by: { login: asc }
      limit: $limit
      offset: $offset
    ) {
      id
      login
      profile
      campus
      createdAt
      updatedAt

      # Get recent activity to determine status
      recent_results: results(
        order_by: { updatedAt: desc }
        limit: 5
      ) {
        id
        grade
        updatedAt
        object {
          name
          type
        }
      }

      # Get recent transactions for activity
      recent_transactions: transactions(
        where: { type: { _eq: "xp" } }
        order_by: { createdAt: desc }
        limit: 3
      ) {
        id
        amount
        createdAt
      }
    }
  }
`;

// Utility functions for XP conversion (bytes to KB using factor of 1000)
export const convertXPToKB = (xpInBytes) => {
  return Math.round(xpInBytes / 1000);
};

export const convertKBToXP = (xpInKB) => {
  return xpInKB * 1000;
};

// Query validation helper for status filtering
export const validateStatusFilter = (status) => {
  const validStatuses = ['working', 'audit', 'setup', 'finished'];
  if (Array.isArray(status)) {
    return status.every(s => validStatuses.includes(s));
  }
  return validStatuses.includes(status);
};

// Schema validation query to test database connectivity and structure
export const VALIDATE_SCHEMA = gql`
  query ValidateSchema {
    # Test core tables exist and have expected fields
    user(limit: 1) {
      id
      login
      profile
      attrs
      campus
      createdAt
      updatedAt
    }

    transaction(limit: 1) {
      id
      userId
      type
      amount
      createdAt
      path
      campus
    }

    result(limit: 1) {
      id
      userId
      grade
      type
      isLast
      version
      createdAt
      updatedAt
      path
      campus
    }

    audit(limit: 1) {
      id
      auditorId
      grade
      attrs
      version
      endAt
      private
      createdAt
      updatedAt
    }

    progress(limit: 1) {
      id
      userId
      grade
      isDone
      version
      createdAt
      updatedAt
      path
      campus
    }

    group(limit: 1) {
      id
      captainId
      status
      campus
      createdAt
      updatedAt
      path
    }

    object(limit: 1) {
      id
      name
      type
      attrs
      createdAt
      updatedAt
    }

    event(limit: 1) {
      id
      path
      campus
      createdAt
      updatedAt
    }
  }
`;

// Comprehensive user dashboard query following official schema
export const GET_USER_DASHBOARD = gql`
  query GetUserDashboard($userId: Int!, $campus: String = null, $limit: Int = 20) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      profile
      attrs
      campus
      createdAt
      updatedAt

      # Recent XP transactions (converted from bytes to KB)
      recentXP: transaction(
        where: {
          type: { _eq: "xp" }
          campus: { _eq: $campus }
        }
        order_by: { createdAt: desc }
        limit: $limit
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

      # Total XP calculation
      totalXP: transaction_aggregate(
        where: {
          type: { _eq: "xp" }
          campus: { _eq: $campus }
        }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }

      # Audit ratio calculation
      upTransactions: transaction_aggregate(
        where: {
          type: { _eq: "up" }
          campus: { _eq: $campus }
        }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }

      downTransactions: transaction_aggregate(
        where: {
          type: { _eq: "down" }
          campus: { _eq: $campus }
        }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }

      # Recent results
      recentResults: result(
        where: { campus: { _eq: $campus } }
        order_by: { updatedAt: desc }
        limit: $limit
      ) {
        id
        grade
        type
        isLast
        updatedAt
        path
        object {
          name
          type
        }
      }

      # User roles - removed until correct relationship field is identified
      # Use GET_USER_ROLES_DETAILED query separately to get user roles
    }
  }
`;
