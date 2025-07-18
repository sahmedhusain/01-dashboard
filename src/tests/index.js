// ============================================================================
// TESTS INDEX - EXPORT ALL TEST MODULES
// ============================================================================

// Test modules
export * from './graphqlQueries.test.js';
export * from './dataProcessing.test.js';
export * from './integration.test.js';

// Test runner
export { default as testRunner } from './testRunner.js';

// Test component
export { default as HooksTestComponent } from './HooksTestComponent.jsx';

// ============================================================================
// QUICK ACCESS FUNCTIONS
// ============================================================================

export const runAllTests = async (userLogin = 'test-user') => {
  const { runFullTests } = await import('./testRunner.js');
  return runFullTests(userLogin);
};

export const runQuickTests = async () => {
  const { runQuickTests } = await import('./testRunner.js');
  return runQuickTests();
};

export const runOfflineTests = async () => {
  const { runOfflineTests } = await import('./testRunner.js');
  return runOfflineTests();
};

// ============================================================================
// BROWSER CONSOLE SETUP
// ============================================================================

if (typeof window !== 'undefined') {
  // Import all test modules into window for easy access
  import('./testRunner.js').then(module => {
    window.GraphQLTests = {
      runAllTests: module.runFullTests,
      runQuickTests: module.runQuickTests,
      runOfflineTests: module.runOfflineTests,
      interactive: module.runInteractiveTests,
    };
    
    console.log('🧪 GraphQL Tests loaded!');
    console.log('Available commands:');
    console.log('• window.GraphQLTests.runQuickTests() - Fast offline tests');
    console.log('• window.GraphQLTests.runAllTests("your-login") - Full test suite');
    console.log('• window.GraphQLTests.runOfflineTests() - Offline tests only');
    console.log('• window.GraphQLTests.interactive() - Interactive test runner');
  });
}
