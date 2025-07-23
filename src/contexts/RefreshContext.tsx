import React, { createContext, useState, useCallback, useRef, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import { toast } from 'react-hot-toast'

interface RefreshStats {
  totalRefreshes: number
  lastRefreshTime: Date | null
  averageRefreshTime: number
  failedRefreshes: number
  successfulRefreshes: number
}

interface RefreshContextType {
  // Global refresh state
  isGlobalRefreshing: boolean
  refreshStats: RefreshStats
  
  // Refresh functions
  refreshAll: () => Promise<void>
  refreshSpecific: (queries: string[]) => Promise<void>
  hardRefresh: () => Promise<void>
  
  // Auto-refresh controls
  enableAutoRefresh: (interval?: number) => void
  disableAutoRefresh: () => void
  isAutoRefreshEnabled: boolean
  autoRefreshInterval: number
  
  // Component registration for targeted refreshes
  registerComponent: (componentId: string, queries: string[]) => void
  unregisterComponent: (componentId: string) => void
  refreshComponent: (componentId: string) => Promise<void>
  
  // Cache management
  clearCache: () => Promise<void>
  getCacheSize: () => number
  
  // Network status
  isOnline: boolean
  lastOnlineTime: Date | null
}

export const RefreshContext = createContext<RefreshContextType | undefined>(undefined)

interface RefreshProviderProps {
  children: React.ReactNode
  defaultAutoRefreshInterval?: number
  enableNetworkDetection?: boolean
  showRefreshNotifications?: boolean
}

export const RefreshProvider: React.FC<RefreshProviderProps> = ({
  children,
  defaultAutoRefreshInterval = 60000, // 1 minute
  enableNetworkDetection = true,
  showRefreshNotifications = true
}) => {
  const client = useApolloClient()
  const autoRefreshIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const componentRegistryRef = useRef<Map<string, string[]>>(new Map())
  const refreshTimesRef = useRef<number[]>([])

  // State
  const [isGlobalRefreshing, setIsGlobalRefreshing] = useState(false)
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(false)
  const [autoRefreshInterval, setAutoRefreshInterval] = useState(defaultAutoRefreshInterval)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(null)
  const [refreshStats, setRefreshStats] = useState<RefreshStats>({
    totalRefreshes: 0,
    lastRefreshTime: null,
    averageRefreshTime: 0,
    failedRefreshes: 0,
    successfulRefreshes: 0
  })

  // Helper function to update refresh stats
  const updateRefreshStats = useCallback((success: boolean, duration: number) => {
    setRefreshStats(prev => {
      const newTotalRefreshes = prev.totalRefreshes + 1
      const newSuccessfulRefreshes = success ? prev.successfulRefreshes + 1 : prev.successfulRefreshes
      const newFailedRefreshes = success ? prev.failedRefreshes : prev.failedRefreshes + 1
      
      // Update refresh times for average calculation
      refreshTimesRef.current.push(duration)
      if (refreshTimesRef.current.length > 10) {
        refreshTimesRef.current.shift() // Keep only last 10 refresh times
      }
      
      const averageRefreshTime = refreshTimesRef.current.reduce((a, b) => a + b, 0) / refreshTimesRef.current.length

      return {
        totalRefreshes: newTotalRefreshes,
        lastRefreshTime: new Date(),
        averageRefreshTime,
        failedRefreshes: newFailedRefreshes,
        successfulRefreshes: newSuccessfulRefreshes
      }
    })
  }, [])

  // Refresh all active queries
  const refreshAll = useCallback(async () => {
    if (isGlobalRefreshing) return

    setIsGlobalRefreshing(true)
    const startTime = Date.now()

    try {
      await client.refetchQueries({
        include: 'active',
        updateCache: (cache) => {
          // Force cache update
          cache.evict({ fieldName: 'user' })
          cache.evict({ fieldName: 'transaction' })
          cache.evict({ fieldName: 'progress' })
          cache.evict({ fieldName: 'audit' })
          cache.gc()
        }
      })

      const duration = Date.now() - startTime
      updateRefreshStats(true, duration)

      if (showRefreshNotifications) {
        toast.success('Data refreshed successfully', {
          duration: 2000,
          position: 'bottom-right'
        })
      }
    } catch (error) {
      const duration = Date.now() - startTime
      updateRefreshStats(false, duration)

      console.error('Global refresh failed:', error)
      
      if (showRefreshNotifications) {
        toast.error('Failed to refresh data', {
          duration: 3000,
          position: 'bottom-right'
        })
      }
    } finally {
      setIsGlobalRefreshing(false)
    }
  }, [client, isGlobalRefreshing, updateRefreshStats, showRefreshNotifications])

  // Refresh specific queries
  const refreshSpecific = useCallback(async (queries: string[]) => {
    if (queries.length === 0) return

    const startTime = Date.now()

    try {
      await Promise.all(
        queries.map(query => 
          client.refetchQueries({
            include: [query],
            updateCache: (cache) => {
              cache.evict({ fieldName: 'user' })
              cache.evict({ fieldName: 'transaction' })
              cache.evict({ fieldName: 'progress' })
              cache.evict({ fieldName: 'audit' })
              cache.gc()
            }
          })
        )
      )

      const duration = Date.now() - startTime
      updateRefreshStats(true, duration)

      if (showRefreshNotifications) {
        toast.success(`Refreshed ${queries.length} queries`, {
          duration: 2000,
          position: 'bottom-right'
        })
      }
    } catch (error) {
      const duration = Date.now() - startTime
      updateRefreshStats(false, duration)

      console.error('Specific refresh failed:', error)
      
      if (showRefreshNotifications) {
        toast.error('Failed to refresh specific data', {
          duration: 3000,
          position: 'bottom-right'
        })
      }
    }
  }, [client, updateRefreshStats, showRefreshNotifications])

  // Hard refresh (clear cache and refetch)
  const hardRefresh = useCallback(async () => {
    if (isGlobalRefreshing) return

    setIsGlobalRefreshing(true)
    const startTime = Date.now()

    try {
      // Clear the cache
      await client.clearStore()
      
      // Refetch all active queries
      await client.refetchQueries({
        include: 'active',
        updateCache: (cache) => {
          cache.evict({ fieldName: 'user' })
          cache.evict({ fieldName: 'transaction' })
          cache.evict({ fieldName: 'progress' })
          cache.evict({ fieldName: 'audit' })
          cache.gc()
        }
      })

      const duration = Date.now() - startTime
      updateRefreshStats(true, duration)

      if (showRefreshNotifications) {
        toast.success('Cache cleared and data refreshed', {
          duration: 3000,
          position: 'bottom-right'
        })
      }
    } catch (error) {
      const duration = Date.now() - startTime
      updateRefreshStats(false, duration)

      console.error('Hard refresh failed:', error)
      
      if (showRefreshNotifications) {
        toast.error('Failed to perform hard refresh', {
          duration: 3000,
          position: 'bottom-right'
        })
      }
    } finally {
      setIsGlobalRefreshing(false)
    }
  }, [client, isGlobalRefreshing, updateRefreshStats, showRefreshNotifications])

  // Enable auto-refresh
  const enableAutoRefresh = useCallback((interval?: number) => {
    const refreshInterval = interval || autoRefreshInterval

    // Clear existing interval
    if (autoRefreshIntervalRef.current) {
      clearInterval(autoRefreshIntervalRef.current)
    }

    // Set new interval
    autoRefreshIntervalRef.current = setInterval(() => {
      if (isOnline && !isGlobalRefreshing) {
        refreshAll()
      }
    }, refreshInterval)

    setIsAutoRefreshEnabled(true)
    setAutoRefreshInterval(refreshInterval)

    if (showRefreshNotifications) {
      toast.success(`Auto-refresh enabled (${Math.round(refreshInterval / 1000)}s interval)`, {
        duration: 2000,
        position: 'bottom-right'
      })
    }
  }, [autoRefreshInterval, isOnline, isGlobalRefreshing, refreshAll, showRefreshNotifications])

  // Disable auto-refresh
  const disableAutoRefresh = useCallback(() => {
    if (autoRefreshIntervalRef.current) {
      clearInterval(autoRefreshIntervalRef.current)
      autoRefreshIntervalRef.current = null
    }

    setIsAutoRefreshEnabled(false)

    if (showRefreshNotifications) {
      toast.success('Auto-refresh disabled', {
        duration: 2000,
        position: 'bottom-right'
      })
    }
  }, [showRefreshNotifications])

  // Register component for targeted refreshes
  const registerComponent = useCallback((componentId: string, queries: string[]) => {
    componentRegistryRef.current.set(componentId, queries)
  }, [])

  // Unregister component
  const unregisterComponent = useCallback((componentId: string) => {
    componentRegistryRef.current.delete(componentId)
  }, [])

  // Refresh specific component
  const refreshComponent = useCallback(async (componentId: string) => {
    const queries = componentRegistryRef.current.get(componentId)
    if (queries) {
      await refreshSpecific(queries)
    }
  }, [refreshSpecific])

  // Clear cache
  const clearCache = useCallback(async () => {
    try {
      await client.clearStore()
      
      if (showRefreshNotifications) {
        toast.success('Cache cleared successfully', {
          duration: 2000,
          position: 'bottom-right'
        })
      }
    } catch (error) {
      console.error('Failed to clear cache:', error)
      
      if (showRefreshNotifications) {
        toast.error('Failed to clear cache', {
          duration: 3000,
          position: 'bottom-right'
        })
      }
    }
  }, [client, showRefreshNotifications])

  // Get cache size (approximate)
  const getCacheSize = useCallback(() => {
    try {
      const cache = client.cache.extract()
      return Object.keys(cache).length
    } catch {
      return 0
    }
  }, [client])

  // Network status detection
  useEffect(() => {
    if (!enableNetworkDetection) return

    const handleOnline = () => {
      setIsOnline(true)
      setLastOnlineTime(new Date())
      
      if (showRefreshNotifications) {
        toast.success('Connection restored - refreshing data', {
          duration: 2000,
          position: 'bottom-right'
        })
      }
      
      // Refresh data when coming back online
      refreshAll()
    }

    const handleOffline = () => {
      setIsOnline(false)
      
      if (showRefreshNotifications) {
        toast.error('Connection lost - working offline', {
          duration: 3000,
          position: 'bottom-right'
        })
      }
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [enableNetworkDetection, showRefreshNotifications, refreshAll])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoRefreshIntervalRef.current) {
        clearInterval(autoRefreshIntervalRef.current)
      }
    }
  }, [])

  const contextValue: RefreshContextType = {
    isGlobalRefreshing,
    refreshStats,
    refreshAll,
    refreshSpecific,
    hardRefresh,
    enableAutoRefresh,
    disableAutoRefresh,
    isAutoRefreshEnabled,
    autoRefreshInterval,
    registerComponent,
    unregisterComponent,
    refreshComponent,
    clearCache,
    getCacheSize,
    isOnline,
    lastOnlineTime
  }

  return (
    <RefreshContext.Provider value={contextValue}>
      {children}
    </RefreshContext.Provider>
  )
}


