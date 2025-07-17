# GraphQL Query Optimization Guide

This guide provides strategies and best practices for optimizing GraphQL queries in the 01 School platform.

## 🚀 Performance Optimization Strategies

### 1. Query Complexity Management

#### **Complexity Levels**
- **LOW (< 100ms)**: Basic info, simple aggregates
- **MEDIUM (100-500ms)**: User profiles, filtered data
- **HIGH (500ms-2s)**: Comprehensive analytics, multiple joins
- **VERY_HIGH (2s+)**: Complex analytics, large datasets

#### **Implementation**
```javascript
import { getQueriesByComplexity } from './src/graphql';

// Load critical data first
const fastQueries = getQueriesByComplexity('LOW');
const mediumQueries = getQueriesByComplexity('MEDIUM');

// Background load heavy queries
const heavyQueries = getQueriesByComplexity('HIGH');
```

### 2. Fragment Optimization

#### **Use Fragments to Prevent Over-fetching**
```javascript
// ❌ Bad: Over-fetching
const GET_USER_BAD = gql`
  query GetUser($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      firstName
      lastName
      email
      profile
      attrs
      # ... 20+ more fields
      transactions {
        # ... all transaction fields
      }
      audits {
        # ... all audit fields
      }
    }
  }
`;

// ✅ Good: Use fragments and selective loading
const GET_USER_GOOD = gql`
  query GetUser($userId: Int!, $includeTransactions: Boolean = false) {
    user(where: { id: { _eq: $userId } }) {
      ...UserBasicInfo
      
      transactions @include(if: $includeTransactions) {
        ...TransactionInfo
      }
    }
  }
  ${USER_BASIC_FRAGMENT}
  ${TRANSACTION_FRAGMENT}
`;
```

### 3. Pagination and Limiting

#### **Always Use Limits**
```javascript
// ❌ Bad: No limits
const GET_ALL_TRANSACTIONS = gql`
  query GetAllTransactions($userId: Int!) {
    transaction(where: { userId: { _eq: $userId } }) {
      # Could return thousands of records
    }
  }
`;

// ✅ Good: Paginated with limits
const GET_PAGINATED_TRANSACTIONS = gql`
  query GetPaginatedTransactions(
    $userId: Int!
    $limit: Int = 20
    $offset: Int = 0
  ) {
    transaction(
      where: { userId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...TransactionInfo
    }
    
    # Separate count query for pagination
    transaction_aggregate(
      where: { userId: { _eq: $userId } }
    ) {
      aggregate {
        count
      }
    }
  }
`;
```

### 4. Conditional Loading

#### **Use @include and @skip Directives**
```javascript
const GET_CONDITIONAL_DATA = gql`
  query GetConditionalData(
    $userId: Int!
    $includeAnalytics: Boolean = false
    $includeHistory: Boolean = false
  ) {
    user(where: { id: { _eq: $userId } }) {
      ...UserBasicInfo
      
      # Load analytics only when needed
      analytics @include(if: $includeAnalytics) {
        totalXP: transactions_aggregate(where: { type: { _eq: "xp" } }) {
          aggregate { sum { amount } }
        }
      }
      
      # Skip history for fast loading
      transactions @include(if: $includeHistory) {
        ...TransactionInfo
      }
    }
  }
`;
```

### 5. Aggregate Optimization

#### **Use Aggregates Instead of Counting Arrays**
```javascript
// ❌ Bad: Fetching all records to count
const COUNT_PROJECTS_BAD = gql`
  query CountProjectsBad($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      results(where: { object: { type: { _eq: "project" } } }) {
        id # Fetching all project results just to count
      }
    }
  }
`;

// ✅ Good: Use aggregates
const COUNT_PROJECTS_GOOD = gql`
  query CountProjectsGood($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      projectCount: results_aggregate(
        where: { object: { type: { _eq: "project" } } }
      ) {
        aggregate {
          count
        }
      }
    }
  }
`;
```

### 6. Caching Strategies

#### **Cache Policy Configuration**
```javascript
// Critical data - cache aggressively
const { data } = useQuery(GET_USER_PROFILE, {
  variables: { userId },
  fetchPolicy: 'cache-first',
  nextFetchPolicy: 'cache-only'
});

// Real-time data - always fresh
const { data } = useQuery(GET_LIVE_LEADERBOARD, {
  variables: { campus },
  fetchPolicy: 'cache-and-network',
  pollInterval: 30000 // Poll every 30 seconds
});

// Background data - cache with network fallback
const { data } = useQuery(GET_ANALYTICS, {
  variables: { userId },
  fetchPolicy: 'cache-first',
  errorPolicy: 'ignore' // Don't block UI on errors
});
```

### 7. Query Batching

#### **Batch Related Queries**
```javascript
// ❌ Bad: Multiple separate queries
const Component = ({ userId }) => {
  const { data: user } = useQuery(GET_USER_INFO, { variables: { userId } });
  const { data: xp } = useQuery(GET_USER_XP, { variables: { userId } });
  const { data: projects } = useQuery(GET_USER_PROJECTS, { variables: { userId } });
  // Multiple network requests
};

// ✅ Good: Single batched query
const Component = ({ userId }) => {
  const { data } = useQuery(GET_USER_DASHBOARD, { 
    variables: { userId } 
  });
  // Single network request with all needed data
};
```

