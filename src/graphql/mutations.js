import { gql } from '@apollo/client';
import {
  USER_FRAGMENT,
  USER_BASIC_FRAGMENT,
  GROUP_FRAGMENT,
  GROUP_USER_FRAGMENT,
  MATCH_FRAGMENT,
  REGISTRATION_USER_FRAGMENT,
  RESULT_FRAGMENT,
  TOAD_SESSION_FRAGMENT,
} from './fragments.js';

// ============================================================================
// USER MUTATIONS
// ============================================================================

// Update user profile information
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $userId: Int!
    $firstName: String
    $lastName: String
    $email: String
    $profile: jsonb
    $attrs: jsonb
  ) {
    update_user_by_pk(
      pk_columns: { id: $userId }
      _set: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        profile: $profile
        attrs: $attrs
        updatedAt: "now()"
      }
    ) {
      ...UserInfo
    }
  }
  ${USER_FRAGMENT}
`;

// Update user attributes (JSON field)
export const UPDATE_USER_ATTRS = gql`
  mutation UpdateUserAttrs($userId: Int!, $attrs: jsonb!) {
    update_user_by_pk(
      pk_columns: { id: $userId }
      _set: {
        attrs: $attrs
        updatedAt: "now()"
      }
    ) {
      id
      login
      attrs
      updatedAt
    }
  }
`;

// Update user profile (JSON field)
export const UPDATE_USER_PROFILE_DATA = gql`
  mutation UpdateUserProfileData($userId: Int!, $profile: jsonb!) {
    update_user_by_pk(
      pk_columns: { id: $userId }
      _set: {
        profile: $profile
        updatedAt: "now()"
      }
    ) {
      id
      login
      profile
      updatedAt
    }
  }
