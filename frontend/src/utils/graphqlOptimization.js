// GraphQL Performance Optimization Utilities
import { InMemoryCache } from '@apollo/client';

// ============================================================================
// CACHING STRATEGIES
// ============================================================================

// Enhanced cache configuration with field policies
export const createOptimizedCache = () => {
  return new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // User-related queries
          user: {
            merge(existing = [], incoming) {
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
          result: {
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
          // Event and group queries
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
        },
      },
      User: {
        fields: {
          transactions: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          results: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          progresses: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
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
