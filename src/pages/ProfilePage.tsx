import React, { Suspense } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, User as UserIcon } from 'lucide-react'
import { useIsAuthenticated } from '../store'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import DashboardSection from '../components/dashboard/DashboardSection'
import { useQuery, gql } from '@apollo/client'

const USER_PROFILE_QUERY = gql`
  query GetUserProfile($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      firstName
      lastName
      attrs
    }
  }
`

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const isAuthenticated = useIsAuthenticated()
  
  const userIdNum = userId ? parseInt(userId, 10) : null

  const { data, loading, error } = useQuery(USER_PROFILE_QUERY, {
    variables: { userId: userIdNum },
    skip: !userIdNum,
  })

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Invalid user ID
  if (!userIdNum || isNaN(userIdNum)) {
    return <Navigate to="/dashboard" replace />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  const user = data?.user?.[0]

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header with Back Button */}
          <div className="mb-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          {/* Error State */}
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserIcon className="w-12 h-12 text-white/40" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">User Profile Not Found</h1>
            <p className="text-white/60 mb-8">
              {error ? error.message : 'The requested user profile could not be loaded.'}
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Profile Content */}
        <Suspense fallback={<LoadingSpinner />}>
          <DashboardSection user={user} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProfilePage