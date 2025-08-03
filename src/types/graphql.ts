export interface GraphQLUser {
  id: number;
  login: string;
  firstName?: string;
  lastName?: string;
  auditRatio?: number;
  totalUp?: number;
  totalDown?: number;
  campus?: string;
  profile?: string;
  attrs?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
  transactions?: GraphQLTransaction[];
  progresses?: GraphQLProgress[];
  results?: GraphQLResult[];
  group_users?: GraphQLGroupUser[];
  event_users?: GraphQLEventUser[];
  audits?: GraphQLAudit[];
}
export interface GraphQLTransaction {
  id: number;
  type: string;
  amount: number;
  path?: string;
  campus?: string;
  attrs?: Record<string, unknown>;
  createdAt: string;
  user?: GraphQLUser;
  object?: GraphQLObject;
  event?: GraphQLEvent;
}
export interface GraphQLProgress {
  id: number;
  grade?: number;
  isDone: boolean;
  path?: string;
  version?: string;
  createdAt: string;
  updatedAt?: string;
  user?: GraphQLUser;
  object?: GraphQLObject;
  group?: GraphQLGroup;
  event?: GraphQLEvent;
}
export interface GraphQLResult {
  id: number;
  grade?: number;
  type: string;
  isLast: boolean;
  path?: string;
  version?: string;
  createdAt: string;
  user?: GraphQLUser;
  object?: GraphQLObject;
  group?: GraphQLGroup;
  event?: GraphQLEvent;
}
export interface GraphQLAudit {
  id: number;
  grade?: number;
  version?: string;
  attrs?: Record<string, unknown>;
  endAt?: string;
  createdAt: string;
  updatedAt?: string;
  auditor?: GraphQLUser;
  group?: GraphQLGroup;
  result?: GraphQLResult;
}
export interface GraphQLGroup {
  id: number;
  status: string;
  path?: string;
  campus?: string;
  createdAt: string;
  updatedAt?: string;
  captain?: GraphQLUser;
  object?: GraphQLObject;
  event?: GraphQLEvent;
  group_users?: GraphQLGroupUser[];
  progresses?: GraphQLProgress[];
  results?: GraphQLResult[];
  audits?: GraphQLAudit[];
}
export interface GraphQLEvent {
  id: number;
  path?: string;
  campus?: string;
  createdAt: string;
  endAt?: string;
  object?: GraphQLObject;
  event_users?: GraphQLEventUser[];
  groups?: GraphQLGroup[];
  transactions?: GraphQLTransaction[];
  progresses?: GraphQLProgress[];
  results?: GraphQLResult[];
}
export interface GraphQLObject {
  id: number;
  name: string;
  type: string;
  attrs?: Record<string, unknown>;
  parent?: GraphQLObject;
  children?: GraphQLObject[];
  transactions?: GraphQLTransaction[];
  progresses?: GraphQLProgress[];
  results?: GraphQLResult[];
  groups?: GraphQLGroup[];
  events?: GraphQLEvent[];
}
export interface GraphQLGroupUser {
  id: number;
  userId: number;
  groupId: number;
  createdAt: string;
  updatedAt?: string;
  user?: GraphQLUser;
  group?: GraphQLGroup;
}
export interface GraphQLEventUser {
  id: number;
  userId: number;
  eventId: number;
  level: number;
  createdAt: string;
  user?: GraphQLUser;
  event?: GraphQLEvent;
}
export interface GraphQLUserPublicView {
  id: number;
  login: string;
  firstName?: string;
  lastName?: string;
  profile?: Record<string, unknown>;
  campus?: string;
}
export interface GraphQLEventUserView {
  id: number;
  eventId: number;
}
export interface GraphQLRegistration {
  id: number;
  createdAt: string;
  startAt?: string;
  endAt?: string;
  objectId?: number;
  path?: string;
  campus?: string;
}
export interface GraphQLRegistrationUser {
  id: number;
  createdAt: string;
  registrationId: number;
  userId: number;
}
export interface GraphQLRegistrationUserView {
  id: number;
  registrationId: number;
}
export interface GraphQLObjectChild {
  id: number;
  parentId: number;
  childId: number;
  attrs?: Record<string, unknown>;
  key?: string;
  index?: number;
}
export interface GraphQLObjectAvailability {
  id: number;
  userId: number;
}
export interface GraphQLObjectType {
  type: string;
}
export interface GraphQLPath {
  path: string;
  updatedAt?: string;
}
export interface GraphQLPathArchive {
  id: number;
  path: string;
  createdAt: string;
  updatedAt?: string;
}
export interface GraphQLProgressByPathView {
  path: string;
  userId: number;
  createdAt: string;
}
export interface GraphQLRecord {
  id: number;
  message?: string;
  createdAt: string;
  authorId?: number;
  userId?: number;
}
export interface GraphQLRecordPublicView {
  authorLogin?: string;
  userLogin?: string;
}
export interface GraphQLRecordType {
  type: string;
  description?: string;
}
export interface GraphQLRole {
  id: number;
  slug: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}
