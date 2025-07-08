import type { LoginCredentials, AuthResponse, AuthError } from '../types/auth';

const AUTH_API = 'https://learn.reboot01.com/api/auth';
const TOKEN_KEY = 'jwt_token';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Create the Basic auth token
      const authString = credentials.email 
        ? `${credentials.email}:${credentials.password}`
        : `${credentials.username}:${credentials.password}`;
      
      const base64Credentials = btoa(authString);

      const response = await fetch(`${AUTH_API}/signin`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${base64Credentials}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        try {
          const error = await response.json();
          throw new Error(error.message || 'Login failed');
        } catch (jsonError) {
          throw new Error(`Login failed with status ${response.status}`);
        }
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
}
