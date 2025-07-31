import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import {
  Users,
  Crown,
  Calendar,
  Activity,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  UserPlus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { User } from '../../types'
import LoadingSpinner from '../ui/LoadingSpinner'
import SectionHeader from '../ui/SectionHeader'
import { formatDate as formatDateUtil } from '../../utils/dataFormatting'

interface GroupSectionProps {
  user: User
}

// Complete group queries using our tested queries
const ALL_GROUPS_QUERY = gql`
  query GetAllGroups($limit: Int = 50, $offset: Int = 0) {
    group(limit: $limit, offset: $offset, order_by: {createdAt: desc}) {
      id
      objectId
      eventId
      captainId
      createdAt
      updatedAt
      status
      path
      campus
      captain {
        id
        login
        firstName
        lastName
      }
    }

    group_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const GROUP_MEMBERS_QUERY = gql`
  query GetGroupMembers($groupId: Int!) {
    group_user(where: {groupId: {_eq: $groupId}}) {
      id
      userId
      groupId
      createdAt
      updatedAt
      user {
        id
        login
        firstName
        lastName
      }
    }
  }
`;

const USER_GROUPS_QUERY = gql`
  query GetUserGroups($userId: Int!) {
    group_user(where: {userId: {_eq: $userId}}) {
      id
      groupId
      createdAt
      updatedAt
    }
  }
`;

const MY_GROUPS_QUERY = gql`
  query GetMyGroups($userId: Int!) {
    # Groups where user is a captain
    captainGroups: group(where: {captainId: {_eq: $userId}}) {
      id
      objectId
      eventId
      captainId
      createdAt
      updatedAt
      status
      path
      campus
      captain {
        id
        login
        firstName
        lastName
      }
    }

    # Get user's group memberships to find member groups
    group_user(where: {userId: {_eq: $userId}}) {
      groupId
      group {
        id
        objectId
        eventId
        captainId
        createdAt
        updatedAt
        status
        path
        campus
        captain {
          id
          login
          firstName
          lastName
        }
      }
    }
  }
`;

const GroupSection: React.FC<GroupSectionProps> = ({ user }) => {
  const [selectedView, setSelectedView] = useState<'all' | 'my-groups'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedView, searchTerm, statusFilter]);

  // Query all groups
  const { data: groupsData, loading: groupsLoading, error: groupsError } = useQuery(ALL_GROUPS_QUERY, {
    variables: {
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage
    },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query user's groups (for backward compatibility)
  const { data: userGroupsData } = useQuery(USER_GROUPS_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query my groups (member + captain) - load immediately for accurate count
  const { data: myGroupsData, loading: myGroupsLoading } = useQuery(MY_GROUPS_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query selected group members
  const { data: membersData, loading: membersLoading } = useQuery(GROUP_MEMBERS_QUERY, {
    variables: { groupId: selectedGroup || 0 },
    skip: !selectedGroup,
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  const getFilteredGroups = () => {
    let groups = [];

    switch (selectedView) {
      case 'all':
        groups = groupsData?.group || [];
        break;
      case 'my-groups': {
        // Use the dedicated my groups query for better performance
        if (myGroupsData) {
          const captainGroups = myGroupsData.captainGroups || [];
          const memberGroups = myGroupsData.group_user?.map((gu: any) => gu.group).filter(Boolean) || [];

          // Combine and deduplicate groups (in case user is both member and captain of same group)
          const allMyGroups = [...captainGroups, ...memberGroups];
          const uniqueGroups = allMyGroups.filter((group, index, self) =>
            index === self.findIndex(g => g.id === group.id)
          );
          groups = uniqueGroups;
        } else {
          // Fallback to old method if new query fails
          const myGroupIds = userGroupsData?.group_user?.map((gu: any) => gu.groupId) || [];
          groups = groupsData?.group?.filter((g: any) =>
            myGroupIds.includes(g.id) || g.captainId === user.id
          ) || [];
        }
        break;
      }
      default:
        groups = groupsData?.group || [];
    }

    // Apply filters
    if (searchTerm) {
      groups = groups.filter((group: any) =>
        group.path?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      groups = groups.filter((group: any) => group.status === statusFilter);
    }

    return groups;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'finished': return 'text-green-400 bg-green-400/20';
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'working': return 'text-blue-400 bg-blue-400/20';
      case 'setup': return 'text-purple-400 bg-purple-400/20';
      case 'audit': return 'text-orange-400 bg-orange-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const formatDate = formatDateUtil;

  const extractProjectName = (path: string) => {
    if (!path) return 'Unknown Project';
    const parts = path.split('/');
    return parts[parts.length - 1] || 'Unknown Project';
  };

  const getCaptainUsername = (group: any) => {
    if (group.captain?.login) {
      return group.captain.login;
    }
    return `User #${group.captainId}`;
  };

  const getMyGroupsCount = () => {
    if (myGroupsData) {
      const captainGroups = myGroupsData.captainGroups || [];
      const memberGroups = myGroupsData.group_user?.map((gu: any) => gu.group).filter(Boolean) || [];

      // Combine and deduplicate to get accurate count
      const allMyGroups = [...captainGroups, ...memberGroups];
      const uniqueGroups = allMyGroups.filter((group, index, self) =>
        index === self.findIndex(g => g.id === group.id)
      );
      return uniqueGroups.length;
    }

    // Fallback to old method
    const myGroupIds = userGroupsData?.group_user?.map((gu: any) => gu.groupId) || [];
    const captainGroups = groupsData?.group?.filter((g: any) => g.captainId === user.id) || [];
    const memberGroups = groupsData?.group?.filter((g: any) => myGroupIds.includes(g.id)) || [];

    // Combine and deduplicate
    const allGroups = [...memberGroups, ...captainGroups];
    const uniqueGroups = allGroups.filter((group, index, self) =>
      index === self.findIndex(g => g.id === group.id)
    );
    return uniqueGroups.length;
  };
  
  const totalGroups = groupsData?.group_aggregate?.aggregate?.count || 0;
  const totalPages = Math.ceil(totalGroups / itemsPerPage);

  if (groupsLoading && !groupsData) {
    return <LoadingSpinner />;
  }

  if (selectedView === 'my-groups' && myGroupsLoading && !myGroupsData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900">
      <div className="relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 40px 40px, rgba(52, 211, 153, 0.1) 2px, transparent 0)`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        <div className="relative space-y-8 p-6">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full backdrop-blur-sm border border-white/10 mb-4">
              <Users className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent">
              Groups Dashboard
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Collaborate and excel with <span className="text-emerald-400 font-semibold">{totalGroups}</span> dynamic project teams
            </p>
          </motion.div>

      {/* Enhanced Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
      >
        <StatCard 
          icon={Users} 
          title="Total Groups" 
          value={totalGroups} 
          color="bg-gradient-to-r from-blue-500/30 to-cyan-500/30"
          bgGradient="bg-gradient-to-br from-blue-900/20 to-cyan-900/20"
          subValue="All collaborative groups"
        />

        <StatCard 
          icon={Crown} 
          title="My Groups" 
          value={getMyGroupsCount()} 
          color="bg-gradient-to-r from-yellow-500/30 to-amber-500/30"
          bgGradient="bg-gradient-to-br from-yellow-900/20 to-amber-900/20"
          subValue="Your active participation"
        />

        <StatCard 
          icon={Activity} 
          title="Active Groups" 
          value={getFilteredGroups().filter(g => g.status === 'working' || g.status === 'audit').length} 
          color="bg-gradient-to-r from-green-500/30 to-emerald-500/30"
          bgGradient="bg-gradient-to-br from-green-900/20 to-emerald-900/20"
          subValue="Currently working"
          trend={getFilteredGroups().filter(g => g.status === 'working' || g.status === 'audit').length > totalGroups * 0.6 ? 
            { value: 15, isPositive: true } : undefined}
        />

        <StatCard 
          icon={Calendar} 
          title="Completed" 
          value={getFilteredGroups().filter(g => g.status === 'finished').length} 
          color="bg-gradient-to-r from-purple-500/30 to-violet-500/30"
          bgGradient="bg-gradient-to-br from-purple-900/20 to-violet-900/20"
          subValue="Successfully finished"
        />

        <StatCard 
          icon={UserPlus} 
          title="As Captain" 
          value={getFilteredGroups().filter(g => g.captainId === user.id).length} 
          color="bg-gradient-to-r from-red-500/30 to-rose-500/30"
          bgGradient="bg-gradient-to-br from-red-900/20 to-rose-900/20"
          subValue="Leadership roles"
        />

        <StatCard 
          icon={Users} 
          title="As Member" 
          value={getMyGroupsCount() - getFilteredGroups().filter(g => g.captainId === user.id).length} 
          color="bg-gradient-to-r from-indigo-500/30 to-blue-500/30"
          bgGradient="bg-gradient-to-br from-indigo-900/20 to-blue-900/20"
          subValue="Team collaborations"
        />
      </motion.div>

          {/* Enhanced View Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-2 shadow-2xl">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedView('all')}
                className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  selectedView === 'all'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>All Groups</span>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedView('my-groups')}
                className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  selectedView === 'my-groups'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5" />
                  <span>My Groups</span>
                </div>
              </motion.button>
            </div>
          </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Search groups by project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-white/70" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="audit">Audit</option>
            <option value="setup">Setup</option>
            <option value="working">Working</option>
            <option value="finished">Finished</option>
          </select>
        </div>
      </motion.div>

      {/* Groups Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {getFilteredGroups().map((group: any, index: number) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300 shadow-lg"
          >
            {/* Group Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <span className="text-white font-semibold text-lg">#{extractProjectName(group.path)}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusColor(group.status)}`}>
                {group.status}
              </div>
            </div>

            {/* Group Details */}
            <div className="space-y-4">

              {group.captainId && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Crown className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{getCaptainUsername(group)}</div>
                    <div className="text-slate-400 text-sm">Captain</div>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-white font-medium">{formatDate(group.createdAt)}</div>
                  <div className="text-slate-400 text-sm">Created</div>
                </div>
              </div>
            </div>

            {/* Members Dropdown */}
            <div
              className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700/50 cursor-pointer hover:bg-slate-700/30 rounded-lg p-3 transition-colors"
              onClick={() => setSelectedGroup(selectedGroup === group.id ? null : group.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary-400" />
                </div>
                <div>
                  <div className="text-white font-medium">
                    Group Members
                  </div>
                  <div className="text-slate-400 text-sm">{selectedGroup === group.id ? 'Click to hide members' : 'Click to view members'}</div>
                </div>
              </div>
              <div className="transition-transform duration-200">
                {selectedGroup === group.id ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </div>

            {/* Group Members (Expanded) */}
            {selectedGroup === group.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 bg-slate-900/50 rounded-lg p-4 border border-slate-700/30"
              >
                {membersLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                    <span className="ml-3 text-slate-400">Loading members...</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-slate-700/50">
                      <UserPlus className="w-5 h-5 text-primary-400" />
                      <span className="text-white font-semibold">
                        Group Members ({membersData?.group_user?.length || 0})
                      </span>
                    </div>
                    <div className="max-h-48 overflow-y-auto space-y-2 custom-scrollbar">
                      {membersData?.group_user?.map((member: any) => (
                        <div key={member.id} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3 hover:bg-slate-800/70 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-full flex items-center justify-center border border-primary-500/20">
                              <span className="text-primary-300 text-sm font-semibold">
                                {member.user?.firstName?.[0] || member.user?.login?.[0] || 'U'}
                              </span>
                            </div>
                            <div>
                              <div className="text-white font-medium">
                                {member.user?.login || `User #${member.userId}`}
                              </div>
                              {member.user?.firstName && member.user?.lastName && (
                                <div className="text-slate-400 text-sm">
                                  {member.user.firstName} {member.user.lastName}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-slate-400 text-xs">Joined</div>
                            <div className="text-slate-300 text-sm">{formatDate(member.createdAt)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {(membersData?.group_user?.length || 0) === 0 && (
                      <div className="text-center py-8">
                        <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400 text-sm">
                          No members found in this group
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex items-center justify-between text-white"
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm">Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">
            Showing {getFilteredGroups().length} of {totalGroups} groups (Page {currentPage} of {totalPages})
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Empty State */}
      {getFilteredGroups().length === 0 && !groupsLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-white/70 text-lg font-medium mb-2">No groups found</h3>
          <p className="text-white/50">
            Try adjusting your search criteria or filters.
          </p>
        </motion.div>
      )}

      {/* Error Display */}
      {groupsError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/20 border border-red-500/30 rounded-lg p-4"
        >
          <p className="text-red-200 text-sm">
            Some group data may be unavailable. Using cached data where possible.
          </p>
        </motion.div>
      )}

      {/* Empty State */}
      {getFilteredGroups().length === 0 && !groupsLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-white/70 text-lg font-medium mb-2">No groups found</h3>
          <p className="text-white/50">
            Try adjusting your search criteria or filters.
          </p>
        </motion.div>
      )}
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon: Icon, title, value, color, subValue, trend, bgGradient }: { 
  icon: React.ElementType, 
  title: string, 
  value: string | number, 
  color: string,
  subValue?: string,
  trend?: { value: number, isPositive: boolean },
  bgGradient?: string
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`${bgGradient || 'bg-gradient-to-br from-slate-800/50 to-slate-900/50'} backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} backdrop-blur-sm`}>
        <Icon className="w-8 h-8 text-white drop-shadow-lg" />
      </div>
      {trend && (
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${
          trend.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
        </div>
      )}
    </div>
    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{value}</h3>
    <p className="text-white/70 text-sm font-medium">{title}</p>
    {subValue && <p className="text-white/50 text-xs mt-2 bg-white/5 rounded-lg px-2 py-1">{subValue}</p>}
  </motion.div>
);

export default GroupSection
