import React, { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Users,
  Crown,
  Target,
  BarChart3,
  UserSearch,
  SortAsc,
  SortDesc
} from 'lucide-react'
import { useQuery } from '@apollo/client'

import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import Avatar from '../ui/Avatar'
import { formatDate } from '../../utils/dataFormatting'
import {
  GET_COMPREHENSIVE_LEADERBOARD_DATA,
  GET_ALL_LABELS,
  GET_ALL_LABEL_USERS,
} from '../../graphql/allQueries'

interface LeaderboardSectionProps {
  user: User
}

type LeaderboardType = 'level' | 'audit'
type CohortFilter = string
type SortOrder = 'desc' | 'asc'

interface UserData {
  id: number
  login: string
  firstName?: string
  lastName?: string
  profile?: string
  attrs?: Record<string, unknown>
  auditRatio: number
  totalUp: number
  totalDown: number
  createdAt?: string
  updatedAt?: string
}

interface EventUserWithNestedUser {
  id: number
  userId: number
  eventId: number
  level: number
  createdAt: string
  userLogin?: string
  userName?: string
  userAuditRatio?: number
  user?: UserData | null
  event?: {
    id: number
    path?: string
    campus?: string
    createdAt?: string
    endAt?: string
  }
}

interface LabelData {
  id: number
  name: string
  description?: string
}

interface UserLabelData {
  id: number
  userId: number
  labelId: number
  label: LabelData
}

type UserLabel = UserLabelData

interface EnhancedUser {
  id: number
  login: string
  firstName?: string
  lastName?: string
  profile?: string
  attrs?: Record<string, unknown>
  auditRatio: number
  totalUp: number
  totalDown: number
  level?: number
  totalXP?: number
  cohort?: string
  eventPath?: string
  createdAt?: string
  rank?: number
  userLabels?: UserLabel[]
  labelNames?: string[] 
}


