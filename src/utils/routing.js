/**
 * Routing Utilities
 * Handles URL routing and tab synchronization for the dashboard
 */

import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import { routeAnalytics } from './routeAnalytics';

/**
 * Tab configuration with URL mappings
 */
export const TAB_CONFIG = [
  { id: 'profile', label: 'Profile', path: '/', icon: 'User' },
  { id: 'search', label: 'Search Queries', path: '/search', icon: 'Search' },
  { id: 'stats', label: 'Statistics', path: '/stats', icon: 'BarChart3' },
  { id: 'progress', label: 'Progress', path: '/progress', icon: 'TrendingUp' },
  { id: 'analytics', label: 'Analytics', path: '/analytics', icon: 'Users' },
  { id: 'achievements', label: 'Achievements', path: '/achievements', icon: 'Award' },
  { id: 'audits', label: 'Audits', path: '/audits', icon: 'Trophy' },
  { id: 'technologies', label: 'Technologies', path: '/technologies', icon: 'Users' },
];

/**
 * Get tab ID from current URL path
 * @param {string} pathname - Current URL pathname
 * @returns {string} Tab ID
 */
export const getTabFromPath = (pathname) => {
  const tab = TAB_CONFIG.find(tab => tab.path === pathname);
  return tab ? tab.id : 'profile'; // Default to profile
};

/**
 * Get URL path from tab ID
 * @param {string} tabId - Tab ID
 * @returns {string} URL path
 */
export const getPathFromTab = (tabId) => {
  const tab = TAB_CONFIG.find(tab => tab.id === tabId);
  return tab ? tab.path : '/'; // Default to home
};

/**
 * Enhanced custom hook for managing tab routing
 * Synchronizes URL with tab state bidirectionally with advanced features
 */
export const useTabRouting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocationRef = useRef(location.pathname);

  // Get current tab from URL
  const currentTab = getTabFromPath(location.pathname);

  // Track route changes for analytics
  useEffect(() => {
    const currentPath = location.pathname;
    const previousPath = previousLocationRef.current;

    if (currentPath !== previousPath) {
      routeAnalytics.trackNavigation(
        getTabFromPath(previousPath),
        getTabFromPath(currentPath),
        'url'
      );

      // Update navigation history
      NavigationHistory.push(currentPath);

      previousLocationRef.current = currentPath;
    }
  }, [location.pathname]);

  // Navigate to tab
  const navigateToTab = useCallback((tabId, method = 'programmatic') => {
    const path = getPathFromTab(tabId);

    // Track navigation analytics
    routeAnalytics.trackNavigation(currentTab, tabId, method);

    navigate(path);
  }, [navigate, currentTab]);

  // Navigate to tab with query parameters
  const navigateToTabWithParams = useCallback((tabId, params = {}, method = 'programmatic') => {
    const path = getPathFromTab(tabId);

    // Track navigation analytics
    routeAnalytics.trackNavigation(currentTab, tabId, method);

    QueryParams.setMultiple(navigate, path, params);
  }, [navigate, currentTab]);

  // Update query parameters for current tab
  const updateQueryParams = useCallback((params) => {
    QueryParams.setMultiple(navigate, location.pathname, params);
  }, [navigate, location.pathname]);

  // Update single query parameter
  const updateQueryParam = useCallback((key, value) => {
    QueryParams.updateSingle(navigate, location.pathname, location.search, key, value);
  }, [navigate, location.pathname, location.search]);

  // Clear all query parameters
  const clearQueryParams = useCallback(() => {
    QueryParams.clearAll(navigate, location.pathname);
  }, [navigate, location.pathname]);

  // Get current query parameters
  const getQueryParams = useCallback(() => {
    return QueryParams.getAll(location.search);
  }, [location.search]);

  // Get specific query parameter
  const getQueryParam = useCallback((key, defaultValue = null) => {
    const params = getQueryParams();
    return params[key] || defaultValue;
  }, [getQueryParams]);

  // Navigate back to previous page
  const navigateBack = useCallback(() => {
    const previousPath = NavigationHistory.getPrevious();
    navigate(previousPath);
  }, [navigate]);

  // Save current route state
  const saveRouteState = useCallback((state) => {
    RouteState.save(currentTab, state);
  }, [currentTab]);

  // Load route state
  const loadRouteState = useCallback(() => {
    return RouteState.load(currentTab);
  }, [currentTab]);

  return {
    // Basic navigation
    currentTab,
    navigateToTab,
    navigateToTabWithParams,
    navigateBack,

    // Query parameter management
    getQueryParams,
    getQueryParam,
    updateQueryParams,
    updateQueryParam,
    clearQueryParams,

    // Route state management
    saveRouteState,
    loadRouteState,

    // Location info
    pathname: location.pathname,
    search: location.search,

    // Utility functions
    isCurrentTab: (tabId) => currentTab === tabId,
    getTabConfig: () => TAB_CONFIG.find(tab => tab.id === currentTab),
    getAllTabs: () => TAB_CONFIG
  };
};

