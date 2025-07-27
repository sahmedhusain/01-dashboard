// Common type definitions for the application
import { ReactNode, ComponentType } from 'react';

// Re-export GraphQL types
export * from './graphql';

// ============================================================================
// ENHANCED USER TYPES - Updated for comprehensive data structure
// ============================================================================

export interface User {
  id: number;
  login: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
  campus?: string;
  auditRatio?: number;
  totalUp?: number;
  totalDown?: number;
  profile?: string;
  attrs?: Record<string, any>;
  githubLogin?: string;
  // Additional personal information fields from attrs
  emergencyContact?: {
    name?: string;
    phone?: string;
    relationship?: string;
  };
  dateOfBirth?: string;
  nationalId?: string;
  cprNumber?: string;
  nationality?: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
    postalCode?: string;
  };
  cohort?: string;
  cohortNumber?: string;
  studentId?: string;
}

// Enhanced user profile with computed fields
export interface UserProfile extends User {
  fullName: string;
  initials: string;
  avatarUrl?: string;
  level: number;
  totalXP: number;
  rankTitle: string;
  cohortNumber: string;
  joinDate: string;
  lastActivity: string;
  performanceMetrics: {
    passRate: number;
    auditRatio: number;
    averageGrade: number;
    projectsCompleted: number;
    skillsCount: number;
  };
}

// ============================================================================
// ENHANCED TRANSACTION TYPES - Updated for comprehensive data structure
// ============================================================================

export interface Transaction {
  id: number;
  type: 'xp' | 'up' | 'down' | string;
  amount: number;
  createdAt: string;
  path?: string;
  campus?: string;
  eventId?: number;
  objectId?: number;
  userId?: number;
  attrs?: Record<string, any>;
  user?: User;
  object?: {
    id: number;
    name: string;
    type: string;
  };
  event?: {
    id: number;
    path: string;
  };
}

// Transaction aggregates for statistics
export interface TransactionAggregates {
  xp: {
    total: number;
    count: number;
    average: number;
    byProject: Array<{
      projectName: string;
      amount: number;
      path: string;
    }>;
    timeline: Array<{
      date: string;
      amount: number;
      cumulative: number;
    }>;
  };
  audits: {
    totalUp: number;
    totalDown: number;
    ratio: number;
    given: number;
    received: number;
  };
}

// ============================================================================
// ENHANCED PROJECT & PROGRESS TYPES
// ============================================================================

export interface Project {
  id: number;
  name: string;
  type: string;
  status?: string;
  path?: string;
  createdAt: string;
  updatedAt?: string;
  campus?: string;
  attrs?: Record<string, any>;
}

export interface Progress {
  id: number;
  userId: number;
  objectId: number;
  grade: number;
  isDone: boolean;
  path: string;
  version?: string;
  createdAt: string;
  updatedAt: string;
  campus?: string;
  groupId?: number;
  eventId?: number;
  object?: Project;
}

export interface Result {
  id: number;
  userId: number;
  objectId: number;
  grade: number;
  type?: string;
  isLast: boolean;
  path: string;
  version?: string;
  createdAt: string;
  updatedAt: string;
  campus?: string;
  groupId?: number;
  eventId?: number;
  attrs?: Record<string, any>;
  object?: Project;
}

// Progress statistics
export interface ProgressStats {
  total: number;
  completed: number;
  inProgress: number;
  passed: number;
  failed: number;
  averageGrade: number;
  completionRate: number;
  byCategory: Record<string, {
    total: number;
    completed: number;
    averageGrade: number;
  }>;
}

// ============================================================================
// ENHANCED SKILL TYPES
// ============================================================================

export interface Skill {
  id: number;
  name: string;
  type: string;
  amount: number;
  level?: number;
  category?: string;
  description?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
  totalAmount: number;
  averageLevel: number;
  topSkills: Skill[];
}

// ============================================================================
// ENHANCED AUDIT TYPES
// ============================================================================

export interface Audit {
  id: number;
  grade: number;
  createdAt: string;
  updatedAt?: string;
  endAt?: string;
  code?: string;
  version?: string;
  private?: boolean;
  attrs?: Record<string, any>;
  auditorId?: number;
  groupId?: number;
  resultId?: number;
  auditor?: User;
  group?: Group;
  result?: Result;
}