const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ user }) => {
  const [activeLeaderboard, setActiveLeaderboard] = useState<LeaderboardType>('level')
  const [cohortFilter, setCohortFilter] = useState<CohortFilter>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [cohortSearchTerm, setCohortSearchTerm] = useState('') 
  const [minLevel, setMinLevel] = useState(1)
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [limit, setLimit] = useState(100)

  
  const { data: comprehensiveData, loading: comprehensiveLoading } = useQuery(GET_COMPREHENSIVE_LEADERBOARD_DATA, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  })

  
  const { data: labelData, loading: labelLoading } = useQuery(GET_ALL_LABEL_USERS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  })

  
  const { data: allLabelsData, loading: allLabelsLoading } = useQuery(GET_ALL_LABELS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  })

  
  const cohortLabels = useMemo(() => {
    const availableLabels = allLabelsData?.label || []
    
    
    const cohortLabels = availableLabels.filter((label: { name: string }) => 
      label.name.toLowerCase().includes('cohort')
    ).map((label: { id: number, name: string, description?: string }) => {
      const labelName = label.name.toLowerCase()
      
      
      let normalizedName = label.name
      if (labelName.includes('cohort4') || labelName.includes('cohort-4')) {
        normalizedName = "Cohort 4" 
      } else if (labelName.includes('cohort1')) {
        normalizedName = "Cohort 1"
      } else if (labelName.includes('cohort2')) {
        normalizedName = "Cohort 2"
      } else if (labelName.includes('cohort3')) {
        normalizedName = "Cohort 3"
      }
      
      return {
        id: label.id,
        name: normalizedName,
        description: label.description || ''
      }
    })
    
    
    const uniqueCohortLabels = cohortLabels.filter((label, index, array) => 
      array.findIndex(l => l.name === label.name) === index
    )
    
    
    return uniqueCohortLabels
  }, [allLabelsData?.label])

  
  const eventToCohortMapping = useMemo(() => {
    const mapping = new Map<number, string>()
    
    
    
    if (allLabelsData?.label) {
      
      allLabelsData.label.forEach(label => {
        const labelName = label.name.toLowerCase()
        const description = label.description || ""
        
        
        if (!labelName.includes('cohort')) return
        
        
        
        const eventIdPatterns = [
          /module #(\d+)/i,           
          /event #(\d+)/i,            
          /event (\d+)/i,             
          /#(\d+)/i,                  
          /id:?\s*(\d+)/i             
        ]
        
        let eventId: number | null = null
        for (const pattern of eventIdPatterns) {
          const match = description.match(pattern)
          if (match) {
            eventId = parseInt(match[1], 10)
            break
          }
        }
        
        if (eventId) {
          
          let cohortName = label.name
          if (labelName.includes('cohort4') || labelName.includes('cohort-4')) {
            cohortName = "Cohort 4" 
          } else if (labelName.includes('cohort1')) {
            cohortName = "Cohort 1"
          } else if (labelName.includes('cohort2')) {
            cohortName = "Cohort 2"
          } else if (labelName.includes('cohort3')) {
            cohortName = "Cohort 3"
          }
          
          mapping.set(eventId, cohortName)
        }
      })
    }
    
    
    if (mapping.size === 0) {
      return mapping
    }
    
    return mapping
  }, [allLabelsData?.label])

  
  const userLabelsMap = useMemo(() => {
    const map = new Map<number, UserLabelData[]>()
    
    
    const labelFromDedicated = labelData?.label_user || []
    const labelFromComprehensive = comprehensiveData?.userLabels || []
    const allUserLabels = [...labelFromDedicated, ...labelFromComprehensive]
    
    
    
    allUserLabels.forEach((userLabel: UserLabelData) => {
      if (userLabel.label?.name?.toLowerCase().includes('cohort')) {
        const userId = userLabel.userId
        if (!map.has(userId)) {
          map.set(userId, [])
        }
        
        
        const originalLabel = userLabel.label
        const labelName = originalLabel.name.toLowerCase()
        let normalizedName = originalLabel.name
        
        if (labelName.includes('cohort4') || labelName.includes('cohort-4')) {
          normalizedName = "Cohort 4" 
        } else if (labelName.includes('cohort1')) {
          normalizedName = "Cohort 1"
        } else if (labelName.includes('cohort2')) {
          normalizedName = "Cohort 2"
        } else if (labelName.includes('cohort3')) {
          normalizedName = "Cohort 3"
        }
        
        
        const normalizedLabel: UserLabelData = {
          ...userLabel,
          label: {
            ...originalLabel,
            name: normalizedName
          }
        }
        
        map.get(userId)!.push(normalizedLabel)
      }
    })
    
    
    const allEventUsers = comprehensiveData?.allEventUsers || []
    
    allEventUsers.forEach((eventUser: { userId: number, eventId: number, createdAt?: string }) => {
      const userId = eventUser.userId
      const eventId = eventUser.eventId
      const cohortName = eventToCohortMapping.get(eventId)
      
      if (cohortName && userId) {
        if (!map.has(userId)) {
          map.set(userId, [])
        }
        
        
        const existingLabels = map.get(userId) || []
        const alreadyHasLabel = existingLabels.some(label => {
          
          const existingNormalizedName = label.label.name
          return existingNormalizedName === cohortName
        })
        
        if (!alreadyHasLabel) {
          
          const syntheticLabel: UserLabelData = {
            id: eventId * 1000000 + userId, 
            userId: userId,
            labelId: eventId, 
            label: {
              id: eventId,
              name: cohortName,
              description: `Cohort based on Event ${eventId} participation`
            }
          }
          map.get(userId)!.push(syntheticLabel)
        }
      }
    })
    
    
    map.forEach((labels, userId) => {
      const seenCohortNames = new Set<string>()
      const uniqueLabels = labels.filter(label => {
        const cohortName = label.label.name
        if (seenCohortNames.has(cohortName)) {
          return false
        }
        seenCohortNames.add(cohortName)
        return true
      })
      map.set(userId, uniqueLabels)
    })
    
    
    return map
  }, [labelData?.label_user, comprehensiveData?.userLabels, comprehensiveData?.allEventUsers, eventToCohortMapping])

  
  React.useEffect(() => {
    
  }, [comprehensiveLoading, comprehensiveData, labelLoading, labelData, allLabelsLoading, allLabelsData])

  const isLoading = comprehensiveLoading || labelLoading || allLabelsLoading
  const hasError = !comprehensiveData && !isLoading

  const processedUsers = useMemo((): EnhancedUser[] => {
    if (!comprehensiveData?.bhModuleUsers) {
      return []
    }


    
    const allUsersMap = new Map()
    const publicUsersMap = new Map()

    
    if (comprehensiveData.allUsersWithEvents) {
      comprehensiveData.allUsersWithEvents.forEach((user: UserData) => {
        allUsersMap.set(user.id, user)
      })
    }

    
    if (comprehensiveData.publicUsers) {
      comprehensiveData.publicUsers.forEach((user: UserData) => {
        publicUsersMap.set(user.id, user)
      })
    }

      return comprehensiveData.bhModuleUsers.map((eventUserView: EventUserWithNestedUser, index: number) => {
      const userId = eventUserView.userId
      const userLogin = eventUserView.userLogin
      const userName = eventUserView.userName
      const userAuditRatio = Number(eventUserView.userAuditRatio) || 0
      
      if (!userId) {
        return null
      }

      
      let userData = allUsersMap.get(userId)
      
      
      if (!userData) {
        userData = publicUsersMap.get(userId)
      }

      
      const realUserLabels = userLabelsMap.get(userId) || []
      const cohortUserLabels = realUserLabels.filter(userLabel => 
        userLabel.label?.name?.toLowerCase().includes('cohort')
      )
      
      
      const cohortLabelNames = cohortUserLabels.map(userLabel => userLabel.label.name)
      
      
      let cohort = 'No Cohort'
      if (cohortLabelNames.length > 0) {
        cohort = cohortLabelNames[0] 
      }
      
      
      const combinedLabels = cohortUserLabels

      if (!userData) {
        
        const nameParts = userName ? userName.split(' ') : []
        return {
          id: userId,
          login: userLogin || `user_${userId}`,
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          profile: '',
          attrs: {},
          auditRatio: userAuditRatio,
          totalUp: 0,
          totalDown: 0,
          level: eventUserView.level || 0,
          totalXP: 0,
          cohort: cohort,
          eventPath: '/bahrain/bh-module',
          createdAt: eventUserView.createdAt,
          rank: index + 1,
          userLabels: combinedLabels, 
          labelNames: cohortLabelNames 
        }
      }


      
      if (index < 10) {
        
      }

      return {
        id: userId,
        login: userData.login || userLogin || `user_${userId}`,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        profile: userData.profile || '',
        attrs: userData.attrs || {},
        auditRatio: userAuditRatio, 
        totalUp: userData.totalUp || 0,
        totalDown: userData.totalDown || 0,
        level: eventUserView.level || 0,
        totalXP: userData.totalUp || 0,
        cohort: cohort,
        eventPath: '/bahrain/bh-module',
        createdAt: userData.createdAt || eventUserView.createdAt,
        rank: index + 1,
        userLabels: combinedLabels, 
        labelNames: cohortLabelNames 
      }
    }).filter(Boolean) as EnhancedUser[]
  }, [comprehensiveData, userLabelsMap])

    
    const availableCohorts = useMemo((): string[] => {
      const cohorts = new Set<string>(['all'])
      
      
      processedUsers.forEach(user => {
        if (user.labelNames && user.labelNames.length > 0) {
          user.labelNames.forEach(label => {
            cohorts.add(label)
          })
        }
        
        if (user.cohort && user.cohort !== 'No Cohort') {
          cohorts.add(user.cohort)
        }
      })
      
      const cohortArray = Array.from(cohorts).sort()
      return cohortArray
    }, [processedUsers])
  
  const filteredAndSortedUsers = useMemo(() => {
    let users = [...processedUsers]
    
    
    if (cohortFilter !== 'all') {
      users = users.filter(user => {
        
        return user.labelNames?.includes(cohortFilter) || user.cohort === cohortFilter
      })
    }
    
    
    if (searchTerm) {
      users = users.filter(user =>
        user.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    
    if (cohortSearchTerm) {
      users = users.filter(user => {
        
        const userCohortLabels = user.userLabels?.filter(label => 
          label.label.name.toLowerCase().includes('cohort')
        ) || []
        
        return userCohortLabels.some(label =>
          label.label.name.toLowerCase().includes(cohortSearchTerm.toLowerCase())
        ) || user.cohort?.toLowerCase().includes(cohortSearchTerm.toLowerCase())
      })
    }

    
    if (minLevel > 1) {
      users = users.filter(user => (user.level || 0) >= minLevel)
    }

    
    users.sort((a, b) => {
      let aValue: number, bValue: number
      
      switch (activeLeaderboard) {
        case 'level':
          aValue = a.level || 0
          bValue = b.level || 0
          break
        case 'audit':
          aValue = Number(a.auditRatio) || 0
          bValue = Number(b.auditRatio) || 0
          break
        default:
          aValue = a.level || 0
          bValue = b.level || 0
      }
      
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
    })

    
    
    return users
  }, [processedUsers, cohortFilter, searchTerm, cohortSearchTerm, minLevel, activeLeaderboard, sortOrder])

  
  const currentUserRank = useMemo(() => {
    
    const sortedUsers = [...processedUsers].sort((a, b) => {
      let aValue: number, bValue: number
      
      switch (activeLeaderboard) {
        case 'level':
          aValue = a.level || 0
          bValue = b.level || 0
          break
        case 'audit':
          aValue = Number(a.auditRatio) || 0
          bValue = Number(b.auditRatio) || 0
          break
        default:
          aValue = a.level || 0
          bValue = b.level || 0
      }
      
      
      if (activeLeaderboard === 'audit') {
        if (!isFinite(aValue)) aValue = 0
        if (!isFinite(bValue)) bValue = 0
      }
      
      
      const comparison = sortOrder === 'desc' ? bValue - aValue : aValue - bValue
      if (comparison !== 0) return comparison
      
      
      if (activeLeaderboard === 'audit') {
        const secondaryComparison = sortOrder === 'desc' ? (b.level || 0) - (a.level || 0) : (a.level || 0) - (b.level || 0)
        if (secondaryComparison !== 0) return secondaryComparison
      }
      
      return a.login.localeCompare(b.login)
    })
    
    
    const userIndex = sortedUsers.findIndex(u => u.id === user.id)
    return userIndex >= 0 ? userIndex + 1 : null
  }, [processedUsers, user.id, activeLeaderboard, sortOrder])

  
  const getActualUserPosition = useCallback((userId: number) => {
    
    const allSortedUsers = [...processedUsers].sort((a, b) => {
      let aValue: number, bValue: number
      
      switch (activeLeaderboard) {
        case 'level':
          aValue = a.level || 0
          bValue = b.level || 0
          break
        case 'audit':
          aValue = Number(a.auditRatio) || 0
          bValue = Number(b.auditRatio) || 0
          break
        default:
          aValue = a.level || 0
          bValue = b.level || 0
      }
      
      
      if (activeLeaderboard === 'audit') {
        if (!isFinite(aValue)) aValue = 0
        if (!isFinite(bValue)) bValue = 0
      }
      
      
      const comparison = sortOrder === 'desc' ? bValue - aValue : aValue - bValue
      if (comparison !== 0) return comparison
      
      
      if (activeLeaderboard === 'audit') {
        const secondaryComparison = sortOrder === 'desc' ? (b.level || 0) - (a.level || 0) : (a.level || 0) - (b.level || 0)
        if (secondaryComparison !== 0) return secondaryComparison
      }
      
      return a.login.localeCompare(b.login)
    })
    
    
    const userIndex = allSortedUsers.findIndex(u => u.id === userId)
    return userIndex >= 0 ? userIndex + 1 : null
  }, [processedUsers, activeLeaderboard, sortOrder])

  const totalUsers = comprehensiveData?.bhModuleStats?.aggregate?.count || processedUsers.length
  const maxLevel = comprehensiveData?.bhModuleStats?.aggregate?.max?.level || Math.max(...processedUsers.map(u => u.level || 0), 0)
  const avgLevel = comprehensiveData?.bhModuleStats?.aggregate?.avg?.level || (processedUsers.reduce((sum, u) => sum + (u.level || 0), 0) / Math.max(totalUsers, 1))
  
  
  const validAuditRatios = processedUsers
    .map(u => Number(u.auditRatio) || 0)
    .filter(ratio => isFinite(ratio) && ratio > 0)
  const avgAuditRatio = validAuditRatios.length > 0 
    ? validAuditRatios.reduce((sum, ratio) => sum + ratio, 0) / validAuditRatios.length 
    : 0

  
  const getCohortDisplayName = (cohort: string) => {
    if (cohort === 'all') return 'All Cohorts'
    return cohort.charAt(0).toUpperCase() + cohort.slice(1)
  }

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />
      case 2: return <Medal className="w-5 h-5 text-gray-300" />
      case 3: return <Award className="w-5 h-5 text-amber-600" />
      default: return <span className="text-white/60 font-bold">#{position}</span>
    }
  }

  const getRankColors = (position: number) => {
    switch (position) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30'
      case 2: return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30'
      case 3: return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30'
      default: return 'bg-white/5 border-white/10'
    }
  }

  const getLeaderboardTitle = () => {
    const cohortSuffix = cohortFilter !== 'all' ? ` - ${getCohortDisplayName(cohortFilter)}` : ''
    switch (activeLeaderboard) {
      case 'level': return `Level Rankings${cohortSuffix}`
      case 'audit': return `Audit Ratio Rankings${cohortSuffix}`
      default: return `Leaderboard${cohortSuffix}`
    }
  }

  const getValueDisplay = (user: EnhancedUser) => {
    switch (activeLeaderboard) {
      case 'level':
        return { value: `Level ${user.level || 0}`, subValue: '' }
      case 'audit': {
        const auditRatio = Number(user.auditRatio) || 0
        return { value: auditRatio.toFixed(1), subValue: '' }
      }
      default:
        return { value: `${user.level || 0}`, subValue: '' }
    }
  }

  
  if (isLoading) return <LoadingSpinner />

  if (hasError) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-400">
          <p>Error loading leaderboard data</p>
          <p className="text-sm text-white/60 mt-2">Unable to load required data</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 h-full w-full relative">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 40px 40px, rgba(59, 130, 246, 0.1) 2px, transparent 0)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="relative z-10 h-full w-full overflow-y-auto space-y-8 p-6">
        {/* Label Access Status - Show if we have limited label data */}
        {(labelData?.label_user?.length || 0) <= 1 && !labelLoading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-amber-200 text-sm font-medium">Label Access Limited</p>
                <p className="text-amber-100/70 text-xs mt-1">
                  Only {(labelData?.label_user?.length || 0)} label assignment(s) accessible. 
                  Users may show "No labels" due to database permissions.
                </p>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-white/10 mb-4">
            <Trophy className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Leaderboard Dashboard
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Rankings for <span className="text-blue-400 font-semibold">{totalUsers}</span> Students
          </p>
        </motion.div>

        {/* BH Module Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <StatCard 
            icon={Users} 
            title="Total Students" 
            value={totalUsers.toLocaleString()} 
            color="from-blue-500/30 to-cyan-500/30"
            subValue="Participants"
          />
          <StatCard 
            icon={BarChart3} 
            title="Average Level" 
            value={avgLevel.toFixed(1)} 
            color="from-green-500/30 to-emerald-500/30"
            subValue={`Max: ${maxLevel}`}
          />
          <StatCard 
            icon={Target} 
            title="Avg Audit Ratio" 
            value={avgAuditRatio.toFixed(2)} 
            color="from-orange-500/30 to-red-500/30"
            subValue="Community contribution"
          />
        </motion.div>

        {/* Available Cohort Labels - NEW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Available Cohort Labels</h3>
              <p className="text-sm text-white/60">Dynamic cohort detection from database</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {cohortLabels.length > 0 ? (
              cohortLabels.map((label, index) => (
                <motion.span
                  key={label.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-3 py-1.5 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm font-medium border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors cursor-pointer"
                  title={label.description}
                  onClick={() => setCohortSearchTerm(label.name)}
                >
                  {label.name}
                </motion.span>
              ))
            ) : (
              <div className="flex items-center space-x-2 text-amber-400">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                <span className="text-sm">No cohort labels detected or limited database access</span>
              </div>
            )}
          </div>
          
          {cohortLabels.length > 0 && (
            <p className="text-xs text-white/50 mt-3">
              💡 Click on a cohort label to search for users with that label
            </p>
          )}
        </motion.div>


        {/* Leaderboard Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {[
            { key: 'level', label: '📊 Level Rankings', icon: TrendingUp },
            { key: 'audit', label: '⚖️ Audit Rankings', icon: Target }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveLeaderboard(key as LeaderboardType)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeLeaderboard === key
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </motion.div>

        {/* Advanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          {/* Main Filter Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <UserSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by username, full name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center space-x-3">
              {/* Cohort Filter */}
              <select
                value={cohortFilter}
                onChange={(e) => setCohortFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {availableCohorts.map(cohort => (
                  <option key={cohort} value={cohort}>
                    {getCohortDisplayName(cohort)}
                  </option>
                ))}
              </select>

              {/* Level Filter */}
              <select
                value={minLevel}
                onChange={(e) => setMinLevel(Number(e.target.value))}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value={1}>All Levels</option>
                <option value={5}>Level 5+</option>
                <option value={10}>Level 10+</option>
                <option value={20}>Level 20+</option>
                <option value={40}>Level 40+</option>
                <option value={80}>Level 80+</option>
                <option value={100}>Level 100+</option>
              </select>

              {/* Sort Order */}
              <button
                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all"
              >
                {sortOrder === 'desc' ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
                <span className="text-sm">{sortOrder === 'desc' ? 'High to Low' : 'Low to High'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* User's Current Position */}
        {currentUserRank && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-4 bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getRankIcon(currentUserRank)}
                  <div>
                    <p className="text-white font-medium">Your Current Position</p>
                    <p className="text-white/60 text-sm">{getLeaderboardTitle()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-400">#{currentUserRank}</p>
                  <p className="text-white/60 text-sm">of {totalUsers}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Leaderboard List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-primary-400" />
              {getLeaderboardTitle()}
              <span className="ml-2 text-primary-400">({filteredAndSortedUsers.length})</span>
            </h3>
            
            <div className="flex items-center space-x-2">
              <span className="text-white/60 text-sm">Show:</span>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
                <option value={500}>500</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredAndSortedUsers.slice(0, limit).map((userData: EnhancedUser, index: number) => {
              
              const position = getActualUserPosition(userData.id) || (index + 1)
              const isCurrentUser = userData.id === user.id
              const displayData = getValueDisplay(userData)

              return (
                <motion.div
                  key={userData.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                    isCurrentUser
                      ? 'bg-primary-500/20 border-primary-500/30 ring-1 ring-primary-500/20'
                      : getRankColors(position)
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(position)}
                    </div>
                    <Avatar
                      user={userData}
                      size="sm"
                      className="w-8 h-8"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="flex flex-col">
                          <h4 className="text-white font-medium">
                            {userData.firstName && userData.lastName 
                              ? `${userData.firstName} ${userData.lastName}` 
                              : userData.login}
                          </h4>
                          {userData.firstName && userData.lastName && (
                            <span className="text-xs text-white/60">@{userData.login}</span>
                          )}
                        </div>
                        {isCurrentUser && (
                          <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs font-medium">
                            You
                          </span>
                        )}
                      </div>
                      {/* Debug: Log cohort label data */}
                      {(() => {
                        return null;
                      })()}
                      <div className="flex items-center space-x-2 text-xs text-white/60 mt-1">
                        {userData.userLabels && userData.userLabels.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {userData.userLabels.map((userLabel, labelIndex) => (
                              <span 
                                key={userLabel.id || labelIndex}
                                className="px-1.5 py-0.5 bg-cyan-400/20 text-cyan-400 rounded text-xs font-medium border border-cyan-400/30"
                                title={`Cohort Label: ${userLabel.label.name}`}
                              >
                                🏷️ {userLabel.label.name}
                              </span>
                            ))}
                          </div>
                        )}
                        {(!userData.userLabels || userData.userLabels.length === 0) && (
                          <span className="text-amber-400 text-xs">No cohort labels</span>
                        )}
                        <span className="ml-auto">Joined {formatDate(userData.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      {displayData.value}
                    </div>
                    <div className="text-xs text-white/60">
                      {displayData.subValue}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {filteredAndSortedUsers.length > limit && (
              <div className="text-center py-4">
                <p className="text-white/60 text-sm">
                  Showing {limit} of {totalUsers} users
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              <span className="ml-3 text-white/70">Loading leaderboard data...</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredAndSortedUsers.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Trophy className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-white/70 text-lg font-medium mb-2">No users found</h3>
            <p className="text-white/50">
              Try adjusting your search criteria or filters.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}


const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  color, 
  subValue 
}: { 
  icon: React.ElementType
  title: string
  value: string | number
  color: string
  subValue?: string
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-gradient-to-br ${color} backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm`}>
        <Icon className="w-8 h-8 text-white drop-shadow-lg" />
      </div>
    </div>
    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{value}</h3>
    <p className="text-white/70 text-sm font-medium">{title}</p>
    {subValue && <p className="text-white/50 text-xs mt-2 bg-white/5 rounded-lg px-2 py-1">{subValue}</p>}
  </motion.div>
)

export default LeaderboardSection