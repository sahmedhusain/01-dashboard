// GraphQL type definitions for the application

// Base GraphQL types - Updated for new schema
export interface GraphQLUser {
  id: number; // Changed from string to number to match schema
  login: string;
  firstName?: string;
  lastName?: string;
  auditRatio?: number;
  totalUp?: number;
  totalDown?: number;
  campus?: string; // Changed from array to string to match schema
  profile?: string;
  attrs?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;

  // Relationships - Updated for new schema
  transactions?: GraphQLTransaction[];
  progresses?: GraphQLProgress[];
  results?: GraphQLResult[];
  group_users?: GraphQLGroupUser[];
  event_users?: GraphQLEventUser[];
  audits?: GraphQLAudit[];
}

export interface GraphQLTransaction {
  id: number; // Changed from string to number
  type: string;
  amount: number;
  path?: string; // Made optional to match schema
  campus?: string;
  attrs?: Record<string, unknown>;
  createdAt: string;

  // Relationships - Updated for new schema
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

  // Relationships
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

  // Relationships
  user?: GraphQLUser;
  object?: GraphQLObject;
  group?: GraphQLGroup;
  event?: GraphQLEvent;
}

export interface GraphQLAudit {
  id: number; // Changed from string to number
  grade?: number; // Made optional to match schema
  version?: string;
  attrs?: Record<string, unknown>;
  endAt?: string;
  createdAt: string;
  updatedAt?: string;

  // Relationships - Updated for new schema
  auditor?: GraphQLUser;
  group?: GraphQLGroup;
  result?: GraphQLResult;
}

export interface GraphQLGroup {
  id: number; // Changed from string to number
  status: string;
  path?: string;
  campus?: string;
  createdAt: string;
  updatedAt?: string;

  // Relationships - Updated for new schema
  captain?: GraphQLUser;
  object?: GraphQLObject;
  event?: GraphQLEvent;
  group_users?: GraphQLGroupUser[];
  progresses?: GraphQLProgress[];
  results?: GraphQLResult[];
  audits?: GraphQLAudit[];
}

export interface GraphQLEvent {
  id: number; // Changed from string to number
  path?: string;
  campus?: string;
  createdAt: string;
  endAt?: string;

  // Relationships
  object?: GraphQLObject;
  event_users?: GraphQLEventUser[];
  groups?: GraphQLGroup[];
  transactions?: GraphQLTransaction[];
  progresses?: GraphQLProgress[];
  results?: GraphQLResult[];
}

export interface GraphQLObject {
  id: number; // Changed from string to number
  name: string;
  type: string;
  attrs?: Record<string, unknown>;

  // Relationships
  parent?: GraphQLObject;
  children?: GraphQLObject[];
  transactions?: GraphQLTransaction[];
  progresses?: GraphQLProgress[];
  results?: GraphQLResult[];
  groups?: GraphQLGroup[];
  events?: GraphQLEvent[];
}

// Junction table interfaces - New for schema
export interface GraphQLGroupUser {
  user?: GraphQLUser;
  group?: GraphQLGroup;
}

export interface GraphQLEventUser {
  user?: GraphQLUser;
  event?: GraphQLEvent;
}

// Aggregate interfaces - New for schema
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

// Dashboard data structure - Updated for new schema
export interface GraphQLDashboardData {
  user: GraphQLUser[];  // Changed to array to match schema
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

// Query response types - Updated for new schema
export interface UserResponse {
  user: GraphQLUser[];
}

export interface UserByPkResponse {
  user_by_pk: GraphQLUser;
}

export interface TransactionResponse {
  transaction: GraphQLTransaction[];
}

export interface ProgressResponse {
  progress: GraphQLProgress[];
}

export interface ResultResponse {
  result: GraphQLResult[];
}

export interface AuditResponse {
  audit: GraphQLAudit[];
}

export interface GroupResponse {
  group: GraphQLGroup[];
}

export interface EventResponse {
  event: GraphQLEvent[];
}

export interface ObjectResponse {
  object: GraphQLObject[];
}

// Combined dashboard response - Updated for new schema
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

// GraphQL query variables - Updated for new schema
export interface UserQueryVariables {
  userLogin?: string;
  userId?: number; // Changed from string to number
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

// Error types
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
    tracing?: any;
  };
}

// Hook return types
export interface UseGraphQLDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Processed data types (after transformation) - Updated for new schema
export interface ProcessedUser {
  id: number; // Changed from string to number
  login: string;
  firstName?: string;
  lastName?: string;
  displayName: string;
  auditRatio?: number;
  totalUp?: number;
  totalDown?: number;
  campus?: string; // Changed from array to string
  profile?: string;
  attrs?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProcessedTransaction {
  id: number; // Changed from string to number
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
  id: number; // Changed from string to number
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
  id: number; // Changed from string to number
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
  id: number; // Changed from string to number
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

// Chart data types
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

// Statistics types - Updated for new schema
export interface UserStatistics {
  totalXP: number; // Changed from string to number for better processing
  level: number;
  auditRatio: number; // Changed from string to number
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

// Leaderboard entry - Updated for new schema
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

// Campus statistics - New for schema
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
