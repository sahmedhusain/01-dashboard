import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContextProvider } from './theme/ThemeProvider';
import { apolloClient } from './lib/apollo-client';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EnhancedDashboard from './pages/EnhancedDashboard';
import EnhancedMD3Dashboard from './pages/EnhancedMD3Dashboard';
import AdvancedSearch from './pages/AdvancedSearch';
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
        <Router future={{ 
          v7_startTransition: true,
          v7_relativeSplatPath: true 
        }}>
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
              <Route
                path="/md3"
                element={
                  <ProtectedRoute>
                    <PageTransition key="md3">
                      <EnhancedMD3Dashboard />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <PageTransition key="search">
                      <AdvancedSearch />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/md3" replace />} />
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeContextProvider>
    </ApolloProvider>
  );
}

export default App;
