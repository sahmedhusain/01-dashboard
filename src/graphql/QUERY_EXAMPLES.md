# GraphQL Query Usage Examples

This document provides practical examples of how to use the GraphQL queries in React components and other contexts.

## 🚀 Basic Usage Patterns

### 1. Simple User Profile Query

```javascript
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../graphql';

function UserProfile({ userId }) {
  const { data, loading, error } = useQuery(GET_USER_PROFILE, {
    variables: { userId },
    // Cache for 5 minutes
    fetchPolicy: 'cache-first',
    errorPolicy: 'all'
  });

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const user = data?.user?.[0];
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h1>{user.firstName} {user.lastName}</h1>
      <p>Campus: {user.campus}</p>
      <p>Audit Ratio: {user.auditRatio}</p>
      <p>Total Up: {user.totalUp}</p>
      <p>Total Down: {user.totalDown}</p>
      
      {/* User roles */}
      <div className="roles">
        <h3>Roles:</h3>
        {user.user_roles?.map(userRole => (
          <span key={userRole.id} className="role-badge">
            {userRole.role.name}
          </span>
        ))}
      </div>

      {/* User records */}
      {user.records?.length > 0 && (
        <div className="records">
          <h3>Records:</h3>
          {user.records.map(record => (
            <div key={record.id} className="record">
              <p>{record.message}</p>
              <small>By: {record.author.login}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 2. Dashboard with Multiple Queries

```javascript
import React from 'react';
import { useQuery } from '@apollo/client';
import { 
  GET_BASIC_USER_DASHBOARD,
  GET_XP_STATISTICS,
  GET_PROJECT_STATISTICS 
} from '../graphql';

function Dashboard({ userId }) {
  // Load critical data first
  const { data: dashboardData, loading: dashboardLoading } = useQuery(
    GET_BASIC_USER_DASHBOARD,
    { 
      variables: { userId },
      fetchPolicy: 'cache-first'
    }
  );

  // Load detailed data in background
  const { data: xpData, loading: xpLoading } = useQuery(
    GET_XP_STATISTICS,
    { 
      variables: { userId },
      fetchPolicy: 'cache-first',
      // Don't block UI on this query
      errorPolicy: 'ignore'
    }
  );

  const { data: projectData } = useQuery(
    GET_PROJECT_STATISTICS,
    { 
      variables: { userId },
      fetchPolicy: 'cache-first'
    }
  );

  if (dashboardLoading) return <div>Loading dashboard...</div>;

  const user = dashboardData?.user?.[0];
  const totalXP = xpData?.totalXP?.aggregate?.sum?.amount || 0;
  const totalProjects = projectData?.totalProjects?.aggregate?.count || 0;
  const passedProjects = projectData?.passedProjects?.aggregate?.count || 0;

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total XP</h3>
          <p>{Math.round(totalXP / 1000)} KB</p>
          {xpLoading && <small>Updating...</small>}
        </div>
        
        <div className="stat-card">
          <h3>Projects</h3>
          <p>{passedProjects} / {totalProjects}</p>
          <small>{totalProjects > 0 ? Math.round((passedProjects / totalProjects) * 100) : 0}% success rate</small>
        </div>
        
        <div className="stat-card">
          <h3>Audit Ratio</h3>
          <p>{user?.auditRatio?.toFixed(2) || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
```

### 3. Paginated Transaction History

```javascript
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_TRANSACTIONS } from '../graphql';

function TransactionHistory({ userId }) {
  const [page, setPage] = useState(0);
  const [transactionTypes, setTransactionTypes] = useState(['xp', 'up', 'down']);
  const limit = 20;

  const { data, loading, error, fetchMore } = useQuery(
    GET_USER_TRANSACTIONS,
    {
      variables: {
        userId,
        limit,
        offset: page * limit,
        transactionTypes,
        campus: null // or specific campus
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  const loadMore = () => {
    fetchMore({
      variables: {
        offset: (page + 1) * limit
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...fetchMoreResult,
          transaction: [
            ...prev.transaction,
            ...fetchMoreResult.transaction
          ]
        };
      }
    });
    setPage(page + 1);
  };

  const transactions = data?.transaction || [];
  const totalAmount = data?.transaction_aggregate?.aggregate?.sum?.amount || 0;
  const totalCount = data?.transaction_aggregate?.aggregate?.count || 0;

  return (
    <div className="transaction-history">
      <div className="filters">
        <h3>Transaction History</h3>
        <div className="type-filters">
          {['xp', 'up', 'down'].map(type => (
            <label key={type}>
              <input
                type="checkbox"
                checked={transactionTypes.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setTransactionTypes([...transactionTypes, type]);
                  } else {
                    setTransactionTypes(transactionTypes.filter(t => t !== type));
                  }
                  setPage(0); // Reset pagination
                }}
              />
              {type.toUpperCase()}
            </label>
          ))}
        </div>
        <p>Total: {Math.round(totalAmount / 1000)} KB ({totalCount} transactions)</p>
      </div>

      <div className="transaction-list">
        {transactions.map(transaction => (
          <div key={transaction.id} className={`transaction transaction-${transaction.type}`}>
            <div className="transaction-info">
              <strong>{transaction.object?.name || 'Unknown'}</strong>
              <span className="amount">
                {transaction.type === 'xp' 
                  ? `${Math.round(transaction.amount / 1000)} KB`
                  : `${transaction.amount} ${transaction.type}`
                }
              </span>
            </div>
            <div className="transaction-meta">
              <small>{new Date(transaction.createdAt).toLocaleDateString()}</small>
              <small>{transaction.path}</small>
            </div>
          </div>
        ))}
      </div>

      {loading && <div>Loading more transactions...</div>}
      {error && <div>Error: {error.message}</div>}
      
      <button onClick={loadMore} disabled={loading}>
        Load More
      </button>
    </div>
  );
}
```

### 4. Real-time Progress Tracking

```javascript
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROGRESS_TIMELINE } from '../graphql';