/**
 * Protected route wrapper for authenticated sections
 * @param {Object} props - Component props
 * @param {React.Component} props.children - Child components
 * @param {boolean} props.isAuthenticated - Authentication status
 * @param {React.Component} props.fallback - Fallback component for unauthenticated users
 */
export const ProtectedRoute = ({ children, isAuthenticated, fallback }) => {
  return isAuthenticated ? children : fallback;
};

/**
 * URL parameter utilities for section-specific routing
 */
export const URLParams = {
  // Audits section parameters
  audits: {
    setFilter: (filter) => ({ filter }),
    setSort: (sort) => ({ sort }),
    setPage: (page) => ({ page }),
  },
  
  // Search section parameters
  search: {
    setQuery: (q) => ({ q }),
    setType: (type) => ({ type }),
    setStatus: (status) => ({ status }),
    setCampus: (campus) => ({ campus }),
  },
  
  // Stats section parameters
  stats: {
    setTimeRange: (range) => ({ range }),
    setChart: (chart) => ({ chart }),
  },
  
  // Technologies section parameters
  technologies: {
    setCategory: (category) => ({ category }),
    setSort: (sort) => ({ sort }),
    setSearch: (search) => ({ search }),
  },
  
  // Profile section parameters
  profile: {
    setView: (view) => ({ view }),
    setSection: (section) => ({ section }),
  }
};

/**
 * Deep linking utilities for section-specific navigation
 */
export const DeepLinking = {
  // Generate shareable URL for current state
  generateShareableUrl: (tabId, state = {}) => {
    const path = getPathFromTab(tabId);
    const baseUrl = window.location.origin;
    const searchParams = new URLSearchParams(state);
    const queryString = searchParams.toString();
    return `${baseUrl}${path}${queryString ? `?${queryString}` : ''}`;
  },

  // Parse deep link and extract state
  parseDeepLink: (url) => {
    try {
      const urlObj = new URL(url);
      const tabId = getTabFromPath(urlObj.pathname);
      const state = Object.fromEntries(urlObj.searchParams);
      return { tabId, state, isValid: true };
    } catch {
      return { tabId: 'profile', state: {}, isValid: false };
    }
  },

  // Copy current URL to clipboard
  copyCurrentUrl: async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      return true;
    } catch {
      return false;
    }
  },

  // Generate section-specific deep links
  sections: {
    audits: {
      byFilter: (filter) => DeepLinking.generateShareableUrl('audits', { filter }),
      byGrade: (grade) => DeepLinking.generateShareableUrl('audits', { grade }),
      byDateRange: (startDate, endDate) => DeepLinking.generateShareableUrl('audits', {
        start: startDate,
        end: endDate
      })
    },

    search: {
      byQuery: (query) => DeepLinking.generateShareableUrl('search', { q: query }),
      byType: (type) => DeepLinking.generateShareableUrl('search', { type }),
      byFilters: (filters) => DeepLinking.generateShareableUrl('search', filters)
    },

    stats: {
      byTimeRange: (range) => DeepLinking.generateShareableUrl('stats', { range }),
      byChart: (chart) => DeepLinking.generateShareableUrl('stats', { chart })
    },

    technologies: {
      byCategory: (category) => DeepLinking.generateShareableUrl('technologies', { category }),
      bySkill: (skill) => DeepLinking.generateShareableUrl('technologies', { skill })
    }
  }
};

/**
 * Enhanced breadcrumb generation with deep linking support
 * @param {string} pathname - Current pathname
 * @param {Object} queryParams - Current query parameters
 * @returns {Array} Breadcrumb items
 */
