import { gql } from '@apollo/client';

// Get user info, transactions (XP), progress, and results
export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    user {
      id
      login
      
      # Get user's XP transactions
      transactions(where: { type: { _eq: "xp" }}) {
        id
        type
        amount
        createdAt
        path
      }
      
      # Get user's progress
      progress {
        id
        grade
        isDone
        createdAt
        path
        object {
          id
          name
          type
        }
      }
      
      # Get user's results
      results {
        id
        grade
        createdAt
        path
        object {
          id
          name
          type
        }
      }
      
      # Get user's audits
      audits {
        id
        grade
        createdAt
        result {
          id
          grade
        }
      }
    }
  }
`;

// Get specific project results
export const GET_PROJECT_RESULTS = gql`
  query GetProjectResults($objectId: Int!) {
    result(where: { objectId: { _eq: $objectId }}) {
      id
      grade
      createdAt
      object {
        id
        name
        type
      }
    }
  }
`;

// Get XP progression over time
export const GET_XP_PROGRESS = gql`
  query GetXPProgress {
    transaction(
      where: { type: { _eq: "xp" }}
      order_by: { createdAt: asc }
    ) {
      id
      amount
      createdAt
      path
    }
  }
`;

// Get audit stats
export const GET_AUDIT_STATS = gql`
  query GetAuditStats {
    audit {
      id
      grade
      createdAt
      result {
        id
        grade
      }
    }
  }
`;
