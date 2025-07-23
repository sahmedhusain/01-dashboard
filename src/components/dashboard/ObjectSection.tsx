import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import { 
  BookOpen, 
  Folder, 
  File, 
  Search,
  Filter,
  ChevronRight,
  ChevronDown,
  Calendar,
  User,
  Target,
  Activity,
  Database,
  GitBranch,
  Layers,
  Code,
  FileText,
  Video,
  Image
} from 'lucide-react'
import { User as UserType } from '../../types'
import LoadingSpinner from '../ui/LoadingSpinner'
import { formatDate } from '../../utils/dataFormatting'

interface ObjectSectionProps {
  user: UserType
}

// Comprehensive object queries using our tested queries - NO LIMITS
const GET_ALL_OBJECTS = gql`
  query GetAllObjects {
    object(order_by: {createdAt: desc}) {
      id
      name
      type
      attrs
      createdAt
      updatedAt
      campus
      authorId
    }

    object_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const GET_OBJECT_TYPES = gql`
  query GetObjectTypes {
    object_type {
      type
    }
    
    object_type_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const GET_OBJECT_CHILDREN = gql`
  query GetObjectChildren($parentId: Int!) {
    object_child(where: {parentId: {_eq: $parentId}}) {
      id
      parentId
      childId
      attrs
      key
      index
    }
  }
`;

const GET_OBJECT_AVAILABILITY = gql`
  query GetObjectAvailability {
    object_availability {
      id
      userId
    }
    
    object_availability_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const GET_OBJECTS_WITH_CHILDREN = gql`
  query GetObjectsWithChildren {
    object {
      id
      name
      type
      attrs
      campus
      createdAt
      updatedAt
      authorId
    }
  }
`;

const ObjectSection: React.FC<ObjectSectionProps> = ({ user }) => {
  const [selectedView, setSelectedView] = useState<'all' | 'by-type' | 'hierarchy' | 'availability'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [campusFilter, setCampusFilter] = useState<string>('all');
  const [selectedObject, setSelectedObject] = useState<number | null>(null);
  const [expandedObjects, setExpandedObjects] = useState<Set<number>>(new Set());

  // Query all objects
  const { data: objectsData, loading: objectsLoading, error: objectsError } = useQuery(GET_ALL_OBJECTS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query object types
  const { data: typesData, loading: typesLoading } = useQuery(GET_OBJECT_TYPES, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query object availability
  const { data: availabilityData, loading: availabilityLoading } = useQuery(GET_OBJECT_AVAILABILITY, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  // Query object children for selected object
  const { data: childrenData, loading: childrenLoading } = useQuery(GET_OBJECT_CHILDREN, {
    variables: { parentId: selectedObject || 0 },
    skip: !selectedObject,
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  if (objectsLoading && !objectsData) {
    return <LoadingSpinner />;
  }

  if (objectsError) {
    return (
      <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
        <p className="text-red-200">Error loading object data: {objectsError.message}</p>
      </div>
    );
  }

  const objects = objectsData?.object || [];
  const totalObjects = objectsData?.object_aggregate?.aggregate?.count || 0;
  const objectTypes = typesData?.object_type || [];
  const totalTypes = typesData?.object_type_aggregate?.aggregate?.count || 0;
  const availability = availabilityData?.object_availability || [];
  const totalAvailability = availabilityData?.object_availability_aggregate?.aggregate?.count || 0;
  const children = childrenData?.object_child || [];

  // Filter objects based on view and filters
  const getFilteredObjects = () => {
    let filtered = objects;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((obj: any) => 
        obj.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obj.type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((obj: any) => obj.type === typeFilter);
    }

    // Apply campus filter
    if (campusFilter !== 'all') {
      filtered = filtered.filter((obj: any) => obj.campus === campusFilter);
    }

    return filtered;
  };

  // Get unique campuses for filter
  const uniqueCampuses = [...new Set(objects.map((obj: any) => obj.campus).filter(Boolean))];

  // Get object icon based on type
  const getObjectIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'project': return Code;
      case 'exercise': return FileText;
      case 'video': return Video;
      case 'image': return Image;
      case 'folder': return Folder;
      case 'file': return File;
      default: return BookOpen;
    }
  };

  // Get object color based on type
  const getObjectColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'project': return 'text-blue-400 bg-blue-400/20';
      case 'exercise': return 'text-green-400 bg-green-400/20';
      case 'video': return 'text-purple-400 bg-purple-400/20';
      case 'image': return 'text-pink-400 bg-pink-400/20';
      case 'folder': return 'text-yellow-400 bg-yellow-400/20';
      case 'file': return 'text-gray-400 bg-gray-400/20';
      default: return 'text-orange-400 bg-orange-400/20';
    }
  };

  const toggleObjectExpansion = (objectId: number) => {
    const newExpanded = new Set(expandedObjects);
    if (newExpanded.has(objectId)) {
      newExpanded.delete(objectId);
    } else {
      newExpanded.add(objectId);
    }
    setExpandedObjects(newExpanded);
    setSelectedObject(objectId);
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
          Learning Object Browser
        </h1>
        <p className="text-white/70 text-lg">
          Explore {totalObjects} learning objects across {totalTypes} types with {totalAvailability} availability records
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
            <Database className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-white font-medium">Total Objects</p>
              <p className="text-2xl font-bold text-white">{totalObjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Layers className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-white font-medium">Object Types</p>
              <p className="text-2xl font-bold text-white">{totalTypes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-white font-medium">Availability</p>
              <p className="text-2xl font-bold text-white">{totalAvailability}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Activity className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-white font-medium">Campuses</p>
              <p className="text-2xl font-bold text-white">{uniqueCampuses.length}</p>
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
            All Objects ({totalObjects})
          </button>
          <button
            onClick={() => setSelectedView('by-type')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'by-type'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            By Type ({totalTypes})
          </button>
          <button
            onClick={() => setSelectedView('hierarchy')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'hierarchy'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Hierarchy
          </button>
          <button
            onClick={() => setSelectedView('availability')}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedView === 'availability'
                ? 'bg-primary-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Availability ({totalAvailability})
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
            placeholder="Search objects by name or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-white/70" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              {objectTypes.map((type: any) => (
                <option key={type.type} value={type.type}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>

          <select
            value={campusFilter}
            onChange={(e) => setCampusFilter(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Campuses</option>
            {uniqueCampuses.map((campus: string) => (
              <option key={campus} value={campus}>
                {campus}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Object Types Overview */}
      {selectedView === 'by-type' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Layers className="w-5 h-5 mr-2 text-primary-400" />
            Object Types ({totalTypes})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {objectTypes.map((type: any, index: number) => {
              const Icon = getObjectIcon(type.type);
              const colorClass = getObjectColor(type.type);
              const typeCount = objects.filter((obj: any) => obj.type === type.type).length;

              return (
                <motion.div
                  key={type.type}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => setTypeFilter(type.type)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{type.type}</h4>
                      <p className="text-white/60 text-sm">{typeCount} objects</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Objects Grid */}
      {(selectedView === 'all' || selectedView === 'hierarchy') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-primary-400" />
            Learning Objects ({getFilteredObjects().length})
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {getFilteredObjects().slice(0, 50).map((object: any, index: number) => {
              const Icon = getObjectIcon(object.type);
              const colorClass = getObjectColor(object.type);
              const isExpanded = expandedObjects.has(object.id);

              return (
                <motion.div
                  key={object.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer"
                    onClick={() => toggleObjectExpansion(object.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{object.name}</h4>
                        <div className="flex items-center space-x-4 text-xs text-white/60">
                          <span>Type: {object.type}</span>
                          <span>ID: {object.id}</span>
                          {object.campus && <span>Campus: {object.campus}</span>}
                          <span>Created: {formatDate(object.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {object.authorId && (
                        <div className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                          Author: {object.authorId}
                        </div>
                      )}
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-white/60" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-white/60" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-3 pb-3 border-t border-white/10"
                    >
                      <div className="pt-3 space-y-3">
                        {/* Object Attributes */}
                        {object.attrs && Object.keys(object.attrs).length > 0 && (
                          <div>
                            <h5 className="text-white/90 font-medium text-sm mb-2">Attributes:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {Object.entries(object.attrs).slice(0, 6).map(([key, value]) => (
                                <div key={key} className="bg-white/5 rounded p-2">
                                  <span className="text-white/60 text-xs">{key}:</span>
                                  <span className="text-white text-xs ml-2">
                                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Object Children */}
                        {selectedObject === object.id && (
                          <div>
                            <h5 className="text-white/90 font-medium text-sm mb-2 flex items-center">
                              <GitBranch className="w-4 h-4 mr-1" />
                              Children ({children.length})
                            </h5>
                            {childrenLoading ? (
                              <div className="flex items-center justify-center py-4">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500"></div>
                              </div>
                            ) : children.length > 0 ? (
                              <div className="space-y-1">
                                {children.slice(0, 5).map((child: any) => (
                                  <div key={child.id} className="bg-white/5 rounded p-2 text-xs">
                                    <div className="flex items-center justify-between">
                                      <span className="text-white/80">Child ID: {child.childId}</span>
                                      <span className="text-white/60">Key: {child.key}</span>
                                    </div>
                                    {child.index !== null && (
                                      <span className="text-white/60">Index: {child.index}</span>
                                    )}
                                  </div>
                                ))}
                                {children.length > 5 && (
                                  <p className="text-white/60 text-xs">+{children.length - 5} more children</p>
                                )}
                              </div>
                            ) : (
                              <p className="text-white/60 text-xs">No children found</p>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {getFilteredObjects().length > 50 && (
              <div className="text-center py-4">
                <p className="text-white/60 text-sm">
                  Showing 50 of {getFilteredObjects().length} objects
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Availability View */}
      {selectedView === 'availability' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-primary-400" />
            Object Availability ({totalAvailability})
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {availability.slice(0, 20).map((avail: any, index: number) => (
              <motion.div
                key={avail.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <Target className="w-4 h-4 text-green-400" />
                  <div>
                    <span className="text-white font-medium">Availability #{avail.id}</span>
                    <p className="text-white/60 text-sm">User ID: {avail.userId}</p>
                  </div>
                </div>
                <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                  Available
                </div>
              </motion.div>
            ))}

            {totalAvailability > 20 && (
              <div className="text-center py-4">
                <p className="text-white/60 text-sm">
                  Showing 20 of {totalAvailability} availability records
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {getFilteredObjects().length === 0 && !objectsLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-white/70 text-lg font-medium mb-2">No objects found</h3>
          <p className="text-white/50">
            Try adjusting your search criteria or filters.
          </p>
        </motion.div>
      )}

      {/* Loading States */}
      {(objectsLoading || typesLoading || availabilityLoading) && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-3 text-white/70">Loading object data...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ObjectSection
