import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import client from './graphql/client';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import Loading from './components/ui/Loading';
import ErrorBoundary from './components/ui/ErrorBoundary';

// Main app component that handles authentication state
const AppContent = () => {
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
function App() {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default App;
