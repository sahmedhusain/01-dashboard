
import { useCallback } from 'react';
import { useTabRouting } from '../utils/routing';

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
          
          state[key] = defaultState[key];
        }
      }
    });

    return state;
  }, [getQueryParams, defaultState, prefix, deserialize]);

  
  const updateState = useCallback((newState) => {
    const currentParams = getQueryParams();
    const updatedParams = { ...currentParams };

    Object.entries(newState).forEach(([key, value]) => {
      const urlKey = prefix ? `${prefix}_${key}` : key;
      
      if (value === defaultState[key] || value === null || value === undefined) {
        
        delete updatedParams[urlKey];
      } else {
        
        if (typeof value === 'object') {
          updatedParams[urlKey] = serialize(value);
        } else {
          updatedParams[urlKey] = String(value);
        }
      }
    });

    updateQueryParams(updatedParams);
  }, [getQueryParams, updateQueryParams, defaultState, prefix, serialize]);

  
  const updateStateValue = useCallback((key, value) => {
    updateState({ [key]: value });
  }, [updateState]);

  
  const resetState = useCallback(() => {
    const currentParams = getQueryParams();
    const updatedParams = { ...currentParams };

    
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
    
    
    resetAll: () => {
      paginationState.resetState();
      filtersState.resetState();
      searchState.resetState();
      sortingState.resetState();
      viewState.resetState();
    },
    
    
    hasAnyChanges: () => {
      return paginationState.hasChanges() ||
             filtersState.hasChanges() ||
             searchState.hasChanges() ||
             sortingState.hasChanges() ||
             viewState.hasChanges();
    }
  };
};