export interface AuditStats {
  given: {
    count: number;
    averageGrade: number;
    totalGrades: number;
    recentAudits: Audit[];
  };
  received: {
    count: number;
    averageGrade: number;
    totalGrades: number;
    recentAudits: Audit[];
  };
  ratio: number;
  performance: 'excellent' | 'good' | 'average' | 'poor';
  trend: 'improving' | 'stable' | 'declining';
}

// ============================================================================
// ENHANCED GROUP & EVENT TYPES
// ============================================================================

export interface Group {
  id: number;
  status: string;
  path: string;
  campus?: string;
  createdAt: string;
  updatedAt: string;
  objectId?: number;
  eventId?: number;
  captainId?: number;
  object?: Project;
  event?: Event;
  captain?: User;
  members?: User[];
}

export interface Event {
  id: number;
  path: string;
  status?: string;
  campus?: string;
  code?: string;
  createdAt: string;
  endAt?: string;
  objectId?: number;
  parentId?: number;
  registrationId?: number;
  object?: Project;
  parent?: Event;
}

export interface GroupUser {
  id: number;
  userId: number;
  groupId: number;
  confirmed?: boolean;
  createdAt: string;
  updatedAt?: string;
  user?: User;
  group?: Group;
}

export interface EventUser {
  id: number;
  userId: number;
  eventId: number;
  level?: number;
  createdAt: string;
  user?: User;
  event?: Event;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
  }>;
}

export interface LoadingState {
  loading: boolean;
  error: Error | null;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total?: number;
}

export interface FilterState {
  [key: string]: any;
}

export interface SortState {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }>;
}

export interface ComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface ButtonProps extends ComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps extends ComponentProps {
  title?: string;
  description?: string;
  footer?: ReactNode;
}

export interface LoadingError {
  userMessage?: string;
}

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
  error?: LoadingError | null;
  retry?: (() => void) | null;
}

// Auth types
export interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  token: string | null;
}

export interface AuthContextType extends AuthState {
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

// Data context types
export interface DataState {
  user: User | null;
  transactions: Transaction[];
  projects: Project[];
  skills: Skill[];
  audits: Audit[];
  loading: boolean;
  error: Error | null;
}

export interface DataContextType extends DataState {
  refetch: () => Promise<void>;
  updateUser: (user: User) => void;
}

// Error types
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  context?: Record<string, any>;
}

// Route types
export interface RouteConfig {
  path: string;
  component: ComponentType;
  exact?: boolean;
  title?: string;
}

// ============================================================================
// ENHANCED CHART TYPES - SVG-based charts for project requirements
// ============================================================================

export interface SVGChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    color: string;
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }>;
}

export interface ChartPoint {
  x: number;
  y: number;
  label?: string;
  value?: number;
  color?: string;
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'donut' | 'gauge' | 'area';
  width: number;
  height: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  colors?: string[];
  animate?: boolean;
  interactive?: boolean;
  responsive?: boolean;
  title?: string;
  description?: string;
}

// Specific chart data types
export interface XPTimelineData {
  date: string;
  xp: number;
  cumulative: number;
  project?: string;
  type?: string;
}

export interface ProjectSuccessData {
  passed: number;
  failed: number;
  inProgress: number;
  total: number;
}

export interface AuditRatioData {
  ratio: number;
  totalUp: number;
  totalDown: number;
  performance: 'excellent' | 'good' | 'average' | 'poor';
}

export interface SkillRadarData {
  skill: string;
  level: number;
  maxLevel: number;
  category: string;
}

// ============================================================================
// ENHANCED DASHBOARD TYPES
// ============================================================================

export interface DashboardData {
  user: UserProfile;
  statistics: {
    totalXP: number;
    level: number;
    auditRatio: number;
    projectsCompleted: number;
    skillsCount: number;
    rank: number;
    percentile: number;
  };
  charts: {
    xpTimeline: XPTimelineData[];
    projectSuccess: ProjectSuccessData;
    auditRatio: AuditRatioData;
    skillsRadar: SkillRadarData[];
    progressBars: Array<{
      category: string;
      completed: number;
      total: number;
      percentage: number;
    }>;
  };
  recentActivity: Array<{
    id: string;
    type: 'xp' | 'audit' | 'project' | 'skill';
    title: string;
    description: string;
    date: string;
    value?: number;
    status?: 'success' | 'warning' | 'error' | 'info';
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    earned: boolean;
    earnedAt?: string;
    progress?: number;
    maxProgress?: number;
  }>;
}

// API types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: any;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Environment types
export interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_APP_TITLE?: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
