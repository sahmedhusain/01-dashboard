/**
 * TypeScript interfaces for GraphQL schema
 * Based on reboot01_graphql_queries.graphql reference schema
 * Ensures type safety throughout the application
 */

// ============================================================================
// CORE ENTITY INTERFACES
// ============================================================================

export interface User {
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
  createdAt?: string;
  updatedAt?: string;
  
  // Relationships
  transactions?: Transaction[];
  progresses?: Progress[];
  results?: Result[];
  group_users?: GroupUser[];
  event_users?: EventUser[];
  audits?: Audit[];
  
  // Aggregates
  transactions_aggregate?: TransactionAggregate;
  progresses_aggregate?: ProgressAggregate;
  audits_aggregate?: AuditAggregate;
}

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  path?: string;
  campus?: string;
  attrs?: Record<string, unknown>;
  createdAt: string;
  
  // Relationships
  user?: User;
  object?: Object;
  event?: Event;
}

export interface Progress {
  id: number;
  grade?: number;
  isDone: boolean;
  path?: string;
  version?: string;
  createdAt: string;
  updatedAt?: string;
  
  // Relationships
  user?: User;
  object?: Object;
  group?: Group;
  event?: Event;
}

export interface Result {
  id: number;
  grade?: number;
  type: string;
  isLast: boolean;
  path?: string;
  version?: string;
  createdAt: string;
  
  // Relationships
  user?: User;
  object?: Object;
  group?: Group;
  event?: Event;
}

export interface Audit {
  id: number;
  grade?: number;
  version?: string;
  attrs?: Record<string, unknown>;
  endAt?: string;
  createdAt: string;
  updatedAt?: string;
  
  // Relationships
  auditor?: User;
  group?: Group;
  result?: Result;
}

export interface Group {
  id: number;
  status: string;
  path?: string;
  campus?: string;
  createdAt: string;
  updatedAt?: string;
  
  // Relationships
  captain?: User;
  object?: Object;
  event?: Event;
  group_users?: GroupUser[];
  progresses?: Progress[];
  results?: Result[];
  audits?: Audit[];
}

export interface Event {
  id: number;
  path?: string;
  campus?: string;
  createdAt: string;
  endAt?: string;
  
  // Relationships
  object?: Object;
  event_users?: EventUser[];
  groups?: Group[];
  transactions?: Transaction[];
  progresses?: Progress[];
  results?: Result[];
}

export interface Object {
  id: number;
  name: string;
  type: string;
  attrs?: Record<string, unknown>;
  
  // Relationships
  parent?: Object;
  children?: Object[];
  transactions?: Transaction[];
  progresses?: Progress[];
  results?: Result[];
  groups?: Group[];
  events?: Event[];
}

// ============================================================================
// JUNCTION TABLE INTERFACES
// ============================================================================

export interface GroupUser {
  // Relationships
  user?: User;
  group?: Group;
}

export interface EventUser {
  // Relationships
  user?: User;
  event?: Event;
}

// ============================================================================
// AGGREGATE INTERFACES
// ============================================================================

export interface AggregateResult {
  count?: number;
  sum?: Record<string, number>;
  avg?: Record<string, number>;
  max?: Record<string, number>;
  min?: Record<string, number>;
}

export interface TransactionAggregate {
  aggregate?: AggregateResult;
}

export interface ProgressAggregate {
  aggregate?: AggregateResult;
}

export interface AuditAggregate {
  aggregate?: AggregateResult;
}

export interface UserAggregate {
  aggregate?: AggregateResult;
  nodes?: User[];
}

export interface GroupAggregate {
  aggregate?: AggregateResult;
  nodes?: Group[];
}

export interface EventAggregate {
  aggregate?: AggregateResult;
  nodes?: Event[];
}

// ============================================================================
// QUERY RESPONSE INTERFACES
// ============================================================================

export interface UserResponse {
  user: User[];
}

export interface UserByPkResponse {
  user_by_pk: User;
}

export interface TransactionResponse {
  transaction: Transaction[];
}

export interface ProgressResponse {
  progress: Progress[];
}

export interface ResultResponse {
  result: Result[];
}

export interface AuditResponse {
  audit: Audit[];
}

export interface GroupResponse {
  group: Group[];
}

export interface EventResponse {
  event: Event[];
}

export interface ObjectResponse {
  object: Object[];
}

// ============================================================================
// STATISTICS AND ANALYTICS INTERFACES
// ============================================================================

export interface UserStats {
  user: User[];
  xp_total?: TransactionAggregate;
  completed_projects?: ProgressAggregate;
  total_audits?: AuditAggregate;
}

export interface CampusStats {
  user_stats?: UserAggregate;
  event_stats?: EventAggregate;
  group_stats?: GroupAggregate;
  progress_stats?: ProgressAggregate;
  xp_stats?: TransactionAggregate;
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
  xp_total?: TransactionAggregate;
}

// ============================================================================
// QUERY VARIABLES INTERFACES
// ============================================================================

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
  isDone?: boolean;
  limit?: number;
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

// ============================================================================
// ERROR AND LOADING INTERFACES
// ============================================================================

export interface GraphQLError {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  path?: string[];
  extensions?: Record<string, unknown>;
}

export interface QueryResult<T> {
  data?: T;
  errors?: GraphQLError[];
  loading?: boolean;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
