/**
 * URL State Management Hook
 * Provides easy URL state management for components
 */

import { useCallback } from 'react';
import { useTabRouting } from '../utils/routing';

/**
 * Hook for managing component state via URL parameters
 * @param {Object} defaultState - Default state values
 * @param {Object} options - Configuration options
 * @returns {Object} State management utilities
 */
interface UseUrlStateOptions {
  serialize?: (value: any) => string;
  deserialize?: (value: string) => any;
  prefix?: string;
  debounceMs?: number;
}

export const useUrlState = (defaultState: any = {}, options: UseUrlStateOptions = {}) => {
  const {
    getQueryParams,
    updateQueryParams,
    updateQueryParam: _updateQueryParam,
    clearQueryParams: _clearQueryParams
  } = useTabRouting();

  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    prefix = '',
    debounceMs: _debounceMs = 300
  } = options;

  const getCurrentState = useCallback(() => {
    const queryParams = getQueryParams();
    const state = { ...defaultState };

    Object.keys(defaultState).forEach(key => {
      const urlKey = prefix ? `${prefix}_${key}` : key;
      if (queryParams[urlKey] !== undefined) {
        try {
          // Try to deserialize complex values
          if (typeof defaultState[key] === 'object') {
            state[key] = deserialize(queryParams[urlKey]);
          } else {
            const value = queryParams[urlKey];
            if (typeof defaultState[key] === 'boolean') {
              state[key] = value === 'true';
            } else if (typeof defaultState[key] === 'number') {
              state[key] = Number(value);
            } else {
              state[key] = value;
            }
          }
        } catch {
          // Keep default value if parsing fails
          state[key] = defaultState[key];
        }
      }
    });

    return state;
  }, [getQueryParams, defaultState, prefix, deserialize]);

  // Update state in URL
  const updateState = useCallback((newState) => {
    const currentParams = getQueryParams();
    const updatedParams = { ...currentParams };

    Object.entries(newState).forEach(([key, value]) => {
      const urlKey = prefix ? `${prefix}_${key}` : key;
      
      if (value === defaultState[key] || value === null || value === undefined) {
        // Remove parameter if it's the default value
        delete updatedParams[urlKey];
      } else {
        // Serialize complex values
        if (typeof value === 'object') {
          updatedParams[urlKey] = serialize(value);
        } else {
          updatedParams[urlKey] = String(value);
        }
      }
    });

    updateQueryParams(updatedParams);
  }, [getQueryParams, updateQueryParams, defaultState, prefix, serialize]);

  // Update single state value
  const updateStateValue = useCallback((key, value) => {
    updateState({ [key]: value });
  }, [updateState]);

  // Reset state to defaults
  const resetState = useCallback(() => {
    const currentParams = getQueryParams();
    const updatedParams = { ...currentParams };

    // Remove all prefixed parameters
    Object.keys(defaultState).forEach(key => {
      const urlKey = prefix ? `${prefix}_${key}` : key;
      delete updatedParams[urlKey];
    });

    updateQueryParams(updatedParams);
  }, [getQueryParams, updateQueryParams, defaultState, prefix]);

  return {
    state: getCurrentState(),
    updateState,
    updateStateValue,
    resetState,
    
    // Utility functions
    hasChanges: () => {
      const current = getCurrentState();
      return JSON.stringify(current) !== JSON.stringify(defaultState);
    },
    
    getStateAsUrl: () => {
      const current = getCurrentState();
      const params = new URLSearchParams();
      
      Object.entries(current).forEach(([key, value]) => {
        if (value !== defaultState[key]) {
          const urlKey = prefix ? `${prefix}_${key}` : key;
          if (typeof value === 'object') {
            params.set(urlKey, serialize(value));
          } else {
            params.set(urlKey, String(value));
          }
        }
      });
      
      return params.toString();
    }
  };
};

/**
 * Specialized hooks for common URL state patterns
 */

export const useUrlPagination = (defaultPage = 1, defaultPageSize = 10) => {
  return useUrlState(
    { page: defaultPage, pageSize: defaultPageSize },
    { prefix: 'pg' }
  );
};

export const useUrlFilters = (defaultFilters = {}) => {
  return useUrlState(defaultFilters, { prefix: 'filter' });
};

export const useUrlSearch = (defaultQuery = '', defaultFilters = {}) => {
  return useUrlState(
    { query: defaultQuery, ...defaultFilters },
    { prefix: 'search' }
  );
};

export const useUrlSorting = (defaultSort = 'name', defaultOrder = 'asc') => {
  return useUrlState(
    { sortBy: defaultSort, sortOrder: defaultOrder },
    { prefix: 'sort' }
  );
};

export const useUrlView = (defaultView = 'list') => {
  return useUrlState({ view: defaultView }, { prefix: 'view' });
};

/**
 * Combined hook for common component patterns
 */
interface ComponentStateConfig {
  pagination?: { page: number; pageSize: number };
  filters?: Record<string, any>;
  search?: { query: string };
  sorting?: { sortBy: string; sortOrder: string };
  view?: { view: string };
}

export const useUrlComponentState = (config: ComponentStateConfig = {}) => {
  const {
    pagination = { page: 1, pageSize: 10 },
    filters = {},
    search = { query: '' },
    sorting = { sortBy: 'name', sortOrder: 'asc' },
    view = { view: 'list' }
  } = config;

  const paginationState = useUrlPagination(pagination.page, pagination.pageSize);
  const filtersState = useUrlFilters(filters);
  const searchState = useUrlSearch(search.query, search);
  const sortingState = useUrlSorting(sorting.sortBy, sorting.sortOrder);
  const viewState = useUrlView(view.view);

  return {
    pagination: paginationState,
    filters: filtersState,
    search: searchState,
    sorting: sortingState,
    view: viewState,
    
    // Reset all states
    resetAll: () => {
      paginationState.resetState();
      filtersState.resetState();
      searchState.resetState();
      sortingState.resetState();
      viewState.resetState();
    },
    
    // Check if any state has changes
    hasAnyChanges: () => {
      return paginationState.hasChanges() ||
             filtersState.hasChanges() ||
             searchState.hasChanges() ||
             sortingState.hasChanges() ||
             viewState.hasChanges();
    }
  };
};
