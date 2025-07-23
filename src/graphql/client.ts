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
        const operationName = operation.operationName;
        if (operationName === 'GetUserById' || operationName === 'GET_USER_BY_PK') {
          mockData = {
            user_by_pk: createMockUserData(variables.userId || variables.id || 1599)
          };
        } else if (operationName?.includes('USER')) {
          mockData = {
            user_by_pk: createMockUserData(1599),
            user_public_view: [createMockUserData(1599)]
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

// Enhanced cache configuration for comprehensive data support
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // User-related caching
        user: {
          merge(_, incoming) {
            return incoming;
          },
        },
        user_public_view: {
          merge(_, incoming) {
            return incoming;
          },
        },
        user_by_pk: {
          merge(_, incoming) {
            return incoming;
          },
        },

        // Transaction and XP caching
        transaction: {
          merge(_, incoming) {
            return incoming;
          },
        },
        xp_view: {
          merge(_, incoming) {
            return incoming;
          },
        },

        // Audit system caching
        audit: {
          merge(_, incoming) {
            return incoming;
          },
        },
        audit_private: {
          merge(_, incoming) {
            return incoming;
          },
        },

        // Progress and results caching
        progress: {
          merge(_, incoming) {
            return incoming;
          },
        },
        progress_by_path_view: {
          merge(_, incoming) {
            return incoming;
          },
        },
        result: {
          merge(_, incoming) {
            return incoming;
          },
        },

        // Group and collaboration caching
        group: {
          merge(_, incoming) {
            return incoming;
          },
        },
        group_user: {
          merge(_, incoming) {
            return incoming;
          },
        },

        // Event management caching
        event: {
          merge(_, incoming) {
            return incoming;
          },
        },
        event_user: {
          merge(_, incoming) {
            return incoming;
          },
        },
        event_user_view: {
          merge(_, incoming) {
            return incoming;
          },
        },

        // Object and curriculum caching
        object: {
          merge(_, incoming) {
            return incoming;
          },
        },
        object_child: {
          merge(_, incoming) {
            return incoming;
          },
        },
        object_availability: {
          merge(_, incoming) {
            return incoming;
          },
        },

        // Registration system caching
        registration: {
          merge(_, incoming) {
            return incoming;
          },
        },
        registration_user: {
          merge(_, incoming) {
            return incoming;
          },
        },
        registration_user_view: {
          merge(_, incoming) {
            return incoming;
          },
        },

        // Path and learning structure caching
        path: {
          merge(_, incoming) {
            return incoming;
          },
        },
        path_archive: {
          merge(_, incoming) {
            return incoming;
          },
        },

        // Additional system entities
        role: {
          merge(_, incoming) {
            return incoming;
          },
        },
        user_role: {
          merge(_, incoming) {
            return incoming;
          },
        },
        label: {
          merge(_, incoming) {
            return incoming;
          },
        },
        markdown: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },

    // Enhanced type policies for better normalization
    User: {
      fields: {
        login: {
          read(login) {
            return login;
          },
        },
      },
    },

    Group: {
      keyFields: ["id"],
    },

    Event: {
      keyFields: ["id"],
    },

    Object: {
      keyFields: ["id"],
    },

    Progress: {
      keyFields: ["id"],
    },

    Result: {
      keyFields: ["id"],
    },

    Transaction: {
      keyFields: ["id"],
    },

    Audit: {
      keyFields: ["id"],
    },
  },

  // Enable result caching for better performance with large datasets
  resultCaching: true,

  // Enhanced data ID generation for comprehensive entity support
  dataIdFromObject: (object) => {
    // Handle all major entity types
    if (object.__typename && object.id) {
      return `${object.__typename}:${object.id}`;
    }

    // Handle user entities by login
    if (object.__typename && object.login) {
      return `${object.__typename}:${object.login}`;
    }

    // Handle path entities
    if (object.__typename === 'Path' && object.path) {
      return `Path:${object.path}`;
    }

    // Handle type entities
    if (object.__typename && object.type && !object.id) {
      return `${object.__typename}:${object.type}`;
    }

    // Handle name-based entities
    if (object.__typename && object.name && !object.id) {
      return `${object.__typename}:${object.name}`;
    }

    return null;
  },
});

// Apollo Client configuration - optimized for comprehensive data
const client = new ApolloClient({
  link: from([errorLink, authLink, mockLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      // Optimize for large datasets
      returnPartialData: true,
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
      // Allow partial data for better UX with large datasets
      returnPartialData: true,
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  // Enhanced dev tools for debugging comprehensive queries
  connectToDevTools: import.meta.env.DEV,

  // Add query deduplication for performance
  queryDeduplication: true,

  // Set reasonable timeout for large queries
  defaultContext: {
    timeout: 30000, // 30 seconds for large dataset queries
  },
});

export default client;
