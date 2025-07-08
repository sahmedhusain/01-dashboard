import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthService } from '../config/auth.config';
import type { LoginCredentials, AuthState, AuthError } from '../types/auth';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

export const useAuth = () => {
  const [state, setState] = useState<AuthState>(initialState);
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const AuthService = getAuthService();
      const isAuthenticated = AuthService.isAuthenticated();
      if (isAuthenticated) {
        try {
          const token = AuthService.getToken();
          const user = AuthService.decodeToken(token!);
          setState({
            isAuthenticated: true,
            user: {
              id: user.id,
              login: user.login,
              email: user.email,
            },
            loading: false,
            error: null,
          });
        } catch (error) {
          setState({
            ...initialState,
            loading: false,
          });
        }
      } else {
        setState({
          ...initialState,
          loading: false,
        });
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setState((prev: AuthState) => ({ ...prev, loading: true, error: null }));
      const AuthService = getAuthService();
      const response = await AuthService.login(credentials);
      setState({
        isAuthenticated: true,
        user: response.user,
        loading: false,
        error: null,
      });
      navigate('/dashboard');
      return true;
    } catch (error) {
      const authError = error as AuthError;
      setState((prev: AuthState) => ({
        ...prev,
        loading: false,
        error: authError,
      }));
      return false;
    }
  }, [navigate]);

  const logout = useCallback(() => {
    const AuthService = getAuthService();
    AuthService.logout();
    setState({
      ...initialState,
      loading: false,
    });
    navigate('/login');
  }, [navigate]);

  return {
    ...state,
    login,
    logout,
  };
};
