import { formatDistanceToNow } from 'date-fns'

// Types for processed data
export interface ProcessedXPTransaction {
  id: string
  amount: number
  type: string
  date: Date
  project: {
    name: string
    type: string
    path: string
  }
  relativeTime: string
}

export interface XPSummary {
  total: number
  bhModule: number
  piscines: Record<string, number>
  level: number
  projectCount: number
  averageXP: number
}

export interface XPProgressionData {
  date: string
  xp: number
  cumulativeXP: number
  project?: string
  type?: string
}

// Process raw XP transactions from GraphQL
export const processXPTransactions = (transactions: any[]): ProcessedXPTransaction[] => {
  return transactions.map(transaction => ({
    id: transaction.id,
    amount: transaction.amount,
    type: transaction.type,
    date: new Date(transaction.createdAt),
    project: {
      name: transaction.object?.name || 'Unknown Project',
      type: transaction.object?.type || 'project',
      path: transaction.path || ''
    },
    relativeTime: formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })
  }))
}

// Calculate XP summary from transactions
export const calculateXPSummary = (
  bhTransactions: any[],
  piscineTransactions: any[] = []
): XPSummary => {
  const bhModuleXP = bhTransactions.reduce((sum, t) => sum + t.amount, 0)
  
  // Group piscine XP by type
  const piscineXP: Record<string, number> = {}
  piscineTransactions.forEach(transaction => {
    const path = transaction.path || ''
    let piscineType = 'unknown'
    
    if (path.includes('piscine-js')) piscineType = 'js'
    else if (path.includes('piscine-go') || path.includes('bh-piscine')) piscineType = 'go'
    else if (path.includes('piscine-rust')) piscineType = 'rust'
    else if (path.includes('piscine-flutter')) piscineType = 'flutter'
    
    piscineXP[piscineType] = (piscineXP[piscineType] || 0) + transaction.amount
  })
  
  const totalXP = bhModuleXP + Object.values(piscineXP).reduce((sum, xp) => sum + xp, 0)
  const level = Math.floor(totalXP / 1000) // 1000 XP per level
  const projectCount = bhTransactions.length
  const averageXP = projectCount > 0 ? bhModuleXP / projectCount : 0
  
  return {
    total: totalXP,
    bhModule: bhModuleXP,
    piscines: piscineXP,
    level,
    projectCount,
    averageXP
  }
}

// Create XP progression data for charts
export const createXPProgressionData = (transactions: any[]): XPProgressionData[] => {
  // Sort transactions by date
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
  
  let cumulativeXP = 0
  return sortedTransactions.map(transaction => {
    cumulativeXP += transaction.amount
    return {
      date: transaction.createdAt,
      xp: transaction.amount,
      cumulativeXP,
      project: transaction.object?.name,
      type: transaction.object?.type
    }
  })
}

// Detect piscine types from transactions
export const detectPiscineTypes = (transactions: any[]): string[] => {
  const piscineTypes = new Set<string>()
  
  transactions.forEach(transaction => {
    const path = transaction.path || ''
    
    if (path.includes('piscine-js')) piscineTypes.add('js')
    else if (path.includes('piscine-go') || path.includes('bh-piscine')) piscineTypes.add('go')
    else if (path.includes('piscine-rust')) piscineTypes.add('rust')
    else if (path.includes('piscine-flutter')) piscineTypes.add('flutter')
  })
  
  return Array.from(piscineTypes)
}

// Format XP values for display
export const formatXP = (xp: number, format: 'kB' | 'MB' | 'auto' = 'auto'): string => {
  if (format === 'kB' || (format === 'auto' && xp >= 1000)) {
    return `${Math.round(xp / 1000)} kB`
  }

  if (format === 'MB' || (format === 'auto' && xp >= 1000000)) {
    return `${(xp / 1000000).toFixed(1)} MB`
  }

  return xp.toString() + ' B'
}

// Calculate XP growth rate
export const calculateXPGrowthRate = (transactions: any[], days: number = 30): number => {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  
  const recentTransactions = transactions.filter(
    t => new Date(t.createdAt) >= cutoffDate
  )
  
  const totalXP = recentTransactions.reduce((sum, t) => sum + t.amount, 0)
  return totalXP / days // XP per day
}

// Get XP milestones
export const getXPMilestones = (currentXP: number): { 
  current: number
  next: number
  progress: number
  level: number
} => {
  const level = Math.floor(currentXP / 1000)
  const current = level * 1000
  const next = (level + 1) * 1000
  const progress = ((currentXP - current) / (next - current)) * 100
  
  return {
    current,
    next,
    progress,
    level
  }
}

// Group transactions by time period
export const groupTransactionsByPeriod = (
  transactions: any[],
  period: 'day' | 'week' | 'month' = 'month'
): Record<string, { xp: number; count: number }> => {
  const groups: Record<string, { xp: number; count: number }> = {}
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.createdAt)
    let key: string
    
    switch (period) {
      case 'day':
        key = date.toISOString().split('T')[0]
        break
      case 'week':
        const weekStart = new Date(date)
        weekStart.setDate(date.getDate() - date.getDay())
        key = weekStart.toISOString().split('T')[0]
        break
      case 'month':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        break
    }
    
    if (!groups[key]) {
      groups[key] = { xp: 0, count: 0 }
    }
    
    groups[key].xp += transaction.amount
    groups[key].count += 1
  })
  
  return groups
}
