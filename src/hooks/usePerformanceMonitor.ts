import { useEffect, useRef, useState } from 'react'

interface PerformanceMetrics {
  renderTime: number
  queryTime: number
  memoryUsage: number
  componentMounts: number
  rerenders: number
}

interface UsePerformanceMonitorOptions {
  enabled?: boolean
  logToConsole?: boolean
  trackMemory?: boolean
  trackRenders?: boolean
}

export const usePerformanceMonitor = (
  componentName: string,
  options: UsePerformanceMonitorOptions = {}
) => {
  const {
    enabled = process.env.NODE_ENV === 'development',
    logToConsole = true,
    trackMemory = true,
    trackRenders = true
  } = options

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    queryTime: 0,
    memoryUsage: 0,
    componentMounts: 0,
    rerenders: 0
  })

  const renderStartTime = useRef<number>(0)
  const queryStartTime = useRef<number>(0)
  const mountCount = useRef<number>(0)
  const renderCount = useRef<number>(0)

  // Track component mounts
  useEffect(() => {
    if (!enabled) return

    mountCount.current += 1
    setMetrics(prev => ({
      ...prev,
      componentMounts: mountCount.current
    }))

    if (logToConsole) {
      console.log(`🔧 [${componentName}] Component mounted (${mountCount.current} times)`)
    }
  }, [enabled, componentName, logToConsole])

  // Track renders
  useEffect(() => {
    if (!enabled || !trackRenders) return

    renderCount.current += 1
    const renderTime = performance.now() - renderStartTime.current

    setMetrics(prev => ({
      ...prev,
      renderTime,
      rerenders: renderCount.current
    }))

    if (logToConsole && renderCount.current > 1) {
      console.log(`🔄 [${componentName}] Re-render #${renderCount.current} (${renderTime.toFixed(2)}ms)`)
    }
  })

  // Track memory usage
  useEffect(() => {
    if (!enabled || !trackMemory) return

    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memInfo = (performance as any).memory
        const memoryUsage = memInfo.usedJSHeapSize / 1024 / 1024 // Convert to MB

        setMetrics(prev => ({
          ...prev,
          memoryUsage
        }))

        if (logToConsole && memoryUsage > 50) { // Log if memory usage > 50MB
          console.warn(`🧠 [${componentName}] High memory usage: ${memoryUsage.toFixed(2)}MB`)
        }
      }
    }

    updateMemoryUsage()
    const interval = setInterval(updateMemoryUsage, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [enabled, trackMemory, componentName, logToConsole])

  const startRenderTimer = () => {
    if (enabled) {
      renderStartTime.current = performance.now()
    }
  }

  const endRenderTimer = () => {
    if (enabled) {
      const renderTime = performance.now() - renderStartTime.current
      setMetrics(prev => ({
        ...prev,
        renderTime
      }))

      if (logToConsole && renderTime > 16) { // Log if render takes > 16ms (60fps threshold)
        console.warn(`⏱️ [${componentName}] Slow render: ${renderTime.toFixed(2)}ms`)
      }
    }
  }

  const startQueryTimer = () => {
    if (enabled) {
      queryStartTime.current = performance.now()
    }
  }

  const endQueryTimer = () => {
    if (enabled) {
      const queryTime = performance.now() - queryStartTime.current
      setMetrics(prev => ({
        ...prev,
        queryTime
      }))

      if (logToConsole && queryTime > 1000) { // Log if query takes > 1 second
        console.warn(`🔍 [${componentName}] Slow query: ${queryTime.toFixed(2)}ms`)
      }
    }
  }

  const logMetrics = () => {
    if (enabled && logToConsole) {
      console.group(`📊 [${componentName}] Performance Metrics`)
      console.log(`Render Time: ${metrics.renderTime.toFixed(2)}ms`)
      console.log(`Query Time: ${metrics.queryTime.toFixed(2)}ms`)
      console.log(`Memory Usage: ${metrics.memoryUsage.toFixed(2)}MB`)
      console.log(`Component Mounts: ${metrics.componentMounts}`)
      console.log(`Re-renders: ${metrics.rerenders}`)
      console.groupEnd()
    }
  }

  const resetMetrics = () => {
    setMetrics({
      renderTime: 0,
      queryTime: 0,
      memoryUsage: 0,
      componentMounts: 0,
      rerenders: 0
    })
    mountCount.current = 0
    renderCount.current = 0
  }

  return {
    metrics,
    startRenderTimer,
    endRenderTimer,
    startQueryTimer,
    endQueryTimer,
    logMetrics,
    resetMetrics,
    isEnabled: enabled
  }
}
