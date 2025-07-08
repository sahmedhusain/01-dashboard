export interface User {
  id: string;
  login: string;
  profile: any; // You can extend this based on the profile structure
}

export interface Transaction {
  id: string;
  amount: number;
  createdAt: string;
  path: string;
  objectId: string;
}

export interface Progress {
  id: string;
  grade: number;
  isDone: boolean;
  path: string;
  createdAt: string;
  objectId: string;
  eventId: string;
}

export interface Object {
  id: string;
  name: string;
  type: string;
}

export interface Group {
  id: string;
  object: Object;
}

export interface Audit {
  id: string;
  grade: number;
  createdAt: string;
  groupId: string;
  group: Group;
}

export interface Result {
  id: string;
  grade: number;
  createdAt: string;
  type: string;
  object: Object;
  eventId: string;
}

// Query Response Types
export interface UserInfoResponse {
  user: User;
}

export interface UserXPResponse {
  transaction: Transaction[];
}

export interface UserProgressResponse {
  progress: Progress[];
}

export interface UserAuditsResponse {
  audit: Audit[];
}

export interface UserResultsResponse {
  result: Result[];
}

// Variables Types
export interface UserQueryVariables {
  userId: number;
}

// GraphQL Error Type
export interface GraphQLError {
  message: string;
  path?: string[];
  extensions?: {
    code: string;
    [key: string]: any;
  };
}