export interface GraphQLUserRole {
  id: number;
  userId: number;
  roleId: number;
}
export interface GraphQLUserRolesView {
  id: number;
}
export interface GraphQLTask {
  id: number;
  name: string;
  createdAt: string;
  updatedAt?: string;
}
export interface GraphQLTiming {
  updatedAt?: string;
}
export interface GraphQLTransactionType {
  type: string;
}
export interface GraphQLXPView {
  userId: number;
}
export interface GraphQLLabel {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}
export interface GraphQLLabelUser {
  id: number;
  labelId: number;
  userId: number;
  createdAt: string;
}
export interface GraphQLMarkdown {
  name: string;
  content?: string;
  createdAt: string;
  updatedAt?: string;
}
export interface GraphQLMatch {
  id: number;
  createdAt: string;
  updatedAt?: string;
  status?: string;
  type?: string;
}
export interface GraphQLAggregateResult {
  count?: number;
  sum?: Record<string, number>;
  avg?: Record<string, number>;
  max?: Record<string, number>;
  min?: Record<string, number>;
}
export interface GraphQLTransactionAggregate {
  aggregate?: GraphQLAggregateResult;
}
export interface GraphQLProgressAggregate {
  aggregate?: GraphQLAggregateResult;
}
export interface GraphQLAuditAggregate {
  aggregate?: GraphQLAggregateResult;
}
export interface GraphQLDashboardData {
  user: GraphQLUser[]; 
  event_user?: Array<{
    level: number;
    event: {
      id: number;
      campus: string;
    };
  }>;
  transaction_aggregate?: GraphQLTransactionAggregate;
  totalXP: number;
  level: number;
  auditRatio: {
    totalUp: number;
    totalDown: number;
    ratio: number;
  };
  transactions: GraphQLTransaction[];
  progresses: GraphQLProgress[];
  results: GraphQLResult[];
  audits: GraphQLAudit[];
  groups: GraphQLGroup[];
}
export interface UserResponse {
  user: GraphQLUser[];
}
export interface UserByPkResponse {
  user_by_pk: GraphQLUser;
}
export interface UserPublicViewResponse {
  user_public_view: GraphQLUserPublicView[];
}
export interface UserAggregateResponse {
  user_aggregate: {
    aggregate: GraphQLAggregateResult;
  };
}
export interface TransactionResponse {
  transaction: GraphQLTransaction[];
}
export interface TransactionAggregateResponse {
  transaction_aggregate: {
    aggregate: GraphQLAggregateResult;
  };
}
export interface TransactionTypesResponse {
  transaction_type: GraphQLTransactionType[];
}
export interface ProgressResponse {
  progress: GraphQLProgress[];
}
export interface ProgressAggregateResponse {
  progress_aggregate: {
    aggregate: GraphQLAggregateResult;
  };
}
export interface ProgressByPathViewResponse {
  progress_by_path_view: GraphQLProgressByPathView[];
}
export interface ResultResponse {
  result: GraphQLResult[];
}
export interface ResultAggregateResponse {
  result_aggregate: {
    aggregate: GraphQLAggregateResult;
  };
}
export interface AuditResponse {
  audit: GraphQLAudit[];
}
export interface AuditAggregateResponse {
  audit_aggregate: {
    aggregate: GraphQLAggregateResult;
  };
}
export interface GroupResponse {
  group: GraphQLGroup[];
}
export interface GroupAggregateResponse {
  group_aggregate: {
    aggregate: GraphQLAggregateResult;
  };
}
export interface GroupUserResponse {
  group_user: GraphQLGroupUser[];
}
export interface EventResponse {
  event: GraphQLEvent[];
}
export interface EventAggregateResponse {
  event_aggregate: {
    aggregate: GraphQLAggregateResult;
  };
}
export interface EventUserResponse {
  event_user: GraphQLEventUser[];
}
export interface EventUserViewResponse {
  event_user_view: GraphQLEventUserView[];
}
export interface ObjectResponse {
  object: GraphQLObject[];
}
export interface ObjectAggregateResponse {
  object_aggregate: {
    aggregate: GraphQLAggregateResult;
  };
}
export interface ObjectChildResponse {
  object_child: GraphQLObjectChild[];
}
export interface ObjectAvailabilityResponse {
  object_availability: GraphQLObjectAvailability[];
}
export interface ObjectTypesResponse {
  object_type: GraphQLObjectType[];
}
export interface PathResponse {
  path: GraphQLPath[];
}
export interface PathArchiveResponse {
  path_archive: GraphQLPathArchive[];
}
export interface RegistrationResponse {
  registration: GraphQLRegistration[];
}
export interface RegistrationUserResponse {
  registration_user: GraphQLRegistrationUser[];
}
export interface RegistrationUserViewResponse {
  registration_user_view: GraphQLRegistrationUserView[];
}
export interface RecordResponse {
  record: GraphQLRecord[];
}
export interface RecordTypesResponse {
  record_type: GraphQLRecordType[];
}
export interface RoleResponse {
  role: GraphQLRole[];
}
export interface UserRoleResponse {
  user_role: GraphQLUserRole[];
}
export interface TaskResponse {
  task: GraphQLTask[];
}
export interface XPViewResponse {
  xp_view: GraphQLXPView[];
}
export interface LabelResponse {
  label: GraphQLLabel[];
}
export interface LabelUserResponse {
  label_user: GraphQLLabelUser[];
}
export interface MarkdownResponse {
  markdown: GraphQLMarkdown[];
}
export interface MatchResponse {
  match: GraphQLMatch[];
}
export interface DashboardResponse {
  user: GraphQLUser[];
  event_user?: Array<{
    level: number;
    event: {
      id: number;
      campus: string;
    };
  }>;
  transaction_aggregate?: GraphQLTransactionAggregate;
  transactions?: GraphQLTransaction[];
  progresses?: GraphQLProgress[];
  results?: GraphQLResult[];
  audits?: GraphQLAudit[];
  groups?: GraphQLGroup[];
}
export interface UserQueryVariables {
  userLogin?: string;
  userId?: number;
  limit?: number;
  offset?: number;
  campus?: string;
}
export interface TransactionQueryVariables {
  userLogin?: string;
  type?: string;
  limit?: number;
  offset?: number;
}
export interface ProgressQueryVariables {
  userLogin?: string;
  userId?: number;
  isDone?: boolean;
  limit?: number;
}
export interface AuditQueryVariables {
  userLogin?: string;
  limit?: number;
  offset?: number;
}
export interface GroupQueryVariables {
  userLogin?: string;
  eventId?: number;
  limit?: number;
  offset?: number;
}
export interface SearchVariables {
  searchTerm?: string;
  campus?: string;
  limit?: number;
}
export interface LeaderboardVariables {
  campus?: string;
  limit?: number;
}
export interface GraphQLError {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  path?: string[];
  extensions?: {
    code?: string;
    exception?: {
      stacktrace?: string[];
    };
  };
}
export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
  extensions?: {
    tracing?: Record<string, unknown>;
  };
}
export interface UseGraphQLDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}
export interface ProcessedUser {
  id: number;
  login: string;
  firstName?: string;
  lastName?: string;
  displayName: string;
  auditRatio?: number;
  totalUp?: number;
  totalDown?: number;
  campus?: string;
  profile?: string;
  attrs?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}
