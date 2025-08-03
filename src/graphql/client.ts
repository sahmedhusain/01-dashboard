import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ApolloLink, Observable } from '@apollo/client';
import { GRAPHQL_ENDPOINT, getAuthHeader, clearAuthData } from '../utils/auth';
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

const mockLink = new ApolloLink((operation, forward) => {
  const authHeaders = getAuthHeader();
  const isMockMode = authHeaders.Authorization?.includes('mock-dev-token');

  if (isMockMode) {
    return new Observable(observer => {
      setTimeout(() => {
        const variables = operation.variables;
        let mockData = {};

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
          mockData = {
            user_by_pk: createMockUserData(1599)
          };
        }

        observer.next({ data: mockData });
        observer.complete();
      }, 500);
    });
  }

  return forward(operation);
});

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      if (message.includes('JWT') || message.includes('JWS') || message.includes('verify')) {
        clearAuthData();
        return;
      }

      if (extensions?.code === 'UNAUTHENTICATED' || extensions?.code === 'FORBIDDEN') {
        clearAuthData();
        return;
      }
    });
  }

  if (networkError) {
    const statusCode = (networkError as { statusCode?: number })?.statusCode;
    if (statusCode === 401 || statusCode === 403) {
      clearAuthData();
      return;
    }
  }
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
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
  resultCaching: true,
  dataIdFromObject: (object) => {
    if (object.__typename && object.id) {
      return `${object.__typename}:${object.id}`;
    }
    if (object.__typename && object.login) {
      return `${object.__typename}:${object.login}`;
    }
    if (object.__typename === 'Path' && object.path) {
      return `Path:${object.path}`;
    }
    if (object.__typename && object.type && !object.id) {
      return `${object.__typename}:${object.type}`;
    }
    if (object.__typename && object.name && !object.id) {
      return `${object.__typename}:${object.name}`;
    }
    return null;
  },
});

const client = new ApolloClient({
  link: from([errorLink, authLink, mockLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      returnPartialData: true,
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
      returnPartialData: true,
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  connectToDevTools: import.meta.env.DEV,
  queryDeduplication: true,
  defaultContext: {
    timeout: 30000,
  },
});

export default client;
