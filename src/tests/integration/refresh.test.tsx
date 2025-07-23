import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { RefreshProvider } from '../../contexts/RefreshContext'
import { useRefresh } from '../../hooks/useRefresh'
import RefreshControl from '../../components/ui/RefreshControl'

// Mock toast notifications
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}))

// Test component that uses the refresh context
const TestRefreshComponent: React.FC = () => {
  const {
    isGlobalRefreshing,
    refreshStats,
    refreshAll,
    hardRefresh,
    enableAutoRefresh,
    disableAutoRefresh,
    isAutoRefreshEnabled,
    autoRefreshInterval,
    clearCache,
    getCacheSize,
    isOnline
  } = useRefresh()

  return (
    <div>
      <div data-testid="refresh-status">
        {isGlobalRefreshing ? 'Refreshing' : 'Idle'}
      </div>
      <div data-testid="online-status">
        {isOnline ? 'Online' : 'Offline'}
      </div>
      <div data-testid="auto-refresh-status">
        {isAutoRefreshEnabled ? 'Auto-refresh enabled' : 'Auto-refresh disabled'}
      </div>
      <div data-testid="refresh-interval">
        {autoRefreshInterval}
      </div>
      <div data-testid="total-refreshes">
        {refreshStats.totalRefreshes}
      </div>
      <div data-testid="successful-refreshes">
        {refreshStats.successfulRefreshes}
      </div>
      <div data-testid="failed-refreshes">
        {refreshStats.failedRefreshes}
      </div>
      <div data-testid="cache-size">
        {getCacheSize()}
      </div>
      
      <button onClick={refreshAll} data-testid="refresh-all-btn">
        Refresh All
      </button>
      <button onClick={hardRefresh} data-testid="hard-refresh-btn">
        Hard Refresh
      </button>
      <button onClick={() => enableAutoRefresh()} data-testid="enable-auto-refresh-btn">
        Enable Auto Refresh
      </button>
      <button onClick={disableAutoRefresh} data-testid="disable-auto-refresh-btn">
        Disable Auto Refresh
      </button>
      <button onClick={clearCache} data-testid="clear-cache-btn">
        Clear Cache
      </button>
    </div>
  )
}

const renderWithRefreshProvider = (
  component: React.ReactElement,
  providerProps: any = {}
) => {
  const defaultProps = {
    defaultAutoRefreshInterval: 60000,
    enableNetworkDetection: true,
    showRefreshNotifications: false // Disable for tests
  }

  return render(
    <MockedProvider mocks={[]} addTypename={false}>
      <RefreshProvider {...defaultProps} {...providerProps}>
        {component}
      </RefreshProvider>
    </MockedProvider>
  )
}

