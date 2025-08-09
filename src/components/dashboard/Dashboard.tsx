import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { LogOut, LayoutDashboard, Trophy, Download, BookOpen, Settings, CheckCircle, Users, Calendar, User as UserIcon, History, Book, GraduationCap } from 'lucide-react';
import { useQuery, gql } from '@apollo/client';
import { useUser, useLogout } from '../../store';
import { User } from '../../types';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useDashboardRouting } from '../../utils/routing';
import { defaultTransition, springTransition, fadeInVariants } from '../../config/motion';

const DashboardSection = lazy(() => import('./DashboardSection'))
const PiscinesDashboard = lazy(() => import('./PiscinesDashboard'))
const LeaderboardSection = lazy(() => import('./LeaderboardSection'))
const PiscineSection = lazy(() => import('./PiscineSection'))
const CheckpointDashboard = lazy(() => import('./CheckpointDashboard'))
const AuditSection = lazy(() => import('./AuditSection'))
const SubjectsSection = lazy(() => import('./sections/SubjectsSection'))

const GroupSection = lazy(() => import('./GroupSection'))
const EventSection = lazy(() => import('./EventSection'))

const UserPreferences = lazy(() => import('../preferences/UserPreferences'))

type TabType = 'dashboard' | 'groups' | 'events' | 'piscines' | 'checkpoints' | 'leaderboard' | 'export' | 'audits' | string 

