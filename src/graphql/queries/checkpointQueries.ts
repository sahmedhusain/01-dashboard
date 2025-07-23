import { gql } from '@apollo/client'

// Fragment for checkpoint transaction data
export const CHECKPOINT_TRANSACTION_FRAGMENT = gql`
  fragment CheckpointTransactionData on transaction {
    id
    amount
    type
    createdAt
    path
    object {
      id
      name
      type
    }
  }
`

// Get user's main module checkpoint XP transactions
export const GET_USER_MAIN_CHECKPOINT_XP = gql`
  ${CHECKPOINT_TRANSACTION_FRAGMENT}
  
  query GetUserMainCheckpointXP(
    $userId: Int!
    $limit: Int = 50
  ) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _like: "/bahrain/bh-module/checkpoint/%" }
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      ...CheckpointTransactionData
    }
    
    transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _like: "/bahrain/bh-module/checkpoint/%" }
      }
    ) {
      aggregate {
        count
        sum {
          amount
        }
      }
    }
  }
`

// Get user's Go piscine checkpoint XP transactions
export const GET_USER_GO_PISCINE_CHECKPOINT_XP = gql`
  ${CHECKPOINT_TRANSACTION_FRAGMENT}
  
  query GetUserGoPiscineCheckpointXP(
    $userId: Int!
    $limit: Int = 50
  ) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _like: "/bahrain/bh-piscine/%/checkpoint%" }
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      ...CheckpointTransactionData
    }
    
    transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _like: "/bahrain/bh-piscine/%/checkpoint%" }
      }
    ) {
      aggregate {
        count
        sum {
          amount
        }
      }
    }
  }
`

// Get user's specific piscine checkpoint XP transactions
export const GET_USER_PISCINE_CHECKPOINT_XP = gql`
  ${CHECKPOINT_TRANSACTION_FRAGMENT}
  
  query GetUserPiscineCheckpointXP(
    $userId: Int!
    $piscineName: String!
    $limit: Int = 50
  ) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _like: $piscineName }
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      ...CheckpointTransactionData
    }
    
    transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _like: $piscineName }
      }
    ) {
      aggregate {
        count
        sum {
          amount
        }
      }
    }
  }
`

// Get all checkpoint data for a user (main module + all piscines)
export const GET_ALL_USER_CHECKPOINT_DATA = gql`
  ${CHECKPOINT_TRANSACTION_FRAGMENT}
  
  query GetAllUserCheckpointData($userId: Int!) {
    # Main module checkpoints
    mainCheckpoints: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _like: "/bahrain/bh-module/checkpoint/%" }
      }
      order_by: { createdAt: desc }
    ) {
      ...CheckpointTransactionData
    }
    
    # Go piscine checkpoints
    goPiscineCheckpoints: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _like: "/bahrain/bh-piscine/%/checkpoint%" }
      }
      order_by: { createdAt: desc }
    ) {
      ...CheckpointTransactionData
    }
    
    # Other piscine checkpoints (js, rust, flutter, etc.)
    otherPiscineCheckpoints: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _like: "/bahrain/bh-module/piscine-%/checkpoint%" }
      }
      order_by: { createdAt: desc }
    ) {
      ...CheckpointTransactionData
    }
    
    # Aggregates
    mainCheckpointAggregate: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _like: "/bahrain/bh-module/checkpoint/%" }
      }
    ) {
      aggregate {
        count
        sum {
          amount
        }
      }
    }
    
    goPiscineCheckpointAggregate: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _like: "/bahrain/bh-piscine/%/checkpoint%" }
      }
    ) {
      aggregate {
        count
        sum {
          amount
        }
      }
    }
    
    otherPiscineCheckpointAggregate: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _like: "/bahrain/bh-module/piscine-%/checkpoint%" }
      }
    ) {
      aggregate {
        count
        sum {
          amount
        }
      }
    }
  }
`

// Check if user has checkpoints in a specific piscine
export const CHECK_PISCINE_HAS_CHECKPOINTS = gql`
  query CheckPiscineHasCheckpoints(
    $userId: Int!
    $piscinePath: String!
  ) {
    transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _like: $piscinePath }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`
