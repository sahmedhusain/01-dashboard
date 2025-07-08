import { gql } from '@apollo/client';

// Enhanced user queries with more detailed information
export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    user {
      id
      login
      profile
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_XP_TIMELINE = gql`
  query GetUserXPTimeline($userId: Int!, $limit: Int = 50) {
    transaction(
      where: {
        type: { _eq: "xp" }
        userId: { _eq: $userId }
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      amount
      createdAt
      updatedAt
      path
      objectId
      object {
        id
        name
        type
        description
      }
      eventId
      event {
        id
        object {
          name
        }
      }
    }
  }
`;

export const GET_USER_PROJECT_STATS = gql`
  query GetUserProjectStats($userId: Int!) {
    progress(
      where: { 
        userId: { _eq: $userId }
        object: { type: { _in: ["project", "exam", "raid"] } }
      }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      isDone
      path
      createdAt
      updatedAt
      objectId
      object {
        id
        name
        type
        description
        skills {
          type
          value
        }
      }
      eventId
      event {
        id
        object {
          name
        }
      }
    }
  }
`;

export const GET_USER_AUDIT_DETAILS = gql`
  query GetUserAuditDetails($userId: Int!) {
    audit(
      where: { auditorId: { _eq: $userId } }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      createdAt
      updatedAt
      groupId
      resultId
      group {
        id
        eventId
        captainId
        status
        object {
          id
          name
          type
          description
        }
        event {
          id
          object {
            name
          }
        }
        members {
          userId
          user {
            login
          }
        }
      }
      result {
        id
        grade
        type
      }
    }
  }
`;

export const GET_USER_SKILLS_MATRIX = gql`
  query GetUserSkillsMatrix($userId: Int!) {
    transaction(
      where: {
        type: { _eq: "skill" }
        userId: { _eq: $userId }
      }
    ) {
      id
      type
      amount
      path
      objectId
      object {
        id
        name
        type
        skills {
          type
          value
        }
      }
      createdAt
    }
  }
`;

export const GET_USER_RANKING = gql`
  query GetUserRanking($userId: Int!) {
    transaction_aggregate(
      where: {
        type: { _eq: "xp" }
        userId: { _eq: $userId }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    
    user_aggregate(
      where: {
        transactions: {
          type: { _eq: "xp" }
          amount: { _gt: 0 }
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_USER_ACHIEVEMENTS = gql`
  query GetUserAchievements($userId: Int!) {
    result(
      where: { 
        userId: { _eq: $userId }
        grade: { _gte: 1 }
        object: { type: { _in: ["project", "exam", "raid"] } }
      }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      type
      createdAt
      objectId
      object {
        id
        name
        type
        description
        attrs
      }
      eventId
      event {
        id
        object {
          name
        }
      }
    }
  }
`;

export const GET_USER_PISCINE_STATS = gql`
  query GetUserPiscineStats($userId: Int!) {
    progress(
      where: { 
        userId: { _eq: $userId }
        path: { _ilike: "%piscine%" }
      }
      order_by: { createdAt: asc }
    ) {
      id
      grade
      isDone
      path
      createdAt
      objectId
      object {
        id
        name
        type
      }
    }
    
    result(
      where: { 
        userId: { _eq: $userId }
        object: { 
          type: { _in: ["exercise", "exam"] }
          path: { _ilike: "%piscine%" }
        }
      }
      order_by: { createdAt: asc }
    ) {
      id
      grade
      type
      createdAt
      objectId
      object {
        id
        name
        type
        path
      }
    }
  }
`;

export const GET_USER_RECENT_ACTIVITY = gql`
  query GetUserRecentActivity($userId: Int!, $limit: Int = 20) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _in: ["xp", "skill"] }
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      type
      amount
      createdAt
      path
      objectId
      object {
        id
        name
        type
      }
    }
    
    progress(
      where: { 
        userId: { _eq: $userId }
        isDone: { _eq: true }
      }
      order_by: { updatedAt: desc }
      limit: $limit
    ) {
      id
      grade
      updatedAt
      objectId
      object {
        id
        name
        type
      }
    }
  }
`;

// Mutation for updating user preferences (if available)
export const UPDATE_USER_PREFERENCES = gql`
  mutation UpdateUserPreferences($userId: Int!, $preferences: jsonb) {
    update_user_by_pk(
      pk_columns: { id: $userId }
      _set: { profile: $preferences }
    ) {
      id
      profile
    }
  }
`;
