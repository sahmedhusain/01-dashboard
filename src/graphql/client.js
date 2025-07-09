import { ApolloClient, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GRAPHQL_ENDPOINT, getAuthHeader, clearAuthData } from '../utils/auth';
import { createOptimizedCache, QueryPerformanceMonitor } from '../utils/graphqlOptimization';

// Initialize performance monitor
const performanceMonitor = new QueryPerformanceMonitor();

// HTTP link for GraphQL endpoint
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

// Auth link to add JWT token to requests
const authLink = setContext((_, { headers }) => {
  const authHeaders = getAuthHeader();
  
  return {
    headers: {
      ...headers,
      ...authHeaders,
      'Content-Type': 'application/json',
    }
  };
});

// Performance monitoring link
const performanceLink = setContext((_, { headers }) => {
  const queryId = performanceMonitor.startQuery('GraphQL Query', {});
  return {
    headers,
    queryId,
  };
});

// Error link to handle GraphQL and network errors with performance tracking
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  const queryId = operation.getContext().queryId;

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );

      // Track error in performance monitor
      if (queryId) {
        performanceMonitor.endQuery(queryId, message);
      }

      // Handle JWT-specific errors
      if (message.includes('JWT') || message.includes('JWS') || message.includes('verify')) {
        console.warn('JWT verification error detected, clearing auth data');
        clearAuthData();
        // Don't auto-reload, let the app handle the redirect
        return;
      }

      // Handle authentication errors
      if (extensions?.code === 'UNAUTHENTICATED' || extensions?.code === 'FORBIDDEN') {
        console.warn('Authentication error detected, clearing auth data');
        clearAuthData();
        return;
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);

    // Track network error
    if (queryId) {
      performanceMonitor.endQuery(queryId, networkError.message);
    }

    // Handle 401/403 network errors
    if (networkError.statusCode === 401 || networkError.statusCode === 403) {
      console.warn('Network authentication error, clearing auth data');
      clearAuthData();
      return;
    }
  }
});

// Apollo Client configuration with optimized cache and performance monitoring
const client = new ApolloClient({
  link: from([errorLink, performanceLink, authLink, httpLink]),
  cache: createOptimizedCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first', // Use cache-first for better performance
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first', // Use cache-first for better performance
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

// Export performance monitor for use in hooks
export { performanceMonitor };

// Clear cache on initialization to avoid stale data
client.clearStore().catch(console.warn);

export default client;