export const generateBreadcrumbs = (pathname, queryParams = {}) => {
  const currentTab = getTabFromPath(pathname);
  const tabConfig = TAB_CONFIG.find(tab => tab.id === currentTab);

  const breadcrumbs = [
    { label: 'Dashboard', path: '/', isHome: true }
  ];

  if (tabConfig && tabConfig.id !== 'profile') {
    breadcrumbs.push({
      label: tabConfig.label,
      path: tabConfig.path,
      icon: tabConfig.icon
    });
  }

  // Add query-specific breadcrumbs based on section
  switch (currentTab) {
    case 'audits':
      if (queryParams.filter) {
        breadcrumbs.push({
          label: `Filter: ${queryParams.filter}`,
          path: `${pathname}?filter=${queryParams.filter}`,
          isFilter: true
        });
      }
      if (queryParams.grade) {
        breadcrumbs.push({
          label: `Grade: ${queryParams.grade}`,
          path: `${pathname}?grade=${queryParams.grade}`,
          isFilter: true
        });
      }
      break;

    case 'search':
      if (queryParams.q) {
        breadcrumbs.push({
          label: `Search: "${queryParams.q}"`,
          path: `${pathname}?q=${queryParams.q}`,
          isSearch: true
        });
      }
      break;

    case 'technologies':
      if (queryParams.category) {
        breadcrumbs.push({
          label: `Category: ${queryParams.category}`,
          path: `${pathname}?category=${queryParams.category}`,
          isFilter: true
        });
      }
      break;

    case 'stats':
      if (queryParams.range) {
        breadcrumbs.push({
          label: `Range: ${queryParams.range}`,
          path: `${pathname}?range=${queryParams.range}`,
          isFilter: true
        });
      }
      break;
  }

  return breadcrumbs;
};

/**
 * Enhanced query parameter management
 */
export const QueryParams = {
  // Get all query parameters as object
  getAll: (search) => {
    return Object.fromEntries(new URLSearchParams(search));
  },

  // Set multiple query parameters
  setMultiple: (navigate, pathname, params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.set(key, value);
      }
    });
    const queryString = searchParams.toString();
    navigate(`${pathname}${queryString ? `?${queryString}` : ''}`);
  },

  // Update single query parameter
  updateSingle: (navigate, pathname, search, key, value) => {
    const params = QueryParams.getAll(search);
    if (value === null || value === undefined || value === '') {
      delete params[key];
    } else {
      params[key] = value;
    }
    QueryParams.setMultiple(navigate, pathname, params);
  },

  // Clear all query parameters
  clearAll: (navigate, pathname) => {
    navigate(pathname);
  }
};

/**
 * Route state management for complex navigation
 */
export const RouteState = {
  // Save route state to session storage
  save: (routeId, state) => {
    const key = `route_state_${routeId}`;
    sessionStorage.setItem(key, JSON.stringify(state));
  },

  // Load route state from session storage
  load: (routeId) => {
    const key = `route_state_${routeId}`;
    try {
      return JSON.parse(sessionStorage.getItem(key) || '{}');
    } catch {
      return {};
    }
  },

  // Clear route state
  clear: (routeId) => {
    const key = `route_state_${routeId}`;
    sessionStorage.removeItem(key);
  },

  // Clear all route states
  clearAll: () => {
    Object.keys(sessionStorage)
      .filter(key => key.startsWith('route_state_'))
      .forEach(key => sessionStorage.removeItem(key));
  }
};

/**
 * Navigation history utilities
 */
export const NavigationHistory = {
  // Store navigation history in session storage
  push: (path) => {
    const history = NavigationHistory.get();
    history.push({
      path,
      timestamp: Date.now(),
      title: document.title
    });
    // Keep only last 20 entries
    if (history.length > 20) {
      history.shift();
    }
    sessionStorage.setItem('navigation_history', JSON.stringify(history));
  },

  // Get navigation history
  get: () => {
    try {
      return JSON.parse(sessionStorage.getItem('navigation_history') || '[]');
    } catch {
      return [];
    }
  },

  // Get previous path
  getPrevious: () => {
    const history = NavigationHistory.get();
    return history.length > 1 ? history[history.length - 2].path : '/';
  },

  // Get navigation breadcrumbs
  getBreadcrumbs: (maxItems = 5) => {
    const history = NavigationHistory.get();
    return history.slice(-maxItems).map(item => ({
      path: item.path,
      title: item.title || getTabFromPath(item.path),
      timestamp: item.timestamp
    }));
  },

  // Clear history
  clear: () => {
    sessionStorage.removeItem('navigation_history');
  }
};