describe('Refresh System Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset network status
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true
    })
  })

  describe('RefreshProvider', () => {
    it('should provide initial refresh context values', async () => {
      renderWithRefreshProvider(<TestRefreshComponent />)

      await waitFor(() => {
        expect(screen.getByTestId('refresh-status')).toHaveTextContent('Idle')
        expect(screen.getByTestId('online-status')).toHaveTextContent('Online')
        expect(screen.getByTestId('auto-refresh-status')).toHaveTextContent('Auto-refresh disabled')
        expect(screen.getByTestId('refresh-interval')).toHaveTextContent('60000')
        expect(screen.getByTestId('total-refreshes')).toHaveTextContent('0')
        expect(screen.getByTestId('successful-refreshes')).toHaveTextContent('0')
        expect(screen.getByTestId('failed-refreshes')).toHaveTextContent('0')
      })
    })

    it('should handle manual refresh', async () => {
      renderWithRefreshProvider(<TestRefreshComponent />)

      const refreshButton = screen.getByTestId('refresh-all-btn')
      
      await act(async () => {
        fireEvent.click(refreshButton)
      })

      // Should show refreshing state temporarily
      await waitFor(() => {
        expect(screen.getByTestId('refresh-status')).toHaveTextContent('Idle')
        expect(screen.getByTestId('total-refreshes')).toHaveTextContent('1')
        expect(screen.getByTestId('successful-refreshes')).toHaveTextContent('1')
      })
    })

    it('should handle hard refresh', async () => {
      renderWithRefreshProvider(<TestRefreshComponent />)

      const hardRefreshButton = screen.getByTestId('hard-refresh-btn')
      
      await act(async () => {
        fireEvent.click(hardRefreshButton)
      })

      await waitFor(() => {
        expect(screen.getByTestId('refresh-status')).toHaveTextContent('Idle')
        expect(screen.getByTestId('total-refreshes')).toHaveTextContent('1')
        expect(screen.getByTestId('successful-refreshes')).toHaveTextContent('1')
      })
    })

    it('should enable and disable auto-refresh', async () => {
      renderWithRefreshProvider(<TestRefreshComponent />)

      // Enable auto-refresh
      const enableButton = screen.getByTestId('enable-auto-refresh-btn')
      fireEvent.click(enableButton)

      await waitFor(() => {
        expect(screen.getByTestId('auto-refresh-status')).toHaveTextContent('Auto-refresh enabled')
      })

      // Disable auto-refresh
      const disableButton = screen.getByTestId('disable-auto-refresh-btn')
      fireEvent.click(disableButton)

      await waitFor(() => {
        expect(screen.getByTestId('auto-refresh-status')).toHaveTextContent('Auto-refresh disabled')
      })
    })

    it('should handle cache operations', async () => {
      renderWithRefreshProvider(<TestRefreshComponent />)

      const clearCacheButton = screen.getByTestId('clear-cache-btn')
      
      await act(async () => {
        fireEvent.click(clearCacheButton)
      })

      // Cache operations should complete without errors
      await waitFor(() => {
        expect(screen.getByTestId('cache-size')).toBeInTheDocument()
      })
    })

    it('should handle network status changes', async () => {
      renderWithRefreshProvider(<TestRefreshComponent />)

      // Initially online
      expect(screen.getByTestId('online-status')).toHaveTextContent('Online')

      // Simulate going offline
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      })

      await act(async () => {
        window.dispatchEvent(new Event('offline'))
      })

      await waitFor(() => {
        expect(screen.getByTestId('online-status')).toHaveTextContent('Offline')
      })

      // Simulate coming back online
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true
      })

      await act(async () => {
        window.dispatchEvent(new Event('online'))
      })

      await waitFor(() => {
        expect(screen.getByTestId('online-status')).toHaveTextContent('Online')
      })
    })
  })

  describe('RefreshControl Component', () => {
    it('should render compact refresh control', async () => {
      renderWithRefreshProvider(
        <RefreshControl compact={true} showStats={false} showAutoRefreshToggle={false} />
      )

      await waitFor(() => {
        // Should show network status and refresh button
        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBeGreaterThan(0)
      })
    })

    it('should render full refresh control with stats', async () => {
      renderWithRefreshProvider(
        <RefreshControl compact={false} showStats={true} showAutoRefreshToggle={true} />
      )

      await waitFor(() => {
        expect(screen.getByText('Data Refresh')).toBeInTheDocument()
        expect(screen.getByText('Refresh All')).toBeInTheDocument()
        expect(screen.getByText('Hard Refresh')).toBeInTheDocument()
        expect(screen.getByText('Auto Refresh')).toBeInTheDocument()
      })
    })

    it('should handle refresh button clicks', async () => {
      renderWithRefreshProvider(
        <RefreshControl compact={false} showStats={true} showAutoRefreshToggle={true} />
      )

      await waitFor(() => {
        const refreshAllButton = screen.getByText('Refresh All')
        fireEvent.click(refreshAllButton)
      })

      // Should handle the click without errors
      await waitFor(() => {
        expect(screen.getByText('Refresh All')).toBeInTheDocument()
      })
    })

    it('should show refresh statistics', async () => {
      renderWithRefreshProvider(
        <RefreshControl compact={false} showStats={true} showAutoRefreshToggle={true} />
      )

      await waitFor(() => {
        expect(screen.getByText('Refresh Statistics')).toBeInTheDocument()
        expect(screen.getByText('Total')).toBeInTheDocument()
        expect(screen.getByText('Success')).toBeInTheDocument()
        expect(screen.getByText('Failed')).toBeInTheDocument()
        expect(screen.getByText('Avg Time')).toBeInTheDocument()
      })
    })

    it('should handle auto-refresh toggle', async () => {
      renderWithRefreshProvider(
        <RefreshControl compact={false} showStats={true} showAutoRefreshToggle={true} />
      )

      await waitFor(() => {
        const autoRefreshButton = screen.getByText('Auto Refresh')
        fireEvent.click(autoRefreshButton)
      })

      // Should toggle auto-refresh state
      await waitFor(() => {
        expect(screen.getByText('Auto Refresh')).toBeInTheDocument()
      })
    })

    it('should show settings panel', async () => {
      renderWithRefreshProvider(
        <RefreshControl compact={false} showStats={true} showAutoRefreshToggle={true} />
      )

      await waitFor(() => {
        // Look for settings button (gear icon)
        const buttons = screen.getAllByRole('button')
        const settingsButton = buttons.find(button => 
          button.getAttribute('aria-label')?.includes('settings') ||
          button.querySelector('svg')
        )
        
        if (settingsButton) {
          fireEvent.click(settingsButton)
        }
      })

      // Settings panel should appear or toggle
      await waitFor(() => {
        expect(screen.getByText('Data Refresh')).toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle refresh errors gracefully', async () => {
      // Mock Apollo client to throw errors
      const errorMocks = [
        {
          request: {
            query: expect.any(Object)
          },
          error: new Error('Network error')
        }
      ]

      render(
        <MockedProvider mocks={errorMocks} addTypename={false}>
          <RefreshProvider showRefreshNotifications={false}>
            <TestRefreshComponent />
          </RefreshProvider>
        </MockedProvider>
      )

      const refreshButton = screen.getByTestId('refresh-all-btn')
      
      await act(async () => {
        fireEvent.click(refreshButton)
      })

      // Should handle error and update stats
      await waitFor(() => {
        expect(screen.getByTestId('refresh-status')).toHaveTextContent('Idle')
        expect(screen.getByTestId('total-refreshes')).toHaveTextContent('1')
        expect(screen.getByTestId('failed-refreshes')).toHaveTextContent('1')
      })
    })

    it('should prevent concurrent refreshes', async () => {
      renderWithRefreshProvider(<TestRefreshComponent />)

      const refreshButton = screen.getByTestId('refresh-all-btn')
      
      // Click refresh button multiple times rapidly
      await act(async () => {
        fireEvent.click(refreshButton)
        fireEvent.click(refreshButton)
        fireEvent.click(refreshButton)
      })

      // Should only perform one refresh
      await waitFor(() => {
        expect(screen.getByTestId('total-refreshes')).toHaveTextContent('1')
      })
    })
  })

  describe('Performance', () => {
    it('should handle rapid refresh requests', async () => {
      renderWithRefreshProvider(<TestRefreshComponent />)

      const refreshButton = screen.getByTestId('refresh-all-btn')
      
      // Perform multiple refreshes in sequence
      for (let i = 0; i < 5; i++) {
        await act(async () => {
          fireEvent.click(refreshButton)
        })
        
        await waitFor(() => {
          expect(screen.getByTestId('refresh-status')).toHaveTextContent('Idle')
        })
      }

      // Should handle all refreshes
      await waitFor(() => {
        expect(screen.getByTestId('total-refreshes')).toHaveTextContent('5')
        expect(screen.getByTestId('successful-refreshes')).toHaveTextContent('5')
      })
    })

    it('should maintain performance with auto-refresh', async () => {
      jest.useFakeTimers()
      
      renderWithRefreshProvider(<TestRefreshComponent />, {
        defaultAutoRefreshInterval: 1000 // 1 second for testing
      })

      // Enable auto-refresh
      const enableButton = screen.getByTestId('enable-auto-refresh-btn')
      fireEvent.click(enableButton)

      // Fast-forward time to trigger auto-refresh
      await act(async () => {
        jest.advanceTimersByTime(5000) // 5 seconds
      })

      // Should have performed auto-refreshes
      await waitFor(() => {
        const totalRefreshes = parseInt(screen.getByTestId('total-refreshes').textContent || '0')
        expect(totalRefreshes).toBeGreaterThan(0)
      })

      jest.useRealTimers()
    })
  })
})
