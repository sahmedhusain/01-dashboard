

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

const CACHE_CONFIG = {
  
  USER_DATA: config.cache.durations.userData,
  STATISTICS: config.cache.durations.statistics,
  ANALYTICS: config.cache.durations.analytics,
  CHARTS: config.cache.durations.charts,
  ACHIEVEMENTS: config.cache.durations.achievements,

  
  MAX_ENTRIES: config.cache.maxEntries,
  MAX_MEMORY_MB: config.cache.maxMemoryMB,

  
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
    
    
    this.performanceMetrics = {
      hitRate: 0,
      averageResponseTime: 0,
      memoryUsage: 0,
      cacheSize: 0
    };
    
    
    this.startCleanupInterval();
  }

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

    
    if (this.memoryUsage + cacheEntry.size > CACHE_CONFIG.MAX_MEMORY_MB * 1024 * 1024) {
      this.evictLRU();
    }

    
    if (this.cache.has(scopedKey)) {
      const oldEntry = this.cache.get(scopedKey);
      this.memoryUsage -= oldEntry.size;
    }

    this.cache.set(scopedKey, cacheEntry);
    this.accessTimes.set(scopedKey, now);
    this.memoryUsage += cacheEntry.size;

    
    if (this.cache.size > CACHE_CONFIG.MAX_ENTRIES) {
      this.evictLRU();
    }

    this.updateMetrics();
  }

  get(key, userLogin = 'default') {
    const scopedKey = `${userLogin}:${key}`;
    const now = Date.now();
    
    if (!this.cache.has(scopedKey)) {
      this.missCount++;
      this.updateMetrics();
      return null;
    }

    const entry = this.cache.get(scopedKey);
    
    
    if (now > entry.expiresAt) {
      this.delete(scopedKey);
      this.missCount++;
      this.updateMetrics();
      return null;
    }

    
    entry.accessCount++;
    entry.lastAccessed = now;
    this.accessTimes.set(scopedKey, now);
    
    this.hitCount++;
    this.updateMetrics();
    
    return entry.data;
  }

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

  clear() {
    this.cache.clear();
    this.accessTimes.clear();
    this.memoryUsage = 0;
    this.hitCount = 0;
    this.missCount = 0;
    this.updateMetrics();
  }

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

  getStats() {
    return {
      ...this.performanceMetrics,
      totalEntries: this.cache.size,
      hitCount: this.hitCount,
      missCount: this.missCount,
      memoryUsageMB: (this.memoryUsage / (1024 * 1024)).toFixed(2)
    };
  }

  evictLRU() {
    if (this.cache.size === 0) return;

    
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

  calculateSize(data) {
    const jsonString = JSON.stringify(data);
    return new Blob([jsonString]).size;
  }

  updateMetrics() {
    const total = this.hitCount + this.missCount;
    this.performanceMetrics = {
      hitRate: total > 0 ? parseFloat(((this.hitCount / total) * 100).toFixed(2)) : 0,
      averageResponseTime: 0, 
      memoryUsage: parseFloat((this.memoryUsage / (1024 * 1024)).toFixed(2)),
      cacheSize: this.cache.size
    };
  }

  startCleanupInterval() {
    setInterval(() => {
      this.cleanupExpired();
    }, 60000); 
  }

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

  async preload(key, dataLoader, ttl = CACHE_CONFIG.USER_DATA, userLogin = 'default') {
    if (this.has(key, userLogin)) {
      return this.get(key, userLogin);
    }

    try {
      const data = await dataLoader();
      this.set(key, data, ttl, userLogin);
      return data;
    } catch (error) {
      return null;
    }
  }
}

const cacheManager = new CacheManager();

