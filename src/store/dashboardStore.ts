import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface DashboardData {
  xpTransactions: any[]
  progress: any[]
  audits: any[]
  skills: any[]
  leaderboard: any[]
  lastUpdated: Date | null
}

interface DashboardState {
  // State
  data: DashboardData
  activeTab: string
  isLoading: boolean
  error: string | null
  preferences: {
    theme: 'dark' | 'light' | 'auto'
    compactMode: boolean
    showAnimations: boolean
    defaultTab: string
  }

  // Actions
  setData: (data: Partial<DashboardData>) => void
  setActiveTab: (tab: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  updatePreferences: (preferences: Partial<DashboardState['preferences']>) => void
  refreshData: () => void
}

const initialData: DashboardData = {
  xpTransactions: [],
  progress: [],
  audits: [],
  skills: [],
  leaderboard: [],
  lastUpdated: null
}

const initialPreferences = {
  theme: 'dark' as const,
  compactMode: false,
  showAnimations: true,
  defaultTab: 'profile'
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    (set, get) => ({
      // Initial state
      data: initialData,
      activeTab: 'profile',
      isLoading: false,
      error: null,
      preferences: initialPreferences,

      // Actions
      setData: (newData: Partial<DashboardData>) => {
        set((state) => ({
          data: {
            ...state.data,
            ...newData,
            lastUpdated: new Date()
          },
          error: null
        }))
      },

      setActiveTab: (tab: string) => {
        set({ activeTab: tab })
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

      updatePreferences: (newPreferences: Partial<DashboardState['preferences']>) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...newPreferences
          }
        }))
        
        // Persist preferences to localStorage
        const updatedPreferences = { ...get().preferences, ...newPreferences }
        localStorage.setItem('dashboard-preferences', JSON.stringify(updatedPreferences))
      },

      refreshData: () => {
        set({ isLoading: true, error: null })
        // This will be called by components to trigger data refresh
      }
    }),
    {
      name: 'dashboard-store'
    }
  )
)

// Selectors for better performance
export const useDashboardData = () => useDashboardStore((state) => state.data)

export const useDashboardTab = () => useDashboardStore((state) => state.activeTab)
export const useSetDashboardTab = () => useDashboardStore((state) => state.setActiveTab)

export const useDashboardLoading = () => useDashboardStore((state) => state.isLoading)
export const useDashboardError = () => useDashboardStore((state) => state.error)

export const useSetDashboardData = () => useDashboardStore((state) => state.setData)
export const useSetDashboardLoading = () => useDashboardStore((state) => state.setLoading)
export const useSetDashboardError = () => useDashboardStore((state) => state.setError)
export const useClearDashboardError = () => useDashboardStore((state) => state.clearError)
export const useRefreshDashboardData = () => useDashboardStore((state) => state.refreshData)

export const useDashboardPreferences = () => useDashboardStore((state) => state.preferences)
export const useUpdateDashboardPreferences = () => useDashboardStore((state) => state.updatePreferences)

// Initialize preferences from localStorage on first load
if (typeof window !== 'undefined') {
  const savedPreferences = localStorage.getItem('dashboard-preferences')
  if (savedPreferences) {
    try {
      const parsed = JSON.parse(savedPreferences)
      // Use getState and setState to avoid triggering subscriptions during initialization
      const currentState = useDashboardStore.getState()
      useDashboardStore.setState({
        preferences: { ...currentState.preferences, ...parsed }
      })
    } catch (error) {
      console.warn('Failed to parse saved preferences:', error)
    }
  }
}
