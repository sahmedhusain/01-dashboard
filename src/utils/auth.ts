import { jwtDecode } from 'jwt-decode';
import config from '../config/appConfig';

const GET_USER_BY_ID = `
  query GetUserById($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      firstName
      lastName
      auditRatio
      totalUp
      totalDown
      campus
      profile
      attrs
      createdAt
      updatedAt
    }
  }
`;

export const API_BASE_URL = config.api.baseURL;
export const SIGNIN_ENDPOINT = config.api.authEndpoint;
export const GRAPHQL_ENDPOINT = config.api.graphqlEndpoint;

export const TOKEN_KEY = config.auth.tokenKey;
export const USER_KEY = config.auth.userKey;

export const encodeCredentials = (identifier: string, password: string) => {
  const credentials = `${identifier}:${password}`;
  return btoa(credentials);
};

export const authenticateUser = async (identifier: string, password: string) => {
  try {
    const encodedCredentials = encodeCredentials(identifier, password);
    
    const response = await fetch(SIGNIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid credentials. Please check your username/email and password.');
      } else if (response.status === 403) {
        throw new Error('Access forbidden. Please contact support.');
      } else if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      } else {
        throw new Error(`Authentication failed: ${response.statusText}`);
      }
    }

    const token = await response.text();

    if (!token || token.trim() === '') {
      throw new Error('No token received from server');
    }

    const cleanToken = token.trim().replace(/^["']|["']$/g, '');

    if (!cleanToken.includes('.') || cleanToken.split('.').length !== 3) {
      throw new Error('Invalid token format received from server');
    }

    if (!isValidTokenFormat(cleanToken)) {
      throw new Error('Token format validation failed');
    }

    const decodedToken = jwtDecode(cleanToken) as any;
    const userId = parseInt(decodedToken.sub, 10);

    const user = {
      id: userId,
      exp: decodedToken.exp,
      iat: decodedToken.iat,
    };

    return { success: true, token: cleanToken, user };
  } catch (error) {
    if (error.name === 'InvalidTokenError') {
      throw new Error('Invalid token received from server');
    }
    throw error;
  }
};

export const authenticateUserComplete = async (identifier: string, password: string) => {
  try {
    const authResult = await authenticateUser(identifier, password);

    const completeUser = await fetchUserData(authResult.user.id, authResult.token);

    return {
      success: true,
      token: authResult.token,
      user: completeUser
    };
  } catch (error) {
    throw error;
  }
};

export const fetchUserData = async (userId: number, token: string) => {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: GET_USER_BY_ID,
        variables: { userId },
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(`GraphQL errors: ${result.errors.map(e => e.message).join(', ')}`);
    }

    if (!result.data?.user || result.data.user.length === 0) {
      throw new Error('User not found');
    }

    return result.data.user[0];
  } catch (error) {
    throw error;
  }
};

export const storeAuthData = (token: string, user: any) => {
  const zustandData = {
    state: {
      token,
      user,
      isAuthenticated: true
    },
    version: 0
  };
  localStorage.setItem(TOKEN_KEY, JSON.stringify(zustandData));

  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getStoredToken = () => {
  try {
    const directToken = localStorage.getItem(TOKEN_KEY);
    if (directToken && !directToken.startsWith('{')) {
      return directToken;
    }

    if (directToken) {
      const data = JSON.parse(directToken);
      return data.state?.token ?? null;
    }

    return null;
  } catch {
    return null;
  }
};

export const getStoredUser = () => {
  try {
    const directUser = localStorage.getItem(USER_KEY);
    if (directUser) {
      return JSON.parse(directUser);
    }

    const persisted = localStorage.getItem(TOKEN_KEY);
    if (persisted && persisted.startsWith('{')) {
      const data = JSON.parse(persisted);
      return data.state?.user ?? null;
    }

    return null;
  } catch {
    return null;
  }
};

export const getStoredAuthData = () => {
  return {
    token: getStoredToken(),
    user: getStoredUser(),
  };
};

export const isValidTokenFormat = (token: string) => {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  try {
    parts.forEach(part => {
      if (!part) throw new Error('Empty part');
      if (!/^[A-Za-z0-9_-]+$/.test(part)) throw new Error('Invalid characters');
    });
    return true;
  } catch {
    return false;
  }
};

export const isTokenExpired = (token: string) => {
  try {
    if (!isValidTokenFormat(token)) return true;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export const isAuthenticated = () => {
  const token = getStoredToken();
  if (!token) return false;
  
  return !isTokenExpired(token);
};

export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem('auth-storage');
  localStorage.removeItem('dashboard-preferences');
};

export const getAuthHeader = () => {
  const token = getStoredToken();

  if (!token) {
    return {};
  }

  if (!isValidTokenFormat(token)) {
    clearAuthData();
    return {};
  }

  if (isTokenExpired(token)) {
    clearAuthData();
    return {};
  }

  return {
    'Authorization': `Bearer ${token}`,
  };
};

export const isValidEmail = (email: string) => {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getIdentifierType = (identifier: string) => {
  return isValidEmail(identifier) ? 'email' : 'username';
};
