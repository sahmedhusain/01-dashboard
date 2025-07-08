import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query GetUserInfo {
    user {
      id
      login
      profile
    }
  }
`;

export const GET_USER_XP = gql`
  query GetUserXP($userId: Int!) {
    transaction(
      where: {
        type: { _eq: "xp" }
        userId: { _eq: $userId }
      }
      order_by: { createdAt: desc }
    ) {
      id
      amount
      createdAt
      path
      objectId
    }
  }
`;

export const GET_USER_PROGRESS = gql`
  query GetUserProgress($userId: Int!) {
    progress(
      where: { userId: { _eq: $userId } }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      isDone
      path
      createdAt
      objectId
      eventId
    }
  }
`;

export const GET_USER_AUDITS = gql`
  query GetUserAudits($userId: Int!) {
    audit(
      where: { auditorId: { _eq: $userId } }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      createdAt
      groupId
      group {
        id
        object {
          id
          name
          type
        }
      }
    }
  }
`;

export const GET_USER_RESULTS = gql`
  query GetUserResults($userId: Int!) {
    result(
      where: { userId: { _eq: $userId } }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      createdAt
      type
      object {
        id
        name
        type
      }
      eventId
    }
  }
`;
