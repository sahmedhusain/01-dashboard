import React, { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { useIsAuthenticated } from '../store'
import Dashboard from '../components/dashboard/Dashboard'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const DashboardPage: React.FC = () => {
  const isAuthenticated = useIsAuthenticated()

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Dashboard />
    </Suspense>
  )
}

export default DashboardPage
