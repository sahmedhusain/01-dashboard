import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, TrendingUp, Filter } from 'lucide-react';
import { useUserSearch } from '../../hooks/useGraphQL';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Loading from '../ui/Loading';

const SearchSection = () => {
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

  const { searchUsers, users, loading } = useUserSearch();

  const cohorts = [
    'All Cohorts',
    'Cohort 1',
    'Cohort 2', 
    'Cohort 3',
    'Cohort 4',
  ];

  const handleGroupSearch = () => {
    console.log('Group search:', groupSearch);
    // Implement group search logic
  };

  const handleUserAdvanceSearch = () => {
    if (userSearch.username.trim()) {
      searchUsers(userSearch.username);
    }
  };

  const handleRankingSearch = () => {
    console.log('Ranking search:', rankingSearch);
    // Implement ranking search logic
  };

  return (
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
            loading={loading}
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
  );
};

export default SearchSection;
