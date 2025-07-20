// ============================================================================
// PRODUCTION CONFIGURATION
// Optimized settings for production deployment
// ============================================================================

/**
 * Production environment configuration
 */
export const PRODUCTION_CONFIG = {
  // API Configuration
  api: {
    baseURL: import.meta.env.VITE_API_URL || 'https://learn.reboot01.com/api/graphql-engine/v1/graphql',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000
  },

  // Authentication
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    tokenExpiry: 24 * 60 * 60 * 1000, // 24 hours
    autoRefresh: true
  },

  // Caching
  cache: {
    enabled: true,
    maxSize: 100, // MB
    defaultTTL: 5 * 60 * 1000, // 5 minutes
    persistentCache: true
  },

  // Performance
  performance: {
    enableServiceWorker: true,
    enableCompression: true,
    enableLazyLoading: true,
    chunkSizeWarning: 500000, // 500KB
    bundleSizeWarning: 2000000 // 2MB
  },

  // Analytics
  analytics: {
    enabled: true,
    trackErrors: true,
    trackPerformance: true,
    trackUserInteractions: false // Privacy-focused
  },

  // Security
  security: {
    enableCSP: true,
    enableHTTPS: true,
    enableHSTS: true,
    enableXSSProtection: true
  },

  // Features
  features: {
    enableAdvancedCharts: true,
    enableRealTimeUpdates: false,
    enableOfflineMode: false,
    enablePWA: true
  }
};

/**
 * Environment-specific configurations
 */
export const getEnvironmentConfig = () => {
  const env = import.meta.env.MODE;
  
  const configs = {
    development: {
      ...PRODUCTION_CONFIG,
      api: {
        ...PRODUCTION_CONFIG.api,
        timeout: 10000
      },
      cache: {
        ...PRODUCTION_CONFIG.cache,
        enabled: false // Disable caching in development
      },
      analytics: {
        ...PRODUCTION_CONFIG.analytics,
        enabled: false
      },
      security: {
        ...PRODUCTION_CONFIG.security,
        enableCSP: false // Easier debugging
      }
    },
    
    staging: {
      ...PRODUCTION_CONFIG,
      analytics: {
        ...PRODUCTION_CONFIG.analytics,
        trackUserInteractions: true // More tracking in staging
      }
    },
    
    production: PRODUCTION_CONFIG
  };

  return configs[env] || configs.production;
};

/**
 * Performance optimization utilities
 */
export const PerformanceOptimizer = {
  /**
   * Lazy load component with error boundary
   */
  lazyLoad: (importFunc, fallback = null) => {
    const LazyComponent = React.lazy(importFunc);
    
    return React.forwardRef((props, ref) => (
      <React.Suspense fallback={fallback || <div>Loading...</div>}>
        <LazyComponent {...props} ref={ref} />
      </React.Suspense>
    ));
  },

  /**
   * Preload critical resources
   */
  preloadCriticalResources: () => {
    // Preload critical fonts
    const fonts = [
      '/fonts/inter-var.woff2',
      '/fonts/inter-var-italic.woff2'
    ];

    fonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Preload critical images
    const images = [
      '/images/logo.svg',
      '/images/hero-bg.webp'
    ];

    images.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    });
  },

  /**
   * Optimize bundle loading
   */
  optimizeBundleLoading: () => {
    // Prefetch non-critical chunks
    const prefetchChunks = [
      '/assets/achievements-chunk.js',
      '/assets/analytics-chunk.js'
    ];

    prefetchChunks.forEach(chunk => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = chunk;
      document.head.appendChild(link);
    });
  },

  /**
   * Monitor performance metrics
   */
  monitorPerformance: () => {
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('LCP:', entry.startTime);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Monitor Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            console.log('CLS:', entry.value);
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }
};

/**
 * Build optimization utilities
 */
export const BuildOptimizer = {
  /**
   * Generate build manifest
   */
  generateManifest: () => ({
    name: 'GraphQL Student Dashboard',
    short_name: 'Dashboard',
    description: 'Professional student analytics dashboard',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#14b8a6',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }),

  /**
   * Generate service worker configuration
   */
  generateServiceWorkerConfig: () => ({
    globDirectory: 'dist/',
    globPatterns: [
      '**/*.{html,js,css,png,jpg,jpeg,svg,woff,woff2}'
    ],
    swDest: 'dist/sw.js',
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/learn\.reboot01\.com\/api/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 5 * 60 // 5 minutes
          }
        }
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
          }
        }
      }
    ]
  }),

  /**
   * Generate security headers
   */
  generateSecurityHeaders: () => ({
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://learn.reboot01.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; '),
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  })
};

/**
 * Deployment utilities
 */
export const DeploymentUtils = {
  /**
   * Validate production readiness
   */
  validateProductionReadiness: () => {
    const checks = [];

    // Check environment variables
    const requiredEnvVars = ['VITE_API_URL'];
    requiredEnvVars.forEach(envVar => {
      if (!import.meta.env[envVar]) {
        checks.push(`Missing environment variable: ${envVar}`);
      }
    });

    // Check bundle size
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation && navigation.transferSize > PRODUCTION_CONFIG.performance.bundleSizeWarning) {
        checks.push(`Bundle size exceeds recommended limit: ${navigation.transferSize} bytes`);
      }
    }

    return {
      ready: checks.length === 0,
      issues: checks
    };
  },

  /**
   * Initialize production optimizations
   */
  initializeProduction: () => {
    const config = getEnvironmentConfig();

    if (config.performance.enableServiceWorker && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }

    if (config.performance.enableLazyLoading) {
      PerformanceOptimizer.preloadCriticalResources();
      PerformanceOptimizer.optimizeBundleLoading();
    }

    if (config.analytics.trackPerformance) {
      PerformanceOptimizer.monitorPerformance();
    }
  }
};

export default getEnvironmentConfig();
