import { gql } from '@apollo/client';
import {
  USER_FRAGMENT,
  USER_BASIC_FRAGMENT,
  TRANSACTION_FRAGMENT,
  RESULT_FRAGMENT,
  AUDIT_FRAGMENT,
  PROGRESS_FRAGMENT,
  GROUP_FRAGMENT,
  GROUP_USER_FRAGMENT,
  MATCH_FRAGMENT,
  OBJECT_FRAGMENT,
  EVENT_FRAGMENT,
  TOAD_SESSION_FRAGMENT,
} from './fragments.js';

// ============================================================================
// USER SUBSCRIPTIONS
// ============================================================================

// Subscribe to user profile changes
export const SUBSCRIBE_USER_PROFILE = gql`
  subscription SubscribeUserProfile($userId: Int!) {
    user_by_pk(id: $userId) {
      ...UserInfo
    }
  }
  ${USER_FRAGMENT}
`;

// Subscribe to user transaction updates
export const SUBSCRIBE_USER_TRANSACTIONS = gql`
  subscription SubscribeUserTransactions(
    $userId: Int!
    $transactionTypes: [String!] = ["xp", "up", "down"]
    $limit: Int = 50
  ) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _in: $transactionTypes }
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      ...TransactionInfo
      object {
        ...ObjectInfo
      }
      event {
        ...EventInfo
      }
    }
  }
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
`;

// Subscribe to new XP transactions only
export const SUBSCRIBE_NEW_XP_TRANSACTIONS = gql`
  subscription SubscribeNewXPTransactions($userId: Int!, $since: timestamptz!) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        createdAt: { _gt: $since }
      }
      order_by: { createdAt: desc }
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
  }
  ${TRANSACTION_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${EVENT_FRAGMENT}
`;

// ============================================================================
// PROGRESS AND RESULT SUBSCRIPTIONS
// ============================================================================

// Subscribe to user progress updates
export const SUBSCRIBE_USER_PROGRESS = gql`
  subscription SubscribeUserProgress($userId: Int!) {
    progress(
      where: { userId: { _eq: $userId } }
      order_by: { updatedAt: desc }
      limit: 20
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
  }
  ${PROGRESS_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${GROUP_FRAGMENT}
`;

// Subscribe to new results
export const SUBSCRIBE_USER_RESULTS = gql`
  subscription SubscribeUserResults($userId: Int!) {
    result(
      where: { userId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: 10
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
        captain {
          ...UserBasicInfo
        }
      }
    }
  }
  ${RESULT_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${GROUP_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
`;

// Subscribe to project results specifically
export const SUBSCRIBE_PROJECT_RESULTS = gql`
  subscription SubscribeProjectResults($userId: Int!) {
    result(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: "project" } }
        isLast: { _eq: true }
      }
      order_by: { createdAt: desc }
      limit: 5
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
        groupUsers {
          ...GroupUserInfo
          user {
            ...UserBasicInfo
          }
        }
      }
    }
  }
  ${RESULT_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${GROUP_FRAGMENT}
  ${GROUP_USER_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
`;

// ============================================================================
// AUDIT SUBSCRIPTIONS
// ============================================================================

// Subscribe to audits given by user
export const SUBSCRIBE_AUDITS_GIVEN = gql`
  subscription SubscribeAuditsGiven($userId: Int!) {
    audit(
      where: { auditorId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: 10
    ) {
      ...AuditInfo
      group {
        ...GroupInfo
        object {
          ...ObjectInfo
        }
        groupUsers {
          ...GroupUserInfo
          user {
            ...UserBasicInfo
          }
        }
      }
      result {
        ...ResultInfo
      }
    }
  }
  ${AUDIT_FRAGMENT}
  ${GROUP_FRAGMENT}
  ${GROUP_USER_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${RESULT_FRAGMENT}
`;

// Subscribe to audits received by user (through group membership)
export const SUBSCRIBE_AUDITS_RECEIVED = gql`
  subscription SubscribeAuditsReceived($userId: Int!) {
    audit(
      where: {
        group: {
          groupUsers: {
            userId: { _eq: $userId }
          }
        }
      }
      order_by: { createdAt: desc }
      limit: 10
    ) {
      ...AuditInfo
      auditor {
        ...UserBasicInfo
      }
      group {
        ...GroupInfo
        object {
          ...ObjectInfo
        }
      }
      result {
        ...ResultInfo
      }
    }
  }
  ${AUDIT_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${GROUP_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${RESULT_FRAGMENT}
`;

// ============================================================================
// GROUP SUBSCRIPTIONS
// ============================================================================

// Subscribe to group updates
export const SUBSCRIBE_GROUP_UPDATES = gql`
  subscription SubscribeGroupUpdates($groupId: Int!) {
    group_by_pk(id: $groupId) {
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
      object {
        ...ObjectInfo
      }
      event {
        ...EventInfo
      }
    }
  }
  ${GROUP_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${GROUP_USER_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
`;

// Subscribe to user's group memberships
export const SUBSCRIBE_USER_GROUPS = gql`
  subscription SubscribeUserGroups($userId: Int!) {
    group_user(
      where: { userId: { _eq: $userId } }
      order_by: { createdAt: desc }
    ) {
      ...GroupUserInfo
      group {
        ...GroupInfo
        captain {
          ...UserBasicInfo
        }
        object {
          ...ObjectInfo
        }
        # Other group members
        groupUsers(where: { userId: { _neq: $userId } }) {
          ...GroupUserInfo
          user {
            ...UserBasicInfo
          }
        }
      }
    }
  }
  ${GROUP_USER_FRAGMENT}
  ${GROUP_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${OBJECT_FRAGMENT}
`;

