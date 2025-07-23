import { gql } from '@apollo/client'

// Fragment for basic user information
export const USER_BASIC_FRAGMENT = gql`
  fragment UserBasic on user {
    id
    login
    firstName
    lastName
    email
    campus
    createdAt
    updatedAt
    attrs
  }
`

// Fragment for user audit information
export const USER_AUDIT_FRAGMENT = gql`
  fragment UserAudit on user {
    auditRatio
    totalUp
    totalDown
  }
`

// Basic user profile query
export const GET_USER_PROFILE = gql`
  ${USER_BASIC_FRAGMENT}
  ${USER_AUDIT_FRAGMENT}
  
  query GetUserProfile($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      ...UserBasic
      ...UserAudit
    }
  }
`

// Search users query with pagination
export const SEARCH_USERS = gql`
  ${USER_BASIC_FRAGMENT}
  
  query SearchUsers(
    $searchTerm: String!
    $limit: Int = 20
    $offset: Int = 0
  ) {
    user(
      where: {
        _or: [
          { login: { _ilike: $searchTerm } }
          { firstName: { _ilike: $searchTerm } }
          { lastName: { _ilike: $searchTerm } }
          { email: { _ilike: $searchTerm } }
        ]
      }
      limit: $limit
      offset: $offset
      order_by: { login: asc }
    ) {
      ...UserBasic
    }
    
    user_aggregate(
      where: {
        _or: [
          { login: { _ilike: $searchTerm } }
          { firstName: { _ilike: $searchTerm } }
          { lastName: { _ilike: $searchTerm } }
          { email: { _ilike: $searchTerm } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`

// Get user by login (for authentication)
export const GET_USER_BY_LOGIN = gql`
  ${USER_BASIC_FRAGMENT}
  ${USER_AUDIT_FRAGMENT}
  
  query GetUserByLogin($login: String!) {
    user(where: { login: { _eq: $login } }) {
      ...UserBasic
      ...UserAudit
    }
  }
`

// Get user by email (for authentication)
export const GET_USER_BY_EMAIL = gql`
  ${USER_BASIC_FRAGMENT}
  ${USER_AUDIT_FRAGMENT}
  
  query GetUserByEmail($email: String!) {
    user(where: { email: { _eq: $email } }) {
      ...UserBasic
      ...UserAudit
    }
  }
`

// Get user by ID (for profile details)
export const GET_USER_BY_ID = gql`
  ${USER_BASIC_FRAGMENT}
  ${USER_AUDIT_FRAGMENT}

  query GetUserById($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      ...UserBasic
      ...UserAudit
      attrs
    }
  }
`

// Get multiple users by IDs (for leaderboard, etc.)
export const GET_USERS_BY_IDS = gql`
  ${USER_BASIC_FRAGMENT}
  ${USER_AUDIT_FRAGMENT}

  query GetUsersByIds($userIds: [Int!]!) {
    user(where: { id: { _in: $userIds } }) {
      ...UserBasic
      ...UserAudit
    }
  }
`

// Get comprehensive user profile with all data for dashboard
export const GET_COMPREHENSIVE_USER_PROFILE = gql`
  ${USER_BASIC_FRAGMENT}
  ${USER_AUDIT_FRAGMENT}

  query GetComprehensiveUserProfile($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      ...UserBasic
      ...UserAudit
    }
  }
`

// Get user skills data
export const GET_USER_SKILLS = gql`
  query GetUserSkills($userId: Int!) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _iregex: "(^|[^[:alnum:]_])[[:alnum:]_]*skill_[[:alnum:]_]*($|[^[:alnum:]_])" }
        object: { type: { _eq: "project" } }
      }
      order_by: [{ type: asc }, { createdAt: desc }]
      distinct_on: type
    ) {
      amount
      type
      createdAt
    }
  }
`

// Get user level from event_user table
export const GET_USER_LEVEL = gql`
  query GetUserLevel($userId: Int!) {
    event_user(
      where: {
        userId: { _eq: $userId }
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
    ) {
      level
      userLogin
      event {
        id
        path
      }
    }
  }
`

// Get user total XP (BH Module only)
export const GET_USER_TOTAL_XP = gql`
  query GetUserTotalXP($userId: Int!) {
    transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        _and: [
          { path: { _like: "/bahrain/bh-module%" } }
          { path: { _nlike: "/bahrain/bh-module/piscine-%" } }
          { path: { _nlike: "/bahrain/bh-piscine/%" } }
        ]
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`
