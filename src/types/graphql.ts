// GraphQL type definitions for the application

// Base GraphQL types
export interface GraphQLUser {
  id: string;
  login: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  phone?: string;
  createdAt: string;
  updatedAt?: string;
  campus?: GraphQLCampus[];
  auditRatio?: number;
  totalUp?: number;
  totalDown?: number;
}

export interface GraphQLCampus {
  id: string;
  name: string;
  country?: string;
  city?: string;
}

export interface GraphQLTransaction {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
  path: string;
  user: GraphQLUser;
  object?: {
    id: string;
    name: string;
    type: string;
  };
}

export interface GraphQLProject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
  status?: string;
  grade?: number;
  path?: string;
  object?: {
    id: string;
    name: string;
    type: string;
  };
}

export interface GraphQLSkill {
  id: string;
  type: string;
  amount: number;
  transaction?: {
    id: string;
    type: string;
    createdAt: string;
    object?: {
      id: string;
      name: string;
      type: string;
    };
  };
}

export interface GraphQLAudit {
  id: string;
  grade: number;
  createdAt: string;
  auditor: GraphQLUser;
  group: {
    id: string;
    path: string;
    captainLogin: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    object: {
      id: string;
      name: string;
      type: string;
    };
  };
}

export interface GraphQLGroup {
  id: string;
  path: string;
  captainLogin: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  members: GraphQLUser[];
  object: {
    id: string;
    name: string;
    type: string;
  };
}

// Dashboard data structure
export interface GraphQLDashboardData {
  user: GraphQLUser;
  totalXP: number;
  level: number;
  eventId?: string;
  auditRatio: {
    totalUp: number;
    totalDown: number;
    ratio: number;
  };
  skills: GraphQLSkill[];
  xpProjects: GraphQLTransaction[];
  xpTimeline: Array<{
    date: string;
    amount: number;
  }>;
  auditTimeline: Array<{
    date: string;
    amount: number;
  }>;
  projectResults: GraphQLProject[];
  groups: GraphQLGroup[];
}

// Query response types
export interface UserProfileResponse {
  user: GraphQLUser[];
}

export interface TransactionsResponse {
  transaction: GraphQLTransaction[];
}

export interface ProjectsResponse {
  progress: GraphQLProject[];
}

export interface SkillsResponse {
  transaction: GraphQLSkill[];
}

export interface AuditsResponse {
  audit: GraphQLAudit[];
}

export interface GroupsResponse {
  group: GraphQLGroup[];
}

// Combined dashboard response
export interface DashboardResponse {
  user: GraphQLUser[];
  xpTransactions: GraphQLTransaction[];
  auditTransactions: GraphQLTransaction[];
  skills: GraphQLTransaction[];
  projects: GraphQLProject[];
  audits: GraphQLAudit[];
  groups: GraphQLGroup[];
}

// GraphQL query variables
export interface UserQueryVariables {
  userId: string;
}

export interface TransactionQueryVariables {
  userId: string;
  limit?: number;
  offset?: number;
  type?: string;
}

export interface ProjectQueryVariables {
  userId: string;
  limit?: number;
  offset?: number;
}

export interface SkillQueryVariables {
  userId: string;
  limit?: number;
  offset?: number;
}

export interface AuditQueryVariables {
  userId: string;
  limit?: number;
  offset?: number;
}

export interface GroupQueryVariables {
  userId: string;
  limit?: number;
  offset?: number;
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

// Processed data types (after transformation)
export interface ProcessedUser {
  id: string;
  login: string;
  firstName?: string;
  lastName?: string;
  displayName: string;
  email?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
  campus?: ProcessedCampus[];
}

export interface ProcessedCampus {
  id: string;
  name: string;
  country?: string;
  city?: string;
}

export interface ProcessedSkill {
  id: string;
  name: string;
  type: string;
  amount: number;
  category?: string;
}

export interface ProcessedProject {
  id: string;
  name: string;
  amount: number;
  createdAt: string;
  status?: string;
  grade?: number;
}

export interface ProcessedTimeline {
  date: string;
  amount: number;
  cumulative: number;
}

export interface ProcessedProjectResult {
  id: string;
  name: string;
  grade: number;
  status: 'passed' | 'failed' | 'in-progress';
  createdAt: string;
  path?: string;
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

// Statistics types
export interface UserStatistics {
  totalXP: string;
  level: number;
  auditRatio: string;
  skillsCount: number;
  projectsCount: number;
  passRate: string;
  rankTitle: string;
  cohortNumber: string;
}
