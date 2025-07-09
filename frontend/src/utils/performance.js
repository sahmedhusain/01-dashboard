/**
 * Performance monitoring utilities
 */

// Performance metrics collection
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = [];
    this.init();
  }

  init() {
    // Web Vitals monitoring
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.observeWebVitals();
      this.observeResourceTiming();
    }
  }

  // Observe Core Web Vitals
  observeWebVitals() {
    try {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('LCP', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.recordMetric('FID', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.recordMetric('CLS', clsValue);
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (error) {
      console.warn('Performance monitoring not supported:', error);
    }
  }

  // Observe resource loading performance
  observeResourceTiming() {
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.initiatorType === 'fetch' || entry.initiatorType === 'xmlhttprequest') {
            this.recordMetric('API_RESPONSE_TIME', entry.duration, {
              url: entry.name,
              method: entry.initiatorType,
            });
          }
        });
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);
    } catch (error) {
      console.warn('Resource timing monitoring not supported:', error);
    }
  }

  // Record a performance metric
  recordMetric(name, value, metadata = {}) {
    const timestamp = Date.now();
    const metric = {
      name,
      value,
      timestamp,
      metadata,
    };

    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    this.metrics.get(name).push(metric);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Performance: ${name} = ${value.toFixed(2)}ms`, metadata);
    }
  }

  // Get metrics for a specific name
  getMetrics(name) {
    return this.metrics.get(name) || [];
  }

  // Get all metrics
  getAllMetrics() {
    const result = {};
    this.metrics.forEach((values, key) => {
      result[key] = values;
    });
    return result;
  }

  // Get average value for a metric
  getAverageMetric(name) {
    const metrics = this.getMetrics(name);
    if (metrics.length === 0) return 0;
    
    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / metrics.length;
  }

  // Clean up observers
  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Utility functions for manual performance tracking
export const startTimer = (name) => {
  const startTime = performance.now();
  return {
    end: () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      performanceMonitor.recordMetric(name, duration);
      return duration;
    }
  };
};

// Measure function execution time
export const measureFunction = (fn, name) => {
  return (...args) => {
    const timer = startTimer(name);
    const result = fn(...args);
    
    if (result instanceof Promise) {
      return result.finally(() => timer.end());
    } else {
      timer.end();
      return result;
    }
  };
};

// Measure React component render time
export const measureRender = (WrappedComponent, componentName) => {
  return function MeasuredComponent(props) {
    const timer = startTimer(`${componentName}_render`);
    
    React.useEffect(() => {
      timer.end();
    });

    return React.createElement(WrappedComponent, props);
  };
};

// Report performance metrics (for analytics)
export const reportMetrics = () => {
  const metrics = performanceMonitor.getAllMetrics();
  
  // In a real application, you would send this to your analytics service
  if (process.env.NODE_ENV === 'development') {
    console.table(
      Object.entries(metrics).reduce((acc, [key, values]) => {
        acc[key] = {
          count: values.length,
          average: values.reduce((sum, v) => sum + v.value, 0) / values.length,
          latest: values[values.length - 1]?.value || 0,
        };
        return acc;
      }, {})
    );
  }
  
  return metrics;
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if (performance.memory) {
    return {
      used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
      total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576), // MB
    };
  }
  return null;
};

// Bundle size analysis helper
export const logBundleInfo = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('📦 Bundle Analysis:');
    console.log('- React version:', React.version);
    console.log('- Memory usage:', getMemoryUsage());
    console.log('- Performance metrics:', reportMetrics());
  }
};

export default performanceMonitor;
