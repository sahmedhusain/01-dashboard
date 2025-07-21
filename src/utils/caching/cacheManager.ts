// ============================================================================
// INTELLIGENT CACHING SYSTEM
// Comprehensive caching solution for GraphQL dashboard performance optimization
// ============================================================================

/**
 * Cache configuration and constants
 */

interface CacheEntry {
  data: unknown;
  expiresAt: number;
  size: number;
  accessCount: number;
  lastAccessed: number;
  createdAt: number;
}

interface PerformanceMetrics {
  hitRate: number;
  averageResponseTime: number;
  memoryUsage: number;
  cacheSize: number;
}
import config from '../../config/appConfig';

// Use dynamic cache configuration
const CACHE_CONFIG = {
  // Cache durations from configuration
  USER_DATA: config.cache.durations.userData,
  STATISTICS: config.cache.durations.statistics,
  ANALYTICS: config.cache.durations.analytics,
  CHARTS: config.cache.durations.charts,
  ACHIEVEMENTS: config.cache.durations.achievements,

  // Cache size limits from configuration
  MAX_ENTRIES: config.cache.maxEntries,
  MAX_MEMORY_MB: config.cache.maxMemoryMB,

  // Dynamic cache keys
  KEYS: {
    USER_PROFILE: 'user_profile',
    USER_STATISTICS: 'user_statistics',
    XP_TIMELINE: 'xp_timeline',
    PROJECT_RESULTS: 'project_results',
    SKILLS_DATA: 'skills_data',
    AUDIT_DATA: 'audit_data',
    ANALYTICS_DATA: 'analytics_data',
    CHART_DATA: 'chart_data',
    ACHIEVEMENTS: 'achievements'
  }
};

/**
 * Advanced Cache Manager Class
 * Implements intelligent caching with TTL, LRU eviction, and memory management
 */
class CacheManager {
  private cache: Map<string, CacheEntry>;
  private accessTimes: Map<string, number>;
  private memoryUsage: number;
  private hitCount: number;
  private missCount: number;
  private performanceMetrics: {
    hitRate: number;
    averageResponseTime: number;
    memoryUsage: number;
    cacheSize: number;
  };

  constructor() {
    this.cache = new Map();
    this.accessTimes = new Map();
    this.memoryUsage = 0;
    this.hitCount = 0;
    this.missCount = 0;
    
    // Initialize performance monitoring
    this.performanceMetrics = {
      hitRate: 0,
      averageResponseTime: 0,
      memoryUsage: 0,
      cacheSize: 0
    };
    
    // Start periodic cleanup
    this.startCleanupInterval();
  }

  /**
   * Store data in cache with TTL
   * @param {string} key - Cache key
   * @param {any} data - Data to cache
   * @param {number} ttl - Time to live in milliseconds
   * @param {string} userLogin - User identifier for scoped caching
   */
  set(key, data, ttl = CACHE_CONFIG.USER_DATA, userLogin = 'default') {
    const scopedKey = `${userLogin}:${key}`;
    const now = Date.now();
    
    const cacheEntry: CacheEntry = {
      data,
      expiresAt: now + ttl,
      size: this.calculateSize(data),
      accessCount: 0,
      lastAccessed: now,
      createdAt: now
    };

    // Check memory limits before adding
    if (this.memoryUsage + cacheEntry.size > CACHE_CONFIG.MAX_MEMORY_MB * 1024 * 1024) {
      this.evictLRU();
    }

    // Remove existing entry if present
    if (this.cache.has(scopedKey)) {
      const oldEntry = this.cache.get(scopedKey);
      this.memoryUsage -= oldEntry.size;
    }

    this.cache.set(scopedKey, cacheEntry);
    this.accessTimes.set(scopedKey, now);
    this.memoryUsage += cacheEntry.size;

    // Enforce max entries limit
    if (this.cache.size > CACHE_CONFIG.MAX_ENTRIES) {
      this.evictLRU();
    }

    this.updateMetrics();
  }

