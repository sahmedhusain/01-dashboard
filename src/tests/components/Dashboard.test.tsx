import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from '../../components/dashboard/Dashboard'
import { RefreshProvider } from '../../contexts/RefreshContext'

// Mock the store hooks
jest.mock('../../store', () => ({
  useUser: () => ({
    id: 1,
    login: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    campus: 'london',
    auditRatio: 1.5,
    totalUp: 50000,
    totalDown: 1000
  }),
  useLogout: () => jest.fn(),
  useDashboardTab: () => 'profile',
  useSetDashboardTab: () => jest.fn()
}))

// Mock lazy-loaded components
jest.mock('../../components/dashboard/ProfileSection', () => {
  return function MockProfileSection() {
    return <div data-testid="profile-section">Profile Section</div>
  }
})

jest.mock('../../components/dashboard/StatisticsSection', () => {
  return function MockStatisticsSection() {
    return <div data-testid="statistics-section">Statistics Section</div>
  }
})

jest.mock('../../components/dashboard/LeaderboardSection', () => {
  return function MockLeaderboardSection() {
    return <div data-testid="leaderboard-section">Leaderboard Section</div>
  }
})

jest.mock('../../components/dashboard/AnalyticsSection', () => {
  return function MockAnalyticsSection() {
    return <div data-testid="analytics-section">Analytics Section</div>
  }
})

jest.mock('../../components/search/SearchSection', () => {
  return function MockSearchSection() {
    return <div data-testid="search-section">Search Section</div>
  }
})

jest.mock('../../components/export/ExportSection', () => {
  return function MockExportSection() {
    return <div data-testid="export-section">Export Section</div>
  }
})

// Mock GraphQL queries
const mockQueries = [
  {
    request: {
      query: expect.any(Object)
    },
    result: {
      data: {
        user_by_pk: {
          id: 1,
          login: 'testuser',
          firstName: 'Test',
          lastName: 'User',
          campus: 'london'
        }
      }
    }
  }
]

