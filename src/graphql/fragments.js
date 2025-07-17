import { gql } from '@apollo/client';

// ============================================================================
// CORE FRAGMENTS
// ============================================================================

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

// ============================================================================
// USER FRAGMENTS
// ============================================================================

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

// ============================================================================
// CORE ENTITY FRAGMENTS
// ============================================================================

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

// ============================================================================
// EVENT AND GROUP FRAGMENTS
// ============================================================================

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

// ============================================================================
// REGISTRATION AND ROLE FRAGMENTS
// ============================================================================

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

// ============================================================================
// SPECIALIZED FRAGMENTS
// ============================================================================

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
