import { getAuthService, switchAuthProvider, AUTH_CONFIG } from '../config/auth.config';

// Enhanced debugging function that you can call from the browser console
(window as any).debugAuth = {
  // Test with real credentials
  testLogin: async (username: string, password: string) => {
    console.log('=== Testing Login with Real Credentials ===');
    console.log(`Using ${AUTH_CONFIG.authProvider} auth provider`);
    try {
      const AuthService = getAuthService();
      const result = await AuthService.login({ username, password });
      console.log('Login successful:', result);
      return result;
    } catch (error) {
      console.error('Login failed:', error);
      return { error };
    }
  },

  // Switch auth provider
  switchProvider: (provider: 'graphql' | 'local' | 'external') => {
    switchAuthProvider(provider);
    console.log(`Now using ${provider} authentication provider`);
  },

  // Test API availability
  testEndpoints: async () => {
    console.log('=== Testing API Endpoints ===');
    const AuthService = getAuthService();
    if ('testEndpoints' in AuthService) {
      await (AuthService as any).testEndpoints();
    } else {
      console.log('testEndpoints not available for current auth service');
    }
  },

  // Test specific requests
  testRawRequest: async (method: string, body?: any, headers?: any) => {
    console.log('=== Testing Raw Request ===');
    console.log('Method:', method);
    console.log('Body:', body);
    console.log('Headers:', headers);

    try {
      const response = await fetch('https://learn.reboot01.com/api/auth/signin', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined
      });

      console.log('Response status:', response.status);
      console.log('Response statusText:', response.statusText);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      let responseData;
      const contentType = response.headers.get('Content-Type');
      if (contentType?.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      console.log('Response data:', responseData);
      return { status: response.status, data: responseData };
    } catch (error) {
      console.error('Request failed:', error);
      return { error };
    }
  },

  // Test CORS
  testCORS: async () => {
    console.log('=== Testing CORS ===');
    try {
      const response = await fetch('https://learn.reboot01.com/api/auth/signin', {
        method: 'OPTIONS',
        headers: {
          'Origin': window.location.origin,
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type, Authorization'
        }
      });

      console.log('CORS preflight status:', response.status);
      console.log('Access-Control-Allow-Origin:', response.headers.get('Access-Control-Allow-Origin'));
      console.log('Access-Control-Allow-Methods:', response.headers.get('Access-Control-Allow-Methods'));
      console.log('Access-Control-Allow-Headers:', response.headers.get('Access-Control-Allow-Headers'));
      console.log('Access-Control-Allow-Credentials:', response.headers.get('Access-Control-Allow-Credentials'));

      return {
        status: response.status,
        allowOrigin: response.headers.get('Access-Control-Allow-Origin'),
        allowMethods: response.headers.get('Access-Control-Allow-Methods'),
        allowHeaders: response.headers.get('Access-Control-Allow-Headers')
      };
    } catch (error) {
      console.error('CORS test failed:', error);
      return { error };
    }
  },

  // Test different authentication formats
  testAuthFormats: async (username: string, password: string) => {
    console.log('=== Testing Different Auth Formats ===');
    
    const formats = [
      {
        name: 'JSON with username',
        data: { username, password }
      },
      {
        name: 'JSON with email',
        data: { email: username, password }
      },
      {
        name: 'JSON with identifier',
        data: { identifier: username, password }
      },
      {
        name: 'JSON with login',
        data: { login: username, password }
      }
    ];

    for (const format of formats) {
      console.log(`\nTesting format: ${format.name}`);
      const result = await (window as any).debugAuth.testRawRequest('POST', format.data);
      console.log(`Result: ${result.status || result.error}`);
    }
  }
};

console.log('Debug tools loaded. Available functions:');
console.log('- debugAuth.testLogin(username, password)');
console.log('- debugAuth.switchProvider("graphql" | "local" | "external")');
console.log('- debugAuth.testEndpoints()'); 
console.log('- debugAuth.testRawRequest(method, body, headers)');
console.log('- debugAuth.testCORS()');
console.log('- debugAuth.testAuthFormats(username, password)');
console.log(`Current provider: ${AUTH_CONFIG.authProvider}`);
