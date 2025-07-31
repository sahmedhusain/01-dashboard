import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  Activity, 
  Search,
  Filter,
  ChevronRight,
  UserCheck,
  TrendingUp,
  BookOpen,
  ChevronLeft,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import { User } from '../../types'
import LoadingSpinner from '../ui/LoadingSpinner'
import SectionHeader from '../ui/SectionHeader'
import { formatDate as formatDateUtil, formatDateTime as formatDateTimeUtil } from '../../utils/dataFormatting'

interface EventSectionProps {
  user: User
}

// Complete event queries using our tested queries
const ALL_EVENTS_QUERY = gql`
  query GetAllEvents($limit: Int = 50, $offset: Int = 0) {
    event(limit: $limit, offset: $offset, order_by: {createdAt: desc}) {
      id
      createdAt
      endAt
      objectId
      parentId
      path
    }
    
    event_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const EVENT_PARTICIPANTS_QUERY = gql`
  query GetEventParticipants($eventId: Int!) {
    event_user(where: {eventId: {_eq: $eventId}}) {
      id
      userId
      eventId
      level
      createdAt
    }
  }
`;

const USERS_BY_IDS_QUERY = gql`
  query GetUsersByIds($userIds: [Int!]!) {
    user_public_view(where: {id: {_in: $userIds}}) {
      id
      login
      firstName
      lastName
    }
  }
`;

const USER_EVENT_PARTICIPATION_QUERY = gql`
  query GetUserEventParticipation($userId: Int!) {
    event_user(where: {userId: {_eq: $userId}}) {
      id
      eventId
      level
      createdAt
      event {
        id
        path
        createdAt
        endAt
        objectId
        parentId
      }
    }
  }
`;

const EVENTS_WITH_PARTICIPANTS_QUERY = gql`
  query GetEventsWithParticipants {
    event {
      id
      path
      createdAt
      endAt
      objectId
    }
  }
