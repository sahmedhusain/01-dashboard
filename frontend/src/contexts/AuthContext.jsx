import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  authenticateUser,
  storeAuthData,
  getStoredToken,
  getStoredUser,
  isAuthenticated,
  clearAuthData,
} from '../utils/auth';

// Auth action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  RESTORE_SESSION: 'RESTORE_SESSION',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Initial auth state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isInitialized: false,
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        isInitialized: true,
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error,
        isInitialized: true,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        isInitialized: true,
      };

    case AUTH_ACTIONS.RESTORE_SESSION:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Create auth context
const AuthContext = createContext(null);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session on app load
  useEffect(() => {
    const restoreSession = () => {
      try {
        const token = getStoredToken();
        const user = getStoredUser();

        if (token && user && isAuthenticated()) {
          dispatch({
            type: AUTH_ACTIONS.RESTORE_SESSION,
            payload: {
              user,
              token,
              isAuthenticated: true,
            },
          });
        } else {
          // Clear invalid session data
          clearAuthData();
          dispatch({
            type: AUTH_ACTIONS.RESTORE_SESSION,
            payload: {
              user: null,
              token: null,
              isAuthenticated: false,
            },
          });
        }
      } catch (error) {
        console.warn('Session restoration error:', error.message);
        // Clear potentially corrupted data
        clearAuthData();
        dispatch({
          type: AUTH_ACTIONS.RESTORE_SESSION,
          payload: {
            user: null,
            token: null,
            isAuthenticated: false,
          },
        });
      }
    };

    restoreSession();
  }, []);

  // Login function
  const login = async (identifier, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      const { token, user } = await authenticateUser(identifier, password);
      
      // Store auth data
      storeAuthData(token, user);

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user, token },
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: { error: error.message },
      });

      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    clearAuthData();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Context value
  const value = {
    // State
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    isInitialized: state.isInitialized,

    // Actions
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// HOC for protected routes
export const withAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, isInitialized } = useAuth();

    if (!isInitialized) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <LoginPage />;
    }

    return <Component {...props} />;
  };
};

export default AuthContext;
