import { AuthService } from '../services/auth.service';
import { LocalAuthService } from '../services/local-auth.service';
import { GraphQLAuthService } from '../services/graphql-auth.service';

// Configuration for authentication
export const AUTH_CONFIG = {
  // Set this to:
  // 'graphql' - use your local GraphQL backend (recommended)
  // 'local' - use your local REST backend 
  // 'external' - use reboot01 API
  authProvider: 'graphql' as 'graphql' | 'local' | 'external',
  
  // Backend URLs
  graphqlEndpoint: 'https://learn.reboot01.com/api/graphql-engine/v1/graphql',
  authEndpoint: 'https://learn.reboot01.com/api/auth/signin',
  externalBackendUrl: 'https://learn.reboot01.com'
};

// Get the appropriate auth service based on configuration
export const getAuthService = () => {
  switch (AUTH_CONFIG.authProvider) {
    case 'graphql':
      return GraphQLAuthService;
    case 'local':
      return LocalAuthService;
    case 'external':
    default:
      return AuthService;
  }
};

// Quick function to switch auth providers (for debugging)
export const switchAuthProvider = (provider: 'graphql' | 'local' | 'external') => {
  AUTH_CONFIG.authProvider = provider;
  console.log(`Switched to ${provider} authentication provider`);
};

// Make switch function available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).switchAuthProvider = switchAuthProvider;
}
