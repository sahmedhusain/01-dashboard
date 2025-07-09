import { gql } from '@apollo/client';

// Basic user information query (gets current authenticated user)
export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      email
      firstName
      lastName
      createdAt
      updatedAt
      attrs
    }
  }
`;

// User transactions (XP) query
export const GET_USER_TRANSACTIONS = gql`
  query GetUserTransactions($userId: Int!) {
    transaction(
      where: { 
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: desc }
    ) {
      id
      type
      amount
      createdAt
      path
      object {
        id
        name
        type
      }
    }
  }
`;

// User progress query
export const GET_USER_PROGRESS = gql`
  query GetUserProgress($userId: Int!) {
    progress(
      where: { userId: { _eq: $userId } }
      order_by: { updatedAt: desc }
    ) {
      id
      grade
      createdAt
      updatedAt
      path
      object {
        id
        name
        type
        attrs
      }
    }
  }
`;

// User results query
export const GET_USER_RESULTS = gql`
  query GetUserResults($userId: Int!) {
    result(
      where: { userId: { _eq: $userId } }
      order_by: { updatedAt: desc }
    ) {
      id
      grade
      type
      createdAt
      updatedAt
      path
      object {
        id
        name
        type
        attrs
      }
    }
  }
`;

// User audits query (both as auditor and auditee)
export const GET_USER_AUDITS = gql`
  query GetUserAudits($userId: Int!) {
    audit(
      where: { 
        _or: [
          { auditorId: { _eq: $userId } }
          { group: { members: { userId: { _eq: $userId } } } }
        ]
      }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      createdAt
      updatedAt
      auditor {
        id
        login
      }
      group {
        id
        path
        object {
          id
          name
          type
        }
        members {
          user {
            id
            login
          }
        }
      }
    }
  }
`;

// XP statistics query
export const GET_XP_STATISTICS = gql`
  query GetXPStatistics($userId: Int!) {
    transaction_aggregate(
      where: { 
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
        count
      }
    }
    
    transaction(
      where: { 
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: asc }
    ) {
      amount
      createdAt
      path
      object {
        name
        type
      }
    }
  }
`;

// Project statistics query
export const GET_PROJECT_STATISTICS = gql`
  query GetProjectStatistics($userId: Int!) {
    total_projects: result_aggregate(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: "project" } }
      }
    ) {
      aggregate {
        count
      }
    }

    passed_projects: result_aggregate(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: "project" } }
        grade: { _gte: 1 }
      }
    ) {
      aggregate {
        count
      }
    }
    
    result(
      where: { 
        userId: { _eq: $userId }
        object: { type: { _eq: "project" } }
      }
      order_by: { updatedAt: desc }
    ) {
      id
      grade
      updatedAt
      path
      object {
        name
        type
        attrs
      }
    }
  }
`;

// Audit ratio query
export const GET_AUDIT_RATIO = gql`
  query GetAuditRatio($userId: Int!) {
    # Audits done by user
    audits_given: audit_aggregate(
      where: { auditorId: { _eq: $userId } }
    ) {
      aggregate {
        count
      }
    }

    # Audits received by user
    audits_received: audit_aggregate(
      where: {
        group: { members: { userId: { _eq: $userId } } }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

// Skills/Technologies query (from transaction paths and object types)
export const GET_USER_SKILLS = gql`
  query GetUserSkills($userId: Int!) {
    transaction(
      where: { 
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      distinct_on: path
    ) {
      path
      amount
      object {
        name
        type
        attrs
      }
    }
  }
`;

// Search queries for advanced features
export const SEARCH_USERS = gql`
  query SearchUsers($searchTerm: String!) {
    user(
      where: {
        _or: [
          { login: { _ilike: $searchTerm } }
          { firstName: { _ilike: $searchTerm } }
          { lastName: { _ilike: $searchTerm } }
        ]
      }
      limit: 10
    ) {
      id
      login
      firstName
      lastName
    }
  }
`;

// Note: GET_DASHBOARD_DATA removed to avoid GraphQL field conflicts
// Using individual hooks instead for better error handling
