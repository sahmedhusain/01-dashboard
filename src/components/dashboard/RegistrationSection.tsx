import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import { 
  UserPlus, 
  Calendar, 
  Clock, 
  Users,
  Search,
  Filter,
  ChevronRight,
  ChevronDown,
  MapPin,
  Activity,
  Target,
  CheckCircle,
  AlertCircle,
  BookOpen,
  TrendingUp
} from 'lucide-react'
import { User } from '../../types'
import LoadingSpinner from '../ui/LoadingSpinner'
import { formatDate, formatDateTime } from '../../utils/dataFormatting'

interface RegistrationSectionProps {
  user: User
}

const GET_ALL_REGISTRATIONS = gql`
  query GetAllRegistrations($limit: Int = 100, $offset: Int = 0) {
    registration(limit: $limit, offset: $offset, order_by: {createdAt: desc}) {
      id
      createdAt
      startAt
      endAt
      objectId
      path
      campus
    }
    
    registration_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const GET_ALL_REGISTRATION_USERS = gql`
  query GetAllRegistrationUsers($limit: Int = 100, $offset: Int = 0) {
    registration_user(limit: $limit, offset: $offset, order_by: {createdAt: desc}) {
      id
      createdAt
      registrationId
      userId
    }
    
    registration_user_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const GET_REGISTRATION_USER_VIEW = gql`
  query GetRegistrationUserView {
    registration_user_view {
      id
      registrationId
    }
    
    registration_user_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const GET_USER_REGISTRATIONS = gql`
  query GetUserRegistrations($userId: Int!) {
    registration_user(where: {userId: {_eq: $userId}}) {
      id
      createdAt
      registrationId
      userId
    }
  }
`;

const RegistrationSection: React.FC<RegistrationSectionProps> = ({ user }) => {
  const [selectedView, setSelectedView] = useState<'all-registrations' | 'registration-users' | 'my-registrations' | 'statistics'>('all-registrations');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRegistration, setSelectedRegistration] = useState<number | null>(null);

  
  const { data: registrationsData, loading: registrationsLoading, error: registrationsError } = useQuery(GET_ALL_REGISTRATIONS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  
  const { data: registrationUsersData, loading: registrationUsersLoading } = useQuery(GET_ALL_REGISTRATION_USERS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  
  const { data: registrationUserViewData } = useQuery(GET_REGISTRATION_USER_VIEW, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  
  const { data: userRegistrationsData, loading: userRegistrationsLoading } = useQuery(GET_USER_REGISTRATIONS, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  if (registrationsLoading && !registrationsData) {
    return <LoadingSpinner />;
  }

  if (registrationsError) {
    return (
      <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
        <p className="text-red-200">Error loading registration data: {registrationsError.message}</p>
      </div>
    );
  }

  const registrations = registrationsData?.registration || [];
  const totalRegistrations = registrationsData?.registration_aggregate?.aggregate?.count || 0;
  const registrationUsers = registrationUsersData?.registration_user || [];
  const totalRegistrationUsers = registrationUsersData?.registration_user_aggregate?.aggregate?.count || 0;
  const registrationUserView = registrationUserViewData?.registration_user_view || [];
  const totalRegistrationUserView = registrationUserViewData?.registration_user_view_aggregate?.aggregate?.count || 0;
  const userRegistrations = userRegistrationsData?.registration_user || [];

  
  const getFilteredData = () => {
    let filtered = [];
    
    switch (selectedView) {
      case 'all-registrations':
        filtered = registrations;
        break;
      case 'registration-users':
        filtered = registrationUsers;
        break;
      case 'my-registrations':
        filtered = userRegistrations;
        break;
      case 'statistics':
        filtered = registrationUserView;
        break;
      default:
        filtered = registrations;
    }

    
    if (searchTerm && selectedView === 'all-registrations') {
      filtered = filtered.filter((reg: any) => 
        reg.path?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.campus?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    
    

    
    if (statusFilter !== 'all' && selectedView === 'all-registrations') {
      const now = new Date();
      filtered = filtered.filter((reg: any) => {
        const startDate = reg.startAt ? new Date(reg.startAt) : null;
        const endDate = reg.endAt ? new Date(reg.endAt) : null;
        
        switch (statusFilter) {
          case 'active':
            return startDate && endDate && startDate <= now && now <= endDate;
          case 'upcoming':
            return startDate && startDate > now;
          case 'completed':
            return endDate && endDate < now;
          default:
            return true;
        }
      });
    }

    return filtered;
  };

  
  const uniqueCampuses = [...new Set(registrations.map((reg: any) => reg.campus).filter(Boolean))];

  
  const getRegistrationStatus = (registration: any) => {
    const now = new Date();
    const startDate = registration.startAt ? new Date(registration.startAt) : null;
    const endDate = registration.endAt ? new Date(registration.endAt) : null;
    
    if (!startDate && !endDate) {
      return { status: 'open', color: 'text-blue-400 bg-blue-400/20', icon: AlertCircle };
    }
    
    if (startDate && endDate) {
      if (startDate <= now && now <= endDate) {
        return { status: 'active', color: 'text-green-400 bg-green-400/20', icon: CheckCircle };
      } else if (startDate > now) {
        return { status: 'upcoming', color: 'text-yellow-400 bg-yellow-400/20', icon: Clock };
      } else {
        return { status: 'completed', color: 'text-gray-400 bg-gray-400/20', icon: CheckCircle };
      }
    }
    
    return { status: 'unknown', color: 'text-gray-400 bg-gray-400/20', icon: AlertCircle };
  };

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
          Registration Management
        </h1>
        <p className="text-white/70 text-lg">
          Manage {totalRegistrations} registrations with {totalRegistrationUsers} user registrations
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
              <p className="text-white font-medium">Total Registrations</p>
              <p className="text-2xl font-bold text-white">{totalRegistrations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-white font-medium">Registration Users</p>
              <p className="text-2xl font-bold text-white">{totalRegistrationUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-white font-medium">User View Records</p>
              <p className="text-2xl font-bold text-white">{totalRegistrationUserView}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <UserPlus className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-white font-medium">My Registrations</p>
              <p className="text-2xl font-bold text-white">{userRegistrations.length}</p>
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
            onClick={() => setSelectedView('all-registrations')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'all-registrations'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            All Registrations ({totalRegistrations})
          </button>
          <button
            onClick={() => setSelectedView('registration-users')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'registration-users'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Registration Users ({totalRegistrationUsers})
          </button>
          <button
            onClick={() => setSelectedView('my-registrations')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'my-registrations'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            My Registrations ({userRegistrations.length})
          </button>
          <button
            onClick={() => setSelectedView('statistics')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'statistics'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Statistics ({totalRegistrationUserView})
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      {selectedView === 'all-registrations' && (
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
              placeholder="Search registrations by path or campus..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            {/* Campus filter removed - all registrations are Bahrain-based */}

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </motion.div>
      )}

      {/* All Registrations View */}
      {selectedView === 'all-registrations' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary-400" />
            All Registrations ({getFilteredData().length})
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {getFilteredData().slice(0, 50).map((registration: any, index: number) => {
              const status = getRegistrationStatus(registration);
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={registration.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => setSelectedRegistration(selectedRegistration === registration.id ? null : registration.id)}
                >
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">Registration #{registration.id}</h4>
                        <div className="flex items-center space-x-4 text-xs text-white/60">
                          {registration.path && <span>Path: {registration.path}</span>}
                          {registration.campus && <span>Campus: {registration.campus}</span>}
                          <span>Created: {formatDate(registration.createdAt)}</span>
                          {registration.objectId && <span>Object: {registration.objectId}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${status.color}`}>
                        {status.status}
                      </div>
                      {selectedRegistration === registration.id ? (
                        <ChevronDown className="w-4 h-4 text-white/60" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-white/60" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {selectedRegistration === registration.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-3 pb-3 border-t border-white/10"
                    >
                      <div className="pt-3 space-y-2">
                        {registration.startAt && (
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="w-4 h-4 text-green-400" />
                            <span className="text-white/80">Start: {formatDateTime(registration.startAt)}</span>
                          </div>
                        )}
                        {registration.endAt && (
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="w-4 h-4 text-red-400" />
                            <span className="text-white/80">End: {formatDateTime(registration.endAt)}</span>
                          </div>
                        )}
                        {registration.objectId && (
                          <div className="flex items-center space-x-2 text-sm">
                            <BookOpen className="w-4 h-4 text-blue-400" />
                            <span className="text-white/80">Object ID: {registration.objectId}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {getFilteredData().length > 50 && (
              <div className="text-center py-4">
                <p className="text-white/60 text-sm">
                  Showing 50 of {getFilteredData().length} registrations
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Registration Users View */}
      {selectedView === 'registration-users' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-primary-400" />
            Registration Users ({totalRegistrationUsers})
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {registrationUsers.slice(0, 50).map((regUser: any, index: number) => (
              <motion.div
                key={regUser.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <UserPlus className="w-4 h-4 text-green-400" />
                  <div>
                    <h4 className="text-white font-medium">Registration User #{regUser.id}</h4>
                    <div className="flex items-center space-x-4 text-xs text-white/60">
                      <span>User ID: {regUser.userId}</span>
                      <span>Registration ID: {regUser.registrationId}</span>
                      <span>Joined: {formatDate(regUser.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                  Registered
                </div>
              </motion.div>
            ))}

            {totalRegistrationUsers > 50 && (
              <div className="text-center py-4">
                <p className="text-white/60 text-sm">
                  Showing 50 of {totalRegistrationUsers} registration users
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* My Registrations View */}
      {selectedView === 'my-registrations' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <UserPlus className="w-5 h-5 mr-2 text-primary-400" />
            My Registrations ({userRegistrations.length})
          </h3>

          {userRegistrations.length > 0 ? (
            <div className="space-y-2">
              {userRegistrations.map((regUser: any, index: number) => (
                <motion.div
                  key={regUser.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    <div>
                      <h4 className="text-white font-medium">Registration #{regUser.registrationId}</h4>
                      <div className="flex items-center space-x-4 text-xs text-white/60">
                        <span>Registration User ID: {regUser.id}</span>
                        <span>Registered: {formatDate(regUser.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                    My Registration
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <UserPlus className="w-12 h-12 text-white/30 mx-auto mb-3" />
              <h4 className="text-white/70 text-lg font-medium mb-2">No registrations found</h4>
              <p className="text-white/50">You haven't registered for any events yet.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Statistics View */}
      {selectedView === 'statistics' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary-400" />
            Registration Statistics ({totalRegistrationUserView})
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {registrationUserView.slice(0, 20).map((viewRecord: any, index: number) => (
              <motion.div
                key={viewRecord.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <div>
                    <h4 className="text-white font-medium">View Record #{viewRecord.id}</h4>
                    <p className="text-white/60 text-sm">Registration ID: {viewRecord.registrationId}</p>
                  </div>
                </div>
                <div className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                  View Record
                </div>
              </motion.div>
            ))}

            {totalRegistrationUserView > 20 && (
              <div className="text-center py-4">
                <p className="text-white/60 text-sm">
                  Showing 20 of {totalRegistrationUserView} view records
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Loading States */}
      {(registrationsLoading || registrationUsersLoading || userRegistrationsLoading) && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-3 text-white/70">Loading registration data...</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {getFilteredData().length === 0 && !registrationsLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Calendar className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-white/70 text-lg font-medium mb-2">No registrations found</h3>
          <p className="text-white/50">
            Try adjusting your search criteria or filters.
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default RegistrationSection
