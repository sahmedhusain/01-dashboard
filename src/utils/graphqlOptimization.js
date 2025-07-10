// GraphQL Performance Optimization Utilities
import { InMemoryCache } from '@apollo/client';
// Import GraphQL queries from the extracted files
import {
  GET_ENHANCED_USER_PROFILE,
  GET_COMPREHENSIVE_USER_ANALYTICS,
  GET_USER_PROGRESS_BY_PATH,
  GET_USER_LABELS,
  GET_PERFORMANCE_ANALYTICS,
  GET_USER_EVENTS_DETAILED,
  GET_USER_OBJECT_AVAILABILITIES,
  GET_USER_XPS
} from '../graphql/queries.js';

// ============================================================================
// CACHING STRATEGIES
// ============================================================================

// Enhanced cache configuration with field policies for all new types
export const createOptimizedCache = () => {
  return new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // User-related queries
          user: {
            keyArgs: ['where'],
            merge(_, incoming) {
              return incoming;
            },
          },
          transaction: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                // Pagination: append new results
                return [...existing, ...incoming];
              }
              // Fresh query: replace existing
              return incoming;
            },
          },
          progress: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          // Enhanced relationship fields
          event: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          group: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          audit: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          result: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          object: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          // New relationship fields from introspection
          eventUser: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          groupUser: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          labelUser: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          match: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          objectAvailability: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          progressByPathView: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          record: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          registration: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          registrationUser: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          userRole: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          toadSessions: {
            keyArgs: ['where', 'order_by'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
        },
      },
      // Enhanced user type with all new fields from introspection
      user: {
        keyFields: ['id'],
        fields: {
          // Basic fields
          profile: { merge: true },
          attrs: { merge: true },

          // Relationship fields with pagination support
          events: {
            keyArgs: ['limit', 'offset'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          groups: {
            keyArgs: ['limit', 'offset'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          groupsByCaptainid: {
            keyArgs: ['limit', 'offset'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          labels: {
            keyArgs: ['limit', 'offset'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          matches: {
            keyArgs: ['limit', 'offset'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          objectAvailabilities: {
            keyArgs: ['limit', 'offset'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          objects: {
            keyArgs: ['limit', 'offset'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          progressesByPath: {
            keyArgs: ['where', 'limit', 'offset'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          records: {
            keyArgs: ['limit', 'offset'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          recordsByAuthorid: {
            keyArgs: ['limit', 'offset'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          registrations: {
            keyArgs: ['limit', 'offset'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          user_roles: {
            keyArgs: ['limit', 'offset'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          roles: {
            keyArgs: ['limit', 'offset'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          sessions: {
            keyArgs: ['limit', 'offset'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },
          xps: {
            keyArgs: ['limit', 'offset'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset && args.offset > 0) {
                return [...existing, ...incoming];
              }
              return incoming;
            },
          },

          // Existing transaction/result fields
          transactions: { merge: false },
          results: { merge: false },
          progresses: { merge: false },

          // Aggregate fields - always replace for fresh data
          transactions_aggregate: { merge: false },
          progresses_aggregate: { merge: false },
          results_aggregate: { merge: false },
          audits_aggregate: { merge: false },
          events_aggregate: { merge: false },
          groups_aggregate: { merge: false },
          groupsByCaptainid_aggregate: { merge: false },
          labels_aggregate: { merge: false },
          matches_aggregate: { merge: false },
          objectAvailabilities_aggregate: { merge: false },
          objects_aggregate: { merge: false },
          progressesByPath_aggregate: { merge: false },
          registrations_aggregate: { merge: false },
          user_roles_aggregate: { merge: false },
          roles_aggregate: { merge: false },
          sessions_aggregate: { merge: false },
        },
      },
      // Aggregate fields optimization
      transaction_aggregate: {
        merge: true,
      },
      result_aggregate: {
        merge: true,
      },
      progress_aggregate: {
        merge: true,
      },
      audit_aggregate: {
        merge: true,
      },
    },
    // Garbage collection settings
    possibleTypes: {},
    dataIdFromObject: (object) => {
      switch (object.__typename) {
        case 'User':
          return `User:${object.id}`;
        case 'Transaction':
          return `Transaction:${object.id}`;
        case 'Result':
          return `Result:${object.id}`;
        case 'Progress':
          return `Progress:${object.id}`;
        case 'Audit':
          return `Audit:${object.id}`;
        case 'Event':
          return `Event:${object.id}`;
        case 'Group':
          return `Group:${object.id}`;
        case 'Object':
          return `Object:${object.id}`;
        default:
          return null;
      }
    },
  });
};

// ============================================================================
// QUERY BATCHING AND OPTIMIZATION
// ============================================================================

// Query batching utility
export class QueryBatcher {
  constructor(client, batchInterval = 50) {
    this.client = client;
    this.batchInterval = batchInterval;
    this.pendingQueries = new Map();
    this.batchTimer = null;
  }

  // Add query to batch
  addQuery(query, variables, options = {}) {
    const queryKey = this.generateQueryKey(query, variables);
    
    return new Promise((resolve, reject) => {
      if (this.pendingQueries.has(queryKey)) {
        // Query already pending, add to callbacks
        this.pendingQueries.get(queryKey).callbacks.push({ resolve, reject });
      } else {
        // New query
        this.pendingQueries.set(queryKey, {
          query,
          variables,
          options,
          callbacks: [{ resolve, reject }],
        });
      }

      // Schedule batch execution
      this.scheduleBatch();
    });
  }

  // Generate unique key for query
  generateQueryKey(query, variables) {
    return `${query.loc.source.body}:${JSON.stringify(variables)}`;
  }

  // Schedule batch execution
  scheduleBatch() {
    if (this.batchTimer) return;

    this.batchTimer = setTimeout(() => {
      this.executeBatch();
      this.batchTimer = null;
    }, this.batchInterval);
  }

  // Execute batched queries
  async executeBatch() {
    const queries = Array.from(this.pendingQueries.values());
    this.pendingQueries.clear();

    // Execute queries in parallel
    const promises = queries.map(async ({ query, variables, options, callbacks }) => {
      try {
        const result = await this.client.query({
          query,
          variables,
          ...options,
        });
        
        // Resolve all callbacks for this query
        callbacks.forEach(({ resolve }) => resolve(result));
      } catch (error) {
        // Reject all callbacks for this query
        callbacks.forEach(({ reject }) => reject(error));
      }
    });

    await Promise.all(promises);
  }
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

// Query performance monitor
export class QueryPerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.slowQueryThreshold = 1000; // 1 second
  }

  // Start monitoring a query
  startQuery(queryName, variables) {
    const queryId = `${queryName}_${Date.now()}_${Math.random()}`;
    this.metrics.set(queryId, {
      queryName,
      variables,
      startTime: performance.now(),
      endTime: null,
      duration: null,
      error: null,
    });
    return queryId;
  }

  // End monitoring a query
  endQuery(queryId, error = null) {
    const metric = this.metrics.get(queryId);
    if (!metric) return;

    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;
    metric.error = error;

    // Log slow queries
    if (metric.duration > this.slowQueryThreshold) {
      console.warn(`Slow GraphQL query detected:`, {
        queryName: metric.queryName,
        duration: `${metric.duration.toFixed(2)}ms`,
        variables: metric.variables,
      });
    }

    // Clean up old metrics (keep last 100)
    if (this.metrics.size > 100) {
      const oldestKey = this.metrics.keys().next().value;
      this.metrics.delete(oldestKey);
    }
  }

  // Get performance statistics
  getStats() {
    const metrics = Array.from(this.metrics.values()).filter(m => m.duration !== null);
    
    if (metrics.length === 0) {
      return { totalQueries: 0, averageDuration: 0, slowQueries: 0 };
    }

    const totalDuration = metrics.reduce((sum, m) => sum + m.duration, 0);
    const slowQueries = metrics.filter(m => m.duration > this.slowQueryThreshold).length;

    return {
      totalQueries: metrics.length,
      averageDuration: totalDuration / metrics.length,
      slowQueries,
      slowQueryPercentage: (slowQueries / metrics.length) * 100,
    };
  }
}

// ============================================================================
// CACHE UTILITIES
// ============================================================================

// Cache warming utility
export const warmCache = async (client, queries) => {
  const warmingPromises = queries.map(({ query, variables }) =>
    client.query({
      query,
      variables,
      fetchPolicy: 'cache-first',
    }).catch(error => {
      console.warn('Cache warming failed for query:', error);
    })
  );

  await Promise.all(warmingPromises);
};

// Cache invalidation utility
export const invalidateCache = (client, patterns = []) => {
  const cache = client.cache;
  
  if (patterns.length === 0) {
    // Clear entire cache
    cache.reset();
    return;
  }

  // Selective invalidation
  patterns.forEach(pattern => {
    cache.evict({ fieldName: pattern });
  });

  // Garbage collect
  cache.gc();
};

// Cache size monitoring
export const getCacheSize = (client) => {
  const cache = client.cache;
  const data = cache.extract();

  return {
    entries: Object.keys(data).length,
    sizeEstimate: JSON.stringify(data).length, // Rough estimate in characters
  };
};

// ============================================================================
// ENHANCED PERFORMANCE OPTIMIZATIONS FOR NEW QUERIES
// ============================================================================

// Query priority system for enhanced queries
export const QUERY_PRIORITIES = {
  CRITICAL: 1,    // User profile, authentication
  HIGH: 2,        // Dashboard data, XP statistics
  MEDIUM: 3,      // Analytics, detailed views
  LOW: 4,         // Background data, optional features
};

// Enhanced query configurations with priorities
export const ENHANCED_QUERY_CONFIGS = {
  GET_ENHANCED_USER_PROFILE: {
    priority: QUERY_PRIORITIES.HIGH,
    cacheTimeout: 5 * 60 * 1000, // 5 minutes
    retryAttempts: 3,
    batchable: false, // Profile queries should be immediate
  },
  GET_COMPREHENSIVE_USER_ANALYTICS: {
    priority: QUERY_PRIORITIES.MEDIUM,
    cacheTimeout: 10 * 60 * 1000, // 10 minutes
    retryAttempts: 2,
    batchable: true,
  },
  GET_PERFORMANCE_ANALYTICS: {
    priority: QUERY_PRIORITIES.MEDIUM,
    cacheTimeout: 15 * 60 * 1000, // 15 minutes
    retryAttempts: 2,
    batchable: true,
  },
  GET_COLLABORATION_ANALYTICS: {
    priority: QUERY_PRIORITIES.LOW,
    cacheTimeout: 20 * 60 * 1000, // 20 minutes
    retryAttempts: 1,
    batchable: true,
  },
  GET_USER_EVENTS_DETAILED: {
    priority: QUERY_PRIORITIES.MEDIUM,
    cacheTimeout: 10 * 60 * 1000,
    retryAttempts: 2,
    batchable: true,
  },
  GET_USER_LABELS: {
    priority: QUERY_PRIORITIES.LOW,
    cacheTimeout: 30 * 60 * 1000, // 30 minutes (labels change rarely)
    retryAttempts: 1,
    batchable: true,
  },
  GET_USER_MATCHES_DETAILED: {
    priority: QUERY_PRIORITIES.LOW,
    cacheTimeout: 15 * 60 * 1000,
    retryAttempts: 1,
    batchable: true,
  },
  GET_USER_OBJECT_AVAILABILITIES: {
    priority: QUERY_PRIORITIES.MEDIUM,
    cacheTimeout: 5 * 60 * 1000,
    retryAttempts: 2,
    batchable: true,
  },
  GET_USER_PROGRESS_BY_PATH: {
    priority: QUERY_PRIORITIES.HIGH,
    cacheTimeout: 2 * 60 * 1000, // 2 minutes (progress changes frequently)
    retryAttempts: 3,
    batchable: false,
  },
  GET_USER_SESSIONS: {
    priority: QUERY_PRIORITIES.LOW,
    cacheTimeout: 60 * 60 * 1000, // 1 hour
    retryAttempts: 1,
    batchable: true,
  },
  GET_USER_XPS: {
    priority: QUERY_PRIORITIES.MEDIUM,
    cacheTimeout: 10 * 60 * 1000,
    retryAttempts: 2,
    batchable: true,
  },
  GET_USER_CREATED_OBJECTS: {
    priority: QUERY_PRIORITIES.MEDIUM,
    cacheTimeout: 15 * 60 * 1000,
    retryAttempts: 2,
    batchable: true,
  },
};

// Enhanced query batcher with priority support
export class EnhancedQueryBatcher extends QueryBatcher {
  constructor(client, batchInterval = 50) {
    super(client, batchInterval);
    this.priorityQueues = {
      [QUERY_PRIORITIES.CRITICAL]: [],
      [QUERY_PRIORITIES.HIGH]: [],
      [QUERY_PRIORITIES.MEDIUM]: [],
      [QUERY_PRIORITIES.LOW]: [],
    };
  }

  // Add query with priority
  addPriorityQuery(query, variables, options = {}) {
    const queryName = query.definitions[0]?.name?.value;
    const config = ENHANCED_QUERY_CONFIGS[queryName] || {
      priority: QUERY_PRIORITIES.MEDIUM,
      batchable: true,
    };

    if (!config.batchable) {
      // Execute immediately for non-batchable queries
      return this.client.query({ query, variables, ...options });
    }

    const priority = config.priority;
    const queryKey = this.generateQueryKey(query, variables);

    return new Promise((resolve, reject) => {
      if (this.pendingQueries.has(queryKey)) {
        this.pendingQueries.get(queryKey).callbacks.push({ resolve, reject });
      } else {
        const queryItem = {
          query,
          variables,
          options,
          callbacks: [{ resolve, reject }],
          priority,
          timestamp: Date.now(),
        };

        this.pendingQueries.set(queryKey, queryItem);
        this.priorityQueues[priority].push(queryKey);
      }

      this.scheduleBatch();
    });
  }

  // Execute batches by priority
  async executeBatch() {
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    // Process queries by priority
    for (const priority of [
      QUERY_PRIORITIES.CRITICAL,
      QUERY_PRIORITIES.HIGH,
      QUERY_PRIORITIES.MEDIUM,
      QUERY_PRIORITIES.LOW,
    ]) {
      const queryKeys = this.priorityQueues[priority];
      if (queryKeys.length === 0) continue;

      // Execute queries in this priority level
      const batchPromises = queryKeys.map(async (queryKey) => {
        const queryItem = this.pendingQueries.get(queryKey);
        if (!queryItem) return;

        try {
          const result = await this.client.query({
            query: queryItem.query,
            variables: queryItem.variables,
            ...queryItem.options,
          });

          queryItem.callbacks.forEach(({ resolve }) => resolve(result));
        } catch (error) {
          queryItem.callbacks.forEach(({ reject }) => reject(error));
        }

        this.pendingQueries.delete(queryKey);
      });

      await Promise.all(batchPromises);
      this.priorityQueues[priority] = [];

      // Add small delay between priority levels to prevent overwhelming
      if (priority !== QUERY_PRIORITIES.LOW) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }
  }
}

// Enhanced cache warming for new queries
export const warmEnhancedCache = async (client, userId, campus = null) => {
  const enhancedQueries = [
    {
      query: GET_ENHANCED_USER_PROFILE,
      variables: { userId },
      priority: QUERY_PRIORITIES.HIGH,
    },
    {
      query: GET_COMPREHENSIVE_USER_ANALYTICS,
      variables: { userId, campus },
      priority: QUERY_PRIORITIES.MEDIUM,
    },
    {
      query: GET_USER_PROGRESS_BY_PATH,
      variables: { userId, pathPattern: '%', limit: 20 },
      priority: QUERY_PRIORITIES.HIGH,
    },
    {
      query: GET_USER_LABELS,
      variables: { userId },
      priority: QUERY_PRIORITIES.LOW,
    },
    {
      query: GET_PERFORMANCE_ANALYTICS,
      variables: {
        userId,
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        endDate: new Date().toISOString()
      },
      priority: QUERY_PRIORITIES.MEDIUM,
    },
    {
      query: GET_USER_EVENTS_DETAILED,
      variables: { userId, limit: 20 },
      priority: QUERY_PRIORITIES.MEDIUM,
    },
    {
      query: GET_USER_OBJECT_AVAILABILITIES,
      variables: { userId, limit: 20 },
      priority: QUERY_PRIORITIES.MEDIUM,
    },
    {
      query: GET_USER_XPS,
      variables: { userId, limit: 50 },
      priority: QUERY_PRIORITIES.MEDIUM,
    },
  ];

  const batcher = new EnhancedQueryBatcher(client);

  const warmingPromises = enhancedQueries.map(({ query, variables }) => {
    return batcher.addPriorityQuery(query, variables, {
      fetchPolicy: 'cache-first',
      errorPolicy: 'ignore',
    }).catch(error => {
      const queryName = query.definitions[0]?.name?.value || 'Unknown Query';
      console.warn(`Cache warming failed for ${queryName}:`, error);
    });
  });

  await Promise.all(warmingPromises);
};
