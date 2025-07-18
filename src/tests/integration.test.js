// ============================================================================
// INTEGRATION TEST FILE
// Test complete data flow from GraphQL queries through processing to component usage
// ============================================================================

import { graphqlService } from '../graphql/dataService.js';
import {
  processUserProfile,
  processXPData,
  processLevelData,
  processSkillsData,
  processAuditRatio,
  processXPByProject,
  getRankTitle,
  getCohortNumber,
} from '../utils/dataProcessing.js';

// ============================================================================
// INTEGRATION TEST SCENARIOS
// ============================================================================

export const testCompleteUserFlow = async (userLogin) => {
  console.log(`🧪 Testing Complete User Flow for: ${userLogin}`);
  
  const results = {
    steps: [],
    success: true,
    data: {},
    errors: [],
  };
  
  try {
    // Step 1: Fetch user basic info
    console.log('  🔄 Step 1: Fetching user info...');
    const [userInfo, userError] = await graphqlService.getUserInfo();
    
    if (userError) {
      results.errors.push(`User Info: ${userError.message}`);
      results.success = false;
    } else {
      results.data.userInfo = userInfo;
      results.steps.push('✅ User info fetched successfully');
    }
    
    // Step 2: Process user data
    console.log('  🔄 Step 2: Processing user data...');
    if (userInfo) {
      const processedUser = processUserProfile(userInfo);
      results.data.processedUser = processedUser;
      results.steps.push('✅ User data processed successfully');
    } else {
      results.steps.push('⚠️ User data processing skipped (no data)');
    }
    
    // Step 3: Fetch and process XP data
    console.log('  🔄 Step 3: Fetching XP data...');
    const [xpData, xpError] = await graphqlService.getTotalXP();
    
    if (xpError) {
      results.errors.push(`XP Data: ${xpError.message}`);
    } else {
      const totalXP = processXPData(xpData);
      results.data.totalXP = totalXP;
      results.steps.push(`✅ XP data processed: ${totalXP} XP`);
    }
    
    // Step 4: Fetch and process level data
    console.log('  🔄 Step 4: Fetching level data...');
    const [levelData, levelError] = await graphqlService.getUserLevel(userLogin);
    
    if (levelError) {
      results.errors.push(`Level Data: ${levelError.message}`);
    } else if (levelData) {
      const processedLevel = processLevelData(levelData);
      const rankTitle = getRankTitle(processedLevel.level);
      const cohortNumber = getCohortNumber(processedLevel.eventId);
      
      results.data.level = processedLevel.level;
      results.data.rankTitle = rankTitle;
      results.data.cohortNumber = cohortNumber;
      results.steps.push(`✅ Level data processed: Level ${processedLevel.level} (${rankTitle})`);
    } else {
      results.steps.push('⚠️ Level data not found');
    }
    
    // Step 5: Fetch and process skills data
    console.log('  🔄 Step 5: Fetching skills data...');
    const [skillsData, skillsError] = await graphqlService.getUserSkills();
    
    if (skillsError) {
      results.errors.push(`Skills Data: ${skillsError.message}`);
    } else {
      const processedSkills = processSkillsData(skillsData);
      results.data.skills = processedSkills;
      results.steps.push(`✅ Skills data processed: ${processedSkills.length} skills`);
    }
    
    // Step 6: Fetch and process audit data
    console.log('  🔄 Step 6: Fetching audit data...');
    const [auditData, auditError] = await graphqlService.getAuditRatio();
    
    if (auditError) {
      results.errors.push(`Audit Data: ${auditError.message}`);
    } else if (auditData) {
      const processedAudit = processAuditRatio(auditData);
      results.data.auditRatio = processedAudit;
      results.steps.push(`✅ Audit data processed: ${processedAudit.ratio} ratio`);
    } else {
      results.steps.push('⚠️ Audit data not found');
    }
    
    // Step 7: Fetch and process project XP data
    console.log('  🔄 Step 7: Fetching project XP data...');
    const [projectXPData, projectXPError] = await graphqlService.getXPByProject(userLogin);
    
    if (projectXPError) {
      results.errors.push(`Project XP Data: ${projectXPError.message}`);
    } else {
      const processedProjectXP = processXPByProject(projectXPData);
      results.data.projectXP = processedProjectXP;
      results.steps.push(`✅ Project XP data processed: ${processedProjectXP.length} projects`);
    }
    
  } catch (error) {
    results.errors.push(`Integration Error: ${error.message}`);
    results.success = false;
  }
  
  // Final assessment
  if (results.errors.length > 0) {
    results.success = false;
  }
  
  console.log(`\n📊 Integration Test Result: ${results.success ? 'SUCCESS' : 'FAILED'}`);
  console.log(`   Steps Completed: ${results.steps.length}`);
  console.log(`   Errors: ${results.errors.length}`);
  
  return results;
};

