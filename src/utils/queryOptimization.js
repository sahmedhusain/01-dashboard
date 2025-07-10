/**
 * GraphQL Query Optimization Utilities
 * Provides caching, batching, and performance optimization for GraphQL queries
 */

// Query complexity scoring for performance monitoring
export const calculateQueryComplexity = (query) => {
  if (!query) return 0;
  
  const queryString = typeof query === 'string' ? query : query.loc?.source?.body || '';
  
  let complexity = 0;
  
  // Count nested levels (each level adds complexity)
  const nestedLevels = (queryString.match(/{/g) || []).length;
  complexity += nestedLevels * 2;
  
  // Count aggregate queries (expensive operations)
  const aggregates = (queryString.match(/_aggregate/g) || []).length;
  complexity += aggregates * 5;
  
  // Count joins/relations
  const relations = (queryString.match(/\.\.\./g) || []).length; // Fragment usage
  complexity += relations * 1;
  
  // Count where clauses (filtering complexity)
  const whereClauses = (queryString.match(/where:/g) || []).length;
  complexity += whereClauses * 2;
  
  // Count order_by clauses
  const orderByClauses = (queryString.match(/order_by:/g) || []).length;
  complexity += orderByClauses * 1;
  
  return complexity;
};

// Query caching configuration
export const getCacheConfig = (queryName, variables = {}) => {
  const baseConfig = {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  };

  // Specific caching strategies for different query types
  switch (queryName) {
    case 'GET_BASIC_USER_DASHBOARD':
      return {
        ...baseConfig,
        fetchPolicy: 'cache-and-network', // Always try to get fresh data
        nextFetchPolicy: 'cache-first', // But use cache for subsequent requests
      };
      
    case 'GET_COMPREHENSIVE_USER_ANALYTICS':
      return {
        ...baseConfig,
        fetchPolicy: 'cache-first', // Heavy query, prefer cache
        nextFetchPolicy: 'cache-only', // Stick to cache after first load
      };
      
    case 'SEARCH_PROJECTS_BY_STATUS':
    case 'SEARCH_AUDITS_BY_STATUS':
    case 'SEARCH_USERS_WITH_STATUS':
      return {
        ...baseConfig,
        fetchPolicy: 'cache-and-network', // Search should be fresh
        nextFetchPolicy: 'network-only', // Always get fresh search results
      };
      
    default:
      return baseConfig;
  }
};

// Query batching utility for multiple related queries
export const createQueryBatch = (queries) => {
  return queries.map(({ query, variables, options = {} }) => ({
    query,
    variables,
    ...getCacheConfig(query.definitions?.[0]?.name?.value, variables),
    ...options,
  }));
};

// Performance monitoring for queries
export const createQueryPerformanceMonitor = () => {
  const queryMetrics = new Map();
  
  return {
    startQuery: (queryName, variables) => {
      const startTime = performance.now();
      const complexity = calculateQueryComplexity(queryName);
      
      queryMetrics.set(queryName, {
        startTime,
        complexity,
        variables,
      });
      
      return startTime;
    },
    
    endQuery: (queryName, result, error) => {
      const endTime = performance.now();
      const metrics = queryMetrics.get(queryName);
      
      if (metrics) {
        const duration = endTime - metrics.startTime;
        const performance = {
          queryName,
          duration,
          complexity: metrics.complexity,
          success: !error,
          dataSize: result ? JSON.stringify(result).length : 0,
          timestamp: new Date().toISOString(),
        };
        
        // Log slow queries for optimization
        if (duration > 2000) { // 2 seconds threshold
          console.warn('Slow GraphQL Query:', performance);
        }
        
        // Log high complexity queries
        if (metrics.complexity > 50) {
          console.warn('High Complexity GraphQL Query:', performance);
        }
        
        queryMetrics.delete(queryName);
        return performance;
      }
      
      return null;
    },
    
    getMetrics: () => Array.from(queryMetrics.entries()),
  };
};

// Query optimization recommendations
export const getQueryOptimizationRecommendations = (queryString) => {
  const recommendations = [];
  
  // Check for missing fragments
  if (queryString.includes('id\n') && queryString.includes('name\n')) {
    recommendations.push({
      type: 'fragment',
      message: 'Consider using fragments for repeated field patterns',
      severity: 'medium',
    });
  }
  
  // Check for excessive nesting
  const nestingLevel = (queryString.match(/{/g) || []).length;
  if (nestingLevel > 8) {
    recommendations.push({
      type: 'nesting',
      message: 'Query has deep nesting which may impact performance',
      severity: 'high',
    });
  }
  
  // Check for missing limits
  if (queryString.includes('_aggregate') && !queryString.includes('limit:')) {
    recommendations.push({
      type: 'pagination',
      message: 'Consider adding limits to aggregate queries',
      severity: 'medium',
    });
  }
  
  // Check for inefficient filtering
  if (queryString.includes('_ilike') && queryString.includes('%%')) {
    recommendations.push({
      type: 'filtering',
      message: 'Wildcard searches can be slow, consider more specific filters',
      severity: 'low',
    });
  }
  
  return recommendations;
};

// Query result size optimization
export const optimizeQueryResult = (data, maxSize = 1000000) => { // 1MB default
  if (!data) return data;
  
  const dataSize = JSON.stringify(data).length;
  
  if (dataSize > maxSize) {
    console.warn(`Query result size (${dataSize} bytes) exceeds recommended limit (${maxSize} bytes)`);
    
    // Could implement result truncation or pagination here
    return {
      ...data,
      _meta: {
        truncated: true,
        originalSize: dataSize,
        recommendedAction: 'Consider adding pagination or reducing field selection',
      },
    };
  }
  
  return data;
};

// Default export with all utilities
export default {
  calculateQueryComplexity,
  getCacheConfig,
  createQueryBatch,
  createQueryPerformanceMonitor,
  getQueryOptimizationRecommendations,
  optimizeQueryResult,
};
