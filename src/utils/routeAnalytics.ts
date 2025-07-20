/**
 * Route Analytics and Performance Monitoring
 * Tracks navigation patterns and performance metrics
 */

/**
 * Route analytics tracker
 */
export class RouteAnalytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.routeHistory = [];
    this.performanceMetrics = new Map();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Track route navigation
   */
  trackNavigation(fromRoute, toRoute, navigationMethod = 'unknown') {
    const timestamp = Date.now();
    const navigationEvent = {
      sessionId: this.sessionId,
      timestamp,
      fromRoute,
      toRoute,
      navigationMethod, // 'click', 'url', 'back', 'forward', 'programmatic'
      timeOnPreviousRoute: this.getTimeOnRoute(fromRoute)
    };

    this.routeHistory.push(navigationEvent);
    this.logNavigation(navigationEvent);

    // Keep only last 100 navigation events
    if (this.routeHistory.length > 100) {
      this.routeHistory.shift();
    }
  }

  /**
   * Track route performance metrics
   */
  trackRoutePerformance(route, metrics) {
    const routeMetrics = this.performanceMetrics.get(route) || {
      visits: 0,
      totalLoadTime: 0,
      totalRenderTime: 0,
      errorCount: 0,
      lastVisit: null
    };

    routeMetrics.visits++;
    routeMetrics.totalLoadTime += metrics.loadTime || 0;
    routeMetrics.totalRenderTime += metrics.renderTime || 0;
    routeMetrics.errorCount += metrics.hasError ? 1 : 0;
    routeMetrics.lastVisit = Date.now();

    this.performanceMetrics.set(route, routeMetrics);
  }

  /**
   * Get time spent on a specific route
   */
  getTimeOnRoute(route) {
    const routeVisits = this.routeHistory.filter(event => event.toRoute === route);
    if (routeVisits.length === 0) return 0;

    const lastVisit = routeVisits[routeVisits.length - 1];
    return Date.now() - lastVisit.timestamp;
  }

  /**
   * Get navigation analytics
   */
  getAnalytics() {
    const totalNavigations = this.routeHistory.length;
    const uniqueRoutes = new Set(this.routeHistory.map(event => event.toRoute)).size;
    const sessionDuration = Date.now() - this.startTime;

    // Calculate route popularity
    const routeVisits = {};
    this.routeHistory.forEach(event => {
      routeVisits[event.toRoute] = (routeVisits[event.toRoute] || 0) + 1;
    });

    const mostVisitedRoute = Object.entries(routeVisits)
      .sort(([,a], [,b]) => b - a)[0];

    // Calculate navigation patterns
    const navigationMethods = {};
    this.routeHistory.forEach(event => {
      navigationMethods[event.navigationMethod] = 
        (navigationMethods[event.navigationMethod] || 0) + 1;
    });

    // Calculate average time per route
    const averageTimePerRoute = {};
    Object.keys(routeVisits).forEach(route => {
      const routeEvents = this.routeHistory.filter(event => event.toRoute === route);
      const totalTime = routeEvents.reduce((sum, event) => sum + (event.timeOnPreviousRoute || 0), 0);
      averageTimePerRoute[route] = routeEvents.length > 0 ? totalTime / routeEvents.length : 0;
    });

    return {
      session: {
        id: this.sessionId,
        duration: sessionDuration,
        startTime: this.startTime
      },
      navigation: {
        totalNavigations,
        uniqueRoutes,
        routeVisits,
        mostVisitedRoute: mostVisitedRoute ? {
          route: mostVisitedRoute[0],
          visits: mostVisitedRoute[1]
        } : null,
        navigationMethods,
        averageTimePerRoute
      },
      performance: this.getPerformanceAnalytics()
    };
  }

  /**
   * Get performance analytics
   */
  getPerformanceAnalytics() {
    const performanceData = {};

    this.performanceMetrics.forEach((metrics, route) => {
      performanceData[route] = {
        visits: metrics.visits,
        averageLoadTime: metrics.visits > 0 ? metrics.totalLoadTime / metrics.visits : 0,
        averageRenderTime: metrics.visits > 0 ? metrics.totalRenderTime / metrics.visits : 0,
        errorRate: metrics.visits > 0 ? metrics.errorCount / metrics.visits : 0,
        lastVisit: metrics.lastVisit
      };
    });

    return performanceData;
  }

  /**
   * Export analytics data
   */
  exportAnalytics() {
    return {
      analytics: this.getAnalytics(),
      routeHistory: this.routeHistory,
      performanceMetrics: Object.fromEntries(this.performanceMetrics)
    };
  }

  /**
   * Log navigation event (can be extended for external analytics)
   */
  logNavigation(event) {
    if (import.meta.env.DEV) {
      console.log('🧭 Navigation:', {
        from: event.fromRoute,
        to: event.toRoute,
        method: event.navigationMethod,
        timeOnPrevious: `${event.timeOnPreviousRoute}ms`
      });
    }

    // Here you could send to external analytics service
    // this.sendToAnalyticsService(event);
  }

  /**
   * Clear analytics data
   */
  clear() {
    this.routeHistory = [];
    this.performanceMetrics.clear();
    this.startTime = Date.now();
  }
}

// Global analytics instance
export const routeAnalytics = new RouteAnalytics();

/**
 * Hook for route performance monitoring
 */
export const useRoutePerformance = (routeName) => {
  const startTime = Date.now();

  const trackPerformance = (additionalMetrics = {}) => {
    const endTime = Date.now();
    const loadTime = endTime - startTime;

    routeAnalytics.trackRoutePerformance(routeName, {
      loadTime,
      ...additionalMetrics
    });
  };

  return { trackPerformance };
};

/**
 * Route performance measurement utilities
 */
export const RoutePerformance = {
  // Measure component render time
  measureRender: (componentName, renderFn) => {
    const startTime = performance.now();
    const result = renderFn();
    const endTime = performance.now();
    
    console.log(`🎨 ${componentName} render time: ${(endTime - startTime).toFixed(2)}ms`);
    return result;
  },

  // Measure data processing time
  measureDataProcessing: (processorName, processFn) => {
    const startTime = performance.now();
    const result = processFn();
    const endTime = performance.now();
    
    console.log(`⚡ ${processorName} processing time: ${(endTime - startTime).toFixed(2)}ms`);
    return result;
  },

  // Get Core Web Vitals for current route
  getCoreWebVitals: () => {
    return new Promise((resolve) => {
      // This would integrate with web-vitals library
      // For now, return mock data
      resolve({
        LCP: 0, // Largest Contentful Paint
        FID: 0, // First Input Delay
        CLS: 0  // Cumulative Layout Shift
      });
    });
  }
};

/**
 * Development utilities for route debugging
 */
export const RouteDebug = {
  // Log current route analytics
  logAnalytics: () => {
    console.table(routeAnalytics.getAnalytics());
  },

  // Log route history
  logHistory: () => {
    console.table(routeAnalytics.routeHistory);
  },

  // Log performance metrics
  logPerformance: () => {
    console.table(routeAnalytics.getPerformanceAnalytics());
  },

  // Export analytics to file
  exportToFile: () => {
    const data = routeAnalytics.exportAnalytics();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `route-analytics-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
};

// Make debug utilities available in development
if (import.meta.env.DEV) {
  window.routeDebug = RouteDebug;
  window.routeAnalytics = routeAnalytics;
}
