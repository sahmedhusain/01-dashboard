// GraphQL Testing Utilities
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext';

// ============================================================================
// MOCK DATA GENERATORS
// ============================================================================

// Generate mock user data
export const createMockUser = (overrides = {}) => ({
  id: 1,
  login: 'testuser',
  profile: 'Test User Profile',
  attrs: '{}',
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  campus: 'test-campus',
  userRoles: [],
  records: [],
  ...overrides,
});

// Generate mock transaction data
export const createMockTransaction = (overrides = {}) => ({
  id: 1,
  type: 'xp',
  amount: 100,
  createdAt: '2023-01-01T00:00:00Z',
  path: '/test/path',
  attrs: '{}',
  campus: 'test-campus',
  object: {
    id: 1,
    name: 'Test Object',
    type: 'project',
    attrs: '{}',
  },
  event: null,
  ...overrides,
});

// Generate mock progress data
export const createMockProgress = (overrides = {}) => ({
  id: 1,
  grade: 1.0,
  isDone: true,
  version: 1,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  path: '/test/path',
  campus: 'test-campus',
  object: {
    id: 1,
    name: 'Test Object',
    type: 'project',
    attrs: '{}',
  },
  event: null,
  group: null,
  ...overrides,
});

// Generate mock result data
export const createMockResult = (overrides = {}) => ({
  id: 1,
  grade: 1.0,
  type: 'project',
  attrs: '{}',
  version: 1,
  isLast: true,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  path: '/test/path',
  campus: 'test-campus',
  object: {
    id: 1,
    name: 'Test Object',
    type: 'project',
    attrs: '{}',
  },
  event: null,
  group: null,
  audits: [],
  ...overrides,
});

// Generate mock audit data
export const createMockAudit = (overrides = {}) => ({
  id: 1,
  grade: 1.0,
  attrs: '{}',
  code: 'test-code',
  version: 1,
  endAt: '2023-01-01T01:00:00Z',
  private: false,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  auditor: {
    id: 2,
    login: 'auditor',
    profile: 'Auditor Profile',
  },
  group: {
    id: 1,
    path: '/test/group',
    status: 'finished',
    captainId: 1,
    object: {
      id: 1,
      name: 'Test Object',
      type: 'project',
    },
    members: [
      {
        user: {
          id: 1,
          login: 'testuser',
        },
        confirmed: true,
      },
    ],
  },
  result: {
    id: 1,
    grade: 1.0,
    type: 'project',
    createdAt: '2023-01-01T00:00:00Z',
  },
  ...overrides,
});

// Generate mock aggregate data
export const createMockAggregate = (overrides = {}) => ({
  aggregate: {
    count: 10,
    sum: { amount: 1000 },
    avg: { amount: 100, grade: 0.8 },
    max: { amount: 200, grade: 1.0 },
    min: { amount: 50, grade: 0.5 },
    ...overrides,
  },
});

// ============================================================================
// MOCK QUERY RESPONSES
// ============================================================================

// Create mock response for GET_USER_PROFILE
export const createMockUserProfileResponse = (user = createMockUser()) => ({
  request: {
    query: require('../graphql/queries').GET_USER_PROFILE,
    variables: { userId: user.id },
  },
  result: {
    data: {
      user: [user],
    },
  },
});

// Create mock response for GET_USER_TRANSACTIONS
export const createMockTransactionsResponse = (userId = 1, transactions = [createMockTransaction()]) => ({
  request: {
    query: require('../graphql/queries').GET_USER_TRANSACTIONS,
    variables: { userId, limit: 100, offset: 0, type: null },
  },
  result: {
    data: {
      transaction: transactions,
      transaction_aggregate: createMockAggregate({
        count: transactions.length,
        sum: { amount: transactions.reduce((sum, t) => sum + t.amount, 0) },
      }),
    },
  },
});

// Create mock response for GET_XP_STATISTICS
export const createMockXPStatisticsResponse = (userId = 1, transactions = [createMockTransaction()]) => ({
  request: {
    query: require('../graphql/queries').GET_XP_STATISTICS,
    variables: { userId, fromDate: null, toDate: null },
  },
  result: {
    data: {
      xp_total: createMockAggregate({
        count: transactions.length,
        sum: { amount: transactions.reduce((sum, t) => sum + t.amount, 0) },
      }),
      xp_transactions: transactions,
      xp_by_type: { nodes: [] },
      audit_rewards: [],
      audit_rewards_stats: createMockAggregate({ count: 0, sum: { amount: 0 } }),
    },
  },
});

