import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import client from './graphql/client'
import { UserProvider } from './contexts/UserContext';
import { RefreshProvider } from './contexts/RefreshContext'
import { LoginPage, DashboardPage, ProfilePage, NotFoundPage } from './pages'
import { useIsAuthenticated, useLogin, useSetLoading } from './store'
import { getStoredAuthData, fetchUserData } from './utils/auth'
import LoadingSpinner from './components/ui/LoadingSpinner'
import ErrorBoundary from './components/ErrorBoundary'

const AppContent: React.FC = () => {
  const isAuthenticated = useIsAuthenticated()
  const login = useLogin()
  const setLoading = useSetLoading()
  const [isInitializing, setIsInitializing] = React.useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true)
      try {
        const storedData = getStoredAuthData()
        if (storedData.user && storedData.token) {
          // Check if user data is complete (has login field)
          if (storedData.user.login) {
            // User data is complete, use it directly
            login(storedData.user, storedData.token)
          } else if (storedData.user.id && !storedData.token.startsWith('mock-dev-token')) {
            // User data is incomplete (only has ID) and not a mock token, fetch complete data
            try {
              const completeUser = await fetchUserData(storedData.user.id, storedData.token)
              login(completeUser, storedData.token)
            } catch (fetchError) {
              console.error('Failed to fetch complete user data:', fetchError)
              // If fetching fails, clear auth data and let user re-login
              localStorage.clear()
            }
          } else if (storedData.token.startsWith('mock-dev-token')) {
            // This is a mock token from test login, use the stored user data directly
            login(storedData.user, storedData.token)
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
      } finally {
        setLoading(false)
        setIsInitializing(false)
      }
    }
    initializeAuth()
  }, [login, setLoading])

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Root route - redirect based on auth status */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/groups" element={<DashboardPage />} />
        <Route path="/dashboard/events" element={<DashboardPage />} />
        <Route path="/dashboard/piscines" element={<DashboardPage />} />
        <Route path="/dashboard/piscines/:piscineType" element={<DashboardPage />} />
        <Route path="/dashboard/checkpoints" element={<DashboardPage />} />
        <Route path="/dashboard/leaderboard" element={<DashboardPage />} />
        <Route path="/dashboard/export" element={<DashboardPage />} />
        <Route path="/dashboard/audits" element={<DashboardPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />

        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <RefreshProvider
          defaultAutoRefreshInterval={60000} // 1 minute
          enableNetworkDetection={true}
          showRefreshNotifications={true}
        >
          <UserProvider>
            <AppContent />
          </UserProvider>
        </RefreshProvider>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

export default App