  /**
   * Retrieve data from cache
   * @param {string} key - Cache key
   * @param {string} userLogin - User identifier for scoped caching
   * @returns {any|null} Cached data or null if not found/expired
   */
  get(key, userLogin = 'default') {
    const scopedKey = `${userLogin}:${key}`;
    const now = Date.now();
    
    if (!this.cache.has(scopedKey)) {
      this.missCount++;
      this.updateMetrics();
      return null;
    }

    const entry = this.cache.get(scopedKey);
    
    // Check if expired
    if (now > entry.expiresAt) {
      this.delete(scopedKey);
      this.missCount++;
      this.updateMetrics();
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = now;
    this.accessTimes.set(scopedKey, now);
    
    this.hitCount++;
    this.updateMetrics();
    
    return entry.data;
  }

  /**
   * Delete specific cache entry
   * @param {string} key - Cache key
   * @param {string} userLogin - User identifier for scoped caching
   */
  delete(key, userLogin = 'default') {
    const scopedKey = `${userLogin}:${key}`;
    
    if (this.cache.has(scopedKey)) {
      const entry = this.cache.get(scopedKey);
      this.memoryUsage -= entry.size;
      this.cache.delete(scopedKey);
      this.accessTimes.delete(scopedKey);
      this.updateMetrics();
    }
  }

  /**
   * Clear all cache entries for a user
   * @param {string} userLogin - User identifier
   */
  clearUserCache(userLogin) {
    const keysToDelete = [];
    
    for (const key of this.cache.keys()) {
      if (key.startsWith(`${userLogin}:`)) {
        keysToDelete.push(key);
      }
    }
    
    keysToDelete.forEach(key => {
      const entry = this.cache.get(key);
      this.memoryUsage -= entry.size;
      this.cache.delete(key);
      this.accessTimes.delete(key);
    });
    
    this.updateMetrics();
  }

  /**
   * Clear all cache entries
   */
  clear() {
    this.cache.clear();
    this.accessTimes.clear();
    this.memoryUsage = 0;
    this.hitCount = 0;
    this.missCount = 0;
    this.updateMetrics();
  }

  /**
   * Check if key exists and is not expired
   * @param {string} key - Cache key
   * @param {string} userLogin - User identifier
   * @returns {boolean} True if key exists and is valid
   */
  has(key, userLogin = 'default') {
    const scopedKey = `${userLogin}:${key}`;
    
    if (!this.cache.has(scopedKey)) {
      return false;
    }

    const entry = this.cache.get(scopedKey);
    const now = Date.now();
    
    if (now > entry.expiresAt) {
      this.delete(key, userLogin);
      return false;
    }
    
    return true;
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache performance metrics
   */
  getStats() {
    return {
      ...this.performanceMetrics,
      totalEntries: this.cache.size,
      hitCount: this.hitCount,
      missCount: this.missCount,
      memoryUsageMB: (this.memoryUsage / (1024 * 1024)).toFixed(2)
    };
  }

  /**
   * Evict least recently used entries
   */
  evictLRU() {
    if (this.cache.size === 0) return;

    // Find least recently used entry
    let oldestKey = null;
    let oldestTime = Date.now();

    for (const [key, time] of this.accessTimes.entries()) {
      if (time < oldestTime) {
        oldestTime = time;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      const entry = this.cache.get(oldestKey);
      this.memoryUsage -= entry.size;
      this.cache.delete(oldestKey);
      this.accessTimes.delete(oldestKey);
    }
  }

  /**
   * Calculate approximate size of data in bytes
   * @param {any} data - Data to measure
   * @returns {number} Approximate size in bytes
   */
  calculateSize(data) {
    const jsonString = JSON.stringify(data);
    return new Blob([jsonString]).size;
  }

  /**
   * Update performance metrics
   */
  updateMetrics() {
    const total = this.hitCount + this.missCount;
    this.performanceMetrics = {
      hitRate: total > 0 ? parseFloat(((this.hitCount / total) * 100).toFixed(2)) : 0,
      averageResponseTime: 0, // This would be calculated from actual response times
      memoryUsage: parseFloat((this.memoryUsage / (1024 * 1024)).toFixed(2)),
      cacheSize: this.cache.size
    };
  }

  /**
   * Start periodic cleanup of expired entries
   */
  startCleanupInterval() {
    setInterval(() => {
      this.cleanupExpired();
    }, 60000); // Run every minute
  }

  /**
   * Remove expired entries
   */
  cleanupExpired() {
    const now = Date.now();
    const keysToDelete = [];

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => {
      const entry = this.cache.get(key);
      this.memoryUsage -= entry.size;
      this.cache.delete(key);
      this.accessTimes.delete(key);
    });

    if (keysToDelete.length > 0) {
      this.updateMetrics();
    }
  }

  /**
   * Preload data into cache
   * @param {string} key - Cache key
   * @param {Function} dataLoader - Function that returns a promise with data
   * @param {number} ttl - Time to live
   * @param {string} userLogin - User identifier
   */
  async preload(key, dataLoader, ttl = CACHE_CONFIG.USER_DATA, userLogin = 'default') {
    if (this.has(key, userLogin)) {
      return this.get(key, userLogin);
    }

    try {
      const data = await dataLoader();
      this.set(key, data, ttl, userLogin);
      return data;
    } catch (error) {
      console.error(`Cache preload failed for key ${key}:`, error);
      return null;
    }
  }
}

// Create singleton instance
const cacheManager = new CacheManager();

/**
 * Cache decorator for GraphQL service methods
 * @param {string} cacheKey - Cache key
 * @param {number} ttl - Time to live
 * @returns {Function} Decorator function
 */
export const withCache = (cacheKey, ttl = CACHE_CONFIG.USER_DATA) => {
  return (target, propertyName, descriptor) => {
    const method = descriptor.value;

    descriptor.value = async function(...args) {
      const userLogin = args[0]; // Assume first argument is userLogin
      const cachedResult = cacheManager.get(cacheKey, userLogin);
      
      if (cachedResult !== null) {
        return [cachedResult, null];
      }

      try {
        const result = await method.apply(this, args);
        
        if (result[0] !== null && result[1] === null) {
          cacheManager.set(cacheKey, result[0], ttl, userLogin);
        }
        
        return result;
      } catch (error) {
        return [null, error];
      }
    };

    return descriptor;
  };
};

/**
 * Cache utility functions
 */
export const CacheUtils = {
  // Get cache manager instance
  getInstance: () => cacheManager,
  
  // Cache configuration
  config: CACHE_CONFIG,
  
  // Invalidate user cache
  invalidateUser: (userLogin) => cacheManager.clearUserCache(userLogin),
  
  // Get cache statistics
  getStats: () => cacheManager.getStats(),
  
  // Clear all cache
  clearAll: () => cacheManager.clear(),
  
  // Preload critical data
  preloadCriticalData: async (userLogin, dataService) => {
    const preloadTasks = [
      cacheManager.preload(
        CACHE_CONFIG.KEYS.USER_PROFILE,
        () => dataService.getUserInfo(userLogin),
        CACHE_CONFIG.USER_DATA,
        userLogin
      ),
      cacheManager.preload(
        CACHE_CONFIG.KEYS.USER_STATISTICS,
        () => dataService.getComprehensiveAnalytics(userLogin),
        CACHE_CONFIG.STATISTICS,
        userLogin
      )
    ];
    
    await Promise.allSettled(preloadTasks);
  }
};

export default cacheManager;

// ============================================================================
// PERFORMANCE MONITORING SYSTEM
// ============================================================================

/**
 * Performance Monitor Class
 * Tracks application performance metrics and provides optimization insights
 */
class PerformanceMonitor {
  private metrics: {
    pageLoadTimes: Array<{
      timestamp: number;
      loadTime: number;
      domContentLoaded: number;
      firstPaint: number;
    }>;
    apiResponseTimes: Array<{
      timestamp: number;
      url: string;
      responseTime: number;
      transferSize: number;
    }>;
    renderTimes: Array<{
      timestamp: number;
      component: string;
      renderTime: number;
    }>;
    memoryUsage: Array<{
      timestamp: number;
      used: number;
      total: number;
      limit: number;
    }>;
    cacheHitRates: Array<{
      timestamp: number;
      hitRate: number;
      memoryUsage: number;
    }>;
  };
  private observers: PerformanceObserver[];
  private startTime: number;

  constructor() {
    this.metrics = {
      pageLoadTimes: [],
      apiResponseTimes: [],
      renderTimes: [],
      memoryUsage: [],
      cacheHitRates: []
    };

    this.observers = [];
    this.startTime = performance.now();

    // Initialize performance observers
    this.initializeObservers();
  }

  /**
   * Initialize performance observers
   */
  initializeObservers() {
    // Navigation timing observer
    if ('PerformanceObserver' in window) {
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            this.recordPageLoad(entry);
          }
        }
      });

