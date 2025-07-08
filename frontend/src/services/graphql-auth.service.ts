import { gql } from '@apollo/client';
import { apolloClient } from '../lib/apollo-client';
import type { LoginCredentials, AuthResponse, AuthError } from '../types/auth';
import { AUTH_CONFIG } from '../config/auth.config';

const TOKEN_KEY = 'jwt_token';

const LOGIN_MUTATION = gql`
  mutation Login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      token
      user {
        id
        login
        email
      }
      expiresAt
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($login: String!, $email: String!, $password: String!) {
    register(login: $login, email: $email, password: $password) {
      token
      user {
        id
        login
        email
      }
      expiresAt
    }
  }
`;

export class GraphQLAuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('Attempting Basic auth login...');
      
      // Create base64 encoded credentials
      const auth = btoa(`${credentials.username || credentials.email}:${credentials.password}`);
      
      // Get JWT token using Basic auth
      const response = await fetch(AUTH_CONFIG.authEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`
        }
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Invalid credentials');
      }

      const token = await response.text();
      
      // Store the token
      localStorage.setItem(TOKEN_KEY, token);

      // Decode token to get user info
      const decodedToken = this.decodeToken(token);

      return {
        token,
        user: {
          id: decodedToken.id || decodedToken.sub,
          login: decodedToken.login || decodedToken.username,
          email: decodedToken.email
        }
      };
    } catch (error: any) {
      console.error('GraphQL login error:', error);
      throw this.handleError(error);
    }
  }

  static async register(credentials: LoginCredentials & { email: string }): Promise<AuthResponse> {
    try {
      console.log('Attempting GraphQL registration...');

      const { data } = await apolloClient.mutate({
        mutation: REGISTER_MUTATION,
        variables: {
          login: credentials.username || credentials.email.split('@')[0],
          email: credentials.email,
          password: credentials.password
        }
      });

      if (!data?.register) {
        throw new Error('No registration data received');
      }

      const { token, user } = data.register;

      // Store the token
      localStorage.setItem(TOKEN_KEY, token);

      return {
        token,
        user: {
          id: user.id,
          login: user.login,
          email: user.email
        }
      };
    } catch (error: any) {
      console.error('GraphQL registration error:', error);
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
      const parts = token.split('.');
      if (parts.length < 2 || !parts[1]) {
        throw new Error('Invalid token format');
      }

      const base64Url = parts[1];
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
    // Handle GraphQL errors
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      return {
        message: error.graphQLErrors[0].message,
        code: 'GRAPHQL_ERROR'
      };
    }

    // Handle network errors
    if (error.networkError) {
      return {
        message: error.networkError.message || 'Network error occurred',
        code: 'NETWORK_ERROR'
      };
    }

    return {
      message: error.message || 'An unexpected error occurred',
      code: error.code || 'AUTH_ERROR'
    };
  }
}
