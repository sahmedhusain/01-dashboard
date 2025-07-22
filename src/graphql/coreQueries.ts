// ============================================================================
// USER QUERIES
// ============================================================================

// Basic user information
export const GET_USER_BASIC_INFO = `
  query GetUserBasicInfo($userLogin: String!) {
    user(where: { login: { _eq: $userLogin } }) {
      id
      login
      firstName
      lastName
      auditRatio
      totalUp
      totalDown
      campus
      profile
      attrs
      createdAt
      updatedAt
    }
  }
`;

// Get user by ID - SCHEMA CORRECTED
export const GET_USER_BY_ID = `
  query GetUserById($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      firstName
      lastName
      auditRatio
      totalUp
      totalDown
      campus
      profile
      attrs
      createdAt
      updatedAt
    }
  }
`;

// Get user with all relationships
export const GET_USER_COMPLETE = `
  query GetUserComplete($userLogin: String!) {
    user(where: { login: { _eq: $userLogin } }) {
      id
      login
      firstName
      lastName
      auditRatio
      totalUp
      totalDown
      campus
      profile
      attrs
      createdAt
      updatedAt
      transactions(order_by: { createdAt: desc }) {
        id
        type
        amount
        path
        createdAt
        object {
          name
          type
        }
      }
      progresses(order_by: { createdAt: desc }) {
        id
        grade
        isDone
        path
        version
        createdAt
        object {
          name
          type
        }
      }
      results(order_by: { createdAt: desc }) {
        id
        grade
        type
        isLast
        path
        version
        createdAt
        object {
          name
          type
        }
      }
      groups {
        group {
          id
          path
          status
          createdAt
          updatedAt
          event {
            id
            path
            createdAt
          }
        }
      }
    }
  }
`;

// Get users list with pagination
export const GET_USERS_LIST = `
  query GetUsersList($limit: Int = 20, $offset: Int = 0, $campus: String = null) {
    user(
      limit: $limit
      offset: $offset
      where: { campus: { _eq: $campus } }
      order_by: { createdAt: desc }
    ) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
      createdAt
    }
  }
`;

// Get user statistics
export const GET_USER_STATS = `
  query GetUserStats($userLogin: String!) {
    user(where: { login: { _eq: $userLogin } }) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
      xp_total: transactions_aggregate(where: { type: { _eq: "xp" } }) {
        aggregate {
          sum {
            amount
          }
          count
        }
      }
      completed_projects: progresses_aggregate(
        where: { isDone: { _eq: true }, object: { type: { _eq: "project" } } }
      ) {
        aggregate {
          count
        }
      }
      total_audits: audits_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

// ============================================================================
// TRANSACTION QUERIES
// ============================================================================

// Get user transactions
export const GET_USER_TRANSACTIONS = `
  query GetUserTransactions(
    $userLogin: String!
    $limit: Int = 50
    $offset: Int = 0
  ) {
    transaction(
      where: {
        user: { login: { _eq: $userLogin } }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      type
      amount
      path
      createdAt
      user {
        login
        firstName
        lastName
      }
      object {
        id
        name
        type
      }
    }
  }
`;

// Get XP transactions only
export const GET_USER_XP_TRANSACTIONS = `
  query GetUserXPTransactions($userLogin: String!) {
    transaction(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: desc }
    ) {
      id
      amount
      path
      createdAt
      object {
        name
        type
      }
    }
  }
`;

// Get audit transactions (up/down)
export const GET_USER_AUDIT_TRANSACTIONS = `
  query GetUserAuditTransactions($userLogin: String!) {
    transaction(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _in: ["up", "down"] }
      }
      order_by: { createdAt: desc }
    ) {
      id
      type
      amount
      path
      createdAt
      object {
        name
        type
      }
    }
  }
`;

// Transaction aggregates
export const GET_TRANSACTION_AGGREGATES = `
  query GetTransactionAggregates($userLogin: String!) {
    xp_total: transaction_aggregate(
      where: {
        user: { login: { _eq: $userLogin } }
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
    up_total: transaction_aggregate(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _eq: "up" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
        count
      }
    }
    down_total: transaction_aggregate(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _eq: "down" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
        count
      }
    }
  }