      try {
        navObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navObserver);
      } catch (_e) {
        console.warn('Navigation timing observer not supported');
      }
    }

    // Resource timing observer
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name.includes('graphql') || entry.name.includes('api')) {
            this.recordApiResponse(entry);
          }
        }
      });

      try {
        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.push(resourceObserver);
      } catch (_e) {
        console.warn('Resource timing observer not supported');
      }
    }
  }

  /**
   * Record page load performance
   * @param {PerformanceNavigationTiming} entry - Navigation timing entry
   */
  recordPageLoad(entry) {
    const loadTime = entry.loadEventEnd - entry.navigationStart;
    this.metrics.pageLoadTimes.push({
      timestamp: Date.now(),
      loadTime,
      domContentLoaded: entry.domContentLoadedEventEnd - entry.navigationStart,
      firstPaint: entry.responseEnd - entry.navigationStart
    });

    // Keep only last 50 entries
    if (this.metrics.pageLoadTimes.length > 50) {
      this.metrics.pageLoadTimes.shift();
    }
  }

  /**
   * Record API response performance
   * @param {PerformanceResourceTiming} entry - Resource timing entry
   */
  recordApiResponse(entry) {
    const responseTime = entry.responseEnd - entry.requestStart;
    this.metrics.apiResponseTimes.push({
      timestamp: Date.now(),
      url: entry.name,
      responseTime,
      transferSize: entry.transferSize || 0
    });

    // Keep only last 100 entries
    if (this.metrics.apiResponseTimes.length > 100) {
      this.metrics.apiResponseTimes.shift();
    }
  }

  /**
   * Record component render time
   * @param {string} componentName - Name of the component
   * @param {number} renderTime - Render time in milliseconds
   */
  recordRenderTime(componentName, renderTime) {
    this.metrics.renderTimes.push({
      timestamp: Date.now(),
      component: componentName,
      renderTime
    });

    // Keep only last 100 entries
    if (this.metrics.renderTimes.length > 100) {
      this.metrics.renderTimes.shift();
    }
  }

  /**
   * Record memory usage
   */
  recordMemoryUsage() {
    if ('memory' in performance) {
      const memory = performance.memory as {
        usedJSHeapSize: number;
        totalJSHeapSize: number;
        jsHeapSizeLimit: number;
      };
      this.metrics.memoryUsage.push({
        timestamp: Date.now(),
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit
      });

      // Keep only last 50 entries
      if (this.metrics.memoryUsage.length > 50) {
        this.metrics.memoryUsage.shift();
      }
    }
  }

  /**
   * Get performance summary
   * @returns {Object} Performance metrics summary
   */
  getSummary() {
    const now = Date.now();
    const uptime = now - this.startTime;

    return {
      uptime: Math.round(uptime / 1000), // in seconds
      pageLoad: this.getAveragePageLoadTime(),
      apiResponse: this.getAverageApiResponseTime(),
      render: this.getAverageRenderTime(),
      memory: this.getCurrentMemoryUsage(),
      cache: cacheManager.getStats(),
      recommendations: this.getOptimizationRecommendations()
    };
  }

  /**
   * Get average page load time
   * @returns {number} Average load time in milliseconds
   */
  getAveragePageLoadTime() {
    if (this.metrics.pageLoadTimes.length === 0) return 0;

    const total = this.metrics.pageLoadTimes.reduce((sum, entry) => sum + entry.loadTime, 0);
    return Math.round(total / this.metrics.pageLoadTimes.length);
  }

  /**
   * Get average API response time
   * @returns {number} Average response time in milliseconds
   */
  getAverageApiResponseTime() {
    if (this.metrics.apiResponseTimes.length === 0) return 0;

    const total = this.metrics.apiResponseTimes.reduce((sum, entry) => sum + entry.responseTime, 0);
    return Math.round(total / this.metrics.apiResponseTimes.length);
  }

  /**
   * Get average render time
   * @returns {number} Average render time in milliseconds
   */
  getAverageRenderTime() {
    if (this.metrics.renderTimes.length === 0) return 0;

    const total = this.metrics.renderTimes.reduce((sum, entry) => sum + entry.renderTime, 0);
    return Math.round(total / this.metrics.renderTimes.length);
  }

  /**
   * Get current memory usage
   * @returns {Object} Memory usage information
   */
  getCurrentMemoryUsage() {
    if ('memory' in performance) {
      const memory = performance.memory as {
        usedJSHeapSize: number;
        totalJSHeapSize: number;
        jsHeapSizeLimit: number;
      };
      return {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
        percentage: Math.round((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100)
      };
    }
    return { used: 0, total: 0, percentage: 0 };
  }

  /**
   * Get optimization recommendations
   * @returns {Array} Array of optimization suggestions
   */
  getOptimizationRecommendations() {
    const recommendations = [];
    const cacheStats = cacheManager.getStats();

    // Cache hit rate recommendations
    if (cacheStats.hitRate < 70) {
      recommendations.push({
        type: 'cache',
        priority: 'high',
        message: 'Cache hit rate is low. Consider increasing cache TTL or preloading critical data.'
      });
    }

    // API response time recommendations
    const avgApiTime = this.getAverageApiResponseTime();
    if (avgApiTime > 1000) {
      recommendations.push({
        type: 'api',
        priority: 'high',
        message: 'API response times are slow. Consider implementing request batching or pagination.'
      });
    }

    // Memory usage recommendations
    const memoryUsage = this.getCurrentMemoryUsage();
    if (memoryUsage.percentage > 80) {
      recommendations.push({
        type: 'memory',
        priority: 'medium',
        message: 'Memory usage is high. Consider implementing lazy loading or reducing cache size.'
      });
    }

    // Page load recommendations
    const avgLoadTime = this.getAveragePageLoadTime();
    if (avgLoadTime > 3000) {
      recommendations.push({
        type: 'loading',
        priority: 'medium',
        message: 'Page load times are slow. Consider code splitting or resource optimization.'
      });
    }

    return recommendations;
  }

  /**
   * Start periodic monitoring
   */
  startMonitoring() {
    // Record memory usage every 30 seconds
    setInterval(() => {
      this.recordMemoryUsage();
    }, 30000);

    // Record cache hit rates every minute
    setInterval(() => {
      const cacheStats = cacheManager.getStats();
      this.metrics.cacheHitRates.push({
        timestamp: Date.now(),
        hitRate: cacheStats.hitRate,
        memoryUsage: parseFloat(cacheStats.memoryUsageMB)
      });

      // Keep only last 60 entries (1 hour)
      if (this.metrics.cacheHitRates.length > 60) {
        this.metrics.cacheHitRates.shift();
      }
    }, 60000);
  }

  /**
   * Cleanup observers
   */
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Start monitoring
performanceMonitor.startMonitoring();

// Export performance utilities
export const PerformanceUtils = {
  getInstance: () => performanceMonitor,
  getSummary: () => performanceMonitor.getSummary(),
  recordRender: (componentName, renderTime) => performanceMonitor.recordRenderTime(componentName, renderTime),
  cleanup: () => performanceMonitor.cleanup()
};
