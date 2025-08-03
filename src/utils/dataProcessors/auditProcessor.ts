import { formatDistanceToNow } from 'date-fns'

export interface ProcessedAudit {
  id: string
  grade: number
  createdAt: Date
  updatedAt: Date
  relativeTime: string
  project: {
    name: string
    type: string
    path: string
  }
  auditor?: {
    id: number
    login: string
    name: string
  }
  auditee?: {
    id: number
    login: string
    name: string
  }
}

export interface AuditStats {
  given: {
    count: number
    totalGrade: number
    averageGrade: number
    totalMB: number
  }
  received: {
    count: number
    totalGrade: number
    averageGrade: number
    totalMB: number
  }
  ratio: number
  recentGiven: ProcessedAudit[]
  recentReceived: ProcessedAudit[]
}

export interface AuditTrend {
  period: string
  auditsGiven: number
  auditsReceived: number
  avgGradeGiven: number
  avgGradeReceived: number
  ratio: number
}

export const processAuditData = (
  auditsGiven: any[],
  auditsReceived: any[]
): { given: ProcessedAudit[]; received: ProcessedAudit[] } => {
  const processAudit = (audit: any, type: 'given' | 'received'): ProcessedAudit => ({
    id: audit.id,
    grade: audit.grade,
    createdAt: new Date(audit.createdAt),
    updatedAt: new Date(audit.updatedAt),
    relativeTime: formatDistanceToNow(new Date(audit.createdAt), { addSuffix: true }),
    project: {
      name: audit.group?.object?.name || 'Unknown Project',
      type: audit.group?.object?.type || 'project',
      path: audit.group?.path || ''
    },
    ...(type === 'given' && audit.group?.group_users?.[0]?.user && {
      auditee: {
        id: audit.group.group_users[0].user.id,
        login: audit.group.group_users[0].user.login,
        name: `${audit.group.group_users[0].user.firstName || ''} ${audit.group.group_users[0].user.lastName || ''}`.trim() || audit.group.group_users[0].user.login
      }
    }),
    ...(type === 'received' && audit.auditor && {
      auditor: {
        id: audit.auditor.id,
        login: audit.auditor.login,
        name: `${audit.auditor.firstName || ''} ${audit.auditor.lastName || ''}`.trim() || audit.auditor.login
      }
    })
  })

  return {
    given: auditsGiven.map(audit => processAudit(audit, 'given')),
    received: auditsReceived.map(audit => processAudit(audit, 'received'))
  }
}

export const calculateAuditStats = (
  auditsGiven: any[],
  auditsReceived: any[],
  userAuditRatio?: number,
  userTotalUp?: number,
  userTotalDown?: number
): AuditStats => {
  const processed = processAuditData(auditsGiven, auditsReceived)
  
  
  const givenCount = auditsGiven.length
  const givenTotalGrade = auditsGiven.reduce((sum, audit) => sum + audit.grade, 0)
  const givenAverageGrade = givenCount > 0 ? givenTotalGrade / givenCount : 0
  const givenTotalMB = userTotalUp || 0
  
  
  const receivedCount = auditsReceived.length
  const receivedTotalGrade = auditsReceived.reduce((sum, audit) => sum + audit.grade, 0)
  const receivedAverageGrade = receivedCount > 0 ? receivedTotalGrade / receivedCount : 0
  const receivedTotalMB = userTotalDown || 0
  
  
  const ratio = userAuditRatio || (receivedTotalMB > 0 ? givenTotalMB / receivedTotalMB : 0)
  
  return {
    given: {
      count: givenCount,
      totalGrade: givenTotalGrade,
      averageGrade: Math.round(givenAverageGrade * 100) / 100,
      totalMB: givenTotalMB
    },
    received: {
      count: receivedCount,
      totalGrade: receivedTotalGrade,
      averageGrade: Math.round(receivedAverageGrade * 100) / 100,
      totalMB: receivedTotalMB
    },
    ratio: Math.round(ratio * 10) / 10,
    recentGiven: processed.given.slice(0, 10),
    recentReceived: processed.received.slice(0, 10)
  }
}