export const withCache = (cacheKey, ttl = CACHE_CONFIG.USER_DATA) => {
  return (target, propertyName, descriptor) => {
    const method = descriptor.value;

    descriptor.value = async function(...args) {
      const userLogin = args[0]; 
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

export const CacheUtils = {
  
  getInstance: () => cacheManager,
  
  
  config: CACHE_CONFIG,
  
  
  invalidateUser: (userLogin) => cacheManager.clearUserCache(userLogin),
  
  
  getStats: () => cacheManager.getStats(),
  
  
  clearAll: () => cacheManager.clear(),
  
  
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

    
    this.initializeObservers();
  }

  initializeObservers() {
    
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
      }
    }

    
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
      }
    }
  }

  recordPageLoad(entry) {
    const loadTime = entry.loadEventEnd - entry.navigationStart;
    this.metrics.pageLoadTimes.push({
      timestamp: Date.now(),
      loadTime,
      domContentLoaded: entry.domContentLoadedEventEnd - entry.navigationStart,
      firstPaint: entry.responseEnd - entry.navigationStart
    });

    
    if (this.metrics.pageLoadTimes.length > 50) {
      this.metrics.pageLoadTimes.shift();
    }
  }

  recordApiResponse(entry) {
    const responseTime = entry.responseEnd - entry.requestStart;
    this.metrics.apiResponseTimes.push({
      timestamp: Date.now(),
      url: entry.name,
      responseTime,
      transferSize: entry.transferSize || 0
    });

    
    if (this.metrics.apiResponseTimes.length > 100) {
      this.metrics.apiResponseTimes.shift();
    }
  }

  recordRenderTime(componentName, renderTime) {
    this.metrics.renderTimes.push({
      timestamp: Date.now(),
      component: componentName,
      renderTime
    });

    
    if (this.metrics.renderTimes.length > 100) {
      this.metrics.renderTimes.shift();
    }
  }

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

      
      if (this.metrics.memoryUsage.length > 50) {
        this.metrics.memoryUsage.shift();
      }
    }
  }

  getSummary() {
    const now = Date.now();
    const uptime = now - this.startTime;

    return {
      uptime: Math.round(uptime / 1000), 
      pageLoad: this.getAveragePageLoadTime(),
      apiResponse: this.getAverageApiResponseTime(),
      render: this.getAverageRenderTime(),
      memory: this.getCurrentMemoryUsage(),
      cache: cacheManager.getStats(),
      recommendations: this.getOptimizationRecommendations()
    };
  }

  getAveragePageLoadTime() {
    if (this.metrics.pageLoadTimes.length === 0) return 0;

    const total = this.metrics.pageLoadTimes.reduce((sum, entry) => sum + entry.loadTime, 0);
    return Math.round(total / this.metrics.pageLoadTimes.length);
  }

  getAverageApiResponseTime() {
    if (this.metrics.apiResponseTimes.length === 0) return 0;

    const total = this.metrics.apiResponseTimes.reduce((sum, entry) => sum + entry.responseTime, 0);
    return Math.round(total / this.metrics.apiResponseTimes.length);
  }

  getAverageRenderTime() {
    if (this.metrics.renderTimes.length === 0) return 0;

    const total = this.metrics.renderTimes.reduce((sum, entry) => sum + entry.renderTime, 0);
    return Math.round(total / this.metrics.renderTimes.length);
  }

  getCurrentMemoryUsage() {
    if ('memory' in performance) {
      const memory = performance.memory as {
        usedJSHeapSize: number;
        totalJSHeapSize: number;
        jsHeapSizeLimit: number;
      };
      return {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024), 
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024), 
        percentage: Math.round((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100)
      };
    }
    return { used: 0, total: 0, percentage: 0 };
  }

  getOptimizationRecommendations() {
    const recommendations = [];
    const cacheStats = cacheManager.getStats();

    
    if (cacheStats.hitRate < 70) {
      recommendations.push({
        type: 'cache',
        priority: 'high',
        message: 'Cache hit rate is low. Consider increasing cache TTL or preloading critical data.'
      });
    }

    
    const avgApiTime = this.getAverageApiResponseTime();
    if (avgApiTime > 1000) {
      recommendations.push({
        type: 'api',
        priority: 'high',
        message: 'API response times are slow. Consider implementing request batching or pagination.'
      });
    }

    
    const memoryUsage = this.getCurrentMemoryUsage();
    if (memoryUsage.percentage > 80) {
      recommendations.push({
        type: 'memory',
        priority: 'medium',
        message: 'Memory usage is high. Consider implementing lazy loading or reducing cache size.'
      });
    }

    
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

  startMonitoring() {
    
    setInterval(() => {
      this.recordMemoryUsage();
    }, 30000);

    
    setInterval(() => {
      const cacheStats = cacheManager.getStats();
      this.metrics.cacheHitRates.push({
        timestamp: Date.now(),
        hitRate: cacheStats.hitRate,
        memoryUsage: parseFloat(cacheStats.memoryUsageMB)
      });

      
      if (this.metrics.cacheHitRates.length > 60) {
        this.metrics.cacheHitRates.shift();
      }
    }, 60000);
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

const performanceMonitor = new PerformanceMonitor();

performanceMonitor.startMonitoring();

export const PerformanceUtils = {
  getInstance: () => performanceMonitor,
  getSummary: () => performanceMonitor.getSummary(),
  recordRender: (componentName, renderTime) => performanceMonitor.recordRenderTime(componentName, renderTime),
  cleanup: () => performanceMonitor.cleanup()
};