`;

// ============================================================================
// GROUP MUTATIONS
// ============================================================================

// Create a new group
export const CREATE_GROUP = gql`
  mutation CreateGroup(
    $captainId: Int!
    $path: String!
    $campus: String!
    $status: group_status_enum = "forming"
  ) {
    insert_group_one(
      object: {
        captainId: $captainId
        path: $path
        campus: $campus
        status: $status
        createdAt: "now()"
        updatedAt: "now()"
      }
    ) {
      ...GroupInfo
      captain {
        ...UserBasicInfo
      }
    }
  }
  ${GROUP_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
`;

// Update group status
export const UPDATE_GROUP_STATUS = gql`
  mutation UpdateGroupStatus($groupId: Int!, $status: group_status_enum!) {
    update_group_by_pk(
      pk_columns: { id: $groupId }
      _set: {
        status: $status
        updatedAt: "now()"
      }
    ) {
      ...GroupInfo
    }
  }
  ${GROUP_FRAGMENT}
`;

// Add user to group
export const ADD_USER_TO_GROUP = gql`
  mutation AddUserToGroup($userId: Int!, $groupId: Int!, $confirmed: Boolean = false) {
    insert_group_user_one(
      object: {
        userId: $userId
        groupId: $groupId
        confirmed: $confirmed
        createdAt: "now()"
        updatedAt: "now()"
      }
      on_conflict: {
        constraint: group_user_pkey
        update_columns: [confirmed, updatedAt]
      }
    ) {
      ...GroupUserInfo
      user {
        ...UserBasicInfo
      }
      group {
        ...GroupInfo
      }
    }
  }
  ${GROUP_USER_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${GROUP_FRAGMENT}
`;

// Remove user from group
export const REMOVE_USER_FROM_GROUP = gql`
  mutation RemoveUserFromGroup($userId: Int!, $groupId: Int!) {
    delete_group_user(
      where: {
        userId: { _eq: $userId }
        groupId: { _eq: $groupId }
      }
    ) {
      affected_rows
      returning {
        id
        userId
        groupId
      }
    }
  }
`;

// Confirm group membership
export const CONFIRM_GROUP_MEMBERSHIP = gql`
  mutation ConfirmGroupMembership($userId: Int!, $groupId: Int!) {
    update_group_user(
      where: {
        userId: { _eq: $userId }
        groupId: { _eq: $groupId }
      }
      _set: {
        confirmed: true
        updatedAt: "now()"
      }
    ) {
      affected_rows
      returning {
        ...GroupUserInfo
        user {
          ...UserBasicInfo
        }
        group {
          ...GroupInfo
        }
      }
    }
  }
  ${GROUP_USER_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${GROUP_FRAGMENT}
`;

// ============================================================================
// MATCH MUTATIONS (BETTING SYSTEM)
// ============================================================================

// Create a new match/bet
export const CREATE_MATCH = gql`
  mutation CreateMatch(
    $userId: Int!
    $matchId: Int!
    $bet: Float!
    $path: String!
    $campus: String!
    $objectId: Int
  ) {
    insert_match_one(
      object: {
        userId: $userId
        matchId: $matchId
        bet: $bet
        path: $path
        campus: $campus
        objectId: $objectId
        confirmed: false
        createdAt: "now()"
        updatedAt: "now()"
      }
    ) {
      ...MatchInfo
      user {
        ...UserBasicInfo
      }
      matchedUser: userByMatchId {
        ...UserBasicInfo
      }
      object {
        id
        name
        type
      }
    }
  }
  ${MATCH_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
`;

// Update match result
export const UPDATE_MATCH_RESULT = gql`
  mutation UpdateMatchResult($matchId: Int!, $result: Float!, $confirmed: Boolean = true) {
    update_match_by_pk(
      pk_columns: { id: $matchId }
      _set: {
        result: $result
        confirmed: $confirmed
        updatedAt: "now()"
      }
    ) {
      ...MatchInfo
    }
  }
  ${MATCH_FRAGMENT}
`;

// Confirm match
export const CONFIRM_MATCH = gql`
  mutation ConfirmMatch($matchId: Int!) {
    update_match_by_pk(
      pk_columns: { id: $matchId }
      _set: {
        confirmed: true
        updatedAt: "now()"
      }
    ) {
      ...MatchInfo
    }
  }
  ${MATCH_FRAGMENT}
`;

// ============================================================================
// REGISTRATION MUTATIONS
// ============================================================================

// Register user for event
export const REGISTER_USER_FOR_EVENT = gql`
  mutation RegisterUserForEvent($userId: Int!, $registrationId: Int!) {
    insert_registration_user_one(
      object: {
        userId: $userId
        registrationId: $registrationId
        createdAt: "now()"
      }
      on_conflict: {
        constraint: registration_user_pkey
        update_columns: []
      }
    ) {
      ...RegistrationUserInfo
      user {
        ...UserBasicInfo
      }
      registration {
        id
        path
        campus
        startAt
        endAt
        eventStartAt
      }
    }
  }
  ${REGISTRATION_USER_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
`;

// Unregister user from event
export const UNREGISTER_USER_FROM_EVENT = gql`
  mutation UnregisterUserFromEvent($userId: Int!, $registrationId: Int!) {
    delete_registration_user(
      where: {
        userId: { _eq: $userId }
        registrationId: { _eq: $registrationId }
      }
    ) {
      affected_rows
      returning {
        id
        userId
        registrationId
      }
    }
  }
`;

// ============================================================================
// RESULT MUTATIONS
// ============================================================================

// Update result grade (for corrections or updates)
export const UPDATE_RESULT_GRADE = gql`
  mutation UpdateResultGrade($resultId: Int!, $grade: Float!, $attrs: jsonb) {
    update_result_by_pk(
      pk_columns: { id: $resultId }
      _set: {
        grade: $grade
        attrs: $attrs
        updatedAt: "now()"
      }
    ) {
      ...ResultInfo
      object {
        id
        name
        type
      }
      user {
        ...UserBasicInfo
      }
    }
  }
  ${RESULT_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
`;

// Update result attributes
export const UPDATE_RESULT_ATTRS = gql`
  mutation UpdateResultAttrs($resultId: Int!, $attrs: jsonb!) {
    update_result_by_pk(
      pk_columns: { id: $resultId }
      _set: {
        attrs: $attrs
        updatedAt: "now()"
      }
    ) {
      id
      grade
      attrs
      updatedAt
    }
  }
`;

// ============================================================================
// TOAD SESSION MUTATIONS
// ============================================================================

// Create new TOAD session
export const CREATE_TOAD_SESSION = gql`
  mutation CreateToadSession(
    $userId: Int!
    $sessionData: jsonb!
    $expiresAt: timestamptz
  ) {
    insert_toad_sessions_one(
      object: {
        userId: $userId
        sessionData: $sessionData
        expiresAt: $expiresAt
        createdAt: "now()"
        updatedAt: "now()"
      }
    ) {
      ...ToadSessionInfo
    }
  }
  ${TOAD_SESSION_FRAGMENT}
`;

// Update TOAD session data
export const UPDATE_TOAD_SESSION = gql`
  mutation UpdateToadSession($sessionId: Int!, $sessionData: jsonb!) {
    update_toad_sessions_by_pk(
      pk_columns: { id: $sessionId }
      _set: {
        sessionData: $sessionData
        updatedAt: "now()"
      }
    ) {
      ...ToadSessionInfo
    }
  }
  ${TOAD_SESSION_FRAGMENT}
`;

// Delete expired TOAD sessions
export const DELETE_EXPIRED_TOAD_SESSIONS = gql`
  mutation DeleteExpiredToadSessions($userId: Int!) {
    delete_toad_sessions(
      where: {
        userId: { _eq: $userId }
        expiresAt: { _lt: "now()" }
      }
    ) {
      affected_rows
    }
  }
`;

// ============================================================================
// BATCH MUTATIONS
// ============================================================================

// Batch update multiple user attributes
export const BATCH_UPDATE_USER_ATTRS = gql`
  mutation BatchUpdateUserAttrs($updates: [user_updates!]!) {
    update_user_many(updates: $updates) {
      affected_rows
      returning {
        id
        login
        attrs
        updatedAt
      }
    }
  }
`;

// Batch create group users
export const BATCH_ADD_USERS_TO_GROUP = gql`
  mutation BatchAddUsersToGroup($groupUsers: [group_user_insert_input!]!) {
    insert_group_user(
      objects: $groupUsers
      on_conflict: {
        constraint: group_user_pkey
        update_columns: [confirmed, updatedAt]
      }
    ) {
      affected_rows
      returning {
        ...GroupUserInfo
        user {
          ...UserBasicInfo
        }
      }
    }
  }
  ${GROUP_USER_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
`;

// ============================================================================
// ADVANCED MUTATIONS
// ============================================================================

// Upsert user profile (insert or update)
export const UPSERT_USER_PROFILE = gql`
  mutation UpsertUserProfile(
    $userId: Int!
    $login: String!
    $firstName: String
    $lastName: String
    $email: String
    $campus: String!
    $profile: jsonb
    $attrs: jsonb
  ) {
    insert_user_one(
      object: {
        id: $userId
        login: $login
        firstName: $firstName
        lastName: $lastName
        email: $email
        campus: $campus
        profile: $profile
        attrs: $attrs
        createdAt: "now()"
        updatedAt: "now()"
      }
      on_conflict: {
        constraint: user_pkey
        update_columns: [firstName, lastName, email, profile, attrs, updatedAt]
      }
    ) {
      ...UserInfo
    }
  }
  ${USER_FRAGMENT}
`;

// Bulk update group statuses
export const BULK_UPDATE_GROUP_STATUS = gql`
  mutation BulkUpdateGroupStatus($groupIds: [Int!]!, $status: group_status_enum!) {
    update_group(
      where: { id: { _in: $groupIds } }
      _set: {
        status: $status
        updatedAt: "now()"
      }
    ) {
      affected_rows
      returning {
        ...GroupInfo
      }
    }
  }
  ${GROUP_FRAGMENT}
`;

// Clean up expired sessions and matches
export const CLEANUP_EXPIRED_DATA = gql`
  mutation CleanupExpiredData($userId: Int!) {
    # Delete expired TOAD sessions
    delete_expired_sessions: delete_toad_sessions(
      where: {
        userId: { _eq: $userId }
        expiresAt: { _lt: "now()" }
      }
    ) {
      affected_rows
    }

    # Update unconfirmed matches older than 24 hours
    update_old_matches: update_match(
      where: {
        userId: { _eq: $userId }
        confirmed: { _eq: false }
        createdAt: { _lt: "now() - interval '24 hours'" }
      }
      _set: {
        confirmed: true
        updatedAt: "now()"
      }
    ) {
      affected_rows
    }
  }
`;

// Transfer group captaincy
export const TRANSFER_GROUP_CAPTAINCY = gql`
  mutation TransferGroupCaptaincy($groupId: Int!, $newCaptainId: Int!) {
    update_group_by_pk(
      pk_columns: { id: $groupId }
      _set: {
        captainId: $newCaptainId
        updatedAt: "now()"
      }
    ) {
      ...GroupInfo
      captain {
        ...UserBasicInfo
      }
      groupUsers {
        ...GroupUserInfo
        user {
          ...UserBasicInfo
        }
      }
    }
  }
  ${GROUP_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${GROUP_USER_FRAGMENT}
`;
