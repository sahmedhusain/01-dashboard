import type { LoginCredentials, AuthResponse, AuthError } from '../types/auth';

const AUTH_API = 'https://learn.reboot01.com/api/auth';
const TOKEN_KEY = 'jwt_token';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('Attempting login with credentials:', {
        hasUsername: !!credentials.username,
        hasEmail: !!credentials.email,
        hasPassword: !!credentials.password
      });

      // Try different authentication methods
      const authMethods = [
        // Method 1: JSON body with credentials
        async () => {
          console.log('Trying JSON body authentication...');
          return await fetch(`${AUTH_API}/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              ...(credentials.email ? { email: credentials.email } : { username: credentials.username }),
              password: credentials.password
            })
          });
        },
        
        // Method 2: Basic auth (current method)
        async () => {
          console.log('Trying Basic auth authentication...');
          const authString = credentials.email 
            ? `${credentials.email}:${credentials.password}`
            : `${credentials.username}:${credentials.password}`;
          
          const base64Credentials = btoa(authString);

          return await fetch(`${AUTH_API}/signin`, {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${base64Credentials}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
        },

        // Method 3: Form data
        async () => {
          console.log('Trying form data authentication...');
          const formData = new FormData();
          if (credentials.email) {
            formData.append('email', credentials.email);
          } else {
            formData.append('username', credentials.username!);
          }
          formData.append('password', credentials.password);

          return await fetch(`${AUTH_API}/signin`, {
            method: 'POST',
            body: formData
          });
        }
      ];

      let response: Response | null = null;

      // Try each authentication method
      for (const [index, authMethod] of authMethods.entries()) {
        try {
          response = await authMethod();
          console.log(`Auth method ${index + 1} response:`, {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
          });

          if (response.ok) {
            console.log(`Auth method ${index + 1} succeeded!`);
            break;
          } else {
            // Log the error response for debugging
            const errorText = await response.clone().text();
            console.log(`Auth method ${index + 1} failed with status ${response.status}:`, errorText);
          }
        } catch (error) {
          console.log(`Auth method ${index + 1} threw an error:`, error);
        }
      }

      if (!response || !response.ok) {
        // Try to get error details from the last response
        let errorMessage = 'Login failed';
        if (response) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || `Login failed with status ${response.status}`;
          } catch {
            try {
              const errorText = await response.text();
              errorMessage = errorText || `Login failed with status ${response.status}`;
            } catch {
              errorMessage = `Login failed with status ${response.status}`;
            }
          }
        }
        throw new Error(errorMessage);
      }

      let token: string;
      let user: any;
      
      try {
        const response_data = await response.json();
        token = response_data.token;

        // Store the token
        localStorage.setItem(TOKEN_KEY, token);

        // Decode the JWT to get user info
        user = this.decodeToken(token);
      } catch (jsonError) {
        throw new Error('Invalid response from server');
      }

      return {
        token,
        user: {
          id: user.id,
          login: user.login,
          email: user.email
        }
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const { exp } = this.decodeToken(token);
      return Date.now() < exp * 1000;
    } catch {
      return false;
    }
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  static decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private static handleError(error: any): AuthError {
    return {
      message: error.message || 'An unexpected error occurred',
      code: error.code || 'AUTH_ERROR'
    };
  }

  // Test method to check available endpoints
  static async testEndpoints(): Promise<void> {
    const endpoints = [
      `${AUTH_API}/signin`,
      `${AUTH_API}/login`,
      `${AUTH_API}/authenticate`,
      'https://learn.reboot01.com/api/login',
      'https://learn.reboot01.com/api/signin',
      'https://learn.reboot01.com/auth/signin',
      'https://learn.reboot01.com/auth/login'
    ];

    console.log('Testing available endpoints...');
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Testing: ${endpoint}`);
        const response = await fetch(endpoint, {
          method: 'OPTIONS',
          headers: {
            'Origin': window.location.origin
          }
        });
        console.log(`${endpoint}: ${response.status} ${response.statusText}`);
        console.log(`Allowed methods:`, response.headers.get('Access-Control-Allow-Methods'));
        console.log(`Allowed headers:`, response.headers.get('Access-Control-Allow-Headers'));
      } catch (error) {
        console.log(`${endpoint}: Error -`, error);
      }
    }
  }
}