// Create error mock response
export const createMockErrorResponse = (query, variables, error = 'Test error') => ({
  request: { query, variables },
  error: new Error(error),
});

// Create loading mock response
export const createMockLoadingResponse = (query, variables) => ({
  request: { query, variables },
  delay: 1000, // 1 second delay
  result: { data: {} },
});

// ============================================================================
// TEST RENDERING UTILITIES
// ============================================================================

// Render component with GraphQL mocks and auth context
export const renderWithGraphQL = (component, options = {}) => {
  const {
    mocks = [],
    user = createMockUser(),
    isAuthenticated = true,
    addTypename = false,
    ...renderOptions
  } = options;

  const mockAuthValue = {
    user: isAuthenticated ? user : null,
    isAuthenticated,
    login: jest.fn(),
    logout: jest.fn(),
    loading: false,
    error: null,
  };

  const Wrapper = ({ children }) => (
    <MockedProvider mocks={mocks} addTypename={addTypename}>
      <AuthProvider value={mockAuthValue}>
        {children}
      </AuthProvider>
    </MockedProvider>
  );

  return render(component, { wrapper: Wrapper, ...renderOptions });
};

// ============================================================================
// QUERY TESTING HELPERS
// ============================================================================

// Test query with various scenarios
export const testQuery = async (hook, scenarios = []) => {
  const results = {};

  for (const scenario of scenarios) {
    const { name, mocks, expectedResult, shouldError = false } = scenario;
    
    try {
      const { result, waitForNextUpdate } = renderHook(() => hook(), {
        wrapper: ({ children }) => (
          <MockedProvider mocks={mocks}>
            <AuthProvider value={{ user: createMockUser(), isAuthenticated: true }}>
              {children}
            </AuthProvider>
          </MockedProvider>
        ),
      });

      // Wait for query to complete
      await waitForNextUpdate();

      if (shouldError) {
        expect(result.current.error).toBeTruthy();
      } else {
        expect(result.current.error).toBeFalsy();
        if (expectedResult) {
          expect(result.current.data).toMatchObject(expectedResult);
        }
      }

      results[name] = {
        success: true,
        data: result.current.data,
        error: result.current.error,
      };
    } catch (error) {
      results[name] = {
        success: false,
        error: error.message,
      };
    }
  }

  return results;
};

// ============================================================================
// PERFORMANCE TESTING UTILITIES
// ============================================================================

// Measure query performance
export const measureQueryPerformance = async (queryFunction, iterations = 10) => {
  const times = [];

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    await queryFunction();
    const end = performance.now();
    times.push(end - start);
  }

  return {
    average: times.reduce((sum, time) => sum + time, 0) / times.length,
    min: Math.min(...times),
    max: Math.max(...times),
    median: times.sort((a, b) => a - b)[Math.floor(times.length / 2)],
    times,
  };
};

// ============================================================================
// VALIDATION TESTING
// ============================================================================

// Test input validation
export const testValidation = (validator, testCases = []) => {
  const results = {};

  testCases.forEach(({ name, input, expectedErrors = [] }) => {
    const errors = validator(input);
    
    results[name] = {
      passed: errors.length === expectedErrors.length,
      actualErrors: errors,
      expectedErrors,
      input,
    };
  });

  return results;
};

// ============================================================================
// MOCK IMPLEMENTATIONS
// ============================================================================

// Mock localStorage
export const mockLocalStorage = () => {
  const store = {};
  
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    removeItem: jest.fn((key) => { delete store[key]; }),
    clear: jest.fn(() => { Object.keys(store).forEach(key => delete store[key]); }),
  };
};

// Mock fetch
export const mockFetch = (responses = {}) => {
  return jest.fn((url, _options) => {
    const response = responses[url] || { ok: true, json: () => Promise.resolve({}) };
    return Promise.resolve(response);
  });
};

// Mock GraphQL client
export const mockGraphQLClient = (responses = {}) => {
  return {
    query: jest.fn(({ query, _variables }) => {
      const queryName = query.definitions[0]?.name?.value;
      const response = responses[queryName] || { data: {} };
      return Promise.resolve(response);
    }),
    mutate: jest.fn(() => Promise.resolve({ data: {} })),
    clearStore: jest.fn(() => Promise.resolve()),
  };
};
