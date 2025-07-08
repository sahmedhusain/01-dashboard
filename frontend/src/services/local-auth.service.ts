import type { LoginCredentials, AuthResponse, AuthError } from '../types/auth';

const LOCAL_AUTH_API = 'http://localhost:8080/api/auth';
const TOKEN_KEY = 'jwt_token';

export class LocalAuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('Attempting login with local backend...');

      const response = await fetch(`${LOCAL_AUTH_API}/login`, {
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

      if (!response.ok) {
        let errorMessage = 'Login failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || `Login failed with status ${response.status}`;
        } catch {
          errorMessage = `Login failed with status ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const token = data.token || data.access_token;

      if (!token) {
        throw new Error('No token received from server');
      }

      // Store the token
      localStorage.setItem(TOKEN_KEY, token);

      // Decode the JWT to get user info or use provided user data
      let user;
      if (data.user) {
        user = data.user;
      } else {
        user = this.decodeToken(token);
      }

      return {
        token,
        user: {
          id: user.id || user.sub,
          login: user.login || user.username || user.preferred_username,
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
