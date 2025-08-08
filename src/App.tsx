import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import client from './graphql/client'
import { UserProvider } from './contexts/UserContext';
import { RefreshProvider } from './contexts/RefreshContext'
import { ThemeProvider } from './contexts/ThemeContext'
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
          if (storedData.user.login) {
            login(storedData.user, storedData.token)
          } else if (storedData.user.id && !storedData.token.startsWith('mock-dev-token')) {
            try {
              const completeUser = await fetchUserData(storedData.user.id, storedData.token)
              login(completeUser, storedData.token)
            } catch (fetchError) {
              localStorage.clear()
            }
          } else if (storedData.token.startsWith('mock-dev-token')) {
            login(storedData.user, storedData.token)
          }
        }
      } catch (error) {
      } finally {
        setLoading(false)
        setIsInitializing(false)
      }
    }
    initializeAuth()
  }, [login, setLoading])

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 40px 40px, rgba(52, 211, 153, 0.1) 2px, transparent 0)`,
            backgroundSize: '80px 80px',
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>

        {/* Loading Content */}
        <div className="w-full max-w-md mx-auto relative z-10">
          <div className="text-center space-y-8">
            {/* Logo Animation */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full backdrop-blur-sm border border-white/10 mb-8 animate-pulse">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent">
                01 Student Dashboard
              </h1>
              <p className="text-xl text-white/70">
                Initializing your learning journey...
              </p>
            </div>

            {/* Enhanced Loading Spinner */}
            <div className="relative">
              <LoadingSpinner size="lg" />
              <div className="mt-4 text-white/50 text-sm animate-pulse">
                Loading your data securely
              </div>
            </div>
          </div>
        </div>

        {/* Add keyframe for background animation */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
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

        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/groups" element={<DashboardPage />} />
        <Route path="/dashboard/events" element={<DashboardPage />} />
        <Route path="/dashboard/piscines" element={<DashboardPage />} />
        <Route path="/dashboard/piscines/:piscineType" element={<DashboardPage />} />
        <Route path="/dashboard/checkpoints" element={<DashboardPage />} />
        <Route path="/dashboard/leaderboard" element={<DashboardPage />} />
        <Route path="/dashboard/subjects" element={<DashboardPage />} />
        <Route path="/dashboard/export" element={<DashboardPage />} />
        <Route path="/dashboard/audits" element={<DashboardPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <ThemeProvider defaultTheme="dark" storageKey="app-theme">
          <RefreshProvider
            defaultAutoRefreshInterval={60000}
            enableNetworkDetection={true}
            showRefreshNotifications={true}
          >
            <UserProvider>
              <AppContent />
            </UserProvider>
          </RefreshProvider>
        </ThemeProvider>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

export default App