// Subscribe to group formation (new groups being created)
export const SUBSCRIBE_GROUP_FORMATION = gql`
  subscription SubscribeGroupFormation($campus: String!, $pathPattern: String = "%") {
    group(
      where: {
        campus: { _eq: $campus }
        path: { _like: $pathPattern }
        status: { _eq: "forming" }
      }
      order_by: { createdAt: desc }
      limit: 20
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
      object {
        ...ObjectInfo
      }
    }
  }
  ${GROUP_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${GROUP_USER_FRAGMENT}
  ${OBJECT_FRAGMENT}
`;

// ============================================================================
// MATCH SUBSCRIPTIONS (BETTING SYSTEM)
// ============================================================================

// Subscribe to user matches
export const SUBSCRIBE_USER_MATCHES = gql`
  subscription SubscribeUserMatches($userId: Int!) {
    match(
      where: {
        _or: [
          { userId: { _eq: $userId } }
          { matchId: { _eq: $userId } }
        ]
      }
      order_by: { createdAt: desc }
      limit: 10
    ) {
      ...MatchInfo
      user {
        ...UserBasicInfo
      }
      matchedUser: userByMatchId {
        ...UserBasicInfo
      }
      object {
        ...ObjectInfo
      }
    }
  }
  ${MATCH_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${OBJECT_FRAGMENT}
`;

// Subscribe to new match opportunities
export const SUBSCRIBE_MATCH_OPPORTUNITIES = gql`
  subscription SubscribeMatchOpportunities($campus: String!, $pathPattern: String = "%") {
    match(
      where: {
        campus: { _eq: $campus }
        path: { _like: $pathPattern }
        confirmed: { _eq: false }
      }
      order_by: { createdAt: desc }
      limit: 20
    ) {
      ...MatchInfo
      user {
        ...UserBasicInfo
      }
      object {
        ...ObjectInfo
      }
    }
  }
  ${MATCH_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${OBJECT_FRAGMENT}
`;

// ============================================================================
// TOAD SESSION SUBSCRIPTIONS
// ============================================================================

// Subscribe to user's TOAD sessions
export const SUBSCRIBE_USER_TOAD_SESSIONS = gql`
  subscription SubscribeUserToadSessions($userId: Int!) {
    toad_sessions(
      where: { userId: { _eq: $userId } }
      order_by: { updatedAt: desc }
      limit: 5
    ) {
      ...ToadSessionInfo
    }
  }
  ${TOAD_SESSION_FRAGMENT}
`;

// ============================================================================
// CAMPUS-WIDE SUBSCRIPTIONS
// ============================================================================

// Subscribe to campus activity feed
export const SUBSCRIBE_CAMPUS_ACTIVITY = gql`
  subscription SubscribeCampusActivity($campus: String!, $limit: Int = 50) {
    transaction(
      where: { campus: { _eq: $campus } }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      ...TransactionInfo
      user {
        ...UserBasicInfo
      }
      object {
        ...ObjectInfo
      }
      event {
        ...EventInfo
      }
    }
  }
  ${TRANSACTION_FRAGMENT}
  ${USER_BASIC_FRAGMENT}
  ${OBJECT_FRAGMENT}
  ${EVENT_FRAGMENT}
`;

// Subscribe to leaderboard changes (top XP earners)
export const SUBSCRIBE_XP_LEADERBOARD = gql`
  subscription SubscribeXPLeaderboard($campus: String!, $limit: Int = 10) {
    user(
      where: { campus: { _eq: $campus } }
      order_by: { totalUp: desc }
      limit: $limit
    ) {
      ...UserBasicInfo
      totalUp
      totalDown
      auditRatio
      # Recent XP for activity indicator
      recentXP: transactions_aggregate(
        where: {
          type: { _eq: "xp" }
          createdAt: { _gte: "now() - interval '7 days'" }
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
  ${USER_BASIC_FRAGMENT}
`;

// ============================================================================
// NOTIFICATION SUBSCRIPTIONS
// ============================================================================

// Subscribe to user notifications (based on various events)
export const SUBSCRIBE_USER_NOTIFICATIONS = gql`
  subscription SubscribeUserNotifications($userId: Int!) {
    # New audits received
    new_audits: audit(
      where: {
        group: {
          groupUsers: {
            userId: { _eq: $userId }
          }
        }
        createdAt: { _gte: "now() - interval '1 hour'" }
      }
      order_by: { createdAt: desc }
      limit: 5
    ) {
      id
      grade
      createdAt
      auditor {
        ...UserBasicInfo
      }
      group {
        id
        path
        object {
          name
        }
      }
    }

    # New group invitations
    new_group_invitations: group_user(
      where: {
        userId: { _eq: $userId }
        confirmed: { _eq: false }
        createdAt: { _gte: "now() - interval '1 hour'" }
      }
      order_by: { createdAt: desc }
      limit: 5
    ) {
      id
      createdAt
      group {
        id
        path
        captain {
          ...UserBasicInfo
        }
        object {
          name
        }
      }
    }

    # New match challenges
    new_matches: match(
      where: {
        matchId: { _eq: $userId }
        confirmed: { _eq: false }
        createdAt: { _gte: "now() - interval '1 hour'" }
      }
      order_by: { createdAt: desc }
      limit: 5
    ) {
      id
      bet
      createdAt
      user {
        ...UserBasicInfo
      }
      object {
        name
      }
    }
  }
  ${USER_BASIC_FRAGMENT}
`;