export const testDashboardDataFlow = async (userLogin) => {
  console.log(`\n🧪 Testing Dashboard Data Flow for: ${userLogin}`);
  
  const results = {
    steps: [],
    success: true,
    data: {},
    errors: [],
    timing: {},
  };
  
  try {
    // Test dashboard data fetch (combined query)
    console.log('  🔄 Fetching dashboard data...');
    const startTime = Date.now();
    
    const [dashboardData, dashboardError] = await graphqlService.getDashboardData(userLogin);
    
    const fetchTime = Date.now() - startTime;
    results.timing.fetchTime = fetchTime;
    
    if (dashboardError) {
      results.errors.push(`Dashboard Data: ${dashboardError.message}`);
      results.success = false;
    } else {
      results.data.dashboardData = dashboardData;
      results.steps.push(`✅ Dashboard data fetched in ${fetchTime}ms`);
      
      // Validate dashboard data structure
      const expectedKeys = ['user', 'event_user', 'transaction_aggregate'];
      const hasValidStructure = expectedKeys.some(key => key in dashboardData);
      
      if (hasValidStructure) {
        results.steps.push('✅ Dashboard data structure is valid');
        
        // Extract and process individual components
        if (dashboardData.user && dashboardData.user.length > 0) {
          const processedUser = processUserProfile(dashboardData.user[0]);
          results.data.processedUser = processedUser;
          results.steps.push('✅ User data extracted and processed');
        }
        
        if (dashboardData.event_user && dashboardData.event_user.length > 0) {
          const levelData = dashboardData.event_user[0];
          const processedLevel = processLevelData(levelData);
          results.data.level = processedLevel;
          results.steps.push(`✅ Level data extracted: Level ${processedLevel.level}`);
        }
        
        if (dashboardData.transaction_aggregate) {
          const totalXP = processXPData(dashboardData.transaction_aggregate);
          results.data.totalXP = totalXP;
          results.steps.push(`✅ XP data extracted: ${totalXP} XP`);
        }
        
      } else {
        results.errors.push('Dashboard data structure is invalid');
        results.success = false;
      }
    }
    
  } catch (error) {
    results.errors.push(`Dashboard Integration Error: ${error.message}`);
    results.success = false;
  }
  
  console.log(`\n📊 Dashboard Integration Test Result: ${results.success ? 'SUCCESS' : 'FAILED'}`);
  console.log(`   Fetch Time: ${results.timing.fetchTime}ms`);
  console.log(`   Steps Completed: ${results.steps.length}`);
  console.log(`   Errors: ${results.errors.length}`);
  
  return results;
};

export const testDataProcessingPipeline = () => {
  console.log('\n🧪 Testing Data Processing Pipeline...');
  
  // Sample data that mimics real GraphQL responses
  const sampleData = {
    user: {
      id: 123,
      login: 'testuser',
      firstName: 'John',
      lastName: 'Doe',
      campus: 'bahrain',
      auditRatio: 1.25,
      totalUp: 150,
      totalDown: 120,
    },
    xpData: {
      aggregate: { sum: { amount: 15000 } }
    },
    levelData: {
      level: 25,
      event: { id: 72, campus: 'bahrain' }
    },
    skillsData: [
      { type: 'skill_js', amount: 1500 },
      { type: 'skill_go', amount: 1200 },
      { type: 'skill_docker', amount: 800 },
    ],
    projectXPData: [
      {
        amount: 2000,
        path: '/bahrain/bh-module/project1',
        object: { name: 'Project 1', type: 'project' }
      },
      {
        amount: 1500,
        path: '/bahrain/bh-module/project2',
        object: { name: 'Project 2', type: 'project' }
      },
    ],
  };
  
  const results = {
    steps: [],
    success: true,
    processedData: {},
    errors: [],
  };
  
  try {
    // Process each data type
    console.log('  🔄 Processing user data...');
    const processedUser = processUserProfile(sampleData.user);
    results.processedData.user = processedUser;
    results.steps.push(`✅ User processed: ${processedUser.fullName}`);
    
    console.log('  🔄 Processing XP data...');
    const totalXP = processXPData(sampleData.xpData);
    results.processedData.totalXP = totalXP;
    results.steps.push(`✅ XP processed: ${totalXP}`);
    
    console.log('  🔄 Processing level data...');
    const levelInfo = processLevelData(sampleData.levelData);
    const rankTitle = getRankTitle(levelInfo.level);
    const cohortNumber = getCohortNumber(levelInfo.eventId);
    results.processedData.level = levelInfo.level;
    results.processedData.rankTitle = rankTitle;
    results.processedData.cohortNumber = cohortNumber;
    results.steps.push(`✅ Level processed: ${levelInfo.level} (${rankTitle}, Cohort ${cohortNumber})`);
    
    console.log('  🔄 Processing skills data...');
    const processedSkills = processSkillsData(sampleData.skillsData);
    results.processedData.skills = processedSkills;
    results.steps.push(`✅ Skills processed: ${processedSkills.length} skills`);
    
    console.log('  🔄 Processing project XP data...');
    const processedProjectXP = processXPByProject(sampleData.projectXPData);
    results.processedData.projectXP = processedProjectXP;
    results.steps.push(`✅ Project XP processed: ${processedProjectXP.length} projects`);
    
    console.log('  🔄 Processing audit data...');
    const auditInfo = processAuditRatio(sampleData.user);
    results.processedData.auditRatio = auditInfo;
    results.steps.push(`✅ Audit processed: ${auditInfo.ratio} ratio`);
    
  } catch (error) {
    results.errors.push(`Processing Error: ${error.message}`);
    results.success = false;
  }
  
  console.log(`\n📊 Data Processing Pipeline Test Result: ${results.success ? 'SUCCESS' : 'FAILED'}`);
  console.log(`   Steps Completed: ${results.steps.length}`);
  console.log(`   Errors: ${results.errors.length}`);
  
  return results;
};

