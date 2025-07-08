export interface LoginCredentials {
  username?: string;
  email?: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    login: string;
    email?: string;
  };
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    id: string;
    login: string;
    email?: string;
  };
  loading: boolean;
  error: null | AuthError;
}
