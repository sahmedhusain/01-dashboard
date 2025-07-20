/**
 * Authentication Tests
 * Tests for login, logout, and session management
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import {
  authenticateUser,
  storeAuthData,
  getStoredToken,
  getStoredUser,
  isAuthenticated,
  clearAuthData,
  logout
} from '../../../src/utils/auth';
import { createMockJWT, mockAPIResponses } from '../../setup/test-utils';

describe('Authentication System', () => {
  
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    global.fetch = vi.fn();
  });

  describe('authenticateUser', () => {
    test('should authenticate with valid credentials', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAPIResponses.login.success
      });

      const result = await authenticateUser('testuser', 'password123');
      
      expect(result.token).toBeDefined();
      expect(result.user).toEqual(expect.objectContaining({
        login: 'testuser',
        firstName: 'Test',
        lastName: 'User'
      }));
      
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: 'testuser',
            password: 'password123'
          })
        })
      );
    });

    test('should reject invalid credentials', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => mockAPIResponses.login.failure
      });

      await expect(authenticateUser('wronguser', 'wrongpass'))
        .rejects.toThrow('Invalid credentials');
    });

    test('should handle network errors', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(authenticateUser('testuser', 'password123'))
        .rejects.toThrow('Network error');
    });

    test('should validate input parameters', async () => {
      await expect(authenticateUser('', 'password123'))
        .rejects.toThrow('Username and password are required');
      
      await expect(authenticateUser('testuser', ''))
        .rejects.toThrow('Username and password are required');
      
      await expect(authenticateUser(null, 'password123'))
        .rejects.toThrow('Username and password are required');
    });

    test('should handle email login', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAPIResponses.login.success
      });

      await authenticateUser('test@example.com', 'password123');
      
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        expect.objectContaining({
          body: JSON.stringify({
            identifier: 'test@example.com',
            password: 'password123'
          })
        })
      );
    });
  });

  describe('storeAuthData', () => {
    test('should store token and user data', () => {
      const token = createMockJWT();
      const user = { id: 1, login: 'testuser', firstName: 'Test' };
      
      storeAuthData(token, user);
      
      expect(localStorage.getItem('auth_token')).toBe(token);
      expect(JSON.parse(localStorage.getItem('auth_user'))).toEqual(user);
    });

    test('should handle null values', () => {
      storeAuthData(null, null);
      
      expect(localStorage.getItem('auth_token')).toBeNull();
      expect(localStorage.getItem('auth_user')).toBeNull();
    });
  });

  describe('getStoredToken', () => {
    test('should retrieve stored token', () => {
      const token = createMockJWT();
      localStorage.setItem('auth_token', token);
      
      expect(getStoredToken()).toBe(token);
    });

    test('should return null if no token stored', () => {
      expect(getStoredToken()).toBeNull();
    });

    test('should return null for invalid token', () => {
      localStorage.setItem('auth_token', 'invalid-token');
      expect(getStoredToken()).toBeNull();
    });
  });

  describe('getStoredUser', () => {
    test('should retrieve stored user data', () => {
      const user = { id: 1, login: 'testuser', firstName: 'Test' };
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      expect(getStoredUser()).toEqual(user);
    });

    test('should return null if no user stored', () => {
      expect(getStoredUser()).toBeNull();
    });

    test('should handle corrupted user data', () => {
      localStorage.setItem('auth_user', 'invalid-json');
      expect(getStoredUser()).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    test('should return true for valid authentication', () => {
      const token = createMockJWT();
      const user = { id: 1, login: 'testuser' };
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      expect(isAuthenticated()).toBe(true);
    });

    test('should return false for missing token', () => {
      const user = { id: 1, login: 'testuser' };
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      expect(isAuthenticated()).toBe(false);
    });

    test('should return false for missing user', () => {
      const token = createMockJWT();
      localStorage.setItem('auth_token', token);
      
      expect(isAuthenticated()).toBe(false);
    });

    test('should return false for expired token', () => {
      const expiredToken = createMockJWT({
        exp: Math.floor(Date.now() / 1000) - 3600
      });
      const user = { id: 1, login: 'testuser' };
      
      localStorage.setItem('auth_token', expiredToken);
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      expect(isAuthenticated()).toBe(false);
    });
  });

  describe('clearAuthData', () => {
    test('should clear all authentication data', () => {
      const token = createMockJWT();
      const user = { id: 1, login: 'testuser' };
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      clearAuthData();
      
      expect(localStorage.getItem('auth_token')).toBeNull();
      expect(localStorage.getItem('auth_user')).toBeNull();
    });
  });

  describe('logout', () => {
    test('should clear authentication and call logout endpoint', async () => {
      global.fetch.mockResolvedValueOnce({ ok: true });
      
      const token = createMockJWT();
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify({ id: 1 }));
      
      await logout();
      
      expect(localStorage.getItem('auth_token')).toBeNull();
      expect(localStorage.getItem('auth_user')).toBeNull();
      
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/logout'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': `Bearer ${token}`
          })
        })
      );
    });

    test('should clear data even if logout endpoint fails', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));
      
      const token = createMockJWT();
      localStorage.setItem('auth_token', token);
      
      await logout();
      
      expect(localStorage.getItem('auth_token')).toBeNull();
    });
  });

});