## 🔧 Optimization Techniques

### 1. Database-Level Optimizations

#### **Use Proper Filtering**
```javascript
// ❌ Bad: Client-side filtering
const GET_RECENT_XP_BAD = gql`
  query GetRecentXPBad($userId: Int!) {
    transaction(where: { userId: { _eq: $userId } }) {
      # Fetch all transactions, filter on client
      id
      type
      amount
      createdAt
    }
  }
`;

// ✅ Good: Database-level filtering
const GET_RECENT_XP_GOOD = gql`
  query GetRecentXPGood($userId: Int!, $since: timestamptz!) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        createdAt: { _gte: $since }
      }
      order_by: { createdAt: desc }
      limit: 50
    ) {
      id
      amount
      createdAt
    }
  }
`;
```

### 2. Selective Field Loading

#### **Load Only Required Fields**
```javascript
// ❌ Bad: Loading all fields
const GET_USER_LIST_BAD = gql`
  query GetUserListBad {
    user {
      # All user fields including heavy JSON fields
      id
      login
      firstName
      lastName
      profile # Heavy JSON field
      attrs # Heavy JSON field
      # ... many more fields
    }
  }
`;

// ✅ Good: Minimal fields for lists
const GET_USER_LIST_GOOD = gql`
  query GetUserListGood {
    user {
      id
      login
      firstName
      lastName
      campus
      avatarUrl
      # Only essential fields for list view
    }
  }
`;
```

### 3. Relationship Optimization

#### **Limit Nested Relationships**
```javascript
// ❌ Bad: Deep nesting without limits
const GET_GROUP_DEEP_BAD = gql`
  query GetGroupDeepBad($groupId: Int!) {
    group_by_pk(id: $groupId) {
      groupUsers {
        user {
          transactions {
            object {
              # Deep nesting can cause performance issues
            }
          }
        }
      }
    }
  }
`;

// ✅ Good: Controlled nesting with limits
const GET_GROUP_CONTROLLED = gql`
  query GetGroupControlled($groupId: Int!) {
    group_by_pk(id: $groupId) {
      ...GroupInfo
      groupUsers(limit: 10) {
        ...GroupUserInfo
        user {
          ...UserBasicInfo
        }
      }
    }
  }
`;
```

## 📊 Performance Monitoring

### 1. Query Performance Tracking

```javascript
import { performanceMonitor } from './src/graphql/client';

// Track query performance
const useOptimizedQuery = (query, variables) => {
  const queryId = performanceMonitor.startQuery(query.definitions[0].name.value, variables);
  
  const result = useQuery(query, {
    variables,
    onCompleted: () => {
      performanceMonitor.endQuery(queryId, 'success');
    },
    onError: (error) => {
      performanceMonitor.endQuery(queryId, error.message);
    }
  });
  
  return result;
};
```

### 2. Performance Metrics

```javascript
// Get performance insights
const performanceStats = performanceMonitor.getStats();
console.log('Slow queries:', performanceStats.slowQueries);
console.log('Error rates:', performanceStats.errorRates);
console.log('Cache hit rates:', performanceStats.cacheHitRates);
```

## 🎯 Best Practices Summary

### ✅ Do's
1. **Use fragments** for consistent data structures
2. **Implement pagination** for all list queries
3. **Cache appropriately** based on data freshness needs
4. **Use aggregates** instead of counting arrays
5. **Filter at database level** not client-side
6. **Load conditionally** with @include/@skip
7. **Monitor performance** and optimize slow queries
8. **Batch related queries** to reduce network requests

### ❌ Don'ts
1. **Don't over-fetch** - only request needed fields
2. **Don't ignore limits** - always paginate large datasets
3. **Don't nest deeply** without considering performance
4. **Don't cache everything** - some data needs to be fresh
5. **Don't ignore errors** - handle gracefully with fallbacks
6. **Don't block UI** - use background loading for heavy queries
7. **Don't forget indexes** - ensure database is properly indexed
8. **Don't skip testing** - test with realistic data volumes

## 🔍 Query Analysis Tools

### 1. Query Complexity Analysis
```javascript
import { analyzeQueryComplexity } from './src/utils/queryAnalysis';

const complexity = analyzeQueryComplexity(GET_COMPREHENSIVE_ANALYTICS);
if (complexity > 1000) {
  console.warn('Query complexity too high, consider optimization');
}
```

### 2. Performance Testing
```javascript
// Test query performance
const testQueryPerformance = async (query, variables) => {
  const start = performance.now();
  const result = await client.query({ query, variables });
  const end = performance.now();
  
  console.log(`Query took ${end - start}ms`);
  return result;
};
```

## 📈 Migration Strategy

### Phase 1: Identify Slow Queries
1. Enable performance monitoring
2. Identify queries taking > 1 second
3. Analyze query complexity and data volume

### Phase 2: Optimize Critical Path
1. Optimize dashboard and profile queries first
2. Implement progressive loading
3. Add appropriate caching

### Phase 3: Background Optimization
1. Optimize analytics and reporting queries
2. Implement query batching
3. Add performance monitoring alerts

### Phase 4: Continuous Improvement
1. Regular performance reviews
2. Query optimization based on usage patterns
3. Database index optimization
