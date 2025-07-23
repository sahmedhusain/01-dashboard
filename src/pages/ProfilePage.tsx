import React, { useEffect, Suspense } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, User as UserIcon } from 'lucide-react'
import { useIsAuthenticated, useProfileData, useUserProfileActions } from '../store'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ProfileSection from '../components/dashboard/ProfileSection'
import XPSection from '../components/dashboard/XPSection'
import AuditSection from '../components/dashboard/AuditSection'
import StatsSection from '../components/dashboard/StatsSection'

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const isAuthenticated = useIsAuthenticated()
  const { setCurrentProfile, setLoading, setError } = useUserProfileActions()
  
  const userIdNum = userId ? parseInt(userId, 10) : null
  const { profile, isLoading, error, hasData } = useProfileData(userIdNum)

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Invalid user ID
  if (!userIdNum || isNaN(userIdNum)) {
    return <Navigate to="/dashboard" replace />
  }

  useEffect(() => {
    if (userIdNum) {
      setCurrentProfile(userIdNum)
      
      // If we don't have data for this user, trigger loading
      if (!hasData && !isLoading) {
        setLoading(true)
        // Here you would typically fetch the user data
        // For now, we'll simulate an error or empty state
        setTimeout(() => {
          setError('User profile data not available')
        }, 1000)
      }
    }

    return () => {
      setCurrentProfile(null)
    }
  }, [userIdNum, hasData, isLoading, setCurrentProfile, setLoading, setError])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !profile?.user) {
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
              {error || 'The requested user profile could not be loaded.'}
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
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              {profile.user.firstName && profile.user.lastName 
                ? `${profile.user.firstName} ${profile.user.lastName}`
                : profile.user.login
              }
            </h1>
            <p className="text-white/70 text-lg">
              Student Profile & Performance Analytics
            </p>
          </div>
        </motion.div>

        {/* Profile Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 xl:col-span-1"
          >
            <Suspense fallback={<LoadingSpinner />}>
              <ProfileSection user={profile.user} />
            </Suspense>
          </motion.div>

          {/* XP Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 xl:col-span-1"
          >
            <Suspense fallback={<LoadingSpinner />}>
              <XPSection user={profile.user} />
            </Suspense>
          </motion.div>

          {/* Audit Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 xl:col-span-1"
          >
            <Suspense fallback={<LoadingSpinner />}>
              <AuditSection user={profile.user} />
            </Suspense>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <Suspense fallback={<LoadingSpinner />}>
            <StatsSection user={profile.user} />
          </Suspense>
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage
