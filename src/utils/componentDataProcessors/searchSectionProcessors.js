/**
 * Search Section Data Processors
 * Handles all data processing logic for the SearchSection component
 * Separates search and query logic from JSX presentation logic
 */

import { normalizeUserData } from '../schemaAdapters/userSchemaAdapter.js';
import { getTopSkills } from '../schemaAdapters/skillsSchemaAdapter.js';
// import { extractAuditStatistics } from '../schemaAdapters/auditSchemaAdapter.js';

/**
 * Process all data for the SearchSection component
 * @param {Object} rawData - Raw data from GraphQL queries
 * @returns {Object} Processed data ready for JSX consumption
 */
export const processSearchSectionData = (rawData) => {
  const {
    user,
    loading = false,
    error = null
  } = rawData;

  if (loading) {
    return {
      isLoading: true,
      error: null,
      searchExamples: [],
      queryDemonstrations: [],
      searchResults: null,
      availableFilters: []
    };
  }

  if (error) {
    return {
      isLoading: false,
      error: error.message || 'Failed to load search data',
      searchExamples: [],
      queryDemonstrations: [],
      searchResults: null,
      availableFilters: []
    };
  }

  // Process user profile
  const userProfile = normalizeUserData(user);

  // Create search examples based on available data
  const searchExamples = createSearchExamples(rawData);

  // Create query demonstrations
  const queryDemonstrations = createQueryDemonstrations(rawData);

  // Process available filters
  const availableFilters = processAvailableFilters(rawData);

  return {
    isLoading: false,
    error: null,
    user: userProfile,
    searchExamples,
    queryDemonstrations,
    searchResults: null,
    availableFilters
  };
};

/**
 * Create search examples based on available data
 * @param {Object} rawData - Raw data from GraphQL queries
 * @returns {Array} Search examples for demonstration
 */
const createSearchExamples = (rawData) => {
  const { users = [], skills = [], projects = [], audits = [] } = rawData;

  const examples = [];

  // User search examples
  if (users.length > 0) {
    examples.push({
      category: 'Users',
      title: 'Find Users by Campus',
      description: 'Search for users from specific campuses',
      query: 'campus:london',
      expectedResults: users.filter(u => u.campus?.toLowerCase().includes('london')).length,
      graphqlQuery: `
query FindUsersByCampus($campus: String!) {
  user(where: { campus: { _ilike: $campus } }) {
    id
    login
    campus
    createdAt
  }
}`,
      variables: { campus: '%london%' }
    });

    examples.push({
      category: 'Users',
      title: 'Find Users by Level',
      description: 'Search for users above a certain level',
      query: 'level:>5',
      expectedResults: users.filter(u => (u.level || 0) > 5).length,
      graphqlQuery: `
query FindUsersByLevel($minLevel: Int!) {
  user(where: { level: { _gt: $minLevel } }) {
    id
    login
    level
    totalXP
  }
}`,
      variables: { minLevel: 5 }
    });
  }

  // Skills search examples
  if (skills.length > 0) {
    const topSkill = skills.sort((a, b) => (b.totalXP || 0) - (a.totalXP || 0))[0];
    
    examples.push({
      category: 'Skills',
      title: 'Find Skills by XP Range',
      description: 'Search for skills within XP range',
      query: `xp:>${Math.floor((topSkill?.totalXP || 1000) / 2)}`,
      expectedResults: skills.filter(s => (s.totalXP || 0) > Math.floor((topSkill?.totalXP || 1000) / 2)).length,
      graphqlQuery: `
query FindSkillsByXP($minXP: Int!) {
  transaction(
    where: { 
      type: { _eq: "xp" }
      amount: { _gt: $minXP }
    }
    distinct_on: object_name
  ) {
    object {
      name
    }
    amount
  }
}`,
      variables: { minXP: Math.floor((topSkill?.totalXP || 1000) / 2) }
    });
  }

  // Project search examples
  if (projects.length > 0) {
    examples.push({
      category: 'Projects',
      title: 'Find Completed Projects',
      description: 'Search for successfully completed projects',
      query: 'status:pass',
      expectedResults: projects.filter(p => p.status === 'pass').length,
      graphqlQuery: `
query FindPassedProjects {
  result(where: { grade: { _gte: 1 } }) {
    id
    grade
    object {
      name
    }
    createdAt
  }
}`,
      variables: {}
    });
  }

  // Audit search examples
  if (audits.length > 0) {
    examples.push({
      category: 'Audits',
      title: 'Find Recent Audits',
      description: 'Search for audits from the last 30 days',
      query: 'date:last30days',
      expectedResults: audits.filter(a => {
        const auditDate = new Date(a.createdAt);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return auditDate >= thirtyDaysAgo;
      }).length,
      graphqlQuery: `
query FindRecentAudits($since: timestamptz!) {
  audit(
    where: { createdAt: { _gte: $since } }
    order_by: { createdAt: desc }
  ) {
    id
    grade
    createdAt
    auditor {
      login
    }
    auditee {
      login
    }
  }
}`,
      variables: { since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() }
    });
  }

  return examples;
};

