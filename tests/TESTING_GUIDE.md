# GraphQL Dashboard Testing Guide

## 🎯 Overview

This comprehensive testing suite covers all aspects of the GraphQL dashboard application, from authentication and data processing to UI components and complete user flows.

## 📁 Test Structure

```
tests/
├── README.md                     # Test documentation
├── TESTING_GUIDE.md             # This guide
├── run-all-tests.js             # Comprehensive test runner
├── setup/                       # Test configuration
│   ├── vitest.config.js         # Vitest configuration
│   └── test-utils.js            # Common utilities and mocks
├── fixtures/                    # Test data
│   ├── users.json               # Sample user data
│   ├── transactions.json        # Sample transaction data
│   └── graphql-responses.json   # Sample GraphQL responses
├── unit/                        # Unit tests
│   ├── auth/                    # Authentication tests
│   │   ├── jwt.test.js          # JWT token management
│   │   └── authentication.test.js # Login/logout functionality
│   ├── graphql/                 # GraphQL tests
│   │   └── queries.test.js      # Query validation and execution
│   ├── utils/                   # Utility function tests
│   │   └── data-formatting.test.js # Data formatting functions
│   └── components/              # React component tests
│       └── profile-section.test.js # ProfileSection component
└── integration/                 # Integration tests
    ├── auth-flow/               # Authentication flow tests
    │   └── complete-auth-flow.test.js
    └── data-flow/               # Data processing flow tests
        └── profile-data-flow.test.js
```

## 🧪 Test Categories

### 1. Authentication & Authorization Tests (`tests/unit/auth/`)

**JWT Token Management (`jwt.test.js`)**
- ✅ Token validation and parsing
- ✅ Expiration detection
- ✅ Token refresh functionality
- ✅ Payload extraction
- ✅ Storage management

**Authentication Flow (`authentication.test.js`)**
- ✅ Login with valid/invalid credentials
- ✅ Session management
- ✅ Logout functionality
- ✅ Token storage and retrieval
- ✅ Authentication state checking

### 2. GraphQL Tests (`tests/unit/graphql/`)

**Query Validation & Execution (`queries.test.js`)**
- ✅ GraphQL syntax validation
- ✅ Query execution with variables
- ✅ Response parsing and error handling
- ✅ Authentication headers
- ✅ Network error handling
- ✅ Permission and authorization errors

### 3. Data Processing Tests (`tests/unit/utils/`)

**Data Formatting (`data-formatting.test.js`)**
- ✅ XP formatting (regular and quick stats)
- ✅ Skill percentage calculations
- ✅ Audit ratio formatting
- ✅ Date and time formatting
- ✅ User display name generation
- ✅ Email extraction
- ✅ Avatar URL generation
- ✅ Campus name formatting

### 4. Component Tests (`tests/unit/components/`)

**Profile Section (`profile-section.test.js`)**
- ✅ User information rendering
- ✅ XP and level display
- ✅ Avatar component functionality
- ✅ Loading and error states
- ✅ Data refresh interactions
- ✅ Responsive design
- ✅ Accessibility features

### 5. Integration Tests (`tests/integration/`)

**Complete Authentication Flow (`auth-flow/complete-auth-flow.test.js`)**
- ✅ Full login process
- ✅ Session restoration
- ✅ Token refresh handling
- ✅ Logout process
- ✅ Protected route access
- ✅ Error handling throughout flow

**Profile Data Flow (`data-flow/profile-data-flow.test.js`)**
- ✅ Complete data loading pipeline
- ✅ GraphQL to UI data flow
- ✅ Data processing and formatting
- ✅ Error handling and recovery
- ✅ Data refresh and updates
- ✅ Concurrent request handling

## 🚀 Running Tests

### Quick Commands

```bash
# Run all tests
npm test

# Run specific test categories
npm run test:auth          # Authentication tests
npm run test:graphql       # GraphQL tests
npm run test:utils         # Utility function tests
npm run test:components    # Component tests
npm run test:integration   # Integration tests

# Development testing
npm run test:watch         # Watch mode
npm run test:ui           # UI mode
npm run test:coverage     # With coverage report

# Comprehensive test runner
node tests/run-all-tests.js
```

### Test Execution Order

1. **Unit Tests** (Foundation)
   - Authentication & JWT
   - Data formatting utilities
   - GraphQL queries
   - React components

2. **Integration Tests** (Complete Flows)
   - Authentication flow
   - Data processing pipeline

## 📊 Coverage Goals

- **Unit Tests**: 90%+ coverage for utility functions
- **Integration Tests**: Cover all major user flows
- **Component Tests**: Test all interactive components
- **GraphQL Tests**: Test all queries and mutations

## 🔧 Test Configuration

### Vitest Configuration (`tests/setup/vitest.config.js`)
- JSdom environment for React testing
- Coverage reporting with v8 provider
- Path aliases for easy imports
- 80% coverage thresholds

### Test Utilities (`tests/setup/test-utils.js`)
- Mock authentication context
- Mock GraphQL client
- Mock localStorage/sessionStorage
- Custom render function with providers
- JWT token utilities
- API response builders

## 📝 Writing New Tests

### Test File Naming
- Unit tests: `*.test.js` or `*.spec.js`
- Place in appropriate category folder
- Use descriptive names

### Test Structure
```javascript
describe('Feature Name', () => {
  describe('Specific Functionality', () => {
    test('should do something specific', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

### Mock Data
- Use fixtures from `tests/fixtures/`
- Import test utilities from `tests/setup/test-utils.js`
- Create realistic test scenarios

## 🐛 Debugging Tests

### Common Issues
1. **Mock not working**: Check if mock is properly imported and configured
2. **Async test failing**: Use `await waitFor()` for async operations
3. **Component not rendering**: Ensure proper providers are wrapped
4. **GraphQL errors**: Check mock responses match expected structure

### Debug Commands
```bash
# Run single test file
npm test -- tests/unit/auth/jwt.test.js

# Run with verbose output
npm test -- --reporter=verbose

# Run in debug mode
npm test -- --inspect-brk
```

## 📈 Continuous Integration

### Pre-commit Hooks
```bash
# Add to package.json scripts
"pre-commit": "npm run test:unit && npm run lint"
```

### CI Pipeline
1. Install dependencies
2. Run linting
3. Run unit tests
4. Run integration tests
5. Generate coverage report
6. Build application

## 🎉 Test Results

All tests are designed to validate the fixes implemented for:

- ✅ **XP Display Format**: Shows "1M" instead of "1.3M XP" in quick stats
- ✅ **Skills Percentages**: Proper percentage calculations instead of 0%
- ✅ **Audit Ratio**: "Audit Ratio" instead of "Audits Given"
- ✅ **Email Display**: Correct email extraction and display
- ✅ **Avatar Loading**: Proper fallback handling
- ✅ **Data Processing**: Complete pipeline validation
- ✅ **Authentication**: Full auth flow testing
- ✅ **Error Handling**: Comprehensive error scenarios

## 🔄 Maintenance

- Run tests regularly during development
- Update test data when schema changes
- Add new tests for new features
- Monitor coverage reports
- Review and update mocks as needed

---

**Happy Testing! 🧪✨**
