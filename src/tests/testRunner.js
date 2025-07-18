// ============================================================================
// COMPREHENSIVE TEST RUNNER
// Runs all GraphQL implementation tests and provides detailed reporting
// ============================================================================

import { runAllTests as runGraphQLTests } from './graphqlQueries.test.js';
import { runAllDataProcessingTests } from './dataProcessing.test.js';
import { runAllIntegrationTests } from './integration.test.js';

// ============================================================================
// TEST CONFIGURATION
// ============================================================================

const TEST_CONFIG = {
  // Default test user (can be overridden)
  defaultUserLogin: 'test-user',
  
  // Test timeouts
  timeouts: {
    graphql: 10000,
    processing: 5000,
    integration: 15000,
  },
  
  // Test modes
  modes: {
    QUICK: 'quick',      // Basic tests only
    FULL: 'full',        // All tests including integration
    OFFLINE: 'offline',  // Only tests that don't require network
  },
};

// ============================================================================
// TEST UTILITIES
// ============================================================================

const formatTime = (ms) => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

const generateTestReport = (results) => {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalSuites: 0,
      passedSuites: 0,
      failedSuites: 0,
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      duration: 0,
    },
    suites: {},
    recommendations: [],
  };
  
  // Process GraphQL tests
  if (results.graphql) {
    report.suites.graphql = {
      name: 'GraphQL Queries',
      status: results.graphql.structureTest?.allValid ? 'PASSED' : 'FAILED',
      tests: results.graphql.structureTest?.results || [],
    };
    
    report.summary.totalSuites++;
    if (report.suites.graphql.status === 'PASSED') {
      report.summary.passedSuites++;
    } else {
      report.summary.failedSuites++;
    }
  }
  
  // Process data processing tests
  if (results.dataProcessing) {
    const allProcessingResults = Object.values(results.dataProcessing).flat();
    const passedProcessing = allProcessingResults.filter(r => r.success).length;
    
    report.suites.dataProcessing = {
      name: 'Data Processing',
      status: passedProcessing === allProcessingResults.length ? 'PASSED' : 'FAILED',
      tests: allProcessingResults,
    };
    
    report.summary.totalSuites++;
    report.summary.totalTests += allProcessingResults.length;
    report.summary.passedTests += passedProcessing;
    report.summary.failedTests += allProcessingResults.length - passedProcessing;
    
    if (report.suites.dataProcessing.status === 'PASSED') {
      report.summary.passedSuites++;
    } else {
      report.summary.failedSuites++;
    }
  }
  
  // Process integration tests
  if (results.integration) {
    const integrationSuites = Object.values(results.integration);
    const passedIntegration = integrationSuites.filter(suite => suite.success).length;
    
    report.suites.integration = {
      name: 'Integration Tests',
      status: passedIntegration === integrationSuites.length ? 'PASSED' : 'FAILED',
      suites: integrationSuites,
    };
    
    report.summary.totalSuites++;
    if (report.suites.integration.status === 'PASSED') {
      report.summary.passedSuites++;
    } else {
      report.summary.failedSuites++;
    }
  }
  
  // Generate recommendations
  if (report.summary.failedSuites > 0) {
    report.recommendations.push('Some test suites failed. Check the detailed results below.');
  }
  
  if (results.integration?.performance?.timings) {
    const avgTime = Object.values(results.integration.performance.timings)
      .reduce((a, b) => a + b, 0) / Object.values(results.integration.performance.timings).length;
    
    if (avgTime > 2000) {
      report.recommendations.push('Query performance is slow (>2s average). Consider optimizing queries.');
    } else if (avgTime < 500) {
      report.recommendations.push('Excellent query performance (<500ms average).');
    }
  }
  
  if (!localStorage.getItem('reboot01_jwt_token')) {
    report.recommendations.push('No JWT token found. Set a valid token in localStorage to run network tests.');
  }
  
  return report;
};

const printTestReport = (report) => {
  console.log('\n' + '='.repeat(60));
  console.log('📋 COMPREHENSIVE TEST REPORT');
  console.log('='.repeat(60));
  console.log(`Timestamp: ${report.timestamp}`);
  console.log(`Duration: ${formatTime(report.summary.duration)}`);
  console.log('');
  
  // Summary
  console.log('📊 SUMMARY');
  console.log('-'.repeat(30));
  console.log(`Test Suites: ${report.summary.passedSuites}/${report.summary.totalSuites} passed`);
  if (report.summary.totalTests > 0) {
    console.log(`Individual Tests: ${report.summary.passedTests}/${report.summary.totalTests} passed`);
  }
  console.log(`Success Rate: ${Math.round((report.summary.passedSuites / report.summary.totalSuites) * 100)}%`);
  console.log('');
  
  // Suite details
  console.log('🔍 SUITE DETAILS');
  console.log('-'.repeat(30));
  Object.entries(report.suites).forEach(([_key, suite]) => {
    const status = suite.status === 'PASSED' ? '✅' : '❌';
    console.log(`${status} ${suite.name}: ${suite.status}`);
    
    if (suite.tests && suite.status === 'FAILED') {
      const failedTests = suite.tests.filter(t => !t.success);
      failedTests.forEach(test => {
        console.log(`    ❌ ${test.name}: ${test.error || 'Failed'}`);
      });
    }
    
    if (suite.suites && suite.status === 'FAILED') {
      const failedSuites = suite.suites.filter(s => !s.success);
      failedSuites.forEach(subSuite => {
        console.log(`    ❌ ${subSuite.name || 'Unknown'}: ${subSuite.errors?.join(', ') || 'Failed'}`);
      });
    }
  });
  console.log('');
  
  // Recommendations
  if (report.recommendations.length > 0) {
    console.log('💡 RECOMMENDATIONS');
    console.log('-'.repeat(30));
    report.recommendations.forEach(rec => {
      console.log(`• ${rec}`);
    });
    console.log('');
  }
  
  console.log('='.repeat(60));
};

