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
  ChevronRight,
  Star
} from 'lucide-react'
import { User } from '../../types'
import LoadingSpinner from '../ui/LoadingSpinner'
import SectionHeader from '../ui/SectionHeader'
import { formatDate as formatDateUtil } from '../../utils/dataFormatting'

interface GroupSectionProps {
  user: User
}

const ALL_GROUPS_QUERY = gql`
  query GetAllGroups($limit: Int = 50, $offset: Int = 0) {
    group(
      limit: $limit, 
      offset: $offset, 
      order_by: {createdAt: desc},
      where: {path: {_like: "%bh-module%"}}
    ) {
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

    group_aggregate(where: {path: {_like: "%bh-module%"}}) {
      aggregate {
        count
      }
    }
  }
`;

const GROUP_STATS_QUERY = gql`
  query GetGroupStats($userId: Int!) {
    # All groups for general stats (bh-module only)
    all_groups: group(where: {path: {_like: "%bh-module%"}}) {
      id
      status
      captainId
    }

    # Total groups count (bh-module only)
    group_aggregate(where: {path: {_like: "%bh-module%"}}) {
      aggregate {
        count
      }
    }

    # User's captain groups count (bh-module only)
    captain_groups_aggregate: group_aggregate(
      where: {
        captainId: {_eq: $userId},
        path: {_like: "%bh-module%"}
      }
    ) {
      aggregate {
        count
      }
    }

    # User's member groups count (bh-module only)
    member_groups_aggregate: group_user_aggregate(
      where: {
        userId: {_eq: $userId},
        group: {path: {_like: "%bh-module%"}}
      }
    ) {
      aggregate {
        count
      }
    }

    # Get user's groups for finding co-members (bh-module only)
    user_groups: group_user(
      where: {
        userId: {_eq: $userId},
        group: {path: {_like: "%bh-module%"}}
      }
    ) {
      groupId
    }
  }
`;

const ALL_GROUPS_WITH_MEMBERS_QUERY = gql`
  query GetAllGroupsWithMembers($searchTerm: String!) {
    # Search groups by member names (bh-module only)
    group_user(
      where: {
        _and: [
          { group: { path: { _like: "%bh-module%" } } },
          {
            _or: [
              { user: { login: { _ilike: $searchTerm } } },
              { user: { firstName: { _ilike: $searchTerm } } },
              { user: { lastName: { _ilike: $searchTerm } } }
            ]
          }
        ]
      }
      distinct_on: groupId
    ) {
      groupId
      user {
        login
        firstName
        lastName
      }
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

const CO_MEMBERS_QUERY = gql`
  query GetCoMembers($groupIds: [Int!]!, $userId: Int!) {
    group_user(
      where: {
        groupId: {_in: $groupIds},
        userId: {_neq: $userId}
      }
    ) {
      userId
      groupId
      user {
        id
        login
        firstName
        lastName
      }
    }
  }