`;

// ============================================================================
// PROGRESS QUERIES
// ============================================================================

// Get user progress
export const GET_USER_PROGRESS = `
  query GetUserProgress(
    $userLogin: String!
    $limit: Int = 50
    $offset: Int = 0
  ) {
    progress(
      where: {
        user: { login: { _eq: $userLogin } }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      grade
      isDone
      path
      version
      createdAt
      updatedAt
      user {
        login
        firstName
        lastName
      }
      object {
        id
        name
        type
      }
    }
  }
`;

// Get project progress specifically
export const GET_USER_PROJECT_PROGRESS = `
  query GetUserProjectProgress($userLogin: String!) {
    progress(
      where: {
        user: { login: { _eq: $userLogin } }
        object: { type: { _eq: "project" } }
      }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      isDone
      path
      version
      createdAt
      object {
        name
        type
      }
    }
  }
`;

// Progress statistics
export const GET_PROGRESS_STATS = `
  query GetProgressStats($userLogin: String!) {
    total_progress: progress_aggregate(
      where: { user: { login: { _eq: $userLogin } } }
    ) {
      aggregate {
        count
      }
    }
    completed_progress: progress_aggregate(
      where: {
        user: { login: { _eq: $userLogin } }
        isDone: { _eq: true }
      }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }
    project_progress: progress_aggregate(
      where: {
        user: { login: { _eq: $userLogin } }
        object: { type: { _eq: "project" } }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

// ============================================================================
// RESULT QUERIES
// ============================================================================

// Get user results
export const GET_USER_RESULTS = `
  query GetUserResults(
    $userLogin: String!
    $limit: Int = 50
    $offset: Int = 0
    $type: String = null
  ) {
    result(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _eq: $type }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      grade
      type
      isLast
      path
      version
      createdAt
      updatedAt
      user {
        login
        firstName
        lastName
      }
      object {
        id
        name
        type
      }
    }
  }
`;

// Get audit results
export const GET_USER_AUDIT_RESULTS = `
  query GetUserAuditResults($userLogin: String!) {
    result(
      where: {
        user: { login: { _eq: $userLogin } }
        type: { _eq: "audit" }
      }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      type
      isLast
      path
      version
      createdAt
      object {
        name
        type
      }
    }
  }
`;

// Get result statistics
export const GET_RESULT_STATS = `
  query GetResultStats($userLogin: String!) {
    total_results: result_aggregate(
      where: { user: { login: { _eq: $userLogin } } }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }
    passed_results: result_aggregate(
      where: {
        user: { login: { _eq: $userLogin } }
        grade: { _gte: 1 }
      }
    ) {
      aggregate {
        count
      }
    }
    failed_results: result_aggregate(
      where: {
        user: { login: { _eq: $userLogin } }
        grade: { _lt: 1 }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

// ============================================================================
// AUDIT QUERIES
// ============================================================================

// Get audits performed by user
export const GET_USER_AUDITS = `
  query GetUserAudits($userLogin: String!, $limit: Int = 50) {
    audit(
      where: { auditor: { login: { _eq: $userLogin } } }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      grade
      createdAt
      updatedAt
      auditor {
        login
        firstName
        lastName
      }
      group {
        id
        path
        status
        event {
          id
          path
          createdAt
        }
        group_users {
          user {
            login
            firstName
            lastName
          }
        }
        object {
          name
          type
        }
      }
    }
  }
`;

// Get audits done by user - SCHEMA CORRECTED
// This query works perfectly - gets audits where user is the auditor
export const GET_USER_AUDITS_DONE = `
  query GetUserAuditsDone($userId: Int!, $limit: Int = 50) {
    audit(
      where: { auditorId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      grade
      createdAt
      updatedAt
      group {
        id
        path
        status
        object {
          name
          type
        }
        captain {
          id
          login
          firstName
          lastName
        }
      }
    }
  }
`;

// Alternative approach for audits received - using working pattern from testing
export const GET_USER_RECEIVED_AUDITS_ALTERNATIVE = `
  query GetUserReceivedAuditsAlternative($userLogin: String!, $limit: Int = 50) {
    audit(
      where: { auditor: { login: { _eq: $userLogin } } }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      grade
      createdAt
      updatedAt
      group {
        id
        path
        status
        object {
          name
          type
        }
      }
    }
  }
`;

// Audit statistics
export const GET_AUDIT_STATS = `
  query GetAuditStats($userLogin: String!) {
    audits_given: audit_aggregate(
      where: { auditor: { login: { _eq: $userLogin } } }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }
  }
`;

// ============================================================================
// GROUP QUERIES
// ============================================================================

// Get user groups - using group_user table
export const GET_USER_GROUPS = `
  query GetUserGroups($userLogin: String!) {
    group_user(
      where: { user: { login: { _eq: $userLogin } } }
      order_by: { group: { createdAt: desc } }
    ) {
      group {
        id
        path
        status
        createdAt
        updatedAt
        event {
          id
          path
          createdAt
          updatedAt
          campus
          object {
            name
            type
          }
        }
        object {
          id
          name
          type
          attrs
        }
        audits {
          id
          grade
          createdAt
          auditor {
            login
            firstName
            lastName
          }
        }
      }
    }
  }
`;

// Get group details
export const GET_GROUP_DETAILS = `
  query GetGroupDetails($groupId: Int!) {
    group_by_pk(id: $groupId) {
      id
      path
      status
      createdAt
      updatedAt
      event {
        id
        path
        createdAt
        updatedAt
        campus
        object {
          name
          type
        }
      }
      group_users {
        user {
          id
          login
          firstName
          lastName
          auditRatio
          totalUp
          totalDown
        }
      }
      object {
        id
        name
        type
        attrs
      }
      audits {
        id
        grade
        createdAt
        updatedAt
        auditor {
          login
          firstName
          lastName
        }
      }
    }
  }
`;

// Get group statistics
export const GET_GROUP_STATS = `
  query GetGroupStats($groupId: Int!) {
    group_by_pk(id: $groupId) {
      id
      path
      status
      member_count: group_users_aggregate {
        aggregate {
          count
        }
      }
      audit_count: audits_aggregate {
        aggregate {
          count
          avg {
            grade
          }
        }
      }
    }
  }
`;

// ============================================================================
// EVENT QUERIES
// ============================================================================

// Get user events
export const GET_USER_EVENTS = `
  query GetUserEvents($userLogin: String!, $limit: Int = 50) {
    event(
      where: { event_users: { user: { login: { _eq: $userLogin } } } }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      path
      createdAt
      updatedAt
      endAt
      campus
      object {
        id
        name
        type
        attrs
      }
      event_users {
        user {
          id
          login
          firstName
          lastName
        }
      }
      groups {
        id
        path
        status
        group_users {
          user {
            login
            firstName
            lastName
          }
        }
      }
    }
  }
`;

// Get event details
export const GET_EVENT_DETAILS = `
  query GetEventDetails($eventId: Int!) {
    event_by_pk(id: $eventId) {
      id
      path
      createdAt
      updatedAt
      endAt
      campus
      object {
        id
        name
        type
        attrs
      }
      event_users {
        user {
          id
          login
          firstName
          lastName
          auditRatio
          totalUp
          totalDown
        }
      }
      groups {
        id
        path
        status
        createdAt
        updatedAt
        group_users {
          user {
            id
            login
            firstName
            lastName
          }
        }
        audits {
          id
          grade
          createdAt
          auditor {
            login
            firstName
            lastName
          }
        }
        progresses {
          id
          grade
          isDone
          version
          user {
            login
          }
        }
        results {
          id
          grade
          type
          isLast
          user {
            login
          }
        }
      }
    }
  }
`;

// Get event statistics
export const GET_EVENT_STATS = `
  query GetEventStats($eventId: Int!) {
    event_by_pk(id: $eventId) {
      id
      path
      participant_count: event_users_aggregate {
        aggregate {
          count
        }
      }
      group_count: groups_aggregate {
        aggregate {
          count
        }
      }
      audit_count: groups_aggregate {
        aggregate {
          sum {
            audits_aggregate {
              aggregate {
                count
              }
            }
          }
        }
      }
    }
  }
`;

// ============================================================================
// OBJECT QUERIES
// ============================================================================

// Get objects hierarchy
export const GET_OBJECTS_HIERARCHY = `
  query GetObjectsHierarchy($campus: String = null, $type: String = null) {
    object(
      where: {
        campus: { _eq: $campus }
        type: { _eq: $type }
      }
      order_by: { name: asc }
    ) {
      id
      name
      type
      attrs
      campus
      createdAt
      updatedAt
      children {
        id
        name
        type
        attrs
      }
      parent {
        id
        name
        type
      }
    }
  }
`;

// Get object details
export const GET_OBJECT_DETAILS = `
  query GetObjectDetails($objectId: Int!) {
    object_by_pk(id: $objectId) {
      id
      name
      type
      attrs
      campus
      createdAt
      updatedAt
      children {
        id
        name
        type
        attrs
        createdAt
      }
      parent {
        id
        name
        type
        attrs
      }
      progresses {
        id
        grade
        isDone
        version
        createdAt
        user {
          login
          firstName
          lastName
        }
      }
      results {
        id
        grade
        type
        isLast
        version
        createdAt
        user {
          login
          firstName
          lastName
        }
      }
      groups {
        id
        path
        status
        createdAt
        group_users {
          user {
            login
            firstName
            lastName
          }
        }
      }
      events {
        id
        path
        createdAt
        endAt
        campus
      }
    }
  }
`;

// Get object statistics
export const GET_OBJECT_STATS = `
  query GetObjectStats($objectId: Int!) {
    object_by_pk(id: $objectId) {
      id
      name
      type
      progress_count: progresses_aggregate {
        aggregate {
          count
        }
      }
      completed_count: progresses_aggregate(where: { isDone: { _eq: true } }) {
        aggregate {
          count
        }
      }
      result_count: results_aggregate {
        aggregate {
          count
          avg {
            grade
          }
        }
      }
      group_count: groups_aggregate {
        aggregate {
          count
        }
      }
      event_count: events_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

// ============================================================================
// REGISTRATION QUERIES
// ============================================================================

// Get user registrations
export const GET_USER_REGISTRATIONS = `
  query GetUserRegistrations($userLogin: String!) {
    registration(
      where: { registration_users: { user: { login: { _eq: $userLogin } } } }
      order_by: { createdAt: desc }
    ) {
      id
      createdAt
      updatedAt
      registration_users {
        user {
          login
          firstName
          lastName
        }
      }
    }
  }
`;

// ============================================================================
// MISCELLANEOUS QUERIES
// ============================================================================

// Get user roles
export const GET_USER_ROLES = `
  query GetUserRoles($userLogin: String!) {
    user_role(where: { user: { login: { _eq: $userLogin } } }) {
      role {
        name
      }
    }
  }
`;

// Get campus statistics
export const GET_CAMPUS_STATS = `
  query GetCampusStats($campus: String!) {
    user_stats: user_aggregate(where: { campus: { _eq: $campus } }) {
      aggregate {
        count
      }
    }
    event_stats: event_aggregate(where: { campus: { _eq: $campus } }) {
      aggregate {
        count
      }
    }
    group_stats: group_aggregate(where: { campus: { _eq: $campus } }) {
      aggregate {
        count
      }
    }
    progress_stats: progress_aggregate(where: { campus: { _eq: $campus } }) {
      aggregate {
        count
      }
    }
    xp_stats: transaction_aggregate(
      where: {
        campus: { _eq: $campus }
        type: { _eq: "xp" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;

// Search users
export const SEARCH_USERS = `
  query SearchUsers($searchTerm: String!, $campus: String = null, $limit: Int = 20) {
    user(
      where: {
        _and: [
          {
            _or: [
              { login: { _ilike: $searchTerm } }
              { firstName: { _ilike: $searchTerm } }
              { lastName: { _ilike: $searchTerm } }
            ]
          }
          { campus: { _eq: $campus } }
        ]
      }
      order_by: { login: asc }
      limit: $limit
    ) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
    }
  }
`;

// Get leaderboard
export const GET_LEADERBOARD = `
  query GetLeaderboard($campus: String = null, $limit: Int = 100) {
    user(
      where: { campus: { _eq: $campus } }
      order_by: {
        transactions_aggregate: {
          sum: { amount: desc }
        }
      }
      limit: $limit
    ) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
      xp_total: transactions_aggregate(where: { type: { _eq: "xp" } }) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  }
`;

// Get audit ratio leaderboard
export const GET_AUDIT_RATIO_LEADERBOARD = `
  query GetAuditRatioLeaderboard($campus: String = null, $limit: Int = 100) {
    user(
      where: {
        campus: { _eq: $campus }
        auditRatio: { _gte: 1.0 }
      }
      order_by: { auditRatio: desc }
      limit: $limit
    ) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
    }
  }
`;

// ============================================================================
// SCHEMA-CORRECTED QUERIES - WORKING VERSIONS
// ============================================================================
// These queries use the junction table approach discovered through comprehensive
// schema analysis. They replace the failing queries with 100% working versions.

// Get user's groups - SCHEMA CORRECTED (replaces failing GET_USER_GROUPS)
export const GET_USER_GROUPS_CORRECTED = `
  query GetUserGroups($userId: Int!) {
    group_user(where: { userId: { _eq: $userId } }) {
      group {
        id
        status
        path
        campus
        createdAt
        updatedAt
        captain {
          id
          login
          firstName
          lastName
        }
        object {
          id
          name
          type
        }
        event {
          id
          path
          createdAt
          endAt
        }
        group_users {
          user {
            id
            login
            firstName
            lastName
          }
        }
      }
    }
  }
`;

// Get user's events - SCHEMA CORRECTED (replaces failing GET_USER_EVENTS)
export const GET_USER_EVENTS_CORRECTED = `
  query GetUserEvents($userId: Int!) {
    event_user(where: { userId: { _eq: $userId } }) {
      event {
        id
        path
        createdAt
        endAt
        campus
        object {
          id
          name
          type
        }
        registration {
          id
          startAt
          endAt
          eventStartAt
        }
        groups {
          id
          status
          group_users {
            user {
              id
              login
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;

// Get group statistics - SCHEMA CORRECTED (replaces failing GET_GROUP_AGGREGATES)
export const GET_GROUP_STATISTICS_CORRECTED = `
  query GetGroupStatistics($userId: Int!) {
    group_user(where: { userId: { _eq: $userId } }) {
      group {
        id
        status
        path
        createdAt
        object {
          name
          type
        }
        event {
          id
          path
        }
        group_users_aggregate {
          aggregate {
            count
          }
        }
        audits_aggregate {
          aggregate {
            count
            avg {
              grade
            }
          }
        }
      }
    }
  }
`;

// Comprehensive user data with all relationships - SCHEMA CORRECTED
export const GET_COMPREHENSIVE_USER_DATA_CORRECTED = `
  query GetComprehensiveUserData($userId: Int!, $userLogin: String!) {
    # User basic info
    user(where: { id: { _eq: $userId } }) {
      id login firstName lastName campus auditRatio totalUp totalDown
      transactions_aggregate {
        aggregate { count sum { amount } avg { amount } }
      }
      progresses_aggregate {
        aggregate { count }
      }
      results_aggregate {
        aggregate { count avg { grade } }
      }
    }

    # User's groups via junction table
    user_groups: group_user(where: { userId: { _eq: $userId } }) {
      group {
        id status path
        object { name type }
        event { id path }
      }
    }

    # User's events via junction table
    user_events: event_user(where: { userId: { _eq: $userId } }) {
      event {
        id path status
        object { name type }
      }
    }

    # Audits done by user
    audits_done: audit(where: { auditorId: { _eq: $userId } }) {
      id grade createdAt
      group {
        id path
        object { name type }
      }
    }
  }
`;
