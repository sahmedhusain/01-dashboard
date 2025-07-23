// Export all stores and their hooks
export * from './authStore'
export * from './dashboardStore'
export * from './userProfileStore'

// Re-export commonly used hooks for convenience
export {
  useUser,
  useToken,
  useIsAuthenticated,
  useIsLoading,
  useAuthError,
  useLogin,
  useLogout,
  useSetLoading,
  useSetError,
  useClearError,
  useUpdateUser
} from './authStore'

export {
  useDashboardData,
  useDashboardTab,
  useSetDashboardTab,
  useDashboardLoading,
  useDashboardError,
  useSetDashboardData,
  useSetDashboardLoading,
  useSetDashboardError,
  useClearDashboardError,
  useRefreshDashboardData,
  useDashboardPreferences,
  useUpdateDashboardPreferences
} from './dashboardStore'

export {
  useCurrentProfile,
  useProfileById,
  useUserProfileActions,
  useUserProfileStatus,
  useProfileData
} from './userProfileStore'
