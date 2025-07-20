/**
 * Test Utilities and Setup
 * Common utilities and mocks for testing
 */

import { vi, beforeEach } from 'vitest';

// Mock environment variables
vi.mock('../../src/config/environment', () => ({
  GRAPHQL_ENDPOINT: 'http://localhost:8080/api/graphql-engine/v1/graphql',
  JWT_SECRET: 'test-jwt-secret',
  API_BASE_URL: 'http://localhost:8080',
  NODE_ENV: 'test'
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
globalThis.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
globalThis.sessionStorage = sessionStorageMock;

// Mock fetch
globalThis.fetch = vi.fn();

// Mock GraphQL client
export const mockGraphQLClient = {
  query: vi.fn(),
  mutate: vi.fn(),
  subscribe: vi.fn(),
  cache: {
    clear: vi.fn(),
    readQuery: vi.fn(),
    writeQuery: vi.fn(),
  }
};

// Mock authentication context
export const mockAuthContext = {
  user: {
    id: 1,
    login: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    campus: 'bahrain'
  },
  token: 'mock-jwt-token',
  isAuthenticated: true,
  isLoading: false,
  error: null,
  login: vi.fn(),
  logout: vi.fn(),
  clearError: vi.fn()
};

// Mock data context
export const mockDataContext = {
  user: mockAuthContext.user,
  totalXP: 150000,
  level: 15,
  skills: [
    { name: 'JavaScript', amount: 50000, type: 'skill_js' },
    { name: 'Go', amount: 30000, type: 'skill_go' },
    { name: 'HTML', amount: 25000, type: 'skill_html' }
  ],
  auditRatio: 1.2,
  loading: false,
  error: null,
  refetch: vi.fn(),
  refresh: vi.fn()
};

// Simple render function for basic testing
export const renderWithProviders = (_ui, _options = {}) => {
  // For now, just return a simple mock render
  return {
    container: document.createElement('div'),
    getByText: vi.fn(),
    getByTestId: vi.fn(),
    queryByText: vi.fn(),
    queryByTestId: vi.fn()
  };
};

// JWT token utilities for testing
export const createMockJWT = (payload = {}) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const defaultPayload = {
    sub: '1',
    login: 'testuser',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
    ...payload
  };
  
  // Simple base64 encoding for testing (not secure, just for mocking)
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(defaultPayload));
  const signature = 'mock-signature';
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

// GraphQL response builders
export const buildGraphQLResponse = (data, errors = null) => ({
  data,
  errors,
  extensions: {},
  http: { status: 200 }
});

export const buildGraphQLError = (message, code = 'GRAPHQL_ERROR') => ({
  data: null,
  errors: [
    {
      message,
      extensions: { code },
      locations: [{ line: 1, column: 1 }],
      path: ['test']
    }
  ]
});

// Wait utilities
export const waitFor = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API responses
export const mockAPIResponses = {
  login: {
    success: {
      token: createMockJWT(),
      user: mockAuthContext.user
    },
    failure: {
      error: 'Invalid credentials'
    }
  },
  userInfo: {
    success: {
      data: {
        user: [mockAuthContext.user]
      }
    }
  },
  totalXP: {
    success: {
      data: {
        transaction_aggregate: {
          aggregate: {
            sum: { amount: 150000 },
            count: 25
          }
        }
      }
    }
  },
  skills: {
    success: {
      data: {
        transaction: mockDataContext.skills.map(skill => ({
          type: skill.type,
          amount: skill.amount,
          object: { name: skill.name, type: 'project' }
        }))
      }
    }
  }
};

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();

  sessionStorageMock.getItem.mockClear();
  sessionStorageMock.setItem.mockClear();
  sessionStorageMock.removeItem.mockClear();
  sessionStorageMock.clear.mockClear();

  globalThis.fetch.mockClear();
});
