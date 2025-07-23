module.exports = {
  // Test environment
  testEnvironment: 'jsdom',
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  
  // Module name mapping for absolute imports
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@graphql/(.*)$': '<rootDir>/src/graphql/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1'
  },
  
  // File extensions to consider
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Transform files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  
  // Files to ignore during transformation
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@apollo/client|graphql))'
  ],
  
  // Test file patterns
  testMatch: [
    '<rootDir>/src/tests/**/*.test.(ts|tsx|js|jsx)',
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx|js|jsx)',
    '<rootDir>/src/**/*.(test|spec).(ts|tsx|js|jsx)'
  ],
  
  // Files to ignore
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/build/',
    '<rootDir>/dist/'
  ],
  
  // Coverage configuration
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/tests/**/*',
    '!src/index.tsx',
    '!src/reportWebVitals.ts'
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  
  // Coverage reporters
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
    'json'
  ],
  
  // Coverage directory
  coverageDirectory: '<rootDir>/coverage',
  
  // Module directories
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  
  // Globals
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Restore mocks after each test
  restoreMocks: true,
  
  // Verbose output
  verbose: true,
  
  // Test timeout
  testTimeout: 10000,
  
  // Max workers for parallel testing
  maxWorkers: '50%',
  
  // Test suites
  projects: [
    {
      displayName: 'Unit Tests',
      testMatch: ['<rootDir>/src/tests/unit/**/*.test.(ts|tsx)'],
      setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts']
    },
    {
      displayName: 'Integration Tests',
      testMatch: ['<rootDir>/src/tests/integration/**/*.test.(ts|tsx)'],
      setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts']
    },
    {
      displayName: 'Component Tests',
      testMatch: ['<rootDir>/src/tests/components/**/*.test.(ts|tsx)'],
      setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts']
    },
    {
      displayName: 'GraphQL Tests',
      testMatch: ['<rootDir>/src/tests/graphql/**/*.test.(ts|tsx)'],
      setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts']
    },
    {
      displayName: 'Validation Tests',
      testMatch: ['<rootDir>/src/tests/validation/**/*.test.(ts|tsx)'],
      setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts']
    }
  ],
  
  // Watch plugins
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  
  // Error handling
  errorOnDeprecated: true,
  
  // Snapshot serializers
  snapshotSerializers: ['enzyme-to-json/serializer'],
  
  // Custom matchers
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts']
}
