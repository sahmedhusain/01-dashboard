/**
 * Complete Authentication Flow Integration Tests
 * Tests the entire authentication flow from login to logout
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../../src/App';
import { renderWithProviders, createMockJWT, mockAPIResponses } from '../../setup/test-utils';

describe('Complete Authentication Flow', () => {
  
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    global.fetch = vi.fn();
  });

  describe('Login Flow', () => {
    test('should complete full login process', async () => {
      // Mock successful login API response
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAPIResponses.login.success
      });

      // Mock user info fetch after login
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAPIResponses.userInfo.success
      });

      // Render the app without authentication
      const { container } = renderWithProviders(<App />, {
        authValue: {
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
          login: vi.fn(),
          logout: vi.fn(),
          clearError: vi.fn()
        }
      });

      // Should show login form
      expect(screen.getByTestId('login-form')).toBeInTheDocument();

      // Fill in login credentials
      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      // Submit login form
      fireEvent.click(loginButton);

      // Should show loading state
      await waitFor(() => {
        expect(screen.getByTestId('login-loading')).toBeInTheDocument();
      });

      // Should redirect to dashboard after successful login
      await waitFor(() => {
        expect(screen.getByTestId('dashboard')).toBeInTheDocument();
      }, { timeout: 3000 });

      // Should store authentication data
      expect(localStorage.getItem('auth_token')).toBeTruthy();
      expect(localStorage.getItem('auth_user')).toBeTruthy();
    });

    test('should handle login failure', async () => {
      // Mock failed login API response
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => mockAPIResponses.login.failure
      });

      renderWithProviders(<App />, {
        authValue: {
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
          login: vi.fn(),
          logout: vi.fn(),
          clearError: vi.fn()
        }
      });

      // Fill in wrong credentials
      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
      fireEvent.click(loginButton);

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      });

      // Should remain on login page
      expect(screen.getByTestId('login-form')).toBeInTheDocument();
    });
  });

  describe('Session Management', () => {
    test('should restore session from localStorage', async () => {
      // Pre-populate localStorage with valid auth data
      const mockToken = createMockJWT();
      const mockUser = { id: 1, login: 'testuser', firstName: 'Test' };
      
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));

      // Mock data fetching after session restore
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockAPIResponses.userInfo.success
      });

      renderWithProviders(<App />);

      // Should automatically redirect to dashboard
      await waitFor(() => {
        expect(screen.getByTestId('dashboard')).toBeInTheDocument();
      });

      // Should display user information
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    test('should handle expired token', async () => {
      // Create expired token
      const expiredToken = createMockJWT({
        exp: Math.floor(Date.now() / 1000) - 3600 // 1 hour ago
      });
      const mockUser = { id: 1, login: 'testuser' };
      
      localStorage.setItem('auth_token', expiredToken);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));

      renderWithProviders(<App />);

      // Should redirect to login page
      await waitFor(() => {
        expect(screen.getByTestId('login-form')).toBeInTheDocument();
      });

      // Should clear expired auth data
      expect(localStorage.getItem('auth_token')).toBeNull();
      expect(localStorage.getItem('auth_user')).toBeNull();
    });

    test('should handle token refresh', async () => {
      // Create token that expires soon
      const soonToExpireToken = createMockJWT({
        exp: Math.floor(Date.now() / 1000) + 300 // 5 minutes from now
      });
      const newToken = createMockJWT({
        exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
      });
      
      localStorage.setItem('auth_token', soonToExpireToken);
      localStorage.setItem('auth_user', JSON.stringify({ id: 1, login: 'testuser' }));

      // Mock token refresh API
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: newToken })
      });

      renderWithProviders(<App />);

      // Should automatically refresh token
      await waitFor(() => {
        expect(localStorage.getItem('auth_token')).toBe(newToken);
      });
    });
  });

  describe('Logout Flow', () => {
    test('should complete full logout process', async () => {
      // Setup authenticated state
      const mockToken = createMockJWT();
      const mockUser = { id: 1, login: 'testuser', firstName: 'Test' };
      
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));

      // Mock logout API
      global.fetch.mockResolvedValueOnce({ ok: true });

      renderWithProviders(<App />);

      // Should be on dashboard
      await waitFor(() => {
        expect(screen.getByTestId('dashboard')).toBeInTheDocument();
      });

      // Click logout button
      const logoutButton = screen.getByTestId('logout-button');
      fireEvent.click(logoutButton);

      // Should redirect to login page
      await waitFor(() => {
        expect(screen.getByTestId('login-form')).toBeInTheDocument();
      });

      // Should clear authentication data
      expect(localStorage.getItem('auth_token')).toBeNull();
      expect(localStorage.getItem('auth_user')).toBeNull();

      // Should call logout API
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/logout'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': `Bearer ${mockToken}`
          })
        })
      );
    });

    test('should handle logout API failure gracefully', async () => {
      // Setup authenticated state
      const mockToken = createMockJWT();
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify({ id: 1 }));

      // Mock logout API failure
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      renderWithProviders(<App />);

      // Click logout button
      const logoutButton = screen.getByTestId('logout-button');
      fireEvent.click(logoutButton);

      // Should still clear local data and redirect
      await waitFor(() => {
        expect(screen.getByTestId('login-form')).toBeInTheDocument();
      });

      expect(localStorage.getItem('auth_token')).toBeNull();
    });
  });

  describe('Protected Routes', () => {
    test('should protect dashboard route', async () => {
      // Try to access dashboard without authentication
      renderWithProviders(<App />, {
        authValue: {
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
          login: vi.fn(),
          logout: vi.fn(),
          clearError: vi.fn()
        }
      });

      // Should redirect to login
      expect(screen.getByTestId('login-form')).toBeInTheDocument();
    });

    test('should allow access to dashboard when authenticated', async () => {
      // Setup authenticated state
      const mockToken = createMockJWT();
      const mockUser = { id: 1, login: 'testuser' };
      
      renderWithProviders(<App />, {
        authValue: {
          user: mockUser,
          token: mockToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          login: vi.fn(),
          logout: vi.fn(),
          clearError: vi.fn()
        }
      });

      // Should show dashboard
      expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    });
  });

});
