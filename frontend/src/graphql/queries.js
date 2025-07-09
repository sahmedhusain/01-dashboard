import { gql } from '@apollo/client';

// Enhanced user profile query with comprehensive information
export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      profile
      attrs
      createdAt
      updatedAt
      campus
      # User roles and permissions
      userRoles {
        role {
          id
          slug
          name
          description
        }
      }
      # User records (bans, warnings, etc.)
      records {
        id
        message
        banEndAt
        createdAt
        author {
          id
          login
        }
      }
    }
  }
`;

// Enhanced user transactions query with all transaction types
export const GET_USER_TRANSACTIONS = gql`
  query GetUserTransactions($userId: Int!, $limit: Int = 100, $offset: Int = 0, $type: String = null) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: $type }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      type
      amount
      createdAt
      path
      attrs
      campus
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        createdAt
        endAt
        status
        object {
          name
          type
        }
      }
    }

    # Transaction aggregates for statistics
    transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: $type }
      }
    ) {
      aggregate {
        count
        sum {
          amount
        }
        avg {
          amount
        }
        max {
          amount
        }
        min {
          amount
        }
      }
    }
  }
`;

// Enhanced user progress query with comprehensive tracking
export const GET_USER_PROGRESS = gql`
  query GetUserProgress($userId: Int!, $limit: Int = 50, $offset: Int = 0, $isDone: Boolean = null) {
    progress(
      where: {
        userId: { _eq: $userId }
        isDone: { _eq: $isDone }
      }
      order_by: { updatedAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      grade
      isDone
      version
      createdAt
      updatedAt
      path
      campus
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        createdAt
        endAt
        status
      }
      group {
        id
        status
        captainId
        createdAt
        members: groupUsers {
          user {
            id
            login
          }
          confirmed
        }
      }
    }

    # Progress statistics
    progress_aggregate(
      where: { userId: { _eq: $userId } }
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

// Enhanced user results query with detailed information
export const GET_USER_RESULTS = gql`
  query GetUserResults($userId: Int!, $limit: Int = 50, $offset: Int = 0, $type: String = null, $minGrade: Float = null) {
    result(
      where: {
        userId: { _eq: $userId }
        type: { _eq: $type }
        grade: { _gte: $minGrade }
      }
      order_by: { updatedAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      grade
      type
      attrs
      version
      isLast
      createdAt
      updatedAt
      path
      campus
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        status
      }
      group {
        id
        status
        members: groupUsers {
          user {
            id
            login
          }
        }
      }
      # Related audits for this result
      audits {
        id
        grade
        createdAt
        auditor {
          id
          login
        }
      }
    }

    # Result statistics
    result_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: $type }
      }
    ) {
      aggregate {
        count
        avg {
          grade
        }
        max {
          grade
        }
        min {
          grade
        }
      }
    }
  }
`;

// Enhanced user audits query with comprehensive audit information
export const GET_USER_AUDITS = gql`
  query GetUserAudits($userId: Int!, $limit: Int = 50, $offset: Int = 0, $asAuditor: Boolean = null) {
    # Audits where user is the auditor
    audits_given: audit(
      where: {
        auditorId: { _eq: $userId }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      grade
      attrs
      code
      version
      endAt
      private
      createdAt
      updatedAt
      group {
        id
        path
        status
        captainId
        object {
          id
          name
          type
          attrs
        }
        members: groupUsers {
          user {
            id
            login
          }
          confirmed
        }
      }
      result {
        id
        grade
        type
        createdAt
      }
    }

    # Audits where user's group was audited
    audits_received: audit(
      where: {
        group: {
          groupUsers: {
            userId: { _eq: $userId }
            confirmed: { _eq: true }
          }
        }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      grade
      attrs
      version
      endAt
      createdAt
      updatedAt
      auditor {
        id
        login
        profile
      }
      group {
        id
        path
        status
        object {
          id
          name
          type
        }
      }
      result {
        id
        grade
        type
        createdAt
      }
    }

    # Audit statistics
    audit_stats_given: audit_aggregate(
      where: { auditorId: { _eq: $userId } }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }

    audit_stats_received: audit_aggregate(
      where: {
        group: {
          groupUsers: {
            userId: { _eq: $userId }
            confirmed: { _eq: true }
          }
        }
      }
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

// Enhanced XP statistics query with comprehensive analysis
export const GET_XP_STATISTICS = gql`
  query GetXPStatistics($userId: Int!) {
    # Total XP statistics
    xp_total: transaction_aggregate(
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
        avg {
          amount
        }
        max {
          amount
        }
        min {
          amount
        }
      }
    }

    # XP transactions with detailed information
    xp_transactions: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: asc }
    ) {
      id
      amount
      createdAt
      path
      attrs
      campus
      object {
        id
        name
        type
        attrs
        # Object hierarchy for better categorization
        children {
          child {
            name
            type
          }
        }
      }
      event {
        id
        path
        createdAt
        endAt
        object {
          name
          type
        }
      }
    }

    # XP by object type
    xp_by_type: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      distinct_on: [object_id]
    ) {
      nodes {
        object {
          id
          name
          type
        }
        amount
      }
    }

    # Up/Down transactions (audit rewards)
    audit_rewards: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _in: ["up", "down"] }
      }
      order_by: { createdAt: desc }
    ) {
      id
      type
      amount
      createdAt
      path
      object {
        name
        type
      }
    }

    # Audit rewards statistics
    audit_rewards_stats: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _in: ["up", "down"] }
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

