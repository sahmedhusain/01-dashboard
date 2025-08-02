import React, { useState, useMemo } from 'react'
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
  labelNames?: string[] // Array of label names for easy display
}


const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ user }) => {
  const [activeLeaderboard, setActiveLeaderboard] = useState<LeaderboardType>('level')
  const [cohortFilter, setCohortFilter] = useState<CohortFilter>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [cohortSearchTerm, setCohortSearchTerm] = useState('') // New state for cohort search
  const [minLevel, setMinLevel] = useState(1)
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [limit, setLimit] = useState(100)

  // Use comprehensive query that tries multiple approaches in one call
  const { data: comprehensiveData, loading: comprehensiveLoading } = useQuery(GET_COMPREHENSIVE_LEADERBOARD_DATA, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  })

  // Separate query for ALL user labels (public data)
  const { data: labelData, loading: labelLoading } = useQuery(GET_ALL_LABEL_USERS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  })

  // Query for all available labels to build dynamic cohort mapping
  const { data: allLabelsData, loading: allLabelsLoading } = useQuery(GET_ALL_LABELS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  })

  // Extract and normalize cohort labels from available labels
  const cohortLabels = useMemo(() => {
    const availableLabels = allLabelsData?.label || []
    
    // Filter labels that contain "cohort" (case-insensitive)
    const cohortLabels = availableLabels.filter((label: { name: string }) => 
      label.name.toLowerCase().includes('cohort')
    ).map((label: { id: number, name: string, description?: string }) => {
      const labelName = label.name.toLowerCase()
      
      // Normalize cohort names - merge Cohort4 variants
      let normalizedName = label.name
      if (labelName.includes('cohort4') || labelName.includes('cohort-4')) {
        normalizedName = "Cohort 4" // Merge all Cohort4-SP variants
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
    
    // Remove duplicates after normalization (keep the first occurrence)
    const uniqueCohortLabels = cohortLabels.filter((label, index, array) => 
      array.findIndex(l => l.name === label.name) === index
    )
    
    console.log('=== COHORT LABELS DETECTED ===')
    console.log('Available cohort labels (normalized):', uniqueCohortLabels.map(l => l.name))
    console.log('Total unique cohort labels found:', uniqueCohortLabels.length)
    
    return uniqueCohortLabels
  }, [allLabelsData?.label])

  // Create event ID to cohort mapping dynamically from label descriptions
  const eventToCohortMapping = useMemo(() => {
    const mapping = new Map<number, string>()
    
    console.log('=== DYNAMIC EVENT TO COHORT MAPPING ===')
    
    // Extract event IDs from label descriptions dynamically
    if (allLabelsData?.label) {
      console.log('Processing labels for event ID extraction:', allLabelsData.label.length)
      
      allLabelsData.label.forEach(label => {
        const labelName = label.name.toLowerCase()
        const description = label.description || ""
        
        // Skip non-cohort labels
        if (!labelName.includes('cohort')) return
        
        console.log(`Processing cohort label: "${label.name}" with description: "${description}"`)
        
        // Extract event ID from description using multiple patterns
        const eventIdPatterns = [
          /module #(\d+)/i,           // "module #763"
          /event #(\d+)/i,            // "event #763"  
          /event (\d+)/i,             // "event 763"
          /#(\d+)/i,                  // "#763"
          /id:?\s*(\d+)/i             // "id: 763" or "id763"
        ]
        
        let eventId: number | null = null
        for (const pattern of eventIdPatterns) {
          const match = description.match(pattern)
          if (match) {
            eventId = parseInt(match[1], 10)
            console.log(`Found event ID ${eventId} using pattern: ${pattern}`)
            break
          }
        }
        
        if (eventId) {
          // Normalize cohort names - merge Cohort4 variants into single cohort
          let cohortName = label.name
          if (labelName.includes('cohort4') || labelName.includes('cohort-4')) {
            cohortName = "Cohort 4" // Merge all Cohort4-SP variants (SP7&8, SP9, etc.)
          } else if (labelName.includes('cohort1')) {
            cohortName = "Cohort 1"
          } else if (labelName.includes('cohort2')) {
            cohortName = "Cohort 2"
          } else if (labelName.includes('cohort3')) {
            cohortName = "Cohort 3"
          }
          
          mapping.set(eventId, cohortName)
          console.log(`✅ Dynamic mapping: Event ${eventId} → ${cohortName} (from label: ${label.name})`)
        } else {
          console.log(`⚠️  No event ID found in description for label: ${label.name}`)
        }
      })
    }
    
    // If no dynamic mappings found, log warning but don't use fallback
    if (mapping.size === 0) {
      console.warn('❌ No event-to-cohort mappings found from label descriptions')
      console.log('Available labels:', allLabelsData?.label?.map(l => ({ name: l.name, desc: l.description })))
    } else {
      console.log(`✅ Successfully created ${mapping.size} dynamic event-to-cohort mappings`)
    }
    
    console.log('Final dynamic event-to-cohort mapping:', Object.fromEntries(mapping))
    return mapping
  }, [allLabelsData?.label])

  // Create a map of all user labels for quick lookup (real labels + event-based cohorts)
  const userLabelsMap = useMemo(() => {
    const map = new Map<number, UserLabelData[]>()
    
    // Try multiple data sources for user labels
    const labelFromDedicated = labelData?.label_user || []
    const labelFromComprehensive = comprehensiveData?.userLabels || []
    const allUserLabels = [...labelFromDedicated, ...labelFromComprehensive]
    
    console.log('=== LABEL MAPPING DEBUG ===')
    console.log('Raw label data from labelData:', labelFromDedicated.length)
    console.log('Raw label data from comprehensiveData:', labelFromComprehensive.length)
    console.log('Combined label_user records found:', allUserLabels.length)
    
    // Process direct database labels (only cohort labels) with normalization
    allUserLabels.forEach((userLabel: UserLabelData) => {
      if (userLabel.label?.name?.toLowerCase().includes('cohort')) {
        const userId = userLabel.userId
        if (!map.has(userId)) {
          map.set(userId, [])
        }
        
        // Normalize the label name for Cohort 4 variants
        const originalLabel = userLabel.label
        const labelName = originalLabel.name.toLowerCase()
        let normalizedName = originalLabel.name
        
        if (labelName.includes('cohort4') || labelName.includes('cohort-4')) {
          normalizedName = "Cohort 4" // Merge all Cohort4-SP variants
        } else if (labelName.includes('cohort1')) {
          normalizedName = "Cohort 1"
        } else if (labelName.includes('cohort2')) {
          normalizedName = "Cohort 2"
        } else if (labelName.includes('cohort3')) {
          normalizedName = "Cohort 3"
        }
        
        // Create normalized label
        const normalizedLabel: UserLabelData = {
          ...userLabel,
          label: {
            ...originalLabel,
            name: normalizedName
          }
        }
        
        map.get(userId)!.push(normalizedLabel)
        console.log(`User ${userId} has DIRECT cohort label: ${normalizedName} (original: ${originalLabel.name})`)
      }
    })
    
    // Add event-based cohort labels for ALL users (avoid duplicates with direct labels)
    const allEventUsers = comprehensiveData?.allEventUsers || []
    console.log(`Processing ${allEventUsers.length} event users for synthetic cohort labels`)
    
    allEventUsers.forEach((eventUser: { userId: number, eventId: number, createdAt?: string }) => {
      const userId = eventUser.userId
      const eventId = eventUser.eventId
      const cohortName = eventToCohortMapping.get(eventId)
      
      if (cohortName && userId) {
        if (!map.has(userId)) {
          map.set(userId, [])
        }
        
        // Check if user already has this NORMALIZED cohort label (avoid duplicates)
        const existingLabels = map.get(userId) || []
        const alreadyHasLabel = existingLabels.some(label => {
          // Compare normalized cohort names to avoid duplicates
          const existingNormalizedName = label.label.name
          return existingNormalizedName === cohortName
        })
        
        if (!alreadyHasLabel) {
          // Create a synthetic label for the event-based cohort
          const syntheticLabel: UserLabelData = {
            id: eventId * 1000000 + userId, // Create unique numeric ID
            userId: userId,
            labelId: eventId, // Use eventId as labelId for synthetic labels
            label: {
              id: eventId,
              name: cohortName,
              description: `Cohort based on Event ${eventId} participation`
            }
          }
          map.get(userId)!.push(syntheticLabel)
          console.log(`User ${userId} gets EVENT-BASED cohort label: ${cohortName} (from Event ${eventId})`)
        } else {
          console.log(`User ${userId} already has cohort label: ${cohortName} - skipping synthetic label`)
        }
      }
    })
    
    // Final deduplication pass - remove any remaining duplicate cohort names per user
    map.forEach((labels, userId) => {
      const seenCohortNames = new Set<string>()
      const uniqueLabels = labels.filter(label => {
        const cohortName = label.label.name
        if (seenCohortNames.has(cohortName)) {
          console.log(`Removing duplicate cohort label "${cohortName}" for user ${userId}`)
          return false
        }
        seenCohortNames.add(cohortName)
        return true
      })
      map.set(userId, uniqueLabels)
    })
    
    console.log('Created user cohort labels map with', map.size, 'users having cohort labels')
    console.log('Sample users with cohort labels:', Array.from(map.keys()).slice(0, 10))
    
    return map
  }, [labelData?.label_user, comprehensiveData?.userLabels, comprehensiveData?.allEventUsers, eventToCohortMapping])

  // Enhanced debugging for leaderboard
  React.useEffect(() => {
    console.log('=== LEADERBOARD QUERY DEBUG ===')
    console.log('Comprehensive Loading:', comprehensiveLoading)
    console.log('Label Loading:', labelLoading)
    console.log('All Labels Loading:', allLabelsLoading)
    console.log('Comprehensive Data exists:', !!comprehensiveData)
    console.log('Label Data exists:', !!labelData)
    console.log('All Labels Data exists:', !!allLabelsData)
    
    if (comprehensiveData) {
      console.log('BH Module Users:', comprehensiveData.bhModuleUsers?.length || 0)
    }
    
    if (labelData) {
      console.log('Label Users from dedicated query:', labelData.label_user?.length || 0)
    }

    if (allLabelsData) {
      console.log('All available labels:', allLabelsData.label?.length || 0)
      console.log('Label names:', allLabelsData.label?.map((l: { name: string }) => l.name) || [])
    }
    
    // Log authentication status
    const token = localStorage.getItem('auth_token')
    const isMockMode = token?.includes('mock-dev-token')
    console.log('Authentication mode:', isMockMode ? 'Mock/Test Mode' : 'Real API Mode')
  }, [comprehensiveLoading, comprehensiveData, labelLoading, labelData, allLabelsLoading, allLabelsData])

  const isLoading = comprehensiveLoading || labelLoading || allLabelsLoading
  const hasError = !comprehensiveData && !isLoading

  const processedUsers = useMemo((): EnhancedUser[] => {
    if (!comprehensiveData?.bhModuleUsers) {
      console.log('Missing comprehensive data:', { 
        comprehensiveData: !!comprehensiveData,
        bhModuleUsers: !!comprehensiveData?.bhModuleUsers 
      })
      return []
    }

    console.log('=== PROCESSING USERS WITH REAL LABEL DATA ===')
    console.log('BH Module Users Count:', comprehensiveData.bhModuleUsers?.length)
    console.log('Total User Labels Available:', labelData?.label_user?.length || comprehensiveData.userLabels?.length || 0)
    console.log('Label Data Source:', labelData?.label_user ? 'Dedicated Query' : 'Comprehensive Query')

    // Create user data maps for quick lookup
    const allUsersMap = new Map()
    const publicUsersMap = new Map()

    // Process users with their basic data
    if (comprehensiveData.allUsersWithEvents) {
      comprehensiveData.allUsersWithEvents.forEach((user: UserData) => {
        allUsersMap.set(user.id, user)
      })
      console.log('✅ Processed', comprehensiveData.allUsersWithEvents.length, 'users')
    }

    // Fallback to public users data (names/logins only)
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
        console.log('No valid userId found:', userId)
        return null
      }

      // Log the audit ratio from event_user
      if (index < 5) {
        console.log(`User ${userId} (${userLogin}/${userName}) has audit ratio: ${userAuditRatio} from event_user`)
      }

      // Try to get additional user data (names, profile, etc.)
      let userData = allUsersMap.get(userId)
      let dataSource = 'allUsers'
      
      // If not available, try public user data (names/logins only)
      if (!userData) {
        userData = publicUsersMap.get(userId)
        dataSource = 'publicUsers'
      }

      // Get real user labels from the API - FILTER TO ONLY COHORT LABELS
      const realUserLabels = userLabelsMap.get(userId) || []
      const cohortUserLabels = realUserLabels.filter(userLabel => 
        userLabel.label?.name?.toLowerCase().includes('cohort')
      )
      
      // Use only cohort labels for display
      const cohortLabelNames = cohortUserLabels.map(userLabel => userLabel.label.name)
      
      // Use the first cohort label as primary cohort, or "No Cohort" if none
      let cohort = 'No Cohort'
      if (cohortLabelNames.length > 0) {
        cohort = cohortLabelNames[0] // Use first cohort label as primary cohort
      }
      
      // Use only cohort labels from label_user table
      const combinedLabels = cohortUserLabels

      if (!userData) {
        if (index < 5) console.log('No additional user data found for userId:', userId)
        // Use basic data with userLogin and userName from event_user
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
          userLabels: combinedLabels, // Use combined cohort labels only
          labelNames: cohortLabelNames // Array of cohort label names for filtering and display
        }
      }

      if (index < 5) console.log(`Found ${dataSource} data for userId ${userId}:`, userData)

      // Enhanced logging for users with cohort labels
      if (index < 10) {
        console.log(`User ${userId} (${userLogin}) has ${cohortUserLabels.length} cohort labels:`, cohortLabelNames)
        if (index < 3) {
          console.log(`  - userLabelsMap has user ${userId}:`, userLabelsMap.has(userId))
          console.log(`  - Raw cohort label data for user ${userId}:`, cohortUserLabels)
        }
      }

      return {
        id: userId,
        login: userData.login || userLogin || `user_${userId}`,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        profile: userData.profile || '',
        attrs: userData.attrs || {},
        auditRatio: userAuditRatio, // Use audit ratio directly from event_user
        totalUp: userData.totalUp || 0,
        totalDown: userData.totalDown || 0,
        level: eventUserView.level || 0,
        totalXP: userData.totalUp || 0,
        cohort: cohort,
        eventPath: '/bahrain/bh-module',
        createdAt: userData.createdAt || eventUserView.createdAt,
        rank: index + 1,
        userLabels: combinedLabels, // Use actual cohort labels from the API only
        labelNames: cohortLabelNames // Array of cohort label names for easy display and filtering
      }
    }).filter(Boolean) as EnhancedUser[]
  }, [comprehensiveData, userLabelsMap, labelData])

    // Extract available cohorts from processed users (based on real labels only)
    const availableCohorts = useMemo((): string[] => {
      const cohorts = new Set<string>(['all'])
      
      // Add cohorts from all user labels (only real labels from database)
      processedUsers.forEach(user => {
        if (user.labelNames && user.labelNames.length > 0) {
          user.labelNames.forEach(label => {
            cohorts.add(label)
          })
        }
        // Also add the cohort field if it exists
        if (user.cohort && user.cohort !== 'No Cohort') {
          cohorts.add(user.cohort)
        }
      })
      
      const cohortArray = Array.from(cohorts).sort()
      console.log('Available cohorts for filtering (from real labels only):', cohortArray)
      return cohortArray
    }, [processedUsers])
  // Sort and filter users
  const filteredAndSortedUsers = useMemo(() => {
    console.log('Processing users for filtering. Total processed users:', processedUsers.length)
    let users = [...processedUsers]
    
    // Apply cohort filter
    if (cohortFilter !== 'all') {
      users = users.filter(user => {
        // Check if user has the selected label/cohort
        return user.labelNames?.includes(cohortFilter) || user.cohort === cohortFilter
      })
    }
    
    // Apply general search filter (names/login)
    if (searchTerm) {
      users = users.filter(user =>
        user.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply cohort-specific search filter
    if (cohortSearchTerm) {
      users = users.filter(user => {
        // Search in user's cohort labels
        const userCohortLabels = user.userLabels?.filter(label => 
          label.label.name.toLowerCase().includes('cohort')
        ) || []
        
        return userCohortLabels.some(label =>
          label.label.name.toLowerCase().includes(cohortSearchTerm.toLowerCase())
        ) || user.cohort?.toLowerCase().includes(cohortSearchTerm.toLowerCase())
      })
    }

    // Apply level filter
    if (minLevel > 1) {
      users = users.filter(user => (user.level || 0) >= minLevel)
    }

    // Sort based on active leaderboard type
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

    // Update ranks after sorting
    const finalUsers = users.map((user, index) => ({ ...user, rank: index + 1 }))
    console.log('Final filtered and sorted users:', finalUsers.length)
    return finalUsers
  }, [processedUsers, cohortFilter, searchTerm, cohortSearchTerm, minLevel, activeLeaderboard, sortOrder])

  // Get user's current rank
  const currentUserRank = useMemo(() => {
    const userIndex = filteredAndSortedUsers.findIndex(u => u.id === user.id)
    return userIndex >= 0 ? userIndex + 1 : null
  }, [filteredAndSortedUsers, user.id])

  const totalUsers = comprehensiveData?.bhModuleStats?.aggregate?.count || processedUsers.length
  const maxLevel = comprehensiveData?.bhModuleStats?.aggregate?.max?.level || Math.max(...processedUsers.map(u => u.level || 0), 0)
  const avgLevel = comprehensiveData?.bhModuleStats?.aggregate?.avg?.level || (processedUsers.reduce((sum, u) => sum + (u.level || 0), 0) / Math.max(totalUsers, 1))
  const avgAuditRatio = processedUsers.reduce((sum, u) => sum + (Number(u.auditRatio) || 0), 0) / Math.max(totalUsers, 1)

  // Helper functions
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

  // Loading and error states
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
    <div className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 min-h-full relative">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 40px 40px, rgba(59, 130, 246, 0.1) 2px, transparent 0)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="relative z-10 space-y-8 p-6">
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
            Leaderboard
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
                placeholder="Search users by login, name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Cohort Search - NEW */}
            <div className="relative flex-1 max-w-md">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <input
                type="text"
                placeholder="Search cohort labels (e.g., Cohort1, Cohort4-SP9)..."
                value={cohortSearchTerm}
                onChange={(e) => setCohortSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                <option value={15}>Level 15+</option>
                <option value={20}>Level 20+</option>
                <option value={25}>Level 25+</option>
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
                  <p className="text-white/60 text-sm">of {filteredAndSortedUsers.length}</p>
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
              const position = userData.rank || (index + 1)
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
                        console.log(`Rendering user ${userData.login} with ${userData.userLabels?.length || 0} COHORT labels:`, userData.userLabels?.map(ul => ul.label.name));
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
                  Showing {limit} of {filteredAndSortedUsers.length} users
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

// Enhanced Stat Card Component
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