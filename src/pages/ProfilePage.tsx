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
  const { userId: userIdParam } = useParams<{ userId: string }>()
  const isAuthenticated = useIsAuthenticated()
  
  const userIdNum = userIdParam ? parseInt(userIdParam, 10) : null

  const { data, loading, error } = useQuery(USER_PROFILE_QUERY, {
    variables: { userId: userIdNum },
    skip: !userIdNum,
  })

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!userIdParam || isNaN(Number(userIdParam))) {
    return <Navigate to="/dashboard" replace />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  const user = data?.user?.[0]

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900">
        <div className="container-responsive container-section">
          {/* Header with Back Button */}
          <div className="mb-6 sm:mb-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base">Back to Dashboard</span>
            </Link>
          </div>

          {/* Error State */}
          <div className="text-center py-12 sm:py-16">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <UserIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white/40" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">User Profile Not Found</h1>
            <p className="text-white/60 mb-6 sm:mb-8 text-sm sm:text-base px-4">
              {error ? error.message : 'The requested user profile could not be loaded.'}
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm sm:text-base"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900">
      <div className="container-responsive container-section">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base">Back to Dashboard</span>
          </Link>
        </motion.div>

        {/* Profile Content */}
        <Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-[50vh]">
              <LoadingSpinner size="lg" />
            </div>
          }
        >
          <DashboardSection user={user} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProfilePage