// ============================================================================
// DATA PROCESSING FUNCTIONS TEST FILE
// Test all data processing utilities with sample data
// ============================================================================

import {
  processUserProfile,
  processXPData,
  processLevelData,
  getRankTitle,
  getCohortNumber,
  processSkillsData,
  processAuditRatio,
  formatAuditRatio,
  processAuditStatus,
  processXPByProject,
  processProgressData,
  calculateCompletionRate,
  safeJsonParse,
  formatDate,
  calculatePercentage,
  formatNumber,
  truncateText,
} from '../utils/dataProcessing.js';

// ============================================================================
// SAMPLE TEST DATA
// ============================================================================

const SAMPLE_DATA = {
  user: {
    id: 123,
    login: 'testuser',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    campus: 'bahrain',
    auditRatio: 1.25,
    totalUp: 150,
    totalDown: 120,
    attrs: { key: 'value' },
    profile: { bio: 'Test bio' },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z',
  },
  
  xpData: {
    aggregate: {
      sum: {
        amount: 15000
      }
    }
  },
  
  levelData: {
    level: 25,
    event: {
      id: 72,
      campus: 'bahrain'
    }
  },
  
  skillsData: [
    { type: 'skill_js', amount: 1500, createdAt: '2023-01-01T00:00:00Z' },
    { type: 'skill_go', amount: 1200, createdAt: '2023-02-01T00:00:00Z' },
    { type: 'skill_docker', amount: 800, createdAt: '2023-03-01T00:00:00Z' },
    { type: 'skill_js', amount: 1000, createdAt: '2023-01-15T00:00:00Z' }, // Duplicate with lower amount
  ],
  
  auditStatus: {
    validAudits: {
      nodes: [
        { group: { captainLogin: 'user1', path: '/project1' } },
        { group: { captainLogin: 'user2', path: '/project2' } },
      ]
    },
    failedAudits: {
      nodes: [
        { group: { captainLogin: 'user3', path: '/project3' } },
      ]
    }
  },
  
  xpProjects: [
    {
      amount: 2000,
      path: '/bahrain/bh-module/project1',
      createdAt: '2023-01-01T00:00:00Z',
      object: { name: 'Project 1', type: 'project' }
    },
    {
      amount: 1500,
      path: '/bahrain/bh-module/project2',
      createdAt: '2023-02-01T00:00:00Z',
      object: { name: 'Project 2', type: 'project' }
    },
  ],
  
  progressData: [
    {
      id: 1,
      grade: 85,
      isDone: true,
      path: '/project1',
      object: { name: 'Project 1', type: 'project' },
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z',
    },
    {
      id: 2,
      grade: 0,
      isDone: false,
      path: '/project2',
      object: { name: 'Project 2', type: 'project' },
      createdAt: '2023-02-01T00:00:00Z',
      updatedAt: '2023-02-01T00:00:00Z',
    },
  ],
  
  groupData: [
    {
      id: 1,
      path: '/project1',
      status: 'finished',
      object: { name: 'Project 1', type: 'project' },
      members: [
        { userLogin: 'user1', user: { firstName: 'Alice', lastName: 'Smith' } },
        { userLogin: 'user2', user: { firstName: 'Bob', lastName: 'Jones' } },
      ],
      createdAt: '2023-01-01T00:00:00Z',
    },
  ],
  
  rankingData: [
    { userLogin: 'user1', level: 30, event: { id: 72 } },
    { userLogin: 'user2', level: 25, event: { id: 72 } },
    { userLogin: 'user3', level: 25, event: { id: 20 } }, // Same level, different event
    { userLogin: 'user4', level: 20, event: { id: 72 } },
  ],
};

// ============================================================================
// TEST FUNCTIONS
// ============================================================================

