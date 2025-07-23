import { formatDistanceToNow } from 'date-fns'

// Types for processed progress data
export interface ProcessedProgress {
  id: string
  project: {
    name: string
    type: string
    path: string
  }
  grade: number
  isDone: boolean
  isPassed: boolean
  createdAt: Date
  updatedAt: Date
  relativeTime: string
  status: 'passed' | 'failed' | 'in-progress' | 'not-started'
}

export interface ProjectStats {
  total: number
  passed: number
  failed: number
  inProgress: number
  passRate: number
  averageGrade: number
  recentCompletions: ProcessedProgress[]
}

export interface ProjectTrend {
  period: string
  passed: number
  failed: number
  total: number
  passRate: number
}

// Process raw progress data from GraphQL
export const processProgressData = (progressData: any[]): ProcessedProgress[] => {
  return progressData.map(progress => {
    const isPassed = progress.isDone && progress.grade >= 1
    const isFailed = progress.isDone && progress.grade < 1
    
    let status: ProcessedProgress['status']
    if (isPassed) status = 'passed'
    else if (isFailed) status = 'failed'
    else if (progress.isDone) status = 'in-progress'
    else status = 'not-started'
    
    return {
      id: progress.id,
      project: {
        name: progress.object?.name || 'Unknown Project',
        type: progress.object?.type || 'project',
        path: progress.path || ''
      },
      grade: progress.grade,
      isDone: progress.isDone,
      isPassed,
      createdAt: new Date(progress.createdAt),
      updatedAt: new Date(progress.updatedAt),
      relativeTime: formatDistanceToNow(new Date(progress.updatedAt), { addSuffix: true }),
      status
    }
  })
}

// Calculate project statistics
export const calculateProjectStats = (progressData: any[]): ProjectStats => {
  const processed = processProgressData(progressData)
  const completed = processed.filter(p => p.isDone)
  
  const passed = completed.filter(p => p.isPassed).length
  const failed = completed.filter(p => !p.isPassed).length
  const inProgress = processed.filter(p => !p.isDone).length
  const total = processed.length
  
  const passRate = completed.length > 0 ? (passed / completed.length) * 100 : 0
  const averageGrade = completed.length > 0 
    ? completed.reduce((sum, p) => sum + p.grade, 0) / completed.length 
    : 0
  
  const recentCompletions = processed
    .filter(p => p.isDone)
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 10)
  
  return {
    total,
    passed,
    failed,
    inProgress,
    passRate: Math.round(passRate),
    averageGrade: Math.round(averageGrade * 100) / 100,
    recentCompletions
  }
}

// Calculate project trends over time
export const calculateProjectTrends = (
  progressData: any[],
  period: 'week' | 'month' = 'month'
): ProjectTrend[] => {
  const processed = processProgressData(progressData)
  const completed = processed.filter(p => p.isDone)
  
  // Group by time period
  const groups: Record<string, ProcessedProgress[]> = {}
  
  completed.forEach(progress => {
    const date = progress.updatedAt
    let key: string
    
    if (period === 'week') {
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      key = weekStart.toISOString().split('T')[0]
    } else {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    }
    
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(progress)
  })
  
  // Calculate trends for each period
  return Object.entries(groups)
    .map(([period, progresses]) => {
      const passed = progresses.filter(p => p.isPassed).length
      const failed = progresses.filter(p => !p.isPassed).length
      const total = progresses.length
      const passRate = total > 0 ? (passed / total) * 100 : 0
      
      return {
        period,
        passed,
        failed,
        total,
        passRate: Math.round(passRate)
      }
    })
    .sort((a, b) => a.period.localeCompare(b.period))
}

// Get project difficulty analysis
export const analyzeProjectDifficulty = (progressData: any[]): {
  easy: number
  medium: number
  hard: number
} => {
  const processed = processProgressData(progressData)
  const completed = processed.filter(p => p.isDone)
  
  let easy = 0, medium = 0, hard = 0
  
  completed.forEach(progress => {
    if (progress.grade >= 1.8) easy++
    else if (progress.grade >= 1.2) medium++
    else hard++
  })
  
  return { easy, medium, hard }
}

// Get retry analysis
export const analyzeRetries = (progressData: any[]): {
  firstAttemptSuccess: number
  multipleAttempts: number
  averageAttempts: number
} => {
  // Group by project path to identify retries
  const projectGroups: Record<string, any[]> = {}
  
  progressData.forEach(progress => {
    const path = progress.path || progress.object?.path || 'unknown'
    if (!projectGroups[path]) {
      projectGroups[path] = []
    }
    projectGroups[path].push(progress)
  })
  
  let firstAttemptSuccess = 0
  let multipleAttempts = 0
  let totalAttempts = 0
  
  Object.values(projectGroups).forEach(attempts => {
    const sortedAttempts = attempts.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    
    const successfulAttempt = sortedAttempts.find(a => a.isDone && a.grade >= 1)
    
    if (successfulAttempt) {
      totalAttempts += sortedAttempts.length
      
      if (sortedAttempts.length === 1) {
        firstAttemptSuccess++
      } else {
        multipleAttempts++
      }
    }
  })
  
  const totalProjects = firstAttemptSuccess + multipleAttempts
  const averageAttempts = totalProjects > 0 ? totalAttempts / totalProjects : 0
  
  return {
    firstAttemptSuccess,
    multipleAttempts,
    averageAttempts: Math.round(averageAttempts * 100) / 100
  }
}

// Get project type distribution
export const getProjectTypeDistribution = (progressData: any[]): Record<string, number> => {
  const distribution: Record<string, number> = {}
  
  progressData.forEach(progress => {
    const type = progress.object?.type || 'unknown'
    distribution[type] = (distribution[type] || 0) + 1
  })
  
  return distribution
}

// Calculate completion velocity (projects per time period)
export const calculateCompletionVelocity = (
  progressData: any[],
  days: number = 30
): number => {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  
  const recentCompletions = progressData.filter(
    p => p.isDone && p.grade >= 1 && new Date(p.updatedAt) >= cutoffDate
  )
  
  return recentCompletions.length / days // Projects per day
}

// Get learning path progress
export const getLearningPathProgress = (progressData: any[]): {
  pathName: string
  completed: number
  total: number
  progress: number
}[] => {
  // Group by learning path (inferred from project paths)
  const pathGroups: Record<string, any[]> = {}
  
  progressData.forEach(progress => {
    const path = progress.path || ''
    let pathName = 'General'
    
    // Extract learning path from project path
    if (path.includes('/div-01/')) pathName = 'Division 01'
    else if (path.includes('/div-02/')) pathName = 'Division 02'
    else if (path.includes('/checkpoint/')) pathName = 'Checkpoints'
    else if (path.includes('/raid/')) pathName = 'Raids'
    
    if (!pathGroups[pathName]) {
      pathGroups[pathName] = []
    }
    pathGroups[pathName].push(progress)
  })
  
  return Object.entries(pathGroups).map(([pathName, progresses]) => {
    const completed = progresses.filter(p => p.isDone && p.grade >= 1).length
    const total = progresses.length
    const progress = total > 0 ? (completed / total) * 100 : 0
    
    return {
      pathName,
      completed,
      total,
      progress: Math.round(progress)
    }
  })
}