// ============================================================================
// MAIN TEST RUNNERS
// ============================================================================

export const runQuickTests = async () => {
  console.log('🚀 Running Quick Tests (Offline Only)...\n');
  
  const startTime = Date.now();
  const results = {};
  
  try {
    // Run data processing tests (offline)
    console.log('Running data processing tests...');
    results.dataProcessing = runAllDataProcessingTests();
    
    // Run GraphQL structure tests (offline)
    console.log('\nRunning GraphQL structure tests...');
    results.graphql = { structureTest: runGraphQLTests().structureTest };
    
  } catch (error) {
    console.error('Error running quick tests:', error);
  }
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  const report = generateTestReport(results);
  report.summary.duration = duration;
  
  printTestReport(report);
  
  return { results, report };
};

export const runFullTests = async (userLogin = TEST_CONFIG.defaultUserLogin) => {
  console.log('🚀 Running Full Test Suite...\n');
  console.log(`Test User: ${userLogin}`);
  console.log('This may take a while...\n');
  
  const startTime = Date.now();
  const results = {};
  
  try {
    // Run GraphQL tests
    console.log('Running GraphQL tests...');
    results.graphql = await runGraphQLTests();
    
    // Run data processing tests
    console.log('\nRunning data processing tests...');
    results.dataProcessing = runAllDataProcessingTests();
    
    // Run integration tests
    console.log('\nRunning integration tests...');
    results.integration = await runAllIntegrationTests(userLogin);
    
  } catch (error) {
    console.error('Error running full tests:', error);
  }
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  const report = generateTestReport(results);
  report.summary.duration = duration;
  
  printTestReport(report);
  
  return { results, report };
};

export const runOfflineTests = async () => {
  console.log('🚀 Running Offline Tests...\n');
  
  const startTime = Date.now();
  const results = {};
  
  try {
    // Run data processing tests
    console.log('Running data processing tests...');
    results.dataProcessing = runAllDataProcessingTests();
    
    // Run GraphQL structure tests only
    console.log('\nRunning GraphQL structure validation...');
    const graphqlTests = runGraphQLTests();
    results.graphql = { structureTest: graphqlTests.structureTest };
    
    // Run data processing pipeline test (uses sample data)
    console.log('\nRunning data processing pipeline test...');
    const { testDataProcessingPipeline } = await import('./integration.test.js');
    results.processingPipeline = testDataProcessingPipeline();
    
  } catch (error) {
    console.error('Error running offline tests:', error);
  }
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  const report = generateTestReport(results);
  report.summary.duration = duration;
  
  printTestReport(report);
  
  return { results, report };
};

// ============================================================================
// INTERACTIVE TEST RUNNER
// ============================================================================

export const runInteractiveTests = async () => {
  console.log('🎯 Interactive Test Runner');
  console.log('Choose your test mode:\n');
  console.log('1. Quick Tests (offline, fast)');
  console.log('2. Full Tests (requires JWT token)');
  console.log('3. Offline Tests (no network required)');
  console.log('4. Custom User Tests (specify user login)\n');
  
  // In a real implementation, you would use readline or similar for input
  // For now, we'll provide instructions for manual execution
  console.log('To run tests manually:');
  console.log('• window.testRunner.runQuickTests()');
  console.log('• window.testRunner.runFullTests("your-login")');
  console.log('• window.testRunner.runOfflineTests()');
  
  return {
    runQuickTests,
    runFullTests,
    runOfflineTests,
  };
};

// ============================================================================
// EXPORT FOR BROWSER USAGE
// ============================================================================

// Make available in browser console
if (typeof window !== 'undefined') {
  window.testRunner = {
    runQuickTests,
    runFullTests,
    runOfflineTests,
    runInteractiveTests,
    TEST_CONFIG,
  };
  
  console.log('🔧 Test runner available in window.testRunner');
  console.log('   Quick start: window.testRunner.runQuickTests()');
  console.log('   Full tests: window.testRunner.runFullTests("your-login")');
  console.log('   Offline tests: window.testRunner.runOfflineTests()');
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  runQuickTests,
  runFullTests,
  runOfflineTests,
  runInteractiveTests,
  TEST_CONFIG,
};