export const testUserProcessing = () => {
  console.log('🧪 Testing User Data Processing...');
  
  const tests = [
    {
      name: 'processUserProfile - valid data',
      fn: () => processUserProfile(SAMPLE_DATA.user),
      validate: (result) => result && result.id === 123 && result.fullName === 'John Doe',
    },
    {
      name: 'processUserProfile - null data',
      fn: () => processUserProfile(null),
      validate: (result) => result === null,
    },
    {
      name: 'processUserProfile - missing names',
      fn: () => processUserProfile({ ...SAMPLE_DATA.user, firstName: null, lastName: null }),
      validate: (result) => result && result.fullName === 'testuser',
    },
  ];
  
  return runTests(tests);
};

export const testXPProcessing = () => {
  console.log('\n🧪 Testing XP Data Processing...');
  
  const tests = [
    {
      name: 'processXPData - valid data',
      fn: () => processXPData(SAMPLE_DATA.xpData),
      validate: (result) => result === 15000,
    },
    {
      name: 'processXPData - null data',
      fn: () => processXPData(null),
      validate: (result) => result === 0,
    },
    {
      name: 'processLevelData - valid data',
      fn: () => processLevelData(SAMPLE_DATA.levelData),
      validate: (result) => result && result.level === 25 && result.eventId === 72,
    },
    {
      name: 'getRankTitle - level 25',
      fn: () => getRankTitle(25),
      validate: (result) => result === 'Apprentice developer',
    },
    {
      name: 'getRankTitle - level 55',
      fn: () => getRankTitle(55),
      validate: (result) => result === 'Junior developer',
    },
    {
      name: 'getCohortNumber - event 72',
      fn: () => getCohortNumber(72),
      validate: (result) => result === 2,
    },
  ];
  
  return runTests(tests);
};

export const testSkillsProcessing = () => {
  console.log('\n🧪 Testing Skills Data Processing...');
  
  const tests = [
    {
      name: 'processSkillsData - valid data',
      fn: () => processSkillsData(SAMPLE_DATA.skillsData),
      validate: (result) => {
        return Array.isArray(result) && 
               result.length === 3 && // Should deduplicate js skill
               result[0].skill === 'js' && 
               result[0].amount === 1500; // Should keep highest amount
      },
    },
    {
      name: 'processSkillsData - null data',
      fn: () => processSkillsData(null),
      validate: (result) => Array.isArray(result) && result.length === 0,
    },
    {
      name: 'processSkillsData - empty array',
      fn: () => processSkillsData([]),
      validate: (result) => Array.isArray(result) && result.length === 0,
    },
  ];
  
  return runTests(tests);
};

export const testAuditProcessing = () => {
  console.log('\n🧪 Testing Audit Data Processing...');
  
  const tests = [
    {
      name: 'processAuditRatio - valid data',
      fn: () => processAuditRatio(SAMPLE_DATA.user),
      validate: (result) => result && result.ratio === 1.25 && result.totalUp === 150,
    },
    {
      name: 'formatAuditRatio - number',
      fn: () => formatAuditRatio(1.25678),
      validate: (result) => result === '1.26',
    },
    {
      name: 'formatAuditRatio - null',
      fn: () => formatAuditRatio(null),
      validate: (result) => result === '0.00',
    },
    {
      name: 'processAuditStatus - valid data',
      fn: () => processAuditStatus(SAMPLE_DATA.auditStatus),
      validate: (result) => result && result.validAudits.length === 2 && result.failedAudits.length === 1,
    },
  ];
  
  return runTests(tests);
};

export const testProjectProcessing = () => {
  console.log('\n🧪 Testing Project Data Processing...');
  
  const tests = [
    {
      name: 'processXPByProject - valid data',
      fn: () => processXPByProject(SAMPLE_DATA.xpProjects),
      validate: (result) => {
        return Array.isArray(result) && 
               result.length === 2 && 
               result[0].name === 'project1' && 
               result[0].amount === 2000;
      },
    },
    {
      name: 'processProgressData - valid data',
      fn: () => processProgressData(SAMPLE_DATA.progressData),
      validate: (result) => {
        return Array.isArray(result) && 
               result.length === 2 && 
               result[0].projectName === 'Project 1';
      },
    },
    {
      name: 'calculateCompletionRate - valid data',
      fn: () => calculateCompletionRate(SAMPLE_DATA.progressData),
      validate: (result) => result === 50, // 1 out of 2 completed
    },
  ];
  
  return runTests(tests);
};