export interface ProcessedTransaction {
  id: number;
  type: string;
  amount: number;
  path?: string;
  createdAt: string;
  object?: {
    id: number;
    name: string;
    type: string;
  };
}
export interface ProcessedProgress {
  id: number;
  grade?: number;
  isDone: boolean;
  path?: string;
  createdAt: string;
  object?: {
    id: number;
    name: string;
    type: string;
  };
}
export interface ProcessedResult {
  id: number;
  grade?: number;
  type: string;
  isLast: boolean;
  path?: string;
  createdAt: string;
  object?: {
    id: number;
    name: string;
    type: string;
  };
}
export interface ProcessedTimeline {
  date: string;
  amount: number;
  cumulative: number;
}
export interface ProcessedAudit {
  id: number;
  grade?: number;
  createdAt: string;
  auditor?: ProcessedUser;
  group?: {
    id: number;
    path?: string;
    status: string;
  };
}
export interface ProcessedAuditRatio {
  ratio: number;
  totalUp: number;
  totalDown: number;
}
export interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
}
export interface ProcessedChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
  }>;
}
export interface UserStatistics {
  totalXP: number;
  level: number;
  auditRatio: number;
  totalUp: number;
  totalDown: number;
  transactionsCount: number;
  progressCount: number;
  resultsCount: number;
  auditsCount: number;
  campus: string;
  rankTitle: string;
  cohortNumber: string;
}
export interface LeaderboardEntry {
  id: number;
  login: string;
  firstName?: string;
  lastName?: string;
  campus?: string;
  auditRatio?: number;
  totalUp?: number;
  totalDown?: number;
  xp_total?: GraphQLTransactionAggregate;
}
export interface CampusStats {
  user_stats?: {
    aggregate?: GraphQLAggregateResult;
    nodes?: GraphQLUser[];
  };
  event_stats?: {
    aggregate?: GraphQLAggregateResult;
  };
  group_stats?: {
    aggregate?: GraphQLAggregateResult;
  };
  progress_stats?: GraphQLProgressAggregate;
  xp_stats?: GraphQLTransactionAggregate;
}
