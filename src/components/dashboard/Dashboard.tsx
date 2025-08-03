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
        <div className="container-responsive">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Enhanced Logo/Title */}
            <div className="flex items-center min-w-0 flex-1">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-2 sm:mr-3 lg:mr-4 flex-shrink-0 shadow-lg shadow-blue-500/25 border border-white/20"
              >
                <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white drop-shadow-lg" />
              </motion.div>
              <div className="min-w-0 flex-1">
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent truncate"
                >
                  <span className="hidden sm:inline">Student Dashboard</span>
                  <span className="sm:hidden">Dashboard</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs sm:text-sm lg:text-base text-white/70 truncate"
                >
                  <span className="hidden xs:inline">Welcome, </span>
                  <span className="text-blue-400 font-semibold">{user.login}</span>
                </motion.p>
              </div>
            </div>

            {/* Enhanced Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0">
              <motion.button
                onClick={() => setShowPreferences(true)}
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-2 sm:p-2.5 lg:p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
                aria-label="Open preferences"
                title="Preferences"
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </motion.button>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-200 rounded-xl transition-all duration-300 backdrop-blur-sm border border-red-500/20 hover:border-red-500/30 shadow-lg hover:shadow-red-500/25"
                aria-label="Logout from dashboard"
                title="Logout"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline font-semibold text-xs sm:text-sm">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Navigation Tabs - Fixed */}
      <nav className="flex-shrink-0 bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-lg border-b border-white/10 shadow-xl" role="navigation" aria-label="Dashboard navigation">
        <div className="container-responsive">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide py-2 sm:py-3" role="tablist">
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
                  className={`flex items-center justify-center lg:justify-start px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4 text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl transition-all duration-300 whitespace-nowrap min-w-0 shadow-lg touch-target ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-500/30 border border-white/20'
                      : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20 border border-white/10 hover:border-white/20'
                  }`}
                  aria-label={`Switch to ${tab.label} tab`}
                  aria-current={isActive ? 'page' : undefined}
                  role="tab"
                  tabIndex={0}
                  title={tab.label} // Show full label in tooltip on mobile/tablet
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 flex-shrink-0 ${
                    // Add margin only on desktop when text is shown
                    'lg:mr-2'
                  }`} />
                  {/* Show text only on desktop (lg and up) */}
                  <span className="hidden lg:inline">{tab.label}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content - Full Width & Height */}
      <main className="flex-1 overflow-y-auto custom-scrollbar" role="main" aria-label="Dashboard content">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <Suspense 
            fallback={
              <div className="flex items-center justify-center min-h-[50vh]">
                <LoadingSpinner size="lg" />
              </div>
            }
          >
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