function ProgressTracker({ userId }) {
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
  const endDate = new Date();

  const { data, loading, refetch } = useQuery(
    GET_PROGRESS_TIMELINE,
    {
      variables: {
        userId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      },
      fetchPolicy: 'cache-and-network',
      pollInterval: 30000 // Poll every 30 seconds for updates
    }
  );

  // Manual refresh
  const handleRefresh = () => {
    refetch();
  };

  const progress = data?.progress || [];
  const completedCount = data?.completed_in_period?.aggregate?.count || 0;
  const totalProgress = data?.progress_period_stats?.aggregate?.count || 0;

  return (
    <div className="progress-tracker">
      <div className="progress-header">
        <h3>Recent Progress (Last 30 Days)</h3>
        <button onClick={handleRefresh} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="progress-stats">
        <div className="stat">
          <span className="label">Total Items:</span>
          <span className="value">{totalProgress}</span>
        </div>
        <div className="stat">
          <span className="label">Completed:</span>
          <span className="value">{completedCount}</span>
        </div>
        <div className="stat">
          <span className="label">Completion Rate:</span>
          <span className="value">
            {totalProgress > 0 ? Math.round((completedCount / totalProgress) * 100) : 0}%
          </span>
        </div>
      </div>

      <div className="progress-timeline">
        {progress.map(item => (
          <div key={item.id} className={`progress-item ${item.isDone ? 'completed' : 'in-progress'}`}>
            <div className="progress-info">
              <strong>{item.object?.name}</strong>
              <span className="grade">Grade: {item.grade}</span>
            </div>
            <div className="progress-meta">
              <small>Updated: {new Date(item.updatedAt).toLocaleDateString()}</small>
              <small>Path: {item.path}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 5. Advanced Analytics with Error Handling

```javascript
import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PERFORMANCE_ANALYTICS } from '../graphql';

function PerformanceAnalytics({ userId }) {
  const [timeRange, setTimeRange] = useState('30'); // days
  
  const { startDate, endDate } = useMemo(() => {
    const end = new Date();
    const start = new Date(Date.now() - parseInt(timeRange) * 24 * 60 * 60 * 1000);
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString()
    };
  }, [timeRange]);

  const { data, loading, error } = useQuery(
    GET_PERFORMANCE_ANALYTICS,
    {
      variables: { userId, startDate, endDate },
      fetchPolicy: 'cache-first',
      errorPolicy: 'partial', // Show partial data even if some fields fail
      notifyOnNetworkStatusChange: true
    }
  );

  // Error boundary for graceful degradation
  if (error && !data) {
    return (
      <div className="analytics-error">
        <h3>Analytics Temporarily Unavailable</h3>
        <p>We're having trouble loading your analytics. Please try again later.</p>
        <details>
          <summary>Technical Details</summary>
          <pre>{error.message}</pre>
        </details>
      </div>
    );
  }

  const user = data?.user?.[0];
  const recentXP = user?.recentXP?.aggregate?.sum?.amount || 0;
  const recentProjects = user?.recentProjects?.aggregate?.count || 0;
  const recentAudits = user?.recentAuditsGiven?.aggregate?.count || 0;

  return (
    <div className="performance-analytics">
      <div className="analytics-controls">
        <h3>Performance Analytics</h3>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
        {loading && <span className="loading-indicator">Updating...</span>}
      </div>

      <div className="analytics-grid">
        <div className="metric-card">
          <h4>XP Gained</h4>
          <div className="metric-value">
            {Math.round(recentXP / 1000)} KB
          </div>
          <div className="metric-change">
            {/* You could add comparison with previous period here */}
          </div>
        </div>

        <div className="metric-card">
          <h4>Projects Completed</h4>
          <div className="metric-value">{recentProjects}</div>
        </div>

        <div className="metric-card">
          <h4>Audits Given</h4>
          <div className="metric-value">{recentAudits}</div>
        </div>

        <div className="metric-card">
          <h4>Activity Score</h4>
          <div className="metric-value">
            {/* Calculate activity score based on multiple metrics */}
            {Math.round((recentXP / 1000 + recentProjects * 10 + recentAudits * 5) / 10)}
          </div>
        </div>
      </div>

      {/* Activity breakdown by type */}
      <div className="activity-breakdown">
        <h4>Activity Breakdown</h4>
        <div className="activity-types">
          <div className="activity-type">
            <span>Projects:</span>
            <span>{user?.projectActivity?.aggregate?.count || 0}</span>
          </div>
          <div className="activity-type">
            <span>Exercises:</span>
            <span>{user?.exerciseActivity?.aggregate?.count || 0}</span>
          </div>
          <div className="activity-type">
            <span>Quests:</span>
            <span>{user?.questActivity?.aggregate?.count || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 🔧 Advanced Patterns

### Custom Hook for Query Management

```javascript
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

function useUserAnalytics(userId, options = {}) {
  const {
    includeTransactions = true,
    includeAudits = true,
    timeRange = 30,
    campus = null
  } = options;

  // Calculate date range
  const { startDate, endDate } = useMemo(() => {
    const end = new Date();
    const start = new Date(Date.now() - timeRange * 24 * 60 * 60 * 1000);
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString()
    };
  }, [timeRange]);

  // Basic user data (always loaded)
  const userQuery = useQuery(GET_USER_INFO, {
    variables: { userId },
    fetchPolicy: 'cache-first'
  });

  // Conditional queries based on options
  const transactionQuery = useQuery(GET_USER_TRANSACTIONS, {
    variables: { userId, campus, limit: 100 },
    skip: !includeTransactions,
    fetchPolicy: 'cache-first'
  });

  const auditQuery = useQuery(GET_USER_AUDITS, {
    variables: { userId, limit: 50 },
    skip: !includeAudits,
    fetchPolicy: 'cache-first'
  });

  // Combine results
  return {
    user: userQuery.data?.user?.[0],
    transactions: transactionQuery.data?.transaction || [],
    audits: auditQuery.data?.audits_given || [],
    loading: userQuery.loading || transactionQuery.loading || auditQuery.loading,
    error: userQuery.error || transactionQuery.error || auditQuery.error,
    refetch: () => {
      userQuery.refetch();
      if (includeTransactions) transactionQuery.refetch();
      if (includeAudits) auditQuery.refetch();
    }
  };
}

// Usage
function UserDashboard({ userId }) {
  const { user, transactions, audits, loading, error } = useUserAnalytics(userId, {
    includeTransactions: true,
    includeAudits: true,
    timeRange: 30
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{user?.login}</h1>
      <p>Transactions: {transactions.length}</p>
      <p>Audits: {audits.length}</p>
    </div>
  );
}
```

## 🎯 Performance Tips

1. **Use appropriate fetch policies**:
   - `cache-first`: For relatively static data
   - `cache-and-network`: For data that might change
   - `network-only`: For always-fresh data

2. **Implement pagination** for large datasets
3. **Use fragments** to avoid over-fetching
4. **Cache heavy queries** and refresh strategically
5. **Handle errors gracefully** with partial data display
6. **Monitor query performance** and optimize as needed

## 🚨 Common Pitfalls

1. **Over-fetching**: Don't request more data than you need
2. **Under-caching**: Cache appropriate queries to reduce server load
3. **Ignoring errors**: Always handle GraphQL errors gracefully
4. **Blocking UI**: Use background loading for non-critical data
5. **Not using variables**: Always parameterize your queries
