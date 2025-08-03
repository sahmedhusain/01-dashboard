import { gql } from '@apollo/client';

export const GET_ALL_AUDITS = gql`
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
`;

export const GET_AUDIT_AGGREGATES = gql`
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
`;

export const GET_AUDIT_BY_PK = gql`
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
`;

export const GET_AUDIT_PRIVATE = gql`
  query GetAuditPrivate {
    audit_private {
      grade
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_EVENTS = gql`
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
`;

export const GET_EVENT_AGGREGATES = gql`
  query GetEventAggregates {
    event_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_EVENT_BY_PK = gql`
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
`;

export const GET_ALL_EVENT_USERS = gql`
  query GetAllEventUsers {
    event_user {
      id
      createdAt
      userId
      eventId
      level
    }
  }
`;

export const GET_EVENT_USER_AGGREGATES = gql`
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
`;

export const GET_EVENT_USER_BY_PK = gql`
  query GetEventUserByPk($id: Int!) {
    event_user_by_pk(id: $id) {
      id
      userId
      eventId
      level
      createdAt
    }
  }
`;

export const GET_EVENT_USER_VIEW = gql`
  query GetEventUserView {
    event_user_view {
      id
      eventId
    }
  }
`;

export const GET_EVENT_USER_VIEW_AGGREGATES = gql`
  query GetEventUserViewAggregates {
    event_user_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_ALL_OBJECTS = gql`
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
`;

export const GET_OBJECT_AGGREGATES = gql`
  query GetObjectAggregates {
    object_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_OBJECT_BY_PK = gql`
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
`;

export const GET_OBJECT_AVAILABILITY = gql`
  query GetObjectAvailability {
    object_availability {
      id
      userId
    }
  }
`;

export const GET_OBJECT_AVAILABILITY_AGGREGATES = gql`
  query GetObjectAvailabilityAggregates {
    object_availability_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_OBJECT_AVAILABILITY_BY_PK = gql`
  query GetObjectAvailabilityByPk($id: Int!) {
    object_availability_by_pk(id: $id) {
      id
      userId
    }
  }
`;

export const GET_ALL_OBJECT_CHILDREN = gql`
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
`;

export const GET_OBJECT_CHILD_AGGREGATES = gql`
  query GetObjectChildAggregates {
    object_child_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_OBJECT_CHILD_BY_PK = gql`
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
`;

export const GET_OBJECT_TYPES = gql`
  query GetObjectTypes {
    object_type {
      type
    }
  }
`;

export const GET_OBJECT_TYPE_AGGREGATES = gql`
  query GetObjectTypeAggregates {
    object_type_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_OBJECT_TYPE_BY_PK = gql`
  query GetObjectTypeByPk($type: String!) {
    object_type_by_pk(type: $type) {
      type
    }
  }
`;

export const GET_ALL_PATHS = gql`
  query GetAllPaths {
    path {
      path
      updatedAt
    }
  }
`;

export const GET_PATH_AGGREGATES = gql`
  query GetPathAggregates {
    path_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_PATH_BY_PK = gql`
  query GetPathByPk($path: String!) {
    path_by_pk(path: $path) {
      path
      updatedAt
    }
  }
`;

export const GET_PATH_ARCHIVE = gql`
  query GetPathArchive {
    path_archive {
      id
      path
      createdAt
      updatedAt
    }
  }
`;

export const GET_PATH_ARCHIVE_AGGREGATES = gql`
  query GetPathArchiveAggregates {
    path_archive_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_PATH_ARCHIVE_BY_PK = gql`
  query GetPathArchiveByPk($id: Int!) {
    path_archive_by_pk(id: $id) {
      id
      path
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_PROGRESS = gql`
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
`;

export const GET_PROGRESS_AGGREGATES = gql`
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
`;

export const GET_PROGRESS_BY_PK = gql`
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
`;

export const GET_PROGRESS_BY_PATH_VIEW = gql`
  query GetProgressByPathView {
    progress_by_path_view {
      path
      userId
      createdAt
    }
  }
`;

export const GET_PROGRESS_BY_PATH_VIEW_AGGREGATES = gql`
  query GetProgressByPathViewAggregates {
    progress_by_path_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_ALL_RECORDS = gql`
  query GetAllRecords {
    record {
      id
      message
      createdAt
      authorId
      userId
    }
  }
`;

export const GET_RECORD_BY_PK = gql`
  query GetRecordByPk($id: Int!) {
    record_by_pk(id: $id) {
      id
      message
      createdAt
      authorId
      userId
    }
  }
`;

export const GET_RECORD_PUBLIC_VIEW = gql`
  query GetRecordPublicView {
    record_public_view {
      authorLogin
      userLogin
    }
  }
`;

export const GET_RECORD_PUBLIC_VIEW_AGGREGATES = gql`
  query GetRecordPublicViewAggregates {
    record_public_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_RECORD_TYPES = gql`
  query GetRecordTypes {
    record_type {
      type
      description
    }
  }
`;

export const GET_RECORD_TYPE_BY_PK = gql`
  query GetRecordTypeByPk($type: String!) {
    record_type_by_pk(type: $type) {
      type
      description
    }
  }
`;

export const GET_ALL_REGISTRATIONS = gql`
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
`;

export const GET_REGISTRATION_AGGREGATES = gql`
  query GetRegistrationAggregates {
    registration_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_REGISTRATION_BY_PK = gql`
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
`;

export const GET_ALL_REGISTRATION_USERS = gql`
  query GetAllRegistrationUsers {
    registration_user {
      id
      createdAt
      registrationId
      userId
    }
  }
`;

export const GET_REGISTRATION_USER_AGGREGATES = gql`
  query GetRegistrationUserAggregates {
    registration_user_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_REGISTRATION_USER_BY_PK = gql`
  query GetRegistrationUserByPk($id: Int!) {
    registration_user_by_pk(id: $id) {
      id
      createdAt
      registrationId
      userId
    }
  }
`;

export const GET_REGISTRATION_USER_VIEW = gql`
  query GetRegistrationUserView {
    registration_user_view {
      id
      registrationId
    }
  }
`;

export const GET_REGISTRATION_USER_VIEW_AGGREGATES = gql`
  query GetRegistrationUserViewAggregates {
    registration_user_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_ALL_RESULTS = gql`
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
`;

export const GET_RESULT_AGGREGATES = gql`
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
`;

export const GET_RESULT_BY_PK = gql`
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
`;

export const GET_ALL_ROLES = gql`
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
`;

export const GET_ROLE_AGGREGATES = gql`
  query GetRoleAggregates {
    role_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_ROLE_BY_PK = gql`
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
`;

export const GET_ALL_TASKS = gql`
  query GetAllTasks {
    task {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const GET_TASK_BY_PK = gql`
  query GetTaskByPk($id: Int!) {
    task_by_pk(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_TIMING = gql`
  query GetAllTiming {
    timing {
      updatedAt
    }
  }
`;

export const GET_ALL_TRANSACTIONS = gql`
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
`;

export const GET_TRANSACTION_AGGREGATES = gql`
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
`;

export const GET_TRANSACTION_BY_PK = gql`
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
`;

export const GET_TRANSACTION_TYPES = gql`
  query GetTransactionTypes {
    transaction_type {
      type
    }
  }
`;

export const GET_TRANSACTION_TYPE_AGGREGATES = gql`
  query GetTransactionTypeAggregates {
    transaction_type_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_TRANSACTION_TYPE_BY_PK = gql`
  query GetTransactionTypeByPk($type: String!) {
    transaction_type_by_pk(type: $type) {
      type
    }
  }
`;

export const GET_ALL_USERS = gql`
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
`;

export const GET_USER_AGGREGATES = gql`
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
`;

export const GET_USER_BY_PK = gql`
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
`;

export const GET_USER_PUBLIC_VIEW = gql`
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
`;

export const GET_ALL_USER_ROLES = gql`
  query GetAllUserRoles {
    user_role {
      id
      userId
      roleId
    }
  }
`;

export const GET_USER_ROLE_AGGREGATES = gql`
  query GetUserRoleAggregates {
    user_role_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_USER_ROLE_BY_PK = gql`
  query GetUserRoleByPk($id: Int!) {
    user_role_by_pk(id: $id) {
      id
      userId
      roleId
    }
  }
`;

export const GET_USER_ROLES_VIEW = gql`
  query GetUserRolesView {
    user_roles_view {
      id
    }
  }
`;

export const GET_USER_ROLES_VIEW_AGGREGATES = gql`
  query GetUserRolesViewAggregates {
    user_roles_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_XP_VIEW = gql`
  query GetXPView {
    xp_view {
      userId
    }
  }
`;

export const GET_ALL_GROUPS = gql`
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
`;

export const GET_GROUP_AGGREGATES = gql`
  query GetGroupAggregates {
    group_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_GROUP_BY_PK = gql`
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
`;

export const GET_ALL_GROUP_USERS = gql`
  query GetAllGroupUsers {
    group_user {
      id
      userId
      groupId
      createdAt
      updatedAt
    }
  }
`;

export const GET_GROUP_USER_AGGREGATES = gql`
  query GetGroupUserAggregates {
    group_user_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_GROUP_USER_BY_PK = gql`
  query GetGroupUserByPk($id: Int!) {
    group_user_by_pk(id: $id) {
      id
      userId
      groupId
      createdAt
      updatedAt
    }
  }
`;

export const GET_LABEL_AGGREGATES = gql`
  query GetLabelAggregates {
    label_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_LABEL_BY_PK = gql`
  query GetLabelByPk($id: Int!) {
    label_by_pk(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_LABEL_USERS = gql`
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
`;

export const GET_LABEL_USER_AGGREGATES = gql`
  query GetLabelUserAggregates {
    label_user_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_LABEL_USER_BY_PK = gql`
  query GetLabelUserByPk($id: Int!) {
    label_user_by_pk(id: $id) {
      id
      labelId
      userId
      createdAt
    }
  }
`;

export const GET_ALL_MARKDOWN = gql`
  query GetAllMarkdown {
    markdown {
      name
      content
      createdAt
      updatedAt
    }
  }
`;

export const GET_MARKDOWN_BY_PK = gql`
  query GetMarkdownByPk($name: String!) {
    markdown_by_pk(name: $name) {
      name
      content
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_MATCHES = gql`
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
`;

export const GET_MATCH_AGGREGATES = gql`
  query GetMatchAggregates {
    match_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_MATCH_BY_PK = gql`
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
`;

export const GET_GROUPS_WITH_MEMBERS = gql`
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
`;

export const GET_GROUP_MEMBERS_BY_GROUP_ID = gql`
  query GetGroupMembersByGroupId($groupId: Int!) {
    group_user(where: {groupId: {_eq: $groupId}}) {
      id
      userId
      groupId
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_GROUPS_BY_USER_ID = gql`
  query GetUserGroupsByUserId($userId: Int!) {
    group_user(where: {userId: {_eq: $userId}}) {
      id
      groupId
      createdAt
      updatedAt
    }
  }
`;

export const GET_GROUP_CAPTAINS = gql`
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
`;

export const GET_ACTIVE_GROUPS_WITH_MEMBERS = gql`
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
`;

export const GET_EVENTS_WITH_PARTICIPANTS = gql`
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
`;

export const GET_EVENT_PARTICIPANTS_BY_EVENT_ID = gql`
  query GetEventParticipantsByEventId($eventId: Int!) {
    event_user(where: {eventId: {_eq: $eventId}}) {
      id
      userId
      eventId
      level
      createdAt
    }
  }
`;

export const GET_USER_EVENT_PARTICIPATION = gql`
  query GetUserEventParticipation($userId: Int!) {
    event_user(where: {userId: {_eq: $userId}}) {
      id
      eventId
      level
      createdAt
    }
  }
`;

export const GET_AUDITS_WITH_DETAILS = gql`
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
`;

export const GET_AUDITS_BY_AUDITOR = gql`
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
`;

export const GET_AUDITS_BY_GROUP = gql`
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
`;

export const GET_PROGRESS_WITH_DETAILS = gql`
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
`;

export const GET_USER_PROGRESS_DETAILED = gql`
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
`;

export const GET_PROGRESS_BY_PATH = gql`
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
`;

export const GET_RESULTS_WITH_DETAILS = gql`
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
`;

export const GET_USER_RESULTS_DETAILED = gql`
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
`;

export const GET_RESULTS_BY_OBJECT = gql`
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
`;

export const GET_TRANSACTIONS_WITH_DETAILS = gql`
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
`;

export const GET_USER_TRANSACTIONS_DETAILED = gql`
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
`;

export const GET_USER_TRANSACTIONS = gql`
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
`;

export const GET_XP_TRANSACTIONS_DETAILED = gql`
  query GetXPTransactionsDetailed {
    transaction(where: {type: {_eq: "xp"}}, order_by: {amount: desc}) {
      id
      amount
      userId
      path
      createdAt
    }
  }
`;

export const GET_OBJECTS_WITH_CHILDREN = gql`
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
`;

export const GET_OBJECT_HIERARCHY = gql`
  query GetObjectHierarchy($objectId: Int!) {
    object_by_pk(id: $objectId) {
      id
      name
      type
      attrs
    }
  }
`;

export const GET_AUDIT_TRANSACTIONS = gql`
  query GetAuditTransactions($userId: Int!) {
    transaction(where: {userId: {_eq: $userId}, type: {_eq: "xp"}, _or: [{path: {_like: "%/auditor"}}, {path: {_like: "%/auditee"}}]}) {
      amount
      path
      createdAt
    }
  }
`;

export const GET_TOTAL_XP_BY_MODULE = gql`
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
`;

export const GET_BASIC_EVENT_USERS = gql`
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
`;

export const GET_DETAILED_EVENT_USERS_VIEW = gql`
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
`;

export const GET_BH_MODULE_STATS = gql`
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
`;

export const GET_ALL_LABELS = gql`
  query GetAllLabels {
    label(
      order_by: { name: asc }
    ) {
      id
      name
      description
    }
  }
`;

export const GET_USER_LABELS = gql`
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
`;

export const GET_LEADERBOARD_BY_COHORT = gql`
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
`;

export const GET_LEADERBOARD_STATISTICS = gql`
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
`;

export const GET_LEVEL_LEADERBOARD = gql`
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
`;

export const GET_COMPREHENSIVE_LEADERBOARD_DATA = gql`
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
`;

export const QUERY_CATEGORIES = {
  USERS: ['GET_ALL_USERS', 'GET_USER_BY_ID', 'GET_USERS_WITH_DETAILS'],
  AUDITS: ['GET_ALL_AUDITS', 'GET_AUDIT_AGGREGATES', 'GET_AUDITS_WITH_DETAILS'],
  TRANSACTIONS: ['GET_ALL_TRANSACTIONS', 'GET_TRANSACTION_AGGREGATES', 'GET_XP_TRANSACTIONS'],
  PROJECTS: ['GET_ALL_OBJECTS', 'GET_OBJECT_TYPES', 'GET_OBJECT_AVAILABILITY'],
  PROGRESS: ['GET_ALL_PROGRESS', 'GET_ALL_RESULTS', 'GET_PROGRESS_AGGREGATES'],
  EVENTS: ['GET_ALL_EVENTS', 'GET_EVENT_USERS', 'GET_EVENT_USER_COUNTS'],
  GROUPS: ['GET_ALL_GROUPS', 'GET_GROUP_USERS', 'GET_GROUP_STATS'],
  ANALYTICS: ['GET_COMPREHENSIVE_DATA', 'GET_USER_ANALYTICS', 'GET_PERFORMANCE_DATA']
};
