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

export const API_CONFIG = {
  
  baseURL: getEnvVar('VITE_API_BASE_URL', 'https://learn.reboot01.com'),
  graphqlEndpoint: getEnvVar('VITE_GRAPHQL_ENDPOINT', 'https://learn.reboot01.com/api/graphql-engine/v1/graphql'),
  authEndpoint: getEnvVar('VITE_AUTH_ENDPOINT', 'https://learn.reboot01.com/api/auth/signin'),
  
  timeout: getEnvNumber('VITE_API_TIMEOUT', 30000),
  retryAttempts: getEnvNumber('VITE_API_RETRY_ATTEMPTS', 3),
  retryDelay: getEnvNumber('VITE_API_RETRY_DELAY', 1000),
  
  
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

export const AUTH_CONFIG = {
  
  tokenKey: getEnvVar('VITE_AUTH_TOKEN_KEY', 'auth_token'),
  userKey: getEnvVar('VITE_AUTH_USER_KEY', 'auth_user'),
  refreshTokenKey: getEnvVar('VITE_AUTH_REFRESH_TOKEN_KEY', 'refresh_token'),
  
  
  tokenExpiry: getEnvNumber('VITE_AUTH_TOKEN_EXPIRY', 24 * 60 * 60 * 1000), 
  autoRefresh: getEnvBoolean('VITE_AUTH_AUTO_REFRESH', true),
  
  
  sessionTimeout: getEnvNumber('VITE_AUTH_SESSION_TIMEOUT', 30 * 60 * 1000), 
  rememberMeDuration: getEnvNumber('VITE_AUTH_REMEMBER_DURATION', 30 * 24 * 60 * 60 * 1000), 
};

export const CACHE_CONFIG = {
  
  enabled: getEnvBoolean('VITE_CACHE_ENABLED', true),
  
  
  durations: {
    userData: getEnvNumber('VITE_CACHE_USER_DATA', 5 * 60 * 1000),      
    statistics: getEnvNumber('VITE_CACHE_STATISTICS', 10 * 60 * 1000),   
    analytics: getEnvNumber('VITE_CACHE_ANALYTICS', 15 * 60 * 1000),     
    charts: getEnvNumber('VITE_CACHE_CHARTS', 20 * 60 * 1000),          
    achievements: getEnvNumber('VITE_CACHE_ACHIEVEMENTS', 30 * 60 * 1000), 
  },
  
  
  maxEntries: getEnvNumber('VITE_CACHE_MAX_ENTRIES', 100),
  maxMemoryMB: getEnvNumber('VITE_CACHE_MAX_MEMORY_MB', 50),
  
  
  getKey: (type: string, userId?: string | number) => {
    const userSuffix = userId ? `_${userId}` : '';
    return `${type}${userSuffix}`;
  }
};

export const UI_CONFIG = {
  
  theme: {
    primary: getEnvVar('VITE_THEME_PRIMARY', '#14b8a6'),
    secondary: getEnvVar('VITE_THEME_SECONDARY', '#64748b'),
    accent: getEnvVar('VITE_THEME_ACCENT', '#d946ef'),
    background: getEnvVar('VITE_THEME_BACKGROUND', '#0f172a'),
    surface: getEnvVar('VITE_THEME_SURFACE', '#1e293b'),
  },
  
  
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
  
  
  animations: {
    enabled: getEnvBoolean('VITE_ANIMATIONS_ENABLED', true),
    duration: getEnvNumber('VITE_ANIMATION_DURATION', 200),
    easing: getEnvVar('VITE_ANIMATION_EASING', 'ease-out'),
  },
  
  
  layout: {
    maxWidth: getEnvVar('VITE_LAYOUT_MAX_WIDTH', '1200px'),
    sidebarWidth: getEnvVar('VITE_LAYOUT_SIDEBAR_WIDTH', '280px'),
    headerHeight: getEnvVar('VITE_LAYOUT_HEADER_HEIGHT', '64px'),
  }
};

export const PERFORMANCE_CONFIG = {
  
  chunkSizeWarning: getEnvNumber('VITE_CHUNK_SIZE_WARNING', 500000), 
  bundleSizeWarning: getEnvNumber('VITE_BUNDLE_SIZE_WARNING', 2000000), 
  
  
  enableLazyLoading: getEnvBoolean('VITE_LAZY_LOADING', true),
  enableServiceWorker: getEnvBoolean('VITE_SERVICE_WORKER', true),
  enableCompression: getEnvBoolean('VITE_COMPRESSION', true),
  
  
  defaultPageSize: getEnvNumber('VITE_DEFAULT_PAGE_SIZE', 20),
  maxPageSize: getEnvNumber('VITE_MAX_PAGE_SIZE', 100),
  queryTimeout: getEnvNumber('VITE_QUERY_TIMEOUT', 10000),
};

export const FEATURE_FLAGS = {
  enableAdvancedCharts: getEnvBoolean('VITE_FEATURE_ADVANCED_CHARTS', true),
  enableRealTimeUpdates: getEnvBoolean('VITE_FEATURE_REALTIME_UPDATES', false),
  enableOfflineMode: getEnvBoolean('VITE_FEATURE_OFFLINE_MODE', false),
  enablePWA: getEnvBoolean('VITE_FEATURE_PWA', true),
  enableAnalytics: getEnvBoolean('VITE_FEATURE_ANALYTICS', true),
  enableDarkMode: getEnvBoolean('VITE_FEATURE_DARK_MODE', true),
  enableAnimations: getEnvBoolean('VITE_FEATURE_ANIMATIONS', true),
  enableKeyboardShortcuts: getEnvBoolean('VITE_FEATURE_KEYBOARD_SHORTCUTS', true),
};

export const SECURITY_CONFIG = {
  
  enableCSP: getEnvBoolean('VITE_SECURITY_CSP', true),
  enableHTTPS: getEnvBoolean('VITE_SECURITY_HTTPS', true),
  enableHSTS: getEnvBoolean('VITE_SECURITY_HSTS', true),
  enableXSSProtection: getEnvBoolean('VITE_SECURITY_XSS_PROTECTION', true),
  
  
  cspDirectives: {
    defaultSrc: getEnvVar('VITE_CSP_DEFAULT_SRC', "'self'"),
    scriptSrc: getEnvVar('VITE_CSP_SCRIPT_SRC', "'self' 'unsafe-inline' 'unsafe-eval'"),
    styleSrc: getEnvVar('VITE_CSP_STYLE_SRC', "'self' 'unsafe-inline'"),
    imgSrc: getEnvVar('VITE_CSP_IMG_SRC', "'self' data: https:"),
    connectSrc: getEnvVar('VITE_CSP_CONNECT_SRC', "'self' https://learn.reboot01.com"),
  }
};

export const APP_CONFIG = {
  
  name: getEnvVar('VITE_APP_NAME', 'Student Dashboard'),
  shortName: getEnvVar('VITE_APP_SHORT_NAME', 'Dashboard'),
  description: getEnvVar('VITE_APP_DESCRIPTION', 'Professional student analytics dashboard'),
  version: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  
  
  startUrl: getEnvVar('VITE_APP_START_URL', '/'),
  display: getEnvVar('VITE_APP_DISPLAY', 'standalone'),
  backgroundColor: getEnvVar('VITE_APP_BACKGROUND_COLOR', '#0f172a'),
  themeColor: getEnvVar('VITE_APP_THEME_COLOR', '#14b8a6'),
  
  
  supportEmail: getEnvVar('VITE_SUPPORT_EMAIL', 'support@example.com'),
  documentationUrl: getEnvVar('VITE_DOCS_URL', 'https://docs.example.com'),
};

export const AVATAR_CONFIG = {
  
  providers: {
    backblaze: {
      baseUrl: getEnvVar('VITE_AVATAR_BACKBLAZE_URL', 'https://f005.backblazeb2.com'),
      apiUrl: getEnvVar('VITE_AVATAR_BACKBLAZE_API', 'https://api005.backblazeb2.com'),
    },
    github: {
      baseUrl: getEnvVar('VITE_AVATAR_GITHUB_URL', 'https://avatars.githubusercontent.com'),
      size: getEnvNumber('VITE_AVATAR_GITHUB_SIZE', 128),
    },
    gravatar: {
      baseUrl: getEnvVar('VITE_AVATAR_GRAVATAR_URL', 'https://www.gravatar.com/avatar'),
      defaultImage: getEnvVar('VITE_AVATAR_GRAVATAR_DEFAULT', 'identicon'),
    }
  },
  
  
  enableFallbacks: getEnvBoolean('VITE_AVATAR_FALLBACKS', true),
  fallbackToInitials: getEnvBoolean('VITE_AVATAR_FALLBACK_INITIALS', true),
  fallbackToGithub: getEnvBoolean('VITE_AVATAR_FALLBACK_GITHUB', true),
};

export const DEV_CONFIG = {
  enableMockData: getEnvBoolean('VITE_MOCK_DATA', false),
  mockDelay: getEnvNumber('VITE_MOCK_DELAY', 1000),
  enableHotReload: getEnvBoolean('VITE_HOT_RELOAD', import.meta.env.DEV),
};

export const getEnvironmentConfig = () => {
  const env = import.meta.env.MODE;
  
  return {
    environment: env,
    isDevelopment: env === 'development',
    isProduction: env === 'production',
    isStaging: env === 'staging',
    
    
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

export default getEnvironmentConfig();
