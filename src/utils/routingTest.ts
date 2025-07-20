/**
 * Routing Test Utilities
 * Test functions to verify URL routing implementation
 */

import { TAB_CONFIG, getTabFromPath, getPathFromTab } from './routing';

/**
 * Test URL to tab mapping
 */
export const testUrlToTabMapping = () => {
  const tests = [
    { path: '/', expectedTab: 'profile' },
    { path: '/search', expectedTab: 'search' },
    { path: '/stats', expectedTab: 'stats' },
    { path: '/audits', expectedTab: 'audits' },
    { path: '/technologies', expectedTab: 'technologies' },
    { path: '/invalid', expectedTab: 'profile' }, // Should default to profile
  ];

  console.log('🧪 Testing URL to Tab Mapping:');
  
  tests.forEach(({ path, expectedTab }) => {
    const actualTab = getTabFromPath(path);
    const passed = actualTab === expectedTab;
    console.log(`${passed ? '✅' : '❌'} ${path} → ${actualTab} (expected: ${expectedTab})`);
  });
};

/**
 * Test tab to URL mapping
 */
export const testTabToUrlMapping = () => {
  const tests = [
    { tab: 'profile', expectedPath: '/' },
    { tab: 'search', expectedPath: '/search' },
    { tab: 'stats', expectedPath: '/stats' },
    { tab: 'audits', expectedPath: '/audits' },
    { tab: 'technologies', expectedPath: '/technologies' },
    { tab: 'invalid', expectedPath: '/' }, // Should default to home
  ];

  console.log('\n🧪 Testing Tab to URL Mapping:');
  
  tests.forEach(({ tab, expectedPath }) => {
    const actualPath = getPathFromTab(tab);
    const passed = actualPath === expectedPath;
    console.log(`${passed ? '✅' : '❌'} ${tab} → ${actualPath} (expected: ${expectedPath})`);
  });
};

/**
 * Test tab configuration consistency
 */
export const testTabConfiguration = () => {
  console.log('\n🧪 Testing Tab Configuration:');
  
  const requiredFields = ['id', 'label', 'path', 'icon'];
  const allTabsValid = TAB_CONFIG.every(tab => {
    const hasAllFields = requiredFields.every(field => Object.prototype.hasOwnProperty.call(tab, field));
    if (!hasAllFields) {
      console.log(`❌ Tab ${tab.id || 'unknown'} missing required fields`);
      return false;
    }
    return true;
  });
  
  console.log(`${allTabsValid ? '✅' : '❌'} All tabs have required fields`);
  
  // Test for unique IDs
  const ids = TAB_CONFIG.map(tab => tab.id);
  const uniqueIds = [...new Set(ids)];
  const idsUnique = ids.length === uniqueIds.length;
  console.log(`${idsUnique ? '✅' : '❌'} All tab IDs are unique`);
  
  // Test for unique paths
  const paths = TAB_CONFIG.map(tab => tab.path);
  const uniquePaths = [...new Set(paths)];
  const pathsUnique = paths.length === uniquePaths.length;
  console.log(`${pathsUnique ? '✅' : '❌'} All tab paths are unique`);
};

/**
 * Run all routing tests
 */
export const runAllRoutingTests = () => {
  console.log('🚀 Running Routing Tests...\n');
  
  testTabConfiguration();
  testUrlToTabMapping();
  testTabToUrlMapping();
  
  console.log('\n✨ Routing tests completed!');
};

/**
 * Test routing in browser console
 * Call this function in browser dev tools to test routing
 */
export const testRoutingInBrowser = () => {
  if (typeof window === 'undefined') {
    console.log('❌ This test must be run in a browser environment');
    return;
  }
  
  console.log('🧪 Testing Routing in Browser:');
  
  // Test current URL detection
  const currentPath = window.location.pathname;
  const currentTab = getTabFromPath(currentPath);
  console.log(`✅ Current URL: ${currentPath} → Tab: ${currentTab}`);
  
  // Test navigation (if React Router is available)
  if (window.history && window.history.pushState) {
    console.log('✅ Browser navigation API available');
    
    // Test programmatic navigation
    TAB_CONFIG.forEach(tab => {
      console.log(`📍 Tab ${tab.id} should navigate to: ${tab.path}`);
    });
  } else {
    console.log('❌ Browser navigation API not available');
  }
};

// Auto-run tests in development
if (import.meta.env.DEV) {
  // Delay to ensure modules are loaded
  setTimeout(() => {
    runAllRoutingTests();
  }, 1000);
}
