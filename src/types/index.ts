// Common type definitions for the application
import { ReactNode, ComponentType } from 'react';

// Re-export GraphQL types
export * from './graphql';

export interface User {
  id: number; // Updated to match new GraphQL schema
  login: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
  campus?: string; // Updated to match new GraphQL schema (string instead of Campus[])
  auditRatio?: number;
  totalUp?: number;
  totalDown?: number;
}

export interface Campus {
  id: string;
  name: string;
  country?: string;
  city?: string;
}

export interface Transaction {
  id: number; // Updated to match new GraphQL schema
  type: string;
  amount: number;
  createdAt: string;
  path?: string; // Made optional to match new GraphQL schema
  user?: User; // Made optional to match new GraphQL schema
  object?: {
    id: number; // Updated to match new GraphQL schema
    name: string;
    type: string;
  };
}

export interface Project {
  id: number; // Updated to match new GraphQL schema
  name: string;
  createdAt: string;
  updatedAt?: string;
  status?: string;
  grade?: number;
  path?: string;
}

export interface Skill {
  id: number; // Updated to match new GraphQL schema
  name: string;
  type: string;
  amount: number;
}

export interface Audit {
  id: number; // Updated to match new GraphQL schema
  grade: number;
  createdAt: string;
  auditor?: User; // Made optional to match new GraphQL schema
  group?: {
    id: number; // Updated to match new GraphQL schema
    path: string;
    captainLogin: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    object: {
      id: number; // Updated to match new GraphQL schema
      name: string;
      type: string;
    };
  };
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

// Chart types
export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar';
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: Record<string, any>;
  scales?: Record<string, any>;
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