// Enhanced project statistics query with comprehensive analysis
export const GET_PROJECT_STATISTICS = gql`
  query GetProjectStatistics($userId: Int!, $objectType: String = "project", $limit: Int = 100) {
    # Total projects by type
    total_projects: result_aggregate(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: $objectType } }
        isLast: { _eq: true }
      }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }

    # Passed projects
    passed_projects: result_aggregate(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: $objectType } }
        grade: { _gte: 1 }
        isLast: { _eq: true }
      }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }

    # Failed projects
    failed_projects: result_aggregate(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: $objectType } }
        grade: { _lt: 1 }
        isLast: { _eq: true }
      }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }

    # Detailed project results
    project_results: result(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: $objectType } }
        isLast: { _eq: true }
      }
      order_by: { updatedAt: desc }
      limit: $limit
    ) {
      id
      grade
      type
      attrs
      version
      createdAt
      updatedAt
      path
      campus
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        createdAt
        endAt
        status
      }
      group {
        id
        status
        captainId
        members: groupUsers {
          user {
            id
            login
          }
          confirmed
        }
      }
      # Related audits
      audits {
        id
        grade
        createdAt
        auditor {
          id
          login
        }
      }
    }

    # Project attempts (all results, not just final)
    project_attempts: result_aggregate(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: $objectType } }
      }
    ) {
      aggregate {
        count
      }
    }

    # Projects by difficulty/XP earned
    project_xp: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        object: { type: { _eq: $objectType } }
      }
      order_by: { amount: desc }
    ) {
      amount
      createdAt
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

// ============================================================================
// NEW COMPREHENSIVE QUERIES FOR MISSING DATA TYPES
// ============================================================================

// User events and registrations query
export const GET_USER_EVENTS = gql`
  query GetUserEvents($userId: Int!, $limit: Int = 50, $offset: Int = 0, $status: String = null) {
    # Events user is registered for
    user_events: eventUser(
      where: { userId: { _eq: $userId } }
      order_by: { event: { createdAt: desc } }
      limit: $limit
      offset: $offset
    ) {
      id
      createdAt
      event {
        id
        path
        status
        createdAt
        endAt
        code
        campus
        object {
          id
          name
          type
          attrs
        }
        parent {
          id
          path
          object {
            name
            type
          }
        }
        registration {
          id
          startAt
          endAt
          eventStartAt
          attrs
        }
      }
    }

    # User registrations
    user_registrations: registrationUser(
      where: { userId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      createdAt
      registration {
        id
        startAt
        endAt
        eventStartAt
        path
        campus
        attrs
        object {
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

    # Event statistics
    event_stats: eventUser_aggregate(
      where: { userId: { _eq: $userId } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

// User groups and team activities query
export const GET_USER_GROUPS = gql`
  query GetUserGroups($userId: Int!, $limit: Int = 50, $offset: Int = 0, $status: String = null) {
    # Groups user is member of
    user_groups: groupUser(
      where: {
        userId: { _eq: $userId }
        confirmed: { _eq: true }
      }
      order_by: { group: { createdAt: desc } }
      limit: $limit
      offset: $offset
    ) {
      id
      confirmed
      createdAt
      updatedAt
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
          profile
        }
        object {
          id
          name
          type
          attrs
        }
        event {
          id
          path
          createdAt
          endAt
          status
        }
        members: groupUsers {
          user {
            id
            login
            profile
          }
          confirmed
          createdAt
        }
        # Group progress and results
        progresses {
          id
          grade
          isDone
          createdAt
          updatedAt
        }
        results {
          id
          grade
          type
          createdAt
          updatedAt
        }
        # Group audits
        audits {
          id
          grade
          createdAt
          auditor {
            id
            login
          }
        }
      }
    }

    # Groups where user is captain
    captain_groups: group(
      where: { captainId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      status
      path
      campus
      createdAt
      updatedAt
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        status
      }
      members: groupUsers {
        user {
          id
          login
          profile
        }
        confirmed
        createdAt
      }
    }

    # Group statistics
    group_stats: groupUser_aggregate(
      where: {
        userId: { _eq: $userId }
        confirmed: { _eq: true }
      }
    ) {
      aggregate {
        count
      }
    }

    captain_stats: group_aggregate(
      where: { captainId: { _eq: $userId } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

// User matches and betting system query
export const GET_USER_MATCHES = gql`
  query GetUserMatches($userId: Int!, $limit: Int = 50, $offset: Int = 0) {
    # Matches where user is involved
    user_matches: match(
      where: {
        _or: [
          { userId: { _eq: $userId } }
          { matchId: { _eq: $userId } }
        ]
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      bet
      result
      confirmed
      createdAt
      updatedAt
      path
      campus
      # The user who initiated the match
      user {
        id
        login
        profile
      }
      # The matched user
      matchedUser: userByMatchId {
        id
        login
        profile
      }
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        createdAt
        endAt
        status
      }
    }

    # Match statistics
    match_stats: match_aggregate(
      where: {
        _or: [
          { userId: { _eq: $userId } }
          { matchId: { _eq: $userId } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }

    # Successful bets
    successful_bets: match_aggregate(
      where: {
        userId: { _eq: $userId }
        result: { _eq: true }
      }
    ) {
      aggregate {
        count
      }
    }

    # Failed bets
    failed_bets: match_aggregate(
      where: {
        userId: { _eq: $userId }
        result: { _eq: false }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

// Comprehensive object and curriculum structure query
export const GET_OBJECT_DETAILS = gql`
  query GetObjectDetails($objectId: Int!, $userId: Int = null) {
    object(where: { id: { _eq: $objectId } }) {
      id
      name
      type
      status
      attrs
      childrenAttrs
      createdAt
      updatedAt
      externalRelationUrl
      campus
      referencedAt
      # Basic object information only
      # Reference relationships
      reference {
        id
        name
        type
        attrs
      }
      referencedBy: objectsByReferenceId {
        id
        name
        type
        campus
        referencedAt
      }
      # Author information
      author {
        id
        login
        profile
      }
      # Related events
      events {
        id
        path
        status
        createdAt
        endAt
        campus
      }
      # User-specific data (if userId provided)
      userProgress: progresses(
        where: { userId: { _eq: $userId } }
        order_by: { updatedAt: desc }
        limit: 1
      ) {
        id
        grade
        isDone
        version
        createdAt
        updatedAt
      }
      userResults: results(
        where: { userId: { _eq: $userId } }
        order_by: { updatedAt: desc }
        limit: 5
      ) {
        id
        grade
        type
        createdAt
        updatedAt
      }
      userTransactions: transactions(
        where: { userId: { _eq: $userId } }
        order_by: { createdAt: desc }
      ) {
        id
        type
        amount
        createdAt
      }
    }
  }
`;

// Advanced search and filtering query
export const ADVANCED_SEARCH = gql`
  query AdvancedSearch(
    $searchTerm: String!
    $searchType: String = "all"
    $limit: Int = 20
    $offset: Int = 0
    $userId: Int = null
  ) {
    # Search users
    users: user(
      where: {
        _or: [
          { login: { _ilike: $searchTerm } }
          { profile: { _ilike: $searchTerm } }
          { attrs: { _ilike: $searchTerm } }
        ]
      }
      limit: $limit
      offset: $offset
    ) {
      id
      login
      profile
      attrs
      createdAt
      campus
      # User statistics
      totalXP: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }

    # Search objects/projects
    objects: object(
      where: {
        _or: [
          { name: { _ilike: $searchTerm } }
          { attrs: { _ilike: $searchTerm } }
        ]
      }
      limit: $limit
      offset: $offset
    ) {
      id
      name
      type
      attrs
      campus
      createdAt
      # User progress on this object (if userId provided)
      userProgress: progresses(
        where: { userId: { _eq: $userId } }
        limit: 1
      ) {
        grade
        isDone
        updatedAt
      }
    }

    # Search events
    events: event(
      where: {
        _or: [
          { path: { _ilike: $searchTerm } }
          { object: { name: { _ilike: $searchTerm } } }
        ]
      }
      limit: $limit
      offset: $offset
    ) {
      id
      path
      status
      createdAt
      endAt
      campus
      object {
        id
        name
        type
      }
      # User participation (if userId provided)
      userParticipation: eventUsers(
        where: { userId: { _eq: $userId } }
        limit: 1
      ) {
        createdAt
      }
    }
  }
`;

// User performance analytics query
export const GET_USER_ANALYTICS = gql`
  query GetUserAnalytics($userId: Int!) {
    # Time-based performance metrics
    daily_xp: transaction(
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

    # Skill progression over time
    skill_progression: transaction(
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
        attrs
      }
    }

    # Project completion timeline
    project_timeline: result(
      where: {
        userId: { _eq: $userId }
        object: { type: { _in: ["project", "exercise", "quest"] } }
        isLast: { _eq: true }
      }
      order_by: { createdAt: asc }
    ) {
      id
      grade
      type
      createdAt
      path
      object {
        name
        type
        attrs
      }
    }

    # Audit performance over time
    audit_timeline: audit(
      where: {
        _or: [
          { auditorId: { _eq: $userId } }
          { group: { groupUsers: { userId: { _eq: $userId } } } }
        ]
      }
      order_by: { createdAt: asc }
    ) {
      id
      grade
      createdAt
      auditor {
        id
        login
      }
      group {
        object {
          name
          type
        }
      }
    }

    # Activity patterns
    activity_by_hour: transaction(
      where: {
        userId: { _eq: $userId }
      }
    ) {
      createdAt
      type
      amount
    }

    # Performance benchmarks
    user_ranking: user(
      order_by: {
        transactions_aggregate: {
          sum: { amount: desc }
        }
      }
      where: {
        transactions: {
          type: { _eq: "xp" }
        }
      }
      limit: 100
    ) {
      id
      login
      totalXP: transactions_aggregate(
        where: {
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
  }
`;

// Leaderboard and comparison queries
export const GET_LEADERBOARD = gql`
  query GetLeaderboard($limit: Int = 50, $campus: String = null, $objectType: String = null) {
    # XP Leaderboard
    xp_leaderboard: user(
      where: {
        campus: { _eq: $campus }
        transactions: { type: { _eq: "xp" } }
      }
      order_by: {
        transactions_aggregate: {
          sum: { amount: desc }
        }
      }
      limit: $limit
    ) {
      id
      login
      profile
      campus
      createdAt
      totalXP: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          sum {
            amount
          }
          count
        }
      }
      projectsCompleted: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          grade: { _gte: 1 }
          isLast: { _eq: true }
        }
      ) {
        aggregate {
          count
        }
      }
      auditsGiven: audits_aggregate {
        aggregate {
          count
        }
      }
    }

    # Project completion leaderboard
    project_leaderboard: user(
      where: {
        campus: { _eq: $campus }
        results: {
          object: { type: { _eq: $objectType } }
          grade: { _gte: 1 }
          isLast: { _eq: true }
        }
      }
      order_by: {
        results_aggregate: {
          count: desc
        }
      }
      limit: $limit
    ) {
      id
      login
      profile
      campus
      projectsCompleted: results_aggregate(
        where: {
          object: { type: { _eq: $objectType } }
          grade: { _gte: 1 }
          isLast: { _eq: true }
        }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }
    }

    # Audit ratio leaderboard
    audit_leaderboard: user(
      where: {
        campus: { _eq: $campus }
        audits: { id: { _is_null: false } }
      }
      limit: $limit
    ) {
      id
      login
      profile
      campus
      auditsGiven: audits_aggregate {
        aggregate {
          count
          avg {
            grade
          }
        }
      }
      auditsReceived: auditsByGroupUserId_aggregate {
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

// User comparison query
export const COMPARE_USERS = gql`
  query CompareUsers($userIds: [Int!]!) {
    users: user(where: { id: { _in: $userIds } }) {
      id
      login
      profile
      campus
      createdAt

      # XP Statistics
      totalXP: transactions_aggregate(
        where: {
          type: { _eq: "xp" }
        }
      ) {
        aggregate {
          sum {
            amount
          }
          count
          avg {
            amount
          }
        }
      }

      # Project Statistics
      projectStats: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          isLast: { _eq: true }
        }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }

      passedProjects: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          grade: { _gte: 1 }
          isLast: { _eq: true }
        }
      ) {
        aggregate {
          count
        }
      }

      # Audit Statistics
      auditsGiven: audits_aggregate {
        aggregate {
          count
          avg {
            grade
          }
        }
      }

      auditsReceived: auditsByGroupUserId_aggregate {
        aggregate {
          count
          avg {
            grade
          }
        }
      }

      # Activity Timeline
      recentActivity: transactions(
        order_by: { createdAt: desc }
        limit: 10
      ) {
        type
        amount
        createdAt
        object {
          name
          type
        }
      }
    }
  }
`;
