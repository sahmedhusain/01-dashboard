export interface RouteAnalytics {
  path: string
  timestamp: number
  duration?: number
  userId?: number
}

export const trackRouteChange = (path: string, userId?: number) => {
  const analytics: RouteAnalytics = {
    path,
    timestamp: Date.now(),
    userId
  }
  
  // Store in localStorage for now
  const existing = JSON.parse(localStorage.getItem('route-analytics') || '[]')
  existing.push(analytics)
  
  // Keep only last 100 entries
  if (existing.length > 100) {
    existing.splice(0, existing.length - 100)
  }
  
  localStorage.setItem('route-analytics', JSON.stringify(existing))
}

export const getRouteAnalytics = (): RouteAnalytics[] => {
  return JSON.parse(localStorage.getItem('route-analytics') || '[]')
}

export const clearRouteAnalytics = () => {
  localStorage.removeItem('route-analytics')
}
