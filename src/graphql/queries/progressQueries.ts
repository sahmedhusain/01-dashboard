import { gql } from '@apollo/client'

// Fragment for progress data
export const PROGRESS_FRAGMENT = gql`
  fragment ProgressData on progress {
    id
    grade
    isDone
    path
    version
    createdAt
    updatedAt
    object {
      id
      name
      type
    }
  }
`

// Get user's project progress (Main Module only)
export const GET_USER_PROGRESS = gql`
  ${PROGRESS_FRAGMENT}
  
  query GetUserProgress(
    $userId: Int!
    $limit: Int = 100
    $offset: Int = 0
  ) {
    progress(
      where: {
        userId: { _eq: $userId }
        path: { _nregex: "piscine" }
      }
      order_by: { updatedAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...ProgressData
    }
    
    progress_aggregate(
      where: {
        userId: { _eq: $userId }
        path: { _nregex: "piscine" }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`

// Get user's piscine progress
export const GET_USER_PISCINE_PROGRESS = gql`
  ${PROGRESS_FRAGMENT}
  
  query GetUserPiscineProgress(
    $userId: Int!
    $piscineType: String!
    $limit: Int = 100
  ) {
    progress(
      where: {
        userId: { _eq: $userId }
        path: { _regex: $piscineType }
      }
      order_by: { updatedAt: desc }
      limit: $limit
    ) {
      ...ProgressData
    }
    
    progress_aggregate(
      where: {
        userId: { _eq: $userId }
        path: { _regex: $piscineType }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`

// Get user's project statistics
export const GET_USER_PROJECT_STATS = gql`
  query GetUserProjectStats($userId: Int!) {
    # Main Module stats
    bhModulePassed: progress_aggregate(
      where: {
        userId: { _eq: $userId }
        path: { _nregex: "piscine" }
        isDone: { _eq: true }
        grade: { _gte: 1 }
      }
    ) {
      aggregate {
        count
      }
    }
    
    bhModuleFailed: progress_aggregate(
      where: {
        userId: { _eq: $userId }
        path: { _nregex: "piscine" }
        isDone: { _eq: true }
        grade: { _lt: 1 }
      }
    ) {
      aggregate {
        count
      }
    }
    
    bhModuleTotal: progress_aggregate(
      where: {
        userId: { _eq: $userId }
        path: { _nregex: "piscine" }
        isDone: { _eq: true }
      }
    ) {
      aggregate {
        count
      }
    }
    
    # Recent completions
    recentCompletions: progress(
      where: {
        userId: { _eq: $userId }
        path: { _nregex: "piscine" }
        isDone: { _eq: true }
        grade: { _gte: 1 }
      }
      order_by: { updatedAt: desc }
      limit: 10
    ) {
      ...ProgressData
    }
  }
`

// Get project details by path
export const GET_PROJECT_DETAILS = gql`
  query GetProjectDetails($path: String!) {
    object(where: { path: { _eq: $path } }) {
      id
      name
      type
      path
      createdAt
      updatedAt
    }
    
    # Get completion stats for this project
    progress_aggregate(
      where: {
        path: { _eq: $path }
        isDone: { _eq: true }
      }
    ) {
      aggregate {
        count
      }
    }
    
    # Get pass rate
    passedCount: progress_aggregate(
      where: {
        path: { _eq: $path }
        isDone: { _eq: true }
        grade: { _gte: 1 }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`

// Get all user progress (including piscines)
export const GET_ALL_USER_PROGRESS = gql`
  ${PROGRESS_FRAGMENT}
  
  query GetAllUserProgress($userId: Int!) {
    # Main Module progress
    bhModule: progress(
      where: {
        userId: { _eq: $userId }
        path: { _nregex: "piscine" }
      }
      order_by: { updatedAt: desc }
    ) {
      ...ProgressData
    }
    
    # Piscine progress
    piscines: progress(
      where: {
        userId: { _eq: $userId }
        path: { _regex: "piscine" }
      }
      order_by: { updatedAt: desc }
    ) {
      ...ProgressData
    }
  }
`
