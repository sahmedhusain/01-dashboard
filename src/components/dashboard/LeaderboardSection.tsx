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
  UserSearch,
  SortAsc,
  SortDesc,
  Star,
  Flame,
  Sparkles,
  Shield,
  Brain,
  Heart,
  Gem,
  Hexagon,
  Diamond
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
    
    
    const uniqueCohortLabels = cohortLabels.filter((label: { name: string }, index: number, array: { name: string }[]) => 
      array.findIndex((l: { name: string }) => l.name === label.name) === index
    )
    
    
    return uniqueCohortLabels
  }, [allLabelsData?.label])

  
  const eventToCohortMapping = useMemo(() => {
    const mapping = new Map<number, string>()
    
    
    
    if (allLabelsData?.label) {
      
      allLabelsData.label.forEach((label: { name: string; description?: string }) => {
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
        // Top 10 users - currently no special handling needed
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
      case 1: return (
        <div className="relative flex items-center justify-center">
          <Crown className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
          <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
        </div>
      )
      case 2: return (
        <div className="relative flex items-center justify-center">
          <Medal className="w-6 h-6 text-slate-300 drop-shadow-lg" />
          <Star className="w-3 h-3 text-slate-200 absolute -top-1 -right-1" />
        </div>
      )
      case 3: return (
        <div className="relative flex items-center justify-center">
          <Award className="w-6 h-6 text-amber-500 drop-shadow-lg" />
          <Gem className="w-3 h-3 text-amber-400 absolute -top-1 -right-1" />
        </div>
      )
      case 4: case 5: return <Trophy className="w-5 h-5 text-orange-400" />
      case 6: case 7: case 8: case 9: case 10: return <Shield className="w-5 h-5 text-purple-400" />
      default: {
        if (position <= 20) return <Hexagon className="w-4 h-4 text-blue-400" />
        if (position <= 50) return <Diamond className="w-4 h-4 text-emerald-400" />
        return <span className="text-white/60 font-bold text-sm">#{position}</span>
      }
    }
  }

  const getRankNotation = (position: number) => {
    switch (position) {
      case 1: return { title: '👑 Legend', subtitle: 'Ultimate Champion', color: 'text-yellow-400' }
      case 2: return { title: '🥈 Master', subtitle: 'Elite Performer', color: 'text-slate-300' }
      case 3: return { title: '🥉 Expert', subtitle: 'Distinguished', color: 'text-amber-500' }
      case 4: case 5: return { title: '🏆 Champion', subtitle: 'Top Tier', color: 'text-orange-400' }
      case 6: case 7: case 8: case 9: case 10: return { title: '🛡️ Elite', subtitle: 'Top 10', color: 'text-purple-400' }
      default: {
        if (position <= 20) return { title: '⭐ Rising Star', subtitle: 'Top 20', color: 'text-blue-400' }
        if (position <= 50) return { title: '💎 Achiever', subtitle: 'Top 50', color: 'text-emerald-400' }
        if (position <= 100) return { title: '🚀 Climber', subtitle: 'Top 100', color: 'text-cyan-400' }
        return { title: '🌟 Participant', subtitle: 'Keep Going!', color: 'text-white/60' }
      }
    }
  }

  const getRankColors = (position: number) => {
    switch (position) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 shadow-lg shadow-yellow-500/20 ring-1 ring-yellow-400/20'
      case 2: return 'bg-gradient-to-r from-slate-400/20 to-slate-500/20 border-slate-400/30 shadow-lg shadow-slate-500/20 ring-1 ring-slate-300/20'
      case 3: return 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-amber-500/30 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/20'
      case 4: case 5: return 'bg-gradient-to-r from-orange-500/15 to-orange-600/15 border-orange-500/25 shadow-md shadow-orange-500/15'
      case 6: case 7: case 8: case 9: case 10: return 'bg-gradient-to-r from-purple-500/15 to-purple-600/15 border-purple-500/25 shadow-md shadow-purple-500/15'
      default: {
        if (position <= 20) return 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20 hover:bg-blue-500/15'
        if (position <= 50) return 'bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border-emerald-500/20 hover:bg-emerald-500/15'
        return 'bg-gradient-to-r from-white/5 to-white/2 border-white/10 hover:bg-white/10 hover:border-emerald-400/20'
      }
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
    <div className="bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 h-full w-full relative">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 35px 35px, rgba(52, 211, 153, 0.1) 2px, transparent 0)`,
          backgroundSize: '70px 70px'
        }}></div>
      </div>

      <div className="relative z-10 h-full w-full overflow-y-auto custom-scrollbar">
        <div className="relative space-y-8 p-6">
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
        
          {/* Enhanced Header with Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full backdrop-blur-xl border border-emerald-400/30 mb-6 shadow-2xl shadow-emerald-500/20 relative overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 animate-pulse"></div>
              <Trophy className="w-12 h-12 text-emerald-400 drop-shadow-lg relative z-10" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-200 via-emerald-100 to-teal-100 bg-clip-text text-transparent mb-4">
                Leaderboard Dashboard
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Competitive rankings for <span className="text-yellow-400 font-bold">{totalUsers}</span> exceptional students 🚀
                <br />
                <span className="text-base text-white/60 mt-2 block">
                  ✨ Celebrating excellence, dedication, and continuous growth ✨
                </span>
              </p>
            </motion.div>
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
            title="Total Students" 
            value={totalUsers.toLocaleString()} 
            color="bg-gradient-to-r from-blue-500/30 to-cyan-500/30"
            bgGradient="bg-gradient-to-br from-blue-900/20 to-cyan-900/20"
            subValue={`🚀 ${totalUsers > 100 ? 'Thriving' : 'Growing'} community`}
          />
          <StatCard 
            icon={TrendingUp} 
            title="Average Level" 
            value={`⚡ ${avgLevel.toFixed(1)}`} 
            color="bg-gradient-to-r from-green-500/30 to-emerald-500/30"
            bgGradient="bg-gradient-to-br from-green-900/20 to-emerald-900/20"
            subValue={`🎯 Peak: ${maxLevel} | 🔥 ${avgLevel > 10 ? 'Exceptional' : avgLevel > 5 ? 'Strong' : 'Rising'}`}
            trend={avgLevel > 5 ? { value: 12, isPositive: true } : undefined}
          />
          <StatCard 
            icon={Heart} 
            title="Community Score" 
            value={`💯 ${avgAuditRatio.toFixed(2)}`} 
            color="bg-gradient-to-r from-pink-500/30 to-rose-500/30"
            bgGradient="bg-gradient-to-br from-pink-900/20 to-rose-900/20"
            subValue={`🤝 ${avgAuditRatio > 1.5 ? 'Outstanding' : avgAuditRatio > 1 ? 'Excellent' : 'Building'} collaboration`}
            trend={avgAuditRatio > 1 ? { value: 8, isPositive: true } : undefined}
          />
          <StatCard 
            icon={Brain} 
            title="Elite Members" 
            value={`🏆 ${processedUsers.filter(u => u.level && u.level >= 10).length}`} 
            color="bg-gradient-to-r from-purple-500/30 to-violet-500/30"
            bgGradient="bg-gradient-to-br from-purple-900/20 to-violet-900/20"
            subValue={`🎆 Level 10+ achievers`}
          />
          <StatCard 
            icon={Flame} 
            title="Rising Stars" 
            value={`⭐ ${processedUsers.filter(u => u.level && u.level >= 5 && u.level < 10).length}`} 
            color="bg-gradient-to-r from-orange-500/30 to-amber-500/30"
            bgGradient="bg-gradient-to-br from-orange-900/20 to-amber-900/20"
            subValue={`🚀 Level 5-9 climbers`}
          />
        </motion.div>

        {/* Available Cohort Labels - NEW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-emerald-400/20">
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Available Cohort Labels</h3>
              <p className="text-sm text-white/60">Dynamic cohort detection from database</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {cohortLabels.length > 0 ? (
              cohortLabels.map((label: { id: string; name: string; type: string; description?: string }, index: number) => (
                <motion.span
                  key={label.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 rounded-xl text-sm font-medium border border-emerald-400/30 hover:bg-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                  title={label.description}
                  onClick={() => setCohortSearchTerm(label.name)}
                >
                  {label.name}
                </motion.span>
              ))
            ) : (
              <div className="flex items-center space-x-2 text-yellow-400">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
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
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden ${
                activeLeaderboard === key
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 border border-white/20'
                  : 'bg-white/10 text-white/70 hover:bg-emerald-500/20 hover:text-white hover:border-emerald-400/30 border border-transparent'
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
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center space-x-3">
              {/* Cohort Filter */}
              <select
                value={cohortFilter}
                onChange={(e) => setCohortFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300"
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
                className="bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300"
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
                className="flex items-center space-x-2 px-3 py-3 bg-white/10 hover:bg-emerald-500/20 border border-white/20 hover:border-emerald-400/30 rounded-xl text-white transition-all duration-300 backdrop-blur-sm"
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
            <div className="p-6 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border border-emerald-500/30 backdrop-blur-xl rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-teal-400/5 animate-pulse"></div>
              <div className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-emerald-300/10 to-teal-300/10 rounded-full blur-xl"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {getRankIcon(currentUserRank)}
                    {currentUserRank <= 3 && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-emerald-400/20 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">🎆 Your Elite Position</p>
                    <p className="text-white/70 text-sm">{getLeaderboardTitle()}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${getRankNotation(currentUserRank).color} bg-white/10 border border-current/30`}>
                        {getRankNotation(currentUserRank).title}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-emerald-400 mb-1">#{currentUserRank}</p>
                  <p className="text-white/60 text-sm">of {totalUsers} students</p>
                  <div className="text-xs text-emerald-300 mt-1">
                    {getRankNotation(currentUserRank).subtitle}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Leaderboard List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm border border-emerald-400/20">
                <Trophy className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              {getLeaderboardTitle()}
              <span className="ml-2 text-emerald-400">({filteredAndSortedUsers.length})</span>
            </h3>
            
            <div className="flex items-center space-x-2">
              <span className="text-white/60 text-sm">Show:</span>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300"
              >
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
                <option value={500}>500</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
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
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 backdrop-blur-sm ${
                    isCurrentUser
                      ? 'bg-emerald-500/20 border-emerald-500/30 ring-1 ring-emerald-500/20 shadow-lg shadow-emerald-500/10'
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
                          <div className="flex items-center space-x-2">
                            <h4 className="text-white font-medium">
                              {userData.firstName && userData.lastName 
                                ? `${userData.firstName} ${userData.lastName}` 
                                : userData.login}
                            </h4>
                            {position <= 10 && (
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${getRankNotation(position).color} bg-white/5`}>
                                {getRankNotation(position).title}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {userData.firstName && userData.lastName && (
                              <span className="text-xs text-white/60">@{userData.login}</span>
                            )}
                            {position <= 50 && position > 10 && (
                              <span className={`text-xs ${getRankNotation(position).color}`}>
                                {getRankNotation(position).subtitle}
                              </span>
                            )}
                          </div>
                        </div>
                        {isCurrentUser && (
                          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium border border-emerald-400/30">
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
                                className="px-1.5 py-0.5 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 text-emerald-400 rounded-lg text-xs font-medium border border-emerald-400/30 backdrop-blur-sm"
                                title={`Cohort Label: ${userLabel.label.name}`}
                              >
                                🏷️ {userLabel.label.name}
                              </span>
                            ))}
                          </div>
                        )}
                        {(!userData.userLabels || userData.userLabels.length === 0) && (
                          <span className="text-yellow-400 text-xs">No cohort labels</span>
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
          <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
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
    </div>
  )
}


const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  color, 
  subValue,
  trend,
  bgGradient
}: { 
  icon: React.ElementType
  title: string
  value: string | number
  color: string
  subValue?: string
  trend?: { value: number, isPositive: boolean }
  bgGradient?: string
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`${bgGradient || 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 dark:from-slate-800/50 dark:to-slate-900/50 light:from-white/80 light:to-slate-50/80'} backdrop-blur-lg rounded-2xl p-6 border border-white/10 dark:border-white/10 light:border-slate-300/30 hover:border-white/20 dark:hover:border-white/20 light:hover:border-slate-400/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl group`}
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
    <h3 className="text-3xl font-bold text-white dark:text-white light:text-slate-900 mb-2 tracking-tight group-hover:scale-110 transition-transform duration-300">{value}</h3>
    <p className="text-white/70 dark:text-white/70 light:text-slate-700 text-sm font-medium">{title}</p>
    {subValue && <p className="text-white/50 dark:text-white/50 light:text-slate-600 text-xs mt-2 bg-white/5 dark:bg-white/5 light:bg-slate-800/10 rounded-lg px-2 py-1">{subValue}</p>}
  </motion.div>
)

export default LeaderboardSection