export const calculateAuditTrends = (
  auditsGiven: any[],
  auditsReceived: any[],
  period: 'week' | 'month' = 'month'
): AuditTrend[] => {
  
  const givenGroups: Record<string, any[]> = {}
  const receivedGroups: Record<string, any[]> = {}
  
  const groupByPeriod = (audit: any) => {
    const date = new Date(audit.createdAt)
    if (period === 'week') {
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      return weekStart.toISOString().split('T')[0]
    } else {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    }
  }
  
  auditsGiven.forEach(audit => {
    const key = groupByPeriod(audit)
    if (!givenGroups[key]) givenGroups[key] = []
    givenGroups[key].push(audit)
  })
  
  auditsReceived.forEach(audit => {
    const key = groupByPeriod(audit)
    if (!receivedGroups[key]) receivedGroups[key] = []
    receivedGroups[key].push(audit)
  })
  
  
  const allPeriods = new Set([
    ...Object.keys(givenGroups),
    ...Object.keys(receivedGroups)
  ])
  
  return Array.from(allPeriods)
    .sort()
    .map(period => {
      const given = givenGroups[period] || []
      const received = receivedGroups[period] || []
      
      const auditsGiven = given.length
      const auditsReceived = received.length
      const avgGradeGiven = given.length > 0 
        ? given.reduce((sum, a) => sum + a.grade, 0) / given.length 
        : 0
      const avgGradeReceived = received.length > 0 
        ? received.reduce((sum, a) => sum + a.grade, 0) / received.length 
        : 0
      const ratio = auditsReceived > 0 ? auditsGiven / auditsReceived : 0
      
      return {
        period,
        auditsGiven,
        auditsReceived,
        avgGradeGiven: Math.round(avgGradeGiven * 100) / 100,
        avgGradeReceived: Math.round(avgGradeReceived * 100) / 100,
        ratio: Math.round(ratio * 10) / 10
      }
    })
}


export const analyzeAuditQuality = (audits: any[]): {
  excellent: number 
  good: number      
  average: number   
  poor: number      
} => {
  let excellent = 0, good = 0, average = 0, poor = 0
  
  audits.forEach(audit => {
    if (audit.grade >= 1.8) excellent++
    else if (audit.grade >= 1.4) good++
    else if (audit.grade >= 1.0) average++
    else poor++
  })
  
  return { excellent, good, average, poor }
}

export const calculateAuditConsistency = (audits: any[]): {
  averageGrade: number
  standardDeviation: number
  consistency: 'high' | 'medium' | 'low'
} => {
  if (audits.length === 0) {
    return { averageGrade: 0, standardDeviation: 0, consistency: 'high' }
  }
  
  const grades = audits.map(a => a.grade)
  const averageGrade = grades.reduce((sum, grade) => sum + grade, 0) / grades.length
  
  const variance = grades.reduce((sum, grade) => sum + Math.pow(grade - averageGrade, 2), 0) / grades.length
  const standardDeviation = Math.sqrt(variance)
  
  let consistency: 'high' | 'medium' | 'low'
  if (standardDeviation < 0.2) consistency = 'high'
  else if (standardDeviation < 0.5) consistency = 'medium'
  else consistency = 'low'
  
  return {
    averageGrade: Math.round(averageGrade * 100) / 100,
    standardDeviation: Math.round(standardDeviation * 100) / 100,
    consistency
  }
}

export const getAuditActivityPatterns = (audits: any[]): {
  hourlyDistribution: Record<number, number>
  dailyDistribution: Record<string, number>
  peakHour: number
  peakDay: string
} => {
  const hourlyDistribution: Record<number, number> = {}
  const dailyDistribution: Record<string, number> = {}
  
  
  for (let i = 0; i < 24; i++) {
    hourlyDistribution[i] = 0
  }
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  days.forEach(day => {
    dailyDistribution[day] = 0
  })
  
  
  audits.forEach(audit => {
    const date = new Date(audit.createdAt)
    const hour = date.getHours()
    const day = days[date.getDay()]
    
    hourlyDistribution[hour]++
    dailyDistribution[day]++
  })
  
  
  const peakHour = Object.entries(hourlyDistribution)
    .reduce((max, [hour, count]) => count > max.count ? { hour: parseInt(hour), count } : max, { hour: 0, count: 0 })
    .hour
  
  const peakDay = Object.entries(dailyDistribution)
    .reduce((max, [day, count]) => count > max.count ? { day, count } : max, { day: 'Monday', count: 0 })
    .day
  
  return {
    hourlyDistribution,
    dailyDistribution,
    peakHour,
    peakDay
  }
}
