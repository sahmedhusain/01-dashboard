
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { useAuth } from './contexts/authUtils';
import client from './graphql/client';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import Loading from './components/ui/Loading';
import ErrorBoundary from './components/ui/ErrorBoundary';
import ErrorFeedback from './components/feedback/ErrorFeedback';

// Import debug utilities in development
if (import.meta.env.DEV) {
  import('./utils/debugAuth');
}

// Main app component that handles authentication state
const AppContent: React.FC = () => {
  const { isAuthenticated, isInitialized } = useAuth();

  // Show loading while initializing auth state
  if (!isInitialized) {
    return <Loading fullScreen size="lg" text="Initializing..." />;
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Show dashboard if authenticated
  return <Dashboard />;
};

// Root app component with providers
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <AuthProvider>
          <DataProvider>
            <AppContent />
            <ErrorFeedback />
          </DataProvider>
        </AuthProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
};

export default App;
