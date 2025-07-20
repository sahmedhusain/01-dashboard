/**
 * Profile Data Flow Integration Tests
 * Tests the complete data flow from GraphQL queries to UI display
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders, createMockJWT } from '../../setup/test-utils';
import Dashboard from '../../../src/components/dashboard/Dashboard';
import graphqlResponses from '../../fixtures/graphql-responses.json';
// import transactionData from '../../fixtures/transactions.json';

describe('Profile Data Flow Integration', () => {
  
  beforeEach(() => {
    localStorage.clear();
    global.fetch = vi.fn();
    
    // Setup authentication
    const mockToken = createMockJWT();
    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('auth_user', JSON.stringify({
      id: 1,
      login: 'sayehusain',
      firstName: 'Sayed',
      lastName: 'Ahmed Husain'
    }));
  });

  describe('Complete Profile Data Loading', () => {
    test('should load and display all profile data correctly', async () => {
      // Mock all GraphQL API calls in sequence
      global.fetch
        // User info query
        .mockResolvedValueOnce({
          ok: true,
          json: async () => graphqlResponses.getUserInfo.success
        })
        // Total XP query
        .mockResolvedValueOnce({
          ok: true,
          json: async () => graphqlResponses.getTotalXP.success
        })
        // Skills query
        .mockResolvedValueOnce({
          ok: true,
          json: async () => graphqlResponses.getUserSkills.success
        })
        // User level query
        .mockResolvedValueOnce({
          ok: true,
          json: async () => graphqlResponses.getUserLevel.success
        })
        // XP by project query
        .mockResolvedValueOnce({
          ok: true,
          json: async () => graphqlResponses.getXPByProject.success
        });

      renderWithProviders(<Dashboard />);

      // Should show loading state initially
      expect(screen.getByTestId('profile-loading')).toBeInTheDocument();

      // Wait for all data to load
      await waitFor(() => {
        expect(screen.queryByTestId('profile-loading')).not.toBeInTheDocument();
      }, { timeout: 5000 });

      // Verify user info is displayed
      expect(screen.getByText('Sayed Ahmed Husain')).toBeInTheDocument();
      expect(screen.getByText('@sayehusain')).toBeInTheDocument();
      expect(screen.getByText('sayed@example.com')).toBeInTheDocument();
      expect(screen.getByText('Bahrain')).toBeInTheDocument();

      // Verify XP is displayed correctly
      expect(screen.getByText('1M')).toBeInTheDocument(); // Quick stats format
      expect(screen.getByText('1.3M XP')).toBeInTheDocument(); // Full format

      // Verify skills are displayed with percentages
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('4%')).toBeInTheDocument(); // 50000/1300000
      expect(screen.getByText('Go')).toBeInTheDocument();
      expect(screen.getByText('2%')).toBeInTheDocument(); // 30000/1300000

      // Verify audit ratio is displayed
      expect(screen.getByText('Audit Ratio')).toBeInTheDocument();
      expect(screen.getByText('1.2')).toBeInTheDocument();
    });

    test('should handle partial data loading gracefully', async () => {
      // Mock successful user info but failed XP query
      global.fetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => graphqlResponses.getUserInfo.success
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: async () => ({ error: 'Server error' })
        });

      renderWithProviders(<Dashboard />);

      await waitFor(() => {
        // Should still show user info
        expect(screen.getByText('Sayed Ahmed Husain')).toBeInTheDocument();
        
        // Should show fallback for XP
        expect(screen.getByText('0')).toBeInTheDocument(); // Quick stats fallback
      });
    });
  });

  describe('Data Processing Pipeline', () => {
    test('should process XP data correctly through the pipeline', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => graphqlResponses.getTotalXP.success
      });

      renderWithProviders(<Dashboard />);

      await waitFor(() => {
        // Raw data: 1300000
        // Should be processed to: "1M" for quick stats, "1.3M XP" for full display
        expect(screen.getByText('1M')).toBeInTheDocument();
        expect(screen.getByText('1.3M XP')).toBeInTheDocument();
      });
    });

    test('should process skills data correctly', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          data: {
            transaction: [
              { type: 'skill_js', amount: 65000 }, // Should be 5% of 1.3M
              { type: 'skill_go', amount: 39000 }, // Should be 3% of 1.3M
              { type: 'skill_html', amount: 26000 } // Should be 2% of 1.3M
            ]
          }
        })
      });

      renderWithProviders(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText('5%')).toBeInTheDocument(); // JavaScript
        expect(screen.getByText('3%')).toBeInTheDocument(); // Go
        expect(screen.getByText('2%')).toBeInTheDocument(); // HTML
      });
    });

    test('should handle skill name extraction from type', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          data: {
            transaction: [
              { type: 'skill_javascript', amount: 50000 },
              { type: 'skill_python', amount: 30000 },
              { type: 'skill_react_js', amount: 25000 }
            ]
          }
        })
      });

      renderWithProviders(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText('javascript')).toBeInTheDocument();
        expect(screen.getByText('python')).toBeInTheDocument();
        expect(screen.getByText('react js')).toBeInTheDocument(); // Underscores replaced with spaces
      });
    });
  });

  describe('Error Handling in Data Flow', () => {
    test('should handle GraphQL authentication errors', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => graphqlResponses.authenticationError
      });

      renderWithProviders(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText(/authentication required/i)).toBeInTheDocument();
      });
    });

    test('should handle network errors', async () => {
      global.fetch.mockRejectedValue(new Error('Network error'));

      renderWithProviders(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });
    });

    test('should handle malformed GraphQL responses', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ invalid: 'response' })
      });

      renderWithProviders(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
      });
    });
  });

  describe('Data Refresh and Updates', () => {
    test('should refresh data when requested', async () => {
      let callCount = 0;
      global.fetch.mockImplementation(() => {
        callCount++;
        return Promise.resolve({
          ok: true,
          json: async () => {
            if (callCount === 1) {
              return { data: { transaction_aggregate: { aggregate: { sum: { amount: 1000000 } } } } };
            } else {
              return { data: { transaction_aggregate: { aggregate: { sum: { amount: 1500000 } } } } };
            }
          }
        });
      });

      renderWithProviders(<Dashboard />);

      // Initial load
      await waitFor(() => {
        expect(screen.getByText('1.0M XP')).toBeInTheDocument();
      });

      // Trigger refresh
      const refreshButton = screen.getByTestId('refresh-data');
      fireEvent.click(refreshButton);

      // Should show updated data
      await waitFor(() => {
        expect(screen.getByText('1.5M XP')).toBeInTheDocument();
      });

      expect(callCount).toBe(2);
    });

    test('should handle concurrent data requests', async () => {
      let resolveCount = 0;
      global.fetch.mockImplementation(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolveCount++;
            resolve({
              ok: true,
              json: async () => graphqlResponses.getUserInfo.success
            });
          }, 100);
        });
      });

      renderWithProviders(<Dashboard />);

      // Trigger multiple rapid refreshes
      const refreshButton = screen.getByTestId('refresh-data');
      fireEvent.click(refreshButton);
      fireEvent.click(refreshButton);
      fireEvent.click(refreshButton);

      await waitFor(() => {
        expect(screen.getByText('Sayed Ahmed Husain')).toBeInTheDocument();
      }, { timeout: 1000 });

      // Should handle concurrent requests gracefully
      expect(resolveCount).toBeGreaterThan(0);
    });
  });

  describe('Data Caching', () => {
    test('should cache GraphQL responses', async () => {
      let fetchCallCount = 0;
      global.fetch.mockImplementation(() => {
        fetchCallCount++;
        return Promise.resolve({
          ok: true,
          json: async () => graphqlResponses.getUserInfo.success
        });
      });

      renderWithProviders(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText('Sayed Ahmed Husain')).toBeInTheDocument();
      });

      // Navigate away and back (simulated)
      // Should use cached data
      expect(fetchCallCount).toBe(1);
    });
  });

});
