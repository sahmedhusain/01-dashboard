import{e}from"./apollo-vendor-8AJvV5pX.js";e`
  query GetAllAudits {
    audit {
      id
      groupId
      auditorId
      attrs
      grade
      createdAt
      updatedAt
      resultId
      version
      endAt
    }
  }
`;e`
  query GetAuditAggregates {
    audit_aggregate {
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
`;e`
  query GetAuditByPk($id: Int!) {
    audit_by_pk(id: $id) {
      id
      groupId
      auditorId
      grade
      createdAt
      updatedAt
    }
  }
`;e`
  query GetAuditPrivate {
    audit_private {
      grade
      createdAt
      updatedAt
    }
  }
`;e`
  query GetAllEvents {
    event {
      id
      createdAt
      endAt
      objectId
      parentId
      path
      campus
    }
  }
`;e`
  query GetEventAggregates {
    event_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetEventByPk($id: Int!) {
    event_by_pk(id: $id) {
      id
      createdAt
      endAt
      objectId
      path
      campus
    }
  }
`;e`
  query GetAllEventUsers {
    event_user {
      id
      createdAt
      userId
      eventId
      level
    }
  }
`;e`
  query GetEventUserAggregates {
    event_user_aggregate {
      aggregate {
        count
        avg {
          level
        }
        max {
          level
        }
        min {
          level
        }
      }
    }
  }
`;e`
  query GetEventUserByPk($id: Int!) {
    event_user_by_pk(id: $id) {
      id
      userId
      eventId
      level
      createdAt
    }
  }
`;e`
  query GetEventUserView {
    event_user_view {
      id
      eventId
    }
  }
`;e`
  query GetEventUserViewAggregates {
    event_user_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetAllObjects {
    object {
      id
      name
      type
      attrs
      createdAt
      updatedAt
      campus
      authorId
    }
  }
`;e`
  query GetObjectAggregates {
    object_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetObjectByPk($id: Int!) {
    object_by_pk(id: $id) {
      id
      name
      type
      attrs
      createdAt
      updatedAt
      campus
      authorId
    }
  }
`;e`
  query GetObjectAvailability {
    object_availability {
      id
      userId
    }
  }
`;e`
  query GetObjectAvailabilityAggregates {
    object_availability_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetObjectAvailabilityByPk($id: Int!) {
    object_availability_by_pk(id: $id) {
      id
      userId
    }
  }
`;e`
  query GetAllObjectChildren {
    object_child {
      id
      parentId
      childId
      attrs
      key
      index
    }
  }
`;e`
  query GetObjectChildAggregates {
    object_child_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetObjectChildByPk($id: Int!) {
    object_child_by_pk(id: $id) {
      id
      parentId
      childId
      attrs
      key
      index
    }
  }
`;e`
  query GetObjectTypes {
    object_type {
      type
    }
  }
`;e`
  query GetObjectTypeAggregates {
    object_type_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetObjectTypeByPk($type: String!) {
    object_type_by_pk(type: $type) {
      type
    }
  }
`;e`
  query GetAllPaths {
    path {
      path
      updatedAt
    }
  }
`;e`
  query GetPathAggregates {
    path_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetPathByPk($path: String!) {
    path_by_pk(path: $path) {
      path
      updatedAt
    }
  }
`;e`
  query GetPathArchive {
    path_archive {
      id
      path
      createdAt
      updatedAt
    }
  }
`;e`
  query GetPathArchiveAggregates {
    path_archive_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetPathArchiveByPk($id: Int!) {
    path_archive_by_pk(id: $id) {
      id
      path
      createdAt
      updatedAt
    }
  }
`;e`
  query GetAllProgress {
    progress {
      id
      createdAt
      updatedAt
      userId
      groupId
      eventId
      version
      grade
      isDone
      path
      campus
      objectId
    }
  }
`;e`
  query GetProgressAggregates {
    progress_aggregate {
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
`;e`
  query GetProgressByPk($id: bigint!) {
    progress_by_pk(id: $id) {
      id
      userId
      grade
      isDone
      path
      createdAt
      updatedAt
    }
  }
`;e`
  query GetProgressByPathView {
    progress_by_path_view {
      path
      userId
      createdAt
    }
  }
`;e`
  query GetProgressByPathViewAggregates {
    progress_by_path_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetAllRecords {
    record {
      id
      message
      createdAt
      authorId
      userId
    }
  }
`;e`
  query GetRecordByPk($id: Int!) {
    record_by_pk(id: $id) {
      id
      message
      createdAt
      authorId
      userId
    }
  }
`;e`
  query GetRecordPublicView {
    record_public_view {
      authorLogin
      userLogin
    }
  }
`;e`
  query GetRecordPublicViewAggregates {
    record_public_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetRecordTypes {
    record_type {
      type
      description
    }
  }
`;e`
  query GetRecordTypeByPk($type: String!) {
    record_type_by_pk(type: $type) {
      type
      description
    }
  }
`;e`
  query GetAllRegistrations {
    registration {
      id
      createdAt
      startAt
      endAt
      objectId
      path
      campus
    }
  }
`;e`
  query GetRegistrationAggregates {
    registration_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetRegistrationByPk($id: Int!) {
    registration_by_pk(id: $id) {
      id
      createdAt
      startAt
      endAt
      objectId
      path
      campus
    }
  }
`;e`
  query GetAllRegistrationUsers {
    registration_user {
      id
      createdAt
      registrationId
      userId
    }
  }
`;e`
  query GetRegistrationUserAggregates {
    registration_user_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetRegistrationUserByPk($id: Int!) {
    registration_user_by_pk(id: $id) {
      id
      createdAt
      registrationId
      userId
    }
  }
`;e`
  query GetRegistrationUserView {
    registration_user_view {
      id
      registrationId
    }
  }
`;e`
  query GetRegistrationUserViewAggregates {
    registration_user_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetAllResults {
    result {
      id
      createdAt
      updatedAt
      grade
      attrs
      type
      userId
      groupId
      objectId
      path
      version
      eventId
      isLast
      campus
    }
  }
`;e`
  query GetResultAggregates {
    result_aggregate {
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
`;e`
  query GetResultByPk($id: Int!) {
    result_by_pk(id: $id) {
      id
      grade
      type
      userId
      path
      createdAt
      updatedAt
    }
  }
`;e`
  query GetAllRoles {
    role {
      id
      slug
      name
      description
      createdAt
      updatedAt
      user_roles {
        id
        userId
        roleId
      }
    }
  }
`;e`
  query GetRoleAggregates {
    role_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetRoleByPk($id: Int!) {
    role_by_pk(id: $id) {
      id
      slug
      name
      description
      createdAt
      updatedAt
    }
  }
`;e`
  query GetAllTasks {
    task {
      id
      name
      createdAt
      updatedAt
    }
  }
`;e`
  query GetTaskByPk($id: Int!) {
    task_by_pk(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;e`
  query GetAllTiming {
    timing {
      updatedAt
    }
  }
