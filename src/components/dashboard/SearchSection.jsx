import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, TrendingUp, Filter, Clock, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import {
  useUserSearch,
  useProjectSearch,
  useAuditSearch,
  useEnhancedUserSearch
} from '../../hooks/useGraphQL';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Loading from '../ui/Loading';
import Badge from '../ui/Badge';

// Search Result Item Component
const SearchResultItem = ({ result, type }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'working': return 'text-blue-400 bg-blue-400/10';
      case 'audit': return 'text-yellow-400 bg-yellow-400/10';
      case 'setup': return 'text-purple-400 bg-purple-400/10';
      case 'finished': return 'text-green-400 bg-green-400/10';
      default: return 'text-surface-400 bg-surface-400/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'working': return Clock;
      case 'audit': return AlertCircle;
      case 'setup': return Settings;
      case 'finished': return CheckCircle;
      default: return Filter;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: '2-digit',
    });
  };

  const StatusIcon = getStatusIcon(result.status);

  return (
    <motion.div
      className="flex items-center justify-between p-4 bg-surface-800 rounded-lg hover:bg-surface-700 transition-colors duration-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-1">
        <div className="flex items-center space-x-3">
          <StatusIcon className={`w-4 h-4 ${getStatusColor(result.status).split(' ')[0]}`} />
          <div>
            <h4 className="font-medium text-white">
              {type === 'users'
                ? result.login
                : result.object?.name || result.path?.split('/').pop() || 'Unknown'
              }
            </h4>
            <p className="text-sm text-surface-400">
              {type === 'users'
                ? result.campus || 'No campus'
                : result.path || 'No path'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Status Badge */}
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
          {result.status}
        </span>

        {/* Type-specific info */}
        {type === 'projects' && (
          <span className="text-sm text-surface-300">
            Grade: {result.grade || 0}
          </span>
        )}

        {type === 'audits' && (
          <span className="text-sm text-surface-300">
            {result.type === 'given' ? 'Given' : 'Received'}
          </span>
        )}

        {type === 'users' && result.totalXP && (
          <span className="text-sm text-surface-300">
            {result.totalXP} XP
          </span>
        )}

        {/* Date */}
        <span className="text-xs text-surface-500">
          {formatDate(result.updatedAt || result.createdAt)}
        </span>
      </div>
    </motion.div>
  );
};

