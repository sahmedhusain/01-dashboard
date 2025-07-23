import { gql } from '@apollo/client'

// Fragment for transaction data
export const TRANSACTION_FRAGMENT = gql`
  fragment TransactionData on transaction {
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

// Get user's XP transactions (BH Module only - excluding piscines)
export const GET_USER_XP_TRANSACTIONS = gql`
  ${TRANSACTION_FRAGMENT}

  query GetUserXPTransactions(
    $userId: Int!
    $limit: Int = 50
    $offset: Int = 0
  ) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        _and: [
          { path: { _like: "/bahrain/bh-module%" } }
          { path: { _nlike: "/bahrain/bh-module/piscine-%" } }
          { path: { _nlike: "/bahrain/bh-piscine/%" } }
        ]
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...TransactionData
    }

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
        count
        sum {
          amount
        }
      }
    }
  }
`

// Get user's Go piscine XP transactions (/bahrain/bh-piscine/)
export const GET_USER_GO_PISCINE_XP = gql`
  ${TRANSACTION_FRAGMENT}

  query GetUserGoPiscineXP(
    $userId: Int!
    $limit: Int = 50
  ) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _like: "/bahrain/bh-piscine/%" }
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      ...TransactionData
    }

    transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _like: "/bahrain/bh-piscine/%" }
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

// Get user's specific piscine XP transactions (js, rust, flutter, etc.)
export const GET_USER_PISCINE_XP = gql`
  ${TRANSACTION_FRAGMENT}

  query GetUserPiscineXP(
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
      ...TransactionData
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

// Get user's checkpoint XP transactions (main module checkpoints)
export const GET_USER_CHECKPOINT_XP = gql`
  ${TRANSACTION_FRAGMENT}

  query GetUserCheckpointXP(
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
      ...TransactionData
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



// Get all user's XP transactions (including piscines)
export const GET_ALL_USER_XP = gql`
  ${TRANSACTION_FRAGMENT}
  
  query GetAllUserXP($userId: Int!) {
    # BH Module XP
    bhModule: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _nregex: "piscine" }
      }
      order_by: { createdAt: desc }
    ) {
      ...TransactionData
    }
    
    # Piscine XP
    piscines: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _regex: "piscine" }
      }
      order_by: { createdAt: desc }
    ) {
      ...TransactionData
    }
    
    # Total aggregates
    bhModuleAggregate: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _nregex: "piscine" }
      }
    ) {
      aggregate {
        count
        sum {
          amount
        }
      }
    }
    
    piscineAggregate: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _regex: "piscine" }
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

// Get XP leaderboard
export const GET_XP_LEADERBOARD = gql`
  query GetXPLeaderboard($limit: Int = 50) {
    transaction_aggregate(
      where: {
        type: { _eq: "xp" }
        path: { _nregex: "piscine" }
      }
      group_by: [userId]
      order_by: { sum: { amount: desc } }
      limit: $limit
    ) {
      aggregate {
        sum {
          amount
        }
      }
      group_key
    }
  }
`

// Get recent XP gains across all users (for activity feed)
export const GET_RECENT_XP_ACTIVITY = gql`
  ${TRANSACTION_FRAGMENT}
  
  query GetRecentXPActivity($limit: Int = 20) {
    transaction(
      where: {
        type: { _eq: "xp" }
        path: { _nregex: "piscine" }
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      ...TransactionData
      user {
        id
        login
        firstName
        lastName
      }
    }
  }
`