`;e`
  query GetAllTransactions {
    transaction {
      id
      type
      amount
      userId
      attrs
      createdAt
      path
      objectId
      eventId
      campus
    }
  }
`;e`
  query GetTransactionAggregates {
    transaction_aggregate {
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
`;e`
  query GetTransactionByPk($id: Int!) {
    transaction_by_pk(id: $id) {
      id
      type
      amount
      userId
      createdAt
      path
    }
  }
`;e`
  query GetTransactionTypes {
    transaction_type {
      type
    }
  }
`;e`
  query GetTransactionTypeAggregates {
    transaction_type_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetTransactionTypeByPk($type: String!) {
    transaction_type_by_pk(type: $type) {
      type
    }
  }
`;e`
  query GetAllUsers {
    user {
      id
      login
      firstName
      lastName
      profile
      attrs
      createdAt
      updatedAt
      campus
      auditRatio
      totalUp
      totalDown
    }
  }
`;e`
  query GetUserAggregates {
    user_aggregate {
      aggregate {
        count
        avg {
          auditRatio
          totalUp
          totalDown
        }
        max {
          auditRatio
          totalUp
          totalDown
        }
        min {
          auditRatio
          totalUp
          totalDown
        }
        sum {
          totalUp
          totalDown
        }
      }
    }
  }
`;const r=e`
  query GetUserByPk($id: Int!) {
    user_by_pk(id: $id) {
      id
      login
      firstName
      lastName
      profile
      attrs
      createdAt
      updatedAt
      campus
      auditRatio
      totalUp
      totalDown
    }
  }
`;e`
  query GetUserPublicView {
    user_public_view {
      id
      login
      firstName
      lastName
      profile
      campus
    }
  }
`;e`
  query GetAllUserRoles {
    user_role {
      id
      userId
      roleId
    }
  }
`;e`
  query GetUserRoleAggregates {
    user_role_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetUserRoleByPk($id: Int!) {
    user_role_by_pk(id: $id) {
      id
      userId
      roleId
    }
  }
`;e`
  query GetUserRolesView {
    user_roles_view {
      id
    }
  }
`;e`
  query GetUserRolesViewAggregates {
    user_roles_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetXPView {
    xp_view {
      userId
    }
  }
`;e`
  query GetAllGroups {
    group {
      id
      objectId
      eventId
      captainId
      createdAt
      updatedAt
      status
      path
      campus
    }
  }
`;e`
  query GetGroupAggregates {
    group_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetGroupByPk($id: Int!) {
    group_by_pk(id: $id) {
      id
      objectId
      eventId
      captainId
      status
      path
      campus
      createdAt
    }
  }
`;e`
  query GetAllGroupUsers {
    group_user {
      id
      userId
      groupId
      createdAt
      updatedAt
    }
  }
`;e`
  query GetGroupUserAggregates {
    group_user_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetGroupUserByPk($id: Int!) {
    group_user_by_pk(id: $id) {
      id
      userId
      groupId
      createdAt
      updatedAt
    }
  }
`;e`
  query GetLabelAggregates {
    label_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetLabelByPk($id: Int!) {
    label_by_pk(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;const a=e`
  query GetAllLabelUsers {
    label_user {
      id
      labelId
      userId
      label {
        id
        name
        description
      }
    }
  }
`;e`
  query GetLabelUserAggregates {
    label_user_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetLabelUserByPk($id: Int!) {
    label_user_by_pk(id: $id) {
      id
      labelId
      userId
      createdAt
    }
  }
`;e`
  query GetAllMarkdown {
    markdown {
      name
      content
      createdAt
      updatedAt
    }
  }
`;e`
  query GetMarkdownByPk($name: String!) {
    markdown_by_pk(name: $name) {
      name
      content
      createdAt
      updatedAt
    }
  }
`;e`
  query GetAllMatches {
    match {
      id
      createdAt
      updatedAt
      attrs
      status
      type
    }
  }
`;e`
  query GetMatchAggregates {
    match_aggregate {
      aggregate {
        count
      }
    }
  }
`;e`
  query GetMatchByPk($id: Int!) {
    match_by_pk(id: $id) {
      id
      createdAt
      updatedAt
      attrs
      status
      type
    }
  }
`;e`
  query GetGroupsWithMembers {
    group {
      id
      objectId
      eventId
      captainId
      status
      path
      campus
      createdAt
      updatedAt
    }
  }
`;e`
  query GetGroupMembersByGroupId($groupId: Int!) {
    group_user(where: {groupId: {_eq: $groupId}}) {
      id
      userId
      groupId
      createdAt
      updatedAt
    }
  }
`;e`
  query GetUserGroupsByUserId($userId: Int!) {
    group_user(where: {userId: {_eq: $userId}}) {
      id
      groupId
      createdAt
      updatedAt
    }
  }
`;e`
  query GetGroupCaptains {
    group(where: {captainId: {_is_null: false}}) {
      id
      captainId
      status
      path
      campus
      objectId
      eventId
    }
  }
`;e`
  query GetActiveGroupsWithMembers {
    group {
      id
      status
      path
      campus
      captainId
      createdAt
    }
  }
`;e`
  query GetEventsWithParticipants {
    event {
      id
      path
      campus
      createdAt
      endAt
      objectId
    }
  }
`;e`
  query GetEventParticipantsByEventId($eventId: Int!) {
    event_user(where: {eventId: {_eq: $eventId}}) {
      id
      userId
      eventId
      level
      createdAt
    }
  }
`;e`
  query GetUserEventParticipation($userId: Int!) {
    event_user(where: {userId: {_eq: $userId}}) {
      id
      eventId
      level
      createdAt
    }
  }
`;e`
  query GetAuditsWithDetails {
    audit {
      id
      groupId
      auditorId
      grade
      createdAt
      updatedAt
      resultId
      version
      endAt
      attrs
    }
  }
`;e`
  query GetAuditsByAuditor($auditorId: Int!) {
    audit(where: {auditorId: {_eq: $auditorId}}) {
      id
      groupId
      grade
      createdAt
      attrs
      version
    }
  }
`;e`
  query GetAuditsByGroup($groupId: Int!) {
    audit(where: {groupId: {_eq: $groupId}}) {
      id
      auditorId
      grade
      createdAt
      updatedAt
      version
      endAt
    }
  }
`;e`
  query GetProgressWithDetails {
    progress {
      id
      userId
      groupId
      eventId
      objectId
      grade
      isDone
      path
      campus
      createdAt
      updatedAt
      version
    }
  }
`;e`
  query GetUserProgressDetailed($userId: Int!) {
    progress(where: {userId: {_eq: $userId}}, order_by: {createdAt: desc}) {
      id
      grade
      isDone
      path
      createdAt
      updatedAt
      version
    }
  }
`;e`
  query GetProgressByPath {
    progress(where: {path: {_like: "%bahrain%"}}) {
      id
      userId
      grade
      isDone
      createdAt
      path
    }
  }
`;e`
  query GetResultsWithDetails {
    result {
      id
      userId
      groupId
      objectId
      eventId
      grade
      type
      path
      campus
      createdAt
      updatedAt
      version
      isLast
      attrs
    }
  }
`;e`
  query GetUserResultsDetailed($userId: Int!) {
    result(where: {userId: {_eq: $userId}}, order_by: {createdAt: desc}) {
      id
      grade
      type
      path
      createdAt
      isLast
    }
  }
`;e`
  query GetResultsByObject($objectId: Int!) {
    result(where: {objectId: {_eq: $objectId}}) {
      id
      userId
      groupId
      grade
      type
      createdAt
    }
  }
`;e`
  query GetTransactionsWithDetails {
    transaction {
      id
      type
      amount
      userId
      objectId
      eventId
      path
      campus
      createdAt
      attrs
    }
  }
`;e`
  query GetUserTransactionsDetailed($userId: Int!) {
    transaction(where: {userId: {_eq: $userId}}, order_by: {createdAt: desc}) {
      id
      type
      amount
      path
      createdAt
      attrs
    }
  }
`;e`
  query GetUserTransactions($userId: Int!) {
    transaction(where: {userId: {_eq: $userId}}, order_by: {createdAt: desc}) {
      id
      type
      amount
      userId
      attrs
      createdAt
      path
      objectId
    }
  }
`;e`
  query GetXPTransactionsDetailed {
    transaction(where: {type: {_eq: "xp"}}, order_by: {amount: desc}) {
      id
      amount
      userId
      path
      createdAt
    }
  }
`;e`
  query GetObjectsWithChildren {
    object {
      id
      name
      type
      attrs
      campus
      createdAt
      updatedAt
      authorId
    }
  }
`;e`
  query GetObjectHierarchy($objectId: Int!) {
    object_by_pk(id: $objectId) {
      id
      name
      type
      attrs
    }
  }
`;e`
  query GetAuditTransactions($userId: Int!) {
    transaction(where: {userId: {_eq: $userId}, type: {_eq: "xp"}, _or: [{path: {_like: "%/auditor"}}, {path: {_like: "%/auditee"}}]}) {
      amount
      path
      createdAt
    }
  }
`;e`
  query GetTotalXPByModule($userId: Int!) {
    # Total XP for BH Module
    bhModuleXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    
    # Total XP for all modules/events
    totalXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    
    # Total XP for piscines
    piscineXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        event: { path: { _like: "%piscine%" } }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    
    # Total XP for checkpoints
    checkpointXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        event: { path: { _like: "%checkpoint%" } }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;e`
  query GetBasicEventUsers {
    event_user(
      where: {
        event: {
          path: { _eq: "/bahrain/bh-module" }
        }
      }
      order_by: { level: desc }
    ) {
      id
      userId
      eventId
      level
      createdAt
    }
  }
`;e`
  query GetDetailedEventUsersView {
    event_user_view(
      where: {
        event: {
          path: { _eq: "/bahrain/bh-module" }
        }
      }
    ) {
      userId
      userLogin
      userName
      userAuditRatio
      totalUp
      totalDown
      xp {
        amount
      }
    }
  }
`;e`
  query GetBhModuleStats {
    event_user_aggregate(
      where: {
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
    ) {
      aggregate {
        count
        max {
          level
        }
        avg {
          level
        }
      }
    }
  }
`;const d=e`
  query GetAllLabels {
    label(
      order_by: { name: asc }
    ) {
      id
      name
      description
    }
  }
`;e`
  query GetUserLabels {
    label_user {
      id
      userId
      labelId
      label {
        id
        name
        description
      }
    }
  }
`;e`
  query GetLeaderboardByCohort($pathFilter: String!, $limit: Int = 100) {
    cohortUsers: event_user(
      where: { 
        event: { 
          path: { _like: $pathFilter }
        }
      }
      order_by: { level: desc }
      limit: $limit
    ) {
      id
      userId
      level
      createdAt
      event {
        id
        path
        createdAt
      }
      user {
        id
        login
        firstName
        lastName
        profile
        attrs
        auditRatio
        totalUp
        totalDown
        createdAt
        updatedAt
      }
    }
    
    # Get XP totals for these users
    cohortXP: transaction_aggregate(
      where: { 
        type: { _eq: "xp" }
        event: { path: { _like: $pathFilter } }
      }
    ) {
      nodes {
        userId
        amount
        path
      }
      aggregate {
        sum {
          amount
        }
        avg {
          amount
        }
        count
      }
    }
  }
`;e`
  query GetLeaderboardStatistics {
    # Total users across all events
    totalEventUsers: event_user_aggregate {
      aggregate {
        count
        max {
          level
        }
        avg {
          level
        }
      }
    }
    
    # BH Module specific stats
    bhModuleStats: event_user_aggregate(
      where: {
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
    ) {
      aggregate {
        count
        max {
          level
        }
        avg {
          level
        }
      }
    }
    
    # Cohort breakdown
    cohort1Stats: event_user_aggregate(
      where: {
        event: { path: { _like: "%cohort-1%" } }
      }
    ) {
      aggregate {
        count
        max {
          level
        }
        avg {
          level
        }
      }
    }
    
    cohort2Stats: event_user_aggregate(
      where: {
        event: { path: { _like: "%cohort-2%" } }
      }
    ) {
      aggregate {
        count
        max {
          level
        }
        avg {
          level
        }
      }
    }
    
    # XP statistics
    totalXPStats: transaction_aggregate(
      where: { type: { _eq: "xp" } }
    ) {
      aggregate {
        sum {
          amount
        }
        avg {
          amount
        }
        max {
          amount
        }
        count
      }
    }
    
    # Audit statistics
    auditStats: user_aggregate {
      aggregate {
        avg {
          auditRatio
          totalUp
          totalDown
        }
        max {
          auditRatio
          totalUp
          totalDown
        }
        count
      }
    }
  }
`;e`
  query GetLevelLeaderboard($minLevel: Int = 1, $pathFilter: String = "%", $limit: Int = 100) {
    levelLeaderboard: event_user(
      where: { 
        level: { _gte: $minLevel }
        event: { path: { _like: $pathFilter } }
      }
      order_by: { level: desc }
      limit: $limit
    ) {
      id
      userId
      level
      createdAt
      event {
        id
        path
        createdAt
      }
      user {
        id
        login
        firstName
        lastName
        profile
        attrs
        auditRatio
        totalUp
        totalDown
        createdAt
        updatedAt
      }
    }
  }
`;const s=e`
  query GetComprehensiveLeaderboardData {
    # Get BH Module event users with audit ratios and user logins
    bhModuleUsers: event_user(
      where: {
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
      order_by: { level: desc }
    ) {
      id
      userId
      eventId
      level
      createdAt
      userLogin
      userAuditRatio
      userName
      event {
        id
        path
        campus
      }
    }
    
    # Get ALL users for basic information
    allUsersWithEvents: user {
      id
      login
      firstName
      lastName
      profile
      attrs
      auditRatio
      totalUp
      totalDown
      createdAt
      updatedAt
    }
    
    # Get ALL event_user relationships for dynamic cohort mapping
    allEventUsers: event_user {
      id
      userId
      eventId
      level
      createdAt
      event {
        id
        path
        campus
      }
    }
    
    # Fallback: Get public user data (names and logins)
    publicUsers: user_public_view {
      id
      login
      firstName
      lastName
      profile
      campus
    }
    
    # BH Module statistics
    bhModuleStats: event_user_aggregate(
      where: {
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
    ) {
      aggregate {
        count
        max {
          level
        }
        avg {
          level
        }
      }
    }
    
    # Get ALL user label assignments (from label_user table)
    userLabels: label_user(
      order_by: { id: asc }
    ) {
      id
      userId
      labelId
      createdAt
      label {
        id
        name
        description
        createdAt
      }
    }
  }
`;export{s as G,a,d as b,r as c};
