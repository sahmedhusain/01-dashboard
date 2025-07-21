/**
 * Environment variables with fallbacks
 */
const getEnvVar = (key: string, fallback: string = ''): string => {
  return import.meta.env[key] || fallback;
};

const getEnvNumber = (key: string, fallback: number): number => {
  const value = import.meta.env[key];
  return value ? parseInt(value, 10) : fallback;
};

const getEnvBoolean = (key: string, fallback: boolean): boolean => {
  const value = import.meta.env[key];
  return value ? value.toLowerCase() === 'true' : fallback;
};

/**
 * API Configuration - Dynamic based on environment
 */
export const API_CONFIG = {
  // Base URLs - configurable via environment variables
  baseURL: getEnvVar('VITE_API_BASE_URL', 'https://learn.reboot01.com/api'),
  graphqlEndpoint: getEnvVar('VITE_GRAPHQL_ENDPOINT', 'https://learn.reboot01.com/api/graphql-engine/v1/graphql'),
  authEndpoint: getEnvVar('VITE_AUTH_ENDPOINT', 'https://learn.reboot01.com/api/auth/signin'),
  
  // Timeouts and retries - configurable
  timeout: getEnvNumber('VITE_API_TIMEOUT', 30000),
  retryAttempts: getEnvNumber('VITE_API_RETRY_ATTEMPTS', 3),
  retryDelay: getEnvNumber('VITE_API_RETRY_DELAY', 1000),
  
  // Headers
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

/**
 * Authentication Configuration - Dynamic
 */
export const AUTH_CONFIG = {
  // Storage keys - configurable
  tokenKey: getEnvVar('VITE_AUTH_TOKEN_KEY', 'auth_token'),
  userKey: getEnvVar('VITE_AUTH_USER_KEY', 'auth_user'),
  refreshTokenKey: getEnvVar('VITE_AUTH_REFRESH_TOKEN_KEY', 'refresh_token'),
  
  // Token settings
  tokenExpiry: getEnvNumber('VITE_AUTH_TOKEN_EXPIRY', 24 * 60 * 60 * 1000), // 24 hours
  autoRefresh: getEnvBoolean('VITE_AUTH_AUTO_REFRESH', true),
  
  // Session settings
  sessionTimeout: getEnvNumber('VITE_AUTH_SESSION_TIMEOUT', 30 * 60 * 1000), // 30 minutes
  rememberMeDuration: getEnvNumber('VITE_AUTH_REMEMBER_DURATION', 30 * 24 * 60 * 60 * 1000), // 30 days
};

/**
 * Cache Configuration - Dynamic
 */
export const CACHE_CONFIG = {
  // Enable/disable caching
  enabled: getEnvBoolean('VITE_CACHE_ENABLED', true),
  
  // Cache durations (milliseconds) - configurable
  durations: {
    userData: getEnvNumber('VITE_CACHE_USER_DATA', 5 * 60 * 1000),      // 5 minutes
    statistics: getEnvNumber('VITE_CACHE_STATISTICS', 10 * 60 * 1000),   // 10 minutes
    analytics: getEnvNumber('VITE_CACHE_ANALYTICS', 15 * 60 * 1000),     // 15 minutes
    charts: getEnvNumber('VITE_CACHE_CHARTS', 20 * 60 * 1000),          // 20 minutes
    achievements: getEnvNumber('VITE_CACHE_ACHIEVEMENTS', 30 * 60 * 1000), // 30 minutes
  },
  
  // Cache limits - configurable
  maxEntries: getEnvNumber('VITE_CACHE_MAX_ENTRIES', 100),
  maxMemoryMB: getEnvNumber('VITE_CACHE_MAX_MEMORY_MB', 50),
  
  // Cache keys - dynamic based on user
  getKey: (type: string, userId?: string | number) => {
    const userSuffix = userId ? `_${userId}` : '';
    return `${type}${userSuffix}`;
  }
};

/**
 * UI Configuration - Dynamic theming and sizing
 */
export const UI_CONFIG = {
  // Theme colors - configurable
  theme: {
    primary: getEnvVar('VITE_THEME_PRIMARY', '#14b8a6'),
    secondary: getEnvVar('VITE_THEME_SECONDARY', '#64748b'),
    accent: getEnvVar('VITE_THEME_ACCENT', '#d946ef'),
    background: getEnvVar('VITE_THEME_BACKGROUND', '#0f172a'),
    surface: getEnvVar('VITE_THEME_SURFACE', '#1e293b'),
  },
  
  // Component sizes - configurable
  sizes: {
    avatar: {
      xs: getEnvVar('VITE_SIZE_AVATAR_XS', 'w-6 h-6'),
      sm: getEnvVar('VITE_SIZE_AVATAR_SM', 'w-8 h-8'),
      md: getEnvVar('VITE_SIZE_AVATAR_MD', 'w-12 h-12'),
      lg: getEnvVar('VITE_SIZE_AVATAR_LG', 'w-16 h-16'),
      xl: getEnvVar('VITE_SIZE_AVATAR_XL', 'w-24 h-24'),
      '2xl': getEnvVar('VITE_SIZE_AVATAR_2XL', 'w-32 h-32'),
    },
    avatarIcon: {
      xs: getEnvVar('VITE_SIZE_AVATAR_ICON_XS', 'w-3 h-3'),
      sm: getEnvVar('VITE_SIZE_AVATAR_ICON_SM', 'w-4 h-4'),
      md: getEnvVar('VITE_SIZE_AVATAR_ICON_MD', 'w-6 h-6'),
      lg: getEnvVar('VITE_SIZE_AVATAR_ICON_LG', 'w-8 h-8'),
      xl: getEnvVar('VITE_SIZE_AVATAR_ICON_XL', 'w-12 h-12'),
      '2xl': getEnvVar('VITE_SIZE_AVATAR_ICON_2XL', 'w-16 h-16'),
    },
    avatarStatus: {
      xs: getEnvVar('VITE_SIZE_AVATAR_STATUS_XS', 'w-2 h-2'),
      sm: getEnvVar('VITE_SIZE_AVATAR_STATUS_SM', 'w-2 h-2'),
      md: getEnvVar('VITE_SIZE_AVATAR_STATUS_MD', 'w-3 h-3'),
      lg: getEnvVar('VITE_SIZE_AVATAR_STATUS_LG', 'w-4 h-4'),
      xl: getEnvVar('VITE_SIZE_AVATAR_STATUS_XL', 'w-5 h-5'),
      '2xl': getEnvVar('VITE_SIZE_AVATAR_STATUS_2XL', 'w-6 h-6'),
    },
    button: {
      sm: getEnvVar('VITE_SIZE_BUTTON_SM', 'px-3 py-1.5 text-sm rounded-md'),
      md: getEnvVar('VITE_SIZE_BUTTON_MD', 'px-4 py-2 text-sm rounded-lg'),
      lg: getEnvVar('VITE_SIZE_BUTTON_LG', 'px-6 py-3 text-base rounded-lg'),
      xl: getEnvVar('VITE_SIZE_BUTTON_XL', 'px-8 py-4 text-lg rounded-xl'),
    }
  },
  
  // Animation settings - configurable
  animations: {
    enabled: getEnvBoolean('VITE_ANIMATIONS_ENABLED', true),
    duration: getEnvNumber('VITE_ANIMATION_DURATION', 200),
    easing: getEnvVar('VITE_ANIMATION_EASING', 'ease-out'),
  },
  
  // Layout settings
  layout: {
    maxWidth: getEnvVar('VITE_LAYOUT_MAX_WIDTH', '1200px'),
    sidebarWidth: getEnvVar('VITE_LAYOUT_SIDEBAR_WIDTH', '280px'),
    headerHeight: getEnvVar('VITE_LAYOUT_HEADER_HEIGHT', '64px'),
  }
};

/**
 * Performance Configuration - Dynamic
 */
export const PERFORMANCE_CONFIG = {
  // Bundle settings
  chunkSizeWarning: getEnvNumber('VITE_CHUNK_SIZE_WARNING', 500000), // 500KB
  bundleSizeWarning: getEnvNumber('VITE_BUNDLE_SIZE_WARNING', 2000000), // 2MB
  
  // Loading settings
  enableLazyLoading: getEnvBoolean('VITE_LAZY_LOADING', true),
  enableServiceWorker: getEnvBoolean('VITE_SERVICE_WORKER', true),
  enableCompression: getEnvBoolean('VITE_COMPRESSION', true),
  
  // Query settings
  defaultPageSize: getEnvNumber('VITE_DEFAULT_PAGE_SIZE', 20),
  maxPageSize: getEnvNumber('VITE_MAX_PAGE_SIZE', 100),
  queryTimeout: getEnvNumber('VITE_QUERY_TIMEOUT', 10000),
};

/**
 * Feature Flags - Dynamic feature enabling/disabling
 */
export const FEATURE_FLAGS = {
  // Core features
  enableAdvancedCharts: getEnvBoolean('VITE_FEATURE_ADVANCED_CHARTS', true),
  enableRealTimeUpdates: getEnvBoolean('VITE_FEATURE_REALTIME_UPDATES', false),
  enableOfflineMode: getEnvBoolean('VITE_FEATURE_OFFLINE_MODE', false),
  enablePWA: getEnvBoolean('VITE_FEATURE_PWA', true),
  
  // Analytics features
  enableAnalytics: getEnvBoolean('VITE_FEATURE_ANALYTICS', true),
  enableErrorTracking: getEnvBoolean('VITE_FEATURE_ERROR_TRACKING', true),
  enablePerformanceTracking: getEnvBoolean('VITE_FEATURE_PERFORMANCE_TRACKING', true),
  enableUserTracking: getEnvBoolean('VITE_FEATURE_USER_TRACKING', false),
  
  // UI features
  enableDarkMode: getEnvBoolean('VITE_FEATURE_DARK_MODE', true),
  enableAnimations: getEnvBoolean('VITE_FEATURE_ANIMATIONS', true),
  enableNotifications: getEnvBoolean('VITE_FEATURE_NOTIFICATIONS', true),
  enableKeyboardShortcuts: getEnvBoolean('VITE_FEATURE_KEYBOARD_SHORTCUTS', true),
};

/**
 * Security Configuration - Dynamic
 */
export const SECURITY_CONFIG = {
  // CSP settings
  enableCSP: getEnvBoolean('VITE_SECURITY_CSP', true),
  enableHTTPS: getEnvBoolean('VITE_SECURITY_HTTPS', true),
  enableHSTS: getEnvBoolean('VITE_SECURITY_HSTS', true),
  enableXSSProtection: getEnvBoolean('VITE_SECURITY_XSS_PROTECTION', true),
  
  // Content security policy - configurable
  cspDirectives: {
    defaultSrc: getEnvVar('VITE_CSP_DEFAULT_SRC', "'self'"),
    scriptSrc: getEnvVar('VITE_CSP_SCRIPT_SRC', "'self' 'unsafe-inline' 'unsafe-eval'"),
    styleSrc: getEnvVar('VITE_CSP_STYLE_SRC', "'self' 'unsafe-inline'"),
    imgSrc: getEnvVar('VITE_CSP_IMG_SRC', "'self' data: https:"),
    connectSrc: getEnvVar('VITE_CSP_CONNECT_SRC', "'self' https://learn.reboot01.com"),
  }
};

/**
 * Application Metadata - Dynamic
 */
export const APP_CONFIG = {
  // App info - configurable
  name: getEnvVar('VITE_APP_NAME', 'Student Dashboard'),
  shortName: getEnvVar('VITE_APP_SHORT_NAME', 'Dashboard'),
  description: getEnvVar('VITE_APP_DESCRIPTION', 'Professional student analytics dashboard'),
  version: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  
  // PWA settings
  startUrl: getEnvVar('VITE_APP_START_URL', '/'),
  display: getEnvVar('VITE_APP_DISPLAY', 'standalone'),
  backgroundColor: getEnvVar('VITE_APP_BACKGROUND_COLOR', '#0f172a'),
  themeColor: getEnvVar('VITE_APP_THEME_COLOR', '#14b8a6'),
  
  // Contact info
  supportEmail: getEnvVar('VITE_SUPPORT_EMAIL', 'support@example.com'),
  documentationUrl: getEnvVar('VITE_DOCS_URL', 'https://docs.example.com'),
};

/**
 * Avatar Configuration - Dynamic URL patterns
 */
export const AVATAR_CONFIG = {
  // Storage providers - configurable
  providers: {
    backblaze: {
      baseUrl: getEnvVar('VITE_AVATAR_BACKBLAZE_URL', 'https://f002.backblazeb2.com/file/01-edu-system'),
      apiUrl: getEnvVar('VITE_AVATAR_BACKBLAZE_API', 'https://f002.backblazeb2.com/b2api/v1/b2_download_file_by_id'),
    },
    github: {
      baseUrl: getEnvVar('VITE_AVATAR_GITHUB_URL', 'https://github.com'),
      size: getEnvNumber('VITE_AVATAR_GITHUB_SIZE', 128),
    },
    gravatar: {
      baseUrl: getEnvVar('VITE_AVATAR_GRAVATAR_URL', 'https://www.gravatar.com/avatar'),
      defaultImage: getEnvVar('VITE_AVATAR_GRAVATAR_DEFAULT', 'identicon'),
    }
  },
  
  // Fallback settings
  enableFallbacks: getEnvBoolean('VITE_AVATAR_FALLBACKS', true),
  fallbackToInitials: getEnvBoolean('VITE_AVATAR_FALLBACK_INITIALS', true),
  fallbackToGithub: getEnvBoolean('VITE_AVATAR_FALLBACK_GITHUB', true),
};

/**
 * Development Configuration - Only active in development
 */
export const DEV_CONFIG = {
  // Debug settings
  enableDebugLogs: getEnvBoolean('VITE_DEBUG_LOGS', import.meta.env.DEV),
  enablePerformanceLogs: getEnvBoolean('VITE_DEBUG_PERFORMANCE', import.meta.env.DEV),
  enableGraphQLLogs: getEnvBoolean('VITE_DEBUG_GRAPHQL', import.meta.env.DEV),
  
  // Mock settings
  enableMockData: getEnvBoolean('VITE_MOCK_DATA', false),
  mockDelay: getEnvNumber('VITE_MOCK_DELAY', 1000),
  
  // Hot reload
  enableHotReload: getEnvBoolean('VITE_HOT_RELOAD', import.meta.env.DEV),
};

/**
 * Get environment-specific configuration
 */
export const getEnvironmentConfig = () => {
  const env = import.meta.env.MODE;
  
  return {
    environment: env,
    isDevelopment: env === 'development',
    isProduction: env === 'production',
    isStaging: env === 'staging',
    
    // Merge all configurations
    api: API_CONFIG,
    auth: AUTH_CONFIG,
    cache: CACHE_CONFIG,
    ui: UI_CONFIG,
    performance: PERFORMANCE_CONFIG,
    features: FEATURE_FLAGS,
    security: SECURITY_CONFIG,
    app: APP_CONFIG,
    avatar: AVATAR_CONFIG,
    dev: DEV_CONFIG,
  };
};

/**
 * Default export - complete configuration
 */
export default getEnvironmentConfig();
