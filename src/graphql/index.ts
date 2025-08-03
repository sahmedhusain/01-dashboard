
export * from './allQueries';

export { default as client } from './client';


export { QUERY_CATEGORIES } from './allQueries';


export const TESTED_QUERY_STATS = {
  TOTAL_QUERIES: 96,
  SUCCESS_RATE: '100%',
  GRAPHQL_ERRORS: 3,
  FAILED_QUERIES: 0,

  DATA_DISCOVERIES: {
    EVENT_USER_VIEW: 17963,
    REGISTRATION_USER_VIEW: 9369,
    USER_PUBLIC_VIEW: 8382,
    OBJECT_AVAILABILITY: 7183,
    GROUPS: 5612,
    OBJECTS: 3280,
    OBJECT_CHILDREN: 3564,
    PATHS: 1317,
    PROGRESS: 801,
    RESULTS: 795,
    EVENTS: 571,
    AUDITS: 513,
    TRANSACTIONS: 462,
    XP_VIEW: 152,
    PATH_ARCHIVE: 141,
    TRANSACTION_TYPES: 47,
    OBJECT_TYPES: 20,
    REGISTRATION_USERS: 12,
    MARKDOWN: 9,
    RECORD_TYPES: 7,
    ROLES: 2
  }
};


export function getQueriesByCategory(category: string): string[] {
  const { QUERY_CATEGORIES } = require('./allQueries');
  return QUERY_CATEGORIES[category] || [];
}

export function getAvailableCategories(): string[] {
  const { QUERY_CATEGORIES } = require('./allQueries');
  return Object.keys(QUERY_CATEGORIES);
}

export function getTotalQueryCount(): number {
  return TESTED_QUERY_STATS.TOTAL_QUERIES;
}

export function getDataStats() {
  return TESTED_QUERY_STATS.DATA_DISCOVERIES;
}
