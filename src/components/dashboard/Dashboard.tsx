import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { LogOut, LayoutDashboard, Trophy, Download, BookOpen, Settings, CheckCircle, Users, Calendar, User as UserIcon, History, Book } from 'lucide-react';
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
const SubjectsSection = lazy(() => import('./sections/SubjectsSection'))

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

  // Default tab order as requested: dashboard, piscines, leaderboard, groups, audits, checkpoints, events, subjects, export
  const defaultTabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'piscines' as TabType, label: 'Piscines', icon: BookOpen },
    { id: 'leaderboard' as TabType, label: 'Leaderboard', icon: Trophy },
    { id: 'groups' as TabType, label: 'Groups', icon: Users },
    { id: 'audits' as TabType, label: 'Audits', icon: History },
    { id: 'checkpoints' as TabType, label: 'Checkpoints', icon: CheckCircle },
    { id: 'events' as TabType, label: 'Events', icon: Calendar },
    { id: 'subjects' as TabType, label: 'Subjects', icon: Book },
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
        return <PiscinesDashboard user={user} />
      case 'checkpoints':
        return <CheckpointDashboard user={user} />
      case 'leaderboard':
        return <LeaderboardSection user={user} />
      case 'subjects':
        return <SubjectsSection analytics={null} />
      case 'export':
        return <ExportSection user={user} />
      case 'audits':
        return <AuditSection user={user} />
      default:
        return <DashboardSection user={user} />
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Enhanced Header - Fixed */}
      <header className="flex-shrink-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border-b border-white/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Enhanced Logo/Title */}
            <div className="flex items-center min-w-0">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 shadow-lg shadow-blue-500/25 border border-white/20"
              >
                <UserIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
              </motion.div>
              <div className="min-w-0">
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent truncate"
                >
                  Student Dashboard
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm sm:text-base text-white/70 truncate"
                >
                  Welcome, <span className="text-blue-400 font-semibold">{user.login}</span>
                </motion.p>
              </div>
            </div>

            {/* Enhanced Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.button
                onClick={() => setShowPreferences(true)}
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
                aria-label="Open preferences"
                title="Preferences"
              >
                <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-200 rounded-xl transition-all duration-300 backdrop-blur-sm border border-red-500/20 hover:border-red-500/30 shadow-lg hover:shadow-red-500/25"
                aria-label="Logout from dashboard"
                title="Logout"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline font-semibold">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Navigation Tabs - Fixed */}
      <nav className="flex-shrink-0 bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-lg border-b border-white/10 shadow-xl" role="navigation" aria-label="Dashboard navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide py-2" role="tablist">
            {tabs.map((tab, index) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={`flex items-center px-4 sm:px-6 py-3 sm:py-4 text-sm font-bold rounded-2xl transition-all duration-300 whitespace-nowrap min-w-0 shadow-lg ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-500/30 border border-white/20'
                      : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20 border border-white/10 hover:border-white/20'
                  }`}
                  aria-label={`Switch to ${tab.label} tab`}
                  aria-current={isActive ? 'page' : undefined}
                  role="tab"
                  tabIndex={0}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto" role="main" aria-label="Dashboard content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        </div>
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