`;

const MY_GROUPS_QUERY = gql`
  query GetMyGroups($userId: Int!) {
    # Groups where user is a captain (bh-module only)
    captainGroups: group(
      where: {
        captainId: {_eq: $userId},
        path: {_like: "%bh-module%"}
      }, 
      order_by: {createdAt: desc}
    ) {
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

    # Get user's group memberships to find member groups (bh-module only)
    group_user(
      where: {
        userId: {_eq: $userId},
        group: {path: {_like: "%bh-module%"}}
      }
    ) {
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

  
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedView, searchTerm, statusFilter]);

  
  const { data: groupsData, loading: groupsLoading, error: groupsError } = useQuery(ALL_GROUPS_QUERY, {
    variables: {
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage
    },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  
  const { data: userGroupsData } = useQuery(USER_GROUPS_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  
  const { data: myGroupsData, loading: myGroupsLoading } = useQuery(MY_GROUPS_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  
  const { data: statsData } = useQuery(GROUP_STATS_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  
  const { data: membersData, loading: membersLoading } = useQuery(GROUP_MEMBERS_QUERY, {
    variables: { groupId: selectedGroup || 0 },
    skip: !selectedGroup,
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  
  const { data: memberSearchData, loading: memberSearchLoading } = useQuery(ALL_GROUPS_WITH_MEMBERS_QUERY, {
    variables: { searchTerm: `%${searchTerm}%` },
    skip: !searchTerm || searchTerm.length < 2, 
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  
  const userGroupIds = statsData?.user_groups?.map((ug: any) => ug.groupId) || [];
  const { data: coMembersData } = useQuery(CO_MEMBERS_QUERY, {
    variables: { 
      groupIds: userGroupIds,
      userId: user.id 
    },
    skip: userGroupIds.length === 0,
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  
  const extractProjectName = (path: string): string => {
    if (!path) return '';
    
    
    
    
    const pathParts = path.split('/');
    const projectName = pathParts[pathParts.length - 1] || '';
    
    return projectName.replace(/-/g, ' '); 
  };

  
  const getGroupMemberNames = (_group: any): string[] => {
    
    
    return [];
  };

  
  const getCaptainName = (group: any): string => {
    if (!group.captain) return '';
    
    const names = [];
    if (group.captain.login) names.push(group.captain.login);
    if (group.captain.firstName) names.push(group.captain.firstName);  
    if (group.captain.lastName) names.push(group.captain.lastName);
    
    return names.join(' ');
  };

  
  const doesGroupMatchSearch = (group: any, searchTerm: string): boolean => {
    if (!searchTerm) return true;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    
    const projectName = extractProjectName(group.path);
    if (projectName.toLowerCase().includes(lowerSearchTerm)) {
      return true;
    }
    
    
    if (group.path?.toLowerCase().includes(lowerSearchTerm)) {
      return true;
    }
    
    
    const captainName = getCaptainName(group);
    if (captainName.toLowerCase().includes(lowerSearchTerm)) {
      return true;
    }
    
    
    const memberNames = getGroupMemberNames(group);
    if (memberNames.some(name => name.toLowerCase().includes(lowerSearchTerm))) {
      return true;
    }
    
    return false;
  };

  const getFilteredGroups = () => {
    let groups = [];

    switch (selectedView) {
      case 'all':
        groups = groupsData?.group || [];
        break;
      case 'my-groups': {
        
        if (myGroupsData) {
          const captainGroups = myGroupsData.captainGroups || [];
          const memberGroups = myGroupsData.group_user?.map((gu: any) => gu.group).filter(Boolean) || [];

          
          const allMyGroups = [...captainGroups, ...memberGroups];
          const uniqueGroups = allMyGroups.filter((group, index, self) =>
            index === self.findIndex(g => g.id === group.id)
          );
          
          
          groups = uniqueGroups.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else {
          
          const myGroupIds = userGroupsData?.group_user?.map((gu: any) => gu.groupId) || [];
          const filteredGroups = groupsData?.group?.filter((g: any) =>
            myGroupIds.includes(g.id) || g.captainId === user.id
          ) || [];
          
          
          groups = filteredGroups.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        break;
      }
      default:
        groups = groupsData?.group || [];
    }

    
    if (searchTerm) {
      
      const regularSearchGroups = groups.filter((group: any) => doesGroupMatchSearch(group, searchTerm));
      
      
      const memberSearchGroups = memberSearchData?.group_user?.map((gu: any) => gu.group).filter(Boolean) || [];
      
      
      const allSearchGroups = [...regularSearchGroups, ...memberSearchGroups];
      groups = allSearchGroups.filter((group, index, self) =>
        index === self.findIndex(g => g.id === group.id)
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

  const getCaptainUsername = (group: any) => {
    if (group.captain?.login) {
      return group.captain.login;
    }
    return `User #${group.captainId}`;
  };

  
  const isMyGroup = (group: any): boolean => {
    
    if (group.captainId === user.id) {
      return true;
    }
    
    
    const myGroupIds = userGroupsData?.group_user?.map((gu: any) => gu.groupId) || [];
    return myGroupIds.includes(group.id);
  };

  
  const getUserRoleInGroup = (group: any): string => {
    if (group.captainId === user.id) {
      return 'Captain';
    }
    
    const myGroupIds = userGroupsData?.group_user?.map((gu: any) => gu.groupId) || [];
    if (myGroupIds.includes(group.id)) {
      return 'Member';
    }
    
    return '';
  };

  const getMyGroupsCount = () => {
    if (myGroupsData) {
      const captainGroups = myGroupsData.captainGroups || [];
      const memberGroups = myGroupsData.group_user?.map((gu: any) => gu.group).filter(Boolean) || [];

      
      const allMyGroups = [...captainGroups, ...memberGroups];
      const uniqueGroups = allMyGroups.filter((group, index, self) =>
        index === self.findIndex(g => g.id === group.id)
      );
      return uniqueGroups.length;
    }

    
    const myGroupIds = userGroupsData?.group_user?.map((gu: any) => gu.groupId) || [];
    const captainGroups = groupsData?.group?.filter((g: any) => g.captainId === user.id) || [];
    const memberGroups = groupsData?.group?.filter((g: any) => myGroupIds.includes(g.id)) || [];

    
    const allGroups = [...memberGroups, ...captainGroups];
    const uniqueGroups = allGroups.filter((group, index, self) =>
      index === self.findIndex(g => g.id === group.id)
    );
    return uniqueGroups.length;
  };
  
  
  const getCompleteStats = () => {
    const allGroups = statsData?.all_groups || [];
    const totalCount = statsData?.group_aggregate?.aggregate?.count || 0;
    const captainCount = statsData?.captain_groups_aggregate?.aggregate?.count || 0;
    const memberCount = statsData?.member_groups_aggregate?.aggregate?.count || 0;
    
    
    const activeCount = allGroups.filter((g: any) => g.status === 'working' || g.status === 'audit').length;
    const completedCount = allGroups.filter((g: any) => g.status === 'finished').length;
    const userCaptainCount = allGroups.filter((g: any) => g.captainId === user.id).length;
    
    
    const totalUserGroups = Math.max(captainCount, memberCount, captainCount + memberCount - captainCount); 
    const userMemberOnlyCount = Math.max(0, totalUserGroups - userCaptainCount);
    
    // Find best co-member (most frequent collaborator)
    const coMemberFrequency: { [key: number]: { count: number, user: any } } = {};
    
    if (coMembersData?.group_user) {
      coMembersData.group_user.forEach((member: any) => {
        if (member.userId) {
          if (!coMemberFrequency[member.userId]) {
            coMemberFrequency[member.userId] = { count: 0, user: member.user };
          }
          coMemberFrequency[member.userId].count++;
        }
      });
    }
    
    const bestCoMember = Object.values(coMemberFrequency).reduce((best: any, current: any) => {
      return current.count > (best?.count || 0) ? current : best;
    }, null);
    
    return {
      total: totalCount,
      active: activeCount,
      completed: completedCount,
      userTotal: totalUserGroups,
      userAsCaptain: userCaptainCount,
      userAsMember: userMemberOnlyCount,
      bestCoMember: bestCoMember
    };
  };
  
  const completeStats = getCompleteStats();
  const totalGroups = groupsData?.group_aggregate?.aggregate?.count || 0;
  const totalPages = Math.ceil(totalGroups / itemsPerPage);

  if (groupsLoading && !groupsData) {
    return <LoadingSpinner />;
  }

  if (selectedView === 'my-groups' && myGroupsLoading && !myGroupsData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 h-full w-full relative">
      {/* Full Screen Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 40px 40px, rgba(52, 211, 153, 0.1) 2px, transparent 0)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>
      <div className="relative z-10 h-full w-full overflow-y-auto">
        
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
      >
        <StatCard 
          icon={Users} 
          title="Total Groups" 
          value={completeStats.total} 
          color="bg-gradient-to-r from-blue-500/30 to-cyan-500/30"
          bgGradient="bg-gradient-to-br from-blue-900/20 to-cyan-900/20"
          subValue="All collaborative groups"
        />

        <StatCard 
          icon={Activity} 
          title="Active Groups" 
          value={completeStats.active} 
          color="bg-gradient-to-r from-green-500/30 to-emerald-500/30"
          bgGradient="bg-gradient-to-br from-green-900/20 to-emerald-900/20"
          subValue="Currently working"
          trend={completeStats.active > completeStats.total * 0.6 ? 
            { value: 15, isPositive: true } : undefined}
        />

        <StatCard 
          icon={Calendar} 
          title="Completed" 
          value={completeStats.completed} 
          color="bg-gradient-to-r from-purple-500/30 to-violet-500/30"
          bgGradient="bg-gradient-to-br from-purple-900/20 to-violet-900/20"
          subValue="Successfully finished"
        />

        <StatCard 
          icon={Crown} 
          title="My Participation" 
          value={`${completeStats.userAsCaptain}/${completeStats.userAsMember}`} 
          color="bg-gradient-to-r from-yellow-500/30 to-amber-500/30"
          bgGradient="bg-gradient-to-br from-yellow-900/20 to-amber-900/20"
          subValue="Captain / Member roles"
        />

        <StatCard 
          icon={Star} 
          title="Best Co-Member" 
          value={completeStats.bestCoMember ? 
            (completeStats.bestCoMember.user?.login || completeStats.bestCoMember.user?.firstName || 'Unknown') : 
            'None'} 
          color="bg-gradient-to-r from-pink-500/30 to-rose-500/30"
          bgGradient="bg-gradient-to-br from-pink-900/20 to-rose-900/20"
          subValue={completeStats.bestCoMember ? 
            `${completeStats.bestCoMember.count} shared projects` : 
            'No collaborations yet'}
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
            placeholder="Search by project, members, or captain..."
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
        {getFilteredGroups().map((group: any, index: number) => {
          const userGroup = isMyGroup(group);
          const userRole = getUserRoleInGroup(group);
          
          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`backdrop-blur-lg rounded-xl p-6 transition-all duration-300 shadow-lg relative ${
                userGroup && selectedView === 'all'
                  ? 'bg-emerald-900/30 border-2 border-emerald-500/50 hover:bg-emerald-900/40 hover:border-emerald-400/60 shadow-emerald-500/20' 
                  : 'bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50'
              }`}
            >
              {/* Your Group Indicator */}
              {userGroup && selectedView === 'all' && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white/20">
                  <div className="flex items-center space-x-1">
                    <Crown className="w-3 h-3" />
                    <span>Your Group ({userRole})</span>
                  </div>
                </div>
              )}

              {/* Group Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    userGroup && selectedView === 'all' ? 'bg-emerald-500/20' : 'bg-primary-500/20'
                  }`}>
                    <Users className={`w-5 h-5 ${userGroup && selectedView === 'all' ? 'text-emerald-400' : 'text-primary-400'}`} />
                  </div>
                  <div>
                    <span className={`font-semibold text-lg ${userGroup && selectedView === 'all' ? 'text-emerald-100' : 'text-white'}`}>
                      #{extractProjectName(group.path)}
                    </span>
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
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    userGroup && selectedView === 'all' ? 'bg-emerald-500/20' : 'bg-yellow-500/20'
                  }`}>
                    <Crown className={`w-4 h-4 ${userGroup && selectedView === 'all' ? 'text-emerald-400' : 'text-yellow-400'}`} />
                  </div>
                  <div>
                    <div className={`font-medium ${userGroup && selectedView === 'all' ? 'text-emerald-100' : 'text-white'}`}>
                      {getCaptainUsername(group)}
                    </div>
                    <div className={`text-sm ${userGroup && selectedView === 'all' ? 'text-emerald-300' : 'text-slate-400'}`}>
                      Captain
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  userGroup && selectedView === 'all' ? 'bg-emerald-500/20' : 'bg-purple-500/20'
                }`}>
                  <Calendar className={`w-4 h-4 ${userGroup && selectedView === 'all' ? 'text-emerald-400' : 'text-purple-400'}`} />
                </div>
                <div>
                  <div className={`font-medium ${userGroup && selectedView === 'all' ? 'text-emerald-100' : 'text-white'}`}>
                    {formatDate(group.createdAt)}
                  </div>
                  <div className={`text-sm ${userGroup && selectedView === 'all' ? 'text-emerald-300' : 'text-slate-400'}`}>
                    Created
                  </div>
                </div>
              </div>
            </div>

            {/* Members Dropdown */}
            <div
              className={`flex items-center justify-between mt-6 pt-4 border-t transition-colors cursor-pointer rounded-lg p-3 ${
                userGroup && selectedView === 'all'
                  ? 'border-emerald-700/50 hover:bg-emerald-700/30' 
                  : 'border-slate-700/50 hover:bg-slate-700/30'
              }`}
              onClick={() => setSelectedGroup(selectedGroup === group.id ? null : group.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  userGroup && selectedView === 'all' ? 'bg-emerald-500/20' : 'bg-primary-500/20'
                }`}>
                  <Users className={`w-4 h-4 ${userGroup && selectedView === 'all' ? 'text-emerald-400' : 'text-primary-400'}`} />
                </div>
                <div>
                  <div className={`font-medium ${userGroup && selectedView === 'all' ? 'text-emerald-100' : 'text-white'}`}>
                    Group Members
                  </div>
                  <div className={`text-sm ${userGroup && selectedView === 'all' ? 'text-emerald-300' : 'text-slate-400'}`}>
                    {selectedGroup === group.id ? 'Click to hide members' : 'Click to view members'}
                  </div>
                </div>
              </div>
              <div className="transition-transform duration-200">
                {selectedGroup === group.id ? (
                  <ChevronUp className={`w-5 h-5 ${userGroup && selectedView === 'all' ? 'text-emerald-400' : 'text-slate-400'}`} />
                ) : (
                  <ChevronDown className={`w-5 h-5 ${userGroup && selectedView === 'all' ? 'text-emerald-400' : 'text-slate-400'}`} />
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
          );
        })}
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
