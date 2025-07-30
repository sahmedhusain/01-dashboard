import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { LogOut, LayoutDashboard, Trophy, Download, BookOpen, Settings, CheckCircle, Users, Calendar, User as UserIcon, History } from 'lucide-react';
import { useQuery, gql } from '@apollo/client';
import { useUser, useLogout } from '../../store';
import { User } from '../../types';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useDashboardRouting } from '../../utils/routing';

// Lazy load components for better performance
const DashboardSection = lazy(() => import('./DashboardSection'))
const PiscinesDashboard = lazy(() => import('./PiscinesDashboard'))
const LeaderboardSection = lazy(() => import('./LeaderboardSection'))
const ExportSection = lazy(() => import('../export/ExportSection'))
const PiscineSection = lazy(() => import('./PiscineSection'))
const CheckpointDashboard = lazy(() => import('./CheckpointDashboard'))
const AuditSection = lazy(() => import('./AuditSection'))

// New complete dashboard sections
const GroupSection = lazy(() => import('./GroupSection'))
const EventSection = lazy(() => import('./EventSection'))

const UserPreferences = lazy(() => import('../preferences/UserPreferences'))

type TabType = 'dashboard' | 'groups' | 'events' | 'piscines' | 'checkpoints' | 'leaderboard' | 'export' | 'audits' | string // Allow dynamic piscine tabs

