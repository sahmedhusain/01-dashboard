import { useState, useCallback, useRef, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

interface RefreshOptions {
  interval?: number // Auto-refresh interval in milliseconds
  onSuccess?: () => void
  onError?: (error: Error) => void
  enableAutoRefresh?: boolean
}

interface RefreshState {
  isRefreshing: boolean
  lastRefresh: Date | null
  error: Error | null
  refreshCount: number
}

export const useDataRefresh = (queries: string[] = [], options: RefreshOptions = {}) => {
  const {
    interval = 30000, // 30 seconds default
    onSuccess,
    onError,
    enableAutoRefresh = false
  } = options

  const client = useApolloClient()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [refreshState, setRefreshState] = useState<RefreshState>({
    isRefreshing: false,
    lastRefresh: null,
    error: null,
    refreshCount: 0
  })

  // Manual refresh function
  const refresh = useCallback(async (specificQueries?: string[]) => {
    const queriesToRefresh = specificQueries || queries
    
    if (queriesToRefresh.length === 0) {
      return
    }

    setRefreshState(prev => ({
      ...prev,
      isRefreshing: true,
      error: null
    }))

    try {
      // Refetch all specified queries
      await Promise.all(
        queriesToRefresh.map(query => 
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

      setRefreshState(prev => ({
        ...prev,
        isRefreshing: false,
        lastRefresh: new Date(),
        refreshCount: prev.refreshCount + 1
      }))

      onSuccess?.()
    } catch (error) {
      const refreshError = error instanceof Error ? error : new Error('Refresh failed')
      
      setRefreshState(prev => ({
        ...prev,
        isRefreshing: false,
        error: refreshError
      }))

      onError?.(refreshError)
    }
  }, [client, queries, onSuccess, onError])

  // Refresh all cached data
  const refreshAll = useCallback(async () => {
    setRefreshState(prev => ({
      ...prev,
      isRefreshing: true,
      error: null
    }))

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

      setRefreshState(prev => ({
        ...prev,
        isRefreshing: false,
        lastRefresh: new Date(),
        refreshCount: prev.refreshCount + 1
      }))

      onSuccess?.()
    } catch (error) {
      const refreshError = error instanceof Error ? error : new Error('Refresh all failed')
      
      setRefreshState(prev => ({
        ...prev,
        isRefreshing: false,
        error: refreshError
      }))

      onError?.(refreshError)
    }
  }, [client, onSuccess, onError])

  // Clear cache and refetch
  const hardRefresh = useCallback(async () => {
    setRefreshState(prev => ({
      ...prev,
      isRefreshing: true,
      error: null
    }))

    try {
      // Clear cache first
      await client.clearStore()
      
      // Then refetch all active queries
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

      setRefreshState(prev => ({
        ...prev,
        isRefreshing: false,
        lastRefresh: new Date(),
        refreshCount: prev.refreshCount + 1
      }))

      onSuccess?.()
    } catch (error) {
      const refreshError = error instanceof Error ? error : new Error('Hard refresh failed')
      
      setRefreshState(prev => ({
        ...prev,
        isRefreshing: false,
        error: refreshError
      }))

      onError?.(refreshError)
    }
  }, [client, onSuccess, onError])

  // Start auto-refresh
  const startAutoRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      refresh()
    }, interval)
  }, [refresh, interval])

  // Stop auto-refresh
  const stopAutoRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Setup auto-refresh if enabled
  useEffect(() => {
    if (enableAutoRefresh) {
      startAutoRefresh()
    }

    return () => {
      stopAutoRefresh()
    }
  }, [enableAutoRefresh, startAutoRefresh, stopAutoRefresh])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoRefresh()
    }
  }, [stopAutoRefresh])

  return {
    ...refreshState,
    refresh,
    refreshAll,
    hardRefresh,
    startAutoRefresh,
    stopAutoRefresh,
    isAutoRefreshActive: intervalRef.current !== null
  }
}

export const useOptimisticRefresh = <T>(
  initialData: T,
  refreshFn: () => Promise<T>,
  options: RefreshOptions = {}
) => {
  const [data, setData] = useState<T>(initialData)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const refresh = useCallback(async (optimisticData?: T) => {
    setIsRefreshing(true)
    setError(null)

    // Apply optimistic update if provided
    if (optimisticData) {
      setData(optimisticData)
    }

    try {
      const newData = await refreshFn()
      setData(newData)
      options.onSuccess?.()
    } catch (err) {
      const refreshError = err instanceof Error ? err : new Error('Refresh failed')
      setError(refreshError)
      
      // Revert optimistic update on error
      if (optimisticData) {
        setData(initialData)
      }
      
      options.onError?.(refreshError)
    } finally {
      setIsRefreshing(false)
    }
  }, [refreshFn, initialData, options])

  return {
    data,
    isRefreshing,
    error,
    refresh,
    setData // For manual optimistic updates
  }
}

export const useStaleWhileRevalidate = <T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: {
    staleTime?: number // Time in ms before data is considered stale
    cacheTime?: number // Time in ms to keep data in cache
    refetchOnWindowFocus?: boolean
    refetchOnReconnect?: boolean
  } = {}
) => {
  const {
    staleTime = 5 * 60 * 1000, // 5 minutes
    cacheTime = 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus = true,
    refetchOnReconnect = true
  } = options

  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const lastFetchRef = useRef<number>(0)
  const cacheRef = useRef<Map<string, { data: T; timestamp: number }>>(new Map())

  const fetchData = useCallback(async (isBackground = false) => {
    if (!isBackground) {
      setIsLoading(true)
    } else {
      setIsValidating(true)
    }
    
    setError(null)

    try {
      const newData = await fetchFn()
      const now = Date.now()
      
      // Update cache
      cacheRef.current.set(key, { data: newData, timestamp: now })
      lastFetchRef.current = now
      
      setData(newData)
    } catch (err) {
      const fetchError = err instanceof Error ? err : new Error('Fetch failed')
      setError(fetchError)
    } finally {
      setIsLoading(false)
      setIsValidating(false)
    }
  }, [key, fetchFn])

  const isStale = useCallback(() => {
    return Date.now() - lastFetchRef.current > staleTime
  }, [staleTime])

  const revalidate = useCallback(() => {
    if (isStale()) {
      fetchData(true)
    }
  }, [fetchData, isStale])

  // Initial fetch or serve from cache
  useEffect(() => {
    const cached = cacheRef.current.get(key)
    const now = Date.now()

    if (cached && now - cached.timestamp < cacheTime) {
      // Serve from cache
      setData(cached.data)
      setIsLoading(false)
      lastFetchRef.current = cached.timestamp

      // Revalidate if stale
      if (now - cached.timestamp > staleTime) {
        fetchData(true)
      }
    } else {
      // Fetch fresh data
      fetchData()
    }
  }, [key, fetchData, staleTime, cacheTime])

  // Refetch on window focus
  useEffect(() => {
    if (!refetchOnWindowFocus) return

    const handleFocus = () => {
      if (isStale()) {
        revalidate()
      }
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [refetchOnWindowFocus, revalidate, isStale])

  // Refetch on reconnect
  useEffect(() => {
    if (!refetchOnReconnect) return

    const handleOnline = () => {
      if (isStale()) {
        revalidate()
      }
    }

    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [refetchOnReconnect, revalidate, isStale])

  return {
    data,
    isLoading,
    isValidating,
    error,
    revalidate,
    mutate: setData // For manual cache updates
  }
}
