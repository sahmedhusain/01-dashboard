// ============================================================================
// GRAPHQL QUERIES TEST FILE
// Test all core queries to ensure they work with reboot01 GraphQL endpoint
// ============================================================================

import { graphqlService } from '../graphql/dataService.js';
import {
  GET_USER_INFO,
  GET_USER_PROFILE,
  GET_TOTAL_XP,
  GET_USER_LEVEL,
  GET_XP_BY_PROJECT,
  GET_USER_SKILLS,
  GET_AUDIT_STATUS,
  GET_AUDIT_RATIO,
  GET_USER_PROGRESS,
  GET_USER_RESULTS,
  GET_USER_GROUPS,
  GET_USERS_ABOVE_LEVEL,
  GET_USERS_ABOVE_LEVEL_IN_COHORT,
  GET_DASHBOARD_DATA,
} from '../graphql/coreQueries.js';

// ============================================================================
// TEST CONFIGURATION
// ============================================================================

const TEST_CONFIG = {
  // Test user login (replace with actual test user)
  testUserLogin: 'test-user',
  testUserId: 1,
  testLevel: 10,
  testEventId: 72,
  
  // GraphQL endpoint
  endpoint: 'https://learn.reboot01.com/api/graphql-engine/v1/graphql',
  
  // Test timeout
  timeout: 10000,
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Mock JWT token for testing (replace with real token)
const mockJWT = () => {
  // In real testing, you would get this from localStorage or environment
  return localStorage.getItem('reboot01_jwt_token') || 'mock.jwt.token';
};

// Test query structure validation
const validateQueryStructure = (query) => {
  const queryString = query.loc.source.body;
  
  // Basic GraphQL syntax validation
  const hasQuery = queryString.includes('query');
  const hasOpenBrace = queryString.includes('{');
  const hasCloseBrace = queryString.includes('}');
  
  return hasQuery && hasOpenBrace && hasCloseBrace;
};

// Test data structure validation
const validateDataStructure = (data, expectedKeys) => {
  if (!data || typeof data !== 'object') return false;
  
  return expectedKeys.every(key => key in data);
};

// ============================================================================
// QUERY STRUCTURE TESTS
// ============================================================================

export const testQueryStructures = () => {
  console.log('🧪 Testing GraphQL Query Structures...');
  
  const queries = [
    { name: 'GET_USER_INFO', query: GET_USER_INFO },
    { name: 'GET_USER_PROFILE', query: GET_USER_PROFILE },
    { name: 'GET_TOTAL_XP', query: GET_TOTAL_XP },
    { name: 'GET_USER_LEVEL', query: GET_USER_LEVEL },
    { name: 'GET_XP_BY_PROJECT', query: GET_XP_BY_PROJECT },
    { name: 'GET_USER_SKILLS', query: GET_USER_SKILLS },
    { name: 'GET_AUDIT_STATUS', query: GET_AUDIT_STATUS },
    { name: 'GET_AUDIT_RATIO', query: GET_AUDIT_RATIO },
    { name: 'GET_USER_PROGRESS', query: GET_USER_PROGRESS },
    { name: 'GET_USER_RESULTS', query: GET_USER_RESULTS },
    { name: 'GET_USER_GROUPS', query: GET_USER_GROUPS },
    { name: 'GET_USERS_ABOVE_LEVEL', query: GET_USERS_ABOVE_LEVEL },
    { name: 'GET_USERS_ABOVE_LEVEL_IN_COHORT', query: GET_USERS_ABOVE_LEVEL_IN_COHORT },
    { name: 'GET_DASHBOARD_DATA', query: GET_DASHBOARD_DATA },
  ];
  
  const results = queries.map(({ name, query }) => {
    const isValid = validateQueryStructure(query);
    console.log(`  ${isValid ? '✅' : '❌'} ${name}: ${isValid ? 'Valid' : 'Invalid'}`);
    return { name, isValid };
  });
  
  const allValid = results.every(r => r.isValid);
  console.log(`\n📊 Query Structure Test: ${allValid ? 'PASSED' : 'FAILED'}`);
  
  return { allValid, results };
};

// ============================================================================
// DATA SERVICE TESTS
// ============================================================================

export const testDataServiceMethods = async () => {
  console.log('\n🧪 Testing GraphQL Data Service Methods...');
  
  const tests = [
    {
      name: 'getUserInfo',
      method: () => graphqlService.getUserInfo(),
      expectedKeys: ['id', 'login', 'firstName', 'lastName'],
    },
    {
      name: 'getTotalXP',
      method: () => graphqlService.getTotalXP(),
      expectedKeys: ['aggregate'],
    },
    {
      name: 'getUserLevel',
      method: () => graphqlService.getUserLevel(TEST_CONFIG.testUserLogin),
      expectedKeys: ['level', 'event'],
    },
    {
      name: 'getUserSkills',
      method: () => graphqlService.getUserSkills(),
      expectedKeys: [], // Array expected
    },
    {
      name: 'getAuditRatio',
      method: () => graphqlService.getAuditRatio(),
      expectedKeys: ['auditRatio', 'totalUp', 'totalDown'],
    },
  ];
  
  const results = [];
  
  for (const test of tests) {
    try {
      console.log(`  🔄 Testing ${test.name}...`);
      
      const [data, error] = await test.method();
      
      if (error) {
        console.log(`  ❌ ${test.name}: Error - ${error.message}`);
        results.push({ name: test.name, success: false, error: error.message });
        continue;
      }
      
      // Validate data structure if not array
      if (test.expectedKeys.length > 0 && data) {
        const isValid = validateDataStructure(data, test.expectedKeys);
        console.log(`  ${isValid ? '✅' : '⚠️'} ${test.name}: ${isValid ? 'Valid structure' : 'Unexpected structure'}`);
        results.push({ name: test.name, success: isValid, data });
      } else {
        console.log(`  ✅ ${test.name}: Success (${Array.isArray(data) ? 'Array' : 'Data'} returned)`);
        results.push({ name: test.name, success: true, data });
      }
      
    } catch (err) {
      console.log(`  ❌ ${test.name}: Exception - ${err.message}`);
      results.push({ name: test.name, success: false, error: err.message });
    }
  }
  
  const successCount = results.filter(r => r.success).length;
  console.log(`\n📊 Data Service Test: ${successCount}/${results.length} methods passed`);
  
  return results;
};

// ============================================================================
// INTEGRATION TEST
// ============================================================================

export const testIntegration = async () => {
  console.log('\n🧪 Testing Integration Flow...');
  
  try {
    // Test complete dashboard data flow
    console.log('  🔄 Testing dashboard data integration...');
    
    const [dashboardData, error] = await graphqlService.getDashboardData(TEST_CONFIG.testUserLogin);
    
    if (error) {
      console.log(`  ❌ Dashboard integration failed: ${error.message}`);
      return { success: false, error: error.message };
    }
    
    // Validate dashboard data structure
    const expectedKeys = ['user', 'event_user', 'transaction_aggregate'];
    const hasValidStructure = expectedKeys.some(key => key in dashboardData);
    
    if (hasValidStructure) {
      console.log('  ✅ Dashboard integration: Success');
      return { success: true, data: dashboardData };
    } else {
      console.log('  ⚠️ Dashboard integration: Unexpected data structure');
      return { success: false, error: 'Unexpected data structure' };
    }
    
  } catch (err) {
    console.log(`  ❌ Integration test failed: ${err.message}`);
    return { success: false, error: err.message };
  }
};

// ============================================================================
// MAIN TEST RUNNER
// ============================================================================

export const runAllTests = async () => {
  console.log('🚀 Starting GraphQL Tests...\n');
  
  // Test 1: Query structures
  const structureTest = testQueryStructures();
  
  // Test 2: Data service methods (only if JWT token is available)
  let serviceTest = { message: 'Skipped - No JWT token' };
  if (mockJWT() && mockJWT() !== 'mock.jwt.token') {
    serviceTest = await testDataServiceMethods();
  } else {
    console.log('\n⚠️ Skipping Data Service Tests - No valid JWT token found');
    console.log('   To run these tests, set a valid JWT token in localStorage');
  }
  
  // Test 3: Integration test (only if JWT token is available)
  let integrationTest = { message: 'Skipped - No JWT token' };
  if (mockJWT() && mockJWT() !== 'mock.jwt.token') {
    integrationTest = await testIntegration();
  } else {
    console.log('\n⚠️ Skipping Integration Tests - No valid JWT token found');
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📋 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`Query Structures: ${structureTest.allValid ? 'PASSED' : 'FAILED'}`);
  console.log(`Data Service: ${typeof serviceTest === 'object' && 'message' in serviceTest ? 'SKIPPED' : 'TESTED'}`);
  console.log(`Integration: ${typeof integrationTest === 'object' && 'message' in integrationTest ? 'SKIPPED' : 'TESTED'}`);
  console.log('='.repeat(50));
  
  return {
    structureTest,
    serviceTest,
    integrationTest,
  };
};

// ============================================================================
// EXPORT FOR MANUAL TESTING
// ============================================================================

// For manual testing in browser console
if (typeof window !== 'undefined') {
  window.graphqlTests = {
    runAllTests,
    testQueryStructures,
    testDataServiceMethods,
    testIntegration,
    graphqlService,
  };
  
  console.log('🔧 GraphQL tests available in window.graphqlTests');
  console.log('   Run window.graphqlTests.runAllTests() to start testing');
}
