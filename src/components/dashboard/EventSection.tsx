import React, { useState } from 'react'
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
  BookOpen
} from 'lucide-react'
import { User } from '../../types'
import LoadingSpinner from '../ui/LoadingSpinner'

interface EventSectionProps {
  user: User
}

// Comprehensive event queries using our tested queries
const ALL_EVENTS_QUERY = gql`
  query GetAllEvents($limit: Int = 50, $offset: Int = 0) {
    event(limit: $limit, offset: $offset, order_by: {createdAt: desc}) {
      id
      createdAt
      endAt
      objectId
      parentId
      path
      campus
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

const USER_EVENT_PARTICIPATION_QUERY = gql`
  query GetUserEventParticipation($userId: Int!) {
    event_user(where: {userId: {_eq: $userId}}) {
      id
      eventId
      level
      createdAt
    }
  }
`;

const EVENTS_WITH_PARTICIPANTS_QUERY = gql`
  query GetEventsWithParticipants {
    event {
      id
      path
      campus
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
  const [campusFilter, setCampusFilter] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  // Query all events
  const { data: eventsData, loading: eventsLoading, error: eventsError } = useQuery(ALL_EVENTS_QUERY, {
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

  const getFilteredEvents = () => {
    let events = [];
    
    switch (selectedView) {
      case 'all':
        events = eventsData?.event || [];
        break;
      case 'my-events':
        const myEventIds = userEventsData?.event_user?.map((eu: any) => eu.eventId) || [];
        events = eventsData?.event?.filter((e: any) => myEventIds.includes(e.id)) || [];
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

    // Apply filters
    if (searchTerm) {
      events = events.filter((event: any) => 
        event.path?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.campus?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (campusFilter !== 'all') {
      events = events.filter((event: any) => event.campus === campusFilter);
    }

    return events;
  };

  const isEventActive = (endAt: string | null) => {
    if (!endAt) return false;
    return new Date(endAt) > new Date();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getEventStatus = (event: any) => {
    if (!event.endAt) return { status: 'ongoing', color: 'text-blue-400 bg-blue-400/20' };
    
    const isActive = isEventActive(event.endAt);
    if (isActive) {
      return { status: 'active', color: 'text-green-400 bg-green-400/20' };
    } else {
      return { status: 'completed', color: 'text-gray-400 bg-gray-400/20' };
    }
  };

  if (eventsLoading && !eventsData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Event Management Dashboard
        </h1>
        <p className="text-white/70 text-lg">
          Explore {eventsData?.event_aggregate?.aggregate?.count || 0} events with {eventStatsData?.event_user_view_aggregate?.aggregate?.count || 0} total participations
        </p>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-white font-medium">Total Events</p>
              <p className="text-2xl font-bold text-white">
                {eventsData?.event_aggregate?.aggregate?.count || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <UserCheck className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-white font-medium">Total Participations</p>
              <p className="text-2xl font-bold text-white">
                {eventStatsData?.event_user_view_aggregate?.aggregate?.count || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Activity className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-white font-medium">My Events</p>
              <p className="text-2xl font-bold text-white">
                {userEventsData?.event_user?.length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-white font-medium">Active Events</p>
              <p className="text-2xl font-bold text-white">
                {eventsData?.event?.filter((e: any) => isEventActive(e.endAt)).length || 0}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* View Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="bg-white/10 rounded-lg p-1">
          <button
            onClick={() => setSelectedView('all')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'all'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setSelectedView('my-events')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'my-events'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            My Events ({userEventsData?.event_user?.length || 0})
          </button>
          <button
            onClick={() => setSelectedView('active')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'active'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Active Events
          </button>
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
            placeholder="Search events by path or campus..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Campus Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-white/70" />
          <select
            value={campusFilter}
            onChange={(e) => setCampusFilter(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Campuses</option>
            <option value="bahrain">Bahrain</option>
            <option value="london">London</option>
            <option value="paris">Paris</option>
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
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
              onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
            >
              {/* Event Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary-400" />
                  <span className="text-white font-medium">Event #{event.id}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${eventStatus.color}`}>
                  {eventStatus.status}
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-3">
                {event.path && (
                  <div className="flex items-center space-x-2 text-sm">
                    <BookOpen className="w-4 h-4 text-white/60" />
                    <span className="text-white/80 truncate">{event.path}</span>
                  </div>
                )}
                
                {event.campus && (
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-white/60" />
                    <span className="text-white/80">{event.campus}</span>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-white/60" />
                  <span className="text-white/80">Created: {formatDate(event.createdAt)}</span>
                </div>

                {event.endAt && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-white/60" />
                    <span className="text-white/80">Ends: {formatDateTime(event.endAt)}</span>
                  </div>
                )}
              </div>

              {/* Expand Indicator */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <span className="text-white/60 text-sm">
                  Object ID: {event.objectId}
                </span>
                <ChevronRight 
                  className={`w-4 h-4 text-white/60 transition-transform ${
                    selectedEvent === event.id ? 'rotate-90' : ''
                  }`} 
                />
              </div>

              {/* Event Participants (Expanded) */}
              {selectedEvent === event.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  {participantsLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-primary-400" />
                        <span className="text-white font-medium text-sm">
                          Participants ({participantsData?.event_user?.length || 0})
                        </span>
                      </div>
                      {participantsData?.event_user?.slice(0, 5).map((participant: any) => (
                        <div key={participant.id} className="flex items-center justify-between text-sm">
                          <span className="text-white/80">User #{participant.userId}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white/60">Level {participant.level}</span>
                            <span className="text-white/60">{formatDate(participant.createdAt)}</span>
                          </div>
                        </div>
                      ))}
                      {(participantsData?.event_user?.length || 0) > 5 && (
                        <p className="text-white/60 text-xs">
                          +{(participantsData?.event_user?.length || 0) - 5} more participants
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          );
        })}
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
  )
}

export default EventSection