`;

const EVENT_USER_VIEW_QUERY = gql`
  query GetEventUserView {
    event_user_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const EventSection: React.FC<EventSectionProps> = ({ user }) => {
  const [selectedView, setSelectedView] = useState<'all' | 'my-events' | 'active'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedView, searchTerm, statusFilter]);

  // Helper functions for path parsing
  const extractEventName = (path: string) => {
    if (!path) return 'Unknown Event';
    const parts = path.split('/').filter(part => part);
    return parts[parts.length - 1] || 'Unknown Event';
  };

  const extractModuleName = (path: string) => {
    if (!path) return 'Unknown Module';
    const parts = path.split('/').filter(part => part);
    
    if (parts.includes('bh-piscine')) {
      return 'Go Piscine';
    } else if (parts.some(part => part.startsWith('piscine-'))) {
      const piscinePart = parts.find(part => part.startsWith('piscine-'));
      return piscinePart ? piscinePart.replace('piscine-', '').toUpperCase() + ' Piscine' : 'Piscine';
    } else if (parts.includes('bh-module')) {
      return 'BH-Module';
    } else if (parts.length >= 2) {
      return parts[parts.length - 2] || 'Module';
    }
    
    return 'Module';
  };

  // Query all events
  const { data: eventsData, loading: eventsLoading, error: eventsError } = useQuery(ALL_EVENTS_QUERY, {
    variables: {
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage
    },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query user's event participation
  const { data: userEventsData, loading: userEventsLoading } = useQuery(USER_EVENT_PARTICIPATION_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query event user view statistics
  const { data: eventStatsData } = useQuery(EVENT_USER_VIEW_QUERY, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query selected event participants
  const { data: participantsData, loading: participantsLoading } = useQuery(EVENT_PARTICIPANTS_QUERY, {
    variables: { eventId: selectedEvent || 0 },
    skip: !selectedEvent,
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Get user IDs from participants and query user data
  const participantUserIds = participantsData?.event_user?.map((p: any) => p.userId) || [];
  
  const { data: participantUsersData, loading: participantUsersLoading } = useQuery(USERS_BY_IDS_QUERY, {
    variables: { userIds: participantUserIds },
    skip: participantUserIds.length === 0,
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  const getFilteredEvents = () => {
    let events = [];
    
    switch (selectedView) {
      case 'all':
        events = eventsData?.event || [];
        break;
      case 'my-events':
        // Use the nested event data directly from user's event participation
        events = userEventsData?.event_user?.map((eu: any) => eu.event).filter(Boolean) || [];
        break;
      case 'active':
        const now = new Date();
        events = eventsData?.event?.filter((e: any) => 
          e.endAt && new Date(e.endAt) > now
        ) || [];
        break;
      default:
        events = eventsData?.event || [];
    }

    // Apply enhanced search filter (name, module, participants)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      events = events.filter((event: any) => {
        // Search by event name
        const eventName = extractEventName(event.path).toLowerCase();
        // Search by module name
        const moduleName = extractModuleName(event.path).toLowerCase();
        // Search by path
        const path = event.path?.toLowerCase() || '';
        
        // Search by participants (if participant data is available)
        let participantMatch = false;
        if (participantUsersData?.user_public_view) {
          participantMatch = participantUsersData.user_public_view.some((user: any) => 
            user.login?.toLowerCase().includes(searchLower) ||
            user.firstName?.toLowerCase().includes(searchLower) ||
            user.lastName?.toLowerCase().includes(searchLower) ||
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchLower)
          );
        }
        
        return eventName.includes(searchLower) ||
               moduleName.includes(searchLower) ||
               path.includes(searchLower) ||
               participantMatch;
      });
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      events = events.filter((event: any) => {
        const eventStatus = getEventStatus(event);
        return eventStatus.status === statusFilter;
      });
    }

    return events;
  };

  const isEventActive = (endAt: string | null) => {
    if (!endAt) return false;
    return new Date(endAt) > new Date();
  };

  // Use standardized date formatting functions
  const formatDate = formatDateUtil;
  const formatDateTime = formatDateTimeUtil;

  const getEventStatus = (event: any) => {
    if (!event.endAt) return { status: 'ongoing', color: 'text-blue-400 bg-blue-400/20' };
    
    const isActive = isEventActive(event.endAt);
    if (isActive) {
      return { status: 'active', color: 'text-green-400 bg-green-400/20' };
    } else {
      return { status: 'completed', color: 'text-gray-400 bg-gray-400/20' };
    }
  };

  const totalEvents = eventsData?.event_aggregate?.aggregate?.count || 0;
  const totalPages = Math.ceil(totalEvents / itemsPerPage);

  if (eventsLoading && !eventsData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900 min-h-full relative">
      {/* Full Screen Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 35px 35px, rgba(249, 115, 22, 0.1) 2px, transparent 0)`,
          backgroundSize: '70px 70px'
        }}></div>
      </div>
      <div className="relative z-10 overflow-hidden">
        
        <div className="relative space-y-8 p-6">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full backdrop-blur-sm border border-white/10 mb-4">
              <Calendar className="w-10 h-10 text-orange-400" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-orange-100 to-red-100 bg-clip-text text-transparent">
              Events Dashboard
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover and participate in <span className="text-orange-400 font-semibold">{totalEvents}</span> exciting coding events
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
          icon={Calendar} 
          title="Total Events" 
          value={totalEvents} 
          color="bg-gradient-to-r from-blue-500/30 to-cyan-500/30"
          bgGradient="bg-gradient-to-br from-blue-900/20 to-cyan-900/20"
          subValue="All available events"
        />

        <StatCard 
          icon={UserCheck} 
          title="Total Participations" 
          value={eventStatsData?.event_user_view_aggregate?.aggregate?.count || 0} 
          color="bg-gradient-to-r from-green-500/30 to-emerald-500/30"
          bgGradient="bg-gradient-to-br from-green-900/20 to-emerald-900/20"
          subValue="Community engagement"
        />

        <StatCard 
          icon={Activity} 
          title="My Events" 
          value={userEventsData?.event_user?.length || 0} 
          color="bg-gradient-to-r from-purple-500/30 to-violet-500/30"
          bgGradient="bg-gradient-to-br from-purple-900/20 to-violet-900/20"
          subValue="Your participation"
          trend={userEventsData?.event_user?.length > 10 ? { value: 20, isPositive: true } : undefined}
        />

        <StatCard 
          icon={TrendingUp} 
          title="Active Events" 
          value={eventsData?.event?.filter((e: any) => isEventActive(e.endAt)).length || 0} 
          color="bg-gradient-to-r from-orange-500/30 to-red-500/30"
          bgGradient="bg-gradient-to-br from-orange-900/20 to-red-900/20"
          subValue="Currently running"
        />

        <StatCard 
          icon={Clock} 
          title="Completed Events" 
          value={eventsData?.event?.filter((e: any) => !isEventActive(e.endAt)).length || 0} 
          color="bg-gradient-to-r from-gray-500/30 to-slate-500/30"
          bgGradient="bg-gradient-to-br from-gray-900/20 to-slate-900/20"
          subValue="Past events"
        />

        <StatCard 
          icon={BookOpen} 
          title="Participation Rate" 
          value={`${totalEvents > 0 ? ((userEventsData?.event_user?.length || 0) / totalEvents * 100).toFixed(1) : '0'}%`} 
          color="bg-gradient-to-r from-indigo-500/30 to-purple-500/30"
          bgGradient="bg-gradient-to-br from-indigo-900/20 to-purple-900/20"
          subValue="Your engagement level"
          trend={totalEvents > 0 && (userEventsData?.event_user?.length || 0) / totalEvents > 0.3 ? 
            { value: Math.round(((userEventsData?.event_user?.length || 0) / totalEvents - 0.2) * 100), isPositive: true } : undefined}
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
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>All Events</span>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedView('my-events')}
                className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  selectedView === 'my-events'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-5 h-5" />
                  <span>My Events</span>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedView('active')}
                className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  selectedView === 'active'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Active Events</span>
                </div>
              </motion.button>
            </div>
          </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Search events by name, module, path, or participants..."
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
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </div>
      </motion.div>

      {/* Events Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {getFilteredEvents().map((event: any, index: number) => {
          const eventStatus = getEventStatus(event);
          const eventName = extractEventName(event.path);
          const moduleName = extractModuleName(event.path);
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300 shadow-lg"
            >
              {/* Event Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <span className="text-white font-semibold text-lg">{eventName}</span>
                    <div className="text-slate-400 text-sm">{moduleName}</div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${eventStatus.color}`}>
                  {eventStatus.status}
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{formatDate(event.createdAt)}</div>
                    <div className="text-slate-400 text-sm">Created</div>
                  </div>
                </div>

                {event.endAt && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{formatDateTime(event.endAt)}</div>
                      <div className="text-slate-400 text-sm">Ends</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Participants Dropdown */}
              <div
                className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700/50 cursor-pointer hover:bg-slate-700/30 rounded-lg p-3 transition-colors"
                onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Participants</div>
                    <div className="text-slate-400 text-sm">{selectedEvent === event.id ? 'Click to hide' : 'Click to view'}</div>
                  </div>
                </div>
                <div className="transition-transform duration-200">
                  {selectedEvent === event.id ? (
                    <ChevronRight className="w-5 h-5 text-slate-400 rotate-90" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Event Participants (Expanded) */}
              {selectedEvent === event.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 bg-slate-900/50 rounded-lg p-4 border border-slate-700/30"
                >
                  {(participantsLoading || participantUsersLoading) ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                      <span className="ml-3 text-slate-400">Loading participants...</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-slate-700/50">
                        <UserCheck className="w-5 h-5 text-primary-400" />
                        <span className="text-white font-semibold">
                          Event Participants ({participantsData?.event_user?.length || 0})
                        </span>
                      </div>
                      <div className="max-h-48 overflow-y-auto space-y-2 custom-scrollbar">
                        {participantsData?.event_user?.map((participant: any) => {
                          // Find matching user data
                          const userData = participantUsersData?.user_public_view?.find((u: any) => u.id === participant.userId);
                          
                          return (
                            <div key={participant.id} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3 hover:bg-slate-800/70 transition-colors">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-full flex items-center justify-center border border-primary-500/20">
                                  <span className="text-primary-300 text-sm font-semibold">
                                    {userData?.firstName?.[0] || userData?.login?.[0] || 'U'}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-white font-medium">
                                    {userData?.login || 'Unknown User'}
                                  </div>
                                  {userData?.firstName && userData?.lastName ? (
                                    <div className="text-slate-400 text-sm">
                                      {userData.firstName} {userData.lastName}
                                    </div>
                                  ) : (
                                    <div className="text-slate-400 text-sm">
                                      ID: {participant.userId}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-slate-400 text-xs">Joined</div>
                                <div className="text-slate-300 text-sm">{formatDate(participant.createdAt)}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {(participantsData?.event_user?.length || 0) === 0 && (
                        <div className="text-center py-8">
                          <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                          <p className="text-slate-400 text-sm">No participants found for this event</p>
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
        transition={{ duration: 0.5, delay: 0.4 }}
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
            Showing {getFilteredEvents().length} of {totalEvents} events (Page {currentPage} of {totalPages})
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

      {/* Error Display */}
      {eventsError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/20 border border-red-500/30 rounded-lg p-4"
        >
          <p className="text-red-200 text-sm">
            Some event data may be unavailable. Using cached data where possible.
          </p>
        </motion.div>
      )}

      {/* Empty State */}
      {getFilteredEvents().length === 0 && !eventsLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Calendar className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-white/70 text-lg font-medium mb-2">No events found</h3>
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

export default EventSection
