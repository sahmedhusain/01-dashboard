#!/usr/bin/env node

/**
 * Comprehensive Test Runner
 * Runs all tests in the correct order and provides detailed reporting
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import process from 'process';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const runCommand = (command, description) => {
  log(`\n🧪 ${description}`, 'cyan');
  log(`Running: ${command}`, 'blue');
  
  try {
    const output = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'pipe',
      cwd: process.cwd()
    });
    
    log(`✅ ${description} - PASSED`, 'green');
    return { success: true, output };
  } catch (error) {
    log(`❌ ${description} - FAILED`, 'red');
    log(error.stdout || error.message, 'red');
    return { success: false, error: error.message };
  }
};

const checkTestFiles = () => {
  const testDirs = [
    'tests/unit/auth',
    'tests/unit/graphql',
    'tests/unit/utils',
    'tests/unit/components',
    'tests/integration/auth-flow',
    'tests/integration/data-flow'
  ];

  log('\n📁 Checking test file structure...', 'yellow');
  
  let allFilesExist = true;
  testDirs.forEach(dir => {
    if (existsSync(dir)) {
      log(`✅ ${dir} - EXISTS`, 'green');
    } else {
      log(`❌ ${dir} - MISSING`, 'red');
      allFilesExist = false;
    }
  });

  return allFilesExist;
};

const main = async () => {
  log('🚀 GraphQL Dashboard - Comprehensive Test Suite', 'bright');
  log('=' .repeat(60), 'blue');

  // Check if test files exist
  if (!checkTestFiles()) {
    log('\n❌ Some test files are missing. Please ensure all test files are created.', 'red');
    process.exit(1);
  }

  const testSuites = [
    {
      command: 'npm run test:auth',
      description: 'Authentication & JWT Tests',
      category: 'Unit Tests'
    },
    {
      command: 'npm run test:utils',
      description: 'Data Formatting & Utility Tests',
      category: 'Unit Tests'
    },
    {
      command: 'npm run test:graphql',
      description: 'GraphQL Queries & Data Service Tests',
      category: 'Unit Tests'
    },
    {
      command: 'npm run test:components',
      description: 'React Component Tests',
      category: 'Unit Tests'
    },
    {
      command: 'npm run test:integration',
      description: 'Integration Tests (Auth Flow & Data Flow)',
      category: 'Integration Tests'
    }
  ];

  const results = [];
  let totalPassed = 0;
  let totalFailed = 0;

  log('\n📊 Test Execution Summary:', 'bright');
  log('-' .repeat(60), 'blue');

  for (const suite of testSuites) {
    const result = runCommand(suite.command, suite.description);
    results.push({
      ...suite,
      ...result
    });

    if (result.success) {
      totalPassed++;
    } else {
      totalFailed++;
    }
  }

  // Run coverage report
  log('\n📈 Generating Coverage Report...', 'cyan');
  const coverageResult = runCommand('npm run test:coverage', 'Coverage Analysis');

  // Final summary
  log('\n' + '=' .repeat(60), 'blue');
  log('📋 FINAL TEST RESULTS', 'bright');
  log('=' .repeat(60), 'blue');

  results.forEach(result => {
    const status = result.success ? '✅ PASSED' : '❌ FAILED';
    const color = result.success ? 'green' : 'red';
    log(`${status} - ${result.description}`, color);
  });

  log(`\n📊 Summary:`, 'bright');
  log(`   Total Test Suites: ${results.length}`, 'blue');
  log(`   Passed: ${totalPassed}`, 'green');
  log(`   Failed: ${totalFailed}`, totalFailed > 0 ? 'red' : 'green');
  log(`   Success Rate: ${Math.round((totalPassed / results.length) * 100)}%`, 
      totalFailed === 0 ? 'green' : 'yellow');

  if (coverageResult.success) {
    log(`   Coverage Report: Generated ✅`, 'green');
  } else {
    log(`   Coverage Report: Failed ❌`, 'red');
  }

  // Recommendations
  log('\n💡 Recommendations:', 'yellow');
  if (totalFailed === 0) {
    log('   🎉 All tests passed! Your codebase is well-tested.', 'green');
    log('   🔄 Consider running tests regularly during development.', 'blue');
    log('   📈 Monitor coverage reports to maintain quality.', 'blue');
  } else {
    log('   🔧 Fix failing tests before deploying to production.', 'red');
    log('   📝 Review error messages above for specific issues.', 'yellow');
    log('   🧪 Consider adding more test cases for edge scenarios.', 'blue');
  }

  // Exit with appropriate code
  process.exit(totalFailed === 0 ? 0 : 1);
};

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  log(`\n💥 Uncaught Exception: ${error.message}`, 'red');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  log(`\n💥 Unhandled Rejection at: ${promise}, reason: ${reason}`, 'red');
  process.exit(1);
});

// Run the test suite
main().catch(error => {
  log(`\n💥 Test runner failed: ${error.message}`, 'red');
  process.exit(1);
});
