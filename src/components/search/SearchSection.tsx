import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  X,
  User as UserIcon,
  Award,
  TrendingUp,
  Database,
  Calendar,
  Users,
  Activity,
  Target,
  BookOpen,
  Zap,
  FileText,
  Settings
} from 'lucide-react'
import { useLazyQuery, gql } from '@apollo/client'
import { User } from '../../types'
import Card from '../ui/Card'
import Avatar from '../ui/Avatar'
import LoadingSpinner from '../ui/LoadingSpinner'
import { debounce } from 'lodash'
import { formatDate, formatXPValue } from '../../utils/dataFormatting'

interface SearchSectionProps {
  user: User
}

type SearchType = 'users' | 'objects' | 'events' | 'groups' | 'transactions' | 'progress' | 'audits' | 'results'

// Complete search queries using our tested queries
const SEARCH_USERS_COMPLETE = gql`
  query SearchUsersComplete($searchTerm: String!) {
    user(
      where: {
        _or: [
          { login: { _ilike: $searchTerm } }
          { firstName: { _ilike: $searchTerm } }
          { lastName: { _ilike: $searchTerm } }
        ]
      }
      order_by: { totalUp: desc }
    ) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
      createdAt
    }
  }
`;

const SEARCH_OBJECTS = gql`
  query SearchObjects($searchTerm: String!) {
    object(
      where: {
        _or: [
          { name: { _ilike: $searchTerm } }
          { type: { _ilike: $searchTerm } }
        ]
      }
      order_by: { createdAt: desc }
    ) {
      id
      name
      type
      attrs
      createdAt
      campus
      authorId
    }
  }
`;

const SEARCH_EVENTS = gql`
  query SearchEvents($searchTerm: String!) {
    event(
      where: {
        _or: [
          { path: { _ilike: $searchTerm } }
          { campus: { _ilike: $searchTerm } }
        ]
      }
      order_by: { createdAt: desc }
    ) {
      id
      path
      campus
      createdAt
      endAt
      objectId
    }
  }
`;

const SEARCH_GROUPS = gql`
  query SearchGroups($searchTerm: String!) {
    group(
      where: {
        _or: [
          { path: { _ilike: $searchTerm } }
          { campus: { _ilike: $searchTerm } }
        ]
      }
      order_by: { createdAt: desc }
    ) {
      id
      path
      campus
      createdAt
      updatedAt
      objectId
      eventId
    }
  }
`;

const SEARCH_TRANSACTIONS = gql`
  query SearchTransactions($searchTerm: String!) {
    transaction(
      where: {
        _or: [
          { type: { _ilike: $searchTerm } }
          { path: { _ilike: $searchTerm } }
        ]
      }
      order_by: { createdAt: desc }
    ) {
      id
      type
      amount
      createdAt
      path
      userId
      objectId
      eventId
      campus
    }
  }
`;

const SEARCH_PROGRESS = gql`
  query SearchProgress($searchTerm: String!) {
    progress(
      where: {
        _or: [
          { path: { _ilike: $searchTerm } }
          { campus: { _ilike: $searchTerm } }
        ]
      }
      order_by: { createdAt: desc }
    ) {
      id
      userId
      objectId
      grade
      path
      campus
      createdAt
      isDone
    }
  }
`;

const SEARCH_AUDITS = gql`
  query SearchAudits($searchTerm: String!) {
    audit(
      order_by: { createdAt: desc }
    ) {
      id
      auditorId
      groupId
      grade
      createdAt
      updatedAt
    }
  }
`;

const SEARCH_RESULTS = gql`
  query SearchResults($searchTerm: String!) {
    result(
      where: {
        _or: [
          { path: { _ilike: $searchTerm } }
          { type: { _ilike: $searchTerm } }
        ]
      }
      order_by: { createdAt: desc }
    ) {
      id
      userId
      objectId
      grade
      type
      path
      createdAt
    }
  }
`;

