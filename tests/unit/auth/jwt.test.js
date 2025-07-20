/**
 * JWT Token Tests
 * Tests for JWT token validation, parsing, and management
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import {
  validateJWT,
  parseJWT,
  isTokenExpired,
  getTokenPayload,
  refreshToken
} from '../../../src/utils/auth';
import { createMockJWT } from '../../setup/test-utils';

describe('JWT Token Management', () => {
  
  describe('validateJWT', () => {
    test('should validate a properly formatted JWT', () => {
      const validToken = createMockJWT();
      expect(validateJWT(validToken)).toBe(true);
    });

    test('should reject malformed JWT', () => {
      expect(validateJWT('invalid.token')).toBe(false);
      expect(validateJWT('not-a-jwt')).toBe(false);
      expect(validateJWT('')).toBe(false);
      expect(validateJWT(null)).toBe(false);
      expect(validateJWT(undefined)).toBe(false);
    });

    test('should reject JWT with missing parts', () => {
      expect(validateJWT('header.payload')).toBe(false);
      expect(validateJWT('header..signature')).toBe(false);
      expect(validateJWT('.payload.signature')).toBe(false);
    });
  });

  describe('parseJWT', () => {
    test('should parse JWT payload correctly', () => {
      const payload = {
        sub: '1',
        login: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      
      const token = createMockJWT(payload);
      const parsed = parseJWT(token);
      
      expect(parsed.sub).toBe('1');
      expect(parsed.login).toBe('testuser');
      expect(parsed.firstName).toBe('Test');
      expect(parsed.lastName).toBe('User');
    });

    test('should return null for invalid JWT', () => {
      expect(parseJWT('invalid-token')).toBeNull();
      expect(parseJWT('')).toBeNull();
      expect(parseJWT(null)).toBeNull();
    });

    test('should handle JWT with invalid JSON payload', () => {
      const invalidToken = 'header.invalid-json.signature';
      expect(parseJWT(invalidToken)).toBeNull();
    });
  });

  describe('isTokenExpired', () => {
    test('should detect expired token', () => {
      const expiredPayload = {
        exp: Math.floor(Date.now() / 1000) - 3600 // 1 hour ago
      };
      const expiredToken = createMockJWT(expiredPayload);
      
      expect(isTokenExpired(expiredToken)).toBe(true);
    });

    test('should detect valid token', () => {
      const validPayload = {
        exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
      };
      const validToken = createMockJWT(validPayload);
      
      expect(isTokenExpired(validToken)).toBe(false);
    });

    test('should handle token without expiration', () => {
      const noExpToken = createMockJWT({ sub: '1' }); // No exp field
      expect(isTokenExpired(noExpToken)).toBe(true);
    });

    test('should handle invalid token', () => {
      expect(isTokenExpired('invalid-token')).toBe(true);
      expect(isTokenExpired(null)).toBe(true);
      expect(isTokenExpired('')).toBe(true);
    });
  });

  describe('getTokenPayload', () => {
    test('should extract user data from token', () => {
      const payload = {
        sub: '1',
        login: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        campus: 'bahrain'
      };
      
      const token = createMockJWT(payload);
      const userData = getTokenPayload(token);
      
      expect(userData.id).toBe('1');
      expect(userData.login).toBe('testuser');
      expect(userData.firstName).toBe('Test');
      expect(userData.lastName).toBe('User');
      expect(userData.email).toBe('test@example.com');
      expect(userData.campus).toBe('bahrain');
    });

    test('should return null for invalid token', () => {
      expect(getTokenPayload('invalid-token')).toBeNull();
      expect(getTokenPayload(null)).toBeNull();
    });
  });

  describe('refreshToken', () => {
    beforeEach(() => {
      global.fetch = vi.fn();
    });

    test('should refresh valid token', async () => {
      const newToken = createMockJWT();
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: newToken })
      });

      const oldToken = createMockJWT();
      const refreshed = await refreshToken(oldToken);
      
      expect(refreshed).toBe(newToken);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/refresh'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': `Bearer ${oldToken}`
          })
        })
      );
    });

    test('should handle refresh failure', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: 'Invalid token' })
      });

      const oldToken = createMockJWT();
      
      await expect(refreshToken(oldToken)).rejects.toThrow('Token refresh failed');
    });

    test('should handle network error', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      const oldToken = createMockJWT();
      
      await expect(refreshToken(oldToken)).rejects.toThrow('Network error');
    });
  });

  describe('Token Storage', () => {
    beforeEach(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    test('should store token in localStorage', () => {
      const token = createMockJWT();
      localStorage.setItem('auth_token', token);
      
      expect(localStorage.getItem('auth_token')).toBe(token);
    });

    test('should remove token from localStorage', () => {
      const token = createMockJWT();
      localStorage.setItem('auth_token', token);
      localStorage.removeItem('auth_token');
      
      expect(localStorage.getItem('auth_token')).toBeNull();
    });
  });

});