const Dashboard: React.FC = () => {
  const user = useUser()
  const logout = useLogout()
  const { getCurrentTab, navigateToTab } = useDashboardRouting()
  const [piscineTypes, setPiscineTypes] = useState<string[]>([])
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<any>(null)
  const [hasHandledInitialRedirect, setHasHandledInitialRedirect] = useState(false)

  const currentTab = getCurrentTab()
  const setActiveTab = navigateToTab
  
  
  const activeTab = currentTab

  
  React.useEffect(() => {
    
    if (preferences && !hasHandledInitialRedirect) {
      setHasHandledInitialRedirect(true)
      
      
      const userNavigatedToDashboard = sessionStorage.getItem('userNavigatedToDashboard')
      
      
      if (preferences?.dashboard?.defaultTab && 
          preferences.dashboard.defaultTab !== 'dashboard' && 
          window.location.pathname === '/dashboard' &&
          currentTab === 'dashboard' &&
          !userNavigatedToDashboard) {
        navigateToTab(preferences.dashboard.defaultTab)
      }
      
      
      sessionStorage.removeItem('userNavigatedToDashboard')
    }
  }, [preferences, hasHandledInitialRedirect, currentTab, navigateToTab])
  
  
  const handleTabNavigation = React.useCallback((tabId: string) => {
    
    if (tabId === 'dashboard') {
      sessionStorage.setItem('userNavigatedToDashboard', 'true')
    }
    setActiveTab(tabId)
  }, [setActiveTab])

  
  if (!user) {
    return null
  }

  
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

  
  useEffect(() => {
    const loadPreferences = () => {
      const saved = localStorage.getItem(`user-preferences-${user.id}`)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setPreferences(parsed)
        } catch (error) {
          setPreferences(null)
        }
      }
    }
    
    if (user?.id) {
      loadPreferences()
    }
  }, [user?.id])

  
  useEffect(() => {
    if (piscineData) {
      const types = new Set<string>()

      
      if (piscineData.standard_piscines) {
        piscineData.standard_piscines.forEach((t: any) => {
          const match = t.path?.match(/piscine-(\w+)/)
          if (match) {
            types.add(match[1])
          }
        })
      }

      
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
    
    const saved = localStorage.getItem(`user-preferences-${user.id}`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPreferences(parsed)
      } catch (error) {
      }
    }
  }, [user.id])

  
  const defaultTabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'piscines' as TabType, label: 'Piscines', icon: BookOpen },
    { id: 'leaderboard' as TabType, label: 'Leaderboard', icon: Trophy },
    { id: 'groups' as TabType, label: 'Groups', icon: Users },
    { id: 'audits' as TabType, label: 'Audits', icon: History },
    { id: 'checkpoints' as TabType, label: 'Checkpoints', icon: CheckCircle },
    { id: 'events' as TabType, label: 'Events', icon: Calendar },
    { id: 'subjects' as TabType, label: 'Subjects', icon: Book },
  ]

  
  const tabs = React.useMemo(() => {
    if (preferences?.dashboard?.tabOrder && Array.isArray(preferences.dashboard.tabOrder)) {
      const orderedTabs = []
      const tabMap = new Map(defaultTabs.map(tab => [tab.id, tab]))
      
      
      for (const tabId of preferences.dashboard.tabOrder) {
        const tab = tabMap.get(tabId)
        if (tab) {
          orderedTabs.push(tab)
          tabMap.delete(tabId)
        }
      }
      
      
      orderedTabs.push(...Array.from(tabMap.values()))
      
      return orderedTabs
    }
    
    return defaultTabs
  }, [preferences])

  const renderContent = () => {
    
    if (activeTab.startsWith('piscine-')) {
      const piscineType = activeTab.replace('piscine-', '')
      return <PiscineSection user={user} piscineType={piscineType} />
    }

    
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
      case 'audits':
        return <AuditSection user={user} />
      default:
        return <DashboardSection user={user} />
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 flex flex-col relative overflow-hidden">
      {/* Animated Background - Optimized for mobile */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 40px 40px, rgba(52, 211, 153, 0.1) 2px, transparent 0)`,
          backgroundSize: window.innerWidth < 640 ? '60px 60px' : '80px 80px' // Smaller pattern on mobile
        }}></div>
      </div>

      {/* Enhanced Header - Fixed */}
      <header className="flex-shrink-0 bg-gradient-to-r from-white/10 via-emerald-500/5 to-white/5 backdrop-blur-xl border-b border-white/20 shadow-2xl relative z-10 overflow-hidden">
        {/* Subtle header background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 via-transparent to-teal-500/3"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
        <div className="container-responsive">
          <div className="flex items-center justify-between min-h-[3rem] sm:min-h-[3.5rem] lg:min-h-[4rem] px-2 sm:px-4 py-2 sm:py-2.5 lg:py-3">
            {/* Enhanced Logo/Title - Better mobile spacing */}
            <div className="flex items-center min-w-0 flex-1 mr-3 sm:mr-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={springTransition}
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mr-2 sm:mr-3 lg:mr-3 flex-shrink-0 shadow-lg shadow-emerald-500/25 border border-white/25 relative overflow-hidden group hover:shadow-xl hover:shadow-emerald-500/35 transition-all duration-300"
              >
                {/* Enhanced animated background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/30 to-teal-400/30 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 group-hover:via-white/20 group-hover:to-white/30 transition-all duration-300"></div>
                {/* Subtle rotating background - optimized for 60fps */}
                <div className="absolute inset-0 bg-gradient-conic from-emerald-400/20 via-teal-500/20 to-emerald-400/20 animate-spin motion-safe" style={{ animationDuration: '4s', animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-white drop-shadow-lg relative z-10" />
              </motion.div>
              <div className="min-w-0 flex-1 py-0.5 sm:py-1">
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...defaultTransition, delay: 0.2 }}
                  className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent truncate leading-tight mb-0.5 drop-shadow-sm"
                >
                  <span className="hidden sm:inline">Student Dashboard</span>
                  <span className="sm:hidden">Dashboard</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...defaultTransition, delay: 0.3 }}
                  className="text-xs sm:text-sm lg:text-sm text-white/70 truncate leading-tight"
                >
                  <span className="hidden xs:inline">Welcome, </span>
                  <span className="text-emerald-400 font-semibold">{user.login}</span>
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
                className="p-1 sm:p-1.5 lg:p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
                aria-label="Open preferences"
                title="Preferences"
              >
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </motion.button>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center px-2 sm:px-2.5 lg:px-3 py-1 sm:py-1.5 lg:py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-200 rounded-lg transition-all duration-300 backdrop-blur-sm border border-red-500/20 hover:border-red-500/30 shadow-lg hover:shadow-red-500/25"
                aria-label="Logout from dashboard"
                title="Logout"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline font-semibold text-xs sm:text-sm">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Navigation Tabs - Fixed (Hidden on mobile, shown on tablet+) */}
      <nav className="hidden md:flex flex-shrink-0 bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-lg border-b border-white/10 shadow-xl relative z-10" role="navigation" aria-label="Dashboard navigation">
        <div className="container-responsive">
          <div className="flex justify-center space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide py-1.5 sm:py-2" role="tablist">
            {tabs.map((tab, index) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabNavigation(tab.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={`flex items-center justify-center md:justify-start px-1.5 sm:px-2 md:px-2.5 lg:px-5 py-1 sm:py-1.5 md:py-1.5 lg:py-3 text-[10px] md:text-[10px] lg:text-sm font-bold rounded-lg sm:rounded-xl transition-all duration-300 whitespace-nowrap min-w-0 shadow-lg touch-target relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/30 border border-white/20'
                      : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20 border border-white/10 hover:border-white/20'
                  }`}
                  aria-label={`Switch to ${tab.label} tab`}
                  aria-current={isActive ? 'page' : undefined}
                  role="tab"
                  tabIndex={0}
                  title={tab.label} 
                >
                  {/* Active tab glow effect */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <Icon className={`w-3 h-3 sm:w-4 sm:h-4 md:w-3.5 md:h-3.5 lg:w-5 lg:h-5 flex-shrink-0 md:mr-1.5 relative z-10 ${
                    isActive ? 'drop-shadow-lg' : ''
                  }`} />
                  
                  {/* Show text on tablet (md) and up */}
                  <span className="hidden md:inline relative z-10">{tab.label}</span>
                  
                  {/* Hover effect */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content - Full Width & Height with better mobile spacing */}
      <main className="flex-1 overflow-y-auto custom-scrollbar pb-20 md:pb-4 lg:pb-0" role="main" aria-label="Dashboard content">
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

      {/* Bottom Navigation - Mobile Only (Hidden on tablet+) */}
      <nav className="block md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900/98 to-emerald-900/98 backdrop-blur-xl border-t border-white/20 shadow-2xl z-20 safe-bottom" role="navigation" aria-label="Mobile navigation">
        <div className="px-2 py-3 pb-safe">
          <div className="flex justify-around items-center max-w-md mx-auto">
            {tabs.map((tab, index) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabNavigation(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={`flex flex-col items-center justify-center px-3 py-2.5 rounded-xl transition-all duration-300 min-w-[50px] min-h-[52px] relative overflow-hidden touch-target ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/25 to-teal-500/25 text-emerald-300 shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/10 active:bg-white/15'
                  }`}
                  aria-label={`Switch to ${tab.label} tab`}
                  aria-current={isActive ? 'page' : undefined}
                  role="tab"
                  tabIndex={0}
                  title={tab.label}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <Icon className={`w-5 h-5 mb-1 ${
                    isActive ? 'drop-shadow-lg' : ''
                  }`} />
                  <span className={`text-xs font-medium leading-tight ${
                    isActive ? 'text-emerald-300' : 'text-white/50'
                  }`}>
                    {tab.label.length > 8 ? tab.label.substring(0, 7) + '...' : tab.label}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </nav>

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