const SearchSection = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCampus, setSelectedCampus] = useState('');

  // Legacy search states for backward compatibility
  const [groupSearch, setGroupSearch] = useState({
    cohort: 'All Cohorts',
    status: 'Working',
  });

  const [userSearch, setUserSearch] = useState({
    username: '',
    status: 'Working',
  });

  const [rankingSearch, setRankingSearch] = useState({
    cohort: 'All Cohorts',
    limit: '0',
  });

  // Enhanced search hooks
  const {
    searchResults: projectResults,
    searchProjects,
    filterByStatus: filterProjectsByStatus,
    statusCounts: projectStatusCounts,
    loading: projectLoading
  } = useProjectSearch();

  const {
    searchResults: auditResults,
    searchAudits,
    filterByStatus: filterAuditsByStatus,
    filterByType: filterAuditsByType,
    statusCounts: auditStatusCounts,
    typeCounts: auditTypeCounts,
    loading: auditLoading
  } = useAuditSearch();

  const {
    searchResults: userResults,
    searchUsers: searchEnhancedUsers,
    filterByStatus: filterUsersByStatus,
    filterByCampus,
    statusCounts: userStatusCounts,
    campuses,
    loading: userLoading
  } = useEnhancedUserSearch();

  // Legacy hook for backward compatibility
  const { searchUsers, users, loading: legacyLoading } = useUserSearch();

  // Status options for filtering
  const statusOptions = [
    { value: 'all', label: 'All Status', icon: Filter, color: 'text-surface-400' },
    { value: 'working', label: 'Working', icon: Clock, color: 'text-blue-400' },
    { value: 'audit', label: 'In Audit', icon: AlertCircle, color: 'text-yellow-400' },
    { value: 'setup', label: 'Setup', icon: Settings, color: 'text-purple-400' },
    { value: 'finished', label: 'Finished', icon: CheckCircle, color: 'text-green-400' },
  ];

  const tabOptions = [
    { value: 'projects', label: 'Projects', icon: TrendingUp },
    { value: 'audits', label: 'Audits', icon: Users },
    { value: 'users', label: 'Users', icon: Search },
  ];

  const cohorts = [
    'All Cohorts',
    'Cohort 1',
    'Cohort 2',
    'Cohort 3',
    'Cohort 4',
  ];

  // Enhanced search handlers
  const handleSearch = () => {
    if (!searchTerm.trim() && selectedStatus === 'all') return;

    switch (activeTab) {
      case 'projects':
        searchProjects(searchTerm, selectedStatus);
        break;
      case 'audits':
        searchAudits(searchTerm, selectedStatus);
        break;
      case 'users':
        searchEnhancedUsers(searchTerm, selectedStatus, selectedCampus);
        break;
      default:
        break;
    }
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    // Auto-search when status changes
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
    setSelectedStatus('all');
  };

  // Legacy handlers for backward compatibility
  const handleGroupSearch = () => {
    console.log('Group search - legacy');
  };

  const handleUserAdvanceSearch = () => {
    if (searchTerm.trim()) {
      searchUsers(searchTerm);
    }
  };

  const handleRankingSearch = () => {
    console.log('Ranking search - legacy');
  };

  // Get current results based on active tab
  const getCurrentResults = () => {
    switch (activeTab) {
      case 'projects':
        return selectedStatus === 'all' ? projectResults : filterProjectsByStatus(selectedStatus);
      case 'audits':
        return selectedStatus === 'all' ? auditResults : filterAuditsByStatus(selectedStatus);
      case 'users':
        return selectedStatus === 'all' ? userResults : filterUsersByStatus(selectedStatus);
      default:
        return [];
    }
  };

  const getCurrentLoading = () => {
    switch (activeTab) {
      case 'projects':
        return projectLoading;
      case 'audits':
        return auditLoading;
      case 'users':
        return userLoading;
      default:
        return false;
    }
  };

  const getCurrentStatusCounts = () => {
    switch (activeTab) {
      case 'projects':
        return projectStatusCounts;
      case 'audits':
        return auditStatusCounts;
      case 'users':
        return userStatusCounts;
      default:
        return { all: 0, working: 0, audit: 0, setup: 0, finished: 0 };
    }
  };

  const currentResults = getCurrentResults();
  const currentLoading = getCurrentLoading();
  const currentStatusCounts = getCurrentStatusCounts();

  return (
    <div className="space-y-6">
      {/* Enhanced Search Header */}
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center text-primary-300">
            <Search className="w-5 h-5 mr-2" />
            Enhanced Search with Status Filtering
          </Card.Title>
          <Card.Description>
            Search projects, audits, and users with selective status filtering: working, audit, setup, finished
          </Card.Description>
        </Card.Header>

        <Card.Content className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-surface-800 p-1 rounded-lg">
            {tabOptions.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.value
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-surface-300 hover:text-white hover:bg-surface-700'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-surface-200 mb-2">
                Search Term
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={`Search ${activeTab}...`}
                  className="material-input pl-10 w-full"
                />
              </div>
            </div>

            {activeTab === 'users' && (
              <div className="w-48">
                <label className="block text-sm font-medium text-surface-200 mb-2">
                  Campus
                </label>
                <select
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                  className="material-input w-full"
                >
                  <option value="">All Campuses</option>
                  {campuses.map((campus) => (
                    <option key={campus} value={campus}>
                      {campus}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Status Filter Pills */}
          <div>
            <label className="block text-sm font-medium text-surface-200 mb-3">
              Filter by Status
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => {
                const Icon = status.icon;
                const count = currentStatusCounts[status.value] || 0;
                const isActive = selectedStatus === status.value;

                return (
                  <motion.button
                    key={status.value}
                    onClick={() => handleStatusChange(status.value)}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-surface-700 text-surface-300 hover:bg-surface-600 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-white' : status.color}`} />
                    {status.label}
                    {count > 0 && (
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                        isActive ? 'bg-white/20' : 'bg-surface-600'
                      }`}>
                        {count}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSearch}
              disabled={currentLoading}
              className="px-6"
            >
              {currentLoading ? (
                <>
                  <Loading className="w-4 h-4 mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search {activeTab}
                </>
              )}
            </Button>
          </div>
        </Card.Content>
      </Card>

      {/* Search Results */}
      {(currentResults.length > 0 || currentLoading) && (
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center justify-between">
              <span>Search Results</span>
              <span className="text-sm text-surface-400">
                {currentResults.length} {activeTab} found
              </span>
            </Card.Title>
          </Card.Header>

          <Card.Content>
            {currentLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loading className="w-6 h-6 mr-2" />
                <span>Searching {activeTab}...</span>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {currentResults.map((result, index) => (
                  <SearchResultItem
                    key={result.id || index}
                    result={result}
                    type={activeTab}
                  />
                ))}
              </div>
            )}
          </Card.Content>
        </Card>
      )}

      {/* Legacy Search Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Group Search */}
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center text-primary-300">
            <Users className="w-5 h-5 mr-2" />
            Group Search
          </Card.Title>
        </Card.Header>
        
        <Card.Content className="space-y-4">
          {/* Cohort Dropdown */}
          <div>
            <label className="block text-sm font-medium text-surface-200 mb-2">
              Select Cohort
            </label>
            <div className="relative">
              <select
                value={groupSearch.cohort}
                onChange={(e) => setGroupSearch(prev => ({ ...prev, cohort: e.target.value }))}
                className="material-input w-full appearance-none"
              >
                {cohorts.map((cohort) => (
                  <option key={cohort} value={cohort} className="bg-surface-800">
                    {cohort}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Input */}
          <div>
            <input
              type="text"
              value={groupSearch.status}
              onChange={(e) => setGroupSearch(prev => ({ ...prev, status: e.target.value }))}
              className="material-input w-full"
              placeholder="Status"
            />
          </div>

          <Button 
            onClick={handleGroupSearch}
            className="w-full"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </Card.Content>
      </Card>

      {/* User Advance Search */}
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center text-primary-300">
            <Search className="w-5 h-5 mr-2" />
            User Advance Search
          </Card.Title>
        </Card.Header>
        
        <Card.Content className="space-y-4">
          {/* Username Input */}
          <div>
            <input
              type="text"
              value={userSearch.username}
              onChange={(e) => setUserSearch(prev => ({ ...prev, username: e.target.value }))}
              className="material-input w-full"
              placeholder="Username"
            />
          </div>

          {/* Status Input */}
          <div>
            <input
              type="text"
              value={userSearch.status}
              onChange={(e) => setUserSearch(prev => ({ ...prev, status: e.target.value }))}
              className="material-input w-full"
              placeholder="Status"
            />
          </div>

          <Button 
            onClick={handleUserAdvanceSearch}
            className="w-full"
            loading={legacyLoading}
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>

          {/* Search Results */}
          {users.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium text-surface-200">Results:</h4>
              {users.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-surface-800/50 rounded-lg"
                >
                  <p className="text-white font-medium">{user.login}</p>
                  {(user.firstName || user.lastName) && (
                    <p className="text-surface-300 text-sm">
                      {user.firstName} {user.lastName}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>

      {/* Ranking Search */}
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center text-primary-300">
            <TrendingUp className="w-5 h-5 mr-2" />
            Ranking Search
          </Card.Title>
        </Card.Header>
        
        <Card.Content className="space-y-4">
          {/* Limit Input */}
          <div>
            <input
              type="number"
              value={rankingSearch.limit}
              onChange={(e) => setRankingSearch(prev => ({ ...prev, limit: e.target.value }))}
              className="material-input w-full"
              placeholder="0"
              min="0"
            />
          </div>

          {/* Cohort Dropdown */}
          <div>
            <select
              value={rankingSearch.cohort}
              onChange={(e) => setRankingSearch(prev => ({ ...prev, cohort: e.target.value }))}
              className="material-input w-full appearance-none"
            >
              {cohorts.map((cohort) => (
                <option key={cohort} value={cohort} className="bg-surface-800">
                  {cohort}
                </option>
              ))}
            </select>
          </div>

          <Button 
            onClick={handleRankingSearch}
            className="w-full"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Search Rankings
          </Button>
        </Card.Content>
      </Card>

      {/* Search Tips */}
      <Card className="xl:col-span-3">
        <Card.Header>
          <Card.Title className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Search Tips
          </Card.Title>
        </Card.Header>
        
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-white mb-2">Group Search</h4>
              <p className="text-surface-300 text-sm">
                Search for groups by cohort and status. Filter by working status to find active groups.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-2">User Search</h4>
              <p className="text-surface-300 text-sm">
                Find specific users by username. Add status filters to narrow down results.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-2">Ranking Search</h4>
              <p className="text-surface-300 text-sm">
                View top performers by cohort. Set a limit to see top N users or leave as 0 for all.
              </p>
            </div>
          </div>
        </Card.Content>
      </Card>
      </div>
    </div>
  );
};

export default SearchSection;
