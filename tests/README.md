# GraphQL Dashboard Testing Suite

This directory contains comprehensive unit tests for the entire GraphQL dashboard codebase.

## Directory Structure

```
tests/
├── README.md                     # This file
├── setup/                        # Test configuration and setup
│   ├── jest.config.js            # Jest configuration
│   ├── vitest.config.js          # Vitest configuration
│   ├── test-utils.js             # Common test utilities
│   └── mocks/                    # Mock data and functions
├── unit/                         # Unit tests
│   ├── auth/                     # Authentication & Authorization tests
│   ├── graphql/                  # GraphQL queries and mutations tests
│   ├── utils/                    # Utility functions tests
│   ├── components/               # React components tests
│   ├── hooks/                    # Custom hooks tests
│   └── contexts/                 # Context providers tests
├── integration/                  # Integration tests
│   ├── auth-flow/                # Complete authentication flow tests
│   ├── data-flow/                # Data fetching and processing flow tests
│   └── user-journey/             # End-to-end user journey tests
├── performance/                  # Performance tests
│   ├── query-performance/        # GraphQL query performance tests
│   └── component-rendering/      # Component rendering performance tests
└── fixtures/                     # Test data fixtures
    ├── users.json                # Sample user data
    ├── transactions.json         # Sample transaction data
    ├── skills.json               # Sample skills data
    └── graphql-responses.json    # Sample GraphQL responses
```

## Test Categories

### 1. Authentication & Authorization Tests
- JWT token validation
- Login/logout functionality
- Session management
- Permission checks
- Token refresh logic

### 2. GraphQL Tests
- Query syntax validation
- Query execution
- Response parsing
- Error handling
- Cache management
- Step-by-step query debugging

### 3. Data Processing Tests
- Data parsing functions
- Data transformation utilities
- Formatting functions
- Validation logic
- Schema adapters

### 4. Component Tests
- React component rendering
- Props handling
- Event handling
- State management
- UI interactions

### 5. Integration Tests
- Complete user flows
- Data fetching pipelines
- Authentication flows
- Error recovery scenarios

## Running Tests

```bash
# Run all tests
npm test

# Run specific test category
npm test -- tests/unit/auth/
npm test -- tests/unit/graphql/
npm test -- tests/unit/utils/

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run performance tests
npm run test:performance
```

## Test Naming Conventions

- Test files: `*.test.js` or `*.spec.js`
- Test descriptions: Use descriptive names
- Test groups: Use `describe()` blocks for organization
- Individual tests: Use `test()` or `it()` for specific cases

## Mock Data

All test fixtures are stored in the `fixtures/` directory and can be imported as needed:

```javascript
import { sampleUser, sampleTransactions } from '../fixtures/users.json';
```

## Coverage Goals

- **Unit Tests**: 90%+ coverage for utility functions
- **Integration Tests**: Cover all major user flows
- **Component Tests**: Test all interactive components
- **GraphQL Tests**: Test all queries and mutations
