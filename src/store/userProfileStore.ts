import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { User } from '../types'

interface UserProfileData {
  user: User | null
  xpTransactions: any[]
  progress: any[]
  audits: any[]
  skills: any[]
  stats: {
    totalXP: number
    projectsPassed: number
    projectsFailed: number
    auditRatio: number
    level: number
  } | null
}

interface UserProfileState {
  profiles: Map<number, UserProfileData>
  currentProfileId: number | null
  isLoading: boolean
  error: string | null

  setProfile: (userId: number, data: Partial<UserProfileData>) => void
  setCurrentProfile: (userId: number | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  clearProfile: (userId: number) => void
  clearAllProfiles: () => void
}

const initialProfileData: UserProfileData = {
  user: null,
  xpTransactions: [],
  progress: [],
  audits: [],
  skills: [],
  stats: null
}

export const useUserProfileStore = create<UserProfileState>()(
  devtools(
    (set, get) => ({
      profiles: new Map(),
      currentProfileId: null,
      isLoading: false,
      error: null,

      setProfile: (userId: number, data: Partial<UserProfileData>) => {
        set((state) => {
          const newProfiles = new Map(state.profiles)
          const existingProfile = newProfiles.get(userId) || { ...initialProfileData }
          newProfiles.set(userId, { ...existingProfile, ...data })
          
          return {
            profiles: newProfiles,
            error: null
          }
        })
      },

      setCurrentProfile: (userId: number | null) => {
        set({ currentProfileId: userId })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      setError: (error: string | null) => {
        set({ error, isLoading: false })
      },

      clearError: () => {
        set({ error: null })
      },

      clearProfile: (userId: number) => {
        set((state) => {
          const newProfiles = new Map(state.profiles)
          newProfiles.delete(userId)
          return {
            profiles: newProfiles,
            currentProfileId: state.currentProfileId === userId ? null : state.currentProfileId
          }
        })
      },

      clearAllProfiles: () => {
        set({
          profiles: new Map(),
          currentProfileId: null,
          error: null
        })
      }
    }),
    {
      name: 'user-profile-store'
    }
  )
)

export const useCurrentProfile = () => useUserProfileStore((state) => {
  const currentId = state.currentProfileId
  if (!currentId) return null
  return state.profiles.get(currentId) || null
})

export const useProfileById = (userId: number) => useUserProfileStore((state) => 
  state.profiles.get(userId) || null
)

export const useUserProfileActions = () => useUserProfileStore((state) => ({
  setProfile: state.setProfile,
  setCurrentProfile: state.setCurrentProfile,
  setLoading: state.setLoading,
  setError: state.setError,
  clearError: state.clearError,
  clearProfile: state.clearProfile,
  clearAllProfiles: state.clearAllProfiles
}))

export const useUserProfileStatus = () => useUserProfileStore((state) => ({
  isLoading: state.isLoading,
  error: state.error
}))

export const useProfileData = (userId: number | null) => {
  const profile = useUserProfileStore((state) => 
    userId ? state.profiles.get(userId) : null
  )
  const { isLoading, error } = useUserProfileStatus()
  
  return {
    profile,
    isLoading,
    error,
    hasData: profile?.user !== null
  }
}
