import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContextProvider } from './theme/ThemeProvider';
import { apolloClient } from './lib/apollo-client';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EnhancedDashboard from './pages/EnhancedDashboard';
import { PageTransition } from './components/motion/MotionSystem';

import { ReactElement } from 'react';

interface ProtectedRouteProps {
  children: ReactElement;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeContextProvider>
        <Router>
          <AuthProvider>
            <Routes>
              <Route 
                path="/login" 
                element={
                  <PageTransition key="login">
                    <Login />
                  </PageTransition>
                } 
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <PageTransition key="dashboard">
                      <Dashboard />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/enhanced"
                element={
                  <ProtectedRoute>
                    <PageTransition key="enhanced">
                      <EnhancedDashboard />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeContextProvider>
    </ApolloProvider>
  );
}

export default App;
