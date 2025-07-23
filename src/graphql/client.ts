import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ApolloLink, Observable } from '@apollo/client';
import { GRAPHQL_ENDPOINT, getAuthHeader, clearAuthData } from '../utils/auth';

// ============================================================================
// SIMPLIFIED APOLLO CLIENT CONFIGURATION
// Following reference patterns with essential functionality only
// ============================================================================

// Mock data for development
const createMockUserData = (userId: number) => ({
  id: userId,
  login: 'sayedahmed',
  firstName: 'Sayed',
  lastName: 'Ahmed',
  campus: 'bahrain',
  auditRatio: 1.2,
  totalUp: 2800000,
  totalDown: 1500000,
  profile: JSON.stringify({
    bio: 'Test user for development',
    location: 'Bahrain'
  }),
  attrs: {
    country: 'Bahrain',
    degree: 'Computer Science',
    personal: {
      email: 'sayedahmed97.sad@gmail.com',
      phone: '+973-12345678'
    }
  },
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: new Date().toISOString()
});

// Mock link for development
const mockLink = new ApolloLink((operation, forward) => {
  const authHeaders = getAuthHeader();
  const isMockMode = authHeaders.Authorization?.includes('mock-dev-token');

  if (isMockMode) {
    if (import.meta.env.DEV) {
      console.log('Mock GraphQL - Intercepting query:', operation.operationName);
    }

    return new Observable(observer => {
      setTimeout(() => {
        const variables = operation.variables;
        let mockData = {};

        // Handle different query types
        if (operation.query.definitions[0]?.name?.value === 'GetUserById') {
          mockData = {
            user_by_pk: createMockUserData(variables.userId)
          };
        } else {
          // Default mock response
          mockData = {
            user_by_pk: createMockUserData(1599)
          };
        }

        observer.next({ data: mockData });
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  // If not in mock mode, continue with real request
  return forward(operation);
});

// HTTP link for GraphQL endpoint
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

// Auth link to add JWT token to requests
const authLink = setContext((_, { headers }) => {
  const authHeaders = getAuthHeader();

  // Check if we're in mock mode (token starts with 'mock-dev-token')
  const isMockMode = authHeaders.Authorization?.includes('mock-dev-token');

  if (isMockMode && import.meta.env.DEV) {
    console.log('GraphQL Client - Running in mock mode');
  }

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
  link: from([errorLink, authLink, mockLink, httpLink]),
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
