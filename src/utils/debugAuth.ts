// ============================================================================
// DEBUG AUTHENTICATION UTILITIES
// Helper functions to debug authentication and data flow issues
// ============================================================================

/**
 * Debug authentication state and user data
 * Call this function in the browser console to check auth state
 */
export const debugAuthState = () => {
  // Get stored auth data
  const token = localStorage.getItem('auth_token');
  const userData = localStorage.getItem('auth_user');
  
  console.group('🔍 Authentication Debug');
  
  console.log('📦 Stored Token:', token ? 'Present' : 'Missing');
  console.log('👤 Stored User Data:', userData ? JSON.parse(userData) : 'Missing');
  
  if (token) {
    try {
      // Decode JWT token (simple base64 decode for payload)
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('🔓 JWT Payload:', payload);
      console.log('⏰ Token Expires:', new Date(payload.exp * 1000));
      console.log('🆔 User ID from JWT:', payload.sub);
    } catch (error) {
      console.error('❌ Error decoding JWT:', error);
    }
  }
  
  console.groupEnd();
};

/**
 * Debug data fetching with user ID
 * Call this function to test GraphQL data fetching
 */
export const debugDataFetch = async (userId) => {
  console.group('🔍 Data Fetch Debug');
  
  if (!userId) {
    console.error('❌ No userId provided');
    console.groupEnd();
    return;
  }
  
  console.log('🆔 Testing with User ID:', userId, typeof userId);
  
  try {
    // Import GraphQL service
    const { default: graphqlService } = await import('../graphql/dataService');
    
    // Test getUserById
    console.log('📡 Fetching user by ID...');
    const [userData, userError] = await graphqlService.getUserById(userId);
    
    if (userError) {
      console.error('❌ User fetch error:', userError);
    } else {
      console.log('✅ User data:', userData);
    }
    
    // Test dashboard data if user exists
    if (userData && userData.login) {
      console.log('📊 Testing dashboard data fetch...');
      // This would test the full dashboard data flow
      console.log('🔗 User login for dashboard:', userData.login);
    }
    
  } catch (error) {
    console.error('❌ Debug error:', error);
  }
  
  console.groupEnd();
};

/**
 * Debug data context state
 * Call this function to check what data is available in the DataContext
 */
export const debugDataContext = () => {
  console.group('🔍 Data Context Debug');

  try {
    // Try to access the data context from a React component
    console.log('📊 To debug data context, call this from a component that uses useData()');
    console.log('📝 Example: In browser console, type: window.debugDataFromComponent()');
  } catch (error) {
    console.error('❌ Error accessing data context:', error);
  }

  console.groupEnd();
};

/**
 * Make debug functions available globally in development
 */
if (import.meta.env.DEV) {
  window.debugAuth = debugAuthState;
  window.debugDataFetch = debugDataFetch;
  window.debugDataContext = debugDataContext;

  // Function to be called from components
  window.debugDataFromComponent = (data) => {
    console.group('🔍 Component Data Debug');
    console.log('📊 Full data object:', data);
    console.log('👤 User:', data?.user);
    console.log('🎯 Skills:', data?.skills);
    console.log('💰 Transactions:', data?.transactions);
    console.log('📈 Loading:', data?.loading);
    console.log('❌ Error:', data?.error);
    console.groupEnd();
  };

  console.log('🛠️ Debug functions available:');
  console.log('  - window.debugAuth() - Check authentication state');
  console.log('  - window.debugDataFetch(userId) - Test GraphQL data fetching');
  console.log('  - window.debugDataFromComponent(data) - Debug component data');
}
