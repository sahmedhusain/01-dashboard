import { useCallback } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

export type DashboardTab = 'profile' | 'statistics' | 'groups' | 'events' | 'results' | 'piscines' | 'checkpoints' | 'leaderboard' | 'search' | 'export' | string

export const useDashboardRouting = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  const getCurrentTab = useCallback((): DashboardTab => {
    const path = location.pathname

    // Handle root dashboard
    if (path === '/dashboard') return 'profile'

    // Handle piscine sub-routes
    if (path.startsWith('/dashboard/piscines/')) {
      const piscineType = params.piscineType || path.split('/').pop()
      return `piscine-${piscineType}`
    }

    // Handle other dashboard routes
    const segments = path.split('/')
    if (segments.length >= 3 && segments[1] === 'dashboard') {
      return segments[2] as DashboardTab
    }

    return 'profile'
  }, [location.pathname, params.piscineType])

  const navigateToTab = useCallback((tab: DashboardTab) => {
    if (tab.startsWith('piscine-')) {
      const piscineType = tab.replace('piscine-', '')
      navigate(`/dashboard/piscines/${piscineType}`)
    } else if (tab === 'profile') {
      navigate('/dashboard')
    } else {
      navigate(`/dashboard/${tab}`)
    }
  }, [navigate])

  const getQueryParams = useCallback(() => {
    const searchParams = new URLSearchParams(location.search)
    const params: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      params[key] = value
    })
    return params
  }, [location])

  const updateQueryParams = useCallback((params: Record<string, string>) => {
    const searchParams = new URLSearchParams(location.search)
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value)
    })
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true })
  }, [navigate, location])

  const updateQueryParam = useCallback((key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set(key, value)
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true })
  }, [navigate, location])

  const clearQueryParams = useCallback(() => {
    navigate(location.pathname, { replace: true })
  }, [navigate, location])

  const getBreadcrumbs = useCallback(() => {
    const currentTab = getCurrentTab()
    const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard' }]

    if (currentTab !== 'profile') {
      if (currentTab.startsWith('piscine-')) {
        const piscineType = currentTab.replace('piscine-', '')
        breadcrumbs.push({ label: 'Piscines', path: '/dashboard/piscines' })
        breadcrumbs.push({ label: piscineType.charAt(0).toUpperCase() + piscineType.slice(1), path: `/dashboard/piscines/${piscineType}` })
      } else {
        breadcrumbs.push({ label: currentTab.charAt(0).toUpperCase() + currentTab.slice(1), path: `/dashboard/${currentTab}` })
      }
    }

    return breadcrumbs
  }, [getCurrentTab])

  return {
    getCurrentTab,
    navigateToTab,
    getQueryParams,
    updateQueryParams,
    updateQueryParam,
    clearQueryParams,
    getBreadcrumbs,
    // Legacy support
    setTab: navigateToTab,
    getTab: getCurrentTab
  }
}

// Legacy export for backward compatibility
export const useTabRouting = useDashboardRouting

export const useRouteAnalytics = () => {
  // Placeholder for route analytics
  return {
    trackPageView: (path: string) => {
      console.log('Page view:', path)
    },
    trackEvent: (event: string, data?: any) => {
      console.log('Event:', event, data)
    }
  }
}
