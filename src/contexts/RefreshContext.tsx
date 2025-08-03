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
  isGlobalRefreshing: boolean
  refreshStats: RefreshStats
  
  refreshAll: () => Promise<void>
  refreshSpecific: (queries: string[]) => Promise<void>
  hardRefresh: () => Promise<void>
  
  enableAutoRefresh: (interval?: number) => void
  disableAutoRefresh: () => void
  isAutoRefreshEnabled: boolean
  autoRefreshInterval: number
  
  registerComponent: (componentId: string, queries: string[]) => void
  unregisterComponent: (componentId: string) => void
  refreshComponent: (componentId: string) => Promise<void>
  
  clearCache: () => Promise<void>
  getCacheSize: () => number
  
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

  const updateRefreshStats = useCallback((success: boolean, duration: number) => {
    setRefreshStats(prev => {
      const newTotalRefreshes = prev.totalRefreshes + 1
      const newSuccessfulRefreshes = success ? prev.successfulRefreshes + 1 : prev.successfulRefreshes
      const newFailedRefreshes = success ? prev.failedRefreshes : prev.failedRefreshes + 1
      
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

  const refreshAll = useCallback(async () => {
    if (isGlobalRefreshing) return

    setIsGlobalRefreshing(true)
    const startTime = Date.now()

    try {
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
        toast.success('Data refreshed successfully', {
          duration: 2000,
          position: 'bottom-right'
        })
      }
    } catch (error) {
      const duration = Date.now() - startTime
      updateRefreshStats(false, duration)

      
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

      
      if (showRefreshNotifications) {
        toast.error('Failed to refresh specific data', {
          duration: 3000,
          position: 'bottom-right'
        })
      }
    }
  }, [client, updateRefreshStats, showRefreshNotifications])

  const hardRefresh = useCallback(async () => {
    if (isGlobalRefreshing) return

    setIsGlobalRefreshing(true)
    const startTime = Date.now()

    try {
      await client.clearStore()
      
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

  const enableAutoRefresh = useCallback((interval?: number) => {
    const refreshInterval = interval || autoRefreshInterval

    if (autoRefreshIntervalRef.current) {
      clearInterval(autoRefreshIntervalRef.current)
    }

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

  const registerComponent = useCallback((componentId: string, queries: string[]) => {
    componentRegistryRef.current.set(componentId, queries)
  }, [])

  const unregisterComponent = useCallback((componentId: string) => {
    componentRegistryRef.current.delete(componentId)
  }, [])

  const refreshComponent = useCallback(async (componentId: string) => {
    const queries = componentRegistryRef.current.get(componentId)
    if (queries) {
      await refreshSpecific(queries)
    }
  }, [refreshSpecific])

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
      
      if (showRefreshNotifications) {
        toast.error('Failed to clear cache', {
          duration: 3000,
          position: 'bottom-right'
        })
      }
    }
  }, [client, showRefreshNotifications])

  const getCacheSize = useCallback(() => {
    try {
      const cache = client.cache.extract()
      return Object.keys(cache).length
    } catch {
      return 0
    }
  }, [client])

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