export const testUtilityFunctions = () => {
  console.log('\n🧪 Testing Utility Functions...');
  
  const tests = [
    {
      name: 'safeJsonParse - valid JSON',
      fn: () => safeJsonParse('{"key": "value"}'),
      validate: (result) => result && result.key === 'value',
    },
    {
      name: 'safeJsonParse - invalid JSON',
      fn: () => safeJsonParse('invalid json', { default: true }),
      validate: (result) => result && result.default === true,
    },
    {
      name: 'formatDate - valid date',
      fn: () => formatDate('2023-01-01T00:00:00Z'),
      validate: (result) => typeof result === 'string' && result.length > 0,
    },
    {
      name: 'calculatePercentage - valid numbers',
      fn: () => calculatePercentage(25, 100),
      validate: (result) => result === 25,
    },
    {
      name: 'formatNumber - large number',
      fn: () => formatNumber(1500000),
      validate: (result) => result === '1.5M',
    },
    {
      name: 'formatNumber - thousands',
      fn: () => formatNumber(1500),
      validate: (result) => result === '1.5K',
    },
    {
      name: 'truncateText - long text',
      fn: () => truncateText('This is a very long text that should be truncated', 20),
      validate: (result) => result === 'This is a very long...',
    },
  ];
  
  return runTests(tests);
};

// ============================================================================
// TEST RUNNER UTILITY
// ============================================================================

const runTests = (tests) => {
  const results = tests.map(test => {
    try {
      const result = test.fn();
      const isValid = test.validate(result);
      console.log(`  ${isValid ? '✅' : '❌'} ${test.name}: ${isValid ? 'PASSED' : 'FAILED'}`);
      return { name: test.name, success: isValid, result };
    } catch (error) {
      console.log(`  ❌ ${test.name}: ERROR - ${error.message}`);
      return { name: test.name, success: false, error: error.message };
    }
  });
  
  const passedCount = results.filter(r => r.success).length;
  console.log(`\n📊 ${passedCount}/${results.length} tests passed`);
  
  return results;
};

// ============================================================================
// MAIN TEST RUNNER
// ============================================================================

export const runAllDataProcessingTests = () => {
  console.log('🚀 Starting Data Processing Tests...\n');
  
  const testResults = {
    userProcessing: testUserProcessing(),
    xpProcessing: testXPProcessing(),
    skillsProcessing: testSkillsProcessing(),
    auditProcessing: testAuditProcessing(),
    projectProcessing: testProjectProcessing(),
    utilityFunctions: testUtilityFunctions(),
  };
  
  // Calculate overall results
  const allResults = Object.values(testResults).flat();
  const totalPassed = allResults.filter(r => r.success).length;
  const totalTests = allResults.length;
  
  console.log('\n' + '='.repeat(50));
  console.log('📋 DATA PROCESSING TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${totalPassed}`);
  console.log(`Failed: ${totalTests - totalPassed}`);
  console.log(`Success Rate: ${Math.round((totalPassed / totalTests) * 100)}%`);
  console.log('='.repeat(50));
  
  return testResults;
};

// ============================================================================
// EXPORT FOR MANUAL TESTING
// ============================================================================

// For manual testing in browser console
if (typeof window !== 'undefined') {
  window.dataProcessingTests = {
    runAllDataProcessingTests,
    testUserProcessing,
    testXPProcessing,
    testSkillsProcessing,
    testAuditProcessing,
    testProjectProcessing,
    testUtilityFunctions,
    SAMPLE_DATA,
  };
  
  console.log('🔧 Data processing tests available in window.dataProcessingTests');
  console.log('   Run window.dataProcessingTests.runAllDataProcessingTests() to start testing');
}
