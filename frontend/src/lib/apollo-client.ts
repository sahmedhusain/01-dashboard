import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Get GraphQL endpoint from environment or default to local
const getGraphQLEndpoint = () => {
  // You can set VITE_GRAPHQL_ENDPOINT in your .env file
  return import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:8080/query';
};

// Create the http link to the GraphQL API
const httpLink = createHttpLink({
  uri: getGraphQLEndpoint(),
});

// Auth link to add the JWT token to requests
const authLink = setContext((_, { headers }) => {
  // Get the token from localStorage
  const token = localStorage.getItem('jwt_token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// Create the Apollo Client instance
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Add field policies here if needed
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
});
