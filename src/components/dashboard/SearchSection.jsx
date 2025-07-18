import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, TrendingUp, Filter, Clock, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import {
  useManualGraphQLData
} from '../../hooks/useGraphQLData';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Loading from '../ui/Loading';

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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCampus, setSelectedCampus] = useState('');



  // TODO: Implement search functionality with new GraphQL system
  // Placeholder data for now
  const projectResults = [];
  const auditResults = [];
  const userResults = [];
  const projectStatusCounts = {};
  const auditStatusCounts = {};
  const userStatusCounts = {};
  const campuses = [];
  const projectLoading = false;
  const auditLoading = false;
  const userLoading = false;

  // Placeholder search functions
  const searchProjects = () => {};
  const searchAudits = () => {};
  const searchEnhancedUsers = () => {};
  const filterProjectsByStatus = () => {};
  const filterAuditsByStatus = () => {};
  const filterUsersByStatus = () => {};

  // Store stable references to search functions to prevent infinite re-renders
  const searchFunctionsRef = useRef({});
  searchFunctionsRef.current = {
    searchProjects,
    searchAudits,
    searchEnhancedUsers
  };

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

  // Get available campuses from user search hook
  const availableCampuses = ['All Campuses', ...(campuses || [])];

  // Enhanced search handlers
  const handleSearch = useCallback(() => {
    const term = debouncedSearchTerm || searchTerm;
    const { searchProjects, searchAudits, searchEnhancedUsers } = searchFunctionsRef.current;

    switch (activeTab) {
      case 'projects':
        searchProjects(term, selectedStatus === 'all' ? ['working', 'audit', 'setup', 'finished'] : [selectedStatus]);
        break;
      case 'audits':
        searchAudits(term, selectedStatus === 'all' ? ['working', 'audit', 'setup', 'finished'] : [selectedStatus]);
        break;
      case 'users':
        searchEnhancedUsers(term, selectedStatus);
        break;
      default:
        break;
    }
  }, [activeTab, debouncedSearchTerm, searchTerm, selectedStatus]);

  // Debounce search term for auto-search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Auto-search when debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm.trim() || selectedStatus !== 'all') {
      handleSearch();
    }
  }, [debouncedSearchTerm, selectedStatus, activeTab, handleSearch]);

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
    setDebouncedSearchTerm('');
    setSelectedStatus('all');
    setSelectedCampus('');
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setSelectedStatus('all');
    setSelectedCampus('');
  };

  // Enhanced search handlers
  const handleCampusChange = (campus) => {
    setSelectedCampus(campus === 'All Campuses' ? '' : campus);
    // Auto-search when campus changes
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  const handleLoadMore = () => {
    const currentResults = getCurrentResults();
    const newOffset = currentResults.length;

    switch (activeTab) {
      case 'projects':
        searchProjects(searchTerm, selectedStatus, { offset: newOffset });
        break;
      case 'audits':
        searchAudits(searchTerm, selectedStatus, { offset: newOffset });
        break;
      case 'users':
        searchEnhancedUsers(searchTerm, selectedStatus, selectedCampus, { offset: newOffset });
        break;
    }
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
                  placeholder={`Search ${activeTab}... (auto-search enabled)`}
                  className="material-input pl-10 pr-10 w-full"
                />
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-400 hover:text-surface-200 transition-colors"
                  >
                    ✕
                  </button>
                )}
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

      {/* Additional Search Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campus Filter for Users */}
        {activeTab === 'users' && (
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center text-primary-300">
                <Users className="w-5 h-5 mr-2" />
                Campus Filter
              </Card.Title>
            </Card.Header>

            <Card.Content className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-200 mb-2">
                  Select Campus
                </label>
                <div className="relative">
                  <select
                    value={selectedCampus ? selectedCampus : 'All Campuses'}
                    onChange={(e) => handleCampusChange(e.target.value)}
                    className="material-input w-full appearance-none"
                  >
                    {availableCampuses.map((campus) => (
                      <option key={campus} value={campus} className="bg-surface-800">
                        {campus}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card.Content>
          </Card>
        )}

        {/* Load More Results */}
        {getCurrentResults().length > 0 && (
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center text-primary-300">
                <TrendingUp className="w-5 h-5 mr-2" />
                Load More Results
              </Card.Title>
            </Card.Header>

            <Card.Content>
              <div className="text-center">
                <p className="text-surface-300 text-sm mb-4">
                  Showing {getCurrentResults().length} results. Load more to see additional items.
                </p>
                <Button
                  onClick={handleLoadMore}
                  className="w-full"
                  disabled={getCurrentLoading()}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Load More
                </Button>
              </div>
            </Card.Content>
          </Card>
        )}
      </div>

      {/* Search Tips */}
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Search Tips
          </Card.Title>
        </Card.Header>

        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-white mb-2">Project Search</h4>
              <p className="text-surface-300 text-sm">
                Search your projects by name and filter by status (working, audit, setup, finished).
              </p>
            </div>

            <div>
              <h4 className="font-medium text-white mb-2">Audit Search</h4>
              <p className="text-surface-300 text-sm">
                Find audits you've given or received. Filter by status to see current audit activities.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-white mb-2">User Search</h4>
              <p className="text-surface-300 text-sm">
                Search for other users by login or name. Filter by campus to find local peers.
              </p>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default SearchSection;
