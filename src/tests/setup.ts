import '@testing-library/jest-dom'
import 'jest-canvas-mock'

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
})

// Mock fetch
global.fetch = jest.fn()

// Mock URL.createObjectURL
Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: jest.fn(() => 'mocked-url'),
})

Object.defineProperty(URL, 'revokeObjectURL', {
  writable: true,
  value: jest.fn(),
})

// Mock navigator
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: true,
})

Object.defineProperty(navigator, 'clipboard', {
  writable: true,
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
    readText: jest.fn().mockResolvedValue(''),
  },
})

// Mock performance
Object.defineProperty(window, 'performance', {
  writable: true,
  value: {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByName: jest.fn(() => []),
    getEntriesByType: jest.fn(() => []),
    memory: {
      usedJSHeapSize: 1000000,
      totalJSHeapSize: 2000000,
      jsHeapSizeLimit: 4000000,
    },
  },
})

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0))
global.cancelAnimationFrame = jest.fn(id => clearTimeout(id))

// Mock console methods to reduce noise in tests
const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
       args[0].includes('Warning: React.createFactory() is deprecated') ||
       args[0].includes('Warning: componentWillReceiveProps has been renamed'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }

  console.warn = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('componentWillReceiveProps has been renamed') ||
       args[0].includes('componentWillMount has been renamed'))
    ) {
      return
    }
    originalWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})

// Global test utilities
global.testUtils = {
  // Helper to create mock user data
  createMockUser: (overrides = {}) => ({
    id: 1,
    login: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    campus: 'london',
    auditRatio: 1.5,
    totalUp: 50000,
    totalDown: 1000,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    ...overrides
  }),

  // Helper to create mock XP transactions
  createMockXPTransactions: (count = 5) => 
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      amount: Math.floor(Math.random() * 5000),
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      path: `/bahrain/bh-module/js/exercise-${i}`,
      object: {
        name: `exercise-${i}`,
        type: 'exercise'
      }
    })),

  // Helper to create mock progress data
  createMockProgress: (count = 3) =>
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      userId: 1,
      objectId: 100 + i,
      grade: Math.floor(Math.random() * 100),
      path: `/bahrain/bh-module/js/exercise-${i}`,
      campus: 'london',
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      isDone: Math.random() > 0.5
    })),

  // Helper to create mock audit data
  createMockAudits: (count = 2) =>
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      auditorId: 1,
      groupId: 10 + i,
      grade: Math.floor(Math.random() * 100),
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - i * 86400000).toISOString()
    })),

  // Helper to wait for async operations
  waitForAsync: (ms = 0) => new Promise(resolve => setTimeout(resolve, ms)),

  // Helper to simulate network delay
  simulateNetworkDelay: (ms = 100) => new Promise(resolve => setTimeout(resolve, ms)),

  // Helper to create Apollo mock responses
  createApolloMock: (query: any, variables: any, data: any, error?: Error) => ({
    request: { query, variables },
    result: error ? { error } : { data },
    delay: 100 // Simulate network delay
  })
}

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(floor: number, ceiling: number): R
    }
  }

  // eslint-disable-next-line no-var
  var testUtils: {
    createMockUser: (overrides?: any) => any
    createMockXPTransactions: (count?: number) => any[]
    createMockProgress: (count?: number) => any[]
    createMockAudits: (count?: number) => any[]
    waitForAsync: (ms?: number) => Promise<void>
    simulateNetworkDelay: (ms?: number) => Promise<void>
    createApolloMock: (query: any, variables: any, data: any, error?: Error) => any
  }
}

// Custom Jest matchers
expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      }
    }
  },
})

// Setup for each test
beforeEach(() => {
  // Clear all mocks
  jest.clearAllMocks()
  
  // Reset localStorage
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
  localStorageMock.clear.mockClear()
  
  // Reset sessionStorage
  sessionStorageMock.getItem.mockClear()
  sessionStorageMock.setItem.mockClear()
  sessionStorageMock.removeItem.mockClear()
  sessionStorageMock.clear.mockClear()
  
  // Reset fetch mock
  if (global.fetch) {
    (global.fetch as jest.Mock).mockClear()
  }
  
  // Reset console mocks
  if (console.error && typeof console.error === 'function') {
    (console.error as jest.Mock).mockClear?.()
  }
  if (console.warn && typeof console.warn === 'function') {
    (console.warn as jest.Mock).mockClear?.()
  }
})

// Cleanup after each test
afterEach(() => {
  // Clean up any timers
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
  
  // Clean up DOM
  document.body.innerHTML = ''
  
  // Reset window properties
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      href: 'http://localhost:3000',
      origin: 'http://localhost:3000',
      pathname: '/',
      search: '',
      hash: ''
    }
  })
})