// ============================================================================
// PERFORMANCE TESTS
// ============================================================================

export const testPerformance = async (userLogin) => {
  console.log('\n🧪 Testing Performance...');
  
  const results = {
    timings: {},
    success: true,
    errors: [],
  };
  
  try {
    // Test individual query performance
    const queries = [
      { name: 'getUserInfo', fn: () => graphqlService.getUserInfo() },
      { name: 'getTotalXP', fn: () => graphqlService.getTotalXP() },
      { name: 'getUserLevel', fn: () => graphqlService.getUserLevel(userLogin) },
      { name: 'getUserSkills', fn: () => graphqlService.getUserSkills() },
    ];
    
    for (const query of queries) {
      console.log(`  🔄 Testing ${query.name} performance...`);
      const startTime = Date.now();
      
      try {
        const [_data, error] = await query.fn();
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        results.timings[query.name] = duration;
        
        if (error) {
          results.errors.push(`${query.name}: ${error.message}`);
        } else {
          console.log(`    ✅ ${query.name}: ${duration}ms`);
        }
      } catch (err) {
        results.errors.push(`${query.name}: ${err.message}`);
      }
    }
    
    // Test dashboard query performance
    console.log('  🔄 Testing dashboard query performance...');
    const dashboardStartTime = Date.now();
    
    try {
      const [_dashboardData, dashboardError] = await graphqlService.getDashboardData(userLogin);
      const dashboardEndTime = Date.now();
      const dashboardDuration = dashboardEndTime - dashboardStartTime;
      
      results.timings.dashboard = dashboardDuration;
      
      if (dashboardError) {
        results.errors.push(`Dashboard: ${dashboardError.message}`);
      } else {
        console.log(`    ✅ Dashboard query: ${dashboardDuration}ms`);
      }
    } catch (err) {
      results.errors.push(`Dashboard: ${err.message}`);
    }
    
  } catch (error) {
    results.errors.push(`Performance Test Error: ${error.message}`);
    results.success = false;
  }
  
  // Calculate average performance
  const timingValues = Object.values(results.timings);
  const averageTime = timingValues.length > 0 ? 
    Math.round(timingValues.reduce((a, b) => a + b, 0) / timingValues.length) : 0;
  
  console.log(`\n📊 Performance Test Result: ${results.success ? 'SUCCESS' : 'FAILED'}`);
  console.log(`   Average Query Time: ${averageTime}ms`);
  console.log(`   Errors: ${results.errors.length}`);
  
  return results;
};

// ============================================================================
// MAIN INTEGRATION TEST RUNNER
// ============================================================================

export const runAllIntegrationTests = async (userLogin = 'test-user') => {
  console.log('🚀 Starting Integration Tests...\n');
  console.log(`Using test user: ${userLogin}`);
  console.log('='.repeat(50));
  
  const testResults = {};
  
  // Test 1: Complete user flow
  testResults.userFlow = await testCompleteUserFlow(userLogin);
  
  // Test 2: Dashboard data flow
  testResults.dashboardFlow = await testDashboardDataFlow(userLogin);
  
  // Test 3: Data processing pipeline
  testResults.processingPipeline = testDataProcessingPipeline();
  
  // Test 4: Performance tests
  testResults.performance = await testPerformance(userLogin);
  
  // Overall summary
  const allTests = Object.values(testResults);
  const successfulTests = allTests.filter(test => test.success).length;
  const totalTests = allTests.length;
  
  console.log('\n' + '='.repeat(50));
  console.log('📋 INTEGRATION TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total Test Suites: ${totalTests}`);
  console.log(`Successful: ${successfulTests}`);
  console.log(`Failed: ${totalTests - successfulTests}`);
  console.log(`Success Rate: ${Math.round((successfulTests / totalTests) * 100)}%`);
  console.log('='.repeat(50));
  
  return testResults;
};

// ============================================================================
// EXPORT FOR MANUAL TESTING
// ============================================================================

// For manual testing in browser console
if (typeof window !== 'undefined') {
  window.integrationTests = {
    runAllIntegrationTests,
    testCompleteUserFlow,
    testDashboardDataFlow,
    testDataProcessingPipeline,
    testPerformance,
  };
  
  console.log('🔧 Integration tests available in window.integrationTests');
  console.log('   Run window.integrationTests.runAllIntegrationTests("your-login") to start testing');
}