const SearchSection: React.FC<SearchSectionProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState<SearchType>('users')
  const [results, setResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  // Campus filtering removed - all users are Bahrain-based

  // Complete search queries
  const [searchUsers] = useLazyQuery(SEARCH_USERS_COMPLETE, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      setResults(data.user || [])
      setIsSearching(false)
    },
    onError: () => {
      setResults([])
      setIsSearching(false)
    }
  })

  const [searchObjects] = useLazyQuery(SEARCH_OBJECTS, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      setResults(data.object || [])
      setIsSearching(false)
    },
    onError: () => {
      setResults([])
      setIsSearching(false)
    }
  })

  const [searchEvents] = useLazyQuery(SEARCH_EVENTS, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      setResults(data.event || [])
      setIsSearching(false)
    },
    onError: () => {
      setResults([])
      setIsSearching(false)
    }
  })

  const [searchGroups] = useLazyQuery(SEARCH_GROUPS, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      setResults(data.group || [])
      setIsSearching(false)
    },
    onError: () => {
      setResults([])
      setIsSearching(false)
    }
  })

  const [searchTransactions] = useLazyQuery(SEARCH_TRANSACTIONS, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      setResults(data.transaction || [])
      setIsSearching(false)
    },
    onError: () => {
      setResults([])
      setIsSearching(false)
    }
  })

  const [searchProgress] = useLazyQuery(SEARCH_PROGRESS, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      setResults(data.progress || [])
      setIsSearching(false)
    },
    onError: () => {
      setResults([])
      setIsSearching(false)
    }
  })

  const [searchAudits] = useLazyQuery(SEARCH_AUDITS, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      setResults(data.audit || [])
      setIsSearching(false)
    },
    onError: () => {
      setResults([])
      setIsSearching(false)
    }
  })

  const [searchResults] = useLazyQuery(SEARCH_RESULTS, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      setResults(data.result || [])
      setIsSearching(false)
    },
    onError: () => {
      setResults([])
      setIsSearching(false)
    }
  })

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term: string, type: SearchType) => {
      if (!term.trim()) {
        setResults([])
        setIsSearching(false)
        return
      }

      setIsSearching(true)
      const searchTerm = `%${term}%`

      switch (type) {
        case 'users':
          searchUsers({
            variables: { searchTerm }
          })
          break
        case 'objects':
          searchObjects({
            variables: { searchTerm }
          })
          break
        case 'events':
          searchEvents({
            variables: { searchTerm }
          })
          break
        case 'groups':
          searchGroups({
            variables: { searchTerm }
          })
          break
        case 'transactions':
          searchTransactions({
            variables: { searchTerm }
          })
          break
        case 'progress':
          searchProgress({
            variables: { searchTerm }
          })
          break
        case 'audits':
          searchAudits({
            variables: { searchTerm }
          })
          break
        case 'results':
          searchResults({
            variables: { searchTerm }
          })
          break
        default:
          setResults([])
          setIsSearching(false)
          break
      }
    }, 300),
    [searchUsers, searchObjects, searchEvents, searchGroups, searchTransactions, searchProgress, searchAudits, searchResults]
  )

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    debouncedSearch(term, searchType)
  }

  const handleTypeChange = (type: SearchType) => {
    setSearchType(type)
    if (searchTerm.trim()) {
      debouncedSearch(searchTerm, type)
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
    setResults([])
    setIsSearching(false)
  }

  // Filter results based on campus filter
  const filteredResults = useMemo(() => {
    // All results are already Bahrain-based, no campus filtering needed
    return results
  }, [results])

  // Get search type icon
  const getSearchTypeIcon = (type: SearchType) => {
    switch (type) {
      case 'users': return UserIcon
      case 'objects': return Database
      case 'events': return Calendar
      case 'groups': return Users
      case 'transactions': return Activity
      case 'progress': return Target
      case 'audits': return Award
      case 'results': return TrendingUp
      default: return Search
    }
  }

  // Get search type label
  const getSearchTypeLabel = (type: SearchType) => {
    switch (type) {
      case 'users': return 'Users'
      case 'objects': return 'Learning Objects'
      case 'events': return 'Events'
      case 'groups': return 'Groups'
      case 'transactions': return 'Transactions'
      case 'progress': return 'Progress'
      case 'audits': return 'Audits'
      case 'results': return 'Results'
      default: return 'Search'
    }
  }

  // Get unique campuses from results for filter
  const uniqueCampuses = [...new Set(results.map((item: any) => item.campus).filter(Boolean))]
  // Search type options
  const searchTypes: { id: SearchType; label: string; icon: any }[] = [
    { id: 'users', label: 'Users', icon: UserIcon },
    { id: 'objects', label: 'Learning Objects', icon: Database },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: Activity },
    { id: 'progress', label: 'Progress', icon: Target },
    { id: 'audits', label: 'Audits', icon: Award },
    { id: 'results', label: 'Results', icon: TrendingUp },
  ]

  const renderResult = (item: any, index: number) => {
    const Icon = getSearchTypeIcon(searchType)

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary-500/20">
            <Icon className="w-4 h-4 text-primary-400" />
          </div>
          <div className="flex-1">
            {searchType === 'users' && (
              <>
                <div className="flex items-center space-x-2">
                  <Avatar user={item} size="sm" />
                  <div>
                    <p className="text-white font-medium">
                      {item.firstName && item.lastName
                        ? `${item.firstName} ${item.lastName}`
                        : item.login
                      }
                    </p>
                    <p className="text-white/60 text-sm">@{item.login}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-xs text-white/50 mt-1">
                  <span>Campus: {item.campus}</span>
                  <span>XP: {formatXPValue(item.totalUp || 0)}</span>
                  <span>Audit: {(item.auditRatio || 0).toFixed(2)}</span>
                </div>
              </>
            )}

            {searchType === 'objects' && (
              <>
                <p className="text-white font-medium">{item.name}</p>
                <div className="flex items-center space-x-4 text-xs text-white/60">
                  <span>Type: {item.type}</span>
                  <span>ID: {item.id}</span>
                  {item.campus && <span>Campus: {item.campus}</span>}
                  <span>Created: {formatDate(item.createdAt)}</span>
                </div>
              </>
            )}

            {searchType === 'events' && (
              <>
                <p className="text-white font-medium">{item.path}</p>
                <div className="flex items-center space-x-4 text-xs text-white/60">
                  <span>ID: {item.id}</span>
                  {item.campus && <span>Campus: {item.campus}</span>}
                  <span>Created: {formatDate(item.createdAt)}</span>
                  {item.endAt && <span>Ends: {formatDate(item.endAt)}</span>}
                </div>
              </>
            )}

            {searchType === 'groups' && (
              <>
                <p className="text-white font-medium">{item.path}</p>
                <div className="flex items-center space-x-4 text-xs text-white/60">
                  <span>ID: {item.id}</span>
                  {item.campus && <span>Campus: {item.campus}</span>}
                  <span>Created: {formatDate(item.createdAt)}</span>
                  {item.objectId && <span>Object: {item.objectId}</span>}
                </div>
              </>
            )}

            {searchType === 'transactions' && (
              <>
                <p className="text-white font-medium">{item.type} Transaction</p>
                <div className="flex items-center space-x-4 text-xs text-white/60">
                  <span>Amount: {item.amount}</span>
                  <span>User: {item.userId}</span>
                  {item.path && <span>Path: {item.path}</span>}
                  <span>Date: {formatDate(item.createdAt)}</span>
                </div>
              </>
            )}

            {searchType === 'progress' && (
              <>
                <p className="text-white font-medium">{item.path}</p>
                <div className="flex items-center space-x-4 text-xs text-white/60">
                  <span>Grade: {item.grade}%</span>
                  <span>User: {item.userId}</span>
                  {item.campus && <span>Campus: {item.campus}</span>}
                  <span>Status: {item.isDone ? 'Complete' : 'In Progress'}</span>
                </div>
              </>
            )}

            {searchType === 'audits' && (
              <>
                <p className="text-white font-medium">Audit #{item.id}</p>
                <div className="flex items-center space-x-4 text-xs text-white/60">
                  <span>Grade: {item.grade}%</span>
                  <span>Auditor: {item.auditorId}</span>
                  <span>Group: {item.groupId}</span>
                  <span>Date: {formatDate(item.createdAt)}</span>
                </div>
              </>
            )}

            {searchType === 'results' && (
              <>
                <p className="text-white font-medium">{item.path || `Result #${item.id}`}</p>
                <div className="flex items-center space-x-4 text-xs text-white/60">
                  <span>Grade: {item.grade}%</span>
                  <span>Type: {item.type}</span>
                  <span>User: {item.userId}</span>
                  <span>Date: {formatDate(item.createdAt)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="text-right">
          {searchType === 'users' && (
            <div>
              <p className="text-primary-400 font-bold">
                {formatXPValue(item.totalUp || 0)}
              </p>
              <p className="text-white/60 text-xs">Total XP</p>
            </div>
          )}
          {(searchType === 'progress' || searchType === 'audits' || searchType === 'results') && (
            <div>
              <p className="text-primary-400 font-bold">
                {item.grade}%
              </p>
              <p className="text-white/60 text-xs">Grade</p>
            </div>
          )}
          {searchType === 'transactions' && (
            <div>
              <p className={`font-bold ${item.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {item.amount > 0 ? '+' : ''}{item.amount}
              </p>
              <p className="text-white/60 text-xs">Amount</p>
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Search className="w-6 h-6 mr-2 text-primary-400" />
          Search & Explore
        </h2>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            showFilters 
              ? 'bg-primary-500 text-white' 
              : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
          }`}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Search Input */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={`Search ${searchType}...`}
            className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50 hover:text-white/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </Card>

      {/* Search Type Tabs */}
      <div className="flex bg-white/10 rounded-lg p-1">
        {searchTypes.map((type) => {
          const Icon = type.icon
          return (
            <button
              key={type.id}
              onClick={() => handleTypeChange(type.id)}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                searchType === type.id
                  ? 'bg-primary-500 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {type.label}
            </button>
          )
        })}
      </div>

      {/* Results */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            Search Results
            {filteredResults.length > 0 && (
              <span className="ml-2 text-primary-400">({filteredResults.length})</span>
            )}
          </h3>
        </div>

        <AnimatePresence mode="wait">
          {isSearching ? (
            <LoadingSpinner size="sm" text="Searching..." />
          ) : filteredResults.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {filteredResults.map((item, index) => renderResult(item, index))}
            </motion.div>
          ) : searchTerm.trim() ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-white/60 py-8"
            >
              <Search className="w-12 h-12 mx-auto mb-4 text-white/30" />
              <p>No results found for "{searchTerm}"</p>
              <p className="text-sm mt-2">Try adjusting your search terms or filters.</p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-white/60 py-8"
            >
              <Search className="w-12 h-12 mx-auto mb-4 text-white/30" />
              <p>Start typing to search {searchType}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
}

export default SearchSection
