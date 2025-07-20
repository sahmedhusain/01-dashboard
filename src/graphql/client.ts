import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GRAPHQL_ENDPOINT, getAuthHeader, clearAuthData } from '../utils/auth';

// ============================================================================
// SIMPLIFIED APOLLO CLIENT CONFIGURATION
// Following reference patterns with essential functionality only
// ============================================================================

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

// Error link to handle GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );

      // Handle JWT-specific errors
      if (message.includes('JWT') || message.includes('JWS') || message.includes('verify')) {
        console.warn('JWT verification error detected, clearing auth data');
        clearAuthData();
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

    // Handle 401/403 network errors
    const statusCode = (networkError as any)?.statusCode;
    if (statusCode === 401 || statusCode === 403) {
      console.warn('Network authentication error, clearing auth data');
      clearAuthData();
      return;
    }
  }
});

// Enhanced cache configuration aligned with reference patterns
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user: {
          merge(_, incoming) {
            return incoming;
          },
        },
        transaction: {
          merge(_, incoming) {
            return incoming;
          },
        },
        audit: {
          merge(_, incoming) {
            return incoming;
          },
        },
        progress: {
          merge(_, incoming) {
            return incoming;
          },
        },
        result: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
    User: {
      fields: {
        // Cache user data by login for efficient lookups
        login: {
          read(login) {
            return login;
          },
        },
      },
    },
  },
  // Enable result caching for better performance
  resultCaching: true,
  // Add data ID from object for better normalization
  dataIdFromObject: (object) => {
    if (object.__typename && object.id) {
      return `${object.__typename}:${object.id}`;
    }
    if (object.__typename && object.login) {
      return `${object.__typename}:${object.login}`;
    }
    return null;
  },
});

// Apollo Client configuration - simplified
const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
  },
  connectToDevTools: import.meta.env.DEV,
});

export default client;
