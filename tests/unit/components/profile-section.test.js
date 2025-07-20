/**
 * Profile Section Component Tests
 * Tests for ProfileSection React component
 */

import { describe, test, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileSection from '../../../src/components/dashboard/ProfileSection';
import { renderWithProviders, mockDataContext } from '../../setup/test-utils';

describe('ProfileSection Component', () => {

  describe('Rendering', () => {
    test('should render user profile information', () => {
      renderWithProviders(<ProfileSection />);
      
      expect(screen.getByText('Sayed Ahmed Husain')).toBeInTheDocument();
      expect(screen.getByText('@sayehusain')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('Bahrain')).toBeInTheDocument();
    });

    test('should display XP information', () => {
      renderWithProviders(<ProfileSection />);
      
      expect(screen.getByText(/150k XP/)).toBeInTheDocument();
      expect(screen.getByText(/Level 15/)).toBeInTheDocument();
    });

    test('should display account creation date', () => {
      renderWithProviders(<ProfileSection />);
      
      expect(screen.getByText(/Account Created At/)).toBeInTheDocument();
      expect(screen.getByText(/May 7, 2023/)).toBeInTheDocument();
    });

    test('should display last activity date', () => {
      renderWithProviders(<ProfileSection />);
      
      expect(screen.getByText(/Started/)).toBeInTheDocument();
      expect(screen.getByText(/Apr 29, 2024/)).toBeInTheDocument();
    });
  });

  describe('Avatar Component', () => {
    test('should render avatar with fallback', () => {
      renderWithProviders(<ProfileSection />);
      
      const avatar = screen.getByTestId('user-avatar');
      expect(avatar).toBeInTheDocument();
    });

    test('should handle avatar with custom URL', () => {
      const customDataContext = {
        ...mockDataContext,
        user: {
          ...mockDataContext.user,
          profile: { avatar: 'https://example.com/custom-avatar.jpg' }
        }
      };

      renderWithProviders(<ProfileSection />, { dataValue: customDataContext });
      
      const avatar = screen.getByTestId('user-avatar');
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('Loading States', () => {
    test('should show loading state', () => {
      const loadingDataContext = {
        ...mockDataContext,
        loading: true
      };

      renderWithProviders(<ProfileSection />, { dataValue: loadingDataContext });
      
      expect(screen.getByTestId('profile-loading')).toBeInTheDocument();
    });

    test('should hide content during loading', () => {
      const loadingDataContext = {
        ...mockDataContext,
        loading: true
      };

      renderWithProviders(<ProfileSection />, { dataValue: loadingDataContext });
      
      expect(screen.queryByText('Sayed Ahmed Husain')).not.toBeInTheDocument();
    });
  });

  describe('Error States', () => {
    test('should display error message', () => {
      const errorDataContext = {
        ...mockDataContext,
        error: new Error('Failed to load profile data')
      };

      renderWithProviders(<ProfileSection />, { dataValue: errorDataContext });
      
      expect(screen.getByText(/Failed to load profile data/)).toBeInTheDocument();
    });

    test('should show retry button on error', () => {
      const errorDataContext = {
        ...mockDataContext,
        error: new Error('Network error'),
        refetch: vi.fn()
      };

      renderWithProviders(<ProfileSection />, { dataValue: errorDataContext });
      
      const retryButton = screen.getByText(/Retry/);
      expect(retryButton).toBeInTheDocument();
      
      fireEvent.click(retryButton);
      expect(errorDataContext.refetch).toHaveBeenCalled();
    });
  });

  describe('Data Display', () => {
    test('should format XP correctly', () => {
      const customDataContext = {
        ...mockDataContext,
        totalXP: 1300000
      };

      renderWithProviders(<ProfileSection />, { dataValue: customDataContext });
      
      expect(screen.getByText(/1.3M XP/)).toBeInTheDocument();
    });

    test('should handle missing user data gracefully', () => {
      const emptyDataContext = {
        ...mockDataContext,
        user: null
      };

      renderWithProviders(<ProfileSection />, { dataValue: emptyDataContext });
      
      expect(screen.getByText(/Unknown User/)).toBeInTheDocument();
    });

    test('should display email from attrs', () => {
      const customDataContext = {
        ...mockDataContext,
        user: {
          ...mockDataContext.user,
          attrs: { email: 'custom@example.com' }
        }
      };

      renderWithProviders(<ProfileSection />, { dataValue: customDataContext });
      
      expect(screen.getByText('custom@example.com')).toBeInTheDocument();
    });

    test('should fallback to login when no email', () => {
      const customDataContext = {
        ...mockDataContext,
        user: {
          ...mockDataContext.user,
          email: null,
          attrs: {}
        }
      };

      renderWithProviders(<ProfileSection />, { dataValue: customDataContext });
      
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    test('should handle profile refresh', async () => {
      const refreshMock = vi.fn();
      const customDataContext = {
        ...mockDataContext,
        refresh: refreshMock
      };

      renderWithProviders(<ProfileSection />, { dataValue: customDataContext });
      
      const refreshButton = screen.getByTestId('refresh-profile');
      fireEvent.click(refreshButton);
      
      await waitFor(() => {
        expect(refreshMock).toHaveBeenCalled();
      });
    });

    test('should handle avatar click', () => {
      renderWithProviders(<ProfileSection />);
      
      const avatar = screen.getByTestId('user-avatar');
      fireEvent.click(avatar);
      
      // Should not throw error
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    test('should adapt to mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      renderWithProviders(<ProfileSection />);
      
      const profileSection = screen.getByTestId('profile-section');
      expect(profileSection).toHaveClass('mobile-responsive');
    });

    test('should adapt to desktop viewport', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });

      renderWithProviders(<ProfileSection />);
      
      const profileSection = screen.getByTestId('profile-section');
      expect(profileSection).toHaveClass('desktop-layout');
    });
  });

  describe('Accessibility', () => {
    test('should have proper ARIA labels', () => {
      renderWithProviders(<ProfileSection />);
      
      expect(screen.getByLabelText(/User profile information/)).toBeInTheDocument();
      expect(screen.getByLabelText(/User avatar/)).toBeInTheDocument();
    });

    test('should support keyboard navigation', () => {
      renderWithProviders(<ProfileSection />);
      
      const refreshButton = screen.getByTestId('refresh-profile');
      refreshButton.focus();
      
      expect(document.activeElement).toBe(refreshButton);
    });

    test('should have proper heading hierarchy', () => {
      renderWithProviders(<ProfileSection />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Sayed Ahmed Husain');
    });
  });

});