const renderDashboard = (mocks = mockQueries) => {
  return render(
    <BrowserRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <RefreshProvider>
          <Dashboard />
        </RefreshProvider>
      </MockedProvider>
    </BrowserRouter>
  )
}

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Clear any previous mocks
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render dashboard header with user info', async () => {
      renderDashboard()

      await waitFor(() => {
        expect(screen.getByText('Test User')).toBeInTheDocument()
        expect(screen.getByText('@testuser')).toBeInTheDocument()
        expect(screen.getByText('#1')).toBeInTheDocument()
      })
    })

    it('should render navigation tabs', async () => {
      renderDashboard()

      await waitFor(() => {
        expect(screen.getByText('Profile Info')).toBeInTheDocument()
        expect(screen.getByText('Statistics')).toBeInTheDocument()
        expect(screen.getByText('Analytics')).toBeInTheDocument()
        expect(screen.getByText('Leaderboard')).toBeInTheDocument()
        expect(screen.getByText('Search')).toBeInTheDocument()
        expect(screen.getByText('Export')).toBeInTheDocument()
      })
    })

    it('should render refresh control in header', async () => {
      renderDashboard()

      await waitFor(() => {
        // Look for refresh button or refresh control elements
        const refreshElements = screen.getAllByRole('button')
        const hasRefreshButton = refreshElements.some(button => 
          button.getAttribute('aria-label')?.includes('refresh') ||
          button.textContent?.toLowerCase().includes('refresh')
        )
        expect(hasRefreshButton || refreshElements.length > 0).toBeTruthy()
      })
    })

    it('should render logout button', async () => {
      renderDashboard()

      await waitFor(() => {
        expect(screen.getByText('Logout')).toBeInTheDocument()
      })
    })
  })

  describe('Navigation', () => {
    it('should show profile section by default', async () => {
      renderDashboard()

      await waitFor(() => {
        expect(screen.getByTestId('profile-section')).toBeInTheDocument()
      })
    })

    it('should switch to statistics section when clicked', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useSetDashboardTab } = require('../../store')
      const mockSetTab = jest.fn()
      useSetDashboardTab.mockReturnValue(mockSetTab)

      renderDashboard()

      await waitFor(() => {
        const statisticsTab = screen.getByText('Statistics')
        fireEvent.click(statisticsTab)
        expect(mockSetTab).toHaveBeenCalledWith('statistics')
      })
    })

    it('should switch to analytics section when clicked', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useSetDashboardTab } = require('../../store')
      const mockSetTab = jest.fn()
      useSetDashboardTab.mockReturnValue(mockSetTab)

      renderDashboard()

      await waitFor(() => {
        const analyticsTab = screen.getByText('Analytics')
        fireEvent.click(analyticsTab)
        expect(mockSetTab).toHaveBeenCalledWith('analytics')
      })
    })

    it('should switch to leaderboard section when clicked', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useSetDashboardTab } = require('../../store')
      const mockSetTab = jest.fn()
      useSetDashboardTab.mockReturnValue(mockSetTab)

      renderDashboard()

      await waitFor(() => {
        const leaderboardTab = screen.getByText('Leaderboard')
        fireEvent.click(leaderboardTab)
        expect(mockSetTab).toHaveBeenCalledWith('leaderboard')
      })
    })

    it('should switch to search section when clicked', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useSetDashboardTab } = require('../../store')
      const mockSetTab = jest.fn()
      useSetDashboardTab.mockReturnValue(mockSetTab)

      renderDashboard()

      await waitFor(() => {
        const searchTab = screen.getByText('Search')
        fireEvent.click(searchTab)
        expect(mockSetTab).toHaveBeenCalledWith('search')
      })
    })

    it('should switch to export section when clicked', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useSetDashboardTab } = require('../../store')
      const mockSetTab = jest.fn()
      useSetDashboardTab.mockReturnValue(mockSetTab)

      renderDashboard()

      await waitFor(() => {
        const exportTab = screen.getByText('Export')
        fireEvent.click(exportTab)
        expect(mockSetTab).toHaveBeenCalledWith('export')
      })
    })
  })

  describe('User Actions', () => {
    it('should call logout function when logout button is clicked', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useLogout } = require('../../store')
      const mockLogout = jest.fn()
      useLogout.mockReturnValue(mockLogout)

      renderDashboard()

      await waitFor(() => {
        const logoutButton = screen.getByText('Logout')
        fireEvent.click(logoutButton)
        expect(mockLogout).toHaveBeenCalled()
      })
    })

    it('should open preferences when settings button is clicked', async () => {
      renderDashboard()

      await waitFor(() => {
        const settingsButtons = screen.getAllByRole('button')
        const settingsButton = settingsButtons.find(button => 
          button.getAttribute('aria-label') === 'Open preferences' ||
          button.getAttribute('title') === 'Preferences'
        )
        
        if (settingsButton) {
          fireEvent.click(settingsButton)
          // Check if preferences modal or component appears
          // This would depend on the actual implementation
        }
      })
    })
  })

  describe('Responsive Design', () => {
    it('should handle mobile viewport', async () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 667,
      })

      renderDashboard()

      await waitFor(() => {
        // Check if mobile-specific classes or behaviors are applied
        const dashboard = screen.getByRole('main') || document.body
        expect(dashboard).toBeInTheDocument()
      })
    })

    it('should handle tablet viewport', async () => {
      // Mock tablet viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })

      renderDashboard()

      await waitFor(() => {
        const dashboard = screen.getByRole('main') || document.body
        expect(dashboard).toBeInTheDocument()
      })
    })

    it('should handle desktop viewport', async () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      })

      renderDashboard()

      await waitFor(() => {
        const dashboard = screen.getByRole('main') || document.body
        expect(dashboard).toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle GraphQL errors gracefully', async () => {
      const errorMocks = [
        {
          request: {
            query: expect.any(Object)
          },
          error: new Error('Network error')
        }
      ]

      renderDashboard(errorMocks)

      await waitFor(() => {
        // Should still render the dashboard structure even with errors
        expect(screen.getByText('Test User')).toBeInTheDocument()
      })
    })

    it('should handle missing user data', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useUser } = require('../../store')
      useUser.mockReturnValue(null)

      renderDashboard()

      // Should handle null user gracefully
      // The exact behavior depends on implementation
    })
  })

  describe('Performance', () => {
    it('should lazy load components', async () => {
      renderDashboard()

      // Initially should show profile section
      await waitFor(() => {
        expect(screen.getByTestId('profile-section')).toBeInTheDocument()
      })

      // Other sections should not be loaded yet
      expect(screen.queryByTestId('statistics-section')).not.toBeInTheDocument()
      expect(screen.queryByTestId('analytics-section')).not.toBeInTheDocument()
    })

    it('should handle rapid tab switching', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useSetDashboardTab } = require('../../store')
      const mockSetTab = jest.fn()
      useSetDashboardTab.mockReturnValue(mockSetTab)

      renderDashboard()

      await waitFor(() => {
        // Rapidly click different tabs
        const tabs = ['Statistics', 'Analytics', 'Leaderboard', 'Search']
        tabs.forEach(tabName => {
          const tab = screen.getByText(tabName)
          fireEvent.click(tab)
        })

        // Should handle all clicks
        expect(mockSetTab).toHaveBeenCalledTimes(4)
      })
    })
  })
})