/**
 * Create query demonstrations for different GraphQL features
 * @param {Object} rawData - Raw data from GraphQL queries
 * @returns {Array} Query demonstrations
 */
const createQueryDemonstrations = (rawData) => {
  const { user, skills = [], _audits = [], _transactions = [] } = rawData;

  return [
    {
      title: 'Basic Query',
      description: 'Simple field selection',
      category: 'Basic',
      query: `
query GetUserBasicInfo {
  user {
    id
    login
    campus
    level
  }
}`,
      result: {
        user: {
          id: user?.id || 'N/A',
          login: user?.login || 'N/A',
          campus: user?.campus || 'N/A',
          level: user?.level || 0
        }
      },
      explanation: 'Fetches basic user information with simple field selection'
    },
    {
      title: 'Nested Query',
      description: 'Query with relationships',
      category: 'Advanced',
      query: `
query GetUserWithTransactions {
  user {
    id
    login
    transactions(limit: 5) {
      id
      type
      amount
      createdAt
      object {
        name
      }
    }
  }
}`,
      result: {
        user: {
          id: user?.id || 'N/A',
          login: user?.login || 'N/A',
          transactions: _transactions.slice(0, 5).map(t => ({
            id: t.id,
            type: t.type,
            amount: t.amount,
            createdAt: t.createdAt,
            object: { name: t.object?.name || 'Unknown' }
          }))
        }
      },
      explanation: 'Demonstrates nested queries to fetch related data'
    },
    {
      title: 'Query with Arguments',
      description: 'Filtered and sorted query',
      category: 'Advanced',
      query: `
query GetTopSkills($limit: Int!, $minXP: Int!) {
  transaction(
    where: { 
      type: { _eq: "xp" }
      amount: { _gt: $minXP }
    }
    order_by: { amount: desc }
    limit: $limit
    distinct_on: object_name
  ) {
    object {
      name
    }
    amount
  }
}`,
      result: {
        transaction: getTopSkills(skills, 5).map(skill => ({
          object: { name: skill.name },
          amount: skill.totalXP
        }))
      },
      explanation: 'Shows how to use variables, filtering, sorting, and limits'
    },
    {
      title: 'Aggregation Query',
      description: 'Statistical calculations',
      category: 'Advanced',
      query: `
query GetUserStats {
  user {
    id
    login
    transactions_aggregate {
      aggregate {
        count
        sum {
          amount
        }
        avg {
          amount
        }
      }
    }
  }
}`,
      result: {
        user: {
          id: user?.id || 'N/A',
          login: user?.login || 'N/A',
          transactions_aggregate: {
            aggregate: {
              count: _transactions.length,
              sum: {
                amount: _transactions.reduce((sum, t) => sum + (t.amount || 0), 0)
              },
              avg: {
                amount: _transactions.length > 0
                  ? _transactions.reduce((sum, t) => sum + (t.amount || 0), 0) / _transactions.length
                  : 0
              }
            }
          }
        }
      },
      explanation: 'Demonstrates aggregation functions for statistical data'
    }
  ];
};

/**
 * Process available filters based on data
 * @param {Object} rawData - Raw data from GraphQL queries
 * @returns {Array} Available filters for search
 */
const processAvailableFilters = (rawData) => {
  const { users = [], skills = [], _audits = [], _projects = [] } = rawData;

  const filters = [];

  // Campus filter
  const campuses = [...new Set(users.map(u => u.campus).filter(Boolean))];
  if (campuses.length > 0) {
    filters.push({
      name: 'Campus',
      field: 'campus',
      type: 'select',
      options: campuses.map(campus => ({ value: campus, label: campus }))
    });
  }

  // Level filter
  const levels = [...new Set(users.map(u => u.level).filter(l => l != null))];
  if (levels.length > 0) {
    filters.push({
      name: 'Level',
      field: 'level',
      type: 'range',
      min: Math.min(...levels),
      max: Math.max(...levels)
    });
  }

  // Skill filter
  const skillNames = [...new Set(skills.map(s => s.name).filter(Boolean))];
  if (skillNames.length > 0) {
    filters.push({
      name: 'Skills',
      field: 'skills',
      type: 'multiselect',
      options: skillNames.slice(0, 20).map(skill => ({ value: skill, label: skill }))
    });
  }

  // Date filter
  filters.push({
    name: 'Date Range',
    field: 'dateRange',
    type: 'daterange',
    presets: [
      { label: 'Last 7 days', value: 'last7days' },
      { label: 'Last 30 days', value: 'last30days' },
      { label: 'Last 3 months', value: 'last3months' },
      { label: 'Last year', value: 'lastyear' }
    ]
  });

  return filters;
};
