// Performance optimization utilities for the Reboot01 Dashboard
import React from 'react'

// Memoization utility for expensive calculations
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map()
  
  return ((...args: any[]) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

// Debounce utility for search and input handling
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility for scroll and resize events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Lazy loading utility for images
export const lazyLoadImage = (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = reject
    img.src = src
  })
}

// Virtual scrolling utility for large lists
export class VirtualScroller {
  private container: HTMLElement
  private itemHeight: number
  private visibleCount: number
  private totalCount: number
  private scrollTop: number = 0
  
  constructor(
    container: HTMLElement,
    itemHeight: number,
    visibleCount: number,
    totalCount: number
  ) {
    this.container = container
    this.itemHeight = itemHeight
    this.visibleCount = visibleCount
    this.totalCount = totalCount
  }
  
  getVisibleRange(): { start: number; end: number } {
    const start = Math.floor(this.scrollTop / this.itemHeight)
    const end = Math.min(start + this.visibleCount, this.totalCount)
    return { start, end }
  }
  
  updateScrollTop(scrollTop: number) {
    this.scrollTop = scrollTop
  }
}

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }
  
  startTiming(label: string): () => void {
    const start = performance.now()
    
    return () => {
      const end = performance.now()
      const duration = end - start
      
      if (!this.metrics.has(label)) {
        this.metrics.set(label, [])
      }
      
      this.metrics.get(label)!.push(duration)
      
      // Keep only last 100 measurements
      const measurements = this.metrics.get(label)!
      if (measurements.length > 100) {
        measurements.shift()
      }
    }
  }
  
  getAverageTime(label: string): number {
    const measurements = this.metrics.get(label)
    if (!measurements || measurements.length === 0) return 0
    
    const sum = measurements.reduce((acc, val) => acc + val, 0)
    return sum / measurements.length
  }
  
  getAllMetrics(): Record<string, { average: number; count: number }> {
    const result: Record<string, { average: number; count: number }> = {}
    
    for (const [label, measurements] of this.metrics.entries()) {
      result[label] = {
        average: this.getAverageTime(label),
        count: measurements.length
      }
    }
    
    return result
  }
  
  logMetrics(): void {
    console.group('🚀 Performance Metrics')
    const metrics = this.getAllMetrics()
    
    for (const [label, data] of Object.entries(metrics)) {
      console.log(`${label}: ${data.average.toFixed(2)}ms (${data.count} samples)`)
    }
    
    console.groupEnd()
  }
}

// Memory usage monitoring
interface MemoryInfo {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
}

export const getMemoryUsage = (): MemoryInfo | null => {
  if ('memory' in performance) {
    return (performance as any).memory
  }
  return null
}

// Bundle size analyzer
export const analyzeBundleSize = () => {
  const scripts = Array.from(document.querySelectorAll('script[src]'))
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
  
  console.group('📦 Bundle Analysis')
  console.log(`Scripts loaded: ${scripts.length}`)
  console.log(`Stylesheets loaded: ${styles.length}`)
  
  scripts.forEach((script: any, index) => {
    console.log(`Script ${index + 1}: ${script.src}`)
  })
  
  styles.forEach((style: any, index) => {
    console.log(`Stylesheet ${index + 1}: ${style.href}`)
  })
  
  console.groupEnd()
}

// React component performance wrapper
export const withPerformanceMonitoring = <P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) => {
  return React.memo((props: P) => {
    const monitor = PerformanceMonitor.getInstance()
    
    React.useEffect(() => {
      const stopTiming = monitor.startTiming(`${componentName}-render`)
      return stopTiming
    })
    
    return React.createElement(Component, props)
  })
}

// GraphQL query optimization
export const optimizeGraphQLQuery = (query: string): string => {
  // Remove unnecessary whitespace and comments
  return query
    .replace(/\s+/g, ' ')
    .replace(/#.*$/gm, '')
    .trim()
}

// Local storage optimization
export class OptimizedStorage {
  private static readonly MAX_SIZE = 5 * 1024 * 1024 // 5MB
  private static readonly COMPRESSION_THRESHOLD = 1024 // 1KB
  
  static setItem(key: string, value: any): boolean {
    try {
      const serialized = JSON.stringify(value)
      
      // Check if we need compression
      if (serialized.length > OptimizedStorage.COMPRESSION_THRESHOLD) {
        // Simple compression simulation (in real app, use actual compression)
        const compressed = serialized
        localStorage.setItem(key, compressed)
      } else {
        localStorage.setItem(key, serialized)
      }
      
      return true
    } catch (error) {
      console.warn('Failed to store item:', error)
      return false
    }
  }
  
  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      if (!item) return null
      
      return JSON.parse(item)
    } catch (error) {
      console.warn('Failed to retrieve item:', error)
      return null
    }
  }
  
  static removeItem(key: string): void {
    localStorage.removeItem(key)
  }
  
  static clear(): void {
    localStorage.clear()
  }
  
  static getUsage(): { used: number; available: number; percentage: number } {
    let used = 0
    
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length
      }
    }
    
    return {
      used,
      available: OptimizedStorage.MAX_SIZE - used,
      percentage: (used / OptimizedStorage.MAX_SIZE) * 100
    }
  }
}

// Image optimization utilities
export const optimizeImageUrl = (url: string, width?: number, height?: number): string => {
  // In a real app, this would integrate with image optimization services
  if (!width && !height) return url
  
  const params = new URLSearchParams()
  if (width) params.set('w', width.toString())
  if (height) params.set('h', height.toString())
  
  return `${url}?${params.toString()}`
}

// Network optimization
export const preloadResource = (url: string, type: 'script' | 'style' | 'image' = 'script'): void => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = url
  
  switch (type) {
    case 'script':
      link.as = 'script'
      break
    case 'style':
      link.as = 'style'
      break
    case 'image':
      link.as = 'image'
      break
  }
  
  document.head.appendChild(link)
}

// Export performance monitoring instance
export const performanceMonitor = PerformanceMonitor.getInstance()

// Development mode performance logging
if (process.env.NODE_ENV === 'development') {
  // Log performance metrics every 30 seconds
  setInterval(() => {
    performanceMonitor.logMetrics()
    
    const memoryUsage = getMemoryUsage()
    if (memoryUsage) {
      console.log('💾 Memory Usage:', {
        used: `${(memoryUsage.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        total: `${(memoryUsage.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        limit: `${(memoryUsage.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`
      })
    }
    
    const storageUsage = OptimizedStorage.getUsage()
    console.log('💿 Storage Usage:', {
      used: `${(storageUsage.used / 1024).toFixed(2)}KB`,
      percentage: `${storageUsage.percentage.toFixed(1)}%`
    })
  }, 30000)
}
