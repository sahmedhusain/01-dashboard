// ============================================================================
// TEST SETUP FOR NEW GRAPHQL SYSTEM
// Updated to work with the refactored GraphQL implementation
// ============================================================================

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// ============================================================================
// BROWSER API MOCKS
// ============================================================================

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// ============================================================================
// STORAGE MOCKS
// ============================================================================

// Mock localStorage with JWT token support
const localStorageMock = {
  getItem: vi.fn((key) => {
    if (key === 'reboot01_jwt_token') {
      return 'mock.jwt.token';
    }
    if (key === 'reboot01_user_data') {
      return JSON.stringify({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      });
    }
    return null;
  }),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.sessionStorage = sessionStorageMock;

// ============================================================================
// NETWORK MOCKS
// ============================================================================

// Mock fetch with GraphQL endpoint support
global.fetch = vi.fn((url, _options) => {
  // Mock GraphQL endpoint
  if (url.includes('/graphql')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({
        data: {
          user: [{
            id: 1,
            login: 'testuser',
            firstName: 'Test',
            lastName: 'User',
            campus: 'bahrain',
          }],
        },
      }),
    });
  }

  // Mock auth endpoint
  if (url.includes('/auth/signin')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      text: () => Promise.resolve('mock.jwt.token'),
    });
  }

  // Default mock response
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
  });
});

// ============================================================================
// CONSOLE MOCKS
// ============================================================================

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to suppress console logs in tests
  // log: vi.fn(),
  // debug: vi.fn(),
  // info: vi.fn(),
  // warn: vi.fn(),
  // error: vi.fn(),
};

// ============================================================================
// GRAPHQL MOCKS
// ============================================================================

// Mock Apollo Client
vi.mock('@apollo/client', () => ({
  ApolloClient: vi.fn(() => ({
    query: vi.fn(() => Promise.resolve({
      data: {
        user: [{
          id: 1,
          login: 'testuser',
          firstName: 'Test',
          lastName: 'User',
        }],
      },
    })),
    mutate: vi.fn(() => Promise.resolve({ data: {} })),
  })),
  InMemoryCache: vi.fn(),
  createHttpLink: vi.fn(),
  from: vi.fn(),
  useQuery: vi.fn(() => ({
    data: null,
    loading: false,
    error: null,
    refetch: vi.fn(),
  })),
  useMutation: vi.fn(() => [
    vi.fn(),
    { data: null, loading: false, error: null },
  ]),
  gql: vi.fn((strings, ..._values) => {
    return strings.join('');
  }),
}));

// ============================================================================
// REACT TESTING UTILITIES
// ============================================================================

// Mock React Router if used
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({}),
  BrowserRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ children }) => children,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

// ============================================================================
// TEST ENVIRONMENT SETUP
// ============================================================================

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.VITE_GRAPHQL_ENDPOINT = 'https://learn.reboot01.com/api/graphql-engine/v1/graphql';

// Global test utilities
global.testUtils = {
  // Mock user data
  mockUser: {
    id: 1,
    login: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    campus: 'bahrain',
  },

  // Mock GraphQL responses
  mockGraphQLResponse: (data) => ({
    data,
    loading: false,
    error: null,
    refetch: vi.fn(),
  }),

  // Mock error response
  mockErrorResponse: (message) => ({
    data: null,
    loading: false,
    error: { message },
    refetch: vi.fn(),
  }),

  // Mock loading response
  mockLoadingResponse: () => ({
    data: null,
    loading: true,
    error: null,
    refetch: vi.fn(),
  }),
};

// ============================================================================
// CLEANUP
// ============================================================================

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  localStorageMock.getItem.mockImplementation((key) => {
    if (key === 'reboot01_jwt_token') return 'mock.jwt.token';
    if (key === 'reboot01_user_data') return JSON.stringify(global.testUtils.mockUser);
    return null;
  });
});
