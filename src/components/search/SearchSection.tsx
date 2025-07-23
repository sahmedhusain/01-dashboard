import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, User as UserIcon, Award, TrendingUp } from 'lucide-react'
import { useLazyQuery, gql } from '@apollo/client'
import { SEARCH_USERS, GET_USER_XP_TRANSACTIONS, GET_USER_PROGRESS } from '../../graphql/queries'
import { User } from '../../types'
import Card from '../ui/Card'
import Avatar from '../ui/Avatar'
import LoadingSpinner from '../ui/LoadingSpinner'
import { debounce } from 'lodash'

interface SearchSectionProps {
  user: User
}

type SearchType = 'users' | 'projects' | 'audits'

const SearchSection: React.FC<SearchSectionProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState<SearchType>('users')
  const [results, setResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const [searchUsers] = useLazyQuery(SEARCH_USERS, {
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

  const [searchTransactions] = useLazyQuery(GET_USER_XP_TRANSACTIONS, {
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

  const [searchProgress] = useLazyQuery(GET_USER_PROGRESS, {
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

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term: string, type: SearchType) => {
      if (!term.trim()) {
        setResults([])
        setIsSearching(false)
        return
      }

      setIsSearching(true)

      switch (type) {
        case 'users':
          searchUsers({
            variables: {
              searchTerm: `%${term}%`,
              campus: user.campus,
              limit: 20
            }
          })
          break
        case 'projects':
          searchTransactions({
            variables: {
              userLogin: user.login,
              limit: 50
            }
          })
          break
        case 'audits':
          searchProgress({
            variables: {
              userId: user.id,
              limit: 50
            }
          })
          break
      }
    }, 300),
    [searchUsers, searchTransactions, searchProgress, user]
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

  // Filter results based on search term for local filtering
  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) return results

    return results.filter((item: any) => {
      switch (searchType) {
        case 'users':
          return (
            item.login?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        case 'projects':
          return (
            item.object?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.path?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        case 'audits':
          return (
            item.object?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.path?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        default:
          return true
      }
    })
  }, [results, searchTerm, searchType])

  const searchTypes = [
    { id: 'users' as SearchType, label: 'Users', icon: UserIcon },
    { id: 'projects' as SearchType, label: 'Projects', icon: TrendingUp },
    { id: 'audits' as SearchType, label: 'Audits', icon: Award },
  ]

  const renderResult = (item: any, index: number) => {
    switch (searchType) {
      case 'users':
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Avatar user={item} size="sm" />
              <div>
                <p className="text-white font-medium">
                  {item.firstName && item.lastName 
                    ? `${item.firstName} ${item.lastName}`
                    : item.login
                  }
                </p>
                <p className="text-white/60 text-sm">@{item.login}</p>
                <p className="text-white/50 text-xs">{item.campus}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-primary-400 font-bold">
                {item.auditRatio?.toFixed(2) || '0.00'}
              </p>
              <p className="text-white/60 text-xs">Audit Ratio</p>
            </div>
          </motion.div>
        )
      
      case 'projects':
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div>
              <p className="text-white font-medium">
                {item.object?.name || 'Unknown Project'}
              </p>
              <p className="text-white/60 text-sm">{item.path}</p>
              <p className="text-white/50 text-xs">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-primary-400 font-bold">
                +{Math.round(item.amount / 1000)}kB
              </p>
              <p className="text-white/60 text-xs">XP</p>
            </div>
          </motion.div>
        )
      
      case 'audits':
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div>
              <p className="text-white font-medium">
                {item.object?.name || 'Unknown Project'}
              </p>
              <p className="text-white/60 text-sm">{item.path}</p>
              <p className="text-white/50 text-xs">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className={`px-2 py-1 rounded text-sm font-medium ${
                item.isDone
                  ? item.grade >= 1 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {item.isDone 
                  ? (item.grade >= 1 ? 'PASSED' : 'FAILED')
                  : 'IN PROGRESS'
                }
              </div>
              {item.isDone && (
                <p className="text-white/60 text-xs mt-1">
                  Grade: {item.grade?.toFixed(2) || 'N/A'}
                </p>
              )}
            </div>
          </motion.div>
        )
      
      default:
        return null
    }
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
