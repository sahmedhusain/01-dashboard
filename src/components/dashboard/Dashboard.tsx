import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Search, User, BarChart3, TrendingUp, Award, Trophy, Users, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/authUtils';
import { useData } from '../../hooks/useData';
import { useTabRouting, NavigationHistory } from '../../utils/routing';
import {
  processDashboardTabs,
  processDashboardState
} from '../../utils/componentDataProcessors/dashboardProcessors';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Loading from '../ui/Loading';
import ErrorBoundary from '../ui/ErrorBoundary';
import MobileNavigation from '../ui/MobileNavigation';
import ProfileSection from './ProfileSection';
import SearchSection from './SearchSection';
import StatsSection from './StatsSection';
import AuditsSection from './AuditsSection';
import TechnologiesSection from './TechnologiesSection';
import ProgressTrackingSection from './ProgressTrackingSection';
import ComparativeAnalyticsSection from './ComparativeAnalyticsSection';
import AchievementsSection from './AchievementsSection';

// Development: Routing tests available via window.testRouting in console
const Dashboard = () => {
  const { logout } = useAuth();
  const { userStatistics, loading, error, refetchAll } = useData();
  const { currentTab, navigateToTab, pathname } = useTabRouting();

  // Track navigation history
  useEffect(() => {
    NavigationHistory.push(pathname);
  }, [pathname]);

  // Process dashboard data using utility functions
  const tabs = processDashboardTabs();
  const dashboardState = processDashboardState(loading, error, userStatistics);

  // Icon mapping for dynamic icon rendering
  const iconMap = {
    User,
    Search,
    BarChart3,
    TrendingUp,
    Award,
    Trophy,
    Users
  };

  // Enhanced tabs with actual icon components
  const tabsWithIcons = tabs.map(tab => ({
    ...tab,
    icon: iconMap[tab.iconName] || User
  }));

  // Mobile menu state (still needed for UI)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when tab changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentTab]);

  const handleLogout = () => {
    logout();
  };

  // Use processed dashboard state for loading and error handling
  if (dashboardState.shouldShowLoading) {
    return (
      <div className="min-h-screen bg-surface-900 flex items-center justify-center">
        <Loading
          size="lg"
          text="Loading your dashboard..."
          variant="dots"
          error={error}
          retry={refetchAll}
        />
      </div>
    );
  }

  // Show error state if there's an error and no data
  if (dashboardState.shouldShowError) {
    return (
      <div className="min-h-screen bg-surface-900 flex items-center justify-center">
        <Loading
          error={error}
          retry={refetchAll}
          text="Failed to load dashboard"
        />
      </div>
    );
  }

  if (error) {
    console.error('Dashboard error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md text-center">
          <Card.Header>
            <Card.Title className="text-red-400">Error Loading Dashboard</Card.Title>
            <Card.Description>
              {error.message || 'Failed to load dashboard data'}
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              <Button onClick={() => window.location.reload()} className="w-full">
                Reload Page
              </Button>
              {import.meta.env.DEV && (
                <details className="text-left text-xs">
                  <summary className="cursor-pointer text-surface-400 hover:text-surface-200">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 p-2 bg-surface-800/50 rounded text-red-400 overflow-auto">
                    {JSON.stringify(error, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }

  return (
    <ErrorBoundary showDetails={import.meta.env.DEV}>
      <div className="min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 pb-20 md:pb-0 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #14b8a6 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`
          }} />
        </div>
      {/* Enhanced Header */}
      <header className="sticky top-0 z-40 bg-surface-900/90 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo/Title */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                className="w-10 h-10 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 rounded-xl flex items-center justify-center mr-3 shadow-lg"
              >
                <BarChart3 className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-lg md:text-xl font-bold gradient-text">
                  Student Dashboard
                </h1>
                <p className="text-xs text-surface-400 hidden md:block">
                  Professional Analytics Platform
                </p>
              </div>
            </motion.div>

            {/* Desktop: User info and logout */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>

            {/* Mobile: Menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-surface-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 py-4"
            >
              <div className="flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Enhanced Desktop Navigation Tabs */}
      <nav className="sticky top-16 z-30 bg-surface-800/90 backdrop-blur-xl border-b border-white/10 hidden md:block shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabsWithIcons.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => navigateToTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-4 rounded-t-lg transition-all duration-300 whitespace-nowrap relative group ${
                    isActive
                      ? 'bg-gradient-to-b from-primary-500/20 to-transparent text-primary-300 border-b-2 border-primary-400'
                      : 'text-surface-400 hover:text-surface-200 hover:bg-surface-700/50'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                >
                  <Icon className={`w-4 h-4 transition-all duration-300 ${
                    isActive ? 'text-primary-400' : 'group-hover:text-accent-400'
                  }`} />
                  <span className="text-sm font-medium">{tab.label}</span>

                  {/* Enhanced active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
                      layoutId="activeTabIndicator"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Hover glow effect */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNavigation
        tabs={tabsWithIcons}
        activeTab={currentTab}
        onTabChange={navigateToTab}
      />

      {/* Enhanced Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className="relative"
        >
          <Routes>
            <Route path="/" element={<ProfileSection />} />
            <Route path="/search" element={<SearchSection />} />
            <Route path="/stats" element={<StatsSection />} />
            <Route path="/progress" element={<ProgressTrackingSection />} />
            <Route path="/analytics" element={<ComparativeAnalyticsSection />} />
            <Route path="/achievements" element={<AchievementsSection />} />
            <Route path="/audits" element={<AuditsSection />} />
            <Route path="/technologies" element={<TechnologiesSection />} />

          </Routes>
        </motion.div>
      </main>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
