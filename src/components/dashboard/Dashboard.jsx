import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Search, User, BarChart3, Trophy, Users, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/authUtils.jsx';
import { useData } from '../../hooks/useData';
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
import { getUserDisplayName, formatXP } from '../../utils/dataFormatting';
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout, user } = useAuth();
  const { userStatistics, totalXP, loading, error, refetchAll } = useData();

  // Close mobile menu when tab changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  const tabs = [
    { id: 'profile', label: 'Profile & Data', icon: User },
    { id: 'search', label: 'Search Queries', icon: Search },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'audits', label: 'Audits', icon: Trophy },
    { id: 'technologies', label: 'Technologies', icon: Users },
  ];

  const handleLogout = () => {
    logout();
  };

  if (loading) {
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
  if (error && !userStatistics) {
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
      <div className="min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Title */}
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 bg-gradient-to-r from-primary-400 to-accent-400 rounded-lg flex items-center justify-center mr-3"
              >
                <User className="w-5 h-5 text-white" />
              </motion.div>
              <h1 className="text-lg md:text-xl font-bold gradient-text">
                Profile Dashboard
              </h1>
            </div>

            {/* Desktop: User info and logout */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {getUserDisplayName(userStatistics) || user?.username}
                </p>
                <p className="text-xs text-surface-400">
                  {formatXP(totalXP)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-surface-300 hover:text-red-400"
              >
                <LogOut className="w-4 h-4" />
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">
                    {getUserDisplayName(userStatistics) || user?.username}
                  </p>
                  <p className="text-xs text-surface-400">
                    {formatXP(totalXP)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-surface-300 hover:text-red-400"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Desktop Navigation Tabs */}
      <nav className="sticky top-16 z-30 bg-surface-800/80 backdrop-blur-md border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap relative ${
                    isActive
                      ? 'border-primary-400 text-primary-300'
                      : 'border-transparent text-surface-400 hover:text-surface-200'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>

                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400"
                      layoutId="activeTabIndicator"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'profile' && <ProfileSection />}
          {activeTab === 'search' && <SearchSection />}
          {activeTab === 'stats' && <StatsSection />}
          {activeTab === 'audits' && <AuditsSection />}
          {activeTab === 'technologies' && <TechnologiesSection />}
        </motion.div>
      </main>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