const Dashboard: React.FC = () => {
  const user = useUser()
  const logout = useLogout()
  const { getCurrentTab, navigateToTab } = useDashboardRouting()
  const [piscineTypes, setPiscineTypes] = useState<string[]>([])
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<any>(null)

  const currentTab = getCurrentTab()
  const setActiveTab = navigateToTab
  
  // Use default tab from preferences if we're on root dashboard and preferences are loaded
  const activeTab = React.useMemo(() => {
    if (currentTab === 'dashboard' && preferences?.dashboard?.defaultTab && preferences.dashboard.defaultTab !== 'dashboard') {
      // Check if we're on the root dashboard path and should redirect to default tab
      if (window.location.pathname === '/dashboard') {
        return preferences.dashboard.defaultTab
      }
    }
    return currentTab
  }, [currentTab, preferences])

  // Effect to navigate to default tab if needed
  React.useEffect(() => {
    if (preferences?.dashboard?.defaultTab && 
        preferences.dashboard.defaultTab !== 'dashboard' && 
        window.location.pathname === '/dashboard' &&
        currentTab === 'dashboard') {
      navigateToTab(preferences.dashboard.defaultTab)
    }
  }, [preferences, navigateToTab, currentTab])

  // Redirect if no user (shouldn't happen with routing, but safety check)
  if (!user) {
    return null
  }

  // Query to detect user's piscine types dynamically (CORRECTED)
  const { data: piscineData } = useQuery(gql`
    query GetUserPiscineTypes($userId: Int!) {
      # Standard piscines: /bahrain/bh-module/piscine-{{name}}/
      standard_piscines: transaction(
        where: {
          userId: { _eq: $userId }
          path: { _regex: "bh-module/piscine-" }
        }
        distinct_on: path
      ) {
        path
      }
      # Go piscine: /bahrain/bh-piscine/
      go_piscine: transaction(
        where: {
          userId: { _eq: $userId }
          path: { _regex: "bh-piscine/" }
        }
        limit: 1
      ) {
        path
      }
    }
  `, {
    variables: { userId: user.id },
    errorPolicy: 'all'
  })

  // Load user preferences
  useEffect(() => {
    const loadPreferences = () => {
      const saved = localStorage.getItem(`user-preferences-${user.id}`)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setPreferences(parsed)
        } catch (error) {
          console.error('Failed to parse preferences:', error)
          setPreferences(null)
        }
      }
    }
    
    if (user?.id) {
      loadPreferences()
    }
  }, [user?.id])

  // Extract piscine types from transaction paths (CORRECTED)
  useEffect(() => {
    if (piscineData) {
      const types = new Set<string>()

      // Standard piscines
      if (piscineData.standard_piscines) {
        piscineData.standard_piscines.forEach((t: any) => {
          const match = t.path?.match(/piscine-(\w+)/)
          if (match) {
            types.add(match[1])
          }
        })
      }

      // Go piscine
      if (piscineData.go_piscine && piscineData.go_piscine.length > 0) {
        types.add('go')
      }

      setPiscineTypes(Array.from(types))
    }
  }, [piscineData])

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  const handlePreferencesUpdate = useCallback(() => {
    // Reload preferences when the modal is closed and changes are saved
    const saved = localStorage.getItem(`user-preferences-${user.id}`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPreferences(parsed)
      } catch (error) {
        console.error('Failed to parse updated preferences:', error)
      }
    }
  }, [user.id])

  // Default tab order as requested: dashboard, piscines, leaderboard, groups, audits, checkpoints, events, export
  const defaultTabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'piscines' as TabType, label: 'Piscines', icon: BookOpen },
    { id: 'leaderboard' as TabType, label: 'Leaderboard', icon: Trophy },
    { id: 'groups' as TabType, label: 'Groups', icon: Users },
    { id: 'audits' as TabType, label: 'Audits', icon: History },
    { id: 'checkpoints' as TabType, label: 'Checkpoints', icon: CheckCircle },
    { id: 'events' as TabType, label: 'Events', icon: Calendar },
    { id: 'export' as TabType, label: 'Export', icon: Download },
  ]

  // Apply user's custom tab order if available
  const tabs = React.useMemo(() => {
    if (preferences?.dashboard?.tabOrder && Array.isArray(preferences.dashboard.tabOrder)) {
      const orderedTabs = []
      const tabMap = new Map(defaultTabs.map(tab => [tab.id, tab]))
      
      // Add tabs in user's preferred order
      for (const tabId of preferences.dashboard.tabOrder) {
        const tab = tabMap.get(tabId)
        if (tab) {
          orderedTabs.push(tab)
          tabMap.delete(tabId)
        }
      }
      
      // Add any remaining tabs that weren't in the user's order
      orderedTabs.push(...Array.from(tabMap.values()))
      
      return orderedTabs
    }
    
    return defaultTabs
  }, [preferences])

  const renderContent = () => {
    // Handle piscine sub-tabs dynamically
    if (activeTab.startsWith('piscine-')) {
      const piscineType = activeTab.replace('piscine-', '')
      return <PiscineSection user={user} piscineType={piscineType} />
    }

    // Handle main tabs
    switch (activeTab) {
      case 'dashboard':
        return <DashboardSection user={user} />
      case 'groups':
        return <GroupSection user={user} />
      case 'events':
        return <EventSection user={user} />
      case 'piscines':
        return <PiscinesDashboard user={user} piscineTypes={piscineTypes} />
      case 'checkpoints':
        return <CheckpointDashboard user={user} />
      case 'leaderboard':
        return <LeaderboardSection user={user} />
      case 'export':
        return <ExportSection user={user} />
      case 'audits':
        return <AuditSection user={user} />
      default:
        return <DashboardSection user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Responsive Logo/Title */}
            <div className="flex items-center min-w-0">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0"
              >
                <UserIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-white truncate">Student Dashboard</h1>
                <p className="text-xs sm:text-sm text-white/70 truncate">#{user.id}</p>
              </div>
            </div>

            {/* Actions: Preferences and Logout */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <motion.button
                onClick={() => setShowPreferences(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Open preferences"
                title="Preferences"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-3 sm:px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-colors"
                aria-label="Logout from dashboard"
                title="Logout"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white/5 backdrop-blur-sm border-b border-white/10" role="navigation" aria-label="Dashboard navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 sm:space-x-4 lg:space-x-8 overflow-x-auto scrollbar-hide" role="tablist">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className={`flex items-center px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap min-w-0 ${
                    isActive
                      ? 'border-primary-500 text-primary-400'
                      : 'border-transparent text-white/70 hover:text-white hover:border-white/30'
                  }`}
                  aria-label={`Switch to ${tab.label} tab`}
                  aria-current={isActive ? 'page' : undefined}
                  role="tab"
                  tabIndex={0}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main" aria-label="Dashboard content">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            {renderContent()}
          </Suspense>
        </motion.div>
      </main>

      {/* User Preferences Modal */}
      {showPreferences && (
        <Suspense fallback={null}>
          <UserPreferences
            userId={user.id}
            onClose={() => {
              setShowPreferences(false)
              handlePreferencesUpdate()
            }}
            defaultTabs={defaultTabs}
          />
        </Suspense>
      )}
    </div>
  )
}

export default Dashboard
