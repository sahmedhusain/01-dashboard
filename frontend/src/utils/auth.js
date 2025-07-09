import { jwtDecode } from 'jwt-decode';

// API endpoints
export const API_BASE_URL = 'https://learn.reboot01.com/api';
export const SIGNIN_ENDPOINT = `${API_BASE_URL}/auth/signin`;
export const GRAPHQL_ENDPOINT = `${API_BASE_URL}/graphql-engine/v1/graphql`;

// Local storage keys
export const TOKEN_KEY = 'reboot01_jwt_token';
export const USER_KEY = 'reboot01_user_data';

/**
 * Encode credentials for Basic authentication
 * @param {string} identifier - Username or email
 * @param {string} password - User password
 * @returns {string} Base64 encoded credentials
 */
export const encodeCredentials = (identifier, password) => {
  const credentials = `${identifier}:${password}`;
  return btoa(credentials);
};

/**
 * Authenticate user with the signin endpoint
 * @param {string} identifier - Username or email
 * @param {string} password - User password
 * @returns {Promise<{token: string, user: object}>} Authentication result
 */
export const authenticateUser = async (identifier, password) => {
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

    // Clean the token (remove any whitespace or quotes)
    const cleanToken = token.trim().replace(/^["']|["']$/g, '');

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Raw token length:', token.length);
      console.log('Clean token length:', cleanToken.length);
      console.log('Token parts:', cleanToken.split('.').length);
    }

    // Validate token format (basic JWT structure check)
    if (!cleanToken.includes('.') || cleanToken.split('.').length !== 3) {
      console.error('Invalid token format. Token:', cleanToken.substring(0, 50) + '...');
      throw new Error('Invalid token format received from server');
    }

    // Additional validation
    if (!isValidTokenFormat(cleanToken)) {
      console.error('Token failed format validation');
      throw new Error('Token format validation failed');
    }

    // Decode JWT to get user information
    const decodedToken = jwtDecode(cleanToken);
    const user = {
      id: decodedToken.sub,
      username: decodedToken.username || identifier,
      email: decodedToken.email,
      exp: decodedToken.exp,
      iat: decodedToken.iat,
    };

    return { token: cleanToken, user };
  } catch (error) {
    if (error.name === 'InvalidTokenError') {
      throw new Error('Invalid token received from server');
    }
    throw error;
  }
};

/**
 * Store authentication data in localStorage
 * @param {string} token - JWT token
 * @param {object} user - User data
 */
export const storeAuthData = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Get stored authentication token
 * @returns {string|null} JWT token or null if not found
 */
export const getStoredToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Get stored user data
 * @returns {object|null} User data or null if not found
 */
export const getStoredUser = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Validate JWT token format
 * @param {string} token - JWT token
 * @returns {boolean} True if token format is valid
 */
export const isValidTokenFormat = (token) => {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  // Check if each part is valid base64url
  try {
    parts.forEach(part => {
      if (!part) throw new Error('Empty part');
      // Basic base64url validation
      if (!/^[A-Za-z0-9_-]+$/.test(part)) throw new Error('Invalid characters');
    });
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if token is expired
 */
export const isTokenExpired = (token) => {
  try {
    if (!isValidTokenFormat(token)) return true;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.warn('Token validation error:', error.message);
    return true;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated with valid token
 */
export const isAuthenticated = () => {
  const token = getStoredToken();
  if (!token) return false;
  
  return !isTokenExpired(token);
};

/**
 * Clear authentication data
 */
export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Get authorization header for API requests
 * @returns {object} Authorization header object
 */
export const getAuthHeader = () => {
  const token = getStoredToken();
  if (!token || !isValidTokenFormat(token) || isTokenExpired(token)) {
    // Clear invalid token
    if (token) {
      console.warn('Clearing invalid or expired token');
      clearAuthData();
    }
    return {};
  }

  return {
    'Authorization': `Bearer ${token}`,
  };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Determine if identifier is email or username
 * @param {string} identifier - User input
 * @returns {string} 'email' or 'username'
 */
export const getIdentifierType = (identifier) => {
  return isValidEmail(identifier) ? 'email' : 'username';
};
