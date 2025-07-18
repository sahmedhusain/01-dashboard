// ============================================================================
// ESSENTIAL UTILITIES VALIDATION TEST
// Test that auth.js, cn.js, and errorHandling.js work with the new system
// ============================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Test auth utilities
import {
  encodeCredentials,
  isValidTokenFormat,
  isTokenExpired,
  getAuthHeader,
  clearAuthData,
  storeAuthData,
  getStoredToken,
  getStoredUser,
  isValidEmail,
  getIdentifierType,
} from '../utils/auth.js';

// Test error handling utilities
import {
  processGraphQLError,
  ERROR_TYPES,
  ERROR_SEVERITY,
  validateQueryVariables,
  logError,
  getFallbackData,
} from '../utils/errorHandling.js';

// Test cn utility
import { cn } from '../utils/cn.js';

describe('Essential Utilities Validation', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  // ============================================================================
  // AUTH UTILITIES TESTS
  // ============================================================================

  describe('Auth Utilities', () => {
    it('should encode credentials correctly', () => {
      const encoded = encodeCredentials('testuser', 'password123');
      expect(encoded).toBe(btoa('testuser:password123'));
    });

    it('should validate JWT token format', () => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const invalidToken = 'invalid.token';
      
      expect(isValidTokenFormat(validToken)).toBe(true);
      expect(isValidTokenFormat(invalidToken)).toBe(false);
      expect(isValidTokenFormat('')).toBe(false);
      expect(isValidTokenFormat(null)).toBe(false);
    });

    it('should detect expired tokens', () => {
      // Create a token that expires in the past
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNTE2MjM5MDIyfQ.Twz7-WlMhDjqv-pnhwp6lRBmUzWbfVwD6rN8VxhVpFE';
      
      expect(isTokenExpired(expiredToken)).toBe(true);
      expect(isTokenExpired('invalid')).toBe(true);
    });

    it('should store and retrieve auth data', () => {
      const token = 'test.jwt.token';
      const user = { id: 1, username: 'testuser' };
      
      storeAuthData(token, user);
      
      expect(getStoredToken()).toBe(token);
      expect(getStoredUser()).toEqual(user);
    });

    it('should clear auth data', () => {
      storeAuthData('token', { id: 1 });
      clearAuthData();
      
      expect(getStoredToken()).toBeNull();
      expect(getStoredUser()).toBeNull();
    });

    it('should generate auth headers', () => {
      const token = 'test.jwt.token';
      storeAuthData(token, { id: 1 });
      
      const headers = getAuthHeader();
      expect(headers).toEqual({
        'Authorization': `Bearer ${token}`,
      });
    });

    it('should validate email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });

    it('should identify email vs username', () => {
      expect(getIdentifierType('test@example.com')).toBe('email');
      expect(getIdentifierType('username')).toBe('username');
    });
  });

  // ============================================================================
  // ERROR HANDLING UTILITIES TESTS
  // ============================================================================

  describe('Error Handling Utilities', () => {
    it('should process GraphQL errors correctly', () => {
      const mockError = {
        message: 'Test error',
        graphQLErrors: [{
          message: 'GraphQL error',
          extensions: { code: 'UNAUTHENTICATED' }
        }]
      };
      
      const processed = processGraphQLError(mockError);
      
      expect(processed).toBeDefined();
      expect(processed.type).toBe(ERROR_TYPES.AUTHENTICATION);
      expect(processed.severity).toBe(ERROR_SEVERITY.HIGH);
      expect(processed.userMessage).toContain('log in');
    });

    it('should handle network errors', () => {
      const mockError = {
        networkError: {
          statusCode: 500,
          message: 'Server error'
        }
      };
      
      const processed = processGraphQLError(mockError);
      
      expect(processed.type).toBe(ERROR_TYPES.SERVER);
      expect(processed.retryable).toBe(true);
    });

    it('should validate query variables', () => {
      const variables = {
        userId: 123,
        name: 'test'
      };
      
      const schema = {
        userId: { required: true, type: 'number' },
        name: { required: true, type: 'string' }
      };
      
      const errors = validateQueryVariables(variables, schema);
      expect(errors).toHaveLength(0);
    });

    it('should detect validation errors', () => {
      const variables = {
        userId: 'invalid', // Should be number
        // name is missing but required
      };
      
      const schema = {
        userId: { required: true, type: 'number' },
        name: { required: true, type: 'string' }
      };
      
      const errors = validateQueryVariables(variables, schema);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should provide fallback data', () => {
      const mockError = new Error('Test error');
      
      const fallback = getFallbackData('user_profile', mockError);
      
      expect(fallback).toBeDefined();
      expect(fallback.loading).toBe(false);
      expect(fallback.error).toBeDefined();
      expect(fallback.login).toBe('Unknown User');
    });

    it('should log errors properly', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const mockError = new Error('Test error');
      
      const logEntry = logError(mockError, { userId: 123 });
      
      expect(logEntry).toBeDefined();
      expect(logEntry.context.userId).toBe(123);
      
      consoleSpy.mockRestore();
    });
  });

  // ============================================================================
  // CN UTILITY TESTS
  // ============================================================================

  describe('CN Utility', () => {
    it('should merge class names correctly', () => {
      const result = cn('class1', 'class2', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('should filter out falsy values', () => {
      const result = cn('class1', null, undefined, false, '', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const isDisabled = false;
      
      const result = cn(
        'base-class',
        isActive && 'active',
        isDisabled && 'disabled'
      );
      
      expect(result).toBe('base-class active');
    });
  });

  // ============================================================================
  // INTEGRATION TESTS
  // ============================================================================

  describe('Integration Tests', () => {
    it('should work together in a typical flow', () => {
      // 1. Store auth data
      const token = 'test.jwt.token';
      const user = { id: 1, username: 'testuser' };
      storeAuthData(token, user);
      
      // 2. Get auth headers
      const headers = getAuthHeader();
      expect(headers.Authorization).toBe(`Bearer ${token}`);
      
      // 3. Handle an error
      const mockError = new Error('Network error');
      const processed = processGraphQLError(mockError);
      expect(processed.userMessage).toBeDefined();
      
      // 4. Use cn utility for styling
      const className = cn('error-message', processed.severity === ERROR_SEVERITY.HIGH && 'high-severity');
      expect(className).toContain('error-message');
      
      // 5. Get fallback data
      const fallback = getFallbackData('user_profile', mockError);
      expect(fallback.error).toBeDefined();
    });

    it('should handle authentication flow', () => {
      // Test complete auth flow
      const credentials = encodeCredentials('user@example.com', 'password');
      expect(credentials).toBeDefined();
      
      const identifier = getIdentifierType('user@example.com');
      expect(identifier).toBe('email');
      
      // Simulate storing token after successful auth
      storeAuthData('new.token', { id: 1, email: 'user@example.com' });
      
      const storedUser = getStoredUser();
      expect(storedUser.email).toBe('user@example.com');
    });
  });
});

// ============================================================================
// CONSTANTS VALIDATION
// ============================================================================

describe('Constants Validation', () => {
  it('should have all required error types', () => {
    expect(ERROR_TYPES.NETWORK).toBeDefined();
    expect(ERROR_TYPES.GRAPHQL).toBeDefined();
    expect(ERROR_TYPES.AUTHENTICATION).toBeDefined();
    expect(ERROR_TYPES.AUTHORIZATION).toBeDefined();
    expect(ERROR_TYPES.VALIDATION).toBeDefined();
  });

  it('should have all required error severities', () => {
    expect(ERROR_SEVERITY.LOW).toBeDefined();
    expect(ERROR_SEVERITY.MEDIUM).toBeDefined();
    expect(ERROR_SEVERITY.HIGH).toBeDefined();
    expect(ERROR_SEVERITY.CRITICAL).toBeDefined();
  });
});
